'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiRealisasiTambatCtrl
 * @description
 * # TransaksiRealisasiTambatCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiRealisasiTambatCtrl', ['$scope','$filter','$routeParams','$controller','$rootScope','AppParam','AppParamValue','Notification','PermohonanDetail','PenetapanDetail','RealisasiTambat','RealisasiTambatDetailbyPpkJasa','RealisasiTambatEdit','HistoryRevisiTambat','Validations','PermohonanTambatDetail','Databinding', 'MdmKapalByKode', 'DetailByPpk1', 'validationForm','EPBPerpanjanganByPpkJasa','RealisasiLabuhEdit','BindEskalasi','TipeEskalasi','UpdateStatusReaAfterEskalasi','PenetapanTambatEdit','PenetapanTambatByPpkJasa','$location','ParamsCabangSearch',function ($scope,$filter,$routeParams,$controller,$rootScope,AppParam,AppParamValue,Notification,PermohonanDetail,PenetapanDetail,RealisasiTambat,RealisasiTambatDetailbyPpkJasa, RealisasiTambatEdit, HistoryRevisiTambat,Validations,PermohonanTambatDetail,Databinding,MdmKapalByKode,DetailByPpk1,validationForm,EPBPerpanjanganByPpkJasa,RealisasiLabuhEdit,BindEskalasi,TipeEskalasi,UpdateStatusReaAfterEskalasi,PenetapanTambatEdit,PenetapanTambatByPpkJasa,$location,ParamsCabangSearch) {

	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
	//alert ('Cek tab jasa labuh controller');
	angular.extend(this, $controller('RealisasiPermohonanCtrl', {$scope: $scope})); 
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.tempSelection = null;
	$scope.rightSelection = {};
	$scope.itemSelected = [];
	$scope.avoidClick = false;
	$scope.rightReadOnly = true;
	$scope.realisasitambat = {};
	$scope.noPpkbjasa = true;
	$scope.kapalTundaGandeng = {};
	$scope.realisasitambat.statusTambat = '1';
	$scope.realisasitambat.posisiKapal = '1';
	$scope.disabledPosisiKapal = false;
	$scope.disabledReaLokasiTambat = true;
	$scope.infoHapusLastline = "Menghapus lastline tambat, mengakibatkan tgl keluar labuh juga terhapusinde";
	BindEskalasi.setDefaultEskalasi();
	var mainPpkJasa = '';	
	$scope.btnPerpanjangan = false;	
	$scope.epbdata = {};
	$scope.kodeKade = '-';	
	$scope.modalEditLokasiReaTambat = {};
	$scope.modalEditLokasiPtpTambat = {};
	var batasJamPjgDendaTambat = null;
	var toleSelesai2 = null;
	var textToleransi = '';

	ParamsCabangSearch.get({nama : 'BATAS_JAM_PJG_DENDA_TAMBAT'},function(response){
		batasJamPjgDendaTambat = response[0].value;
	});

	ParamsCabangSearch.get({nama : 'TOLE_TAMBAT_SELESAI_2'},function(response){
		toleSelesai2 = response[0].value;
	});

	var getTambatItems = function (item, e) {
		$scope.realisasitambat.flagRampdoor = 0;
		if($scope.tambatItems.length >0){
			$scope.items = JSON.parse(JSON.stringify($scope.tambatItems));

			/*$scope.modalEditLokasiReaTambat = $scope.tambatItems[0];
			$scope.modalEditLokasiReaTambat.namaLokasiByEskalasi = $scope.tambatItems[0].namaLokasi;*/
			

			$scope.modalEditLokasiPtpTambat = $scope.tambatItems[0];
			$scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi = $scope.tambatItems[0].namaLokasi;
			for (var i = 0; i < $scope.tambatItems.length; i++) {
				var itemPpkJasa = $scope.tambatItems[i].noPpkJasa;
				RealisasiTambatDetailbyPpkJasa.get({
					noPpkJasa: itemPpkJasa
				}, function(response) {
					var item = JSON.parse(JSON.stringify(response));
					if(response.id){
				 		$scope.itemSelected.push(item);

				 		//tes
				 		$scope.modalEditLokasiReaTambat = response;
						$scope.modalEditLokasiReaTambat.namaLokasiByEskalasi = response.namaLokasi;
						console.log($scope.modalEditLokasiReaTambat);
					}
				});
			}

			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			mainPpkJasa = $scope.tempSelection.noPpkJasa;	
			$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
			$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');;
			$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
			$scope.tempSelection.asalDermaga =  String($scope.tempSelection.asalDermaga);
			historyTambat($scope.tempSelection.noPpkJasa);
		}
	};

	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.validationLookupKapalTender = function(){
		if(valueField !== $scope.realisasitambat.kapalTender){
			if(typeof $scope.realisasitambat.kapalTender != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-014</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.realisasitambat.kapalTender = '';
			}
		}
	}

	$scope.$watch('dataUmum', function(newVal, oldVal){
		getTambatItems();
	});

	$scope.$watch('rightSelection.namaLokasi', function(){
		if(localStorage.kodeCabang==="31" || localStorage.kodeCabang==="21"){
			console.log("Skip Validasi Cabang...");
		}else{
	 		var lokasi = $scope.rightSelection.namaLokasi;
	 		var loaKapal = $scope.dataUmum.loa;
			if(typeof lokasi==='object'){
				$scope.maxKadeMeter = lokasi.mdmgPanjang-loaKapal;
				if(loaKapal > lokasi.mdmgPanjang){
					$scope.setNotification  = {
						type    : 'warning',
						message : 'Panjang Dermaga ('+lokasi.mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m). <br><br>Kode validasi : <b>VALREA-021</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.rightSelection.kadeAwal = 0;
				}
			}else{
				if(lokasi!==undefined){
					if(lokasi.length>3){
						var mdmgPanjang;
						$scope.getListOfDermagaTambat(lokasi).then(function(result) {
							if(result.length>0){
								mdmgPanjang = result[0].mdmgPanjang?result[0].mdmgPanjang:0;
							}else{
								mdmgPanjang = 0;
							}
							$scope.maxKadeMeter = mdmgPanjang-loaKapal;
							if(loaKapal > mdmgPanjang){
								$scope.setNotification  = {
									type    : 'warning',
									message : 'Panjang Dermaga ('+mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m). <br><br>Kode validasi : <b>VALREA-021</b>'
								};
								Notification.setNotification($scope.setNotification);
								$scope.rightSelection.kadeAwal = 0;
							}
						});
					}
				}
			}
		}
	});

	/*
 	$scope.loaValue = function(){
 		$scope.rightSelection.kadeAkhir = parseInt($scope.rightSelection.kadeAwal) + parseInt($scope.dataUmum.loa);
	 	if(isNaN($scope.rightSelection.kadeAkhir)){
	 		$scope.rightSelection.kadeAkhir = 0;
	 	}
	 	if($scope.rightSelection.kadeAwal == null){
 			$scope.rightSelection.kadeAwal = 0;
 		}
 	};
 	*/

 	$scope.loaValue = function(){
 		var kadeAwal = $('#realisasiTambatKadeAwal').val();
 		// if(kadeAwal > $scope.maxKadeMeter){
			// $scope.rightSelection.kadeAwal = 0;
			// $scope.rightSelection.kadeAkhir = 0;
 		// }else{
	 	$scope.rightSelection.kadeAkhir = eval(parseInt($scope.rightSelection.kadeAwal) + $scope.kodeKade +parseInt($scope.dataUmum.loa));
		if(isNaN($scope.rightSelection.kadeAkhir)){
			$scope.rightSelection.kadeAkhir = 0;
		}
		// }
 	};

	$scope.$watch('kodeKade',function(newValue,oldValue){
 		if(newValue != oldValue){
 			$scope.loaValue();
 		}
 	})
 	$scope.checkIfNull = function(){
 		if($scope.rightSelection.kadeAwal == null){
 			$scope.rightSelection.kadeAwal = 0;
 		}else if($scope.rightSelection.kadeAwal == ''){
 			$scope.rightSelection.kadeAwal = 0;
 		}
 	}; 

  	var historyTambat = function(ppkJasa){
		HistoryRevisiTambat.get({noPpkJasa:ppkJasa}, function(response){
			if(response.length > 0){
				//if(response[0].status != 1 && response[0].jenisRevisi == 6){
					$scope.tempSelection = response[0];
					$scope.tempSelection.noPpkJasa = mainPpkJasa;
			 		$scope.tempSelection.jamMulai = $filter('date')(response[0].tglMulai, 'HH:mm');
					$scope.tempSelection.jamSelesai = $filter('date')(response[0].tglSelesai, 'HH:mm');
			 		$scope.tempSelection.tglMulai = $filter('date')(response[0].tglMulai, 'dd-MM-yyyy');
					$scope.tempSelection.tglSelesai = $filter('date')(response[0].tglSelesai, 'dd-MM-yyyy')
					$scope.btnPerpanjangan = false;
				//}else{
				//	$scope.btnPerpanjangan = true;
				//}
				// EPBPerpanjanganByPpkJasa.get({ppkjasa : ppkJasa},function(response){
				// 	if(response.kodeBayar){
				// 		$scope.epbdata = response;
				// 	}
				// })
			}
		});
	};

 	var matchDataSelected = function(item){
 		var match = {};
 		var items = JSON.parse(JSON.stringify($scope.tambatItems));
		for(var i=0;i < items.length;i++){
			if(items[i].noPpkJasa==item.noPpkJasa){
				match = items[i];
			}
		}
		return match;
 	}

	var handleSelect = function (item, e) {
		mainPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
		PenetapanTambatByPpkJasa.get({ppkjasa : item.noPpkJasa }, function(response){
			if(response.status!=='404') var getData = response;

			// $scope.modalEditLokasiReaTambat = getData;
			// $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi = getData.namaLokasi;

	 		$scope.modalEditLokasiPtpTambat = getData;
			$scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi = getData.namaLokasi;
	 		$scope.tempSelection = getData;
	 		$scope.tempSelection.asalDermaga =  String($scope.tempSelection.asalDermaga);
	 		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
	 		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
			$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
			historyTambat($scope.tempSelection.noPpkJasa);
		});


		RealisasiTambatDetailbyPpkJasa.get({ppkjasa : item.noPpkJasa }, function(response){
			if(response.status!=='404') var getData = response;

			$scope.modalEditLokasiReaTambat = getData;
			$scope.modalEditLokasiReaTambat.namaLokasiByEskalasi = getData.namaLokasi;
	 
	 		$scope.tempSelection = getData;
	 		$scope.tempSelection.asalDermaga =  String($scope.tempSelection.asalDermaga);
	 		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
	 		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
			$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
			historyTambat($scope.tempSelection.noPpkJasa);
		});


		/*mainPpkJasa = item.noPpkJasa;
 		var getData = matchDataSelected(item);
 		$scope.modalEditLokasiPtpTambat = getData;
		$scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi = getData.namaLokasi;
 		$scope.tempSelection = getData;
 		$scope.tempSelection.asalDermaga =  String($scope.tempSelection.asalDermaga);
 		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
 		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
		historyTambat($scope.tempSelection.noPpkJasa);*/
	};

	$scope.getRealisasiTambatDetailbyPpkJasa = function(item){
		RealisasiTambatDetailbyPpkJasa.get({noPpkJasa: item.noPpkJasa}, function(response) {
			if(response.status!=='404'){
				/* validasi jika data sudah di verifikasi, maka data tidak bisa di edit*/
				if(Validations.checkStatusIsVerified(response)){
					$scope.rightReadOnly = true;
					return false;
				}else{
					// $scope.rightReadOnly = false;
					$scope.rightSelection = response;
					$scope.rightSelection.statusVerifikasi = response.status;
					$scope.rightSelection.jamMulai = $filter('date')(response.tglMulai, 'HH:mm');
					$scope.rightSelection.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
					$scope.rightSelection.tglMulai = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
					$scope.rightSelection.tglSelesai = $filter('date')(response.tglSelesai, 'dd-MM-yyyy');
					$scope.realisasitambat.statusTambat = response.statusTambat;
					$scope.realisasitambat.posisiKapal = response.posisiKapal;
					$scope.realisasitambat.flagRampdoor = response.flagRampdoor;
					$scope.realisasitambat.kapalTender = response.kodeKapalTenderText;
					$scope.realisasitambat.kodeKapalTender = response.kodeKapalTender;
					$scope.rightSelection.asalDermaga = String(response.asalDermaga);
					if(response.kadeAwal > response.kadeAkhir){
						$scope.kodeKade = '-';
					}else{
						$scope.kodeKade = '+';
					}
				}
			}else{
				var getDataPtp = matchDataSelected(item);
				HistoryRevisiTambat.get({noPpkJasa:getDataPtp.noPpkJasa}, function(response){
					if(response.length > 0){
						$scope.rightSelection = response[0];
						$scope.rightSelection.noPpkJasa = getDataPtp.noPpkJasa;
						$scope.rightSelection.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
						$scope.rightSelection.jamSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'HH:mm');
		 				$scope.rightSelection.tglMulai = $filter('date')($scope.rightSelection.tglMulai, 'dd-MM-yyyy');
						$scope.rightSelection.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'dd-MM-yyyy');
						$scope.rightSelection.asalDermaga ='2';
						$scope.realisasitambat.kapalTender ='';
					}else{
						$scope.rightSelection = getDataPtp;
						$scope.rightSelection.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
						$scope.rightSelection.jamSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'HH:mm');
		 				$scope.rightSelection.tglMulai = $filter('date')($scope.rightSelection.tglMulai, 'dd-MM-yyyy');
						$scope.rightSelection.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'dd-MM-yyyy');
						$scope.rightSelection.asalDermaga ='2';
						$scope.realisasitambat.kapalTender ='';
					}
				});				
			}
			PermohonanTambatDetail.get({noPpkJasa: response.noPpkJasa}, function(response){
				$scope.disabledPosisiKapal = response.flagTender?true:false;
			})
		});	
	}

	var handleSelectRight = function (item, e) {
		$scope.rightReadOnly = true;
		$scope.getRealisasiTambatDetailbyPpkJasa(item);		
	};

	var handleDblClickRight = function(item, e){
		$scope.rightReadOnly = false;
		$scope.getRealisasiTambatDetailbyPpkJasa(item);	
	}

	// untuk membandingkan scope yang akan di-push; identifier adalah properti dari item
	var isIncludeItem = function(array, item, identifier){
		var match = false;
		for(var i=0,len=array.length;i<len;i++){
			if(array[i][identifier]==item[identifier]){
				match = true;
			}
		}
		return match;
		
	};

	$scope.$on('editByListNoPPKJasa', function(event, item) {
		$('.btn-list-mobile').removeClass('fa-pencil-square').addClass('fa-pencil-square-o');
		$('#datarea-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
 		handleSelectRight(item);
 		handleDblClickRight(item);
	});

	$scope.validationLookupLokasiTambat = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasi){
			if(typeof $scope.rightSelection.namaLokasi != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasi = '';
			}
		}
	}

	$scope.validationLookupLokasiReaTambat = function(){
		if($scope.valueField !== $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi){
			if(typeof $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setModalNotification($scope.setNotification);
				$scope.modalEditLokasiReaTambat.namaLokasiByEskalasi = '';
			}
		}
	}


	$scope.validationLookupLokasiPtpTambat = function(){
		if($scope.valueField !== $scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi){
			if(typeof $scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setModalNotification($scope.setNotification);
				$scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi = '';
			}
		}
	}

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				var select = JSON.parse(JSON.stringify($scope.tempSelection));
				$scope.itemSelected.push(select);
				var idx = $scope.itemSelected.indexOf(select);
				PermohonanTambatDetail.get({noPpkJasa: $scope.itemSelected[idx].noPpkJasa}, function(response){
					$scope.itemSelected[idx].flagTender = response.flagTender;
					if(response.flagTender){
						$scope.realisasitambat.posisiKapal = '3';
						$scope.disabledPosisiKapal = true;
					}else{
						$scope.realisasitambat.posisiKapal = '1';
						$scope.disabledPosisiKapal = false;
					}
				})
				// realisasitambat.kapalTender
				$scope.itemSelected[idx].tglMulai = $filter('date')($scope.itemSelected[idx].tglMulai, 'dd-MM-yyyy');
				$scope.itemSelected[idx].tglSelesai = null;
				$scope.itemSelected[idx].jamSelesai = null;
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightSelection.asalDermaga = String($scope.itemSelected[idx].asalDermaga);
				$scope.realisasitambat.kapalTender = $scope.rightSelection.kodeKapalTenderText;
				$scope.realisasitambat.kodeKapalTender = $scope.rightSelection.kodeKapalTender;
				$scope.realisasitambat.kodeKapalTenderText = $scope.rightSelection.kodeKapalTenderText;
				$scope.rightReadOnly = false;
				$scope.kodeKade = '+';
			}
		}
	};

	$scope.optionKapalCharter = function(){
		$scope.rightSelection.kadeAwal = 0;
		$scope.rightSelection.kadeAkhir = 0;
	}

	var getConfirm = function (callback){

		$('#confirmbox').modal('show');
	    $('#confirmFalse').click(function(){
	        $('#confirmbox').modal('hide');
	        if (callback) callback(false);

	    });
	    $('#confirmTrue').click(function(){
	        $('#confirmbox').modal('hide');
	        if (callback) callback(true);
	    });
	}  

	$scope.kapalRampdoor = function(){
		if($scope.dataUmum.rampdoor == '1'){			
			getConfirm(function(result) {
			   if(result){$scope.saveTambat();}
			});		
		}
	}

	$scope.validationTglTambat = function(jasaTambat){
		var panduMasuk,panduKeluar,matchMasuk = true,matchKeluar = true;
		var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA019');
		var hasEsc = BindEskalasi.hasTempEskalasi('VALREA019');
		var statusEskalasi = itemEskalasi.id!==undefined?true:false;
		if(hasEsc){
			matchMasuk = true;
			matchKeluar = true;
		}else{
			panduMasuk = Databinding.getPanduMasuk();
			panduKeluar = Databinding.getPanduKeluar();
			if(panduMasuk !== undefined){
				var tglPanduMasuk = Date.parse($filter('date')(panduMasuk.tglMulai, 'yyyy-MM-dd'));
				var tglMulai = Date.parse($filter('date')(jasaTambat.tglMulai, 'yyyy-MM-dd'));
				if(tglMulai > tglPanduMasuk){
					var note =  {
						type 	: 'warning',
						message : 'Tanggal Mulai Tidak Bisa Lebih Besar Dari Tanggal Pandu Gerakan Masuk.<br><br>Kode validasi: <b>VALREA-019</b>',
						hasEsc	: statusEskalasi,
						dataEsc : itemEskalasi
					};
					Notification.setNotification(note);
					$("#tglMulaiTambat").focus();
					matchMasuk = false;
				}
			}
			if(panduKeluar !== undefined){
				var tglPanduKeluar = Date.parse($filter('date')(panduKeluar.tglMulai, 'yyyy-MM-dd'));
				var tglSelesai = Date.parse($filter('date')(jasaTambat.tglSelesai, 'yyyy-MM-dd'));
				if(tglSelesai > tglPanduKeluar){
					var note =  {
						type 	: 'warning',
						message : 'Tanggal Selesai Tidak Bisa Lebih Besar Dari Tanggal Pandu Gerakan Keluar.<br><br>Kode validasi: <b>VALREA-019</b>',
						hasEsc	: statusEskalasi,
						dataEsc : itemEskalasi
					};
					Notification.setNotification(note);
					$("#tglSelesaiTambat").focus();
					matchKeluar = false;
				}
			}
		}
					
		return {"matchMasuk":matchMasuk, "matchKeluar":matchKeluar};
	}

	$scope.saveTambat= function(){	console.log('4');
		if($scope.configRight.selectedItems.length>0){
			var jamMulai = document.getElementById('editTimeTambatJamMulai').querySelector('input').value;
			var jamSelesai = document.getElementById('editTimeTambatJamSelesai').querySelector('input').value;

			$scope.realisasitambat.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.realisasitambat.noPpkJasa = $scope.rightSelection.noPpkJasa;
			$scope.realisasitambat.flagRampdoor = ''+$scope.realisasitambat.flagRampdoor;

			// $scope.realisasitambat.namaLokasi = $scope.rightSelection.namaLokasi;
			if (typeof $scope.rightSelection.namaLokasi === 'object') {
				$scope.realisasitambat.namaLokasi = $scope.rightSelection.namaLokasi.mdmgNama;
				$scope.realisasitambat.kodeLokasi = $scope.rightSelection.namaLokasi.mdmgKode;
			}else{
				$scope.realisasitambat.namaLokasi = $scope.rightSelection.namaLokasi;
				$scope.realisasitambat.kodeLokasi = $scope.rightSelection.kodeLokasi;
			}

			if($scope.realisasitambat.posisiKapal ==='3'){
				if (typeof $scope.realisasitambat.kapalTender === 'object') {
					$scope.realisasitambat.kodeKapalTenderText = $scope.realisasitambat.kapalTender.mkplNama;
					$scope.realisasitambat.kodeKapalTender = $scope.realisasitambat.kapalTender.mkplKode;
				}else{
					$scope.realisasitambat.kodeKapalTenderText = $scope.realisasitambat.kodeKapalTenderText;
					$scope.realisasitambat.kodeKapalTender = $scope.realisasitambat.kodeKapalTender;
				}
			}else{
				$scope.realisasitambat.kodeKapalTenderText = '';
				$scope.realisasitambat.kodeKapalTender = '';
			}

			//$scope.realisasitambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'T'+jamMulai;
			//$scope.realisasitambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'yyyy-MM-dd')+'T'+jamSelesai;
			$scope.realisasitambat.kadeAwal = $scope.rightSelection.kadeAwal;
			$scope.realisasitambat.kadeAkhir = $scope.rightSelection.kadeAkhir;
			//$scope.realisasitambat.asalDermaga = parseInt($scope.rightSelection.asalDermaga);
			$scope.realisasitambat.asalDermaga = 1; //Asal Dermaga di Hardcode 1 karena belum ada kepastian dari pelindo

			if(typeof $scope.rightSelection.tglMulai === 'object'){
				if($scope.rightSelection.tglMulai.toString().indexOf('-') === -1){
					$scope.realisasitambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else{
				var formatTglMulai = $scope.rightSelection.tglMulai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.realisasitambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulai;
			}
			
			if($scope.rightSelection.tglSelesai != null){
				if(typeof $scope.rightSelection.tglSelesai === 'object'){
					if($scope.rightSelection.tglSelesai.toString().indexOf('-') === -1){
						$scope.realisasitambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+jamSelesai;
					}else{
						$scope.realisasitambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+jamSelesai;
					}
				}else{
					var formatTglSelesai = $scope.rightSelection.tglSelesai.split('-');
					var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
					$scope.realisasitambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesai;
				}				
			}
			var rightPpkJasa = $scope.rightSelection.noPpkJasa;

			for (var i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].noPpkJasa === rightPpkJasa) {
					var status = $scope.items[i].status;
				}
			}

			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;

			/*Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai*/
			var parseTglMulai = Date.parse($scope.realisasitambat.tglMulai);
			var parseTglSelesai = Date.parse($scope.realisasitambat.tglSelesai);
			if($scope.realisasitambat.tglSelesai && parseTglMulai>=parseTglSelesai){
				var note =  {
								type 	: "warning",
								message : "Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai.<br><br>Kode validasi : <b>VALREA-001</b>"
							};
				Notification.setNotification(note);
				return false;
			}

			/*
			var validationPanduTambat = $scope.validationTglTambat($scope.realisasitambat);
			if((!validationPanduTambat.matchMasuk && !validationPanduTambat.matchKeluar) || (validationPanduTambat.matchMasuk && !validationPanduTambat.matchKeluar) || (!validationPanduTambat.matchMasuk && validationPanduTambat.matchKeluar)){
				return false;
			}
			*/

			/*validasi Kade Meter*/
			/*
			var dataKadeMeter = {
				kadeAwal : $scope.realisasitambat.kadeAwal,
				maxKadeMeter : $scope.maxKadeMeter
			}
			var checkValidKadeMeter = Validations.maxKadeMeter(dataKadeMeter);
			if(!checkValidKadeMeter)return false;
			*/

			
			/*validasi form*/
			var R1 = validationForm.required('Lokasi Tambat', $scope.realisasitambat.namaLokasi);
			if(!R1){return R1;}	
			var R2 = validationForm.required('Tanggal Mulai Tambat', $scope.rightSelection.tglMulai);
			if(!R2){return R2;}	
			var R3 = validationForm.required('Jam Mulai Tambat', jamMulai);
			if(!R3){return R3;}	

			if ($scope.rightSelection.tglVerifikasi === undefined) {
				RealisasiTambat.save($scope.realisasitambat,
					function(response) {
						if (response.id) {
							var note = {
								type: "success", //ex : danger, warning, success, info
								message: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							BindEskalasi.setDefaultEskalasi();
							$scope.setDisabledTglKeluarLabuh();
							$scope.$watch('realisasitambat.tglSelesai', function (newValue, oldValue) {
								Databinding.setFirstValue(newValue);				
							});	
							$scope.setDefaultDisabledLokasiTambat();						
						} else {
							var note = {
								type: "error", //ex : danger, warning, success, info
								message: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response) {
						var note = {
							type: "error", //ex : danger, warning, success, info
							message: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			} else {
				
				if($rootScope.hapusLastline == true){
					var dataLabuhPpk = {
						'kodeLokasi':$scope.dataLabuhPpk.kodeLokasi,
						'namaLokasi':$scope.dataLabuhPpk.namaLokasi,
						'noPpk1':$scope.dataLabuhPpk.noPpk1,
						'noPpkJasa':$scope.dataLabuhPpk.noPpkJasa,
						'tglMasuk': $scope.dataLabuhPpk.tglMasuk,
						'tglKeluar' : ''
					}
					$scope.realisasitambat.tglSelesai = '';
				}
				//return false;
				RealisasiTambatEdit.update({noPpkJasa: $scope.rightSelection.noPpkJasa}, $scope.realisasitambat,
					function(response) {
						if (response.id) {
							var message = 'Data berhasil tersimpan.';
							if($rootScope.hapusLastline == true){
								RealisasiLabuhEdit.update({noPpkJasa:$scope.dataLabuhPpk.noPpkJasa},dataLabuhPpk,function(response){
									$rootScope.hapusLastline = false;
									if(response.status != '500'){
										message += 'Penghapusan Lastline juga menghapus Tanggal Keberangkat Labuh.<br><br>Kode validasi : <b>VALREA-023</b>';
									}
								});
							}							
							var note = {
								type: "success", //ex : danger, warning, success, info
								message: message
							};
							Notification.setNotification(note);
							if(response.status===2){
								UpdateStatusReaAfterEskalasi.update({noPpkJasa:response.noPpkJasa},{},function(response){
									console.log(response);
								});
							}
							BindEskalasi.setDefaultEskalasi();
							$scope.setDisabledTglKeluarLabuh();
							$scope.setDefaultDisabledLokasiTambat();
							$scope.resetTambat ();
						} else {
							var note = {
								type: "error", //ex : danger, warning, success, info
								message: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response) {
						console.log("kesini");
						var note = {
							type: "error", //ex : danger, warning, success, info
							message: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			}
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
		onDblClick:handleDblClickRight,
	};

		//function reset tambat
	$scope.resetTambat = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;	
		getTambatItems();
	};

	$scope.$watch('rightSelection.tglMulai', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	// $scope.$watch('rightSelection.tglSelesai', function(){		
	// 	setTimeout(function(){
	// 		setDisableDate();
 // 		}, 500);
	// });

	var setDisableDate = function(){
		if($scope.rightSelection){
		 	$('#tglSelesaiTambat').datepicker('setStartDate',$scope.rightSelection.tglMulai);
			$('#tglMulaiTambat').mask('99-99-9999');
			$('#tglSelesaiTambat').mask('99-99-9999');
		}
	};

	/*fungsi untuk eskalasi*/
	$scope.checkDisabledFromEscalation = function() {
		var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA004');
		var hasEsc = BindEskalasi.hasTempEskalasi('VALREA004');
		var statusEskalasi = itemEskalasi.id!==undefined?true:false;
		if(hasEsc){
			$scope.disabledReaLokasiTambat = false; 
		}else{
			var note =  {
				type 	: 'warning',
				message : 'Lokasi Tambat Harus sama dengan Lokasi Tambat saat Penetapan<br><br>Kode validasi: <b>VALREA-004</b>',
				hasEsc	: statusEskalasi,
				dataEsc : itemEskalasi
			};
			Notification.setNotification(note);
			$scope.disabledReaLokasiTambat = true;
		}
	};

	$scope.setDefaultDisabledLokasiTambat = function(){
		var hasEsc = BindEskalasi.hasTempEskalasi('VALREA004');
		$scope.disabledReaLokasiTambat = true; 
		if(hasEsc) $scope.disabledReaLokasiTambat = false; 
	}

	//$scope.$on('eventFromEskalasi', function (event, data) {
	  	/*var hasEsc = BindEskalasi.hasTempEskalasi(data.valCode);
		$scope.disabledReaLokasiTambat = true; 
		if(hasEsc) $scope.disabledReaLokasiTambat = false;*/
	//	$scope.setDefaultDisabledLokasiTambat();
	//});

	$scope.showModalValidationVALREA026 = function(){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA026'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALREA026'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			showNotif : "hide",
			dataItem : $scope.modalEditLokasiReaTambat
		};
		Notification.setNotification(note);
		// $('#modalEditLokasiPtpTambat').modal('show');
		$('#modalValidationVALREA026').modal('show');
	}

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if(dataEsc.valCode==='VALREA026'){ 
			$('#modalEditLokasiReaTambat').modal('show');
		}
	});

	$scope.updateLokasiReaTambat = function(){
		if (typeof $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi === 'object') {
			$scope.modalEditLokasiReaTambat.kodeLokasi = $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi.mdmgKode;
			$scope.modalEditLokasiReaTambat.namaLokasi = $scope.modalEditLokasiReaTambat.namaLokasiByEskalasi.mdmgNama;
		}else{
			$scope.modalEditLokasiReaTambat.kodeLokasi = $scope.modalEditLokasiReaTambat.kodeLokasi;
			$scope.modalEditLokasiReaTambat.namaLokasi = $scope.modalEditLokasiReaTambat.namaLokasi;
		}

		if(typeof $scope.modalEditLokasiReaTambat.tglMulai === 'object'){
			if($scope.modalEditLokasiReaTambat.tglMulai.toString().indexOf('-') === -1){

				$scope.modalEditLokasiReaTambat.tglMulai = $filter('date')($scope.modalEditLokasiReaTambat.tglMulai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiReaTambat.jamMulai;
			}
		}else{
			if($scope.modalEditLokasiReaTambat.tglMulai.toString().indexOf('T') === -1){
				var formatTglMulai = $scope.modalEditLokasiReaTambat.tglMulai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.modalEditLokasiReaTambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.modalEditLokasiReaTambat.jamMulai;
			}
		}
		
		if($scope.modalEditLokasiReaTambat.tglSelesai != null){
			if(typeof $scope.modalEditLokasiReaTambat.tglSelesai === 'object'){
				if($scope.modalEditLokasiReaTambat.tglSelesai.toString().indexOf('-') === -1){
					$scope.modalEditLokasiReaTambat.tglSelesai = $filter('date')($scope.modalEditLokasiReaTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiReaTambat.jamSelesai;
				}else{
					$scope.modalEditLokasiReaTambat.tglSelesai = $filter('date')($scope.modalEditLokasiReaTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiReaTambat.jamSelesai;
				}
			}else{
				if($scope.modalEditLokasiReaTambat.tglSelesai.toString().indexOf('T') === -1){
					var formatTglSelesai = $scope.modalEditLokasiReaTambat.tglSelesai.split('-');
					var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
					$scope.modalEditLokasiReaTambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.modalEditLokasiReaTambat.jamSelesai;
				}
			}				
		}

		//console.log($scope.modalEditLokasiReaTambat);
		RealisasiTambat.save($scope.modalEditLokasiReaTambat, function(response){
			if(response.id){
				var note  = {
					type	: "success",
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification(note);
				$('#modalEditLokasiReaTambat').modal('hide');
				$scope.getRealisasiTambatDetailbyPpkJasa(response);
			} else{
				var note  = {
					type	: "error",
					message	: "Data gagal disimpan"
				};
				Notification.setModalNotification(note);
			}
		});

		$("#modalEditLokasiReaTambat").modal('hide');
		//$location.path('/transaksi/realisasi/'+$scope.modalEditLokasiReaTambat.noPpk1);
		$location.path('/transaksi/realisasi/'+$routeParams.ppk1+"/"+$routeParams.urutan);
		//location.updateLokasiReaTambat(); 
		
	}


	$scope.showModalValidationVALREA025 = function(){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA025'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALREA025'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			showNotif : "hide",
			dataItem : $scope.modalEditLokasiPtpTambat
		};
		Notification.setNotification(note);
		// $('#modalEditLokasiPtpTambat').modal('show');
		$('#modalValidationVALREA025').modal('show');
	}

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if(dataEsc.valCode==='VALREA025'){ 
			$('#modalEditLokasiPtpTambat').modal('show');
		}
	});

	//submit Edit Lokasi Tambat
	$scope.updateLokasiPtpTambat = function(){
		if (typeof $scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi === 'object') {
			$scope.modalEditLokasiPtpTambat.kodeLokasi = $scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi.mdmgKode;
			$scope.modalEditLokasiPtpTambat.namaLokasi = $scope.modalEditLokasiPtpTambat.namaLokasiByEskalasi.mdmgNama;
		}else{
			$scope.modalEditLokasiPtpTambat.kodeLokasi = $scope.modalEditLokasiPtpTambat.kodeLokasi;
			$scope.modalEditLokasiPtpTambat.namaLokasi = $scope.modalEditLokasiPtpTambat.namaLokasi;
		}

		if(typeof $scope.modalEditLokasiPtpTambat.tglMulai === 'object'){
			if($scope.modalEditLokasiPtpTambat.tglMulai.toString().indexOf('-') === -1){

				$scope.modalEditLokasiPtpTambat.tglMulai = $filter('date')($scope.modalEditLokasiPtpTambat.tglMulai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiPtpTambat.jamMulai;
			}
		}else{
			if($scope.modalEditLokasiPtpTambat.tglMulai.toString().indexOf('T') === -1){
				var formatTglMulai = $scope.modalEditLokasiPtpTambat.tglMulai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.modalEditLokasiPtpTambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.modalEditLokasiPtpTambat.jamMulai;
			}
		}
		
		if($scope.modalEditLokasiPtpTambat.tglSelesai != null){
			if(typeof $scope.modalEditLokasiPtpTambat.tglSelesai === 'object'){
				if($scope.modalEditLokasiPtpTambat.tglSelesai.toString().indexOf('-') === -1){
					$scope.modalEditLokasiPtpTambat.tglSelesai = $filter('date')($scope.modalEditLokasiPtpTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiPtpTambat.jamSelesai;
				}else{
					$scope.modalEditLokasiPtpTambat.tglSelesai = $filter('date')($scope.modalEditLokasiPtpTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.modalEditLokasiPtpTambat.jamSelesai;
				}
			}else{
				if($scope.modalEditLokasiPtpTambat.tglSelesai.toString().indexOf('T') === -1){
					var formatTglSelesai = $scope.modalEditLokasiPtpTambat.tglSelesai.split('-');
					var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
					$scope.modalEditLokasiPtpTambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.modalEditLokasiPtpTambat.jamSelesai;
				}
			}				
		}


		PenetapanTambatEdit.update({id:$scope.modalEditLokasiPtpTambat.noPpkJasa},$scope.modalEditLokasiPtpTambat, function(response){
				if(response.id){
					var note  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification(note);
					$('#modalEditLokasiPtpTambat').modal('hide');
					handleSelect(response);
					// $scope.resetTambat();
				} else{
					var note  = {
						type	: "error",
						message	: "Data gagal disimpan"
					};
					Notification.setModalNotification(note);
				}
			}, function(response){
				var note  = {
					type	: "error",
					message	: "Data gagal disimpan"
				};
				Notification.setModalNotification(note);
			}
		);		
	}

	$scope.hapusLastline = function(val){
		var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA023');
		var hasEsc = BindEskalasi.hasTempEskalasi('VALREA023');
		var statusEskalasi = itemEskalasi.id!==undefined?true:false;
		if(hasEsc){
			$scope.rightSelection.tglSelesai = '';
			$scope.rightSelection.jamSelesai = '';
			$rootScope.hapusLastline = val;
		}else{
			var note =  {
				type 	: 'warning',
				message : 'Lastline Tambat jika sudah terisi tidak dapat dihapus<br><br>Kode validasi : <b>VALREA-023</b>',
				hasEsc	: statusEskalasi,
				dataItem : $scope.rightSelection,
				dataEsc : itemEskalasi
			};
			Notification.setNotification(note);
		}

		/*var checkDeleteLastline = confirm('Menghapus Lastline Tambat akan menghapus Tanggal Keberangkatan Labuh juga (VALREA-023), Apakah Anda yakin akan menghapus data ini ?');
		if(checkDeleteLastline){
			$scope.rightSelection.tglSelesai = '';
			$scope.rightSelection.jamSelesai = '';
			$rootScope.hapusLastline = val;
		}*/			
	}

	$scope.mergeWaktuSelesai = function(){
		if($scope.rightSelection.tglSelesai != null && $scope.rightSelection.jamSelesai != null){
			var formatTglSelesai = $scope.tempSelection.tglSelesai.split('-');
			var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
			var ptpTime = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.tempSelection.jamSelesai;

			var a = Date.parse(ptpTime); 
			var x = a - (batasJamPjgDendaTambat*3600000);
			if($scope.rightSelection.tglSelesai != null){
				if(typeof $scope.rightSelection.tglSelesai === 'object'){
					if($scope.rightSelection.tglSelesai.toString().indexOf('-') === -1){
						$scope.realisasitambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
					}else{
						$scope.realisasitambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
					}
				}else{
					var formatTglSelesai = $scope.rightSelection.tglSelesai.split('-');
					var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
					$scope.realisasitambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
				}				
			}
			var reaTime = $scope.realisasitambat.tglSelesai;
			var b = Date.parse(reaTime);
			var y = a - (toleSelesai2*3600000);
			console.log(b);
			console.log(x);
			textToleransi = '<p><b>Batas Akhir Pengajuan Perpendekan/Perpanjangan</b></p><p>Untuk menghindari denda silakan mengajukan perpendekan/perpanjangan <br> sebelum <b>'+ $filter('date')(new Date(x),'dd-MM-yyyy HH:mm')+'</b></p>';
			
			if(b > a){
				textToleransi += '<br><p><b>Toleransi Waktu Realisasi Tambat</b></p><p>Toleransi Realisasi tidak terkena denda adalah sebelum  <b>'+ $filter('date')(new Date(y),'dd-MM-yyyy HH:mm') +'</b>.<br>Transaksi ini akan dikenakan denda karena lastline yang diisikan melebihi waktu toleransi.</p>';
			}
			$('#textToleransi').html(textToleransi);
			$('#infoDendaBox').modal('show');
		}
	};

	$scope.agreeToleransi = function() { console.log('10');
		$scope.saveTambat();
	}

	/*var oldTglSelesai;
	var newTglSelesai;
	$scope.$watch('rightSelection.tglSelesai',function(newValue,oldValue){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
		oldTglSelesai = oldValue;
		newTglSelesai = newValue;
 		if(oldValue != undefined){
 			if(newValue != oldValue){
	 			mergeWaktuSelesai();
	 		}
 		} 		
	});	


	$scope.$watch('rightSelection.jamSelesai',function(newValue,oldValue){
		console.log(newValue,oldValue);	
		console.log(oldTglSelesai);	
		console.log(newTglSelesai);		
		if(oldValue != undefined || oldValue == null){ console.log('1');
			if(newValue != oldValue){ console.log('2');
 				mergeWaktuSelesai();
 			}
		}
	});*/

}]);
