'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaCtrl
 * @description
 * # MasterDermagaKepilViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MasterDermagaKepilViewCtrl',['$scope', '$routeParams','$location','MasterDermagaKepilDetail','LoadingScreen',function ($scope, $routeParams,$location,MasterDermagaKepilDetail,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		MasterDermagaKepilDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.contentMasterKepilDetails = response;
			        $scope.contentMasterKepilDetails.flagAktif = ($scope.contentMasterKepilDetails.flagAktif === 1 ?"YA":"TIDAK");
			}else{
				dataEmpty();
			}
		}, function(){
		});
	}else{
    LoadingScreen.hide();
		dataEmpty();
	}

$scope.close = function(){
  $location.path('/masterdermagakepil/list');
};

}]);
