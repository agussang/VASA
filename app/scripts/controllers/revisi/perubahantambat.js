'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerubahantambatCtrl
 * @description
 * # RevisiPerubahantambatCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerubahantambatCtrl',['$scope','$controller','$filter','Notification','PerubahanJasaTambat','HistoryRevisiTambat',function ($scope,$controller,$filter,Notification,PerubahanJasaTambat,HistoryRevisiTambat) {
	angular.extend(this, $controller('RevisiPerubahanCtrl', {$scope: $scope}));
 	$scope.itemSelected = [];
 	$scope.disabledBtn = true;
 	$scope.jasatambat = {};
 	$scope.ubahData = true;
 	$scope.tabelHistoryTambat = [];
 	var tempPpkJasa = '';
 	$scope.dataRetrive = [];

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	var setDisableDate = function(dateValue){
	 	$('#tglSelesaiTambat').datepicker('setStartDate',dateValue);
		$('#jamSelesaiTambatVal').mask('99:99');
	}

	//start untuk validasi panjang loa dengan panjang dermmaga dan menentukan max kade meter :
	$scope.$watch('tempSelection.namaLokasi', function(newValue){
 		var lokasi = newValue;
 		var loaKapal = $scope.dataUmum.loa;
 		if(localStorage.kodeCabang==="31" || localStorage.kodeCabang==="21"){
			console.log("Skip Validasi Cabang...");
		}else{
			if(typeof lokasi==='object'){
				$scope.maxKadeMeter = lokasi.mdmgPanjang-loaKapal;
				if(loaKapal > lokasi.mdmgPanjang){
					$scope.setNotification  = {
						type    : 'warning',
						message : 'Panjang Dermaga ('+lokasi.mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m)'
					};
					Notification.setNotification($scope.setNotification);
					$scope.tempSelection.kadeAwal = 0;
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
									message : 'Panjang Dermaga ('+mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m)'
								};
								Notification.setNotification($scope.setNotification);
								$scope.tempSelection.kadeAwal = 0;
							}
						});
					}
				}
			}
		}
	});

	$scope.loaValue = function(){
 		$scope.tempSelection.kadeAkhir = parseInt($scope.tempSelection.kadeAwal) + parseInt($scope.dataUmum.loa);
	 	if(isNaN($scope.tempSelection.kadeAkhir)){
	 		$scope.tempSelection.kadeAkhir = 0;
	 	}
 	};

 	$scope.checkIfNull = function(){
 		if($scope.tempSelection.kadeAwal == null || $scope.tempSelection.kadeAwal>$scope.maxKadeMeter){
 			$scope.tempSelection.kadeAwal = 0;
 		}
 	};

 	//end untuk validasi panjang loa dengan panjang dermmaga dan menentukan max kade meter :

	var tempSelectionValue = function(item){
		$scope.tempSelection = item;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
		$scope.ubahData = true;
	};

	var retrive = function(ppkJasa){
		HistoryRevisiTambat.get({noPpkJasa:ppkJasa}, function(response){
			var rHistory = response;
			if(rHistory.length > 0){
				$scope.dataRetrive = rHistory[0];
			}else{
				$scope.dataRetrive = [];
			}
			if($scope.dataRetrive.length === undefined){
				tempSelectionValue($scope.dataRetrive);
			}
		});
	}

 	var historyTambat = function(ppkJasa){
		HistoryRevisiTambat.get({noPpkJasa:ppkJasa}, function(response){
			var history = response;
			$scope.tabelHistoryTambat = [];
			for (var i = 0; i < history.length; i++) {
				if(history[i].jenisRevisi == 8){
					$scope.tabelHistoryTambat.push(history[i]);
				}
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

	var handleSelect = function (item) {
		tempPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
		$scope.tempSelection = getData;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');

		retrive(item.noPpkJasa);
		historyTambat($scope.tempSelection.noPpkJasa);
	};

	$scope.$watch('dataUmum', function(){
		if($scope.tambatItems.length > 0){
			$scope.itemsPenetapan = JSON.parse(JSON.stringify($scope.tambatItems));
			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
			handleSelect($scope.itemsPenetapan[0]);
			tempPpkJasa = $scope.tempSelection.noPpkJasa;
			setDisableDate($scope.tempSelection.tglMulai);
		}
	});

	$scope.config = {
		selectItems: true,
		multiSelect: false,
		dblClick: false,
		selectionMatchProp: 'noPpkJasa',
		selectedItems: [],
		showSelectBox: false,
		onSelect: handleSelect,
	};

	$scope.validationLookupLokasiTambat = function(){
		if($scope.valueField !== $scope.tempSelection.namaLokasi){
			if(typeof $scope.tempSelection.namaLokasi != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempSelection.namaLokasi = '';
			}
		}
	}

	$scope.ubahJasaBtn = function(val){
		$scope.ubahData = val;
	};

	$scope.batalUbah = function(val){
		$scope.ubahData = val;
	};

	$scope.ubahJasaTambat = function(){
		if($scope.tempSelection.status != 8 || $scope.tempSelection.status != 6 || $scope.tempSelection.status != 7){
			var jamMulai = document.getElementById('jamMulaiTambatVal').value;
			var jamSelesai = document.getElementById('jamSelesaiTambatVal').value;

			if(typeof $scope.tempSelection.tglMulai === 'object'){
				if($scope.tempSelection.tglMulai.toString().indexOf('-') === -1){
					$scope.jasatambat.tglMulai = $filter('date')($scope.tempSelection.tglMulai,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else{
				var formatTglMasuk = $scope.tempSelection.tglMulai.split('-');
				var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
				$scope.jasatambat.tglMulai = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+jamMulai;
			}

			if(typeof $scope.tempSelection.tglSelesai === 'object'){
				if($scope.tempSelection.tglSelesai.toString().indexOf('-') === -1){
					$scope.jasatambat.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai,'yyyy-MM-dd')+'T'+jamSelesai;
				}
			}else{
				var formatTglSelesai = $scope.tempSelection.tglSelesai.split('-');
				var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
				$scope.jasatambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesai;
			}

			$scope.jasatambat.noPpkJasa = $scope.tempSelection.noPpkJasa;
			if (typeof $scope.tempSelection.namaLokasi === 'object') {
				$scope.jasatambat.kodeLokasi = $scope.tempSelection.namaLokasi.mdmgKode;
				$scope.jasatambat.namaLokasi = $scope.tempSelection.namaLokasi.mdmgNama;
			}else{
				$scope.jasatambat.kodeLokasi = $scope.tempSelection.kodeLokasi;
				$scope.jasatambat.namaLokasi = $scope.tempSelection.namaLokasi;
			}
			$scope.jasatambat.kadeAwal = $scope.tempSelection.kadeAwal;
			$scope.jasatambat.kadeAkhir = $scope.tempSelection.kadeAkhir;
			PerubahanJasaTambat.save({noPpkJasa:tempPpkJasa}, $scope.jasatambat, function(response){
		 		if(response.status !== '500' || response.status !== '404' || response.status !== '400'){
		 			var note  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Jasa berhasil diubah."
					};
					Notification.setNotification(note);
					tempSelectionValue(response);
		 			historyTambat(tempPpkJasa);
		 		}else{
		 			var note  = {
						type	: "warning",
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification(note);
		 		}
		 	},function(response){
		 		var note  = {
					type	: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification(note);
			});
		}
	};
}]);
