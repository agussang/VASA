'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LaporanAirKapalCtrl
 * @description
 * # LaporanAirKapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('LaporanAirKapalCtrl',['$scope','$filter','$rootScope','ListCabang','LaporanAirKapal','LoadingScreen','PejabatPengesahanSearch','AppParam','GrandLaporanAirKapal','ParamsCabangList', '$http', 'API_PATH',function ($scope,$filter,$rootScope,ListCabang,LaporanAirKapal,LoadingScreen,PejabatPengesahanSearch,AppParam,GrandLaporanAirKapal,ParamsCabangList,$http,API_PATH) {
		LoadingScreen.show();
		$scope.currentCabang = $rootScope.namaCabang;

	$scope.search = {};
	$scope.items = [];
	$scope.itemsRegional = [];
	$scope.grandTotalBiayaRp = 0;
	$scope.grandTotalBiayaUsd = 0;
	$scope.grandTotalProdDalam = 0;
	$scope.grandTotalProdLuar = 0;
	var kota_meeting = '';
	var pejabatPengesahan = '';
	var namaJabatan = ''

	$scope.parent = {tanggal:''};
	var currentDate = new Date();

	//GET JENIS LAPORAN PARAMETER
	$scope.getParameterPeriode = function () {
		AppParam.get({nama:'PERIODE_LAP_AIRKAPAL'},function(response){
		$scope.periodeLaporan = response.content;
		LoadingScreen.hide();
		});
	};

	$scope.currentCabang = $filter('uppercase')($scope.currentCabang);
	$scope.getParameterPeriode();

    ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
        kota_meeting = response.content[0].value;
    });

    ParamsCabangList.get({nama : 'JBT_AIR_KAPAL'}, function(response){
        namaJabatan = response.content[0].value;
    });

  	ParamsCabangList.get({nama: 'PENGESAHAN_AIR_KAPAL'},function(response) {
    	pejabatPengesahan = response.content[0].value;
  	});

	$scope.$watch('laporanAirKapal.periodeLaporan', function(newValue) {
		if (newValue == 0) {
		$scope.search.tglLaporanHarian = $filter('date')(currentDate,'dd-MM-yyyy');
		} else if (newValue == 1) {
		$scope.search.tglLaporan = $filter('date')(currentDate,'MM-yyyy');
		}
	});

	$scope.$watch('search.tglLaporanHarian', function(newValue) {
		if(newValue){

			var splitDate = newValue.split('-');
			$scope.hariLaporan = splitDate[0];
			$scope.bulanLaporan = splitDate[1];
			// $scope.tahunLaporan = splitDate[2].toString().substr(2,2);
			$scope.tahunLaporan = splitDate[2];

			GrandLaporanAirKapal.get({
				tahun: $scope.tahunLaporan,
				bulan: $scope.bulanLaporan,
			},function(response){			
				response.listAirKapal.forEach(function(x){
					$scope.grandTotalBiayaUsd = $scope.grandTotalBiayaUsd + x.biayaUsd;
				})
				$scope.itemTemp = response.listAirKapal;
				$scope.itemTemp.forEach(function(response){
					response.tglPelayanan = $filter('date')(response.tglPelayanan,'dd-MM-yyyy');
				});

			$scope.items = $filter('filter')($scope.itemTemp, newValue);
			if($scope.items.length > 0){
				$scope.items .forEach(function(x){
					$scope.grandTotalBiayaUsd = $scope.grandTotalBiayaUsd + x.biayaUsd;
					$scope.grandTotalBiayaRp = $scope.grandTotalBiayaRp + x.biayaRp;
					$scope.grandTotalProdDalam = $scope.grandTotalProdDalam + x.prodDalam;
					$scope.grandTotalProdLuar = $scope.grandTotalProdLuar +x.prodLuar;
				});
			}else{
				$scope.grandTotalBiayaUsd = 0;
				$scope.grandTotalBiayaRp = 0;
				$scope.grandTotalProdDalam = 0;
				$scope.grandTotalProdLuar = 0;
			}	


			//add by Nurika for export excel regional
			$scope.itemsRegional = $filter('filter')($scope.itemTemp, newValue);
			if($scope.itemsitemsRegional.length > 0){
				$scope.itemsRegional .forEach(function(x){
					$scope.grandTotalBiayaUsd = $scope.grandTotalBiayaUsd + x.biayaUsd;
					$scope.grandTotalBiayaRp = $scope.grandTotalBiayaRp + x.biayaRp;
					$scope.grandTotalProdDalam = $scope.grandTotalProdDalam + x.prodDalam;
					$scope.grandTotalProdLuar = $scope.grandTotalProdLuar +x.prodLuar;
				});
			}else{
				$scope.grandTotalBiayaUsd = 0;
				$scope.grandTotalBiayaRp = 0;
				$scope.grandTotalProdDalam = 0;
				$scope.grandTotalProdLuar = 0;
			}	

	 	 });

			$scope.currentMonth = $filter('uppercase')($filter('date')($scope.search.tglLaporanHarian,'dd-MM-yyyy'));
		}
	});


	$scope.$watch('search.tglLaporan', function(newValue) {
		if(newValue) {
				var splitDate = newValue.split('-');
				$scope.bulanLaporan = splitDate[0];
				$scope.tahunLaporan = splitDate[1];
				// $scope.tahunLaporan = splitDate[1].toString().substr(2,2);

				GrandLaporanAirKapal.get({
					tahun: $scope.tahunLaporan,
					bulan: $scope.bulanLaporan,
				},function(response){
					$scope.grandTotalBiayaRp = response.grandTotalBiayaRp;
					$scope.grandTotalProdDalam = response.grandTotalProdDalam;
					$scope.grandTotalProdLuar = response.grandTotalProdLuar;
					response.listAirKapal.forEach(function(x){
						$scope.grandTotalBiayaUsd = $scope.grandTotalBiayaUsd + x.biayaUsd;
					})
					$scope.items = response.listAirKapal;
				});

				//add by Nurika isi pada itemsRegional
				var kodeRegional = localStorage.getItem('kodeRegional');
	            //var splitDate = $scope.search.tglFilter.split('-');
				var bulan = splitDate[0];
				var tahun = splitDate[1];
	            $http.get(API_PATH + 'public/permohonan/regional/report_air_kapal_with_total?kodeRegional=' + kodeRegional + '&tahun=' + tahun +'&bulan='+bulan)
	                .then(function (response) {
	                    if (response) {
							$scope.itemsRegional = response.data.listAirKapal;
	                    }
	            });



			var newDate = new Date(splitDate[1],splitDate[0]-1)
			$scope.currentMonth = $filter('uppercase')($filter('date')(newDate,'MMMM-yyyy'));
		}
	});

	$scope.$watch('laporanAirKapal.orderByTerminal', function(newValue) {
		if(newValue == true) {
			$scope.groupbyParameter = 'terminal';
			$scope.items = $filter('orderBy')($scope.items,'terminal');
			$scope.itemsRegional = $filter('orderBy')($scope.itemsRegional,'terminal');
		} else {
			$scope.groupbyParameter = '';
			$scope.itemsRegional = $filter('orderBy')($scope.itemsRegional,'tglPelayanan');
		}
	});

	$scope.reset = function(){
			$scope.search.tglLaporanHarian = "";
			$scope.search.tglLaporan = "";
			$scope.laporanAirKapal.penyusun ="";
			$scope.laporanAirKapal.jbtPenyusun ="";
			$scope.laporanAirKapal.pejabat ="";
			$scope.laporanAirKapal.orderByTerminal = false;
			$scope.getParameterPeriode();
	};

	$scope.getListOfPejabatpelabuhan = function(value) {
    if (value) {
     // var upper_value = $filter('uppercase')(value);
      return new Promise(function(resolve, reject) {
        PejabatPengesahanSearch.get({
          nama: value,
          limit: '10'
        }, function(response) {
           resolve(response);
        });
      });
    }
  };

	$scope.generatePdf = function() {
		var namaCabang = $filter('uppercase')($scope.currentCabang);
		var reportDate = $filter('uppercase')($scope.currentMonth);
		var penyusun = $scope.laporanAirKapal.penyusun;
		var jbtPenyusun = $scope.laporanAirKapal.jbtPenyusun;
		//var pejabat = $scope.laporanAirKapal.pejabat.namaTercetak;

		var NIPP = localStorage.getItem('NIPP');
		var namaPetugas = localStorage.getItem('nama');
		var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');
		var grandTotalBiayaUsd = ($filter('currency') ($scope.grandTotalBiayaUsd,"",2)).toString();
		var grandTotalBiayaRp = ($filter('currency') ($scope.grandTotalBiayaRp,"",2)).toString();
		var grandTotalProdDalam = $scope.grandTotalProdDalam.toString();
		var grandTotalProdLuar = $scope.grandTotalProdLuar.toString();

		var createTabelRow = function(item,no){
			var tabelRow = [
				no.toString(),
				item.namaKapal +'\n'+ item.noPpk1,
				item.jenisOperasi,
				item.namaAgen,
				item.terminal,
				$filter('date')(item.tglMulaiIsi,"dd-MM-yyyy HH:mm") +'\n s/d \n'+ $filter('date')(item.tglSelesaiIsi,"dd-MM-yyyy HH:mm"),
				{text:(item.prodDalam == null ? '0' : item.prodDalam.toString()),alignment : 'right'},
				{text:(item.prodLuar == null ? '0' : item.prodLuar.toString()),alignment : 'right'},
				{text:(item.biayaRp == null ? ($filter('currency') (0,"",2)).toString():($filter('currency') (item.biayaRp,"",2)).toString()), alignment : 'right'},
				{text:(item.biayaUsd == null ? ($filter('currency') (0,"",2)).toString():($filter('currency') (item.biayaUsd,"",2)).toString()), alignment : 'right'}
			];
			tabelRow.forEach(function(rowItem,index){
				if(rowItem == null) tabelRow[index] = '';
			});

			return tabelRow;
		}

		var no = 0;
		var laporanAirKapal = [];

		$scope.items.forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				laporanAirKapal.push(tabelRow);
		});

		$scope.itemsRegional.forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				laporanAirKapal.push(tabelRow);
		});
		
		var pdfContent = {
				pageSize: 'A4',
				pageOrientation: 'landscape',
				pageMargins: [ 40, 20, 20, 50 ],
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
							fontSize: 10,
							alignment: 'left'
						},
						subheader2: {
							bold: true,
							color: '#000',
							fontSize: 10,
							alignment: 'left',
							margin: [60, 0, 0, 0]
						},
						subheader3: {
							bold: true,
							color: '#000',
							fontSize: 10,
							alignment: 'left',
							margin: [60, 50, 0, 0]
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
							margin: [0, 20, 0, 8]
						},
						footer: {
							color: '#000',
							alignment: 'justify',
							margin: [20, 20, 20, 10],
							fontSize: 8,
							italics:true
						},
						footer2: {
	                        alignment: 'center',
	                        margin: [0, 40, 0, 0]
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
						footer:function(pagenumber, pagecount) {
        		return {
           		text:[
								{ text: 'Generated by ',style:'footer'},
								{ text: namaPetugas,style: 'footer'},
								{ text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
								{ text:' from VASA \n', style: 'footer' },
								{ text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
							],margin: [20, 20, 20, 10]
        		};
    		},
				content: [
					{
						alignment: 'justify',
						columns: [
							{	text: 'PT PELABUHAN INDONESIA III', style:'subheader'},
							"",
							""
						]
					},
						{
							alignment: 'justify',
							columns: [
								{	text: 'CABANG '+ namaCabang, style:'subheader'},
								"",
								""
							]
						},
						{ text: 'LAPORAN PRODUKSI DAN PENDAPATAN AIR KAPAL', fontSize: 12, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
						{ text: 'PERIODE BULAN '+ reportDate, fontSize: 12, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
							{
							style: 'dataTable',
							table:{
								headerRows: 1,
								pageBreak: 'before',
								dontBreakRows: true,
								body:[
									[
									{text:'NO', style:'tableHeader'},
									{text: 'NAMA KAPAL & NO PPK1', style:'tableHeader'},
									{text: 'JENIS OPERASI', style:'tableHeader'},
									{text: 'NAMA AGEN', style:'tableHeader'},
									{text: 'TERMINAL', style:'tableHeader'},
									{text: 'WAKTU PELAYANAN', style:'tableHeader'},
									{text: 'PROD DALAM', style:'tableHeader'},
									{text: 'PROD LUAR', style:'tableHeader'},
									{text: 'BIAYA \n(Rp)', style:'tableHeader'},
									{text: 'BIAYA \n(USD)', style:'tableHeader'}
								]
							 ].concat(laporanAirKapal).concat([
							 	[
									{text:'', colSpan: 6, style:'tableHeader'},
									{},
									{},
									{},
									{},
									{},
									{text: grandTotalProdDalam, style:'tableHeader', alignment:'right'},
									{text: grandTotalProdLuar, style:'tableHeader',  alignment:'right'},
									{text: grandTotalBiayaRp, style:'tableHeader',  alignment:'right'},
									{text: grandTotalBiayaUsd, style:'tableHeader',  alignment:'right'}
								]
							 ])
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
	                            { text: '', style: 'footer3' },
	                            { text: kota_meeting+', '+ $filter('date')(new Date(),'dd-MM-yyyy'), style: 'footer4'}
	                        ]
	                    },
	                    {
	                        alignment: 'justify',
	                        columns: [
	                            { text: 'Mengetahui / Menyetujui', style: 'footer3' },
	                            { text: 'Pembuat Daftar', style: 'footer4' }
	                        ]
	                    },
	                    {
	                        alignment: 'justify',
	                        columns: [
	                            { text: namaJabatan, style: 'footer3' },
	                            { text: jbtPenyusun, style: 'footer4' }
	                        ]
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
	                            { text: pejabatPengesahan,style: 'footer3'},
	                            { text: penyusun, style: 'footer4' }
	                        ]
	                    }
				],

		};

	pdfMake.createPdf(pdfContent).download('Laporan Produksi Air Kapal - ' + namaCabang +' - '+ reportDate +'.pdf');

	};

	$scope.generateExcel = function () {
		var namaCabang = $filter('uppercase')($scope.currentCabang);
		var reportDate = $filter('uppercase')($scope.currentMonth);

		var data_type = 'data:application/vnd.ms-excel';
		var table_div = document.getElementById('laporan-airkapal');

		var table_html = table_div.outerHTML.replace(/ /g, '%20');
		var a = document.createElement('a');
		a.href = data_type + ', ' + table_html;
		a.download = 'Laporan Produksi Air Kapal - ' + namaCabang + ' - ' + reportDate + '.xls';
		a.click();
	};

	//add by Nurika to check regional or not
        $scope.isRegional = function () {
            if (localStorage.getItem('statusUser') == 'regional') {
                return true;
            }
        }

        $scope.generateExcelRegional = function () {
            LoadingScreen.show();
            var kodeRegional = localStorage.getItem('kodeRegional');
            var splitDate = $scope.search.tglLaporan.split('-');
			var bulan = splitDate[0];
			var tahun = splitDate[1];
            
            //download excel 
            var blob = new Blob([document.getElementById('laporan-airkapal-regional').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
			});
			saveAs(blob, 'Laporan Produksi Air Kapal- ' + kodeRegional + ' - ' + tahun + ' - ' + bulan +'.xls');
			LoadingScreen.hide();
        };

}]);
