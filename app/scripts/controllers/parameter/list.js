'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhListCtrl
 * @description
 * # LabuhListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('ParameterListCtrl',['$scope','$window','$routeParams','$filter','AppParam','AppParamDelete','$PAGE_SIZE','LoadingScreen','UserRole',function ($scope,$window,$routeParams,$filter,AppParam,AppParamDelete,$PAGE_SIZE,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	//list data
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

	$scope.deleteparameter = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			AppParamDelete.delete({id:idData},function(response){
				if(response.$resolved == true){
					$scope.pageChanged();
				}
			});
		}
	}

//filter
 $scope.filtersText = "";
	 var matchesFilter = function (item, filter) {
	 var match = true;

	 if (filter.id === 'nama') {
		 match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
	 } else if (filter.id === 'caption') {
		 match = item.caption.toLowerCase().match(filter.value.toLowerCase()) !== null;
	 } else if (filter.id === 'isNumeric') {
		 match = item.isNumeric.match(filter.value) !== null;
	 } else if (filter.id === 'value') {
		 match = item.value.toLowerCase().match(filter.value.toLowerCase()) !== null;

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
			},
			{
				id: 'caption',
				title:  'Judul',
				placeholder: 'Filter by judul...',
				filterType: 'text'
			},
			{
				id: 'value',
				title:  'Nilai',
				placeholder: 'Filter by Nilai...',
				filterType: 'text'
			},
			{
				id: 'isNumeric',
				title:  'Value Berupa Angka',
				placeholder: 'Filter by Value Berupa Angka...',
				filterType: 'select',
				filterValues:['YA','TIDAK']
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
		AppParam.get(
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

				var active = "YA";
				var non_active = "TIDAK";
				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].isNumeric = ($scope.items[i].isNumeric == true ?active:non_active);
				}

				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}

		$scope.pageChanged(0);



 }]);
