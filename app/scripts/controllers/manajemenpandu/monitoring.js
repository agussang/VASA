'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringPanduCtrl
 * @description
 * # MonitoringPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('MonitoringPanduCtrl', ['$scope', '$PAGE_SIZE', '$filter', '$rootScope', '$interval', '$timeout', '$window', 'ProgressSpk', 'MonitoringPetugasPandu', 'LoadingScreen', 'moment', 'UserRole', 'ProgressSpkEdit', 'ProgressSpkAdd', 'ProgressSpkOptimized', 'Notification', 'TahapanPanduList', 'ReaPanduDesktopAdd', 'PenetapanPanduByPpkJasa', 'SpkPanduDelete', 'PerencanaanPanduDelete', 'SuratPerintahKerjaPanduDetail', 'SuratPerintahKerjaPanduEditFlagDone', 'AturanKapalTundaList', 'TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi','MonitoringIpadPandu', function ($scope, $PAGE_SIZE, $filter, $rootScope, $interval, $timeout, $window, ProgressSpk, MonitoringPetugasPandu, LoadingScreen, moment, UserRole, ProgressSpkEdit, ProgressSpkAdd, ProgressSpkOptimized, Notification, TahapanPanduList, ReaPanduDesktopAdd, PenetapanPanduByPpkJasa, SpkPanduDelete, PerencanaanPanduDelete, SuratPerintahKerjaPanduDetail, SuratPerintahKerjaPanduEditFlagDone, AturanKapalTundaList,TipeEskalasiList, BindEskalasi, TipeEskalasi,MonitoringIpadPandu) {
        $scope.userRole = UserRole.getCurrentRole();
        $scope.addJamAktivitas = {};
        $scope.tahapanPandu = {};
        $scope.jamAktivitas = {};
        $scope.realisasi = {};
        $scope.penetapanPandu = {};
        $scope.detailSpk = {};
        var currentDate = new Date();
        var tanggalPandu = $filter('date')(currentDate, 'yyyy-MM-dd');
        var tomorrowsDate = moment($scope.tomorrowsDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        $scope.tglFilter = $filter('date')(currentDate, 'dd-MM-yyyy');
        $scope.currentDate = $filter('date')(currentDate, 'yyyy-MM-dd');
        $scope.tomorrowsDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd');
        $scope.namaKapal = null;
        $scope.pageSize = 40;

        AturanKapalTundaList.get(
            function (response) {
                $scope.aturanKapalTunda = response.content;
            }
        );

        var setDisableDate = function() {
            $('#tglAwal').datepicker('setEndDate', tomorrowsDate);
            $('#tglAwal').mask('99-99-9999');
        };

        $scope.$watch('tglAwal', function() {
            $timeout(function() {
                setDisableDate();
            }, 1000);
        });

        $scope.getTahapanPanduList = function(){
            TahapanPanduList.get(function(response){
                $scope.tahapanPandu = response;
            });
        };

        $scope.getTahapanPanduList();

        $scope.optionSizePage = {
            availableOptions: [10, 20, 40, 80, 160],
            selectedOption: 40 //default select option size
        };

        $scope.currentPage = 1;

        //$scope.pageSize = $scope.optionSizePage.selectedOption.number;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.pagingText = '';

        $scope.pageChanged = function(newPage) {
            LoadingScreen.show();
            $scope.petugasList = [];
            
            ProgressSpkOptimized.get({
                size: $scope.pageSize,
                page: newPage - 1,
                tglAwal: $scope.currentDate,
                tglAkhir: $scope.tomorrowsDate,
                sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc')),
                namaKapal:$scope.namaKapal,
                namaPandu : $scope.namaPandu
            },
            function(response) {
                $scope.currentPage = response.number + 1;
                $scope.noIndex = ($scope.currentPage - 1) * response.size;
                $scope.pageSize = response.size;
                $scope.totalItems = response.totalElements;
                $scope.totalPages = response.totalPages;
                $scope.allItems = response.content;
                $scope.items = $scope.allItems;
                $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
                    $scope.currentPage) + ' of ' + $scope.totalItems;
                $scope.items.forEach(function(element) {
                    MonitoringIpadPandu.get({
                        nippPandu : element.nipPandu
                        }, function(response) {
                            if (response.content.length == 0){
                                element.statusMonitoring = false;
                            } else {
                                element.statusMonitoring = response.content[0].status;
                            }
                     });
                    element.jumlahTunda = 0;
                    element.jam = moment(element.jamPelayanan, "HH:mm").format("HH");
                    if (element.jenisDermaga  == 3){
                        element.tidakPerluTunda = true;
                    } else {
                        element.tidakPerluTunda = false;
                    }
                    var i = 0;

                    if (element.jenisGerakan == '1') {
                        element.jenisGerakanText = 'MASUK';
                    } else if (element.jenisGerakan == '2') {
                        element.jenisGerakanText = 'PINDAH';
                    } else if (element.jenisGerakan == '3') {
                        element.jenisGerakanText = 'KELUAR';
                    } else {
                        element.jenisGerakanText = item.jenisGerakan;
                    }
                    
                    element.listProgress.forEach(function(data) {
                        switch (data.idTahapanPandu) {
                        case 1:
                            element.jamPanduNaik = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglPanduNaik = data.tglTahapan;
                            element.idJamPanduNaik = data.id;
                            break;
                        case 2:
                            element.jamKapalBergerak = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglKapalBergerak = data.tglTahapan;
                            element.idJamKapalBergerak = data.id;
                            break;
                        case 3:
                            element.jamPanduTurun = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglPanduTurun = data.tglTahapan;
                            element.idJamPanduTurun = data.id;
                            break;
                        case 4:
                            element.jamIkatTunda = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglIkatTunda = data.tglTahapan;
                            element.idJamIkatTunda = data.id;
                            break;
                        case 5:
                            element.jamLepasTunda = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglLepasTunda = data.tglTahapan;
                            element.idJamLepasTunda = data.id;
                            break;
                        case 6:
                            element.jamIkatTali = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglIkatTali = data.tglTahapan;
                            element.idJamIkatTali = data.id;
                            break;
                        case 7:
                            element.jamLepasTali = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.tglLepasTali = data.tglTahapan;
                            element.idJamLepasTali = data.id;
                            break;
                        case 8:
                            element.jamTugFast = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.idJamTugFast = data.id;
                            break;
                        case 9:
                            element.jamTugOff = $filter('date')(data.tglTahapan, 'HH:mm');
                            element.idJamTugOff = data.id;
                            break;
                        }
                    });
                    
                    if (element.status == 'OHN') { element.status = 'Konfirmasi' }
                    if (element.jamPanduNaik){ element.status ='Sedang dikerjakan'}
                    if (element.jamPanduTurun) { element.status = 'Selesai' }

                    while (i < $scope.aturanKapalTunda.length) {
                        if (element.loa < $scope.aturanKapalTunda[i].panjangKapalMax && element.loa >= $scope.aturanKapalTunda[i].panjangKapalMin) {
                            element.jumlahTunda = $scope.aturanKapalTunda[i].jumlahKapalTunda;
                        }
                        i++;
                    }
                });
                LoadingScreen.hide();
            });
            //LoadingScreen.hide();
        };

        $scope.loadPetugas = function() {
            $scope.monitoringPandu = [];
            MonitoringPetugasPandu.get({
                tglPandu: tanggalPandu,
                kodeCabang: localStorage.getItem("kodeCabang")
            }, function(response) {
                for (var i = 0; i < response.length; i++) {
                    if (response[i].statusAbsen == 1) {
                        response[i].statusAbsenText = 'ON';
                        response[i].status = 'Available';
                    } else {
                        response[i].statusAbsenText = 'OFF';
                        response[i].status = 'Unavailable';
                    }
                    if ($scope.searchPanduByShift(response[i].petugasPandu)) {
                        $scope.monitoringPandu.push(response[i]);
                    }
                }
            });
        };


        $scope.searchPanduByShift = function (item) {
            if (item == 'undefined') {
                return false;
            } else {
                var cekJamMulai = moment().isAfter(item.jamMulaiPandu)
                var cekJamSelesai = moment().isSameOrBefore(item.jamSelesaiPandu)

                return (cekJamMulai && cekJamSelesai);
            }
        };

        $scope.changeTanggalAwal = function() {
            $scope.currentDate = moment($scope.tglFilter, "DD-MM-YYYY").format("YYYY-MM-DD");
            //$scope.pageChanged(0);
        };

        $scope.updateJamAktivitasPandu = function(item,id){
            var idListProgress = id;
            $scope.itemAktivitas = item.listProgress.find(itemThatWasEdited)
            $scope.tglAktivitas = $filter('date')($scope.itemAktivitas.tglTahapan, 'dd-MM-yyyy')
            $scope.jamAktivitas = $filter('date')($scope.itemAktivitas.tglTahapan, 'HH:mm')
            function itemThatWasEdited(element, id) {
                return element.id == idListProgress;
            }
        }

        $scope.addJamAktivitasPandu = function(item,tahapan){
            $scope.addJamAktivitas.idTahapanPandu = tahapan;
            $scope.addJamAktivitas.nomorSpk = item.nomorSpk;
            $scope.addJamAktivitas.nomorSpkTambat = item.nomorSpkTambat;
            $scope.addJamAktivitas.nomorSpkPandu = item.nomorSpkPandu;
            $scope.addJamAktivitas.nomorSpkTunda = item.nomorSpkTunda;    
        }

        $scope.editAktivitasPandu = function(item, id, tahapan) {
            if(id == null){
                $("#addJam").modal(); 
                $scope.addJamAktivitasPandu(item,tahapan);
            } else {
                $("#editJam").modal();
                $scope.updateJamAktivitasPandu(item,id);
            }
            
        };

        $scope.addJam = function(item , jamAktivitas, tglAktivitas){
            tglAktivitas = moment(tglAktivitas, "DD-MM-YYYY").format("YYYY-MM-DDT");
            item.tglTahapan = tglAktivitas + jamAktivitas + ":00";
            ProgressSpk.save(item, function(response){
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            })
        }

        $scope.updateJam = function(item, jam, tgl) {
            item.tglTahapan = $filter('date')(item.tglTahapan, 'yyyy-MM-ddT') + jam + ":00";
            ProgressSpkEdit.update({ id: item.id }, item, function(response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            })
        }

        $scope.getRealisasiPanduDetail = function(noPpkJasa){
            PenetapanPanduByPpkJasa.get({noPpkJasa: noPpkJasa}, function(response) {
                $scope.penetapanDetail = response.content[0];
            })
        };

        $scope.realisasiPandu = function (item) {
            if(item.flagDone == 2 || item.idJamPanduNaik == null || item.idJamPanduTurun == null || 
                item.idJamKapalBergerak == null){
               
                // $scope.setNotification = {
                //     type: "warning",
                //     message: "Data tidak tersimpan"
                // };
                Notification.setNotification($scope.setNotification); 
            }else{ 
            $scope.getDetailSpk(item.id);
            $scope.dataRealisasi(item);
            $scope.getDataPenetapanPandu(item);
            $timeout(function () {
                $scope.submitRealisasi();
                $scope.flagAsDone(item.id);
            }, 1000);
            }
        };

        $scope.getDataPenetapanPandu = function (item) {
            PenetapanPanduByPpkJasa.get({ noPpkJasa: item.noPpkJasa }, function (response) {
                $scope.penetapanPandu = response.content[0];

                $scope.realisasi.flagApbs = $scope.penetapanPandu.flagApbs;
                $scope.realisasi.listKapalGandeng = $scope.penetapanPandu.listKapalGandeng;
                $scope.realisasi.status = $scope.penetapanPandu.status;
                $scope.realisasi.parentPtpJasaId = $scope.penetapanPandu.parentPtpJasaId;
                $scope.realisasi.jenisRevisi = $scope.penetapanPandu.jenisRevisi;
                $scope.realisasi.prevNoPpkJasa = $scope.penetapanPandu.prevNoPpkJasa;
                $scope.realisasi.statusPelaksanaan = $scope.penetapanPandu.statusPelaksanaan;
                $scope.realisasi.parentNoPpkJasa = $scope.penetapanPandu.parentNoPpkJasa;
                $scope.realisasi.jenisPandu = $scope.penetapanPandu.jenisPandu;
                $scope.realisasi.jenisGerakan = $scope.penetapanPandu.jenisGerakan;
            });
        };

        $scope.dataRealisasi = function (item) {
            $scope.realisasi = item;

            $scope.realisasi.kodeLokasiPanduAsal = item.kodeAsal;
            $scope.realisasi.kodeLokasiPanduTujuan = item.kodeTujuan;
            $scope.realisasi.namaLokasiPanduAsal = item.asal;
            $scope.realisasi.namaLokasiPanduTujuan = item.tujuan;

            $scope.realisasi.noPpkJasaPandu = item.noPpkJasa;
            $scope.realisasi.tglMulaiPandu =  item.tglPanduNaik;
            $scope.realisasi.tglSelesaiPandu = item.tglPanduTurun;
            if (typeof item.jamIkatTunda != 'undefined') {
                $scope.realisasi.tglMulaiTunda = item.tglIkatTunda;
            }
            if (typeof item.jamLepasTunda != 'undefined') {
                $scope.realisasi.tglSelesaiTunda = item.tglLepasTunda;
            }

        };

        $scope.submitRealisasi = function () {
            ReaPanduDesktopAdd.save($scope.realisasi, function (response) {
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            }); 
        };

        $scope.getDetailSpk = function (id) {
            SuratPerintahKerjaPanduDetail.get({ id: id }, function(response) {
                $scope.detailSpk = response;
            });    
        };

        $scope.flagAsDone = function (id) {
            $scope.detailSpk.flagDone = 2;
            SuratPerintahKerjaPanduEditFlagDone.update({ id: id }, $scope.detailSpk, function (response) {
                $scope.detailSpk = response;
            }); 

        }
        
        $scope.deleteJasaPandu = function (item) {
            SpkPanduDelete.delete({ noPpk1: item.noPpk1, noPpkJasaPandu: item.noPpkJasa }, function (response) {
                if (response.$resolved) {
                    PerencanaanPanduDelete.delete({ noPpkJasaPandu: item.noPpkJasa }, function (response) {
                        if (response.$resolved) {
                            $scope.setNotification = {
                                type: "success",
                                message: "Data berhasil dihapus"
                            };
                        } else {
                            $scope.setNotification = {
                                type: "warning",
                                message: "Data tidak berhasil dihapus"
                            };
                        }
                        Notification.setNotification($scope.setNotification);
                        $scope.pageChanged(0);
                    });
                } else {
                    $scope.setNotification = {
                        type: "warning",
                        message: "Data tidak berhasil dihapus"
                    };
                }
                BindEskalasi.setDefaultEskalasi();
            });
        };

        $scope.eskalasiBatalJasaPandu = function (item) {
            console.log(item.flagDone === 2);
            var confirmation = confirm('Apakah anda yakin akan membatalkan jasa pandu?');
            if (confirmation) {
                $scope.showModalVALOTH021(item);
            }  
        };
        
        $scope.getTipeEskalasi = function () {
            TipeEskalasiList.get({ size: 999, page: -1, sort: 'escTypeCode,desc' }, function (response) {
                TipeEskalasi.setTipeEskalasi(response.content);
            });
        };

        $scope.getTipeEskalasi();

        $scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
            if (dataEsc.valCode === 'VALOTH021') {
                var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
                if (hasEsc) { $scope.deleteJasaPandu(item); }
            }
        });

        $scope.showModalVALOTH021 = function (item) {
            var
                itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH021'),
                hasEsc = BindEskalasi.hasTempEskalasi('VALOTH021'),
                statusEskalasi = itemEskalasi.id !== undefined ? true : false;

            var note = {
                hasEsc: statusEskalasi,
                dataEsc: itemEskalasi,
                dataItem: item,
                showNotif: "hide"
            };

            $rootScope.statusEskalasiModal = statusEskalasi;
            $scope.infoVALOTH021 = itemEskalasi.valDesc;
            Notification.setNotification(note);
            $('#modalVALOTH021').modal('show');
        };

        //remove show data when first reload
        //$scope.pageChanged(0);
        $scope.loadPetugas();
       

        $rootScope.$on('subscribeProgressPandu', function(event, data) {
            $scope.pageChanged(0);
            $scope.setNotification = {
                type: "success", //ex : danger, warning, success, info
                message: "Data monitoring pandu diperbarui"
            };
            Notification.setNotification($scope.setNotification);
        });

        $interval(function() {
          $scope.loadPetugas();
        }, 300000);

        $rootScope.$on('subscribePetugasPandu', function(event, data) {
            //$scope.loadPetugas();
        });

        $scope.openMonitoringPandu = function(){
            $window.open('#/manajemenpandu/monitoringpandu', '_blank');
        }
 
    }]);

    