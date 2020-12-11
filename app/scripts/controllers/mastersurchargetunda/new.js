'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSurchargeTundalCtrl
 * @description
 * # MasterSurchargeTundalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MastersurchargetundaNewCtrl',['$scope','$filter','$location','MasterSurchargeTundaAdd','Notification','LoadingScreen', function ($scope,$filter,$location,MasterSurchargeTundaAdd,Notification, LoadingScreen) {
	LoadingScreen.show();
	$scope.mastersurchargetunda = {};
	$scope.switchDefault = true;
	$scope.mastersurchargetunda.status = $scope.switchDefault;
	$scope.locationPath = '/mastersurchargetunda/list';

	$scope.tglBerlaku = new Date();

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	$scope.options = {
	      autoclose: true,
	      todayBtn: '',
	      todayHighlight: true
	  };
	//function for event submit
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.mastersurchargetunda.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');
		MasterSurchargeTundaAdd.save($scope.mastersurchargetunda,
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

	//function for cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}
  LoadingScreen.hide();

}]);
