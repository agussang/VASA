'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSDMKapalViewCtrl
 * @description
 * # MasterSDMKapalViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MartersurchargetundaViewCtrl',['$scope', '$routeParams','$location','MasterSurchargeTundaDetail','LoadingScreen',function ($scope, $routeParams,$location,MasterSurchargeTundaDetail,LoadingScreen) {
	LoadingScreen.show();
	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		MasterSurchargeTundaDetail.get({id:$routeParams.id}, function(response){
			  LoadingScreen.hide();
			if(response !== undefined){
				$scope.surchargetundaContent = response;
				$scope.surchargetundaContent.tglBerlaku = moment(response.tglBerlaku).format('DD-MM-YYYY');
				switch($scope.surchargetundaContent.status) {
				    case true:
				        $scope.surchargetundaContent.status = "AKTIF";
				        break;
				    case false:
				        $scope.surchargetundaContent.status = "TIDAK AKTIF";
				        break;
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

	$scope.cancel =  function(){
		$location.path('/mastersurchargetunda/list');
	}

}]);
