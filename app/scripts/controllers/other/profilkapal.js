'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilkapalCtrl
 * @description
 * # OtherProfilkapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('OtherProfilkapalCtrl',['$scope','$window','$routeParams','MdmKapalDetail',function ($scope,$window,$routeParams,MdmKapalDetail) {
  		$scope.contentKapalDetails = '';
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.kode){
		MdmKapalDetail.get({kode:$routeParams.kode}, function(response){
			// console.log(response);
			if(response !== undefined){
				$scope.contentKapalDetails = response;
				$scope.contentKapalDetails.mkplJnsPalka = response.mkplJnsPalka === null ? 'Tidak ada data' : response.mkplJnsPalka;
				$scope.contentKapalDetails.mkplJenis = response.mkplJenis === null ? 'Tidak ada data' : response.mkplJenis;
				$scope.contentKapalDetails.mkplJnsPelayaran = response.mkplJnsPelayaran === null ? 'Tidak ada data' : response.mkplJnsPelayaran;
				$scope.contentKapalDetails.mkplJnsTrayek = response.mkplJnsTrayek === null ? 'Tidak ada data' : response.mkplJnsTrayek;
				$scope.contentKapalDetails.mkplGrt = response.mkplGrt === null ? 'Tidak ada data' : response.mkplGrt;
				$scope.contentKapalDetails.mkplLoa = response.mkplLoa === null ? 'Tidak ada data' : response.mkplLoa;
				$scope.contentKapalDetails.mkplDwt = response.mkplDwt === null ? 'Tidak ada data' : response.mkplDwt;
				$scope.contentKapalDetails.mkplDraftMuka = response.mkplDraftMuka === null ? 'Tidak ada data' : response.mkplDraftMuka;
				$scope.contentKapalDetails.mkplDraftBlk = response.mkplDraftBlk === null ? 'Tidak ada data' : response.mkplDraftBlk;
				$scope.contentKapalDetails.mkplPalka = response.mkplPalka === null ? 'Tidak ada data' : response.mkplPalka;
				$scope.contentKapalDetails.mkplRampdoor = response.mkplRampdoor === null ? 'Tidak ada data' : response.mkplRampdoor;

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
