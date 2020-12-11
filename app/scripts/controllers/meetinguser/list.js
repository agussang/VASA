'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserNewCtrl
 * @description
 * # MeetingUserNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MeetingUserListCtrl', ['$scope','$location','$PAGE_SIZE','AppParam','MeetingUserList','LoadingScreen','Notification','MdmPelangganSearch','MeetingUserDelete', function($scope,$location,$PAGE_SIZE,AppParam,MeetingUserList, LoadingScreen, Notification,MdmPelangganSearch,MeetingUserDelete) {
    LoadingScreen.show();
    $scope.kodeCabang = localStorage.getItem('kodeCabang');
    $scope.items=[];

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
  		MeetingUserList.get(
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

          $scope.items.forEach(function(element) {
              element.idAgen = element.mplgKode;
          });
        
  				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
  		});
  	}

    $scope.pageChanged(0);

  	//start function for filter
   	$scope.filtersText = "";

    var matchesFilter = function (item, filter) {
  	var match = true;
      
  		if (filter.id === "username") {
  			match = item.username.toLowerCase().match(filter.value.toLowerCase()) !== null;
  		} else if (filter.id === "userRole") {
  			match = item.userRole.toLowerCase().match(filter.value.toLowerCase()) !== null;
  		}else if (filter.id === "mplgKode") {
  			match = item.mplgKode.toLowerCase().match(filter.value.toLowerCase()) !== null;
  		}else if (filter.id === 'email') {
  			match = item.email.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
    			id: 'username',
    			title: 'Username',
    			placeholder: 'Filter by Username...',
    			filterType: 'text'
    		},
    		{
    			id: 'userRole',
    			title: 'Role',
    			placeholder: 'Filter by Role...',
    			filterType: 'text'
    		},
    		{
    			id: 'mplgKode',
    			title:  'Kode Agen',
    			placeholder: 'Filter by Kode Agen...',
    			filterType: 'text'
    		},
    		{
    			id: 'email',
    			title:  'Email',
    			placeholder: 'Filter by Email...',
    			filterType: 'text'
    		}
  		],
  		resultsCount: $scope.items.length,
  		appliedFilters: [],
  		onFilterChange: filterChange
  	};

  	$scope.deleteMeetingUser = function(idData){
  		var checkDelete = confirm('Apakah anda ingin menghapus data?');
  		if(checkDelete){
  			MeetingUserDelete.delete({id:idData},function(response){
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
