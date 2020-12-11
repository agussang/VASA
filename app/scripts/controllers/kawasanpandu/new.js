'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KawasanPanduNewCtrl', ['$scope','$location','KawasanPanduAdd','KawasanPanduList','KawasanPanduLevelSatuList','Notification','AppParam','LoadingScreen',function($scope,$location,KawasanPanduAdd,KawasanPanduList, KawasanPanduLevelSatuList,Notification,AppParam,LoadingScreen) {
    $scope.kawasanPandu = {};
    LoadingScreen.show();
    //GET JENIS LAPORAN PARAMETER

		AppParam.get({nama:'JENIS_STASIUN_PANDU'},function(response){
  		$scope.level = response.content;
  		LoadingScreen.hide();
		});

    KawasanPanduLevelSatuList.get(function(response) {
      $scope.listCabang = response;
      if (response.length === 0) {
        $scope.setNotification = {
          type: "warning", //ex : danger, warning, success, info
          message: "Silahkan isi Cabang terlebih dahulu"
        };
        Notification.setNotification($scope.setNotification);
      }
    });

    $scope.submit= function(){
      if ($scope.kawasanPandu.level=='CABANG') {
        $scope.kawasanPandu.parentId = 0;
      }


      $scope.buttonDisabled = false;
        KawasanPanduList.get(
          {namaKawasan: $scope.kawasanPandu.namaKawasan}, function (response) {
            var findSame = false;
            response.content.forEach(function(element){
              if (element.namaKawasan.toLowerCase() ===  $scope.kawasanPandu.namaKawasan.toLowerCase()) {
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
            KawasanPanduAdd.save(JSON.stringify($scope.kawasanPandu),
              function(response){
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path('/kawasanpandu/list');
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
      $location.path('/kawasanpandu/list');
    };

  }]);
