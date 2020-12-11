'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JadwalPanduCtrl
 * @description
 * # JadwalPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('JadwalTambatCtrl', ['$scope','$location','$filter','$timeout','$route','LoadingScreen','Notification','GrupTambatList','JamKerjaTambatList','PetugasTambatList','JadwalTambatList','JadwalTambatAdd','JadwalTambatEdit','JadwalTambatDelete', function($scope,$location, $filter, $timeout,$route, LoadingScreen,Notification,GrupTambatList,JamKerjaTambatList,PetugasTambatList,JadwalTambatList,JadwalTambatAdd,JadwalTambatEdit,JadwalTambatDelete) {
    	$scope.parent = {tanggal:''};
      $scope.search = {};
      $scope.items = {};
      $scope.dateNumber = 0;
      $scope.shift = [[]];
      $scope.container = [[]];
      $scope.jadwalTambat = {};
      $scope.jadwal = [];
      $scope.jadwalList = {};
      $scope.tanggalList  = [];

      JamKerjaTambatList.get(function(response){
        $scope.shiftKerja = response.content;
        console.log(response);
        console.log($scope.shiftKerja);
        $scope.shiftKerja.push({id:-1,kodeShift:'HAPUS'});
      });

      $scope.getJadwalperGroup = function(idGroup){
        var bulanTahun = $scope.tahunTambat+'-'+$scope.bulanTambat;

        JadwalTambatList.get({idGroup:String(idGroup),blnThn:String(bulanTahun)},function(response) {
          $scope.jadwalList = response[0];
          $scope.tanggalList = response[0].listJamKerjaPerTanggal;
          $scope.tanggalList.forEach(function(data){
            $scope.shift[data.tanggal-1][idGroup] = {
              idJadwalTambat: data.idJadwalTambat,
              kodeShift: data.namaShift,
              id: String(data.tanggal)+String(idGroup)
            };
            $scope.container[data.tanggal-1][idGroup] = {
              idJadwalTambat: data.idJadwalTambat,
              isDefined: true
            };
          });
        });

      };


      GrupTambatList.get(function(response) {
        $scope.grupTambat = $filter('orderBy')(response.content ,'nama');
        $scope.grupTambat.forEach(function(element) {
          $scope.jadwal.push({
            id : element.id,
            nama: element.nama,
            items: []
          });
        });

        PetugasTambatList.get({size:999},function(response) {
          $scope.items = response.content;
          $scope.items.forEach(function(data) {
            $scope.jadwal.forEach(function(element) {
              if (data.idGroupPetugasTambat === element.id) {
                element.items.push(data);
              }
            });
          });
        });
      });

      $scope.createContainer = function(days){
        LoadingScreen.show();
        for (var i = 0; i < days; i++) {
          $scope.shift[i] = [];
          $scope.container[i] = [];
            $scope.grupTambat.forEach(function(data) {
              $scope.shift[i][data.id] = {};
              $scope.container[i][data.id] = {
                idJadwalTambat: null,
                isDefined: false
              };
            });
          }
      };

      $scope.splitDate = function(item) {
        var splitDate = item.split('-');
        $scope.bulanTambat = splitDate[0];
        $scope.tahunTambat = splitDate[1];
      };

      $scope.getJadwalBulanIni = function(periode) {
          $scope.grupTambat.forEach(function(data) {
              $scope.getJadwalperGroup(data.id,periode);
          });
          LoadingScreen.hide();
      };


      $scope.$watch('search.jadwalTambat', function(newValue) {
    		if(newValue) {
          $scope.splitDate(newValue);
          $scope.dateNumber = $scope.jumlahHariDalamBulan($scope.bulanTambat, $scope.tahunTambat);
          $scope.createContainer($scope.dateNumber);
          $scope.getJadwalBulanIni(newValue);
    		}
    	});

      $scope.jumlahHariDalamBulan = function(bulan,tahun) {
        return new Date(tahun, bulan, 0).getDate();
      };

      $scope.getIndexNumber = function(num) {
        return new Array(num);
      };

      $scope.createJadwalTambat = function(item, index , parent) {

        var tanggal, jamMulai, jamAkhir, tglMulai, tglAkhir, tanggalAkhirTemp ;

        tanggal = (index+1).toString().length === 1 ? '0'+ (index+1).toString():(index+1).toString();
        tanggalAkhirTemp = (index+2).toString().length === 1 ? '0'+ (index+2).toString():(index+2).toString();
        $scope.jadwalTambat.tglMulai = $filter('date')($scope.tahunTambat+'-'+$scope.bulanTambat+'-'+tanggal,'yyyy-MM-ddT00:00:00');

        jamMulai = moment($scope.shift[index][parent].jamMulai,"HH:mm:ss");
        jamAkhir = moment($scope.shift[index][parent].jamAkhir,"HH:mm:ss");
        tglMulai = $filter('date')($scope.jadwalTambat.tglMulai,"yyyy-MM-ddT");

          if (jamAkhir.diff(jamMulai, 'minutes') >= 0) {
            tglAkhir = tglMulai;
          } else {
            tglAkhir = $filter('date')($scope.tahunTambat+'-'+$scope.bulanTambat+'-'+tanggalAkhirTemp,'yyyy-MM-ddT');
          }

        $scope.jadwalTambat.idGroupPetugasTambat = parseInt(item.idGroupPetugasTambat);
        $scope.jadwalTambat.idJamKerjaTambat = parseInt($scope.shift[index][parent].id);
        $scope.jadwalTambat.jamAkhir = tglAkhir+$scope.shift[index][parent].jamAkhir;
        $scope.jadwalTambat.jamMulai = tglMulai+$scope.shift[index][parent].jamMulai;
        $scope.jadwalTambat.namaGroupPetugasTambat = item.namaGroupPetugasTambat;


        JadwalTambatAdd.save($scope.jadwalTambat,
          function(response){
            console.log(response);
            $scope.setNotification  = {
              type  : "success", //ex : danger, warning, success, info
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);

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
      };

      $scope.deleteJadwalTambat= function(index , parent) {
        var idJadwalTambat = $scope.container[index][parent].idJadwalTambat;
        if(idJadwalTambat != null){
         JadwalTambatDelete.delete({id:idJadwalTambat},function(response){
            // //console.log(response.$resolved);
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success",
                message	: "Data berhasil dihapus"
              };
              $scope.createContainer($scope.dateNumber);
              $scope.getJadwalBulanIni($scope.search.jadwalTambat);
            }else{
              $scope.setNotification  = {
                type	: "warning",
                message	: "Data tidak berhasil dihapus"
              };
            }
            Notification.setNotification($scope.setNotification);
          });
        }
      };

      $scope.updateJadwalTambat = function(item, index , parent) {
        var tanggal, jamMulai, jamAkhir, tglMulai, tglAkhir, tanggalAkhirTemp ;

        tanggal = (index+1).toString().length === 1 ? '0'+ (index+1).toString():(index+1).toString();
        tanggalAkhirTemp = (index+2).toString().length === 1 ? '0'+ (index+2).toString():(index+2).toString();
        $scope.jadwalTambat.tglMulai = $filter('date')($scope.tahunTambat+'-'+$scope.bulanTambat+'-'+tanggal,'yyyy-MM-ddT00:00:00');

        jamMulai = moment($scope.shift[index][parent].jamMulai,"HH:mm:ss");
        jamAkhir = moment($scope.shift[index][parent].jamAkhir,"HH:mm:ss");
        tglMulai = $filter('date')($scope.jadwalTambat.tglMulai,"yyyy-MM-ddT");

          if (jamAkhir.diff(jamMulai, 'minutes') >= 0) {
            tglAkhir = tglMulai;
          } else {
            tglAkhir = $filter('date')($scope.tahunTambat+'-'+$scope.bulanTambat+'-'+tanggalAkhirTemp,'yyyy-MM-ddT');
          }

        $scope.jadwalTambat.idGroupPetugasTambat = parseInt(item.idGroupPetugasTambat);
        $scope.jadwalTambat.idJamKerjaTambat = parseInt($scope.shift[index][parent].id);
        $scope.jadwalTambat.jamAkhir = tglAkhir+$scope.shift[index][parent].jamAkhir;
        $scope.jadwalTambat.jamMulai = tglMulai+$scope.shift[index][parent].jamMulai;
        $scope.jadwalTambat.namaGroupPetugasTambat = item.namaGroupPetugasTambat;


        JadwalTambatEdit.put($scope.jadwalTambat,
          function(response){
            console.log(response);
            $scope.setNotification  = {
              type  : "success", //ex : danger, warning, success, info
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);

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
      };

      $scope.submit = function(item, index , parent) {
        if ($scope.shift[index][parent].id == -1) {
            $scope.deleteJadwalTambat(index , parent);
              } else if ($scope.container[index][parent].isDefined){
                $scope.updateJadwalTambat(item, index , parent);
                  } else {
                    $scope.createJadwalTambat(item, index , parent);
                      }
      };

  }]);
