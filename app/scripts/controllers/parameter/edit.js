'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterEditCtrl
 * @description
 * # ParameterEditCtrl
 * Controller of the vasaApp
 */



angular.module('vasaApp')
.controller('ParameterEditCtrl',['$scope','$routeParams','$location','$timeout','AppParamDetail','AppParamEdit','AppParam','Notification','LoadingScreen', function ($scope,$routeParams,$location,$timeout,AppParamDetail,AppParamEdit,AppParam,Notification,LoadingScreen) {
	LoadingScreen.show();

	AppParamDetail.get({id:$routeParams.id}, function(response){
		LoadingScreen.hide();
		$scope.parameter = response;
	});

	// autocomplete
	$scope.listOfParam = [];
	AppParam.get({}, function(response) {
		$scope.listOfParam = response.content;
	});

	$scope.cancel = function(){
		$location.path('/parameter/list');
	}


    $scope.submit = function(){
    	$scope.parameter.nama = $scope.parameter.nama.nama === undefined?$scope.parameter.nama:$scope.parameter.nama.nama;
			AppParamEdit.update($scope.parameter,
			function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path('/parameter/list');
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

  }]);
