'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiListCtrl
 * @description
 * # TransaksiListCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiListCtrl',['$scope','$filter','$location','$timeout','BindKapal','pfViewUtils','Notification','PermohonanList','StatusEPBPermohonan','ConfirmedPenetapan','MdmKapalSearch','PermohonanAll','VerifiedRealisasiByList',function ($scope,$filter,$location,$timeout,BindKapal,pfViewUtils,Notification,PermohonanList,StatusEPBPermohonan,ConfirmedPenetapan,MdmKapalSearch,PermohonanAll,VerifiedRealisasiByList) {
 	$scope.orderby='idKapal';
 	$scope.viewOnly='lunas';
 	$scope.filtersText = '';
 	$scope.setStatusForm = {};
 	$scope.locationPath = '/transaksi/listmonitoring';
 	$scope.sortAscending = false;

 	$scope.config = {
 		selectItems: false,
 		multiSelect: false,
 		dblClick: false,
 		selectionMatchProp: 'namaKapal',
 		selectedItems: [],
 		showSelectBox: false
 	};

 	$scope.ascOptions = [
 		{
 			value:true,
 			caption:'Ascending'
 		},
 		{
 			value:false,
 			caption:'Descending'
 		}
 	];

 	var performActionTable = function (action, item) {
 		$scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
 	};

 	$scope.menuActions = [
 	{
 		name: 'Tambah Jasa',
 		title: 'Tambah Jasa',
 		actionFn: performActionTable
 	},
 	{
 		name: 'Revisi Jasa',
 		title: 'Revisi Jasa',
 		actionFn: performActionTable
 	},
 	{
 		name: 'Konfirmasi Pembayaran EPB',
 		title: 'Konfirmasi Pembayaran EPB',
 		actionFn: performActionTable
 	},
 	{
 		isSeparator: true
 	},
 	{
 		name: 'Buat Penetapan Baru',
 		title: 'Buat Penetapan Baru',
 		actionFn: performActionTable
 	}

 	];

 	$scope.items=[];
 	$scope.allItems = {};
 	$scope.valueKapal = BindKapal.getKapal();

// PermohonanList.get(function(response){
// 	console.log(response);
// });
$scope.pageChanged = function(newPage){
	PermohonanList.get({
		size:20,
		page:newPage-1
	},function(response){
		$scope.currentPage = response.number+1;
		$scope.pageSize = response.size;
		$scope.totalItems = response.totalElements;
		$scope.totalPages = response.totalPages;
		/*kalau mau filter per page*/
		// $scope.allItems = response.content;
		// $scope.items = $scope.allItems;
		$scope.items = response.content;

		/*kalau mau filter per page*/
		// $scope.$watch('valueKapal', function () {
		// 	if($scope.valueKapal !== null){
		// 		$scope.tesfilter = [{"id": "namaKapal", "title": "Nama Kapal", "type": "text", "value": $scope.valueKapal.mkplNama}];
		// 		filterChange($scope.tesfilter);
		// 		$scope.filterConfig.appliedFilters = $scope.tesfilter;
		// 	}
		// });
	});
};

$scope.pageChanged(0);
// PermohonanList.get({},function(response) {
// 	$scope.allItems = response.content;
	PermohonanAll.query({},function(response) {
		$scope.allItems = response;

		//default result count
		$scope.filterConfig.appliedFilters = [];
        if ($scope.filterConfig.onFilterChange) {
          	$scope.filterConfig.onFilterChange($scope.filterConfig.appliedFilters);
        }
        
        //default sort
        $timeout(function() {
	        var sortvalue = {id: "id", title: "Tgl. Permohonan", sortType: "numeric"};
	        sortChange(sortvalue,false);
	    },1000);

		//$scope.items = $scope.allItems;
		$scope.$watch('valueKapal', function () {
			if($scope.valueKapal !== null){
				$timeout(function() {
					$scope.tesfilter = [{"id": "namaKapal", "title": "Nama Kapal", "type": "text", "value": $scope.valueKapal.mkplNama}];
					filterChange($scope.tesfilter);
					$scope.filterConfig.appliedFilters = $scope.tesfilter;
				},500);
			}
		});
	});	

var matchesFilter = function (item, filter) {
	var match = true;
	if (filter.id === 'kodeKapal') {
		match = item.kodeKapal.match(filter.value) !== null;
	} else if (filter.id === 'namaKapal') {
		match = item.namaKapal.match(filter.value) !== null;
	} else if (filter.id === 'noPpk1') {
		match = item.noPpk1 === filter.value;
	}
	return match;
};

