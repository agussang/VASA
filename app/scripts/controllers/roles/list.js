'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RolesListCtrl
 * @description
 * # RolesListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RolesListCtrl', ['$scope','$PAGE_SIZE','RolesList','RolesDelete','Notification','LoadingScreen','UserRole',function ($scope,$PAGE_SIZE,RolesList,RolesDelete,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	$scope.items = [];

	// PAGING
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
		RolesList.get(
		{
			size : $scope.optionSizePage.selectedOption.number,
			page : newPage - 1,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		},
		function(response) {
			LoadingScreen.hide();
			$scope.currentPage = response.number + 1;
			$scope.pageSize = $scope.optionSizePage.selectedOption.number;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = $scope.allItems;

			for (var i = 0; i<$scope.items.length; i++ ){

				$scope.items[i].status = ($scope.items[i].status  ?"AKTIF":"TIDAK AKTIF");
			}
			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
	});
}

		$scope.pageChanged(0);


		//filter
		 $scope.filtersText = "";
			 var matchesFilter = function (item, filter) {
			 var match = true;

			 if (filter.id === 'nama') {
				 match = item.namaRole.toLowerCase().match(filter.value.toLowerCase()) !== null;
			 } else if (filter.id === 'kode') {
				 match = item.kodeRole.toLowerCase().match(filter.value.toLowerCase()) !== null;
			 } else if (filter.id === 'keterangan') {
				 match = item.keterangan.toLowerCase().match(filter.value.toLowerCase()) !== null;
			 } else if (filter.id === 'kodeCabang') {
				 match = item.kodeCabang.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
				id: 'kode',
				title:  'Kode Role',
				placeholder: 'Filter by kode role...',
				filterType: 'text'
			},
			{
				id: 'nama',
				title:  'Nama Role',
				placeholder: 'Filter by nama role...',
				filterType: 'text'
			},
			{
				id: 'keterangan',
				title: 'Keterangan',
				placeholder: 'Filter by keterangan...',
				filterType: 'text'
			},
			{
				id: 'kodeCabang',
				title: 'Kode Cabang',
				placeholder: 'Filter by Kode Cabang...',
				filterType: 'text'
			}
      	],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
    };


	//start function for delete
	$scope.deleteRoles = function(id){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			RolesDelete.delete({id:id},
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
