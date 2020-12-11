'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaCtrl
 * @description
 * # MasterDendaViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MasterDendaViewCtrl',['$scope', '$routeParams','$location','MasterDendaDetail','LoadingScreen',function ($scope, $routeParams,$location,MasterDendaDetail,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		MasterDendaDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.contentMasterDendaDetails = response;
        $scope.contentMasterDendaDetails.flagDenda = ($scope.contentMasterDendaDetails.flagDenda === 1 ?"YA":"TIDAK");
        $scope.contentMasterDendaDetails.flagAktif = ($scope.contentMasterDendaDetails.flagAktif === 1 ?"YA":"TIDAK");
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

$scope.close = function(){
  $location.path('/masterdenda/list');
};

}]);
