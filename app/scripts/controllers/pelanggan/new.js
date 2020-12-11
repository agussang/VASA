'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PelangganNewCtrl
 * @description
 * # PelangganNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PelangganNewCtrl',['$scope','$location','$timeout','$filter','PelangganPerJasaAdd','Notification','AppParam', 'MdmPelangganSearch','SearchAlatApung','PejabatPengesahanSearch','LoadingScreen','Validations',function ($scope,$location,$timeout,$filter,PelangganPerJasaAdd, Notification, AppParam, MdmPelangganSearch,SearchAlatApung,PejabatPengesahanSearch,LoadingScreen,Validations) {
LoadingScreen.show();
  $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
  };
  $scope.tooltipInfo = Notification.setMessageValidFile();

  $scope.pelanggan = {};
  $scope.required = true;
  $scope.pelanggan.tagihan = 0;
  $scope.tglMulaiBerlaku = new Date();
  $scope.tglSelesaiBerlaku = new Date();
  $scope.tglSetuju = new Date();

  // $scope.$watch('tglBerlaku', function(){
  //   $('#IdtglBerlaku').mask('99-99-9999');
  //   $('#IdtglselesaiBerlaku').mask('99-99-9999');
  //   $('#IdtglsetujuBerlaku').mask('99-99-9999');
  // });

  //Start Set Disabled Date :
  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
    $('#tglSetuju').mask('99-99-9999');
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

  $scope.cancel =  function(){
    $location.path('/pelanggan/list');
  }
  //get parameter jassa
  /*AppParam.get({nama:'JASA'},function(response){
    $scope.jasa = response.content;
  });*/
  //jasa
   AppParam.get({nama:'JASA'},function(response){
    // console.log(response);
    $scope.jasa = response.content;

  });

  $scope.pelanggan.status = 1;
  //get parameter status
  AppParam.get({nama:'STATUS'},function(response){
    $scope.status = response.content;
  });

  //get parameter persetujuan
  AppParam.get({nama:'PERSETUJUAN'},function(response){
    $scope.persetujuan = response.content;
  });

  //get valuta
  AppParam.get({nama:'VALUTA'},function(response){
    $scope.valuta = response.content;
  });
  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
    //console.log();
  }

  $scope.validationLookup = function(){
    if(valueField !== $scope.mdmPelanggan){
      if(typeof $scope.mdmPelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.mdmPelanggan = '';
      }
    }
  }

  $scope.validationLookupSarana= function(){
    if(valueField !== $scope.pelanggan.sarana){
      if(typeof $scope.pelanggan.sarana != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.pelanggan.sarana = '';
      }
    }
  }

  $scope.validationLookupPejabat= function(){
    if(valueField !== $scope.pelanggan.pejabatPelabuhan){
      if(typeof $scope.pelanggan.pejabatPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.pelanggan.pejabatPelabuhan = '';
      }
    }
  }
