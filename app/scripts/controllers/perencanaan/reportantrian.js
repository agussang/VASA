'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ReportantrianCtrl
 * @description
 * # ReportantrianCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('ReportantrianCtrl',['$scope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','Notification','LoadingScreen','$modal','MdmDermagaSearchByKode','MdmDermagaPerJasa','PerencanaanNew','ReportPersiapan','ParamsCabangList', function ($scope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,Notification,LoadingScreen,$modal,MdmDermagaSearchByKode,MdmDermagaPerJasa,PerencanaanNew,ReportPersiapan,ParamsCabangList) {
  	// LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};
	$scope.showTableAntrian = false;
	$scope.items = [];
	$scope.tglPerencanaan = new Date();
    var kota_meeting = '';
    var pembina_tk_ii = '';
    var nipp_pembina = '';
    var asman = '';
    $scope.showLoader = false;

	$scope.$watch('tglPerencanaan', function(){
		$('#IdtglPerencanaan').mask('99-99-9999');
	});

    ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
        kota_meeting = response.content[0].value;
    });

    ParamsCabangList.get({nama : 'PEMBINA_TK_II'}, function(response){
        pembina_tk_ii = response.content[0].value;
    });

    ParamsCabangList.get({nama : 'NIPP_PEMBINA_TK_II'}, function(response){
        nipp_pembina = response.content[0].value;
    });

    ParamsCabangList.get({nama : 'ASMAN_PMS_PPSA'}, function(response){
        asman = response.content[0].value;
    });

  	//autocomplete
	$scope.getListOfDermagaLabuh = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				MdmDermagaSearchByKode.get({
					kode: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
								response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				MdmDermagaPerJasa.get({
					nama: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
								response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		}
	};

	/* validasi autocomplete */
	var valueField = '';
	$scope.checkValue = function(value){
	  valueField = value;
	}

	 // validation add
    $scope.validationSelectDermaga= function(){
	    if(valueField !== $scope.dermaga){
	      if(typeof $scope.dermaga != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dermaga = '';
	      }
	    }
	}

	$scope.createPenetapanMeeting = function(){
		$scope.noIndex = 0;
	    LoadingScreen.show();

		var kdDermaga = $scope.dermaga.mdmgKode;
		var tglPerencanaan = $filter('date')($scope.tglPerencanaan, 'yyyy-MM-dd');
		
		ReportPersiapan.get({kodeDermaga:kdDermaga, tglPerencanaan:tglPerencanaan}, function(response){
	       LoadingScreen.hide();
			if(response.length > 0){
				$scope.showTableAntrian = true;
				$scope.items = response;
			}else{
                $scope.items = [];
            }
		}, function(){
			dataEmpty();
		});
	}

    //$scope.createPenetapanMeeting();
    
	$scope.printEkspor = function(data){
		LoadingScreen.show();
		$scope.eksporAntrian(data);
	};

	$scope.eksporAntrian = function(options){ 
			$scope.tgl = $filter('date')($scope.tglPerencanaan, 'dd MMMM yyyy');
		 	var namaCabang = $filter('uppercase')($scope.namaDermaga);
            var reportDate = $filter('uppercase')($scope.tgl);
            var NIPP = localStorage.getItem('NIPP');
            var namaPetugas = localStorage.getItem('nama');
            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
            var counter = 0;

            var createTabelRow = function(kapal, no) {
                
                var tabelRow = [
                    no.toString(),
                    kapal.noPpk1,
                    kapal.namaKapal,
                    kapal.namaAgen,
                    (kapal.pbm == null ? '-' : kapal.pbm),
                    kapal.loa,
                    kapal.draft,
                    (kapal.rede == '' ? '-':kapal.rede),
                    (kapal.rencana == null ? '-': kapal.rencana),
                    (kapal.masterCable == '' ? '-':kapal.masterCable),
                    (kapal.tl == true ? 'TL' : 'NON TL'),
                    (kapal.jumlahBongkar != null ? kapal.jumlahBongkar.toString() : '0' ),
                    (kapal.jenisBarangBongkar == '' ? '-' : kapal.jenisBarangBongkar),
                    (kapal.jumlahMuat != null ? kapal.jumlahMuat.toString() : '0'),
                    (kapal.jenisBarangMuat == '' ? '-' : kapal.jenisBarangMuat),
                    kapal.pelabuhanAsal,
                    kapal.pelabuhanTujuan
                ];

                tabelRow.forEach(function(rowItem, index) {
                    if (rowItem == null) tabelRow[index] = '';
                });
                return tabelRow;
            }

            $scope.bulanLaporan = function(data) {
                return (data.tglFilter === $scope.tanggalPerencanaan);
            };

            var no = 0;
            var laporanPrameeting = [];

            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
            $scope.items.forEach(function(kapal, index) {
            	if((kapal.tl == null || kapal.tl == false)&& options == 1){
            		no++;
            		//kapal.pangkalan = "NON TL";
                    //scope.textHeader = "DAFTAR ANTRIAN KAPAL Non TL";
					var tabelRow = createTabelRow(kapal,no);
					laporanPrameeting.push(tabelRow);
					// console.log(laporanPrameeting);
					// AddReportPersiapan.save(kapal,function(response){
					// 	console.log(response);
			           
			  //       });
            	}else if(kapal.tl == true && options == 2){ 
            		no++;
            		//kapal.pangkalan = "TL";
                    //$scope.textHeader = "DAFTAR ANTRIAN KAPAL TL";
					var tabelRow = createTabelRow(kapal,no);
					laporanPrameeting.push(tabelRow);
            	}else if(options == 3){
            		no++;
                    //$scope.textHeader = "Daftar ANTRIAN KAPAL";
            		// if(kapal.tl == true){
            		// 	kapal.pangkalan = "TL";
            		// }else{
            		// 	kapal.pangkalan = "NON TL";
            		// }
            		
					var tabelRow = createTabelRow(kapal,no);
					laporanPrameeting.push(tabelRow);
            	}
              
            });
            //console.log(laporanPrameeting);





            var pdfContent = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 40, 60],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 12,
                        alignment: 'center'
                    },
                    subheader: {
                        bold: true,
                        color: '#000',
                        fontSize: 12,
                        alignment: 'center'
                    },
                    subheader2: {
                        bold: true,
                        color: '#000',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, 2, 0, 0]
                    },
                    tableHeader: {
                        color: '#000',
                        bold: true,
                        fontSize: 7,
                        alignment: 'center'
                    },
                    dataTable: {
                        color: '#000',
                        fontSize: 6,
                        width: 500,
                        margin: [0, 20, 0, 8]
                    },
                    footer: {
                        color: '#000',
                        margin: [20, 20, 20, 10],
                        fontSize: 8,
                        italics: true
                    },
                    footer3: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'center'
                    },
                    footer4: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'center',
                        margin: [60, 0, 0, 0]
                    },
                    note: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'left'
                    }
                },
                footer: function(pagenumber, pagecount) {
                    return {
                        text: [
                            { text: 'Generated by ', style: 'footer' },
                            { text: namaPetugas, style: 'footer' },
                            { text: ' (' + NIPP + ') ' + ' on ' + tglLaporan, style: 'footer' },
                            { text: ' from VASA \n', style: 'footer' },
                            { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment: 'right', italics: false }
                        ],
                        margin: [20, 20, 20, 10]
                    };
                },
                content: [
                	{
                        alignment: 'center',
                        columns: [
                            { text: 'DAFTAR ANTRIAN KAPAL '+ (options == 2 ? 'TL' : options == 1? 'NON TL' : ''), style: 'subheader' }

                        ]
                    },
                    
                    {
                        alignment: 'center',
                        columns: [                           
                            { text: 'Tanggal : ' + reportDate, style: 'subheader' }
                        ]
                    },
                    {
                        style: 'dataTable',
                        table: {
                            headerRows: 3,
                            pageBreak: 'before',
                            dontBreakRows: true,
                            body: [
                                [
                                    { text: "\n\nNO", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nNO PPK1", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nNAMA KAPAL", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nAGEN", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nPBM", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nLOA", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nDRAFT", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nREDE", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nPPK1 RENCANA", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nMASTER CABLE", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nPANGKALAN", rowSpan: 3, style: 'tableHeader' },
                                    { text: "RENCANA", colSpan: 4, style: 'tableHeader' },
                                    {},
                                    {},
                                    {},
                                    { text: "\n\nPELABUHAN", colSpan: 2, style: 'tableHeader' },
                                    {}
                                ],
                                [
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    { text: 'BONGKAR', colSpan: 2,style: 'tableHeader'},
                                    {},
                                    { text: 'MUAT',colSpan: 2,style: 'tableHeader'},
                                    {},
                                    {text: 'ASAL', rowSpan: 2,style: 'tableHeader'},
                                    {text: 'TUJUAN', rowSpan: 2,style: 'tableHeader'}
                                ],
                                [
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    { text: 'TON/M3', alignment: 'center' },
                                    { text: 'JENIS BARANG', alignment: 'center' },
                                    { text: 'TON/M3', alignment: 'center' },
                                    {text: 'JENIS BARANG', alignment: 'center' },
                                    {},
                                    {}
                                ]

                            ].concat(laporanPrameeting)
                        }
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'Catatan : ',  style: 'note' },
                            {}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '*Entri PPK1 dilaksanakan selambat-lambatnya jam 13:00',  style: 'note'},
                            {}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer3' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'Mengetahui', style: 'footer3' },
                            { text: kota_meeting+', '+ $filter('date')(new Date(),'dd-MM-yyyy'), style: 'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'Kepala Kantor Otoritas Pelabuhan Utama '+namaCabang+'\nKepala Bidang Lala, Operasi dan Usaha Kepelabuhan', style: 'footer3' },
                            { text: 'ASMAN Pemasaran dan PPSA', style: 'footer4' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer3' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer3' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            {text: '',  style: 'footer3'},
                            { text: asman , style:'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer3' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: pembina_tk_ii,  style: 'footer3'},
                            {text: '', style: 'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'PEMBINA TK I/IV/B',  style: 'footer3'},
                            { text: '' , style:'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: nipp_pembina,  style: 'footer3'},
                            { text: '' , style:'footer4'}
                        ]
                    }
                ],

            };
