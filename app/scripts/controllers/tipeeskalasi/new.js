'use strict';
/**
 * @ngdoc function
 * @name vasaApp.controller:aturangerakpanduNewCtrl
 * @description
 * # aturangerakpanduNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('TipeEskalasiNewCtrl',['$scope','$location','TipeEskalasiAdd','Notification',  'LoadingScreen','CekTipeEskalasiKode', function ($scope,$location,TipeEskalasiAdd,Notification, LoadingScreen, CekTipeEskalasiKode) {
  LoadingScreen.show();
  $scope.tipeeskalasi = {};
  $scope.submit = function(){
    $scope.buttonDisabled = true;

    CekTipeEskalasiKode.get({kode:$scope.tipeeskalasi.escTypeCode}, function(response){
      console.log(response);
      console.log(response.id);
      if(response.id){
        console.log("test");
        $scope.setNotification  = {
          type  : "warning", //ex : danger, warning, success, info
          message : "Data Sudah Ada"
        };
        Notification.setNotification($scope.setNotification);
        $scope.buttonDisabled = false;
            $scope.showLoader = false;
      }else{
        //console.log("test2");

        TipeEskalasiAdd.save($scope.tipeeskalasi,function(response){
          $scope.setNotification  = {
            type  : "success", //ex : danger, warning, success, info
            message : "Data berhasil tersimpan"
          };
           Notification.setNotification($scope.setNotification);
            $location.path('/tipeeskalasi');
            $scope.buttonDisabled = false;
            $scope.showLoader = false;
        });
      }
     
    });
   

    /*TipeEskalasiAdd.save($scope.tipeeskalasi,function(response){
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
      $location.path('/tipeeskalasi');
      $scope.buttonDisabled = false;
      $scope.showLoader = false;
      });
*/
  }

  $scope.cancel = function() {
    $location.path('/tipeeskalasi');
  };

  LoadingScreen.hide();
}]);
