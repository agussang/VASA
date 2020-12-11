'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('PermissionEditCtrl', ['$scope','$routeParams','$location','AppParam','PermissionDetail','PermissionEdit','Notification','LoadingScreen', function ($scope,$routeParams,$location,AppParam,PermissionDetail,PermissionEdit,Notification,LoadingScreen) {
	LoadingScreen.show();
	$scope.dataPermission = {};
	$scope.switchDefault = 0;
	$scope.dataPermission.cFlag = $scope.switchDefault;
	$scope.dataPermission.rFlag = $scope.switchDefault;
	$scope.dataPermission.uFlag = $scope.switchDefault;
	$scope.dataPermission.dFlag = $scope.switchDefault;
	$scope.dataPermission.pFlag = $scope.switchDefault;
	$scope.locationPath = '/permission';

	AppParam.get({nama:'GRUP_MENU'},function(response){
		$scope.grup_menu = response.content;
	});


	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

	if($routeParams.id){
		PermissionDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				console.log(response);
				$scope.dataPermission = response;
				$scope.dataPermission.grup = ''+$scope.dataPermission.grup;
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

	// function update
	$scope.submit = function(){
		PermissionEdit.update($scope.dataPermission,
			function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path($scope.locationPath);
			},
			function(response){
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
		);
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}
}]);
