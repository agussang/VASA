'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDermagaKepilNewCtrl
 * @description
 * # MasterDermagaKepilNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterDermagaKepilNewCtrl',['$scope','$location','MasterDermagaKepilAdd','Notification','AppParam','MdmDermagaSearch','LoadingScreen','MasterDermagaKepilByKodeDermaga','MdmDermagaSearchByKode', function ($scope,$location,MasterDermagaKepilAdd,Notification,AppParam, MdmDermagaSearch,LoadingScreen,MasterDermagaKepilByKodeDermaga,MdmDermagaSearchByKode) {
  LoadingScreen.show();
  $scope.masterKepil = {};
  $scope.masterKepil.dermaga = {};
  $scope.masterKepil.flagAktif = 1;



  // get list dermaga
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

  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }
  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.masterKepil.dermaga){
      if(typeof $scope.masterKepil.dermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.masterKepil.dermaga = '';
      }
    }
  }

  $scope.cancel =  function(){
    $location.path('/masterdermagakepil/list');
  };

  $scope.submit = function(){
    $scope.buttonDisabled = false;

    $scope.masterKepil.kodeDermaga = $scope.masterKepil.dermaga.mdmgKode  ;
		$scope.masterKepil.namaDermaga = $scope.masterKepil.dermaga.mdmgNama  ;
    if ($scope.masterKepil.kodeDermaga === undefined ){
      $scope.setNotification  = {
          type  : "warning", //ex : danger, warning, success, info
          message : "Data yang Anda Masukan,Tidak Ada dalam Pilihan"
        };
         Notification.setNotification($scope.setNotification);
        return;
    }


    MasterDermagaKepilByKodeDermaga.get({
      kodeDermaga:$scope.masterKepil.kodeDermaga
    },function(response){
      var findSame = false;
      response.content.forEach(function(item){
        if(item.kodeDermaga == $scope.masterKepil.kodeDermaga){
          findSame = true;
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


        MasterDermagaKepilAdd.save($scope.masterKepil,function(response){

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
        $location.path('/masterdermagakepil/list');
        $scope.buttonDisabled = false;
        $scope.showLoader = false;

        // console.log($scope.masterKepil);
    });


      }
    });


  };

  LoadingScreen.hide();

}]);
