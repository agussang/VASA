'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ManajemenAturankapaltundaCtrl
 * @description
 * # ManajemenAturankapaltundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('AturanKapalTundaListCtrl', ['$scope', '$timeout', '$location', '$window', 'AturanKapalTundaList', 'AturanKapalTundaDelete', 'AppParam', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', function($scope, $timeout, $location, $window, AturanKapalTundaList, AturanKapalTundaDelete, AppParam, $PAGE_SIZE, Notification, LoadingScreen, UserRole) {
        $scope.userRole = UserRole.getCurrentRole();
        LoadingScreen.show();
        //list data
        $scope.items = [];
        $scope.locationPath = '';
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
            // console.log(newPage);
            AturanKapalTundaList.get({
                    size: $scope.optionSizePage.selectedOption.number,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function(response) {
                    // console.log(response);
                    LoadingScreen.hide();
                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage - 1) * response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    $scope.allItems = response.content;
                    $scope.items = $scope.allItems;


                    $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage) + ' of ' + $scope.totalItems;
                });
        }

        //filter toolbar
        $scope.filtersText = "";
        var matchesFilter = function(item, filter) {
            var match = true;
            if (filter.id === 'panjangKapalMin') {
                match = item.panjangKapalMin === parseInt(filter.value);
            } else if (filter.id === 'panjangKapalMax') {
                match = item.panjangKapalMax === parseInt(filter.value);
            }
            return match;
        };

        var matchesFilters = function(item, filters) {
            var matches = true;

            filters.forEach(function(filter) {
                if (!matchesFilter(item, filter)) {
                    matches = false;
                    return false;
                }
            });
            return matches;
        };

        var applyFilters = function(filters) {
            $scope.items = [];
            if (filters && filters.length > 0) {
                $scope.allItems.forEach(function(item) {
                    if (matchesFilters(item, filters)) {
                        $scope.items.push(item);

                    }
                });
            } else {
                $scope.items = $scope.allItems;
            }
            $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var filterChange = function(filters) {
            filters.forEach(function(filter) {
                $scope.filtersText += filter.title + " : " + filter.value + "\n";
            });
            applyFilters(filters);
        };

        $scope.filterConfig = {
            fields: [{
                    id: 'panjangKapalMin',
                    title: 'Panjang Kapal Min',
                    placeholder: 'Filter by Panjang Kapal Min...',
                    filterType: 'number'
                },
                {
                    id: 'panjangKapalMax',
                    title: 'Panjang Kapal Max',
                    placeholder: 'Filter by Panjang Kapal Max...',
                    filterType: 'number'
                }
            ],
            resultsCount: $scope.items.length,
            appliedFilters: [],
            onFilterChange: filterChange
        };

        $scope.deleteAturankapaltunda = function(id) {
            var checkDelete = confirm('Apakah anda ingin menghapus data ?');
            if (checkDelete) {
                AturanKapalTundaDelete.delete({ id: id },
                    function(response) {
                        $scope.setNotification = {
                            type: "success",
                            message: "Data berhasil dihapus"
                        };
                        Notification.setNotification($scope.setNotification);
                        $scope.pageChanged(0);
                    },
                    function(response) {
                        $scope.setNotification = {
                            type: "warning",
                            message: "Data tidak berhasil dihapus"
                        };
                        Notification.setNotification($scope.setNotification);
                    }
                );
            }
        }


        $scope.pageChanged(0);
    }]);