'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSurchargeTundaEditCtrl
 * @description
 * # MasterSurchargeTundaEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MartersurchargetundaEditCtrl',['$scope','$routeParams','$location','$filter','MasterSurchargeTundaDetail','MasterSurchargeTundaEdit','Notification','LoadingScreen',function ($scope,$routeParams,$location,$filter,MasterSurchargeTundaDetail,MasterSurchargeTundaEdit,Notification, LoadingScreen) {
	LoadingScreen.show();
	$scope.dataSurchargeTunda = {};
	$scope.dataSurchargeTunda.status = true;
	$scope.locationPath = '/mastersurchargetunda/list';
	$scope.options = {
	      autoclose: true,
	      todayBtn: '',
	      todayHighlight: true
	  };
	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

  	if($routeParams.id){
		MasterSurchargeTundaDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				$scope.dataSurchargeTunda = response;
				$scope.dataSurchargeTunda.tglBerlaku = new Date (response.tglBerlaku);
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

	//function for event submit ::
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.dataSurchargeTunda.tglBerlaku = $filter('date')($scope.dataSurchargeTunda.tglBerlaku, 'yyyy-MM-ddT00:00:00');
		MasterSurchargeTundaEdit.update($scope.dataSurchargeTunda,
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

	//function for cancel ::
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

}]);
