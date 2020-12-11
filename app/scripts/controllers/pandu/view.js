'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduViewCtrl
 * @description
 * # PanduViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PanduViewCtrl',['$scope', '$routeParams','TarifPanduDetail','BuildPDF','LoadingScreen', function ($scope, $routeParams,TarifPanduDetail,BuildPDF,LoadingScreen) {
  LoadingScreen.show();

   var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		
  		if($routeParams.id){
		TarifPanduDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				$scope.contentPanduDetails = response;
				//$scope.contentPanduDetails.tglBerlaku = moment(response.tglBerlaku).format('dd-MM-yyyy');
				if ($scope.contentPanduDetails.dokumen == null ) {
						$scope.contentPanduDetails.dokumen == false;
					}else{
						$scope.contentPanduDetails.dokumen == true;
					}
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
    BuildPDF.build($scope.contentPanduDetails.dokumen);
  	}

  }]);
