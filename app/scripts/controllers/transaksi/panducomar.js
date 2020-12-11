'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduComarCtrl
 * @description
 * # PanduComarCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PanduComarCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$filter', '$timeout','$http','API_PATH','BindKapal','$window','PermohonanAdd', 'PermohonanTambat','PanduComar', 'PermohonanDetail','PermohonanPanduDetail', 'AppParam', 'MdmPelangganSearch', 'MdmPelabuhanSearch', 'MdmDermagaJasa','MdmDermagaPerJasa', 'AppParamValue', 'PermohonanPanduDelete', 'PermohonanPanduEdit', 'MdmKapalSearchByName','AturanGerakPanduList','PanduComarList','Notification','ListKapalGandeng','AddKapalGandeng','DeleteKapalGandeng','SearchKapalGandeng','MdmKapalSearch','PermohonanEdit','PermohonanByKodeKapal','PermohonanMultiDetail','validationForm','PermohonanDetailByPpk','UserRole','LoadingScreen','PermohonanSetDone','DetailByPpk1','MdmDermagaSearchByKode','BuildPDF','CheckLockAgen','PermohonanGetEPB','Validations','PermohonanUnfinished','KapalLangsungSandar','PermohonanPanduBulk','SharedVariable','HistoryRevisiTambat','BindEskalasi','TipeEskalasi','TipeEskalasiList','CheckBatasMasaTambat','GenerateIdVisit','PmhLayananKapal','MdmKapalByKode','SearchPpk1WithCabang', 'SearchPpk1','SearchSDMKapalByCallSign','SearchSDMKapal',
function($scope, $location, $rootScope, $routeParams, $filter, $timeout, $http,API_PATH, BindKapal, $window,
  PermohonanAdd, PermohonanTambat,PanduComar, PermohonanDetail,PermohonanPanduDetail, AppParam, MdmPelangganSearch, MdmPelabuhanSearch, MdmDermagaJasa, MdmDermagaPerJasa,AppParamValue, PermohonanPanduDelete, PermohonanPanduEdit, MdmKapalSearchByName,AturanGerakPanduList,PanduComarList,Notification,ListKapalGandeng,AddKapalGandeng,DeleteKapalGandeng,SearchKapalGandeng,MdmKapalSearch,PermohonanEdit,PermohonanByKodeKapal,PermohonanMultiDetail,validationForm,PermohonanDetailByPpk,UserRole,LoadingScreen,PermohonanSetDone,DetailByPpk1,MdmDermagaSearchByKode,BuildPDF,CheckLockAgen,PermohonanGetEPB,Validations,PermohonanUnfinished,KapalLangsungSandar,PermohonanPanduBulk,SharedVariable,HistoryRevisiTambat,BindEskalasi,TipeEskalasi,TipeEskalasiList,CheckBatasMasaTambat,GenerateIdVisit,PmhLayananKapal,MdmKapalByKode,SearchPpk1WithCabang, SearchPpk1, SearchSDMKapalByCallSign,SearchSDMKapal){
  LoadingScreen.show();
    $scope.tooltipInfo = Notification.setMessageValidFile();
    $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      orientation:'bottom'
    };
    var detailsPenetapan = [];
    $scope.alertShow = false;
    $scope.textAlert = [];
    $scope.iconAlert = '';
    $scope.permohonan = {};
    $scope.jasaair = {};
    $scope.jasalabuh = {};
    $scope.jasatambat = {};
    $scope.jasatunda = {};
    $scope.jasapandu = {};
    $scope.valueKapal = '';
    $scope.templabuh = [];
    $scope.temptambat = [];
    $scope.temptunda = [];
    $scope.temppandu = [];
    $scope.tempair = [];
    $scope.panduComar = {};
    $scope.jasalabuhgrid = [];
    $scope.jasatambatgrid = [];
    $scope.jasapandugrid = [];
    $scope.jasatundagrid = [];
    $scope.jasaairgrid = [];
    $scope.editForm = false;
    $scope.permohonan.btnLabuh = 'active';
    $scope.gandengBtn = true;
    $scope.gandengBtnOnLabuh = true;
    $scope.kapalGandeng = {};
    $scope.kapalGandengArray = [];
    $scope.kapalGandengUpdateArray = [];
    $scope.btnSubmit = true;
    $scope.inputTambahJasa = false;
    $scope.newJasaSaved = false;
    $scope.btnLabuhSave = true;
    $scope.btnAirSave = true;
    $scope.jasalabuhgridpast = [];
    $scope.jasatambatgridpast = [];
    $scope.jasapandugridpast = [];
    $scope.gridPast = false;
    $scope.jasaPanduArray = [];
    $scope.alert = {};
    $scope.alert.show = false;
    $scope.arrayJasa = [];
    $scope.showLoader = false;
    $scope.tooltipInfoVal41 = "Karena default tanggal pada VASA hari ini, maka inputan tidak boleh kurang dari hari ini.<br><br>Kode validasi: <b>VALPMH-041</b>";
    $scope.tglSekarang = new Date();
    $scope.tglMasuk = new Date();
    $scope.jamMasuk = moment().format('HH:mm');
    var datePlus10 = new Date();
    var timePlus1 = new Date();
    datePlus10.setDate(datePlus10.getDate() + 10);
    timePlus1.setHours(timePlus1.getHours() + 1);
    $scope.tglKeluar = datePlus10;
    $scope.jamKeluar = moment().format('HH:mm');
    $scope.tglIsi = new Date();
    $scope.jamIsi = moment().format('HH:mm');
    $scope.tglMulaiTambat = new Date();
    $scope.jamMulai = moment().format('HH:mm');
    $scope.tglSelesaiTambat = new Date();
    $scope.jamSelesai = moment(timePlus1).format('HH:mm');
    $scope.tglPandu = new Date();
    $scope.tglPanduSelesai = new Date();
    $scope.tglPanduGerak = new Date();
    $scope.tglPanduNaik = new Date();
    $scope.tglPanduTurun = new Date();
    $scope.panduComar.jamMulai= moment().format('HH:mm');
    $scope.panduComar.jamSelesai= moment().format('HH:mm');
    $scope.panduComar.jamGerakKapal= moment().format('HH:mm');
    $scope.panduComar.jamNaik= moment().format('HH:mm');
    $scope.panduComar.jamTurun= moment().format('HH:mm');

    $scope.jamPandu = $scope.jamPandu1= $scope.jamPandu2= $scope.jamPandu3 = $scope.jamPandu4 =
    moment().format('HH:mm');
    $scope.tglMulaiTunda = new Date();
    $scope.jamMulaiTunda = moment().format('HH:mm');
    $scope.tglSelesaiTunda = new Date();
    $scope.jamSelesaiTunda = moment(timePlus1).format('HH:mm');
    $scope.jasapandu.lokasiAsal = "";
    $scope.jasapandu.lokasiTujuan = "";
    $scope.lokasiAsalGerakPandu = "";
    $scope.lokasiTujuanGerakPandu = "";
    $scope.btnMainSimpan = false;
    $scope.afterSubmit = false;
    $scope.agentChanged = false;
    $scope.loaMax = false;
    $scope.loaMaxvalue = 0;
    $scope.showEntryKemasan = false;
    $scope.flagBongkarMuat = false;
    $scope.requiredEntryKemasan = false;
    $scope.dermagaAirRequired = false;
    $scope.escTypeCode = '';
    if(!$routeParams.escMode)BindEskalasi.setDefaultEskalasi();
    var kapalWajibPandu = false;
    var checkunique = [];
    var checkPastLabuh = [];
    var checkPastTambat = [];
    var checkPastPandu = [];
    var checkPastTunda = [];
    var checkPastAir = [];
    var valueField = '';


    $scope.valueKapal = BindKapal.getKapal(); 
    $scope.isAirKapal = SharedVariable.getSharedVariables();

    // $scope.checkValue = function(value){
    //   valueField = value;
    // }

    $scope.goHistoryPage = function(){
      $location.path($scope.locationPath);
    }

/*list ppk1*/
    $scope.getListOfPpk1 = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        SearchPpk1.get({
            ppk1: value,
            limit : 10
          }, function(response) {
            resolve(response);
          });
      });
    }
  };

/*list dermaga asal*/
  $scope.getListOfDermagaPandu = function(value) {
      if (value && value.length <=3) {
        return new Promise(function(resolve) {
          MdmDermagaSearchByKode.get({
            kode: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
          });
        });
      } else if (value.length > 3 ){
        return new Promise(function(resolve) {
          MdmDermagaPerJasa.get({
            nama: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
          });
        });
      }
    };

/*list dermaga tujuan*/
    $scope.getListOfDermagaPanduTujuan = function(value) {
      if (value && value.length <=3) {
        return new Promise(function(resolve) {
          MdmDermagaSearchByKode.get({
            kode: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
          });
        });
      } else if (value.length > 3 ){
        return new Promise(function(resolve) {
          MdmDermagaPerJasa.get({
            nama: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
          });
        });
      }
    };

