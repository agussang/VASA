'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhViewCtrl
 * @description
 * # LabuhViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('PejabatViewCtrl',['$scope', '$routeParams','$location','PejabatPengesahanDetail','LoadingScreen',function ($scope, $routeParams,$location,PejabatPengesahanDetail, LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		PejabatPengesahanDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				$scope.contentPejabatPengesahanDetails = response;
				$scope.contentPejabatPengesahanDetails.tglMulaiBerlaku = moment(response.tglBerlaku).format('MMMM Do YYYY');
        $scope.contentPejabatPengesahanDetails.otorisasi = ($scope.contentPejabatPengesahanDetails.otorisasi === true ?"YA":"TIDAK");

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
  $location.path('/pejabat/list');
};

}]);
