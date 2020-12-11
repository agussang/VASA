'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JamKerjaPanduEditCtrl
 * @description
 * # JamKerjaPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('JamKerjaPanduEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','JamKerjaPanduEdit','JamKerjaPanduDetail','KawasanPanduList','LoadingScreen', function($scope,$location,$filter,Notification,$routeParams,JamKerjaPanduEdit, JamKerjaPanduDetail, KawasanPanduLevelDuaList, LoadingScreen) {
    LoadingScreen.show();

    $scope.jamKerja = {};
    $scope.kawasan = {};

    KawasanPanduLevelDuaList.get(function(response){
      $scope.kawasan = response.content;
      //console.log(response);
    });

    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    if($routeParams.id){
    JamKerjaPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        $scope.jamKerja = response;

        $scope.jamMulai = moment($scope.jamKerja.jamMulai, "HH:mm").format("HH:mm");
        $scope.jamAkhir = moment($scope.jamKerja.jamAkhir, "HH:mm").format("HH:mm");
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


    $scope.$watch('jamMulai',function(newValue){
      if(newValue == undefined){
        $scope.jamMulaiInvalid = true;
      } else {
        $scope.jamMulaiInvalid = false;
      }
      //console.log(newValue);
    });

    $scope.$watch('jamAkhir',function(newValue){
      if(newValue == undefined){
        $scope.jamAkhirInvalid = true;
      } else {
        $scope.jamAkhirInvalid = false;
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

        JamKerjaPanduEdit.update({id:$routeParams.id},$scope.jamKerja,
          function(response){
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success", //ex : danger, warning, success, info
                message	: "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $location.path('/jamkerjapandu/list');
            }
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
