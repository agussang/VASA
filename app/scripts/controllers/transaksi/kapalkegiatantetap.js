'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiKapalKegiatanTetapCtrl
 * @description
 * # TransaksiKapalKegiatanTetapCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiKapalKegiatanTetapCtrl',['$scope','$filter','LoadingScreen','KapalKegiatanTetapBill','$PAGE_SIZE','UserRole', function($scope,$filter,LoadingScreen,KapalKegiatanTetapBill,$PAGE_SIZE,UserRole){
  $scope.userRole = UserRole.getCurrentRole();

  $scope.items=[];

  $scope.search = {};

  $scope.parent = {tanggal:''};
  var currentDate = new Date();
  $scope.search.tglFilter = $filter('date')(currentDate,'MM-yyyy');
  var splitDate = $scope.search.tglFilter.split('-');
  $scope.bulanLaporan = splitDate[0];
  $scope.tahunLaporan = splitDate[1];


  LoadingScreen.show();
   $scope.data = [];
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
    KapalKegiatanTetapBill.get(
    	{
    		size : $scope.optionSizePage.selectedOption.number,
    		page : newPage - 1,
        sort : $scope.sortBy === '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc')),
        periodeBulan: parseInt($scope.bulanLaporan),
        periodeTahun: parseInt($scope.tahunLaporan)
    	},
    	function(response){
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
    	// console.log(filter.value);
		var match = true;
		if (filter.id === "Tgl. Perhitungan") {
			match = item.tglFilter.toLowerCase().match(filter.value.toLowerCase()) !== null;
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
			id: 'tglPerhitungan',
			title:  'Tgl. Perhitungan',
			placeholder: 'Filter by Tgl. Perhitungan...',
			filterType: 'date'
		}
		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};



      $scope.expandAll = function (expanded) {
          $scope.$broadcast('onExpandAll', {expanded: expanded});
      };

      $scope.$watch('search.tglFilter', function(newValue) {
    				var splitDate = newValue.split('-');
    				$scope.bulanLaporan = splitDate[0];
    				$scope.tahunLaporan = splitDate[1];
    			  var newDate = new Date(splitDate[1],splitDate[0]-1)
    			  $scope.currentMonth = $filter('uppercase')($filter('date')(newDate,'MMMM-yyyy'));
            $scope.pageChanged(0);
    	});

 }]);
