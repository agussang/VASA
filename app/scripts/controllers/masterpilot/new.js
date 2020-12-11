'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasTambatNewCtrl
 * @description
 * # PetugasTambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MasterPilotNewCtrl', ['$scope','$location','$filter','Notification','AppParam','MasterPilotShuttleCarAdd','MasterPilotBoatAdd',function($scope,$location,$filter,Notification,AppParam,MasterPilotShuttleCarAdd,MasterPilotBoatAdd) {

    $scope.locationPath = '/masterpilot/list';
    $scope.tglBerlaku = new Date();
    $scope.masterpilot = {};

     //get parameter JENIS_KENDARAAN
    AppParam.get({nama:'JENIS_KENDARAAN_PILOT'},function(response){
      $scope.listJnsKendaraan = response.content;
    });

    $scope.isDisabledShuttleCar = true;
    $scope.isDisabledBoat = true;

    $scope.changeJnsKendaraan = function (){
      if ($scope.masterpilot.jnsKendaraan == 1 ) {
          $scope.isDisabledShuttleCar = false;
          $scope.isDisabledBoat = true;
      } else {
          $scope.isDisabledShuttleCar = true;
          $scope.isDisabledBoat = false;
      }
    }

    $scope.submit= function(){
      $scope.buttonDisabled = true;
      $scope.masterpilot.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00'); 


      if ($scope.masterpilot.jnsKendaraan == 1 ) {
        $scope.masterpilotcar.tglBerlaku = $scope.masterpilot.tglBerlaku;
          MasterPilotShuttleCarAdd.save($scope.masterpilotcar,
              function(response){
              if(response.$resolved){
                $scope.setNotification  = {
                  type  : "success", 
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path($scope.locationPath);
              }else{
                $scope.setNotification  = {
                  type  : "warning", 
                  message : "Data tidak berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
              }
              $scope.buttonDisabled = false;
              $scope.showLoader = false;
            },
            function(response){
              $scope.setNotification  = {
                type  : "danger", 
                message : "Koneksi tidak terhubung..."
              };
              Notification.setNotification($scope.setNotification);
              $scope.buttonDisabled = false;
              $scope.showLoader = false;
            });
      } else {
               $scope.masterpilotboat.tglBerlaku = $scope.masterpilot.tglBerlaku;
               MasterPilotBoatAdd.save($scope.masterpilotboat,
                function(response){
                if(response.$resolved){
                  $scope.setNotification  = {
                    type  : "success", 
                    message : "Data berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                  $location.path($scope.locationPath);
                }else{
                  $scope.setNotification  = {
                    type  : "warning", 
                    message : "Data tidak berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                }
                $scope.buttonDisabled = false;
                $scope.showLoader = false;
              },
              function(response){
                $scope.setNotification  = {
                  type  : "danger", 
                  message : "Koneksi tidak terhubung..."
                };
                Notification.setNotification($scope.setNotification);
                $scope.buttonDisabled = false;
                $scope.showLoader = false;
              });
      }
    };

    $scope.cancel = function() {
      $location.path('/masterpilot/list');
    }
  }]);
