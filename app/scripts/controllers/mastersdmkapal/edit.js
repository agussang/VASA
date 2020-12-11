'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSDMKapalEditCtrl
 * @description
 * # MasterSDMKapalEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterSDMKapalEditCtrl',['$scope','$routeParams','$location','MasterSDMKapalDetail','MasterSDMKapalEdit','Notification', function ($scope,$routeParams,$location,MasterSDMKapalDetail,MasterSDMKapalEdit,Notification) {

	$scope.dataSDMKapal 		= {};
	$scope.dataSDMKapal.aktif 	= true;
	$scope.locationPath 		= '/mastersdmkapal/list';
	
	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

  	if($routeParams.id){
		MasterSDMKapalDetail.get({id:$routeParams.id},
			function(response){
				if(response !== undefined){
					$scope.dataSDMKapal = response;
				}else{
					dataEmpty();
				}
			},
			function(){
				dataEmpty();
			});
	}else{
		dataEmpty();
	}
	
	// function update
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		MasterSDMKapalEdit.update($scope.dataSDMKapal,
			function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path($scope.locationPath);
			},
			function(response){
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
		);
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}
   
}]);
