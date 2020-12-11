'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:403Ctrl
 * @description
 * # 403Ctrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('403Ctrl', ['$scope','$location','$rootScope',function ($scope,$location,$rootScope) {
	$scope.logOut = function(){
		localStorage.clear();
		location.reload();
	};

	$scope.buttonBack = function(){
		window.history.go(-2);
		//$location.path('/');
	};



}]);
