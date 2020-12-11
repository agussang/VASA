'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KawasanPanduEditCtrl
 * @description
 * # KawasanPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('DermagaPanduEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','KawasanPanduEdit','KawasanPanduDetail','LoadingScreen','KawasanPanduLevelDuaList','MdmDermagaSearch','MdmDermagaSearchByKode','DermagaPanduDetail','DermagaPanduEdit',function($scope,$location,$filter,Notification,$routeParams,KawasanPanduEdit, KawasanPanduDetail,  LoadingScreen, KawasanPanduLevelDuaList,MdmDermagaSearch,MdmDermagaSearchByKode,DermagaPanduDetail, DermagaPanduEdit) {
    LoadingScreen.show();

    $scope.dermagaPandu = {};

    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    if($routeParams.id){
    DermagaPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        //console.log($scope.kawasanPandu);
        $scope.dermagaPandu = response;

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

  $scope.dermagaPandu = {};


  //GET JENIS LAPORAN PARAMETER
  KawasanPanduLevelDuaList.get(function(response) {
      $scope.kawasan = response;
      LoadingScreen.hide();
  });


    $scope.cancel =  function(){
      $location.path('/dermagapandu/list');
    };

  $scope.submit= function(){
    $scope.buttonDisabled = false;
    DermagaPanduEdit.update({id:$routeParams.id},JSON.stringify($scope.dermagaPandu),
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
    };

  $scope.cancel = function() {
    $location.path('/dermagapandu/list');
  };

}]);
