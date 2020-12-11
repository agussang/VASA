'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangMinKtNewCtrl
 * @description
 * # CabangMinKtNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('CabangMinKtNewCtrl',['$scope','$filter','$timeout','Notification', '$location', 'BranchMinKplTundaAdd','LoadingScreen', 
function ($scope,$filter, $timeout,Notification, $location, BranchMinKplTundaAdd,LoadingScreen) {
	$scope.paramMinKt = {};
	$scope.listCabang = {};
	$scope.locationPath =  '/kapal_tunda_min/list';
	LoadingScreen.show();
    LoadingScreen.hide();
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.paramMinKt.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		BranchMinKplTundaAdd.save($scope.paramMinKt,
			function(response){
				if(response.status != '500' || response.status != '404'){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				}
				$scope.buttonDisabled = false;
				$scope.showLoader = false;				
			},
			function(response){
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Koneksi tidak terhubung..."
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
		);
	}

	$scope.cancel =  function(){
		$location.path('/kapal_tunda_min/list');
	}	
}]);