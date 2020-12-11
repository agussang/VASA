'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduNewCtrl
 * @description
 * # PanduNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')

.controller('SiklusNewCtrl',['$scope','$location','SiklusAdd','Notification','AppParam','LoadingScreen',function ($scope,$location,SiklusAdd,Notification,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.siklus = {};
	$scope.switchDefault = true;
	$scope.siklus.kriteriaLabuh = $scope.switchDefault;
	$scope.siklus.kriteriaTambat = $scope.switchDefault;
	$scope.siklus.kriteriaAirKapal = $scope.switchDefault;
	$scope.siklus.kriteriaPanduMasuk = $scope.switchDefault;
	$scope.siklus.kriteriaPanduKeluar = $scope.switchDefault;
	$scope.locationPath = '/siklus/list';

	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jenisPelayaran = response.content;
	});

	//get parameter JENIS_KAPAL
	AppParam.get({nama:'JENIS_KAPAL'},function(response){
		$scope.jenisKapal = response.content;
	});

	//get parameter KODE_KEGIATAN
	AppParam.get({nama:'KODE_KEGIATAN'},function(response){
		$scope.kodeKegiatan = response.content;
	});

	// function save
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		SiklusAdd.save($scope.siklus,
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

	LoadingScreen.hide();
}]);
