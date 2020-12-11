'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:BillingListCtrl
 * @description
 * # BillingListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('BillingListCtrl', ['$scope','$PAGE_SIZE','BillingList','BillingDelete','Notification','LoadingScreen',function ($scope,$PAGE_SIZE,BillingList,BillingDelete,Notification,LoadingScreen) {
	LoadingScreen.show();

	$scope.items = [];

	//start List and paging
    $scope.optionSizePage = {
	    availableOptions: [{number: 5},{number: 10},{number: 40},{number: 80}],
	    selectedOption: {number: 5} //default select option size
    };
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	$scope.pageChanged = function(newPage) {

		BillingList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? '' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'desc' : 'asc'))
			},
			function(response) {
				LoadingScreen.hide();
				$scope.currentPage = response.number + 1;
				console.log($scope.currentPage);
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = $scope.optionSizePage.selectedOption.number;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			}
		);
	}

	$scope.pageChanged(0);

	//function for filter
 	$scope.filtersText = "";
    var matchesFilter = function (item, filter) {
		var match = true;
		if (filter.id === 'kode') {
			match = item.kode.match(filter.value) !== null;
		} else if (filter.id === 'nama') {
			match = item.nama.match(filter.value) !== null;
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
				id: 'kode',
				title:  'Kode Formula',
				placeholder: 'Filter by kode formula...',
				filterType: 'text'
			},
			{
				id: 'nama',
				title:  'Nama Formula',
				placeholder: 'Filter by nama formula...',
				filterType: 'text'
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };


	//start function for delete
	$scope.deleteBilling = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			BillingDelete.delete({id:id},
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

}]);
