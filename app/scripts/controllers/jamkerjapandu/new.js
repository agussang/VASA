'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JamKerjaPanduNewCtrl
 * @description
 * # JamKerjaPanduNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('JamKerjaPanduNewCtrl', ['$scope','$location','Notification','JamKerjaPanduAdd','KawasanPanduLevelDuaList','KawasanPanduList', function($scope,$location,Notification,JamKerjaPanduAdd,KawasanPanduLevelDuaList,KawasanPanduList) {
    $scope.jamKerja = {};
    $scope.jamKerja.jamMulai = {};
    $scope.jamKerja.jamAkhir = {};
    $scope.kawasan = {};

    KawasanPanduLevelDuaList.get(function(response){
      $scope.kawasan = response;
    });

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

        JamKerjaPanduAdd.save($scope.jamKerja,
          function(response){
            //console.log($scope.masterDenda);
            $scope.setNotification  = {
              type  : "success", //ex : danger, warning, success, info
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            $location.path('/jamkerjapandu/list');
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
      $location.path('/jamkerjapandu/list');
    }
}]);
