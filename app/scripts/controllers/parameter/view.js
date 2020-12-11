'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterViewCtrl
 * @description
 * # ParameterViewCtrl
 * Controller of the vasaApp
 */



angular.module('vasaApp')
  	.controller('ParameterViewCtrl',['$scope', '$routeParams','AppParamDetail','LoadingScreen',function ($scope, $routeParams,AppParamDetail,LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		AppParamDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			// console.log(response);
			if(response !== undefined){
				$scope.item = response;
				$scope.item.isNumericText = ($scope.item.isNumeric === 1 ? "YA":"TIDAK");
				$scope.item.classNumeric = ($scope.item.isNumeric === 1 ? "fa fa-check-square-o":"fa fa-square-o");

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

}]);
