'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterNewCtrl
 * @description
 * # ParameterNewCtrl
 * Controller of the vasaApp
 */

  angular.module('vasaApp')
.controller('ParameterNewCtrl', ['$scope','$filter','$timeout', '$location','Notification',
	'AppParamAdd','AppParam','LoadingScreen',
	function ($scope,$filter,$timeout, $location,Notification,
		AppParamAdd,AppParam,LoadingScreen) {
  LoadingScreen.show();
  $scope.parameter = {};
	$scope.parameter.isNumeric = 1;
	$scope.locationPath 		= '/parameter/list';
	$scope.parameter.aktif = true;
	$scope.required = true;

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.parameter.isNumeric = parseInt($scope.parameter.isNumeric);
		if (typeof $scope.parameter.nama === 'object') {
			$scope.parameter.nama = $scope.parameter.nama.nama;
		}else{
			$scope.parameter.nama = $scope.parameter.nama;
		}
		AppParamAdd.save($scope.parameter,
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
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			});
	};
	$scope.cancel = function(){
		$location.path($scope.locationPath);
	};

	// autocomplete
	$scope.listOfParam = [];
  AppParam.get({}, function(response){
    $scope.listOfParam = response.content;
  });



  $scope.$watch('parameter.nama', function(newValue){
    if(typeof newValue == 'string'){
      $scope.parameter.maxlength = 30;
    } else if (typeof newValue == 'undefined') {
      $scope.parameter.maxlength = null;
    }
 });

  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupNama = function(){
    if(valueField !== $scope.parameter.nama){
      if(typeof $scope.parameter.nama != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.parameter.nama = '';
      }
    }
  }

  $scope.$watch('parameter.isNumeric', function () {
    if($scope.parameter.isNumeric == 1)
    {
      $scope.fieldPattern = /[0-9]/g;
    } else {
      $scope.fieldPattern = /./g;
    }
  });
  LoadingScreen.hide();
}]);
