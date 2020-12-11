'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterhargabbmViewCtrl
 * @description
 * # MasterhargabbmViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterhargabbmViewCtrl',['$scope','$routeParams','$location','HargaBBMDetail','$filter','LoadingScreen', function ($scope,$routeParams,$location,HargaBBMDetail,$filter,LoadingScreen) {
  LoadingScreen.show();
  	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		HargaBBMDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.bbmContent = response;
				$scope.bbmContent.tglBerlaku = $filter('date')(response.tglBerlaku, 'dd-MM-yyyy');

				$scope.bbmContent.status =  ($scope.bbmContent.status === true) ? 'AKTIF' : 'TIDAK AKTIF';


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

	$scope.cancel = function(){
		$location.path('/bbm');
	};
}]);
