'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PelangganEditCtrl
 * @description
 * # PelangganEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PelangganEditCtrl',['$scope', '$routeParams','$timeout','AppParam', '$location','$filter', 'PelangganPerJasaDetail','PelangganPerJasaAdd','PelangganPerJasaEdit','Notification','MdmPelangganSearch','SearchAlatApung','PejabatPengesahanSearch','BuildPDF','LoadingScreen','Validations',function ($scope, $routeParams,$timeout,AppParam, $location, $filter, PelangganPerJasaDetail, PelangganPerJasaAdd, PelangganPerJasaEdit, Notification, MdmPelangganSearch,SearchAlatApung,PejabatPengesahanSearch,BuildPDF,LoadingScreen,Validations) {
LoadingScreen.show();
  $scope.readOnly = true;
  $scope.options = {
      autoclose: true,
      todayBtn: '',
      todayHighlight: true
  };
  $scope.dataPelanggan={};
  $scope.tooltipInfo = Notification.setMessageValidFile();

  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };

  //  $scope.$watch('tglBerlaku', function(){
  //   $('#IdtglBerlaku').mask('99-99-9999');

  // });
  //  $scope.$watch('tglBerlaku', function(){
  //   $('#IdtglselesaiBerlaku').mask('99-99-9999');

  // });
  //  $scope.$watch('tglBerlaku', function(){
  //   $('#IdtglsetujuBerlaku').mask('99-99-9999');

  // });
  //Start Set Disabled Date :
  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.dataPelanggan.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
    $('#tglSetuju').mask('99-99-9999');
  };

  $scope.$watch('dataPelanggan.tglMulaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  $scope.$watch('dataPelanggan.tglSelesaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });
  //End Set Disabled Date :

	$scope.cancel =  function(){
		$location.path('/pelanggan/list');
	}
  //get jasa
  AppParam.get({nama:'JASA'},function(response){
    // console.log(response);
    $scope.jasa = response.content;

  });
  //get  valuta
   AppParam.get({nama:'VALUTA'},function(response){
    $scope.valuta = response.content;
  });

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupSarana= function(){
    if(valueField !== $scope.dataPelanggan.sarana){
      if(typeof $scope.dataPelanggan.sarana != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.dataPelanggan.sarana = '';
      }
    }
  }

  $scope.validationLookupPejabat= function(){
    if(valueField !== $scope.dataPelanggan.pejabatPelabuhan){
      if(typeof $scope.dataPelanggan.pejabatPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.dataPelanggan.pejabatPelabuhan = '';
      }
    }
  }

  $scope.validationLookupPelanggan= function(){
    if(valueField !== $scope.dataPelanggan.pejabatPelanggan){
      if(typeof $scope.dataPelanggan.pejabatPelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.dataPelanggan.pejabatPelanggan = '';
      }
    }
  }
  /* end validasi autocomplete */
  /*autocomplete master data pelanggan*/
  $scope.getListOfPelanggan = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        MdmPelangganSearch.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        }, function(response) {
          //console.log(response);
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
           resolve(response);
        });
      });
    }
  };

  /*autocomplete master pejabat pelabuhan*/
  $scope.getListOfPejabatpelabuhan = function(value) {
    if (value) {
      //var upper_value = $filter('uppercase')(value);
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


  /*autocomplete master pejabat pelanggan*/
  $scope.getListOfPejabatpelanggan = function(value) {
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

   $scope.getListOfPejabatpelanggan = function(value) {
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

  $scope.$watch('dataPelanggan.pelabuhan', function () {
    if($scope.dataPelanggan.pelabuhan !== null)
    {
      $scope.dataPelanggan.pelanggan = 100 - $scope.dataPelanggan.pelabuhan;
    }
  });

  $scope.$watch('dataPelanggan.pelanggan', function () {
    if($scope.dataPelanggan.pelanggan !== null)
    {
      $scope.dataPelanggan.pelabuhan = 100 - $scope.dataPelanggan.pelanggan;
    }
  });

  	if($routeParams.id){
		PelangganPerJasaDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				$scope.dataPelanggan = response;
        $scope.dataPelanggan.jasa = ''+response.jasa;
        $scope.dataPelanggan.tglMulaiBerlaku = new Date (response.tglMulaiBerlaku);
        $scope.dataPelanggan.tglSelesaiBerlaku = new Date (response.tglSelesaiBerlaku);
        $scope.dataPelanggan.tglSetuju = new Date (response.tglSetuju);

        //console.log(response);
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
		$scope.dataPelanggan.tglMulaiBerlaku = $filter('date')($scope.dataPelanggan.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dataPelanggan.tglSelesaiBerlaku = $filter('date')($scope.dataPelanggan.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dataPelanggan.tglSetuju = $filter('date')($scope.dataPelanggan.tglSetuju, 'yyyy-MM-ddT00:00:00');
    $scope.dataPelanggan.sarana = $scope.dataPelanggan.sarana.nama === undefined ? $scope.dataPelanggan.sarana : $scope.dataPelanggan.sarana.nama;
    $scope.dataPelanggan.pejabatPelabuhan = $scope.dataPelanggan.pejabatPelabuhan.nama === undefined ? $scope.dataPelanggan.pejabatPelabuhan : $scope.dataPelanggan.pejabatPelabuhan.nama;
    //$scope.dataPelanggan.stafPelabuhan = $scope.dataPelanggan.stafPelabuhan.nama === undefined ? $scope.dataPelanggan.stafPelabuhan : $scope.dataPelanggan.stafPelabuhan.nama;
    //$scope.dataPelanggan.pejabatPelanggan = $scope.dataPelanggan.pejabatPelanggan.mplgNama === undefined ? $scope.dataPelanggan.pejabatPelanggan : $scope.dataPelanggan.pejabatPelanggan.mplgNama;
    //$scope.dataPelanggan.stafPelanggan = $scope.dataPelanggan.stafPelanggan.mplgNama === undefined ? $scope.dataPelanggan.stafPelanggan : $scope.dataPelanggan.stafPelanggan.mplgNama;
    //console.log($scope.dataPelanggan);return;
    if($scope.dataPelanggan.tagihan === "1"){
      $scope.dataPelanggan.nilai = "";
      $scope.dataPelanggan.valuta= "";
    }
    if($scope.dataPelanggan.tagihan === "0"){
      $scope.dataPelanggan.pelabuhan = "";
      $scope.dataPelanggan.pelanggan = "";
    }
    $scope.dataPelanggan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataPelanggan.dokumen : $scope.uploadFile[0].name;
    /*var formData = new FormData();
		formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.dataPelanggan)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
    var fileName = $scope.dataPelanggan.dokumen;
    console.log(fileName);
    var fileExtension = fileName.replace(/^.*\./, '');
    if(fileExtension === 'pdf' || fileExtension === 'jpg'){

    }else{
      $scope.setNotification  = {
        type  : "warning", //ex : danger, warning, success, info
        message : "Dokumen pendukung harus format pdf"
      };
      Notification.setNotification($scope.setNotification);
      return;
    }*/

    var datePelanggan = {
      startDate 		: $scope.dataPelanggan.tglMulaiBerlaku,
      endDate 		: $scope.dataPelanggan.tglSelesaiBerlaku,
      titleStartDate 	: 'Tgl. Mulai Berlaku',
      titleEndDate 	: 'Tgl. Selesai Berlaku'
    }
    var validationDate = Validations.checkValidEndDate(datePelanggan);
    if(validationDate){
      $scope.showLoader = false;
      return false;
    }

    var fileName = $scope.dataPelanggan.dokumen;
    var fileExtension = fileName.replace(/^.*\./, '');
    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'JPG' || fileExtension === 'jpeg' || fileExtension === 'JPEG'){
    if(fileExtension==='pdf' || fileExtension==='PDF'){
          $scope.dataPelanggan.dokumen = $scope.dataPelanggan.dokumen.replace(fileExtension,'pdf');
    }else{
          $scope.dataPelanggan.dokumen = $scope.dataPelanggan.dokumen.replace(fileExtension,'jpg');
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

    var formData = new FormData();
    formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.dataPelanggan)], { type: "application/json" }));
    if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
    //end untuk upload smua type file jpg dan pdf


    PelangganPerJasaEdit.save(formData,function(response){
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


  };


  $scope.Getval =function () {
    $scope.dataPelanggan.nilai = $scope.dataPelanggan.nilai;
    $scope.dataPelanggan.valuta = $scope.dataPelanggan.valuta;
  }

  $scope.Getvalue =function () {
    $scope.dataPelanggan.pelabuhan = $scope.dataPelanggan.pelabuhan;
    $scope.dataPelanggan.pelanggan = $scope.dataPelanggan.pelanggan;
  }
  $scope.buildPDF = function(){
    BuildPDF.build($scope.dataPelanggan.dokumen);
  }

}]);
