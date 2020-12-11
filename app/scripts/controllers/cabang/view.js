'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangViewCtrl
 * @description
 * # CabangViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('CabangViewCtrl',['$scope','$location','$filter', '$routeParams','ParamsCabangDetail','LoadingScreen',function ($scope,$location,$filter, $routeParams,ParamsCabangDetail,LoadingScreen) {
    LoadingScreen.show();
    		var dataEmpty = function(){
				$scope.detailFound = false;
				$scope.loading = false;
				$scope.contents = 'no content found';
		};

  	if($routeParams.id){
		ParamsCabangDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.ParamCabang = response;
				$scope.ParamCabang.tglMulai = $filter('date')($scope.ParamCabang.tglMulai, 'dd-MM-yyyy');
				$scope.ParamCabang.tglAkhir = $filter('date')($scope.ParamCabang.tglAkhir, 'dd-MM-yyyy');


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
	$scope.cancel =  function(){
		$location.path('/cabang/list');
	}

}]);
