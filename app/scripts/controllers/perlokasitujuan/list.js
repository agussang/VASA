'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhListCtrl
 * @description
 * # LabuhListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PerlokasitujuanListCtrl',['$scope', '$timeout', '$location','$window','$PAGE_SIZE','$filter','PelangganPerLokasiList','PelangganPerLokasiDetail','PelangganPerLokasiDelete','PelangganPerLokasiEdit','MdmDermagaShow','Notification','AppParam','LoadingScreen','UserRole',
	function ($scope,$timeout,$location,$window,$PAGE_SIZE,$filter,PelangganPerLokasiList,PelangganPerLokasiDetail,PelangganPerLokasiDelete,PelangganPerLokasiEdit,MdmDermagaShow, Notification,AppParam,LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();
	$scope.items=[];
	AppParam.get({nama:'JASA'},function(response){
		$scope.jasa = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jasa.push(response.content[i].caption);
			$scope.filterConfig.fields[0].filterValues = $scope.jasa;
		}
	});

	$scope.deleteperlokasitujuan = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			PelangganPerLokasiDelete.delete({id:idData},function(response){
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

  var matchesFilter = function (item, filter) {
		var match = true;
		if (filter.id === 'jasaText') {
			match = item.jasaText.match(filter.value) !== null;
		} else if (filter.id === 'dermagaText') {
			match = item.dermagaText.match($filter('uppercase')(filter.value)) !== null || item.dermagaText.match(filter.value) !== null;
		} else if (filter.id === 'tglSelesaiBerlaku') {
			match = item.tglSelesaiBerlaku.match(filter.value) !== null;
		} else if (filter.id === 'tglSepakat') {
			match = item.tglSepakat.match(filter.value) !== null;
		} else if (filter.id === 'pejabat') {
			match = item.pejabat.toLowerCase().match($filter('uppercase')(filter.value)) !== null || item.pejabat.toLowerCase().match(filter.value) !== null;
		} else if (filter.id === 'pelanggan') {
			match =item.pelanggan.match($filter('uppercase')(filter.value)) !== null ||  item.pelanggan.match(filter.value) !== null;
		} else if (filter.id === 'persetujuanText') {
			match = item.persetujuanText === filter.value;
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

  var filterChange = function (filters) {
		filters.forEach(function (filter) {
			if(filter.type == 'date') {
				var d = new Date(filter.value);
			  $scope.results = $filter('date')(d, "yyyy-MM-dd");
			  filter.value =  $scope.results.slice(0,10);
			}
			$scope.filtersText += filter.title + " : " + filter.value + "\n";
		});
		applyFilters(filters);
  };

  $scope.filterConfig = {
		fields: [
	    {
				id: 'jasaText',
				title:  'Jasa',
				placeholder: 'Filter by Jasa...',
				filterType: 'select',
				filterValues: []
			},
			{
				id: 'dermagaText',
				title:  'Dermaga',
				placeholder: 'Filter by Dermaga...',
				filterType: 'text'
			},
			{
				id: 'tglSelesaiBerlaku',
				title:  'Tgl. Selesai',
				placeholder: 'Filter by (yyyy-mm-dd)..',
				filterType: 'date'
			},
			{
				id: 'tglSepakat',
				title:  'Tgl. Sepakat',
				placeholder: 'Filter by (yyyy-mm-dd)...',
				filterType: 'date'
			},
			{
				id: 'persetujuanText',
				title:  'Persetujuan',
				placeholder: 'Filter by Persetujuan...',
				filterType: 'select',
				filterValues: ['Menunggu','Disetujui','Tidak Disetujui']
			},
			{
				id: 'status',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
				filterValues: ['AKTIF','TIDAK AKTIF']
			},
			{
				id: 'pejabat',
				title:  'Pejabat Perlokasi',
				placeholder: 'Filter by Pejabat Perlokasi...',
				filterType: 'text'
			},
			{
				id: 'pelanggan',
				title:  'Pelanggan',
				placeholder: 'Filter by Pelanggan...',
				filterType: 'text'
			}
    ],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
  };
	//end function for filter

	//start List and paging
	$scope.optionSizePage = {
    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
    selectedOption: {number: $PAGE_SIZE}
  };
  $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;


	$scope.pageChanged = function(newPage) {
		PelangganPerLokasiList.get(
		{
			size : $scope.optionSizePage.selectedOption.number,
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
					$scope.items[i].status = ($scope.items[i].status?active:non_active);
					$scope.items[i].namaKodeDermaga		= $scope.items[i].dermagaText +' ('+ $scope.items[i].dermaga+')';
				}

				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}

	$scope.pageChanged(0);
	//end paging

	//menampilkan modal
	$scope.showModal = function(item){
		PelangganPerLokasiDetail.get({id:item.id}, function(response){
			if(response !== undefined){
				$scope.perlokasi = response.content[1];

			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}

	//tombol setuju pada modal, merubah persetujuan menjadi disetujui
	$scope.approve = function(){
		var formData = new FormData();
		$scope.perlokasi.persetujuan = parseInt(1,10);
		$scope.perlokasi.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		formData.append('pelangganPerLokasiTujuan', new Blob([JSON.stringify($scope.perlokasi)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

		PelangganPerLokasiEdit.update(formData,function(response){
			if(response.$resolved){
				$scope.setNotification  = {
					type	: "success",
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
			}
			Notification.setNotification($scope.setNotification);
			$scope.pageChanged(0);
		});
	}

	//tombol tidak setuju pada modal, merubah persetujuan menjadi tidak disetujui
	$scope.disapprove = function(){
		var formData = new FormData();
		$scope.perlokasi.persetujuan = parseInt(4,10);
		$scope.perlokasi.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		formData.append('pelangganPerLokasiTujuan', new Blob([JSON.stringify($scope.perlokasi)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		PelangganPerLokasiEdit.update(formData,function(response){
			if(response.$resolved){
				$scope.setNotification  = {
					type	: "success",
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
			}
			Notification.setNotification($scope.setNotification);
			$scope.pageChanged(0);
		});
	}

}]);
