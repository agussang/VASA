'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MspanduNewCtrl
 * @description
 * # MspanduNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('MspanduNewCtrl', ['$scope','$filter','$timeout', '$location','Notification','MasterSurchargePanduAdd','AppParam','LoadingScreen',function ($scope,$filter,$timeout, $location,Notification,MasterSurchargePanduAdd,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.mspandu = {};
	$scope.mspandu.status=true;
	$scope.locationPath 		= '/surchargepandu/list';
	$scope.mspandu.aktif = true;
	$scope.required = true;

	$scope.tglBerlaku = new Date();

	$scope.options = {
	      autoclose: true,
	      todayBtn: '',
	      todayHighlight: true
	  };

	//get parameter area pelayanan
	AppParam.get({nama:'AREA_PELAYANAN'},function(response){
		// console.log(response);
		$scope.areaPelayanan = response.content;

	});

	// if($scope.mspandu.hargaMin > $scope.mspandu.hargaMax){
	// 	$scope.setNotification  = {
	// 		type	: "warning", //ex : danger, warning, success, info
	// 		message	: "harga Max harus lebih besar dari harga Min"
	// 	};
	// 	Notification.setNotification($scope.setNotification);
	// 	return;
	// }


	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.mspandu.tglBerlaku = $filter('date')($scope.tglBerlaku,'yyyy-MM-ddT00:00:00');
		// console.log($scope.mspandu.tglBerlaku);
		$scope.mspandu.areaPelayanan = parseInt($scope.mspandu.areaPelayanan);

		MasterSurchargePanduAdd.save(JSON.stringify($scope.mspandu),
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
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	};

	$scope.$watch('tglBerlaku', function(){
		$('#tglBerlaku').mask('99-99-9999');
	});
  LoadingScreen.hide();
}]);
