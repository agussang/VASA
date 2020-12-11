'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:CabangMinKtListCtrl
 * @description
 * # CabangMinKtListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('CabangMinKtListCtrl',['$scope','$filter','$routeParams','Notification','$window','BranchMinKplTundaList','BranchMinKplTundaDelete','$PAGE_SIZE','LoadingScreen','UserRole',
function ($scope,$filter,$routeParams,Notification,$window,BranchMinKplTundaList,BranchMinKplTundaDelete,$PAGE_SIZE,LoadingScreen,UserRole) {
  	LoadingScreen.show();
  	$scope.userRole = UserRole.getCurrentRole();
  	$scope.items=[];
	var varItems = [];
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

  	$scope.pageChanged = function(newPage) {
    	BranchMinKplTundaList.get({
	        size : $scope.optionSizePage.selectedOption.number,
	        page : newPage - 1,
	        sort : $scope.sortBy === '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
	     },function(response) {
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
		var match = true;
		if (filter.id === "tglBerlaku") {
			match = item.tglBerlaku.match(filter.value) !== null;
		} else if (filter.id === "hp") {
			match = item.hp === parseInt(filter.value);
		} else if (filter.id === "jmlKapal") {
			match = item.jmlKapal === parseInt(filter.value);
		} else if (filter.id === "loaMin") {
			match = item.loaMin === parseInt(filter.value);
		} else if (filter.id === "loaMax") {
			match = item.loaMax === parseInt(filter.value);
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
				id: 'hp',
				title:  'Horse Power',
				placeholder: 'Filter by Horse Power...',
				filterType: 'number'
			},
			{
				id: 'jmlKapal',
				title:  'Jml. Kapal Tunda',
				placeholder: 'Filter by Jml. Kapal Tunda...',
				filterType: 'number'
			},
			{
				id: 'loaMin',
				title:  'LOA Min.',
				placeholder: 'Filter by LOA Min....',
				filterType: 'number'
			},
			{
				id: 'loaMax',
				title:  'LOA Max.',
				placeholder: 'Filter by LOA Max....',
				filterType: 'number'
			},
			{
				id: 'tglBerlaku',
				title:  'Tgl. Mulai Berlaku',
				placeholder: 'Filter by Tgl. Mulai Berlaku (yyyy-mm-dd)...',
				filterType: 'date'
			}
			
		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};

	//#delete id at list
    $scope.deleteIdlist = function(id) {
     	var idList = "";
    		idList = id;
    	var checkConfirm = confirm("Apakah anda ingin menghapus data?");
    	if (checkConfirm) {
    		BranchMinKplTundaDelete.delete({id:idList},
    			function(response){
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
				}
			);
    	}
    }

}]);