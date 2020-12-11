'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterEditCtrl
 * @description
 * # KapalCharterEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalBebasPTEditCtrl',['$scope', '$routeParams','$filter','$location','$timeout','LoadingScreen','AppParam','KapalBebasPTDetail','KapalBebasPTAdd','KapalBebasPTEdit','Notification','MdmKapalSearchByName','BuildPDF','MdmKapalSearchByKode','Validations',function ($scope, $routeParams, $filter, $location, $timeout,LoadingScreen,AppParam, KapalBebasPTDetail, KapalBebasPTAdd ,KapalBebasPTEdit,Notification, MdmPelangganDetail,MdmPelangganSearch,MdmKapalSearchByName,BuildPDF,MdmKapalSearchByKode,Validations) {
  LoadingScreen.show();
  $scope.options = {
      autoclose: true,
      todayBtn: '',
      todayHighlight: true
  };
  $scope.locationPath = '/kapal_bebas_pandu_tunda/list';
  $scope.tooltipInfo = Notification.setMessageValidFile();

  //get parameter JENIS_BEBAS_PANDU_TUNDA
  AppParam.get({nama:'JENIS_BEBAS_PANDU_TUNDA',sort:'value,asc'},function(response){
      $scope.jenisBebasPt = response.content;
  });

  //Start Set Disabled Date :
  var setDisableDate = function(){
      $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.kapalbebaspt.tglBerlaku);
      $('#tglBerlaku').mask('99-99-9999');
  };

  $scope.$watch('kapalbebaspt.tglBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
  });

  //End Set Disabled Date :
  $scope.kapalbebaspt = {};
  $scope.kapalbebaspt.flagAktif = 1;

  var dataEmpty = function(){
      $scope.detailFound = false;
      $scope.loading = false;
      $scope.contents = 'no content found';
  };

  $scope.cancel =  function(){
      $location.path('/kapal_bebas_pandu_tunda/list');
  }

  if($routeParams.id){
      KapalBebasPTDetail.get({id:$routeParams.id}, function(response){
        LoadingScreen.hide();
          if(response !== undefined){
            $scope.kapalbebaspt = response;
            $scope.kapalbebaspt.jenisBebasPt = String(response.jenisBebasPt);
            $scope.kapalbebaspt.tglBerlaku = new Date(response.tglBerlaku);
          }else{
            dataEmpty();
          }
      }, function(){
        dataEmpty();
      });
  }else{
      LoadingScreen.hide();
      dataEmpty();
  }

  // autocomplete
  $scope.getListOfKapal = function(value) {
      if (value) {
          return new Promise(function(resolve, reject) {
              MdmKapalSearchByName.get({
                  nama: value,
                  limit: '10'
              }, function(response) {
                  resolve(response);
              });
          });
      }
  };

  var uploadedCount = 0;

  $scope.files = [];
   
  $scope.submit = function(){
    $scope.buttonDisabled = true;
    $scope.kapalbebaspt.dokumen = $scope.kapalbebaspt.dokumen.base64?$scope.kapalbebaspt.dokumen.base64:$scope.kapalbebaspt.dokumen;
    $scope.kapalbebaspt.tglBerlaku = $filter('date')($scope.kapalbebaspt.tglBerlaku, 'yyyy-MM-ddT00:00:00');
    KapalBebasPTEdit.update({ id :$scope.kapalbebaspt.id }, $scope.kapalbebaspt,
      function(response){
        $scope.setNotification  = {
          type  : "success",
          message : "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path($scope.locationPath);
      },
      function(response){
        $scope.setNotification  = {
          type  : "warning",
          message : "Data tidak berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      }
    );
  }
}]);