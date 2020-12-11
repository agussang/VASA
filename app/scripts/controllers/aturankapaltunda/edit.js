'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AturanGerakPanduEditCtrl
 * @description
 * # AturanGerakPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AturanKapalTundaEditCtrl',['$scope','$routeParams','$location','AturanKapalTundaEdit','Notification','LoadingScreen',function ($scope,$routeParams,$location,AturanKapalTundaEdit,Notification,LoadingScreen) {
  LoadingScreen.show();

  $scope.aturankapaltunda = {};
  $scope.locationPath = '/manajementunda/aturankapaltunda';

  var dataEmpty = function(){
    $scope.detailFound  = false;
    $scope.loading    = false;
    $scope.contents   = 'no content found';
  };

    if($routeParams.id){
    AturanKapalTundaEdit.get({id:$routeParams.id},

      function(response){
      LoadingScreen.hide();
        if(response !== undefined){
          console.log(response);
          $scope.aturankapaltunda = response;
        }else{
          dataEmpty();
        }
      },
      function(){
        dataEmpty();
      }
    );
  }else{
    LoadingScreen.hide();
    dataEmpty();
  }

  $scope.submit = function(){
      

    AturanKapalTundaEdit.save($scope.aturankapaltunda,
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

  // function cancel
  $scope.cancel =  function(){
    $location.path($scope.locationPath);
  }

}]);
