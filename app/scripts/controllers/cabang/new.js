'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangNewCtrl
 * @description
 * # CabangNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('CabangNewCtrl',['$scope','$filter','$timeout','Notification', '$location', 'ParamsCabangAdd','KantorList','LoadingScreen', function ($scope,$filter, $timeout,Notification, $location, ParamsCabangAdd, KantorList,LoadingScreen) {
  LoadingScreen.show();
  $scope.paramcabang = {};
	$scope.tglMulai = new Date();
	$scope.tglAkhir = new Date();
	$scope.locationPath =  '/cabang/list';
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.onlyNumbers = /^\d+$/;

	$scope.$watch('tglMulai', function(){
		$('#IdtglMulai').mask('99-99-9999');
	});

	KantorList.get(function(response){
    LoadingScreen.hide();
    $scope.listKantor = response.content;
		// console.log($scope.listKantor);
	});
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.paramcabang.tglMulai = $filter('date')($scope.tglMulai, 'yyyy-MM-ddT00:00:00');
		$scope.paramcabang.tglAkhir = $filter('date')($scope.tglAkhir, 'yyyy-MM-ddT00:00:00');
		//console.log($scope.paramcabang);return;
		// return;
		ParamsCabangAdd.save($scope.paramcabang,
			function(response){
				if(response.$resolved){
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
		$location.path('/cabang/list');
	}
}]);
