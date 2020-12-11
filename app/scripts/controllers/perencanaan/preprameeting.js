'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PreprameetingCtrl
 * @description
 * # PreprameetingCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PreprameetingCtrl',['$scope','$rootScope', '$filter', '$timeout','$routeParams', '$location','$window','PersiapanPrameeting','ClusterMuatanList','PrameetingSave','PrameetingUpdate','ListKapalRekomendasi','KademeterList','UpdateStatusTl','AppParam','MdmDermagaSearchByKode','$PAGE_SIZE','Notification','LoadingScreen','UserRole','SaveAntrianPrameeting','MdmDermagaByKodeCabang','PindahDermaga','PushToMeetingOnline','RealisasiTambatDetail',function ($scope,$rootScope,$filter,$timeout,$routeParams,$location,$window,PersiapanPrameeting,ClusterMuatanList,PrameetingSave,PrameetingUpdate,ListKapalRekomendasi,KademeterList,UpdateStatusTl,AppParam,MdmDermagaSearchByKode,$PAGE_SIZE,Notification,LoadingScreen,UserRole,SaveAntrianPrameeting,MdmDermagaByKodeCabang,PindahDermaga,PushToMeetingOnline,RealisasiTambatDetail) {
	$scope.userRole = UserRole.getCurrentRole();
	LoadingScreen.show();
	//list data
	$scope.currentCabang = $rootScope.namaCabang;
	var kdDermaga = $routeParams.kodeDermaga;
    var tglParams =  $routeParams.tgl;
	var dermaga = [];
	$scope.allDataitems = [];
	
	var filterTglAwal = undefined;
	var filterTglAkhir = undefined;
	var dateToday = new Date();
	$scope.showLoader = false;
	$scope.locationPath = '';
	$scope.detailRkbm = {};
	$scope.idDermaga = kdDermaga;
	$scope.disabledBtnPerencanaan = true;

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };

    $scope.options = {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true
    };
    
    $scope.tanggalPrameeting = $filter('date')(tglParams, 'dd MMMM yyyy');

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

	MdmDermagaByKodeCabang.get({kodeCabang: localStorage.getItem('kodeCabang')},function(response) {
		$scope.dermaga = response;
	}); 
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
	  //cluster muatan
	KademeterList.get({kdDermaga:kdDermaga},function(response){
        $scope.clusteringNama = response.content;   
    });
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
		var namaKapal = undefined;
		if($scope.namaKapal !== undefined){
			namaKapal = $scope.namaKapal;
			m = 'search';
		}

		if($routeParams.kodeDermaga == $scope.idDermaga){ 
			if(m == null){ 
				$scope.items=[];
			}					
			$scope.itemsNoComplete = [];
		}else{
			$scope.itemsNoComplete = [];
		}


		PersiapanPrameeting.get(
			{
				tglPerencanaan : tglParams,
				kdDermaga: $scope.idDermaga,
				namaKapal: namaKapal,
				//size : $scope.optionSizePage.selectedOption.number,
				//page : newPage - 1,
				sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			},
			function(response) {
				$scope.showLoader = false;
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
		$scope.pageChanged(0,kdDermaga,null);
		LoadingScreen.show();
	}

     $scope.pageChanged(0,kdDermaga,null);
     $scope.propertyName = 'tglPermohonan'
     $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
	    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	    $scope.propertyName = propertyName;
	};

	$scope.swapUp = function(item, index){
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
			/*fungsi simpan ke kapal rekomendasi*/
			PrameetingSave.save($scope.items[i],function(response){
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

	$scope.moveToPrameeting = function(noPpkJasa, noPpk1){
		var dataKapalA = $scope.itemsNoComplete;
		//added by Nurika : validation when add kapal to antrian
		//dapatkan noppk1
		console.log(noPpk1);
		//akses API
		RealisasiTambatDetail.get({
				noPpk1 : noPpk1
		}, function(response){
			console.log(response.content[0].kodeLokasi);
			if (kdDermaga == response.content[0].kodeLokasi && response.content[0].tglSelesai == null) {
				var confirmAddAntrian = confirm('Kapal masih sandar pada dermaga yang sama'+'\nApakah Anda yakin untuk menambahkan Kapal ke dermaga '+$scope.namaDermaga+' ?');
				$scope.setNotification  = {
					type    : "confirmAddAntrian",
					message : ""
	            };
	            Notification.setNotification($scope.setNotification);
			}
		});
		//end validation
		
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
        	PersiapanPrameeting.get(
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
	
	// $scope.eksporNonTL = function(){
	// 	// console.log($scope.items);
	// 	// return;
	// 		$scope.tgl = $filter('date')($scope.tanggalPrameeting, 'dd-MM-yyyy');
	// 	 	var namaCabang = $filter('uppercase')($scope.namaDermaga);
 //            var reportDate = $filter('uppercase')($scope.tgl);
 //            var NIPP = localStorage.getItem('NIPP');
 //            var namaPetugas = localStorage.getItem('nama');
 //            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
 //            var counter = 0;

 //            var createTabelRow = function(kapal, no) {

                
 //                var tabelRow = [
 //                    no.toString(),
 //                    kapal.noPpk1,
 //                    kapal.namaKapal,
 //                    kapal.clusteringNama,
 //                    moment(kapal.tglPermohonan).format("MM-DD-YYYY")
 //                ];

 //                tabelRow.forEach(function(rowItem, index) {
 //                    if (rowItem == null) tabelRow[index] = '';
 //                });
 //                return tabelRow;
 //            }

 //            $scope.bulanLaporan = function(data) {
 //                return (data.tglFilter === $scope.tanggalPerencanaan);
 //            };

 //            var no = 0;
 //            var laporanPrameeting = [];

 //            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
 //            $scope.items.forEach(function(kapal, index) {
 //            	if(kapal.tl == false){
 //            		 no++;

	// 			var tabelRow = createTabelRow(kapal,no);
	// 			laporanPrameeting.push(tabelRow);
	// 			AddReportPersiapan.save(kapal,function(response){
	// 				console.log(response);
		           
	// 	        });
 //            	}
              
 //            });
 //            //console.log(laporanPrameeting);





 //            var pdfContent = {
 //                pageSize: 'A4',
 //                pageMargins: [40, 60, 40, 50],
 //                styles: {
 //                    header: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 12,
 //                        alignment: 'center'
 //                    },
 //                    subheader: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left'
 //                    },
 //                    subheader2: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left',
 //                        margin: [0, 2, 0, 0]
 //                    },
 //                    tableHeader: {
 //                        color: '#000',
 //                        bold: true,
 //                        fontSize: 8,
 //                        alignment: 'center'
 //                    },
 //                    dataTable: {
 //                        color: '#000',
 //                        fontSize: 8,
 //                        width: 500,
 //                        margin: [0, 20, 0, 8]
 //                    },
 //                    footer: {
 //                        color: '#000',
 //                        margin: [20, 20, 20, 10],
 //                        fontSize: 8,
 //                        italics: true
 //                    }
 //                },
 //                footer: function(pagenumber, pagecount) {
 //                    return {
 //                        text: [
 //                            { text: 'Generated by ', style: 'footer' },
 //                            { text: namaPetugas, style: 'footer' },
 //                            { text: ' (' + NIPP + ') ' + ' on ' + tglLaporan, style: 'footer' },
 //                            { text: ' from VASA \n', style: 'footer' },
 //                            { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment: 'right', italics: false }
 //                        ],
 //                        margin: [20, 20, 20, 10]
 //                    };
 //                },
 //                content: [
 //                	{
 //                        alignment: 'justify',
 //                        columns: [
 //                            { text: 'Daftar Antrian Kapal Non TL', style: 'subheader2' }

 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                     
 //                            { text: 'Dermaga             : ' + namaCabang, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                           
 //                            { text: 'Tanggal              : ' + reportDate, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        style: 'dataTable',
 //                        table: {
 //                            headerRows: 2,
 //                            pageBreak: 'before',
 //                            dontBreakRows: true,
 //                            body: [
 //                                [
 //                                    { text: "\n\nNO Urut", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNo PPK1", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNama Kapal", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nCluster", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nTanggal Permohonan", rowSpan: 2, style: 'tableHeader' }
 //                                ],
 //                                [
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {}
 //                                ]
 //                            ].concat(laporanPrameeting)
 //                        }
 //                    }

 //                ],

 //            };

 //            pdfMake.createPdf(pdfContent).open();

 //            //var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
 //            //window.open(url,'_blank');
	// }

	// $scope.eksporTL = function(){
	// 	// console.log($scope.items);
	// 		$scope.tgl = $filter('date')($scope.tanggalPrameeting, 'dd-MM-yyyy');
	// 	 	var namaCabang = $filter('uppercase')($scope.namaDermaga);
 //            var reportDate = $filter('uppercase')($scope.tgl);
 //            var NIPP = localStorage.getItem('NIPP');
 //            var namaPetugas = localStorage.getItem('nama');
 //            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
 //            var counter = 0;

 //            var createTabelRow = function(kapal, no) {

                
 //                var tabelRow = [
 //                    no.toString(),
 //                    kapal.noPpk1,
 //                    kapal.namaKapal,
 //                    kapal.clusteringNama,
 //                    moment(kapal.tglPermohonan).format("MM-DD-YYYY")
 //                ];

 //                tabelRow.forEach(function(rowItem, index) {
 //                    if (rowItem == null) tabelRow[index] = '';
 //                });
 //                return tabelRow;
 //            }

 //            $scope.bulanLaporan = function(data) {
 //                return (data.tglFilter === $scope.tanggalPerencanaan);
 //            };

 //            var no = 0;
 //            var laporanPrameeting = [];

 //            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
 //            $scope.items.forEach(function(kapal, index) {
 //            	if(kapal.tl == true){
 //            		 no++;

	// 			var tabelRow = createTabelRow(kapal,no);
	// 			laporanPrameeting.push(tabelRow);
	// 			AddReportPersiapan.save(kapal,function(response){
	// 				console.log(response);
		           
	// 	        });

 //            	}
              
 //            });
 //            //console.log(laporanPrameeting);





 //            var pdfContent = {
 //                pageSize: 'A4',
 //                pageMargins: [40, 60, 40, 50],
 //                styles: {
 //                    header: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 12,
 //                        alignment: 'center'
 //                    },
 //                    subheader: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left'
 //                    },
 //                    subheader2: {
 //                        bold: true,
 //                        color: '#000',
 //                        fontSize: 8,
 //                        alignment: 'left',
 //                        margin: [0, 2, 0, 0]
 //                    },
 //                    tableHeader: {
 //                        color: '#000',
 //                        bold: true,
 //                        fontSize: 8,
 //                        alignment: 'center'
 //                    },
 //                    dataTable: {
 //                        color: '#000',
 //                        fontSize: 8,
 //                        width: 500,
 //                        margin: [0, 20, 0, 8]
 //                    },
 //                    footer: {
 //                        color: '#000',
 //                        margin: [20, 20, 20, 10],
 //                        fontSize: 8,
 //                        italics: true
 //                    }
 //                },
 //                footer: function(pagenumber, pagecount) {
 //                    return {
 //                        text: [
 //                            { text: 'Generated by ', style: 'footer' },
 //                            { text: namaPetugas, style: 'footer' },
 //                            { text: ' (' + NIPP + ') ' + ' on ' + tglLaporan, style: 'footer' },
 //                            { text: ' from VASA \n', style: 'footer' },
 //                            { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment: 'right', italics: false }
 //                        ],
 //                        margin: [20, 20, 20, 10]
 //                    };
 //                },
 //                content: [
 //                	{
 //                        alignment: 'justify',
 //                        columns: [
 //                            { text: 'Daftar Antrian Kapal TL', style: 'subheader2' }

 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                     
 //                            { text: 'Dermaga             : ' + namaCabang, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        alignment: 'justify',
 //                        columns: [
                           
 //                            { text: 'Tanggal              : ' + reportDate, style: 'subheader2' }
 //                        ]
 //                    },
 //                    {
 //                        style: 'dataTable',
 //                        table: {
 //                            headerRows: 2,
 //                            pageBreak: 'before',
 //                            dontBreakRows: true,
 //                            body: [
 //                                [
 //                                    { text: "\n\nNO Urut", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNo PPK1", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nNama Kapal", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nCluster", rowSpan: 2, style: 'tableHeader' },
 //                                    { text: "\n\nTanggal Permohonan", rowSpan: 2, style: 'tableHeader' }
 //                                ],
 //                                [
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {},
 //                                    {}
 //                                ]
 //                            ].concat(laporanPrameeting)
 //                        }
 //                    }

 //                ],

 //            };

 //            pdfMake.createPdf(pdfContent).open();

 //            //var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
 //            //window.open(url,'_blank');
	// }
	$scope.clusterNama = function(data,ppk){
		$scope.clusteringNama.forEach(function(cluster) {
            	if(cluster.clusteringId == data){
            		$scope.namaCluster = cluster.pembagiAnakan;
            	}
		});
		$scope.items.forEach(function(newdata) {
			// console.log(newdata)
            	if(newdata.noPpkJasa == ppk){
            		newdata.clusteringNama = $scope.namaCluster;
            		// newdata.tglPermohonan = $filter('date')(newdata.tglPermohonan, 'yyyy-MM-dd');
            	}
		});
	}

	$scope.saveAntrian = function(){
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
			
			if($scope.items[i].isPrameeting == true && $scope.items[i].clusteringId == null){
				$scope.setNotification  = {
		          type  : 'warning',
		          message : 'Data Prameeting, <b>Cluster tidak boleh kosong</b>'
		        };
		        Notification.setNotification($scope.setNotification);
		        break;
			}
            
        }
        SaveAntrianPrameeting.save($scope.items,function(response){
				if(response){
					$scope.setNotification  = {
			          type  : 'success',
			          message : 'Data Berhasil Disimpan'
			        };
			        Notification.setNotification($scope.setNotification);
				}
            // if(response){
            // 	$location.path('/perencanaan/'+kdDermaga+'/'+tglParams);
            // }
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
