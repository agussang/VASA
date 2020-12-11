'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDermagaKepilListCtrl
 * @description
 * # MasterDermagaKepilListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterDermagaKepilListCtrl', ['$scope','$window','MasterDermagaKepilList','MasterDermagaKepilDelete','$PAGE_SIZE','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$window,MasterDermagaKepilList,MasterDermagaKepilDelete,$PAGE_SIZE, Notification, AppParam,LoadingScreen,UserRole) {
LoadingScreen.show();
$scope.userRole = UserRole.getCurrentRole();

$scope.items=[];
var varItems = [];
$scope.filtersText={};

//Delete
$scope.deleteMasterKepil = function(idData){
	var checkDelete = confirm('Apakah anda ingin menghapus data?');
	if(checkDelete){
		MasterDermagaKepilDelete.delete({id:idData},function(response){
			// console.log(response.$resolved);
			if(response.$resolved){
				$scope.setNotification  = {
					type	: "success",
					message	: "Data berhasil dihapus"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Data tidak berhasil dihapus"
				};
			}
			Notification.setNotification($scope.setNotification);
			$scope.pageChanged(0);

		});
	}

};



	// PAGING
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
	$scope.pagingText = '';

	$scope.pageChanged = function(newPage) {
		MasterDermagaKepilList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'id,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				LoadingScreen.hide();
				// console.log(response);
				$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;

				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].flagAktif 		= ($scope.items[i].flagAktif === 1 ?"YA":"TIDAK");
					$scope.items[i].namaKodeDermaga		= $scope.items[i].namaDermaga +' ('+ $scope.items[i].kodeDermaga+')';
				}

					$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

		});
	};

	$scope.pageChanged(0);

	//filter toolbar
	var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'kodeDermaga') {
		match = item.kodeDermaga.match(filter.value) !== null;
	} else if (filter.id === 'jenisJasa') {
		match = item.jenisJasaText.match(filter.value) !== null;
	} else if (filter.id === 'namaDermaga') {
		match = item.namaDermaga.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'aktif') {
		match = item.flagAktif===filter.value;
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
			id: 'kodeDermaga',
			title:  'Kode Dermaga',
			placeholder: 'Filter by Kode Dermaga...',
			filterType: 'text'
		},
		{
			id: 'namaDermaga',
			title:  'Nama Dermaga',
			placeholder: 'Filter by Nama Dermaga...',
			filterType: 'text'
		},
		{
			id: 'aktif',
			title:  'Aktif',
			placeholder: 'Filter by Aktif...',
			filterType: 'select',
				filterValues:['YA','TIDAK']
		}
			],
	resultsCount: $scope.items.length,
	appliedFilters: [],
	onFilterChange: filterChange
	};

}]);
