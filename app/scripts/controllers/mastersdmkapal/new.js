'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSDMKapalCtrl
 * @description
 * # MasterSDMKapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterSDMKapalNewCtrl',['$scope','$location', 'MasterSDMKapalAdd','Notification', function ($scope,$location,MasterSDMKapalAdd,Notification) {
	$scope.mastersdmkapal 		= {};
	$scope.locationPath 		= '/mastersdmkapal/list';
	$scope.mastersdmkapal.aktif = true;

	// function save
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		MasterSDMKapalAdd.save($scope.mastersdmkapal,
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