//console.log(pdfContent);
            pdfMake.createPdf(pdfContent).download("Laporan-Antrian-"+reportDate+".pdf");
            LoadingScreen.hide();
            //var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
            //window.open(url,'_blank');
    };

    $scope.generateExcel = function () {
        var reportDate = $filter('uppercase')($scope.tgl);

        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById('laporan-antrian');

        var table_html = table_div.outerHTML.replace(/ /g, '%20');
        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Laporan Antrian - ' + reportDate + '.xls';
        a.click();

    };
    
      

	// $scope.eksporTL = function(){
	// 	// console.log($scope.items);
	// 		$scope.tgl = $filter('date')($scope.tglPerencanaan, 'dd-MMMM-yyyy');
	// 	 	var namaCabang = $filter('uppercase')($scope.namaDermaga);
 //            var reportDate = $filter('uppercase')($scope.tgl);
 //            var NIPP = localStorage.getItem('NIPP');
 //            var namaPetugas = localStorage.getItem('nama');
 //            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
 //            var counter = 0;

 //            var createTabelRow = function(kapal, no) {

                
 //                var tabelRow = [
 //                    no.toString(),
 //                    kapal.noPpk1,
 //                    kapal.namaKapal,
 //                    kapal.namaAgen,
 //                    kapal.pbm,
 //                    kapal.loa,
 //                    kapal.draft,
 //                    kapal.rede,
 //                    kapal.rencana,
 //                    kapal.tl,
 //                    kapal.jumlahBongkar,
 //                    kapal.jenisBarangBongkar,
 //                    kapal.jumlahMuat,
 //                    kapal.jenisBarangMuat,
 //                    kapal.pelabuhanAsal,
 //                    kapal.pelabuhanTujuan
 //                ];


 //                tabelRow.forEach(function(rowItem, index) {
 //                    if (rowItem == null) tabelRow[index] = '';
 //                });
 //                return tabelRow;
 //            }

 //            $scope.bulanLaporan = function(data) {
 //                return (data.tglFilter === $scope.tanggalPerencanaan);
 //            };

 //            var no = 0;
 //            var laporanPrameeting = [];

 //            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
 //            $scope.items.forEach(function(kapal, index) {
 //            	if(kapal.tl == true){
 //            		 no++;

	// 			var tabelRow = createTabelRow(kapal,no);
	// 			kapal.tl = "TL";
	// 			laporanPrameeting.push(tabelRow);
	// 			// AddReportPersiapan.save(kapal,function(response){
	// 			// 	console.log(response);
		           
	// 	  //       });

 //            	}
              
 //            });
 //            //console.log(laporanPrameeting);





 //            var pdfContent = {
 //                pageSize: 'A4',
 //                pageMargins: [40, 60, 40, 50],
 //                styles: {
 //                    header: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 12,
 //                        alignment: 'center'
 //                    },
 //                    subheader: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left'
 //                    },
 //                    subheader2: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left',
 //                        margin: [0, 2, 0, 0]
 //                    },
 //                    tableHeader: {
 //                        color: '#000',
 //                        bold: true,
 //                        fontSize: 7,
 //                        alignment: 'center'
 //                    },
 //                    dataTable: {
 //                        color: '#000',
 //                        fontSize: 6,
 //                        width: 500,
 //                        margin: [0, 20, 0, 8]
 //                    },
 //                    footer: {
 //                        color: '#000',
 //                        margin: [20, 20, 20, 10],
 //                        fontSize: 8,
 //                        italics: true
 //                    }
 //                },
 //                footer: function(pagenumber, pagecount) {
 //                    return {
 //                        text: [
 //                            { text: 'Generated by ', style: 'footer' },
 //                            { text: namaPetugas, style: 'footer' },
 //                            { text: ' (' + NIPP + ') ' + ' on ' + tglLaporan, style: 'footer' },
 //                            { text: ' from VASA \n', style: 'footer' },
 //                            { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment: 'right', italics: false }
 //                        ],
 //                        margin: [20, 20, 20, 10]
 //                    };
 //                },
 //                content: [
 //                	{
 //                        alignment: 'justify',
 //                        columns: [
 //                            { text: 'Daftar Antrian Kapal TL', style: 'subheader2' }

 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                     
 //                            { text: 'Dermaga             : ' + namaCabang, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                           
 //                            { text: 'Tanggal              : ' + reportDate, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        style: 'dataTable',
 //                        table: {
 //                            headerRows: 2,
 //                            pageBreak: 'before',
 //                            dontBreakRows: true,
 //                            body: [
 //                                [
 //                                    { text: "\n\nNO Urut", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNo PPK1", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNama Kapal", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nCluster", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nTanggal Permohonan", rowSpan: 2, style: 'tableHeader' }
 //                                ],
 //                                [
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {}
 //                                ]
 //                            ].concat(laporanPrameeting)
 //                        }
 //                    }

 //                ],

 //            };

 //            pdfMake.createPdf(pdfContent).open();

 //            //var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
 //            //window.open(url,'_blank');
	// }
	$scope.clusterNama = function(data,ppk){
		// console.log(data);
		// console.log($scope.clusteringNama);
		$scope.clusteringNama.forEach(function(cluster) {
            	if(cluster.clusteringId == data){
            		$scope.namaCluster = cluster.pembagiAnakan;
            	}
		});
		$scope.items.forEach(function(newdata) {
			// console.log(newdata)
            	if(newdata.noPpkJasa == ppk){
            		newdata.clusteringNama = $scope.namaCluster;
            		// newdata.tglPermohonan = $filter('date')(newdata.tglPermohonan, 'yyyy-MM-dd');
            	}
		});
	}


}]);
