'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KademeterdermagaCtrl
 * @description
 * # KademeterdermagaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
 .controller('KademeterdermagaCtrl',['$scope', '$timeout', '$location','$window','AddKademeter','KademeterList','DeleteKademeter','KademeterDetail','KademeterEdit','MdmDermagaSearchByKode','MdmDermagaPerJasa','ClusterMuatanList','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$timeout,$location,$window,AddKademeter,KademeterList,DeleteKademeter,KademeterDetail,KademeterEdit,MdmDermagaSearchByKode,MdmDermagaPerJasa,ClusterMuatanList,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
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

	 // validation add
    $scope.validationAddKademeter= function(){
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

	 // validation edit
    $scope.validationEditKademeter= function(){
	    if(valueField !== $scope.dataEdit.namaDermaga){
	      if(typeof $scope.dataEdit.namaDermaga != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dataEdit.namaDermaga = '';
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
							// console.log(response);
								// response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
								response.mdmgNamaKode = response.mdmgNama +' (Panjang: '+formatSeparator(response.mdmgPanjang)+')';
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

	/* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	 // validation add
    $scope.validationAddClusterMuatan= function(){
	    if(valueField !== $scope.dataEdit.pembagiAnakan  ){
	      if(typeof $scope.dataEdit.pembagiAnakan != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dataEdit.pembagiAnakan = '';
	      }
	    }
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

    KademeterList.get(function(response){
        // console.log(response);
        $scope.clusterKademeter = response.content;

    });
	
	$scope.pageChanged = function(newPage) {
		
		var kdDermaga = undefined;
		if($scope.kodeDermaga !== undefined){
			kdDermaga = $scope.kodeDermaga.mdmgKode;

		}
		// console.log(kdDermaga);
		KademeterList.get(
			{
				size : $scope.optionSizePage.selectedOption.number,
				kdDermaga: kdDermaga,
				page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				// console.log(response);
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
	// 	if (filter.id === "namaDermaga") {
	// 		match = item.namaDermaga.toLowerCase().match(filter.value.toLowerCase()) !== null;
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

  //   var filterChange = function (filters) {
		// filters.forEach(function (filter) {
		// 	$scope.filtersText += filter.title + " : " + filter.value + "\n";
		// });
		// applyFilters(filters);
  //   };
    $scope.$watch('selectionSearch', function(val)
	{
		$scope.filterMinLength = 0;
		if(val.id === 'namaDermaga'){
	   		$scope.filterMinLength = 3;
		}else if(val.id === 'noPpk1'){
	   		$scope.filterMinLength = 9;
		}
		$scope.filterPlaceholder = val.placeholder;
	});

	$scope.filterConfig = [
		{
			id: 'namaDermaga',
			title:  'Nama Dermaga',
			placeholder: 'Filter by Nama Dermaga'
		}
	];

	//delete kademeter
	$scope.deleteKademeter = function(idData){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			DeleteKademeter.delete({id:idData},function(response){
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

	$scope.addKademeterDermaga = function(){
		var postKademeter = {};
		postKademeter.kadeAwal = $scope.dataPost.kadeAwal;
		postKademeter.kadeAkhir = $scope.dataPost.kadeAkhir;
		postKademeter.warna = $scope.dataPost.warna;
		postKademeter.kodeDermaga = $scope.dermaga.mdmgKode;
		postKademeter.clusteringId = $scope.clusterMuatan.id;
		AddKademeter.save(postKademeter,
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
	$scope.editKademeter = function(id){
		KademeterDetail.get({id:id}, function(response){
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

	$scope.saveEditKademeter = function(id){
		var postEdit = {};
		postEdit.kadeAwal = $scope.dataEdit.kadeAwal;
		postEdit.kadeAkhir = $scope.dataEdit.kadeAkhir;
		postEdit.warna = $scope.dataEdit.warna;
    	postEdit.kodeDermaga = $scope.dataEdit.namaDermaga.mdmgKode === undefined? $scope.dataEdit.kodeDermaga:$scope.dataEdit.namaDermaga.mdmgKode;
    	postEdit.clusteringId = $scope.dataEdit.pembagiAnakan.id === undefined? $scope.dataEdit.clusteringId:$scope.dataEdit.pembagiAnakan.id;
    	// console.log(postEdit);
    	// return;
		KademeterEdit.update({id:id},postEdit, 
			function(response){
				if(response.kodeError == null){
					var note  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification(note);
					$timeout(function() {
						$scope.pageChanged(0);
				        //$window.location.reload();
				    }, 2000);
				}
				else{
					$('#EditkademeterDermaga').modal('hide');
					var note  = {
						type	: "error",
						message	: response.pesanError
					};
					Notification.setNotification(note);
				}
			},
			function(response){
				$('#EditkademeterDermaga').modal('hide');
				var note  = {
					type	: "error",
					message	: "Data gagal disimpan"
				};
				Notification.setNotification(note);
			});
	}

	$scope.resetSearch = function () {
		$scope.kodeDermaga ='';
		// $scope.btnResetSearch = false;
		// $scope.loadingResetSearch = true;
  		$scope.pageChanged(0);
    };

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
}]);

