'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasTambatListCtrl
 * @description
 * # PetugasTambatListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('MasterPilotListCtrl', ['$scope', '$location', '$PAGE_SIZE', 'MasterPilotShuttleCarList','MasterPilotBoatList', 'LoadingScreen','CarDelete','BoatDelete', 'Notification', 'UserRole', function($scope, $location, $PAGE_SIZE, MasterPilotShuttleCarList, MasterPilotBoatList, LoadingScreen, CarDelete, BoatDelete, Notification, UserRole) {
        LoadingScreen.show();
        $scope.userRole = UserRole.getCurrentRole();
        $scope.optionSizePage = {
            availableOptions: [{ number: 10 }, { number: 20 }, { number: 40 }, { number: 80 }],
            selectedOption: { number: $PAGE_SIZE } //default select option size
        };

        $scope.masterpilot = {};
        $scope.masterpilot.jnsKendaraan = '';

        // PAGING
        $scope.currentPage = 1;
        $scope.pageSize = $scope.optionSizePage.selectedOption.number;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.masterPilotList = [];

        $scope.pageChanged = function(newPage) {
            $scope.masterpilot.jnsKendaraan;

            MasterPilotShuttleCarList.get({
                    size: $scope.optionSizePage.selectedOption.number,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function(response) {
                    LoadingScreen.hide();

                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage - 1) * response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.items = $scope.allItems;
                    $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
                        $scope.currentPage) + ' of ' + $scope.totalItems;
                    for (var i = 0; i < $scope.items.length; i++) {
                        $scope.masterPilotList.push(
                            {
                                jnsKendaraan : 'Shuttle Car', 
                                id          : $scope.items[i].id,
                                platNomor   : $scope.items[i].platNomor,
                                jenisMobil  : $scope.items[i].jenisMobil,
                                warna       : $scope.items[i].warna,
                                lastUpdated : $scope.items[i].created,
                                kodeKapal   : '-',
                                namaKapal   : '-'
                            }
                        );      
                    }
                });

            MasterPilotBoatList.get({
                    size: $scope.optionSizePage.selectedOption.number,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function(response) {
                    LoadingScreen.hide();

                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage - 1) * response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.items = $scope.allItems;
                    $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
                        $scope.currentPage) + ' of ' + $scope.totalItems;
                    for (var i = 0; i < $scope.items.length; i++) {
                        $scope.masterPilotList.push(
                            {
                                jnsKendaraan : 'Boat', 
                                id          : $scope.items[i].id,
                                platNomor   : '-',
                                jenisMobil  : '-',
                                warna       : '-',
                                kodeKapal   : $scope.items[i].kodeKapal,
                                namaKapal   : $scope.items[i].namaKapal, 
                                lastUpdated : $scope.items[i].created
                            }
                        );      
                    }
                });
        }
        $scope.pageChanged(0);

        $scope.deleteMasterPilot = function(item) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                if (item.jnsKendaraan == 'Shuttle Car') {
                    CarDelete.delete({ id: item.id }, function(response) {
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
                    $scope.masterPilotList = [];
                    $scope.pageChanged(0);
                });

                } else {
                    BoatDelete.delete({ id: item.id }, function(response) {
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
                    $scope.masterPilotList = [];
                    $scope.pageChanged(0);
                });

                }
            }
        };

    }]);