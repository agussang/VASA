// 'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhViewCtrl
 * @description
 * # LabuhViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('LabuhViewCtrl',['$scope', '$routeParams','$filter','TarifLabuhDetail','BuildPDF','LoadingScreen',function ($scope, $routeParams,$filter,TarifLabuhDetail,BuildPDF,LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		$scope.noDocument = false;

  		if($routeParams.id){
		TarifLabuhDetail.get({id:$routeParams.id}, function(response){
      		LoadingScreen.hide();

			if(response !== undefined){
				$scope.contentLabuhDetails = response;
				if($scope.contentLabuhDetails.dokumen === null){
					$scope.noDocument = true;
				}
				$scope.contentLabuhDetails.tglBerlaku = $filter('date')($scope.contentLabuhDetails.tglBerlaku, 'dd-MM-yyyy');
				// $scope.contentLabuhDetails.dokumen = $scope.contentLabuhDetails.dokumen !== null ? $scope.contentLabuhDetails.dokumen : 'Tidak ada dokumen';
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
		BuildPDF.build($scope.contentLabuhDetails.dokumen);
	}

}]);
