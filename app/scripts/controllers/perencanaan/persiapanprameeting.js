'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PersiapanprameetingCtrl
 * @description
 * # PersiapanprameetingCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PersiapanprameetingCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','PersiapanPrameeting','ClusterMuatanList','PrioritasKapalList','PrameetingSave','PrameetingUpdate','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole','PushToMeetingOnline',function ($scope,$filter,$timeout,$routeParams,$location,$window,PersiapanPrameeting,ClusterMuatanList,PrioritasKapalList,PrameetingSave,PrameetingUpdate,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole,PushToMeetingOnline) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	$scope.items=[];
	var filterTglAwal = undefined;
	var filterTglAkhir = undefined;
	var dateToday = new Date();
    $scope.tanggalPenetapan = $filter('date')(dateToday, 'dd-MM-yyyy');
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

 //    $scope.tglMulai = new Date();
 //    $scope.tglAkhir = new Date();

    
 //    $scope.$watch('tglMulai', function(){
	// 	$('#tanggalMulaiId').mask('99-99-9999');
	// });
	// $scope.$watch('tglAkhir', function(){
	// 	$('#tanggalAkhirId').mask('99-99-9999');
	// });

	/* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	// validation edit
    $scope.validationAddClusterMuatan= function(){
	    if(valueField !== $scope.clusterMuatan  ){
	      if(typeof $scope.clusterMuatan != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.clusterMuatan = '';
	      }
	    }
	}
	 $scope.getListOfClusterMuatan = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          ClusterMuatanList.get({
            nama: value
            
          }, function(response) {
            resolve(response.content);
          });
        });
      }
    };

    $scope.validationAddPrioritasKapal= function(){
	    if(valueField !== $scope.prioritasKapal  ){
	      if(typeof $scope.prioritasKapal != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.prioritasKapal = '';
	      }
	    }
	}
	$scope.getListOfPrioritasKapal = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          PrioritasKapalList.get({
            namaPrioritas: value
            
          }, function(response) {
          	
            resolve(response.content);
          });
        });
      }
    };

	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	
	
	$scope.pageChanged = function(newPage) {
		var tanggalFilter = $scope.tanggalPenetapan.split("-");
		var conTglFilter = tanggalFilter[2]+"-"+tanggalFilter[1]+"-"+tanggalFilter[0];
		
		PersiapanPrameeting.get(
			{
				tglPenetapan : conTglFilter,
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
	}



     $scope.pageChanged(0);

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

	$scope.save = function(){
		$scope.dataUpdate = [];
		$scope.dataSave = [];

		for(var i=0; i<$scope.items.length; i++){


			if(typeof $scope.items[i].clusteringNama == "string"){
				$scope.items[i].clusteringId = $scope.items[i].clusteringId;

			}else if($scope.items[i].clusteringNama == null){
				$scope.items[i].clusteringId = $scope.items[i].clusteringId;
			}else if(typeof $scope.items[i].clusteringNama == "object"){
				$scope.items[i].clusteringId = $scope.items[i].clusteringNama.id;
				$scope.items[i].clusteringNama = null;

			}
			if(typeof $scope.items[i].prioritasKapalNama == "string"){
				$scope.items[i].prioritasKapalId = $scope.items[i].prioritasKapalId;
				$scope.items[i].prioritas = $scope.items[i].prioritas;
			}else if($scope.items[i].prioritasKapalNama == null){
				$scope.items[i].prioritasKapalId = $scope.items[i].prioritasKapalId;
				$scope.items[i].prioritas = $scope.items[i].prioritas;
			}else if(typeof $scope.items[i].prioritasKapalNama == "object"){
				$scope.items[i].prioritasKapalId = $scope.items[i].prioritasKapalNama.id;
				$scope.items[i].prioritas = $scope.items[i].prioritasKapalNama.prioritas;
				$scope.items[i].prioritasKapalNama = null;
			}


			$scope.items[i].kodeKapal = $scope.items[i].kodeKapal;
			$scope.items[i].komoditi = $scope.items[i].komoditi;
			$scope.items[i].noPpk1 = $scope.items[i].noPpk1;
			$scope.items[i].noPpkJasa = $scope.items[i].noPpkJasa;
			$scope.items[i].tglPrameeting = $scope.items[i].tglPrameeting;
			$scope.items[i].tl = $scope.items[i].tl;

			PrameetingSave.save($scope.items[i],function(response){
				// console.log(response);
	            if(response){
	            	// console.log("save");
	            	/* Push to Meeting Online*/
					PushToMeetingOnline.setMessage('tambahKapalPerencanaan',response,$scope.items[i]);
	            	$scope.pageChanged(0);
	            }
	        });

		
            
        }
	}
}]);


