'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterNewCtrl
 * @description
 * # KapalCharterNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalCharterNewCtrl', ['$scope', '$location', '$filter','$timeout','KapalCharterAdd', 'Notification', 'MdmPelangganSearch', 'MdmKapalList', 'MdmKapalSearchByName','LoadingScreen','KapalCharterByKodeKapal','Validations', function($scope, $location, $filter,$timeout,KapalCharterAdd, Notification, MdmPelangganSearch, MdmKapalList, MdmKapalSearchByName,LoadingScreen,KapalCharterByKodeKapal,Validations) {
    LoadingScreen.show();
    $scope.kapalCharter = {};
    $scope.locationPath = '/kapalcharter/list';
    $scope.kapalCharter.status = 1;
    $scope.tooltipInfo = Notification.setMessageValidFile();

    $scope.tglMulaiBerlaku = new Date();
    $scope.tglSelesaiBerlaku = new Date();

    $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
    };

    //Start Set Disabled Date :
    var setDisableDate = function(){
      $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.tglMulaiBerlaku);
      $('#tglMulaiBerlaku').mask('99-99-9999');
      $('#tglSelesaiBerlaku').mask('99-99-9999');
    };

    $scope.$watch('tglMulaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });

    $scope.$watch('tglSelesaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });
    //End Set Disabled Date :

    $scope.cancel = function() {
      $location.path('/kapalcharter/list');
    }

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupKapal= function(){
    if(valueField !== $scope.mdmKapal  ){
      if(typeof $scope.mdmKapal != 'object' ){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.mdmKapal = '';
      }
    }
  }

  $scope.validationLookupPelanggan= function(){
    if(valueField !== $scope.mdmPelanggan  ){
      if(typeof $scope.mdmPelanggan != 'object' ){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);

        $scope.mdmPelanggan = '';

      }
    }
  }
/* end validasi autocomplete */

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
            response.forEach(function (response) {
              response.mplgNamaKode = response.mplgNama +' ('+response.mplgKode + ')';
            });
          });
        });
      }
    };

    $scope.getListOfmdmKapal = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmKapalSearchByName.get({
            nama: value,
            limit: '10'
          }, function(response) {
            resolve(response);
          });
        });
      }
    };


    $scope.submit = function() {
      console.log($scope.kapalCharter);
      $scope.buttonDisabled = true;

      $scope.kapalCharter.tglMulaiBerlaku = $filter('date')($scope.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
      $scope.kapalCharter.tglSelesaiBerlaku = $filter('date')($scope.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');

      $scope.kapalCharter.namaKapal = $scope.mdmKapal.mkplNama;
      $scope.kapalCharter.kantorId = $scope.mdmPelanggan.mplgKode;
      $scope.kapalCharter.kantorIdText = $scope.mdmPelanggan.mplgNama;

      $scope.kapalCharter.bendera = 0;
      $scope.kapalCharter.jenisKapal = 0;
      $scope.kapalCharter.jenisPelayaran = 0;

      $scope.kapalCharter.kodeKapal = $scope.mdmKapal.mkplKode;

      var curDate = new Date();

      /*if(new Date($scope.kapalCharter.tglMulaiBerlaku) > new Date($scope.kapalCharter.tglSelesaiBerlaku)){
        $scope.setNotification = {
          type: "warning", //ex : danger, warning, success, info
          message: "Tanggal Selesai Berlaku harus lebih atau sama dengan Tanggal Mulai Berlaku"
        };
        Notification.setNotification($scope.setNotification);
        return false;
      }*/

      var dateKapalCharter = {
        startDate 		: $scope.kapalCharter.tglMulaiBerlaku,
        endDate 		: $scope.kapalCharter.tglSelesaiBerlaku,
        titleStartDate 	: 'Tgl. Mulai Berlaku',
        titleEndDate 	: 'Tgl. Selesai Berlaku'
      }
      var validationDate = Validations.checkValidEndDate(dateKapalCharter);
      if(validationDate){
        $scope.showLoader = false;
        return false;
        console.log($scope.showLoader);
      }


      // console.log($scope.kapalCharter.kodeKapal);
      // console.log($scope.kapalCharter.tglMulaiBerlaku);
      // console.log($scope.kapalCharter.tglSelesaiBerlaku);

      // check validation

      KapalCharterByKodeKapal.get({
        kodeKapal: $scope.kapalCharter.kodeKapal
      }, function(response) {


        // do validation
        var findSame = false;
        response.content.forEach(function(item){
          if(item.tglMulaiBerlaku == $scope.kapalCharter.tglMulaiBerlaku &&
            item.tglSelesaiBerlaku == $scope.kapalCharter.tglSelesaiBerlaku ) {
            findSame = true;
          }
        });

        if(findSame) {
          // alert('wew');
          $scope.showLoader = false;
          $scope.setNotification = {
            type: "warning", //ex : danger, warning, success, info
            message: "Data yang diinputkan sudah ada"
          };
          Notification.setNotification($scope.setNotification);
          return false;
        } else {


          // do save

          //start untuk upload smua type file jpg dan pdf
          $scope.kapalCharter.dokCharter = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;


           //untuk menyimpan file upload
          var fileName = $scope.kapalCharter.dokCharter;
          var fileExtension = fileName.replace(/^.*\./, '');
          if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
            if(fileExtension==='pdf' || fileExtension==='PDF'){
              $scope.kapalCharter.dokCharter = $scope.kapalCharter.dokCharter.replace(fileExtension,'pdf');
            }else{
              $scope.kapalCharter.dokCharter = $scope.kapalCharter.dokCharter.replace(fileExtension,'jpg');
            }
          }else{
            $scope.setNotification  = {
                type    : "warning", //ex : danger, warning, success, info
                message : "Dokumen pendukung harus PDF dan JPG"
            };
            Notification.setNotification($scope.setNotification);
            return;
          }

          var formData = new FormData();
          formData.append('kapalCharter', new Blob([JSON.stringify($scope.kapalCharter)], { type: "application/json" }));
          if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
          if($scope.kapalCharter.dokCharter == null){
            $scope.setNotification  = {
              type  : "warning", //ex : danger, warning, success, info
              message : "Dokumen pendukung harus diisi"
            };
            Notification.setNotification($scope.setNotification);
            return;
          }
          //end untuk upload smua type file jpg dan pdf

           KapalCharterAdd.save(formData,
              function(response){
                if(response.$resolved){
                  $scope.setNotification  = {
                    type  : "success", //ex : danger, warning, success, info
                    message : "Data berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                  $location.path($scope.locationPath);
                }else{
                  $scope.setNotification  = {
                    type  : "warning", //ex : danger, warning, success, info
                    message : "Data tidak berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                }
                $scope.buttonDisabled = false;
                $scope.showLoader = false;
              },
              function(response){
                $scope.setNotification  = {
                  type  : "danger", //ex : danger, warning, success, info
                  message : "Koneksi tidak terhubung..."
                };
                Notification.setNotification($scope.setNotification);
                $scope.buttonDisabled = false;
                $scope.showLoader = false;
          });

        }
      });

}

  LoadingScreen.hide();

  }]);
