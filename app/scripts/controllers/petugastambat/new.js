'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasTambatNewCtrl
 * @description
 * # PetugasTambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PetugasTambatNewCtrl', ['$scope','$location','PetugasTambatAdd','GrupTambatList','GrupDermagaTambatList','PetugasTambatList','Notification',function($scope,$location,PetugasTambatAdd,GrupTambatList,GrupDermagaTambatList,PetugasTambatList,Notification) {
    $scope.petugasTambat = {};
    $scope.dermagaTambat = {};

    GrupTambatList.get(function(response) {
      $scope.grupTambat = response.content;
    });

    GrupDermagaTambatList.get(function(response) {
      $scope.grupDermaga = response.content;
    });

    $scope.submit= function(){
      $scope.petugasTambat.idGroupDermagaTambat = $scope.dermagaTambat.id;
      $scope.petugasTambat.namaGroupDermagaTambat = $scope.dermagaTambat.nama;
      $scope.buttonDisabled = false;
      PetugasTambatList.get(
        {kode: $scope.petugasTambat.kodePetugas}, function (response) {
          //console.log(response);
          var findSame = false;
          response.content.forEach(function(element){
            if (element.kodePetugas === $scope.petugasTambat.kodePetugas) {
                findSame = true;
            }
          });

          if (findSame) {
            $scope.showLoader = false;
            $scope.setNotification = {
              type: "warning", //ex : danger, warning, success, info
              message: "Data yang diinputkan sudah ada"
            };
            Notification.setNotification($scope.setNotification);
            return false;
          } else {
            PetugasTambatAdd.save( JSON.stringify($scope.petugasTambat),
              function(response){
                //console.log($scope.masterDenda);
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path('/petugastambat/list');
              },
              function(response){
                $scope.setNotification  = {
                  type  : "warning", //ex : danger, warning, success, info
                  message : "Data tidak berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $scope.buttonDisabled = false;
                $scope.showLoader = false;
              }
            );
          }
        }
      );
    };

    $scope.cancel = function() {
      $location.path('/petugastambat/list');
    }
  }]);
