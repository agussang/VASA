'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterListCtrl
 * @description
 * # KapalCharterListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('KapalCharterListCtrl', ['$scope','$window','$filter','KapalCharterList','KapalCharterDelete','$PAGE_SIZE','Notification','MdmPelangganDetail','AppParam','LoadingScreen','UserRole',function ($scope,$window,$filter,KapalCharterList,KapalCharterDelete,$PAGE_SIZE,Notification,MdmPelangganDetail,AppParam,LoadingScreen, UserRole) {
$scope.userRole = UserRole.getCurrentRole();
LoadingScreen.show();
$scope.items=[];
var varItems = [];
$scope.filtersText = "";



	//filter
	var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'kodeKapal') {
		match = item.kodeKapal.match(filter.value) !== null;
	} else if (filter.id === 'namaKapal') {
		match = item.namaKapal.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'perusahaan') {
		match = item.kantorIdText.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'tglMulaiBerlaku') {
		match = item.tglMulaiBerlaku.match(filter.value) !== null;
	} else if (filter.id === 'tglSelesaiBerlaku') {
		match = item.tglSelesaiBerlaku.match(filter.value) !== null;
	} else if (filter.id === 'status') {
		match = item.status===filter.value;
	}	else if (filter.id === 'dokCharter') {
		match = item.dokCharter.match(filter.value) !== null;
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
			id: 'kodeKapal',
			title:  'Kode Kapal',
			placeholder: 'Filter by Kode Kapal...',
			filterType: 'text'
		},
		{
			id: 'namaKapal',
			title:  'Nama Kapal',
			placeholder: 'Filter by Nama Kapal...',
			filterType: 'text'
		},
		{
			id: 'perusahaan',
			title:  'Perusahaan',
			placeholder: 'Filter by Perusahaan...',
			filterType: 'text'
		},
		{
			id: 'tglMulaiBerlaku',
			title:  'Tgl. Mulai Berlaku',
			placeholder: 'Filter by Tgl. Mulai Berlaku...',
			filterType: 'date'
		},
		{
			id: 'tglSelesaiBerlaku',
			title:  'Tgl. Selesai Berlaku',
			placeholder: 'Filter by Tgl. Selesai Berlaku...',
			filterType: 'date'
		},
		{
			id: 'status',
			title:  'Status',
			placeholder: 'Filter by Status...',
			filterType: 'select',
			filterValues: ['AKTIF','TIDAK AKTIF']
		},
		// {
		// 	id: 'dokCharter',
		// 	title:  'Dok Charter',
		// 	placeholder: 'Filter by Dok Charter...',
		// 	filterType: 'text'
		// },

			],
	resultsCount: $scope.items.length,
	appliedFilters: [],
	onFilterChange: filterChange
	};

//deleteKapalCharter
	$scope.deleteKapalCharter = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			KapalCharterDelete.delete({id:idData},function(response){
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

	}

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
		KapalCharterList.get(
		{
			size : $scope.optionSizePage.selectedOption.number,
			page : newPage - 1,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		},
		function(response) {
			LoadingScreen.hide();
			$scope.currentPage = response.number + 1;
			$scope.pageSize = $scope.optionSizePage.selectedOption.number;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = $scope.allItems;

			for (var i = 0; i<$scope.items.length; i++ ){

				$scope.items[i].status		= ($scope.items[i].status  ?"AKTIF":"TIDAK AKTIF");
			}
			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
	});
}

		$scope.pageChanged(0);


}]);
