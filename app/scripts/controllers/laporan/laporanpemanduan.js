'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LaporanPemanduanCtrl
 * @description
 * # LaporanPemanduanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('LaporanPemanduanCtrl', ['$scope', '$rootScope', '$filter', '$controller', '$http','API_PATH','$timeout', 'LaporanPemanduanList', 'LaporanHarianPandu', 'ListCabang', 'LoadingScreen', 'AppParam', 'moment', 'ParamsCabangList', function ($scope, $rootScope, $filter, $controller, $http, API_PATH, $timeout, LaporanPemanduanList, LaporanHarianPandu, ListCabang, LoadingScreen, AppParam, moment, ParamsCabangList) {
	angular.extend(this, $controller('LaporanHarianPanduCtrl', {$scope: $scope})); 

	$scope.currentCabang = $rootScope.namaCabang;
	//$rootScope.isPusat = localStorage.getItem('isPusat');
	$scope.confirm = {};
	$scope.listCabang = [];
	$scope.search = {};
	$scope.currentCabang = $filter('uppercase')($scope.currentCabang);
	$scope.tabPanduHarian = "views/laporan/tablaporanpanduharian.html";
	$scope.tabPanduBulanan = "views/laporan/tablaporanpandubulanan.html";
	$scope.parent = { tanggal: '' };
	$scope.namaPandu ='';
	//$scope.noPkk ='';
	$scope.jabatanLaporanPemanduan = '';
	$scope.namaLaporanPemanduan = '';
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.statusUser = localStorage.getItem('statusUser');
	// document.getElementById("tabBulanan").style.display = "block";

	//get list cabang
	$scope.$watch('isPusat', function() {
		if($scope.isPusat !== null){
			ListCabang.get(function(response){
				$scope.listCabang = response;
			});
		} else {
			$scope.currentCabang ="";
		}
	});

	//get jenis gerakan
	AppParam.get({
		nama: 'JENIS_GERAKAN'
	}, function(response) {
		$scope.jenisGerakanOption = response.content;
	});

	var currentDate = new Date();
	$scope.search.tglFilter = $filter('date')(currentDate,'MM-yyyy');

  	$scope.items = [];
  	//add itemsPublic for export excel Regional
  	$scope.itemsPublic = [];

  $scope.reset = function(){
		$scope.search.tglFilter = "";
		$scope.searchTglMulai = new Date();
		$scope.searchJenisGerakan = '1';
	};

	$scope.nullChecking = function(data){
		data.forEach(function(element){
			element.noPpk1	= (element.noPpk1 !== null ?element.noPpk1:'-');
			element.namaKapal	= (element.namaKapal !== null ?element.namaKapal:'-');
			element.gtKapal	= (element.gtKapal !==null ?element.gtKapal:'-');
			element.loaKapal	= (element.loaKapal !== null ?element.loaKapal:'-');
			element.namaAgen	= (element.namaAgen !== null ?element.namaAgen:'-');
			element.jenisPelayaran	= (element.jenisPelayaran !== null ?element.jenisPelayaran:'-');
			element.trayek	= (element.trayek !== null ?element.trayek:'-');
			element.valuta	= (element.valuta !== null ?element.valuta:'-');
			element.jenisKapal	= (element.jenisKapal !== null ?element.jenisKapal:'-');
			element.bendera	= (element.bendera !== null ?element.bendera:'-');
			element.jenisGerakan	= (element.jenisGerakan !== null ?element.jenisGerakan:'-');
			element.pelabuhanAsal	= (element.pelabuhanAsal !== null ?element.pelabuhanAsal:'-');
			element.pelabuhanTujuan	= (element.pelabuhanTujuan !== null ?element.pelabuhanTujuan:'-');
			element.tglPermohonan	= (element.tglPermohonan !== null ?element.tglPermohonan:'-');
			element.tglPenetapan	= (element.tglPenetapan !== null ?element.tglPenetapan:'-');
			element.jamNaik	= (element.jamNaik !== null ?element.jamNaik:'-');
			element.jamKapalGerak	= (element.jamKapalGerak !== null ?element.jamKapalGerak:'-');
			element.jamTurun	= (element.jamTurun !== null ?element.jamTurun:'-');
			element.namaPandu	= (element.namaPandu !== null ?element.namaPandu:'-');
			element.wtp	= (element.wtp !== null ?element.wtp:'-');
			element.odb = (element.odb !== null ?element.odb:'-');
			element.tglFilter = $filter('date')(element.tglPermohonan,'MMMM-yyyy');
			element.noPkk	= (element.noPkk !== null ?element.noPkk:'-');
		}
	)};

	$scope.loadLaporanBulanan = function () {
		$scope.items = [];
		$scope.itemsPublic = [];
		// LoadingScreen.show();
		var splitDate = $scope.search.tglFilter.split('-');
		var bulan = splitDate[0];
		var tahun = splitDate[1];
		var namaPandu = $scope.search.namaPandu;
		var namaKapal = $scope.search.namaKapal;

		$scope.currentMonth = $filter('uppercase')($filter('date')(new Date(tahun, bulan-1), 'MMMM-yyyy'));

		LaporanPemanduanList.get({
			tahun: tahun,
			bulan: bulan,
			namaPandu: namaPandu,
			namaKapal: namaKapal,
			statusNota: $scope.search.statusNota
		}, function (response) {
			LoadingScreen.hide();
			response.forEach(function (item) {
				item.jamTurun = $filter('date')(item.jamTurun, 'HH:mm');
				item.jamNaik = $filter('date')(item.jamNaik, 'HH:mm')
			});
			$scope.items = response;
			$scope.nullChecking($scope.items);
		});


			//isi data itemsPublic pada tabel laporan-pemanduan-public
			var kodeRegional = localStorage.getItem('kodeRegional');
            var splitDate = $scope.search.tglFilter.split('-');
			var bulan = splitDate[0];
			var tahun = splitDate[1];
            $http.get(API_PATH + 'public/permohonan/regional/report_pemandu?kodeRegional=' + kodeRegional + '&tahun=' + tahun +'&bulan='+bulan)
                .then(function (response) {
                    if (response) {
                        $scope.itemsPublic = response.data;
                    }
                });
	};
	
	$timeout(function () {
		$scope.loadLaporanBulanan();
	}, 1000);

	AppParam.get({nama: "STATUS_NOTA_PEMANDUAN"}, function(response) {
		$scope.optionStatusNota = response.content;
	})

	ParamsCabangList.get({ nama: 'JBTN_LAP_PEMANDUAN' }, function (response) {
		if (response.content != undefined) {
			$scope.jabatanLaporanPemanduan = '-';
			if(response.content[0]){
				$scope.jabatanLaporanPemanduan = response.content[0].value;
			}
		} 
	});

	ParamsCabangList.get({ nama: 'NAMA_LAP_PEMANDUAN' }, function (response) {
		if (response.content != undefined) {
			$scope.namaLaporanPemanduan = '-';
			if(response.content[0]){
				$scope.namaLaporanPemanduan = response.content[0].value;	
			}
		}
	});
	
	$scope.generatePdf = function() {
		LoadingScreen.show();
			var NIPP = localStorage.getItem('NIPP');
			var namaPetugas = localStorage.getItem('nama');
			var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

			var namaCabang = $scope.currentCabang;

			var reportDate = $filter('uppercase')(moment($scope.search.tglFilter,'MM-YYYY').format('MMMM - YYYY'));

			var createTabelRow = function(item,no){
				var tabelRow = [
					no.toString(),
					item.noPpk1,
					item.namaKapal,
					JSON.stringify(item.gtKapal),
					$filter('currency')(JSON.stringify(item.loaKapal)), 
					item.namaAgen,
					item.jenisPelayaran,
					item.trayek,
					item.valuta,
					item.jenisKapal,
					item.bendera,
					item.jenisGerakan,
					item.kodeLokasiAsal,
					item.kodeLokasiTujuan,
					$filter('date')(item.tglPermohonan,'dd-MM-yyyy'),
					$filter('date')(item.tglPermohonan, 'HH:mm'),
					$filter('date')(item.tglPenetapan,'dd-MM-yyyy'),
					$filter('date')(item.tglPenetapan, 'HH:mm'),
					$filter('date')(item.jamNaik,'dd-MM-yyyy HH:mm'),
					$filter('date')(item.jamKapalGerak,'dd-MM-yyyy'),
					$filter('date')(item.jamKapalGerak, 'HH:mm'),
					$filter('date')(item.jamTurun,'dd-MM-yyyy HH:mm'),
					item.namaPandu,
					item.wtp,
					item.odb,
					$filter('date')(item.tglMulaiTunda, 'dd-MM-yyyy'),
					$filter('date')(item.tglMulaiTunda, 'HH:mm'),
					$filter('date')(item.tglSelesaiTunda, 'HH:mm'),
					item.noPkk,
					item.statusNota == true ? 'sudah nota': 'belum nota'
				];
				tabelRow.forEach(function(rowItem,index){
					if(rowItem === null) tabelRow[index] = '';
				});
				return tabelRow;

			}

			// $scope.substring = function(item){
			// 	var str=listKapalTunda.substring (0,1);
			// }

			$scope.bulanLaporan = function(data) {
				return (data.tglFilter === $scope.search.tglFilter);
			};

			var no = 0;
			var laporanPemanduan = [];

			$scope.items.forEach(function(item,index){
					no++;
					var tabelRow = createTabelRow(item,no);
					laporanPemanduan.push(tabelRow);
			});
			
			console.log(laporanPemanduan);
			var pdfContent = {
					pageSize: 'A3',
					pageOrientation: 'landscape',
					pageMargins: [ 20, 60, 40, 60 ],
					style: 'demoTable',
					styles: {
						header: {
							bold: true,
							color: '#000',
							fontSize: 14,
							alignment: 'center'
						},
						subheader: {
							bold: true,
							color: '#000',
							fontSize: 11,
							alignment: 'center'
						},
				      dataTable: {
				      color: '#000',
				      fontSize: 8,
							margin: [0, 20, 0, 8]
				      },
						footer: {
							color: '#000',
							alignment: 'justify',
							margin: [20, 20, 20, 10],
							fontSize: 10,
							italics:true
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
			      { text: 'LAPORAN KEGIATAN PEMANDUAN PT PELABUHAN INDONESIA III '+ namaCabang, style:'header'},
						{	text: reportDate, style:'header'},
						{
						style: 'dataTable',
						table:{
							headerRows: 1,
							pageBreak: 'before',
							//widths:['auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto'],
							dontBreakRows: true,
							body: [
							    [{
							      text: 'No', rowSpan:2
							    }, {
							      text: 'No. PPK1', rowSpan:2
							    }, {
							      text: 'Kapal', rowSpan: 2
							    }, {
							      text: 'GT', rowSpan: 2
							    }, {
							      text: 'LOA', rowSpan: 2
							    }, {
							      text: 'Nama Agen', rowSpan: 2
							    }, {
							  		text: 'Pelayaran', rowSpan: 2
							    }, {
							      text: 'Trayek', rowSpan: 2
							    }, {
							      text: 'Valuta', rowSpan: 2
							    }, {
							      text: 'Jenis Kapal', rowSpan: 2
							    }, {
							      text: 'Bendera', rowSpan: 2
							    }, {
							       text: 'Gerakan', rowSpan: 2
							    }, {
							      text: 'Lok Awal', rowSpan: 2
							    }, {
							      text: 'Lok Akhir', rowSpan: 2
									} , {
							      text: 'Permohonan', colSpan: 2, alignment:'center'
							    },{}, {
										text: 'Penetapan', colSpan: 2, alignment: 'center'
									}, {},  {
							      text: 'Pandu Naik', rowSpan: 2
									}, {
										text: 'Kapal Gerak', colSpan: 2, alignment: 'center'
									}, {} , {
							      text: 'Pandu Turun', rowSpan: 2
							    }, {
							      text: 'Nama Pandu', rowSpan: 2
							    }, {
							      text: 'Tunda', rowSpan: 2
									}, {
									  text: 'Tgl Tunda', rowSpan: 2
									}, {
									  text: 'Jam', colSpan: 2, alignment: 'center'
									}, {}, {
									  text: 'No. PKK', rowSpan: 2
									},{
									  text: 'Keterangan', rowSpan: 2
									},
								],
								[
									{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {
							  		text:'Tanggal'
									}, {
										text: 'Jam', width: 100
									}, {
							  		text: 'Tanggal'
									}, {
										text: 'Jam', width:100
									}, {} ,{
							  		text: 'Tanggal'
									}, {
										text: 'Jam', width: 100
									}, {}, {}, {}, {}, {
									  text: 'Mulai'
									}, {
									  text: 'Selesai'
									}, {}
									]
								] 
							.concat(laporanPemanduan)
						}
						}, {
							alignment: 'center',
							columns: [
								{
									text: $scope.jabatanLaporanPemanduan, style: 'subheader', width: 400
								},
								{
					
								}
							]
						},
						{
							alignment: 'center',
							columns: [
								{ text: $scope.namaLaporanPemanduan, style: 'subheader', width: 400, margin: [0, 30, 0, 0] },
								{

								}
							]
						}
				]
			};
			LoadingScreen.hide();
		pdfMake.createPdf(pdfContent).download('Laporan Kegiatan Pemanduan - ' + namaCabang +' - '+ reportDate +'.pdf');
	};

	$scope.generateExcel = function () {
		var namaCabang = $filter('uppercase')($scope.currentCabang);
		var reportDate = $filter('uppercase')($scope.search.tglFilter);
		
		var blob = new Blob([document.getElementById('tabel-kegiatan-pemanduan').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, 'Laporan Kegiatan Pemanduan - ' + namaCabang + ' - ' + reportDate + '.xls');
	};


	// $scope.generateExcelRegionalBulanan = function (){
	// 	var kodeRegional = localStorage.getItem('kodeRegional');
 	//        var splitDate = $scope.search.tglFilter.split('-');
	// 	var bulan = splitDate[0];
	//     var tahun = splitDate[1];

	//     var blob = new Blob([document.getElementById('tabel-kegiatan-pemanduan').innerHTML], {
	// 		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
	// 	});
	// 	saveAs(blob, 'Laporan Kegiatan Pemanduan - ' + kodeRegional + ' - ' + tahun + ' - ' + bulan +'.xls');
	// }

	//add by Nurika to check regional or not
        $scope.isRegional = function () {
            if (localStorage.getItem('statusUser') == 'regional') {
                return true;
            }
        }

        $scope.generateExcelRegionalBulanan = function () {
            LoadingScreen.show();
            var kodeRegional = localStorage.getItem('kodeRegional');
            var splitDate = $scope.search.tglFilter.split('-');
			var bulan = splitDate[0];
			var tahun = splitDate[1];

			//download excel 
            var blob = new Blob([document.getElementById('tabel-kegiatan-pemanduan-public').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
			});
			saveAs(blob, 'Laporan Kegiatan Pemanduan - ' + kodeRegional + ' - ' + tahun + ' - ' + bulan +'.xls');
			LoadingScreen.hide();
        	};
}]);
