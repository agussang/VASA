'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanReportmeetingCtrl
 * @description
 * # PerencanaanReportmeetingCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaanReportmeetingCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','ListKapalPrameeting','ReportKapalMeeting','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole','MdmDermagaSearchByKode','MdmDermagaPerJasa','PenetapanSave','UpdateHasilMeeting','DeleteKapalHasilMeeting','CancelRPKRO','HasilMeetingResetRpkro','ParamsCabangList','KapalLastLine',function ($scope,$filter,$timeout,$routeParams,$location,$window,ListKapalPrameeting,ReportKapalMeeting,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole,MdmDermagaSearchByKode,MdmDermagaPerJasa,PenetapanSave,UpdateHasilMeeting,DeleteKapalHasilMeeting,CancelRPKRO,HasilMeetingResetRpkro,ParamsCabangList,KapalLastLine) {
	$scope.userRole = UserRole.getCurrentRole();
  // LoadingScreen.show();

	$scope.items={};
  	$scope.hasilPrameetingList = [];
  	$scope.newHasilMeeting =[];
	// var filterTglAwal = undefined;
	// var filterTglAkhir = undefined;
	$scope.tanggalPerencanaan =  $filter('date')($routeParams.tgl, 'yyyy-MM-dd');
	$scope.kodeDermaga = $routeParams.kodeDermaga;
	$scope.showLoader = false;
	$scope.locationPath = '';
	$scope.PostHasilMeeting = {};
  	$scope.tanggalPrameeting = $filter('date')($scope.tanggalPerencanaan, 'dd-MM-yyyy');
  	$scope.options = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true
    };
    $scope.kota_meeting = '';
    $scope.now = $filter('date')(new Date(),'dd-MM-yyyy');
    $scope.kapalLL = [];


    /*ambil nama dermaga*/
  	MdmDermagaSearchByKode.get({
  		kode: $scope.kodeDermaga,
		kodeTerminal : localStorage.getItem('kodeTerminal'),
		limit: '10'},function(response){
			$scope.namaDermaga =  response[0].mdmgNama;
    		response.forEach(function (x) {
                if(x.mdmgKode === $scope.kodeDermaga){       
                    $scope.dermaga = x.mdmgNama +' ('+x.mdmgKode + ')';
                }     			
    		});   
    });

    /*ambil parameter kota meeting untuk report*/
    ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
        $scope.kota_meeting = response.content[0].value;
    });

    /*ambil kapal yg LL current time*/
    $scope.getKapalLL = function(){
        KapalLastLine.get({kdDermaga : $scope.kodeDermaga}, function(response){
           $scope.kapalLL = response.dataKapal;
        });
    };
    $scope.getKapalLL();

    /*autocomplete dermaga*/
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
	};

	 // validation add
    $scope.validationSelectDermaga= function(){
	    if(valueField !== $scope.dermaga){
	      if(typeof $scope.dermaga !== 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dermaga = '';
	      }
	    }
	};

    /*ambil data lineup*/
	$scope.loadHasilPrameeting = function(tgl,dermaga) {
		LoadingScreen.show();
		var kodeDM = "";
		var tglPM = "";
		if(tgl == 0 && dermaga == 0){
			kodeDM = $scope.kodeDermaga;
			tglPM =  $scope.tanggalPerencanaan;
		}else{
			kodeDM = dermaga;
			tglPM =  tgl;
		}
		
		ReportKapalMeeting.get(
			{
				kdDermaga :kodeDM,
				tglPerencanaan : tglPM
			},
			function(response) {
				LoadingScreen.hide();	
				$scope.showLoader = false;
			    $scope.hasilPrameetingList = response;
		});
	};

   $scope.loadHasilPrameeting(0,0);

	$scope.goToPerencanaan = function(){
		$location.path('perencanaan/'+$routeParams.kodeDermaga+'/'+$routeParams.tgl);
	};

    /*ambil data setelah dermaga diganti*/
	$scope.changeData = function(){
		var dermaga = '';
		var tglPrameeting = $scope.tanggalPrameeting.split("-");
		var conTglPrameeting = tglPrameeting[2]+"-"+tglPrameeting[1]+"-"+tglPrameeting[0];

		if(typeof $scope.dermaga === "string"){
			dermaga = $scope.kodeDermaga;
		}else if(typeof $scope.dermaga === "object"){
		  dermaga = $scope.dermaga.mdmgKode;
		}

		$location.path('meeting/report/'+dermaga+'/'+conTglPrameeting);
		$window.location.reload();    	
	};

    /*kirim rpkro*/
	$scope.sendRPKRO = function(data){		
		$scope.PostHasilMeeting.noPpk1 = data.noPpk1;
		$scope.PostHasilMeeting.noPpkJasa = data.noPpkJasa;
		$scope.PostHasilMeeting.isRpkro = true;
		
		if(data.isKapalSandar == true && data.isPpkRpkro == true){
			$scope.setNotification  = {
	          type  : 'danger',
	          message : 'RPKRO gagal, <b>Tidak Berlaku untuk kapal Sandar</b>'
	        };
	        Notification.setNotification($scope.setNotification);
			return;
		}

		UpdateHasilMeeting.update($scope.PostHasilMeeting,function(response){
            if(response.errorCode == null){
                 $timeout(function() {
                    $scope.setNotification  = {
			          type  : 'success',
			          message : '<b>RPKRO Berhasil di update</b>'
			        };
			        Notification.setNotification($scope.setNotification);
			        $window.location.reload();
                }, 3000);
                
            }else{
            	 $timeout(function() {
                    $scope.setNotification  = {
			          type  : 'danger',
			          message : '<b>Gagal</b><br>'+response.errorMessage
			        };
			        Notification.setNotification($scope.setNotification);
                }, 3000);
            }
        });
	}

    /*tombol batal dilineup*/
	$scope.deleteHasilMeeting = function(data){
		$scope.noPpkJasa = data.noPpkJasa;
		var confirmDelete = confirm('Apakah anda ingin membatalkan kapal ini?');
		if(confirmDelete){
			CancelRPKRO.delete({noPpkJasa:$scope.noPpkJasa},function(response){
                            
		        if(response.$resolved == true){
		            $scope.setNotification  = {
		                type    : "success  ",
		                message : "Kapal berhasil dihapus"
		            };
		            Notification.setNotification($scope.setNotification);
		            
		        }else{
		            $scope.setNotification  = {
		                type    : "warning",
		                message : "Kapal tidak berhasil dihapus"
		            };
		            Notification.setNotification($scope.setNotification);
		        }
		        $window.location.reload();

		    });
		}
		
	}

    /*reset status rpkro inaportnet*/
    $scope.resetRpkro = function(data){
        $scope.nomorRpkro = data.nomorRpkro;
        var confirmDelete = confirm('Apakah anda ingin mereset rpkro kapal ini?');
        if (confirmDelete) {
            HasilMeetingResetRpkro.update({nomorRpkro:$scope.nomorRpkro},function(response){
            if(response.$resolved == true){
                $timeout(function() {
                    $scope.setNotification  = {
                      type  : 'success',
                      message : '<b>RPKRO Berhasil di reset</b>'
                    };
                    Notification.setNotification($scope.setNotification);
                }, 2000);
                $window.location.reload();
            }else{
                $timeout(function() {
                    $scope.setNotification  = {
                      type  : 'danger',
                      message : '<b>Gagal reset Rpkro</b><br>'
                    };
                    Notification.setNotification($scope.setNotification);
                    }, 2000);               
                }
            }); 
        } 
    }

	$scope.tetapkanMeeting = function(data){
		
		$scope.PostHasilMeeting.noPpk1 = data.noPpk1;
		$scope.PostHasilMeeting.noPpkJasa = data.noPpkJasa;
		$scope.PostHasilMeeting.isDitetapkan = true;
		
		if(data.isKapalSandar == true){
			$scope.setNotification  = {
	          type  : 'danger',
	          message : 'gagal, <b>Tidak Berlaku untuk kapal Sandar</b>'
	        };
	        Notification.setNotification($scope.setNotification);
			return;
		}

		UpdateHasilMeeting.update($scope.PostHasilMeeting,function(response){
            if(response){
                 $timeout(function() {
                    $scope.setNotification  = {
			          type  : 'success',
			          message : '<b>Kapal Berhasil di ditetapkan</b>'
			        };
			        Notification.setNotification($scope.setNotification);
			        $window.location.reload();
                }, 3000);
                
            }
        });
	}

    /*export lineup*/
	$scope.generate = function() {      
            var namaCabang = $filter('uppercase')($scope.namaDermaga);
            var reportDate = $filter('date')($scope.tanggalPerencanaan,'dd-MM-yyyy');
            var NIPP = localStorage.getItem('NIPP');
            var namaPetugas = localStorage.getItem('nama');
            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
            var counter = 0;

            var createTabelRow = function(kapal, no) { 
            	if(kapal.isMeetingSusulan == true){
            		var capMeetingSusulan = "\n Meeting Susulan";
            	}else if(kapal.isMeetingSusulan == false){
            		var capMeetingSusulan = "";
            	}else{
            		var capMeetingSusulan = "";
            	}

                if(kapal.flagTender == 1){
                    var captionTender = "\n (Tender";
                    if(kapal.kodeKapalTenderText != null){
                        captionTender += ' '+kapal.kodeKapalTenderText;
                    }
                    captionTender += ')';
                }else{
                    var captionTender = "";
                }
                var captionGandeng = '';
                if(kapal.pmhKapalGandengs.length > 0){
                    for (var i = 0; i < kapal.pmhKapalGandengs.length; i++) {
                        captionGandeng += kapal.pmhKapalGandengs[i].namaKapal;
                    }
                }

                if (no == 0) { counter = counter + 1; }
                var tabelRow = [
                    no != 0 ? "" : counter.toString(),
                    kapal.namaKapal + capMeetingSusulan,
                    kapal.namaAgen,
                    kapal.pbm,
                    kapal.panjangKapal.toString(),
                    kapal.kadeAwal + '-' + kapal.kadeAkhir,
                    //moment(kapal.mulai).format("MM/DD") +' - '+ moment(kapal.selesai).format("MM/DD"),
                    kapal.closing,
                    kapal.b.toString(),
                    kapal.m.toString(),
                    kapal.jenisMuatan,
                    kapal.keteranganExKapal + captionTender + '\n' + captionGandeng
                ];
                
                tabelRow.forEach(function(rowItem, index) {
                    if (rowItem == null) tabelRow[index] = '';
                });
                return tabelRow;
            }

            var createLL = function(data,m){
                var tabelRow = [
                    m.toString(),
                    data.kodeKapal+'\n'+data.namaKapal,
                    data.noPpk1,
                    data.noPpkJasa,
                    data.namaAgen,
                    data.kadeAwal+ ' - '+data.kadeAkhir,
                    $filter('date')(data.selesai,'dd-MM-yyyy HH:mm')                    
                ];
                
                return tabelRow;
            }
            $scope.bulanLaporan = function(data) {
                return (data.tglFilter === $scope.tanggalPerencanaan);
            };

            var no = 0;
            var laporanPrameeting = [];
            var laporanLastLine = [];
            var m = 0;
            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
       
            $scope.hasilPrameetingList.forEach(function(kapal, index) {
                no++;
                var a = kapal.dataKapal;
                for (var i = 0; i < a.length; i++) {
                	
                    var x = a[i];

                    var tabelRow = createTabelRow(x, i);
                   
                    laporanPrameeting.push(tabelRow);
                }
            });  

            $scope.kapalLL.forEach(function(ll, index) {
                m++
                var tabelRow = createLL(ll,m);                
                laporanLastLine.push(tabelRow);
            })
            
            var pdfContent = {
                pageSize: 'A4',
                pageOrientation: 'potrait',
                pageMargins: [20, 20, 20, 30],

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
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                    },
                    subheader2: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    subheader3: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'right',
                        margin: [0, 0, 0, 10]
                    },
                    tableHeader: {
                        color: '#000',
                        bold: true,
                        fontSize: 8,
                        alignment: 'center'
                    },
                    dataTable: {
                        color: '#000',
                        fontSize: 7,
                        margin: [0, 0, 0, 0]
                    },
                    footer: {
                        color: '#000',
                        margin: [20, 20, 20, 10],
                        fontSize: 8,
                        italics: true
                    },
                    footer2: {
                        alignment: 'center',
                        margin: [0, 50, 0, 0]
                    },
                    footer3: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'center'
                    },
                    footer4: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'center',
                        margin: [60, 0, 0, 0]
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
                content: [{
                        alignment: 'justify',
                        columns: [                          	
                            { text: namaCabang, style: 'subheader' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [                          
                            { text: reportDate, style: 'subheader'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [                          
                            { text:  'Dicetak : '+$filter('date')(new Date(),'HH:mm'), style: 'subheader3'}
                        ]
                    },
                    {
                        style: 'dataTable',
                        table: {
                            headerRows: 2,
                            pageBreak: 'before',
                            dontBreakRows: true,
                            widths: ['auto', 'auto','auto', 'auto',25,35,45, 'auto','auto', 'auto','auto'],
                            body: [
                                [
                                    { rowSpan : 2, text: 'No', alignment: 'center',style:'tableHeader' },
                                    { rowSpan : 2, text: 'Nama Kapal', alignment: 'center',style:'tableHeader'  },
                                    { rowSpan : 2, text: 'Agen', alignment: 'center',style:'tableHeader'  },
                                    { rowSpan : 2, text: 'PBM', alignment: 'center',style:'tableHeader'  },
                                    { rowSpan : 2, text: 'LOA', alignment: 'center' ,style:'tableHeader' },
                                    { rowSpan : 2, text: 'Posisi', alignment: 'center',style:'tableHeader'  },
                                    { rowSpan : 2, text: 'Closing', alignment: 'center'},
                                    { colSpan : 3, text: 'Muatan', alignment: 'center',style:'tableHeader' },
                                    {},
                                    {},
                                    { rowSpan : 2, text: 'Keterangan', alignment: 'center',style:'tableHeader' }
                                ],
                                [
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {text: 'B', alignment: 'center',style:'tableHeader' },
                                    {text: 'M', alignment: 'center',style:'tableHeader'},
                                    {text: 'JENIS MUATAN', alignment: 'center',style:'tableHeader' },
                                    {}
                                ]
                            ].concat(laporanPrameeting)
                        }
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer2' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            {},
                            { text: $scope.kota_meeting+', '+ $filter('date')(new Date(),'dd-MM-yyyy'), style: 'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            {},
                            { text: 'PETUGAS PERENCANAAN TAMBATAN', style: 'footer4'}
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
                            {},
                            { text: '', style: 'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '\n', style: 'footer2' }
                        ]
                    },
                    {
                        text: '',
                        pageOrientation: 'portrait',
                        pageBreak: 'after'
                    },
                    {
                        alignment: 'justify',
                        columns: [                          
                            { text: 'DAFTAR KAPAL KELUAR', style: 'subheader'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [                          
                            { text: 'Tanggal ' + $filter('date')(new Date(),'dd-MM-yyyy'), style: 'subheader'}
                        ]
                    },
                    {
                        style: 'dataTable',
                        table: {
                            body: [
                                [
                                    { text: 'No', alignment: 'center',style:'tableHeader' },
                                    { text: 'Nama Kapal', alignment: 'center',style:'tableHeader'  },
                                    { text: 'No. PPK1', alignment: 'center',style:'tableHeader'  },
                                    { text: 'No. PPK Jasa', alignment: 'center',style:'tableHeader'  },
                                    { text: 'Agen', alignment: 'center' ,style:'tableHeader' },
                                    { text: 'Posisi', alignment: 'center',style:'tableHeader'  },
                                    { text: 'Last Line', alignment: 'center'}
                                ],
                            ].concat(laporanLastLine)
                        }
                    }
                ],

            };

            pdfMake.createPdf(pdfContent).download("Lineup-Kapal"+" "+namaCabang+"-"+reportDate+".pdf");

        };

    /*export excel lineup*/
    $scope.exportExcel = function(e){
        //getting data from our table
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById('table_wrapper');    

        var table_html = table_div.outerHTML.replace(/ /g, '%20');
        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Lineup-Kapal'+' '+$scope.namaDermaga+"-"+$scope.tanggalPrameeting+'.xls';
        a.click();
    }
}]);

