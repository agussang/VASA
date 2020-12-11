'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MartersurchargetundaListCtrl
 * @description
 * # MartersurchargetundaListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MartersurchargetundaListCtrl', ['$scope', '$PAGE_SIZE', 'MasterSurchargeTundaList','MasterSurchargeTundaDelete','Notification','LoadingScreen','UserRole',function ($scope, $PAGE_SIZE, MasterSurchargeTundaList, MasterSurchargeTundaDelete,Notification, LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();
	$scope.items=[];

	//start List and paging
	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };
  $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	$scope.pageChanged = function(newPage) {
		MasterSurchargeTundaList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
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
					$scope.items[i].status = ($scope.items[i].status?active:non_active);
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
		if (filter.id === 'nomor') {
			match = item.nomor === parseInt(filter.value);
		} else if (filter.id === 'tglBerlaku') {
			match = item.tglBerlaku.match(filter.value) !== null;
		} else if (filter.id === 'surcharge') {
			match = item.surcharge === parseInt(filter.value);
		} else if (filter.id === 'hargaMin') {
			match = item.hargaMin === parseInt(filter.value);
		} else if (filter.id === 'hargaMax') {
			match = item.hargaMax === parseInt(filter.value);
		} else if (filter.id === 'gtMin') {
			match = item.gtMin === parseInt(filter.value);
		} else if (filter.id === 'gtMax') {
			match = item.gtMax === parseInt(filter.value);
		} else if (filter.id === 'keterangan') {
			match = item.keterangan.toLowerCase().match(filter.value.toLowerCase()) !== null;
		} else if (filter.id === 'status') {
			match = item.status === filter.value;
		}
		return match;
    };

    var matchesFilters = function (item, filters) {
		var matches = true;

		filters.forEach(function(filter) {
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
				id: 'nomor',
				title:  'Nomor',
				placeholder: 'Filter by Nomor...',
				filterType: 'text'
			},

			{
				id: 'tglBerlaku',
				title:  'Tgl. Berlaku',
				placeholder: 'Filter by Tgl. Berlaku...',
				filterType: 'date'
			},
			{
				id: 'hargaMin',
				title:  'Harga Min.',
				placeholder: 'Filter by Harga Min. ...',
				filterType: 'text'
			},
			{
				id: 'hargaMax',
				title:  'Harga Max.',
				placeholder: 'Filter by Harga Max. ...',
				filterType: 'text'
			},
			{
				id: 'gtMin',
				title:  'GT Min.',
				placeholder: 'Filter by GT Min. ...',
				filterType: 'text'
			},
			{
				id: 'gtMax',
				title:  'GT Max.',
				placeholder: 'Filter by GT Max. ...',
				filterType: 'text'
			},
			{
				id: 'surcharge',
				title:  'Fuel Surcharge',
				placeholder: 'Filter by Fuel Surcharge...',
				filterType: 'text'
			},
			{
				id: 'keterangan',
				title:  'Keterangan',
				placeholder: 'Filter by Keterangan...',
				filterType: 'text'
			},
			{
				id: 'status',
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

	//start function for delete
    $scope.deleteMasterSurchargeTunda = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			MasterSurchargeTundaDelete.delete({id:id},
				function(response){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.pageChanged(0);
				},
				function(response){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}
			);
		}
	}
	//end function for delete
}]);
