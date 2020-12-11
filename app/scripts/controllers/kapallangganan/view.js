'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapallanggananViewCtrl
 * @description
 * # KapallanggananViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapallanggananViewCtrl',['$scope','$location', '$routeParams','KapalLanggananDetail','BuildPDF','LoadingScreen',function ($scope,$location, $routeParams,KapalLanggananDetail, BuildPDF,LoadingScreen) {
    LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		KapalLanggananDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.langgananDetail = response;
				$scope.langgananDetail.tagihanText= ($scope.langgananDetail.tagihan === 1 ? "Kesepakatan":"Penuh");
				//$scope.langgananDetail.tglMulaiBerlaku = moment(response.tglMulaiBerlaku).format('MMMM Do YYYY');
				if(response.status == true){
					$scope.langgananDetail.status = "Ya";
				}else{
					$scope.langgananDetail.status = "Tidak"
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
		$location.path('/kapallangganan/list');
	}

  //function build pdf
  $scope.buildPDF = function(){
    BuildPDF.build($scope.langgananDetail.dokumen);
  }

}]);
