'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterhargabbmAddCtrl
 * @description
 * # MasterhargabbmAddCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterhargabbmAddCtrl',['$scope','$filter','$location','HargaBBMAdd','Notification','LoadingScreen' ,function ($scope,$filter,$location,HargaBBMAdd,Notification,LoadingScreen) {
	LoadingScreen.show();
	$scope.hargaBbm = {};
	$scope.hargaBbm.status = true;
	$scope.successbbmShow = false;
	$scope.errorbbmShow = false;
	$scope.locationPath = "/bbm";
	$scope.tglBerlaku = new Date();

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	}

	$scope.$watch('tglBerlaku', function(){
		$('#tglBerlaku').mask('99-99-9999');
	});

	//function save
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.hargaBbm.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.hargaBbm.harga = parseInt($scope.hargaBbm.harga);
		HargaBBMAdd.save($scope.hargaBbm,
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
	};

	// function cancel
	$scope.cancel = function(){
		$location.path($scope.locationPath);
	};

	LoadingScreen.hide();
}]);
