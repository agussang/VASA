'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JamKerjaTambatNewCtrl
 * @description
 * # JamKerjaTambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('JamKerjaTambatNewCtrl', ['$scope','$location','Notification','JamKerjaTambatAdd', function($scope,$location,Notification,JamKerjaTambatAdd) {
    $scope.jamKerja = {};
    $scope.jamKerja.jamMulai = {};
    $scope.jamKerja.jamAkhir = {};


    $scope.$watch('jamMulai',function(newValue){
      if(newValue == undefined){
        $scope.jamMulaiInvalid = true;
      } else {
        $scope.jamMulaiInvalid = false;
        $scope.splitJamMulai = $scope.jamMulai.split(':');
      }
    });

    $scope.$watch('jamAkhir',function(newValue){
      if(newValue == undefined){
        $scope.jamAkhirInvalid = true;
      } else {
        $scope.jamAkhirInvalid = false;
        $scope.splitJamAkhir = $scope.jamAkhir.split(':');
      }
      //console.log(newValue);
    });

    $scope.submit = function(){
      $scope.buttonDisabled = false;
      if ($scope.jamAkhir === $scope.jamMulai) {
        $scope.setNotification  = {
          type	: 'warning',
          message	: '<b>Jam Mulai</b> tidak boleh sama dengan <b>Jam Akhir</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.jamAkhir = '';
        $scope.showLoader = false;
      } else {

        $scope.jamKerja.jamMulai = $scope.jamMulai;
        $scope.jamKerja.jamAkhir = $scope.jamAkhir;

        JamKerjaTambatAdd.save($scope.jamKerja,
          function(response){
            //console.log($scope.masterDenda);
            $scope.setNotification  = {
              type  : "success", //ex : danger, warning, success, info
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            $location.path('/jamkerjatambat/list');
          },
          function(response){
            $scope.setNotification  = {
              type  : "warning", //ex : danger, warning, success, info
              message : "Data tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            $scope.buttonDisabled = false;
            $scope.showLoader = false;
          });

      }
    }

    $scope.cancel = function () {
      $location.path('/jamkerjatambat/list');
    }
}]);
