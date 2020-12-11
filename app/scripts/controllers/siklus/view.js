'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:SiklusViewCtrl
 * @description
 * # SiklusViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('SiklusViewCtrl',['$scope', '$routeParams','$location','SiklusDetail','LoadingScreen', function ($scope,$routeParams,$location,SiklusDetail,LoadingScreen) {
  LoadingScreen.show();
    var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		SiklusDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.siklusContent = response;
				switch($scope.siklusContent.kriteriaAirKapal) {
				    case true:
				        $scope.siklusContent.kriteriaAirKapal = "YA";
				        break;
				    case false:
				        $scope.siklusContent.kriteriaAirKapal = "TIDAK";
				        break;
				}
				switch($scope.siklusContent.kriteriaLabuh) {
				    case true:
				        $scope.siklusContent.kriteriaLabuh = "YA";
				        break;
				    case false:
				        $scope.siklusContent.kriteriaLabuh = "TIDAK";
				        break;
				}
				switch($scope.siklusContent.kriteriaPanduKeluar) {
				    case true:
				        $scope.siklusContent.kriteriaPanduKeluar = "YA";
				        break;
				    case false:
				        $scope.siklusContent.kriteriaPanduKeluar = "TIDAK";
				        break;
				}
				switch($scope.siklusContent.kriteriaPanduMasuk) {
				    case true:
				        $scope.siklusContent.kriteriaPanduMasuk = "YA";
				        break;
				    case false:
				        $scope.siklusContent.kriteriaPanduMasuk = "TIDAK";
				        break;
				}
				switch($scope.siklusContent.kriteriaTambat) {
				    case true:
				        $scope.siklusContent.kriteriaTambat = "YA";
				        break;
				    case false:
				        $scope.siklusContent.kriteriaTambat = "TIDAK";
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
		$location.path('/siklus/list');
	}
}]);
