'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:GrupPanduListCtrl
 * @description
 * # GrupPanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('GrupPanduListCtrl', ['$scope', '$location', '$PAGE_SIZE', 'GrupPanduList', 'GrupPanduDelete', 'LoadingScreen', 'KawasanPanduLevelDuaList', 'Notification', 'UserRole', function($scope, $location, $PAGE_SIZE, GrupPanduList, GrupPanduDelete, LoadingScreen, KawasanPanduLevelDuaList, Notification, UserRole) {
        LoadingScreen.show();
        $scope.userRole = UserRole.getCurrentRole();
        $scope.grupPanduList = [];

        KawasanPanduLevelDuaList.get(function(response) {
            $scope.kawasan = response;
        });

        $scope.$watch('idKawasan', function(newValue) {
            if (newValue !== undefined) {
                $scope.showTable = true;
                $scope.pageChanged(0);
            } else {
                $scope.showTable = false;
            }
        });

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
            GrupPanduList.get({
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
                    $scope.items.forEach(function(element) {
                        if (element.idKawasan === $scope.idKawasan) {
                            $scope.grupPanduList.push(element);
                        }
                    });
                });
        };
        $scope.pageChanged(0);

        $scope.deleteGrupPandu = function(idData) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                GrupPanduDelete.delete({ id: idData }, function(response) {
                    // console.log(response.$resolved);
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
            }

        };

    }]);