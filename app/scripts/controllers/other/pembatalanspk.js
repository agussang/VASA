'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:OtherProfilagenCtrl
 * @description
 * # OtherProfilagenCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('PembatalanSpkCtrl', ['$scope', '$window', 'PembatalanSpkList', '$PAGE_SIZE', 'BindApung', 'Notification', 'AppParam', 'LoadingScreen', 'UserRole', function ($scope, $window, PembatalanSpkList, $PAGE_SIZE, BindApung, Notification, AppParam, LoadingScreen, UserRole){
        $scope.userRole = UserRole.getCurrentRole();
        LoadingScreen.show();

        $scope.items = [];
        var varItems = [];
        $scope.filtersText = {};
        $scope.bindapung = BindApung;

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
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.pagingText = '';

        $scope.pageChanged = function (newPage) {
            PembatalanSpkList.get(
                {
                    size: $scope.optionSizePage.selectedOption.number,
                    page: newPage - 1,
                    sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function (response) {
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
        };

        $scope.pageChanged(0);

        //filter toolbar
        var matchesFilter = function (item, filter) {
            var match = true;
            if (filter.id === 'nomorSpk') {
                match = item.nomorSpk.toLowerCase().match(filter.value) !== null;
            } else if (filter.id === 'nomorPpk1') {
                match = item.nomorPpk1.match(filter.value) !== null;
            } else if (filter.id === 'nomorPpkJasaPandu') {
                match = item.nomorPpkJasaPandu.match(filter.value) !== null;
            } else if (filter.id === 'nomorPpkJasaTunda') {
                match = item.nomorPpkJasaTunda.match(filter.value) !== null;
            } else if (filter.id === 'nomorPpkJasaTambat') {
                match = item.nomorPpkJasaTambat.match(filter.value) !== null;
            } else if (filter.id === 'nomorSpkPandu') {
                match = item.nomorSpkPandu.match(filter.value) !== null;
            } else if (filter.id === 'nomorSpkTunda') {
                match = item.nnomorSpkTunda.match(filter.value) !== null;
            } else if (filter.id === 'nomorSpkTambat') {
                match = item.nomorSpkTambat.match(filter.value) !== null;
            } 
            return match;
        };

        var matchesFilters = function (item, filters) {
            var matches = true;

            filters.forEach(function (filter) {
                if (!matchesFilter(item, filter)) {
                    matches = false;
                    return false;
                }
            });
            return matches;
        };

        var applyFilters = function (filters) {
            $scope.items = [];
            if (filters && filters.length > 0) {
                $scope.allItems.forEach(function (item) {
                    if (matchesFilters(item, filters)) {
                        $scope.items.push(item);
                    }
                });
            } else {
                $scope.items = $scope.allItems;
            }
            $scope.filterConfig.resultsCount = $scope.items.length;
        };

        var filterChange = function (filters) {
            filters.forEach(function (filter) {
                $scope.filtersText += filter.title + " : " + filter.value + "\n";
            });
            applyFilters(filters);
        };

        $scope.filterConfig = {
            fields: [
                {
                    id: 'nomorSpk',
                    title: 'Nomor SPK',
                    placeholder: 'Filter by Nomor SPK...',
                    filterType: 'text'
                },
                {
                    id: 'nomorSpkPandu',
                    title: 'Nomor SPK Pandu',
                    placeholder: 'Filter by Nomor SPK Pandu...',
                    filterType: 'text'
                },
                {
                    id: 'nomorSpkTunda',
                    title: 'Nomor SPK Tunda',
                    placeholder: 'Filter by Nomor SPK Tunda...',
                    filterType: 'text'
                },
                {
                    id: 'nomorSpkTambat',
                    title: 'Nomor SPK Tambat',
                    placeholder: 'Filter by Nomor SPK Tambat...',
                    filterType: 'text'
                },
                {
                    id: 'nomorPpk1',
                    title: 'Nomor PPK1 ',
                    placeholder: 'Filter by Nomor PPK1...',
                    filterType: 'text'
                },
                {
                    id: 'nomorPpkJasaPandu',
                    title: 'Nomor PPK Jasa Pandu',
                    placeholder: 'Filter by Nomor Nomor PPK Jasa Pandu...',
                    filterType: 'text'
                },
                {
                    id: 'nomorPpkJasaTunda',
                    title: 'Nomor PPK Jasa Tunda',
                    placeholder: 'Filter by Nomor Nomor PPK Jasa Tunda...',
                    filterType: 'text'
                },
                {
                    id: 'nomorPpkJasaTambat',
                    title: 'Nomor PPK Jasa Tambat',
                    placeholder: 'Filter by Nomor Nomor PPK Jasa Tambat...',
                    filterType: 'text'
                }
            ],
            resultsCount: $scope.items.length,
            appliedFilters: [],
            onFilterChange: filterChange
        };

    }]);
