'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ListKedatanganKapalCtrl
 * @description
 * # ListKedatanganKapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('ListKedatanganKapalCtrl',['$scope','KedatanganList','$PAGE_SIZE','$rootScope','$interval','$filter',function ($scope,KedatanganList,$PAGE_SIZE,$rootScope,$interval,$filter) {
	$scope.kedatanganList = [];
	$scope.isLabuh = '';
	//$scope.sandarNamaKapal = '';

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

	var lonlattodms = function(lat,lon){
	  	// Retrieve Lat and Lon information
	  	if (lat == null){
			var lat = 0;
	  	}    
		if (lon == null){
			  var lon = 0;
		}

		// then a positive latitude value regards North, negative latitude value regards South
		if(lat > 0){
			var latDirection = 'N';
		}else{
			var latDirection = 'S';
		}

		// then a positive longitude value regards East, negative longitude value regards West
		if(lon > 0){
			var lonDirection = 'E';
		}else{
			var lonDirection = 'W';
		}

		// Change to absolute value
		lat = Math.abs(lat);
		lon = Math.abs(lon);

		// Convert to Degree Minutes Seconds Representation
		var LatDeg = Math.floor(lat);
		var LatMin = Math.floor((lat-LatDeg)*60);
		var LatSec = Math.round(((((lat - LatDeg) - (LatMin/60)) * 60 * 60) * 100)*100)/100 ;
		var LonDeg = Math.floor(lon);
		var LonMin = Math.floor((lon-LonDeg)*60);
		var LonSec = Math.round(((((lon - LonDeg) - (LonMin / 60 )) * 60 * 60) * 100)*100)/100;

		var latFormatter = LatDeg+'\xB0'+LatMin+'\' '+LatSec+'" '+latDirection;
		var lonFormatter = LonDeg+'\xB0'+LonMin+'\' '+LonSec+'" '+lonDirection;

		return (latFormatter +'	\xA0 \xA0 \xA0'+ lonFormatter);
	}
	var pageCurrent = 0;
	$scope.pageChanged = function(newPage) {
		pageCurrent = newPage;
		$scope.kedatanganList = [];
		var filter = {
			size : $scope.optionSizePage.selectedOption.number,
			page : newPage - 1,          
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}

		if($scope.isLabuh != ''){
			var x = ($scope.isLabuh == '1'?true:false);
			filter.isLabuh = x;
		}

		if($scope.tglDatangMulai != undefined && $scope.tglDatangSelesai != undefined){
			filter.tglDatangMulai = $filter('date')($scope.tglDatangMulai,'yyyy-MM-dd');
			filter.tglDatangSelesai = $filter('date')($scope.tglDatangSelesai,'yyyy-MM-dd');
		}

		if($scope.sandarNamaKapal){
        	filter.namaKapal = $filter('uppercase')($scope.sandarNamaKapal);
        }


		KedatanganList.get(filter,function(response) {
			$scope.currentPage = response.number + 1;
			$scope.noIndex = ($scope.currentPage-1)*response.size;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;          	
			response.content.forEach(function(item){
				item.posisi = lonlattodms(item.lat, item.lon);
			})
			$scope.allItems = response.content;
			$scope.kedatanganList = $scope.allItems;
			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
			$scope.currentPage)+' of '+$scope.totalItems;
		});
	}

	$scope.pageChanged(0);

	$scope.pmhInterval = function(){
	  $rootScope.startPmh = $interval(function() {
		  $scope.pageChanged(pageCurrent);
	  }, 600000);
	}

	$scope.pmhInterval();

	$scope.reset = function(){
		$scope.tglDatangMulai = undefined;
		$scope.tglDatangSelesai = undefined;
		$scope.isLabuh = '';
		$scope.sandarNamaKapal = undefined;
		$scope.pageChanged(0);
	};

	$scope.filter = function(){
		$scope.pageChanged(0);
	}
}]);