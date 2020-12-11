'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaNewCtrl
 * @description
 * # MasterDendaNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterDendaNewCtrl',['$scope','$location','MasterDendaAdd','Notification','AppParam','MdmDermagaSearch','LoadingScreen','MasterDendaByKodeDenda','MdmDermagaSearchByKode', function ($scope,$location,MasterDendaAdd,Notification,AppParam, MdmDermagaSearch,LoadingScreen,MasterDendaByKodeDenda,MdmDermagaSearchByKode) {
  LoadingScreen.show();
  $scope.masterDenda = {};
  $scope.masterDenda.dermaga = {};
  $scope.masterDenda.flagDenda = 1;
  $scope.masterDenda.flagAktif = 1;

  //get parameter JENIS_DENDA
  AppParam.get({nama:'JENIS_DENDA'},function(response){
    LoadingScreen.hide();
    $scope.jenisDenda = response.content;
  });

  //get parameter JASA
  AppParam.get({nama:'JASA'},function(response){
    $scope.jenisJasa = response.content;
  });

  //get parameter SIFAT_DENDA
  AppParam.get({nama:'SIFAT_DENDA'},function(response){
    $scope.sifatDenda = response.content;
  });

  // get list dermaga
  $scope.getListOfDermaga = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal: localStorage.getItem('kodeTerminal'),
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
          kodeTerminal: localStorage.getItem('kodeTerminal'),
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
    if(valueField !== $scope.masterDenda.dermaga){
      if(typeof $scope.masterDenda.dermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        return $scope.masterDenda.dermaga='';
      }
    }
  }
  /*end validasi autocomplete*/

  $scope.cancel =  function(){
    $location.path('/masterdenda/list');
  };

  $scope.submit = function(){
    $scope.buttonDisabled = false;
    //$scope.masterDenda.kodeDermaga = $scope.masterDenda.dermaga.mdmgKode  ;
    $scope.masterDenda.namaDermaga = $scope.masterDenda.dermaga.mdmgNama  ;

    MasterDendaByKodeDenda.get({
      kodeDenda:$scope.masterDenda.kodeDenda
    },function(response){

      //do validation
      var findSame=false;
      response.content.forEach(function(item){
        if(item.kodeDenda == $scope.masterDenda.kodeDenda){
          findSame=true;
        }
      });


      if(findSame){
          $scope.showLoader = false;
          $scope.setNotification = {
            type: "warning", //ex : danger, warning, success, info
            message: "Data yang diinputkan sudah ada"
          };
          Notification.setNotification($scope.setNotification);
          return false;
      }else{
        if(typeof $scope.masterDenda.dermaga==='object'){
          $scope.masterDenda.kodeDermaga=$scope.masterDenda.dermaga.mdmgKode;
          $scope.masterDenda.namaDermaga=$scope.masterDenda.dermaga.mdmgNama;
        }else{
          $scope.masterDenda.kodeDermaga=$scope.masterDenda.dermaga;
        }

        MasterDendaAdd.save($scope.masterDenda,
          function(response){
            console.log($scope.masterDenda);
            $scope.setNotification  = {
              type  : "success", //ex : danger, warning, success, info
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            $location.path('/masterdenda/list');
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


}]);
