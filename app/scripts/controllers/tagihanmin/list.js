'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TagihanMinListCtrl
 * @description
 * # TagihanMinListCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('TagihanMinListCtrl',['$scope','TagihanMinList','LoadingScreen','UserRole','$PAGE_SIZE','TagihanMinDelete','Notification','AppParam',function($scope,TagihanMinList,LoadingScreen,UserRole,$PAGE_SIZE,TagihanMinDelete,Notification,AppParam){
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
		TagihanMinList.get(
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
				var active 		= "YA";
				var non_active 	= "TIDAK";

				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].tagihanMin 	= ($scope.items[i].tagihanMin != null?$scope.items[i].tagihanMin:'-');
					$scope.items[i].valuta 		= ($scope.items[i].valuta != null?$scope.items[i].valuta:'-');
					$scope.items[i].kodeAktif 	= ($scope.items[i].kodeAktif != null?($scope.items[i].kodeAktif == '1' ? 'AKTIF':'TIDAK AKTIF'):'-');
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
    	// console.log(filter.value);
		var match = true;
		if (filter.id === "tagihanMin") {
			match = item.tagihanMin === parseInt(filter.value);
		} else if (filter.id === 'valuta') {
			match = item.valuta === filter.value;
		} else if (filter.id === 'kodeAktif') {
			match = item.kodeAktif === filter.value;
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
				id: 'tagihanMin',
				title:  'Tagihan Min.',
				placeholder: 'Filter by Tagihan Min....',
				filterType: 'number',
				filterValues: []
			},
			{
				id: 'valuta',
				title:  'Valuta',
				placeholder: 'Filter by Valuta...',
				filterType: 'select'
			},
			{
				id: 'kodeAktif',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
				filterValues: ['AKTIF','TIDAK AKTIF']
			}
		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};

	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.valuta.push(response.content[i].value);
			$scope.filterConfig.fields[1].filterValues = $scope.valuta;
		}
	});

	//delete
	$scope.deleteTagihan = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			TagihanMinDelete.delete({id:idData},function(response){
				if(response.status != '500'){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.pageChanged(0);
				}else{
					$scope.setNotification  = {
						type	: "danger",
						message	: "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}

			});
		}

	}
}])