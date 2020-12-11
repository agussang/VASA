'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AlatApungEditCtrl
 * @description
 * # AlatApungEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('AlatApungEditCtrl',['$scope', '$routeParams', '$location','$timeout','$filter','AlatApungDetail','AlatApungEdit','AlatApungAdd','MdmPelangganSearch','Notification','AppParam','LoadingScreen','Validations',function ($scope, $routeParams, $location,$timeout,$filter,AlatApungDetail, AlatApungEdit, AlatApungAdd, MdmPelangganSearch, Notification,AppParam,LoadingScreen,Validations) {
  LoadingScreen.show();
  $scope.readOnly = true;
  $scope.options = {
      autoclose: true,
      todayBtn: '',
      todayHighlight: true
  };

  $scope.dataAlatApung={};

  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };

    //Start Set Disabled Date :
  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.dataAlatApung.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
  };

/*
  $scope.$watch('dataAlatApung.tglMulaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  $scope.$watch('dataAlatApung.tglSelesaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });
*/

  //End Set Disabled Date :

  $scope.$watch('dataAlatApung.minBeban', function(){
    var min = $scope.dataAlatApung.minBeban;
    var max = $scope.dataAlatApung.maxBeban;
    if(min>max){
      $scope.dataAlatApung.minBeban = max-1;
      $scope.errorMinBeban = true;
    }
  });

  $scope.$watch('dataAlatApung.maxBeban', function(){
    var min = $scope.dataAlatApung.minBeban;
    var max = $scope.dataAlatApung.maxBeban;
    if(max<min){
      $scope.dataAlatApung.maxBeban = min+1;
      $scope.errorMaxBeban = true;
    }
  });

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  };

  $scope.validationLookupPemilik= function(){
    if(valueField !== $scope.dataAlatApung.pemilikText){
      if(typeof $scope.dataAlatApung.pemilikText !== 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        return $scope.dataAlatApung.pemilikText = valueField;
      }
    }
  }
  /*end validasi autocomplete*/
  //GET JENIS KAPAL PARAMETER
  AppParam.get({nama:'JENIS_ALAT_APUNG'},function(response){
    $scope.jenisKapal = response.content;
  });

  //GET JENIS KAELOMPOK PARAMETER
  AppParam.get({nama:'KELOMPOK_ALAT_APUNG'},function(response){
    $scope.keLompok = response.content;
  });

  //GET JENIS STATUS_ALAT PARAMETER
  AppParam.get({nama:'STATUS_ALAT_APUNG'},function(response){
    $scope.statusAlat = response.content;
  });

  //GET JENIS KONDISI PARAMETER
  AppParam.get({nama:'KONDISI_ALAT_APUNG'},function(response){
    $scope.kondisi = response.content;
  });

  //GET JENIS KELAS PARAMETER
  AppParam.get({nama:'KELAS_ALAT_APUNG'},function(response){
    $scope.kelas = response.content;
  });

//GET SATUAN BEBAN PARAMETER
AppParam.get({nama:'SATUAN_BEBAN'},function(response){
  $scope.satuanBebanOption = response.content;
});

//GET SATUAN  PARAMETER
AppParam.get({nama:'SATUAN'},function(response){
  $scope.satuanOption = response.content;
});

//GET SATUAN WAKTU PAKAI PARAMETER
AppParam.get({nama:'SATUAN_WAKTU_PAKAI'},function(response){
  $scope.satuanWaktuPakaiOption = response.content;
});

//GET SATUAN DAYA PARAMETER
AppParam.get({nama:'SATUAN_DAYA'},function(response){
  $scope.satuanDayaOption = response.content;
});

//GET SATUAN ALAT APUNG PARAMETER
AppParam.get({nama:'SATUAN_ALAT_APUNG'},function(response){
  $scope.satuanAlatApungOption = response.content;
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
          response.forEach(function (response) {
            response.mplgNamaKode = response.mplgNama +' ('+response.mplgKode + ')';
          });
        });
      });
    }
  };


	$scope.cancel =  function(){
		$location.path('/alatapung/list');
	}

  	if($routeParams.id){
		AlatApungDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
        $scope.dataAlatApung = response;
        $scope.dataAlatApung.jenis= ''+$scope.dataAlatApung.jenis;
        $scope.dataAlatApung.kelas= ''+$scope.dataAlatApung.kelas;
        $scope.dataAlatApung.tglMulaiBerlaku = new Date(response.tglMulaiBerlaku);
        $scope.dataAlatApung.tglSelesaiBerlaku = new Date(response.tglSelesaiBerlaku);
        $scope.dataAlatApung.status= ''+$scope.dataAlatApung.status;
        $scope.dataAlatApung.kondisi= ''+$scope.dataAlatApung.kondisi;
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
    $scope.buttonDisabled = true;

    $scope.dataAlatApung.tglMulaiBerlaku = $filter('date')($scope.dataAlatApung.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.dataAlatApung.tglSelesaiBerlaku = $filter('date')($scope.dataAlatApung.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.dataAlatApung.pemilik = $scope.dataAlatApung.pemilikText.mplgKode === undefined? $scope.dataAlatApung.pemilik:$scope.dataAlatApung.pemilikText.mplgKode;
    $scope.dataAlatApung.pemilikText = $scope.dataAlatApung.pemilikText.mplgNama === undefined? $scope.dataAlatApung.pemilikText:$scope.dataAlatApung.pemilikText.mplgNama;

    var dateAlatApung = {
      startDate 		: $scope.dataAlatApung.tglMulaiBerlaku,
      endDate 		: $scope.dataAlatApung.tglSelesaiBerlaku,
      titleStartDate 	: 'Tgl. Mulai Berlaku',
      titleEndDate 	: 'Tgl. Selesai Berlaku'
    }
    var validationDate = Validations.checkValidEndDate(dateAlatApung);
    if(validationDate){
      $scope.showLoader = false;
      return false;
    }

    AlatApungEdit.update($scope.dataAlatApung,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type	: "success", //ex : danger, warning, success, info
          message	: "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/alatapung/list');
      }else{
        $scope.setNotification  = {
          type	: "warning", //ex : danger, warning, success, info
          message	: "Data tidak berhasil tersimpan"
        };
      }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      });
  }



}]);
