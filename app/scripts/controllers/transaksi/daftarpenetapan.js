'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DaftarPenetapanCtrl
 * @description
 * # DaftarPenetapanCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('DaftarPenetapanCtrl',['$scope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','$rootScope','Notification','DaftarPenetapan','ConfirmedPenetapan','LoadingScreen','MonitoringDetail','UserRole','TipeEskalasiList','BindEskalasi','TipeEskalasi','PermohonanCekNota','PermohonanSetFalse','SetBatalKonfirmasiPenetapan', function ($scope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,$rootScope,Notification,DaftarPenetapan,ConfirmedPenetapan,LoadingScreen,MonitoringDetail,UserRole,TipeEskalasiList,BindEskalasi,TipeEskalasi,PermohonanCekNota,PermohonanSetFalse,SetBatalKonfirmasiPenetapan) {
 	$scope.userRole = UserRole.getCurrentRole();
 	var locationPath = '/transaksi/penetapan';
 	LoadingScreen.show();
 	$scope.items=[];
 	$scope.listJasa = [];

 	//add validation disabled when filtered
 	$scope.isClicked = false;
 	//end validation

	$scope.optionSizePage = {
	    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	    selectedOption: {number: $PAGE_SIZE} //default select option size
    };
    $scope.options = {
	    filter: [
	    	{value: undefined , groupBy:'Penetapan', name: 'Semua Penetapan'},
	    	{value: 0, groupBy:'Penetapan', name: 'Penetapan Belum Lengkap'},
	    	{value: 1, groupBy:'Penetapan', name: 'Penetapan Siap Konfirmasi'},
	    	{value: 2, groupBy:'Penetapan', name: 'Penetapan Sudah Konfirmasi'},
	    	{value: 3, groupBy:'Realisasi', name: 'Kapal Sedang Tambat (first line)'}]
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

	$scope.getTipeEskalasi = function(){
		TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	$scope.getTipeEskalasi();

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

	$scope.pageChanged = function(newPage) {
		//validation
		$scope.isClicked = true;
		//end
		$scope.btnResetSearch = false;
		$scope.contentSearch = false;
		$scope.loadingResetSearch = false;

		var selectionSearch = $scope.selectionSearch;
		var filterItem = {
			page : newPage-1,
			groupType: $scope.option.value,
			sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}
		if($routeParams.ppk1 || $routeParams.urutan){ //kondisi jika terdapat parameter
			if($routeParams.ppk1 && $routeParams.urutan) {
				filterItem['noPpk1'] = $routeParams.ppk1;
				filterItem['urutanPermohonan'] = $routeParams.urutan;
			}else{
				filterItem['noPpk1'] = $routeParams.ppk1;
			}
			filterItem['size'] = 9999;
		}else if($scope.searchText && !$routeParams.ppk1){
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 9999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else if($scope.searchText && $routeParams.ppk1){ 
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 9999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}


		if($routeParams.ppk1){
			filterItem['noPpk1'] = $routeParams.ppk1;
			filterItem['size'] = 99999;
		}else if($scope.searchText){
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 99999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else{
			filterItem['size'] = $scope.optionSizePage.selectedOption.number; //kondisi default get data
		}
		DaftarPenetapan.get(filterItem,function(response) {
			$scope.currentPage = response.number + 1;
			$scope.noIndex = ($scope.currentPage-1)*response.size;
			$scope.pageSize = response.size;
			$scope.totalItems = response.totalElements;
			$scope.totalPages = response.totalPages;
			$scope.allItems = response.content;
			$scope.items = response.content;
			var items = response.content;
			$scope.informasiLengthItem = response.content.length;
			if(items.length===0){
				$scope.searchTextItem = $scope.searchText;
				$scope.searchSelectedResponse = $scope.selectionSearch.title;
			}else{
				$scope.searchTextItem = '';
			}	
			
			for(var i=0; i<$scope.items.length; i++){				
				$scope.items[i].flagTambat = false;

				if($scope.items[i].tglKonfirmasi != null){
					$scope.items[i].tanggalKonfirmasi = $filter('date')($scope.items[i].tglKonfirmasi, 'dd-MM-yyyy');
					$scope.items[i].jamKonfirmasi = $filter('date')($scope.items[i].tglKonfirmasi, 'HH:mm:ss');
				}
				
				var jasaList = $scope.items[i].listNamaJasa;
				var showToolTip = false;
				$scope.items[i].namaJasa = [];
				$scope.items[i].checkTambat = false;

				if(jasaList.length < 1){
					$scope.items[i].flagJasa = false;
				}else{
					$scope.items[i].flagJasa = true;
					for (var k=0; k<jasaList.length; k++){
						$scope.items[i].namaJasa.push(jasaList[k].nama);	
						jasaList[k].nama = jasaList[k].nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
						if(jasaList[k].nama==='Pandu' || jasaList[k].nama==='Tambat'){
							showToolTip = true;
						}				
					};
				}

				$scope.items[i].showToolTip = showToolTip; //untuk menentukan kondisi ditampilkannya tooltip
				
			 	if($scope.items[i].namaJasa.indexOf('TAMBAT') === -1){
			 		$scope.items[i].checkTambat = true;
			 	}else{
			 		$scope.items[i].checkTambat = false;
			 	}

				if (jasaList.every(checkIfFalse)) {
				 	$scope.items[i].disableBtnPtp = true;
				 	$scope.items[i].disableKnfrmPtp = false;
				 	$scope.items[i].disableRvsPtp = true;
				 	$scope.items[i].disableSelectKonfirmPtp = false;
				 	if($scope.items[i].status == 'R' || $scope.items[i].status == 'P'){
				 		$scope.items[i].disableSelectKonfirmPtp = true;
				 	}
				 	if($scope.items[i].status == 'C' || $scope.items[i].status == 'R'){
				 		$scope.items[i].disableKnfrmPtp = true;
				 	}
				 	if($scope.items[i].status == 'C' || $scope.items[i].status == 'R'){
				 		$scope.items[i].disableRvsPtp = false;
				 	}
				 	if(jasaList.length < 1){
					 	$scope.items[i].disableKnfrmPtp = true;
					 	$scope.items[i].disableRvsPtp = true;
					}					 	
				}else{
				 	$scope.items[i].disableBtnPtp = false;
				 	$scope.items[i].disableKnfrmPtp = true;
				 	$scope.items[i].disableRvsPtp = true;
				 	$scope.items[i].disableSelectKonfirmPtp = false;
				 	if($scope.items[i].status == 'R' || $scope.items[i].status == 'P'){
				 		$scope.items[i].disableSelectKonfirmPtp = true;
				 	}
				 	if($scope.items[i].status == 'C' || $scope.items[i].status == 'R'){
				 		$scope.items[i].disableKnfrmPtp = true;
				 	}
				 	if($scope.items[i].status == 'C' || $scope.items[i].status == 'R' ){
				 		$scope.items[i].disableRvsPtp = false;
				 	}
				 	if(jasaList.length < 1){
					 	$scope.items[i].disableKnfrmPtp = true;
					 	$scope.items[i].disableRvsPtp = true;
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
		$location.path('/transaksi/penetapan');
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
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
    	}
    });

	// buat penetapan
	$scope.buatPenetapan = function(noppk,urutan){
		$location.path('/transaksi/penetapan/'+noppk+'/'+urutan);

	}
	//edit penetapan
	$scope.editPenetapan = function(noppk,urutan){
		$location.path('/transaksi/penetapan/'+noppk+'/'+urutan);
	}

	//confirm penetapan
	$scope.confirmPenetapan = function(){
		$scope.ppk1 = document.getElementById('noPpkPenetapanVal').value;
		$scope.urutan = document.getElementById('urutanPenetapanVal').value;
		ConfirmedPenetapan.update({ppk1:$scope.ppk1,urutan:$scope.urutan}, {},function(response){
			if(response.status !== '500'){
					$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Berhasil mengkonfirmasi Penetapan."
				};
				Notification.setNotification($scope.setNotification);
				$scope.pageChanged($scope.currentPage);
				// $timeout(function(){
				// 	location.reload();
				// },1000);			
			}else{
				if(response.description.indexOf("is not complete") !== -1){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Gagal melakukan Konfirmasi Penetapan.<br>Pastikan semua jasa sudah dilakukan Penetapan."
					};
					Notification.setNotification($scope.setNotification);
				}else{
					$scope.setNotification  = {
						type	: "danger",
						message	: "Penetapan Gagal dikonfirmasi."
					};
					Notification.setNotification($scope.setNotification);
				}			
			}		
		},function(response){
			$scope.setNotification  = {
				type	: "danger",
				message	: "Penetapan Gagal dikonfirmasi."
			};
			Notification.setNotification($scope.setNotification);
		});
	};

	$scope.showEditDataUmum = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		$scope.isBtnBatalVerifyTambat = false; 
		if(hasEsc) {
			$location.path('/transaksi/dataumum/'+item.noPpk1+'/'+item.status)
		}
	};

	$scope.updateFlagDone = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		if(hasEsc) {
			PermohonanSetFalse.update({ppk1:item.noPpk1}, {},function(response){
				if(response.flagDone){
					$scope.pageChanged($scope.currentPage);
				}
			});
		}
	};

	$scope.updateStatusBatalKonfirmasiPtp = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		if(hasEsc) {
			SetBatalKonfirmasiPenetapan.update({
				noPpk1	: item.noPpk1,
				urutanPermohonan	: item.urutanPermohonan,
			}, {},function(response){
				if(response.status==="D"){
					$scope.pageChanged($scope.currentPage);
				}
			});
		}
	};

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if(dataEsc.valCode==='VALPTP010'){ //eskalasi untuk update data umum
			$scope.showEditDataUmum(dataEsc, item);
		}else if(dataEsc.valCode==='VALOTH017'){ //eskalasi untuk update flag done menjadi 1
			$scope.updateFlagDone(dataEsc, item);
		}else if(dataEsc.valCode==='VALPTP011'){ //eskalasi untuk update status detail dari C ke D
			$scope.updateStatusBatalKonfirmasiPtp(dataEsc, item);
		}
	});

	$scope.showModalValidasiDataUmum = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPTP010'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPTP010'),
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

	$scope.showModalBatalKonfirmasiPtp = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPTP011'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPTP011'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			dataItem : item,
			showNotif : "hide"
		};
		Notification.setNotification(note);
		$scope.infoValidasiBatalKonfirmasi = itemEskalasi.valDesc;
		$('#modalBatalKonfirmasiPtp').modal('show');
	}

	$scope.checkStatusNota = function(item){		
		var dataEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH017');
		PermohonanCekNota.get({noPpk1 : item.noPpk1}, function(response) {
			if(response.status){
				$scope.infoValidasitatusNota = 'Transaksi dengan PPK1: <b>'+item.noPpk1+'</b> sudah selesai layanan dan terkirim ke SAP.';
				$scope.validasitatusNota = false;
			}else{
				var 
					itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH017'),
					hasEsc = BindEskalasi.hasTempEskalasi('VALOTH017'),
					statusEskalasi = itemEskalasi.id!==undefined?true:false;

				$rootScope.statusEskalasiModal = statusEskalasi;
				var note =  {
					hasEsc : statusEskalasi,
					dataEsc : itemEskalasi,
					dataItem : item,
					showNotif : "hide"
				};
				Notification.setNotification(note);
				$scope.infoValidasitatusNota = dataEskalasi.valDesc	;
				$scope.validasitatusNota = true;
			}
			$('#modalValidasiFlagDone').modal('show');
		});
	};

}]);
