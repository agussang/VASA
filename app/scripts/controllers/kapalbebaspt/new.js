'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalBebasPTNewCtrl
 * @description
 * # KapalBebasPTNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('KapalBebasPTNewCtrl',['$scope', '$filter','$timeout', '$location','KapalBebasPTAdd','Notification','AppParam','LoadingScreen','MdmKapalList','MdmKapalSearchByKode','$base64', function ($scope,$filter,$timeout,$location,KapalBebasPTAdd,Notification,AppParam,LoadingScreen,MdmKapalList,MdmKapalSearchByKode,$base64) {
  $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
  };
  var valueField;
  $scope.kapalbebaspt = {};
  $scope.locationPath = '/kapal_bebas_pandu_tunda/list';
  $scope.tglBerlaku = new Date();
  $scope.tooltipInfo = Notification.setMessageValidFile();
  $scope.kapalbebaspt.flagAktif = 1;
  $scope.$watch('tglBerlaku', function(){
      $('#IdtglBerlaku').mask('99-99-9999');
  });
  $scope.validationLookupKapal= function(){
      if(valueField !== $scope.mdmKapal  ){
          if(typeof $scope.mdmKapal != 'object' ){
              $scope.setNotification  = {
                  type  : 'warning',
                  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
              };
              Notification.setNotification($scope.setNotification);
              $scope.mdmKapal = '';
          }
      }
  }

  $scope.getListOfmdmKapal = function(value) {
      if (value) {
          return new Promise(function(resolve, reject) {
              MdmKapalSearchByKode.get({
                  nama: value,
                  limit: '10'
              }, function(response) {
                  resolve(response);
              });
          });
      }
  };

  //get parameter JENIS_KAPAL
  AppParam.get({nama:'JENIS_BEBAS_PANDU_TUNDA', sort:'value,asc'},function(response){
    $scope.jenisBebasPt = response.content;
  });


  $scope.submit = function(){
    $scope.buttonDisabled = true;
    $scope.kapalbebaspt.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.kapalbebaspt.kodeKapal = $scope.kapalbebaspt.mdmKapal.mkplKode;
    $scope.kapalbebaspt.dokumen = $scope.kapalbebaspt.dokumen.base64?$scope.kapalbebaspt.dokumen.base64:$scope.kapalbebaspt.dokumen;

    KapalBebasPTAdd.save($scope.kapalbebaspt,
      function(response){
        if(response.$resolved){
          $scope.setNotification  = {
            type  : "success", 
            message : "Data berhasil tersimpan"
          };
          Notification.setNotification($scope.setNotification);
          $location.path($scope.locationPath);
        }else{
          $scope.setNotification  = {
            type  : "warning", 
            message : "Data tidak berhasil tersimpan"
          };
          Notification.setNotification($scope.setNotification);
        }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      },
      function(response){
        $scope.setNotification  = {
          type  : "danger", 
          message : "Koneksi tidak terhubung..."
        };
        Notification.setNotification($scope.setNotification);
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      });
  }
}]);
