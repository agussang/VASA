'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterKesepakatanListCtrl
 * @description
 * # MasterKesepakatanListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterKesepakatanListCtrl', ['$scope','$PAGE_SIZE','$filter','ParamKesepakatan','ParamKesepakatanDelete','ItemMasaTambatDeleteAll','Notification','UserRole','AppParam',function ($scope,$PAGE_SIZE,$filter,ParamKesepakatan,ParamKesepakatanDelete,ItemMasaTambatDeleteAll,Notification,UserRole,AppParam) {
	$scope.items=[];
	$scope.userRole = UserRole.getCurrentRole();

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
	var jasaText = '';

	$scope.pageChanged = function(newPage) {
		ParamKesepakatan.get(
			{ 
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			}, 
			function(response) {
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
					
					$scope.items[i].isDermaga	= ($scope.items[i].isDermaga?active:non_active);
					$scope.items[i].isGt 		= ($scope.items[i].isGt?active:non_active);
					$scope.items[i].isJenisPelayaran = ($scope.items[i].isJenisPelayaran?active:non_active);
					$scope.items[i].isKodeKapal = ($scope.items[i].isKodeKapal?active:non_active);
					$scope.items[i].isMinUtility = ($scope.items[i].isMinUtility?active:non_active);
					$scope.items[i].isPelanggan = ($scope.items[i].isPelanggan?active:non_active);
					$scope.items[i].isValuta = ($scope.items[i].isValuta?active:non_active);
				  	$scope.items[i].isCustom = ($scope.items[i].isCustom?active:non_active);
				  	$scope.items[i].isJenisGerakanPandu = ($scope.items[i].isJenisGerakanPandu?active:non_active);
				  	$scope.items[i].isJenisKapal = ($scope.items[i].isJenisKapal?active:non_active);
				  	$scope.items[i].isJenisPandu = ($scope.items[i].isJenisPandu?active:non_active);
				  	$scope.items[i].isKapalNegara = ($scope.items[i].isKapalNegara?active:non_active);
				  	$scope.items[i].isKapalTunda = ($scope.items[i].isKapalTunda?active:non_active);
				  	$scope.items[i].isLokasiAwal = ($scope.items[i].isLokasiAwal?active:non_active);
				  	$scope.items[i].isLokasiTujuan = ($scope.items[i].isLokasiTujuan?active:non_active);
				  	$scope.items[i].isBendera = ($scope.items[i].isBendera?active:non_active);
				  	
				  	switch ($scope.items[i].berlakuDi) {
			        	case '':
			        		$scope.items[i].berlakuDiText = 'Semua';
			            	break;
			          	case '1':
			            	$scope.items[i].berlakuDiText = 'EPB';
			            	break;
			            default:
			            	$scope.items[i].berlakuDiText = 'Pranota';
			            	break; 
			        }

				  	switch ($scope.items[i].jasa) {
			        	case 1:
			        		$scope.items[i].jasaText = 'LABUH';
			            	break;
			          	case 2:
			            	$scope.items[i].jasaText = 'TAMBAT';
			            	break;
			            case 3:
			            	$scope.items[i].jasaText = 'AIR KAPAL';
			            	break;
			            case 4:
			            	$scope.items[i].jasaText = 'PANDU';
			            	break;
			            case 5:
			            	$scope.items[i].jasaText = 'TUNDA';
			            	break;
			            case 6:
			            	$scope.items[i].jasaText = 'KEPIL';
			            	break; 
			        }
				}
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			}
		);
	}

	$scope.pageChanged(0);
	//end List and paging

	$scope.pageChanged(0);
	//end List and paging

	//start function for filter
 	//filter
	var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'kodeKesepakatan') {
		match = item.kodeKesepakatan.match(filter.value) !== null;
	} else if (filter.id === 'jasaText') {
		match = item.jasaText === filter.value;
	} else if (filter.id === 'tglMulai') {
		match = item.tglMulai.match(filter.value) !== null;
	} else if (filter.id === 'tglSelesai') {
		match = item.tglSelesai.match(filter.value) !== null;
	} else if (filter.id === 'berlakuDiText') {
		match = item.berlakuDiText.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
				id: 'kodeKesepakatan',
				title:  'Kode Kesepakatan',
				placeholder: 'Filter by Kode Kesepakatan...',
				filterType: 'text',
                filterValues: ['AKTIF', 'TIDAK AKTIF']
			},
			{
				id: 'jasaText',
				title:  'Jasa',
				placeholder: 'Filter by Jasa...',
				filterType: 'select'
			},
			{
				id: 'berlakuDiText',
				title:  'Berlaku di',
				placeholder: 'Filter by berlaku di',
				filterType: 'text'
			},
			{
				id: 'tglMulai',
				title:  'Tgl. Mulai',
				placeholder: 'Filter by Tgl. Mulai (yyyy-mm-dd)...',
				filterType: 'date',

			},
			{
				id: 'tglSelesai',
				title:  'Tgl. Selesai',
				placeholder: 'Filter by Tgl. Selesai (yyyy-mm-dd)...',
				filterType: 'date',

			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };
	//end function for filter

	//get parameter VALUTA
	AppParam.get({nama:'JASA'},function(response){
		$scope.jasa = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jasa.push(response.content[i].caption);
			$scope.filterConfig.fields[1].filterValues = $scope.jasa;
		}
	});

	//start function for delete
	$scope.deleteParamKesepakatan = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			ParamKesepakatanDelete.delete({id:id},
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
