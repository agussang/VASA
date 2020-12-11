'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringPanduCtrl
 * @description
 * # MonitoringPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('OfflineSpkPandu', ['$scope', '$PAGE_SIZE', '$filter', '$rootScope', '$interval', '$timeout', '$window', 'ProgressSpk', 'MonitoringPetugasPandu', 'LoadingScreen', 'moment', 'UserRole', 'OfflineSpkList', 'Notification', 'TahapanPanduList', 'OfflineSpkPanduAdd','SpkPanduDelete', 'PerencanaanPanduDelete', 'SuratPerintahKerjaPanduDetail', 'BindEskalasi', 'TipeEskalasi','PetugasPanduList','SearchPpk1','PermohonanPandu','PermohonanList','PenetapanPandu','AppParam','AturanGerakPanduList','ReaPanduDesktopAdd',function ($scope, $PAGE_SIZE, $filter, $rootScope, $interval, $timeout, $window, ProgressSpk, MonitoringPetugasPandu, LoadingScreen, moment, UserRole, OfflineSpkList, Notification, TahapanPanduList, OfflineSpkPanduAdd, SpkPanduDelete, PerencanaanPanduDelete, SuratPerintahKerjaPanduDetail, BindEskalasi, TipeEskalasi,PetugasPanduList,SearchPpk1,PermohonanPandu,PermohonanList,PenetapanPandu,AppParam,AturanGerakPanduList,ReaPanduDesktopAdd) {
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
        $scope.isSync = 0;
        $scope.ppkJasaPanduOption = {};
        $scope.dataPermohonan = {};
        $scope.jenisGerakanOption = {};
        $scope.lokasiAsalGerakPandu = "";
        $scope.lokasiTujuanGerakPandu = "";
        $scope.aturanGerakByLokasiAsal = {};
        $scope.aturanGerakByLokasiTujuan = {};
        $scope.jenisPanduOption = {};
        $scope.desktopRea = {};
        $scope.dataOfflineSpk = {};

        //get jenis pandu
        AppParam.get({nama:'JENIS_GERAKAN'},function(response){
            $scope.jenisGerakanOption = response.content;
        });

        AppParam.get({ nama: 'JENIS_PANDU'}, function(response) {
            $scope.jenisPanduOption = response.content;
        })

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
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.pagingText = '';

        $scope.pageChanged = function(newPage) {
            LoadingScreen.show();

            OfflineSpkList.get({
                isSync : $scope.isSync
            },
            function(response) {
                $scope.items = response;
                $scope.convertStringUtcToHoursMinute($scope.items);
                angular.forEach($scope.items, function(value,key){
                 //get nama pandu from nip pandu
                 $scope.getNamaPandu(value.nipPandu, key);   
                });
                LoadingScreen.hide();
            });
        };

        $scope.getNamaPandu =  function(nipPetugasPandu, indexItem){
            //ambil api
            PetugasPanduList.get({
                username : nipPetugasPandu
            }, function(response){
                $scope.items[indexItem].namaPetugasPandu = response.content[0].namaPetugas;
            });
        };
        $scope.showModalOfflineSpk = function(item) {
            $scope.dataPermohonan = item;
            $scope.dataPermohonan.petugasPandu = item.namaPetugasPandu;
            $scope.dataPermohonan.nipPetugasPandu = item.nipPandu;
        };

        $scope.validationLookupPpk1 = function(){
            if(typeof $scope.dataPermohonan.noPpk1 != 'object'){ 
            $scope.setNotification  = {
                type  : 'warning',
                message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
              };
                Notification.setNotification($scope.setNotification);
                $scope.dataPermohonan = {};
            }
                //kalau ada noppk1nya load ppkjasanya
                PermohonanPandu.get({
                    noPpk1 : $scope.dataPermohonan.noPpk1.noPpk1
                }, function(response){
                    $scope.ppkJasaPanduOption = response.content;
                });
        };
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

        $scope.$watch('dataPermohonan.noPpk1', function(){
            if(typeof $scope.dataPermohonan.noPpk1 === 'object'){
                var tempPpk1 = '';
                $scope.dataPermohonan.namaKapal = $scope.dataPermohonan.noPpk1.namaKapal;
                tempPpk1 = $scope.dataPermohonan.noPpk1.noPpk1;
                PermohonanList.get({
                    noPpk1 : tempPpk1
                }, function(response){

                });
            }
        });

        $scope.ppkJasaPandu = function(noPpkJasa){
            PenetapanPandu.get({
                noPpkJasa:noPpkJasa
            }, function(response){
                $scope.dataPermohonan.namaDermagaAsal = response.content[0].namaLokasiAsal;
                $scope.dataPermohonan.kodeDermagaAsal  = response.content[0].kodeLokasiAsal;
                $scope.dataPermohonan.namaDermagaTujuan = response.content[0].namaLokasiTujuan; 
                $scope.dataPermohonan.kodeDermagaTujuan = response.content[0].kodeLokasiTujuan; 

                $scope.dataPermohonan.jenisPandu = response.content[0].jenisPandu;
                $scope.dataPermohonan.jenisGerakan = response.content[0].jenisGerakan;
                $scope.dataPermohonan.tglMulai = moment(response.content[0].tglMulai).format("DD-MM-YYYY");
                $scope.dataPermohonan.tglSelesai = moment(response.content[0].tglSelesai).format("DD-MM-YYYY");
                $scope.dataPermohonan.tahapanPandu1Tgl = moment($scope.dataPermohonan.tahapanPandu1).format("YYYY-MM-DD");
                $scope.dataPermohonan.tahapanPandu2Tgl = moment($scope.dataPermohonan.tahapanPandu2).format("YYYY-MM-DD");
                $scope.dataPermohonan.tahapanPandu3Tgl = moment($scope.dataPermohonan.tahapanPandu3).format("YYYY-MM-DD");
            });
        };
        //function for convert string utc to only hour minute
        $scope.convertStringUtcToHoursMinute = function(listItem) {

            //looping semua item
            for (var i = 0; i < listItem.length; i++) {
                if (listItem[i].tahapanPandu1 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu1Date = new Date(listItem[i].tahapanPandu1);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                    listItem[i].tahapanPandu1Jam = tahapanPandu1Date.getHours() < 10 ? '0'+tahapanPandu1Date.getHours() : tahapanPandu1Date.getHours();
                    listItem[i].tahapanPandu1Jam = tahapanPandu1Date.getMinutes() > 0 ? listItem[i].tahapanPandu1Jam + ':' + tahapanPandu1Date.getMinutes() : listItem[i].tahapanPandu1Jam + ':' + tahapanPandu1Date.getMinutes() + '0';
                    // listItem[i].tahapanPandu1Jam = tahapanPandu1Date.getHours()+':'+tahapanPandu1Date.getMinutes();
                }
                if (listItem[i].tahapanPandu2 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu2Date = new Date(listItem[i].tahapanPandu2);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu2Jam = tahapanPandu2Date.getHours() < 10 ? '0'+tahapanPandu2Date.getHours() : tahapanPandu2Date.getHours();
                    listItem[i].tahapanPandu2Jam = tahapanPandu2Date.getMinutes() > 0 ? listItem[i].tahapanPandu2Jam + ':' + tahapanPandu2Date.getMinutes() : listItem[i].tahapanPandu2Jam + ':' + tahapanPandu2Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu3 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu3Date = new Date(listItem[i].tahapanPandu3);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu3Jam = tahapanPandu3Date.getHours() < 10 ? '0'+tahapanPandu3Date.getHours() : tahapanPandu3Date.getHours();
                    listItem[i].tahapanPandu3Jam = tahapanPandu3Date.getMinutes() > 0 ? listItem[i].tahapanPandu3Jam + ':' + tahapanPandu3Date.getMinutes() : listItem[i].tahapanPandu3Jam + ':' + tahapanPandu3Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu4 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu4Date = new Date(listItem[i].tahapanPandu4);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu4Jam = tahapanPandu4Date.getHours() < 10 ? '0'+tahapanPandu4Date.getHours() : tahapanPandu4Date.getHours();
                    listItem[i].tahapanPandu4Jam = tahapanPandu4Date.getMinutes() > 0 ? listItem[i].tahapanPandu4Jam + ':' + tahapanPandu4Date.getMinutes() : listItem[i].tahapanPandu4Jam + ':' + tahapanPandu4Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu5 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu5Date = new Date(listItem[i].tahapanPandu5);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu5Jam = tahapanPandu5Date.getHours() < 10 ? '0'+tahapanPandu5Date.getHours() : tahapanPandu5Date.getHours();
                    listItem[i].tahapanPandu5Jam = tahapanPandu5Date.getMinutes() > 0 ? listItem[i].tahapanPandu5Jam + ':' + tahapanPandu5Date.getMinutes() : listItem[i].tahapanPandu5Jam + ':' + tahapanPandu5Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu6 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu6Date = new Date(listItem[i].tahapanPandu6);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu6Jam = tahapanPandu6Date.getHours() < 10 ? '0'+tahapanPandu6Date.getHours() : tahapanPandu6Date.getHours();
                    listItem[i].tahapanPandu6Jam = tahapanPandu6Date.getMinutes() > 0 ? listItem[i].tahapanPandu6Jam + ':' + tahapanPandu6Date.getMinutes() : listItem[i].tahapanPandu6Jam + ':' + tahapanPandu6Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu7 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu7Date = new Date(listItem[i].tahapanPandu7);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu7Jam = tahapanPandu7Date.getHours() < 10 ? '0'+tahapanPandu7Date.getHours() : tahapanPandu7Date.getHours();
                    listItem[i].tahapanPandu7Jam = tahapanPandu7Date.getMinutes() > 0 ? listItem[i].tahapanPandu7Jam + ':' + tahapanPandu7Date.getMinutes() : listItem[i].tahapanPandu7Jam + ':' + tahapanPandu7Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu8 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu8Date = new Date(listItem[i].tahapanPandu8);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu8Jam = tahapanPandu8Date.getHours() < 10 ? '0'+tahapanPandu8Date.getHours() : tahapanPandu8Date.getHours();
                    listItem[i].tahapanPandu8Jam = tahapanPandu8Date.getMinutes() > 0 ? listItem[i].tahapanPandu8Jam + ':' + tahapanPandu8Date.getMinutes() : listItem[i].tahapanPandu8Jam + ':' + tahapanPandu8Date.getMinutes() + '0';
                }
                if (listItem[i].tahapanPandu9 != null) {
                    //item dibuat jadi date dulu
                    var tahapanPandu9Date = new Date(listItem[i].tahapanPandu9);
                    
                    //datenya dijadikan string yang hanya jam dan menit saja
                     listItem[i].tahapanPandu9Jam = tahapanPandu9Date.getHours() < 10 ? '0'+tahapanPandu9Date.getHours() : tahapanPandu9Date.getHours();
                    listItem[i].tahapanPandu9Jam = tahapanPandu9Date.getMinutes() > 0 ? listItem[i].tahapanPandu9Jam + ':' + tahapanPandu9Date.getMinutes() : listItem[i].tahapanPandu9Jam + ':' + tahapanPandu9Date.getMinutes() + '0';
                }
            }

        };

        $scope.realisasiPandu = function (dataPermohonan) {
            if(dataPermohonan.flagDone ==2 ||dataPermohonan.tahapanPandu1Tgl + 'T' + dataPermohonan.tahapanPandu1Jam + ':' + '00' == null || dataPermohonan.tahapanPandu2Tgl + 'T' + dataPermohonan.tahapanPandu2Jam + ':' + '00'== null || dataPermohonan.tahapanPandu3Tgl + 'T' + dataPermohonan.tahapanPandu3Jam + ':' + '00'== null){
        
                Notification.setNotification($scope.setNotification); 
            }else{ 
            $scope.dataRealisasi(dataPermohonan);
            $timeout(function () {
                $scope.submitReaPandu();
            }, 1000);
            }
        };

        $scope.dataRealisasi = function (dataPermohonan) {
            $scope.desktopRea.flagApbs = null;
            $scope.desktopRea.jamKapalGerak = dataPermohonan.tahapanPandu2Tgl+ 'T' + dataPermohonan.tahapanPandu2Jam + ':' + '00';
            $scope.desktopRea.jamNaik = dataPermohonan.tahapanPandu1Tgl + 'T' + dataPermohonan.tahapanPandu1Jam + ':' + '00';
            $scope.desktopRea.jamTurun = dataPermohonan.tahapanPandu3Tgl + 'T' + dataPermohonan.tahapanPandu3Jam + ':' + '00';
            $scope.desktopRea.jenisGerakan = dataPermohonan.jenisGerakan;
            $scope.desktopRea.jenisPandu = dataPermohonan.jenisPandu;
            $scope.desktopRea.kodeLokasiPanduAsal = dataPermohonan.kodeDermagaAsal;
            $scope.desktopRea.kodeLokasiPanduTujuan = dataPermohonan.kodeDermagaTujuan;
            $scope.desktopRea.namaLokasiPanduAsal = dataPermohonan.namaDermagaAsal;
            $scope.desktopRea.namaLokasiPanduTujuan = dataPermohonan.namaDermagaTujuan;
            $scope.desktopRea.namaPandu = dataPermohonan.namaPetugasPandu;
            $scope.desktopRea.nipPandu = dataPermohonan.nipPetugasPandu;
            $scope.desktopRea.noPpkJasaPandu = dataPermohonan.noPpkJasaPandu;
            $scope.desktopRea.sign = null;
            $scope.desktopRea.tglMulaiPandu = dataPermohonan.tahapanPandu1Tgl + 'T' + dataPermohonan.tahapanPandu1Jam + ':' + '00';
            $scope.desktopRea.tglSelesaiPandu = dataPermohonan.tahapanPandu3Tgl + 'T' + dataPermohonan.tahapanPandu3Jam + ':' + '00';

            $scope.submitReaPandu();
        };

        $scope.submitReaPandu = function(){
            // api rea pandu desktop utk ngentry realisasi pandu di monitoring
             ReaPanduDesktopAdd.save($scope.desktopRea, function (response) {
                if (response) {
                    // api offline spk pandu utk ganti isSync jd 1
                    $scope.submitOfflineSpkPandu();

                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                    LoadingScreen.hide();
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            }); 
        };

        $scope.submitOfflineSpkPandu = function (){
            //update offline is sync
            $scope.dataPermohonan.isSync = 1;

            OfflineSpkPanduAdd.save($scope.dataPermohonan, function(response){
                if (response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                    LoadingScreen.hide();
                } else {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil disimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                }
            });
        };

        $scope.changeTanggalAwal = function() {
            $scope.currentDate = moment($scope.tglFilter, "DD-MM-YYYY").format("YYYY-MM-DD");
            //$scope.pageChanged(0);
        };
        
        $scope.pageChanged(0);
       

        $rootScope.$on('subscribeProgressPandu', function(event, data) {
            $scope.pageChanged(0);
            $scope.setNotification = {
                type: "success", //ex : danger, warning, success, info
                message: "Data monitoring pandu diperbarui"
            };
            Notification.setNotification($scope.setNotification);
        });

        $interval(function() {
        }, 300000);

        $rootScope.$on('subscribePetugasPandu', function(event, data) {
            //$scope.loadPetugas();
        });
 
    }]);

    