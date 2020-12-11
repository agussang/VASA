'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilagenCtrl
 * @description
 * # OtherProfilagenCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('SilaporCtrl', ['$scope', '$window', '$filter', '$timeout', '$http', 'SilaporList', 'SilaporExcel', '$PAGE_SIZE', 'Notification', 'AppParam', 'LoadingScreen', 'UserRole', 'moment', 'API_PATH', function ($scope, $window, $filter, $timeout, $http, SilaporList, SilaporExcel, $PAGE_SIZE, Notification, AppParam, LoadingScreen, UserRole, moment, API_PATH) {
        $scope.userRole = UserRole.getCurrentRole();
     
        var currentDate = new Date();
        $scope.tanggalApprovalAwal = $filter('date')(currentDate, "dd-MM-yyyy");
        $scope.tanggalApprovalAkhir = $filter('date')(currentDate, "dd-MM-yyyy");
        $scope.items = [];
        $scope.idCabang = localStorage.getItem('kodeCabang');
        $scope.idTerminal = localStorage.getItem('kodeTerminalBaru');
        $scope.statusUser = localStorage.getItem('statusUser');
        //$scope.idCabang = $scope.idCabang.length < 2 ? '0' + $scope.idCabang : $scope.idCabang;
        
        var setDisabletanggalApprovalAwal = function () {
            $('#tanggalApprovalAwal').datepicker('setEndDate', $scope.tanggalApprovalAkhir);
            $('#tanggalApprovalAwal').mask('99-99-9999');
        };

        var setDisabletanggalApprovalAkhir = function () {
            $('#tanggalApprovalAkhir').datepicker('setStartDate', $scope.tanggalApprovalAwal);
            $('#tanggalApprovalAkhir').mask('99-99-9999');
        };

        $scope.$watch('tanggalApprovalAwal', function (newValue) {
            $timeout(function () {
                setDisabletanggalApprovalAwal();
                setDisabletanggalApprovalAkhir();
            }, 100);
        });

        $scope.$watch('tanggalApprovalAkhir', function (newValue) {
            $timeout(function () {
                setDisabletanggalApprovalAwal();
                setDisabletanggalApprovalAkhir();
            }, 100);
        });

        $scope.loadSilapor= function () {
            LoadingScreen.show();

            var tanggalApprovalAwal = moment($scope.tanggalApprovalAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tanggalApprovalAkhir = moment($scope.tanggalApprovalAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');

            $scope.items = [];

            if (localStorage.getItem('statusUser') == 'regional') {
                $scope.idTerminal = null;
            }
            
            SilaporList.get(
                {
                    kodeCabang: $scope.idCabang,
                    tglMulaiApproval: tanggalApprovalAwal,
                    tglSelesaiApproval: tanggalApprovalAkhir,
                    kodeTerminal: $scope.idTerminal,
                },
                function (response) {
                    LoadingScreen.hide();
                    $scope.items = response;

                });

            

            
        };

        $scope.loadSilapor();

        /*
        $scope.generateExcel = function () {
            var tglMulaiApproval = $filter('uppercase')($scope.tanggalApprovalAwal);
            var tglSelesaiApproval = $filter('uppercase')($scope.tanggalApprovalAwal);

            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById('tabel-silapor');

            var blob = new Blob([document.getElementById('tabel-silapor').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, 'Laporan Silapor - ' + tglMulaiApproval + ' - ' + tglSelesaiApproval + '.xlsx');
        }; */

        $scope.generateExcel = function () {
            LoadingScreen.show();
            var kodeTerminal = localStorage.getItem('kodeTerminalBaru');
            var tanggalApprovalAwal = moment($scope.tanggalApprovalAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tanggalApprovalAkhir = moment($scope.tanggalApprovalAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');
            var namaFile = '';
            var url = '';
            $http.get(API_PATH + 'public/permohonan/report_silapor?kodeCabang=' + $scope.idCabang + '&kodeTerminal=' +   kodeTerminal + '&tglMulaiApproval=' + tanggalApprovalAwal +'&tglSelesaiApproval='+tanggalApprovalAkhir)
                .success(function (response) {
                    if (response) {
                        LoadingScreen.hide();
                        namaFile = response;
                        url = API_PATH +'public/file/download?filename='+ namaFile;
                        window.open(url, '_blank');
                    }
                });
        };

        //add by Nurika to check regional or not
        $scope.isRegional = function () {
            if (localStorage.getItem('statusUser') == 'regional') {
                return true;
            }
        }

        $scope.generateExcelRegional = function () {
            LoadingScreen.show();
            var kodeRegional = localStorage.getItem('kodeRegional');
            var tanggalApprovalAwal = moment($scope.tanggalApprovalAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tanggalApprovalAkhir = moment($scope.tanggalApprovalAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');
            var namaFile = '';
            var url = '';
            $http.get(API_PATH + 'public/permohonan/regional/report_silapor?kodeRegional=' + kodeRegional + '&tglMulaiApproval=' + tanggalApprovalAwal +'&tglSelesaiApproval='+tanggalApprovalAkhir)
                .success(function (response) {
                    console.log(response);
                    if (response) {
                        LoadingScreen.hide();
                        namaFile = response;
                        url = API_PATH +'public/file/download?filename='+ namaFile;
                        window.open(url, '_blank');
                    }
                });
        };
    }]);
