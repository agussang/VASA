'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterhargabbmListCtrl
 * @description
 * # MasterhargabbmListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
// ganti nama service 'MasterBBMList' , sesuaikan dengan nama service yang ada pada vasaapp.js
.controller('MasterhargabbmListCtrl', ['$scope','$filter','$PAGE_SIZE','HargaBBMList','HargaBBMDelete','Notification','LoadingScreen','UserRole',function ($scope,$filter,$PAGE_SIZE,HargaBBMList,HargaBBMDelete,Notification,LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();
	$scope.items = [];

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

		HargaBBMList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				LoadingScreen.hide();
			console.log(response);
			$scope.currentPage = response.number + 1;
			$scope.pageSize = $scope.optionSizePage.selectedOption.number;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = $scope.allItems;
			for (var i = 0; i<$scope.items.length; i++ ){

				$scope.items[i].status		= ($scope.items[i].status === true ?"AKTIF":"TIDAK AKTIF");
				console.log ($scope.items[i].status);
			}

			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			}
		);
	}

	$scope.pageChanged(0);
	//end List and paging

	//start function for filter
 	//filter
	var matchesFilter = function (item, filter) {
	var match = true;
	 if (filter.id === 'status') {
		match = item.status===filter.value;
	}else if (filter.id === 'harga') {
		match = item.harga===parseInt(filter.value);
	}else if (filter.id === 'tglBerlaku') {
		match = item.tglBerlaku.match(filter.value) !== null;
	}else if (filter.id === 'keterangan') {
		match = item.keterangan.match(filter.value) !== null;
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
			if(filters[0].type==='date'){
				filters[0].value = $filter('date')(filters[0].value, 'yyyy-MM-dd');
			}

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
				id: 'status',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
                filterValues: ['AKTIF', 'TIDAK AKTIF']
			},
			{
				id: 'harga',
				title:  'Harga BBM',
				placeholder: 'Filter by Harga BBM...',
				filterType: 'number',
                //filterValues: ['AKTIF', 'TIDAK AKTIF']
			},
			{
				id: 'tglBerlaku',
				title:  'Tgl. Berlaku',
				placeholder: 'Filter by Tgl. Berlaku...',
				filterType: 'date',

			},
			{
				id: 'keterangan',
				title:  'Keterangan',
				placeholder: 'Filter by Keterangan',
				filterType: 'text',

			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter

	//start function for delete
	$scope.deleteHargaBBM = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			HargaBBMDelete.delete({id:id},
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
