'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AturangerakpanduListCtrl
 * @description
 * # AturangerakpanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AturangerakpanduListCtrl', ['$scope','$PAGE_SIZE','AturanGerakPanduList','AturanGerakPanduDelete','Notification','MdmPelangganSearchByKode','LoadingScreen','UserRole', function ($scope,$PAGE_SIZE,AturanGerakPanduList,AturanGerakPanduDelete,Notification,MdmPelangganSearchByKode,LoadingScreen, UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();

	$scope.items=[];

	//start List and paging
    $scope.currentPage = 1;
	$scope.pageSize = $scope.setSizePage;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

	$scope.pageChanged = function(newPage) {
		AturanGerakPanduList.get(
			{
				size : $scope.pageSize,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				LoadingScreen.hide();
				$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;
				var active 		= "AKTIF";
				var non_active 	= "TIDAK AKTIF";
				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].flagAktif = ($scope.items[i].flagAktif===1 ?active:non_active);
				}
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			}
		);
	}

	$scope.pageChanged(0);
	//end List and paging

	//start function for filter
 	$scope.filtersText = "";
    var matchesFilter = function (item, filter) {
			var match = true;
			if (filter.id === 'namaLokasi') {
				match = item.namaLokasi.toLowerCase().match(filter.value.toLowerCase()) !== null;
			} else if (filter.id === 'flagAktif') {
				match = item.flagAktif === filter.value;
			}
			return match;
    };

    var matchesFilters = function (item, filters) {
			var matches = true;

			filters.forEach(function(filter) {
				console.log(filter);
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
				id: 'namaLokasi',
				title:  'Nama Lokasi',
				placeholder: 'Filter by nama lokasi...',
				filterType: 'text'
			},
			{
				id: 'flagAktif',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
                filterValues: ['AKTIF', 'TIDAK AKTIF']
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter

	$scope.searchNamaAgen =  function(kodeAgen){
		MdmPelangganSearchByKode.get({kode:kodeAgen,kodeTerminal : localStorage.getItem('kodeTerminal')}, function(response){
			return response.mplgNama;
		});
	}

}]);
