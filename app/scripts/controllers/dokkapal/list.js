'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DokkapalListCtrl
 * @description
 * # DokkapalListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('DokkapalListCtrl', ['$scope','$filter','$PAGE_SIZE','KapalKegiatanTetapList','KapalKegiatanTetapDelete','MdmPelangganSearchByKode','Notification','LoadingScreen','UserRole', function ($scope,$filter,$PAGE_SIZE,KapalKegiatanTetapList,KapalKegiatanTetapDelete,MdmPelangganSearchByKode,Notification,LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();
	$scope.items=[];


	//start List and paging
    $scope.currentPage = 1;
	$scope.pageSize = $scope.setSizePage;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

	$scope.pageChanged = function(newPage) {
		KapalKegiatanTetapList.get(
			{
				size : $scope.pageSize,
				page : newPage - 1,
				sort : $scope.sortBy === '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
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
				var active 		= "AKTIF";
				var non_active 	= "TIDAK AKTIF";
				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].status = ($scope.items[i].status ===1?active:non_active);
					// MdmPelangganSearchByKode.get({kode:$scope.items[i].kodeAgen}, function(responseMDMPelanggan){
					// 	$scope.items[i].namaAgen = responseMDMPelanggan.mplgNama;
					// 	console.log($scope.items[i].namaAgen);
					// });
				}
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

			}
		);
	};

	$scope.pageChanged(0);
	//end List and paging

	//start function for filter
	//filter
	 $scope.filtersText = "";
		 var matchesFilter = function (item, filter) {
		 var match = true;

		 if (filter.id === 'kode') {
			 match = item.kode.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'nama') {
			 match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'agen') {
			 match = item.kodeAgenText.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'noSuratKeputusan') {
			 match = item.noSuratKeputusan.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'tglMulaiBerlaku') {
			 match = item.tglMulaiBerlaku.match(filter.value) !== null;
		 } else if (filter.id === 'tglSelesaiBerlaku') {
			 match = item.tglSelesaiBerlaku.match(filter.value) !== null;
		 } else if (filter.id === 'tglDitetapkan') {
			 match = item.tglDitetapkan.match(filter.value) !== null;
		 } else if (filter.id === 'status') {
			 match = item.status === filter.value;
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
				title:  'Kode Kapal',
				placeholder: 'Filter by Kode Kapal...',
				filterType: 'text'
			},
			{
				id: 'nama',
				title:  'Nama Kapal',
				placeholder: 'Filter by Nama Kapal...',
				filterType: 'text'
			},
			{
				id: 'agen',
				title:  'Agen',
				placeholder: 'Filter by Agen...',
				filterType: 'text'
			},
			{
				id: 'noSuratKeputusan',
				title:  'No. Surat Keputusan',
				placeholder: 'Filter by No. Surat Keputusan...',
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
				id: 'tglDitetapkan',
				title:  'Tgl. Ditetapkan',
				placeholder: 'Filter by Tgl. Ditetapkan...',
				filterType: 'date'
			},
			{
				id: 'status',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
                filterValues: ['AKTIF', 'TIDAK AKTIF']
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter

	//start function for delete
	$scope.deleteDokKapal = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			KapalKegiatanTetapDelete.delete({id:id},
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
	};
	//end function for delete

	$scope.searchNamaAgen =  function(kodeAgen){
		MdmPelangganSearchByKode.get({kode:kodeAgen,kodeTerminal : localStorage.getItem('kodeTerminal')}, function(response){
			return response.mplgNama;
		});
	};

}]);
