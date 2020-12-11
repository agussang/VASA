'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapanlabuhCtrl
 * @description
 * # TransaksiPenetapanlabuhCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiPenetapanlabuhCtrl', ['$scope','$filter','$routeParams','$controller','AppParam','PermohonanDetailByPpk','PermohonanLabuh','PenetapanLabuh', 'PenetapanLabuhEdit','PenetapanLabuhByPpkJasa','Notification','TipeEskalasi','BindEskalasi','validationForm', function ($scope,$filter,$routeParams,$controller,AppParam,PermohonanDetailByPpk,PermohonanLabuh,PenetapanLabuh,PenetapanLabuhEdit,PenetapanLabuhByPpkJasa,Notification,TipeEskalasi,BindEskalasi,validationForm) {
 	/*
 	** tab labuh
 	*/
 	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
 	angular.extend(this, $controller('TransaksiPenetapannewCtrl', {$scope: $scope}));

 	$scope.tempSelection = null;
 	$scope.rightSelection = {};
 	$scope.itemSelected = [];
 	$scope.avoidClick = false;
 	$scope.rightReadOnly = true;
 	$scope.penetapanlabuh = {};
 	$scope.disabledPtpLokasiLabuh = true;


 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.labuhItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.labuhItems));
 			for(var i=0;i<$scope.labuhItems.length;i++){
 				if($scope.labuhItems[i].status === 2){
 					var itemPpkJasa = $scope.labuhItems[i].noPpkJasa;
 					PenetapanLabuhByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.jamMasuk = $filter('date')($scope.tempSelection.tglMasuk, 'HH:mm');
			$scope.tempSelection.jamKeluar = $filter('date')($scope.tempSelection.tglKeluar, 'HH:mm');
			$scope.tempSelection.tglMasuk = $filter('date')($scope.tempSelection.tglMasuk,'dd-MM-yyyy');
			$scope.tempSelection.tglKeluar = $filter('date')($scope.tempSelection.tglKeluar,'dd-MM-yyyy');
			//$scope.tempSelection.tglMasuk = new Date($scope.tempSelection.tglMasuk);
			//$scope.tempSelection.tglKeluar = new Date($scope.tempSelection.tglKeluar);
			//$scope.tglSetuju = new Date();
			$scope.penetapanlabuh.jamSetuju = moment().format('HH:mm');
 		}
 	});

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
	 	$('#penetapanLabuhTglKeluar').datepicker('setStartDate',$scope.rightSelection.tglMasuk);
		$('#penetapanLabuhTglMasuk').mask('99-99-9999');
		$('#penetapanLabuhTglKeluar').mask('99-99-9999');
		//$('#tglSetuju').mask('99-99-9999');
	}

	$scope.validationLookupLokasiLabuh = function(){
		// var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPTP002');
		// var hasEsc = BindEskalasi.hasTempEskalasi('VALPTP002');
		// var statusEskalasi = itemEskalasi.id!==undefined?true:false;
		// if(hasEsc){
		// 	return true;
		// }else{
			if($scope.valueField !== $scope.rightSelection.namaLokasi){
				if(typeof $scope.rightSelection.namaLokasi != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi : <b>VALPTP-002</b>',
						hasEsc	: statusEskalasi,
						dataEsc : itemEskalasi
					};
					Notification.setNotification($scope.setNotification);
					$scope.rightSelection.namaLokasi = '';
				}
			}
		// }
	}

	$scope.setAfterSubmit = function(item){
		$scope.rightSelection.tglMasuk = new Date($filter('date')(item.tglMasuk, 'yyyy-MM-dd'));
		$scope.rightSelection.jamMasuk = $filter('date')(item.tglMasuk, 'HH:mm');
		$scope.rightSelection.tglKeluar = new Date($filter('date')(item.tglKeluar, 'yyyy-MM-dd'));
		$scope.rightSelection.jamKeluar = $filter('date')(item.tglKeluar, 'HH:mm');
		$scope.rightSelection.tglSetuju = new Date($filter('date')(item.tglSetuju, 'yyyy-MM-dd'));
		$scope.rightSelection.jamSetuju = $filter('date')(item.tglSetuju, 'HH:mm');
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

 	var handleSelect = function (item, e) {
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
 		$scope.tempSelection.jamMasuk = $filter('date')($scope.tempSelection.tglMasuk, 'HH:mm');
		$scope.tempSelection.jamKeluar = $filter('date')($scope.tempSelection.tglKeluar, 'HH:mm');
		$scope.tempSelection.tglMasuk = $filter('date')($scope.tempSelection.tglMasuk,'dd-MM-yyyy');
		$scope.tempSelection.tglKeluar = $filter('date')($scope.tempSelection.tglKeluar,'dd-MM-yyyy');
	};

	var handleSelectRight = function (item, e) {
		PenetapanLabuhByPpkJasa.get({ppkjasa : item.noPpkJasa}, function(response){
			if(response.status!=='404'){
				$scope.rightSelection = response;
				$scope.rightSelection.jamMasuk = response.jamMasuk!==undefined?response.jamMasuk:$filter('date')(response.tglMasuk, 'HH:mm');
				$scope.rightSelection.jamKeluar = response.jamKeluar!==undefined?response.jamKeluar:$filter('date')(response.tglKeluar, 'HH:mm');
				$scope.penetapanlabuh.jamSetuju = response.jamSetuju!==undefined?response.jamSetuju:$filter('date')(response.tglSetuju, 'HH:mm');
				$scope.rightSelection.tglMasuk = $filter('date')(response.tglMasuk, 'dd-MM-yyyy');
				$scope.rightSelection.tglKeluar = $filter('date')(response.tglKeluar, 'dd-MM-yyyy');
				$scope.tglSetuju = $filter('date')(response.tglSetuju, 'dd-MM-yyyy');
			}else{
				var getDataPmh = matchDataSelected(item);
				$scope.rightSelection = getDataPmh;
				//$scope.rightSelection.jamPandu = $filter('date')(getDataPmh.tglPandu, 'HH:mm');
				//$scope.rightSelection.tglPandu = $filter('date')(getDataPmh.tglPandu, 'dd-MM-yyyy');
				$scope.penetapanlabuh.jamSetuju = $filter('date')(new Date(), 'HH:mm');
				//$scope.rightSelection.jamPandu = $filter('date')(getDataPmh.tglPandu, 'HH:mm');
				//$scope.rightSelection.tglPandu = $filter('date')(getDataPmh.tglPandu, 'HH:mm');
				//$scope.tempSelection.tglMasuk = $filter('date')($scope.tempSelection.tglMasuk,'dd-MM-yyyy');
				//$scope.tempSelection.tglKeluar = $filter('date')($scope.tempSelection.tglKeluar,'dd-MM-yyyy');
		 		$scope.rightSelection.jamMasuk = $filter('date')($scope.rightSelection.tglMasuk, 'HH:mm');
				$scope.rightSelection.jamKeluar = $filter('date')($scope.rightSelection.tglKeluar, 'HH:mm');
				$scope.rightSelection.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk,'dd-MM-yyyy');
				$scope.rightSelection.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar,'dd-MM-yyyy');	
				$scope.tglSetuju = new Date();
			}
		});
	};

	var handleDblClickRight = function(item, e){
		$scope.rightReadOnly = false;
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
		$('#dataptp-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
 		handleSelectRight(item);
 		handleDblClickRight(item);
	});

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				$scope.configRight.selectedItems = [];
				var select = JSON.parse(JSON.stringify($scope.tempSelection));

				$scope.itemSelected.push(select);

				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].tglMasuk = $filter('date')($scope.itemSelected[idx].tglMasuk, 'dd-MM-yyyy');
				$scope.itemSelected[idx].tglKeluar = $filter('date')($scope.itemSelected[idx].tglKeluar, 'dd-MM-yyyy');
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightReadOnly = false;
			}
		}
	};

	//function reset labuh
	$scope.resetLabuh = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;	
		//$scope.realisasilabuh = '';
		if($scope.labuhItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.labuhItems));
 			for(var i=0;i<$scope.labuhItems.length;i++){
 				if($scope.labuhItems[i].status === 2){
 					var itemPpkJasa = $scope.labuhItems[i].noPpkJasa;
 					PenetapanLabuhByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.jamMasuk = $filter('date')($scope.tempSelection.tglMasuk, 'HH:mm');
			$scope.tempSelection.jamKeluar = $filter('date')($scope.tempSelection.tglKeluar, 'HH:mm');
			$scope.tempSelection.tglMasuk = new Date($scope.tempSelection.tglMasuk);
			$scope.tempSelection.tglKeluar = new Date($scope.tempSelection.tglKeluar);
			$scope.tglSetuju = new Date();
			$scope.penetapanlabuh.jamSetuju = moment().format('HH:mm');
 		}
	};

	$scope.saveLabuh = function(){		
		if($scope.configRight.selectedItems.length>0){
			var jamMasuk = document.getElementById('jamMasukEditLabuh').querySelector('input').value;
			var jamKeluar = document.getElementById('jamKeluarEditLabuh').querySelector('input').value;
			//var jamSetuju = document.getElementById('jamSetujuLabuh').querySelector('input').value;
			$scope.penetapanlabuh.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.penetapanlabuh.noPpkJasa = $scope.tempSelection.noPpkJasa;
			
			if (typeof $scope.rightSelection.namaLokasi === 'object') {
				$scope.penetapanlabuh.kodeLokasi = $scope.rightSelection.namaLokasi.mdmgKode;
				$scope.penetapanlabuh.namaLokasi = $scope.rightSelection.namaLokasi.mdmgNama;
			}else{
				$scope.penetapanlabuh.kodeLokasi = $scope.rightSelection.kodeLokasi;
				$scope.penetapanlabuh.namaLokasi = $scope.rightSelection.namaLokasi;
			}
			$scope.penetapanlabuh.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk,'yyyy-MM-dd')+'T'+jamMasuk;
			$scope.penetapanlabuh.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar, 'yyyy-MM-dd')+'T'+jamKeluar;
			$scope.penetapanlabuh.status = $scope.rightSelection.status;
			//$scope.penetapanlabuh.noForm = $scope.rightSelection.noForm;
			if(typeof $scope.rightSelection.tglMasuk === 'object'){
				if($scope.rightSelection.tglMasuk.toString().indexOf('-') === -1){
					$scope.penetapanlabuh.tglMasuk = $filter('date')($scope.rightSelection.tglMasuk,'yyyy-MM-dd')+'T'+jamMasuk;
				}
			}else{
				var formatTglMasuk = $scope.rightSelection.tglMasuk.split('-');
				var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
				$scope.penetapanlabuh.tglMasuk = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+jamMasuk;
			}

			if(typeof $scope.rightSelection.tglKeluar === 'object'){
				if($scope.rightSelection.tglKeluar.toString().indexOf('-') === -1){
					$scope.penetapanlabuh.tglKeluar = $filter('date')($scope.rightSelection.tglKeluar,'yyyy-MM-dd')+'T'+jamKeluar;
				}
			}else{
				var formatTglKeluar = $scope.rightSelection.tglKeluar.split('-');
				var newFormatTglKeluar = formatTglKeluar[1]+'-'+formatTglKeluar[0]+'-'+formatTglKeluar[2];
				$scope.penetapanlabuh.tglKeluar = $filter('date')(new Date(newFormatTglKeluar),'yyyy-MM-dd')+'T'+jamKeluar;
			}

			/*if(typeof $scope.tglSetuju === 'object'){
				if($scope.tglSetuju.toString().indexOf('-') === -1){
					$scope.penetapanlabuh.tglSetuju = $filter('date')($scope.tglSetuju,'yyyy-MM-dd')+'T'+jamSetuju;
				}
			}else{
				var formatTglSetuju = $scope.tglSetuju.split('-');
				var newFormatTglSetuju = formatTglSetuju[1]+'-'+formatTglSetuju[0]+'-'+formatTglSetuju[2];
				$scope.penetapanlabuh.tglSetuju = $filter('date')(new Date(newFormatTglSetuju),'yyyy-MM-dd')+'T'+jamSetuju;
			}*/

			var rightPpkJasa = $scope.rightSelection.noPpkJasa;
			for(var i=0;i<$scope.items.length;i++){
				if($scope.items[i].noPpkJasa === rightPpkJasa){
					var status = $scope.items[i].status;
				}
			}

			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;
			$scope.setAfterSubmit($scope.penetapanlabuh);

			var parseTglMasuk = Date.parse($scope.penetapanlabuh.tglMasuk);
			var parseTglKeluar = Date.parse($scope.penetapanlabuh.tglKeluar);

			if($scope.penetapanlabuh.tglKeluar && ((parseTglMasuk > parseTglKeluar) || (parseTglMasuk == parseTglKeluar))){
				var note =  {
								type 	: "warning",
								message : "Waktu Kedatangan tidak boleh melebihi Waktu Keberangkatan <br><br>Kode validasi : <b>VALPTP-001</b>"
							};
				Notification.setNotification(note);
				return false;
			}

			/*validasi Form*/
			var R1 = validationForm.required('Lokasi Labuh',$scope.penetapanlabuh.namaLokasi);
			if(!R1){return R1;}
			var R2 = validationForm.required('Tanggal Masuk Tambat',$scope.rightSelection.tglMasuk);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Keluar Tambat',$scope.rightSelection.tglKeluar);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Masuk Tambat',jamMasuk);
			if(!R4){return R4;}
			var R5 = validationForm.required('Jam Keluar Keluar',jamKeluar);
			if(!R5){return R5;}

			if($scope.rightSelection.parentPtpJasaId === undefined){
				PenetapanLabuh.save($scope.penetapanlabuh,
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							BindEskalasi.setDefaultEskalasi();
							$scope.setAfterSubmit(response);
							$scope.setDefaultDisabledLokasiLabuh();
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
			else{
				// $scope.penetapanlabuh.status = $scope.rightSelection.status;
				PenetapanLabuhEdit.update({id:$scope.rightSelection.noPpkJasa},$scope.penetapanlabuh,
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							BindEskalasi.setDefaultEskalasi();
							$scope.setAfterSubmit(response);
							$scope.setDefaultDisabledLokasiLabuh();
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

	/*fungsi untuk eskalasi*/
	$scope.checkDisabledFromEscalation = function() {
		var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPTP002');
		var hasEsc = BindEskalasi.hasTempEskalasi('VALPTP002');
		var statusEskalasi = itemEskalasi.id!==undefined?true:false;

		if(hasEsc){
			$scope.disabledPtpLokasiLabuh = false; 
		}else{
			var note =  {
				type 	: 'warning',
				message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi : <b>VALPTP-002</b>',
				hasEsc	: statusEskalasi,
				dataEsc : itemEskalasi
			};
			Notification.setNotification(note);
			$scope.disabledPtpLokasiLabuh = true;
		}
	};

	$scope.setDefaultDisabledLokasiLabuh = function(){
		var hasEsc = BindEskalasi.hasTempEskalasi('VALPTP002');
		$scope.disabledPtpLokasiLabuh = true;
		if(hasEsc) $scope.disabledPtpLokasiLabuh = false;
	}

	$scope.$on('eventFromEskalasi', function (event, data) {
		$scope.setDefaultDisabledLokasiLabuh();
	  	/*var hasEsc = BindEskalasi.hasTempEskalasi(data.valCode);
		$scope.disabledPtpLokasiLabuh = true; 
		if(hasEsc) $scope.disabledPtpLokasiLabuh = false;*/
	});


 }]);
