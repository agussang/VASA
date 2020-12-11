'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DaftarPermohonanCtrl
 * @description
 * # DaftarPermohonanCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('DaftarPermohonanCtrl',['$scope','$filter','$timeout','$routeParams','$rootScope','$location','$PAGE_SIZE','$interval','Notification','DaftarPermohonan','StatusEPBPermohonan','LoadingScreen','MonitoringDetail','UserRole','SharedVariable','TipeEskalasiList','BindEskalasi','TipeEskalasi','PermohonanCekNota','PermohonanSetFalse',function ($scope,$filter,$timeout,$routeParams,  $rootScope,$location,$PAGE_SIZE,$interval,Notification,DaftarPermohonan,StatusEPBPermohonan,LoadingScreen,MonitoringDetail,UserRole,SharedVariable,TipeEskalasiList,BindEskalasi,TipeEskalasi,PermohonanCekNota,PermohonanSetFalse) {
 	$scope.userRole = UserRole.getCurrentRole();
 	var locationPath = '/transaksi/permohonanlist';
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
	    	{value: undefined , groupBy:'Permohonan', name: 'Semua Permohonan'},
	    	{value: "P", groupBy:'Permohonan', name: 'Sudah Bayar EPB'},
	    	{value: "N", groupBy:'Permohonan', name: 'Belum Bayar EPB'},
	    	{value: "D", groupBy:'Penetapan', name: 'Semua Penetapan'},
	    	{value: "C", groupBy:'Penetapan', name: 'Penetapan Sudah Konfirmasi'},
	    	{value: "R", groupBy:'Realisasi', name: 'Semua Realisasi'}]
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
		TipeEskalasiList.get({size : 999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	$scope.getTipeEskalasi();

	$scope.backToList = function(){
		$location.path(locationPath);
	}

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

	var pageCurrent = 0;
	$scope.pageChanged = function(newPage) {
		pageCurrent = newPage;
		//validation
		$scope.isClicked = true;
		//end
		$scope.btnResetSearch = false;
		$scope.contentSearch = false;
		$scope.loadingResetSearch = false;

		var selectionSearch = $scope.selectionSearch;
		var filterItem = {
			page:newPage-1,
			status: $scope.option.value,
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
		}else if($scope.searchText){
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 9999;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else{
			filterItem['size'] = $scope.optionSizePage.selectedOption.number; //kondisi default get data
		}
		DaftarPermohonan.get(filterItem,function(response) {
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
				$scope.items[i].tanggalPermohonan = $filter('date')($scope.items[i].tglBuat, 'dd-MM-yyyy');
				$scope.items[i].jamPermohonan = $filter('date')($scope.items[i].tglBuat, 'HH:mm:ss');
				var jasaList = groupBy($scope.items[i].listNamaJasa, function(item){return [item.nama, item.status];});
				$scope.items[i].listNamaJasa = jasaList;
				var showToolTip = false;
				if(jasaList.length < 1){
					$scope.items[i].flagJasa = false;
				}else{
					$scope.items[i].flagJasa = true;
					for (var k=0; k<jasaList.length; k++){
						jasaList[k].nama = jasaList[k][0].nama.split("_").join(" ");
						jasaList[k].nama = jasaList[k].nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
						if(jasaList[k].nama==='Pandu' || jasaList[k].nama==='Tambat'){
							showToolTip = true;
						}
					};
				}
				$scope.items[i].showToolTip = showToolTip; //untuk menentukan tooltip
			};

			$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
			
		$scope.isClicked = false;
		LoadingScreen.hide();
		});
		// LoadingScreen.hide();
	}
    $scope.pageChanged(0);

	$rootScope.startPmh;
	$scope.pmhInterval = function(){
		$rootScope.startPmh = $interval(function() {
		    $scope.pageChanged(pageCurrent);
		}, 30000);
	}

	$scope.pmhInterval();

    function groupBy( array , f )
	{
		var groups = {};
		array.forEach( function( o )
		{
			var group = JSON.stringify( f(o) );
			groups[group] = groups[group] || [];
			groups[group].push( o );
		});
		return Object.keys(groups).map( function( group ){
			return groups[group];
		})
	}

	$scope.setAirKapal = function () {
		$scope.isLoketAir = false;
		SharedVariable.setVariable($scope.isLoketAir);
		$location.path('/transaksi/new/');
	};

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
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
    	}
    });

	//tambah jasa
	$scope.tambahJasa = function(jasa){
		$location.path('/transaksi/jasabaru/'+jasa);
	}

	//edit jasa
	$scope.editJasa = function(item){
		if(item.status=='P'){
			
			$scope.showModalValidasiEditPMH(item);
		}else{
			$location.path('/transaksi/permohonan/'+item.noPpk1+'/'+item.urutanPermohonan);
		}
	}

	$scope.setStatusEpb = function(){
		$scope.ppk1 = document.getElementById('noPpkVal').value;
		$scope.urutan = document.getElementById('urutanVal').value;
		StatusEPBPermohonan.get({ppk1:$scope.ppk1,urutan:$scope.urutan}, function(response){
			if(response.status !== '500'){
				$scope.setNotification  = {
					type	: "success",
					message	: "Berhasil mengubah status menjadi 'Sudah Dibayar'."
				};
				Notification.setNotification($scope.setNotification);
				$scope.pageChanged(pageCurrent);
			}else{
				$scope.setNotification  = {
					type	: "danger",
					message	: "Gagal mengubah status menjadi 'Sudah Dibayar'."
				};
				Notification.setNotification($scope.setNotification);
			}
		},function(response){
			$scope.setNotification  = {
				type	: "danger",
				message	: "Gagal mengubah status menjadi 'Sudah Dibayar'."
			};
			Notification.setNotification($scope.setNotification);
		});
	};
	
	$scope.showEditDataUmum = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		$scope.isBtnBatalVerifyTambat = false; 
		if(hasEsc) $location.path('/transaksi/dataumum/'+item.noPpk1+'/'+item.status);
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

	$scope.showEditPermohonan = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		if(hasEsc) $location.path('/transaksi/permohonan/'+item.noPpk1+'/'+item.urutanPermohonan+'/escMode');
	};

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if(dataEsc.valCode==='VALPMH049'){ //eskalasi untuk update data umum
			$scope.showEditDataUmum(dataEsc, item);
		}else if(dataEsc.valCode==='VALOTH017'){ //eskalasi untuk update flag done menjadi 1
			$scope.updateFlagDone(dataEsc, item);
		}else if(dataEsc.valCode==='VALPMH032'){ //eskalasi untuk edit data permohonan
			$scope.showEditPermohonan(dataEsc, item);
		}
	});

	$scope.showModalValidasiDataUmum = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH049'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPMH049'),
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

	$scope.showModalValidasiEditPMH = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH032'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPMH032'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			dataItem : item,
			showNotif : "hide"
		};
		Notification.setNotification(note);
		$scope.infoValidasiVALPMH032 = itemEskalasi.valDesc;
		$('#modalValidasiEditPMH').modal('show');
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
