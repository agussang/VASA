'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PejabatPengesahanNewCtrl
 * @description
 * # PejabatPengesahanNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PejabatNewCtrl',['$scope','$location','PejabatPengesahanAdd','Notification','AppParam','PejabatPengesahanByNIP','LoadingScreen', function ($scope,$location,PejabatPengesahanAdd,Notification,AppParam,PejabatPengesahanByNIP,LoadingScreen) {
  LoadingScreen.show();
  $scope.pejabat = {};
  $scope.pejabat.otorisasi =true;

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

  $scope.submit = function(){
    $scope.buttonDisabled = false;
    $scope.pejabat.namaTercetak = $scope.pejabat.nama;
    $scope.pejabat.jabatanTercetak = $scope.pejabat.jabatan;

    PejabatPengesahanByNIP.get({
      nip:$scope.pejabat.nip
    },function(response){
        var findSame = false;
        response.content.forEach(function(item){
          if(item.nip == $scope.pejabat.nip ) {
            findSame = true;
          }
        });

        if(findSame) {
          // alert('wew');
          $scope.showLoader = false;
          $scope.setNotification = {
            type: "warning", //ex : danger, warning, success, info
            message: "Data yang di inputkan sudah ada"
          };
          Notification.setNotification($scope.setNotification);
          return false;
        } else {
          PejabatPengesahanAdd.save($scope.pejabat,function(response){

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
            $location.path('/pejabat/list');
            $scope.buttonDisabled = false;
            $scope.showLoader = false;
          });
        }
    });
  };

LoadingScreen.hide();
}]);
