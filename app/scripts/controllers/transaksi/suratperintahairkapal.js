'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:SuratPerintahAirKapalCtrl
 * @description
 * # SuratPerintahAirKapalCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('SuratPerintahAirKapalCtrl', ['$scope','$filter','$http','$rootScope','$routeParams','$location','SuratPerintahAirKapal','MdmCabangSearch','LoadingScreen','ParamsCabangSearch','ParamsCabangList',function ($scope,$filter,$http,$rootScope,$routeParams,$location,SuratPerintahAirKapal,MdmCabangSearch,LoadingScreen,ParamsCabangSearch,ParamsCabangList) {
	 LoadingScreen.show();
   $scope.item = {};
   $scope.currentCabang = $rootScope.namaCabang;
   $scope.tglHariIni = new Date();

	var kodeCabang = localStorage.getItem('kodeCabang');
  $scope.kota_meeting = '';
	 $scope.titleCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

  ParamsCabangSearch.get({
    nama: 'PENGESAHAN_AIR_KAPAL'
  },function(response) {
    $scope.pejabatPengesahan = response[0].value;
  });

  ParamsCabangSearch.get({
    nama: 'JBT_AIR_KAPAL'
  },function(response) {
    $scope.namaJabatan = response[0].value;
  });

  ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
      $scope.kota_meeting = response.content[0].value;
  });

	MdmCabangSearch.get({
		kodeCabang 	: parseInt(kodeCabang)
	},
	function(response){
		//console.log(response);
		$scope.item.kota = response[0].kotaPelb;
    $scope.namaKotaTitleCase = $scope.item.kota === (null || undefined) ? "": $scope.titleCase($scope.item.kota);
		LoadingScreen.hide();
	});

  SuratPerintahAirKapal.get({noPpkJasa:$routeParams.noPpkJasa}, function(response){
      $scope.item = response;
      //console.log(response)
   });

  $scope.namaCabangTitle =  $scope.titleCase($scope.currentCabang);


  $scope.close =  function(){
		$location.path('/transaksi/listmonitoring');
	}

  $scope.generate = function() {

    var namaCabang = $scope.currentCabang;
    var namaCabangTitleCase = $scope.namaCabangTitle;
    var noPpk1 = $scope.item.noPpk1;
    var tglPermohonan = $filter('date')($scope.item.tglPermohonan,'dd-MM-yyyy');
    var namaKapal = $scope.item.namaKapal;
    var bendera = $scope.item.bendera;
    var namaDermaga = $scope.item.namaDermaga;
    var namaAgen = $scope.item.namaAgen;
    var tglMulaiIsi = $filter('date')($scope.item.tglMulaiIsi,'dd-MM-yyyy');
    var jamMulaiIsi = $filter('date')($scope.item.tglMulaiIsi,'HH:mm');
    var alatIsi = $scope.item.alatIsi;
    var tglSurat = $filter('date')($scope.item.tglSurat,'dd-MM-yyyy');
    var volume = $scope.item.volume;
    var volumeWords = $scope.item.volumeWords;

    var pdfContent = {
				pageSize: 'A4',
				pageOrientation: 'potrait',
				pageMargins: [20, 20, 40, 60],
				styles: {
						header: {
							bold: true,
							color: '#000',
							fontSize: 12,
							alignment: 'center',
              margin: [0, 10, 0, 20]
						},
						subheader: {
							bold: true,
							color: '#000',
							fontSize: 10,
							alignment: 'left',
              margin: [0, 0, 0, 5]
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
							fontSize: 10,
							alignment: 'center'
						},
						content: {
							color: '#000',
							fontSize: 10,
							margin: [0, 5, 0, 5]
						}
					},

				content: [
					{
						alignment: 'justify',
						columns: [
							{ text: 'PT.(PERSERO) PELABUHAN INDONESIA III\n', style: 'subheader' }
						]
					},
          {
            alignment: 'justify',
            columns: [
                  { text: 'CABANG '+ namaCabang, style: 'subheader' }
            ]
          },
						{	text: 'SURAT PERINTAH KERJA / PELAYANAN AIR', style:'header'},
            {
  						alignment: 'justify',
  						columns: [
                {width: 30, text:''},
  							{	text: 'Berdasarkan permohonan nomor  ' + noPpk1 + ' tanggal '+ tglPermohonan, style:'content'}
  						]
  					},
            {	text: 'Diperintahkan agar  :', style:'content'},
            {
  						alignment: 'left',
  						columns: [
                {width: 30, text:''},
  							{width: 90,	text: 'Untuk kapal ' , style:'content'},
                {	text: ':   ' + namaKapal, style:'content'}
  						]
  					},
            {
  						alignment: 'left',
  						columns: [
                {width: 30, text:''},
  							{width: 90,	text: 'Bendera ' , style:'content'},
                {	text: ':   ' + bendera, style:'content'}
  						]
  					},
            {
  						alignment: 'left',
  						columns: [
                {width: 30, text:''},
  							{width: 90,	text: 'Berlabuh/bertambat di ' , style:'content'},
                {	text: ':   ' + namaDermaga, style:'content'}
  						]
  					},
            {
  						alignment: 'left',
  						columns: [
                {width: 30, text:''},
  							{width: 90,	text: 'Dari Perusahaan ' , style:'content'},
                {	text: ':   ' + namaAgen, style:'content'}
  						]
  					},
            {
  						alignment: 'left',
  						columns: [
  							{width: 160,	text: 'Diberikan pelayanan air sebanyak ' , style:'content'},
                {	text: ':   ' + volume + '  ( '+ volumeWords +' )  ' + 'm3.', style:'content'}
  						]
  					},
            {
  						alignment: 'left',
  						columns: [
  							{width: 80,	text: 'Mulai tanggal ' , style:'content'},
                {width: 100,	text: ':   ' + tglMulaiIsi , style:'content'},
                {width: 40,	text: 'jam'  , style:'content'},
                {width: 60,	text: ':   ' + jamMulaiIsi , style:'content'},
                {width: 50,	text: 'melalui'  , style:'content'},
                {width: 100,	text: ':   ' + alatIsi , style:'content'}
  						]
  					},
  						{text: 'Tonage berdasarkan flow meter PT Pelindo III (Persero) Cabang ' + namaCabangTitleCase +'.', style:'content'},
              {
    						alignment: 'center',
    						columns: [
    							{width: 300,	text: ' ' , style:'content'},
                  {	text: $scope.kota_meeting+', '+tglSurat, style:'content'}
    						]
    					},
            {
  						alignment: 'center',
  						columns: [
  							{width: 300,	text: ' ' , style:'content'},
                {	text: $scope.namaJabatan , style:'content'}
  						]
  					},
            {
  						alignment: 'center',
              margin:[0, 30, 0, 0],
  						columns: [
  							{width: 300,	text: ' ' , style:'content'},
                {	text: '( '+$scope.pejabatPengesahan +' )', style:'content'}
  						]
  					}
				],

		};

	pdfMake.createPdf(pdfContent).download("SPK-Air-Kapal-"+namaCabang+"-"+tglSurat+".pdf");
};

 }]);
