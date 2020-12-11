'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LaporanHarianCtrl
 * @description
 * # LaporanHarianCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('LaporanHarianCtrl',['$scope','$rootScope','$filter','LaporanHarianList','ListCabang','LoadingScreen',function ($scope,$rootScope,$filter,LaporanHarianList,ListCabang,LoadingScreen) {
	LoadingScreen.show();
	$scope.currentCabang = $rootScope.namaCabang;
	$scope.confirm = {};
	$scope.listCabang = [];
	
	$scope.search = {};

	$scope.parent = {tanggal:''};
	var currentDate = new Date();
	$scope.search.tglFilter = $filter('date')(currentDate,'MMMM-yyyy');

	$scope.items = [];

	$scope.nullChecking = function(data){
		data.forEach(function(element) {
			element.kemasanMuat	= (element.kemasanMuat !== null ?element.kemasanMuat:'-');
			element.tglKedatangan	= (element.tglKedatangan !== null ?element.tglKedatangan:'-');
			element.gts	= (element.gts !== null ?element.gts:'-');
			element.tglTambat	= (element.tglTambat !== null ?element.tglTambat:'-');
			element.lamaPandu	= (element.lamaPandu !== null ?element.lamaPandu:'-');
			element.lamaTambat	= (element.lamaTambat !== null ?element.lamaTambat:'-');
			element.tglFilter = $filter('date')(element.tglPandu,'MMMM-yyyy');
		});
	};

  LaporanHarianList.get(function(response){
		LoadingScreen.hide();
		$scope.items = response;
		//console.log(response);
		//untuk filter nama dermaga, jika kapal masuk -> nama dermaga = nama dermaga tujuan, jika kapal keluar nama dermaga = nama dermaga asal
		$scope.nullChecking($scope.items);
  });

	//filter luarNegeriDermagaUmum
	$scope.luarNegeriDermagaUmum = function(data){
		return (data.jenisPelayaran === 'LUARNEGERI' &&
				data.jenisDermagaTujuan ==='DMGUMUM') ||
				(data.jenisPelayaran === 'LUARNEGERI' &&
					 data.jenisDermagaAsal ==='DMGUMUM') ;
			};

	//filter luarNegeriDermagaKhusus
	$scope.luarNegeriDermagaKhusus = function(data){
		return (data.jenisPelayaran === 'LUARNEGERI' &&
				data.jenisDermagaTujuan ==='DMGKHUSUS') ||
				(data.jenisPelayaran === 'LUARNEGERI' &&
				data.jenisDermagaAsal ==='DMGKHUSUS');
			};
			
	//filter dalamNegeriDermagaUmum
	$scope.dalamNegeriDermagaUmum = function(data){
		return (data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaTujuan ==='DMGUMUM') ||
				(data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaAsal ==='DMGUMUM');
			};

	//filter dalamNegeriDermagaKhusus
	$scope.dalamNegeriDermagaKhusus = function(data){
		return (data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaTujuan ==='DMGKHUSUS') ||
				(data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaAsal ==='DMGKHUSUS');
			};

	//filter dalamNegeriAreaLabuh
	$scope.dalamNegeriAreaLabuh = function(data){
		return (data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaTujuan ==='AREALABUH') ||
				(data.jenisPelayaran === 'DLMNEGERI' &&
				data.jenisDermagaAsal ==='AREALABUH');
			};

	//filter luarNegeriAreaLabuh
	$scope.luarNegeriAreaLabuh = function(data){
		return (data.jenisPelayaran === 'LUARNEGERI' &&
				data.jenisDermagaTujuan ==='AREALABUH') ||
				(data.jenisPelayaran === 'LUARNEGERI' &&
				data.jenisDermagaAsal ==='AREALABUH');
			};

		//filter tanggal
		$scope.bulanLaporan = function(data) {
			return (data.tglFilter === $scope.search.tglFilter);
		};

	$scope.reset = function(){
		$scope.search.tglFilter = "";
	};

	$scope.generatePdf = function(){
		var NIPP = localStorage.getItem('NIPP');
		var namaPetugas = localStorage.getItem('nama');
		var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

		var createTabelRow = function(item,no){
			var tabelRow = [
				no.toString(),
				item.namaKapal,
				item.jenisKapal,
				item.kemasanBongkar +' - '+ item.kemasanMuat,
				item.namaAgen,
				$filter('currency')(item.jumlahBongkar,"",0),
				$filter('currency')(item.jumlahMuat,"",0),
				$filter('date')(item.tglKedatangan,'dd-MM-yyyy HH:mm:ss'),
				item.pelabuhanAsal + '-' + item.pelabuhanTujuan,
				item.bendera,
				$filter('currency')(item.gtKapal,"",0),
				$filter('currency')(item.loaKapal,"",0),
				'-',
				item.jenisGerakan,
				$filter('date')(item.tglPenetapan,'dd-MM-yyyy HH:mm:ss'),
				$filter('date')(item.jamNaik,'dd-MM-yyyy HH:mm:ss'),
				$filter('date')(item.jamTurun,'dd-MM-yyyy HH:mm:ss'),
				$filter('date')(item.tglTambat,'dd-MM-yyyy HH:mm:ss'),
				item.lamaPandu,
				item.lamaTambat,
				''
			];
			tabelRow.forEach(function(rowItem,index){
				if(rowItem == null) tabelRow[index] = '';
			});
			return tabelRow;
		}

		var no = 0;
		var luarNegeriDermagaUmum = [];
		$scope.items.filter($scope.luarNegeriDermagaUmum).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				luarNegeriDermagaUmum.push(tabelRow);
		});

		var luarNegeriDermagaKhusus = [];
		no = 0;
		$scope.items.filter($scope.luarNegeriDermagaKhusus).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				luarNegeriDermagaKhusus.push(tabelRow);
		});

		var dalamNegeriDermagaUmum = [];
		no = 0;
		$scope.items.filter($scope.dalamNegeriDermagaUmum).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				dalamNegeriDermagaUmum.push(tabelRow);
		});

		var dalamNegeriDermagaKhusus = [];
		no = 0;
		$scope.items.filter($scope.dalamNegeriDermagaKhusus).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				dalamNegeriDermagaKhusus.push(tabelRow);
		});

		var luarNegeriAreaLabuh = [];
		no = 0;
		$scope.items.filter($scope.luarNegeriAreaLabuh).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				luarNegeriAreaLabuh.push(tabelRow);
		});

		var dalamNegeriAreaLabuh = [];
		no = 0;
		$scope.items.filter($scope.dalamNegeriAreaLabuh).filter($scope.bulanLaporan).forEach(function(item,index){
				no++;
				var tabelRow = createTabelRow(item,no);
				dalamNegeriAreaLabuh.push(tabelRow);
		});

		var namaCabang = $scope.currentCabang;
		var reportDate = $filter('uppercase')($scope.search.tglFilter);

		var contentPDF = {
			pageSize: 'A4',
			pageOrientation: 'landscape',
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
					tableHeader: {
						color: '#000',
						bold: true,
						fontSize: 8,
						alignment: 'center'
					},
					dataTable: {
						color: '#000',
						fontSize: 6,
						margin: [0, 20, 0, 8]
					},
					footer: {
						color: '#000',
						alignment: 'justify',
						margin: [20, 20, 20, 10],
						fontSize: 8,
						italics: true
						}
				},
				layout: {
														hLineWidth: function(i, node) {
																return (i === 0 || i === node.table.body.length) ? 2 : 1;
														},
														vLineWidth: function(i, node) {
																return (i === 0 || i === node.table.widths.length) ? 2 : 1;
														},
														hLineColor: function(i, node) {
																return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
														},
														vLineColor: function(i, node) {
																return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
														},
														// paddingLeft: function(i, node) { return 4; },
														// paddingRight: function(i, node) { return 4; },
														// paddingTop: function(i, node) { return 2; },
														// paddingBottom: function(i, node) { return 2; }
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
					text: 'LAPORAN BULANAN KAPAL PT PELABUHAN INDONESIA III '+namaCabang,
					style: 'header'
				},
				{
					text: 'BULAN '+reportDate,
					style: 'header'
				},
				{
					style: 'dataTable',
					table: {
						headerRows: 2,
						body: [
							[
								{ rowSpan : 2, text: 'No', alignment: 'center' },
								{ rowSpan : 2, text: 'Nama Kapal', alignment: 'center' },
								{ rowSpan : 2, text: 'Jenis Kapal', alignment: 'center' },
								{ rowSpan : 2, text: 'Jenis Muatan (Bongkar/Muat)', alignment: 'center' },
								{ rowSpan : 2, text: 'Agen', alignment: 'center' },
								{ colSpan : 2, text: 'Rencana B/M', alignment: 'center' },
								{},
								{ rowSpan : 2, text: 'Kedatangan', alignment: 'center' },
								{ rowSpan : 2, text: 'Pel Asal - Pel Tujuan', alignment: 'center' },
								{ rowSpan : 2, text: 'Bendera', alignment: 'center' },
								{ rowSpan : 2, text: 'GRT', alignment: 'center' },
								{ rowSpan : 2, text: 'LOA', alignment: 'center' },
								{ rowSpan : 2, text: 'GTS', alignment: 'center' },
								{ rowSpan : 2, text: 'Grk', alignment: 'center' },
								{ rowSpan : 2, text: 'Penetapan', alignment: 'center' },
								{ colSpan : 2, text: 'Pelayanan Pandu', alignment: 'center' },
								{},
								{ rowSpan : 2, text: 'Kapal Sandar', alignment: 'center' },
								{ rowSpan : 2, text: 'W Time Pandu', alignment: 'center' },
								{ rowSpan : 2, text: 'W Time Tambat', alignment: 'center' },
								{ rowSpan : 2, text: 'Ket', alignment: 'center' }
							],
							[
								{},
								{},
								{},
								{},
								{},
								{ text: 'Bongkar (Ton/M)', alignment: 'center' },
								{ text: 'Muat (Ton/M)', alignment: 'center' },
								{ text: 'Tgl/Jam', alignment: 'center' },
								{},
								{},
								{},
								{},
								{},
								{},
								{ text: 'Tgl/Jam (PPKB)', alignment: 'center' },
								{ text: 'Tgl/Jam Naik', alignment: 'center' },
								{ text: 'Tgl/Jam Turun', alignment: 'center' },
								{ text: 'Tgl/Jam', alignment: 'center' },
								{ text: 'W Time Pandu', alignment: 'center' },
								{ text: 'W Time Tambat', alignment: 'center' },
								{ text: 'Ket', alignment: 'center' }
							],
							[ '', {text: 'A. KAPAL LUAR NEGERI', bold: true, fontSize:10}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ],
							[ '', {text:'1. DERMAGA UMUM',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						].concat(luarNegeriDermagaUmum).
						concat([
							[ '', {text:'2. DERMAGA DUKS',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						])
						.concat(luarNegeriDermagaKhusus).concat([
							[ '', {text:'3. REDE/RELOADING POINT',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						])
						.concat(luarNegeriAreaLabuh).
						concat([
							[ '', {text: 'B. KAPAL LUAR NEGERI', bold: true, fontSize:10}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ],
							[ '', {text:'1. DERMAGA UMUM',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						]).concat(dalamNegeriDermagaUmum).concat([
							[ '', {text:'2. DERMAGA DUKS',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						]).concat(dalamNegeriDermagaKhusus).concat([
							[ '', {text:'3. REDE/RELOADING POINT',bold: true, fontSize:9}, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ]
						]).concat(dalamNegeriAreaLabuh)
					}
				}
			]
		};
		pdfMake.createPdf(contentPDF).download('Laporan Bulanan Kapal - ' + namaCabang + ' - ' + reportDate +'.pdf');
	};

		$scope.generateExcel = function () {
			var namaCabang = $filter('uppercase')($scope.currentCabang);
			var reportDate = $filter('uppercase')($scope.search.tglFilter);
			
			var data_type = 'data:application/vnd.ms-excel';
			var table_div = document.getElementById('tabel-laporan-harian');

			var table_html = table_div.outerHTML.replace(/ /g, '%20');
			var a = document.createElement('a');
			a.href = data_type + ', ' + table_html;
			a.download = 'Laporan Bulanan Kapal - ' + namaCabang + ' - ' + reportDate + '.xls';
			a.click();
		};

}]);
