'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapallanggananListCtrl
 * @description
 * # KapallanggananListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapallanggananListCtrl',['$scope', '$timeout', '$location','$window','$PAGE_SIZE','KapalLanggananList','KapalLanggananDelete','KapalLanggananDetail','KapalLanggananEdit','Notification','LoadingScreen','UserRole',function ($scope,$timeout,$location,$window,$PAGE_SIZE,KapalLanggananList,KapalLanggananDelete,KapalLanggananDetail,KapalLanggananEdit,Notification,LoadingScreen,UserRole) {
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();

	//list data
	$scope.config = {
		selectItems: false,
		multiSelect: false,
		dblClick: false,
		selectionMatchProp: 'name',
		selectedItems: [],
		showSelectBox: true
	};
	$scope.items=[];

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

		KapalLanggananList.get(
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
					$scope.items[i].status 		= ($scope.items[i].status?active:non_active);
          $scope.items[i].namaKodeDermaga = $scope.items[i].namaDermaga+' ('+ $scope.items[i].dermaga+')';
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
		if (filter.id === 'kodeKapal') {
			match = item.kodeKapal.match(filter.value) !== null;
		} else if (filter.id === 'namaKapal') {
			match = item.namaKapal.toLowerCase().match(filter.value.toLowerCase()) !== null;
		} else if (filter.id === 'namaPelanggan') {
			match = item.namaPelanggan.toLowerCase().match(filter.value.toLowerCase()) !== null;
		} else if (filter.id === 'namaDermaga') {
			match = item.namaDermaga.toLowerCase().match(filter.value.toLowerCase()) !== null;
		} else if (filter.id === 'tglSelesaiBerlaku') {
			match = item.tglSelesaiBerlaku.match(filter.value) !== null;
		} else if (filter.id === 'tglSepakat') {
			match = item.tglSepakat.match(filter.value) !== null;
		} else if (filter.id === 'persetujuan') {
			match = item.persetujuanText===filter.value;
		} else if (filter.id === 'status') {
			match = item.status.match(filter.value) !== null;
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
				id: 'namaKapal',
				title:  'Nama Kapal',
				placeholder: 'Filter by Nama Kapal...',
				filterType: 'text'
			},
			{
				id: 'namaPelanggan',
				title:  'Pelanggan',
				placeholder: 'Filter by Pelanggan...',
				filterType: 'text'
			},
			{
				id: 'namaDermaga',
				title:  'Dermaga',
				placeholder: 'Filter by Dermaga...',
				filterType: 'text'
			},
			{
				id: 'tglSelesaiBerlaku',
				title:  'Tgl. Selesai Berlaku',
				placeholder: 'Filter by Tgl. Selesai Berlaku...',
				filterType: 'date'
			},
			{
				id: 'tglSepakat',
				title:  'Tgl. Sepakat',
				placeholder: 'Filter by Tgl. Sepakat...',
				filterType: 'date'
			},
			{
				id: 'persetujuan',
				title:  'Persetujuan',
				placeholder: 'Filter by Persetujuan...',
				filterType: 'select',
				filterValues:['Menunggu','Tidak Disetujui','Kadaluarsa','Disetujui']
			},
			{
				id: 'status',
				title:  'Status',
				placeholder: 'Filter by Status...',
				filterType: 'select',
				filterValues:['AKTIF','TIDAK AKTIF']
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter

	//start function for delete
	$scope.deleteKapal = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			KapalLanggananDelete.delete({id:idData},function(response){
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
	//end function for delete

	//menampilkan modal
	$scope.showModal = function(item){

				KapalLanggananDetail.get({id:item}, function(response){

					if(response !== undefined){
						$scope.langganan = response;
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

			$scope.langganan.persetujuan = parseInt(1,10);

			$scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
			formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], { type: "application/json" }));
			if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

			//console.log($scope.dataPelanggan);

		KapalLanggananEdit.save(formData,function(response){
			if(response.$resolved){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
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
		$scope.langganan.persetujuan = parseInt(4,10);

		$scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

		KapalLanggananEdit.save(formData,function(response){
		if(response.$resolved){
			$scope.setNotification  = {
				type	: "success", //ex : danger, warning, success, info
				message	: "Data berhasil tersimpan"
			};
		}else{
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Data tidak berhasil tersimpan"
			};
		}
		Notification.setNotification($scope.setNotification);
		$scope.pageChanged(0);
		});

	}

}]);
