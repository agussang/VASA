'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduViewCtrl
 * @description
 * # PanduViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AturangerakpanduViewCtrl',['$scope', '$routeParams','$location','$window','AturanGerakPanduDetail','LoadingScreen', function ($scope, $routeParams,$location,$window,AturanGerakPanduDetail,LoadingScreen) {
  LoadingScreen.show();
   	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

	//pdfMake.createPdf(docDefinition).print();
	$scope.printPDF = function(){
		var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
		pdfMake.createPdf(docDefinition).open('optionalName.pdf');
	};

  	if($routeParams.id){
		AturanGerakPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.contentAturangerakpandu = response;
				switch($scope.contentAturangerakpandu.flagAktif) {
				    case 1:
				        $scope.contentAturangerakpandu.flagAktif = "AKTIF";
				        break;
				    case 2:
				        $scope.contentAturangerakpandu.flagAktif = "TIDAK AKTIF";
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

	//function cancel
	$scope.cancel =  function(){
		$location.path('/aturangerakpandu');
	}
}]);