/*list nama pandu*/
    $scope.getListOfSDMKapal = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        SearchSDMKapalByCallSign.get({
          callSign: value,
            limit: '10'
        }, function(response) {
          resolve(response);
          response.forEach(function (response) {
            response.callSign = response.callSign?response.callSign:'-';
                    response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
          });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        SearchSDMKapal.get({
          nama: value,
            limit: '10'
        }, function(response) {
          resolve(response);
          response.forEach(function (response) {
            response.callSign = response.callSign?response.callSign:'-';
                    response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
          });
        });
      });
    }
  };
    /*simpan validasi */
  $scope.validateForm = function(formObj) {
    formObj.submitButton.disabled = true;
      formObj.submitButton.value = 'Please Wait...';
      return true;
  }

    $scope.getListPpk1Gandeng = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
        SearchPpk1WithCabang.get({
          "ppk1": value,
          "limit": 10
        }, function(response) {
          resolve(response);
          response.forEach(function (response) {
            response.mkplKode = response.kodeKapal;
            response.mkplNama = response.namaKapal;
            response.mkplLoa = response.loa;
            response.mkplGrt = response.gtKapal;
            response.mkplJenis = response.jenisKapal;
            response.mkplBendera = response.negaraKapal;
            response.noPpk1Tongkang = response.noPpk1;
              response.itemPpk1TK = response.noPpk1 +' - '+ response.namaKapal +' (LOA: '+formatSeparator(response.loa) + ' GT: '+formatSeparator(response.gtKapal)+')';
          });
        });
        });
      }
    };

    $scope.validationLookupPpk1 = function() {
      if (valueField !== $scope.kapalGandeng.kapal) {
        if (typeof $scope.panduComar.noPpk1Tk != 'object') {
          $scope.setNotification = {
            type: 'warning',
            message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.panduComar.noPpk1Tk = '';
        }
      }
    }

    $scope.validationLookupAsal = function(){
      if(valueField !== $scope.permohonan.namaPelabuhanAsal){
        if(typeof $scope.permohonan.namaPelabuhanAsal != 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-002</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.permohonan.namaPelabuhanAsal = '';
        }
      }
    }
    $scope.validationLookupTujuan = function(){
      if(valueField !== $scope.permohonan.namaPelabuhanTujuan){
        if(typeof $scope.permohonan.namaPelabuhanTujuan != 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-003</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.permohonan.namaPelabuhanTujuan = '';
        }
      }
    }

    $scope.validationLookupAsalPandu = function(){
      if(valueField !== $scope.panduComar.asal){
        if(typeof $scope.panduComar.asal != 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.panduComar.asal = '';
        }
      }
    }

    $scope.validationLookupTujuanPandu = function(){
      if(valueField !== $scope.panduComar.tujuan){
        if(typeof $scope.panduComar.tujuan != 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.panduComar.tujuan = '';
        }
      }
    }

    $scope.validationLookupKapalGandeng = function(){
      if(valueField !== $scope.panduComar.noPpk1Tk){
        if(typeof $scope.panduComar.noPpk1Tk!= 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.panduComar.noPpk1Tk = '';
        }
      }
    }

    $scope.validationLookupKapal = function(){
      if(valueField !== $scope.permohonan.namaKapal){
        if(typeof $scope.permohonan.namaKapal!= 'object' && !$routeParams.id){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.permohonan.namaKapal = '';
        }else{
          $scope.cekLayanan($scope.permohonan.namaKapal);
        }
      }
    }

    $scope.cekLayanan = function(kapal) {
      if (kapal.mkplKode !== undefined) {
            if(kapal.mkplBendera == null){
              $scope.setNotification  = {
            type  : 'warning',
            message : 'Kapal '+kapal.mkplNama+' tidak memiliki data Bendera. <br>Silahkan informasikan ke pengguna jasa untuk melengkapi data tersebut dengan melampirkan surat ukur.'
          };
          Notification.setNotification($scope.setNotification);
          $scope.permohonan.namaKapal = '';
          return false;
            }

            if(kapal.mkplKode !==$scope.permohonan.kodeKapal){
          PermohonanUnfinished.get({
              kodeKapal: kapal.mkplKode
          }, function(response) {
                if (response.flagDone===1) {
                  $scope.setNotification  = {
                type  : 'warning',
                message : 'Kapal masih memiliki Layanan aktif.'
              };
              Notification.setNotification($scope.setNotification);
              $scope.permohonan.namaKapal = '';
                  $scope.setInformasiKapal();
                }else{
                  $scope.setInformasiKapal(kapal);
                }
          }, function(){});
            }else{
              $scope.setInformasiKapal(kapal);
            }
          }
    };

    $scope.setInformasiKapal = function(kapal) {
      if(kapal){
        $scope.permohonan.namaKapal = kapal.mkplNama;
        $scope.permohonan.negaraKapal = kapal.mkplBendera;
            $scope.permohonan.gtKapal = kapal.mkplGrt;
            $scope.permohonan.loaKapal = kapal.mkplLoa;
            $scope.permohonan.loa = kapal.mkplLoa;
            $scope.permohonan.kodeKapal = kapal.mkplKode;
            $scope.permohonan.jenisKapal = kapal.mkplJenis;
            $scope.permohonan.callSign = kapal.mkplCallSign;
      }else{
        $scope.permohonan.kodeKapal = '';
        $scope.permohonan.negaraKapal = '';
            $scope.permohonan.gtKapal = '';
            $scope.permohonan.loa = '';
            $scope.permohonan.jenisKapal = '';
            $scope.permohonan.callSign = '';
      }
    };
      $scope.backToList = function() {
      $location.path($scope.locationPath);
    };

    $scope.$watch('valueKapal', function() { 
      if ($scope.valueKapal != null) { 
        if($scope.valueKapal.gantiAgen || $scope.isAirKapal){
          $scope.permohonan.namaKapal = $scope.valueKapal.namaKapal;
          $scope.permohonan.kodePelabuhanAsal = $scope.valueKapal.kodePelabuhanAsal;
          $scope.permohonan.namaPelabuhanAsal = $scope.valueKapal.namaPelabuhanAsal;
          $scope.permohonan.kodePelabuhanTujuan = $scope.valueKapal.kodePelabuhanTujuan;
          $scope.permohonan.namaPelabuhanTujuan = $scope.valueKapal.namaPelabuhanTujuan;
          $scope.permohonan.sifatKunjungan = $scope.valueKapal.sifatKunjungan;
          $scope.permohonan.kemasanBongkar = $scope.valueKapal.kemasanBongkar;
          $scope.permohonan.jumlahBongkar = $scope.valueKapal.jumlahBongkar;
          $scope.permohonan.satuanBongkar = $scope.valueKapal.satuanBongkar;
          $scope.permohonan.kemasanMuat = $scope.valueKapal.kemasanMuat;
          $scope.permohonan.jumlahMuat = $scope.valueKapal.jumlahMuat;
          $scope.permohonan.satuanMuat = $scope.valueKapal.satuanMuat;
          if($scope.valueKapal.gantiAgen){
            $scope.valueKapal.mkplKode = $scope.valueKapal.kodeKapal;
            $scope.valueKapal.mkplNama = $scope.permohonan.namaKapal;
            $scope.valueKapal.mkplJenis = $scope.permohonan.jenisKapal;
          }
          if($scope.isAirKapal){
            $scope.permohonan.kodeKapal = $scope.valueKapal.kodeKapal;
            $scope.permohonan.jenisKapal = $scope.valueKapal.jenisKapal;
            $scope.permohonan.negaraKapal = $scope.valueKapal.negaraKapal;
            $scope.permohonan.callSign = $scope.valueKapal.callSign;
            $scope.permohonan.loa = $scope.valueKapal.loa;
            $scope.permohonan.gtKapal = $scope.valueKapal.gtKapal;
            $scope.permohonan.kodeAgen = $scope.valueKapal.kodeAgen;
            $scope.permohonan.namaAgen = $scope.valueKapal.namaAgen;  
            $scope.permohonan.idVisit = $scope.valueKapal.idVisit;
            document.getElementById("labuhTab").style.display = "none";
            document.getElementById("tambatTab").style.display = "none";  
            document.getElementById("panduTab").style.display = "none";
            document.getElementById("tundaTab").style.display = "none";     
          }
          $scope.agentChanged = true;
        }else{ 
          $scope.permohonan.namaKapal = $scope.valueKapal.mkplNama;
          $scope.permohonan.kodeKapal = $scope.valueKapal.mkplKode;
          $scope.permohonan.jenisKapal = $scope.valueKapal.mkplJenis;
          $scope.permohonan.negaraKapal = $scope.valueKapal.mkplBendera;
          $scope.permohonan.callSign = $scope.valueKapal.mkplCallSign;
          $scope.permohonan.loa = $scope.valueKapal.mkplLoa;
          $scope.permohonan.gtKapal = $scope.valueKapal.mkplGrt;
          /*VALPMH-033*/
          if($scope.valueKapal.mkplJenis === 'KPLTUNDA'|| $scope.valueKapal.mkplJenis === 'TB'){
            $scope.gandengBtn = false; 
            if(localStorage.validasiWajibPanduTunda==='1'){
              $scope.gandengBtnOnLabuh = false;
            }
          }
          /*VALPMH-019*/
          if($scope.valueKapal.mkplJenis === 'KPLTONKANG'){
            document.getElementById("panduTab").style.display = "none";
            document.getElementById("tundaTab").style.display = "none";
          }else if($scope.valueKapal.mkplJenis === 'KPLTNKGMSN'){
            document.getElementById("panduTab").style.display = "block";
            document.getElementById("tundaTab").style.display = "block";
          }

          if($scope.valueKapal.mkplGrtl > 500){
            if($scope.jasapandugrid < 1){
              $scope.jasapandu.jenisGerakan = '1';
            }
          }
        }
      }
    });

    $scope.$watch('tglMasuk', function(newVal, OldVal){
      if(OldVal != newVal){
        datePlus10 = new Date($scope.tglMasuk);
        datePlus10.setDate(datePlus10.getDate() + 10);
        $scope.tglKeluar = datePlus10;
      }
    });

    $scope.$watch('jamPandu', function(){
      $scope.jasatunda.jamMulai = $scope.jamPandu;
    });

    $scope.$watch('jamPandu1', function(){
      $scope.jasatunda.jamMulai = $scope.jamPandu1;
    });

    $scope.$watch('jamPandu2', function(){
      $scope.jasatunda.jamMulai = $scope.jamPandu2;
    });

    $scope.$watch('jamPandu3', function(){
      $scope.jasatunda.jamMulai = $scope.jamPandu3;
    });

    $scope.$watch('jamPandu4', function(){
      $scope.jasatunda.jamMulai = $scope.jamPandu4;
    });
    $scope.$watch('tglPandu', function(){
      $('#tglPandu').mask('99-99-9999');
      // $scope.tglMulaiTunda = new Date($scope.tglPandu);
    });

    //event from Lokasi Asal Pandu
    $scope.$watch('jasapandu.lokasiAsal.mdmgKode', function() {
      if($scope.jasapandu.lokasiAsal!==undefined){
        AturanGerakPanduList.get({
          kodeLokasi: $scope.jasapandu.lokasiAsal.mdmgKode,
          namaLokasi: $scope.jasapandu.lokasiAsal.mdmgNama,
          flagAktif:1
        }, function(response) {
          $scope.lokasiAsalGerakPandu = response.content;
          $scope.changedJenisGerakan();
        });
        //set jasa tunda lokasi asal
        $scope.jasatunda.lokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
        $scope.jasatunda.kodeLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgKode;
        $scope.jasatunda.asal = $scope.jasapandu.lokasiAsal.mdmgNama;
        $scope.jasatunda.jenisDermagaAsal = $scope.jasapandu.lokasiAsal.mdmgJenisDmg;
      }
    }, true);

    //event from Lokasi Tujuan Pandu
    $scope.$watch('jasapandu.lokasiTujuan.mdmgKode', function() {
      if($scope.jasapandu.lokasiTujuan!==undefined){
        AturanGerakPanduList.get({
          kodeLokasi: $scope.jasapandu.lokasiTujuan.mdmgKode,
          namaLokasi: $scope.jasapandu.lokasiTujuan.mdmgNama,
          flagAktif:1
        }, function(response) {
          $scope.lokasiTujuanGerakPandu = response.content;
          $scope.changedJenisGerakan();
        });
        //set jasa tunda lokasi tujuan
        $scope.jasatunda.lokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
        $scope.jasatunda.kodeLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgKode;
        $scope.jasatunda.tujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
        $scope.jasatunda.jenisDermagaTujuan = $scope.jasapandu.lokasiTujuan.mdmgJenisDmg;
      }
    }, true);

    //function change jenis gerakan
    $scope.changedJenisGerakan = function() {
      if($scope.lokasiAsalGerakPandu.length>0 && $scope.lokasiTujuanGerakPandu.length===0){
        $scope.jasapandu.jenisGerakan = '1';
      }else if($scope.lokasiTujuanGerakPandu.length>0 && $scope.lokasiAsalGerakPandu.length===0){
        $scope.jasapandu.jenisGerakan = '3';
      }else{
        $scope.jasapandu.jenisGerakan = '2';
      }
    };

    $scope.$watch('tglPandu', function(){
      $scope.tglMulaiTunda = $scope.tglPandu;
    });

    $scope.changeTime = function(){
      $scope.jasatunda.jamMulai = document.getElementById('jamPanduVal').value;
    }

    var rulesDateTime = function(){
      if($scope.jasalabuhgrid.length > 0) {
        $('#tglPandu').datepicker('setStartDate',$scope.jasalabuhgrid.tglMasuk);
      }
    };
// jasalampau
    var getPastJasa = function(noPpk1){
      var pastLabuh = [];
      var pastTambat = [];
      var pastPandu = [];
      var pastTunda = [];
      var pastAir = [];

        DetailByPpk1.get({ppk1:noPpk1}, function(response){
          response.detailPmh.jasa.forEach(function(item) {
            $scope.arrayJasa.push(item);
          });

          $scope.arrayJasa.forEach(function(jasa) {
              // Get Detail Penetapan
              var detailPtp = response.detailPmh.ptpJasa.find(function(ptpJasa) {
            return ptpJasa.noPpkJasa == jasa.noPpkJasa;
              });
              jasa.ptpJasa = detailPtp;
              // Get Detail Realisasi
              var detailRea = response.detailPmh.reaJasa.find(function(reaJasa) {
            return reaJasa.noPpkJasa == jasa.noPpkJasa;
              });
              jasa.reaJasa = detailRea;
          });
        //end - Untuk set data grid dari status detail jasa terupdate :
        $scope.createPDF = function(fileName){
              BuildPDF.build(fileName);
        }

        $scope.jasapandugridpast = pastPandu;

        if($scope.jasapandugrid.length > 0){
          $scope.gandengBtnOnLabuh=true;
        }
      });
    };
    LoadingScreen.hide(); 

    if ($routeParams.id != null) {
      PermohonanDetailByPpk.get({ppk1:$routeParams.id,urutan:$routeParams.urutan},function(response) {
        $scope.inputTambahJasa = false;
        var temp = response;
        var jasa = [];
        $scope.editForm = true;
        var labuhBtn = 'active';
        var tambatBtn = 'active';
        var panduBtn = 'active';
        var tundaBtn = 'active';
        var airBtn = 'active';
        var labuhTab = true;
        var tambatTab = true;
        var panduTab = true;
        var tundaTab = true;
        var airTab = true;
        // $scope.btnSubmit = false;
        $scope.btnSubmit = $routeParams.escMode?true:false;
        $scope.gridPast = false;
        checkPastLabuh = [];
        checkPastTambat = [];
        checkPastPandu = [];
        checkPastTunda = [];
        checkPastAir = [];

        if($scope.isAirKapal){
          document.getElementById("labuhTab").style.display = "none";
          document.getElementById("tambatTab").style.display = "none";
          document.getElementById("panduTab").style.display = "none";
          document.getElementById("tundaTab").style.display = "none";
          document.getElementById("airkapalTab").style.display = "block";
        }else{
          document.getElementById("labuhTab").style.display = "block";
          if($routeParams.escMode){
            document.getElementById("tambatTab").style.display = "none";
          }else{
            document.getElementById("tambatTab").style.display = "block";
          }
          document.getElementById("panduTab").style.display = "block";
          document.getElementById("tundaTab").style.display = "block";
          document.getElementById("airkapalTab").style.display = "none";        
        }

        UserRole.checkJasa();

        for (var i = 0; i < response.details[0].jasa.length; i++) {
          var namaJasa = response.details[0].jasa[i].nama.substr(response.details[0].jasa[i].nama.indexOf("_") + 1);
          jasa.push(namaJasa);
          response.details[0].jasa[i].fake = false;
          if (namaJasa === 'labuh') {
            $scope.templabuh.push(response.details[0].jasa[i]);
            checkPastLabuh.push(response.details[0].jasa[i].noPpkJasa);
          } else if (namaJasa === 'tambat') {
            $scope.temptambat.push(response.details[0].jasa[i]);
            checkPastTambat.push(response.details[0].jasa[i].noPpkJasa);
          } else if (namaJasa === 'tunda') {
            $scope.temptunda.push(response.details[0].jasa[i]);
            checkPastTunda.push(response.details[0].jasa[i].noPpkJasa);
          } else if (namaJasa === 'pandu') {
            $scope.temppandu.push(response.details[0].jasa[i]);
            checkPastPandu.push(response.details[0].jasa[i].noPpkJasa);
          } else if (namaJasa === 'air_kapal') {
            $scope.tempair.push(response.details[0].jasa[i]);
            checkPastAir.push(response.details[0].jasa[i].noPpkJasa);
          }
        }

        $scope.jasalabuhgrid = $scope.templabuh;
        $scope.jasatambatgrid = $scope.temptambat;
        $scope.jasapandugrid = $scope.temppandu;
        $scope.jasatundagrid = $scope.temptunda;
        $scope.jasaairgrid = $scope.tempair;
        $scope.permohonan = temp;

        if($scope.jasalabuhgrid.length > 0){
          $scope.btnLabuhSave = false;
        }
        if($scope.jasapandugrid.length > 0){
          $scope.gandengBtnOnLabuh=true;
        }
        if($scope.jasaairgrid.length > 0){
          document.getElementById("airkapalTab").style.display = "block";
          $scope.btnAirSave = false;
        }
        rulesKapalWajibPandu();

        MdmKapalSearch.get({kode : temp.kodeKapal, limit : 10},function(response){
          /*VALPMH-033*/
          if(response[0].mkplJenis === 'KPLTUNDA' || response[0].mkplJenis === 'TB'){
            $scope.gandengBtn = false;
            if(localStorage.validasiWajibPanduTunda==='1'){
              $scope.gandengBtnOnLabuh = false;
            }
          };
          /*VALPMH-019*/
          if(response[0].mkplJenis === 'KPLTONKANG'){
            document.getElementById("panduTab").style.display = "none";
            document.getElementById("tundaTab").style.display = "none";
          }else if(response[0].mkplJenis === 'KPLTNKGMSN'){
            document.getElementById("panduTab").style.display = "block";
            document.getElementById("tundaTab").style.display = "block";
          }else{
            if(!$scope.isAirKapal){
              document.getElementById("panduTab").style.display = "block";
              document.getElementById("tundaTab").style.display = "block";
            }           
          }
        });

        getPastJasa($scope.permohonan.noPpk1);
      });
    }

    $scope.cancel = function() {
      $location.path($scope.locationPath);
    }

    var loaValue = [];
    $scope.submitKapalGandeng = function(){
      var temp = $scope.panduComar.noPpk1Tk;
      var kapalInfo = {};
      var statusKapal = [];
      PermohonanByKodeKapal.get({kodeKapal : temp.mkplKode}, function(response){
        if(response.status != '500'){
          loaValue.push(parseInt(temp.mkplLoa));
          if (checkunique.indexOf(temp.mkplKode) === -1) {
              checkunique.push(temp.mkplKode);

            kapalInfo.noPpk1Tongkang = temp.noPpk1;
            kapalInfo.kodeKapal = temp.mkplKode;
            kapalInfo.namaKapal = temp.mkplNama;
            kapalInfo.loa = temp.mkplLoa;
            kapalInfo.gtKapal = temp.mkplGrt;
            kapalInfo.jenisKapal = temp.mkplJenis;
            kapalInfo.negaraKapal = temp.mkplBendera;
            $scope.kapalGandengArray.push(kapalInfo);
            if ($routeParams.id != null) {
              $scope.kapalGandengUpdateArray.push(kapalInfo);
            }
            $scope.kapalGandeng.kapal = '';
            $('#kplGadengModal').modal('hide');

          } else if (checkunique.indexOf(temp.mkplKode) > -1) {
            $scope.setNotification  = {
              type  : 'warning',
              message : 'Kapal <b>'+ temp.mkplNama + '</b> sudah dientry. <br> Silahkan Masukan Nama Kapal Lain.<br><br>Kode validasi: <b>VALPMH-015</b>'
            };
            Notification.setNotification($scope.setNotification);
            $scope.panduComar.noPpk1Tk = '';
          }
        }else{
          $('#kplGadengModal').modal('hide');
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Kapal <b>'+ temp.mkplNama + '</b> belum memiliki Layanan Aktif. Silahkan Pilih Kapal Lain.<br><br>Kode validasi: <b>VALPMH-016</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.panduComar.noPpk1Tk = '';
        }
      });
    }

    $scope.deleteKapalGandengView = function(i){
      var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
      if(checkDeleteGandeng){
        checkunique.splice(i, 1);
        $scope.kapalGandengArray.splice(i, 1);
        if ($routeParams.id != null) {
          $scope.kapalGandengUpdateArray.splice(i, 1);
        }
      }

    }

    $scope.deleteKapalGandeng = function(idKapalGandeng,i){
      var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
      if(checkDeleteGandeng){
        DeleteKapalGandeng.delete({id:idKapalGandeng},function(response){
          if(response.status !== '500'){
            $scope.setNotification  = {
              type  : "success",
              message : "Data berhasil dihapus"
            };
            Notification.setNotification($scope.setNotification);
            $scope.kapalGandengArray.splice(i, 1);
          }else{
            $scope.setNotification  = {
              type  : "danger",
              message : "Data tidak berhasil dihapus"
            };
            Notification.setNotification($scope.setNotification);
          }
        },function(){
          $scope.setNotification  = {
            type  : "danger",
            message : "Data tidak berhasil dihapus"
          };
          Notification.setNotification($scope.setNotification);
        });
      }
    }

    $scope.$watch('jasapandugrid.length', function(){
      if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
        $scope.btnMainSimpan = true;
      }else{
        $scope.btnMainSimpan = false;
      }
    });
    $scope.isKapalTender=false;

    $scope.greenBtn = function(){
  
      if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
        $scope.btnMainSimpan = false;
        $scope.showLoader = true;
        /* validation wajib tunda VALPMH-017*/
        var statusWajibTunda = true;
        var statusWajibPandu = true;
        var loaKapal;

        if($scope.permohonan.loa != null){
          loaKapal = $scope.permohonan.loa;
        }else{
          loaKapal = $scope.valueKapal.mkplLoa?$scope.valueKapal.mkplLoa:$scope.valueKapal.loa;
        }

        $scope.loaMaxvalue = Math.max.apply(Math, loaValue);
        $scope.loaMaxvalue = $scope.loaMaxvalue?parseInt($scope.loaMaxvalue)+parseInt(loaKapal):loaKapal;
        var paramWajibTunda = {
          dataPermohonan  : $scope.permohonan,
          statusSubmit  : 1, /* ket: 0 = submit dari form, 1 = submit dari greenBtn*/
          loaKapal    : loaKapal,
          loaMaxvalue   : $scope.loaMaxvalue,
          jasaPandu     : $scope.jasapandu,
          jasaPanduGrid   : $scope.jasapandugrid,
          jasaTunda     : $scope.jasatunda,
          jasaTundaGrid   : $scope.jasatundagrid
        }

        var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
        if(!validationWajibTunda){
          $scope.permohonan.loa = loaKapal;
          $('#ConfirmLoaJasaPandu').modal('show');
          $scope.showLoader = false;
          $scope.btnMainSimpan = true;
          statusWajibTunda = false;
        }

        /*validasi Wajib Pandu*/
        var validationWajibPandu = $scope.validationWajibPandu();
        if(statusWajibTunda && !validationWajibPandu) {
          $scope.showLoader = false;
          $scope.btnMainSimpan = true;
          statusWajibPandu = false;
        }

        if(statusWajibTunda && statusWajibPandu){
          if($routeParams.kodeKapal){
            $scope.submitJasaBaru();
          }else{
            if($scope.isAirKapal == false){
              if($scope.jasalabuhgrid.length == 0){
                $scope.setNotification  = {
                  type  : "warning",
                  message : "Permohonan Jasa Kapal Baru harus memiliki Jasa Labuh"
                };
                Notification.setNotification($scope.setNotification);
                return false;
              }         
            }
            $scope.submitDataUmum();
          }
          BindEskalasi.setDefaultEskalasi();
        }
      }else{
        $scope.setNotification  = {
          type  : "danger",
          message : "Belum Ada Jasa di Permohonan Ini.<br> Silahkan Isi Jasa Terlebih Dahulu.<br><br>Kode validasi :<b>VALPMH-037</b>"
        };
        Notification.setNotification($scope.setNotification);
      }
    }
    /* Ini Function untuk set default Form */
      $scope.setDefaultForm = function(){
        $scope.panduComar.noPpkJasa === undefined;
        $scope.panduComar.asal = '';
        $scope.panduComar.tujuan = '';
        $scope.panduComar.jenisPandu = '1';
        $scope.panduComar.jenisGerakan = '';
        $scope.panduComar.tglMulai = new Date();
        $scope.panduComar.tglSelesai = new Date();
        document.getElementById("jamPanduVal").value = moment().format('HH:mm');
        $scope.kapalGandengArray = [];
        $scope.kapalGandengUpdateArray = [];
      }

    $scope.formatDateComar = function(type, value){
      var date;
      if(type=='tgl'){
        date = $filter('date')(value, 'ddMMyyyy');
      }else if(type=='jam'){
        var splitJam = value.split(':');
        date = splitJam[0]+splitJam[1]+'00';
      }
      return date;
    }


    $scope.submitPandutoGrid = function(){
      var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
      var temp = $scope.panduComar;
      var tempDataPandu = {};
      tempDataPandu.fake = true;
      tempDataPandu.lokasiAsal = temp.asal;
      tempDataPandu.lokasiTujuan = temp.tujuan;
      tempDataPandu.asal = temp.asal.mdmgNama;
      tempDataPandu.tujuan = temp.tujuan.mdmgNama;
      tempDataPandu.kodeLokasiAsal = temp.asal.mdmgKode;
      tempDataPandu.kodeLokasiTujuan = temp.tujuan.mdmgKode;;
      tempDataPandu.jenisDermagaAsal = temp.asal.mdmgJenisDmg;
      tempDataPandu.jenisDermagaTujuan = temp.tujuan.mdmgJenisDmg;

      var tglPanduVal = $scope.formatDateComar('tgl',$scope.tglPandu);
      var jamPanduVal = $scope.formatDateComar('jam',$scope.panduComar.jamMulai);
      
      var tglPanduValselesai = $scope.formatDateComar('tgl',$scope.tglPanduSelesai);
      var jamPanduSelesai = $scope.formatDateComar('jam',$scope.panduComar.jamSelesai);

      var tglPanduGerakVal = $scope.formatDateComar('tgl',$scope.tglPanduGerak);
      var jamGerakKapal = $scope.formatDateComar('jam',$scope.panduComar.jamGerakKapal);

      var tglPanduNaikVal = $scope.formatDateComar('tgl',$scope.tglPanduNaik);
      var jamPanduNaik = $scope.formatDateComar('jam',$scope.panduComar.jamNaik);

      var tglPanduTurunVal = $scope.formatDateComar('tgl',$scope.tglPanduTurun);
      var jamPanduTurun = $scope.formatDateComar('jam',$scope.panduComar.jamTurun);
      /* validasi Tgl pandu toleransi 1 jam:*/
      var validationTglPandu = $scope.validationTglPandu(tempDataPandu);
      if(!validationTglPandu) return false;

      var comar = {};
      comar.asal            = temp.asal.mdmgKode;
      comar.idDetailPmh     = 0;
      comar.jamGerakKapal   = tglPanduGerakVal+jamGerakKapal;
      comar.jamNaik         = tglPanduNaikVal+jamPanduNaik;
      comar.jamTurun        = tglPanduTurunVal+jamPanduTurun;
      comar.nipPandu        = temp.nipPandu.mpegNip;
      comar.noPpk1          = temp.noPpk1.noPpk1;
      comar.tglMulai        = tglPanduVal+jamPanduVal;
      comar.tglSelesai      = tglPanduValselesai+jamPanduSelesai;
      comar.tujuan          = temp.tujuan.mdmgKode;
      if (temp.noPpk1Tk){
        comar.kodeKapalTk     = temp.noPpk1Tk.kodeKapal;
        comar.noPpk1Tk        = temp.noPpk1Tk.noPpk1;
      }
      checkunique = [];
      loaValue = [];
      PanduComar.save(comar, function(response) {
        //console.log(response);
            if(response.status !== '500'){
              $scope.setNotification  = {
                type  : "success",
                message : "Jasa Pandu berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              $scope.getPanduComar(comar.noPpk1);
              $scope.setDefaultForm();
            }
            // else if(response.status==500){
            //   $scope.setNotification  = {
            //     type  : "danger",
            //     message : response.description
            //   };
            //   Notification.setNotification($scope.setNotification);
            //   $scope.getPanduComar(comar.noPpk1);
            //   $scope.setDefaultForm();
            // }
            else{
              $scope.setNotification  = {
                type  : "danger",
                message : "Jasa Pandu tidak berhasil tersimpan."+response.description
              };
              Notification.setNotification($scope.setNotification);
            }
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Pandu tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          });
    }
// yoop
    $scope.submit = function(){
      if($routeParams.kodeKapal == undefined){
        CheckLockAgen.get({
                icustomer:(typeof $scope.permohonan.namaAgen==='object')?$scope.permohonan.namaAgen.mplgKode:$scope.permohonan.kodeAgen,
                kodeCabang : localStorage.kodeCabang
              }, function(response){
                if(response.status != '500'){       
                  if(response.edescription != 0){
                      $scope.edescription = response.edescription;
                      $('#modalCheckLockAgen').modal('show');
                  }else{
              $scope.setNotification  = {
                type  : "warning",
                message : "Silahkan Lanjutkan mengisi Jasa yang akan diajukan.."
              };
              Notification.setNotification($scope.setNotification);
              $scope.btnMainSimpan = true;
              if($scope.isAirKapal){
                document.getElementById("labuhTab").style.display = "none";
                document.getElementById("tambatTab").style.display = "none";
                document.getElementById("panduTab").style.display = "none";
                document.getElementById("tundaTab").style.display = "none";
                document.getElementById("airkapalTab").style.display = "block";
              }else{
                document.getElementById("labuhTab").style.display = "block";
                document.getElementById("tambatTab").style.display = "block";
                /*VALPMH-019*/
                if($scope.permohonan.jenisKapal != null){
                  if($scope.permohonan.jenisKapal === 'KPLTONKANG'){
                    document.getElementById("panduTab").style.display = "none";
                    document.getElementById("tundaTab").style.display = "none";
                  }else if($scope.permohonan.jenisKapal === 'KPLTNKGMSN'){
                    document.getElementById("panduTab").style.display = "block";
                    document.getElementById("tundaTab").style.display = "block";
                  }else{
                    document.getElementById("panduTab").style.display = "block";
                    document.getElementById("tundaTab").style.display = "block";
                  }
                }else{
                  MdmKapalSearch.get({kode : $scope.permohonan.kodeKapal, limit : 10},function(response){
                    /*VALPMH-033*/
                    if(response[0].mkplJenis === 'KPLTUNDA'){
                      $scope.gandengBtn = false;
                      if(localStorage.validasiWajibPanduTunda==='1'){
                        $scope.gandengBtnOnLabuh = false;
                      }
                    };
                    /*VALPMH-019*/
                    if(response[0].mkplJenis === 'KPLTONKANG'){
                      document.getElementById("panduTab").style.display = "none";
                      document.getElementById("tundaTab").style.display = "none";
                    }else if(response[0].mkplJenis=== 'KPLTNKGMSN'){
                      document.getElementById("panduTab").style.display = "block";
                      document.getElementById("tundaTab").style.display = "block";
                    }else{
                      document.getElementById("panduTab").style.display = "block";
                      document.getElementById("tundaTab").style.display = "block";
                      UserRole.checkJasa();
                    }
                  });
                }               
              }

              $scope.dataUmumBtn = false;
              $scope.afterSubmit = true;
              if($routeParams.kodeKapal && !$scope.isAirKapal){
                $scope.newJasaSaved = true;
              }
              UserRole.checkJasa();
              $scope.setDefaultDermagaAirKapal();
            }
          }else{
            $scope.setNotification  = {
              type  : "danger",
              message : "<b>API Intergration Locking Error</b>. <br><br>"+ response.description
            };

            Notification.setNotification($scope.setNotification);
          }
        });
      }else{
        $scope.setNotification  = {
          type  : "warning",
          message : "Silahkan Lanjutkan mengisi Jasa yang akan diajukan.."
        };
        Notification.setNotification($scope.setNotification);
        $scope.btnMainSimpan = true;
        document.getElementById("labuhTab").style.display = "block";
        document.getElementById("tambatTab").style.display = "block";
        /*VALPMH-019*/
        if($scope.permohonan.jenisKapal != null){
          if($scope.permohonan.jenisKapal === 'KPLTONKANG'){
            document.getElementById("panduTab").style.display = "none";
            document.getElementById("tundaTab").style.display = "none";
          }else if($scope.permohonan.jenisKapal === 'KPLTNKGMSN'){
            document.getElementById("panduTab").style.display = "block";
            document.getElementById("tundaTab").style.display = "block";
          }else{
            document.getElementById("panduTab").style.display = "block";
            document.getElementById("tundaTab").style.display = "block";
          }
        }else{
          MdmKapalSearch.get({kode : $scope.permohonan.kodeKapal, limit : 10},function(response){
            /*VALPMH-033*/
            if(response[0].mkplJenis === 'KPLTUNDA'){
              $scope.gandengBtn = false;
              if(localStorage.validasiWajibPanduTunda==='1'){
                $scope.gandengBtnOnLabuh = false;
              }
            };
            /*VALPMH-019*/
            if(response[0].mkplJenis === 'KPLTONKANG'){
              document.getElementById("panduTab").style.display = "none";
              document.getElementById("tundaTab").style.display = "none";
            }else if(response[0].mkplJenis=== 'KPLTNKGMSN'){
              document.getElementById("panduTab").style.display = "block";
              document.getElementById("tundaTab").style.display = "block";
            }else{
              document.getElementById("panduTab").style.display = "block";
              document.getElementById("tundaTab").style.display = "block";
              UserRole.checkJasa();
            }
          });
        }

        $scope.dataUmumBtn = false;
        $scope.afterSubmit = true;
        if($routeParams.kodeKapal){
          $scope.newJasaSaved = true;
        }
        UserRole.checkJasa();
        $scope.setDefaultDermagaAirKapal();
      }
    }

      //submit tambat
      $scope.submitTambat = function(jasatambat) {
        if($routeParams.id){
          jasatambat = $scope.jasatambat;
          var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
          var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
          jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

          var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
          var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
          jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
        }
        if (jasatambat.noPpkJasa === undefined) {
          jasatambat.detailPmhId = $scope.permohonan.details[0].id;
          jasatambat.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
          jasatambat.noPpk1 = $scope.permohonan.noPpk1;

          if(jasatambat.tglMulai === undefined){
            //concat jam dan waktu mulai
            var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
            var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
            jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;
          }

          if(jasatambat.tglSelesai === undefined){
            //concat jam dan waktu selesai
            var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
            var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
            jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
          }

          jasatambat.kodeLokasi = jasatambat.lokasi.mdmgKode;
          jasatambat.namaLokasi = jasatambat.lokasi.mdmgNama;
          jasatambat.jenisDermaga = jasatambat.lokasi.mdmgJenisDmg;

          jasatambat.kadeAwal = 0;
          jasatambat.kadeAkhir = 0;

          if(jasatambat.flagTender === undefined){
            jasatambat.flagTender = $scope.jasatambat.flagTender;
          }

          if(jasatambat.flagRampdoor === undefined){
            jasatambat.flagRampdoor = $scope.jasatambat.flagRampdoor;
          }

          if($routeParams.id){
            /* Start validasi dermaga tambat :*/
            var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
            if(langsungSandar == true){
              var validationDermaga = $scope.validationDermagaTambat(jasatambat);
              if(!validationDermaga) return false;
            }
            /* End validasi dermaga tambat :*/

            var parseTglMulai = Date.parse(jasatambat.tglMulai);
            var parseTglSelesai = Date.parse(jasatambat.tglSelesai);
            if(parseTglMulai >= parseTglSelesai){
              var note =  {
                      type  : "warning",
                      message : "Waktu Selesai harus melebihi Waktu Mulai<br><br>Kode validasi: <b>VALPMH-020</b>"
                    };
              Notification.setNotification(note);
              return false;
            }
            if(!$scope.validationDataTambat(jasatambat)){
              var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH045');
              var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH045');
              var statusEskalasi = itemEskalasi.id!==undefined?true:false;
              if(hasEsc){
                return true;
              }else{
                var note =  {
                        type  : "warning",
                        message : "<b>Data yang diinput terdeteksi duplikat.</b><br>Silahkan Periksa kembali Data yang diinputkan.<br><br>Kode validasi : <b>VALPMH-045</b>",
                        hasEsc  : statusEskalasi,
                        dataEsc : itemEskalasi
                      };
                Notification.setNotification(note);
                return false;
              }
            }
            $scope.validationWajibPandu();

            var R1 = validationForm.required('Lokasi Labuh', jasatambat.namaLokasi);
            if(!R1){return R1;}
            var R2 = validationForm.required('Tanggal Mulai Tambat', tglTambatMskVal);
            if(!R2){return R2;}
            var R3 = validationForm.required('Tanggal Selesai Tambat', tglTambatSlsVal);
            if(!R3){return R3;}
            var R4 = validationForm.required('Jam Mulai Tambat', jamTambatMskVal);
            if(!R4){return R4;}
            var R5 = validationForm.required('Jam Selesai Tambat', jamTambatSlsVal);
            if(!R5){return R5;}
          }

          var formData = new FormData();
          formData.append('pmhTambat', new Blob([JSON.stringify(jasatambat)], { type: "application/json" }));
          if (jasatambat.uploadFile !== undefined && jasatambat.uploadFile.length > 0) {
            formData.append('file', jasatambat.uploadFile[0]);
          }

          PermohonanTambat.save(formData, function(response) {
            if(response.status !== '500'){
              $scope.setNotification  = {
                type  : "success",
                message : "Jasa Tambat berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              if($routeParams.id){
                response.fake = false;
                $scope.temptambat.push(response);
                $scope.jasatambatgrid = $scope.temptambat;
                
                BindEskalasi.setDefaultEskalasi();
              }
              if($scope.permohonan.kemasanBongkarTambat || $scope.permohonan.kemasanMuatTambat){
                $scope.update();
              }
              $scope.showEntryKemasan = false;
              $scope.requiredEntryKemasan = false;
              $scope.jasatambat.noPpkJasa = undefined;
              //$scope.jasatambat.noForm = $scope.permohonan.noForm;
              $scope.jasatambat.lokasi = '';
              $scope.jasatambat.kadeAwal = '';
              $scope.jasatambat.kadeAkhir = '';
              $scope.tglMulaiTambat = new Date();
              $scope.tglSelesaiTambat = new Date();
              $scope.jasatambat.flagTender = '0';
              $scope.jasatambat.flagRampdoor = '0';
              document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
              document.getElementById("jamSelesaiTambatVal").value = moment(timePlus1).format('HH:mm');
            }else{
              $scope.setNotification  = {
                type  : "danger",
                message : "Jasa Tambat tidak berhasil tersimpan."+response.description
              };
              Notification.setNotification($scope.setNotification);
            }
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Tambat tidak berhasil tersimpan."+response.description
            };
            Notification.setNotification($scope.setNotification);
          });
        } else {
          //concat jam dan waktu mulai
          var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
          var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
          $scope.jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

          //concat jam dan waktu selesai
          var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
          var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
          $scope.jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;

          if (typeof $scope.jasatambat.lokasi === 'object') {
            $scope.jasatambat.kodeLokasi = $scope.jasatambat.lokasi.mdmgKode;
            $scope.jasatambat.namaLokasi = $scope.jasatambat.lokasi.mdmgNama;
            $scope.jasatambat.jenisDermaga = $scope.jasatambat.lokasi.mdmgJenisDmg;
          }

          /* validasi dermaga tambat :*/
          var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
          if(langsungSandar == true){
            var validationDermaga = $scope.validationDermagaTambat($scope.jasatambat);
            if(!validationDermaga) return false;
          }

          var parseTglMulai = Date.parse($scope.jasatambat.tglMulai);
          var parseTglSelesai = Date.parse($scope.jasatambat.tglSelesai);
          if(parseTglMulai >= parseTglSelesai){
            var note =  {
                    type  : "warning",
                    message : "Waktu Selesai harus melebihi Waktu Mulai<br><br>Kode validasi: <b>VALPMH-020</b>"
                  };
            Notification.setNotification(note);
            return false;
          }

          var formData = new FormData();
          formData.append('pmhTambat', new Blob([JSON.stringify($scope.jasatambat)], { type: "application/json" }));
          if ($scope.jasatambat.uploadFile !== undefined && $scope.jasatambat.uploadFile.length > 0) {
            formData.append('file', $scope.jasatambat.uploadFile[0]);
          }
        }
      };

