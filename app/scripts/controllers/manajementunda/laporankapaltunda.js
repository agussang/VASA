'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ManajemenLaporankapaltundaCtrl
 * @description
 * # ManajemenLaporankapaltundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('ManajemenLaporankapaltundaCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','LaporanDowntimeKapalTunda','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$filter,$timeout,$routeParams,$location,$window,LaporanDowntimeKapalTunda,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	   $scope.userRole = UserRole.getCurrentRole();

	     //list data
	      $scope.items=[];
	       var filterTglAwal = $filter('date')(new Date(),'yyyy-MM');

	      $scope.showLoader = false;
	      $scope.locationPath = '';
	      $scope.optionSizePage = {
	         availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	         selectedOption: {number: $PAGE_SIZE} //default select option size
        };

        $scope.options = {
          autoclose: true,
          viewMode: "months",
          format: "mm-yyyy",
          minViewMode: "months",
          language: 'id'
        };

  	    var currentDate = new Date();
        $scope.tglMulai =  new Date();


        $scope.$watch('tglMulai', function(){
		        $('#tanggalMulaiId').mask('99-9999');
	      });


	       // PAGING
        $scope.currentPage = 1;
	      $scope.pageSize = $scope.optionSizePage.selectedOption.number;
	      $scope.totalItems = 0;
	      $scope.totalPages = 0;
	      $scope.sortBy = '';
	      $scope.sortDesc = false;


	      $scope.pageChanged = function(newPage,tglMulai) {
           LoadingScreen.show();
		        if(tglMulai !== 0){
			           var filterTglAwal = $filter('date')(tglMulai, 'yyyy-MM');
		        }

		        LaporanDowntimeKapalTunda.get(
			           {
					            bulan : filterTglAwal,
				              size : $scope.optionSizePage.selectedOption.number,
				              page : newPage - 1,
				              sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			            },
			            function(response) {
				          console.log(response);
				          $scope.showLoader = false;
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
	            };



	      $scope.prosesFilter = function(){
		        $scope.showLoader = true;
		        var filterTanggalMulai = new Date($scope.tglMulai);
		        $scope.pageChanged(0,filterTanggalMulai);
		    };

}]);
