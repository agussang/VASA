'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PejabatEditCtrl
 * @description
 * # PejabatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PejabatEditCtrl',['$scope', '$routeParams', '$location', 'PejabatPengesahanDetail','PejabatPengesahanAdd','PejabatPengesahanEdit','Notification','AppParam','LoadingScreen',function ($scope, $routeParams, $location, PejabatPengesahanDetail, PejabatPengesahanAdd, PejabatPengesahanEdit,Notification, AppParam, LoadingScreen) {
    LoadingScreen.show();
  $scope.dataPejabat={};

  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };

  //get parameter JENIS_DOKUMEN
  AppParam.get({nama:'JENIS_DOKUMEN'},function(response){
    $scope.jenisDokumen = response.content;
  });

  //get parameter LEVEL
  AppParam.get({nama:'LEVEL_PEJABAT'},function(response){
    $scope.level = response.content;
  })

  //get parameter SEBAGAI
  AppParam.get({nama:'PEJABAT_SEBAGAI'},function(response){
    $scope.sebagai = response.content;
  });


	$scope.cancel =  function(){
		$location.path('/pejabat/list');
	}

  	if($routeParams.id){
		PejabatPengesahanDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.dataPejabat = response;
        console.log(response);
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

  $scope.submit = function(){
  $scope.buttonDisabled = true;
    PejabatPengesahanEdit.update($scope.dataPejabat,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type	: "success", //ex : danger, warning, success, info
          message	: "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/pejabat/list');
      }else{
        $scope.setNotification  = {
          type	: "warning", //ex : danger, warning, success, info
          message	: "Data tidak berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/pejabat/list');
      }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
    });
  };

}]);
