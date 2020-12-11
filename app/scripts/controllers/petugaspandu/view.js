'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasPanduViewCtrl
 * @description
 * # PetugasPanduViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PetugasPanduViewCtrl',['$scope', '$routeParams','$base64','$window','PetugasPanduDetail','BuildPDF','LoadingScreen', function ($scope, $routeParams,$base64,$window,PetugasPanduDetail,BuildPDF,LoadingScreen) {
  LoadingScreen.show();

   	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};
		//console.log($routeParams.id);
  	if($routeParams.id){
		PetugasPanduDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				$scope.petugasPandu = response;
				console.log();
				if($scope.petugasPandu.photo.length > 50){
					$scope.img = 'data:image/jpg;base64,'+ $scope.petugasPandu.photo;	
				} else {
					$scope.img = '../images/no-image-icon.png';
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

 $scope.back= function(){
  	$window.history.back();
  };

  }]);
