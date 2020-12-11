'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterMasaTambatListCtrl
 * @description
 * # MasterMasaTambatListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterMasaTambatListCtrl', ['$scope','$PAGE_SIZE','MasaTambatList','MasaTambatDelete','ItemMasaTambatDeleteAll','Notification','UserRole',function ($scope,$PAGE_SIZE,MasaTambatList,MasaTambatDelete,ItemMasaTambatDeleteAll,Notification,UserRole) {
	$scope.items=[];
	$scope.userRole = UserRole.getCurrentRole();

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
		MasaTambatList.get(
			{ 
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			}, 
			function(response) {
				console.log(response);
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
					$scope.items[i].flagGt		 		= ($scope.items[i].flagGt?active:non_active);
					$scope.items[i].flagJenisKapal 		= ($scope.items[i].flagJenisKapal?active:non_active);
					$scope.items[i].flagKemasan 		= ($scope.items[i].flagKemasan?active:non_active);
					$scope.items[i].flagPelayaran 		= ($scope.items[i].flagPelayaran?active:non_active);
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
		if (filter.id === 'flagGt') {
			match = item.flagGt === filter.value;
		} else if (filter.id === 'flagPelayaran') {
			match = item.flagPelayaran === filter.value;
		} else if (filter.id === 'flagKemasan') {
			match = item.flagKemasan === filter.value;
		} else if (filter.id === 'flagJenisKapal') {
			match = item.flagJenisKapal === filter.value;
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
				id: 'flagGt',
				title:  'Menggunakan GT',
				placeholder: 'Filter by GT...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'flagPelayaran',
				title:  'Menggunakan Pelayaran',
				placeholder: 'Filter by Menggunakan Pelayaran...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'flagKemasan',
				title:  'Menggunakan Kemasan',
				placeholder: 'Filter by Menggunakan Kemasan...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'flagJenisKapal',
				title:  'Menggunakan Jenis Kapal',
				placeholder: 'Filter by Menggunakan Jenis Kapal...',
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
	$scope.deleteMasatambat = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			MasaTambatDelete.delete({id:id},
				function(response){
					// console.log(response);
					if(response.$resolved == true){
						ItemMasaTambatDeleteAll.delete({id:id}, function(response1){
							// console.log(response1);
						});
					}
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
