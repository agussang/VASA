'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('DermagaPanduNewCtrl', ['$scope','$location','KawasanPanduAdd','KawasanPanduList','KawasanPanduLevelDuaList','MdmDermagaSearchByKode','MdmDermagaSearch','Notification','AppParam','LoadingScreen','DermagaPanduAdd','DermagaPanduList',function($scope,$location,KawasanPanduAdd,KawasanPanduList, KawasanPanduLevelDuaList,MdmDermagaSearchByKode,MdmDermagaSearch,Notification,AppParam,LoadingScreen,DermagaPanduAdd,DermagaPanduList) {
    $scope.dermagaPandu = {};
    LoadingScreen.show();

    //GET JENIS LAPORAN PARAMETER
    KawasanPanduLevelDuaList.get(function(response) {
        $scope.kawasan = response;
          LoadingScreen.hide();
    });

    $scope.getListOfDermaga = function(value) {
      if (value && value.length <=3) {
        return new Promise(function(resolve) {
          MdmDermagaSearchByKode.get({
            kode: value,
  					kodeTerminal : localStorage.getItem('kodeTerminal'),
  					limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
            //console.log(response);
          });
        });
      } else if (value.length > 3 ){
        return new Promise(function(resolve) {
          MdmDermagaSearch.get({
            nama: value,
  					kodeTerminal : localStorage.getItem('kodeTerminal'),
  					limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
            //console.log(response);
          });
        });
      }
    };


      /* validasi autocomplete */
      var valueField = '';
      $scope.checkValue = function(value){
        valueField = value;
       }

      $scope.validationLookupDermaga= function(){
        if(valueField !== $scope.dermagaPandu.dermaga){
          if(typeof  $scope.dermagaPandu.dermaga != 'object'){
            $scope.setNotification  = {
              type  : 'warning',
              message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
            };
            Notification.setNotification($scope.setNotification);
            return  $scope.dermagaPandu ='';
          }
        }
      }
      /*end validasi autocomplete*/

      $scope.cancel =  function(){
        $location.path('/dermagapandu/list');
      };

    $scope.submit= function(){
      $scope.dermagaPandu.lokasi = $scope.dermagaPandu.dermaga.mdmgNama;
      $scope.buttonDisabled = false;


      DermagaPanduList.get({lokasi:$scope.dermagaPandu.dermaga.mdmgNama},
        function(response){
          var findSame = false;
          response.content.forEach(function(item){
            if ($scope.dermagaPandu.lokasi.toLowerCase() === item.lokasi.toLowerCase() ) {
              findSame = true;
            }
          });
          if (findSame) {
            $scope.setNotification  = {
              type  : "warning", //ex : danger, warning, success, info
              message : "Data sudah ada"
            };
            Notification.setNotification($scope.setNotification);
            return false;
          } else {
            DermagaPanduAdd.save(JSON.stringify($scope.dermagaPandu),
                function(response){
                  $scope.setNotification  = {
                    type  : "success", //ex : danger, warning, success, info
                    message : "Data berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                  $location.path('/dermagapandu/list');
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
        });
      };



    $scope.cancel = function() {
      $location.path('/dermagapandu/list');
    };

  }]);
