'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PejabatPengesahanListCtrl
 * @description
 * # PejabatPengesahanListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
// ganti nama service 'MasterBBMList' , sesuaikan dengan nama service yang ada pada vasaapp.js
.controller('PejabatListCtrl', ['$scope','$window','PejabatPengesahanList','PejabatPengesahanDelete','$PAGE_SIZE','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$window,PejabatPengesahanList,PejabatPengesahanDelete,$PAGE_SIZE, Notification, AppParam, LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
$scope.items=[];
var varItems = [];
$scope.filtersText={};

//
AppParam.get({nama:'JENIS_DOKUMEN'},function(response){
	$scope.jenisDokumen = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.jenisDokumen.push(response.content[i].value);
		$scope.filterConfig.fields[3].filterValues = $scope.jenisDokumen;
	}
});

AppParam.get({nama:'PEJABAT_SEBAGAI'},function(response){
	$scope.sebagai = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.sebagai.push(response.content[i].value);
		$scope.filterConfig.fields[4].filterValues = $scope.sebagai;
	}
});

//Delete
		$scope.deletePejabat = function(idData){
			var checkDelete = confirm('Apakah anda ingin menghapus data?');
			if(checkDelete){
				PejabatPengesahanDelete.delete({id:idData},function(response){
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
		PejabatPengesahanList.get(
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

				for (var i = 0; i<$scope.items.length; i++ ){

					$scope.items[i].otorisasi 		= ($scope.items[i].otorisasi === true ?"YA":"TIDAK");
				}

					$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

		});
	}

	$scope.pageChanged(0);

	//filter toolbar
	var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'nip') {
		match = item.nip.match(filter.value) !== null;
	} else if (filter.id === 'nama') {
		match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'jabatan') {
		match = item.jabatan.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'jenisDokumen') {
		match = item.jenisDokumen.match(filter.value) !== null;
	} else if (filter.id === 'levelPejabat') {
		match = item.levelPejabat.match(filter.value) !== null;
	} else if (filter.id === 'noSuratPenunjukan') {
		match = item.noSuratPenunjukan.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'otorisasi') {
		match = item.otorisasi=== filter.value;
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
			id: 'jabatan',
			title:  'Jabatan',
			placeholder: 'Filter by Jabatan...',
			filterType: 'text'
		},
		{
			id: 'jenisDokumen',
			title:  'Jenis Dokumen',
			placeholder: 'Filter by Jenis Dokumen...',
			filterType: 'select',
						filterValues: []
		},
		{
			id: 'levelPejabat',
			title:  'Pengesahan Sebagai',
			placeholder: 'Filter by Pengesahan Sebagai...',
			filterType: 'select',
						filterValues: []
		}
		,{
			id: 'noSuratPenunjukan',
			title:  'No. Surat Penunjukan',
			placeholder: 'Filter by No. Surat Penunjukan...',
			filterType: 'text'
		},
		{
			id: 'otorisasi',
			title:  'Otorisasi',
			placeholder: 'Filter by Otorisasi...',
			filterType: 'select',
					filterValues: ['YA','TIDAK']
		}
			],
	resultsCount: $scope.items.length,
	appliedFilters: [],
	onFilterChange: filterChange
	};

}]);
