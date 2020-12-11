'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterPalikasiCtrl
 * @description
 * # ParameterPalikasiCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('ParameterAplikasiListCtrl',['$scope','$window','$routeParams','$filter','$timeout','$route','AppParamListByGroup','AppParamDelete','$PAGE_SIZE','LoadingScreen','UserRole','AppParam','Notification',function ($scope,$window,$routeParams,$filter,$timeout,$route,AppParamListByGroup,AppParamDelete,$PAGE_SIZE,LoadingScreen,UserRole,AppParam,Notification) {
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
	$scope.filtersText = "";

	$scope.deleteParameterByGroup = function(namaParam){
		var checkDelete = confirm('Apakah anda ingin menghapus data '+namaParam+'?');
		if(checkDelete){
			AppParam.get({nama:namaParam}, {}, function(response){
				response.content.forEach(function (item) {
					AppParamDelete.delete({id:item.id},function(response){
						console.log(response);
						$scope.pageChanged(0);
					});
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				});
			});
		}
	}

	//filter
	$scope.filtersText = "";
		var matchesFilter = function (item, filter) {
		var match = true;

		if (filter.id === 'nama') {
			match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
				id: 'nama',
				title:  'Nama Parameter',
				placeholder: 'Filter by Nama Parameter...',
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
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

	$scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	$scope.pagingText = '';

	$scope.pageChanged = function(newPage) {
		AppParamListByGroup.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy === '' ? 'nama,asc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'desc' : 'asc'))
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
				$scope.contentItems = response.content;
				$scope.itemParameter = {};

				for( var i in $scope.contentItems ) {
				    $scope.items[i] = {
				    	'nama' : $scope.contentItems[i]
				    }
				}

				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});		//
	}

	$scope.pageChanged(0);
	
}]);
