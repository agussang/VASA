'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhListCtrl
 * @description
 * # LabuhListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('LabuhListCtrl',['$scope', '$timeout', '$location','$window','TarifLabuhList','TarifLabuhDelete','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$timeout,$location,$window,TarifLabuhList,TarifLabuhDelete,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	$scope.items=[];

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };


	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jnsPelayaran.push(response.content[i].caption);
			$scope.filterConfig.fields[2].filterValues = $scope.jnsPelayaran;
		}
	});
	//get parameter KELAS_PELABUHAN
	AppParam.get({nama:'KELAS_PELABUHAN'},function(response){
		$scope.klsPelabuhan = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.klsPelabuhan.push(response.content[i].caption);
			$scope.filterConfig.fields[3].filterValues = $scope.klsPelabuhan;
		}
	});
	//get parameter KUNJUNGAN
	AppParam.get({nama:'KUNJUNGAN'},function(response){
		// console.log(response);
		$scope.jnsTambatan = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jnsTambatan.push(response.content[i].caption);
			$scope.filterConfig.fields[4].filterValues = $scope.jnsTambatan;
		}
	});
	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.valuta.push(response.content[i].value);
			$scope.filterConfig.fields[5].filterValues = $scope.valuta;
		}
	});

	//get parameter jenis negara
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jenisNegara.push(response.content[i].value);
			$scope.filterConfig.fields[6].filterValues = $scope.jenisNegara;
		}
	});
	$scope.pageChanged = function(newPage) {
		// console.log(newPage);
		TarifLabuhList.get(
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


				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}



     $scope.pageChanged(0);

	//start function for filter
 	$scope.filtersText = "";

    var matchesFilter = function (item, filter) {
    	// console.log(filter.value);
		var match = true;
		if (filter.id === "nomorSk") {
			match = item.nomorSk.toLowerCase().match(filter.value.toLowerCase()) !== null;
		} else if (filter.id === "tglBerlaku") {
			match = item.tglBerlaku.match(filter.value) !== null;
		}else if (filter.id === "jenisPelayaran") {
			match = item.jenisPelayaranText === filter.value;
		}else if (filter.id === 'kelasPelabuhan') {
			match = item.kelasPelabuhanText === filter.value;
		}else if (filter.id === 'kunjungan') {
			match = item.kunjunganText === filter.value;
		}else if (filter.id === 'nilaiTarif') {
			match = item.nilaiTarif === parseInt(filter.value);
		}else if (filter.id === 'valuta') {
			match = item.valuta === filter.value;
		}else if (filter.id === 'jenisNegara') {
			match = item.jenisNegara === filter.value;
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
			id: 'nomorSk',
			title:  'Nomor SK',
			placeholder: 'Filter by Nomor SK...',
			filterType: 'text'
		},
		{
			id: 'tglBerlaku',
			title:  'Tgl. Berlaku',
			placeholder: 'Filter by Tgl. Berlaku...',
			filterType: 'date'
		},
		{
			id: 'jenisPelayaran',
			title:  'Jenis Pelayaran',
			placeholder: 'Filter by Jenis Pelayaran...',
			filterType: 'select',
            filterValues: []
		},
		{
			id: 'kelasPelabuhan',
			title:  'Kelas Pelabuhan',
			placeholder: 'Filter by Kelas Pelabuhan...',
			filterType: 'select',
            filterValues: []
		},
		{
			id: 'kunjungan',
			title:  'Kunjungan',
			placeholder: 'Filter by Jenis Tambatan...',
			filterType: 'select'
		},
		{
			id: 'valuta',
			title:  'Valuta',
			placeholder: 'Filter by Valuta...',
			filterType: 'select'
		},
		{
			id: 'nilaiTarif',
			title:  'Tarif Dasar',
			placeholder: 'Filter by Tarif Dasar...',
			filterType: 'number'
		}
		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};
	//delete labuh
	$scope.deleteLabuh = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			TarifLabuhDelete.delete({id:idData},function(response){
				// console.log(response.$resolved);
				if(response.$resolved == true){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.pageChanged(0);
				}else{
					$scope.setNotification  = {
						type	: "warning",
						message	: "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}

			});
		}

	}

}]);
