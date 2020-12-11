'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhViewCtrl
 * @description
 * # LabuhViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('PelangganViewCtrl',['$scope', '$routeParams','$location','PelangganPerJasaDetail','BuildPDF','LoadingScreen',function ($scope, $routeParams,$location,PelangganPerJasaDetail, BuildPDF, LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		PelangganPerJasaDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				$scope.contentPelangganPerJasaDetails = response;
				//$scope.contentPelangganPerJasaDetails.tglMulaiBerlaku = moment(response.tglBerlaku).format('MMMM Do YYYY');

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

  $scope.close =  function(){
    $location.path('/pelanggan/list');
  }

  //function build pdf
  $scope.buildPDF = function(){
    BuildPDF.build($scope.contentPelangganPerJasaDetails.dokumen);
  }

}]);
