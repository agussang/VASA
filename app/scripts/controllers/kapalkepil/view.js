'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaViewCtrl
 * @description
 * # TundaViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalKepilViewCtrl',['$scope', '$routeParams','TarifKapalKepilDetail','BuildPDF','LoadingScreen', function ($scope, $routeParams,TarifKapalKepilDetail,BuildPDF,LoadingScreen) {
    /*
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    */
    LoadingScreen.show();

   var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		//console.log($routeParams.id);
  		if($routeParams.id){
		TarifKapalKepilDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.contentKapalkepilDetails = response;
				//$scope.contentKapalkepilDetails.tglBerlaku = moment(response.tglBerlaku).format('dd-MM-yyyy');
				if ($scope.contentKapalkepilDetails.dokumen == null ) {
						$scope.contentTundaDetails.dokumen == false;
					}else{
						$scope.contentKapalkepilDetails.dokumen == true;
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
    BuildPDF.build($scope.contentKapalkepilDetails.dokumen);
  	}
  }]);
