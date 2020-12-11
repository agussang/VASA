'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TagihanMinViewCtrl
 * @description
 * # TagihanMinViewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('TagihanMinViewCtrl',['$scope','$routeParams','TagihanMinView','LoadingScreen','$location',function($scope,$routeParams,TagihanMinView,LoadingScreen,$location){
	LoadingScreen.show();
	if($routeParams.id){
		TagihanMinView.get({id:$routeParams.id}, function(response){
			if(response !== undefined){
				$scope.tagihanMinDetails = response;
				$scope.tagihanMinDetails.kodeAktif = ($scope.tagihanMinDetails.kodeAktif== '1'?'Aktif': 'Tidak Aktif');
			}else{
				dataEmpty();
			}			
		}, function(){
			dataEmpty();
		})
	}else{
		dataEmpty();
	}
	LoadingScreen.hide();

  	$scope.close =  function(){
		$location.path('/tagihanminimum');
	}	
}])