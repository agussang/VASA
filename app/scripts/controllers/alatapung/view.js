'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhViewCtrl
 * @description
 * # LabuhViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('AlatApungViewCtrl',['$scope', '$routeParams','$location','$filter','AlatApungDetail','AppParam','LoadingScreen',function ($scope, $routeParams,$location,$filter,AlatApungDetail,AppParam,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		AlatApungDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.contentAlatApungDetails = response;
        console.log(response);
				//GET SATUAN BEBAN PARAMETER
			/*	var satuanBeban = '';
				AppParam.get({nama:'SATUAN_BEBAN',value:response.satuanBeban},function(response){
				 	$scope.contentAlatApungDetails.satuanBeban = response.content[0].caption;
				});
				var satuan = '';
				AppParam.get({nama:'SATUAN',value:response.satuan},function(response){
				 	$scope.contentAlatApungDetails.satuan = response.content[0].caption;
				});
				var satuanwaktuPakai = '';
				AppParam.get({nama:'SATUAN_WAKTU_PAKAI',value:response.satuanwaktuPakai},function(response){
				 	$scope.contentAlatApungDetails.satuanWaktuPakai = response.content[0].caption;
				});
				var satuandaya = '';
				AppParam.get({nama:'SATUAN_WAKTU_PAKAI',value:response.satuandaya},function(response){
				 	$scope.contentAlatApungDetails.satuanDaya = response.content[0].caption;
				});
*/
				$scope.contentAlatApungDetails.tglMulaiBerlaku = $filter('date')($scope.contentAlatApungDetails.tglMulaiBerlaku, 'dd-MM-yyyy');
				$scope.contentAlatApungDetails.tglSelesaiBerlaku = $filter('date')($scope.contentAlatApungDetails.tglSelesaiBerlaku, 'dd-MM-yyyy');
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
    $location.path('/alatapung/list');
  };

}]);
