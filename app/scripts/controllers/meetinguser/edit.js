'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:UserMeetingEditCtrl
 * @description
 * # UserMeetingEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MeetingUserEditCtrl', ['$scope','$routeParams','$location','$rootScope','AppParam','MeetingUserDetail','MeetingUserEdit','LoadingScreen','MdmPelangganSearch','Notification','MeetingParticipantList','MeetingParticipantEdit','MeetingUserList',function($scope,$routeParams,$location,$rootScope,AppParam,MeetingUserDetail,MeetingUserEdit,LoadingScreen,MdmPelangganSearch,Notification,MeetingParticipantList,MeetingParticipantEdit,MeetingUserList) {
  LoadingScreen.show();
  $scope.dataMeetingUser={};

  var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
  };

  //get parameter
  AppParam.get({nama:'USER_MEETING'},function(response){
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

  $scope.updateMeetingParticipant = function(item){
    var temp = item;
    temp.username = $scope.dataMeetingUser.username;
    MeetingParticipantEdit.update({id:item.id}, temp, function(response){});
  }

  $scope.getMeetingParticipant = function(item){
    MeetingParticipantList.get({user:$scope.usernameOld}, function(response){
      if(response.content.length>0){
        response.content.forEach(function(itemParticipant) {
          $scope.updateMeetingParticipant(itemParticipant);
        });
      }
    });
  }

  if($routeParams.id){
    MeetingUserDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      response.password = '';
      response.passwordConfirmation = '';
      $scope.dataMeetingUser = response;
      $scope.tempUsernameMeeting = response.username;
      $scope.usernameOld = response.username;
      $scope.dataMeetingUser.namaPelanggan = response.nama;
      $scope.dataMeetingUser.passwordConfirmation = response.password;
    });
  };

  $scope.submit = function(){
    if ($scope.dataMeetingUser.password !== $scope.dataMeetingUser.passwordConfirmation) {
      $scope.setNotification  = {
        type  : "warning",
        message : "Password dan Konfirmasi Password harus sama"
      };
      Notification.setNotification($scope.setNotification);
      return false;
      $scope.buttonDisabled = false;
      $scope.showLoader = false;
    }

    if ($scope.dataMeetingUser.userRole == 'AGEN') {
      if (typeof $scope.dataMeetingUser.namaPelanggan === 'object') {
        $scope.dataMeetingUser.namaPelanggan = $scope.dataMeetingUser.namaPelanggan.mplgKode;
      }else{
        $scope.dataMeetingUser.namaPelanggan = $scope.dataMeetingUser.mplgKode
      }
    } else {
      $scope.dataMeetingUser.mplgKode = 9999;
      $scope.dataMeetingUser.email = $scope.dataMeetingUser.username;
    }

    var postEditUser;
    if($scope.flagGantiPassword){
      postEditUser = {
        email : $scope.dataMeetingUser.email,
        mplgKode : $scope.dataMeetingUser.mplgKode,
        namaPelanggan : $scope.dataMeetingUser.namaPelanggan,
        password : $scope.dataMeetingUser.password,
        userRole : $scope.dataMeetingUser.userRole,
        username : $scope.dataMeetingUser.username
      }
    }else{
      postEditUser = {
        email : $scope.dataMeetingUser.email,
        mplgKode : $scope.dataMeetingUser.mplgKode,
        namaPelanggan : $scope.dataMeetingUser.namaPelanggan,
        userRole :$scope.dataMeetingUser.userRole,
        username :$scope.dataMeetingUser.username
      }
    }

    MeetingUserList.get({username:postEditUser.username}, function(response){
      if(response.content.length>0){
        console.log($scope.tempUsernameMeeting);
        console.log($scope.dataMeetingUser.username);
        if($scope.tempUsernameMeeting === postEditUser.username){
          $scope.simpan(postEditUser);
        }else{
          $scope.setNotification  = {
            type  : "warning", //ex : danger, warning, success, info
            message : "Data Sudah Ada"
          };
          Notification.setNotification($scope.setNotification);
          $scope.buttonDisabled = false;
          $scope.showLoader = false;
        }
      }else{
        $scope.simpan(postEditUser);
      }
    });
  };

  $scope.simpan = function(postEditUser){
    MeetingUserEdit.update({id:$routeParams.id},postEditUser,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type  : "success",
          message : "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $scope.getMeetingParticipant(postEditUser)
        $location.path('/meetinguser/list');
      }else{
        $scope.setNotification  = {
          type  : "warning",
          message : "Data tidak berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/masterdenda/list');
      }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
    });
  }

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