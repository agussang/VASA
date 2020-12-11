'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('GrupPanduNewCtrl', ['$scope','$location','GrupPanduAdd','GrupPanduList','KawasanPanduLevelDuaList','Notification',function($scope,$location,GrupPanduAdd,GrupPanduList,KawasanPanduLevelDuaList,Notification) {
    $scope.grupPandu = {};
    $scope.grupPandu.kodeTerminalBaru = localStorage.getItem('kodeTerminalBaru').toString();
    $scope.grupPandu.kodeTerminalBaru = $scope.grupPandu.kodeTerminalBaru.length < 2 ? '0' +	$scope.grupPandu.kodeTerminalBaru : 	$scope.grupPandu.kodeTerminalBaru;

    $scope.kawasan = {};
    KawasanPanduLevelDuaList.get(function(response){
      $scope.kawasan = response;
      //console.log($scope.group);
    });

    $scope.submit= function(){
      $scope.buttonDisabled = false;

     GrupPanduList.get(
        {kodeGroup: $scope.grupPandu.kodeGroup}, function (response) {
          var findSame = false;
          response.content.forEach(function(element){
            if (element.kode ===  $scope.grupPandu.kodeGroup) {
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
            GrupPanduAdd.save(JSON.stringify($scope.grupPandu),
              function(response){
                //console.log($scope.masterDenda);
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path('/gruppandu/list');
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
      $location.path('/gruppandu/list');
    }
  }]);
