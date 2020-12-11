'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterMasaTambatNewCtrl
 * @description
 * # MasterMasaTambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
 .controller('MasterMasaTambatNewCtrl',['$scope','$location','$modal','$rootScope', '$routeParams','MasaTambatAdd','ItemMasaTambatAdd','Notification','AppParam',function ($scope,$location,$modal,$rootScope,$routeParams,MasaTambatAdd,ItemMasaTambatAdd,Notification,AppParam) {
  $scope.masatambat = {};
  $scope.switchDefault = true;
  $scope.masatambat.gt = $scope.switchDefault;
  $scope.masatambat.jnsPelayaran = $scope.switchDefault;
  $scope.masatambat.jnsKemasan = $scope.switchDefault;
  $scope.masatambat.jnsKapal = $scope.switchDefault;
  $scope.locationPath = '/mastermasatambat/list';

  $scope.masatambatDetail = {};
  $scope.masatambatDetailArray = [];
  $scope.masatambatDetailUpdateArray = [];
  $scope.masatambatDetailUpdate = [];
  $scope.postMasaTambatMaster = {};
  $scope.postDetailMasaTambatMaster = {};

  


  //copy to reset masatambatDetailArray
  $scope.originalmasatambatDetailArray = angular.copy($scope.masatambatDetailArray);

  $scope.cancelUpdateMasaTambatDetail = function(){
    $scope.masatambatDetailArray = angular.copy($scope.masatambatDetailArray);
  }

  //get parameter JENIS_PELAYARAN
  AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
    
    $scope.jenisPelayaran = response.content;
  });

  //get parameter JENIS_KAPAL
  AppParam.get({nama:'JENIS_KAPAL',size:50},function(response){
    $scope.jenisKapal = response.content;
  });

  //get parameter KEMASAN
  AppParam.get({nama:'KEMASAN'},function(response){
   
    $scope.jenisKemasan = response.content;
  });

  // get jenisPelayaranText
  $scope.getJenisPelayaran = function(jnspl){
    AppParam.get({nama:'JENIS_PELAYARAN'}, function(response){
      var content = response.content;
      for(var idx = 0; idx < content.length;idx++){
        if (content[idx].value == jnspl) {
            // return(content[i].product);
            $scope.jenisPelayaranText = content[idx].caption;
        }
      }
    });
  }

  // get jenisKemasanText
  $scope.getJenisKemasan = function(jnskms){
    
    AppParam.get({nama:'KEMASAN'}, function(response){
      var content = response.content;
      for(var idx = 0; idx < content.length;idx++){
        if (content[idx].value == jnskms) {
            // return(content[i].product);
            $scope.jenisKemasanText = content[idx].caption;
        }
      }
    });
  }

  // get jenisKapalText
  $scope.getJenisKapal = function(jnskpl){
    
    AppParam.get({nama:'JENIS_KAPAL'}, function(response){
      var content = response.content;
      for(var idx = 0; idx < content.length;idx++){
        if (content[idx].value == jnskpl) {
            // return(content[i].product);
            $scope.jenisKapalText = content[idx].caption;
        }
      }
    });
  }
  // function save
  
  $scope.submit = function(){
    $scope.postMasaTambatMaster.flagGt = $scope.masatambat.gt === true ? 1 : 0;
    $scope.postMasaTambatMaster.flagPelayaran = $scope.masatambat.jnsPelayaran === true ? 1 : 0;
    $scope.postMasaTambatMaster.flagKemasan = $scope.masatambat.jnsKemasan === true ? 1 : 0;
    $scope.postMasaTambatMaster.flagJenisKapal = $scope.masatambat.jnsKapal === true ? 1 : 0;
    $scope.buttonDisabled = true;
    MasaTambatAdd.save($scope.postMasaTambatMaster,
      function(response){
        if(response.$resolved == true && $scope.masatambatDetailArray.length !== 0 ){
          

          for (var y = 0; y < $scope.masatambatDetailArray.length; y++) { 
            $scope.postDetailMasaTambatMaster[y] = $scope.masatambatDetailArray[y];
            $scope.postDetailMasaTambatMaster[y].idMasaTambat = response.id; 
            ItemMasaTambatAdd.save($scope.postDetailMasaTambatMaster[y],function(response){
              console.log(response);
              $scope.setNotification  = {
                type  : "success", 
                message : "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
            },function(){
              $scope.setNotification  = {
                type  : "warning",
                message : "Data tidak berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
            }); 
          }     
        }
        
        $scope.setNotification  = {
          type  : "success", //ex : danger, warning, success, info
          message : "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path($scope.locationPath);
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
  }

  // function cancel
  $scope.cancel =  function(){
    $location.path($scope.locationPath);
  }

  //masa tambat detail
  $scope.submitMasatambatDetail = function(){
    
    var msTambatInfo = {};
    msTambatInfo.gtMin = $scope.masatambatDetail.gtmin;
    msTambatInfo.gtMax = $scope.masatambatDetail.gtmax;
    msTambatInfo.jenisPelayaran = $scope.masatambatDetail.jenisPelayaran;
    msTambatInfo.jenisPelayaranText = $scope.jenisPelayaranText;
    msTambatInfo.jenisKemasan = $scope.masatambatDetail.jenisKemasan;
    msTambatInfo.jenisKemasanText = $scope.jenisKemasanText;
    msTambatInfo.jenisKapal = $scope.masatambatDetail.jenisKapal;
    msTambatInfo.jenisKapalText = $scope.jenisKapalText;
    msTambatInfo.masaTambat = $scope.masatambatDetail.mstambatday;
    $scope.masatambatDetailArray.push(msTambatInfo);
    $scope.isActive = false;
    
    if($scope.masatambatDetailArray.length > 0){
      $scope.disabledFlagbtn = true;
    }
    $('#masaTambatModal').modal('hide');
  
    $scope.masatambatDetail = '';
  }


  $scope.deleteMasaTambatDetailView = function(i){
    $scope.masatambatDetailArray.splice(i, 1);
    
  }

  $scope.updateMasaTambatDetail = function(id){
   
    var dataEdit = $scope.masatambatDetailArray;
    
    for (var i = 0; i < dataEdit.length; i++) {
     $scope.masatambatDetailUpdate = dataEdit[id];
      break;
    }

  }
  $scope.saveMasaTambatDetail = function(){
     $scope.masatambatDetailUpdate.jenisPelayaranText = $scope.jenisPelayaranText;
     $scope.masatambatDetailUpdate.jenisPelayaran = $scope.masatambatDetailUpdate.jenisPelayaran;
  }
  

}]);
