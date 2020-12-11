'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AirkapalViewCtrl
 * @description
 * # AirkapalViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('AirkapalViewCtrl',['$scope', '$routeParams','$filter','BuildPDF','TarifAirKapalDetail','LoadingScreen',function ($scope, $routeParams,$filter,BuildPDF,TarifAirKapalDetail,LoadingScreen) {

  LoadingScreen.show();

  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		$scope.noDocument = false;
  		if($routeParams.id){
		TarifAirKapalDetail.get({id:$routeParams.id}, function(response){
      	LoadingScreen.hide();
			if(response !== undefined){
				$scope.contentAirKapalDetails = response;
				if($scope.contentAirKapalDetails.dokumen === null){
					$scope.noDocument = true;
				}
				$scope.contentAirKapalDetails.tglBerlaku = $filter('date')($scope.contentAirKapalDetails.tglBerlaku, 'dd-MM-yyyy');
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

	$scope.buildPDF = function(){
		BuildPDF.build($scope.contentAirKapalDetails.dokumen);
	}

}]);
