'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PivotKeuanganCtrl
 * @description
 * # PivotKeuanganCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('PivotKeuanganCtrl',['$scope','$rootScope','PDF','LoadingScreen',function ($scope,$rootScope,PDF,LoadingScreen) {
	LoadingScreen.show();

	$("#iframePivotTable").ready(function(){
		LoadingScreen.hide();
	});

	$scope.exportPDF = function() {
		PDF.htmlTabel2PDF($("#iframePivotTable").contents().find('.pvtTable'),'PIVOT KEUANGAN');
	}

}]);
