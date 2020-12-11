'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PermissionViewCtrl
 * @description
 * # PermissionViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PermissionDetailCtrl',['$scope', '$routeParams','$location','PermissionDetail','LoadingScreen', function ($scope,$routeParams,$location,PermissionDetail,LoadingScreen) {
  LoadingScreen.show();
    var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		PermissionDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.dataPermission = response;
				$scope.dataPermission.cflag = ($scope.dataPermission.cflag?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataPermission.rflag = ($scope.dataPermission.rflag?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataPermission.uflag = ($scope.dataPermission.uflag?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataPermission.dflag = ($scope.dataPermission.dflag?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataPermission.pflag = ($scope.dataPermission.pflag?"fa fa-check-square-o":"fa fa-square-o");
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

	//fungction cance atau tutup
	$scope.cancel =  function(){
		$location.path('/permission');
	}
}]);
