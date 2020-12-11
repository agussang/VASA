'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MspanduEditCtrl
 * @description
 * # MspanduEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
  .controller('MspanduEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','Notification','AppParam','MasterSurchargePanduEdit','MasterSurchargePanduAdd','MasterSurchargePanduDetail','LoadingScreen', function ($scope,$routeParams,$filter,$timeout,$location,Notification,AppParam,MasterSurchargePanduEdit,MasterSurchargePanduAdd,MasterSurchargePanduDetail,LoadingScreen) {
    LoadingScreen.show();
  	$scope.msPandu 	= {};
	$scope.msPandu.aktif 	= true;
	$scope.locationPath 		= '/surchargepandu/list';

	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.msPandu.tglBerlaku = new Date();
	var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

	//get parameter area pelayanan
	AppParam.get({nama:'AREA_PELAYANAN'},function(response){
		// console.log(response);
		$scope.areaPelayanan = response.content;

	});

  	if($routeParams.id){
		MasterSurchargePanduDetail.get({id:$routeParams.id}, function(response){
		LoadingScreen.hide();
			if(response !== undefined){
				$scope.msPandu = response;
				$scope.msPandu.tglBerlaku = new Date ($scope.msPandu.tglBerlaku);
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		dataEmpty();
    LoadingScreen.hide();
	}

	//$scope.mspandu = {};
    $scope.submit = function(){
    	$scope.buttonDisabled = true;
		$scope.msPandu.areaPelayanan = parseInt($scope.msPandu.areaPelayanan);
		$scope.msPandu.tglBerlaku = $filter('date')($scope.msPandu.tglBerlaku, 'yyyy-MM-ddT00:00:00');
		MasterSurchargePanduEdit.update($scope.msPandu,
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

	},
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	};

  }]);
