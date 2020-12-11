'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TagihanMinEditCtrl
 * @description
 * # TagihanMinEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('TagihanMinEditCtrl',['$scope','$location', '$routeParams','TagihanMinUpdate','TagihanMinView','LoadingScreen','Notification','AppParam',function($scope,$location,$routeParams,TagihanMinUpdate,TagihanMinView,LoadingScreen,Notification,AppParam){
	LoadingScreen.show();
	$scope.tagihanData = {};
	$scope.tagihanData.kodeAktif = 1;
	$scope.locationPath = '/tagihanminimum';

	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
		$scope.tagihanData.valuta = $scope.valuta[0].value;
	});

	if($routeParams.id){
		TagihanMinView.get({id:$routeParams.id}, function(response){
			if(response !== undefined){
				$scope.tagihanData.kodeAktif = response.kodeAktif;
				$scope.tagihanData.tagihanMin = response.tagihanMin;
				$scope.tagihanData.valuta = response.valuta;
			}else{
				dataEmpty();
			}			
		}, function(){
			dataEmpty();
		})
	}
	LoadingScreen.hide();

	$scope.submit = function(){
		$scope.tagihanData.kodeAktif = $scope.tagihanData.kodeAktif.toString();
		TagihanMinUpdate.update({id:$routeParams.id},$scope.tagihanData, function(response){
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
}]);