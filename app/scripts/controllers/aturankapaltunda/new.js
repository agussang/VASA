'use strict';
/**
 * @ngdoc function
 * @name vasaApp.controller:aturangerakpanduNewCtrl
 * @description
 * # aturangerakpanduNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('AturanKapalTundaNewCtrl',['$scope','$location','AturanKapalTundaAdd','Notification',  'LoadingScreen',function ($scope,$location,AturanKapalTundaAdd,Notification, LoadingScreen) {
  LoadingScreen.show();
  
  $scope.aturankapaltunda = {};
  $scope.submit = function(){

    $scope.buttonDisabled = true;
   

    AturanKapalTundaAdd.save($scope.aturankapaltunda,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type  : "success", //ex : danger, warning, success, info
          message : "Data berhasil tersimpan"
        };
      }else{
        $scope.setNotification  = {
          type  : "warning", //ex : danger, warning, success, info
          message : "Data tidak berhasil tersimpan"
        };
      }
      Notification.setNotification($scope.setNotification);
      $location.path('/manajementunda/aturankapaltunda');
      $scope.buttonDisabled = false;
      $scope.showLoader = false;
      });
  }

  $scope.cancel = function() {
      $location.path('/manajementunda/aturankapaltunda');
    };

  LoadingScreen.hide();
}]);



