'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('GrupTambatNewCtrl', ['$scope','$location','GrupTambatAdd','GrupTambatList','GrupTambatSearch','KawasanPanduLevelDuaList','Notification',function($scope,$location,GrupTambatAdd,GrupTambatList,GrupTambatSearch,KawasanPanduLevelDuaList,Notification) {
    $scope.grupTambat = {};
    $scope.grupTambat.kodeCabang = localStorage.getItem('kodeCabang').toString();
    $scope.grupTambat.kodeCabang = $scope.grupTambat.kodeCabang.length < 2 ? '0' +	$scope.grupTambat.kodeCabang : $scope.grupTambat.kodeCabang;


    $scope.submit= function(){
      $scope.buttonDisabled = false;

     GrupTambatSearch.get(
        {nama: $scope.grupTambat.nama}, function (response) {
          var findSame = false;
          if (response[0] !== 'undefined') {
            response.forEach(function(element){
              if (element.nama ===  $scope.grupTambat.nama) {
                  findSame = true;
              }
            });
          }

          if (findSame) {
            $scope.showLoader = false;
            $scope.setNotification = {
              type: "warning", //ex : danger, warning, success, info
              message: "Data yang diinputkan sudah ada"
            };
            Notification.setNotification($scope.setNotification);
            return false;
          } else {
            console.log($scope.grupTambat);
            GrupTambatAdd.save($scope.grupTambat,
              function(response){
                //console.log($scope.masterDenda);
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path('/gruptambat/list');
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

    }

    $scope.cancel = function() {
      $location.path('/gruptambat/list');
    }
  }]);
