'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TambatViewCtrl
 * @description
 * # TambatViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TambatViewCtrl',['$scope','BuildPDF','$filter', '$routeParams','TarifTambatDetail','LoadingScreen',function ($scope,BuildPDF, $filter,$routeParams,TarifTambatDetail,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		$scope.noDocument = false;
  		if($routeParams.id){
		TarifTambatDetail.get({id:$routeParams.id}, function(response){
     	 LoadingScreen.hide();
     	 
			if(response !== undefined){
				$scope.contentTambatDetails = response;
				if($scope.contentTambatDetails.dokumen === null){
					$scope.noDocument = true;
				}
				$scope.contentTambatDetails.tglBerlaku = $filter('date')($scope.contentTambatDetails.tglBerlaku, 'dd-MM-yyyy');
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
		BuildPDF.build($scope.contentTambatDetails.dokumen);
	}

}]);
