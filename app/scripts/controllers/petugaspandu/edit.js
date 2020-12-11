'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasPanduEditCtrl
 * @description
 * # PetugasPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PetugasPanduEditCtrl', ['$scope','$location','$filter','Notification','$routeParams','$base64','PetugasPanduEdit','PetugasPanduDetail','GrupPanduPerKawasanList','LoadingScreen','KawasanPanduLevelDuaListByKodeCabang','Databinding', function($scope,$location,$filter,Notification,$routeParams,$base64,PetugasPanduEdit, PetugasPanduDetail,GrupPanduPerKawasanList, LoadingScreen, KawasanPanduLevelDuaListByKodeCabang, Databinding) {
    LoadingScreen.show();
    $scope.$watch('petugasPandu.idKawasan', function(newValue) {
      //console.log(newValue);
      /*set idKawasan untuk list setelah edit dari service DataBinding otherservice.js*/
      Databinding.setIdKawasan(newValue);
      if (typeof(newValue)=== 'number') {
        GrupPanduPerKawasanList.get({idKawasan:newValue},function(response){
          $scope.group = $filter('orderBy')(response,'namaGroup');
        });
      }
    });

    KawasanPanduLevelDuaListByKodeCabang.get(function(response){
      $scope.kawasan = response;
      //console.log($scope.group);
    });

    $scope.petugasPandu = {};

    var dataEmpty = function(){
    $scope.detailFound = false;
    $scope.loading = false;
    $scope.contents = 'no content found';
    };

    if($routeParams.id){
    PetugasPanduDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        //console.log($scope.petugasPandu);
        $scope.petugasPandu = response;
        $scope.pandu = $scope.petugasPandu.namaPetugas +' ( ' + $scope.petugasPandu.nipPandu+' )';
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

  $scope.getListOfSDMKapal = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        SearchSDMKapal.get({
            nama: value,
            limit: '5'
          }, function(response) {
            resolve(response);
                response.forEach(function (response) {
                    response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ')';
                });
          });
      });
    }
  };

  $scope.validationLookupPetugas = function(){
    if($scope.valueField !== $scope.pandu){
      console.log($scope.pandu);
      if(typeof $scope.pandu != 'object'){
        $scope.setNotification  = {
          type	: 'warning',
          message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
          $scope.pandu = '';
      }
    }
  }

    $scope.submit = function(){
      $scope.buttonDisabled = false;
      $scope.petugasPandu.photo = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

      var fileName = $scope.petugasPandu.photo;
      if (fileName) {
        var fileExtension = fileName.replace(/^.*\./, '');
        if(fileExtension === 'png' || fileExtension === 'PNG' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
            if(fileExtension==='png' || fileExtension==='PNG'){
                $scope.petugasPandu.photo = $scope.petugasPandu.photo.replace(fileExtension,'png');
            }else{
                $scope.petugasPandu.photo = $scope.petugasPandu.photo.replace(fileExtension,'jpg');
            }
        }else{
            $scope.setNotification  = {
                type    : "warning",
                message : "Foto harus jpeg atau jpg"
            };
            Notification.setNotification($scope.setNotification);
            return;
        }
      }

      //$scope.petugasPandu.photo = $base64.encode(unescape(encodeURIComponent($scope.petugasPandu.photo)));
      var urlSafeBase64EncodedString  = $base64.encode($scope.petugasPandu.photo);
      $scope.petugasPandu.photo= encodeURIComponent(urlSafeBase64EncodedString);

      var formData = new FormData();
      formData.append('petugasPandu', new Blob([JSON.stringify($scope.petugasPandu)], { type: "application/json" }));
      if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
      if($scope.petugasPandu.photo == null){
          $scope.setNotification  = {
            type    : "warning",
            message : "Dokumen pendukung harus diisi"
          };
          Notification.setNotification($scope.setNotification);
          return;
      }

        PetugasPanduEdit.update({id:$routeParams.id},formData,
          function(response){
            //console.log($scope.petugasPandu);
            if(response.$resolved){
              $scope.setNotification  = {
                type	: "success", //ex : danger, warning, success, info
                message	: "Data berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $location.path('/petugaspandu/list');
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
      $location.path('/petugaspandu/list');
    }
}]);
