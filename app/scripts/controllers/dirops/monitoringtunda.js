'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringTundaCtrl
 * @description
 * # ManajementundaMonitoringCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('MonitoringTundaViewCtrl', ['$scope', '$filter', '$timeout', '$location', '$window', '$interval', 'MonitoringJadwalTunda', 'KapalTundaList', 'AppParam', 'SuratPerintahKerjaTundaList', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', 'PublicMdmCabang', 'ListKawasan', function ($scope, $filter, $timeout, $location, $window, $interval, MonitoringJadwalTunda, KapalTundaList, AppParam, SuratPerintahKerjaTundaList, $PAGE_SIZE, Notification, LoadingScreen, UserRole, PublicMdmCabang, ListKawasan) {
        //list data

        $scope.userRole = UserRole.getCurrentRole();
        $scope.items = [];
        $scope.listKapalTunda = [];
        $scope.namaKapal = '';
        $scope.idCabang = localStorage.getItem('kodeCabang');
        $scope.idCabang = $scope.idCabang.length < 2 ? '0' + $scope.idCabang : $scope.idCabang;


        var currentDate = new Date();
        $scope.tanggalTunda = $filter('date')(new Date(), "dd-MM-yyyy");
        $scope.tomorrowsDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd');

        var setDisableDate = function () {
            $('#tglTunda').datepicker('setEndDate', moment($scope.tomorrowsDate, "YYYY-MM-DD").format("DD-MM-YYYY"));
            $('#tglTunda').mask('99-99-9999');
        };

        $scope.$watch('tglAwal', function () {
            $timeout(function () {
                setDisableDate();
            }, 500);
        });

        AppParam.get({ nama: 'CABANG_MONITORING' }, function (response) {
            $scope.listCabang = response.content;
        });

        $scope.getKawasan = function () {
            ListKawasan.get({
                kodeCabang: $scope.idCabang
            }, function (response) {
                $scope.listKawasan = response;
            });
        }

        $scope.$watch('idCabang', function (newValue, oldValue) {
            if ($scope.idCabang != oldValue) {
                $scope.idCabang = newValue;
            } else {
                $scope.idCabang = oldValue;
            }
        });

        $scope.changeCabang = function (val) {
            $scope.idCabang = val;
            for (var i = 0; i < $scope.listCabang.length; i++) {
                if ($scope.listCabang[i].kodeTerminal == val) {
                    $scope.namaCabang = $scope.listCabang[i].namaTerminal;
                    break;
                }
            }
            $scope.listSpk();
        };

        $scope.listSpk = function () {
            LoadingScreen.show();
            SuratPerintahKerjaTundaList.get({
                tglTunda: moment($scope.tanggalTunda, "DD-MM-YYYY").format("YYYY-MM-DD"),
                kodeCabang: $scope.idCabang
            }, function (response) {
                LoadingScreen.hide();
                $scope.items = response;
                $scope.items.forEach(function (element) {
                    element.jamTugOff = $filter('date')(element.tugOff, 'HH:mm');
                    element.jamTugFast = $filter('date')(element.tugFast, 'HH:mm');
                });
            });
        }

        $scope.listSpk();

        $interval(function () { $scope.listSpk(); }, 60000);

    }]);
