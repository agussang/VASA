'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapantundaCtrl
 * @description
 * # TransaksiPenetapantundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiPenetapantundaCtrl', ['$scope','$filter','$routeParams','$controller','AppParam','PermohonanDetailByPpk','PermohonanTunda','PenetapanTunda', 'PenetapanTundaByPpkJasa','PenetapanTundaEdit', 'Notification','validationForm', function ($scope,$filter,$routeParams,$controller,AppParam,PermohonanDetailByPpk,PermohonanTunda,PenetapanTunda, PenetapanTundaByPpkJasa, PenetapanTundaEdit, Notification,validationForm) {
    /*
 	** tab tunda
 	*/
 	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
 	angular.extend(this, $controller('TransaksiPenetapannewCtrl', {$scope: $scope}));

 	$scope.tempSelection = null;
 	$scope.rightSelection = null;
 	$scope.itemSelected = [];
 	$scope.avoidClick = false;
 	$scope.rightReadOnly = true;
 	$scope.penetapantunda = {};

 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.tundaItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.tundaItems));

 			for(var i=0;i<$scope.tundaItems.length;i++){
 				if($scope.tundaItems[i].status === 2){
 					var itemPpkJasa = $scope.tundaItems[i].noPpkJasa;
 					PenetapanTundaByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
 			$scope.tempSelection = $scope.items[0];

 			$scope.tempSelection.jamTunda = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.tglTunda = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
 			$scope.tglSetuju = new Date();
 			$scope.penetapantunda.jamSetuju = moment().format('HH:mm');
 			//$scope.tglTunda = $filter('date')($scope.rightSelection.tglMulai, 'dd-MM-yyyy');
 		}
 	});

 	var matchDataSelected = function(item){
 		var match = {};
 		var items = JSON.parse(JSON.stringify($scope.tundaItems));
		for(var i=0;i < items.length;i++){
			if(items[i].noPpkJasa==item.noPpkJasa){
				match = items[i];
			}
		}
		return match;
 	}

 	var handleSelect = function (item) {
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
 		$scope.tempSelection.jamTunda = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglTunda = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
	};

	var handleSelectRight = function (item, e) {
		PenetapanTundaByPpkJasa.get({ppkjasa : item.noPpkJasa}, function(response){
			if(response.status!=='404'){
				$scope.rightSelection = response;
				$scope.rightSelection.jamTunda = $filter('date')(response.tglMulai, 'HH:mm');
		 		$scope.rightSelection.tglTunda = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
				$scope.penetapantunda.jamSetuju = $filter('date')(response.tglSetuju, 'HH:mm');
				$scope.tglSetuju = $filter('date')(response.tglSetuju, 'dd-MM-yyyy');
			}else{
				var getDataPmh = matchDataSelected(item);
				$scope.rightSelection = getDataPmh;
				$scope.rightSelection.jamTunda = $filter('date')(getDataPmh.tglMulai, 'HH:mm');
				$scope.rightSelection.tglTunda = $filter('date')(getDataPmh.tglMulai, 'dd-MM-yyyy');
				$scope.penetapantunda.jamSetuju = $filter('date')(new Date(), 'HH:mm');
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
	
	var setDisableDate = function(){
		$('#tglMulaiTunda').mask('99-99-9999');
		//$('#tglSetujuTunda').mask('99-99-9999');
	}

 	$scope.$watch('tglSetuju', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('rightSelection.tglTunda', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});
	
	$scope.validationLookupAsalTunda = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasiAsal){
			if(typeof $scope.rightSelection.namaLokasiAsal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALPTP-008</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasiAsal = '';
			}
		}
	}

	$scope.validationLookupTujuanTunda = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasiTujuan){
			if(typeof $scope.rightSelection.namaLokasiTujuan != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALPTP-008</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasiTujuan = '';
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
				$scope.itemSelected[idx].tglTunda = $filter('date')($scope.itemSelected[idx].tglMulai, 'dd-MM-yyyy');
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightReadOnly = false;
			}	
		}
	};

	//function reset tunda
	$scope.resetTunda = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;	
		//$scope.realisasitunda = '';

		if($scope.tundaItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.tundaItems));

 			for(var i=0;i<$scope.tundaItems.length;i++){
 				if($scope.tundaItems[i].status === 2){
 					var itemPpkJasa = $scope.tundaItems[i].noPpkJasa;
 					PenetapanTundaByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.jamTunda = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.tglTunda = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
 			$scope.tglSetuju = new Date();
 			$scope.penetapantunda.jamSetuju = moment().format('HH:mm');
 			//$scope.tglTunda = $filter('date')($scope.rightSelection.tglMulai, 'dd-MM-yyyy');
 		}
	};

	$scope.saveTunda = function(){
		// $scope.rightSelection = {};
		if($scope.configRight.selectedItems.length>0){
			//var jamSetuju = document.getElementById('jamSetujuTunda').querySelector('input').value;
			var jamMulai = document.getElementById('jamTunda').querySelector('input').value;
			//var jamSelesai = document.getElementById('jamSelesaiTunda').querySelector('input').value;

			$scope.penetapantunda.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.penetapantunda.noPpkJasa = $scope.tempSelection.noPpkJasa;
			//$scope.penetapantunda.tglSetuju = $filter('date')($scope.tglSetuju, 'yyyy-MM-dd')+'T'+jamSetuju;
			// $scope.penetapantunda.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal;
			// $scope.penetapantunda.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan;
			if (typeof $scope.rightSelection.namaLokasiAsal === 'object') {
				$scope.penetapantunda.kodeLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgKode;
				$scope.penetapantunda.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgNama;
			}else{
				$scope.penetapantunda.kodeLokasiAsal = $scope.rightSelection.kodeLokasiAsal;
				$scope.penetapantunda.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal;
			}
			if (typeof $scope.rightSelection.namaLokasiTujuan === 'object') {
				$scope.penetapantunda.kodeLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgKode;			
				$scope.penetapantunda.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgNama;
			}else{
				$scope.penetapantunda.kodeLokasiTujuan = $scope.rightSelection.kodeLokasiTujuan;
				$scope.penetapantunda.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan;
			}

			if(typeof $scope.rightSelection.tglTunda === 'object'){
				if($scope.rightSelection.tglTunda.toString().indexOf('-') === -1){
					$scope.penetapantunda.tglMulai = $filter('date')($scope.rightSelection.tglTunda,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else{
				var formatTglTunda = $scope.rightSelection.tglTunda.split('-');
				var newFormatTglTunda = formatTglTunda[1]+'-'+formatTglTunda[0]+'-'+formatTglTunda[2];
				$scope.penetapantunda.tglMulai = $filter('date')(new Date(newFormatTglTunda),'yyyy-MM-dd')+'T'+jamMulai;
			}
			$scope.penetapantunda.status = $scope.rightSelection.status;

			/*validasi Form*/
			var R1 = validationForm.required('Lokasi Asal Tunda',$scope.penetapantunda.namaLokasiAsal);
			if(!R1){return R1;}
			var R2 = validationForm.required('Lokasi Tujuan Tunda',$scope.penetapantunda.namaLokasiTujuan);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Tunda',$scope.rightSelection.tglTunda);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Tunda',jamMulai);
			if(!R4){return R4;}
		
			if($scope.rightSelection.parentPtpJasaId === undefined){
				PenetapanTunda.save($scope.penetapantunda,
					function(response){
						if(response.id){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							// $scope.resetTunda();
						}
						else{
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
					}
				);
			}
			else {
				PenetapanTundaEdit.update({id:$scope.rightSelection.noPpkJasa},$scope.penetapantunda, 
					function(response){
						if(response.id){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							// $scope.resetTunda();
						}
						else{
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
					}
				);
			}
			// PenetapanTunda.save($scope.penetapantunda,function(response){
			// 	console.log(response);
			// });

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
