'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasPanduNewCtrl
 * @description
 * # PetugasPanduNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PetugasPanduNewCtrl', ['$scope','$location','$base64',
  '$filter','PetugasPanduAdd','GrupPanduPerKawasanList','PetugasPanduList','Notification','KawasanPanduLevelDuaListByKodeCabang','SharedVariable','SearchSDMKapal',function($scope,$location,$base64,$filter,PetugasPanduAdd,GrupPanduPerKawasanList,PetugasPanduList,Notification,KawasanPanduLevelDuaListByKodeCabang,SharedVariable,SearchSDMKapal) {
    $scope.petugasPandu = {};
    $scope.pandu = {};
    $scope.sdmkapal= {};
    $scope.kawasan = [];

    $scope.petugasPandu.idKawasan 	= SharedVariable.getSharedVariables();

    $scope.$watch('petugasPandu.idKawasan', function(newValue) {
      if (typeof(newValue)=== 'number') {
        GrupPanduPerKawasanList.get({idKawasan:newValue},function(response){
          $scope.group = $filter('orderBy')(response,'namaGroup');
        });
      }
    });

    KawasanPanduLevelDuaListByKodeCabang.get(function(response){
      $scope.kawasan = response;
    });

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
    };

    $scope.$watch('pandu', function(newValue) {
      if (typeof(newValue) == 'object'){
        $scope.petugasPandu.namaPetugas = $scope.pandu.mpegNama;
        $scope.petugasPandu.nipPandu = $scope.pandu.mpegNip;
      } else {
        $scope.petugasPandu.namaPetugas = $scope.pandu;
      }
    });


    $scope.submit= function(){
      $scope.petugasPandu.photo = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
      $scope.buttonDisabled = false;

      PetugasPanduList.get(
        {kode: $scope.petugasPandu.kode}, function (response) {
          var findSame = false;
          response.content.forEach(function(element){
            if (element.kode === $scope.petugasPandu.kode) {
                findSame = true;
            }
          });

          if (findSame) {
            $scope.showLoader = false;
            $scope.setNotification = {
              type: "warning", //ex : danger, warning, success, info
              message: "Data yang diinputkan sudah ada"
            };
            Notification.setNotification($scope.setNotification);
            return false;
          } else {

            var fileName = $scope.petugasPandu.photo;
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
            
            PetugasPanduAdd.save(formData,
              function(response){
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil tersimpan"
                };
                Notification.setNotification($scope.setNotification);
                $location.path('/petugaspandu/list');
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

        }
      );


    };

    $scope.cancel = function() {
      $location.path('/petugaspandu/list');
    }
  }]);
