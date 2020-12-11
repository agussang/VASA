'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiRealisasiLabuhCtrl
 * @description
 * # TransaksiRealisasiLabuhCtrl
 * Controller of the vasaApp
 */

 angular.module('vasaApp')
 .controller('TransaksiRealisasiLabuhCtrl', ['$scope', '$filter','$routeParams','$controller','$timeout','Notification', 'AppParam','AppParamValue', 'RealisasiLabuhEdit', 'PermohonanDetail', 'RealisasiLabuh', 'RealisasiLabuhDetailbyPpkJasa','Validations','DetailByPpk1','MonitoringDetail','Databinding','$rootScope','validationForm','TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi',
 	function($scope, $filter, $routeParams, $controller,$timeout,Notification,AppParam,AppParamValue, RealisasiLabuhEdit, PermohonanDetail,RealisasiLabuh,RealisasiLabuhDetailbyPpkJasa,Validations,DetailByPpk1,MonitoringDetail,Databinding,$rootScope,validationForm,TipeEskalasiList,BindEskalasi,TipeEskalasi) {
			/*
			 ** tab labuh
			 */
			// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
			//alert ('Cek tab jasa labuh controller');
			angular.extend(this, $controller('RealisasiPermohonanCtrl', {
				$scope: $scope
			}));

			$scope.options = {
				autoclose: true,
				todayBtn: 'linked',
				todayHighlight: true
			};
			$scope.tooltipInfoTglKeluar = "Input Waktu Keberangkatan akan terbuka, jika <b>Last Line Jasa Tambat</b> telah diisi untuk Pelabuhan tidak Wajib Pandu, <br><br>Atau sudah <b>Realisasi Jasa Pandu Keluar</b> untuk Pelabuhan Wajib Pandu dan Siklus Pandu tidak Normal. <br><br>Kode validasi : <b>VALREA-003</b>";

			//$scope.noppkbJasa=true;
			$scope.tempSelection = null;
			$scope.rightSelection = {};
			$scope.itemSelected = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;
			$scope.realisasilabuh = {};
			$scope.isValidationRealisasi = true;
			BindEskalasi.setDefaultEskalasi();

			/*ng-readonly noppkb Jasa */
			$scope.noPpkbjasa = true;
			$scope.tglMasukOptions = {};
			$scope.tglKeluarOptions = {};			
			
			$scope.$watch('dataUmum', function() {
				getLabuhItems();
			});	

			$scope.getTipeEskalasi = function(){
	            TipeEskalasiList.get({size : 999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
	                TipeEskalasi.setTipeEskalasi(response.content);
	            });
	        };

	        $scope.getTipeEskalasi();

	        $scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
	            if(dataEsc.valCode==='VALREA003'){
	                var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
	                if(hasEsc) $scope.disabledTglKeluarLabuh = false;
	            }
	        });

	        $scope.showModalVALREA003 = function(item){
	            var
	                itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA003'),
	                hasEsc = BindEskalasi.hasTempEskalasi('VALREA003'),
	                statusEskalasi = itemEskalasi.id!==undefined?true:false;

	            var note =  {
	                hasEsc  : statusEskalasi,
	                dataEsc : itemEskalasi,
	                dataItem : item,
	                showNotif : "hide"
	            };

	            $rootScope.statusEskalasiModal = statusEskalasi;
	            $scope.infoVALREA003 = itemEskalasi.valDesc;
	            Notification.setNotification(note);
	            $('#modalVALREA003').modal('show');
	        }
			
			var getLabuhItems = function(){	
				if ($scope.labuhItems.length > 0) {
					$scope.items = JSON.parse(JSON.stringify($scope.labuhItems));
					for (var i = 0; i < $scope.labuhItems.length; i++) {
						var itemPpkJasa = $scope.labuhItems[i].noPpkJasa;
						RealisasiLabuhDetailbyPpkJasa.get({
							noPpkJasa: itemPpkJasa
						}, function(response) {
							var item = JSON.parse(JSON.stringify(response));
							if(response.id){
								$scope.itemSelected.push(item);
							}
						});
					}
					$scope.config.selectedItems.push($scope.items[0]);
					$scope.tempSelection = $scope.items[0];
					$scope.tempSelection.jamMasuk = $filter('date')($scope.tempSelection.tglMasuk, 'HH:mm');
					$scope.tempSelection.jamKeluar = $filter('date')($scope.tempSelection.tglKeluar, 'HH:mm');
					$scope.tempSelection.tglMasuk = $filter('date')($scope.tempSelection.tglMasuk,'dd-MM-yyyy');
					$scope.tempSelection.tglKeluar = $filter('date')($scope.tempSelection.tglKeluar,'dd-MM-yyyy');
				}
				
				// DetailByPpk1.get({ppk1 : $routeParams.ppk1},function(response){
				// 	var reaJasa = $filter('orderBy')(response.detailPmh.reaJasa,'-noPpkJasa');	
				// 	//console.log(reaJasa);		
				// 	for (var i = 0; i < reaJasa.length; i++) {
				// 		if(reaJasa[i].nama == 'epb_tambat'){
				// 			if(response.detailPmh.reaJasa[i].tglSelesai != null){
				// 				$scope.inputLastLine = false;
				// 			}							
				// 			break;
				// 		}	
				// 	}
				// });
			};

		 	var matchDataSelected = function(item){
		 		var match = {};
		 		var items = JSON.parse(JSON.stringify($scope.labuhItems));
				for(var i=0;i < items.length;i++){
					if(items[i].noPpkJasa==item.noPpkJasa){
						match = items[i];
					}
				}
				return match;
		 	}

			var handleSelect = function(item, e) {
				var getData = matchDataSelected(item);
 				$scope.tempSelection = getData;
 				$scope.tempSelection.jamMasuk = $filter('date')($scope.tempSelection.tglMasuk, 'HH:mm');
				$scope.tempSelection.jamKeluar = $filter('date')($scope.tempSelection.tglKeluar, 'HH:mm');
				$scope.tempSelection.tglMasuk = $filter('date')($scope.tempSelection.tglMasuk,'dd-MM-yyyy');
				$scope.tempSelection.tglKeluar = $filter('date')($scope.tempSelection.tglKeluar,'dd-MM-yyyy');
			};

			var handleSelectRight = function(item, e) {
				/* validasi jika data sudah di verifikasi, maka data tidak bisa di edit*/
				$scope.setDisabledTglKeluarLabuh();
				if(Validations.checkStatusIsVerified(item))return false;
				RealisasiLabuhDetailbyPpkJasa.get({noPpkJasa: item.noPpkJasa}, function(response) {
					if(response.status!=='404'){
						$scope.rightSelection = response;
						$scope.rightSelection.jamMasuk = response.jamMasuk!==undefined?response.jamMasuk:$filter('date')(response.tglMasuk, 'HH:mm');
						$scope.rightSelection.jamKeluar = response.jamKeluar!==undefined?response.jamKeluar:$filter('date')(response.tglKeluar, 'HH:mm');
						$scope.rightSelection.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk, 'dd-MM-yyyy');
						$scope.rightSelection.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar, 'dd-MM-yyyy');
						$scope.realisasilabuh.catatan = response.catatan;
					}else{
						var getDataPtp = matchDataSelected(item);
						$scope.rightSelection = getDataPtp;
						$scope.rightSelection.jamMasuk = item.jamMasuk!==undefined?item.jamMasuk:$filter('date')(item.tglMasuk, 'HH:mm');
						$scope.rightSelection.jamKeluar = item.jamKeluar!==undefined?item.jamKeluar:$filter('date')(item.tglKeluar, 'HH:mm');
						$scope.rightSelection.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk, 'dd-MM-yyyy');
						$scope.rightSelection.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar, 'dd-MM-yyyy');
						$scope.realisasilabuh.catatan = item.catatan;
					}
				});
			};

			var handleDblClickRight = function(item, e) {
				$scope.rightReadOnly = false;
				$scope.setDisabledTglKeluarLabuh();
				if(Validations.checkStatusIsVerifyLabuh(item) == true){
					$scope.rightReadOnly = true;
					return false;	
				}				
			};

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
				handleDblClickRight(item);
			});

			$scope.validationLookupLokasiLabuh = function(){
				if($scope.valueField !== $scope.rightSelection.namaLokasi){
					if(typeof $scope.rightSelection.namaLokasi != 'object'){
						$scope.setNotification  = {
							type	: 'warning',
							message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-002</b>'
						};
						Notification.setNotification($scope.setNotification);
						$scope.rightSelection.namaLokasi = '';
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
						$scope.itemSelected[idx].tglMasuk = $filter('date')($scope.itemSelected[idx].tglMasuk,'dd-MM-yyyy');
						// $scope.itemSelected[idx].tglKeluar = $filter('date')($scope.itemSelected[idx].tglKeluar,'dd-MM-yyyy');
						$scope.itemSelected[idx].tglKeluar = null;
						$scope.itemSelected[idx].jamKeluar = null;
						$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
						$scope.rightSelection = $scope.itemSelected[idx];
						setDisableDate();
						$scope.rightReadOnly = false;
						$scope.setDisabledTglKeluarLabuh();
					}
				}
			};
 
			//function reset Labuh
			$scope.resetLabuh = function() {
				$scope.avoidClick = false;
				var select = [];
				$scope.itemSelected = select;

				var idx = $scope.itemSelected.indexOf(select);
				$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightReadOnly = true;	
				$scope.realisasilabuh.noPelayanan = '';
				$scope.realisasilabuh.statusLabuh ='';
				getLabuhItems();
			};

			$scope.validationDataReaLabuh = function(){
				MonitoringDetail.get({
					ppk1 	: $routeParams.ppk1,
					urutan 	: $routeParams.urutan
				},function(response){
					var detailReaJasa = response.detailPmh.reaJasa;
					if(detailReaJasa.length>0){
						/*if(response.permohonan.gtKapal>=500 && response.permohonan.jenisKapal!=="KPLTONKANG"){
							for (var i = 0; i < detailReaJasa.length; i++) {
								if(detailReaJasa[i].nama==='epb_pandu' && detailReaJasa[i].jenisGerakan!=='3'){
									var note =  {
										type 	: "warning",
										message : "Data tidak berhasil tersimpan, karena <b>jenis gerakan Pandu belum keluar</b><br>Kode validasi : <b>VALREA-019</b>"
									};
									Notification.setNotification(note);
									$scope.isValidationRealisasi = false;
								}
							}
						}else{*/
							for (var i = 0; i < detailReaJasa.length; i++) {
								if(detailReaJasa[i].nama==='epb_tambat' && (detailReaJasa[i].tglSelesai==='' || detailReaJasa[i].tglSelesai===null)){
									var note =  {
										type 	: "warning",
										message : "Data tidak berhasil tersimpan, karena <b>last line Tambat belum diinput</b>"
									};
									Notification.setNotification(note);
									$scope.isValidationRealisasi = false;
								}
							}
						/*}*/
					}
				});
			}

			$scope.saveLabuh = function() {
				$scope.realisasilabuh.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk, 'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMasuk;
				
				if($scope.configRight.selectedItems.length > 0){
					$scope.realisasilabuh.noPpk1 = $scope.dataUmum.noPpk1;
					$scope.realisasilabuh.noPpkJasa = $scope.rightSelection.noPpkJasa;
					
					if (typeof $scope.rightSelection.namaLokasi === 'object') {
						$scope.realisasilabuh.kodeLokasi = $scope.rightSelection.namaLokasi.mdmgKode;
						$scope.realisasilabuh.namaLokasi = $scope.rightSelection.namaLokasi.mdmgNama;
					}else{
						$scope.realisasilabuh.kodeLokasi = $scope.rightSelection.kodeLokasi;
						$scope.realisasilabuh.namaLokasi = $scope.rightSelection.namaLokasi;
					}

					if(typeof $scope.rightSelection.tglMasuk === 'object'){
						if($scope.rightSelection.tglMasuk.toString().indexOf('-') === -1){
							$scope.realisasilabuh.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMasuk;
						}
					}else{
						var formatTglMasuk = $scope.rightSelection.tglMasuk.split('-');
						var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
						$scope.realisasilabuh.tglMasuk = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamMasuk;
					}

					if($scope.rightSelection.tglKeluar != null){
						if(typeof $scope.rightSelection.tglKeluar === 'object'){
							if($scope.rightSelection.tglKeluar.toString().indexOf('-') === -1){
								$scope.realisasilabuh.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamKeluar;
							}
						}else{
							var formatTglKeluar = $scope.rightSelection.tglKeluar.split('-');
							var newFormatTglKeluar = formatTglKeluar[1]+'-'+formatTglKeluar[0]+'-'+formatTglKeluar[2];
							$scope.realisasilabuh.tglKeluar = $filter('date')(new Date(newFormatTglKeluar),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamKeluar;
						}
					}

					var rightPpkJasa = $scope.rightSelection.noPpkJasa;

					for (var i = 0; i < $scope.items.length; i++) {
						if ($scope.items[i].noPpkJasa === rightPpkJasa) {
							var status = $scope.items[i].status;
						}
					}

					// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
					var parseTglMasuk = Date.parse($scope.realisasilabuh.tglMasuk);
					var parseTglKeluar = Date.parse($scope.realisasilabuh.tglKeluar);
					if($scope.realisasilabuh.tglKeluar && parseTglMasuk>=parseTglKeluar){
						var note =  {
										type 	: "warning",
										message : "Tgl & Jam Kedatangan harus melebihi Tgl & Jam Keberangkatan.<br><br>Kode validasi : <b>VALREA-001</b>"
									};
						Notification.setNotification(note);
						return false;
					}
					// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

					if($scope.realisasilabuh.tglKeluar){
						$scope.validationDataReaLabuh();
					}

					/*validasi form*/
					var R1 = validationForm.required('Lokasi Labuh', $scope.realisasilabuh.namaLokasi);
					if(!R1){return R1;}
					var R2 = validationForm.required('Tanggal Masuk Labuh',$scope.rightSelection.tglMasuk);
					if(!R2){return R2;}
					var R3 = validationForm.required('Jam Masuk Labuh',$scope.rightSelection.jamMasuk);
					if(!R3){return R3;}

					$timeout(function() {
						if($scope.isValidationRealisasi){
							$scope.configRight.selectedItems = [];
							$scope.avoidClick = false;
							$scope.rightReadOnly = true;
							if ($scope.rightSelection.tglVerifikasi === undefined) {
								RealisasiLabuh.save($scope.realisasilabuh,
									function(response) {
										if (response.id) {
												var note = {
												type: "success",
												message: "Data berhasil tersimpan"
											};
											Notification.setNotification(note);
											$rootScope.adaDataLabuh = true;
										} else {
											var note = {
												type: "error",
												message: "Data gagal disimpan"
											};
											Notification.setNotification(note);
										}
									},
									function(response) {
										var note = {
											type: "error",
											message: "Data gagal disimpan"
										};
										Notification.setNotification(note);
									}
								);
							}else{
								RealisasiLabuhEdit.update({noPpkJasa:$scope.rightSelection.noPpkJasa},$scope.realisasilabuh,
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
						}
					},1500);
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

			//start date angular UI
			$scope.openTglMasuk = function() {
				$scope.popupTglMasuk.opened = true;
			};
			$scope.openTglKeluar = function() {
				$scope.popupTglKeluar.opened = true;
			};

			$scope.popupTglMasuk = {
				opened: false
			};
			$scope.popupTglKeluar = {
				opened: false
			};

			$scope.format = 'dd-MM-yyyy';
			//$scope.altInputFormats = ['dd-MM-yyyy'];
			//end date angular UI	


			// $scope.config.selectedItems.push($scope.items[0]);
			// $scope.tempSelection = $scope.items[0];

			$scope.$watch('rightSelection.tglMasuk', function(){
				setTimeout(function(){
					setDisableDate();
		 		}, 500);
			});

			$scope.$watch('rightSelection.tglKeluar', function(){
				setTimeout(function(){
					setDisableDate();
		 		}, 500);
			});

			var setDisableDate = function(){
       	 		$('#reaLabuhTglKeluar').datepicker('setStartDate',$scope.rightSelection.tglMasuk);
				$('#reaLabuhTglMasuk').mask('99-99-9999');
				$('#reaLabuhTglKeluar').mask('99-99-9999');
			}

		}]);