'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:SiklusEditCtrl
 * @description
 * # SiklusEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('SiklusEditCtrl', ['$scope','$routeParams','$location','$timeout','SiklusDetail','SiklusEdit','Notification','AppParam','LoadingScreen',function ($scope,$routeParams,$location,$timeout,SiklusDetail,SiklusEdit,Notification,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.switchDefault = true;
	$scope.dataSiklus = {};
	$scope.dataSiklus.kriteriaLabuh = $scope.switchDefault;
	$scope.dataSiklus.kriteriaTambat = $scope.switchDefault;
	$scope.dataSiklus.kriteriaAirKapal = $scope.switchDefault;
	$scope.dataSiklus.kriteriaPanduMasuk = $scope.switchDefault;
	$scope.dataSiklus.kriteriaPanduKeluar = $scope.switchDefault;
	$scope.dataSiklus.jenisKapal = 1;
	$scope.dataSiklus.jenisPelayaran = 1;
	$scope.dataSiklus.kodeKegiatan = 1;
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

	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

	if($routeParams.id){
		SiklusDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				//$scope.dataSiklus = response;
				temp.jenisPelayaran = ''+temp.jenisPelayaran;
				temp.jenisKapal 	= ''+temp.jenisKapal;
				temp.kodeKegiatan 	= ''+temp.kodeKegiatan;
				$scope.dataSiklus = temp;
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
		SiklusEdit.update($scope.dataSiklus,
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
