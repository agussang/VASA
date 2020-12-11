'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterViewCtrl
 * @description
 * # KapalCharterViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('KapalCharterViewCtrl',['$scope', '$routeParams','$location','KapalCharterDetail','MdmKapalDetail','MdmPelangganDetail','BuildPDF','LoadingScreen','LoadingScreen',function ($scope, $routeParams,$location,KapalCharterDetail, MdmKapalDetail ,MdmPelangganDetail,BuildPDF,LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

    //get master data pelanggan
    $scope.contentOfmdmKapal = {};
    $scope.contentOfmdmPelanggan = {};

  		if($routeParams.id){
	  	KapalCharterDetail.get({id:$routeParams.id}, function(response){
        LoadingScreen.hide();
      //console.log(response);
			if(response !== undefined){

        $scope.contentKapalCharterDetails = response;

        MdmKapalDetail.get({kode:$scope.contentKapalCharterDetails.kodeKapal},
          function(response1){
            $scope.contentOfmdmKapal = response1;
          },
          function(response1){
            alert("Cannot get list of mdm pelanggan");
          });

        MdmPelangganDetail.get({kode:$scope.contentKapalCharterDetails.kantorId},
            function(response2){
              $scope.contentOfmdmPelanggan = response2;
                console.log($scope.contentOfmdmPelanggan.mplgNama);
            },
            function(response1){
              alert("Cannot get list of mdm pelanggan");
            });

				$scope.contentKapalCharterDetails = response;

				$scope.contentKapalCharterDetails.tglMulaiBerlaku = moment(response.tglMulaiBerlaku).format('DD-MM-YYYY');
        $scope.contentKapalCharterDetails.tglSelesaiBerlaku = moment(response.tglSelesaiBerlaku).format('DD-MM-YYYY');

        $scope.contentKapalCharterDetails.status		= ($scope.contentKapalCharterDetails.status === 1 ?"AKTIF":"TIDAK AKTIF");

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

  $scope.buildPDF = function(){
    //console.log($scope.contentKapalCharterDetails.dokumen);
    BuildPDF.build($scope.contentKapalCharterDetails.dokCharter);
  }

  //tombol batal
  $scope.close =  function(){
		$location.path('/kapalcharter/list');
	}

}]);
