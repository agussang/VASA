'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilagenCtrl
 * @description
 * # OtherProfilagenCtrl
 * Controller of the vasaApp
 */

 'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilagenCtrl
 * @description
 * # OtherProfilagenCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('JasaKapalCtrl', ['$scope', '$window', '$filter', '$timeout', '$http', 'JasaKapalExcel', '$PAGE_SIZE', 'Notification', 'AppParam', 'LoadingScreen', 'UserRole', 'moment', 'API_PATH', function ($scope, $window, $filter, $timeout, $http, JasaKapalExcel, $PAGE_SIZE, Notification, AppParam, LoadingScreen, UserRole, moment, API_PATH) {
        $scope.userRole = UserRole.getCurrentRole();
        
     
        var currentDate = new Date();
        $scope.tglReaAwal = $filter('date')(currentDate, "dd-MM-yyyy");
        $scope.tglReaAkhir = $filter('date')(currentDate, "dd-MM-yyyy");
        $scope.items = [];
        $scope.idCabang = localStorage.getItem('kodeCabang');
        $scope.idCabang = $scope.idCabang.length < 2 ? '0' + $scope.idCabang : $scope.idCabang;
        
        var setDisabletanggalApprovalAwal = function () {
            $('#tglReaAwal').datepicker('setEndDate', $scope.tglReaAkhir);
            $('#tglReaAwal').mask('99-99-9999');
        };

        var setDisabletanggalApprovalAkhir = function () {
            $('#tglReaAkhir').datepicker('setStartDate', $scope.tglReaAwal);
            $('#tglReaAkhir').mask('99-99-9999');
        };

        $scope.$watch('tglReaAwal', function (newValue) {
            $timeout(function () {
                setDisabletanggalApprovalAwal();
                setDisabletanggalApprovalAkhir();
            }, 100);
        });

        $scope.$watch('tglReaAkhir', function (newValue) {
            $timeout(function () {
                setDisabletanggalApprovalAwal();
                setDisabletanggalApprovalAkhir();
            }, 100);
        });

        // $scope.loadJasaKapal= function () {
        //     LoadingScreen.show();

        //     var tglReaAwal = moment($scope.tglReaAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
        //     var tglReaAkhir = moment($scope.tglReaAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');

        //     $scope.items = [];

        //     JasaKapalList.get(
        //         {
        //             kodeCabang: $scope.idCabang,
        //             tglAwalRea: tglReaAwal,
        //             tglAkhirRea: tglReaAkhir,
        //         },
        //         function (response) {
        //             LoadingScreen.hide();
        //             $scope.items = response;

        //         });

        // };

       // $scope.loadJasaKapal();

        $scope.generateExcel = function () {
            LoadingScreen.show();
            var tglReaAwal = moment($scope.tglReaAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tglReaAkhir = moment($scope.tglReaAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');
            var namaFile = '';
            var url = '';
            $http.get(API_PATH + 'permohonan/print_report_jasa_kapal?kodeCabang=' + $scope.idCabang + '&tglAwalRea=' + tglReaAwal +'&tglAkhirRea='+tglReaAkhir)
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
        // $scope.isRegional = function () {
        //     if (localStorage.getItem('kodeRegional')){
        //         return true;
        //     } 
        // }

        //add by Nurika to check regional or not
        $scope.isRegional = function () {
            if (localStorage.getItem('statusUser') == 'regional') {
                return true;
            }
        }

        $scope.generateExcelRegional = function () {
            LoadingScreen.show();
            var kodeRegional = localStorage.getItem('kodeRegional');
            var tglReaAwal = moment($scope.tglReaAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
            var tglReaAkhir = moment($scope.tglReaAkhir, 'DD-MM-YYYY').add(1, 'days').format('YYYY-MM-DD');
            var namaFile = '';
            var url = '';
            $http.get(API_PATH + 'public/permohonan/regional/print_report_jasa_kapal?kodeRegional=' + kodeRegional + '&tglAwalRea=' + tglReaAwal +'&tglAkhirRea='+tglReaAkhir)
                .success(function (response) {
                    if (response) {
                        LoadingScreen.hide();
                        namaFile = response;
                        url = API_PATH +'public/file/download?filename='+ namaFile;
                        window.open(url, '_blank');
                    }
                });
        };
    }]);
