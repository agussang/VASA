'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:dermagaPanduListCtrl
 * @description
 * # dermagaPanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('DermagaTambatListCtrl', ['$scope', '$location', '$route', '$PAGE_SIZE', 'DermagaTambatMappingList', 'DermagaTambatMappingDelete', 'DermagaTambatMappingEdit', 'DermagaTambatMappingDetail', 'GrupDermagaTambatList', 'MdmDermagaSearchByKode', 'MdmDermagaSearch', 'LoadingScreen', 'Notification', 'UserRole', function($scope, $location, $route, $PAGE_SIZE, DermagaTambatMappingList, DermagaTambatMappingDelete, DermagaTambatMappingEdit, DermagaTambatMappingDetail, GrupDermagaTambatList, MdmDermagaSearchByKode, MdmDermagaSearch, LoadingScreen, Notification, UserRole) {
        LoadingScreen.show();
        $scope.userRole = UserRole.getCurrentRole();
        $scope.dermagaTambat = {};
        $scope.optionSizePage = {
            availableOptions: [{ number: 10 }, { number: 20 }, { number: 40 }, { number: 80 }],
            selectedOption: { number: $PAGE_SIZE } //default select option size
        };

        // PAGING
        $scope.currentPage = 1;
        $scope.pageSize = $scope.optionSizePage.selectedOption.number;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;

        $scope.pageChanged = function(newPage) {
            $scope.grupPanduList = [];
            // console.log(newPage);
            DermagaTambatMappingList.get({
                    size: $scope.optionSizePage.selectedOption.number,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function(response) {
                    LoadingScreen.hide();
                    // console.log(response);

                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage - 1) * response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.items = $scope.allItems;
                    $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage) + ' of ' + $scope.totalItems;

                });
        };
        $scope.pageChanged(0);

        GrupDermagaTambatList.get(function(response) {
            $scope.grup = response.content;
            //console.log($scope.grup);
        });

        $scope.getListOfDermaga = function(value) {
            if (value && value.length <= 3) {
                return new Promise(function(resolve) {
                    MdmDermagaSearchByKode.get({
                            nama: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            } else if (value.length > 3) {
                return new Promise(function(resolve) {
                    MdmDermagaSearch.get({
                            nama: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            }
        };

        $scope.deleteDermagaTambatMapping = function(idData) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                DermagaTambatMappingDelete.delete({ id: idData }, function(response) {
                    // console.log(response.$resolved);
                    if (response.$resolved) {
                        $scope.setNotification = {
                            type: "success",
                            message: "Data berhasil dihapus"
                        };
                        $route.reload();
                    } else {
                        $scope.setNotification = {
                            type: "warning",
                            message: "Data tidak berhasil dihapus"
                        };
                    }
                    Notification.setNotification($scope.setNotification);
                });
            }
        };

        $scope.editDermagaTambatMapping = function(id) {
            console.log('yay');
            DermagaTambatMappingDetail.get({ id: id }, function(response) {
                    if (response !== undefined) {
                        $scope.dermagaTambat = response;
                        $scope.dermagaTambat.dermaga = response.namaDermaga;
                    } else {
                        dataEmpty();
                    }
                },
                function() {
                    dataEmpty();
                });
        }

        $scope.submit = function() {
            $scope.buttonDisabled = false;
            if (typeof($scope.dermagaTambat.dermaga) == 'object') {
                $scope.dermagaTambat.namaDermaga = $scope.dermagaTambat.dermaga.mdmgNama;
                $scope.dermagaTambat.kodeDermaga = $scope.dermagaTambat.dermaga.mdmgKode;
            }

            DermagaTambatMappingEdit.update({ id: $scope.dermagaTambat.id }, $scope.dermagaTambat,
                function(response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.pageChanged(0);
                    $location.path('/dermagatambat/list');
                },
                function(response) {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.buttonDisabled = false;
                    $scope.showLoader = false;
                }
            );
        };

    }]);