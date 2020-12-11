'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanTambahkapalCtrl
 * @description
 * # PerencanaanTambahkapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaanTambahkapalCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','PrameetingAddKapal','ClusterMuatanList','PrameetingSave','PrameetingUpdate','ListKapalRekomendasi','KademeterList','UpdateStatusTl','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole','MdmDermagaByKodeCabang','PindahDermaga','MdmDermagaSearchByKode','PushToMeetingOnline',function ($scope,$filter,$timeout,$routeParams,$location,$window,PrameetingAddKapal,ClusterMuatanList,PrameetingSave,PrameetingUpdate,ListKapalRekomendasi,KademeterList,UpdateStatusTl,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole,MdmDermagaByKodeCabang,PindahDermaga,MdmDermagaSearchByKode,PushToMeetingOnline) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	var kdDermaga = $routeParams.kodeDermaga;
    var tglParams =  $routeParams.tgl;
	var idMeetingSusulan = $routeParams.isMeetingSusulan;
	$scope.allDataitems = [];
	$scope.detailRkbm = {};
	$scope.idDermaga = kdDermaga;

	var filterTglAwal = undefined;
	var filterTglAkhir = undefined;
	var dateToday = new Date();
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
	KademeterList.get({kdDermaga:kdDermaga},function(response){       
       $scope.item = [];
        $scope.clusteringNama = response.content;
        // console.log($scope.item.clusteringNama);
    });

	MdmDermagaByKodeCabang.get({kodeCabang: localStorage.getItem('kodeCabang')},function(response) {
		$scope.dermaga = response;
	}); 

    MdmDermagaSearchByKode.get({
		kode: kdDermaga,
		kodeTerminal : localStorage.getItem('kodeTerminal'),
		limit: '10'		
	},
	 function(response) {
		// resolve(response);
		response.forEach(function (x) { 
			if(x.mdmgKode === kdDermaga){		
				$scope.namaDermaga = x.mdmgNama; 
			} 
		});
	});

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

 //    $scope.validationAddPrioritasKapal= function(){
	//     if(valueField !== $scope.prioritasKapal  ){
	//       if(typeof $scope.prioritasKapal != 'object' ){
	//         $scope.setNotification  = {
	//           type  : 'warning',
	//           message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	//         };
	//         Notification.setNotification($scope.setNotification);
	//         $scope.prioritasKapal = '';
	//       }
	//     }
	// }
	// $scope.getListOfPrioritasKapal = function(value) {
 //      if (value) {
 //        return new Promise(function(resolve, reject) {
 //          PrioritasKapalList.get({
 //            namaPrioritas: value
            
 //          }, function(response) {
          	
 //            resolve(response.content);
 //          });
 //        });
 //      }
 //    };

    $scope.$watch('selectionSearch', function(val)
	{
		$scope.filterMinLength = 0;
		if(val.id === 'namaKapal'){
	   		$scope.filterMinLength = 3;
		}else if(val.id === 'noPpk1'){
	   		$scope.filterMinLength = 9;
		}
		$scope.filterPlaceholder = val.placeholder;
	});

	$scope.filterConfig = [
		{
			id: 'namaKapal',
			title:  'Nama Kapal',
			placeholder: 'Filter by Nama Kapal'
		}
	];

	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	
	
	$scope.pageChanged = function(newPage, kdDermaga, m) {
		//$scope.items=[];
		//$scope.itemsNoComplete = [];
		var namaKapal = undefined;
		if($scope.namaKapal !== undefined){
			namaKapal = $scope.namaKapal;
			m = 'search';
		}
		if($routeParams.kodeDermaga == $scope.idDermaga){ console.log('4');
			if(m == null){
				$scope.items=[];
			}					
			$scope.itemsNoComplete = [];
		}else{
			$scope.itemsNoComplete = [];
		}

		var namaKapal = undefined;
		if($scope.namaKapal !== undefined){
			namaKapal = $scope.namaKapal;

		}
		// console.log(namaKapal);
		
		PrameetingAddKapal.get(
			{
				tglPerencanaan : tglParams,
				kdDermaga: $scope.idDermaga,
				namaKapal: namaKapal,
				//size : $scope.optionSizePage.selectedOption.number,
				//page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				// console.log(response);
				// $scope.showLoader = false;
				LoadingScreen.hide();
				/*$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;*/
				$scope.allDataitems = response;
				if(m == null){
					for(var i=0; i<$scope.allDataitems.length; i++){
						if($scope.allDataitems[i].errorMessage != null){
							$location.path('/perencanaan/'+kdDermaga+'/'+tglParams);
						}

					}
				}

				$scope.allDataitems.forEach(function(item){
                    $scope.itemsNoComplete.push(item);
                });

				var dataKapalA = $scope.itemsNoComplete;
				if($scope.items.length != 0){
					$scope.items.forEach(function(j){
						for(var i=0; i<dataKapalA .length; i++){
				        	if(dataKapalA[i].noPpkJasa == j.noPpkJasa){
				        		$scope.itemsNoComplete.splice(i,1);
				        	}
			        	}
					})					
				}

				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		});
	}

	$scope.resetSearch = function(){
		$scope.namaKapal = "";
		$scope.pageChanged(0, kdDermaga,null);
		LoadingScreen.show();
	}

    $scope.pageChanged(0,kdDermaga,null);

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

	$scope.swapUp = function(item, index){
		// console.log(index);
      var otherItemPos = 0;
      if (index >= 1) {
        while (otherItemPos < index) {
          otherItemPos++;
          break;
        }
        var noPpk1 = item[index].noPpk1;
        var noPpkJasa = item[index].noPpkJasa;
        var namaKapal = item[index].namaKapal;
        var clusterKapal = item[index].clusteringNama;
        var clusterKapalId = item[index].clusteringId;
        var prameeting = item[index].isPrameeting;
        var TL = item[index].tl;
        var TglJamPermohonan = item[index].tglPermohonan;
        var TglJamMasukPelabuhan = item[index].tglMasukPelabuhan;

        item[index].noPpk1 = item[index - otherItemPos].noPpk1;
        item[index].noPpkJasa = item[index - otherItemPos].noPpkJasa;
        item[index].namaKapal = item[index - otherItemPos].namaKapal;
        item[index].clusteringNama = item[index - otherItemPos].clusteringNama;
        item[index].clusteringId = item[index - otherItemPos].clusteringId;
        item[index].isPrameeting = item[index - otherItemPos].isPrameeting;
        item[index].tl = item[index - otherItemPos].tl;
        item[index].tglPermohonan = item[index - otherItemPos].tglPermohonan;
        item[index].tglMasukPelabuhan = item[index - otherItemPos].tglMasukPelabuhan;

        
        item[index - otherItemPos].noPpk1 = noPpk1;
        item[index - otherItemPos].noPpkJasa = noPpkJasa;
        item[index - otherItemPos].namaKapal = namaKapal;
        item[index - otherItemPos].clusteringNama = clusterKapal;
        item[index - otherItemPos].clusteringId = clusterKapalId;
        item[index - otherItemPos].isPrameeting = prameeting;
        item[index - otherItemPos].tl = TL;
        item[index - otherItemPos].tglPermohonan = TglJamPermohonan;
        item[index - otherItemPos].tglMasukPelabuhan = TglJamMasukPelabuhan;

       
      }
      
      
    };

    $scope.swapDown = function(item, index){
      var otherItemPos = 1;
      if (index < $scope.items.length - 1) {
        while (otherItemPos < $scope.items.length - index) {
          	break;
            otherItemPos++;
            
        }
        if (otherItemPos !== $scope.items.length - index) {
          	var noPpk1 = item[index].noPpk1;
          	var noPpkJasa = item[index].noPpkJasa;
	        var namaKapal = item[index].namaKapal;
	        var clusterKapal = item[index].clusteringNama;
	        var clusterKapalId = item[index].clusteringId;
	        var prameeting = item[index].isPrameeting;
	        var TL = item[index].tl;
	        var TglJamPermohonan = item[index].tglPermohonan;
        	var TglJamMasukPelabuhan = item[index].tglMasukPelabuhan;


	        item[index].noPpk1 = item[index + otherItemPos].noPpk1;
	        item[index].noPpkJasa = item[index + otherItemPos].noPpkJasa;
	        item[index].namaKapal = item[index + otherItemPos].namaKapal;
	        item[index].clusteringNama = item[index + otherItemPos].clusteringNama;
	        item[index].clusteringId = item[index + otherItemPos].clusteringId;
	        item[index].isPrameeting = item[index + otherItemPos].isPrameeting;
	        item[index].tl = item[index + otherItemPos].tl;
	        item[index].tglPermohonan = item[index + otherItemPos].tglPermohonan;
	        item[index].tglMasukPelabuhan = item[index + otherItemPos].tglMasukPelabuhan;


	        
	        item[index + otherItemPos].noPpk1 = noPpk1;
	        item[index + otherItemPos].noPpkJasa = noPpkJasa;
	        item[index + otherItemPos].namaKapal = namaKapal;
	        item[index + otherItemPos].clusteringNama = clusterKapal;
	        item[index + otherItemPos].clusteringId = clusterKapalId;
	        item[index + otherItemPos].isPrameeting = prameeting;
	        item[index + otherItemPos].tl = TL;
	        item[index + otherItemPos].tglPermohonan = TglJamPermohonan;
	        item[index + otherItemPos].tglMasukPelabuhan = TglJamMasukPelabuhan;


        }
      }
    };

  	$scope.changeTL = function(item,index){
  		$scope.items[index].prameeting == false;
  		// console.log($scope.items[index].tl);
  	} 
  	$scope.changePr = function(item,index){
  		$scope.items[index].tl == false;
  		// console.log($scope.items[index].prameeting);

  	} 

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
			if($scope.items[i].isPrameeting == null){
				$scope.items[i].isPrameeting =  false;
			}else{
				$scope.items[i].isPrameeting = $scope.items[i].isPrameeting;
			}
			$scope.items[i].kodeDermaga = kdDermaga;
			$scope.items[i].prioritas = i+1;
			$scope.items[i].kodeKapal = $scope.items[i].kodeKapal;
			$scope.items[i].noPpk1 = $scope.items[i].noPpk1;
			$scope.items[i].noPpkJasa = $scope.items[i].noPpkJasa;
			$scope.items[i].tglPrameeting = $scope.items[i].tglPrameeting;
			$scope.items[i].tl = $scope.items[i].tl;
			if(idMeetingSusulan == 1){
				$scope.items[i].isMeetingSusulan = true;
			}
			
			if($scope.items[i].tl == true){
				$scope.items[i].isPrameeting =  false;
			}
			if($scope.items[i].isPrameeting == true && $scope.items[i].clusteringId == null){
				$scope.setNotification  = {
		          type  : 'warning',
		          message : 'Data Prameeting, <b>Cluster tidak boleh kosong</b>'
		        };
		        Notification.setNotification($scope.setNotification);
		        break;
			}

			// console.log($scope.items[i]);
			PrameetingSave.save($scope.items[i],function(response){
				// console.log(response);
	            if(response){
	            	/* Push To Meeting Online */
	            	response.namaDermaga = $scope.namaDermaga;
	            	if(response.tl){
	            		PushToMeetingOnline.setMessage('tambahKapalTLPerencanaan',response,$scope.items[i]);
	            	}else{
						PushToMeetingOnline.setMessage('tambahKapalPerencanaan',response,$scope.items[i]);
	            	}
	            	$location.path('/perencanaan/'+kdDermaga+'/'+tglParams);
	            }
	        });

		
            
        }
	}

	$scope.moveToPrameeting = function(noPpkJasa){
		var dataKapalA = $scope.itemsNoComplete;

        if(kdDermaga != $scope.idDermaga){
			var confirmPindahDermaga = confirm('Permohonan Kapal ini tidak di dermaga '+ $scope.namaDermaga +'\n Apakan Anda yakin Kapal ini akan dipindahkan ke dermaga '+$scope.namaDermaga+' ?');
			if(confirmPindahDermaga){
				PindahDermaga.update({noPpkJasa:noPpkJasa,kodeLokasi:kdDermaga},function(response){
					if(response.$resolved == true){
						$scope.setNotification  = {
							type    : "success",
							message : "Kapal berhasil dipindahkan"
	                    };
	                    Notification.setNotification($scope.setNotification);
						$scope.itemsNoComplete.forEach(function(item){
					       if(item.noPpkJasa == noPpkJasa){
					       		item.clusteringId = $scope.clusteringNama[0].clusteringId;
					          	$scope.items.push(item);
					        }
					    });
					    for(var i=0; i<dataKapalA.length; i++){
					      	if(dataKapalA[i].noPpkJasa == noPpkJasa){
					       		$scope.itemsNoComplete.splice(i,1);
					       	}
					    }
	                }else{
						$scope.setNotification  = {
							type    : "warning",
							message : "Kapal tidak berhasil dipindahkan"
						};
						Notification.setNotification($scope.setNotification);
					}
				});	
			}			
        }else if(kdDermaga == $scope.idDermaga){
        	PrameetingAddKapal.get(
			{
				tglPerencanaan : tglParams,
				kdDermaga: kdDermaga,
				noPpkJasa : noPpkJasa
			},
			function(response){
				if(response.length > 0){
					if(response[0].kodeDermaga != kdDermaga){
						$scope.setNotification  = {
							type    : "warning",
							message : "Kapal "+response.content[0].namaKapal+" telah dipindahkan ke dermaga "+response.content[0].kodeDermaga
						};
						Notification.setNotification($scope.setNotification);
						$timeout(function() {
							$scope.getKapalDermaga(kdDermaga,'m');
    					}, 2000);						
					}else{
						$scope.itemsNoComplete.forEach(function(item){
				            if(item.noPpkJasa == noPpkJasa){
				            	item.clusteringId = $scope.clusteringNama[0].clusteringId;
				            	$scope.items.push(item);
				            }
				        });
				        for(var i=0; i<dataKapalA.length; i++){
				        	if(dataKapalA[i].noPpkJasa == noPpkJasa){
				        		$scope.itemsNoComplete.splice(i,1);
				        	}
				        }
					}
				}
			})
        }else{
			$scope.itemsNoComplete.forEach(function(item){
	            if(item.noPpkJasa == noPpkJasa){
	            	$scope.items.push(item);
	            }
	        });
	        for(var i=0; i<dataKapalA.length; i++){
	        	if(dataKapalA[i].noPpkJasa == noPpkJasa){
	        		$scope.itemsNoComplete.splice(i,1);
	        	}
	        }
        }
	}

	$scope.saveStatusTl = function(){
		$scope.allData = $scope.items.concat($scope.itemsNoComplete);
		
		for(var i=0; i<$scope.allData.length; i++){

			delete $scope.allData[i].clusteringId;
			delete $scope.allData[i].clusteringNama;
			delete $scope.allData[i].created;
			delete $scope.allData[i].errorMessage;
			delete $scope.allData[i].id;
			delete $scope.allData[i].isPrameeting;
			delete $scope.allData[i].kodeCabang;
			delete $scope.allData[i].kodeDermaga;
			delete $scope.allData[i].kodeKapal;
			delete $scope.allData[i].komoditi;
			delete $scope.allData[i].created;
			delete $scope.allData[i].lastUpdated;
			delete $scope.allData[i].namaKapal;
			delete $scope.allData[i].noPpkJasa;
			delete $scope.allData[i].panjangKapal;
			delete $scope.allData[i].prioritas;
			delete $scope.allData[i].prioritasKapalId;
			delete $scope.allData[i].prioritasKapalNama;
			delete $scope.allData[i].tglMasukPelabuhan;
			delete $scope.allData[i].tglPermohonan;
			delete $scope.allData[i].tglPrameeting;
			

		};
		// console.log($scope.allData);
		//UpdateStatusTl
		UpdateStatusTl.update($scope.allData,function(response){
			// console.log(response);
            if(response){
            	$window.location.reload();
            }
        });
	}

	$scope.getDetailRkbm = function(bongkar, muat){
		$scope.detailRkbm.namaKapal = (muat != null ? muat.namaKapal : bongkar.namaKapal);
		$scope.detailRkbm.namaAgen = (muat != null ? muat.namaAgen : bongkar.namaAgen);
		$scope.detailRkbm.namaAgenBm = (muat != null ? muat.agenBongkarMuat : bongkar.agenBongkarMuat);
		$scope.detailRkbm.noPpk1 = (muat != null ? muat.noPpk1 : bongkar.noPpk1);
		$scope.detailRkbm.komoditiMuat = (muat != null ? (muat.komoditi == ''?'-': muat.komoditi):'-');
		$scope.detailRkbm.komoditiBongkar = (bongkar != null ? (bongkar.komoditi == ''?'-': bongkar.komoditi):'-');
		$scope.detailRkbm.jumlahMuat = (muat != null ? (muat.jumlahMuat == ''?'-': muat.jumlahMuat):'-');
		$scope.detailRkbm.jumlahBongkar = (bongkar != null ? (bongkar.jumlahBongkar == ''?'-': bongkar.jumlahBongkar):'-')
		$('#detailRkbmModal').modal('show');
	}

	$scope.getKapalDermaga = function(idDermaga,move){
		LoadingScreen.show();
		if(kdDermaga == idDermaga){
			move == 'move';
		}
		$scope.pageChanged(0,idDermaga,move);
	}

	$scope.tosFirst = function(record){ 
	    return record.statusOperationPlan !== true;
	}

	$scope.rkbmFirst = function(record){
	    return record.statusRkbm !== true;
	}  
}]);
