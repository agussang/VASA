'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiRealisasiairkapalCtrl
 * @description
 * # TransaksiRealisasiairkapalCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiRealisasiairkapalCtrl', ['$scope', '$filter', '$routeParams', '$controller', 'Notification','AppParam', 'AppParamValue', 'PermohonanDetail', 'PenetapanDetail', 'RealisasiAirKapal', 'RealisasiAirKapalByPpkJasa', 'PenetapanAirKapalByPpkJasa', 'RealisasiAirKapalEdit', 'MdmDermagaJasa','MdmDermagaPerJasa','RealisasiAirKapalDetailAlatIsi','RealisasiAirKapalDetailAlatIsiById','RealisasiAirKapalDetailKapalPenunjang','RealisasiAirKapalDetailKapalPenunjangById','RealisasiAirKapalDetailAlatIsiByIdReaAirKapal','RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal','MdmKapalList','HistoryRevisiAirKapal','Validations','validationForm','BindEskalasi','UpdateStatusReaAfterEskalasi', function ($scope, $filter, $routeParams, $controller, Notification,AppParam, AppParamValue, PermohonanDetail, PenetapanDetail, RealisasiAirKapal, RealisasiAirKapalByPpkJasa, PenetapanAirKapalByPpkJasa, RealisasiAirKapalEdit, MdmDermagaJasa,MdmDermagaPerJasa,RealisasiAirKapalDetailAlatIsi,RealisasiAirKapalDetailAlatIsiById,RealisasiAirKapalDetailKapalPenunjang,RealisasiAirKapalDetailKapalPenunjangById,RealisasiAirKapalDetailAlatIsiByIdReaAirKapal,RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal,MdmKapalList,HistoryRevisiAirKapal,Validations,validationForm,BindEskalasi,UpdateStatusReaAfterEskalasi) {
	/*
	 ** tab air kapal
	 */
	// extend controller di atasnya (RealisasiPermohonanCtrl); untuk mengambil data pernetapan, supaya tidak request berkali-kali
	//alert ('Cek tab jasa labuh controller');
	angular.extend(this, $controller('RealisasiPermohonanCtrl', {
		$scope: $scope
	}));
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.listOfKapal = [];
	MdmKapalList.get({}, function(response){
		$scope.listOfKapal = response;
	});

	var mainPpkJasa = '';
	$scope.tempSelection = null;
	$scope.rightSelection = {};
	$scope.itemSelected = [];
	$scope.avoidClick = false;
	$scope.rightReadOnly = true;
	$scope.realisasiairkapal = {};

	/* scope untuk tabel */
	$scope.tempNewAlatIsi = {};
	$scope.tempNewKapalPenunjang = {};
	$scope.tempEditAlatIsi = {};
	$scope.tempEditKapalPenunjang = {};
	$scope.tabelAlatIsi = [];
	$scope.tabelKapalPenunjang = [];
	$scope.realisasiairkapal.jamKerja = '1';
	$scope.rightSelection.satuanVolume = '2';
  	$scope.dermagaAirRequired = false;
  	BindEskalasi.setDefaultEskalasi();
  	var tglSekarang = new Date();
  	var jamSekarang = $filter('date')(new Date(), 'HH:mm');

	// eksperimen
	$scope.tabelAlatIsiCounter = 0;

	// modal
	$scope.modalalatisi = '';

	var getAirItems = function(){
		if ($scope.airItems.length > 0) {
			$scope.items = JSON.parse(JSON.stringify($scope.airItems));

			for (var i = 0; i < $scope.airItems.length; i++) {
				var itemPpkJasa = $scope.airItems[i].noPpkJasa;
				RealisasiAirKapalByPpkJasa.get({
					ppkjasa: itemPpkJasa
				}, function(response) {
				   	var item = JSON.parse(JSON.stringify(response));
				   	if(response.id){
				 		$scope.itemSelected.push(item);
					}
				});
			}

			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			mainPpkJasa = $scope.tempSelection.noPpkJasa;
			AppParamValue.get({nama:'ALAT_ISI_AIR',value:$scope.tempSelection.alatIsi},function(response){
				$scope.tempSelection.alatIsiText = response[0].caption;
			});
			if($scope.tempSelection.satuanVolume !== null){
				AppParamValue.get({nama:'SATUAN',value:$scope.tempSelection.satuanVolume},function(response){
					$scope.tempSelection.satuanVolume = response[0].value;
				});
			}
			// $scope.tempSelection.dermaga = {namaDermaga:$scope.items[0].namaDermaga, kodeDermaga:$scope.items[0].kodeDermaga};
			//$scope.tempSelection.dermaga = {mdmgNama:$scope.items[0].namaDermaga, mdmgKode:$scope.items[0].kodeDermaga};
			$scope.tempSelection.dermaga = $scope.items[0].namaDermaga;
			// $scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
			// document.getElementById('jamIsiVal').value = $scope.tempSelection.jamIsi;
			$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
			$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi, 'dd-MM-yyyy');

			//default jam
			document.getElementById('jamSetujuRealisasiAirKapal').querySelector('input').value	= moment().format('HH:mm');
			document.getElementById('jamMulaiIsiRealisasiAirKapal').querySelector('input').value = moment().format('HH:mm');
 			document.getElementById('jamSelesaiIsiRealisasiAirKapal').querySelector('input').value = moment().format('HH:mm');

 			// default date and time
			$scope.realisasiairkapal.tglSetuju = new Date();
			$scope.realisasiairkapal.tglMulaiIsi = new Date();
			$scope.realisasiairkapal.tglSelesaiIsi = new Date();
			$scope.realisasiairkapal.jamSetuju = $filter('date')(new Date(), 'HH:mm');
			$scope.realisasiairkapal.jamMulaiIsi = $filter('date')(new Date(), 'HH:mm');
			$scope.realisasiairkapal.jamSelesaiIsi = $filter('date')(new Date(), 'HH:mm');

			historyAirKapal($scope.tempSelection.noPpkJasa);
		}
	};
	$scope.$watch('dataUmum', function(newVal, oldVal) {
		getAirItems();
	});

  $scope.$watch('rightSelection.alatIsi',function (newValue) {
  	console.log(newValue);
     if (newValue == 2 || newValue == 3) {
      $scope.dermagaAirRequired = false;
     } else {
      $scope.dermagaAirRequired = true;
     }
  });


 	var historyAirKapal = function(ppkJasa){
		HistoryRevisiAirKapal.get({noPpkJasa:ppkJasa}, function(response){
			if(response.length > 0){
				$scope.tempSelection = response[0];
				$scope.tempSelection.noPpkJasa = mainPpkJasa;
				$scope.tempSelection.tglIsi = new Date(response[0].tglIsi);
				var jamIsi = (moment.utc(response[0].tglIsi).format()).split("T")[1].split("Z");
				$scope.tempSelection.jamIsi = jamIsi[0];
				$scope.tempSelection.dermaga = response[0].namaDermaga;
			}
		});
	};

 	var matchDataSelected = function(item){
 		var match = {};
 		var items = JSON.parse(JSON.stringify($scope.airItems));
		for(var i=0;i < items.length;i++){
			if(items[i].noPpkJasa==item.noPpkJasa){
				match = items[i];
			}
		}
		return match;
 	}

	var handleSelect = function(item, e) {
		mainPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
 		$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi,'HH:mm');
 		$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi,'dd-MM-yyyy');
		historyAirKapal($scope.tempSelection.noPpkJasa);
		//$scope.tempSelection.jamIsi = $filter('date')(item.tglIsi, 'HH:mm');
		// $scope.tempSelection.dermaga = {kodeDermaga:item.kodeDermaga, namaDermaga:item.namaDermaga};
		$scope.tempSelection.dermaga = {mdmgKode:item.kodeDermaga, mdmgNama:item.namaDermaga};
	};

	$scope.getRealisasiAirKapalDetailbyPpkJasa = function(item){
		RealisasiAirKapalByPpkJasa.get({noPpkJasa:item.noPpkJasa},function(response){
			if(response.content[0].status!=='404'){
				/* validasi jika data sudah di verifikasi, maka data tidak bisa di edit*/
				if(Validations.checkStatusIsVerified(response.content[0])){
					$scope.rightReadOnly = true;
					return false;
				}else{
					// $scope.rightReadOnly = false;
					$scope.rightSelection = response.content[0];
					AppParamValue.get({nama:'ALAT_ISI_AIR',value:$scope.rightSelection.alatIsi},function(response){
						$scope.rightSelection.alatIsiText = response[0].caption;
						//console.log($scope.rightSelection.alatIsiText);
					});

					AppParamValue.get({nama:'SATUAN',value:$scope.rightSelection.satuanVolume},function(response){
						$scope.rightSelection.satuanVolumeText = response[0].caption;
					});

					//$scope.rightSelection.dermaga = {mdmgKode:item.kodeDermaga, mdmgNama:item.namaDermaga};
					$scope.rightSelection.dermaga = item.namaDermaga;
					var idReaKapal = response.content[0].id;

					RealisasiAirKapalDetailAlatIsiByIdReaAirKapal.get({id:idReaKapal}, function(response){
						var alatIsi = response;
						$scope.tabelAlatIsi = alatIsi;
					});

					RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal.get({id:idReaKapal}, function(response){
						var kapalPenunjang = response;
						$scope.tabelKapalPenunjang = response;
					});

					AppParamValue.get({nama:'JAM_KERJA',value:$scope.rightSelection.jamKerja},function(response){
						$scope.realisasiairkapal.jamKerjaText = response[0].caption;
					});
					$scope.realisasiairkapal.noPelayanan = item.noPelayanan;
					$scope.realisasiairkapal.jamKerja = ''+item.jamKerja;
					$scope.realisasiairkapal.catatan = item.catatan;

					$scope.realisasiairkapal.jamMulaiIsi = $filter('date')($scope.rightSelection.tglMulaiIsi, 'HH:mm');
					$scope.realisasiairkapal.jamSelesaiIsi = $filter('date')($scope.rightSelection.tglSelesaiIsi, 'HH:mm');
					$scope.realisasiairkapal.jamSetuju = $filter('date')($scope.rightSelection.tglSetuju, 'HH:mm');
					document.getElementById('tglSetujuAirKapal').querySelector('input').value = $filter('date')($scope.rightSelection.tglSetuju,'dd-MM-yyyy');
					document.getElementById('tglMulaiIsiAirKapal').querySelector('input').value = $filter('date')($scope.rightSelection.tglMulaiIsi,'dd-MM-yyyy');
					document.getElementById('tglSelesaiAirKapal').querySelector('input').value = $filter('date')($scope.rightSelection.tglSelesaiIsi,'dd-MM-yyyy');
					

					$scope.realisasiairkapal.tglSetuju = $filter('date')($scope.rightSelection.tglSetuju,'dd-MM-yyyy');
					$scope.realisasiairkapal.tglMulaiIsi = $filter('date')($scope.rightSelection.tglMulaiIsi,'dd-MM-yyyy');
					$scope.realisasiairkapal.tglSelesaiIsi = $filter('date')($scope.rightSelection.tglSelesaiIsi,'dd-MM-yyyy');

					$scope.$watch('tabelAlatIsi',function(){
						if($scope.tabelAlatIsi.length > 0){
							var vlm = 0;
							for (var i = 0; i < $scope.tabelAlatIsi.length; i++) {
								vlm = vlm + $scope.tabelAlatIsi[i].volume;
							}
							$scope.rightSelection.volume = vlm;
						}
					});
				}
			}else{
				var getDataPtp = matchDataSelected(item);
				HistoryRevisiAirKapal.get({noPpkJasa:getDataPtp.noPpkJasa}, function(response){
					if(response.length > 0){
						$scope.rightSelection = response[0];
						$scope.rightSelection.noPpkJasa = getDataPtp.noPpkJasa;
						AppParamValue.get({nama:'ALAT_ISI_AIR',value:$scope.rightSelection.alatIsi},function(response){
							$scope.rightSelection.alatIsiText = response[0].caption;
						});

						AppParamValue.get({nama:'SATUAN',value:$scope.rightSelection.satuanVolume},function(response){
							$scope.rightSelection.satuanVolumeText = response[0].caption;
						});

						$scope.rightSelection.dermaga = {mdmgKode:item.kodeDermaga, mdmgNama:item.namaDermaga};
						var idReaKapal = item.id;

						RealisasiAirKapalDetailAlatIsiByIdReaAirKapal.get({id:idReaKapal}, function(response){
							var alatIsi = response;
							$scope.tabelAlatIsi = alatIsi;
						});

						RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal.get({id:idReaKapal}, function(response){
							var kapalPenunjang = response;
							$scope.tabelKapalPenunjang = response;
						});

						AppParamValue.get({nama:'JAM_KERJA',value:$scope.rightSelection.jamKerja},function(response){
							$scope.realisasiairkapal.jamKerjaText = response[0].caption;
						});
						$scope.realisasiairkapal.noPelayanan = item.noPelayanan;
						$scope.realisasiairkapal.jamKerja = ''+item.jamKerja;
						$scope.realisasiairkapal.catatan = item.catatan;
						$scope.realisasiairkapal.jamMulaiIsi = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglMulaiIsi = new Date();
						$scope.realisasiairkapal.jamSelesaiIsi = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglSelesaiIsi = new Date();
						$scope.realisasiairkapal.jamSetuju = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglSetuju = new Date();
					}else{
						$scope.rightSelection = getDataPtp;
						AppParamValue.get({nama:'ALAT_ISI_AIR',value:$scope.rightSelection.alatIsi},function(response){
							$scope.rightSelection.alatIsiText = response[0].caption;
						});

						AppParamValue.get({nama:'SATUAN',value:$scope.rightSelection.satuanVolume},function(response){
							$scope.rightSelection.satuanVolumeText = response[0].caption;
						});

						$scope.rightSelection.dermaga = {mdmgKode:item.kodeDermaga, mdmgNama:item.namaDermaga};
						var idReaKapal = item.id;

						RealisasiAirKapalDetailAlatIsiByIdReaAirKapal.get({id:idReaKapal}, function(response){
							var alatIsi = response;
							$scope.tabelAlatIsi = alatIsi;
						});

						RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal.get({id:idReaKapal}, function(response){
							var kapalPenunjang = response;
							$scope.tabelKapalPenunjang = response;
						});

						AppParamValue.get({nama:'JAM_KERJA',value:$scope.rightSelection.jamKerja},function(response){
							$scope.realisasiairkapal.jamKerjaText = response[0].caption;
						});
						$scope.realisasiairkapal.noPelayanan = item.noPelayanan;
						$scope.realisasiairkapal.jamKerja = ''+item.jamKerja;
						$scope.realisasiairkapal.catatan = item.catatan;
						$scope.realisasiairkapal.jamMulaiIsi = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglMulaiIsi = new Date();
						$scope.realisasiairkapal.jamSelesaiIsi = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglSelesaiIsi = new Date();
						$scope.realisasiairkapal.jamSetuju = $filter('date')(new Date(), 'HH:mm');
						$scope.realisasiairkapal.tglSetuju = new Date();
					}
				});
			}
		});
	};

	var handleSelectRight = function (item, e) {
		$scope.rightReadOnly = true;
		$scope.getRealisasiAirKapalDetailbyPpkJasa(item);
	};

	var handleDblClickRight = function(item, e){
		$scope.rightReadOnly = false;
		$scope.getRealisasiAirKapalDetailbyPpkJasa(item);
	}

	// untuk membandingkan scope yang akan di-push; identifier adalah properti dari item
	var isIncludeItem = function(array, item, identifier) {
		var match = false;
		for (var i = 0, len = array.length; i < len; i++) {
			if (array[i][identifier] == item[identifier]) {
				match = true;
			}
		}
		return match;
	};

	$scope.$on('editByListNoPPKJasa', function(event, item) {
		$('.btn-list-mobile').removeClass('fa-pencil-square').addClass('fa-pencil-square-o');
		$('#datarea-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
		handleSelectRight(item);
		$scope.rightReadOnly = false;
	});

	$scope.validationLookupDermagaAir = function(){
		if($scope.valueField !== $scope.rightSelection.dermaga){
			if(typeof $scope.rightSelection.dermaga != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-011</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.dermaga = '';
			}
		}
	}

	$scope.validationLookupNewAlatIsi = function(){
		if($scope.valueField !== $scope.tempNewAlatIsi.alatIsiAir){
			if(typeof $scope.tempNewAlatIsi.alatIsiAir != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-012</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempNewAlatIsi.alatIsiAir = '';
			}
		}
	}

	$scope.validationLookupEditAlatIsi = function(){
		if($scope.valueField !== $scope.tempEditAlatIsi.alatIsiAir){
			if(typeof $scope.tempEditAlatIsi.alatIsiAir != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-012</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempEditAlatIsi.alatIsiAir = '';
			}
		}
	}

	$scope.validationLookupNewAlatApung = function(){
		if($scope.valueField !== $scope.tempNewKapalPenunjang.kapalPenunjang){
			if(typeof $scope.tempNewKapalPenunjang.kapalPenunjang != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-013</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempNewKapalPenunjang.kapalPenunjang = '';
			}
		}
	}

	$scope.validationLookupEditAlatApung = function(){
		if($scope.valueField !== $scope.tempEditKapalPenunjang.kapal){
			if(typeof $scope.tempEditKapalPenunjang.kapal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-013</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempEditKapalPenunjang.kapal = '';
			}
		}
	}
	$scope.moveSelection = function() {
		if ($scope.tempSelection != null) {
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');

			if (!match) {
				$scope.avoidClick = true;
				var select = JSON.parse(JSON.stringify($scope.tempSelection));
				$scope.itemSelected.push(select);
				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].jamKerja = '1';
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.realisasiairkapal.tglMulaiIsi = $scope.itemSelected[idx].tglIsi;
				$scope.realisasiairkapal.jamMulaiIsi = $scope.itemSelected[idx].jamIsi;

				$scope.rightReadOnly = false;
			}
		}
	};

	$scope.saveAirKapal = function() {
		if($scope.configRight.selectedItems.length > 0){
			var jamSetuju = document.getElementById('jamSetujuRealisasiAirKapal').querySelector('input').value;
			var jamMulaiIsi = document.getElementById('jamMulaiIsiRealisasiAirKapal').querySelector('input').value;
			var jamSelesaiIsi = document.getElementById('jamSelesaiIsiRealisasiAirKapal').querySelector('input').value;

			$scope.realisasiairkapal.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.realisasiairkapal.noPpkJasa = $scope.tempSelection.noPpkJasa;
			$scope.realisasiairkapal.status = $scope.rightSelection.status;
			$scope.realisasiairkapal.alatIsi = $scope.rightSelection.alatIsi;

			//added by Nurika comment loop $scope.dermagaAirRequired 
	      	//if ($scope.dermagaAirRequired) {
	        	if (typeof $scope.rightSelection.dermaga === 'object') {
	          		$scope.realisasiairkapal.kodeDermaga = $scope.rightSelection.dermaga.mdmgKode;
	          		$scope.realisasiairkapal.namaDermaga = $scope.rightSelection.dermaga.mdmgNama;
	        	}else{
	          		$scope.realisasiairkapal.kodeDermaga = $scope.rightSelection.kodeDermaga;
	          		$scope.realisasiairkapal.namaDermaga = $scope.rightSelection.dermaga;
	        	}
	      	//} end

			$scope.realisasiairkapal.volume = $scope.rightSelection.volume;
			$scope.realisasiairkapal.satuanVolume = $scope.rightSelection.satuanVolume;
			// $scope.realisasiairkapal.tglSetuju = $filter('date')($scope.realisasiairkapal.tglSetuju, 'yyyy-MM-dd')+'T'+jamSetuju;
			// $scope.realisasiairkapal.tglSelesaiIsi = $filter('date')($scope.realisasiairkapal.tglSelesaiIsi, 'yyyy-MM-dd')+'T'+jamSelesaiIsi;

			if(typeof $scope.realisasiairkapal.tglSetuju === 'object'){
				if($scope.realisasiairkapal.tglSetuju.toString().indexOf('-') === -1){
					$scope.realisasiairkapal.tglSetuju = $filter('date')($scope.realisasiairkapal.tglSetuju,'yyyy-MM-dd')+'T'+jamSetuju;
				}
			}else{
				var formatTglSetuju = $scope.realisasiairkapal.tglSetuju.split('-');
				var newFormatTglSetuju = formatTglSetuju[1]+'-'+formatTglSetuju[0]+'-'+formatTglSetuju[2];
				$scope.realisasiairkapal.tglSetuju = $filter('date')(new Date(newFormatTglSetuju),'yyyy-MM-dd')+'T'+jamSetuju;
			}

			if(typeof $scope.realisasiairkapal.tglMulaiIsi === 'object'){
				if($scope.realisasiairkapal.tglMulaiIsi.toString().indexOf('-') === -1){
					$scope.realisasiairkapal.tglMulaiIsi = $filter('date')($scope.realisasiairkapal.tglMulaiIsi,'yyyy-MM-dd')+'T'+jamMulaiIsi;
				}
			}else{
				var formatTglMulai = $scope.realisasiairkapal.tglMulaiIsi.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.realisasiairkapal.tglMulaiIsi = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulaiIsi;
			}

			if(typeof $scope.realisasiairkapal.tglSelesaiIsi === 'object'){
				if($scope.realisasiairkapal.tglSelesaiIsi.toString().indexOf('-') === -1){
					$scope.realisasiairkapal.tglSelesaiIsi = $filter('date')($scope.realisasiairkapal.tglSelesaiIsi,'yyyy-MM-dd')+'T'+jamSelesaiIsi;
				}
			}else{
				var formatTglSelesai = $scope.realisasiairkapal.tglSelesaiIsi.split('-');
				var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
				$scope.realisasiairkapal.tglSelesaiIsi = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesaiIsi;
			}

			// var formatTglMulaiIsi = $scope.realisasiairkapal.tglMulaiIsi.split('-');
			// var newFormatTglMulaiIsi = formatTglMulaiIsi[2]+'-'+formatTglMulaiIsi[1]+'-'+formatTglMulaiIsi[0];
			// $scope.realisasiairkapal.tglMulaiIsi = newFormatTglMulaiIsi+'T'+$scope.realisasiairkapal.jamMulaiIsi;

			// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
			var parseTglMasuk = Date.parse($scope.realisasiairkapal.tglMulaiIsi);
			var parseTglKeluar = Date.parse($scope.realisasiairkapal.tglSelesaiIsi);

			if(parseTglMasuk>=parseTglKeluar){
				var note =  {
								type 	: "warning",
								message : "Tgl & Jam Selesai Isi harus melebihi Tgl & Jam Mulai Isi.<br><br>Kode validasi : <b>VALREA-01</b>"
							};
				Notification.setNotification(note);
				return false;
			}
			// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

			var rightPpkJasa = $scope.rightSelection.noPpkJasa;
			for (var i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].noPpkJasa === rightPpkJasa) {
					var status = $scope.items[i].status;
				}
			}

			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;

			/*validasi Form*/
	      	if ($scope.dermagaAirRequired) {
	        	var R1 = validationForm.required('Nama Dermaga', $scope.realisasiairkapal.namaDermaga);
	        	if(!R1){return R1;}
	      	}

			var R2 = validationForm.required('Volume Air',$scope.realisasiairkapal.volume);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Mulai Isi Air',$scope.realisasiairkapal.tglMulaiIsi);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Isi Air',jamMulaiIsi);
			if(!R4){return R4;}
			var R5 = validationForm.required('Satuan Volume Air',$scope.realisasiairkapal.satuanVolume);
			if(!R5){return R5;}
			var R6 = validationForm.required('Tanggal Selesai Isi Air',$scope.realisasiairkapal.tglSelesaiIsi);
			if(!R6){return R6;}

			if($scope.rightSelection.tglVerifikasi === undefined){
				RealisasiAirKapal.save($scope.realisasiairkapal,
					function(response){
						console.log(response);
						if(response.id){
							if($scope.tabelAlatIsi.length > 0){
								for (var i = 0; i < $scope.tabelAlatIsi.length; i++) {
									if(!$scope.tabelAlatIsi[i].id){
										$scope.tabelAlatIsi[i].idReaAirKapal = response.id;
										$scope.saveAlatIsiBaru($scope.tabelAlatIsi[i]);
									}
								}
								$scope.tabelAlatIsi = {};
							}

							if($scope.tabelKapalPenunjang.length > 0){
								for (var i = 0; i < $scope.tabelKapalPenunjang.length; i++) {
									if(!$scope.tabelKapalPenunjang[i].id){
										$scope.tabelKapalPenunjang[i].idReaAirKapal = response.id;
										$scope.saveKapalPenunjangBaru($scope.tabelKapalPenunjang[i]);
									}
								}
								$scope.tabelKapalPenunjang = {};
							}

							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							BindEskalasi.setDefaultEskalasi();
						} else{
							var note  = {
								type	: "error", //ex : danger, warning, success, info
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
				},
				function(response){
					var note  = {
						type	: "error", //ex : danger, warning, success, info
						message	: "Data gagal disimpan"
					};
					Notification.setNotification(note);
				});
			}else{
				RealisasiAirKapalEdit.update({noPpkJasa:$scope.rightSelection.noPpkJasa},$scope.realisasiairkapal,
					function(response){
						if(response.id){
							if($scope.tabelAlatIsi.length > 0){
								for (var i = 0; i < $scope.tabelAlatIsi.length; i++) {
									if(!$scope.tabelAlatIsi[i].id){
										$scope.tabelAlatIsi[i].idReaAirKapal = response.id;
										$scope.saveAlatIsiBaru($scope.tabelAlatIsi[i]);
									}
								}
								$scope.tabelAlatIsi = {};
							}

							if($scope.tabelKapalPenunjang.length > 0){
								for (var i = 0; i < $scope.tabelKapalPenunjang.length; i++) {
									if(!$scope.tabelKapalPenunjang[i].id){
										$scope.tabelKapalPenunjang[i].idReaAirKapal = response.id;
										$scope.saveKapalPenunjangBaru($scope.tabelKapalPenunjang[i]);
									}
								}
								$scope.tabelKapalPenunjang = {};
							}
						var note  = {
							type	: "success", //ex : danger, warning, success, info
							message	: "Data berhasil tersimpan"
						};
						Notification.setNotification(note);
						if(response.status===2){
							UpdateStatusReaAfterEskalasi.update({noPpkJasa:response.noPpkJasa},{},function(response){
								console.log(response);
							});
						}
						BindEskalasi.setDefaultEskalasi();
					} else{
						var note  = {
							type	: "error", //ex : danger, warning, success, info
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				},
				function(response){
					var note  = {
						type	: "error", //ex : danger, warning, success, info
						message	: "Data gagal disimpan"
					};
					Notification.setNotification(note);
				});
			}
		}
	};

	$scope.tambahAlatIsi = function(){
		if($scope.configRight.selectedItems.length>0){
			$scope.modalalatisi = '#alatisi';
			$scope.tempNewAlatIsi = {};
			var jamSekarang2 = tglSekarang.setHours(tglSekarang.getHours() + 1);
			$scope.tglMulaiNewAlatIsi = tglSekarang;
			$scope.tempNewAlatIsi.jamMulai = jamSekarang;
			$scope.tglSelesaiNewAlatIsi = tglSekarang;
			$scope.tempNewAlatIsi.jamSelesai = moment(jamSekarang2).format('HH:mm');
			$scope.tempEditAlatIsi = {};
		}
	};

	$scope.tambahKapalPenunjang = function(){
		if($scope.configRight.selectedItems.length>0){
			$scope.modalKapalPenunjang = '#kapalpenunjang';
			$scope.tempNewKapalPenunjang = {};
			$scope.tglMulaiNewKapalPenunjang = "";
			$scope.tglSelesaiNewKapalPenunjang = "";
			$scope.tempNewKapalPenunjang.jamMulaiIsi = "";
			$scope.tempNewKapalPenunjang.jamSelesaiIsi = "";
			$scope.tempEditKapalPenunjang = {};
		}
	};

	//submit kapal tunda
	$scope.submitAlatIsiBaru = function(){
		var temp = $scope.tempNewAlatIsi;
		temp.alatIsi = temp.alatIsiAir.value;
		temp.alatIsiText = temp.alatIsiAir.caption;
		var tglMasukVal = $filter('date')($scope.tglMulaiNewAlatIsi, 'yyyy-MM-dd');
		temp.tglMulaiIsi = tglMasukVal + 'T' + temp.jamMulai;
		var tglSelesaiVal = $filter('date')($scope.tglSelesaiNewAlatIsi, 'yyyy-MM-dd');
		temp.tglSelesaiIsi = tglSelesaiVal + 'T' + temp.jamSelesai;
		temp.meteranAwal = temp.mAwal;
		temp.meteranAkhir = temp.mAkhir;
		temp.volume = parseInt(temp.mAkhir) - parseInt(temp.mAwal);

		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulaiIsi = Date.parse(temp.tglMulaiIsi);
		var parseTglSelesaiIsi = Date.parse(temp.tglSelesaiIsi);
		if(parseTglMulaiIsi>=parseTglSelesaiIsi){
			var note =  {
							type 	: "warning",
							message : "Data tidak berhasil disimpan, <br> Tgl & Jam Selesai harus melebihi Tgl & Jam Mulai.<br><br>Kode validasi : <b>VALREA-01</b>"
						};
			Notification.setModalNotification(note);
			return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		$scope.tabelAlatIsi.push(temp);
		$scope.setNotification  = {
    		type	: "success",
    		message	: "Data berhasil tersimpan"
  		};
  		Notification.setNotification($scope.setNotification);
  		Notification.setModalNotification($scope.setNotification);

		$scope.tempNewAlatIsi = '';

		updateTabelAlatIsi();
		// $scope.$watch('tabelAlatIsi',function(){
		// 	if($scope.tabelAlatIsi.length > 0){
		// 		var vlm = 0;
		// 		for (var i = 0; i < $scope.tabelAlatIsi.length; i++) {
		// 			vlm = vlm + $scope.tabelAlatIsi[i].volume;
		// 		}
		// 		$scope.rightSelection.volume = vlm;
		// 	}
		// });
		$('#alatisi').modal('hide');
	}

	//submit kapal tunda
	$scope.submitKapalPenunjangBaru = function(){
		var temp = $scope.tempNewKapalPenunjang;

		temp.kapalText = $scope.tempNewKapalPenunjang.kapalPenunjang.nama;
		temp.kapal = $scope.tempNewKapalPenunjang.kapalPenunjang.noRegistrasi;
		var jamMulai = document.getElementById('jamMulaiTambahKapalPenunjang').querySelector('input').value;
 		var jamSelesai = document.getElementById('jamSelesaiTambahKapalPenunjang').querySelector('input').value;

  		temp.tglMulaiIsi = $filter('date')($scope.tglMulaiNewKapalPenunjang, 'yyyy-MM-dd')+'T'+jamMulai;
  		temp.tglSelesaiIsi = $filter('date')($scope.tglSelesaiNewKapalPenunjang, 'yyyy-MM-dd')+'T'+jamSelesai;

  		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulaiIsi = Date.parse(temp.tglMulaiIsi);
		var parseTglSelesaiIsi = Date.parse(temp.tglSelesaiIsi);
		if(parseTglMulaiIsi>=parseTglSelesaiIsi){
			var note =  {
							type 	: "warning",
							message : "Data tidak berhasil disimpan, <br> Tgl & Jam Selesai harus melebihi Tgl & Jam Mulai.<br><br>Kode validasi : <b>VALREA-01</b>"
						};
			Notification.setNotification(note);
			return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		$scope.tabelKapalPenunjang.push(temp);
		$scope.tempNewKapalPenunjang = '';
	}

	/* for table, tambah alat isi;tambah kapal penunjang*/
	var updateTabelAlatIsi = function(idReaAirKapal){
	  	// RealisasiAirKapalDetailAlatIsiByIdReaAirKapal.get({id:idReaAirKapal}, function(resp){
	   //  	var alatIsi = resp;
	   //  	$scope.tabelAlatIsi = alatIsi;
	    	$scope.$watch('tabelAlatIsi',function(){
				if($scope.tabelAlatIsi.length > 0){
					var vlm = 0;
					for (var i = 0; i < $scope.tabelAlatIsi.length; i++) {
						vlm = vlm + $scope.tabelAlatIsi[i].volume;
					}
					$scope.rightSelection.volume = vlm;
				}
			});
	  	// });
	};

	$scope.deleteAlatIsiView = function(i){
		var checkDeleteAlatIsi = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteAlatIsi) {
			$scope.rightSelection.volume = parseInt($scope.rightSelection.volume) - parseInt($scope.tabelAlatIsi[i].volume);
			$scope.tabelAlatIsi.splice(i, 1);
		}
	}

	$scope.deleteAlatIsi = function(id, idTempAlatIsi){
		var checkDeleteAlatIsi = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteAlatIsi) {
			if(id){
			  	RealisasiAirKapalDetailAlatIsiById.delete({id:id}, {},
			    	function(response){
			     		$scope.setNotification  = {
					        type	: "success",
					        message	: "Data berhasil dihapus"
			     	};
			     	Notification.setNotification($scope.setNotification);
					$scope.tabelAlatIsi.splice(idTempAlatIsi, 1);
			      	updateTabelAlatIsi($scope.rightSelection.id);
			    },
			    function(response){
			      	$scope.setNotification  = {
			       		type	: "warning",
			        	message	: "Data tidak berhasil dihapus"
			      	};
			      	Notification.setNotification($scope.setNotification);
			      	// updateTabelAlatIsi($scope.rightSelection.id);
			    });
			}else{
				$scope.tabelAlatIsi.splice(idTempAlatIsi, 1);
			    updateTabelAlatIsi($scope.rightSelection.id);
			}
		}
	}

	$scope.editAlatIsi = function(id,idx){
	  	var index = idx;
	  	$scope.tempEditAlatIsi = {};
	  	var current = JSON.parse(JSON.stringify($scope.tabelAlatIsi[index]));
	  	$scope.tempEditAlatIsi.alatIsiAir = {value:current.alatIsi, caption:current.alatIsiText};
	  	$scope.tempEditAlatIsi.jamMulaiIsi = $filter('date')(current.tglMulaiIsi,'HH:mm');
	  	$scope.tempEditAlatIsi.tglMulaiIsi = $filter('date')(current.tglMulaiIsi,'dd-MM-yyyy');
	  	$scope.tempEditAlatIsi.jamSelesaiIsi = $filter('date')(current.tglSelesaiIsi,'HH:mm');
	  	$scope.tempEditAlatIsi.tglSelesaiIsi = $filter('date')(current.tglSelesaiIsi,'dd-MM-yyyy');
	  	$scope.tempEditAlatIsi.meteranAwal = current.meteranAwal;
	  	$scope.tempEditAlatIsi.meteranAkhir = current.meteranAkhir;
	  	$scope.tempEditAlatIsi.id = id;
	  	$scope.tempEditAlatIsi.idTemp = index ;
	  	// Untuk menentukan id index temp jika alat isi belum terdapat dari data
	  	// if(!id){ $scope.tempEditAlatIsi.idTemp = index }
	}

	$scope.saveAlatIsiBaru = function(dataAlatIsi){
	  	//dataAlatIsi.idReaAirKapal = $scope.rightSelection.id;
	  	RealisasiAirKapalDetailAlatIsi.save(dataAlatIsi,
	    	function(response){
	      		$scope.setNotification  = {
	        		type	: "success",
	        		message	: "Data berhasil tersimpan"
	      		};
	      		Notification.setNotification($scope.setNotification);
	     		updateTabelAlatIsi($scope.rightSelection.id);
	    	},function(response){
	      		$scope.setNotification  = {
	        		type	: "warning",
	        		message	: "Data tidak berhasil tersimpan"
	      	};
	      	Notification.setNotification($scope.setNotification);
	      	updateTabelAlatIsi($scope.rightSelection.id);
	    });
	};

	$scope.saveEditAlatIsi = function(id, idTemp){
		var jamMulaiIsi = document.getElementById('jamMulaiEditAlatIsi').querySelector('input').value;
	  	var jamSelesaiIsi = document.getElementById('jamSelesaiEditAlatIsi').querySelector('input').value;

		if(typeof $scope.tempEditAlatIsi.tglMulaiIsi === 'object'){
			if($scope.tempEditAlatIsi.tglMulaiIsi.toString().indexOf('-') === -1){
				$scope.tempEditAlatIsi.tglMulaiIsi = $filter('date')($scope.tempEditAlatIsi.tglMulaiIsi,'yyyy-MM-dd')+'T'+jamMulaiIsi;
			}
		}else{
			var formatTglMulai = $scope.tempEditAlatIsi.tglMulaiIsi.split('-');
			var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
			$scope.tempEditAlatIsi.tglMulaiIsi = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulaiIsi;
		}

		if(typeof $scope.tempEditAlatIsi.tglSelesaiIsi === 'object'){
			if($scope.tempEditAlatIsi.tglSelesaiIsi.toString().indexOf('-') === -1){
				$scope.tempEditAlatIsi.tglSelesaiIsi = $filter('date')($scope.tempEditAlatIsi.tglSelesaiIsi,'yyyy-MM-dd')+'T'+jamSelesaiIsi;
			}
		}else{
			var formatTglSelesai = $scope.tempEditAlatIsi.tglSelesaiIsi.split('-');
			var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
			$scope.tempEditAlatIsi.tglSelesaiIsi = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesaiIsi;
		}

		$scope.tempEditAlatIsi.alatIsi = $scope.tempEditAlatIsi.alatIsiAir.value;
	  	$scope.tempEditAlatIsi.alatIsiText = $scope.tempEditAlatIsi.alatIsiAir.caption;
	  	$scope.tempEditAlatIsi.volume = $scope.tempEditAlatIsi.meteranAkhir - $scope.tempEditAlatIsi.meteranAwal;

		var edited = $scope.tempEditAlatIsi;

		if(id){
		  	RealisasiAirKapalDetailAlatIsiById.update({id:id}, $scope.tempEditAlatIsi,
		    	function(response){
		      		$scope.setNotification  = {
		        		type	: "success",
		        		message	: "Data berhasil tersimpan"
		      		};
		      	Notification.setNotification($scope.setNotification);
		      	Notification.setModalNotification($scope.setNotification);

		      	$scope.tabelAlatIsi[$scope.tempEditAlatIsi.idTemp] = $scope.tempEditAlatIsi;
		      	updateTabelAlatIsi($scope.rightSelection.id);
		    },function(response){
		      	$scope.setNotification  = {
		        	type	: "warning",
		        	message	: "Data tidak berhasil tersimpan"
		      	};
		      	Notification.setNotification($scope.setNotification);
		      	Notification.setModalNotification($scope.setNotification);
		      	// updateTabelAlatIsi($scope.rightSelection.id);
		    });
		}else{
			$scope.tabelAlatIsi[$scope.tempEditAlatIsi.idTemp] = $scope.tempEditAlatIsi;
		    updateTabelAlatIsi($scope.rightSelection.id);

			$scope.setNotification  = {
        		type	: "success",
        		message	: "Data berhasil tersimpan"
      		};
		    Notification.setNotification($scope.setNotification);
	      	Notification.setModalNotification($scope.setNotification);
	     //  	updateTabelTempAlatIsi($scope.rightSelection);
	     //  	var i = tempAlatIsi.idTemp;
    		// $scope.tabelAlatIsi[i] = tempAlatIsi;
			/*for(var i=0;i<$scope.tabelAlatIsi.length;i++){
		    	if($scope.tabelAlatIsi[i].id==id){
		      		var index = i;
		      		break;
		    	}
		  	}*/
		}
	};

var updateTabelKapalPenunjang = function(idReaAirKapal){
  	RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal.get({id:idReaAirKapal}, function(resp){
    	var kapalPenunjang = resp;
    	$scope.tabelKapalPenunjang = kapalPenunjang;
  	});
};

$scope.saveKapalPenunjangBaru = function(dataKapal){
  	//dataKapal.idReaAirKapal = $scope.rightSelection.id;
  	RealisasiAirKapalDetailKapalPenunjang.save(dataKapal,
    	function(response){
      		$scope.setNotification  = {
        		type	: "success",
        		message	: "Data berhasil tersimpan"
      		};
      	Notification.setNotification($scope.setNotification);
      	updateTabelKapalPenunjang($scope.rightSelection.id);
    	},function(response){
      		$scope.setNotification  = {
        		type	: "warning",
        		message	: "Data tidak berhasil tersimpan"
      		};
      		Notification.setNotification($scope.setNotification);
      		updateTabelKapalPenunjang($scope.rightSelection.id);
    	}
  	);
};

$scope.editKapalPenunjang = function(id){
  for(var i=0;i<$scope.tabelKapalPenunjang.length;i++){
    if($scope.tabelKapalPenunjang[i].id==id){
      var index = i;
      break;
    }
  }
  $scope.tempEditKapalPenunjang = {};
  var current = JSON.parse(JSON.stringify($scope.tabelKapalPenunjang[index]));
  $scope.tempEditKapalPenunjang.kapal = current.kapalText;
  $scope.tempEditKapalPenunjang.kodeKapal = current.kapal;
  $scope.tempEditKapalPenunjang.jamMulaiIsi = $filter('date')(current.tglMulaiIsi, 'HH:mm');
  $scope.tempEditKapalPenunjang.tglMulaiIsi = $filter('date')(current.tglMulaiIsi, 'dd-MM-yyyy');
  $scope.tempEditKapalPenunjang.jamSelesaiIsi = $filter('date')(current.tglSelesaiIsi, 'HH:mm');
  $scope.tempEditKapalPenunjang.tglSelesaiIsi = $filter('date')(current.tglSelesaiIsi, 'dd-MM-yyyy');

  $scope.tempEditKapalPenunjang.id = id;
};

$scope.saveEditKapalPenunjang = function(id){
 	var jamMulaiIsi = document.getElementById('jamMulaiEditKapalPenunjang').querySelector('input').value;
  	var jamSelesaiIsi = document.getElementById('jamSelesaiEditKapalPenunjang').querySelector('input').value;
  	$scope.tempEditKapalPenunjang.kapal = $scope.tempEditKapalPenunjang.kapal.mkplKode===undefined?$scope.tempEditKapalPenunjang.kodeKapal:$scope.tempEditKapalPenunjang.kapal.mkplKode;

		if(typeof $scope.tempEditKapalPenunjang.tglMulaiIsi === 'object'){
			if($scope.tempEditKapalPenunjang.tglMulaiIsi.toString().indexOf('-') === -1){
				$scope.tempEditKapalPenunjang.tglMulaiIsi = $filter('date')($scope.tempEditKapalPenunjang.tglMulaiIsi,'yyyy-MM-dd')+'T'+jamMulaiIsi;
			}
		}else{
			var formatTglMulai = $scope.tempEditKapalPenunjang.tglMulaiIsi.split('-');
			var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
			$scope.tempEditKapalPenunjang.tglMulaiIsi = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulaiIsi;
		}

		if(typeof $scope.tempEditKapalPenunjang.tglSelesaiIsi === 'object'){
			if($scope.tempEditKapalPenunjang.tglSelesaiIsi.toString().indexOf('-') === -1){
				$scope.tempEditKapalPenunjang.tglSelesaiIsi = $filter('date')($scope.tempEditKapalPenunjang.tglSelesaiIsi,'yyyy-MM-dd')+'T'+jamSelesaiIsi;
			}
		}else{
			var formatTglSelesai = $scope.tempEditKapalPenunjang.tglSelesaiIsi.split('-');
			var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
			$scope.tempEditKapalPenunjang.tglSelesaiIsi = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesaiIsi;
		}

  		RealisasiAirKapalDetailKapalPenunjangById.update({id:id}, $scope.tempEditKapalPenunjang,
    		function(response){
      			$scope.setNotification  = {
        			type	: "success",
       				 message	: "Data berhasil tersimpan"
      			};
      			Notification.setNotification($scope.setNotification);
      			updateTabelKapalPenunjang($scope.rightSelection.id);
    		},function(response){
      			$scope.setNotification  = {
        			type	: "warning",
        			message	: "Data tidak berhasil tersimpan"
     			 };
      			Notification.setNotification($scope.setNotification);
      			updateTabelKapalPenunjang($scope.rightSelection.id);
    	});
	};

	$scope.deleteKapalPenunjangView = function(i){
		var checkDeleteKapalPenunjang = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteKapalPenunjang) {
			$scope.tabelKapalPenunjang.splice(i, 1);
		}
	}

	$scope.deleteKapalPenunjang = function(id){
		var checkDeleteKapalPenunjang = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteKapalPenunjang) {
		  	RealisasiAirKapalDetailKapalPenunjangById.delete({id:id}, {},
		    	function(response){
		      		$scope.setNotification  = {
		        		type	: "success",
		        		message	: "Data berhasil dihapus"
		      		};
		      		Notification.setNotification($scope.setNotification);
		      		updateTabelKapalPenunjang($scope.rightSelection.id);
		    	}, function(response){
		      		$scope.setNotification  = {
		        		type	: "warning",
		        		message	: "Data tidak berhasil dihapus"
		      		};
		      		Notification.setNotification($scope.setNotification);
		      		updateTabelKapalPenunjang($scope.rightSelection.id);
		    });
		}
	};

	$scope.config = {
		selectItems: true,
		multiSelect: false,
		dblClick: false,
		selectionMatchProp: 'noPpkJasa',
		selectedItems: [],
		showSelectBox: false,
		onSelect: handleSelect,
	};

	$scope.configRight = {
		selectItems: true,
		multiSelect: false,
		dblClick: true,
		selectionMatchProp: 'noPpkJasa',
		selectedItems: [],
		showSelectBox: false,
		onSelect: handleSelectRight,
		onDblClick: handleDblClickRight,
	};


	//function reset air kapal
	$scope.resetAirKapal = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;
		//$scope.realisasiairkapal = '';
		$scope.realisasiairkapal.tglSelesaiIsi = new Date;
		$scope.tabelAlatIsi = [];
		$scope.tabelKapalPenunjang = [];
		getAirItems();
	};

	$scope.$watch('realisasiairkapal.tglMulaiIsi', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('realisasiairkapal.tglSelesaiIsi', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('realisasiairkapal.tglSetuju', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('tglMulaiNewAlatIsi', function(){
		setTimeout(function(){
			setDisableDateAlatIsi();
 		}, 500);
	});

	$scope.$watch('tglSelesaiNewAlatIsi', function(){
		setTimeout(function(){
			setDisableDateAlatIsi();
 		}, 500);
	});

	$scope.$watch('tempEditAlatIsi.tglMulaiIsi', function(){
		setTimeout(function(){
			setDisableDateAlatIsi();
 		}, 500);
	});

	$scope.$watch('tempEditAlatIsi.tglSelesaiIsi', function(){
		setTimeout(function(){
			setDisableDateAlatIsi();
 		}, 500);
	});

	$scope.$watch('tglMulaiNewKapalPenunjang', function(){
		setTimeout(function(){
			setDisableDateKapalPenunjang();
 		}, 500);
	});

	$scope.$watch('tglSelesaiNewKapalPenunjang', function(){
		setTimeout(function(){
			setDisableDateKapalPenunjang();
 		}, 500);
	});

	$scope.$watch('tempEditKapalPenunjang.jamMulaiIsi', function(){
		setTimeout(function(){
			setDisableDateKapalPenunjang();
 		}, 500);
	});

	$scope.$watch('tempEditKapalPenunjang.jamSelesaiIsi', function(){
		setTimeout(function(){
			setDisableDateKapalPenunjang();
 		}, 500);
	});

	var setDisableDate = function(){
		var tglMulaiIsiAirKapal = document.getElementById('tglMulaiIsiAirKapal').querySelector('input').value;
		$scope.realisasiairkapal.tglMulaiIsi = $filter('date')(tglMulaiIsiAirKapal,'dd-MM-yyyy');
	 	$('#tglSelesaiAirKapal').datepicker('setStartDate',$scope.realisasiairkapal.tglMulaiIsi);
		$('#tglMulaiIsiAirKapal').mask('99-99-9999');
		$('#tglSelesaiAirKapal').mask('99-99-9999');
		$('#tglSetujuAirKapal').mask('99-99-9999');
	}

	var setDisableDateAlatIsi = function(){
		//$('#tglMulaiNewAlatIsi').datepicker('setEndDate',$scope.tglSelesaiNewAlatIsi);
	 	// $('#tglSelesaiNewAlatIsi').datepicker('setStartDate',$scope.tglMulaiNewAlatIsi);
		$('#tglMulaiNewAlatIsi').mask('99-99-9999');
		$('#tglSelesaiNewAlatIsi').mask('99-99-9999');

		//$('#tglMulaiEditAlatIsi').datepicker('setEndDate',$scope.tempEditAlatIsi.tglMulaiIsi);
	 	$('#tglSelesaiEditAlatIsi').datepicker('setStartDate',$scope.tempEditAlatIsi.tglMulaiIsi);
		$('#tglMulaiEditAlatIsi').mask('99-99-9999');
		$('#tglSelesaiEditAlatIsi').mask('99-99-9999');
	}

	var setDisableDateKapalPenunjang = function(){
		//$('#tglMulaiNewKapalPenunjang').datepicker('setEndDate',$scope.tglSelesaiNewKapalPenunjang);
	 	$('#tglSelesaiNewKapalPenunjang').datepicker('setStartDate',$scope.tglMulaiNewKapalPenunjang);
		$('#tglMulaiNewKapalPenunjang').mask('99-99-9999');
		$('#tglSelesaiNewKapalPenunjang').mask('99-99-9999');

		//$('#tglMulaiEditKapalPenunjang').datepicker('setEndDate',$scope.tempEditAlatIsi.tglSelesaiIsi);
	 	$('#tglSelesaiEditKapalPenunjang').datepicker('setStartDate',$scope.tempEditAlatIsi.tglMulaiIsi);
		$('#tglMulaiEditKapalPenunjang').mask('99-99-9999');
		$('#tglSelesaiEditKapalPenunjang').mask('99-99-9999');
	}
}]);
