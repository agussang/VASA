'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DaftarRealisasiCtrl
 * @description
 * # DaftarRealisasiCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('DaftarRealisasiAirKapalCtrl',['$scope','$filter','$routeParams','$location','$PAGE_SIZE','DaftarRealisasiAirKapal','LoadingScreen','MonitoringDetail','UserRole','TipeEskalasiList','BindEskalasi','TipeEskalasi','$rootScope','Notification', function ($scope,$filter,$routeParams,$location,$PAGE_SIZE,DaftarRealisasiAirKapal,LoadingScreen,MonitoringDetail,UserRole,TipeEskalasiList,BindEskalasi,TipeEskalasi,$rootScope,Notification) {
 	$scope.userRole = UserRole.getCurrentRole();
 	var locationPath = '/airkapal/realisasi';
 	LoadingScreen.show();
 	$scope.items=[];
 	$scope.listJasa = [];
 	$scope.arrayJasa = [];

 	//add validation disabled when filtered
 	$scope.isClicked = false;
 	//end validation

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };
    $scope.options = {
	    filter: [{value: undefined , name: 'Semua Realisasi'}, 
		{value: 0, name: 'Air Kapal Belum Realisasi'}, 
		{value: 1, name: 'Air Kapal Siap Verifikasi'},
		{value: 2, name: 'Air Kapal Sudah Verifikasi'}]
	};
	$scope.filterConfig = [
		{
			id: 'namaKapal',
			title:  'Nama Kapal',
			placeholder: 'Filter by Nama Kapal'
		},
		{
			id: 'noPpk1',
			title:  'No. PPK1',
			placeholder: 'Filter by No. PPK1'
		}
	];
	
	 // PAGING
    $scope.currentPage = 1;
	$scope.pageSize = $scope.optionSizePage.selectedOption.number;	
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	$scope.option = [];
	$scope.option.value = $scope.options.filter[0].value;
	if(!$routeParams.ppk1){
		$scope.showAction = true;
	}else{
		$scope.showAction = false;
	}
	
	$scope.backToList = function(){
		$location.path(locationPath);
	}

	$scope.$watch('selectionSearch', function(val)
	{ 	
		if(val.id === 'namaKapal'){
	   		$scope.filterMinLength = 3;
		}else if(val.id === 'noPpk1'){
	   		$scope.filterMinLength = 9;
		}
		$scope.filterPlaceholder = val.placeholder;
	});

	$scope.getTipeEskalasi = function(){
		TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};
	$scope.getTipeEskalasi();

	$scope.pageChanged = function(newPage) {
		//validation
		$scope.isClicked = true;
		//end 
		$scope.btnResetSearch = false;
		$scope.contentSearch = false;
		$scope.loadingResetSearch = false;

		var selectionSearch = $scope.selectionSearch;
		var filterItem = {
			page : newPage - 1,
			groupType: $scope.option.value,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}
		if($routeParams.ppk1){ //kondisi jika terdapat parameter
			filterItem['noPpk1'] = $routeParams.ppk1;
			filterItem['size'] = 99;
		}else if($scope.searchText){ //kondisi jika search berdasarkan filter yang ditentukan
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 99;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else{
			filterItem['size'] = $scope.optionSizePage.selectedOption.number; //kondisi default get data
		}
		DaftarRealisasiAirKapal.get(filterItem,function(response) {
			$scope.currentPage = response.number + 1;
			$scope.noIndex = ($scope.currentPage-1)*response.size;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = response.content;
			var items = response.content;
			//console.log(items);
			$scope.informasiLengthItem = response.content.length;
			if(items.length===0){
				$scope.searchTextItem = $scope.searchText;
				$scope.searchSelectedResponse = $scope.selectionSearch.title;
			}else{
				$scope.searchTextItem = '';
			}
			
			// console.log(items);
			for(var i=0; i<$scope.items.length; i++){
				if($scope.items[i].tglVerifikasi != null){
					$scope.items[i].tanggalKonfirmasi = $filter('date')($scope.items[i].tglVerifikasi, 'dd-MM-yyyy');
					$scope.items[i].jamKonfirmasi = $filter('date')($scope.items[i].tglVerifikasi, 'HH:mm:ss');
				}
						

				var jasaList = $scope.items[i].listNamaJasa;
				var showToolTip = false;

				if(jasaList.length < 1){
					$scope.items[i].flagJasa = false;
				}else{
					$scope.items[i].flagJasa = true;
					for (var k=0; k<jasaList.length; k++){
						jasaList[k].nama = jasaList[k].nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
						
						if(jasaList[k].nama==='Pandu' || jasaList[k].nama==='Tambat'){
							showToolTip = true;
						}
					};
				}

				$scope.items[i].showToolTip = showToolTip; //untuk menentukan kondisi ditampilkannya tooltip
				if (jasaList.every(checkIfFalse)) {
				 	$scope.items[i].disableBtnRea = true;
				 	if($scope.items[i].status == 'T'){
				 		$scope.items[i].disableBtnRea = true;
				 	}

				}else{
				 	$scope.items[i].disableBtnRea = false;	
				 	if($scope.items[i].status == 'T'){
				 		$scope.items[i].disableBtnRea = true;
				 	}				 		
				}

				function checkIfFalse(value, index, ar) {
				   return value.status == true;
				}
			};

			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			LoadingScreen.hide();
			$scope.isClicked = false;
		});
	}
    $scope.pageChanged(0);

    $scope.resetSearch = function () {
		$scope.searchText ='';
		$scope.btnResetSearch = false;
		$scope.loadingResetSearch = true;
  		$scope.pageChanged(0);
    };

    $scope.getDataJasa = function (dataJasa) {
		var tempJasa = [];
		var pastTambat = [];
		var pastPandu = [];

		MonitoringDetail.get({
			ppk1 	: dataJasa.noPpk1,
			urutan 	: dataJasa.urutanPermohonan
		},
		function(response){
			response.detailPmh.jasa.forEach(function(item) {
				tempJasa.push(item);
			});

			tempJasa.forEach(function(jasa) {
		        // Get Detail Penetapan
		        var detailPtp = response.detailPmh.ptpJasa.find(function(ptpJasa) {
					return ptpJasa.noPpkJasa == jasa.noPpkJasa;
		        });
		        jasa.ptpJasa = detailPtp;
		        // Get Detail Realisasi
		        var detailRea = response.detailPmh.reaJasa.find(function(reaJasa) {
					return reaJasa.noPpkJasa == jasa.noPpkJasa;
		        });
		        jasa.reaJasa = detailRea;
		    });

		    //start - Untuk set data grid dari status detail jasa terupdate :
			tempJasa.forEach(function(jasa){
				switch (jasa.nama) {
					case "epb_pandu":
						if(jasa.reaJasa){
							pastPandu.push(jasa.reaJasa);
						}else if(jasa.ptpJasa) {
							if(jasa.ptpJasa.jenisRevisi<9){
								pastPandu.push(jasa.ptpJasa);
							}
						}else{
							pastPandu.push(jasa);
						}
					break;
					case "epb_tambat":
						if(jasa.reaJasa){
							pastTambat.push(jasa.reaJasa);
						}else if(jasa.ptpJasa) {
							if(jasa.ptpJasa.jenisRevisi<9){
								pastTambat.push(jasa.ptpJasa);
							}
						}else{
							pastTambat.push(jasa);
						}
					break;
				}
			});
			//end - Untuk set data grid dari status detail jasa terupdate :
			
			var dataToolTipJasa = '';

			if(pastPandu.length>0){
				dataToolTipJasa += 'Pandu: ';
				pastPandu.forEach(function(item){
					dataToolTipJasa += '<br>' +item.kodeLokasiAsal+' &#8594 '+item.kodeLokasiTujuan;
				});
			}
			if(pastTambat.length>0){
				if(pastPandu.length>0 && pastTambat.length>0){
					dataToolTipJasa += '<br>';
					dataToolTipJasa += '<br>';
				}
				dataToolTipJasa += 'Tambat: ';
				pastTambat.forEach(function(item){
					dataToolTipJasa += '<br>' +item.kodeLokasi;
				});
			}
			$scope.dataToolTipJasa = dataToolTipJasa;
		});
    };

    $scope.$watch('searchText', function(newValue, oldVal){
    	if(newValue!==undefined){
    	console.log(newValue.lentgh);
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
    	}
    });

	//delete labuh
	$scope.realisasiBaru = function(noppk,urutan){
		$location.path('/transaksi/realisasi/'+noppk+'/'+urutan);
	}

	$scope.updateRealisasi = function(noppk,urutan){
		$location.path('/transaksi/realisasi/'+noppk+'/'+urutan);
	}

	//cek pranota
	$scope.cekPranota = function(noppk,urutan){
		$location.path('/transaksi/pranota/'+noppk+'/add');
	}

	//set pranota
	$scope.setPranota = function(noppk,urutan){
		$location.path('/transaksi/pranota/'+noppk);
	}

	$scope.showEditDataUmum = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		$scope.isBtnBatalVerifyTambat = false; 
		if(hasEsc) {
			$location.path('/transaksi/dataumum/'+item.noPpk1+'/'+item.status)
		}
	};

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if(dataEsc.valCode==='VALREA024'){ //eskalasi untuk update data umum
			$scope.showEditDataUmum(dataEsc, item);
		}
	});

	$scope.showModalValidasiDataUmum = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA024'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALREA024'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			dataItem : item,
			showNotif : "hide"
		};
		Notification.setNotification(note);
		$('#modalValidasiEditDataUmum').modal('show');
	}

}]);
