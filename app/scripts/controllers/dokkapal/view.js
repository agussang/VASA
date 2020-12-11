'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduViewCtrl
 * @description
 * # PanduViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('DokkapalViewCtrl',['$scope', '$routeParams','$location','$window','$http','KapalKegiatanTetapDetail','MdmPelangganSearchByKode','MdmKapalSearch','API_PATH','BuildPDF','LoadingScreen', function ($scope, $routeParams,$location,$window,$http,KapalKegiatanTetapDetail,MdmPelangganSearchByKode,MdmKapalSearch,API_PATH,BuildPDF,LoadingScreen) {
  LoadingScreen.show();
   	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		KapalKegiatanTetapDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.dokKapalContent = response;
				
				$scope.dokKapalContent.tglMulaiBerlaku = moment(response.tglMulaiBerlaku).format('DD-MM-YYYY');
				$scope.dokKapalContent.tglSelesaiBerlaku = moment(response.tglSelesaiBerlaku).format('DD-MM-YYYY');
				$scope.dokKapalContent.tglDitetapkan = moment(response.tglDitetapkan).format('DD-MM-YYYY');
				switch($scope.dokKapalContent.status) {
				    case 1:
				        $scope.dokKapalContent.status = "AKTIF";
				        break;
				    case 2:
				        $scope.dokKapalContent.status = "TIDAK AKTIF";
				        break;
				}
				MdmPelangganSearchByKode.get({kode:response.kodeAgen,kodeTerminal : localStorage.getItem('kodeTerminal')}, function(responseMDMPelanggan){
					$scope.dokKapalContent.namaAgen = responseMDMPelanggan.mplgNama;
					$scope.dokKapalContent.mplgAlamat = responseMDMPelanggan.mplgAlamat;
					$scope.dokKapalContent.mplgBadanUsaha = responseMDMPelanggan.mplgBadanUsaha;
					$scope.dokKapalContent.mplgKota = responseMDMPelanggan.mplgKota;
				});
				MdmKapalSearch.get({kode:response.kode,limit:1}, function(responseMDMKapal){
					$scope.dokKapalContent.benderaText = responseMDMKapal[0].mkplBendera;
					$scope.dokKapalContent.jenisKapalText = responseMDMKapal[0].mkplJenis;
					$scope.dokKapalContent.jenisPelayaranText = responseMDMKapal[0].mkplJnsPelayaran;
				});
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
    LoadingScreen.hide();
		dataEmpty();
	}

	//function cancel
	$scope.cancel =  function(){
		$location.path('/dokkapal/list');
	}

	//function build pdf
	$scope.buildPDF = function(){
		BuildPDF.build($scope.dokKapalContent.dokumen);
	}
}]);
