'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ManajementundaPerencanaanCtrl
 * @description
 * # ManajementundaPerencanaanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('PerencanaanTundaCtrl', ['$scope', '$filter', '$timeout', '$routeParams', '$location', '$window', '$rootScope', '$interval', 'KapalTundaList', 'AppParam', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', 'PerencanaanTundaList', 'PerencanaanTundaListOptimized', 'SuratPerintahKerjaTundaAdd', 'SuratPerintahKerjaTundaDetail', 'AturanKapalTundaList', 'MdmDermagaSearchByKode', 'MdmDermagaPerJasa', 'AturanGerakPanduList', 'PermohonanTundaDetail', 'PerencanaanTundaDelete', 'TipeEskalasiList', 'BindEskalasi', 'TipeEskalasi', 'TundaTanpaPanduList', 'TundaTanpaPanduAdd', 'SuratPerintahKerjaTundaList', 'ReaKapalTundaByPpkJasa', 'moment','PenetapanTundaByPpkJasa', function ($scope, $filter, $timeout, $routeParams, $location, $window, $rootScope, $interval, KapalTundaList, AppParam, $PAGE_SIZE, Notification, LoadingScreen, UserRole, PerencanaanTundaList, PerencanaanTundaListOptimized, SuratPerintahKerjaTundaAdd, SuratPerintahKerjaTundaDetail, AturanKapalTundaList, MdmDermagaSearchByKode, MdmDermagaPerJasa, AturanGerakPanduList, PermohonanTundaDetail, PerencanaanTundaDelete, TipeEskalasiList, BindEskalasi, TipeEskalasi, TundaTanpaPanduList, TundaTanpaPanduAdd, SuratPerintahKerjaTundaList, ReaKapalTundaByPpkJasa, moment,PenetapanTundaByPpkJasa) {
	$scope.userRole = UserRole.getCurrentRole();
	$scope.lokasi = localStorage.getItem('namaCabang');
	$scope.kodeCabang = localStorage.getItem('kodeCabang').toString();
	$scope.kodeCabang = $scope.kodeCabang.length < 2 ? '0' + $scope.kodeCabang : $scope.kodeCabang;
	$scope.pageSize = 40;
	$scope.namaKapal = '';
	$scope.ppkJasaTundaOption = [];
	$scope.listKapalTunda = [];
	$scope.spk = {};
	$scope.penetapanTunda = {};
	$scope.arrayOfIdSpkTunda = [];
	$scope.search = {};
	$scope.reaTunda = {};
	$scope.reaTunda.listKapalTunda = [];
	$scope.listPermohonan = [];
	$scope.namaKapal ='';
	$scope.tanggalPandu = $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.tanggalAkhir = $filter('date')(new Date(), "dd-MM-yyyy");
	$scope.spkTunda = {};
	$scope.warning = false;
	$scope.kapalTundaSpks =[];
	
	if ($routeParams.ppk1){
		$scope.noPpk1 =	$routeParams.ppk1;
	} else {
		$scope.noPpk1 = '';
	}
	 
	AppParam.get({nama:'JENIS_GERAKAN'},function(response){
		$scope.jenisGerakanOption = response.content;
	});

	AturanKapalTundaList.get(
		function(response) {
			$scope.aturanKapalTunda = response.content;
			$scope.loadKapal();
		}
	);

	AppParam.get({ nama: 'JENIS_GERAKAN' }, function(response) {
		$scope.parameterJenisGerakan = response.content;
		$scope.parameterJenisGerakan.push("");
	});

	$scope.optionSizePage = {
		availableOptions: [10,20,40,80,160],
		selectedOption: 40 //default select option size
	};

	var setDisableTanggalPandu = function () {
		$('#tanggalPandu').datepicker('setEndDate', $scope.tanggalAkhir);
		$('#tanggalPandu').mask('99-99-9999');
	};

	var setDisableTanggalAkhir = function () {
		$('#tanggalAkhir').datepicker('setStartDate', $scope.tanggalPandu);
		$('#tanggalAkhir').mask('99-99-9999');
	};

	var setDisabletanggalTundaAwal = function() {
		$('#tanggalTundaAwal').datepicker('setEndDate', $scope.tanggalTundaAkhir);
		$('#tanggalTundaAwal').mask('99-99-9999');
	};

	var setDisabletanggalTundaAkhir = function() {
		$('#tanggalTundaAkhir').datepicker('setStartDate', $scope.tanggalTundaAwal);
		$('#tanggalTundaAkhir').mask('99-99-9999');
	};

	$scope.items=[];

	$scope.optionSizePage = {
		availableOptions: [10,20,40,80,160],
		selectedOption: 40 //default select option size
	};

  $scope.$watch('tanggalTundaAwal', function(newValue) {
		$timeout(function() {
			setDisabletanggalTundaAwal();
			setDisabletanggalTundaAkhir();
		}, 100);
	});

	$scope.$watch('tanggalTundaAkhir', function(newValue) {
		$timeout(function() {
			setDisabletanggalTundaAwal();
			setDisabletanggalTundaAkhir();
		}, 100);
	});

	$scope.$watch('tanggalAwal', function (newValue) {
		$timeout(function () {
			setDisableTanggalPandu();
			setDisableTanggalAkhir();
		}, 100);
	});

	$scope.$watch('tanggalPandu', function (newValue) {
		$timeout(function () {
			setDisableTanggalPandu();
			setDisableTanggalAkhir();
		}, 100);
	});
	
	$('#jamMulaiVal').mask('99:99');

	$scope.loadKapal = function(){
		$scope.listKapalTunda = [];
		$scope.listKapalTundaBusy = [];
		KapalTundaList.get({
			size: 999,
			page: -1,
			sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
		}, function(response) {
			response.content.forEach(function(element) {
				if (element.statusOn == true) {
					$scope.listKapalTunda.push({
						kodeKapal: element.kodeKapal,
						namaKapal: element.namaKapal,
						namaStatusKapal: element.namaKapal +' ('+element.statusKapal+')'
					});
				}
				if (element.statusOn == true && element.statusKapal !== 'Idle') {
					$scope.listKapalTundaBusy.push(element.namaKapal + '  -  '  );
				}
			});
		});
	}

	// PAGING
  $scope.currentPage = 1;
	//$scope.pageSize = $scope.optionSizePage.selectedOption.number;
	$scope.totalItems = 0;
	$scope.totalPages = 0;
	$scope.sortBy = '';
	$scope.sortDesc = false;
	
	$scope.changeTanggal = function(){
		//$scope.pageChanged(0);
	};

	$interval(function () { $scope.pageChanged(0); }, 360000);
		
	$scope.pageChanged = function(newPage) {
		var tanggalPandu = moment($scope.tanggalPandu, "DD-MM-YYYY").format("YYYY-MM-DDT00:00:00");
		var tanggalAkhir = moment($scope.tanggalAkhir, "DD-MM-YYYY").add(1, 'days').format("YYYY-MM-DDT00:00:00");

		var param = {}
			param.tglPandu	= tanggalPandu; 
			param.tglAkhir 	= tanggalAkhir; 
			param.size			= $scope.pageSize;
			param.page			= newPage - 1;
			param.namaKapal	= $scope.namaKapal;
			param.noPpk1		= $scope.noPpk1;
			param.sort			= $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'));
		
		if ($scope.namaKapal == '') {
			delete param.namaKapal;
		} 

		if ($scope.noPpk1 == '') {
			delete param.noPpk1;
		}

		LoadingScreen.show();
		$scope.items = [];
		
		PerencanaanTundaListOptimized.get(param,
			function(response) { 
				$scope.showLoader = false;
				$scope.currentPage = response.number + 1;
				$scope.noIndex = ($scope.currentPage-1)*response.size;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.allItems = response.content;
				$scope.items = $scope.allItems;
				$scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;

				$scope.items.forEach(function (data) {
					data.jumlahTunda = 0;
					data.jam = moment(data.jamPelayanan, "HH:mm").format("HH");

					var i = 0;
					while (i < $scope.aturanKapalTunda.length) {
						if (data.loa < $scope.aturanKapalTunda[i].panjangKapalMax && data.loa >= $scope.aturanKapalTunda[i].panjangKapalMin) {
							data.jumlahTunda = $scope.aturanKapalTunda[i].jumlahKapalTunda;
						}
						i++;
					};
				})
			});
		LoadingScreen.hide();
	};

    $scope.pageChanged(0);

	$scope.modalSpk = function(item) {
		$scope.lokasiAsalTemp = "";
		$scope.lokasiTujuanTemp = "";
		$scope.kapalTundaSpks = [];
		SuratPerintahKerjaTundaDetail.get({ noPpkJasa: item.noPpkJasaPandu }, function(response) {
			$scope.spk = response;
			$scope.ppkJasaTundaOption = [];
			$scope.ppkJasaTundaOption.push("PPK Jasa Tunda Baru");
		
			response.listPtpTunda.forEach(function(params) {
				if (params.status != 10){
					$scope.ppkJasaTundaOption.push(params.noPpkJasa);
				}
			})

			$scope.tanggalMulaiTunda = $filter('date')($scope.spk.tglMulai,"dd-MM-yyyy");
			$scope.jamMulaiTunda = $filter('date')($scope.spk.tglMulai,"HH:mm");
		})
	};

	$scope.modalBatal = function (item) {
		SuratPerintahKerjaTundaDetail.get({ noPpkJasa: item.noPpkJasaPandu }, function (response) {
			$scope.spk = response;
			$scope.ppkJasaTundaOption = [];
			
			response.listPtpTunda.forEach(function (params) {
				if (params.status != 10) {
					$scope.ppkJasaTundaOption.push(params.noPpkJasa);
				}
			})
		})
	}


	$scope.cekSpkTunda = function (noPpkJasaTunda) {
		SuratPerintahKerjaTundaList.get({
			noPpkJasa : noPpkJasaTunda,
			noPpk1 : noPpk1
			//added parameter noPpk1 by Nurika above
		}, function (response) {
			if (response.length == 0) {
				return true;
			} else {
				return false;
			}
		});	
	};

	$scope.cekSpkTundaTanpaPandu = function (spk) {
		SuratPerintahKerjaTundaList.get({
			noPpk1: spk.noPpk1,
			noPpkJasa : spk.noPpkJasa
		}, function (response) {
			if (response.length == 0) {
				$("#modalTundaTanpaPandu").modal()
				$scope.modalTundaTanpaPandu(spk);
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "SPK Tunda sudah dibuat"
				};
				Notification.setNotification($scope.setNotification);
				
			}
		});	
	};

	$scope.kirimSpk = function(spk, lokasiAsal, lokasiTujuan ){
		if(typeof lokasiAsal == 'object'){
			spk.kodeLokasiTundaAsal = lokasiAsal.mdmgKode;
			spk.namaLokasiTundaAsal = lokasiAsal.mdmgNama;
		}

		if(typeof lokasiTujuan == 'object'){
			spk.kodeLokasiTundaTujuan = lokasiTujuan.mdmgKode;
			spk.namaLokasiTundaTujuan = lokasiTujuan.mdmgNama;
		}

		var i = 0;

		if ($scope.spk.noPpkJasaTunda == "PPK Jasa Tunda Baru") {
			$scope.spk.noPpkJasaTunda = '';
		}

		while(i < $scope.kapalTundaSpks.length){
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
		
		$scope.spk.tglTunda = moment($scope.tanggalMulaiTunda,"DD-MM-YYYY").format("YYYY-MM-DD")+'T'+moment($scope.jamMulaiTunda,"HH:mm").format("HH:mm:00");
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

		$("#modalAssignTunda").modal("hide");

		$timeout(function () {
			$scope.kirimSpkTunda(spk);
		}, 500);
	};

	$scope.kirimSpkTunda = function (spk) {
		SuratPerintahKerjaTundaAdd.save(spk, function (response) {
			if (response) {
				$scope.setNotification = {
					type: "success", //ex : danger, warning, success, info
					message: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			}
		});
	};

	$scope.modalTundaTanpaPandu = function(item){
		$scope.spkTunda.pmhTunda = {};
		$scope.spkTunda.kapalTundaSpks = [];
		$scope.spkTunda.pmhTunda = item.pmhTunda;
		$scope.spkTunda.pmhTunda.namaKapal = item.namaKapal;
		$scope.spkTunda.pmhTunda.namaAgen = item.namaAgen;
		$scope.dermagaAsal = item.pmhTunda.namaLokasiAsal + ' (' + item.pmhTunda.kodeLokasiAsal +')';
		$scope.dermagaTujuan = item.pmhTunda.namaLokasiTujuan + ' (' + item.pmhTunda.kodeLokasiTujuan + ')';
		$scope.tanggalMulaiTunda =  $filter('date')(item.pmhTunda.tglMulai,'dd-MM-yyyy');
		$scope.jamMulaiTunda = $filter('date')(item.pmhTunda.tglMulai, 'HH:mm');
	};

	$scope.kirimSpkTanpaPandu = function (spkTunda, dermagaAsal, dermagaTujuan, tanggalMulaiTunda, jamMulaiTunda)  {
		if (typeof dermagaAsal == 'object') {
			spkTunda.pmhTunda.kodeLokasiAsal = dermagaAsal.mdmgKode;
			spkTunda.pmhTunda.namaLokasiAsal = dermagaAsal.mdmgNama;
		}

		if (typeof dermagaTujuan == 'object') {
			spkTunda.pmhTunda.kodeLokasiTujuan = dermagaTujuan.mdmgKode;
			spkTunda.pmhTunda.namaLokasiTujuan = dermagaTujuan.mdmgNama;
		}

		spkTunda.pmhTunda.tglMulai = moment($scope.tanggalMulaiTunda, 'DD-MM-YYYY').format('YYYY-MM-DDT') + moment($scope.jamMulaiTunda, 'HH:mm').format('HH:mm:00');

		while (i < spkTunda.kapalTundaSpks.length) {
			var i = 0;
			
			spkTunda.kapalTundaSpks[i].pmhTunda = spkTunda.pmhTunda;
			i++;
		}

		TundaTanpaPanduAdd.save(spkTunda, function (response) {
			if (response) {
				$scope.setNotification = {
					type: "success", //ex : danger, warning, success, info
					message: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			}
		});
	};

	$scope.arrangeKapalTunda = function(item) {
		var i = 0;
		item.kapalTundaSpks.forEach(function(element) {
			element.pmhTunda = {};
			if ($scope.arrayOfIdSpkTunda[i]) {
				element.idSpk = $scope.arrayOfIdSpkTunda[i];
			} else {
				element.idSpk = 0;
			}
		});
	};

	$scope.getDaftarDermaga = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				MdmDermagaSearchByKode.get({
					kode: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				function(response) {
					resolve(response);
					response.forEach(function (response) {
							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
					});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				MdmDermagaPerJasa.get({
					nama: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				function(response) {
					resolve(response);
						response.forEach(function (response) {
							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
					});
				});
			});
		}
	};
		
	/* validasi autocomplete */
	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.validationLookupDermagaAsal = function(item){
		if(valueField !== item){
			$scope.asalTundaValid = true;
			if(typeof item != 'object'){
				$scope.setNotification  = {
					type  : 'warning',
					message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
			Notification.setNotification($scope.setNotification);
			return item = '';
			}
			if(typeof item == 'object'){
				AturanGerakPanduList.get({
					kodeLokasi: item.mdmgKode,
					flagAktif:1
				}, function(response) {
					if(response.content.length>0){
						$scope.asalTundaValid = false;
						$scope.failedMessageAsal = "Asal Tunda tidak boleh dari "+item.mdmgNama;
					}
				});
			}
		}
	}

	$scope.validationLookupDermagaTujuan = function(item){
		if(valueField !== item){
			$scope.tujuanTundavalid = true;
			if(typeof item != 'object'){
				$scope.setNotification  = {
					type  : 'warning',
					message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
			Notification.setNotification($scope.setNotification);
			return item = '';
			}
			if(typeof item == 'object'){
				AturanGerakPanduList.get({
					kodeLokasi: item.mdmgKode,
					flagAktif:1
				}, function(response) {
					if(response.content.length>0){
						$scope.tujuanTundavalid = false;
						$scope.failedMessageTujuan = "Tujuan Tunda tidak boleh menuju "+item.mdmgNama;
					}
				});
			}
			//add validation sama dermaga asal dan tujuan pandu
				//looping jasa tunda 
				for (var i = 1; i < $scope.ppkJasaTundaOption.length; i++) {
					//jasa tunda berdasarkan no pppkjasa
					PenetapanTundaByPpkJasa.get({
						noPpkJasa : $scope.ppkJasaTundaOption[i]
					}, function(response){
						if (response.content) {
							if($scope.lokasiAsalTemp.mdmgKode == response.content[0].kodeLokasiAsal && $scope.lokasiTujuanTemp.mdmgKode == response.content[0].kodeLokasiTujuan){
								$scope.tujuanTundavalid = false;
								$scope.failedMessageTujuan = "Asal dan Tujuan Tunda sama dengan PPKJasa Tunda sebelumnya";
							}
						}
					});
				}
		}
	}
	/*validasi autocomplete*/

	$scope.showToolTip = function() {
		$scope.keterangan = "SPK Pandu belum dibuat";
	};

	$scope.ppkJasaTunda = function(noPpkJasa){
		$scope.warning = false;
		$scope.kapalTundaUnavailable = [];
		$scope.kapalTundaSpks = [];
		if(noPpkJasa == "PPK Jasa Tunda Baru"){
			$scope.lokasiAsalTemp = "";
			$scope.lokasiTujuanTemp = "";
		}else{
			PermohonanTundaDetail.get({noPpkJasa:noPpkJasa},function(response){
				$scope.spk.kodeLokasiTundaAsal = response.kodeLokasiAsal;
				$scope.spk.namaLokasiTundaAsal = response.namaLokasiAsal;
				$scope.spk.kodeLokasiTundaTujuan = response.kodeLokasiTujuan;
				$scope.spk.namaLokasiTundaTujuan = response.namaLokasiTujuan;

				$scope.lokasiAsalTemp = response.namaLokasiAsal +' ('+response.kodeLokasiAsal+')';
				$scope.lokasiTujuanTemp = response.namaLokasiTujuan +' ('+response.kodeLokasiTujuan+')';
			});

			ReaKapalTundaByPpkJasa.get({ noPpkJasa: noPpkJasa }, function (response) {
				$scope.kapalTundaUnavailable = [];
				if (response[0] != undefined) {
					for (var i = 0; i < response.length; i++) {
						$scope.kapalTundaUnavailable.push(response[i].kodeKapalTunda);
					}
				}	
				
			});
		}
	};

	$scope.$watch('kapalTundaSpks', function (newValue) {
		$scope.warning = false;
			if(newValue.length>0) {
				for (var j = 0; j < newValue.length; j++) {
					if ($scope.kapalTundaUnavailable.includes(newValue[j].kodeKapal)) {
						$scope.warning = true;
						$scope.failedListKapal = "Kapal tunda " + newValue[j].namaKapal + "  sudah digunakan dalam jasa tunda ini";
						j = newValue.length;
					}
				}	
			}
	});

		$scope.$watch('spk.noPPKJasaTunda', function (newValue) {
			$scope.spkTundaSudahAda = false;
			if (newValue != 'PPK Jasa Tunda Baru') {
				$scope.spkTundaSudahAda = $scope.cekSpkTunda(newValue);
			}
		});
	
	$scope.listTundaTanpaPandu = function () {
		TundaTanpaPanduList.get({namaKapal:$scope.namaKapal}, function (response) {
			$scope.listPermohonan = response;
		});
	};

	$scope.listTundaTanpaPandu();

	$scope.eskalasiBatalJasaTunda= function (noPpkJasa) {
		$scope.showModalVALOTH019(noPpkJasa);
	}

	$scope.batalJasaTunda = function (noPpkJasa) {
		PerencanaanTundaDelete.delete({ noPpkJasa: noPpkJasa }, function (response) {
			if (response) {
				$scope.setNotification = {
					type: "success", //ex : danger, warning, success, info
					message: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			} else {
				$scope.setNotification = {
					type: "warning", //ex : danger, warning, success, info
					message: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			} 
			BindEskalasi.setDefaultEskalasi();
		})
	};

	$scope.getTipeEskalasi = function () {
		TipeEskalasiList.get({ size: 999, page: -1, sort: 'escTypeCode,desc' }, function (response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	$scope.getTipeEskalasi();

	$scope.$on('eventFromEskalasi', function (event, dataEsc, noPpkJasa) {
		if (dataEsc.valCode === 'VALOTH019') {
			var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
			if (hasEsc) {$scope.batalJasaTunda(noPpkJasa);}
		}
	});

	$scope.showModalVALOTH019= function (item) {
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
		$scope.infoVALOTH019= itemEskalasi.valDesc;
		Notification.setNotification(note);
		$('#modalVALOTH019').modal('show');
	}
}]);
