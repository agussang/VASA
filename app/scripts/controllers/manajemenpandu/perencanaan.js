'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanPanduCtrl
 * @description
 * # PerencanaanPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('PerencanaanPanduCtrl', ['$scope', '$location', '$filter', '$timeout', '$window', '$interval', '$http', '$rootScope', 'API_PATH', 'KawasanPanduList', 'MonitoringAntrianPanduList', 'MonitoringAntrianPanduTest', 'MonitoringPanduAdd', 'KawasanPanduLevelSatuList', 'SuratPerintahKerjaNumber', 'LoadingScreen', 'KapalTundaList', 'SuratPerintahKerjaPanduAdd', 'SuratPerintahKerjaPanduEdit', 'SuratPerintahKerjaPanduEditStatus', 'SuratPerintahKerjaPanduDetail', 'SuratPerintahKerjaPanduDelete', 'SuratPerintahKerjaPanduRpkro', 'Notification', 'PetugasPanduPerJadwalPandu', 'SpkTundaNumber', 'AlatApungList', 'SearchAlatApung', 'SpogNumber', 'PetugasPanduPerHariList', 'moment', 'SuratPerintahKerjaTambatAdd', 'AturanKapalTundaList', 'PenetapanPandu', 'PenetapanPanduEdit', 'MonitoringPetugasPandu', 'AppParam', 'KawasanPanduLevelDuaList', 'MdmDermagaSearchByKode', 'MdmDermagaPerJasa', 'AturanGerakPanduList', 'SuratPerintahKerjaPanduCancel', 'ParamsCabangList', '$PAGE_SIZE', 'PerencanaanPanduDelete', 'TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi', 'SearchSDMKapal', 'RealisasiPanduDetailbyPpkJasa', 'SuratPerintahKerjaPanduResend', 'SpbInaportnet', 'SuratPerintahKerjaNumberPpkJasaTambat','CekKesediaanAbsensiPandu','SearchNoPlatShuttleCar','SearchKodeBoatPilotBoat','PilotShuttleCarAdd','PilotBoatAdd','PilotShuttleCarResend','PilotBoatResend','PilotBoatBatal','PilotShuttleCarBatal','PilotShuttleCarStatus','PilotBoatStatus', function ($scope, $location, $filter, $timeout, $window, $interval, $http, $rootScope, API_PATH, KawasanPanduList, MonitoringAntrianPanduList, MonitoringAntrianPanduTest, MonitoringPanduAdd, KawasanPanduLevelSatuList, SuratPerintahKerjaNumber, LoadingScreen, KapalTundaList, SuratPerintahKerjaPanduAdd, SuratPerintahKerjaPanduEdit, SuratPerintahKerjaPanduEditStatus, SuratPerintahKerjaPanduDetail, SuratPerintahKerjaPanduDelete, SuratPerintahKerjaPanduRpkro, Notification, PetugasPanduPerJadwalPandu, SpkTundaNumber, AlatApungList, SearchAlatApung, SpogNumber, PetugasPanduPerHariList, moment, SuratPerintahKerjaTambatAdd, AturanKapalTundaList, PenetapanPandu, PenetapanPanduEdit, MonitoringPetugasPandu, AppParam, KawasanPanduLevelDuaList, MdmDermagaSearchByKode, MdmDermagaPerJasa, AturanGerakPanduList, SuratPerintahKerjaPanduCancel, ParamsCabangList, $PAGE_SIZE, PerencanaanPanduDelete, TipeEskalasiList, BindEskalasi, TipeEskalasi, SearchSDMKapal, RealisasiPanduDetailbyPpkJasa, SuratPerintahKerjaPanduResend, SpbInaportnet, SuratPerintahKerjaNumberPpkJasaTambat,CekKesediaanAbsensiPandu,SearchNoPlatShuttleCar,SearchKodeBoatPilotBoat,PilotShuttleCarAdd,PilotBoatAdd,PilotShuttleCarResend,PilotBoatResend,PilotBoatBatal,PilotShuttleCarBatal,PilotShuttleCarStatus,PilotBoatStatus) {
        $scope.items = [];
        $scope.listKapalTundaAvailable = [];
        $scope.listKapalTundaStatusOn = [];
        $scope.monitoring = {};
        $scope.petugas = [];
        $scope.spk = {};
        $scope.ohn = {};
        $scope.ohn.status = {};
        $scope.ohn.kapalTundaSpks = {};
        $scope.kodeCabang = localStorage.getItem('kodeCabang').toString();
        $scope.kodeCabang = $scope.kodeCabang.length < 2 ? '0' + $scope.kodeCabang : $scope.kodeCabang;
        $scope.data = {};
        $scope.penetapanPandu = {};
        $scope.petugasPandu = {};
        $scope.jenisGerakanOption = {};
        $scope.search = {};
        $scope.namaKapal = '';
        $scope.arrayOfIdSpkTunda = [];
        $scope.pageSize = 40;
        //$scope.search.status = 'Available';
        $scope.validasiPpkRpkro = '';
        $scope.entryInaportnet = '0';
        $scope.showErrorTujuan == false;
        $scope.aturanGerakByLokasiAsal = {};
        $scope.aturanGerakByLokasiTujuan = {};
        $scope.lokasiAsalGerakPandu = "";
        $scope.lokasiTujuanGerakPandu = "";
        $scope.area = "";
        $scope.namaDermagaAsal = "";
        $scope.namaDermagaTujuan = "";
        $scope.namaDermaga = "";
        $scope.spogMandatory = false;
        $scope.showLoader = true;
        //for nurika disabled btn proccess when petugas pandu not in list
        $scope.isDisabledPandu = false;

        $scope.infoPilot = {};
        $scope.infoPilot.jamAntarPilotCar= moment().format('HH:mm');
        $scope.infoPilot.jamAntarPilotBoat= moment().format('HH:mm');
        $scope.shuttleCar= {};
        $scope.shuttleBoat= {};


        //get jenis pandu
	    AppParam.get({nama:'JENIS_GERAKAN'},function(response){
		    $scope.jenisGerakanOption = response.content;
        });

        ParamsCabangList.get({nama : 'ENTRY_INAPORTNET'}, function(response){
            if(response.content != undefined){
                $scope.entryInaportnet = response.content[0].value;
                if ($scope.entryInaportnet == '1') {
                   $scope.inputManualSPOG = false;
                } else {
                    $scope.inputManualSPOG = true;
                }
            }
        });

        var currentDate = new Date();
        $scope.tanggalPanduAwal = $filter('date')($scope.tanggalPanduAwal, "dd-MM-yyyy");
        $scope.tanggalPanduAwal = $filter('date')(currentDate, "dd-MM-yyyy");
        $scope.tanggalPanduAkhir = $filter('date')($scope.tanggalPanduAkhir, "dd-MM-yyyy");
        $scope.tanggalPanduAkhir = $filter('date')(currentDate, "dd-MM-yyyy");
        var today = $filter('date')(Date.now(), "yyyy-MM-dd");
        var tanggalPandu = $filter('date')(Date.now(), "yyyy-MM-dd");
        var jamSaatIni = $filter('date')(Date.now(), "ddMMyyyyHHmm");
        var pmhTunda = {};
        var lokasiAsalPandu = 0;
        var lokasiTujuanPandu = 0;

        var setDisableTanggalPanduAwal = function() {
            $('#tanggalPanduAwal').datepicker('setEndDate', $scope.tanggalPanduAkhir);
            $('#tanggalPanduAwal').mask('99-99-9999');
        };

        var setDisableTanggalPanduAkhir = function() {
            $('#tanggalPanduAkhir').datepicker('setStartDate', $scope.tanggalPanduAwal);
            $('#tanggalPanduAkhir').mask('99-99-9999');
        };

        $('#jamMulaiVal').mask('99:99');
        

        $scope.$watch('tanggalPanduAwal', function(newValue) {
            $timeout(function() {
                setDisableTanggalPanduAwal();
                setDisableTanggalPanduAkhir();
            }, 100);
        });

        $scope.$watch('tanggalPanduAkhir', function(newValue) {
            $timeout(function() {
                setDisableTanggalPanduAwal();
                setDisableTanggalPanduAkhir();
            }, 100);
        });

       /* $scope.$watch('searchJenisGerakan', function(newValue) {
                console.log("hai");
                $scope.loadData(0);
        });*/

        $scope.validationLookupNoPlatCar = function(){
        if(typeof $scope.infoPilot.noPlatShuttleCar != 'object'){ 
            $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-007</b>'
          };
        Notification.setNotification($scope.setNotification);
            }
        };

         $scope.validationLookupKodePilotBoat = function(){
        if(typeof $scope.infoPilot.kodeBoat != 'object'){ 
            $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-007</b>'
          };
        Notification.setNotification($scope.setNotification);
            }
        };

        /*list No Plat Shuttle Car*/
        $scope.getListOfNoPlatCar = function(value) {
        if (value) {
          return new Promise(function(resolve, reject) {
            SearchNoPlatShuttleCar.get({
              }, function(response) {
                resolve(response.content);
              });
          });
        }
      };

      /*list Kode Boat Pilot Boat*/
        $scope.getListOfKodePilotBoat = function(value) {
        if (value) {
          return new Promise(function(resolve, reject) {
            SearchKodeBoatPilotBoat.get({
              }, function(response) {
                resolve(response.content);
              });
          });
        }
      };

        KawasanPanduLevelDuaList.get(function(response) {
            $scope.stasiunPandu = $filter('orderBy')(response,'-namaKawasan');
            $scope.stasiunPandu.push("");
            $scope.lokasi = $scope.stasiunPandu[0].namaKawasan;
        });

        AppParam.get({ nama: 'JENIS_GERAKAN' }, function(response) {
            $scope.parameterJenisGerakan = response.content;
            $scope.parameterJenisGerakan.push("");
        });

        AppParam.get({ nama: 'PENETAPAN_PANDU' }, function(response) {
            $scope.statusPenetapan = response.content;
            $scope.statusPenetapan.push("");
        });

        AppParam.get({ nama: 'STATUS_PANDU' }, function(response) {
            $scope.statusPemanduan = response.content;
            $scope.statusPemanduan.push("");
        });

        KapalTundaList.get({
            size: 999,
            page: -1,
            sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
        }, function(response) {
            response.content.forEach(function(element) {
                if (element.statusOn == true) {
                    $scope.listKapalTundaStatusOn.push({
                        kodeKapal: element.kodeKapal,
                        namaKapal: element.namaKapal
                    });
                }
                if (element.available == true && element.statusOn == true) {
                    $scope.listKapalTundaAvailable.push({
                        kodeKapal: element.kodeKapal,
                        namaKapal: element.namaKapal
                    });
                }
            });
        });

        AturanKapalTundaList.get(
            function(response) {
                $scope.aturanKapalTunda = response.content;
            }
        );

        $scope.getListKapal = function(value) {
            if (value) {
                return new Promise(function(resolve) {
                    SearchAlatApung.get({
                        nama: value,
                        limit: 10
                    }, function(response) {
                        resolve(response);
                    });
                });
            }
        };

        $scope.isBusy = function() {
            $scope.items = $filter('orderBy')($scope.items, 'tglPenetapan');
            $scope.items.forEach(function(data) {
                data.busy = false;
                data.jumlahTunda = 0;
                data.jam = moment(data.jamPelayanan, "HH:mm").format("HH");

                var i = 0;
                while (i < $scope.aturanKapalTunda.length) {
                    if (data.loa < $scope.aturanKapalTunda[i].panjangKapalMax && data.loa >= $scope.aturanKapalTunda[i].panjangKapalMin) {
                        data.jumlahTunda = $scope.aturanKapalTunda[i].jumlahKapalTunda;
                    }
                    i++;
                };

                var j = 0;
                while (j < $scope.parameterJenisGerakan.length) {
                    if (data.jenisGerakan == $scope.parameterJenisGerakan[j].value) {
                        data.jenisGerakanText = $scope.parameterJenisGerakan[j].caption;
                    }
                    j++;
                };

            });
            $timeout(function() {
                var k = 0;
                var window = [];
                var jumlahTundayangDibutuhkan = 0;

                while (k < $scope.items.length) {
                    if (k == 0) {
                        window.push(k);
                        jumlahTundayangDibutuhkan += $scope.items[k].jumlahTunda;
                    } else if ($scope.items[k].jam === $scope.items[k - 1].jam) {
                        window.push(k);
                        jumlahTundayangDibutuhkan += $scope.items[k].jumlahTunda;
                    } else {
                        window = [];
                        window.push(k);
                        jumlahTundayangDibutuhkan = 0;
                        jumlahTundayangDibutuhkan += $scope.items[k].jumlahTunda;
                    }
                    k++;

                    if (jumlahTundayangDibutuhkan > $scope.listKapalTundaStatusOn.length) {
                        window.forEach(function(element) {
                            $scope.items[element].isBusy = true;
                        })
                    } else {
                        window.forEach(function(element) {
                            $scope.items[element].isBusy = false;
                        })
                    }
                };
            }, 500);
        };

        $scope.setStatus = function(data){
            if(data == null){
                $scope.search.status = 'Available';
            } else {
                $scope.search.status = '';
            }
            $scope.statusSpk = data;
            $scope.loadData(0);
        };

        $scope.loadAntrian = function(tanggalPanduAwal, tanggalPanduAkhir,newPage) {
            LoadingScreen.show();
            $scope.items = [];
            $scope.monitoringData = [];
             // PAGING
             $scope.optionSizePage = {
                availableOptions: [10,20,40,80,160],
                selectedOption: 40 //default select option size
            };

            $scope.currentPage = 1;

            //$scope.pageSize = $scope.optionSizePage.selectedOption.number;
            $scope.totalItems = 0;
            $scope.totalPages = 0;
            $scope.sortBy = '';
            $scope.sortDesc = false;
            $scope.pagingText = '';

            if ($scope.namaDermaga.mdmgNama == 'undefined') {
                $scope.area = $scope.namaDermaga;
            } else {
                $scope.area = $scope.namaDermaga.mdmgNama;
            }

            MonitoringAntrianPanduTest.get({
                size: $scope.pageSize,
                page: newPage - 1,
                tglAwal: tanggalPanduAwal,
                tglAkhir: tanggalPanduAkhir,
                namaKapal: $filter('uppercase')($scope.namaKapal),
                statusSpk: $scope.statusSpk,
                lokasi: $scope.lokasi,
                namaDermagaAsal: $scope.area,
                namaDermagaTujuan: $scope.area,
                jenisGerakan : $scope.searchJenisGerakan,
                sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
            }, function(response) {
                 //added by Nurika: warning when timeout
                if (response.$status == -1 || response.$status == 504) {
                    var statusTimeout = confirm('Silahkan Refresh Ulang Laman Anda');
                    $scope.setNotification  = {
                      type  : 'statusTimeout'
                    };
                      Notification.setNotification($scope.setNotification);
                      LoadingScreen.hide();
                }
                //end timeout

                //added by cahyo for showing button filter when got response
                $scope.showLoader = true;

                $scope.monitoringData = response.content;
                $timeout(function() {
                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage-1)*response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.monitoringData= $scope.allItems;

                    $scope.monitoringData.forEach(function(data) {
                        data.jamPelayanan = moment(data.jamPelayanan, "HH:mm:ss").format("HH:mm");
                        data.tanggalPenetapan = moment(data.tglPenetapan, "YYYY-MM-DDTHH:mm:ss").format("DD-MM-YYYY");
                        if (data.status === null) {
                            data.status = 'Available';
                        } else if (data.status === 'OHN') {
                            data.status = 'Konfirmasi';
                        }
                        data.noPpk1Asal = data.noPpk1;
                        data.noPpkJasaPanduAsal = data.noPpkJasa;
                        $scope.items.push(data);
                        $scope.isBusy();
                    });
                    LoadingScreen.hide();
                }, 500);
            });
        };

        $scope.loadPerencanaan = function(tanggalPanduAwal, tanggalPanduAkhir,newPage) {
            var tanggalPanduAwal = moment($scope.tanggalPanduAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tanggalPanduAkhir = moment($scope.tanggalPanduAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');
            KawasanPanduLevelSatuList.get(function(response) {
                //$scope.lokasi = response[0].namaKawasan;
                $scope.loadAntrian(tanggalPanduAwal, tanggalPanduAkhir, newPage);
            });
        };

        $scope.loadData = function(newPage) {
            
            //change $scope.showLoader to false when button got pushed
            $scope.showLoader = false;

            $scope.loadPerencanaan($scope.tanggalPanduAwal, $scope.tanggalPanduAkhir,newPage);
        }

        //$scope.loadData(0);

        $scope.getDetailSpk = function(item){
            SuratPerintahKerjaPanduDetail.get({ id: item.idSuratPerintahKerjaPandu }, function(response) {
                $scope.dataSpk = response;
            });
        };

        $scope.showModalSpk = function(item) {
            $scope.spk = {};
            if(item.idSuratPerintahKerjaPandu!=null){
                $scope.getDetailSpk(item);
            }
            $scope.generateNumberSpk(item);
            $scope.modalSpk = item;
            $scope.spk.namaDermagaTujuan = item.namaPelabuhanTujuan;
            $scope.spk.namaDermagaAsal = item.namaPelabuhanAsal;
            $scope.spk.noPpkRpkro = item.noPpkRpkro;
            $scope.spk.noPpkJasa = item.noPpkJasa;
            $scope.spk.namaKapal = item.namaKapal;
            $scope.spk.noPpk1 = item.noPpk1;
            $scope.spk.namaPetugas = item.namaPetugas;
            $scope.spk.idPetugas = item.petugasId;
            $scope.spk.idSuratPerintahKerjaPandu = item.idSuratPerintahKerjaPandu;
            $scope.spk.jamPelayananPandu = moment(item.jamPelayanan, "HH:mm").format("HH:mm:ss");
            $scope.padisPandu = "";
            $scope.spk.kodeLokasiPanduTujuan = item.kodePelabuhanTujuan;
            $scope.spk.namaLokasiPanduTujuan = item.namaPelabuhanTujuan;
            $scope.spk.kodeLokasiPanduAsal = item.kodePelabuhanAsal;
            $scope.spk.namaLokasiPanduAsal = item.namaPelabuhanAsal;
            $scope.spk.tglPandu = item.tglPenetapan;
            $scope.loa = item.loa;

            if (item.jenisPandu == '2' || item.jenisGerakan == '3' || item.jenisDermagaPanduTujuan == 'DMGKHUSUS' || item.jenisDermagaPanduTujuan == 'AREALABUH' || $scope.validasiPpkRpkro == '0' || $scope.validasiPpkRpkro == '') {
                $("#spkModal").modal();
            } else {
                $scope.checkRpkro(item);
            }
            $("#spkModal").modal();
        };      

        $scope.generateNumberSpk = function(item) {
            $scope.tglMulaiTambatAsal = "";
            $scope.tglMulaiTambatTujuan = "";

            SuratPerintahKerjaNumberPpkJasaTambat.get({ noPpk1: item.noPpk1, noPpkJasa:item.noPpkJasa }, function (response) {
                $scope.spk.nomorSpk = response.nomorSpkPandu;
                $scope.spk.nomorSpkPandu = response.nomorSpkPandu;
                $scope.spk.namaLokasiTambatTujuan = response.namaLokasiTambatTujuan;
                $scope.spk.kodeLokasiTambatTujuan = response.kodeLokasiTambatTujuan; 
                $scope.spk.namaLokasiTambatAsal = response.namaLokasiTambatAsal;
                $scope.spk.kodeLokasiTambatAsal = response.kodeLokasiTambatAsal;
                $scope.spk.noPpkJasaTambatAsal = response.noPpkJasaTambatAsal;
                $scope.spk.noPpkJasaTambatTujuan = response.noPpkJasaTambatTujuan;

                $scope.tglMulaiTambatAsal = $filter('date')(response.tglMulaiTambatAsal,'dd-MM-yyyy HH:mm');
                $scope.tglMulaiTambatTujuan = $filter('date')(response.tglMulaiTambatTujuan, 'dd-MM-yyyy HH:mm');

            });
        }

        $scope.checkRpkro = function(item) {
            $http.get(API_PATH + 'surat_perintah_kerja_pandu/rpkro/' + item.noPpkJasa)
                .success(function(response) {
                    if (response) {
                        $("#spkModal").modal();
                    } else {
                        alert("Nomor PPK RPKRO tidak ditemukan");
                        $scope.setNotification = {
                            type: "warning", //ex : danger, warning, success, info
                            message: "Nomor PPK RPKRO tidak ditemukan. "
                        };
                        Notification.setNotification($scope.setNotification);
                    }
                });
        }

        $scope.saveSpk = function(item) {
            SuratPerintahKerjaPanduAdd.save({ kodeCabang: $scope.kodeCabang }, item, function(response) {
                if (response.status == 'SPK') {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };

                    Notification.setNotification($scope.setNotification);
                    $scope.inaportnetMessage = response.statusMessageInaportnet;
                    $timeout(function() {
                        $("#message").modal();
                    }, 1000);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan. " + response.errorMessage
                    };
                    Notification.setNotification($scope.setNotification);
                }
                $timeout(function() {
                    $scope.loadData(0);
                    $scope.spk = {};
                }, 100);
            });

        };

        $scope.saveMonitoring = function(item) {
            MonitoringPanduAdd.save(item, function(response) {
                if (response) {

                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            });
        };

        $scope.searchPanduByShift = function(item){
            if (item == 'undefined'){
                return false;
            } else {
                var cekJamMulai = moment().isAfter(item.jamMulaiPandu)
                var cekJamSelesai = moment().isSameOrBefore(item.jamSelesaiPandu)

                return (cekJamMulai && cekJamSelesai);
            }
        }

        $scope.loadPetugas = function() {
            MonitoringPetugasPandu.get({
                tglPandu: today,
                kodeCabang: localStorage.getItem("kodeTerminal")
            }, function(response) {
                $scope.petugas = [];
                $timeout(function () {
                    for (var i = 0; i < response.length; i++) {
                        if ($scope.searchPanduByShift(response[i].petugasPandu)) {
                            $scope.petugas.push({
                                kodePetugas: response[i].petugasPandu.kode,
                                petugasId: response[i].petugasPandu.id,
                                namaPetugas: response[i].petugasPandu.namaPetugas,
                                namaKawasan: response[i].petugasPandu.namaKawasan,
                                idKawasan: response[i].petugasPandu.idKawasan,
                                nipPandu: response[i].petugasPandu.nipPandu,
                                namaGroup: response[i].petugasPandu.groupName,
                                namaStatus: response[i].petugasPandu.namaPetugas + " / " + response[i].petugasPandu.kode + " (" + response[i].statusIdle + ") - " + response[i].petugasPandu.groupName
                            });
                        }
                    }
                }, 1000);
            });
        };

        $scope.loadPetugas();

        $interval(function() { $scope.loadPetugas(); }, 300000);

        $scope.setPandu = function(item) {
            if(item.petugasPandu != undefined){
                item.namaPetugas = item.petugasPandu.namaPetugas;
                item.idPetugas = item.petugasPandu.petugasId;
                item.kodePetugas = item.petugasPandu.kodePetugas;
                item.namaKawasan = item.petugasPandu.namaKawasan;
                item.idKawasan = item.petugasPandu.idKawasan;
                item.petugasId = item.petugasPandu.petugasId;
                item.nipPandu = item.petugasPandu.nipPandu;
                item.namaGroup = item.petugasPandu.namaGroup;
            }
        };

        $scope.itemSpk = function(item){
            $scope.spk.idPetugas = parseInt(item.idPetugas);
            $scope.spk.nipPandu = item.kodePetugas;
            $scope.spk.flagDone = item.flagDone == null ? 0 : item.flagDone;
            $scope.spk.idVisit = item.idVisit == null ? 0 : item.idVisit;
            $scope.spk.noPpk1 = item.noPpk1;
            $scope.spk.noPpkJasaPandu = item.noPpkJasa;
            $scope.spk.noPpk1Asal = item.noPpk1Asal;
            $scope.spk.noPpkJasaPanduAsal = item.noPpkJasaPanduAsal;
            $scope.spk.status = "SPK";
            $scope.spk.kapalTundaSpks = [];
            $scope.spk.kodeCabang = localStorage.getItem('kodeCabang');
            $scope.spk.kodeLokasiTambat = item.kodePelabuhanTujuan;
            $scope.spk.kodeLokasiTundaAsal = item.kodePelabuhanAsal;
            $scope.spk.kodeLokasiTundaTujuan = item.kodePelabuhanTujuan;
            $scope.spk.namaLokasiTambat = item.namaPelabuhanTujuan;
            $scope.spk.namaLokasiTundaAsal = item.namaPelabuhanAsal;
            $scope.spk.namaLokasiTundaTujuan = item.namaPelabuhanTujuan;
            $scope.spk.loa = 0;
            $scope.spk.kodeAgen = item.kodeAgen;
            $scope.spk.namaAgen = item.namaAgen;
            $scope.spk.kodeKapal = item.kodeKapal;
            $scope.spk.namaKapal = item.namaKapal;
            $scope.spk.jenisGerakan = item.jenisGerakanText;

            if(typeof item.namaDermagaAsal == 'object'){
                $scope.spk.kodeLokasiPanduAsal = item.namaDermagaAsal.mdmgKode;
                $scope.spk.namaLokasiPanduAsal = item.namaDermagaAsal.mdmgNama;
            }

            if(typeof item.namaDermagaTujuan == 'object'){
                $scope.spk.kodeLokasiPanduTujuan = item.namaDermagaTujuan.mdmgKode;
                $scope.spk.namaLokasiPanduTujuan = item.namaDermagaTujuan.mdmgNama;
            }

            if (typeof item.namaLokasiTambatTujuan == 'object' && item.namaLokasiTambatTujuan != null) {
                $scope.spk.kodeLokasiTambatTujuan = item.namaLokasiTambatTujuan.mdmgKode;
                $scope.spk.namaLokasiTambatTujuan = item.namaLokasiTambatTujuan.mdmgNama;
            }

            if (typeof item.namaLokasiTambatAsal == 'object' && item.namaLokasiTambatAsal != null) {
                $scope.spk.kodeLokasiTambatAsal = item.namaLokasiTambatAsal.mdmgKode;
                $scope.spk.namaLokasiTambatAsal = item.namaLokasiTambatAsal.mdmgNama;
            }

        };

        $scope.itemMonitoring = function(item) {
            $scope.monitoring.jamPelayanan = item.jamPelayanan;
            $scope.monitoring.kodeAgen = item.kodeAgen;
            $scope.monitoring.kodeCabang = item.kodeCabang;
            $scope.monitoring.kodePelabuhanAsal = item.kodePelabuhanAsal;
            $scope.monitoring.kodePelabuhanTujuan = item.kodePelabuhanTujuan;
            $scope.monitoring.kodePetugas = item.kodePetugas;
            $scope.monitoring.namaAgen = item.namaAgen;
            $scope.monitoring.namaKapal = item.namaKapal;
            $scope.monitoring.noPpk1 = item.noPpk1;
            $scope.monitoring.noPpkJasa = item.noPpkJasa;
            $scope.monitoring.noPpk1Asal = item.noPpk1Asal;
            $scope.monitoring.noPpkJasaPanduAsal = item.noPpkJasaPanduAsal;
            $scope.monitoring.idPetugas = parseInt(item.petugasId);
            $scope.monitoring.kodeKapal = item.kodeKapal;
            $scope.monitoring.lokasi = item.lokasi;
            $scope.monitoring.negaraKapal = item.negaraKapal;
        };

        $scope.createSpk = function(item) {
            if(item.noPpkRpkro == undefined){item.noPpkRpkro = ""};
            if ($scope.modalSpk.jenisPandu == '2' || $scope.modalSpk.jenisGerakan == '3' || $scope.modalSpk.jenisDermagaPanduTujuan == 'DMGKHUSUS' || $scope.modalSpk.jenisDermagaPanduTujuan == 'AREALABUH' || $scope.validasiPpkRpkro == '0' || $scope.validasiPpkRpkro == '')  {
                $scope.postSpk(item);
            } else if (item.noPpkRpkro.length < 15) {
                $scope.setNotification = {
                    type: "warning", //ex : danger, warning, success, info
                    message: "No PPK RPKRO harus diisi dengan benar"
                };
                Notification.setNotification($scope.setNotification);
            } else {
                $scope.postSpk(item);
            }
        };

        $scope.postSpk = function(item){
            $scope.itemMonitoring(item);
            $scope.itemSpk(item);
            $scope.saveSpk($scope.spk);
            $scope.items = [];
        };

        $scope.kirimUlangSpk = function(item) {
            $scope.itemMonitoring(item);
            $scope.itemSpk(item);
            $scope.resendSpk($scope.spk);
            $scope.items = [];
        };

        $scope.resendSpk = function (item) {
            SuratPerintahKerjaPanduResend.save({ kodeCabang: $scope.kodeCabang }, item, function (response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };

                    Notification.setNotification($scope.setNotification);
                    $scope.inaportnetMessage = response.statusMessageInaportnet;
                    $timeout(function () {
                        $("#message").modal();
                    }, 1000);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan. " + response.errorMessage
                    };
                    Notification.setNotification($scope.setNotification);
                }
                $timeout(function () {
                    $scope.loadData(0);
                    $scope.spk = {};
                }, 100);
            });
        };

        $scope.resendPilotCar = function (dataOhn) {
            PilotShuttleCarResend.save({ nomorSpkPandu: $scope.dataOhn.nomorSpkPandu }, dataOhn, function (response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };

                    Notification.setNotification($scope.setNotification);
                    $timeout(function () {
                        $("#message").modal();
                    }, 1000);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan. " + response.errorMessage
                    };
                    Notification.setNotification($scope.setNotification);
                }
                $timeout(function () {
                    $scope.loadData(0);
                }, 100);
            });
        };

        $scope.resendPilotBoat = function (dataOhn) {
            PilotBoatResend.save({ nomorSpkPandu: $scope.dataOhn.nomorSpkPandu }, dataOhn, function (response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };

                    Notification.setNotification($scope.setNotification);
                    $timeout(function () {
                        $("#message").modal();
                    }, 1000);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan. " + response.errorMessage
                    };
                    Notification.setNotification($scope.setNotification);
                }
                $timeout(function () {
                    $scope.loadData(0);
                }, 100);
            });
        };

        $scope.getSpkTunda = function(num, noPpkJasa) {
            $scope.arrayOfIdSpkTunda = [];
            SpkTundaNumber.get({ nomorSpk: num }, function(response) {
                var i = 0;
                while (i < response.length) {
                    response[i].noPpkJasaPandu === noPpkJasa ? $scope.arrayOfIdSpkTunda.push(response[i].id) : null;
                    i++;
                }
            });
        };

        $scope.arrangeKapalTunda = function(item) {
            item.kapalTundaSpks.forEach(function(element) {
                var i = 0;

                element.pmhTunda = {};
                if ($scope.arrayOfIdSpkTunda[i]) {
                    element.idSpk = $scope.arrayOfIdSpkTunda[i];
                } else {
                    element.idSpk = 0;
                }

                element.pmhTunda.detailPmhId = 0;
                element.pmhTunda.kodeLokasiAsal = item.kodeLokasiPanduAsal;
                element.pmhTunda.kodeLokasiTujuan = item.kodeLokasiPanduTujuan;
                element.pmhTunda.nama = item.namaKapal;
                element.pmhTunda.namaLokasiAsal = item.namaLokasiPanduAsal;
                element.pmhTunda.namaLokasiTujuan = item.namaLokasiPanduTujuan;
                element.pmhTunda.nilaiEpb = 0;
                element.pmhTunda.noPpk1 = item.noPpk1;
                element.pmhTunda.status = 0;
                element.pmhTunda.statusPelaksanaan = 0;
                element.pmhTunda.statusRevisi = 0;
                element.pmhTunda.tundaEkstra = 0;
                element.pmhTunda.urutanPermohonan = i + 1;
                i++;
            });
        };

        $scope.$watch('dataOhn.kapalTundaSpks', function(newValue) {
            if (newValue) {
                if (newValue.length !== $scope.arrayOfIdSpkTunda.length) {
                    $scope.kapalTundaKurang = true;
                } else {
                    $scope.kapalTundaKurang = false;
                }
            }
        });

        $scope.editSPK = function(idSuratPerintahKerjaPandu, ohn) {
            SuratPerintahKerjaPanduEdit.update({ id: idSuratPerintahKerjaPandu, kodeCabang: $scope.kodeCabang }, ohn, function(response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $timeout(function() {
                        $scope.loadData(0);
                    }, 100);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $timeout(function() {
                        $scope.loadData(0);
                    }, 100);
                }
            });
        };

        $scope.createSpkTambat = function(ohn) {
            SuratPerintahKerjaTambatAdd.update({ nomorSpk: ohn.nomorSpk }, ohn, function(response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            });
        };

        $scope.formatDate = function(stringDate) {
            return stringDate[6]+stringDate[7]+stringDate[8]+stringDate[9]+stringDate[5]+stringDate[3]+stringDate[4]+stringDate[2]+stringDate[0]+stringDate[1];
        }

        $scope.cekKesediaanAbsensiPandu = function(ohn){
            //console.log(ohn);
            ohn.tanggalPandu = $scope.formatDate(ohn.tanggalPandu);
            CekKesediaanAbsensiPandu.get({
                nip : ohn.nipPandu,
                tanggal : ohn.tanggalPandu 
            }, function(response){
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            });
        }

        $scope.createOhn = function(item) {
            $scope.dataOhn.status = "OHN";
            $scope.spkTambat = $scope.dataOhn;
            $scope.dataOhn.tglPandu = $filter('date')(tanggalPandu, "yyyy-MM-ddT00:00:00");
            $scope.saveMonitoring($scope.monitoring);
            $scope.arrangeKapalTunda($scope.dataOhn);
            $scope.cekKesediaanAbsensiPandu($scope.dataOhn);
            //isi shuttle car and boat
            //comment by Nurika
            // $scope.shuttleCar.idPetugas = $scope.dataOhn.idPetugas;
            // $scope.shuttleCar.namaPandu = $scope.dataOhn.namaPegawaiPandu;
            // $scope.shuttleCar.nomorSpk = $scope.dataOhn.nomorSpk;
            // $scope.shuttleCar.nomorSpkPandu = $scope.dataOhn.nomorSpkPandu;
            // $scope.shuttleCar.platNomor = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.platNomor : null;
            // $scope.shuttleCar.jenisMobil = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.jenisMobil : null;
            // $scope.shuttleCar.warnaMobil = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.warna : null;
            // $scope.shuttleCar.asal = $scope.infoPilot.asalCar;
            // $scope.shuttleCar.tujuan = $scope.infoPilot.tujuanCar;
            // $scope.shuttleCar.jamPengantaran = $scope.infoPilot.jamAntarPilotCar;
            // $scope.shuttleCar.jamPelayananPandu = $scope.dataOhn.jamPelayananPandu;
            // $scope.shuttleCar.selesai = false;
            // $scope.shuttleCar.batal = false;
            // $scope.shuttleCar.diterima = false;

            // $scope.shuttleBoat.idPetugas = $scope.dataOhn.idPetugas;
            // $scope.shuttleBoat.namaPandu = $scope.dataOhn.namaPegawaiPandu;
            // $scope.shuttleBoat.nomorSpk = $scope.dataOhn.nomorSpk;
            // $scope.shuttleBoat.nomorSpkPandu = $scope.dataOhn.nomorSpkPandu;
            // $scope.shuttleBoat.kodeKapal = $scope.infoPilot.kodeBoat != undefined ? $scope.infoPilot.kodeBoat.kodeKapal : null;
            // $scope.shuttleBoat.namaKapal = $scope.infoPilot.kodeBoat != undefined ? $scope.infoPilot.kodeBoat.namaKapal : null;
            // $scope.shuttleBoat.asal = $scope.infoPilot.asalBoat;
            // $scope.shuttleBoat.tujuan = $scope.infoPilot.tujuanBoat;
            // $scope.shuttleBoat.jamPengantaran = $scope.infoPilot.jamAntarPilotBoat;
            // $scope.shuttleBoat.jamPelayananPandu = $scope.dataOhn.jamPelayananPandu;
            // $scope.shuttleBoat.selesai = false;
            // $scope.shuttleBoat.batal = false;
            // $scope.shuttleBoat.diterima = false;

            // $scope.savePilotShuttleCarAndBoat($scope.shuttleCar, $scope.shuttleBoat);
            $timeout(function() {
                $scope.editSPK($scope.dataOhn.id, $scope.dataOhn);
                $scope.createSpkTambat($scope.dataOhn);
            }, 500);
        };

        $scope.createSpkPilot = function(item){
            $scope.cekKesediaanAbsensiPandu($scope.dataOhn);
             //isi shuttle car and boat
            $scope.shuttleCar.idPetugas = $scope.dataOhn.idPetugas;
            $scope.shuttleCar.namaPandu = $scope.dataOhn.namaPegawaiPandu;
            $scope.shuttleCar.nomorSpk = $scope.dataOhn.nomorSpk;
            $scope.shuttleCar.nomorSpkPandu = $scope.dataOhn.nomorSpkPandu;
            $scope.shuttleCar.platNomor = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.platNomor : null;
            $scope.shuttleCar.jenisMobil = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.jenisMobil : null;
            $scope.shuttleCar.warnaMobil = $scope.infoPilot.noPlatShuttleCar != undefined ? $scope.infoPilot.noPlatShuttleCar.warna : null;
            $scope.shuttleCar.asal = $scope.infoPilot.asalCar;
            $scope.shuttleCar.tujuan = $scope.infoPilot.tujuanCar;
            $scope.shuttleCar.jamPengantaran = $scope.infoPilot.jamAntarPilotCar;
            $scope.shuttleCar.jamPelayananPandu = $scope.dataOhn.jamPelayananPandu;
            $scope.shuttleCar.selesai = false;
            $scope.shuttleCar.batal = false;
            $scope.shuttleCar.diterima = false;

            $scope.shuttleBoat.idPetugas = $scope.dataOhn.idPetugas;
            $scope.shuttleBoat.namaPandu = $scope.dataOhn.namaPegawaiPandu;
            $scope.shuttleBoat.nomorSpk = $scope.dataOhn.nomorSpk;
            $scope.shuttleBoat.nomorSpkPandu = $scope.dataOhn.nomorSpkPandu;
            $scope.shuttleBoat.kodeKapal = $scope.infoPilot.kodeBoat != undefined ? $scope.infoPilot.kodeBoat.kodeKapal : null;
            $scope.shuttleBoat.namaKapal = $scope.infoPilot.kodeBoat != undefined ? $scope.infoPilot.kodeBoat.namaKapal : null;
            $scope.shuttleBoat.asal = $scope.infoPilot.asalBoat;
            $scope.shuttleBoat.tujuan = $scope.infoPilot.tujuanBoat;
            $scope.shuttleBoat.jamPengantaran = $scope.infoPilot.jamAntarPilotBoat;
            $scope.shuttleBoat.jamPelayananPandu = $scope.dataOhn.jamPelayananPandu;
            $scope.shuttleBoat.selesai = false;
            $scope.shuttleBoat.batal = false;
            $scope.shuttleBoat.diterima = false;

            $scope.savePilotShuttleCarAndBoat($scope.shuttleCar, $scope.shuttleBoat);
        }

        $scope.savePilotShuttleCarAndBoat = function(shuttleCarItem, boatItem) {
            if (shuttleCarItem.platNomor != null) {
                 PilotShuttleCarAdd.save(shuttleCarItem, function(response) {
                if (response) {
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
                $scope.infoPilot = {};
            });

            }
           
            if (boatItem.kodeKapal != null) {
                PilotBoatAdd.save(boatItem, function(response) {
                if (response) {
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }

                $scope.infoPilot = {};
            });

            }
        };

        $scope.editSPKStatus = function (idSuratPerintahKerjaPandu, ohn) {
            SuratPerintahKerjaPanduEditStatus.update({ id: idSuratPerintahKerjaPandu, kodeCabang: $scope.kodeCabang }, ohn, function (response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $timeout(function () {
                        $scope.loadData(0);
                    }, 100);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $timeout(function () {
                        $scope.loadData(0);
                    }, 100);
                }
            });
        };

        $scope.cancelOhn = function(item){
            RealisasiPanduDetailbyPpkJasa.get({noPpkJasa: item.noPpkJasa}, function(response){
                if(response.status == "404"){
                    $scope.dataOhn = {};
                    $scope.getDetailOhn(item);
                    var confirmDelete = confirm('Apakah anda ingin membatalkan konfirmasi?');
                    if(confirmDelete){
                        $timeout(function() {
                            $scope.dataOhn.status = "SPK";
                            $scope.dataOhn.tglPandu = $filter('date')(tanggalPandu, "yyyy-MM-ddT00:00:00");
                            $scope.editSPKStatus($scope.dataOhn.id, $scope.dataOhn);
                        }, 3000);
                    }
                } else {
                    $scope.setNotification  = {
                        type	: "warning",
                        message	: "Data tidak dapat dihapus, jasa pandu sudah realisasi"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            })
        };

        $scope.cancelSpkPilot = function(item){

            //pertama tama dapatkan nomor spk yg bener kita tampung di variabel baru namanya $scope.nomorSpkPanduBener

            //buat variable barunya dulu di initialisasii string kosong aja dulu
            $scope.nomorSpkPanduBener = "";

            //abis itu kita panggil api pakai service atau $http disini mau dicoba pakai http biar mudah pakai promisenya
            $http.get(API_PATH + 'surat_perintah_kerja_pandu/' + item.idSuratPerintahKerjaPandu)
	                .then(function (response) {
	                    if (response) {
                            //isi nomor spk pandu ke variable yang kita buat tadi
                            $scope.nomorSpkPanduBener = response.data.nomorSpkPandu;

                            //lakukan pembatalan mobile pilot disini .. karena harus menunggu nomorspk pandu benernya selesai di load

                            PilotBoatBatal.update({nomorSpkPandu: $scope.nomorSpkPanduBener},{nomorSpkPandu: $scope.nomorSpkPanduBener}, function(response){
                                if(response.status == "404"){
                                    $scope.dataOhn = {};
                                    $scope.getDetailOhn(item);
                                    var confirmDelete = confirm('Apakah anda ingin membatalkan konfirmasi SPK Pilot Mobile?');
                                    if(confirmDelete){
                                        $timeout(function() {
                                            //$scope.dataOhn.status = "SPK";
                                            // $scope.dataOhn.tglPandu = $filter('date')(tanggalPandu, "yyyy-MM-ddT00:00:00");
                                            // $scope.editSPKStatus($scope.dataOhn.id, $scope.dataOhn);
                                        });
                                    }
                                } else {
                                    $scope.setNotification  = {
                                        type    : "success",
                                        message : "SPK Pilot Mobile Sudah Dibatalkan"
                                    };
                                    Notification.setNotification($scope.setNotification);
                                }
                            });


                            PilotShuttleCarBatal.update({nomorSpkPandu: $scope.nomorSpkPanduBener},{nomorSpkPandu: $scope.nomorSpkPanduBener}, function(response){
                                if(response.status == "404"){
                                    $scope.dataOhn = {};
                                    $scope.getDetailOhn(item);
                                    var confirmDelete = confirm('Apakah anda ingin membatalkan konfirmasi SPK Pilot Mobile?');
                                    if(confirmDelete){
                                        $timeout(function() {
                                           // $scope.dataOhn.status = "SPK";
                                            // $scope.dataOhn.tglPandu = $filter('date')(tanggalPandu, "yyyy-MM-ddT00:00:00");
                                            // $scope.editSPKStatus($scope.dataOhn.id, $scope.dataOhn);
                                        }, 3000);
                                    }
                                } else {
                                    $scope.setNotification  = {
                                        type    : "success",
                                        message : "SPK Pilot Mobile Sudah Dibatalkan"
                                    };
                                    Notification.setNotification($scope.setNotification);
                                }
                            });
	                    }
	                });            
        };


        $scope.checkSpog = function (item) {
            if ($scope.entryInaportnet == '1') {
                SpogNumber.get({ noSpk: item.nomorSpkPandu }, function (response) {
                    if (!response.nomorSPOG) {
                        $window.alert("Nomor SPOG belum tersedia");
                    } else {
                        $scope.dataOhn.nomorSPOG = response.nomorSPOG;
                    }
                });
            } else {
                $scope.dataOhn.nomorSPOG = "Not Available";
            }
        }

        $scope.checkSpb = function (item) {
            if ($scope.entryInaportnet == '1') {
                SpbInaportnet.get({ noPpk1: item.noPpk1 }, function (response) {
                    $scope.dataOhn.nomorSPOG = response[0].nomorSpb;
                });
            } else {
                $scope.dataOhn.nomorSPOG = "Not Available";
            }
        }

        $scope.getDetailOhn = function (item) {
            SuratPerintahKerjaPanduDetail.get({ id: item.idSuratPerintahKerjaPandu }, function (response) {
                if (response.jenisGerakan == '3') {
                    $scope.checkSpb(item);  
                } else if (response.jenisGerakan == '2') {
                    $scope.checkSpog(item);
                    $scope.spogMandatory = true;
                } else {
                    $scope.spogMandatory = false;
                }
                
                $scope.getSpkTunda(response.nomorSpk, item.noPpkJasa);
                $scope.dataOhn = response;
                $scope.dataOhn.idPetugas = parseInt(item.petugasId);
                $scope.dataOhn.nipPandu = item.kodePetugas;
                $scope.dataOhn.namaPegawaiPandu = item.namaPetugas;
                $scope.dataOhn.jumlahTunda = item.jumlahTunda;
                $scope.dataOhn.jamPelayananPandu = moment(item.jamPelayanan, "HH:mm").format("HH:mm:ss");
                $scope.dataOhn.tanggalPandu = moment(response.tglPandu).format("DD-MM-YYYY");
                $scope.tglMulaiTambatAsal = $filter('date')(response.tglMulaiTambatAsal, 'dd-MM-yyyy HH:mm');
                $scope.tglMulaiTambatTujuan = $filter('date')(response.tglMulaiTambatTujuan, 'dd-MM-yyyy HH:mm');

            });
        }

        $scope.showModalOhn = function(item) {
            $scope.dataOhn = {};
            $scope.getDetailOhn(item);
            $scope.itemMonitoring(item);
        };

        $scope.showSpkPilotMobile = function(item){
            $scope.dataOhn = {};
            $scope.getDetailOhn(item);
        }

        $scope.showModalPenetapanPandu = function(item) {
            $scope.dataPermohonan = item;

            $scope.dataPermohonan.namaDermagaAsal = item.namaPelabuhanAsal;
            $scope.dataPermohonan.namaDermagaTujuan = item.namaPelabuhanTujuan;
            
            if(item.namaPetugas != null){
                $scope.dataPermohonan.petugasPandu = item.namaPetugas;
                $scope.penetapanPandu.namaPandu = item.namaPetugas;
                $scope.penetapanPandu.nipPandu = item.nipPandu;
            }
        };

        $scope.$watch('dataPermohonan.namaDermagaTujuan', function(newValue) {
            if($scope.dataPermohonan != undefined){
                if($scope.dataPermohonan.jenisDermagaPanduTujuan == 'DMGUMUM' && $scope.dataPermohonan.dermagaTambat !== null){
                    if(typeof newValue == 'object'){
                        newValue.mdmgNama == $scope.dataPermohonan.dermagaTambat ? $scope.showErrorTujuan = false : $scope.showErrorTujuan = true;
                    } else {
                        newValue == $scope.dataPermohonan.dermagaTambat ? $scope.showErrorTujuan = false : $scope.showErrorTujuan = true;
                    }
                }
            }
        });

        $scope.hapusPpkJasaPandu = function(item){
            if(item.isPenetapan){
                $scope.showModalVALOTH018(item);
            } else {
                var kelasTextkDelete = confirm('Apakah anda ingin menghapus data?');
                if(kelasTextkDelete){
                    $scope.deleteJasaPandu(item.noPpkJasa);
                }
            }
        }
        
        $scope.setSPOGAvailable = function () {
            $scope.inputManualSPOG = true;
            BindEskalasi.setDefaultEskalasi();
        }

        $scope.deleteJasaPandu = function(noPpkJasa){
            PerencanaanPanduDelete.delete({noPpkJasaPandu:noPpkJasa},function(response){
                if(response.$resolved){
                    $scope.setNotification  = {
                        type	: "success",
                        message	: "Data berhasil dihapus"
                    };
                }else{
                    $scope.setNotification  = {
                        type	: "warning",
                        message	: "Data tidak berhasil dihapus"
                    };
                }
                Notification.setNotification($scope.setNotification);
                BindEskalasi.setDefaultEskalasi();
                $scope.loadData(0);
            });
        }

        $scope.showModalPindahPandu = function(item) {
            $scope.dataPandu = item;
        };

        $scope.submitPenetapanPandu = function(item) {
          
            if(item.noPpkJasaRevisi == null){
                $scope.penetapanPandu.noPpkJasa = item.noPpkJasa;
            } else {
                $scope.penetapanPandu.noPpkJasa = item.noPpkJasaRevisi;
            }
            $scope.penetapanPandu.tglMulai = moment(item.tanggalPenetapan, "DD-MM-YYYY").format("YYYY-MM-DDT") + item.jamPelayanan + ":00";
            $scope.penetapanPandu.jamSetuju = $filter('date')(new Date(), "HH:mm")

            $scope.penetapanPandu.noPpk1 = item.noPpk1;
            $scope.penetapanPandu.jenisGerakan = item.jenisGerakan;
            $scope.penetapanPandu.jenisPandu = item.jenisPandu;

            if(typeof item.namaDermagaAsal == 'object'){
                $scope.penetapanPandu.kodeLokasiAsal = item.namaDermagaAsal.mdmgKode;
                $scope.penetapanPandu.namaLokasiAsal = item.namaDermagaAsal.mdmgNama;
            } else {
                $scope.penetapanPandu.kodeLokasiAsal = item.kodePelabuhanAsal;
                $scope.penetapanPandu.namaLokasiAsal = item.namaPelabuhanAsal;
            }

            if(typeof item.namaDermagaTujuan == 'object'){
                $scope.penetapanPandu.kodeLokasiTujuan = item.namaDermagaTujuan.mdmgKode;
                $scope.penetapanPandu.namaLokasiTujuan = item.namaDermagaTujuan.mdmgNama;
            } else {
                $scope.penetapanPandu.kodeLokasiTujuan = item.kodePelabuhanTujuan;
                $scope.penetapanPandu.namaLokasiTujuan = item.namaPelabuhanTujuan;
            }

            if(typeof item.petugasPandu == 'object'){
                $scope.penetapanPandu.namaPandu = item.petugasPandu.namaPetugas;
                $scope.penetapanPandu.nipPandu = item.petugasPandu.nipPandu;
            } else {
                $scope.penetapanPandu.namaPandu = item.namaPetugas;
                $scope.penetapanPandu.nipPandu = item.nipPandu;
            }

            if (item.isPenetapan) {
                $scope.penetapanEdit($scope.penetapanPandu);
            } else {
                $scope.penetapanBaru($scope.penetapanPandu);
            }
            $scope.isBusy();
            $location.path("/manajemenpandu/perencanaan");
        };

        $scope.getDaftarDermaga = function(value) {
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

        /* validasi autocomplete */
        var valueField = '';
        $scope.checkValue = function(value){
            valueField = value;
            // $scope.isDisabledPandu = true;
            // console.log($scope.isDisabledPandu);
        }

        $scope.checkValuePandu = function(value){
            valueField = value;
            $scope.isDisabledPandu = true;
        }

        $scope.validationLookup = function(item){
            if(valueField !== item){
                if(typeof item != 'object'){
                    $scope.setNotification  = {
                        type  : 'warning',
                        message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
                    };
                Notification.setNotification($scope.setNotification);

                return item = '';

                }
                $scope.isDisabledPandu = false;
            }
        }
        
        /*validasi autocomplete*/


        $scope.penetapanBaru = function(item) {
            PenetapanPandu.save(item,
                function(response) {
                    if (response.id) {
                        var note = {
                            type: "success",
                            message: "Data berhasil tersimpan"
                        };
                        Notification.setNotification(note);
                    } else {
                        var note = {
                            type: "danger",
                            message: "Data gagal disimpan"
                        };
                        Notification.setNotification(note);
                    }
                },
                function(response) {
                    var note = {
                        type: "danger",
                        message: "Data gagal disimpan"
                    };
                    Notification.setNotification(note);
                }
            );
            $scope.loadData(0);
        };

        $scope.penetapanEdit = function(item) {
            PenetapanPanduEdit.update({ id: item.noPpkJasa }, item,
                function(response) {
                    if (response.id) {
                        var note = {
                            type: "success",
                            message: "Data berhasil tersimpan"
                        };
                        Notification.setNotification(note);
                    } else {
                        var note = {
                            type: "danger",
                            message: "Data gagal disimpan"
                        };
                        Notification.setNotification(note);
                    }
                    $scope.loadData(0);
                },
                function(response) {
                    var note = {
                        type: "danger",
                        message: "Data gagal disimpan"
                    };
                    Notification.setNotification(note);
                }
            );
        }

        $scope.changeJenisGerakan = function(dataPermohonan){
            if (typeof dataPermohonan.namaDermagaAsal=== 'object') {
                $scope.aturanGerakByLokasiAsal.kode = dataPermohonan.namaDermagaAsal.mdmgKode;
                $scope.aturanGerakByLokasiAsal.nama = dataPermohonan.namaDermagaAsal.mdmgNama;
            }else{
                $scope.aturanGerakByLokasiAsal.kode = dataPermohonan.kodePelabuhanAsal;
                $scope.aturanGerakByLokasiAsal.nama = dataPermohonan.namaPelabuhanAsal;
            }

            if (typeof dataPermohonan.namaDermagaTujuan === 'object') {
                $scope.aturanGerakByLokasiTujuan.kode = dataPermohonan.namaDermagaTujuan.mdmgKode;
                $scope.aturanGerakByLokasiTujuan.nama = dataPermohonan.namaDermagaTujuan.mdmgNama;
            }else{
                $scope.aturanGerakByLokasiTujuan.kode = dataPermohonan.kodePelabuhanTujuan;
                $scope.aturanGerakByLokasiTujuan.nama = dataPermohonan.namaPelabuhanTujuan;
            }

            if(dataPermohonan.namaDermagaAsal || dataPermohonan.namaDermagaTujuan){
                AturanGerakPanduList.get({
                    kodeLokasi 	: $scope.aturanGerakByLokasiAsal.kode,
                    namaLokasi 	: $scope.aturanGerakByLokasiAsal.nama,
                    flagAktif 	: 1
                }, function(response) {
                    $scope.lokasiAsalGerakPandu = response.content;
                    setJenisGerakan();
                });
                AturanGerakPanduList.get({
                    kodeLokasi 	: $scope.aturanGerakByLokasiTujuan.kode,
                    namaLokasi 	: $scope.aturanGerakByLokasiTujuan.nama,
                    flagAktif 	: 1
                }, function(response) {
                    $scope.lokasiTujuanGerakPandu = response.content;
                    setJenisGerakan();
                });
            }
        }

        var setJenisGerakan = function() {
            if($scope.lokasiAsalGerakPandu.length>0 && ($scope.lokasiTujuanGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
                $scope.dataPermohonan.jenisGerakan = '1'; // MASUK
            }else if($scope.lokasiTujuanGerakPandu.length>0 && ($scope.lokasiAsalGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
                $scope.dataPermohonan.jenisGerakan = '3'; // KELUAR
            }else{
                $scope.dataPermohonan.jenisGerakan = '2'; // PINDAH
            }
        };

        $scope.$watch('search.lokasi', function(newValue){
            if(typeof newValue == 'string'){
                $scope.petugas = $scope.petugas.filter(function (pandu) {
                    return (pandu.namaKawasan == newValue);
                });
            }
        });

        $rootScope.$on('subscribePermohonanPandu', function(event, data) {
            $scope.loadData(0);
            $scope.setNotification = {
                type: "success", //ex : danger, warning, success, info
                message: "Data permohonan pandu diperbarui"
            };
            Notification.setNotification($scope.setNotification);
        });

        $scope.swapUp = function(item, index) {
            var otherItemPos = 0;
            if (index >= 1) {
                while (otherItemPos < index) {
                    otherItemPos++;
                    if (item[index - otherItemPos].status === 'Available') {
                        break;
                    }
                }
                var tempNamaPetugas = item[index].namaPetugas;
                var tempIdPetugas = item[index].petugasId;
                var tempKodePetugas = item[index].kodePetugas;
                var tempNamaKawasan = item[index].namaKawasan;
                var tempIdKawasan = item[index].idKawasan;
                var tempNipPandu = item[index].nipPandu;

                item[index].namaPetugas = item[index - otherItemPos].namaPetugas;
                item[index].petugasId = item[index - otherItemPos].petugasId;
                item[index].kodePetugas = item[index - otherItemPos].kodePetugas;
                item[index].namaKawasan = item[index - otherItemPos].namaKawasan;
                item[index].idKawasan = item[index - otherItemPos].idKawasan;
                item[index].nipPandu = item[index - otherItemPos].nipPandu;

                item[index - otherItemPos].namaPetugas = tempNamaPetugas;
                item[index - otherItemPos].petugasId = tempIdPetugas;
                item[index - otherItemPos].kodePetugas = tempKodePetugas;
                item[index - otherItemPos].namaKawasan = tempNamaKawasan;
                item[index - otherItemPos].idKawasan = tempIdKawasan;
                item[index - otherItemPos].nipPandu = tempNipPandu;
            }
        };

        $scope.swapDown = function(item, index) {
            var otherItemPos = 1;
            if (index < $scope.items.length - 1) {
                while (otherItemPos < $scope.items.length - index) {
                    if (item[index + otherItemPos].status === 'Available') {
                        break;
                    }
                    otherItemPos++;
                }
                if (otherItemPos !== $scope.items.length - index) {
                    var tempNamaPetugas = item[index].namaPetugas;
                    var tempIdPetugas = item[index].petugasId;
                    var tempKodePetugas = item[index].kodePetugas;
                    var tempNamaKawasan = item[index].namaKawasan;
                    var tempIdKawasan = item[index].idKawasan;
                    var tempNipPandu = item[index].nipPandu;

                    item[index].namaPetugas = item[index + otherItemPos].namaPetugas;
                    item[index].petugasId = item[index + otherItemPos].petugasId;
                    item[index].kodePetugas = item[index + otherItemPos].kodePetugas;
                    item[index].namaKawasan = item[index + otherItemPos].namaKawasan;
                    item[index].idKawasan = item[index + otherItemPos].idKawasan;
                    item[index].nipPandu = item[index + otherItemPos].nipPandu;


                    item[index + otherItemPos].namaPetugas = tempNamaPetugas;
                    item[index + otherItemPos].petugasId = tempIdPetugas;
                    item[index + otherItemPos].kodePetugas = tempKodePetugas;
                    item[index + otherItemPos].namaKawasan = tempNamaKawasan;
                    item[index + otherItemPos].idKawasan = tempIdKawasan
                    item[index + otherItemPos].nipPandu = tempNipPandu;
                }
            }
        };

        $scope.showToolTip = function() {
            $scope.keterangan = "Informasi No. PPK RPKRO bisa dilihat di Laporan Lineup Kapal, kolom Status PPK";
        };

        $scope.cancelSpk = function(item) {
            $scope.dataSpk.status = null;
            SuratPerintahKerjaPanduDelete.delete({ id: item.idSuratPerintahKerjaPandu },function(response) {
                if (response.$resolved) {
                    $scope.setNotification = {
                        type: "success",
                        message: "Data berhasil dihapus"
                    };
                    $scope.loadData(0);
                } else {
                    $scope.setNotification = {
                        type: "warning",
                        message: "Data tidak berhasil dihapus"
                    };
                }
                Notification.setNotification($scope.setNotification);
            });
        };

        $scope.gantiPandu = function(item){
            $scope.setPandu(item);
            $scope.cancelSpk(item)
            $timeout(function() {
                $scope.createSpk(item);
            },2000);
        };

        $scope.openJadwalPandu = function() {
            $location.path('/manajemenpandu/jadwalpandu');
        };

        $scope.getTipeEskalasi = function(){
            TipeEskalasiList.get({size : 999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
                TipeEskalasi.setTipeEskalasi(response.content);
            });
        };

        $scope.getTipeEskalasi();

        $scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
            if(dataEsc.valCode==='VALOTH018'){
                var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
                if(hasEsc) $scope.deleteJasaPandu(item.noPpkJasa);
            }
        });

        $scope.showModalVALOTH018 = function(item){
            var
                itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH018'),
                hasEsc = BindEskalasi.hasTempEskalasi('VALOTH018'),
                statusEskalasi = itemEskalasi.id!==undefined?true:false;

            var note =  {
                hasEsc  : statusEskalasi,
                dataEsc : itemEskalasi,
                dataItem : item,
                showNotif : "hide"
            };

            $rootScope.statusEskalasiModal = statusEskalasi;
            $scope.infoVALOTH018 = itemEskalasi.valDesc;
            Notification.setNotification(note);
            $('#modalVALOTH018').modal('show');
        }

        $scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
            if (dataEsc.valCode === 'VALOTH022') {
                var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
                if (hasEsc) $scope.setSPOGAvailable();
            }
        });

        $scope.showModalVALOTH022 = function () {
            var
                itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH022'),
                hasEsc = BindEskalasi.hasTempEskalasi('VALOTH022'),
                statusEskalasi = itemEskalasi.id !== undefined ? true : false;

            var note = {
                hasEsc: statusEskalasi,
                dataEsc: itemEskalasi,
                // dataItem: item,
                showNotif: "hide"
            };
        
            $rootScope.statusEskalasiModal = statusEskalasi;
            $scope.infoVALOTH022 = itemEskalasi.valDesc;
            Notification.setNotification(note);
            $('#modalVALOTH022').modal('show');
        }

        $scope.cetakSpk = function(item, padis) {
            var namaCabang = localStorage.getItem('namaCabang');
            var namaPandu = item.namaPetugas;
            var asal = item.namaDermagaAsal;
            var tujuan = item.namaDermagaTujuan;
            var jamPelayanan = item.jamPelayananPandu;
            var tglPandu = $filter('date')(tanggalPandu, 'dd-MM-yyyy');
            var namaKapal = item.namaKapal;
            var noPpk1 = item.noPpk1;
            var loa = $scope.loa;
            var spk = item.nomorSpkPandu;

           // console.log(item);
            var src = '../images/pelindo3.png';
            var pdfContent = {
                pageSize: 'A5',
                pageOrientation: 'landscape',
                pageMargins: [40, 20, 40, 20],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 11,
                        alignment: 'center',
                        margin: [0, 5, 0, 10]
                    },
                    subheader: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'left',
                        margin: [0, 0, 0, 5]
                    },
                    subheader2: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'left',
                        margin: [60, 0, 0, 0]
                    },
                    subheader3: {
                        bold: true,
                        color: '#000',
                        fontSize: 9,
                        alignment: 'left',
                        margin: [60, 50, 0, 0]
                    },
                    tableHeader: {
                        color: '#000',
                        bold: true,
                        fontSize: 9,
                        alignment: 'center'
                    },
                    content: {
                        color: '#000',
                        fontSize: 8,
                        margin: [10, 3, 0, 2]
                    }
                },

                content: [

                    {
                        alignment: 'justify',
                        columns: [
                            {
                                width: 'auto',
                                stack:[
                                    {
                                        image: 'logo'
                                    }
                                ]
                            },
                            { width: 320,text: 'PT PELABUHAN INDONESIA III \n CABANG ' + namaCabang, style: 'subheader' },
                           //  { text: '\n No. PPK1  :  ' + noPpk1, style: 'subheader'}
                                 {
                                        image: 'logo1',
                                        width: 130,
                                        height: 25, 
                                        style: 'subheader'
                                 }
                        ]
                    },
                    { text: 'SURAT PERINTAH KERJA MEMANDU KAPAL', style: 'header' },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { text: 'Diperintahkan kepada  ', style: 'content' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'Nama Pandu  ', style: 'content' },
                            { text: ':  ' + namaPandu, style: 'content' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'Tanggal  ', style: 'content' },
                            { text: ':  ' + tglPandu + '    jam   ' + jamPelayanan, style: 'content' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'Untuk memandu kapal  ', style: 'content' },
                            { text: ':  ' + namaKapal + '  ( loa : '+loa+')', style: 'content' }
                        ]
                    }, {
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'Dari  ', style: 'content' },
                            { text: ':  ' + asal + '     ke     ' + tujuan, style: 'content' }
                        ]
                    },{
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'PPK1  ', style: 'content' },
                            { text: ':  ' + noPpk1, style: 'content' }
                        ]
                    },{
                        alignment: 'justify',
                        columns: [
                            { width: 10, text: '' },
                            { width: 125, text: 'No SPK  ', style: 'content' },
                            { text: ':  ' + spk, style: 'content' }
                        ]
                    }, {
                        alignment: 'justify',
                        columns: [
                            { text: '', style: 'content' }
                        ]
                    },
                    {
                        style:'content',
                        columns:[
                            { width: 10, text: '' },
                            {text:'Dalam menjalankan tugas agar diperhatikan hal-hal sebagai berikut:\n 1. Memperhatikan faktor-faktor dan keselamatan serta kelaiklautan kapal \n 2. Melaksanakan pemanduan secara fisik (naik di kapal yang dipandu) \n 3. Melayarkan kapal dengan kecepatan aman, tindakan berjaga-jaga sesuai kecakapan pelaut yang baik dengan mengedepankan prinsip kehati-hatian \n 4. Melaporkan kepada perwira dinas (padis) jika terdapat hal-hal di luar kewajaran yang terjadi di atas kapal maupun di sekitar kapal yang berhubungan dengan keselamatan kapal dan lingkungan \n'}
                        ],
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 280, text: '' },
                            { text: tglPandu, style: 'content', margin: [60, 30, 0, 0] }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { width: 280, text: '' },
                            { text: 'A.n. MANAJER REGIONAL PELAYANAN KAPAL', style: 'content', margin: [60, 5, 0, 0] }
                        ]
                    },
                    {
                        alignment: 'center',
                        columns: [
                            { width: 240, text: '' },
                            { text: 'PADIS PANDU', style: 'content', margin: [60, 5, 0, 0] }
                        ]
                    },
                     {
                        alignment: 'center',
                        columns: [
                            { width: 240, text: '' },
                            { text: '--------------------------------------', style: 'content', margin: [60, 50, 0, 0] }
                        ]
                    },
                     {
                        alignment: 'center',
                        columns: [
                            { width: 240, text: '' },
                            { text: padis, style: 'content', margin: [60, 5, 0, 0] }
                        ]
                    }
                ],
                images : {
                    logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAZACwDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABgcACAkBBf/EADQQAAEDAwIDAwkJAAAAAAAAAAECAwUEBhEABxIhMRRhcQgTFjZRdIGRsRUyQVJWl7K01P/EABYBAQEBAAAAAAAAAAAAAAAAAAYHBf/EACkRAAECBAUDBAMAAAAAAAAAAAECAwAEBRESIUFhcRQxUQaRobETgfD/2gAMAwEAAhEDEQA/ANOnX2WceeeQji6cSgM+GdA1zbkdlZdpoFqpbkGVY4a2Gq3WVd3E0OXiMjSs8piGumBturuO4dyF1trdoQlMW/ZdHKLYWrOD5wlASkYI41YIyBkk86vQ85ak/WpjIJIrqpYKkssbcx6lEAZJx2nS6kUBqaa6lS7geEqsOSU25+4GVyvPy7nSNpwk+Sm54AVfj6i0F1ydz3sttVxR9E+hr7jLbEw00k/m4EoAz3nnqWbuNuhZFWmJk4eQuaGRgJcTSvpeaT7ELcSFKx7FDwI1X70erP0pI/tpH/6dcNu1hBHorJDIxkbaR+f7OknSSxZ6dZSUeCDluNQeIGYZxMx1ja1Jc1ULXOyrkhQ2INtLRoDAz9DcUe1I0SKhoODmzUslp1BHUKQrmPp369HWa1u7aSVvzlLLwVbuhRVzToLbtDbTSHs56JxWc89MdD0xq/tnXTPTlvUtdVWVP0DnAGymW7OxUucIALi20LIRxHJxyPcBjQysUZunkKYcxpO1iPfvFEolZdqCSiZbwqFu2YO+Xbj5gqeZZqGl09Q0h1pxJQtC0hSVJIwQQeoOlbdPk7bbygXVw9nwNC8ltRDDUNRebec5kcSlsrKcnlkfLTU1NZMtNvSisTKrfXtGvNyTE8j8byb/AARwYp1KWjbUHMmCndrYqMqeErSqspYlllxI/FDqqXhV8DoktXZiMutTT9Ht3bqY9a+FdalqIebTjrgIpSVHw+Y0yPKQ9TaT31P0OmFaHqtE+5tfxGlszWliQbmW0AKUSNTa2oz+Df8AcT2R9PYqu9JPPrUhASodgTi0OWlsyLX2gfs3ZjbmyXW6+KtOG+0mySmvEXStPI7klptPD8OejfU1NDnn3JheN1VzFHYl2pVAbZTYf3vH/9k=",
                    logo1: "data:image/png;base64,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aMcb3w5M/U6n0263KyKDwaDb7fZ6vaZpvve97333u98dj8dJG1scVzows2WkWlmTyaTT6fzkJz954YUXnnrqqa985Svdbnc6nfZ6vdFohHnEu23c851/b2xxzPCBeYCidby0cqwWkZicNkTU6XSy6+PmmO61IZZG3Pb29t/93d+dP3/eKgCZEcGy7q+70SSi8Xh8+vTpc+fOHT9+3M5/rsqeyXyAddkCm4uisPRj22BYO+K///u/v3jx4srKynQ6BdDpdJL9nZktHNoMWOajHo1GZ86csZIZlr9wr2YltOeZm885WRhnAXznYYslZmXA3MAiBNESKigPYfVjnUj1hmuadxE32HmAVEECMCEqhOxl1iCYZqWhrykYC1IrAA1hgECWuCuAKAvAEJrVdhYh3e5y0zSTwYXL5fB878BHffWgp7UmdNj1yBUBFEQ0KDOzYxVpdULKvt89vI1uFzW19OCiKMx0asbXdiaqtbkfDoff/va3T5w48ZWvfOXw4cPtYhIpEc6cyXs9Z3j3AnlrFwzz4HU6HVvp+/1+0zSj0ehf//VfX375ZZPfVVUx83A4NHduKv5hF87UbKrACaDX67344ouXLl36xje+cejQofF4bE0g7LNSHni++e+Bwdv2K547d+7HP/7xlStXTKQ9+eSTJ06caFdpyraP92OQYuZutzsYDFS13+//6Ec/+vd///fxeGwGJmY2m5RNj7vnB5sZer2eOZOT28piPXIacCbz/jF/MhFtbm5WVWUz22g0+s53vvNf//VfRVF0u93hcNjpdKbT6Wg0so1KGnGp2a+90Mp3lWVpnZzuYYNUmmfac9TNo9syWQDfaRkMZVIGiRIAUSLi7mQ66vBBf/DjvqTtixrGoVsUQCMSIJFECcTMIKciu1yxDACk9oYEpfleXQVkcnv2EiHyqko2wyAAY3YNSTPdmjbjq73V9WLlkaJzRCk2sUNUFK5SciISQvR5H3WvLDBouT3NMlpV1XQ6res6ZfWg1T/JHCDT6fT111+/fPnyH/7hHy4vL6deIO3+8ntodWl7chbq3Oze4N7ClcNcds65ra2t1dXV4XDIzE8//fQrr7xiEeYiUtd1jLHb7YYQut1uqjWSLk2yXJjFYTQaOefOnj3713/917//+79/4MABu2qpcmY2995jGngymfzLv/zLd7/73ZWVFZPEZVmeOnXq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Gmjmz+e3mW2yKpjsTaVSt91228aNG9EOwVp700039ff3//KXv2RPF4IoeNj79+9njwqchRjbOI737ds3OTnJPComCHKX9913Xy6Xo+xtoVD47ne/+5Of/GR6epq5INxetVrdtGnT1772NSbNmq8KZjJxeMdxfOWVV9599935fB5QELgLujX8lkqlcuDAAZdZgMVTLpez2ew111zzpS99CfGUWq22du3a5cuX//znPx8eHoaIMeL3ZxphkMEo7eP2gUyUp+Iboe2JhQemIpjhC6D88eveffddOEBMXJNqe/vtt99yyy2ZTAbhj9WrV69du/bBBx+cmJhgkgpXS6fThw4dOnHiBPzm8wXkd9xxx80334zhwkS0tLR8+ctf/n//7/8hX4enduXNRkZGxOnBtgDqo8s7deVemQJ181Guk/3nxLBgvvbt2zcxMYESSkb0EAPq7+//zne+w1zl0qVLFy9enM1mN23axL415DFWq9UdO3YsWbKElN0mxodURrCj0+k0pGuxd4wxixcv7u/vb29vR32BW1dMt1trfcUVV3z5y18GSRLJeajg/vKXv8ROYSyM1ebITbnT12S4yuVyZ2cnqglyudwDDzwAVXlYmKVLlw4MDKxcufLJJ5+EIXLbB+DpUqnUkiVLvv/97zOVVKlUVq1aNTAwICI7d+5M1E1g8biaAu5yQpP2kydPUuGf7GiMzw033HDvvfcinJdKpVasWPH3f//3//Vf/8XygYWJ97jEAc7FunXrvva1rxEhz8zMdHd333XXXRMTE4CybkM4jP/IyAi+HUiPt41TbGhoiEabMWUAy/7+/m9961vMRS9fvvxf/uVffvSjH2HMYQAZ4/ioA/QJcMvyVHG6hS2MAs1Zfuedd9wBp6rZddddt27dukwmA2ECz/OuvfZaFJxDEgLKYRjG3bt333zzzZ2dnefiCZBf0Gg08vn87bffvn79esTfcRquWLHib//2b//3f/+XxASXIIZAM5wit623zFXlpNPpiYkJaLy7hHYqaYHYTEeuiZ2kbBsO0Pb29kWLFt11113I3LK1ASMspKVs27YNOwunFQQFgiDYsGHDddddBzOC5MrKlSvvuOOO5557jux68k1GR0cnJiaWLFmy4Pm9+F+XKNAfyZAaJUp5YnUY63qUqpt85PdGsjjddU3Xytv9wuVV0xvqvtAUvFSb0UEc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"
                    
                }

            };
            pdfMake.createPdf(pdfContent).download('spk - '+noPpk1+' - '+namaKapal+'.pdf');
        };



    }]);
