'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:GrupPanduEditCtrl
 * @description
 * # GrupPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('GrupPanduEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','GrupPanduEdit','GrupPanduDetail','KawasanPanduLevelDuaList','LoadingScreen', function($scope,$location,$filter,Notification,$routeParams,GrupPanduEdit, GrupPanduDetail,KawasanPanduLevelDuaList,  LoadingScreen) {
    LoadingScreen.show();

    $scope.grupPandu = {};
    $scope.kawasan = {};

    KawasanPanduLevelDuaList.get(function(response){
      $scope.kawasan = response;
      //console.log($scope.group);
    });

    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    if($routeParams.id){
    GrupPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        //console.log($scope.grupPandu);
        $scope.grupPandu = response;

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

        GrupPanduEdit.update({id:$routeParams.id},JSON.stringify($scope.grupPandu),
          function(response){
            //console.log($scope.grupPandu);
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success", //ex : danger, warning, success, info
                message	: "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $location.path('/gruppandu/list');
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
      $location.path('/gruppandu/list');
    }
}]);
