'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringPanduCtrl
 * @description
 * # MonitoringPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('MonitoringKepanduanCtrl', ['$scope', '$PAGE_SIZE', '$filter', '$rootScope', '$interval', '$timeout', 'ProgressSpk', 'MonitoringPetugasPandu', 'LoadingScreen', 'moment', 'UserRole', 'ProgressSpkEdit', 'ProgressSpkAdd', 'Notification', 'TahapanPanduList', 'PublicMdmCabang', 'ListKawasan','AppParam',function ($scope, $PAGE_SIZE, $filter, $rootScope, $interval, $timeout, ProgressSpk, MonitoringPetugasPandu, LoadingScreen, moment, UserRole, ProgressSpkEdit, ProgressSpkAdd, Notification, TahapanPanduList, PublicMdmCabang, ListKawasan, AppParam) {
        LoadingScreen.show();
        $scope.userRole = UserRole.getCurrentRole();
        $scope.addJamAktivitas = {};
        $scope.tahapanPandu = {};
        $scope.jamAktivitas = {};
        $scope.displayPetugasPandu = [];
        $scope.monitoringPandu = [];
        $scope.indexPandu = 1;
        $scope.idCabang = localStorage.getItem('kodeCabang');
        $scope.idCabang = $scope.idCabang.length < 2 ? '0' + $scope.idCabang : $scope.idCabang;

        var tempArray = [];
        var currentDate = new Date();
        var tanggalPandu = $filter('date')(currentDate, 'yyyy-MM-dd');
        var tomorrowsDate = moment($scope.tomorrowsDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        
        $scope.tglFilter = $filter('date')(currentDate, 'dd-MM-yyyy');
        $scope.currentDate = $filter('date')(currentDate, 'yyyy-MM-dd');
        $scope.tomorrowsDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd');

        var setDisableDate = function() {
            $('#tglAwal').datepicker('setEndDate', tomorrowsDate);
            $('#tglAwal').mask('99-99-9999');
        };

        AppParam.get({ nama: 'CABANG_MONITORING' }, function (response) {
            $scope.listCabang = response.content;
        });

        $scope.getKawasan = function () {
            ListKawasan.get({
                kodeCabang: $scope.idCabang
            }, function (response) {
                $scope.listKawasan = response;
            });
        };

        $scope.$watch('idCabang', function (newValue, oldValue) {
            if ($scope.idCabang != oldValue) {
                $scope.idCabang = newValue;
            } else {
                $scope.idCabang = oldValue;
            }
        });

        Array.prototype.chunk = function(groupsize){
            var sets = [], chunks, i = 0;
            chunks = this.length / groupsize;

            while(i < chunks){
                sets[i] = this.splice(0,groupsize);
	            i++;
            }
            return sets;
        };

        $scope.realtimeClock = function(){
            $scope.clock = $filter('date')(new Date(),"EEEE, dd MMMM yyyy HH:mm:ss")
        }

        $scope.realtimeClock();
       
        $scope.$watch('tglAwal', function() {
            $timeout(function() {
                setDisableDate();
            }, 1000);
        });

        $scope.changeCabang = function (val) {
            $scope.idCabang = val;
            for (var i = 0; i < $scope.listCabang.length; i++) {
                if ($scope.listCabang[i].kodeTerminal == val) {
                    $scope.namaCabang = $scope.listCabang[i].namaTerminal;
                    break;
                }
            }
            $scope.loadPetugas();
        };

        $scope.loadPetugas = function() {
            $scope.monitoringPandu = [];
            MonitoringPetugasPandu.get({
                tglPandu: tanggalPandu,
                kodeCabang: $scope.idCabang
            }, function(response) {
                 response = $filter('orderBy') ( response,'petugasPandu.namaPetugas');
                for (var i = 0; i < response.length; i++) {
                    if ($scope.searchPanduByShift(response[i].petugasPandu)) {
                        $scope.monitoringPandu.push(response[i]);
                        if (response[i].statusAbsen == 1) {
                            response[i].statusAbsenText = 'ON';
                        } else {
                            response[i].statusAbsenText = 'OFF';
                        }
                    }
                }
                $scope.slicePandu();
            });
            LoadingScreen.hide();
        };

        $scope.pageDisplay = function (index) {
            $scope.displayPetugasPandu = tempArray[index];
            return index;
        };

        $scope.slicePandu = function () {
            $timeout(function () {
                tempArray = $scope.monitoringPandu.chunk(12);
                $scope.panduSize = tempArray.length;
                $scope.pageDisplay(0);
            }, 1000);  
            $scope.rotator();  
        };

        $scope.rotator = function () {   
            $interval(function () {
                if ($scope.indexPandu == tempArray.length) {
                    $scope.indexPandu = 0;
                }
                $scope.pageDisplay($scope.indexPandu++);
            }, 30000);
        };

        $scope.prevPage = function (index) {
            index--;
            if(index == 0 ) {
                index = $scope.panduSize ;
                $scope.pageDisplay(index-1);
            }  else {
                $scope.pageDisplay(index-1);
            }
            $scope.indexPandu = index;
        };

        $scope.nextPage = function (index) {
            index++;
            if (index == $scope.panduSize+1) {
                index = 1;
                $scope.pageDisplay(index-1);
            } else {
                $scope.pageDisplay(index-1);
            }
            $scope.indexPandu = index;
        };
            
        $scope.searchPanduByShift = function(item) {
            var cekJamMulai = moment().isAfter(item.jamMulaiPandu)
            var cekJamSelesai = moment().isSameOrBefore(item.jamSelesaiPandu)
            return (cekJamMulai && cekJamSelesai)
        };

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
        }, 180000);

        $interval(function() {   
            $scope.realtimeClock();
        }, 1000);

        
        $rootScope.$on('subscribePetugasPandu', function(event, data) {
           // $scope.loadPetugas();
        });
        
    }]);