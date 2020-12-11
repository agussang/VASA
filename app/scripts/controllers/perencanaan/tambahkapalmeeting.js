'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TambahkapalmeetingCtrl
 * @description
 * # TambahkapalmeetingCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TambahkapalmeetingCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','PrameetingAddKapal','ClusterMuatanList','PenetapanSave','PrameetingUpdate','ListKapalRekomendasi','KademeterList','UpdateStatusTl','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$filter,$timeout,$routeParams,$location,$window,PrameetingAddKapal,ClusterMuatanList,PenetapanSave,PrameetingUpdate,ListKapalRekomendasi,KademeterList,UpdateStatusTl,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	var kdDermaga = $routeParams.kodeDermaga;
    var tglParams =  $routeParams.tgl;
	
	$scope.allDataitems = [];
	
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
	
	
	$scope.pageChanged = function(newPage) {
		$scope.items=[];
		$scope.itemsNoComplete = [];
		var namaKapal = undefined;
		if($scope.namaKapal !== undefined){
			namaKapal = $scope.namaKapal;

		}
		PrameetingAddKapal.get(
			{
				kdDermaga: kdDermaga,
				tglPerencanaan : tglParams,
				namaKapal: namaKapal,
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
				$scope.allDataitems = $scope.allItems;
				for(var i=0; i<$scope.allDataitems.length; i++){
					if($scope.allDataitems[i].errorMessage != null){
						$location.path('/perencanaan/'+kdDermaga+'/'+tglParams);
					}
				}
				$scope.allDataitems.forEach(function(item){
                    if(item.tglMasukPelabuhan != null && item.tglPermohonan != null){
                    	$scope.items.push(item);
                    }else{
                    	$scope.itemsNoComplete.push(item);
                    }
                });
				


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
        var meeting = item[index].meeting;
        var TglJamPermohonan = item[index].tglPermohonan;
        var TglJamMasukPelabuhan = item[index].tglMasukPelabuhan;

        item[index].noPpk1 = item[index - otherItemPos].noPpk1;
        item[index].noPpkJasa = item[index - otherItemPos].noPpkJasa;
        item[index].namaKapal = item[index - otherItemPos].namaKapal;
        item[index].clusteringNama = item[index - otherItemPos].clusteringNama;
        item[index].clusteringId = item[index - otherItemPos].clusteringId;
       	item[index].meeting = item[index - otherItemPos].meeting;
        item[index].tglPermohonan = item[index - otherItemPos].tglPermohonan;
        item[index].tglMasukPelabuhan = item[index - otherItemPos].tglMasukPelabuhan;

        
        item[index - otherItemPos].noPpk1 = noPpk1;
        item[index - otherItemPos].noPpkJasa = noPpkJasa;
        item[index - otherItemPos].namaKapal = namaKapal;
        item[index - otherItemPos].clusteringNama = clusterKapal;
        item[index - otherItemPos].clusteringId = clusterKapalId;
       	item[index - otherItemPos].meeting = meeting;
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
	        var meeting = item[index].meeting;
	        var TglJamPermohonan = item[index].tglPermohonan;
        	var TglJamMasukPelabuhan = item[index].tglMasukPelabuhan;


	        item[index].noPpk1 = item[index + otherItemPos].noPpk1;
	        item[index].noPpkJasa = item[index + otherItemPos].noPpkJasa;
	        item[index].namaKapal = item[index + otherItemPos].namaKapal;
	        item[index].clusteringNama = item[index + otherItemPos].clusteringNama;
	        item[index].clusteringId = item[index + otherItemPos].clusteringId;
	        item[index].meeting = item[index + otherItemPos].meeting;
	        item[index].tglPermohonan = item[index + otherItemPos].tglPermohonan;
	        item[index].tglMasukPelabuhan = item[index + otherItemPos].tglMasukPelabuhan;


	        
	        item[index + otherItemPos].noPpk1 = noPpk1;
	        item[index + otherItemPos].noPpkJasa = noPpkJasa;
	        item[index + otherItemPos].namaKapal = namaKapal;
	        item[index + otherItemPos].clusteringNama = clusterKapal;
	        item[index + otherItemPos].clusteringId = clusterKapalId;
	        item[index + otherItemPos].meeting = meeting;
	        item[index + otherItemPos].tglPermohonan = TglJamPermohonan;
	        item[index + otherItemPos].tglMasukPelabuhan = TglJamMasukPelabuhan;


        }
      }
    };

  	// $scope.changeTL = function(item,index){
  	// 	$scope.items[index].prameeting == false;
  	// 	// console.log($scope.items[index].tl);
  	// } 
  	// $scope.changePr = function(item,index){
  	// 	$scope.items[index].tl == false;
  	// 	// console.log($scope.items[index].prameeting);

  	// } 

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
			
			$scope.items[i].kodeDermaga = kdDermaga;
			$scope.items[i].kodeKapal = $scope.items[i].kodeKapal;
			$scope.items[i].noPpk1 = $scope.items[i].noPpk1;
			$scope.items[i].noPpkJasa = $scope.items[i].noPpkJasa;
			$scope.items[i].tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
            $scope.items[i].arahKapal = 'kanan';
			$scope.items[i].komoditi = null;
            $scope.items[i].pbm = null;
            $scope.items[i].kodeAgen = null;
            $scope.items[i].keterangan = null;
            $scope.items[i].isDitetapkan = false;
            $scope.items[i].isMeeting = $scope.items[i].meeting;
            delete $scope.items[i].kapalTosBongkar;
            delete $scope.items[i].kapalTosGcMuat;
            delete $scope.items[i].kapalTosMuat;
            delete $scope.items[i].errorMessage;
            delete $scope.items[i].meetingSusulan;
            delete $scope.items[i].pindah;
            delete $scope.items[i].statusLineKapal;
            delete $scope.items[i].url;
            delete $scope.items[i].tingkatan;
            delete $scope.items[i].top;
            delete $scope.items[i].permohonanMulai;
            delete $scope.items[i].permohonanSelesai;
            delete $scope.items[i].hadapKapal;
            delete $scope.items[i].clusteringIdAsli;
            delete $scope.items[i].draftKapal;
            delete $scope.items[i].created;
            delete $scope.items[i].isPrameeting;
            delete $scope.items[i].id;
            delete $scope.items[i].tglPermohonan;
            delete $scope.items[i].tglPrameeting;
            delete $scope.items[i].tglMasukPelabuhan;
            delete $scope.items[i].prioritasKapalNama;
            delete $scope.items[i].prioritasKapalId;
            delete $scope.items[i].prioritas;
            delete $scope.items[i].lastUpdated;
            delete $scope.items[i].tl;

            
            

			if($scope.items[i].isPrameeting == true && $scope.items[i].clusteringId == null){
				$scope.setNotification  = {
		          type  : 'warning',
		          message : 'Data Prameeting, <b>Cluster tidak boleh kosong</b>'
		        };
		        Notification.setNotification($scope.setNotification);
		        break;
			}

			console.log($scope.items[i]);
			PenetapanSave.save($scope.items[i],function(response){
				// console.log(response);
	            if(response){
	            	$location.path('/penetapan/'+kdDermaga+'/'+tglParams);
	            }
	        });

		
            
        }
	}

	$scope.moveToPrameeting = function(noPpkJasa){
		var dataKapalA = $scope.itemsNoComplete;
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
}]);
