'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapantambatCtrl
 * @description
 * # TransaksiPenetapantambatCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiPenetapantambatCtrl', ['$scope','$filter','$routeParams','$controller','$route','AppParam','PermohonanDetailByPpk','PenetapanTambat','PenetapanTambatByPpkJasa','PenetapanTambatEdit', 'Notification', 'Validations','validationForm', 'HasilMeetingList', 'HasilMeetingRevisi' ,function ($scope,$filter,$routeParams,$controller,$route,AppParam,PermohonanDetailByPpk,PenetapanTambat,PenetapanTambatByPpkJasa,PenetapanTambatEdit, Notification, Validations, validationForm, HasilMeetingList, HasilMeetingRevisi) {
    /*
 	** tab tambat
 	*/
 	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
 	angular.extend(this, $controller('TransaksiPenetapannewCtrl', {$scope: $scope}));

 	$scope.tempSelection = null;
 	$scope.rightSelection = {};
 	$scope.itemSelected = [];
 	$scope.avoidClick = false;
 	$scope.rightReadOnly = true;
 	$scope.penetapantambat = {};
 	$scope.rightSelection.kadeAwal = 0;
 	$scope.rightSelection.kadeAkhir = 0;
 	$scope.kodeKade = '-';
 	
	var valueField = '';
	$scope.checkValue = function(value) {
		valueField = value;
	}

 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.tambatItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.tambatItems));
 			for(var i=0;i<$scope.tambatItems.length;i++){
 				if($scope.tambatItems[i].status === 2){
 					var itemPpkJasa = $scope.tambatItems[i].noPpkJasa;
 					PenetapanTambatByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
						 $scope.itemSelected.push(item);
 					});
 				}
 			}
 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			
			$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
			$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
			$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
			$scope.tglSetuju = new Date();
			$scope.tempSelection.flagTender = $scope.tempSelection.flagTender?$scope.tempSelection.flagTender:0;
			$scope.penetapantambat.jamSetuju = moment().format('HH:mm');
 		}
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
						message : 'Panjang Dermaga ('+lokasi.mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m).<br><br>Kode validasi : <b>VALPTP-004</b>'
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
									message : 'Panjang Dermaga ('+mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m).<br><br>Kode validasi : <b>VALPTP-004</b>'
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

	$scope.$watch('rightSelection.tglMulai', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('rightSelection.tglSelesai', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	var setDisableDate = function(){
		if($scope.rightSelection !==undefined){
	 		$('#penetapanTambatTglSelesai').datepicker('setStartDate',$scope.rightSelection.tglMulai);	
		}
		$('#penetapanTambatTglMulai').mask('99-99-9999');
		$('#penetapanTambatTglSelesai').mask('99-99-9999');
		$('#tglSetujuTambat').mask('99-99-9999');
	}

	$scope.validationLookupLokasiTambat = function(){
		if(valueField !== $scope.rightSelection.namaLokasi){
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
	 
 	$scope.loaValue = function(){
 		var kadeAwal = $('#penetapanTambatKadeAwal').val();
 		// console.log("Maksimal Kade Meter : "+$scope.maxKadeMeter);
 		// if(kadeAwal > $scope.maxKadeMeter){
			// $scope.rightSelection.kadeAwal = 0;
			// $scope.rightSelection.kadeAkhir = 0;
 		// }else{
	 		$scope.rightSelection.kadeAkhir = eval(parseInt($scope.rightSelection.kadeAwal) + $scope.kodeKade+ parseInt($scope.dataUmum.loa));
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
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
 		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
 		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
		$scope.tempSelection.flagTender = $scope.tempSelection.flagTender?$scope.tempSelection.flagTender:0;
	};

	var handleSelectRight = function (item, e) {
		PenetapanTambatByPpkJasa.get({ppkjasa : item.noPpkJasa }, function(response){
			if(response.status!=='404'){
				$scope.rightSelection = response;
				$scope.rightSelection.jamMulai = $filter('date')(response.tglMulai, 'HH:mm');
				$scope.rightSelection.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
		 		$scope.rightSelection.tglMulai = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
				$scope.rightSelection.tglSelesai = $filter('date')(response.tglSelesai, 'dd-MM-yyyy');
				$scope.penetapantambat.jamSetuju = $filter	('date')(response.tglSetuju, 'HH:mm');
				$scope.tglSetuju = $filter('date')(response.tglSetuju, 'dd-MM-yyyy');
				if(response.kadeAwal > response.kadeAkhir){
					$scope.kodeKade = '-';
				}else{
					$scope.kodeKade = '+';
				}
			}else{
				var getDataPmh = matchDataSelected(item);
				$scope.rightSelection = getDataPmh;
				$scope.rightSelection.jamMulai = $filter('date')(getDataPmh.tglMulai, 'HH:mm');
				$scope.rightSelection.jamSelesai = $filter('date')(getDataPmh.tglSelesai, 'HH:mm');
				$scope.rightSelection.tglMulai = $filter('date')(getDataPmh.tglMulai, 'dd-MM-yyyy');
				$scope.rightSelection.tglSelesai = $filter('date')(getDataPmh.tglSelesai, 'dd-MM-yyyy');
				$scope.penetapantambat.jamSetuju = $filter('date')(new Date(), 'HH:mm');
				$scope.tglSetuju = new Date();
			}
		});
	};

	var handleDblClickRight = function(item, e){
		var getDataPmh = matchDataSelected(item);
		$scope.rightReadOnlyKadeMeter = getDataPmh.flagTender?true:false;
		$scope.rightReadOnly = false;
	}
	
	$scope.$on('editByListNoPPKJasa', function(event, item) {
		$('.btn-list-mobile').removeClass('fa-pencil-square').addClass('fa-pencil-square-o');
		$('#dataptp-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
 		handleSelectRight(item);
 		handleDblClickRight(item);
	});

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

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				$scope.configRight.selectedItems = [];
				var select = JSON.parse(JSON.stringify($scope.tempSelection));				
				$scope.itemSelected.push(select);				
				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].tglMulai = $filter('date')($scope.itemSelected[idx].tglMulai, 'dd-MM-yyyy');
				$scope.itemSelected[idx].tglSelesai = $filter('date')($scope.itemSelected[idx].tglSelesai, 'dd-MM-yyyy');
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightSelection.kadeAkhir = $scope.dataUmum.loa;
				$scope.rightReadOnlyKadeMeter = $scope.rightSelection.flagTender?true:false; /*
				kondisi jika permohonan adalah kapal tender*/
				$scope.rightReadOnly = false;
				$scope.kodeKade = '+';
			}	
		}
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
		$scope.kodeKade = '';	
		//$scope.realisasitambat = '';

		if($scope.tambatItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.tambatItems));

 			for(var i=0;i<$scope.tambatItems.length;i++){
 				if($scope.tambatItems[i].status === 2){
 					var itemPpkJasa = $scope.tambatItems[i].noPpkJasa;
 					PenetapanTambatByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			
			$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
			$scope.tempSelection.tglMulai = new Date($scope.tempSelection.tglMulai);
			$scope.tempSelection.tglSelesai = new Date($scope.tempSelection.tglSelesai);
			$scope.tglSetuju = new Date();
			$scope.penetapantambat.jamSetuju = moment().format('HH:mm');
 		}
	};


	$scope.saveTambat = function(){
		if($scope.configRight.selectedItems.length>0){
			// var jamMulai = document.getElementById('jamMulaiTambatEdit').querySelector('input').value;
			// var jamSelesai = document.getElementById('jamSelesaiTambatEdit').querySelector('input').value;
			// var jamSetuju = document.getElementById('jamSetujuTambat').querySelector('input').value;
			$scope.penetapantambat.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.penetapantambat.noPpkJasa = $scope.tempSelection.noPpkJasa;
			//$scope.penetapantambat.tglSetuju = $filter('date')($scope.tglSetuju, 'yyyy-MM-dd')+'T'+jamSetuju;
			//$scope.penetapantambat.namaLokasi = $scope.rightSelection.namaLokasi;
			if (typeof $scope.rightSelection.namaLokasi === 'object') {
				$scope.penetapantambat.kodeLokasi = $scope.rightSelection.namaLokasi.mdmgKode;
				$scope.penetapantambat.namaLokasi = $scope.rightSelection.namaLokasi.mdmgNama;
			}else{
				$scope.penetapantambat.kodeLokasi = $scope.rightSelection.kodeLokasi;
				$scope.penetapantambat.namaLokasi = $scope.rightSelection.namaLokasi;
			}
			
			if(typeof $scope.rightSelection.tglMulai === 'object'){
				if($scope.rightSelection.tglMulai.toString().indexOf('-') === -1){
					$scope.penetapantambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMulai;
				}else{
					$scope.penetapantambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMulai;
				}
			}else{
				var formatTglMulai = $scope.rightSelection.tglMulai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMulai;
			}

			if(typeof $scope.rightSelection.tglSelesai === 'object'){
				if($scope.rightSelection.tglSelesai.toString().indexOf('-') === -1){
					$scope.penetapantambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
				}else{
					$scope.penetapantambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
				}
			}else{
				var formatTglSelesai = $scope.rightSelection.tglSelesai.split('-');
				var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
				$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamSelesai;
			}

			if(typeof $scope.tglSetuju === 'object'){
				if($scope.tglSetuju.toString().indexOf('-') === -1){
					$scope.penetapantambat.tglSetuju = $filter('date')($scope.tglSetuju,'yyyy-MM-dd')+'T'+$scope.penetapantambat.jamSetuju;
				}
			}else{
				var formatTglSetuju = $scope.tglSetuju.split('-');
				var newFormatTglSetuju = formatTglSetuju[1]+'-'+formatTglSetuju[0]+'-'+formatTglSetuju[2];
				$scope.penetapantambat.tglSetuju = $filter('date')(new Date(newFormatTglSetuju),'yyyy-MM-dd')+'T'+$scope.penetapantambat.jamSetuju;
			}

			if($scope.rightSelection.kadeAwal === ''){
				$scope.rightSelection.kadeAwal = 0;
			}
			if($scope.rightSelection.kadeAkhir === NaN){
				$scope.rightSelection.kadeAkhir = 0;
			}

			$scope.penetapantambat.kadeAwal = $scope.rightSelection.kadeAwal;
			$scope.penetapantambat.kadeAkhir = $scope.rightSelection.kadeAkhir;
			$scope.penetapantambat.status = $scope.rightSelection.status;
			//$scope.penetapantambat.asalDermaga = parseInt($scope.rightSelection.asalDermaga);
			$scope.penetapantambat.asalDermaga = 1; //Asal Dermaga di Hardcode 1 karena belum ada kepastian

			//$scope.penetapantambat.noForm = $scope.rightSelection.noForm;

			var rightPpkJasa = $scope.rightSelection.noPpkJasa;
			for(var i=0;i<$scope.items.length;i++){
				if($scope.items[i].noPpkJasa === rightPpkJasa){
					var status = $scope.items[i].status;
				}
			}


			var parseTglMulai = Date.parse($scope.penetapantambat.tglMulai);
			var parseTglSelesai = Date.parse($scope.penetapantambat.tglSelesai);
			if($scope.penetapantambat.tglSelesai && ((parseTglMulai > parseTglSelesai) || (parseTglMulai == parseTglSelesai))){
				var note =  {
								type 	: "warning",
								message : "Tgl & Jam Mulai tidak boleh melebihi Tgl & Jam Selesai.<br><br>Kode validasi : <b>VALPTP-001</b>"
							};
				Notification.setNotification(note);
				return false;
			}
			console.log($scope.penetapantambat);

			/*validasi Kade Meter*/
			/*
			var dataKadeMeter = {
				kadeAwal : $scope.penetapantambat.kadeAwal,
				maxKadeMeter : $scope.maxKadeMeter
			}
			var checkValidKadeMeter = Validations.maxKadeMeter(dataKadeMeter);
			if(!checkValidKadeMeter)return false;
			*/

			/*validasi Form*/
			var R1 = validationForm.required('Lokasi Tambat',$scope.penetapantambat.namaLokasi);
			if(!R1){return R1;}			
			var R2 = validationForm.required('Tanggal Mulai Tambat',$scope.rightSelection.tglMulai);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Selesai Tambat',$scope.rightSelection.tglSelesai);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Mulai Tambat',$scope.rightSelection.jamMulai);
			if(!R4){return R4;}
			var R5 = validationForm.required('Jam Selesai Tambat',$scope.rightSelection.jamSelesai);
			if(!R5){return R5;}

			if($scope.rightSelection.parentPtpJasaId === undefined){
				PenetapanTambat.save($scope.penetapantambat,
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
						}
						else{
							var note  = {
								type	: "error",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "error",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			}
			else {
				// $scope.penetapantambat.status = $scope.rightSelection.status;
				PenetapanTambatEdit.update({id:$scope.rightSelection.noPpkJasa},$scope.penetapantambat, 
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							// $scope.setAfterSubmit(response);
							//cek hasil meeting 
							HasilMeetingList.get({noPpkJasa : $scope.rightSelection.noPpkJasa},function(response){
								if(response.content){
									if(typeof $scope.rightSelection.tglMulai === 'object'){
										if($scope.rightSelection.tglMulai.toString().indexOf('-') === -1){
											$scope.penetapantambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'_'+$scope.rightSelection.jamMulai;
										}else{
											$scope.penetapantambat.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'yyyy-MM-dd')+'_'+$scope.rightSelection.jamMulai;
										}
									}else{
										var formatTglMulai = $scope.rightSelection.tglMulai.split('-');
										var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
										$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'_'+$scope.rightSelection.jamMulai;
									}

									if(typeof $scope.rightSelection.tglSelesai === 'object'){
										if($scope.rightSelection.tglSelesai.toString().indexOf('-') === -1){
											$scope.penetapantambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'_'+$scope.rightSelection.jamSelesai;
										}else{
											$scope.penetapantambat.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'yyyy-MM-dd')+'_'+$scope.rightSelection.jamSelesai;
										}
									}else{
										var formatTglSelesai = $scope.rightSelection.tglSelesai.split('-');
										var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
										$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'_'+$scope.rightSelection.jamSelesai;
									}

									var dataRevisiMeeting = {}
											HasilMeetingRevisi.update({
												kodeDermaga : $scope.penetapantambat.kodeLokasi,
												panjangKapal : $scope.dataUmum.loa,
												noPpk1 : $scope.penetapantambat.noPpk1 ,
												noPpkJasa : $scope.penetapantambat.noPpkJasa,
												tglMulai : $scope.penetapantambat.tglMulai,
												tglSelesai : $scope.penetapantambat.tglSelesai												
											},{}, function(response){
												console.log('No.PPK1 '+$scope.penetapantambat.noPpk1+' dengan No.PPK Jasa '+$scope.penetapantambat.noPpkJasa+' memperbaharui hasil meeting tambatan.')
												console.log(response);
											});
										}
									});
						}else{
							var note  = {
								type	: "error",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "error",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			}

			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;
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
  }]);
