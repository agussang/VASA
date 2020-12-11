'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringTundaCtrl
 * @description
 * # ManajementundaMonitoringCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('MonitoringTundaCtrl', ['$scope', '$filter', '$timeout', '$location', '$window', '$interval', 'MonitoringJadwalTunda', 'KapalTundaList', 'AppParam', 'SuratPerintahKerjaTundaList', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', 'AktivitasTunda', 'SuratPerintahKerjaTundaDetail', 'SuratPerintahKerjaTundaAdd', 'SpkTundaDelete', 'TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi', 'PermohonanTundaDetail', 'ReaKapalTundaByPpkJasa', 'DeleteReaKapalTunda', function ($scope, $filter, $timeout, $location, $window, $interval, MonitoringJadwalTunda, KapalTundaList, AppParam, SuratPerintahKerjaTundaList, $PAGE_SIZE, Notification, LoadingScreen, UserRole, AktivitasTunda, SuratPerintahKerjaTundaDetail, SuratPerintahKerjaTundaAdd, SpkTundaDelete, TipeEskalasiList, BindEskalasi, TipeEskalasi, PermohonanTundaDetail, ReaKapalTundaByPpkJasa, DeleteReaKapalTunda) {	
	//list data
	
	$scope.userRole = UserRole.getCurrentRole();
	$scope.items = [];
	$scope.listKapalTunda = [];
	$scope.namaKapal = '';
	$scope.kapalTundaSpks =[];
	$scope.warning = false;

	var currentDate = new Date();
	$scope.tanggalTunda = $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.tomorrowsDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1), 'yyyy-MM-dd');
	
	var setDisableDate = function() {
		$('#tglTunda').datepicker('setEndDate', moment($scope.tomorrowsDate, "YYYY-MM-DD").format("DD-MM-YYYY"));
		$('#tglTunda').mask('99-99-9999');
	};

	$scope.$watch('tglAwal', function() {
		$timeout(function() {
			setDisableDate();
		}, 500);
	});
		
	$scope.loadKapal = function () {
		$scope.listKapalTundaAvailable = [];
		KapalTundaList.get({
			size: 999,
			page: -1,
			sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}, function (response) {
			response.content.forEach(function (element) {
				if (element.statusOn == true) {
					$scope.listKapalTunda.push({
						kodeKapal: element.kodeKapal,
						namaKapal: element.namaKapal,
						namaStatusKapal: element.namaKapal + ' (' + element.statusKapal + ')'
					});
				}
			});
		});
	}

	$scope.loadKapal();

	$scope.listSpk = function() {
		$scope.items = [];
		LoadingScreen.show();
		SuratPerintahKerjaTundaList.get({
			tglTunda:moment($scope.tanggalTunda,"DD-MM-YYYY").format("YYYY-MM-DD"),
			namaKapal: $scope.namaKapal
		},function(response){
			LoadingScreen.hide();
			$scope.items = response;
			$scope.items.forEach(function(element) {
				element.jamTugOff = $filter('date')(element.tugOff,'HH:mm');
				element.jamTugFast = $filter('date')(element.tugFast, 'HH:mm');
			});
		});
	}

	$scope.listSpk();

	$interval(function () { $scope.listSpk(); }, 600000);

	$scope.modalSpk = function (item) {
		$scope.lokasiAsalTemp = "";
		$scope.lokasiTujuanTemp = "";
		$scope.kapalTundaSpks = [];
		SuratPerintahKerjaTundaDetail.get({ noPpkJasa: item.noPpkJasaPandu }, function (response) {
			$scope.spk = response;
			$scope.ppkJasaTundaOption = [];
			
			response.listPtpTunda.forEach(function (params) {
				$scope.ppkJasaTundaOption.push(params.noPpkJasa);
			})

			$scope.tanggalMulaiTunda = $filter('date')($scope.spk.tglMulai, "dd-MM-yyyy");
			$scope.jamMulaiTunda = $filter('date')($scope.spk.tglMulai, "HH:mm");
		})
	};

	$scope.ppkJasaTunda = function (noPpkJasa) {
		if (noPpkJasa.length == 0) {
			$scope.spk.noPpkJasaTunda = "";
			$scope.lokasiAsalTemp = "";
			$scope.lokasiTujuanTemp = "";
			$scope.kapalTundaSpks = [];
		} else {
			PermohonanTundaDetail.get({ noPpkJasa: noPpkJasa }, function (response) {
				$scope.spk.kodeLokasiTundaAsal = response.kodeLokasiAsal;
				$scope.spk.namaLokasiTundaAsal = response.namaLokasiAsal;
				$scope.spk.kodeLokasiTundaTujuan = response.kodeLokasiTujuan;
				$scope.spk.namaLokasiTundaTujuan = response.namaLokasiTujuan;

				$scope.lokasiAsalTemp = response.namaLokasiAsal + ' (' + response.kodeLokasiAsal + ')';
				$scope.lokasiTujuanTemp = response.namaLokasiTujuan + ' (' + response.kodeLokasiTujuan + ')';
			});
			ReaKapalTundaByPpkJasa.get({ noPpkJasa: noPpkJasa }, function (response) {
				$scope.kapalTundaUnavailable = [];
				if (response.length > 0) {
					for (var i = 0; i < response.length; i++) {
						$scope.kapalTundaUnavailable.push(response[i].kodeKapalTunda);
					}
				}
			});
		}
	};

	$scope.$watch('kapalTundaSpks', function (newValue) {
		$scope.warning = false;
		if (newValue.length > 0) {
			for (var j = 0; j < newValue.length; j++) {
				if ($scope.kapalTundaUnavailable.includes(newValue[j].kodeKapal)) {
					$scope.warning = true;
					$scope.failedListKapal = "Kapal tunda " + newValue[j].namaKapal + "  sudah digunakan dalam jasa tunda ini";
					j = newValue.length;
				}
			}
		}
	});

	$scope.kirimSpk = function (spk, lokasiAsal, lokasiTujuan) {
		var assignTundaDTO = [];

		if (typeof lokasiAsal == 'object') {
			spk.kodeLokasiTundaAsal = lokasiAsal.mdmgKode;
			spk.namaLokasiTundaAsal = lokasiAsal.mdmgNama;
		}

		if (typeof lokasiTujuan == 'object') {
			spk.kodeLokasiTundaTujuan = lokasiTujuan.mdmgKode;
			spk.namaLokasiTundaTujuan = lokasiTujuan.mdmgNama;
		}

		var i = 0;


		while (i < $scope.kapalTundaSpks.length) {
			$scope.kapalTundaSpks[i].idSpk = 0;
			$scope.kapalTundaSpks[i].pmhTunda = {};
			$scope.kapalTundaSpks[i].pmhTunda.detailPmhId = 0;
			$scope.kapalTundaSpks[i].pmhTunda.kodeLokasiAsal = spk.kodeLokasiTundaAsal;
			$scope.kapalTundaSpks[i].pmhTunda.kodeLokasiTujuan = spk.kodeLokasiTundaTujuan;
			$scope.kapalTundaSpks[i].pmhTunda.nama = spk.namaKapal;
			$scope.kapalTundaSpks[i].pmhTunda.namaLokasiAsal = spk.namaLokasiTundaAsal;
			$scope.kapalTundaSpks[i].pmhTunda.namaLokasiTujuan = spk.namaLokasiTundaTujuan;
			$scope.kapalTundaSpks[i].pmhTunda.nilaiEpb = 0;
			$scope.kapalTundaSpks[i].pmhTunda.noPpk1 = spk.noPpk1;
			$scope.kapalTundaSpks[i].pmhTunda.noPpkJasa = spk.noPpkJasaTunda;
			$scope.kapalTundaSpks[i].pmhTunda.status = 0;
			$scope.kapalTundaSpks[i].pmhTunda.statusPelaksanaan = 0;
			$scope.kapalTundaSpks[i].pmhTunda.statusRevisi = 0;
			$scope.kapalTundaSpks[i].pmhTunda.tundaEkstra = 0;
			$scope.kapalTundaSpks[i].pmhTunda.urutanPermohonan = i + 1;
			i++;
		}

		$scope.spk.tglTunda = moment($scope.tanggalMulaiTunda, "DD-MM-YYYY").format("YYYY-MM-DD") + 'T' + moment($scope.jamMulaiTunda, "HH:mm").format("HH:mm:00");
		$scope.spk.tglPelayananTunda = moment($scope.tanggalMulaiTunda, "DD-MM-YYYY").format("YYYY-MM-DD") + 'T' + moment($scope.jamMulaiTunda, "HH:mm").format("HH:mm:00");


		$scope.spk.assignKapalTundaDTOs = [];
		$scope.spk.assignKapalTundaDTOs[0] = {};

		$scope.spk.assignKapalTundaDTOs[0].pmhTunda = {};
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.detailPmhId = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.id = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.nilaiEpb = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.status = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.statusPelaksanaan = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.statusRevisi = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.tundaEkstra = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.urutanPermohonan = 0;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.kodeLokasiAsal = spk.kodeLokasiTundaAsal;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.kodeLokasiTujuan = spk.kodeLokasiTundaTujuan;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.nama = spk.namaKapal;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.namaLokasiAsal = spk.namaLokasiTundaAsal;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.namaLokasiTujuan = spk.namaLokasiTundaTujuan;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.noPpk1 = spk.noPpk1;
		$scope.spk.assignKapalTundaDTOs[0].pmhTunda.noPpkJasa = spk.noPpkJasaTunda;

		$scope.spk.assignKapalTundaDTOs[0].kapalTundaSpks = $scope.kapalTundaSpks;

		SuratPerintahKerjaTundaAdd.save(spk, function (response) {
			if (response) {
				$scope.setNotification = {
					type: "success", //ex : danger, warning, success, info
					message: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.listSpk();
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			}
		});
	};

		$scope.cancelSpkTunda = function (item) {
		var confirmDelete = confirm('Apakah anda ingin menghapus spk tunda?');
		if (confirmDelete) {
			$scope.findIdReaKapalTunda(item);
			SpkTundaDelete.delete({ nomorSpkTunda: item.nomorSpkTunda }, function (response) {
				if (response.status == '500') {
					$scope.setNotification = {
						type: "warning", //ex : danger, warning, success, info
						message: "Data tidak berhasil dihapus. " + response.description
					};
					Notification.setNotification($scope.setNotification);
				} else {
					$scope.setNotification = {
						type: "success", //ex : danger, warning, success, info
						message: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}
				$scope.listSpk();
			})
		}
	};

	$scope.deleteReaKapalTunda = function(item) {
		DeleteReaKapalTunda.delete({id:item}, function () {
			
		});
	};

	$scope.findIdReaKapalTunda = function (item) {
		ReaKapalTundaByPpkJasa.get({ noPpkJasa: item.noPpkJasa }, function (response) {
			for (var i = 0; i < response.length; i++) {
				if (response[i].kodeKapalTunda == item.kodeKapalTunda) {
					$scope.deleteReaKapalTunda(response[i].id);
					i = response.length;
				}	
			}
		});
	};

	$scope.cancelJasaTunda = function (item) {
		$scope.showModalVALOTH018(item);
		SpkTundaDelete.delete({ noPpkJasa: item.noPpkJasa }, function (response) {
			if (response) {
				$scope.cancelSpk(item);
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			}
		})
		BindEskalasi.setDefaultEskalasi();
	};

	$scope.getTipeEskalasi = function () {
		TipeEskalasiList.get({ size: 999, page: -1, sort: 'escTypeCode,desc' }, function (response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	$scope.getTipeEskalasi();

	$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
		if (dataEsc.valCode === 'VALOTH019') {
			var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
			if (hasEsc) $scope.cancelJasaTunda(item);
		}
	});

	$scope.showModalVALOTH019 = function (item) {
		var
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH019'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALOTH019'),
			statusEskalasi = itemEskalasi.id !== undefined ? true : false;

		var note = {
			hasEsc: statusEskalasi,
			dataEsc: itemEskalasi,
			dataItem: item,
			showNotif: "hide"
		};

		$rootScope.statusEskalasiModal = statusEskalasi;
		$scope.infoVALOTH019 = itemEskalasi.valDesc;
		Notification.setNotification(note);
		$('#modalVALOTH019').modal('show');
	}

  
}]);
