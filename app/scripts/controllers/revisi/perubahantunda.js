'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerubahantundaCtrl
 * @description
 * # RevisiPerubahantundaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerubahantundaCtrl',['$scope','$controller','$filter','Notification','PerubahanJasaTunda','HistoryRevisiTunda' ,function ($scope,$controller,$filter,Notification,PerubahanJasaTunda,HistoryRevisiTunda) {
	angular.extend(this, $controller('RevisiPerubahanCtrl', {$scope: $scope}));
	$scope.itemSelected = [];
 	$scope.disabledBtn = true;
 	$scope.jasatunda = {};
 	$scope.ubahDataTunda = true;
 	$scope.tabelHistoryTunda = [];
 	var tempPpkJasa = '';
 	$scope.dataRetrive= [];

	$scope.ubahJasaBtn = function(val){
		$scope.ubahDataTunda = val;
	};

	$scope.batalUbah = function(val){
		$scope.ubahDataTunda = val;
	};

	var tempSelectionValue = function(item){
		$scope.tempSelection = item;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglMulaiTunda = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.ubahDataTunda = true;
	};

	var retrive = function(ppkJasa){
		HistoryRevisiTunda.get({noPpkJasa:ppkJasa}, function(response){
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

 	var handleSelect = function(item, e) {
		tempPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
		$scope.tempSelection = getData;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglMulaiTunda = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');

		retrive(item.noPpkJasa);
		historyTunda($scope.tempSelection.noPpkJasa);
	};

 	var historyTunda = function(ppkJasa){
		HistoryRevisiTunda.get({noPpkJasa:ppkJasa}, function(response){
			var history = response;
			$scope.tabelHistoryTunda = [];
			for (var i = 0; i < history.length; i++) {
				if(history[i].jenisRevisi == 8){
					$scope.tabelHistoryTunda.push(history[i]);
				}
			}
		});
	};

	$scope.$watch('dataUmum', function(){
		if($scope.tundaItems.length > 0){
			$scope.itemsPenetapan = $scope.tundaItems;

			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
			handleSelect($scope.itemsPenetapan[0]);
			tempPpkJasa = $scope.tempSelection.noPpkJasa;
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

	$scope.validationLookupAsalTunda = function(){
		if($scope.valueField !== $scope.tempSelection.namaLokasiAsal){
			if(typeof $scope.tempSelection.namaLokasiAsal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempSelection.namaLokasiAsal = '';
			}
		}
	}

	$scope.validationLookupTujuanTunda = function(){
		if($scope.valueField !== $scope.tempSelection.namaLokasiTujuan){
			if(typeof $scope.tempSelection.namaLokasiTujuan != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempSelection.namaLokasiTujuan = '';
			}
		}
	}

	$scope.ubahJasaTunda = function(){
		if($scope.tempSelection.status != 8 || $scope.tempSelection.status != 6 || $scope.tempSelection.status != 7){
			var jamMulai = document.getElementById('jamMulaiTundaVal').value;
			if(typeof $scope.tempSelection.tglMulaiTunda === 'object'){
				if($scope.tempSelection.tglMulaiTunda.toString().indexOf('-') === -1){
					$scope.jasatunda.tglMulai = $filter('date')($scope.tempSelection.tglMulaiTunda,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else{
				var formatTglMasuk = $scope.tempSelection.tglMulaiTunda.split('-');
				var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
				$scope.jasatunda.tglMulai = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+jamMulai;
			}

			$scope.jasatunda.noPpkJasa = $scope.tempSelection.noPpkJasa;
			if (typeof $scope.tempSelection.namaLokasiAsal === 'object') {
				$scope.jasatunda.kodeLokasiAsal = $scope.tempSelection.namaLokasiAsal.mdmgKode;
				$scope.jasatunda.namaLokasiAsal = $scope.tempSelection.namaLokasiAsal.mdmgNama;
			}else{
				$scope.jasatunda.kodeLokasiAsal = $scope.tempSelection.kodeLokasiAsal;
				$scope.jasatunda.namaLokasiAsal = $scope.tempSelection.namaLokasiAsal;
			}

			if (typeof $scope.tempSelection.namaLokasiTujuan === 'object') {
				$scope.jasatunda.kodeLokasiTujuan = $scope.tempSelection.namaLokasiTujuan.mdmgKode;
				$scope.jasatunda.namaLokasiTujuan = $scope.tempSelection.namaLokasiTujuan.mdmgNama;
			}else{
				$scope.jasatunda.kodeLokasiTujuan = $scope.tempSelection.kodeLokasiTujuan;
				$scope.jasatunda.namaLokasiTujuan = $scope.tempSelection.namaLokasiTujuan;
			}

			PerubahanJasaTunda.save({noPpkJasa:tempPpkJasa},$scope.jasatunda, function(response){
		 		if(response.status !== '500' || response.status !== '404' || response.status !== '400'){
		 			var note  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Jasa berhasil diubah."
					};
					Notification.setNotification(note);
					tempSelectionValue(response);
		 			historyTunda(tempPpkJasa);
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
	}
}]);
