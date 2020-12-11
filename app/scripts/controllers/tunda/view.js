'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaViewCtrl
 * @description
 * # TundaViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TundaViewCtrl',['$scope', '$routeParams','AppParam','TarifTundaDetail','BuildPDF','LoadingScreen',function ($scope,$routeParams,AppParam,TarifTundaDetail,BuildPDF,LoadingScreen) {
    LoadingScreen.show();

   	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response;
	});

	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response;
	});

   var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};
		
  		if($routeParams.id){
		TarifTundaDetail.get({id:$routeParams.id}, function(response){
      		LoadingScreen.hide();
			if(response !== undefined){
				$scope.contentTundaDetails = response;
				//$scope.contentTundaDetails.tglBerlaku = moment(response.tglBerlaku).format('DD MMM YYYY');
				if ($scope.contentTundaDetails.dokumen == null ) {
						$scope.contentTundaDetails.dokumen == false;
					}else{
						$scope.contentTundaDetails.dokumen == true;
					}
			}else{
				dataEmpty();
			}
		}, function(){
      LoadingScreen.hide();
			dataEmpty();
		});
	}else{
		dataEmpty();
	}

	$scope.buildPDF = function(){
    BuildPDF.build($scope.contentTundaDetails.dokumen);
  	}

  }]);
