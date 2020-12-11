'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSDMKapalViewCtrl
 * @description
 * # MasterSDMKapalViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MasterSDMKapalViewCtrl',['$scope', '$routeParams','$location','MasterSDMKapalDetail',function ($scope, $routeParams,$location,MasterSDMKapalDetail) {
	  		var dataEmpty = function(){
				$scope.detailFound = false;
				$scope.loading = false;
				$scope.contents = 'no content found';
		};
		
  	if($routeParams.id){
		MasterSDMKapalDetail.get({id:$routeParams.id}, function(response){
			if(response !== undefined){
				$scope.SDMKapalDetails = response;
				$scope.SDMKapalDetails.showJabatan2 = $scope.SDMKapalDetails.jabatan2?'show':'hide';
				switch($scope.SDMKapalDetails.aktif) {
				    case true:
				        $scope.SDMKapalDetails.aktif = "YA";
				        break;
				    case false:
				        $scope.SDMKapalDetails.aktif = "TIDAK";
				        break;
				}
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		dataEmpty();
	}

	$scope.cancel =  function(){
		$location.path('/mastersdmkapal/list');
	}
   
}]);
