'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AlatApungNewCtrl
 * @description
 * # AlatApungNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AlatApungNewCtrl',['$scope','$location','$filter','AlatApungAdd','BindApung','MdmPelangganSearch','Notification','AppParam','$timeout','AlatApungByNoReg','Validations',function ($scope,$location,$filter,AlatApungAdd,BindApung,MdmPelangganSearch,Notification,AppParam,$timeout,AlatApungByNoReg,Validations) {

  $scope.alatApung = {};

  $scope.bindapung = BindApung;
  $scope.locationPath     = '/alatapung/list';



  $scope.alatApung.flagKapalPenunjang = $scope.bindapung.option;

  $scope.Date= $filter('date')(new Date(), 'dd-MM-yyyy');
  $scope.tglMulaiBerlaku = new Date();
  $scope.tglSelesaiBerlaku = new Date();
  $scope.alatApung.onHire = '0';
  $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
  };

  // $scope.$watch('alatApung.minBeban', function(){
  //   var min = $scope.alatApung.minBeban;
  //   var max = $scope.alatApung.maxBeban;
  //   if(min>max){
  //     $scope.alatApung.minBeban = max-1;
  //     $scope.errorMinBeban = true;
  //   }
  // });

  // $scope.$watch('alatApung.maxBeban', function(){
  //   var min = $scope.alatApung.minBeban;
  //   var max = $scope.alatApung.maxBeban;
  //   if(max<min){
  //     $scope.alatApung.maxBeban = min+1;
  //     $scope.errorMaxBeban = true;
  //   }
  // });

 /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupPemilik= function(){
    if(valueField !== $scope.alatApung.pemilik){
      if(typeof $scope.alatApung.pemilik != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.alatApung.pemilik = '';
      }
    }
  }

//GET JENIS KAPAL PARAMETER
AppParam.get({nama:'JENIS_ALAT_APUNG'},function(response){
  $scope.jenisKapal = response.content;
});

//GET JENIS KAELOMPOK PARAMETER
AppParam.get({nama:'KELOMPOK_ALAT_APUNG'},function(response){
  $scope.kelompok = response.content;
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


  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
    $('#tglSepakat').mask('99-99-9999');
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

  $scope.submit = function(){

    $scope.showLoader = true;

    AlatApungByNoReg.get({
      noRegistrasi:$scope.alatApung.noRegistrasi
    }, function(response){
      // do validation
        var findSame = false;

        response.content.forEach(function(item){
          if(item.noRegistrasi == $scope.alatApung.noRegistrasi ) {
            findSame = true;
          }
        });

        if(findSame) {
          // alert('wew');
           $scope.alatApung.tglMulaiBerlaku = ''+$scope.alatApung.tglMulaiBerlaku;
           $scope.alatApung.tglSelesaiBerlaku = ''+$scope.alatApung.tglSelesaiBerlaku;
           $scope.alatApung.jenis = ''+$scope.alatApung.jenis;
           $scope.alatApung.kondisi = ''+$scope.alatApung.kondisi;
           $scope.alatApung.status = ''+$scope.alatApung.status;
           $scope.alatApung.kelas = ''+$scope.alatApung.kelas;
           $scope.alatApung.kelompok = ''+$scope.alatApung.kelompok;
           $scope.alatApung.pemilik = $scope.alatApung.pemilik
          $scope.showLoader = false;
          $scope.setNotification = {
            type: "warning", //ex : danger, warning, success, info
            message: "Data yang di inputkan sudah ada"
          };
          Notification.setNotification($scope.setNotification);

          return false;
        } else {
          $scope.alatApung.tglMulaiBerlaku = $filter('date')($scope.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.alatApung.tglSelesaiBerlaku = $filter('date')($scope.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.alatApung.jenis = $scope.alatApung.jenis;
    $scope.alatApung.kondisi = $scope.alatApung.kondisi;
    $scope.alatApung.status = $scope.alatApung.status;
    $scope.alatApung.kelas = $scope.alatApung.kelas;

    $scope.alatApung.kelompok = $scope.alatApung.kelompok;
    $scope.alatApung.pemilik = $scope.alatApung.pemilik.mplgKode;
    //$scope.alatApung.pemilikText = $scope.alatApung.pemilik.mplgNama;

    var dateAlatApung = {
      startDate 		: $scope.alatApung.tglMulaiBerlaku,
      endDate 		: $scope.alatApung.tglSelesaiBerlaku,
      titleStartDate 	: 'Tgl. Mulai Berlaku',
      titleEndDate 	: 'Tgl. Selesai Berlaku'
    }
    var validationDate = Validations.checkValidEndDate(dateAlatApung);

    if(validationDate){
      $scope.showLoader = false;
      return false;
    }
    console.log(validationDate);

    //console.log($scope.alatApung);
          AlatApungAdd.save(JSON.stringify($scope.alatApung),function(response){

            if(response.$resolved){
              $scope.setNotification  = {
                type  : "success", //ex : danger, warning, success, info
                message : "Data berhasil tersimpan"
              };
            }else{
              $scope.setNotification  = {
                type  : "warning", //ex : danger, warning, success, info
                message : "Data tidak berhasil tersimpan"
              };
            }
            Notification.setNotification($scope.setNotification);
            $location.path('/alatapung/list');
            $scope.buttonDisabled = false;
            $scope.showLoader = false;
          });
        }
    });
  };

  $scope.cancel = function(){
    $location.path('/alatapung/list');
  };

  $scope.change = function (data){
    $scope.alatApung.nama=$filter('uppercase')(data);
    console.log(data);
  }
}]);
