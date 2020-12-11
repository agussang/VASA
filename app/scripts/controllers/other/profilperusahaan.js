'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilperusahaanCtrl
 * @description
 * # OtherProfilperusahaanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('OtherProfilperusahaanCtrl',['$scope','$routeParams','$window','MdmPelangganDetail',function ($scope, $routeParams,$window,MdmPelangganDetail) {
  		$scope.pelangganlDetails = '';
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.kode){
		MdmPelangganDetail.get({kode:$routeParams.kode}, function(response){
			if(response !== undefined){
				$scope.pelangganlDetails = response;
				// $scope.pelangganlDetails.mkplJnsPalka = response.mkplJnsPalka === null ? 'Tidak ada data' : response.mkplJnsPalka;
				// $scope.pelangganlDetails.mkplJenis = response.mkplJenis === null ? 'Tidak ada data' : response.mkplJenis;
				// $scope.pelangganlDetails.mkplJnsPelayaran = response.mkplJnsPelayaran === null ? 'Tidak ada data' : response.mkplJnsPelayaran;
				// $scope.pelangganlDetails.mkplJnsTrayek = response.mkplJnsTrayek === null ? 'Tidak ada data' : response.mkplJnsTrayek;
				// $scope.pelangganlDetails.mkplGrt = response.mkplGrt === null ? 'Tidak ada data' : response.mkplGrt;
				// $scope.pelangganlDetails.mkplLoa = response.mkplLoa === null ? 'Tidak ada data' : response.mkplLoa;
				// $scope.pelangganlDetails.mkplDwt = response.mkplDwt === null ? 'Tidak ada data' : response.mkplDwt;
				// $scope.pelangganlDetails.mkplDraftMuka = response.mkplDraftMuka === null ? 'Tidak ada data' : response.mkplDraftMuka;
				// $scope.pelangganlDetails.mkplDraftBlk = response.mkplDraftBlk === null ? 'Tidak ada data' : response.mkplDraftBlk;
				// $scope.pelangganlDetails.mkplPalka = response.mkplPalka === null ? 'Tidak ada data' : response.mkplPalka;
				// $scope.pelangganlDetails.mkplRampdoor = response.mkplRampdoor === null ? 'Tidak ada data' : response.mkplRampdoor;
				
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		dataEmpty();
	}

	$scope.back =  function(){
		$window.history.back();
	}
   
}]);
