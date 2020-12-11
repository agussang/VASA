'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:GrupTambatEditCtrl
 * @description
 * # GrupTambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('GrupTambatEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','GrupTambatEdit','GrupTambatDetail','KawasanPanduLevelDuaList','LoadingScreen', function($scope,$location,$filter,Notification,$routeParams,GrupTambatEdit, GrupTambatDetail,KawasanPanduLevelDuaList,  LoadingScreen) {
    LoadingScreen.show();

    $scope.grupTambat = {};


    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    if($routeParams.id){
    GrupTambatDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        //console.log($scope.grupTambat);
        $scope.grupTambat = response;

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


    $scope.submit = function(){
      $scope.buttonDisabled = false;

        GrupTambatEdit.update({id:$routeParams.id},JSON.stringify($scope.grupTambat),
          function(response){
            //console.log($scope.grupTambat);
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success", //ex : danger, warning, success, info
                message	: "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $location.path('/gruptambat/list');
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

    }

    $scope.cancel = function () {
      $location.path('/gruptambat/list');
    }
}]);
