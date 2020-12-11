'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TagihanMinNewCtrl
 * @description
 * # TagihanMinNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('TagihanMinNewCtrl',['$scope','TagihanMinNew','AppParam','LoadingScreen','Notification','$location',function($scope,TagihanMinNew,AppParam,LoadingScreen,Notification,$location){
	LoadingScreen.show();
	$scope.tagihanData = {};
	$scope.tagihanData.kodeAktif = 1;
	$scope.locationPath = '/tagihanminimum';

	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
		$scope.tagihanData.valuta = $scope.valuta[0].value;
	});
	LoadingScreen.hide();

	$scope.submit = function(){
		$scope.tagihanData.kodeAktif = $scope.tagihanData.kodeAktif.toString();
		TagihanMinNew.save($scope.tagihanData, function(response){
			if(response.id){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.tagihanData.kodeAktif = 1;
				$scope.tagihanData.valuta = $scope.valuta[0].value;
				$location.path($scope.locationPath);
			}else{
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			}
			$scope.showLoader = false;
		},function(response){
			$scope.setNotification  = {
				type	: "danger", //ex : danger, warning, success, info
				message	: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.showLoader = false;
		});
	}
}])