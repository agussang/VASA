'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('PermissionAddCtrl', ['$scope','$location','PermissionAdd','AppParam','Notification','LoadingScreen','PermissionByKode', function ($scope,$location,PermissionAdd,AppParam,Notification,LoadingScreen,PermissionByKode) {
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

	// function save
	$scope.submit = function(){

		PermissionByKode.get({
			kodeMenu: $scope.dataPermission.kodeMenu
		},function(response){
			var findSame = false
			response.content.forEach(function(item){
				if(item.kodeMenu ==  $scope.dataPermission.kodeMenu){
					findSame = true;
				}
			});
			console.log(findSame);
			if(findSame){
			  $scope.buttonDisabled = false;
			  $scope.showLoader = false;
	          $scope.setNotification = {
	            type: "warning", //ex : danger, warning, success, info
	            message: "Data yang di inputkan sudah ada"
	          };
	          Notification.setNotification($scope.setNotification);

	          return false;
			}else{


				PermissionAdd.save($scope.dataPermission,
				function(response){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				},
				function(response){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$scope.buttonDisabled = false;
					$scope.showLoader = false;
				});
			}
		});
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	LoadingScreen.hide();
}]);
