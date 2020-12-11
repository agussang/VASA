'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaListCtrl
 * @description
 * # MasterDendaListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
// ganti nama service 'MasterBBMList' , sesuaikan dengan nama service yang ada pada vasaapp.js
.controller('MasterDendaListCtrl', ['$scope','$window','MasterDendaList','MasterDendaDelete','$PAGE_SIZE','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$window,MasterDendaList,MasterDendaDelete,$PAGE_SIZE, Notification, AppParam,LoadingScreen,UserRole) {
LoadingScreen.show();
$scope.userRole = UserRole.getCurrentRole();
$scope.items=[];
var varItems = [];
$scope.filtersText={};

//
AppParam.get({nama:'JASA'},function(response){
	$scope.sebagai = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.sebagai.push(response.content[i].caption);
		$scope.filterConfig.fields[1].filterValues = $scope.sebagai;
	}
});

AppParam.get({nama:'JENIS_DENDA'},function(response){
	$scope.jenisDokumen = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.jenisDokumen.push(response.content[i].caption);
		$scope.filterConfig.fields[2].filterValues = $scope.jenisDokumen;
	}
});

AppParam.get({nama:'SIFAT_DENDA'},function(response){
	$scope.jenisDokumen = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.jenisDokumen.push(response.content[i].caption);
		$scope.filterConfig.fields[6].filterValues = $scope.jenisDokumen;
	}
});

//Delete
		$scope.deleteMasterDenda = function(idData){
			var checkDelete = confirm('Apakah anda ingin menghapus data?');
			if(checkDelete){
				MasterDendaDelete.delete({id:idData},function(response){
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
		MasterDendaList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'id,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
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

				$scope.items.forEach(function(element){
					element.flagDenda 		= (element.flagDenda == 1 ?"YA":"TIDAK");
					element.flagAktif 		= (element.flagAktif == 1 ?"YA":"TIDAK");
					if (element.namaDermaga != null) {
							element.namaKodeDermaga = element.namaDermaga + ' ('+element.kodeDermaga+')';
					}
				});

					$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

		});
	};

	$scope.pageChanged(0);

	//filter toolbar
	var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'kodeDenda') {
		match = item.kodeDenda.toLowerCase().match(filter.value.toLowerCase()) !== null;
	} else if (filter.id === 'jenisJasa') {
		match = item.jenisJasaText.match(filter.value) !== null;
	} else if (filter.id === 'jenisDenda') {
		match = item.jenisDendaText.match(filter.value) !== null;
	} else if (filter.id === 'kenaDendaText') {
		match = item.flagDenda === filter.value;
	} else if (filter.id === 'dermaga') {
		match = item.namaDermaga.match(filter.value) !== null;
	} else if (filter.id === 'aktif') {
		match = item.flagAktif===filter.value;
	} else if (filter.id === 'sifat') {
		match = item.sifatDendaText.match(filter.value) !== null;
	} else if (filter.id === 'nilai') {
		 match = item.value === parseInt(filter.value) ;
		// match = item.nilaiTarif === parseInt(filter.value);
		 console.log(match);
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
			id: 'kodeDenda',
			title:  'Kode Denda',
			placeholder: 'Filter by Kode Denda...',
			filterType: 'text'
		},
		{
			id: 'jenisJasa',
			title:  'Jenis Jasa',
			placeholder: 'Filter by Jenis Jasa...',
			filterType: 'select',
				filterValues:[]
		},
		{
			id: 'jenisDenda',
			title:  'Jenis Denda',
			placeholder: 'Filter by Jenis Denda...',
			filterType: 'select',
				filterValues:[]
		},
		{
			id: 'kenaDendaText',
			title:  'Kena Denda',
			placeholder: 'Filter by Kena Denda...',
			filterType: 'select',
				filterValues:['YA','TIDAK']
		},
		{
			id: 'dermaga',
			title:  'Dermaga',
			placeholder: 'Filter by Dermaga...',
			filterType: 'text'
		},
		{
			id: 'aktif',
			title:  'Aktif',
			placeholder: 'Filter by Aktif...',
			filterType: 'select',
				filterValues:['YA','TIDAK']
		},
		{
			id: 'sifat',
			title:  'Sifat',
			placeholder: 'Filter by Sifat...',
			filterType: 'select',
				filterValues:[]
		},
		{
			id: 'nilai',
			title:  'Nilai',
			placeholder: 'Filter by Nilai...',
			filterType: 'text'
		}
			],
	resultsCount: $scope.items.length,
	appliedFilters: [],
	onFilterChange: filterChange
	};

}]);
