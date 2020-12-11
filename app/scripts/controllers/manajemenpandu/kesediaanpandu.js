'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KesediaanPanduCtrl
 * @description
 * # KesediaanPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KesediaanPanduCtrl', ['$scope','$location','$filter','$q','$timeout','KesediaanPanduList','KesediaanPanduPerHariList','KesediaanPanduAdd','KesediaanPanduEdit','LoadingScreen','JamKerjaPanduPerKawasanList','KawasanPanduLevelDuaList','Notification', function($scope, $location,$filter,$q,$timeout,KesediaanPanduList,KesediaanPanduPerHariList, KesediaanPanduAdd, KesediaanPanduEdit,LoadingScreen,JamKerjaPanduPerKawasanList, KawasanPanduLevelDuaList,Notification) {
    $scope.items = {};
    $scope.parent = {tanggal:''};
    $scope.search = {};
    $scope.kesediaan= {};
    $scope.kesediaanPandu = {};
    $scope.arrayIdPetugas = [];
    $scope.petugasPandu = [];
    $scope.petugasPanduConfirmed = [];

    KawasanPanduLevelDuaList.get(function(response){
      $scope.kawasan = response;
    });

    $scope.search.jadwalPandu = $filter('date')(Date.now(),"dd-MM-yyyy");

    $scope.$watch('idKawasan',function(newValue){
      if (newValue !== undefined){
        $scope.showTable = true;
        $scope.getJamKerja();
      } else {
        $scope.showTable = false;
      }
    });

    $scope.loadPetugasPandu = function(){
      $scope.petugasPandu = [];
      $scope.petugasPanduConfirmed = [];
      $scope.arrayIdPetugas = [];

      if($scope.tanggalPandu !== undefined && $scope.jamKerja !== undefined){
        LoadingScreen.show();
          KesediaanPanduList.get({
            idKawasan: $scope.idKawasan,
            mulai: $scope.tanggalPandu+" "+$scope.jamKerja.jamMulai
          },function (response) {
            //console.log(response);
            $scope.petugasPanduConfirmed = response.content;
            //console.log($scope.petugasPanduConfirmed);
            $scope.petugasPanduConfirmed.forEach(function(item){
              item.tanggalPandu = $filter('date')(item.mulai,"dd-MM-yyyy");
              item.jamPandu = $filter('date')(item.mulai,"HH:mm")+" - "+$filter('date')(item.selesai,"HH:mm");
              $scope.arrayIdPetugas.push(item.petugasId);
            });
          });

          $timeout(function() {
            KesediaanPanduPerHariList.get({
              tanggal: $scope.tanggalPandu,
              idJamKerjaPandu: $scope.jamKerja.id
            }, function(response) {
                $scope.items = response;
                //console.log($scope.items);
                $scope.items.forEach(function(item){
                  item.tanggalPandu = $filter('date')(item.mulai,"dd-MM-yyyy");
                  item.jamPandu = $filter('date')(item.mulai,"HH:mm")+" - "+$filter('date')(item.selesai,"HH:mm");
                  if (item.idKawasan === $scope.idKawasan){
                    if (!$scope.arrayIdPetugas.includes(item.petugasId)) {
                        $scope.petugasPandu.push(item);
                    }
                  }
                });
            });

          LoadingScreen.hide();
          }, 500);

        }
    };

    $scope.getJamKerja = function(){
      JamKerjaPanduPerKawasanList.get({idKawasan:$scope.idKawasan},function(response) {
        response.forEach(function(element){
            element.labelJamMulai = moment(element.jamMulai, "HH:mm").format("HH:mm");
            element.labelJamAkhir = moment(element.jamAkhir, "HH:mm").format("HH:mm");
            element.label = element.labelJamMulai +" - "+ element.labelJamAkhir;
        });
        $scope.shiftKerja = response;
      });
    };

    $scope.$watch('search.jadwalPandu', function(newValue){
      if (newValue != undefined) {
        $scope.tanggalPandu = moment(newValue,"DD-MM-YYYY").format("YYYY-MM-DD");
        $scope.loadPetugasPandu();
      }
    });

    $scope.$watch('jamKerja', function(newValue, oldValue){
      if (newValue) {
          $scope.loadPetugasPandu();
      }
    });

    $scope.updateKesediaanPandu = function(item) {
      $scope.kesediaanPanduUpdate = item;
      KesediaanPanduEdit.update({id:item.id},$scope.kesediaanPanduUpdate,
        function(response){
          ////console.log($scope.grupPandu);
          if(response.$resolved){
            $scope.setNotification  = {
              type	: "success", //ex : danger, warning, success, info
              message	: "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
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
        $scope.loadPetugasPandu();
    };

    $scope.createKesediaanPandu = function(item){
        $scope.kesediaanPandu = item;
      if ($scope.kesediaanPandu.statusAbsen == null || $scope.kesediaanPandu.statusKesediaan == null) {
        $scope.setNotification = {
          type: "warning", //ex : danger, warning, success, info
          message: "<b>kesediaan</b> dan <b>absensi</b> harus diisi"
        };
        Notification.setNotification($scope.setNotification);
        return false;
      } else {
        KesediaanPanduAdd.save($scope.kesediaanPandu, function(response){
        $scope.arrayIdPetugas.push(response.petugasId);
        });
        $timeout(function () {
          $scope.loadPetugasPandu();
        }, 300);
      }
    };

  }]);
