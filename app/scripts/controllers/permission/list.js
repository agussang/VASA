'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PermissionListCtrl
 * @description
 * # PermissionListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PermissionListCtrl', ['$scope','$PAGE_SIZE','PermissionList','PermissionDelete','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$PAGE_SIZE,PermissionList,PermissionDelete,Notification,AppParam,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	$scope.items = [];


	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };;

	//start List and paging
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	$scope.pageChanged = function(newPage) {

		PermissionList.get(
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
				var active 		= "fa fa-check-square-o";
				var non_active 	= "fa fa-square-o";
				for (var i = 0; i<$scope.items.length; i++ ){
					$scope.items[i].cflag = ($scope.items[i].cflag?active:non_active);
					$scope.items[i].rflag = ($scope.items[i].rflag?active:non_active);
					$scope.items[i].uflag = ($scope.items[i].uflag?active:non_active);
					$scope.items[i].dflag = ($scope.items[i].dflag?active:non_active);
					$scope.items[i].pflag = ($scope.items[i].pflag?active:non_active);
				}
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			}
		);
	}

	$scope.pageChanged(0);

	//function for filter
	//filter
	 $scope.filtersText = "";
		 var matchesFilter = function (item, filter) {
		 var match = true;

		 if (filter.id === 'kodeMenu') {
			 match = item.kodeMenu.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'namaMenu') {
			 match = item.namaMenu.toLowerCase().match(filter.value.toLowerCase()) !== null;
		 } else if (filter.id === 'grupText') {
			 match = item.grupText.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
				id: 'kodeMenu',
				title:  'ID Menu',
				placeholder: 'Filter by ID Menu...',
				filterType: 'text'
			},
			{
				id: 'namaMenu',
				title:  'Nama menu',
				placeholder: 'Filter by nama menu...',
				filterType: 'text'
			},
			{
				id: 'grupText',
				title:  'Group',
				placeholder: 'Filter by group...',
				filterType: 'text'
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };


	//start function for delete
	$scope.deletePermission = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			PermissionDelete.delete({id:id},
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

}]);
