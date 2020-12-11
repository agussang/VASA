'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:SiklusListCtrl
 * @description
 * # SiklusListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('SiklusListCtrl', ['$scope','$PAGE_SIZE','SiklusList','SiklusDelete','AppParam','Notification','LoadingScreen','UserRole',function ($scope,$PAGE_SIZE,SiklusList,SiklusDelete,AppParam,Notification,LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();

	$scope.items=[];

	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jnsPelayaran.push(response.content[i].caption);
			$scope.filterConfig.fields[0].filterValues = $scope.jnsPelayaran;
		}
		//console.log($scope.jnsPelayaran);
	});

	//get parameter JENIS_KAPAL
	AppParam.get({nama:'JENIS_KAPAL'},function(response){
		$scope.jenisKapal = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jenisKapal.push(response.content[i].caption);
			$scope.filterConfig.fields[1].filterValues = $scope.jenisKapal;
		}
	});

	//get parameter KODE_KEGIATAN
	AppParam.get({nama:'KODE_KEGIATAN'},function(response){
		$scope.kodeKegiatan = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.kodeKegiatan.push(response.content[i].caption);
			$scope.filterConfig.fields[2].filterValues = $scope.kodeKegiatan;
		}
	});



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
		SiklusList.get(
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
					$scope.items[i].jenisPelayaranText 	= ($scope.items[i].jenisPelayaranText != null?$scope.items[i].jenisPelayaranText:'-');
					$scope.items[i].jenisKapalText 		= ($scope.items[i].jenisKapalText != null?$scope.items[i].jenisKapalText:'-');
					$scope.items[i].kodeKegiatanText 	= ($scope.items[i].kodeKegiatanText != null?$scope.items[i].kodeKegiatanText:'-');
					$scope.items[i].kriteriaLabuh 		= ($scope.items[i].kriteriaLabuh?active:non_active);
					$scope.items[i].kriteriaTambat 		= ($scope.items[i].kriteriaTambat?active:non_active);
					$scope.items[i].kriteriaAirKapal 	= ($scope.items[i].kriteriaAirKapal?active:non_active);
					$scope.items[i].kriteriaPanduMasuk 	= ($scope.items[i].kriteriaPanduMasuk?active:non_active);
					$scope.items[i].kriteriaPanduKeluar = ($scope.items[i].kriteriaPanduKeluar?active:non_active);
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
		if (filter.id === 'kodeKegiatan' && item.kodeKegiatanText !==null) {
			match = item.kodeKegiatanText.match(filter.value) !== null;
		} else if (filter.id === 'jenisKapal' && item.jenisKapalText !==null) {
			match = item.jenisKapalText.match(filter.value) !== null;
		} else if (filter.id === 'jenisPelayaran' && item.jenisPelayaranText !==null) {
			match = item.jenisPelayaranText.match(filter.value) !== null;
		} else if (filter.id === 'kodeKegiatan' && item.kodeKegiatanText !==null) {
			match = item.kodeKegiatanText === filter.value;
		} else if (filter.id === 'kriteriaLabuh') {
			match = item.kriteriaLabuh === filter.value;
		} else if (filter.id === 'kriteriaTambat') {
			match = item.kriteriaTambat === filter.value;
		} else if (filter.id === 'kriteriaAirKapal') {
			match = item.kriteriaAirKapal === filter.value;
		} else if (filter.id === 'kriteriaPanduMasuk') {
			match = item.kriteriaPanduMasuk === filter.value;
		} else if (filter.id === 'kriteriaPanduKeluar') {
			match = item.kriteriaPanduKeluar === filter.value;
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
				id: 'jenisPelayaran',
				title:  'Pelayaran',
				placeholder: 'Filter by Pelayaran...',
				filterType: 'select',
				filterValues: []

			},
			{
				id: 'jenisKapal',
				title:  'Jenis kapal',
				placeholder: 'Filter by Jenis Kapal...',
				filterType: 'select',
				filterValues: []
			},
			{
				id: 'kodeKegiatan',
				title:  'Kode Kegiatan',
				placeholder: 'Filter by Kode Kegiatan...',
				filterType: 'select',
				filterValues: []
			},
			{
				id: 'kriteriaLabuh',
				title:  'Kriteria labuh',
				placeholder: 'Filter by Kriteria Labuh...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'kriteriaTambat',
				title:  'Kriteria Tambat',
				placeholder: 'Filter by Kriteria Tambat...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'kriteriaAirKapal',
				title:  'Kriteria Air Kapal',
				placeholder: 'Filter by Kriteria Air Kapal...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'kriteriaPanduMasuk',
				title:  'Kriteria Pandu Masuk',
				placeholder: 'Filter by Kriteria Pandu Masuk...',
				filterType: 'select',
                filterValues: ['YA', 'TIDAK']
			},
			{
				id: 'kriteriaPanduKeluar',
				title:  'Kriteria Pandu Keluar',
				placeholder: 'Filter by Kriteria Pandu Keluar...',
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
	$scope.deleteSiklus = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			SiklusDelete.delete({id:id},
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