var matchesFilters = function (item, filters) {
	var matches = true;
	filters.forEach(function(filter) {
		filter.value = filter.value.toUpperCase(); // tambahan, default UPPER CASE
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
	$scope.filtersText = '';
	filters.forEach(function (filter) {
		$scope.filtersText += filter.title + " : " + filter.value + "\n";
	});
	applyFilters(filters);
};

var compareFn = function(item1, item2) {
	var compValue = 0;
	if ($scope.sortConfig.currentField.id === 'id') {
		compValue = item1.id - item2.id;
	} else if ($scope.sortConfig.currentField.id === 'kodeKapal') {
		compValue = item1.kodeKapal.localeCompare(item2.kodeKapal);
	} else if ($scope.sortConfig.currentField.id === 'namaKapal') {
		compValue = item1.namaKapal.localeCompare(item2.namaKapal);
	} else if ($scope.sortConfig.currentField.id === 'noPpk1') {
		compValue = item1.noPpk1.localeCompare(item2.noPpk1);
	}

	if (!$scope.sortConfig.isAscending) {
		compValue = compValue * -1;
	}

	return compValue;
};

var sortChange = function (sortId, isAscending) {
	$scope.items.sort(compareFn);
};

$scope.filterConfig = {	
	fields: [
	{
		id: 'namaKapal',
		title:  'Nama Kapal',
		placeholder: 'Filter by Nama Kapal',
		filterType: 'text'
	},
	{
		id: 'kodeKapal',
		title:  'Kode Kapal',
		placeholder: 'Filter by Kode Kapal',
		filterType: 'text'
	},
	{
		id: 'noPpk1',
		title:  'No. PPK1',
		placeholder: 'Filter by No. PPK1',
		filterType: 'text'
	}
	],
	resultsCount:$scope.items.length,
	appliedFilters: [],
	onFilterChange: filterChange
};

$scope.sortConfig = {
	fields:[
	{
		id:'id',
		title:'Tgl. Permohonan',
		sortType:'numeric'
	},
	{
		id:'kodeKapal',
		title:'Kode Kapal',
		sortType:'alpha'
	},
	{
		id:'namaKapal',
		title:'Nama Kapal',
		sortType:'alpha'
	},
	{
		id:'noPpk1',
		title:'No. PPK1',
		sortType:'alpha'
	}	
	],

	onSortChange:sortChange,
	isAscending:$scope.sortAscending
};

/*set status epb*/
	// $scope.setStatusValue = function(noppk1,urutan){
	// 	$scope.setStatusForm.noPpk1 = noppk1;
	// 	$scope.setStatusForm.urutanPermohonan = urutan;
	// 	console.log($scope.setStatusForm);
	// }; 

	$scope.setStatusEpb = function(){
		$scope.ppk1 = document.getElementById('noPpkVal').value;
		$scope.urutan = document.getElementById('urutanVal').value;
		StatusEPBPermohonan.get({ppk1:$scope.ppk1,urutan:$scope.urutan}, function(response){
			if(response.status !== '500'){
				$scope.setNotification  = {
				type	: "success", //ex : danger, warning, success, info
				message	: "Berhasil mengubah status menjadi 'Sudah Dibayar'."
			};
			Notification.setNotification($scope.setNotification);
			$timeout(function(){
				location.reload();
			},1000);
		}else{
			$scope.setNotification  = {
				type	: "danger",
				message	: "Gagal mengubah status menjadi 'Sudah Dibayar'."
			};
			Notification.setNotification($scope.setNotification);
		}		
	},function(response){
		$scope.setNotification  = {
			type	: "danger",
			message	: "Gagal mengubah status menjadi 'Sudah Dibayar'."
		};
		Notification.setNotification($scope.setNotification);
	});
	};

	$scope.confirmPenetapan = function(){
		$scope.ppk1 = document.getElementById('noPpkPenetapanVal').value;
		$scope.urutan = document.getElementById('urutanPenetapanVal').value;

		ConfirmedPenetapan.update({ppk1:$scope.ppk1,urutan:$scope.urutan}, {},function(response){
			if(response.status !== '500'){
				$scope.setNotification  = {
				type	: "success", //ex : danger, warning, success, info
				message	: "Berhasil mengkonfirmasi Penetapan."
			};
			Notification.setNotification($scope.setNotification);
			$timeout(function(){
				location.reload();
			},1000);			
		}else{
			if(response.description.indexOf("is not complete") !== -1){
				$scope.setNotification  = {
					type	: "warning",
					message	: "Gagal melakukan Konfirmasi Penetapan.<br>Pastikan semua jasa sudah dilakukan Penetapan."
				};
				Notification.setNotification($scope.setNotification);
			}else{
				$scope.setNotification  = {
					type	: "danger",
					message	: "Penetapan Gagal dikonfirmasi."
				};
				Notification.setNotification($scope.setNotification);
			}			
		}		
	},function(response){
		$scope.setNotification  = {
			type	: "danger",
			message	: "Penetapan Gagal dikonfirmasi."
		};
		Notification.setNotification($scope.setNotification);
	});
	};

	/*config sort*/
}]); /*akhir*/