'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapanpanduCtrl
 * @description
 * # TransaksiPenetapanpanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiPenetapanpanduCtrl', ['$scope','$filter','$routeParams','$controller','AppParam','PermohonanDetailByPpk','PermohonanPandu','PenetapanPandu', 'PenetapanPanduByPpkJasa', 'PenetapanPanduEdit','AturanGerakPanduList','Notification','validationForm','SearchKapalGandeng',function ($scope,$filter,$routeParams,$controller,AppParam,PermohonanDetailByPpk,PermohonanPandu,PenetapanPandu, PenetapanPanduByPpkJasa,PenetapanPanduEdit,AturanGerakPanduList,Notification,validationForm,SearchKapalGandeng) {
    /*
 	** tab pandu
 	*/
 	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
 	angular.extend(this, $controller('TransaksiPenetapannewCtrl', {$scope: $scope}));

 	$scope.tempSelection = null;
 	$scope.rightSelection = {};
 	$scope.itemSelected = [];
 	$scope.avoidClick = false;
 	$scope.rightReadOnly = true;
 	$scope.penetapanpandu = {};
 	$scope.lokasiAsalGerakPandu = false;
 	$scope.lokasiTujuanGerakPandu = false;
 	$scope.rightSelection.namaLokasiAsal  = "";
 	$scope.rightSelection.namaLokasiTujuan = "";
 	$scope.aturanGerakByLokasiAsal = {};
 	$scope.aturanGerakByLokasiTujuan = {};
 	$scope.kapalGandengArray = [];
 	$scope.gandengBtn = true;


 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.panduItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.panduItems));

 			for(var i=0;i<$scope.panduItems.length;i++){
 				if($scope.panduItems[i].status === 2){
 					var itemPpkJasa = $scope.panduItems[i].noPpkJasa;
 					PenetapanPanduByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			$scope.tempSelection.jamPandu = $filter('date')($scope.tempSelection.tglPandu, 'HH:mm');
			$scope.tempSelection.tglPandu = $filter('date')($scope.tempSelection.tglPandu, 'dd-MM-yyyy');
			$scope.tglSetuju = new Date();
			$scope.penetapanpandu.jamSetuju = moment().format('HH:mm');
			if($scope.dataUmum.jenisKapal === 'KPLTUNDA'|| $scope.dataUmum.jenisKapal === 'TB'){
				$scope.gandengBtn = false; 
				SearchKapalGandeng.get({noPpk1 : $scope.tempSelection.noPpk1, noPpkJasa : $scope.tempSelection.noPpkJasa},function(response){
					if (response.totalElements > 0) {
						$scope.kapalGandengArray = 	response.content;
					}
				});
			}
 		}
 	});

 	var matchDataSelected = function(item){
 		var match = {};
 		var items = JSON.parse(JSON.stringify($scope.panduItems));
		for(var i=0;i < items.length;i++){
			if(items[i].noPpkJasa==item.noPpkJasa){
				match = items[i];
			}
		}
		return match;
 	}

 	var handleSelect = function (item, e) { console.log('1');
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
		$scope.tempSelection.jamPandu = $filter('date')($scope.tempSelection.tglPandu, 'HH:mm');
		$scope.tempSelection.tglPandu = $filter('date')($scope.tempSelection.tglPandu, 'dd-MM-yyyy');
		SearchKapalGandeng.get({noPpk1 : $scope.tempSelection.noPpk1, noPpkJasa : $scope.tempSelection.noPpkJasa},function(response){
			if (response.totalElements > 0) {
				$scope.kapalGandengArray = 	response.content;
				$scope.gandengBtn = false;
			}
		});
	};

	var handleSelectRight = function (item, e) {
		// $scope.rightSelection = item;
		// $scope.rightSelection.jamPandu = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
		// $scope.rightSelection.tglPandu = $filter('date')($scope.rightSelection.tglMulai, 'dd-MM-yyyy');
		// if($scope.rightSelection.tglSetuju != null){
		// 	$scope.jamSetuju = $filter('date')($scope.rightSelection.tglSetuju, 'HH:mm');
		// 	$scope.tglSetuju = $filter('date')($scope.rightSelection.tglSetuju, 'dd-MM-yyyy');
		// }
		/*app200616*/
			PenetapanPanduByPpkJasa.get({ppkjasa : item.noPpkJasa}, function(response){
				if(response.status!=='404'){
					$scope.rightSelection = response;
					$scope.rightSelection.jamPandu = $filter('date')(response.tglMulai, 'HH:mm');
			 		$scope.rightSelection.tglPandu = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
					$scope.penetapanpandu.jamSetuju = $filter('date')(response.tglSetuju, 'HH:mm');
					$scope.penetapanpandu.namaPandu = response.namaPandu;
					$scope.penetapanpandu.nipPandu = response.nipPandu;
					$scope.tglSetuju = $filter('date')(response.tglSetuju, 'dd-MM-yyyy');
				}else{
					var getDataPmh = matchDataSelected(item);
					$scope.rightSelection = getDataPmh;
					$scope.rightSelection.jamPandu = $filter('date')(getDataPmh.tglPandu, 'HH:mm');
					$scope.rightSelection.tglPandu = $filter('date')(getDataPmh.tglPandu, 'dd-MM-yyyy');
					$scope.penetapanpandu.jamSetuju = $filter('date')(new Date(), 'HH:mm');
					$scope.penetapanpandu.namaPandu = null;
					$scope.penetapanpandu.nipPandu = null;
					$scope.tglSetuju = new Date();
				}
			});
			SearchKapalGandeng.get({noPpk1 : item.noPpk1, noPpkJasa : item.noPpkJasa},function(response){
				if (response.totalElements > 0) {
					$scope.kapalGandengArray = 	response.content;
					$scope.gandengBtn = false;
				}
			});
		//}
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
	
	var setDisableDate = function(){
		$('#waktuPandu').mask('99-99-9999');
		//$('#tglSetujuPandu').mask('99-99-9999');
	}

 	$scope.$watch('tglSetuju', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('rightSelection.tglPandu', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});
	
	$scope.validationLookupAsalPandu = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasiAsal){
			if(typeof $scope.rightSelection.namaLokasiAsal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALPTP-005</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasiAsal = '';
			}
		}
	}

	$scope.validationLookupTujuanPandu = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasiTujuan){
			if(typeof $scope.rightSelection.namaLokasiTujuan != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALPTP-005</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasiTujuan = '';
			}
		}
	}

	$scope.validationLookupPetugas = function(){
		if($scope.valueField !== $scope.penetapanpandu.namaPandu){
			if(typeof $scope.penetapanpandu.namaPandu != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALPTP-006</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.penetapanpandu.namaPandu = '';
			}
		}
	}

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				$scope.configRight.selectedItems = [];
				var select = JSON.parse(JSON.stringify($scope.tempSelection));
				
				$scope.itemSelected.push(select);
				
				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].tglPandu = $filter('date')($scope.itemSelected[idx].tglPandu, 'dd-MM-yyyy');

				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightReadOnly = false;
				SearchKapalGandeng.get({noPpk1 : $scope.rightSelection.noPpk1, noPpkJasa : $scope.rightSelection.noPpkJasa},function(response){
					if (response.totalElements > 0) {
						$scope.kapalGandengArray = 	response.content;
					}
				});
			}	
		}
	};

	$scope.savePandu = function(){
		if($scope.configRight.selectedItems.length>0){
			//var jamSetuju = document.getElementById('jamSetujuPandu').querySelector('input').value;
			var jamPandu = document.getElementById('jamPandu').querySelector('input').value;
			
			$scope.penetapanpandu.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.penetapanpandu.noPpkJasa = $scope.tempSelection.noPpkJasa;
			// $scope.penetapanpandu.tglSetuju = $filter('date')($scope.tglSetuju, 'yyyy-MM-dd')+'T'+jamSetuju;

			if (typeof $scope.rightSelection.namaLokasiAsal === 'object') {
				$scope.penetapanpandu.kodeLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgKode;
				$scope.penetapanpandu.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgNama;
			}else{
				$scope.penetapanpandu.kodeLokasiAsal = $scope.rightSelection.kodeLokasiAsal;
				$scope.penetapanpandu.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal;
			}
			if (typeof $scope.rightSelection.namaLokasiTujuan === 'object') {
				$scope.penetapanpandu.kodeLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgKode;			
				$scope.penetapanpandu.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgNama;
			}else{
				$scope.penetapanpandu.kodeLokasiTujuan = $scope.rightSelection.kodeLokasiTujuan;
				$scope.penetapanpandu.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan;
			}
			if (typeof $scope.penetapanpandu.namaPandu === 'object') {
				$scope.penetapanpandu.nipPandu = $scope.penetapanpandu.namaPandu.mpegNip;			
				$scope.penetapanpandu.namaPandu = $scope.penetapanpandu.namaPandu.mpegNama;
			}else{
				$scope.penetapanpandu.nipPandu = $scope.penetapanpandu.nipPandu;
				$scope.penetapanpandu.namaPandu = $scope.penetapanpandu.namaPandu;
			}

			$scope.penetapanpandu.jenisPandu = ''+$scope.rightSelection.jenisPandu;
			$scope.penetapanpandu.jenisGerakan = ''+$scope.rightSelection.jenisGerakan;
			$scope.penetapanpandu.flagApbs = $scope.rightSelection.flagApbs;
			$scope.penetapanpandu.status = $scope.rightSelection.status;
			if(typeof $scope.rightSelection.tglPandu === 'object'){
				if($scope.rightSelection.tglPandu.toString().indexOf('-') === -1){
					$scope.penetapanpandu.tglMulai = $filter('date')($scope.rightSelection.tglPandu,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamPandu;
				}
			}else{
				var formatTglPandu = $scope.rightSelection.tglPandu.split('-');
				var newFormatTglPandu = formatTglPandu[1]+'-'+formatTglPandu[0]+'-'+formatTglPandu[2];
				$scope.penetapanpandu.tglMulai = $filter('date')(new Date(newFormatTglPandu),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamPandu;
			}
			
			/*validasi Form*/
			var R1 = validationForm.required('Lokasi Asal Pandu',$scope.penetapanpandu.namaLokasiAsal);
			if(!R1){return R1;}
			var R2 = validationForm.required('Tanggal Pandu',$scope.rightSelection.tglPandu);
			if(!R2){return R2;};
			var R3 = validationForm.required('Jenis Pandu',$scope.penetapanpandu.jenisPandu);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Pandu',jamPandu);
			if(!R4){return R4;}
			var R5 = validationForm.required('Petugas Pandu',$scope.penetapanpandu.namaPandu);
			if(!R5){return R5;}
			var R6 = validationForm.required('Jenis Gerakan Pandu',$scope.penetapanpandu.jenisGerakan);
			if(!R6){return R6;}
			var R7 = validationForm.required('Lokasi Tujuan Pandu',$scope.penetapanpandu.namaLokasiTujuan);
			if(!R7){return R7;}

			if($scope.rightSelection.parentPtpJasaId === undefined){
				PenetapanPandu.save($scope.penetapanpandu,
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
								type	: "danger",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "danger",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
				//$scope.resetPandu();
			}
			else{
				PenetapanPanduEdit.update({id:$scope.rightSelection.noPpkJasa},$scope.penetapanpandu, 
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
								type	: "danger",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "danger",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
				//$scope.resetPandu();
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

	//function reset pandu
	$scope.resetPandu = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;	

		if($scope.panduItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.panduItems));

 			for(var i=0;i<$scope.panduItems.length;i++){
 				if($scope.panduItems[i].status === 2){
 					var itemPpkJasa = $scope.panduItems[i].noPpkJasa;
 					PenetapanPanduByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.jamPandu = $filter('date')($scope.tempSelection.tglPandu, 'HH:mm');
			$scope.tempSelection.tglPandu = new Date($scope.tempSelection.tglPandu);
			$scope.tglSetuju = new Date();
			$scope.penetapanpandu.jamSetuju = moment().format('HH:mm');
 		}
	};

	//event dari Lokasi Asal dan Tujuan Pandu VALPTP-007
	$scope.changeJenisGerakan = function(){
		if (typeof $scope.rightSelection.namaLokasiAsal === 'object') {
			$scope.aturanGerakByLokasiAsal.kode = $scope.rightSelection.namaLokasiAsal.mdmgKode;
			$scope.aturanGerakByLokasiAsal.nama = $scope.rightSelection.namaLokasiAsal.mdmgNama;
		}else{
			$scope.aturanGerakByLokasiAsal.kode = $scope.rightSelection.kodeLokasiAsal;
			$scope.aturanGerakByLokasiAsal.nama = $scope.rightSelection.namaLokasiAsal;
		}
		if (typeof $scope.rightSelection.namaLokasiTujuan === 'object') {
			$scope.aturanGerakByLokasiTujuan.kode = $scope.rightSelection.namaLokasiTujuan.mdmgKode;			
			$scope.aturanGerakByLokasiTujuan.nama = $scope.rightSelection.namaLokasiTujuan.mdmgNama;
		}else{
			$scope.aturanGerakByLokasiTujuan.kode = $scope.rightSelection.kodeLokasiTujuan;
			$scope.aturanGerakByLokasiTujuan.nama = $scope.rightSelection.namaLokasiTujuan;
		}
		if($scope.rightSelection.namaLokasiAsal || $scope.rightSelection.namaLokasiTujuan){
			AturanGerakPanduList.get({
				kodeLokasi 	: $scope.aturanGerakByLokasiAsal.kode,
				namaLokasi 	: $scope.aturanGerakByLokasiAsal.nama,
				flagAktif 	: 1
			}, function(response) {
				$scope.lokasiAsalGerakPandu = response.content;
				setJenisGerakan();
			});
			AturanGerakPanduList.get({
				kodeLokasi 	: $scope.aturanGerakByLokasiTujuan.kode,
				namaLokasi 	: $scope.aturanGerakByLokasiTujuan.nama,
				flagAktif 	: 1
			}, function(response) {
				$scope.lokasiTujuanGerakPandu = response.content;
				setJenisGerakan();
			});
			/*app200916*/
		}
	}

	//function set jenis gerakan VALPTP-007
	var setJenisGerakan = function() {
		if($scope.lokasiAsalGerakPandu.length>0 && ($scope.lokasiTujuanGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.rightSelection.jenisGerakan = '1'; // MASUK
		}else if($scope.lokasiTujuanGerakPandu.length>0 && ($scope.lokasiAsalGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.rightSelection.jenisGerakan = '3'; // KELUAR
		}else{
			$scope.rightSelection.jenisGerakan = '2'; // PINDAH
		}
	};
  }]);
