'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangMinKtEditCtrl
 * @description
 * # CabangMinKtEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('CabangMinKtEditCtrl',['$scope','$filter','$timeout','Notification','$routeParams', '$location','BranchMinKplTundaEdit','BranchMinKplTundaDetail','KantorList','LoadingScreen', 
function ($scope,$filter, $timeout,Notification,$routeParams, $location, BranchMinKplTundaEdit,BranchMinKplTundaDetail,LoadingScreen) {
	$scope.paramMinKt = {};
	$scope.locationPath =  '/kapal_tunda_min/list';

	BranchMinKplTundaDetail.get({id:$routeParams.id}, function(response){		
		$scope.tglBerlaku = new Date(response.tglBerlaku);
		$scope.paramMinKt = response;
	});

	$scope.submit = function(){
		$scope.buttonDisabled = false;
		$scope.paramMinKt.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		BranchMinKplTundaEdit.update({id: $routeParams.id},$scope.paramMinKt,function(response){
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
		$location.path('/kapal_tunda_min/list');
	}
}])