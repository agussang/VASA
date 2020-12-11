'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterSDMKapalListCtrl
 * @description
 * # MasterSDMKapalListCtrl
 * Controller of the vasaApp
 */

 angular.module('vasaApp')
.controller('MasterSDMKapalListCtrl',['$scope','$PAGE_SIZE','MasterSDMKapalList','MasterSDMKapalDelete','Notification',function ($scope,$PAGE_SIZE,MasterSDMKapalList, MasterSDMKapalDelete,Notification) {
	$scope.items =[];

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
	$scope.paggingText = '';

	$scope.pageChanged = function(newPage) {
		MasterSDMKapalList.get(
			{ 
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			}, 
			function(response) {
				$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;
				var active 		= "YA";
				var non_active 	= "TIDAK";

				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].aktif = ($scope.items[i].aktif?active:non_active);
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
		if (filter.id === 'nip') {
			match = item.nip === filter.value;
		} else if (filter.id === 'nama') {
			match = item.nama === filter.value;
		} else if (filter.id === 'idNumber') {
			match = item.idNumber.match(filter.value) !== null;
		} else if (filter.id === 'jabatan1') {
			match = item.jabatan1.match(filter.value) !== null;
		} else if (filter.id === 'jabatan2') {
			match = item.jabatan2.match(filter.value) !== null;
		} else if (filter.id === 'kode') {
			match = item.kode.match(filter.value) !== null;
		} else if (filter.id === 'aktif') {
			match = item.aktif === filter.value;
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
				id: 'nip',
				title:  'NIP',
				placeholder: 'Filter by NIP...',
				filterType: 'text'
			},
			{
				id: 'nama',
				title:  'Nama',
				placeholder: 'Filter by Nama...',
				filterType: 'text'
			},
			{
				id: 'idNumber',
				title:  'ID',
				placeholder: 'Filter by ID...',
				filterType: 'text'
			},
			{
				id: 'jabatan1',
				title:  'Jabatan 1',
				placeholder: 'Filter by jabatan 1...',
				filterType: 'text'
			},
			{
				id: 'jabatan2',
				title:  'Jabatan 2',
				placeholder: 'Filter by jabatan 2...',
				filterType: 'text'
			},
			{
				id: 'kode',
				title:  'Kode',
				placeholder: 'Filter by kode...',
				filterType: 'text'
			},
			{
				id: 'aktif',
				title:  'Aktif',
				placeholder: 'Filter by aktif...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			} 
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter 

	//start function for delete
	$scope.deleteMasterSDMKapal = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			MasterSDMKapalDelete.delete({id:id},
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
