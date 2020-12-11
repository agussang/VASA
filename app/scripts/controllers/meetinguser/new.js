'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MeetingUserNewCtrl', ['$scope','$location','$rootScope','AppParam','MeetingUserAdd','LoadingScreen','Notification','MdmPelangganSearch','MeetingUserList', function($scope,$location,$rootScope,AppParam,MeetingUserAdd, LoadingScreen, Notification,MdmPelangganSearch,MeetingUserList) {
    LoadingScreen.show();
    $scope.meetingUser = {};
    $scope.mdmPelanggan ={};


    //get parameter USER_MEETING
    AppParam.get({nama:'USER_MEETING'},function(response){
      LoadingScreen.hide();
      $scope.userRole = response.content;
    });

    //autocomplete master data pelanggan
    $scope.getListOfPelanggan = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmPelangganSearch.get({
            nama: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          }, function(response) {
            resolve(response);
          });
        });
      }
    };

    $scope.$watch('mdmPelanggan', function () {
      if($scope.mdmPelanggan){
        if ($scope.mdmPelanggan.mplgEmail != null) {
          $scope.meetingUser.username = $scope.mdmPelanggan.mplgEmail;
        }
      }
    });

    /*$scope.$watch('passwordConfirmation', function(){

    });*/

    $scope.submit = function () {
      if ($scope.meetingUser.password !== $scope.meetingUser.passwordConfirmation) {
        $scope.setNotification  = {
          type  : "warning",
          message : "Password dan Konfirmasi Password harus sama"
        };
        Notification.setNotification($scope.setNotification);
        return false;
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      }
      if ($scope.meetingUser.userRole == 'AGEN') {
          $scope.meetingUser.mplgKode = $scope.mdmPelanggan.mplgKode;
      } else {
          $scope.meetingUser.mplgKode = 9999;
          $scope.meetingUser.email = $scope.meetingUser.username; 
      }

      MeetingUserList.get({username:$scope.meetingUser.username}, function(response){
        if(response.content.length>0){
          $scope.setNotification  = {
            type  : "warning", //ex : danger, warning, success, info
            message : "Username "+$scope.meetingUser.username+" sudah tersedia"
          };
          Notification.setNotification($scope.setNotification);
          $scope.buttonDisabled = false;
          $scope.showLoader = false;
        }else{
          $scope.simpan();
        }
       
      });
    }

    $scope.simpan = function(){
      MeetingUserAdd.save($scope.meetingUser, function(response){
          $scope.setNotification  = {
            type  : "success",
            message : "Data berhasil tersimpan"
          };
          Notification.setNotification($scope.setNotification);
          $location.path('/meetinguser/list');
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
      )
    };

  

      $scope.hideShowPassword = function(){
        if ($rootScope.inputTypePassword == 'password'){
          $rootScope.inputTypePassword = 'text';  
        } else {
          $rootScope.inputTypePassword = 'password';
        }
      };

      $scope.cancel =  function(){
        $location.path('/meetinguser/list');
      };

}]);
