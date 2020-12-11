'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PutusValutaCtrl
 * @description
 * # PutusValutaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PutusValutaCtrl', ['$scope', '$location', '$filter', '$timeout', 'LoadingScreen',
    'Notification', 'SearchPpk1WithCabang', 'DetailByPpk1', 'Autocomplete',
    'MdmPelabuhanSearch', 'PermohonanSetDone',
    'PermohonanAdd','PermohonanTambat','PermohonanPandu','PermohonanTunda',
    'PermohonanAirKapal','PenetapanTambat','PenetapanPandu','PenetapanTunda',
    'PenetapanAirKapal','RealisasiTambat','RealisasiPandu','RealisasiTunda',
    'RealisasiAirKapal','AddReaKapalTunda','AddReaKapalTundaGandeng',
    'RealisasiAirKapalDetailAlatIsi', 'RealisasiAirKapalDetailKapalPenunjang',
    '$location','StatusEPBPermohonan','AppParam','DeleteJasaByPpkJasa','AddKapalGandeng',
  function($scope, $locations, $filter, $timeout, LoadingScreen, Notification, SearchPpk1WithCabang,
    DetailByPpk1, Autocomplete, MdmPelabuhanSearch, PermohonanSetDone,
    PermohonanAdd, PermohonanTambat, PermohonanPandu, PermohonanTunda,
    PermohonanAirKapal, PenetapanTambat, PenetapanPandu, PenetapanTunda, PenetapanAirKapal,
    RealisasiTambat, RealisasiPandu, RealisasiTunda, RealisasiAirKapal, AddReaKapalTunda,
    AddReaKapalTundaGandeng, RealisasiAirKapalDetailAlatIsi, RealisasiAirKapalDetailKapalPenunjang,
    $location,StatusEPBPermohonan,AppParam,DeleteJasaByPpkJasa,AddKapalGandeng) {
    LoadingScreen.show();

  /** Param */
    $scope.permohonan = {};
    $scope.arrayJasa = [];
    $scope.lockPpk1 = false;
    $scope.tasks = [];
    var jenisPandu = [];
    var jenisGerakan = [];
    var alatIsi = [];
    var satuanVolume = [];
  /** End of Param */

  /** Get Param */
  AppParam.get({
    nama: 'JENIS_PANDU'
  }, function(response){
    jenisPandu = response.content;
  });

  AppParam.get({
    nama: 'JENIS_GERAKAN'
  }, function(response){
    jenisGerakan = response.content;
  });

  AppParam.get({
    nama: 'ALAT_ISI_AIR'
  }, function(response) {
    alatIsi = response.content;
  });

  AppParam.get({
    nama: 'SATUAN_AIR_KAPAL'
  }, function(response) {
    LoadingScreen.hide();
    satuanVolume = response.content;
  });

  var getCaption = function(params, value){
    var param = params.find(function(item){
      return item.value == value;
    });
    return param.caption;
  }
  /** End Get Param */

  /** Function and Procedure */
    // Mulai Putus Valuta
    $scope.start = function() {
      LoadingScreen.show();
      // Get Detail Permohonan By Ppk1
      DetailByPpk1.get({
        ppk1: $scope.permohonan.noPpk1
      }, function(response) {
        if(response.detailPmh){
          $scope.lockPpk1 = true; // Lock Ppk1
          getJasa(response.detailPmh); // Get Jasa from Detail Permohonan
          getBasicInfo();
          console.log($scope.arrayJasa);
        } else {
          $scope.permohonan = {};
          Notification.setNotification({
            type: 'danger',
            message: 'Terjadi kesalahan pada pada sistem'
          });
        }
        LoadingScreen.hide();
      });
    }

    // Get Jasa From Detail Permohonan
    var getJasa = function(detailPmh) {
      // Get Array Jasa
      detailPmh.jasa.forEach(function(item) {
        item.putusJasa = false;
        $scope.arrayJasa.push(item);
      });
      // For Each Jasa in Array Jasa
      $scope.arrayJasa.forEach(function(jasa) {
        // Set Label
        setLabelJasa(jasa);
        // Get Detail Penetapan
        var detailPtp = detailPmh.ptpJasa.find(function(ptpJasa) {
          return ptpJasa.noPpkJasa == jasa.noPpkJasa;
        });
        jasa.ptpJasa = detailPtp;
        // Get Detail Realisasi
        var detailRea = detailPmh.reaJasa.find(function(reaJasa) {
          return reaJasa.noPpkJasa == jasa.noPpkJasa;
        });
        jasa.reaJasa = detailRea;
      });
    }

    var getBasicInfo = function() {
      $scope.arrayJasa.forEach(function(jasa){
        jasa.basicInfo = {};
        switch (jasa.nama) {
          case "epb_labuh":
            getBasicInfoByKeys(jasa, ['namaLokasi','tglMasuk','tglKeluar']);
            break;
          case "epb_tambat":
            getBasicInfoByKeys(jasa, ['namaLokasi','tglMulai','tglSelesai']);
            break;
          case "epb_pandu":
            getBasicInfoByKeys(jasa, ['tglMulai','jenisPandu','jenisGerakan']);
            if(!jasa.basicInfo.tglMulai) jasa.basicInfo.tglMulai = jasa.tglPandu;
            jasa.basicInfo.jenisPanduText = getCaption(jenisPandu, jasa.basicInfo.jenisPandu);
            jasa.basicInfo.jenisGerakanText = getCaption(jenisGerakan, jasa.basicInfo.jenisGerakan);
            break;
          case "epb_tunda":
            getBasicInfoByKeys(jasa, ['tglMulai','namaLokasiAsal','namaLokasiTujuan']);
            break;
          case "epb_air_kapal":
            getBasicInfoByKeys(jasa, ['alatIsi','namaDermaga','tglIsi','volume','satuanVolume']);
            if(!jasa.basicInfo.satuanVolume) jasa.basicInfo.satuanVolume = jasa.satuan;
            if(!jasa.basicInfo.tglIsi && jasa.reaJasa) jasa.basicInfo.tglIsi = jasa.reaJasa.tglMulaiIsi;
            jasa.basicInfo.alatIsiText = getCaption(alatIsi, jasa.basicInfo.alatIsi);
            jasa.basicInfo.satuanVolumeText = getCaption(satuanVolume, jasa.basicInfo.satuanVolume);
            break;
        }
      });
    }

    var getBasicInfoByKeys = function(jasa,keys) {
      if(jasa.reaJasa) {
        keys.forEach(function(key){
          jasa.basicInfo[key] = jasa.reaJasa[key];
        });
      } else if (jasa.ptpJasa) {
        keys.forEach(function(key){
          jasa.basicInfo[key] = jasa.ptpJasa[key];
        });
      } else {
        keys.forEach(function(key){
          jasa.basicInfo[key] = jasa[key];
        });
      }
    }

    // Set Label Jasa
    var setLabelJasa = function(jasa) {
      switch (jasa.nama) {
        case "epb_labuh":
          jasa.label = "Labuh";
          break;
        case "epb_tambat":
          jasa.label = "Tambat";
          break;
        case "epb_pandu":
          jasa.label = "Pandu";
          break;
        case "epb_tunda":
          jasa.label = "Tunda";
          break;
        case "epb_air_kapal":
          jasa.label = "Air Kapal";
          break;
      }
    }

    // Putus Valuta
    $scope.putusValuta = function() {
      // Get Semua Jasa yang Diputus
      var arrayJasaPutus = [];
      $scope.arrayJasa = $filter('orderBy')($scope.arrayJasa,'noPpkJasa');
      $scope.arrayJasa.forEach(function(jasa) {
        if (jasa.putusJasa) {
          arrayJasaPutus.push(jasa);
        }
      });
      // Cek apakah ada jasa yang akan diputus
      if(arrayJasaPutus.length == 0) {
        // Jika tidak ada jasa yang dipilih tampilkan pesan,
        //  putus valuta tidak dilanjutkan
        Notification.setNotification({
          type: 'warning',
          message: 'Pilih jasa yang ingin diputus terlebih dahulu'
        });
        return true;
      }
      // Generate Message
      var msg = "Yakin ingin memutus valuta untuk jasa\n";
      var jasaNum = 1;
      arrayJasaPutus.forEach(function(jasa) {
        msg += (jasaNum++) + ". " + jasa.label + " - " + jasa.noPpkJasa + "\n";
      });
      // Ask Confirmation
      var confirmation = confirm(msg);
      if(confirmation) {
        LoadingScreen.show();
        // Hapus Jasa
        hapusJasa(arrayJasaPutus);
        // Set Status Permohonan as Done
        $scope.tasks.push(1);
        PermohonanSetDone.update({ ppk1: $scope.permohonan.noPpk1 },{},
          function(){ $scope.tasks.pop(); });
        // Create Permohonan baru kemudian create pmh - ptp - rea baru untuk tiap jasa yang diputus
        createNew(arrayJasaPutus);
        // Wait for all tasks to complete
        $scope.$watch('tasks.length', function(){
          if($scope.tasks.length == 0) {
            LoadingScreen.hide();
            Notification.setNotification({
              type: 'success',
              message: 'Putus valuta berhasil'
            });
            $scope.permohonan = {};
            $scope.arrayJasa = [];
            $scope.lockPpk1 = false;
          }
        });
      }
    }

    // Hapus Jasa
    var hapusJasa = function(arrayJasaPutus) {
      arrayJasaPutus.forEach(function(jasa){
        $scope.tasks.push(1);
        DeleteJasaByPpkJasa.delete({noPpkJasa: jasa.noPpkJasa},{},function(){
          $scope.tasks.pop();
        });
      })
    }

    // Create Permohonan kemudian create php - ptp - rea baru untuk tiap jasa
    var createNew = function(arrayJasaPutus){
      // Data Permohonan
      var dataPmh = {
        jumlahBongkar: $scope.permohonan.jumlahBongkar,
        jumlahMuat: $scope.permohonan.jumlahMuat,
        kemasanBongkar: $scope.permohonan.kemasanBongkar,
        kemasanMuat: $scope.permohonan.kemasanMuat,
        kodeAgen: $scope.permohonan.kodeAgen,
        kodeKapal: $scope.permohonan.kodeKapal,
        kodePelabuhanAsal: $scope.permohonan.kodePelabuhanAsal,
        kodePelabuhanTujuan: $scope.permohonan.kodePelabuhanTujuan,
        namaAgen: $scope.permohonan.namaAgen,
        namaKapal: $scope.permohonan.namaKapal,
        namaPelabuhanAsal: $scope.permohonan.namaPelabuhanAsal,
        namaPelabuhanTujuan: $scope.permohonan.namaPelabuhanTujuan,
        satuanBongkar: $scope.permohonan.satuanBongkar,
        satuanMuat: $scope.permohonan.satuanMuat,
        sifatKunjungan: $scope.permohonan.sifatKunjungan,
        statusPelaksanaan: 3
      }
      if(typeof dataPmh.namaPelabuhanAsal == 'object'){
        dataPmh.kodePelabuhanAsal = dataPmh.namaPelabuhanAsal.mplbKode;
        dataPmh.namaPelabuhanAsal = dataPmh.namaPelabuhanAsal.mplbNama;
      }
      if(typeof dataPmh.namaPelabuhanTujuan == 'object'){
        dataPmh.kodePelabuhanTujuan = dataPmh.namaPelabuhanTujuan.mplbKode;
        dataPmh.namaPelabuhanTujuan = dataPmh.namaPelabuhanTujuan.mplbNama;
      }
      $scope.tasks.push(1);
      PermohonanAdd.save(dataPmh, function(response){
        // Set Status EPB as bayar
        $scope.tasks.push(1);
        StatusEPBPermohonan.get({
          ppk1: response.noPpk1,
          urutan: response.details[0].urutanPermohonan
        },function(){
          $scope.tasks.pop();
        });
        // Create ptp - pmh - rea jasa
        createNewJasa(arrayJasaPutus,response)
        $scope.tasks.pop();
      })
    }

    // Create Permohonan, Penetapan dan Realisasi untuk tiap Jasa
    var createNewJasa = function(arrayJasaPutus,dataPmh){
      arrayJasaPutus.forEach(function(jasa){
        // Update Data
        jasa.noPpk1 = dataPmh.noPpk1;
        jasa.detailPmhId = dataPmh.details[0].id;
        jasa.urutanPermohonan = dataPmh.details[0].urutanPermohonan;
        jasa.statusPelaksanaan = 3;
        if(jasa.ptpJasa) {
          jasa.ptpJasa.noPpk1 = dataPmh.noPpk1;
          jasa.ptpJasa.statusPelaksanaan = 3;
        }
        if(jasa.reaJasa) {
          jasa.reaJasa.noPpk1 = dataPmh.noPpk1;
          jasa.reaJasa.statusPelaksanaan = 3;
        }
        // Proses data sesuai jenis data
        switch (jasa.nama) {
          case "epb_tambat":
            createNewTambat(jasa);
            break;
          case "epb_pandu":
            createNewPandu(jasa);
            break;
          case "epb_tunda":
            createNewTunda(jasa);
            break;
          case "epb_air_kapal":
            createNewAirKapal(jasa);
            break;
        }
      });
    }

    // Create new pmh - ptp - rea for jasa tambat
    var createNewTambat = function(jasa){
      // Create Detail Permohonan Tambat
      $scope.tasks.push(1);
      var formData = new FormData();
      formData.append('pmhTambat', new Blob([JSON.stringify(jasa)], { type: "application/json" }));
      PermohonanTambat.save(formData,function(response){
        // Check if data penetapan exist
        if(jasa.ptpJasa) {
          // Update Data Penetapan
          jasa.ptpJasa.noPpkJasa = response.noPpkJasa;
          // Create Detail Penetapan Tambat
          $scope.tasks.push(1);
          PenetapanTambat.save(jasa.ptpJasa, function(response2){
            // Check if data realisasi exist
            if(jasa.reaJasa) {
              // Update Data Realisasi
              jasa.reaJasa.noPpkJasa = response.noPpkJasa;
              // Create Detail Realisasi Tambat
              $scope.tasks.push(1);
              RealisasiTambat.save(jasa.reaJasa, function(response3){
                $scope.tasks.pop();
              });
            }
            $scope.tasks.pop();
          });
        }
        $scope.tasks.pop();
      });
    }

    // Create new pmh - ptp - rea for jasa pandu
    var createNewPandu = function(jasa){
      // Create Detail Permohonan Pandu
      $scope.tasks.push(1);
      PermohonanPandu.save(jasa,function(response){
        // For each kapal Gandeng
        jasa.listKapalGandeng.forEach(function(item){
          // Update detail kapal gandeng
          item.noPpk1 = jasa.noPpk1;
          item.noPpkJasa = response.noPpkJasa;
          // Create detail kapal gandeng
          $scope.tasks.push(1);
          AddKapalGandeng.save(item,function(){
            $scope.tasks.pop();
          });
        });
        // Check if data penetapan exist
        if(jasa.ptpJasa) {
          // Update Data Penetapan
          jasa.ptpJasa.noPpkJasa = response.noPpkJasa;
          // Create Detail Penetapan Pandu
          $scope.tasks.push(1);
          PenetapanPandu.save(jasa.ptpJasa, function(response2){
            // Check if data realisasi exist
            if(jasa.reaJasa) {
              // Update Data Realisasi
              jasa.reaJasa.noPpkJasa = response.noPpkJasa;
              // Create Detail Realisasi Pandu
              $scope.tasks.push(1);
              RealisasiPandu.save(jasa.reaJasa, function(response3){
                $scope.tasks.pop();
              });
            }
            $scope.tasks.pop();
          });
        }
        $scope.tasks.pop();
      });
    }

    // Create new pmh - ptp - rea for jasa tunda
    var createNewTunda = function(jasa){
      // Create Detail Permohonan Tunda
      $scope.tasks.push(1);
      // $timeout(function() {
        PermohonanTunda.save(jasa,function(response){
          // Check if data penetapan exist
          if(jasa.ptpJasa) {
            // Update Data Penetapan
            jasa.ptpJasa.noPpkJasa = response.noPpkJasa;
            // Create Detail Penetapan Tunda
            $scope.tasks.push(1);
            PenetapanTunda.save(jasa.ptpJasa, function(response2){
              // Check if data realisasi exist
              if(jasa.reaJasa) {
                // Update Data Realisasi
                jasa.reaJasa.noPpkJasa = response.noPpkJasa;
                // Create Detail Realisasi Tunda
                $scope.tasks.push(1);
                var formData = new FormData();
                formData.append('reaTunda', new Blob([JSON.stringify(jasa.reaJasa)], { type: "application/json" }));
                RealisasiTunda.save(formData, function(response3){
                  // For each kapal tunda create detail kapal tunda
                  jasa.reaJasa.listKapalTunda.forEach(function(item){
                    // Update Data Kapal Tunda
                    item.noPpk1 = jasa.noPpk1;
                    item.noPpkJasa = response.noPpkJasa;
                    // Create Detail Kapal Tunda
                    $scope.tasks.push(1);
                    AddReaKapalTunda.save(item,function(response4){
                      $scope.tasks.pop();
                    });
                  });
                  // For each Kapal Tunda Gandeng create detail
                  jasa.reaJasa.listTundaGandeng.forEach(function(item){
                    // Update Data
                    item.noPpk1 = jasa.noPpk1;
                    item.noPpkJasa = response.noPpkJasa;
                    // Create Detail Kapal Tunda Gandeng
                    $scope.tasks.push(1);
                    AddReaKapalTundaGandeng.save(item,function(response5){
                      $scope.tasks.pop();
                    });
                  });
                  $scope.tasks.pop();
                });
              }
              $scope.tasks.pop();
            });
          }
          $scope.tasks.pop();
        });
      // }, 10000);
    }

    // Create new pmh - ptp - rea for jasa air kapal
    var createNewAirKapal = function(jasa){
      // Create Detail Permohonan Air Kapal
      $scope.tasks.push(1);
      PermohonanAirKapal.save(jasa,function(response){
        // Check if data penetapan exist
        if(jasa.ptpJasa) {
          // Update Data Penetapan
          jasa.ptpJasa.noPpkJasa = response.noPpkJasa;
          // Create Detail Penetapan Air Kapal
          $scope.tasks.push(1);
          PenetapanAirKapal.save(jasa.ptpJasa, function(response2){
            // Check if jasa realisasi exist
            if(jasa.reaJasa) {
              // Update Data Realisasi
              jasa.reaJasa.noPpkJasa = response.noPpkJasa;
              // Create Detail Realisasi Air Kapal
              $scope.tasks.push(1);
              RealisasiAirKapal.save(jasa.reaJasa, function(response3){
                // TODO alat isi
                jasa.reaJasa.detailAlatIsi.forEach(function(item){
                  // Update data
                  item.idReaAirKapal = response3.id;
                  $scope.tasks.push(1);
                  // Create Detail Alat Isi
                  RealisasiAirKapalDetailAlatIsi.save(item, function(response4){
                    $scope.tasks.pop();
                  });
                });
                // TODO kapal penunjang
                jasa.reaJasa.detailKapalPenunjang.forEach(function(item){
                  // Update Data
                  item.idReaAirKapal = response3.id;
                  $scope.tasks.push(1);
                  // Create Detail Kapal Penunjang
                  RealisasiAirKapalDetailKapalPenunjang.save(item, function(response5){
                    $scope.tasks.pop();
                  });
                });
                $scope.tasks.pop();
              });
            }
            $scope.tasks.pop();
          });
        }
        $scope.tasks.pop();
      });
    }
  /** End of Function and Procedure */

  /** Validation */
    var showValidationWarning = function() {
      Notification.setNotification({
        type: 'warning',
        message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALOTH-004</b>'
      });
    }

    // Validasi input PPK1
    $scope.validationLookupPpk1 = function() {
      if (typeof $scope.permohonan != 'object') {
        $scope.permohonan = {};
        showValidationWarning();
      }
    }

    // Validari input Pelabuhan Asal
    $scope.validationLookupAsal = function() {
      if (typeof $scope.permohonan.namaPelabuhanAsal != 'object') {
        $scope.permohonan.namaPelabuhanAsal = '';
        showValidationWarning();
      }
    }

    // Validasi input Pelabuhan Tujuan
    $scope.validationLookupTujuan = function() {
      if (typeof $scope.permohonan.namaPelabuhanTujuan != 'object') {
        $scope.permohonan.namaPelabuhanTujuan = '';
        showValidationWarning();
      }
    }
  /** End of Validation */

  /** Autocomplete */
    var acPpk1 = new Autocomplete(SearchPpk1WithCabang, "ppk1");
    $scope.getListPpk1 = function(value) {
      return acPpk1.get(value);
    }

    /*var acPelabuhan = new Autocomplete(MdmPelabuhanSearch, "nama", "plb");
    $scope.getListPelabuhan = function(value) {
      console.log(acPelabuhan.get(value))
      return acPelabuhan.get(value);
    }*/
    $scope.getListPelabuhan = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmPelabuhanSearch.get({
            nama: value,
            limit: '10'
          }, function(response) {
            resolve(response);
            response.forEach(function (response) {
              response.mkplNamaPlb = response.mplbNama +' ('+response.mplbKode+')';
            });
          });
        });
      }
    };
  /** End of Autocomplete */

  /** End of PutusValutaCtrl */
  }
])
