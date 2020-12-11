'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerubahanpanduCtrl
 * @description
 * # RevisiPerubahanpanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerubahanpanduCtrl',['$scope','$controller','$filter','$routeParams','Notification','AturanGerakPanduList','SearchKapalGandeng','PerubahanJasaPandu','HistoryRevisiPandu','AppParam','AddKapalGandeng','DeleteKapalGandeng','SearchPpk1WithCabang','PermohonanByKodeKapal',function ($scope,$controller,$filter,$routeParams,Notification,AturanGerakPanduList,SearchKapalGandeng,PerubahanJasaPandu,HistoryRevisiPandu,AppParam,AddKapalGandeng,DeleteKapalGandeng,SearchPpk1WithCabang,PermohonanByKodeKapal) {
	angular.extend(this, $controller('RevisiPerubahanCtrl', {$scope: $scope}));
 	$scope.itemSelected = [];
 	$scope.disabledBtn = true;
 	$scope.aturanGerakByLokasiAsal = {};
 	$scope.aturanGerakByLokasiTujuan = {};
 	$scope.kapalGandengArray = [];
 	$scope.kapalGandengUpdateArray = [];
 	$scope.jasapandu = {};
 	$scope.tabelHistoryPandu = [];
 	$scope.ubahDataPandu = true;
 	var tempPpkJasa = '';
 	$scope.historyData = [];
 	var checkunique = [];
 	$scope.gandengBtn = true;

 	var formatSeparator = function(input) {
		input = parseFloat(input);
		input = input.toFixed(input % 1 === 0 ? 0 : 2);
		return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};

	$scope.ubahJasaBtn = function(val){
		$scope.ubahDataPandu = val;
	};

	$scope.batalUbah = function(val){
		$scope.ubahDataPandu = val;
	};

	var tempSelectionValue = function(item){
		$scope.tempSelection = item;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.ubahDataPandu = true;
	};

	var retrive = function(ppkJasa){
		HistoryRevisiPandu.get({noPpkJasa:ppkJasa}, function(response){
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

 	var historyPandu = function(ppkJasa) {
		HistoryRevisiPandu.get({noPpkJasa:ppkJasa}, function(response){
			AppParam.get({nama:'JENIS_PANDU'}, function(jp){
				var content = jp.content;
				for(var idx = 0; idx < content.length;idx++){
					for(var j=0;j<response.length;j++){
						if(response[j].jenisPanduText == null){
						 	if(response[j].jenisPandu == content[idx].value){
								response[j].jenisPanduText = content[idx].caption;
						 	}
						}
					}
				}
			});
			AppParam.get({nama:'JENIS_GERAKAN'}, function(jg){
				var content = jg.content;
				for(var idx = 0; idx < content.length;idx++){
					for(var j=0;j<response.length;j++){
						if(response[j].jenisGerakanText == null){
							if(response[j].jenisGerakan == content[idx].value){
								response[j].jenisGerakanText = content[idx].caption;
							}
						}
					}
				}
			});
			var history = response;
			$scope.tabelHistoryPandu = []
			for (var i = 0; i < history.length; i++) {
				if(history[i].jenisRevisi == 8){
					$scope.tabelHistoryPandu.push(history[i]);
				}
			}
		});
	};

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

	var handleSelect = function (item) {
		tempPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
		$scope.tempSelection = getData;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		retrive(item.noPpkJasa);
		SearchKapalGandeng.get({noPpk1 : $scope.tempSelection.noPpk1, noPpkJasa : tempPpkJasa},function(response){
			if (response.totalElements > 0) {
				$scope.kapalGandengArray = 	response.content;
				$scope.gandengBtn = false;
			}
		});
		historyPandu(item.noPpkJasa);
	};

		$scope.validationLookupAsalPandu = function(){
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

		$scope.validationLookupTujuanPandu = function(){
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

		$scope.validationLookupKapalGandeng = function(){
			if($scope.valueField !== $scope.kapalGandeng.kapal){
				if(typeof $scope.kapalGandeng.kapal!= 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandeng.kapal = '';
				}
			}
		}

		$scope.getListPpk1Gandeng = function(value) {
			if (value) {
				return new Promise(function(resolve, reject) {
					SearchPpk1WithCabang.get({
						"ppk1": value,
						"limit": 10
					}, function(response) {
						resolve(response);
						response.forEach(function (response) {
							console.log(response);
							response.mkplKode = response.kodeKapal;
							response.mkplNama = response.namaKapal;
							response.mkplLoa = response.loa;
							response.mkplGrt = response.gtKapal;
							response.mkplJenis = response.jenisKapal;
							response.mkplBendera = response.negaraKapal;
							response.noPpk1Tongkang = response.noPpk1;
							response.itemPpk1TK = response.noPpk1 +' - '+ response.namaKapal +' (LOA: '+formatSeparator(response.loa) + ' GT: '+formatSeparator(response.gtKapal)+')';
						});
					});
				});
			}
		};

		$scope.validationLookupPpk1Gandeng = function() {
			if (valueField !== $scope.kapalGandeng.kapal) {
				if (typeof $scope.kapalGandeng.kapal != 'object') {
					$scope.setNotification = {
						type: 'warning',
						message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandeng.kapal = '';
				}
			}
		}

		$scope.submitKapalGandeng = function(){
			var temp = $scope.kapalGandeng.kapal;
			console.log(temp)
			var kapalInfo = {};
			var statusKapal = [];
			PermohonanByKodeKapal.get({kodeKapal : temp.mkplKode}, function(response){
				if(response.status != '500'){
					if (checkunique.indexOf(temp.mkplKode) === -1) {
				        checkunique.push(temp.mkplKode);

						kapalInfo.kodeKapal = temp.mkplKode;
						kapalInfo.namaKapal = temp.mkplNama;
						kapalInfo.loa = temp.mkplLoa;
						kapalInfo.gtKapal = temp.mkplGrt;
						kapalInfo.negaraKapal = temp.mkplBendera;
						kapalInfo.noPpk1Tongkang = temp.noPpk1Tongkang;

						$scope.kapalGandengArray.push(kapalInfo);
						if ($routeParams.id != null) {
							$scope.kapalGandengUpdateArray.push(kapalInfo);
						}
						$scope.kapalGandeng.kapal = '';
						$('#kplGadengModal').modal('hide');

				    } else if (checkunique.indexOf(temp.mkplKode) > -1) {
				    	$('#kplGadengModal').modal('hide');
						$scope.setNotification  = {
							type	: 'warning',
							message	: 'Kapal <b>'+ temp.mkplNama + '</b> sudah dientry. <br> Silahkan Masukan Nama Kapal Lain.'
						};
						Notification.setNotification($scope.setNotification);
						$scope.kapalGandeng.kapal = '';
				    }					
				}else{
					$('#kplGadengModal').modal('hide');
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Kapal <b>'+ temp.mkplNama +'</b> belum memiliki Layanan Aktif. Silahkan Pilih Kapal Lain.'
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandeng.kapal = '';
				}
			});
		}

		$scope.deleteKapalGandengView = function(i){
			$scope.kapalGandengArray.splice(i, 1);
			if ($routeParams.id != null) {
				$scope.kapalGandengUpdateArray.splice(i, 1);
			}
		}

		$scope.deleteKapalGandeng = function(idKapalGandeng,i){
			DeleteKapalGandeng.delete({id:idKapalGandeng},function(response){
				if(response.status !== '500'){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandengArray.splice(i, 1);
				}else{
					$scope.setNotification  = {
						type	: "danger",
						message	: "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}
			},function(){
				$scope.setNotification  = {
					type	: "danger",
					message	: "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			});
		}

	$scope.$watch('dataUmum', function(){
		if($scope.panduItems.length > 0){
			if($scope.dataUmum.jenisKapal === 'KPLTUNDA'){
				$scope.gandengBtn = false;
			}
			$scope.itemsPenetapan = JSON.parse(JSON.stringify($scope.panduItems));
			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
			historyPandu($scope.itemsPenetapan[0].noPpkJasa);
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

	$scope.changeJenisGerakan = function(){
		if (typeof $scope.tempSelection.namaLokasiAsal === 'object') {
			$scope.aturanGerakByLokasiAsal.kode = $scope.tempSelection.namaLokasiAsal.mdmgKode;
			$scope.aturanGerakByLokasiAsal.nama = $scope.tempSelection.namaLokasiAsal.mdmgNama;
		}else{
			$scope.aturanGerakByLokasiAsal.kode = $scope.tempSelection.kodeLokasiAsal;
			$scope.aturanGerakByLokasiAsal.nama = $scope.tempSelection.namaLokasiAsal;
		}
		if (typeof $scope.tempSelection.namaLokasiTujuan === 'object') {
			$scope.aturanGerakByLokasiTujuan.kode = $scope.tempSelection.namaLokasiTujuan.mdmgKode;
			$scope.aturanGerakByLokasiTujuan.nama = $scope.tempSelection.namaLokasiTujuan.mdmgNama;
		}else{
			$scope.aturanGerakByLokasiTujuan.kode = $scope.tempSelection.kodeLokasiTujuan;
			$scope.aturanGerakByLokasiTujuan.nama = $scope.tempSelection.namaLokasiTujuan;
		}
		if($scope.tempSelection.namaLokasiAsal || $scope.tempSelection.namaLokasiTujuan){
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
		}
	}

	//function set jenis gerakan
	var setJenisGerakan = function() {
		if($scope.lokasiAsalGerakPandu.length>0 && ($scope.lokasiTujuanGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.tempSelection.jenisGerakan = '1'; // MASUK
		}else if($scope.lokasiTujuanGerakPandu.length>0 && ($scope.lokasiAsalGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.tempSelection.jenisGerakan = '3'; // KELUAR
		}else{
			$scope.tempSelection.jenisGerakan = '2'; // PINDAH
		}
	};

	$scope.ubahJasaPandu = function(){
		var jamMulai = document.getElementById('jamPanduVal').value;

		if(typeof $scope.tempSelection.tglMulai === 'object'){
			if($scope.tempSelection.tglMulai.toString().indexOf('-') === -1){
				$scope.jasapandu.tglMulai = $filter('date')($scope.tempSelection.tglMulai,'yyyy-MM-dd')+'T'+jamMulai;
			}
		}else{
			var formatTglMasuk = $scope.tempSelection.tglMulai.split('-');
			var newFormatTglMasuk = formatTglMasuk[1]+'-'+formatTglMasuk[0]+'-'+formatTglMasuk[2];
			$scope.jasapandu.tglMulai = $filter('date')(new Date(newFormatTglMasuk),'yyyy-MM-dd')+'T'+jamMulai;
		}

		if($scope.tempSelection.status != 8 || $scope.tempSelection.status != 6 || $scope.tempSelection.status != 7){
			$scope.jasapandu.jenisGerakan = $scope.tempSelection.jenisGerakan;
			$scope.jasapandu.jenisPandu = $scope.tempSelection.jenisPandu;
			$scope.jasapandu.noPpkJasa = $scope.tempSelection.noPpkJasa;
			if (typeof $scope.tempSelection.namaLokasiAsal === 'object') {
				$scope.jasapandu.kodeLokasiAsal = $scope.tempSelection.namaLokasiAsal.mdmgKode;
				$scope.jasapandu.namaLokasiAsal = $scope.tempSelection.namaLokasiAsal.mdmgNama;
			}else{
				$scope.jasapandu.kodeLokasiAsal = $scope.tempSelection.kodeLokasiAsal;
				$scope.jasapandu.namaLokasiAsal = $scope.tempSelection.namaLokasiAsal;
			}

			if (typeof $scope.tempSelection.namaLokasiTujuan === 'object') {
				$scope.jasapandu.kodeLokasiTujuan = $scope.tempSelection.namaLokasiTujuan.mdmgKode;
				$scope.jasapandu.namaLokasiTujuan = $scope.tempSelection.namaLokasiTujuan.mdmgNama;
			}else{
				$scope.jasapandu.kodeLokasiTujuan = $scope.tempSelection.kodeLokasiTujuan;
				$scope.jasapandu.namaLokasiTujuan = $scope.tempSelection.namaLokasiTujuan;
			}

			PerubahanJasaPandu.save({noPpkJasa:tempPpkJasa},$scope.jasapandu, function(response){
		 		if(response.status !== '500' || response.status !== '404' || response.status !== '400'){
					if($scope.kapalGandengArray.length > 0){
						for (var y = 0; y < $scope.kapalGandengArray.length; y++) {
							if(!$scope.kapalGandengArray[y].id)	{
								$scope.kapalGandeng[y] = $scope.kapalGandengArray[y];
								$scope.kapalGandeng[y].noPpk1 = $scope.tempSelection.noPpk1;
								$scope.kapalGandeng[y].noPpkJasa = tempPpkJasa;
								AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
									$scope.setNotification  = {
										type	: "success",
										message	: "Data berhasil tersimpan"
									};
									Notification.setNotification($scope.setNotification);
								},function(){
									$scope.setNotification  = {
										type	: "warning",
										message	: "Data tidak berhasil tersimpan"
									};
									Notification.setNotification($scope.setNotification);
								});
							}
						}
						checkunique = [];
					}
		 			var note  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Jasa berhasil diubah."
					};
					Notification.setNotification(note);
					tempSelectionValue(response);
		 			historyPandu(tempPpkJasa);
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
