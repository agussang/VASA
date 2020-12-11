'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DaftarPermohonanCtrl
 * @description
 * # DaftarPermohonanCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('DaftarPermohonanAirKapalCtrl',['$scope','$filter','$timeout','$routeParams','$rootScope','$location','$PAGE_SIZE','Notification','DaftarPermohonanAirKapal','StatusEPBPermohonan','LoadingScreen','MonitoringDetail','UserRole','SharedVariable','TipeEskalasi','BindEskalasi',
  function ($scope,$filter,$timeout,$routeParams,$rootScope,$location,$PAGE_SIZE,Notification,DaftarPermohonanAirKapal,StatusEPBPermohonan,LoadingScreen,MonitoringDetail,UserRole,SharedVariable,TipeEskalasi,BindEskalasi) {
 	$scope.userRole = UserRole.getCurrentRole();
 	var locationPath = '/airkapal/permohonan';
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
	// $scope.options = [{value: undefined , name: 'Semua Permohonan'}, {value: "P", name: 'Sudah Bayar EPB'}, {value: "N", name: 'Belum Bayar EPB'}];
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
		$scope.filterMinLength = 0;
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
			page:newPage-1,      		
      		groupType : 2,
      		status :$scope.option.value,
			// sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		};
		if($scope.sortBy){ 
			filterItem.sort = $scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc');
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
		DaftarPermohonanAirKapal.get(filterItem,function(response) {

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
				$scope.items[i].hari = $scope.setTextDay($scope.items[i].tglIsi);
				$scope.items[i].jamPermohonan = $filter('date')($scope.items[i].tglBuat, 'HH:mm');
				$scope.items[i].jamIsi = $filter('date')($scope.items[i].tglIsi, 'HH:mm');
				$scope.items[i].tglIsi = $filter('date')($scope.items[i].tglIsi, 'dd-MM-yyyy');
				var jasaList = $scope.items[i].listNamaJasa;
				var showToolTip = false;
				var namaJasa =[];

				if(jasaList.length < 1){
					$scope.items[i].flagJasa = false;
				}else{
					$scope.items[i].flagJasa = true;
					for (var k=0; k<jasaList.length; k++){
						jasaList[k].nama = jasaList[k].nama.split("_").join(" ");
						jasaList[k].nama = jasaList[k].nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
						    return letter.toUpperCase();
						});
						if(jasaList[k].nama==='Pandu' || jasaList[k].nama==='Tambat'){
							showToolTip = true;
						}
						namaJasa.push(jasaList[k].nama);
					};
				}
				$scope.items[i].flagAir = (namaJasa.indexOf('Air Kapal') >= 0?true : false);
				$scope.items[i].showToolTip = showToolTip; //untuk menentukan kondisi ditampilkannya tooltip
			};
			;
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
		//console.log(dataJasa);

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

  $scope.setAirKapal = function () {
    $scope.isLoketAir = true;
    SharedVariable.setVariable($scope.isLoketAir);
    $location.path('/transaksi/new/');
  };

	//tambah jasa
	$scope.tambahJasa = function(jasa){
		$location.path('/transaksi/jasabaru/'+jasa);
	}

	//edit jasa
	$scope.editJasa = function(noPpk1,urutanPermohonan){
		SharedVariable.setVariable(true);
		$location.path('/transaksi/permohonan/'+noPpk1+'/'+urutanPermohonan)
	}

	$scope.setStatusEpb = function(){
		$scope.ppk1 = document.getElementById('noPpkVal').value;
		$scope.urutan = document.getElementById('urutanVal').value;
		StatusEPBPermohonan.get({ppk1:$scope.ppk1,urutan:$scope.urutan}, function(response){
			if(response.status !== '500'){
					$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Berhasil mengubah status menjadi 'Sudah Dibayar'."
				};
				Notification.setNotification($scope.setNotification);
				$timeout(function(){
					location.reload();
				},1000);
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

	$scope.showModalValidasiDataUmum = function(item){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH049'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPMH049'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			showNotif : "hide",
			dataItem : item
		};
		Notification.setNotification(note);
		$('#modalValidasiEditDataUmum').modal('show');
	}

	$scope.setTextDay = function(date){
        var day;
        switch (new Date(date).getDay()) {
            case 0:
                day = "Minggu";
                break;
            case 1:
                day = "Senin";
                break;
            case 2:
                day = "Selasa";
                break;
            case 3:
                day = "Rabu";
                break;
            case 4:
                day = "Kamis";
                break;
            case 5:
                day = "Jumat";
                break;
            case 6:
                day = "Sabtu";
        }
        return day;
   };
}]);
