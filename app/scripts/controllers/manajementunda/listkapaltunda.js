'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ManajemenListkapaltundaCtrl
 * @description
 * # ManajemenListkapaltundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('ManajemenListkapaltundaCtrl', ['$scope', '$timeout', '$location', '$window', 'KapalTundaList', 'KapalTundaId', 'AddHistoryKapalTunda', 'AppParam', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', function($scope, $timeout, $location, $window, KapalTundaList, KapalTundaId, AddHistoryKapalTunda, AppParam, $PAGE_SIZE, Notification, LoadingScreen, UserRole) {
        $scope.userRole = UserRole.getCurrentRole();
        $scope.namaKapal = '';
        $scope.dataEdit = {};
        $scope.postEdit = {};

        LoadingScreen.show();

        $scope.switchDefault = true;
        $scope.items = [];
        $scope.locationPath = '';
        $scope.optionSizePage = {
            availableOptions: [{ number: 10 }, { number: 20 }, { number: 40 }, { number: 80 }],
            selectedOption: { number: $PAGE_SIZE } //default select option size
        };
        $scope.jamUbah = moment().format('HH:mm');
        $scope.tglUbah = new Date();

        $scope.$watch('tglUbah', function() {
            $('#statusTglUbah').mask('99-99-9999');
        });

        // PAGING
        $scope.optionSizePage = {
            availableOptions: [{ number: 10 }, { number: 20 }, { number: 40 }, { number: 80 }],
            selectedOption: { number: $PAGE_SIZE } //default select option size
        };

        $scope.currentPage = 1;

        $scope.pageSize = $scope.optionSizePage.selectedOption.number;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.pagingText = '';

        $scope.pageChanged = function(newPage) {
            KapalTundaList.get({
                    size: 999,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc')),
                    namaKapal: $scope.namaKapal
                },
                function(response) {
                    LoadingScreen.hide();
                    $scope.currentPage = response.number + 1;
                    $scope.pageSize = $scope.optionSizePage.selectedOption.number;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.items = $scope.allItems;

                    $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage) + ' of ' + $scope.totalItems;
                });
        }

        $scope.pageChanged(0);

        $scope.ubahStatus = function(id) {
            $('#ubahStatusKapal').modal('show');
            KapalTundaId.get({ kodeKapal: id }, function(response) {
                if (response !== undefined) {
                    $scope.dataEdit = response;
                    $scope.dataEdit.dataKapal = '(' + response.kodeKapal + ') ' + response.namaKapal;
                    if (response.statusOn == true) {
                        $scope.dataEdit.statusKapal = "ON";
                        $scope.dataEdit.statusUbah = "OFF";
                    } else {
                        $scope.dataEdit.statusKapal = "OFF";
                        $scope.dataEdit.statusUbah = "ON";
                    }
                } else {
                    dataEmpty();
                }
            }, function() {
                dataEmpty();
            });
        }

        //update history
        $scope.saveChanges = function() {
            LoadingScreen.show();
            $scope.postEdit.kodeKapal = $scope.dataEdit.kodeKapal;
            if ($scope.dataEdit.statusUbah == "ON") {
                $scope.postEdit.statusOn = true;
            } else if ($scope.dataEdit.statusUbah == "OFF") {
                $scope.postEdit.statusOn = false;
            }
            $scope.postEdit.keterangan = $scope.keterangan;
            // return;

            AddHistoryKapalTunda.save($scope.postEdit,
                function(response) {
                    LoadingScreen.hide();
                    if (response.$resolved) {
                        $scope.setNotification = {
                            type: "success", //ex : danger, warning, success, info
                            message: "Data berhasil tersimpan"
                        };
                        Notification.setNotification($scope.setNotification);
                        $scope.pageChanged(0);
                    } else {
                        $scope.setNotification = {
                            type: "warning", //ex : danger, warning, success, info
                            message: "Data tidak berhasil tersimpan"
                        };
                        Notification.setNotification($scope.setNotification);
                    }
                    $scope.buttonDisabled = false;
                    $scope.showLoader = false;
                },
                function(response) {
                    $scope.setNotification = {
                        type: "danger", //ex : danger, warning, success, info
                        message: "Koneksi tidak terhubung..."
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.buttonDisabled = false;
                    $scope.showLoader = false;
                });
        }

        $scope.cancel = function() {

        }

        $scope.goToHistory = function(kode) {
            $location.path('/manajementunda/historikapaltunda/' + kode);
        }


    }]);