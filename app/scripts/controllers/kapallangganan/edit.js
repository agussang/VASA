'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapallanggananEditCtrl
 * @description
 * # KapallanggananEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapallanggananEditCtrl', ['$scope', '$filter', '$timeout', '$location', 'Notification', '$routeParams', 'BuildPDF', 'KapalLanggananDetail', 'AppParam', 'TarifTambatAdd', 'KapalLanggananEdit', 'MdmKapalList', 'MdmPelangganSearch', 'MdmDermagaSearch','MdmKapalSearchByName','PejabatPengesahanSearch','LoadingScreen','Validations', function($scope, $filter, $timeout, $location, Notification, $routeParams, BuildPDF, KapalLanggananDetail, AppParam, TarifTambatAdd, KapalLanggananEdit, MdmKapalList, MdmPelangganSearch, MdmDermagaSearch, MdmKapalSearchByName,PejabatPengesahanSearch,LoadingScreen,Validations) {
    LoadingScreen.show();
    $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
    };

    $scope.langganan = {};
    $scope.locationPath = '/kapallangganan/list';
    $scope.tooltipInfo = Notification.setMessageValidFile();

   // $scope.$watch('langganan.tglMulaiBerlaku', function(){
   //    $('#tglBerlaku').mask('99-99-9999');
   // });

   // $scope.$watch('langganan.tglSelesaiBerlaku', function(){
   //    $('#tglmulaiBerlaku').mask('99-99-9999');
   // });

   // $scope.$watch('langganan.tglSepakat', function(){
   //    $('#tglselesaiBerlaku').mask('99-99-9999');
   // });
   //Start Set Disabled Date :
  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.langganan.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
    $('#tglSepakat').mask('99-99-9999');
  };

  $scope.$watch('langganan.tglMulaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  $scope.$watch('langganan.tglSelesaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });
  //End Set Disabled Date :

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupnamaKapal= function(){
    if(valueField !== $scope.langganan.namaKapal){
      if(typeof $scope.langganan.namaKapal != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.namaKapal = '';
      }
    }
  }

  $scope.validationLookupnamaPelanggan= function(){
    if(valueField !== $scope.langganan.namaPelanggan){
      if(typeof $scope.langganan.namaPelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.namaPelanggan = '';
      }
    }
  }

  $scope.validationLookupnamaDermaga= function(){
    if(valueField !== $scope.langganan.namaDermaga){
      if(typeof $scope.langganan.namaDermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.namaDermaga = '';
      }
    }
  }

  $scope.validationLookuppejabatPelabuhan= function(){
    if(valueField !== $scope.langganan.pejabatPelabuhan){
      if(typeof $scope.langganan.pejabatPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.pejabatPelabuhan = '';
      }
    }
  }
  /*
  $scope.validationLookuppelangganPelabuhan= function(){
    if(valueField !== $scope.langganan.pelangganPelabuhan){
      if(typeof $scope.langganan.pelangganPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.pelangganPelabuhan = '';
      }
    }
  }
  */
  /* end validasi autocomplete */

  $scope.$watch('langganan.pelabuhan', function () {
    if($scope.langganan.pelabuhan !== null)
    {
      $scope.langganan.pelanggan = 100 - $scope.langganan.pelabuhan;
    }
  });

  $scope.$watch('langganan.pelanggan', function () {
    if($scope.langganan.pelanggan !== null)
    {
      $scope.langganan.pelabuhan = 100 - $scope.langganan.pelanggan;
    }
  });



    //get parameter JASA
    AppParam.get({
      nama: 'JASA'
    }, function(response) {
      // console.log(response);
      $scope.jasa = response.content;

    });
     //get  valuta
    AppParam.get({nama:'VALUTA'},function(response){
      $scope.valuta = response.content;

    });

    var dataEmpty = function() {
      $scope.detailFound = false;
      $scope.loading = false;
      $scope.contents = 'no content found';
    };

    if ($routeParams.id) {
      KapalLanggananDetail.get({
        id: $routeParams.id
      }, function(response) {
        LoadingScreen.hide();
        // console.log(response);
        if (response !== undefined) {

          $scope.langganan = response;
          $scope.langganan.jasa = '' + response.jasa;
          //$scope.langganan.valuta = '' + response.valuta;
          $scope.langganan.tglMulaiBerlaku = new Date(response.tglMulaiBerlaku);
          $scope.langganan.tglSelesaiBerlaku = new Date(response.tglSelesaiBerlaku);
          $scope.langganan.tglSepakat = new Date(response.tglSepakat);
          $scope.langganan.kodeKapal = response.kodeKapal;
          // $scope.getChecked = function(){
          if (response.status == true) {
            return true;
            // console.log("aktif");
          } else {
            return false;
            // console.log("non aktif");
          }

          // };

        } else {
          dataEmpty();
        }
      }, function() {
        dataEmpty();
      });
    } else {
      LoadingScreen.hide();
      dataEmpty();
    }


    $scope.submit = function() {
      $scope.buttonDisabled = true;
      var namadermaga = $scope.langganan.namaDermaga.mdmgNama;
      $scope.langganan.tglMulaiBerlaku = $filter('date')($scope.langganan.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
      $scope.langganan.tglSelesaiBerlaku = $filter('date')($scope.langganan.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
      $scope.langganan.tglSepakat = $filter('date')($scope.langganan.tglSepakat, 'yyyy-MM-ddT00:00:00');
      $scope.langganan.namaKapal = $scope.langganan.namaKapal.mkplNama === undefined ? $scope.langganan.namaKapal : $scope.langganan.namaKapal.mkplNama;
      $scope.langganan.namaPelanggan = $scope.langganan.namaPelanggan.mplgNama === undefined ? $scope.langganan.namaPelanggan : $scope.langganan.namaPelanggan.mplgNama;
      $scope.langganan.namaDermaga = $scope.langganan.namaDermaga.mdmgNama === undefined ? $scope.langganan.namaDermaga : $scope.langganan.namaDermaga.mdmgNama;
      $scope.langganan.pejabatPelabuhan = $scope.langganan.pejabatPelabuhan.nama === undefined ? $scope.langganan.pejabatPelabuhan : $scope.langganan.pejabatPelabuhan.nama;
      //$scope.langganan.pelangganPelabuhan = $scope.langganan.pelangganPelabuhan.mplgNama === undefined ? $scope.langganan.pelangganPelabuhan : $scope.langganan.pelangganPelabuhan.mplgNama;
      // $scope.langganan.kodeKapal = $scope.langganan.namaKapal.mkplKode === undefined ? $scope.langganan.kodeKapal : $scope.langganan.namaKapal.mkplKode;
      if($scope.langganan.tagihan === "0"){
        $scope.langganan.pelabuhan = "";
        $scope.langganan.pelanggan = "";
      }
      if($scope.langganan.tagihan === "1"){
      $scope.langganan.nilai = "";

      }

      var dateKapalLangganan = {
        startDate 		: $scope.langganan.tglMulaiBerlaku,
        endDate 		: $scope.langganan.tglSelesaiBerlaku,
        titleStartDate 	: 'Tgl. Mulai Berlaku',
        titleEndDate 	: 'Tgl. Selesai Berlaku'
      }
      var validationDate = Validations.checkValidEndDate(dateKapalLangganan);
      if(validationDate){
        $scope.showLoader = false;
        return false;
      }
      // var formData = new FormData();
      // formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], {
      //   type: "application/json"
      // }));
      // if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
      // var fileName = $scope.langganan.dokumen;
      // var fileExtension = fileName.replace(/^.*\./, '');
      // if(fileExtension === 'pdf' || fileExtension === 'jpg'){

      // }else{
      //   $scope.setNotification  = {
      //     type  : "warning", //ex : danger, warning, success, info
      //     message : "Dokumen pendukung harus format pdf"
      //   };
      //   Notification.setNotification($scope.setNotification);
      //   return;
      // }
      //start untuk upload smua type file jpg dan pdf
      //$scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.langganan.dokumen : $scope.uploadFile[0].name;
      $scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.langganan.dokumen : $scope.uploadFile[0].name;

      var fileName = $scope.langganan.dokumen;
      var fileExtension = fileName.replace(/^.*\./, '');
      if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'JPG' || fileExtension === 'jpeg' || fileExtension === 'JPEG'){
      if(fileExtension==='pdf' || fileExtension==='PDF'){
            $scope.langganan.dokumen = $scope.langganan.dokumen.replace(fileExtension,'pdf');
      }else{
            $scope.langganan.dokumen = $scope.langganan.dokumen.replace(fileExtension,'jpg');
      }
      }else{
         $scope.setNotification  = {
            type    : "warning", //ex : danger, warning, success, info
            message : "Dokumen pendukung harus format PDF dan JPG"
         };
         Notification.setNotification($scope.setNotification);
         $scope.buttonDisabled = false;
         $scope.showLoader = false;
         return;
      }

      console.log($scope.langganan);
      var formData = new FormData();
      formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], { type: "application/json" }));
      if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
      //end untuk upload smua type file jpg dan pdf


      KapalLanggananEdit.save(formData,
        function(response) {
          if (response.$resolved) {
            $scope.setNotification = {
              type: "success",
              message: "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            $location.path($scope.locationPath);
          } else {
            $scope.setNotification = {
              type: "warning",
              message: "Data tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          }
          $scope.buttonDisabled = false;
          $scope.showLoader = false;
        },
        function(response) {
          $scope.setNotification = {
            type: "danger",
            message: "Koneksi tidak terhubung..."
          };
          Notification.setNotification($scope.setNotification);
          $scope.buttonDisabled = false;
          $scope.showLoader = false;
        });
    }
    $scope.cancel = function() {
      $location.path('/kapallangganan/list');
    }

    $scope.returnTrue = function(){	return true; }

    // autocomplete
    $scope.getListOfKapal = function(value) {
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

    $scope.getListOfDermaga = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmDermagaSearch.get({
            nama: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          }, function(response) {
            resolve(response);
            response.forEach(function(response){
              response.mdmgNamaKode = response.mdmgNama+' ('+ response.mdmgKode+')';
            });
          });
        });
      }
    };

     //get data kapal
  $scope.getListPejabat = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        PejabatPengesahanSearch.get({
          nama: value,
          limit: '10'
        }, function(response) {
          resolve(response);
        });
      });
    }
  };
  //get list pelanggan
  $scope.getListPelanggan = function(value) {
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

    $scope.changeDermaga = function(data) {
      $scope.langganan.dermaga = data.mdmgKode;
    }
    $scope.changeKapal = function(data) {
      $scope.langganan.kodeKapal = data.mkplKode;
    }
    $scope.changePelanggan = function(data) {
      $scope.langganan.kodePelanggan = data.mplgKode;
    }

    //function build pdf
    $scope.buildPDF = function(){
      BuildPDF.build($scope.langganan.dokumen);
    }

  }]);
