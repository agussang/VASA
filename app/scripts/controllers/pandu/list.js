'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduListCtrl
 * @description
 * # PanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PanduListCtrl',['$scope','$filter','$routeParams','$window','TarifPanduList','TarifPanduDelete','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',
function ($scope,$filter,$routeParams,$window,TarifPanduList,TarifPanduDelete,AppParam,$PAGE_SIZE,Notification, LoadingScreen, UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
    $scope.config = {
		selectItems: false,
		multiSelect: false,
		dblClick: false,
		selectionMatchProp: 'name',
		selectedItems: [],
		showSelectBox: true
	};
	$scope.items=[];

	//$scope.locationPath = '/pandu/list';

	/* get parameter JENIS_PELAYARAN */
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jnsPelayaran.push(response.content[i].caption);
			$scope.filterConfig.fields[0].filterValues = $scope.jnsPelayaran;
		}
	});

	/* get parameter VALUTA */
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.valuta.push(response.content[i].value);
			$scope.filterConfig.fields[2].filterValues = $scope.valuta;
		}
	});

	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = [];
		for (var i = 0; i<response.content.length; i++ ){
			$scope.jenisNegara.push(response.content[i].value);
			$scope.filterConfig.fields[3].filterValues = $scope.jenisNegara;
		}
	});

	var performActionTable = function (action, item) {
 		$scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
 	};

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
	//end List and paging

    /* PAGING */
  	$scope.pageChanged = function(newPage) {

		TarifPanduList.get(
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
				$scope.pagingText= 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});


	}

	$scope.pageChanged(0);

	/* start function for filter */
 	$scope.filtersText = "";

    var matchesFilter = function (item, filter) {

		var match = true;
		 if (filter.id === "jenisPelayaran") {
			match = item.jenisPelayaranText === filter.value;
		}else if (filter.id === "tglBerlaku") {
			match = item.tglBerlaku.match(filter.value) !== null;
		}else if (filter.id === "valuta") {
			match = item.valuta === filter.value;
		}else if (filter.id === "nomorSk") {
			match = item.nomorSk === filter.value;
		}else if (filter.id === "tarifTetap") {
			match = item.tarifTetap === parseInt(filter.value);
		}else if (filter.id === "tarifVariabel") {
			match = item.tarifVariabel === parseInt(filter.value);
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
			id: 'jenisPelayaran',
			title:  'Jenis Pelayaran',
			placeholder: 'Filter by Jenis Pelayaran...',
			filterType: 'select',
            filterValues: []
		},
		{
			id: 'tglBerlaku',
			title:  'Tgl. Berlaku',
			placeholder: 'Filter by Tgl. Berlaku...',
			filterType: 'date'
		},
		{
			id: 'valuta',
			title:  'Valuta',
			placeholder: 'Filter by valuta...',
			filterType: 'select',
			filterValues: []
		},
		{
			id: 'nomorSk',
			title:  'Nomor SK',
			placeholder: 'Filter by Nomor SK...',
			filterType: 'text'
		},
		{
			id: 'tarifTetap',
			title:  'Tarif Tetap',
			placeholder: 'Filter by Tarif Tetap...',
			filterType: 'number'
		},
		{
			id: 'tarifVariabel',
			title:  'Tarif Variabel',
			placeholder: 'Filter by Tarif Variabel...',
			filterType: 'number'
		},

		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};


	//#delete id at list
    $scope.deleteIdlist = function(id) {
     	var idList = "";
    		idList = id;
    	var checkConfirm = confirm("Are you sure to delete?");
    	if (checkConfirm) {
    		TarifPanduDelete.delete({id:idList},function(response){
    			   if (response.$resolved ){
    			  	$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.pageChanged(0);
    			}else{
    				$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);

    			}
			});
    	}
    };


}]);
