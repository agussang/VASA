'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KademeterKedalamanCtrl
 * @description
 * # KademeterKedalamanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
 .controller('KademeterKedalamanCtrl',['$scope', '$timeout', '$location','$window','AddKedalaman','KedalamanList','DeleteKedalaman','KedalamanDetail','KedalamanEdit','MdmDermagaSearchByKode','MdmDermagaPerJasa','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$timeout,$location,$window,AddKedalaman,KedalamanList,DeleteKedalaman,KedalamanDetail,KedalamanEdit,MdmDermagaSearchByKode,MdmDermagaPerJasab,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show(); 
	//list data
	$scope.items=[];
	$scope.locationPath = '';
	$scope.dataPost = {};
	$scope.dataEdit = {};
	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };
    $scope.optionWarna = [{name:'Merah', value:'#cc0000'},{name:'Kuning',value:'#e3e616'},{name:'Hijau',value:'#23d426'},{name:'Biru',value:'#00659c'},{name:'Abu-abu',value:'#4d5258'}];
	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;

	/* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	  $scope.resetAddKedalaman = function(){
	  	$scope.dataPost={};

	  	// $scope.dataPost.kadeAwal = '';
	  	// $scope.dataPost.kadeAkhir='';
	  	// $scope.dataPost.kedalaman='';
	  	// $scope.dataPost.warna='';
	  	$scope.dermaga='';

	  	// $scope.AddKedalaman.$setPristine();
    	$scope.AddKedalaman.$setUntouched();
	  	
	  }

	 // validation add
    $scope.validationAddKedalaman= function(){
	    if(valueField !== $scope.dermaga){
	      if(typeof $scope.dermaga != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dermaga = '';
	      }
	    }
	}
	//autocomplete
	$scope.getListOfDermagaLabuh = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				MdmDermagaSearchByKode.get({
					kode: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
								response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				MdmDermagaPerJasa.get({
					nama: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
								response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		}
	};
	
	$scope.pageChanged = function(newPage) {
		KedalamanList.get(
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


				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}



    $scope.pageChanged(0);

	//start function for filter
 	$scope.filtersText = "";

    var matchesFilter = function (item, filter) {
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

	//delete kedalaman
	$scope.deleteKedalaman = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			DeleteKedalaman.delete({id:idData},function(response){
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

	$scope.addKedalaman = function(){
		var postKedalaman = {};
		postKedalaman.kadeAwal = $scope.dataPost.kadeAwal;
		postKedalaman.kadeAkhir = $scope.dataPost.kadeAkhir;
		postKedalaman.kedalaman = $scope.dataPost.kedalaman;
		postKedalaman.warna = $scope.dataPost.warna;
		postKedalaman.kodeDermaga = $scope.dermaga.mdmgKode;

		AddKedalaman.save(postKedalaman,
			function(response){
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
					$scope.pageChanged(0);
			        //$window.location.reload();
			    }, 2000);
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
	$scope.EditKedalamanKademeter = function(id){
		KedalamanDetail.get({id:id}, function(response){
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

	$scope.saveEditKedalaman = function(id){
		var postEdit = {};
		// var clusterUtamaEdit = $scope.dataEdit.parentName.id;
		postEdit.kadeAwal = $scope.dataEdit.kadeAwal;
		postEdit.kadeAkhir = $scope.dataEdit.kadeAkhir;
		postEdit.kedalaman = $scope.dataEdit.kedalaman;
		postEdit.warna = $scope.dataEdit.warna;
		// postEdit.kodeDermaga = $scope.dataEdit.namaDermaga.mdmgKode;
    	postEdit.kodeDermaga = $scope.dataEdit.namaDermaga.mdmgKode === undefined? $scope.dataEdit.kodeDermaga:$scope.dataEdit.namaDermaga.mdmgKode;
		
		KedalamanEdit.update({id:id},postEdit, 
			function(response){
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
				$scope.pageChanged(0);
		        //$window.location.reload();
		    }, 2000);

	}
	

}]);

