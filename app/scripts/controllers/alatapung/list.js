'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AlatApungListCtrl
 * @description
 * # AlatApungListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AlatApungListCtrl', ['$scope','$window','AlatApungList','AlatApungDelete','$PAGE_SIZE','BindApung','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$window,AlatApungList, AlatApungDelete,$PAGE_SIZE,BindApung,Notification,AppParam,LoadingScreen, UserRole) {
$scope.userRole = UserRole.getCurrentRole();
LoadingScreen.show();

$scope.items = [];
var varItems = [];
$scope.filtersText = {};
$scope.bindapung = BindApung;


//GET JENIS KAPAL PARAMETER
AppParam.get({nama:'JENIS_ALAT_APUNG'},function(response){
  $scope.jenisKapal = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.jenisKapal.push(response.content[i].caption);
		$scope.filterConfig.fields[2].filterValues = $scope.jenisKapal;
	}
	//console.log($scope.jenisKapal);
});

//GET JENIS KELAS PARAMETER
AppParam.get({nama:'KELAS_ALAT_APUNG'},function(response){
  $scope.kelasText = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.kelasText.push(response.content[i].caption);
		$scope.filterConfig.fields[3].filterValues = $scope.kelasText;
	}
});

//GET JENIS KONDISI PARAMETER
AppParam.get({nama:'KONDISI_ALAT_APUNG'},function(response){
  $scope.kondisi = [];
	for (var i = 0; i<response.content.length; i++ ){
		$scope.kondisi.push(response.content[i].caption);
		$scope.filterConfig.fields[5].filterValues = $scope.kondisi;
	}
});

$scope.deleteAlatApung = function(idData){
	var kelasTextkDelete = confirm('Apakah anda ingin menghapus data?');
	if(kelasTextkDelete){
		AlatApungDelete.delete({id:idData},function(response){
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
$scope.totalItems = 0;
$scope.totalPages = 0;
$scope.sortBy = '';
$scope.sortDesc = false;
$scope.pagingText = '';

$scope.pageChanged = function(newPage) {
	AlatApungList.get(
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
				$scope.items[i].kelompokText 		= ($scope.items[i].kelompokText  != null ?$scope.items[i].kelompokText :'-');
				$scope.items[i].jenisText 	= ($scope.items[i].jenisText != null ?$scope.items[i].jenisText:'-');
				$scope.items[i].pemilikText 		= ($scope.items[i].pemilikText != null ?$scope.items[i].pemilikText:'-');
				$scope.items[i].kondisiText 	= ($scope.items[i].kondisiText != null ?$scope.items[i].kondisiText:'-');
				$scope.items[i].kelasText 	= ($scope.items[i].kelasText != 0 ?$scope.items[i].kelasText:'-');
			}
	$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

	});

}

$scope.pageChanged(0);

//filter toolbar
var matchesFilter = function (item, filter) {
var match = true;
if (filter.id === 'noRegistrasi') {
	match = item.noRegistrasi.toLowerCase().match(filter.value.toLowerCase()) !== null;
} else if (filter.id === 'nama') {
	match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
} else if (filter.id === 'jenis') {
	match = item.jenisText.match(filter.value) !== null;
} else if (filter.id === 'kelas') {
	match = item.kelasText===filter.value;
	console.log(match);
} else if (filter.id === 'pemilik') {
	match = item.pemilikText.toLowerCase().match(filter.value.toLowerCase()) !== null;
} else if (filter.id === 'kondisi') {
	match = item.kondisiText.match(filter.value) !== null;
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
		id: 'noRegistrasi',
		title:  'No. Reg',
		placeholder: 'Filter by No. Reg...',
		filterType: 'text'
	},
	{
		id: 'nama',
		title:  'Nama Alat',
		placeholder: 'Filter by Nama Alat...',
		filterType: 'text'
	},
	{
		id: 'jenis',
		title:  'Jenis',
		placeholder: 'Filter by Jenis ...',
	    filterType: 'select',
		filterValues: []
	},
	{
		id: 'kelas',
		title:  'Kelas',
		placeholder: 'Filter by Kelas...',
		filterType: 'select',
		filterValues: []
	},
	{
		id: 'pemilik',
		title:  'Pemilik',
		placeholder: 'Filter by Pemilik...',
		filterType: 'text'
	},
  	{
		id: 'kondisi',
		title:  'Kondisi',
		placeholder: 'Filter by Kondisi...',
		filterType: 'select',
		filterValues: []
	}
		],
resultsCount: $scope.items.length,
appliedFilters: [],
onFilterChange: filterChange
};

}]);
