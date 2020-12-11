'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaCtrl
 * @description
 * # MasterDendaViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('TipeEskalasiViewCtrl',['$scope', '$routeParams','$location','TipeEskalasiDetail','LoadingScreen',function ($scope, $routeParams,$location,TipeEskalasiDetail,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		TipeEskalasiDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.contentTipeEskalasi = response;
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
  $location.path('tipeeskalasi');
};

}]);
