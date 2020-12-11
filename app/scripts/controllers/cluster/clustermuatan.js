'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ClusterClustermuatanCtrl
 * @description
 * # ClustermuatanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
   .controller('ClustermuatanCtrl',['$scope', '$timeout', '$location','$window','AddCluster','ClusterList','DeleteCluster','ClusterDetail','ClusterEdit','ClusterMuatanList','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$timeout,$location,$window,AddCluster,ClusterList,DeleteCluster,ClusterDetail,ClusterEdit,ClusterMuatanList,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	$scope.items=[];
	$scope.locationPath = '/clusterutama/list';
	$scope.dataPost = {};
	$scope.dataEdit = {};
	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

     /* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	 // validation add
    $scope.validationAddMainCluster= function(){
	    if(valueField !== $scope.clusterUtama  ){
	      if(typeof $scope.clusterUtama != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.clusterUtama = '';
	      }
	    }
	}
	//validation edit
	$scope.validationEditMainCluster= function(){
	    if(valueField !== $scope.dataEdit.parentName){
	      if(typeof $scope.dataEdit.parentName != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dataEdit.parentName = '';
	      }
	    }
	}


    $scope.getListOfclusterUtama = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          ClusterList.get({
            nama: value
            
          }, function(response) {
          	console.log(response);
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
		// console.log(newPage);
		ClusterMuatanList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				console.log(response);
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
		if (filter.id === "nama") {
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
			title:  'Nama',
			placeholder: 'Filter Nama Cluster...',
			filterType: 'text'
		}
		],
		resultsCount: $scope.items.length,
		appliedFilters: [],
		onFilterChange: filterChange
	};
	//delete cluster
	$scope.deleteCluster = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			DeleteCluster.delete({id:idData},function(response){
				// console.log(response.$resolved);
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

	$scope.addClusterUtama = function(){
		var postCluster = {};
		var clusterUtama = $scope.clusterUtama;
		postCluster.nama = $scope.dataPost.namaCluster;
		postCluster.parentId = clusterUtama.id;

		AddCluster.save(postCluster,
			function(response){
				// console.log(response);
				if(response.$resolved){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				}
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
				
				$timeout(function() {
			        $window.location.reload();
			    }, 3000);
			},
			function(response){
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Koneksi tidak terhubung..."
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			});
	}

	//get id
	$scope.EditCluster = function(id){

		ClusterDetail.get({id:id}, function(response){
			// console.log(response);
	      LoadingScreen.hide();
				if(response !== undefined){
					$scope.dataEdit = response;
				}else{
					dataEmpty();
				}
			}, function(){
				dataEmpty();
			});
		// $scope.saveEditCluster(id);
	}

	$scope.saveEditCluster = function(id){
		var postEdit = {};
		var clusterUtamaEdit = $scope.dataEdit.parentName.id;
    	postEdit.parentId = $scope.dataEdit.parentName.id === undefined? $scope.dataEdit.parentId:$scope.dataEdit.parentName.id;
		postEdit.nama = $scope.dataEdit.nama;
		ClusterEdit.update({id:id},postEdit, 
			function(response){
				// console.log(response);
				if(response.id){
					var note  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification(note);
				}
				else{
					var note  = {
						type	: "error",
						message	: "Data gagal disimpan"
					};
					Notification.setNotification(note);
				}
			},
			function(response){
				var note  = {
					type	: "error",
					message	: "Data gagal disimpan"
				};
				Notification.setNotification(note);
			});
			$timeout(function() {
		        $window.location.reload();
		    }, 3000);

	}
	

}]);
