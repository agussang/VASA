'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KawasanPanduEditCtrl
 * @description
 * # KawasanPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KawasanPanduEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','KawasanPanduEdit','KawasanPanduDetail','LoadingScreen','KawasanPanduList', function($scope,$location,$filter,Notification,$routeParams,KawasanPanduEdit, KawasanPanduDetail,  LoadingScreen, KawasanPanduList) {
    LoadingScreen.show();

    $scope.kawasanPandu = {};

    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    KawasanPanduList.get(function(response){
      $scope.kawasan = response.content;
      //console.log($scope.group);
    });


    if($routeParams.id){
    KawasanPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        //console.log($scope.kawasanPandu);
        $scope.kawasanPandu = response;

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

        KawasanPanduEdit.update({id:$routeParams.id},JSON.stringify($scope.kawasanPandu),
          function(response){
            //console.log($scope.kawasanPandu);
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success", //ex : danger, warning, success, info
                message	: "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $location.path('/kawasanpandu/list');
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
      $location.path('/kawasanpandu/list');
    }
}]);
