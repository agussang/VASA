'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JadwalPanduCtrl
 * @description
 * # DashboardPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('DashboardKepanduanCtrl', ['$scope', '$filter', '$timeout', '$interval', 'moment', 'LoadingScreen', 'Notification', 'UserRole', 'DashboardPandu', 'DermagaPanduList', function ($scope, $filter, $timeout, $interval, moment, LoadingScreen, Notification, UserRole, DashboardPandu, DermagaPanduList) {
        $scope.userRole = UserRole.getCurrentRole();
        $scope.indexDermaga = 0;
        
    
        var today = $filter('date')(new Date(),'yyyy-MM-dd');
        var tommorow = $filter('date')(new Date().setDate(new Date().getDate() + 2),'yyyy-MM-dd');
        var twoHours = 2 * 60 * 60 * 1000; /* ms */
        var tempArray = [];

        $scope.realtimeClock = function () {
            $scope.clock = $filter('date')(new Date(), "EEEE, dd MMMM yyyy HH:mm:ss")
        };

        $scope.realtimeClock();

        $interval(function () {
            $scope.realtimeClock();
        }, 1000);

        $interval(function () {
            $scope.loadData();
        }, 60000);

        Array.prototype.chunk = function (groupsize) {
            var sets = [], chunks, i = 0;
            chunks = this.length / groupsize;

            while (i < chunks) {
                sets[i] = this.splice(0, groupsize);
                i++;
            }
            return sets;
        };

        $scope.cekJamPenetapan = function (item) {
            var cekJamAkhir = moment(item.tglMulaiPandu) - moment(new Date)  < twoHours;
            //2 jam setelah saat ini
            return (cekJamAkhir);
        };

        $scope.cekKeterlambatan = function (item) {
            var cekKeterlambatan = moment(item.tglMulaiPandu) - moment(new Date) < 0;
            return (cekKeterlambatan);
        };
        
        $scope.sliceDermaga = function () {
            $timeout(function () {
                tempArray = $scope.dermaga.chunk(4);
                $scope.dermagaSize = tempArray.length;
                $scope.pageDisplay(0);
            }, 1000);
        };

        $scope.pageDisplay = function (index) {
            $scope.displayDermaga = tempArray[index];
        };

        $scope.prevPage = function (index) {
            index--;
            if (index == -1) {
                index = $scope.dermagaSize -1;
            }
            $scope.indexDermaga = index;
            $scope.pageDisplay(index);
        };

        $scope.nextPage = function (index) {
            index++;
            if (index == $scope.dermagaSize) {
                index = 0;
            }
            $scope.indexDermaga = index;
            $scope.pageDisplay(index);
        };

        $scope.loadData = function() {
            LoadingScreen.show();
            $scope.dermaga = [];
            DashboardPandu.get({tglAwal:today,tglAkhir:tommorow}, function(response) {
                $scope.penetapanPandu = $filter('orderBy')(response, 'tglMulaiPandu');
            });
        
            $timeout(function () {
                LoadingScreen.hide();
                DermagaPanduList.get({ size: 99 }, function (response) {
                    $scope.dermagaPandu = $filter('orderBy')(response.content,'lokasi');
                    $scope.dermagaPandu.forEach(function(data) {
                        data.panduMasuk = [];
                        data.panduKeluar = [];
                        $scope.penetapanPandu.forEach(function (element) {
                            if ($scope.cekKeterlambatan(element)) {
                                element.isLate = true;
                            } else {
                                element.isLate = false;
                            }
                            if (data.lokasi == element.namaDermagaTujuan && element.jenisGerakan == '1' && $scope.cekJamPenetapan(element)){
                                if ($scope.cekKeterlambatan(element)){
                                    element.isLate = false;
                                }
                                data.panduMasuk.push(element);
                                
                            }
                            if (data.lokasi == element.namaDermagaAsal && element.jenisGerakan == '3' && $scope.cekJamPenetapan(element)) {
                                data.panduKeluar.push(element);
                            }
                        }); 
                    });

                    $scope.dermagaPandu.forEach(function (data) {
                        if (data.panduMasuk.length > 0 || data.panduKeluar.length > 0) {
                            $scope.dermaga.push(data);
                        }
                    });
                    
                    $scope.sliceDermaga();
                });
            },500);
        };
        $scope.loadData();
    }]); 