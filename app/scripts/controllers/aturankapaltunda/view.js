'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaCtrl
 * @description
 * # MasterDendaViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('AturanKapalTundaViewCtrl',['$scope', '$routeParams','$location','AturanKapalTundaDetail','LoadingScreen',function ($scope, $routeParams,$location,AturanKapalTundaDetail,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		AturanKapalTundaDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.contentAturankapaltunda = response;
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

$scope.close = function(){
  $location.path('manajementunda/aturankapaltunda');
};

}]);
