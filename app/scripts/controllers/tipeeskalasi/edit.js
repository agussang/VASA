'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AturanGerakPanduEditCtrl
 * @description
 * # AturanGerakPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TipeEskalasiEditCtrl',['$scope','$routeParams','$location','TipeEskalasiEdit','Notification','LoadingScreen','CekTipeEskalasiKode',function ($scope,$routeParams,$location,TipeEskalasiEdit,Notification,LoadingScreen,CekTipeEskalasiKode) {
  LoadingScreen.show();
  $scope.tipeeskalasi = {};
  $scope.locationPath = '/tipeeskalasi';

  var dataEmpty = function(){
    $scope.detailFound  = false;
    $scope.loading    = false;
    $scope.contents   = 'no content found';
  };

  if($routeParams.id){
    TipeEskalasiEdit.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
        if(response !== undefined){
          //console.log(response);
          $scope.tempKodeEskalasi = response.escTypeCode;
          $scope.tipeeskalasi = response;
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

  $scope.simpan = function(){
    TipeEskalasiEdit.save($scope.tipeeskalasi, function(response){
      $scope.setNotification  = {
        type  : "success",
        message : "Data Berhasil Tersimpan"
      };
      Notification.setNotification($scope.setNotification);
      $location.path($scope.locationPath);
    }, function(response){
      $scope.setNotification  = {
        type  : "warning",
        message : "Data tidak berhasil tersimpan"
      };
      Notification.setNotification($scope.setNotification);
      $scope.buttonDisabled = false;
      $scope.showLoader = false;
    });
    
  }

  $scope.submit = function(){
    CekTipeEskalasiKode.get({kode:$scope.tipeeskalasi.escTypeCode}, function(response){
    //console.log(response);
    //console.log(response.id);
      if(response.id){
        //console.log("test");
        if($scope.tempKodeEskalasi = $scope.tipeeskalasi.escTypeCode){
          $scope.simpan();
        }else{
          $scope.setNotification  = {
            type  : "warning", //ex : danger, warning, success, info
            message : "Data Sudah Ada"
          };
          Notification.setNotification($scope.setNotification);
          $scope.buttonDisabled = false;
          $scope.showLoader = false;
        }
      }else{
        $scope.simpan();

      }
    });
  }
      
  // function cancel
  $scope.cancel =  function(){
    $location.path($scope.locationPath);
  }

}]);
