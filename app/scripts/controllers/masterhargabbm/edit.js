'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterhargabbmEditCtrl
 * @description
 * # MasterhargabbmEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterhargabbmEditCtrl', ['$scope','$routeParams','$filter','$location','HargaBBMDetail','HargaBBMEdit','Notification','LoadingScreen',function ($scope,$routeParams,$filter,$location,HargaBBMDetail,HargaBBMEdit,Notification,LoadingScreen) {
	LoadingScreen.show();
	$scope.locationPath = "/bbm";
	$scope.tglBerlaku = new Date();
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked'
	}

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	HargaBBMDetail.get({id:$routeParams.id}, function(response){
		LoadingScreen.hide();
		var temp = response;
		$scope.dataBbm = temp;
		$scope.dataBbm.tglBerlaku = new Date (response.tglBerlaku);
	});

	$scope.submit = function(){
		$scope.dataBbm.id = $routeParams.id;
		$scope.dataBbm.tglBerlaku = $filter('date')($scope.dataBbm.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		HargaBBMEdit.update($scope.dataBbm,
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
	$scope.cancel = function(){
		$location.path($scope.locationPath);
	};
}]);
