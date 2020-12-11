'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RiwayatEskalasiListCtrl
 * @description
 * # RiwayatEskalasiListCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('RiwayatEskalasiListCtrl',['$scope','$filter','$timeout','$routeParams','$rootScope','$location','$PAGE_SIZE','Notification','RiwayatEskalasiList','StatusEPBPermohonan','LoadingScreen','MonitoringDetail','UserRole','SharedVariable','ParamsCabangList','RiwayatEskalasiDelete','TipeEskalasiList',function ($scope,$filter,$timeout,$routeParams,  $rootScope,$location,$PAGE_SIZE,Notification,RiwayatEskalasiList,StatusEPBPermohonan,LoadingScreen,MonitoringDetail,UserRole,SharedVariable,ParamsCabangList,RiwayatEskalasiDelete,TipeEskalasiList) {
 	$scope.userRole = UserRole.getCurrentRole();
 	var locationPath = '/riwayateskalasi/list';
 	$scope.optionsDate = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true,
		orientation:'bottom'
	};
 	LoadingScreen.show();
 	$scope.items=[];
 	$scope.listJasa = [];

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

    $scope.options = {
	    filter: [
	    	{value: undefined , groupBy:'Permohonan', name: 'Semua Permohonan'},
	    	{value: "P", groupBy:'Permohonan', name: 'Sudah Bayar EPB'},
	    	{value: "N", groupBy:'Permohonan', name: 'Belum Bayar EPB'},
	    	{value: "D", groupBy:'Penetapan', name: 'Semua Penetapan'},
	    	{value: "C", groupBy:'Penetapan', name: 'Penetapan Sudah Konfirmasi'},
	    	{value: "R", groupBy:'Realisasi', name: 'Semua Realisasi'}]
	};

	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.filterConfig = [
		{
			id: 'created',
			title:  'Tgl Eskalasi',
			placeholder : 'Filter by Tgl Eskalasi',
			filterType : 'date'
		},
		// {
		// 	id : 'escTypeText',
		// 	title :  'Kode Eskalasi',
		// 	placeholder : 'Filter by Kode Eskalasi',
		// 	filterType : 'text'
		// },
		{
			id : 'idEscType',
			title :  'Kode Eskalasi',
			placeholder : 'Filter by Kode Eskalasi',
			filterType : 'select'
		}
	];

	// PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	$scope.option = [];
	$scope.option.value = $scope.options.filter[0].value;
	if(!$routeParams.id){
		$scope.showAction = true;
	}else{
		$scope.showAction = false;
	}

	$scope.backToList = function(){
		$location.path(locationPath);
	}

	$scope.setFormatDate = function(item){
		/*return $filter('date')(item,'yyyy-MM-dd')+'T'+moment().format('HH:mm');*/
		return $filter('date')(item,'yyyy-MM-dd');
	}

	$scope.setHeaderList = function(){
		if(localStorage.userApprover===''){
			var note = {
				type 	: "warning",
				message : "ESKALASI_APPROVER belum tersedia"
			};
			Notification.setNotification(note);
		}

		$scope.aksesOtorisasi = '';
		if(localStorage.userApprover===localStorage.username){
			$scope.aksesOtorisasi = 0;
		}else{
 			$scope.aksesOtorisasi = 1;
		}
	}

	// autocomplete kapal
	$scope.getListOfEscalationType = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				TipeEskalasiList.get({
					page : -1,
					size : 9999,
					sort : 'escTypeCode,asc'
				}, function(response) {
					resolve(response.content);
				});
			});
		}
	};

	$scope.validationLookupEscalationType= function(){
	    if(valueField !== $scope.searchBySelect){
	      if(typeof $scope.searchBySelect != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.searchBySelect= '';
	      }
	    }
	}

	$scope.$watch('selectionSearch', function(val)
	{
		$scope.filterMinLength = 0;
		if(val.id === 'created'){
	   		$scope.filterMinLength = 10;
		}
		$scope.filterType = val.filterType;
		$scope.filterPlaceholder = val.placeholder;
	});

	$scope.pageChanged = function(newPage) {
		$scope.setHeaderList();
		$scope.btnResetSearch = false;
		$scope.contentSearch = false;
		$scope.loadingResetSearch = false;

		var selectionSearch = $scope.selectionSearch;
		var filterItem = {
			page:newPage-1,
			status: $scope.option.value,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}

		if($routeParams.id){
			filterItem['id'] = $routeParams.id;
			filterItem['size'] = 99999;
		}else if($scope.searchText){ /*Search By Text*/
			filterItem[selectionSearch.id] = $scope.searchText;
			$scope.searchTextItem = $scope.searchText;
			$scope.searchSelectedResponse = selectionSearch.title;
			filterItem['size'] = 99999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else if($scope.searchByDate){ /*Search By Date*/
			filterItem[selectionSearch.id] = $scope.setFormatDate($scope.searchByDate);
			$scope.searchTextItem = $scope.setFormatDate($scope.searchByDate);
			$scope.searchSelectedResponse = selectionSearch.title;
			filterItem['size'] = 99999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else if($scope.searchBySelect){ /*Search By Select*/
			filterItem[selectionSearch.id] = $scope.searchBySelect.id;
			$scope.searchTextItem = $scope.searchBySelect.escTypeCode;
			$scope.searchSelectedResponse = selectionSearch.title;
			filterItem['size'] = 99999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else{
			filterItem['size'] = $scope.optionSizePage.selectedOption.number; //kondisi default get data
		}
		RiwayatEskalasiList.get(filterItem,function(response) {
			// response = localStorage.userApprover?response.content:'';
			$scope.currentPage = response.number + 1;
			$scope.noIndex = ($scope.currentPage-1)*response.size;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			response.content.forEach(function(itemEsc){
				if(itemEsc.escReason.length>40){
					itemEsc.showTooltip = true;
				}else{
					itemEsc.showTooltip = false;
				}
			});
			$scope.items = response.content;
			var items = response.content;
			$scope.informasiLengthItem = response.content.length;
			if(items.length!==0){
				$scope.searchTextItem = '';
			}

			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
		LoadingScreen.hide();
	}
    $scope.setHeaderList();
    $scope.pageChanged(0);

	$scope.resetSearch = function () {
		$scope.searchText ='';
		$scope.searchByDate ='';
		$scope.searchBySelect ='';
		$scope.btnResetSearch = false;
		$scope.loadingResetSearch = true;
  		$scope.pageChanged(0);
    };

    $scope.$watch('searchText', function(newValue, oldVal){
    	if(newValue!==undefined){
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
			$scope.searchByDate = "";
			$scope.searchBySelect = "";
    	}
    });

    $scope.$watch('searchByDate', function(newValue, oldVal){
    	if(newValue!==undefined){
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
			$scope.searchText = "";
			$scope.searchBySelect = "";
    	}
    });

    $scope.$watch('searchBySelect', function(newValue, oldVal){
    	if(newValue!==undefined){
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
			$scope.searchText = "";
			$scope.searchByDate = "";
    	}
    });

	$scope.deleteRiwayatEskalasi = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			RiwayatEskalasiDelete.delete({id:id},function(response){
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
