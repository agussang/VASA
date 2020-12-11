'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerlokasitujuanViewCtrl
 * @description
 * # PerlokasitujuanViewCtrl
 * Controller of the vasaApp
 */

  angular.module('vasaApp')
.controller('PerlokasitujuanViewCtrl',['$scope','$routeParams','PelangganPerLokasiDetail','BuildPDF','$location','LoadingScreen',function ($scope,$routeParams,PelangganPerLokasiDetail,BuildPDF, $location, LoadingScreen) {
  LoadingScreen.show();
  	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		PelangganPerLokasiDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.item = response;
				$scope.item.tglMulaiBerlaku = moment(response.tglMulaiBerlaku).format('MM-DD-YYYY');
				$scope.item.tglSelesaiBerlaku = moment(response.tglSelesaiBerlaku).format('MM-DD-YYYY');
				$scope.item.tglSepakat = moment(response.tglSepakat).format('MM-DD-YYYY');
				switch($scope.item.status) {
				    case 1:
				        $scope.item.status = "AKTIF";
				        break;
				    case 0:
				        $scope.item.status = "TIDAK AKTIF";
				        break;
				}
				switch($scope.item.nilaiTagihan) {
				    case 0:
				        $scope.item.nilaiTagihanText = "Penuh";
				        break;
				    case 1:
				        $scope.item.nilaiTagihanText = "Kesepakatan";
				        break;
				}
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
  $scope.cancel =  function(){
		$location.path('/perlokasitujuan/list');
	}
  //function build pdf
  $scope.buildPDF = function(){
    BuildPDF.build($scope.item.dokumen);
  }
}]);
