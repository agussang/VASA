
'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LaporanPemanduanharianCtrl
 * @description
 * # LaporanPemanduanharianCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('LaporanHarianPanduCtrl',['$scope','$routeParams','$location','$filter','$route','$controller','$timeout','$rootScope','UserRole','LoadingScreen','LaporanHarianPandu','ParamsCabangSearch', function ($scope,$routeParams,$location,$filter,$route,$controller,$timeout,$rootScope,UserRole,LoadingScreen,LaporanHarianPandu,ParamsCabangSearch) {
	$scope.searchTglMulai = new Date();
	$scope.searchJenisGerakan = '1';
	$scope.jenisGerakanText = 'MASUK';
	$scope.itemHarianPandu = [];

	ParamsCabangSearch.get({
	    nama: 'SPV_TLKO'
	},function(response) {
		$scope.spvTLKO = response[0].value;
	});

	ParamsCabangSearch.get({
	    nama: 'ASMAN_PMD_TLKO'
	},function(response) {
		$scope.asmanPmdTLKO = response[0].value;
	});

	$scope.getDataLaporanHarianPandu = function(){
		var tglPandu = $filter('date')($scope.searchTglMulai,'yyyy-MM-dd');
		LaporanHarianPandu.get({
			tglPandu : tglPandu,
			jenisGerakan : $scope.searchJenisGerakan
		},function(response){
			response.forEach(function(item) {
				item.kodePandu = item.kodePandu?item.kodePandu:'-';
				item.listKapalTunda = String(item.listKapalTunda);
				item.listKapalTundaText = item.listKapalTunda.indexOf("null")===-1?item.listKapalTunda:'-';
				item.jamTurun = item.jamTurun?$filter('date')(item.jamTurun,'HH:mm'):'-';
				item.jamNaik = item.jamNaik?$filter('date')(item.jamNaik,'HH:mm'):'-';
				item.jamMulaiTunda = item.tglMulaiTunda?$filter('date')(item.tglMulaiTunda,'HH:mm'):'-';
				item.jamSelesaiTunda = item.tglSelesaiTunda?$filter('date')(item.tglSelesaiTunda,'HH:mm'):'-';
				item.tglPermohonan = item.tglPermohonan?$filter('date')(item.tglPermohonan,'dd-MM-yyyy HH:mm'):'-';
				item.tglPenetapan = item.tglPenetapan?$filter('date')(item.tglPenetapan,'dd-MM-yyyy HH:mm'):'-';
				if(item.statusNota){
					item.statusNotaText = "NOTA";
				}else{
					item.statusNotaText = "BELUM NOTA";
				}
			});
			$scope.itemHarianPandu = response;
			$scope.nullChecking($scope.itemHarianPandu);
		});
  	}

  	$scope.getDataLaporanHarianPandu();

	$scope.$watch('searchTglMulai', function(newValue, oldValue) {
		LoadingScreen.show();
		$scope.getDataLaporanHarianPandu();
		LoadingScreen.hide();
	});

	$scope.$watch('searchJenisGerakan', function(newValue, oldValue) {
		$scope.searchJenisGerakan = newValue;
		if($scope.searchJenisGerakan === '1'){
			$scope.jenisGerakanText = 'MASUK';
		}else if($scope.searchJenisGerakan === '3'){
			$scope.jenisGerakanText = 'KELUAR';
		}else{
			$scope.jenisGerakanText = 'PINDAH';
		}
		$scope.getDataLaporanHarianPandu();
	});

	var createTabelRow = function(item,no){
		var tabelRow = [
			no.toString(),
			item.namaKapal,
			item.namaAgen,
			{ text: item.kodePandu, alignment: 'center' },
			{ text: item.jamNaik, alignment: 'center' },
			{ text: item.jamTurun, alignment: 'center' },
			{ text: item.listKapalTundaText, alignment: 'center' },
			{ text: item.jamMulaiTunda, alignment: 'center' },
			{ text: item.jamSelesaiTunda, alignment: 'center' },
			{ text: item.kodeLokasiAsal, alignment: 'center' },
			{ text: item.kodeLokasiTujuan, alignment: 'center' },
			{ text: item.noPpk1?item.noPpk1:' - ', alignment: 'center' },
			{ text: item.tglPermohonan, alignment: 'center' },
			{ text: item.tglPenetapan, alignment: 'center' },
			{ text: item.statusNotaText?item.statusNotaText:' - ', alignment: 'center' },
		];
		tabelRow.forEach(function(rowItem,index){
			if(rowItem === null) tabelRow[index] = '';
		});
		return tabelRow;
	}

	$scope.bulanLaporan = function(data) {
		return (data.tglFilter === $scope.search.tglFilter);
	};

  	$scope.exportHarianPanduPDF = function(exportType) {
  		/*
			Keterangan exportType :
			1 : Download
			2 : Print
  		*/
		var NIPP = localStorage.getItem('NIPP');
		var namaPetugas = localStorage.getItem('nama');
		var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');
		var today = $filter('date')(Date.now(),'dd-MM-yyyy');
		$scope.laporanHarian = [];
		var externalDataRetrievedFromServer=[];
		var namaCabang = $scope.currentCabang;
		var reportDate = $filter('uppercase')($scope.search.tglFilter);
		var no = 0;
		var laporanPemanduan = [];

		$scope.itemHarianPandu.forEach(function(item,index){
			no++;
			var tabelRow = createTabelRow(item,no);
			laporanPemanduan.push(tabelRow);
		});

		var pdfContent = {
				pageSize: 'A4',
				pageOrientation: 'landscape',
				pageMargins: [ 15, 20, 60, 40 ],

				// pageMargins: [ 15, 10, 60, 10 ],
				style: 'demoTable',
				styles: {
					header: {
						bold: true,
						color: '#000',
						fontSize: 12,
						alignment: 'center'
					},
					header_title: {
						bold: true,
						color: '#000',
						fontSize: 12,
						alignment: 'left',
						italics:true
					},
			      	dataTable: {
			        	color: '#000',
			        	fontSize: 6,
						margin: [0, 20, 0, 8]
			      	},
			      	dataTableFooter: {
			        	fontSize: 10,
			        	bold: true,
			        	pageBreak: 'after',
			        	// margin: [0, 0, 0, 8]
			      	},
					footer: {
						color: '#000',
						alignment: 'justify',
						margin: [20, 20, 20, 10],
						fontSize: 8,
						italics:true
					}
				},
				footer:function(pagenumber, pagecount) {
					console.log(pagenumber)
					console.log(pagecount)
					return {
	   				text:[	
	   						// { text: 'Mengetahui', alignment: 'center'}, '', '', {text: 'Surabaya, '+today, alignment: 'center'},
							{ text: 'Generated by ',style:'footer'},
							{ text: namaPetugas,style: 'footer'},
							{ text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
							{ text:' from VASA \n', style: 'footer' },
							{ text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
						],margin: [20, 20, 20, 20]
					}
					;
				},
		    content: [
				{
					text: 'PT.(PERSERO) PELABUHAN INDONESIA III',
					style: 'header_title'
				},
				{
					text: 'CABANG '+$rootScope.namaCabang,
					style: 'header_title'
				},
				{
					text: 'LAPORAN HARIAN KAPAL '+$scope.jenisGerakanText,
					style: 'header'
				},
				{
					text: $filter('date')($scope.searchTglMulai,'dd-MM-yyyy'),
					style: 'header'
				},
				{
					style: 'dataTable',
					table: {
						widths: [10, 100, 100, 20, 30, 30, 100, 30, 30, 30, 30, 50, 35, 35, 50],
						headerRows: 2,
						body: [
							[
								{ rowSpan : 2, text: 'No.', alignment: 'center', valign: 'top' },
								{ rowSpan : 2, text: 'Nama Kapal', alignment: 'center' },
								{ rowSpan : 2, text: 'Agen', alignment: 'center' },
								{ rowSpan : 2, text: 'Kode Pandu', alignment: 'center' },
								{ colSpan : 2, text: 'Jam Pandu', alignment: 'center' },
								{},
								{ rowSpan : 2, text: 'Tunda', alignment: 'center' },
								{ colSpan : 2, text: 'Jam Tunda', alignment: 'center' },
								{},
								{ colSpan : 2, text: 'Posisi', alignment: 'center' },
								{},
								{ rowSpan : 2, text: 'No. PPK1', alignment: 'center' },
								{ rowSpan : 2, text: 'Tgl. Permohonan', alignment: 'center' },
								{ rowSpan : 2, text: 'Tgl. Penetapan', alignment: 'center' },
								{ rowSpan : 2, text: 'Ket', alignment: 'center' }
							],
							[
								{},
								{},
								{},
								{},
								{ text: 'Naik', alignment: 'center' },
								{ text: 'Turun', alignment: 'center' },
								{},
								{ text: 'Mulai', alignment: 'center' },
								{ text: 'Sampai', alignment: 'center' },
								{ text: 'Dari', alignment: 'center' },
								{ text: 'Ke', alignment: 'center' },
								{},
								{},
								{},
								{}
							],[
								{ text: '1', alignment: 'center' },
								{ text: '2', alignment: 'center' },
								{ text: '3', alignment: 'center' },
								{ text: '4', alignment: 'center' },
								{ text: '5', alignment: 'center' },
								{ text: '6', alignment: 'center' },
								{ text: '7', alignment: 'center' },
								{ text: '8', alignment: 'center' },
								{ text: '9', alignment: 'center' },
								{ text: '10', alignment: 'center' },
								{ text: '11', alignment: 'center' },
								{ text: '12', alignment: 'center' },
								{ text: '13', alignment: 'center' },
								{ text: '14', alignment: 'center' },
								{ text: '15', alignment: 'center' },
							]
						].concat(laporanPemanduan)
					}
				},
				{
					style: 'dataTableFooter',
					table: {
						widths: [300, '*', 200, 300],
						body: [
							['', '', '', '' ],
							[{text: 'Mengetahui', alignment: 'center'}, '', '', {text: 'Surabaya, '+today, alignment: 'center'} ],
							[{text: 'ASISTEN MANAJER PEMANDUAN & TELEKOMUNIKASI', alignment: 'center'}, {text: ''}, {text: ''}, {text: 'SUPERVISOR TELEKOMUNIKASI', alignment: 'center'}],
							['\n\n\n\n', '', '', '' ],
							[{text: $scope.asmanPmdTLKO, alignment: 'center', decoration: 'underline'}, '', '', {text: $scope.spvTLKO, alignment: 'center', decoration: 'underline'} ],
						]
					},	
					layout: 'noBorders'
				}
			]
		};
		if(exportType==1){
			pdfMake.createPdf(pdfContent).download('Laporan Kegiatan Harian Kepanduan - ' + namaCabang +' - '+ $filter('date')($scope.searchTglMulai,'dd-MM-yyyy') +'.pdf');
		}else{
			pdfMake.createPdf(pdfContent).print('Laporan Kegiatan Harian Kepanduan - ' + namaCabang +' - '+ $filter('date')($scope.searchTglMulai,'dd-MM-yyyy') +'.pdf');
		}
	};

	$scope.generateExcel = function () {
		var namaCabang = $filter('uppercase')($scope.currentCabang);
		var reportDate = $filter('uppercase')($scope.search.tglFilter);

		var data_type = 'data:application/vnd.ms-excel';
		var table_div = document.getElementById('tabel-kegiatan-harian');

		var table_html = table_div.outerHTML.replace(/ /g, '%20');
		var a = document.createElement('a');
		a.href = data_type + ', ' + table_html;
		a.download = 'Laporan Kegiatan Harian Kepanduan - ' + namaCabang + ' - ' + $filter('date')($scope.searchTglMulai, 'dd-MM-yyyy') + '.xls';
		a.click();

	};
}]);