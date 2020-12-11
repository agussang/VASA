'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ManajemenHistorikapaltundaCtrl
 * @description
 * # ManajemenHistorikapaltundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('ManajemenHistorikapaltundaCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','HistoriKapalTundaList','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$filter,$timeout,$routeParams,$location,$window,HistoriKapalTundaList,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	$scope.items=[];
	var filterTglAwal = undefined;
	var filterTglAkhir = undefined;
	$scope.showLoader = false;
	$scope.locationPath = '';
	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

    $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
    };

    $scope.tglMulai = new Date();
    $scope.tglAkhir = new Date();

    
    $scope.$watch('tglMulai', function(){
		$('#tanggalMulaiId').mask('99-99-9999');
	});
	$scope.$watch('tglAkhir', function(){
		$('#tanggalAkhirId').mask('99-99-9999');
	});

	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	
	
	$scope.pageChanged = function(newPage,tglMulai,tglAkhir) {
		if(tglMulai && tglAkhir !== 0){
			var filterTglAwal = $filter('date')(tglMulai, 'yyyy-MM-dd');
			var filterTglAkhir = $filter('date')(tglAkhir, 'yyyy-MM-dd');
		}
		HistoriKapalTundaList.get(
			{
				kodeKapal : $routeParams.kodeKapal,
				tglAwal : filterTglAwal,
				tglAkhir : filterTglAkhir,
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				// console.log(response);
				$scope.showLoader = false;
				LoadingScreen.hide();
				$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;
				for(var i=0; i<response.content.length; i++){
					// console.log(response.content[i].tglMulai);
					$scope.tglMulai = $filter('date')(response.content[i].tglMulai);

				}


				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}



     $scope.pageChanged(0,0,0);

	//start function for filter
 // 	$scope.filtersText = "";

 //    var matchesFilter = function (item, filter) {
 //    	// console.log(filter.value);
	// 	var match = true;
	// 	if (filter.id === "nama") {
	// 		match = item.nama.toLowerCase().match(filter.value.toLowerCase()) !== null;
	// 	}
	// 	return match;
 //    };

 //    var matchesFilters = function (item, filters) {
	// 	var matches = true;

	// 	filters.forEach(function(filter) {
	// 		if (!matchesFilter(item, filter)) {
	// 			matches = false;
	// 			return false;
	// 		}
	// 	});
	// 	return matches;
 //    };

 //    var applyFilters = function (filters) {
	// 	$scope.items = [];
	// 	if (filters && filters.length > 0) {
	// 		$scope.allItems.forEach(function (item) {
	// 			if (matchesFilters(item, filters)) {
	// 				$scope.items.push(item);

	// 			}
	// 		});
	// 	} else {
	// 		$scope.items = $scope.allItems;
	// 	}
	// 	$scope.filterConfig.resultsCount = $scope.items.length;
	// };

 //    var filterChange = function (filters) {
	// 	filters.forEach(function (filter) {
	// 		$scope.filtersText += filter.title + " : " + filter.value + "\n";
	// 	});
	// 	applyFilters(filters);
 //    };


	// $scope.filterConfig = {
	// 	fields: [
	// 	{
	// 		id: 'nama',
	// 		title:  'Nama',
	// 		placeholder: 'Filter Nama Cluster...',
	// 		filterType: 'text'
	// 	}
	// 	],
	// 	resultsCount: $scope.items.length,
	// 	appliedFilters: [],
	// 	onFilterChange: filterChange
	// };

	$scope.prosesFilter = function(){
		$scope.showLoader = true;
		var filterTanggalMulai = new Date($scope.tglMulai);
		var filterTanggalAkhir = new Date($scope.tglAkhir);

		$scope.pageChanged(0,filterTanggalMulai,filterTanggalAkhir);

	}
	
}]);