/*===================================jasa pandu==========================================*/
      //delete jasa pandu
      $scope.deletePandu = function(id, i) {
          var checkDeletePandu = confirm('Apakah Anda akan Menghapus data ini?');
          if (checkDeletePandu) {
            if(id == null){
              $scope.jasapandugrid.splice(i, 1);
              $scope.setNotification  = {
                type  : "success",
                message : "Data berhasil dihapus"
              };
              Notification.setNotification($scope.setNotification);
            }else{
              PermohonanPanduDelete.delete({
                id: id
              }, function(response) {
                $scope.jasapandugrid.splice(i, 1);
                $scope.setNotification  = {
                  type    : "success",
                  message : "Data berhasil dihapus"
                };
                Notification.setNotification($scope.setNotification);
                
              }, function() {
                $scope.setNotification  = {
                  type    : "warning",
                  message : "Data tidak berhasil dihapus"
                };
                Notification.setNotification($scope.setNotification);
              });
            }
          }
        }
        //get pmh pandu by ppkjasa
      $scope.editPandu = function(noppkjasa, i) {
        $scope.indexPandu = i;
        PermohonanPanduDetail.get({
          noPpkJasa: noppkjasa
        }, function(response) {
          $scope.panduComar = response;
          document.getElementById("jamPanduVal").value = $filter('date')(response.tglPandu, 'HH:mm');
          $scope.jamPandu = $filter('date')(response.tglPandu, 'HH:mm');
          $scope.tglPandu = $scope.splitDate(response.tglPandu);
          $scope.panduComar.lokasiAsal = response.asal;
          $scope.panduComar.lokasiTujuan = response.tujuan;
          SearchKapalGandeng.get({noPpk1 : $routeParams.id, noPpkJasa : noppkjasa},function(response){
            if (response.totalElements > 0) {
              $scope.kapalGandengArray =  response.content;
              $scope.gandengBtn = false;
              if(localStorage.validasiWajibPanduTunda==='1'){
                $scope.gandengBtnOnLabuh = false;
              }
            }
          });
        });
      };

      //submit pandu
      $scope.constructPanduBulk = function (panduComar) {
        AppParam.get({nama:'JENIS_PANDU'}, function(response){
          var content = response.content;
          for(var idx = 0; idx < content.length;idx++){
            for(var j=0;j<$scope.temppandu.length;j++){
              if($scope.temppandu[j].jenisPanduText == null){
                if($scope.temppandu[j].jenisPandu == content[idx].value){
                  $scope.temppandu[j].jenisPanduText = content[idx].caption;
                }
              }
            }
          }
        });

        AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
          var content = response.content;
          for(var idx = 0; idx < content.length;idx++){
            for(var j=0;j<$scope.temppandu.length;j++){
              if($scope.temppandu[j].jenisGerakanText == null){
                if($scope.temppandu[j].jenisGerakan == content[idx].value){
                  $scope.temppandu[j].jenisGerakanText = content[idx].caption;
                }
              }
            }
          }
        });

        panduComar.jenisPanduText = $scope.temppandu.jenisPanduText;
        panduComar.jenisGerakanText = $scope.temppandu.jenisGerakanText;

        panduComar.detailPmhId = $scope.permohonan.details[0].id;
        panduComar.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
        panduComar.noPpk1 = $scope.permohonan.noPpk1;

        if(panduComar.tglPandu === undefined){
          var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
          var jamPanduVal = document.getElementById("jamPanduVal").value;
          panduComar.tglPandu = tglPanduVal + 'T' + jamPanduVal;
        }

        panduComar.jenisPandu = parseInt(panduComar.jenisPandu);
        panduComar.jenisGerakan = parseInt(panduComar.jenisGerakan);

        panduComar.kodeLokasiAsal = panduComar.lokasiAsal.mdmgKode;
        panduComar.asal = panduComar.lokasiAsal.mdmgNama;
        panduComar.jenisDermagaAsal = panduComar.lokasiAsal.mdmgJenisDmg;
        panduComar.kodeLokasiTujuan = panduComar.lokasiTujuan.mdmgKode;
        panduComar.tujuan = panduComar.lokasiTujuan.mdmgNama;
        panduComar.jenisDermagaTujuan = panduComar.lokasiTujuan.mdmgJenisDmg;

        var loaKapal = $scope.permohonan.loa?$scope.permohonan.loa:$scope.valueKapal.mkplLoa;

        if($routeParams.id){
          /* validasi dermaga tujuan pandu :*/
          var validationDermaga = $scope.validationTujuanLokasiPandu(panduComar);
          if(!validationDermaga) return false;

          /* validasi Tgl Pandu toleransi 1 jam:*/
          var validationTglPandu = $scope.validationTglPandu(panduComar);
          if(!validationTglPandu) return false;
          

          /* validasi Wajig Tunda :*/
          $scope.loaMaxvalue = Math.max.apply(Math, loaValue);
          $scope.loaMaxvalue = $scope.loaMaxvalue?parseInt($scope.loaMaxvalue)+parseInt(loaKapal):loaKapal;
          var paramWajibTunda = {
            dataPermohonan  : $scope.permohonan,
            statusSubmit  : 0,  /* ket: 0 = submit dari form, 1 = submit dari greenBtn*/
            loaKapal    : loaKapal,
            loaMaxvalue   : $scope.loaMaxvalue,
            panduComar     : $scope.panduComar,
            jasaPanduGrid   : '',
            jasaTunda     : $scope.jasatunda,
            jasaTundaGrid   : $scope.jasatundagrid
          }
          var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
          if(!validationWajibTunda){
            $scope.permohonan.loa = loaKapal;
            if($scope.loaMaxvalue >= 70){
              $scope.loaMax = true;
            }
            $('#ConfirmLoaJasaPandu').modal('show');
          }
        }

        if(jasapandu.kapalGandeng){
          if(jasapandu.kapalGandeng.length > 0){
            for (var y = 0; y < jasapandu.kapalGandeng.length; y++) {
              if(!jasapandu.kapalGandeng[y].id){
                $scope.kapalGandeng[y] = jasapandu.kapalGandeng[y];
                $scope.kapalGandeng[y].noPpk1 = $scope.permohonan.noPpk1;
                $scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
                AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
                  $scope.setNotification  = {
                    type  : "success",
                    message : "Data berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                },function(){
                  $scope.setNotification  = {
                    type  : "danger",
                    message : "Data tidak berhasil tersimpan"
                  };
                  Notification.setNotification($scope.setNotification);
                });
              }
            }
            checkunique = [];
          }
        }
        }

      $scope.submitPanduBulk = function(jasapandu){
          PermohonanPanduBulk.save(jasapandu,function(response) {
            $scope.setNotification  = {
              type  : "success",
              message : "Data berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          },function(){
            $scope.setNotification  = {
              type  : "danger",
              message : "Data tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          });
      }

      $scope.submitPandu = function(jasapandu) {
         var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
        if($routeParams.id){
          jasapandu = $scope.jasapandu;
          var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
          var jamPanduVal = document.getElementById("jamPanduVal").value;
          jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
          jasapandu.kapalGandeng = $scope.kapalGandengUpdateArray;
        }

        if (jasapandu.noPpkJasa === undefined) {
          jasapandu.jenisPanduText = $scope.temppandu.jenisPanduText;
          jasapandu.jenisGerakanText = $scope.temppandu.jenisGerakanText;

          jasapandu.detailPmhId = $scope.permohonan.details[0].id;
          jasapandu.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
          jasapandu.noPpk1 = $scope.permohonan.noPpk1;

          if(jasapandu.tglPandu === undefined){
            var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
            var jamPanduVal = document.getElementById("jamPanduVal").value;
            jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
          }

          jasapandu.jenisPandu = parseInt(jasapandu.jenisPandu);
          jasapandu.jenisGerakan = parseInt(jasapandu.jenisGerakan);

          jasapandu.kodeLokasiAsal = jasapandu.lokasiAsal.mdmgKode;
          jasapandu.asal = jasapandu.lokasiAsal.mdmgNama;
          jasapandu.jenisDermagaAsal = jasapandu.lokasiAsal.mdmgJenisDmg;
          jasapandu.kodeLokasiTujuan = jasapandu.lokasiTujuan.mdmgKode;
          jasapandu.tujuan = jasapandu.lokasiTujuan.mdmgNama;
          jasapandu.jenisDermagaTujuan = jasapandu.lokasiTujuan.mdmgJenisDmg;

          var loaKapal = $scope.permohonan.loa?$scope.permohonan.loa:$scope.valueKapal.mkplLoa;
          if($routeParams.id){
            /* validasi dermaga tujuan pandu :*/
            var validationDermaga = $scope.validationTujuanLokasiPandu(jasapandu);
            if(!validationDermaga) return false;

            /*validasi dermaga asal pandu :
            var validationAsalDermaga = $scope.validationAsalLokasiPandu(jasapandu);
            if(!validationAsalDermaga) return false;
            */

            /* validasi Tgl Pandu toleransi 1 jam:*/
            var validationTglPandu = $scope.validationTglPandu(jasapandu);
            if(!validationTglPandu) return false;
            

            /* validasi Wajig Tunda :*/
            $scope.loaMaxvalue = Math.max.apply(Math, loaValue);
            $scope.loaMaxvalue = $scope.loaMaxvalue?parseInt($scope.loaMaxvalue)+parseInt(loaKapal):loaKapal;
            var paramWajibTunda = {
              dataPermohonan  : $scope.permohonan,
              statusSubmit  : 0,  /* ket: 0 = submit dari form, 1 = submit dari greenBtn*/
              loaKapal    : loaKapal,
              loaMaxvalue   : $scope.loaMaxvalue,
              jasaPandu     : $scope.jasapandu,
              jasaPanduGrid   : '',
              jasaTunda     : $scope.jasatunda,
              jasaTundaGrid   : $scope.jasatundagrid
            }

            var R1 = validationForm.required('Lokasi Asal Pandu', jasapandu.asal);
            if(!R1){return R1;}
            var R2 = validationForm.required('Lokasi Tujuan Pandu', jasapandu.tujuan);
            if(!R2){return R2;}
            var R3 = validationForm.required('Tanggal Pandu', tglPanduVal);
            if(!R3){return R3;}
            var R4 = validationForm.required('Jam Pandu', jamPanduVal);
            if(!R4){return R4;}

          }

          PanduComar.save(panduComar, function(response) {
            if(response.status !== '500'){
              if(jasapandu.kapalGandeng){
                if(jasapandu.kapalGandeng.length > 0){
                  for (var y = 0; y < jasapandu.kapalGandeng.length; y++) {
                    if(!jasapandu.kapalGandeng[y].id){
                      $scope.kapalGandeng[y] = jasapandu.kapalGandeng[y];
                      $scope.kapalGandeng[y].noPpk1 = $scope.permohonan.noPpk1;
                      $scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
                      AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
                        $scope.setNotification  = {
                          type  : "success",
                          message : "Data berhasil tersimpan"
                        };
                        Notification.setNotification($scope.setNotification);
                      },function(){
                        $scope.setNotification  = {
                          type  : "danger",
                          message : "Data tidak berhasil tersimpan."+response.description
                        };
                        Notification.setNotification($scope.setNotification);
                      });
                    }
                  }
                  $scope.resetPandu();
                  checkunique = [];
                }
              }

              AppParam.get({nama:'JENIS_PANDU'}, function(response){
                var content = response.content;
                for(var idx = 0; idx < content.length;idx++){
                  for(var j=0;j<$scope.temppandu.length;j++){
                    if($scope.temppandu[j].jenisPanduText == null){
                      if($scope.temppandu[j].jenisPandu == content[idx].value){
                        $scope.temppandu[j].jenisPanduText = content[idx].caption;
                      }
                    }
                  }
                }
              });

              AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
                var content = response.content;
                for(var idx = 0; idx < content.length;idx++){
                  for(var j=0;j<$scope.temppandu.length;j++){
                    if($scope.temppandu[j].jenisGerakanText == null){
                      if($scope.temppandu[j].jenisGerakan == content[idx].value){
                        $scope.temppandu[j].jenisGerakanText = content[idx].caption;
                      }
                    }
                  }
                }
              });
              $scope.setNotification  = {
                type  : "success",
                message : "Jasa Pandu berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              if($routeParams.id){
                response.fake = false;
                $scope.temppandu.push(response);
                $scope.jasapandugrid = $scope.temppandu;
                BindEskalasi.setDefaultEskalasi();
                var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
                if(!validationWajibTunda){
                  $scope.permohonan.loa = loaKapal;
                  if($scope.loaMaxvalue >= 70){
                    $scope.loaMax = true;
                  }
                  $('#ConfirmLoaJasaPandu').modal('show');
                }
              }
              $scope.jasapandu.noPpkJasa === undefined;
              $scope.jasapandu.lokasiAsal = '';
              $scope.jasapandu.lokasiTujuan = '';
              $scope.jasapandu.jenisPandu = '1';
              $scope.jasapandu.jenisGerakan = '';
              $scope.tglPandu = new Date();
              document.getElementById("jamPanduVal").value = moment().format('HH:mm');
              $scope.kapalGandengArray = [];
              $scope.kapalGandengUpdateArray = [];
            }else{
              $scope.setNotification  = {
                type  : "danger",
                message : "Jasa Pandu tidak berhasil tersimpan."+response.description
              };
              Notification.setNotification($scope.setNotification);
            }
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Pandu tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          });
        } else {
          //concat jam dan waktu
          var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
          var jamPanduVal = document.getElementById("jamPanduVal").value;
          $scope.jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;

          $scope.jasapandu.jenisPandu = parseInt($scope.jasapandu.jenisPandu);
          $scope.jasapandu.jenisGerakan = parseInt($scope.jasapandu.jenisGerakan);

          if (typeof $scope.jasapandu.lokasiAsal === 'object') {
            $scope.jasapandu.kodeLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgKode;
            $scope.jasapandu.asal = $scope.jasapandu.lokasiAsal.mdmgNama;
          }

          if (typeof $scope.jasapandu.lokasiTujuan === 'object') {
            $scope.jasapandu.kodeLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgKode;
            $scope.jasapandu.tujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
          }

          if($routeParams.id){
            /* validasi dermaga tujuan pandu :*/
            var validationDermaga = $scope.validationTujuanLokasiPandu($scope.jasapandu);
            if(!validationDermaga) return false;

            /*validasi dermaga asal pandu :
            var validationAsalDermaga = $scope.validationAsalLokasiPandu($scope.jasapandu);
            if(!validationAsalDermaga) return false;
            */

            /* validasi Tgl Pandu toleransi 1 jam:*/
            var validationTglPandu = $scope.validationTglPandu(jasapandu);
            if(!validationTglPandu) return false;
            
          }

          PermohonanPanduEdit.update({
            id: $scope.jasapandu.noPpkJasa
          }, $scope.jasapandu, function(response) {
            if($scope.kapalGandengUpdateArray.length > 0){
              for (var y = 0; y < $scope.kapalGandengUpdateArray.length; y++) {
                if(!$scope.kapalGandengUpdateArray[y].id){
                  $scope.kapalGandeng[y] = $scope.kapalGandengUpdateArray[y];
                  $scope.kapalGandeng[y].noPpk1 = $scope.jasapandu.noPpk1;
                  $scope.kapalGandeng[y].noPpkJasa = $scope.jasapandu.noPpkJasa;
                  AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
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
              checkunique = [];
              $scope.kapalGandengArray = [];
              $scope.kapalGandengUpdateArray = [];
            }
            $scope.setNotification  = {
              type  : "success",
              message : "Jasa Pandu berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            BindEskalasi.setDefaultEskalasi();
            $scope.jasapandugrid[$scope.indexPandu].asal = response.asal;
            $scope.jasapandugrid[$scope.indexPandu].tujuan = response.tujuan;
            $scope.jasapandugrid[$scope.indexPandu].tglPandu = response.tglPandu;

            AppParamValue.get({nama:'JENIS_PANDU', value:response.jenisPandu}, {}, function(response){
              $scope.jasapandugrid[$scope.indexPandu].jenisPanduText = response[0].caption;
            });

            AppParamValue.get({nama:'JENIS_GERAKAN', value:response.jenisGerakan}, {}, function(response){
              $scope.jasapandugrid[$scope.indexPandu].jenisGerakanText = response[0].caption;
            });

            // $scope.jasapandugrid[$scope.indexPandu].jenisPanduText = response.jenisPanduText;
            // $scope.jasapandugrid[$scope.indexPandu].jenisGerakanText = response.jenisGerakanText;
            $scope.jasapandugrid[$scope.indexPandu].flagApbs = response.flagApbs;
            $scope.jasapandu.noPpkJasa = undefined;
            //$scope.jasapandu.noForm = $scope.permohonan.noForm;
            $scope.jasapandu.lokasiAsal = '';
            $scope.jasapandu.lokasiTujuan = '';
            $scope.jasapandu.jenisPandu = '1';
            $scope.jasapandu.jenisGerakan = '';
            $scope.tglPandu = new Date();
            document.getElementById("jamPanduVal").value = moment().format('HH:mm');
            $scope.kapalGandengArray = [];
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Pandu tidak berhasil tersimpan."+response.description
            };
            Notification.setNotification($scope.setNotification);
          });
        }
      };

      //reset Pandu
      $scope.resetPandu = function() {
        $scope.panduComar = {};
        //$scope.panduComar.jenisPandu = '1';
        $scope.tglPandu = new Date();
        document.getElementById("jamPanduVal").value = moment().format('HH:mm');
        $scope.kapalGandengArray = [];
      };

      $scope.validationAsalLokasiPandu = function(jasaPandu){
        var match = true;
        var jasaTambatGrid;
        /* set jasaTambatGrid */
        if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
          jasaTambatGrid = $scope.jasatambatgridpast;
        }else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
          jasaTambatGrid = $scope.jasatambatgrid;
        }else{
          jasaTambatGrid = $scope.jasatambatgrid;
        }
        jasaTambatGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatGrid)), '-noPpkJasa');

        if(jasaTambatGrid.length > 0 && jasaPandu.lokasiAsal){
          var itemTambat;
          jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
          if(jasaPandu.jenisDermagaAsal!==null){
            if(jasaPandu.jenisDermagaAsal.indexOf('DMG') >= 0 ){
              if(jasaPandu.jenisGerakan == '3'){
                if(typeof jasaTambatGrid[0].lokasi==='object'){
                  itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
                }else{
                  itemTambat = jasaTambatGrid[0].kodeLokasi;
                }

                if(typeof jasaPandu.lokasiAsal==='object'){
                  if(itemTambat!==jasaPandu.lokasiAsal.mdmgKode){
                    if(jasaPandu.lokasiAsal.mdmgJenisDmg == 'AREALABUH'){
                      match = true;
                    }else{
                      match = false;
                    }
                  }
                }
              }
            }
          }
        }

        if(!match){
          var note =  {
                  type  : "warning",
                  message : "Lokasi Asal Pandu Gerakan Keluar harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-046</b>"
                };
          Notification.setNotification(note);
          $("#jasapanduLokasiAsal").focus();
          $scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
          $scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
        }
        return match;
      }

      $scope.validationTujuanLokasiPandu = function(jasaPandu){
        var match = true;
        var jasaTambatGrid;
        var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);

        /* set jasaTambatGrid */
        if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
          jasaTambatGrid = $scope.jasatambatgridpast;
        }else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
          jasaTambatGrid = $scope.jasatambatgrid;
        }else{
          jasaTambatGrid = $scope.jasatambatgrid;
        }

        jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
        if(langsungSandar == true){
          if(jasaTambatGrid.length>0 && jasaPandu.lokasiTujuan){
            var itemTambat;         
            if(jasaPandu.jenisDermagaTujuan!==null){
              if(jasaPandu.jenisDermagaTujuan.indexOf('DMG') >= 0 ){
                if(jasaPandu.jenisDermagaTujuan != 'DMGKHUSUS'){
                  if(jasaPandu.jenisGerakan == '1'){
                    if(typeof jasaTambatGrid[0].lokasi==='object'){
                      itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
                    }else{
                      itemTambat = jasaTambatGrid[0].kodeLokasi;
                    }

                    if(typeof jasaPandu.lokasiTujuan==='object'){
                      if(itemTambat!==jasaPandu.lokasiTujuan.mdmgKode){
                        match = false;
                      }
                    }
                  }
                }
              }
            }
          }         
        }
        
        if(langsungSandar == false){
          if(jasaTambatGrid.length>0 && jasaPandu.lokasiTujuan){
            var itemTambat;         
            if(jasaPandu.jenisDermagaTujuan!==null){
              if(typeof jasaTambatGrid[0].lokasi==='object'){
                itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
              }else{
                itemTambat = jasaTambatGrid[0].kodeLokasi;
              }

              if(jasaPandu.jenisGerakan == '2'){
                if(jasaPandu.jenisDermagaTujuan.indexOf('DMG') >= 0 ){
                  if(jasaPandu.jenisDermagaTujuan != 'DMGKHUSUS'){
                    if(typeof jasaPandu.lokasiTujuan==='object'){
                      if(itemTambat!==jasaPandu.lokasiTujuan.mdmgKode){
                        match = false;
                      }
                    }                   
                  }
                }
              }
            }
          }
        }


        if(!match){
          var note =  {
                  type  : "warning",
                  message : "Lokasi Tujuan Pandu Gerakan Masuk harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-023</b>"
                };
          Notification.setNotification(note);
          $("#jasapanduLokasiTujuan").focus();
          $scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
          $scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
        }
        return match;
      }

      $scope.validationTglPandu = function(jasaPandu){
        var match = true;
        var jasaTambatGrid;
        var failedMessage;
        var statusEskalasi = false;

        /* set jasaTambatGrid */
        if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
          jasaTambatGrid = $scope.jasatambatgridpast;
        }else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
          jasaTambatGrid = $scope.jasatambatgrid;
        }else{
          jasaTambatGrid = $scope.jasatambatgrid;
        }

        if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
          jasaTambatGrid = $scope.jasatambatgridpast;
        }else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
          jasaTambatGrid = $scope.jasatambatgrid;
        }else{
          jasaTambatGrid = $scope.jasatambatgrid;
        }

        if(jasaTambatGrid.length>0){
          var itemTambat,tglPandu,tglMulaiTambat,tglSelesaiTambat,tglPanduDiff;
          tglPandu = $filter('date')(jasaPandu.tglPandu, 'dd-MM-yyyy');
          //tglMulaiTambat = $filter('date')(jasaTambatGrid[0].tglMulai, 'dd-MM-yyyy');
          tglMulaiTambat = Date.parse(jasaTambatGrid[0].tglMulai);
          tglPanduDiff = Date.parse(jasaPandu.tglPandu);
          tglSelesaiTambat = Date.parse(jasaTambatGrid[0].tglSelesai);

          if(jasaPandu.jenisGerakan == '1'){
            var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH024');
            var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH024');
            if(hasEsc){
              match = true;
            }else{
              /*if(tglPandu!==tglMulaiTambat){
                match = false;
                statusEskalasi = itemEskalasi.id!==undefined?true:false;
                failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Mulai Tambat.<br><br>Kode validasi: <b>VALPMH-024</b>";
              }*/
              if(tglMulaiTambat > tglPanduDiff){
                              var selisih = parseInt(tglMulaiTambat)-parseInt(tglPanduDiff);
                              if(selisih > 3600000){
                                  match = false;
                                  failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Masuk Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-024</b>"
                }
              }else{
                              var selisih = parseInt(tglPanduDiff)-parseInt(tglMulaiTambat);
                              if(selisih > 3600000){
                  match = false;
                  failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Masuk Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-024</b>"
                              }
                          }
            }
          }

          if(jasaPandu.jenisGerakan == '2'){
            if(jasaTambatGrid[0].kodeLokasi == jasaPandu.kodeLokasiTujuan){
                          if(tglMulaiTambat > tglPanduDiff){
                              var selisih = parseInt(tglMulaiTambat)-parseInt(tglPanduDiff);
                              if(selisih > 3600000){
                                  match = false;
                                  failedMessage = "Toleransi tidak boleh lebih dari 1 Jam dengan Jasa Tambat.<br><br>Kode validasi: <b>VALPMH-047</b>"
                }
              }else{
                              var selisih = parseInt(tglPanduDiff)-parseInt(tglMulaiTambat);
                              if(selisih > 3600000){
                  match = false;
                  failedMessage = "Toleransi tidak boleh lebih dari 1 Jam dengan Jasa Tambat.<br><br>Kode validasi: <b>VALPMH-047</b>"
                              }
                          }             
            }
          }

          if(jasaPandu.jenisGerakan == '3'){
            var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH039');
            var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH039');
            if(hasEsc){
              match = true;
            }else{
                          if(tglSelesaiTambat > tglPanduDiff){
                              var selisih = parseInt(tglSelesaiTambat)-parseInt(tglPanduDiff);
                              if(selisih > 3600000){
                                  match = false;
                  statusEskalasi = itemEskalasi.id!==undefined?true:false;
                                  failedMessage = "Tanggal Pandu Gerakan Keluar harus sama dengan Tanggal Selesai Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-039</b>";
                }
              }else{
                              var selisih = parseInt(tglPanduDiff)-parseInt(tglSelesaiTambat);
                              if(selisih > 3600000){
                  match = false;
                  statusEskalasi = itemEskalasi.id!==undefined?true:false;
                  failedMessage = "Tanggal Pandu Gerakan Keluar harus sama dengan Tanggal Selesai Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-039</b>";
                              }
                          }
                      }
          }
        }

        if(!match){
          var note =  {
                  type  : "warning",
                  message : failedMessage,
                  hasEsc  : statusEskalasi,
                  dataEsc : itemEskalasi
                };
          Notification.setNotification(note);
          $("#tglPandu").focus();
          $scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
          $scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
        }
        return match;
      }

      $scope.submitTunda = function(jasatunda) {
        if($routeParams.id){
          jasatunda = $scope.jasatunda;
          var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
          var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
          jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
        }
        if (jasatunda.noPpkJasa === undefined) {
          jasatunda.detailPmhId = $scope.permohonan.details[0].id;
          jasatunda.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
          jasatunda.noPpk1 = $scope.permohonan.noPpk1;

          //concat jam dan waktu tunda
          if(jasatunda.tglMulai === undefined){
            var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
            var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
            jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
          }

          jasatunda.tglSelesai = $filter('date')($scope.tglSelesaiTunda, 'yyyy-MM-ddT00:00:00');
          //var jamSelesaiVal = document.getElementById("jamSelesaiTundaVal").value;
          // $scope.jasatunda.tglSelesai = tglSelesaiVal + 'T' + jamSelesaiVal;

          if (typeof jasatunda.lokasiAsal === 'object') {
            jasatunda.kodeLokasiAsal = jasatunda.lokasiAsal.mdmgKode;
            jasatunda.asal = jasatunda.lokasiAsal.mdmgNama;
            jasatunda.jenisDermagaAsal = jasatunda.lokasiAsal.mdmgJenisDmg;
          }else{
            jasatunda.kodeLokasiAsal = jasatunda.kodeLokasiAsal;
            jasatunda.asal = jasatunda.asal;
            jasatunda.jenisDermagaAsal = jasatunda.jenisDermagaAsal;
          }

          if (typeof jasatunda.lokasiTujuan === 'object') {
            jasatunda.kodeLokasiTujuan = jasatunda.lokasiTujuan.mdmgKode;
            jasatunda.tujuan = jasatunda.lokasiTujuan.mdmgNama;
            jasatunda.jenisDermagaTujuan = jasatunda.lokasiTujuan.mdmgJenisDmg;
          }else{
            jasatunda.kodeLokasiTujuan = jasatunda.kodeLokasiTujuan;
            jasatunda.tujuan = jasatunda.tujuan;
            jasatunda.jenisDermagaTujuan = jasatunda.jenisDermagaTujuan;
          }

          if($routeParams.id){
            /* validasi dermaga pandu :*/
            var validationDermaga = $scope.validationAsalTujuanLokasiTunda(jasatunda);
            if(!validationDermaga) return false;

            /* validasi Tgl Tunda :*/
            var validationTglTunda = $scope.validationTglTunda(jasatunda);
            if(!validationTglTunda) return false;

            var R1 = validationForm.required('Lokasi Asal Tunda', jasatunda.asal);
            if(!R1){return R1;}
            var R2 = validationForm.required('Lokasi Tujuan Tunda', jasatunda.tujuan);
            if(!R2){return R2;}
            var R3 = validationForm.required('Tanggal Tunda', tglMasukVal);
            if(!R3){return R3;}
            var R4 = validationForm.required('Jam Tunda', jamMasukVal);
            if(!R4){return R4;}
          }

          PermohonanTunda.save(jasatunda, function(response) {
            if(response.status !== '500'){
              $scope.setNotification  = {
                type  : "success",
                message : "Jasa Tunda berhasil tersimpan"
              };
              Notification.setNotification($scope.setNotification);
              if($routeParams.id){
                response.fake = false;
                $scope.temptunda.push(response);
                $scope.jasatundagrid = $scope.temptunda;
                BindEskalasi.setDefaultEskalasi();
              }
              $scope.jasatunda.noppkjasa = undefined;
              $scope.jasatunda.lokasiAsal = '';
              $scope.jasatunda.lokasiTujuan = '';
              $scope.tglMulaiTunda = new Date();
              $scope.tglSelesaiTunda = new Date();
              document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
            }else{
              $scope.setNotification  = {
                type  : "danger",
                message : "Jasa Tunda tidak berhasil tersimpan."+response.description
              };
              Notification.setNotification($scope.setNotification);
            }
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Tunda tidak berhasil tersimpan."+response.description
            };
            Notification.setNotification($scope.setNotification);
          });
        } else {
          //concat jam dan waktu tunda
          var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
          var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
          $scope.jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;

          // var tglSelesaiVal = $filter('date')($scope.tglSelesaiTunda, 'yyyy-MM-dd');
          // var jamSelesaiVal = document.getElementById("jamSelesaiTundaVal").value;
          // $scope.jasatunda.tglSelesai = tglSelesaiVal + 'T' + jamSelesaiVal;

          if (typeof $scope.jasatunda.lokasiAsal === 'object') {
            $scope.jasatunda.kodeLokasiAsal = $scope.jasatunda.lokasiAsal.mdmgKode;
            $scope.jasatunda.asal = $scope.jasatunda.lokasiAsal.mdmgNama;
          }

          if (typeof $scope.jasatunda.lokasiTujuan === 'object') {
            $scope.jasatunda.kodeLokasiTujuan = $scope.jasatunda.lokasiTujuan.mdmgKode;
            $scope.jasatunda.tujuan = $scope.jasatunda.lokasiTujuan.mdmgNama;
          }

          if($routeParams.id){
            /* validasi dermaga pandu :*/
            var validationDermaga = $scope.validationAsalTujuanLokasiTunda($scope.jasatunda);
            if(!validationDermaga) return false;

            /* validasi Tgl Tunda :*/
            var validationTglTunda = $scope.validationTglTunda($scope.jasatunda);
            if(!validationTglTunda) return false;
          }

          PermohonanTundaEdit.update({
            id: $scope.jasatunda.noPpkJasa
          }, $scope.jasatunda, function(response) {
            $scope.setNotification  = {
              type  : "success",
              message : "Jasa Tunda berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
            BindEskalasi.setDefaultEskalasi();
            $scope.jasatundagrid[$scope.indexTunda].asal = response.asal;
            $scope.jasatundagrid[$scope.indexTunda].tglMulai = response.tglMulai;
            $scope.jasatundagrid[$scope.indexTunda].tglSelesai = response.tglSelesai;
            $scope.jasatundagrid[$scope.indexTunda].asal = response.asal;
            $scope.jasatundagrid[$scope.indexTunda].tujuan = response.tujuan;
            $scope.jasatunda.noPpkJasa = undefined;
            //$scope.jasatunda.noForm = $scope.permohonan.noForm;
            $scope.jasatunda.lokasiAsal = '';
            $scope.jasatunda.lokasiTujuan = '';
            $scope.tglMulaiTunda = new Date();
            $scope.tglSelesaiTunda = new Date();
            document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
            //document.getElementById("jamSelesaiTundaVal").value = moment().format('HH:mm');
            $timeout(function() {
              $scope.alertShow = false;
            }, 5000);
          }, function() {
            $scope.setNotification  = {
              type  : "danger",
              message : "Jasa Tunda tidak berhasil tersimpan"
            };
            Notification.setNotification($scope.setNotification);
          })
        }
      };


      $scope.validationLookupPpk1 = function(){
      if(typeof $scope.panduComar.noPpk1 != 'object'){ 
      $scope.setNotification  = {
        type  : 'warning',
        message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-007</b>'
      };
      Notification.setNotification($scope.setNotification);
      $scope.dataUmum = {};
      $scope.btnLanjut = false;
    }
  };

  $scope.$watch('panduComar.noPpk1',function(){
    if(typeof $scope.panduComar.noPpk1 === 'object'){
      detailsPenetapan = [];
      var tempPpk1 = '';
      $scope.panduComar.idVisit = $scope.panduComar.noPpk1.idVisit;
      $scope.panduComar.kodeKapal = $scope.panduComar.noPpk1.kodeKapal;
      $scope.panduComar.namaKapal = $scope.panduComar.noPpk1.namaKapal;
      $scope.panduComar.kodePelabuhanAsal = $scope.panduComar.noPpk1.kodePelabuhanAsal;
      $scope.panduComar.namaPelabuhanAsal = $scope.panduComar.noPpk1.namaPelabuhanAsal;
      $scope.panduComar.kodePelabuhanTujuan = $scope.panduComar.noPpk1.kodePelabuhanTujuan;
      $scope.panduComar.namaPelabuhanTujuan = $scope.panduComar.noPpk1.namaPelabuhanTujuan;
      $scope.panduComar.kodeAgen = $scope.panduComar.noPpk1.kodeAgen;
      $scope.panduComar.namaAgen = $scope.panduComar.noPpk1.namaAgen;
      $scope.panduComar.sifatKunjungan = $scope.panduComar.noPpk1.sifatKunjungan;
      $scope.panduComar.kemasanBongkar = $scope.panduComar.noPpk1.kemasanBongkar;
      $scope.panduComar.jumlahBongkar = $scope.panduComar.noPpk1.jumlahBongkar;
      $scope.panduComar.satuanBongkar = $scope.panduComar.noPpk1.satuanBongkar;
      $scope.panduComar.kemasanMuat = $scope.panduComar.noPpk1.kemasanMuat;
      $scope.panduComar.jumlahMuat = $scope.panduComar.noPpk1.jumlahMuat;
      $scope.panduComar.satuanMuat = $scope.panduComar.noPpk1.satuanMuat;
      $scope.panduComar.jenisKapal = $scope.panduComar.noPpk1.jenisKapal;
      $scope.panduComar.negaraKapal = $scope.panduComar.noPpk1.negaraKapal;
      $scope.panduComar.callSign = $scope.panduComar.noPpk1.callSign;
      $scope.panduComar.loa = $scope.panduComar.noPpk1.loa;
      $scope.panduComar.gtKapal = $scope.panduComar.noPpk1.gtKapal;
      
      //PermohonanByKodeKapal.get({kodeKapal :  $scope.dataUmum.namaKapal.mkplKode}, function(response){
        //if(response.status != '500'){
          tempPpk1 = $scope.panduComar.noPpk1.noPpk1;
          // PanduComarList.get({noPpk1 : tempPpk1},function(response){            
          //   if(response.content.length > 0){
          //     if(response.content[0].details.length > 0){
          //       for (var i = 0; i < response.content[0].details.length; i++) {
          //         if(response.content[0].details[i].status !== 'N' || response.content[0].details[i].status !== 'P'){
          //           if(response.content[0].details[i].jasa.length > 0){
          //             for (var j = 0; j < response.content[0].details[i].jasa.length; j++) {
          //               if(response.content[0].details[i].jasa[j].status === 2 && response.content[0].details[i].jasa[j].nama === 'epb_tambat'){
          //                 var status = response.content[0].details[i].status;
          //                 if(status==='R'){ 
          //                 }else{ 
          //                 }
          //               }
          //             }
          //           }
          //         }
          //       }
          //       $scope.btnLanjut = true;
          //     }
          //   }else{
          //     $scope.setNotification  = {
          //       type  : 'warning',
          //       message : 'Nama Kapal yang Anda Masukan Tidak Memiliki Jasa Apapun,<br> Silahkan Pilih No.PPK1 Lain!<br><br>Kode validasi: <b>VALPMH-012</b>'
          //     };
          //     Notification.setNotification($scope.setNotification);
          //     $scope.panduComar = {};
          //     $scope.btnLanjut = false;
          //   }
          // });
    }
  });

    $scope.getPanduComar = function(noPpk1){
      PanduComarList.get({
        noPpk1 : noPpk1
      }, function(response) {
        $scope.jasaPanduComar = response.content;
      });
    };

    // $scope.$watch('jasatambat.lokasi', function() {
    //   $scope.setShowKemasan();
    // });

      $scope.validationAsalTujuanLokasiTunda = function(jasaTunda){
        var match = true;
        var failedMessage;
        var jasaPanduGrid,jasaTambatGrid;
        var statusEskalasi = false;
        var itemEskalasi = {};

        /* set jasaPanduGrid */
        if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
          jasaPanduGrid = $scope.jasapandugridpast;
        }else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
          jasaPanduGrid = $scope.jasapandugrid;
        }else{
          jasaPanduGrid = $scope.jasapandugrid;
        }

        /* set jasaTambatGrid */
        if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
          jasaTambatGrid = $scope.jasatambatgridpast;
        }else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
          jasaTambatGrid = $scope.jasatambatgrid;
        }else{
          jasaTambatGrid = $scope.jasatambatgrid;
        }

        if (typeof jasaTunda.lokasiAsal === 'object') {
          jasaTunda.kodeLokasiAsal = jasaTunda.lokasiAsal.mdmgKode;
          jasaTunda.asal = jasaTunda.lokasiAsal.mdmgNama;
        }else{
          jasaTunda.kodeLokasiAsal = jasaTunda.kodeLokasiAsal;
          jasaTunda.asal = jasaTunda.asal;
        }

        if (typeof jasaTunda.lokasiTujuan === 'object') {
          jasaTunda.kodeLokasiTujuan = jasaTunda.lokasiTujuan.mdmgKode;
          jasaTunda.tujuan = jasaTunda.lokasiTujuan.mdmgNama;
        }else{
          jasaTunda.kodeLokasiTujuan = jasaTunda.kodeLokasiTujuan;
          jasaTunda.tujuan = jasaTunda.tujuan;
        }

        if(jasaPanduGrid.length>0){
          var itemPanduLokasiAsal,itemPanduLokasiTujuan;
          /*untuk sorting noPpkJasaTerbaru*/
          jasaPanduGrid.sort($scope.sortedNoPpkJasa);

          // for(var i=0;i<jasaPanduGrid.length;i++){
            itemPanduLokasiAsal = typeof jasaPanduGrid[0].lokasiAsal==='object'?jasaPanduGrid[0].lokasiAsal.mdmgKode:jasaPanduGrid[0].kodeLokasiAsal;
            itemPanduLokasiTujuan = typeof jasaPanduGrid[0].lokasiTujuan==='object'?jasaPanduGrid[0].lokasiTujuan.mdmgKode:jasaPanduGrid[0].kodeLokasiTujuan;

            if(itemPanduLokasiAsal!==jasaTunda.kodeLokasiAsal && itemPanduLokasiTujuan === jasaTunda.kodeLokasiTujuan){
              if(jasaPanduGrid[0].jenisGerakan == '1'){
                AturanGerakPanduList.get({
                  kodeLokasi: jasaTunda.kodeLokasiAsal,
                  flagAktif:1
                }, function(response) {
                  if(response.content.length>0){
                    match = false;
                    failedMessage = "Asal Tunda tidak boleh dari "+jasaTunda.asal+"<br><br>Kode validasi : <b>VALPMH-034</b>";
                  }
                });
              }else if(jasaPanduGrid[0].jenisGerakan == '2'){
                match = false;
                failedMessage = "Lokasi Asal dan Lokasi Tujuan Tunda harus sama dengan Asal Tujuan Pandu<br><br>Kode validasi: <b>VALPMH-027</b>";
              }
            }else if(itemPanduLokasiAsal===jasaTunda.kodeLokasiAsal && itemPanduLokasiTujuan !== jasaTunda.kodeLokasiTujuan){
              if(jasaPanduGrid[0].jenisGerakan == '3'){
                AturanGerakPanduList.get({
                  kodeLokasi: jasaTunda.kodeLokasiTujuan,
                  flagAktif:1
                }, function(response) {
                  if(response.content.length>0){
                    match = false;
                    failedMessage = "Tujuan Tunda tidak boleh dari "+jasaTunda.tujuan+"<br><br>Kode validasi : <b>VALPMH-035</b>";
                  }
                });
              }else if(jasaPanduGrid[0].jenisGerakan == '2'){
                match = false;
                failedMessage = "Lokasi Asal dan Lokasi Tujuan Tunda harus sama dengan Asal Tujuan Pandu<br><br>Kode validasi: <b>VALPMH-027</b>";
              }
            }else if(itemPanduLokasiTujuan === jasaTunda.kodeLokasiTujuan){
                AturanGerakPanduList.get({
                  kodeLokasi: jasaTunda.kodeLokasiTujuan,
                  flagAktif:1
                }, function(response) {
                  if(response.content.length>0){
                    match = false;
                    failedMessage = "Tujuan Tunda tidak boleh dari "+jasaTunda.tujuan+"<br><br>Kode validasi : <b>VALPMH-035</b>";
                  }
                });
            }
          // }
        }
        if(match){
          if(jasaTambatGrid.length>0 && jasaTunda.lokasiTujuan){
          var itemTambat;
          jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
            for(var i=0;i<jasaTambatGrid.length;i++){
              itemTambat = typeof jasaTambatGrid[0].lokasi==='object'?jasaTambatGrid[0].lokasi.mdmgKode:jasaTambatGrid[0].kodeLokasi;
              itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH028');
              var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH028');
              if(hasEsc){
                match = true;
              }else{
                if(itemTambat!==jasaTunda.lokasiTujuan.mdmgKode) {
                  match = false;
                  statusEskalasi = itemEskalasi.id!==undefined?true:false;
                  failedMessage = "Lokasi Tujuan Tunda harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-028</b>";
                }
              }
            }
          }
        }

        if(!match){

          var note =  {
                  type  : "warning",
                  message : failedMessage,
                  hasEsc  : statusEskalasi,
                  dataEsc : itemEskalasi
                };
          Notification.setNotification(note);
          $("#jasapanduLokasiTujuan").focus();
        }
        return match;
      }

/*===================================autocomplete========================================*/

  $scope.getListOfDermagaPandu = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaPerJasa.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    }
  };

  $scope.getListOfDermagaPanduTujuan = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaPerJasa.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    }
  };

  /*validation form */
  $scope.validateForm = function(formObj) {
    formObj.submitButton.disabled = true;
      formObj.submitButton.value = 'Please Wait...';
      return true;
  }

    var formatSeparator = function(input) {
      input = parseFloat(input);
      input = input.toFixed(input % 1 === 0 ? 0 : 2);
      return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
// akhir
}])
