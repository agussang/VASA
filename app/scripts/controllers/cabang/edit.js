'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangEditCtrl
 * @description
 * # CabangEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('CabangEditCtrl',['$scope','$filter','$timeout','Notification','$routeParams', '$location', 'ParamsCabangEdit','ParamsCabangDetail','KantorList','LoadingScreen', function ($scope,$filter, $timeout,Notification,$routeParams, $location, ParamsCabangEdit,ParamsCabangDetail, KantorList,LoadingScreen) {
  LoadingScreen.show();
  $scope.paramcabang = {};
	$scope.locationPath = '/cabang/list';
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};
	KantorList.get(function(response){
    LoadingScreen.hide();
    $scope.listKantor = response.content;
		// console.log($scope.listKantor);
	});
	ParamsCabangDetail.get({id:$routeParams.id}, function(response){
		$scope.paramcabang = response;
		$scope.paramcabang.tglMulai =  $scope.paramcabang.tglMulai;
		// $scope.paramcabang.tglAkhir =  new Date(response.tglAkhir);
	});

  $scope.$watch('paramcabang.tglMulai', function(){
		$('#tglMulai').mask('99-99-9999');
	});

	$scope.submit = function(){
		$scope.buttonDisabled = false;
		$scope.paramcabang.tglMulai = $filter('date')($scope.paramcabang.tglMulai, 'yyyy-MM-ddT00:00:00');
		$scope.paramcabang.tglAkhir = $filter('date')($scope.paramcabang.tglAkhir, 'yyyy-MM-ddT00:00:00');
		// console.log($scope.paramcabang);
		// return;
		ParamsCabangEdit.update($scope.paramcabang,
			function(response){
				if(response.$resolved){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				}
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			},
			function(response){
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Koneksi tidak terhubung..."
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
		);
	}

	$scope.cancel =  function(){
		$location.path('/cabang/list');
	}
}]);
