'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerubahanairkapalCtrl
 * @description
 * # RevisiPerubahanairkapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerubahanairkapalCtrl',['$scope','$controller','$filter','Notification','PerubahanJasaAirKapal','HistoryRevisiAirKapal','AppParam' ,function ($scope,$controller,$filter,Notification,PerubahanJasaAirKapal,HistoryRevisiAirKapal,AppParam) {
	angular.extend(this, $controller('RevisiPerubahanCtrl', {$scope: $scope}));
	$scope.itemSelected = [];
 	$scope.disabledBtn = true;
 	$scope.jasaair = {};
 	$scope.ubahDataAir = true;
 	$scope.tabelHistoryAir = [];
 	var tempPpkJasa = '';
 	$scope.dataRetrive = [];

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.ubahJasaBtn = function(val){
		$scope.ubahDataAir = val;
	};

	$scope.batalUbah = function(val){
		$scope.ubahDataAir = val;
	};

	var tempSelectionValue = function(item){
		$scope.tempSelection = item;
		$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
		$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi, 'dd-MM-yyyy');
		$scope.ubahDataAir = true;
	};

	var retrive = function(ppkJasa){
		HistoryRevisiAirKapal.get({noPpkJasa:ppkJasa}, function(response){
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
 		var items = JSON.parse(JSON.stringify($scope.airItems));
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
		$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
		$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi, 'dd-MM-yyyy');
		retrive(item.noPpkJasa);
		historyAirKapal($scope.tempSelection.noPpkJasa);
	};

 	var historyAirKapal = function(ppkJasa){
		HistoryRevisiAirKapal.get({noPpkJasa:ppkJasa}, function(response){
			AppParam.get({nama:'ALAT_ISI_AIR'}, function(jg){
				var content = jg.content;
				for(var idx = 0; idx < content.length;idx++){
					for(var j=0;j<response.length;j++){
						if(response[j].alatIsiText == null){
							if(response[j].alatIsi == content[idx].value){
								response[j].alatIsiText = content[idx].caption;
							}
						}
					}
				}
			});
			var history = response;
			$scope.tabelHistoryAir = [];
			for (var i = 0; i < history.length; i++) {
				if(history[i].jenisRevisi == 8){
					$scope.tabelHistoryAir.push(history[i]);
				}
			}
		});
	};

	$scope.$watch('dataUmum', function(){
		if($scope.airItems.length > 0){
			$scope.itemsPenetapan = $scope.airItems;

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

	$scope.validationLookupDermagaAir= function(){
		if($scope.valueField !== $scope.tempSelection.namaDermaga){
			if(typeof $scope.tempSelection.namaDermaga != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.tempSelection.namaDermaga = '';
			}
		}
	}

	$scope.ubahJasaAirKapal = function(){
		if($scope.tempSelection.status != 8 || $scope.tempSelection.status != 6 || $scope.tempSelection.status != 7){
			var jamIsi = document.getElementById('jamIsiVal').value;
			if(typeof $scope.tempSelection.tglIsi === 'object'){
				if($scope.tempSelection.tglIsi.toString().indexOf('-') === -1){
					$scope.jasaair.tglIsi = $filter('date')($scope.tempSelection.tglIsi,'yyyy-MM-dd')+'T'+jamIsi;
				}
			}else{
				var formatTglMasuk = $scope.tempSelection.tglIsi.split('-');
				var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
				$scope.jasaair.tglIsi = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+jamIsi;
			}

			$scope.jasaair.volume = $scope.tempSelection.volume;
			$scope.jasaair.satuanVolume = $scope.tempSelection.satuanVolume;
			$scope.jasaair.alatIsi = $scope.tempSelection.alatIsi;
			$scope.jasaair.noPpkJasa = $scope.tempSelection.noPpkJasa;
			if (typeof $scope.tempSelection.namaDermaga === 'object') {
				$scope.jasaair.kodeDermaga = $scope.tempSelection.namaDermaga.mdmgKode;
				$scope.jasaair.namaDermaga = $scope.tempSelection.namaDermaga.mdmgNama;
			}else{
				$scope.jasaair.kodeDermaga = $scope.tempSelection.kodeDermaga;
				$scope.jasaair.namaDermaga = $scope.tempSelection.namaDermaga;
			}

			PerubahanJasaAirKapal.save({noPpkJasa:tempPpkJasa},$scope.jasaair, function(response){
		 		if(response.status !== '500' || response.status !== '404' || response.status !== '400'){
		 			var note  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Jasa berhasil diubah."
					};
					Notification.setNotification(note);
					tempSelectionValue(response);
		 			historyAirKapal(tempPpkJasa);
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
