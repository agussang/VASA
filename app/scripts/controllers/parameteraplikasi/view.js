'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterAplikasiViewCtrl
 * @description
 * # ParameterAplikasiViewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('ParameterAplikasiViewCtrl',['$scope','$routeParams','$location','AppParamDetail','AppParam','LoadingScreen',function ($scope,$routeParams,$location,AppParamDetail,AppParam,LoadingScreen) {
    LoadingScreen.show();
    $scope.parameter = {};
	$scope.itemDataParams = [];
	$scope.parameter.nama = $routeParams.nama;
	$scope.locationPath = '/parameteraplikasi/list';
	var active = "YA";
	var non_active = "TIDAK";
	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

	if($routeParams.nama){
		AppParam.get({
			nama: $routeParams.nama,
			sort: 'value,asc'
		}, function(response) {
			LoadingScreen.hide();
			$scope.itemDataParams = response.content;
			for (var i = 0; i<$scope.itemDataParams.length; i++ ){
				$scope.itemDataParams[i].isNumericText = ($scope.itemDataParams[i].isNumeric === 1 ?active:non_active);
			}
		});
	}else{
    	LoadingScreen.hide();
		dataEmpty();
	}

	$scope.cancel = function(){
		$location.path($scope.locationPath);
	}
}]);