/*
  $scope.validationLookupPelanggan= function(){
    if(valueField !== $scope.pelanggan.pejabatPelanggan){
      if(typeof $scope.pelanggan.pejabatPelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.pelanggan.pejabatPelanggan = '';
      }
    }
  }*/


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
        });
      });
    }
  };

  /*autocomplete master sarana (alat apung)*/
  $scope.getListOfSarana = function(value) {
    if (value) {
     var upper_value = $filter('uppercase')(value);
      return new Promise(function(resolve, reject) {
        SearchAlatApung.get({
          nama: upper_value,
          limit: '10'
        }, function(response) {
            //console.log(response);
           resolve(response);
        });
      });
    }
  };

  /*autocomplete master pejabat pelabuhan*/
  $scope.getListOfPejabatpelabuhan = function(value) {
    if (value) {
     // var upper_value = $filter('uppercase')(value);
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

   /*autocomplete master staff pelabuhan*/
  $scope.getListOfStaffpelabuhan = function(value) {
    if (value) {
      var upper_value = $filter('uppercase')(value);
      return new Promise(function(resolve, reject) {
        PejabatPengesahanSearch.get({
          nama: upper_value,
          limit: '10'
        }, function(response) {
           resolve(response);
        });
      });
    }
  };

  /*autocomplete master pejabat pelanggan*/
  $scope.getListOfPejabatpelanggan = function(value) {
    if (value) {
      //var upper_value = $filter('uppercase')(value);
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

  $scope.$watch('pelanggan.pelabuhan', function () {
    if($scope.pelanggan.pelabuhan !== null)
    {
      $scope.pelanggan.pelanggan = 100 - $scope.pelanggan.pelabuhan;
    }
  });

  $scope.$watch('pelanggan.pelanggan', function () {
    if($scope.pelanggan.pelanggan !== null)
    {
      $scope.pelanggan.pelabuhan = 100 - $scope.pelanggan.pelanggan;
    }
  });

  /*autocomplete master staff pelanggan*/
  $scope.getListOfStaffpelanggan = function(value) {
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


  $scope.disabled = function(value) {
       console.log(value);
  };

  //submit form
  $scope.submit = function(){
    $scope.showLoader = true;

    console.log($scope.pelanggan);

    $scope.pelanggan.kodePelanggan = $scope.mdmPelanggan.mplgKode;
    $scope.pelanggan.kodePelangganText = $scope.mdmPelanggan.mplgNama;
    $scope.pelanggan.jenisUsaha = $scope.mdmPelanggan.mplgJenisUsaha;
    $scope.pelanggan.badanUsaha = $scope.mdmPelanggan.mplgBadanUsaha;

		$scope.pelanggan.tglMulaiBerlaku = $filter('date')($scope.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.pelanggan.tglSelesaiBerlaku = $filter('date')($scope.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.pelanggan.tglSetuju = $filter('date')($scope.tglSetuju, 'yyyy-MM-ddT00:00:00');

    $scope.pelanggan.persetujuan = parseInt(2,10);
    $scope.pelanggan.nilai = parseInt($scope.pelanggan.nilai,10);
    $scope.pelanggan.pelanggan = parseInt($scope.pelanggan.pelanggan,10);
    $scope.pelanggan.pelabuhan = parseInt($scope.pelanggan.pelabuhan,10);

    //$scope.pelanggan.sarana = $scope.pelanggan.sarana.nama;
    $scope.pelanggan.pejabatPelabuhan = $scope.pelanggan.pejabatPelabuhan.nama;
    //$scope.pelanggan.stafPelabuhan = $scope.pelanggan.stafPelabuhan.nama;
    //$scope.pelanggan.pejabatPelanggan = $scope.pelanggan.pejabatPelanggan.mplgNama;
    $scope.pelanggan.sarana =  $scope.pelanggan.sarana.nama;
    //$scope.pelanggan.stafPelanggan = $scope.pelanggan.stafPelanggan.mplgNama;

    // $scope.pelanggan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		// var formData = new FormData();
		// formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.pelanggan)], { type: "application/json" }));
		// if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

  //   if($scope.pelanggan.dokumen == null){
  //     $scope.setNotification  = {
  //       type  : "warning", //ex : danger, warning, success, info
  //       message : "Dokumen pendukung harus diisi"
  //     };
  //     Notification.setNotification($scope.setNotification);
  //     return;
  //   }
  //   var fileName = $scope.pelanggan.dokumen;
  //   var fileExtension = fileName.replace(/^.*\./, '');
  //   if(fileExtension === 'pdf' || fileExtension === 'jpg'){

  //   }else{
  //     $scope.setNotification  = {
  //       type  : "warning", //ex : danger, warning, success, info
  //       message : "Dokumen pendukung harus format pdf dan jpg"
  //     };
  //     Notification.setNotification($scope.setNotification);
  //     return;
  //   }

  var datePelanggan = {
    startDate 		: $scope.pelanggan.tglMulaiBerlaku,
    endDate 		: $scope.pelanggan.tglSelesaiBerlaku,
    titleStartDate 	: 'Tgl. Mulai Berlaku',
    titleEndDate 	: 'Tgl. Selesai Berlaku'
  }
  var validationDate = Validations.checkValidEndDate(datePelanggan);
  if(validationDate){
    $scope.showLoader = false;
    return false;
  }

    $scope.pelanggan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
    console.log($scope.pelanggan);
    var fileName = $scope.pelanggan.dokumen;
    var fileExtension = fileName.replace(/^.*\./, '');
    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
        if(fileExtension==='pdf' || fileExtension==='PDF'){
            $scope.pelanggan.dokumen = $scope.pelanggan.dokumen.replace(fileExtension,'pdf');
        }else{
            $scope.pelanggan.dokumen = $scope.pelanggan.dokumen.replace(fileExtension,'jpg');
        }
    }else{
        $scope.setNotification  = {
            type    : "warning",
            message : "Dokumen pendukung harus PDF dan JPG"
        };
        Notification.setNotification($scope.setNotification);
        return;
    }

    var formData = new FormData();
    formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.pelanggan)], { type: "application/json" }));
    if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
    if($scope.pelanggan.dokumen == null){
        $scope.setNotification  = {
          type    : "warning",
          message : "Dokumen pendukung harus diisi"
        };
        Notification.setNotification($scope.setNotification);
        return;
    }
        //end untuk upload smua type file jpg dan pdf
		//console.log($scope.pelanggan);return;

		PelangganPerJasaAdd.save(formData,function(response){
      $scope.buttonDisabled = true;

      if(response.$resolved){
        $scope.setNotification  = {
          type	: "success", //ex : danger, warning, success, info
          message	: "Data berhasil tersimpan"
        };
      }else{
        $scope.setNotification  = {
          type	: "warning", //ex : danger, warning, success, info
          message	: "Data tidak berhasil tersimpan"
        };
      }
      Notification.setNotification($scope.setNotification);
      $location.path('/pelanggan/list');

      $scope.buttonDisabled = false;
      $scope.showLoader = false;

			});
	}

  $scope.Resetval = function () {
    $scope.pelanggan.pelabuhan = "";
    $scope.pelanggan.pelanggan = "";
  }

  $scope.Resetvalue = function () {
    $scope.pelanggan.nilai = "";
    $scope.pelanggan.valuta = "";
   }

LoadingScreen.hide();
}]);
