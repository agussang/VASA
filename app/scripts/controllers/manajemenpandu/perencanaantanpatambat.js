'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanPanduCtrl
 * @description
 * # PerencanaanPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('PerencanaanPanduTanpaTambatCtrl', ['$scope', '$location', '$filter', '$timeout', '$window', '$interval', '$http', '$rootScope', 'API_PATH', 'KawasanPanduList', 'MonitoringAntrianPanduList', 'MonitoringAntrianPanduTanpaTambat', 'MonitoringPanduAdd', 'KawasanPanduLevelSatuList', 'SuratPerintahKerjaNumber', 'LoadingScreen', 'KapalTundaList', 'SuratPerintahKerjaPanduAdd', 'SuratPerintahKerjaPanduEdit', 'SuratPerintahKerjaPanduEditStatus', 'SuratPerintahKerjaPanduDetail', 'SuratPerintahKerjaPanduDelete', 'SuratPerintahKerjaPanduRpkro', 'Notification', 'PetugasPanduPerJadwalPandu', 'SpkTundaNumber', 'AlatApungList', 'SearchAlatApung', 'SpogNumber', 'PetugasPanduPerHariList', 'moment', 'SuratPerintahKerjaTambatAdd', 'AturanKapalTundaList', 'PenetapanPandu', 'PenetapanPanduEdit', 'MonitoringPetugasPandu', 'AppParam', 'KawasanPanduLevelDuaList', 'MdmDermagaSearchByKode', 'MdmDermagaPerJasa', 'AturanGerakPanduList', 'SuratPerintahKerjaPanduCancel', 'ParamsCabangList', '$PAGE_SIZE', 'PerencanaanPanduDelete', 'TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi', 'SearchSDMKapal', 'RealisasiPanduDetailbyPpkJasa', 'SuratPerintahKerjaPanduResend', 'SpbInaportnet', 'SuratPerintahKerjaNumberPpkJasaTambat','MonitoringAntrianPanduTanpaTambatBaru', function ($scope, $location, $filter, $timeout, $window, $interval, $http, $rootScope, API_PATH, KawasanPanduList, MonitoringAntrianPanduList, MonitoringAntrianPanduTanpaTambat, MonitoringPanduAdd, KawasanPanduLevelSatuList, SuratPerintahKerjaNumber, LoadingScreen, KapalTundaList, SuratPerintahKerjaPanduAdd, SuratPerintahKerjaPanduEdit, SuratPerintahKerjaPanduEditStatus, SuratPerintahKerjaPanduDetail, SuratPerintahKerjaPanduDelete, SuratPerintahKerjaPanduRpkro, Notification, PetugasPanduPerJadwalPandu, SpkTundaNumber, AlatApungList, SearchAlatApung, SpogNumber, PetugasPanduPerHariList, moment, SuratPerintahKerjaTambatAdd, AturanKapalTundaList, PenetapanPandu, PenetapanPanduEdit, MonitoringPetugasPandu, AppParam, KawasanPanduLevelDuaList, MdmDermagaSearchByKode, MdmDermagaPerJasa, AturanGerakPanduList, SuratPerintahKerjaPanduCancel, ParamsCabangList, $PAGE_SIZE, PerencanaanPanduDelete, TipeEskalasiList, BindEskalasi, TipeEskalasi, SearchSDMKapal, RealisasiPanduDetailbyPpkJasa, SuratPerintahKerjaPanduResend, SpbInaportnet, SuratPerintahKerjaNumberPpkJasaTambat,MonitoringAntrianPanduTanpaTambatBaru) {
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

        // KapalTundaList.get({
        //     size: 999,
        //     page: -1,
        //     sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
        // }, function(response) {
        //     response.content.forEach(function(element) {
        //         if (element.statusOn == true) {
        //             $scope.listKapalTundaStatusOn.push({
        //                 kodeKapal: element.kodeKapal,
        //                 namaKapal: element.namaKapal
        //             });
        //         }
        //         if (element.available == true && element.statusOn == true) {
        //             $scope.listKapalTundaAvailable.push({
        //                 kodeKapal: element.kodeKapal,
        //                 namaKapal: element.namaKapal
        //             });
        //         }
        //     });
        // });

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

            MonitoringAntrianPanduTanpaTambat.get({
                size: $scope.pageSize,
                page: newPage - 1,
                tglAwal: tanggalPanduAwal,
                tglAkhir: tanggalPanduAkhir,
                namaKapal: $filter('uppercase')($scope.namaKapal),
                statusSpk: $scope.statusSpk,
                lokasi: $scope.lokasi,
                namaDermagaAsal: $scope.area,
                namaDermagaTujuan: $scope.area,
                jenisGerakan : $scope.searchJenisGerakan
            }, function(response) {
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
            $scope.spk.noPpkJasa = item.noPpkJasaPandu;
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

            SuratPerintahKerjaNumberPpkJasaTambat.get({ noPpk1: item.noPpk1, noPpkJasa:item.noPpkJasaPandu }, function (response) {
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
            $http.get(API_PATH + 'surat_perintah_kerja_pandu/rpkro/' + item.noPpkJasaPandu)
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
                kodeCabang: localStorage.getItem("kodeCabang")
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

        $scope.createOhn = function(item) {
            $scope.dataOhn.status = "OHN";
            $scope.spkTambat = $scope.dataOhn;
            $scope.dataOhn.tglPandu = $filter('date')(tanggalPandu, "yyyy-MM-ddT00:00:00");
            $scope.saveMonitoring($scope.monitoring);
            $scope.arrangeKapalTunda($scope.dataOhn);
            $timeout(function() {
                $scope.editSPK($scope.dataOhn.id, $scope.dataOhn);
                $scope.createSpkTambat($scope.dataOhn);
            }, 500);
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

        $scope.checkSpog = function (item) {
            if ($scope.entryInaportnet == '1') {
                SpogNumber.get({ noSpk: item.item.nomorSpk }, function (response) {
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
                $scope.dataOhn.tanggalPandu = moment(response.tglPandu, "YYYY-MM-DDT:HH:mm:ss").format("DD-MM-YYYY");
                $scope.tglMulaiTambatAsal = $filter('date')(response.tglMulaiTambatAsal, 'dd-MM-yyyy HH:mm');
                $scope.tglMulaiTambatTujuan = $filter('date')(response.tglMulaiTambatTujuan, 'dd-MM-yyyy HH:mm');

            });
        }

        $scope.showModalOhn = function(item) {
            $scope.dataOhn = {};
            $scope.getDetailOhn(item);
            $scope.itemMonitoring(item);
        };

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

        $scope.showModalInformasiTambat = function (item){
            MonitoringAntrianPanduTanpaTambatBaru.get({
                no_ppk1 : item.noPpk1,
                no_ppk_jasa_pandu : item.noPpkJasaPandu
            }, function(response){
                $scope.informasiTambat = response;
            });   
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


            var src = '../images/pelindo3.png';
            var pdfContent = {
                pageSize: 'A5',
                pageOrientation: 'landscape',
                pageMargins: [40, 20, 40, 20],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 5, 0, 10]
                    },
                    subheader: {
                        bold: true,
                        color: '#000',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [0, 0, 0, 5]
                    },
                    subheader2: {
                        bold: true,
                        color: '#000',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [60, 0, 0, 0]
                    },
                    subheader3: {
                        bold: true,
                        color: '#000',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [60, 50, 0, 0]
                    },
                    tableHeader: {
                        color: '#000',
                        bold: true,
                        fontSize: 10,
                        alignment: 'center'
                    },
                    content: {
                        color: '#000',
                        fontSize: 9,
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
                             { text: '\n No. PPK1  :  ' + noPpk1, style: 'subheader'}
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
                            { text: 'A.n. MANAGER PELAYANAN KAPAL', style: 'content', margin: [60, 5, 0, 0] }
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
                    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAZCAYAAABKM8wfAAAFoUlEQVRYR62YXYhdVxXHf2vvc+45d+bORyQNEQ02D1aaUhTbIBREI8QKbawhzLxIH3wrrWLRlyJIJto2lT4o6kuhD7Yv4q2kSQ31A5H0QZE+5KWpLVVCS1sC0TTzkXPn3nvO3kv2PnfSO1+ZuZMsBu69+6yz9n//13+tvfcIo5qqcA7LIal4TlM+XXwXkh+g+gIu/xkPyRJzajgOiPhRw2/lL1s5rHrebltmZ10ca1/ei81OkqeHqSqwieLlIqK/4MjYy7VP2zIz4xHRkea5gfP2AAfGOGeYO1TRvnQb+cS3cf5uRKbwbhERg7ouIl9mYvoAneIszv2Uo1Ov18DVMouHmwe+NeA4mdSsnvrf10jHn0L8vXhfgikRLIE/QfCuxDlotqYo+12cf55y/hlm9334MfBBrB1SvjlgDayiMZ0vfHAHrbFDoF9CEovvF6g3kKyeNoCOf/IASfop8iZ0ex8g5iTnX3meudk+Ie4JYG5n+l4POBTVS5jI6i//nbF/zyM00+9Tms+guhQRCmExG5sO5Boi96oUY3OyJvS7/8SXJ3ho6k/xxQB8B0W5GvBwkJfn78GaL4AcJJUCR4kYg1aCJBo/11ocDxSHJUkX576O6r30e45mK8G7ALRN9+qTzO57g0DOiAVZT1q3oTr97Xf3k0z/mKz5HZIUessVYKNG19b6RoKKehbw6nGlB611oz58F8anBVfN0+89ytGp38a5R5CH1BU8KIS/6h0US8dQ7sHYK7jyxul3kc01OjZhaRXO78bKEdSnqx18H5s18NUyXu/k2K73RmG6nrD90d1kyUmsPYzTRdDlAavrdRpTrhYxCqFwfPgc4l5DTEU1xbndsKJ39TFDSWJoTUBR/A1XHuNb04uxCEOGN7OIsp5DOD3/I9Lse2D20ivKGqjUHWJdD7CgziFmCedCqjNskmLMkHfAH9ak4IKaBtbIB+P+Q1RfpLH0FPfvLTYFuckD4fTifaTZEsu9kobYTQP0gYbrULKLRvJVqvIQykHQPbGVBYASNof1IkFxZNnrVP6P+M5Zrl69SHMyo9dLmGp6up010hqHSpWkI+S7pxiXee6fuFwzPIqd6R7G+mfxehciSdR4qKUYyUA+tiZkvaOgPhTvEiLLqLQQH+gOL24ggzjkopJS6+l2/4JzTzC7+53gLbFKb2QHEP6F8tlL+5iYPE8j/wTFQj2RhNyH7mJCB+lg038grkLj+JAZMJKCt2AC0I0PRd4rxli8b2FthfoXeXDsubr1hdqQWCA3ttArg71CC1P8gbT5FYqFEgkAotWiNdKnkb2G0SDcsCmsZk9XdpRNROM11EYD8css9n7DzK4z1z2H+vXWgCOkQYNvz+8nNb9jfOIg1+Z9THXYTAKhwvsgvUF3CQxuL3YAaiQHJhH7NomcwC28xoOfXL6+4w6tcXtBh0G/emWSMn8aI49F3XavVaSZpXLnUXcBY8YQsfjQ9jYx9UKCQ8Xj3CTGvo3qrzk2fXENtnUxtg84RBrelU4tfIMkfYYs/zydxbromi3oFl2MuYyPHWc9aInSCBlooTRx5askdo5vTrzJ3JzhwHG5vpFtqJ6tNLz2ea3pcAbwtN9s0bz9hyiPY5Npyl6F9/9B9e+oa8ZCWdFyhK4OmwhOJ8D/meVrp3n49kt1JWzvXDEaw8Pgh7f031+5iyw/jpgZbAplkLIWmKQ+TgagUec6DWaBqvw5vvoVR3fNj3or2TngmhahPTiKhp9nigew8hPS/It0r51FuIBqjk3GcN6TpKf4aOkCD99WszriwSe8cpOAB5Sv9PJw6mq/36Q59TjSeIKxbDJ6FJ236BbHmdnzUvx9E1emWwN4RSrDMmn/93Pkebg7X+T8uaeZO9KJOo007fxud2sBbySTjRYzaqHvqA+POsnK/ybq9+rLwS2w/wOPo243kk4ufAAAAABJRU5ErkJggg=="
                }

            };
            pdfMake.createPdf(pdfContent).download('spk - '+noPpk1+' - '+namaKapal+'.pdf');
        };



    }]);
