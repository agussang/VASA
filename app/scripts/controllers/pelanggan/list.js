'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PelangganListCtrl
 * @description
 * # PelangganPerJasaListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PelangganListCtrl', ['$scope','$window','AppParam','PelangganPerJasaList','PelangganPerJasaDelete','$PAGE_SIZE','Notification','PelangganPerJasaDetail','PelangganPerJasaEdit','$filter','SearchAlatApung','SearchSDMKapal','LoadingScreen','UserRole',function ($scope,$window,AppParam,PelangganPerJasaList,PelangganPerJasaDelete,$PAGE_SIZE, Notification, PelangganPerJasaDetail, PelangganPerJasaEdit, $filter,SearchAlatApung,SearchSDMKapal,LoadingScreen,UserRole) {
	$scope.items=[];
	LoadingScreen.show();
	$scope.userRole = UserRole.getCurrentRole();

//jasa
   AppParam.get({nama:'JASA'},function(response){
    $scope.jasa = [];
    for (var i = 0; i<response.content.length; i++ ){
		$scope.jasa.push(response.content[i].caption);
		$scope.filterConfig.fields[1].filterValues = $scope.jasa;
	}
  });

//get parameter persetujuan
  AppParam.get({nama:'PERSETUJUAN'},function(response){
    $scope.persetujuan = [];
    for (var i = 0; i<response.content.length; i++ ){
		$scope.persetujuan.push(response.content[i].caption);
		$scope.filterConfig.fields[4].filterValues = $scope.persetujuan;
	}
 });
//get parameter status
  AppParam.get({nama:'STATUS'},function(response){
    $scope.status = [];
    for (var i = 0; i<response.content.length; i++ ){
		$scope.status.push(response.content[i].caption);
		$scope.filterConfig.fields[5].filterValues = $scope.status;
	}
  });


var varItems = [];
$scope.filtersText = "";

	$scope.deletePelanggan = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			PelangganPerJasaDelete.delete({id:idData},function(response){
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
	PelangganPerJasaList.get(
		{
			size : $scope.optionSizePage.selectedOption.number,
			page : newPage - 1,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		},
		function(response) {
      LoadingScreen.hide();
			// console.log(response.content);
			$scope.currentPage = response.number + 1;
			$scope.noIndex = ($scope.currentPage-1)*response.size;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = $scope.allItems;

			for (var i = 0; i<$scope.items.length; i++ ){
				$scope.items[i].pelangganText 		= ($scope.items[i].pelangganText  != null ?$scope.items[i].pelangganText :'-');
				$scope.items[i].jenisUsahaText 		= ($scope.items[i].jenisUsahaText  != null ?$scope.items[i].jenisUsahaText :'-');
				$scope.items[i].persetujuanText 	= ($scope.items[i].persetujuanText  != null ?$scope.items[i].persetujuanText :'-');
				$scope.items[i].status		= ($scope.items[i].status === "1" ?"AKTIF":"TIDAK AKTIF");

			}

				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
	});
}

$scope.pageChanged(0);

//filter toolbar
var matchesFilter = function (item, filter) {
var match = true;
if (filter.id === 'kodePelangganText') {
	match = item.kodePelangganText.match($filter('uppercase')(filter.value)) !== null;
} else if (filter.id === 'jasaText') {
	match = item.jasaText.match($filter('uppercase')(filter.value)) !== null;
} else if (filter.id === 'tglMulaiBerlaku') {
	match = item.tglMulaiBerlaku.match(filter.value) !== null;
} else if (filter.id === 'tglSetuju') {
	match = item.tglSetuju.match(filter.value) !== null;
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
		id: 'kodePelangganText',
		title:  'Pelanggan',
		placeholder: 'Filter by Pelanggan...',
		filterType: 'text'
	},
	{
		id: 'jasaText',
		title:  'Jasa',
		placeholder: 'Filter by Jasa...',
		filterType: 'select',
		filterValues:[]

	},
	{
		id: 'tglMulaiBerlaku',
		title:  'Tgl. Selesai Berlaku',
		placeholder: 'Filter by Tgl. Selesai Berlaku...',
		filterType: 'date'
	},
	{
		id: 'tglSetuju',
		title:  'Tgl. Setuju',
		placeholder: 'Filter by Tgl. Setuju...',
		filterType: 'date'
	},
	{
		id: 'persetujuan',
		title:  'Persetujuan',
		placeholder: 'Filter by Persetujuan...',
		filterType: 'select',
		filterValues:[]
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


//menampilkan modal
$scope.showModal = function(item){

			PelangganPerJasaDetail.get({id:item}, function(response){

				if(response !== undefined){
					$scope.dataPelanggan = response;
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

		$scope.dataPelanggan.persetujuan = parseInt(1,10);

		$scope.dataPelanggan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.dataPelanggan)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

		console.log($scope.dataPelanggan);

	PelangganPerJasaEdit.save(formData,function(response){
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
	$scope.dataPelanggan.persetujuan = parseInt(4,10);

	$scope.dataPelanggan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
	formData.append('pelangganPerJasa', new Blob([JSON.stringify($scope.dataPelanggan)], { type: "application/json" }));
	if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

	PelangganPerJasaEdit.save(formData,function(response){
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
