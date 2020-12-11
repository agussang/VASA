'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MspanduViewCtrl
 * @description
 * # MspanduViewCtrl
 * Controller of the vasaApp
 */

 angular.module('vasaApp')
.controller('MspanduViewCtrl',['$scope','$routeParams','$timeout','MasterSurchargePanduDetail','$location','LoadingScreen', function ($scope,$routeParams,$timeout,MasterSurchargePanduDetail, $location, LoadingScreen) {
  LoadingScreen.show();
  	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};
  $scope.cancel =  function(){
		$location.path('/surchargepandu/list');
	}

  	if($routeParams.id){
		MasterSurchargePanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.item = response;
				//$scope.item.tglBerlaku = moment(response.tglBerlaku).format('MMMM Do YYYY');
				switch($scope.item.status) {
				    case true:
				        $scope.item.status = "AKTIF";
				        break;
				    case false:
				        $scope.item.status = "TIDAK AKTIF";
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

}]);
