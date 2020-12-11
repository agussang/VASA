'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiRealisasiTanpaPermohonanCtrl
 * @description
 * # TransaksiRealisasiTanpaPermohonanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiRealisasiTanpaPermohonanCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$filter', '$timeout', 'BindKapal',
	'PermohonanAdd', 'PermohonanAirKapal', 'PermohonanLabuh', 'PermohonanTambat', 'PermohonanTunda',
	'PermohonanPandu', 'PermohonanDetail', 'PermohonanLabuhDetail', 'PermohonanAirKapalDetail', 'PermohonanTambatDetail',
	'PermohonanPanduDetail', 'PermohonanTundaDetail', 'AppParam', 'MdmPelangganSearch', 'MdmPelabuhanSearch', 'MdmDermagaJasa', 'MdmDermagaPerJasa', 'AppParamValue', 'PermohonanAirKapalDelete',
	'PermohonanLabuhDelete', 'PermohonanTambatDelete', 'PermohonanPanduDelete', 'PermohonanTundaDelete', 'PermohonanLabuhEdit',
	'PermohonanAirKapalEdit', 'PermohonanTambatEdit', 'PermohonanPanduEdit', 'PermohonanTundaEdit', 'MdmKapalSearchByName', 'AturanGerakPanduList', 'PermohonanList', 'Notification', 'ListKapalGandeng',
	'AddKapalGandeng', 'DeleteKapalGandeng', 'SearchKapalGandeng', 'MdmKapalSearch', 'PermohonanEdit', 'PermohonanByKodeKapal', 'PermohonanMultiDetail',
	'PermohonanDetailByPpk', 'UserRole', 'LoadingScreen', 'SearchPpk1WithCabang', 'StatusEPBPermohonan', 'PenetapanAirKapal', 'PenetapanLabuh',
	'PenetapanTunda', 'PenetapanTambat', 'PenetapanPandu', 'ConfirmedPenetapan', 'RealisasiLabuh', 'PermohonanUnfinished', 'RealisasiTambat', 'SearchSDMKapal','SearchSDMKapalByCallSign','SearchAlatApung', 'RealisasiPandu',
	'RealisasiTunda', 'AddReaKapalTunda', 'AddReaKapalTundaGandeng','RealisasiAirKapal','RealisasiAirKapalDetailKapalPenunjang','RealisasiAirKapalDetailAlatIsi','RealisasiTundabyPpkJasa','BuildPDF',
	'MdmDermagaSearchByKode','CheckLockAgen','Validations','$http','API_PATH','PmhLayananKapal','DetailByPpk1','HistoryRevisiTambat',
	function($scope, $location, $rootScope, $routeParams, $filter, $timeout, BindKapal,
	  PermohonanAdd, PermohonanAirKapal, PermohonanLabuh, PermohonanTambat, PermohonanTunda,
	  PermohonanPandu, PermohonanDetail, PermohonanLabuhDetail, PermohonanAirKapalDetail, PermohonanTambatDetail,
	  PermohonanPanduDetail, PermohonanTundaDetail, AppParam, MdmPelangganSearch, MdmPelabuhanSearch, MdmDermagaJasa, MdmDermagaPerJasa, AppParamValue, PermohonanAirKapalDelete,
	  PermohonanLabuhDelete, PermohonanTambatDelete, PermohonanPanduDelete, PermohonanTundaDelete, PermohonanLabuhEdit,
	  PermohonanAirKapalEdit, PermohonanTambatEdit, PermohonanPanduEdit, PermohonanTundaEdit, MdmKapalSearchByName, AturanGerakPanduList, PermohonanList, Notification, ListKapalGandeng,
	  AddKapalGandeng, DeleteKapalGandeng, SearchKapalGandeng, MdmKapalSearch, PermohonanEdit, PermohonanByKodeKapal, PermohonanMultiDetail,
	  PermohonanDetailByPpk, UserRole, LoadingScreen, SearchPpk1WithCabang, StatusEPBPermohonan, PenetapanAirKapal, PenetapanLabuh, PenetapanTunda,
	   PenetapanTambat, PenetapanPandu, ConfirmedPenetapan,RealisasiLabuh, PermohonanUnfinished, RealisasiTambat, SearchSDMKapal, SearchSDMKapalByCallSign, SearchAlatApung, 
	   RealisasiPandu, RealisasiTunda, AddReaKapalTunda, AddReaKapalTundaGandeng,RealisasiAirKapal,RealisasiAirKapalDetailKapalPenunjang,RealisasiAirKapalDetailAlatIsi,
	   RealisasiTundabyPpkJasa,BuildPDF,MdmDermagaSearchByKode,CheckLockAgen,Validations,$http,API_PATH,PmhLayananKapal,DetailByPpk1,HistoryRevisiTambat) {

	  LoadingScreen.show();

	  $scope.locationPath = '/transaksi/permohonanlist';
	  document.getElementById("labuhTab").style.display = "none";
	  document.getElementById("tambatTab").style.display = "none";
	  document.getElementById("panduTab").style.display = "none";
	  document.getElementById("tundaTab").style.display = "none";
	  // document.getElementById("airkapalTab").style.display = "none";
	  $scope.tooltipInfo = Notification.setMessageValidFile();

	  $scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	  };

	  $scope.kapalTunda = {};
	  $scope.tabelKapalPenunjang = [];
	  $scope.tabelAlatIsi = [];
	  $scope.kapalTundaGandeng = {};
	  $scope.kapalTundaGandengArray = [];
	  $scope.kapalTundaArray = [];
	  $scope.queueProcess = [];
	  $scope.alertShow = false;
	  $scope.textAlert = [];
	  $scope.iconAlert = '';
	  $scope.permohonan = {};
	  $scope.jasaair = {};
	  $scope.jasalabuh = {};
	  $scope.jasatambat = {};
	  $scope.jasatunda = {};
	  $scope.jasapandu = {};
	  $scope.valueKapal = '';
	  $scope.paramsKemasanBongkar = [];
	  $scope.templabuh = [];
	  $scope.temptambat = [];
	  $scope.temptunda = [];
	  $scope.temppandu = [];
	  $scope.tempair = [];
	  $scope.jasalabuhgrid = {};
	  $scope.jasatambatgrid = {};
	  $scope.jasapandugrid = {};
	  $scope.jasatundagrid = {};
	  $scope.jasaairgrid = {};
	  $scope.editForm = false;
	  $scope.permohonan.btnLabuh = 'active';
	  $scope.gandengBtn = true;
	  $scope.kapalGandeng = {};
	  $scope.kapalGandengArray = [];
	  $scope.kapalGandengUpdateArray = [];
	  $scope.btnSubmit = true;
	  $scope.inputTambahJasa = false;
	  $scope.newJasaSaved = false;
	  $scope.newJasaSavedFromKapal = false;
	  $scope.btnLabuhSave = true;
	  $scope.jasalabuhgridpast = {};
	  $scope.jasatambatgridpast = {};
	  $scope.jasapandugridpast = {};
	  $scope.jasatundagridpast = {};
	  $scope.jasaairgridpast = {};
	  $scope.gridPast = false;
	  $scope.jasaLabuhArray = [];
	  $scope.jasaTambatArray = [];
	  $scope.jasaPanduArray = [];
	  $scope.jasaTundaArray = [];
	  $scope.jasaAirArray = [];

	  //set today datetimepicker
	  $scope.tglSekarang = new Date();
	  $scope.tglMasuk = new Date();
	  $scope.jamMasuk = moment().format('HH:mm');
	  var datePlus10 = new Date();
	  var timePlus1 = new Date();
	  datePlus10.setDate(datePlus10.getDate() + 10);
	  timePlus1.setHours(timePlus1.getHours() + 1);
	  $scope.tglKeluar = datePlus10;
	  $scope.jamKeluar = moment().format('HH:mm');
	  $scope.tglIsi = new Date();
	  $scope.jamIsi = moment().format('HH:mm');
	  $scope.tglMulaiTambat = new Date();
	  $scope.jamMulai = moment().format('HH:mm');
	  $scope.tglSelesaiTambat = new Date();
	  $scope.jamSelesai = moment(timePlus1).format('HH:mm');
	  $scope.tglPandu = new Date();
	  $scope.jamPandu = moment().format('HH:mm');
	  $scope.tglMulaiTunda = new Date();
	  $scope.jamMulaiTunda = moment().format('HH:mm');
	  $scope.tglSelesaiTunda = new Date();
	  $scope.jamSelesaiTunda = moment().format('HH:mm');
	  $scope.jasalabuh.tglSetuju = new Date();
	  $scope.jasalabuh.jamSetuju = moment().format('HH:mm');

	  $scope.jasatambat.tglSetuju = new Date();
	  $scope.jasatambat.jamSetuju = moment().format('HH:mm');
	  $scope.jasatambat.asalDermaga = '0';
	  $scope.jasatambat.kadeAwal = 0;
	  $scope.jasatambat.statusTambat = '1';
	  $scope.jasatambat.posisiKapal = '1';
	  $scope.jasatambat.flagRampdoor = 0;

	  $scope.jasapandu.tglSetuju = new Date();
	  $scope.jasapandu.jamSetuju = moment().format('HH:mm');
	  $scope.jasapandu.lokasiAsal = "";
	  $scope.jasapandu.lokasiTujuan = "";
	  $scope.jasapandu.jenisKep = 'normal';
	  $scope.jasapandu.tglMulai = new Date();
	  $scope.jasapandu.jamMulai = moment().format('HH:mm');
	  $scope.jasapandu.tglSelesai = new Date();
	  $scope.jasapandu.jamSelesai = moment(timePlus1).format('HH:mm');
	  $scope.jasapandu.jamNaik = moment().format('HH:mm');
	  $scope.jasapandu.jamKapalGerak = moment().format('HH:mm');
	  $scope.jasapandu.jamTurun = moment(timePlus1).format('HH:mm');
	  $scope.jasapandu.flagApbs = 0;
	  $scope.lokasiAsalGerakPandu = "";
	  $scope.lokasiTujuanGerakPandu = "";

	  $scope.jasatunda.tglSetuju = new Date();
	  $scope.jasatunda.jamSetuju = moment().format('HH:mm');
	  $scope.jasatunda.tglSelesai = new Date();
	  $scope.jasatunda.jamSelesai = moment(timePlus1).format('HH:mm');
	  $scope.jasatunda.jenisTunda = '1';
	  $scope.kapalTundaGandeng.tglMulai = new Date();
	  $scope.kapalTundaGandeng.jamMulai = moment().format('HH:mm');
	  $scope.kapalTundaGandeng.tglSelesai = new Date();
	  $scope.kapalTundaGandeng.jamSelesai = moment().format('HH:mm');

	  $scope.jasaair.tglIsi = new Date();
	  $scope.jasaair.jamIsi = moment().format('HH:mm');
	  $scope.jasaair.tglSetuju = new Date();
	  $scope.jasaair.jamSetuju = moment().format('HH:mm');
	  $scope.jasaair.tglSelesaiIsi = new Date();
	  $scope.jasaair.jamSelesaiIsi = moment(timePlus1).format('HH:mm');
	  $scope.tempNewAlatIsi = {};
	  $scope.tempNewAlatIsi.tglMulai = new Date();
	  $scope.tempNewAlatIsi.jamMulai = moment().format('HH:mm');
	  $scope.tempNewAlatIsi.tglSelesai = new Date();
	  $scope.tempNewAlatIsi.jamSelesai = moment().format('HH:mm');
	  $scope.tempNewKapalPenunjang = {};
	  $scope.tempNewKapalPenunjang.tglMulai = new Date();
	  $scope.tempNewKapalPenunjang.jamMulaiIsi = moment().format('HH:mm');
	  $scope.tempNewKapalPenunjang.tglSelesai = new Date();
	  $scope.tempNewKapalPenunjang.jamSelesai = moment().format('HH:mm');

	  $scope.btnMainSimpan = false;
	  $scope.afterSubmit = false;
	  $scope.agentChanged = false;
	  $scope.jasatunda.jamKerja = 1;
	  $scope.jasaair.jamKerja = 1;
	  $scope.showLoader = false;
	  $scope.loaMaxvalue = 0;
	  $scope.loaMax = false;
	  $scope.kodeKade = '+';
	  $scope.jasatambat.kadeAkhir = 0;

	  $scope.arrayJasa = [];
	  
	  var kapalWajibPandu = false;
	  var checkunique = [];
	  var checkPastLabuh = [];
	  var checkPastTambat = [];
	  var checkPastPandu = [];
	  var checkPastTunda = [];
	  var checkPastAir = [];	  
	  var valueField = '';

	  	var formatSeparator = function(input) {
			input = parseFloat(input);
			input = input.toFixed(input % 1 === 0 ? 0 : 2);
			return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		};

		$scope.checkValue = function(value) {
			valueField = value;
		}

		$scope.loaValue = function() {
			var loaKapal = $scope.permohonan.loa ? $scope.permohonan.loa : $scope.valueKapal.mkplLoa;
			var kadeAwal = $('#kade-awal').val();
			if(kadeAwal > $scope.maxKadeMeter){
			  	$scope.jasatambat.kadeAwal = 0;
			  	$scope.jasatambat.kadeAkhir = 0;
			}else{
				$scope.jasatambat.kadeAkhir = eval(parseInt($scope.jasatambat.kadeAwal) + $scope.kodeKade + parseInt(loaKapal));
			 	if(isNaN($scope.jasatambat.kadeAkhir)){
			 		$scope.jasatambat.kadeAkhir = 0;
			 	}
			}
		};

		$scope.$watch('kodeKade',function(newValue,oldValue){
	 		if(newValue != oldValue){
	 			$scope.loaValue();
	 		}
	 	})

	  $scope.checkIfNull = function() {
		if ($scope.jasatambat.kadeAwal == null) {
		  $scope.jasatambat.kadeAwal = 0;
		}
	  };

	  $scope.validationLookupPpk1 = function() {
		if (valueField !== $scope.permohonan) {
		  if (typeof $scope.permohonan != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.permohonan = {};
			$routeParams.kodeKapal = null;
		  } 
		  else {
			$routeParams.kodeKapal = $scope.permohonan.kodeKapal;
			var ppk1 = $scope.permohonan.noPpk1;
			PermohonanList.get({
			  noPpk1: ppk1
			}, function(response) {
			  $scope.permohonan = response.content[0]; 
			  $scope.inputTambahJasa = true;
			  rulesKapalWajibPandu();
			});
		  }
		}
	  }

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

	  	$scope.$watch('permohonan', function(newValue, oldValue) {
		  	if(typeof oldValue == 'object'){
			  	if(newValue != oldValue){ 
					if($scope.permohonan.id){
					  getPastJasa($scope.permohonan.noPpk1);
					}	  		
			  	}	  		
			  }
	  	});

	  $scope.$watch('jasatambat.lokasi', function(){
		var loaKapal = $scope.permohonan.loa ? $scope.permohonan.loa : $scope.valueKapal.mkplLoa;
		if(typeof $scope.jasatambat.lokasi==='object'){
		  $scope.maxKadeMeter = $scope.jasatambat.lokasi.mdmgPanjang-loaKapal;
		  if($scope.jasatambat.lokasi.mdmgPanjang<loaKapal){
			$scope.setNotification  = {
			  type    : 'warning',
			  message : 'Panjang Dermaga ('+$scope.jasatambat.lokasi.mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m)'
			};
			Notification.setNotification($scope.setNotification);
			// $scope.jasatambat.kadeAwal = 0;
		  }
		  // console.log("-----------Keterangan maksimal kade-------------");
		  // console.log("Panjang Loa : "+loaKapal);
		  // console.log("Panjang Dermaga : "+$scope.jasatambat.lokasi.mdmgPanjang);
		  // console.log("Maksimal Kade : "+$scope.maxKadeMeter);
		}
	  });

	  /* Validation */
	  $scope.validationLookupLokasiTambat = function() {
		if (valueField !== $scope.jasatambat.lokasi) {
		  if (typeof $scope.jasatambat.lokasi != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-007</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasatambat.lokasi = '';
		  }
		}
	  }

	  $scope.validationLookupNewAlatApung = function() {
		if ($scope.valueField !== $scope.tempNewKapalPenunjang.kapalPenunjang) {
		  if (typeof $scope.tempNewKapalPenunjang.kapalPenunjang != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.tempNewKapalPenunjang.kapalPenunjang = '';
		  }
		}
	  }

	  $scope.validationLookupKapal = function() {
		if (valueField !== $scope.valueKapal) {
		  if (typeof $scope.valueKapal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.valueKapal = '';
		  } else {
			$http.get(API_PATH+'permohonan/check_id_visit/kode_kapal/'+$scope.valueKapal.mkplKode)
			.success(function (response) {
				if(response == true){
					PmhLayananKapal.get({kodeKapal : $scope.valueKapal.mkplKode},function(response){			
						if(response.flagDone == 1){
							$scope.permohonan = response;
							$scope.newJasaSaved	= true;
							$scope.permohonan.idVisit = response.idVisit;
							$scope.permohonan.noPpk1 = response.noPpk1;
							$scope.permohonan.kodeKapal = response.kodeKapal;
							$scope.permohonan.namaKapal = response.namaKapal;
							$scope.permohonan.kodePelabuhanAsal = response.kodePelabuhanAsal;
							$scope.permohonan.namaPelabuhanAsal = response.namaPelabuhanAsal;
							$scope.permohonan.kodePelabuhanTujuan = response.kodePelabuhanTujuan;
							$scope.permohonan.namaPelabuhanTujuan = response.namaPelabuhanTujuan;
							$scope.permohonan.kodeAgen = response.kodeAgen;
							$scope.permohonan.namaAgen = response.namaAgen;
							$scope.permohonan.sifatKunjungan = response.sifatKunjungan;
							$scope.permohonan.kemasanBongkar = response.kemasanBongkar;
							$scope.permohonan.jumlahBongkar = response.jumlahBongkar;
							$scope.permohonan.satuanBongkar = response.satuanBongkar;
							$scope.permohonan.kemasanMuat = response.kemasanMuat;
							$scope.permohonan.jumlahMuat = response.jumlahMuat;
							$scope.permohonan.satuanMuat = response.satuanMuat;
							$scope.permohonan.jenisKapal = $scope.valueKapal.mkplJenis;
							$scope.permohonan.negaraKapal = $scope.valueKapal.mkplBendera;
							$scope.permohonan.callSign = $scope.valueKapal.mkplCallSign;
							$scope.permohonan.loa = $scope.valueKapal.mkplLoa;
							$scope.permohonan.gtKapal = $scope.valueKapal.mkplGrt;

							$routeParams.kodeKapal = $scope.permohonan.kodeKapal;
							//getPastJasa($scope.permohonan.noPpk1);
					  		rulesKapalWajibPandu();
						}
					});

				}else{
					//do nothing
				}
			});

		  }
		}
	  }
	  $scope.validationLookupAgen = function() {
		if (valueField !== $scope.permohonan.namaAgen) {
		  if (typeof $scope.permohonan.namaAgen != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-001</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.permohonan.namaAgen = '';
		  }
		}
	  }
	  $scope.validationLookupAsal = function() {
		if (valueField !== $scope.permohonan.namaPelabuhanAsal) {
		  if (typeof $scope.permohonan.namaPelabuhanAsal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-002</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.permohonan.namaPelabuhanAsal = '';
		  }
		}
	  }
	  $scope.validationLookupTujuan = function() {
		if (valueField !== $scope.permohonan.namaPelabuhanTujuan) {
		  if (typeof $scope.permohonan.namaPelabuhanTujuan != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-003</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.permohonan.namaPelabuhanTujuan = '';
		  }
		}
	  }

	  $scope.validationLookupLokasiLabuh = function() {
		if (valueField !== $scope.jasalabuh.lokasi) {
		  if (typeof $scope.jasalabuh.lokasi != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-005</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasalabuh.lokasi = '';
		  }
		}
	  }

	  $scope.validationLookupAsalPandu = function() {
		if (valueField !== $scope.jasapandu.lokasiAsal) {
		  if (typeof $scope.jasapandu.lokasiAsal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasapandu.lokasiAsal = '';
		  }
		}
	  }

	  $scope.validationLookupTujuanPandu = function() {
		if (valueField !== $scope.jasapandu.lokasiTujuan) {
		  if (typeof $scope.jasapandu.lokasiTujuan != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-009</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasapandu.lokasiTujuan = '';
		  }
		}
	  }

	  $scope.validationLookupAsalTunda = function() {
		if (valueField !== $scope.jasatunda.lokasiAsal) {
		  if (typeof $scope.jasatunda.lokasiAsal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-012</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasatunda.lokasiAsal = '';
		  }
		}
	  }

	  $scope.validationLookupTujuanTunda = function() {
		if (valueField !== $scope.jasatunda.lokasiTujuan) {
		  if (typeof $scope.jasatunda.lokasiTujuan != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-012</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasatunda.lokasiTujuan = '';
		  }
		}
	  }

	  $scope.validationLookupDermagaAir = function() {
		if (valueField !== $scope.jasaair.dermaga) {
		  if (typeof $scope.jasaair.dermaga != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-013</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasaair.dermaga = '';
		  }
		}
	  }

	  $scope.validationLookupKapalGandeng = function() {
		if (valueField !== $scope.kapalGandeng.kapal) {
		  if (typeof $scope.kapalGandeng.kapal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.kapalGandeng.kapal = '';
		  }
		}
	  }

	  $scope.validationLookupKapalTunda = function() {
		if (valueField !== $scope.kapalTunda.kapal) {
		  if (typeof $scope.kapalTunda.kapal != 'object') {
			$scope.setNotification = {
			  type: 'warning',
			  message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.kapalTunda.kapal = '';
		  }
		}
	  }

	  $scope.validationLookupKapalTender = function(){
		if(valueField !== $scope.jasatambat.kapalTender){
		  if(typeof $scope.jasatambat.kapalTender != 'object'){
			$scope.setNotification  = {
			  type  : 'warning',
			  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasatambat.kapalTender = '';
		  }
		}
	  }

	  $scope.validationLookupPetugas = function(){
		if(valueField !== $scope.jasapandu.namaPandu){
		  if(typeof $scope.jasapandu.namaPandu != 'object'){
			$scope.setNotification  = {
			  type  : 'warning',
			  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasapandu.namaPandu = '';
		  }
		}
	  }

	  $scope.validationLookupKapalPandu = function(){
		if(valueField !== $scope.jasapandu.kapalPandu){
		  if(typeof $scope.jasapandu.kapalPandu != 'object'){
			$scope.setNotification  = {
			  type  : 'warning',
			  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.jasapandu.kapalPandu = '';
		  }
		}
	  }
	  /* End Validation */

	  $scope.backToList = function() {
		$location.path($scope.locationPath);
	  };

	  /* Fungsi Tunda */
	  $scope.submitKapalTunda = function() {
		var temp = $scope.kapalTunda.kapal;
		var kapalInfo = {};
		$scope.kapalTunda.kapal = '';
		if (checkunique.indexOf(temp.noRegistrasi) === -1) {
		  checkunique.push(temp.noRegistrasi);
		  kapalInfo.kodeKapalTunda = temp.noRegistrasi;
		  kapalInfo.namaKapalTunda = temp.nama;
		  $scope.kapalTundaArray.push(kapalInfo);
		  // if ($scope.itemSelected.length > 0) {
		  //   $scope.kapalTundaUpdateArray.push(kapalInfo);
		  // }
		  $('#kplTundaModal').modal('hide');
		} else if (checkunique.indexOf(temp.noRegistrasi) > -1) {
		  $('#kplTundaModal').modal('hide');
		  $scope.setNotification = {
			type: 'warning',
			message: 'Kapal ' + temp.nama + ' sudah dientry. <br> Silahkan Masukan Nama Kapal Lain.'
		  };
		  Notification.setNotification($scope.setNotification);
		  $scope.kapalTunda.kapal = '';
		}
	  }

	  $scope.deleteKapalTundaView = function(i) {
		var checkDeleteTunda = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteTunda) {
		  $scope.kapalTundaArray.splice(i, 1);
		  // if ($scope.itemSelected.length > 0) {
		  //   $scope.kapalTundaUpdateArray.splice(i, 1);
		  // }
		}
	  }

	  $scope.deleteKapalTunda = function(idKapalTunda, i) {
		var checkDeleteTunda = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteTunda) {
		  DeleteReaKapalTunda.delete({
			id: idKapalTunda
		  }, function(response) {
			if (response.status !== '500') {
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			  $scope.kapalTundaArray.splice(i, 1);
			} else {
			  $scope.setNotification = {
				type: "danger",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			$scope.setNotification = {
			  type: "danger",
			  message: "Data tidak berhasil dihapus"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  }

	  $scope.submitKapalTundaGandeng = function() {
		var tempAsal = $scope.kapalTundaGandeng.namaLokasiAsal;
		var tempTujuan = $scope.kapalTundaGandeng.namaLokasiTujuan;
		var kapalInfo = {};
		kapalInfo.kodeLokasiAwal = tempAsal.mdmgKode;
		kapalInfo.namaLokasiAwal = tempAsal.mdmgNama;
		kapalInfo.kodeLokasiTujuan = tempTujuan.mdmgKode;
		kapalInfo.namaLokasiTujuan = tempTujuan.mdmgNama;
		kapalInfo.jenisKegiatan = $scope.kapalTundaGandeng.jenisKegiatan;
		AppParamValue.get({
		  nama: 'JENIS_KEG_TUNDA',
		  value: $scope.kapalTundaGandeng.jenisKegiatan
		}, function(response) {
		  $scope.kapalTundaGandeng.jenisKegiatanText = response[0].caption;
		  kapalInfo.jenisKegiatanText = $scope.kapalTundaGandeng.jenisKegiatanText;
		});
		var jamMulai = document.getElementById('jamKGTundaMulai').querySelector('input').value;
		var jamSelesai = document.getElementById('jamKGTundaSelesai').querySelector('input').value;
		kapalInfo.tglMulai = $filter('date')($scope.kapalTundaGandeng.tglMulai, 'yyyy-MM-dd') + 'T' + jamMulai;
		kapalInfo.tglSelesai = $filter('date')($scope.kapalTundaGandeng.tglSelesai, 'yyyy-MM-dd') + 'T' + jamSelesai;
		$scope.kapalTundaGandengArray.push(kapalInfo);
		// if ($scope.itemSelected.length > 0) {
		//   $scope.kapalTundaGandengUpdateArray.push(kapalInfo);
		// }
		$scope.kapalTundaGandeng.kapal = '';
	  }

	  $scope.deleteKapalTundaGandengView = function(i) {
		var checkDeleteTundaGandeng = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteTundaGandeng) {
		  $scope.kapalTundaGandengArray.splice(i, 1);
		  if ($routeParams.id != null) {
			$scope.kapalTundaGandengUpdateArray.splice(i, 1);
		  }
		}
	  }

	  $scope.deleteKapalTundaGandeng = function(idKapalTunda, i) {
		  var checkDeleteTundaGandeng = confirm('Apakah Anda akan Menghapus data ini?');
		  if (checkDeleteTundaGandeng) {
			DeleteReaKapalTundaGandeng.delete({
			  id: idKapalTunda
			}, function(response) {
			  if (response.status !== '500') {
				$scope.setNotification = {
				  type: "success",
				  message: "Data berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
				$scope.kapalTundaArray.splice(i, 1);
			  } else {
				$scope.setNotification = {
				  type: "danger",
				  message: "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			  }
			  $scope.kapalTundaGandengArray.splice(i, 1);
			}, function() {
			  $scope.setNotification = {
				type: "danger",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			});
		  }
		}
		/* End Fungsi Tunda */

	  /* Fungsi Air Kapal */
	  $scope.deleteAlatIsiView = function(i) {
		var checkDeleteAlatIsi = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteAlatIsi) {
		  // $scope.rightSelection.volume = parseInt($scope.rightSelection.volume) - parseInt($scope.tabelAlatIsi[i].volume);
		  $scope.tabelAlatIsi.splice(i, 1);
		}
	  }

	  $scope.deleteKapalPenunjangView = function(i) {
		var checkDeleteKapalPenunjang = confirm('Apakah anda ingin menghapus data?');
		if (checkDeleteKapalPenunjang) {
		  $scope.tabelKapalPenunjang.splice(i, 1);
		}
	  }

	  $scope.submitAlatIsiBaru = function() {
		var temp = $scope.tempNewAlatIsi;
		temp.alatIsi = temp.alatIsiAir.value;
		temp.alatIsiText = temp.alatIsiAir.caption;
		var tglMasukVal = $filter('date')(temp.tglMulai, 'yyyy-MM-dd');
		temp.tglMulaiIsi = tglMasukVal + 'T' + temp.jamMulai;
		var tglSelesaiVal = $filter('date')(temp.tglSelesai, 'yyyy-MM-dd');
		temp.tglSelesaiIsi = tglSelesaiVal + 'T' + temp.jamSelesai;
		temp.meteranAwal = temp.mAwal;
		temp.meteranAkhir = temp.mAkhir;
		temp.volume = parseInt(temp.mAkhir) - parseInt(temp.mAwal);
		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulaiIsi = Date.parse(temp.tglMulaiIsi);
		var parseTglSelesaiIsi = Date.parse(temp.tglSelesaiIsi);
		if(parseTglMulaiIsi>=parseTglSelesaiIsi){
		  var note =  {
				  type  : "warning",
				  message : "Data tidak berhasil disimpan,<br>Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		$scope.tabelAlatIsi.push(temp);
		$scope.tempNewAlatIsi = {};
		$scope.tempNewAlatIsi.tglMulai = new Date();
		$scope.tempNewAlatIsi.jamMulai = moment().format('HH:mm');
		$scope.tempNewAlatIsi.tglSelesai = new Date();
		$scope.tempNewAlatIsi.jamSelesai = moment().format('HH:mm');
	  }

	  $scope.$watch('tabelAlatIsi.length', function() {
		var vlm = 0;
		$scope.tabelAlatIsi.forEach(function(item) {
		  vlm += item.volume;
		});
		$scope.jasaair.volume = vlm;
	  });

	  $scope.submitKapalPenunjangBaru = function() {
		  var temp = $scope.tempNewKapalPenunjang;
		  temp.kapalText = $scope.tempNewKapalPenunjang.kapalPenunjang.nama;
		  temp.kapal = $scope.tempNewKapalPenunjang.kapalPenunjang.noRegistrasi;
		  temp.tglMulaiIsi = $filter('date')($scope.tempNewKapalPenunjang.tglMulai, 'yyyy-MM-dd') + 'T' + $scope.tempNewKapalPenunjang.jamMulaiIsi;
		  temp.tglSelesaiIsi = $filter('date')($scope.tempNewKapalPenunjang.tglSelesai, 'yyyy-MM-dd') + 'T' + $scope.tempNewKapalPenunjang.jamSelesai;
		  // start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		  var parseTglMulaiIsi = Date.parse(temp.tglMulaiIsi);
		  var parseTglSelesaiIsi = Date.parse(temp.tglSelesaiIsi);
		  if(parseTglMulaiIsi>=parseTglSelesaiIsi){
			var note =  {
					type  : "warning",
					message : "Data tidak berhasil disimpan,<br>Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai<br><br>Kode validasi: <b>VALPMH-020</b>"
				  };
			Notification.setNotification(note);
			return false;
		  }
		  // end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		  $scope.tabelKapalPenunjang.push(temp);
		  $scope.tempNewKapalPenunjang = {};
		  $scope.tempNewKapalPenunjang.tglMulai = new Date();
		  $scope.tempNewKapalPenunjang.jamMulaiIsi = moment().format('HH:mm');
		  $scope.tempNewKapalPenunjang.tglSelesai = new Date();
		  $scope.tempNewKapalPenunjang.jamSelesai = moment().format('HH:mm');
		}
		/* End Fungsi Air Kapal */

	  $scope.$watch('valueKapal', function() {
		if ($scope.valueKapal != null) {
		  if ($scope.valueKapal.gantiAgen) {
			$scope.permohonan.namaKapal = $scope.valueKapal.namaKapal;
			$scope.permohonan.kodePelabuhanAsal = $scope.valueKapal.kodePelabuhanAsal;
			$scope.permohonan.namaPelabuhanAsal = $scope.valueKapal.namaPelabuhanAsal;
			$scope.permohonan.kodePelabuhanTujuan = $scope.valueKapal.kodePelabuhanTujuan;
			$scope.permohonan.namaPelabuhanTujuan = $scope.valueKapal.namaPelabuhanTujuan;
			$scope.permohonan.sifatKunjungan = $scope.valueKapal.sifatKunjungan;
			$scope.permohonan.kemasanBongkar = $scope.valueKapal.kemasanBongkar;
			$scope.permohonan.jumlahBongkar = $scope.valueKapal.jumlahBongkar;
			$scope.permohonan.satuanBongkar = $scope.valueKapal.satuanBongkar;
			$scope.permohonan.kemasanMuat = $scope.valueKapal.kemasanMuat;
			$scope.permohonan.jumlahMuat = $scope.valueKapal.jumlahMuat;
			$scope.permohonan.satuanMuat = $scope.valueKapal.satuanMuat;
			$scope.valueKapal.mkplKode = $scope.valueKapal.kodeKapal;
			$scope.valueKapal.mkplNama = $scope.permohonan.namaKapal;
			$scope.agentChanged = true;
		  } else {
			$scope.permohonan.namaKapal = $scope.valueKapal.mkplNama;
			$scope.permohonan.kodeKapal = $scope.valueKapal.mkplKode;
			$scope.permohonan.jenisKapal = $scope.valueKapal.mkplJenis;
			/* dicoment dahulu ya, karena seharusnya ini tidak dieksekusi pada watch valueKapal
			if ($scope.valueKapal.mkplJenis === 'KPLTUNDA') {
			  $scope.gandengBtn = false;
			}
			if ($scope.valueKapal.mkplJenis === 'KPLTONKANG') {
			  document.getElementById("panduTab").style.display = "none";
			  document.getElementById("tundaTab").style.display = "none";
			  document.getElementById("airkapalTab").style.display = "none";
			} else if ($scope.valueKapal.mkplJenis === 'KPLTNKGMSN') {
			  document.getElementById("panduTab").style.display = "block";
			  document.getElementById("tundaTab").style.display = "block";
			  document.getElementById("airkapalTab").style.display = "none";
			}
			*/

			if ($scope.valueKapal.mkplGrtl > 500) {
			  if ($scope.jasapandugrid < 1) {
				$scope.jasapandu.jenisGerakan = '1';
			  }
			}
		  }

		}
	  });

	  $scope.$watch('tglMasuk', function() {
		$timeout(function() {
		  setDisableDateLabuh();
		}, 1000);
	  });

	  $scope.$watch('jamPandu', function() {
		$scope.jasatunda.jamMulai = $scope.jamPandu;
	  });

	  $scope.$watch('tglKeluar', function() {
		$timeout(function() {
		  setDisableDateLabuh();
		}, 1000);
	  });

	  $scope.$watch('tglMulaiTambat', function() {
		$timeout(function() {
		  setDisableDateTambat();
		}, 1000);
	  });

	  $scope.$watch('tglSelesaiTambat', function() {
		$timeout(function() {
		  setDisableDateTambat();
		}, 1000);
	  });

	  $scope.$watch('tglPandu', function() {
		$('#tglPandu').mask('99-99-9999');
		$scope.tglMulaiTunda = new Date($scope.tglPandu);
	  });

	  $scope.$watch('tglMulaiTunda', function() {
		$('#tglMulaiTunda').mask('99-99-9999');
	  });

	  $scope.$watch('tglIsi', function() {
		$('#tglIsiAirKapal').mask('99-99-9999');
	  });

	  var setDisableDateLabuh = function() {
		$('#labuhTglKeluar').datepicker('setStartDate', $scope.tglMasuk);
		$('#labuhTglMasuk').mask('99-99-9999');
		$('#labuhTglKeluar').mask('99-99-9999');
	  }

	  var setDisableDateTambat = function() {
		$('#tglSelesaiTambat').datepicker('setStartDate', $scope.tglMulaiTambat);
		$('#tglMulaiTambat').mask('99-99-9999');
		$('#tglSelesaiTambat').mask('99-99-9999');
	  }

	  var setDisableDatePandu = function() {
		$('#tglSelesaiPandu').datepicker('setStartDate', $scope.jasapandu.tglMulai);
		$('#tglMulaiPandu').mask('99-99-9999');
		$('#tglSelesaiPandu').mask('99-99-9999');
	  }

	  $scope.$watch('jasapandu.tglMulai', function() {
		$timeout(function() {
		  setDisableDatePandu();
		}, 1000);
	  });

	  $scope.$watch('jasapandu.tglSelesai', function() {
		$timeout(function() {
		  setDisableDatePandu();
		}, 1000);
	  });

	  var setDisableDateTunda = function() {
		$('#tglSelesaiTunda').datepicker('setStartDate', $scope.tglMulaiTunda);
		$('#tglMulaiTunda').mask('99-99-9999');
		$('#tglSelesaiTunda').mask('99-99-9999');
	  }

	  $scope.$watch('tglMulaiTunda', function() {
		$timeout(function() {
		  setDisableDateTunda();
		}, 1000);
	  });

	  $scope.$watch('tglSelesaiTunda', function() {
		$timeout(function() {
		  setDisableDateTunda();
		}, 1000);
	  });

	  var setDisableDateAirKapal = function() {
		$('#tglSelesaiAirKapal').datepicker('setStartDate', $scope.jasaair.tglIsi);
		$('#tglIsiAirKapal').mask('99-99-9999');
		$('#tglSelesaiAirKapal').mask('99-99-9999');
	  }

	  $scope.$watch('jasaair.tglIsi', function() {
		$timeout(function() {
		  setDisableDateAirKapal();
		}, 1000);
	  });

	  $scope.$watch('jasaair.tglSelesaiIsi', function() {
		$timeout(function() {
		  setDisableDateAirKapal();
		}, 1000);
	  });

	  /*
	  //set field dok Kesepakatan mandatory if jenisTunda = tundaGendong
	  $scope.isTundaGendong = false;
	  $scope.$watch('jasatunda.jenisTunda',function(newValue){
		$timeout(function() {
		  if (newValue == 4) {
			$scope.isTundaGendong = true;
		  } else {
			$scope.isTundaGendong = false;
		  }
		}, 1000);
	  });
	  */

	  //event from Lokasi Asal Pandu
	  $scope.$watch('jasapandu.lokasiAsal.mdmgKode', function() {
		if ($scope.jasapandu.lokasiAsal !== undefined) {
		  AturanGerakPanduList.get({
			kodeLokasi: $scope.jasapandu.lokasiAsal.mdmgKode,
			namaLokasi: $scope.jasapandu.lokasiAsal.mdmgNama,
			flagAktif: 1
		  }, function(response) {
			$scope.lokasiAsalGerakPandu = response.content;
			$scope.changedJenisGerakan();
		  });
		  //set jasa tunda lokasi asal
		  $scope.jasatunda.lokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
		  $scope.jasatunda.kodeLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgKode;
		  $scope.jasatunda.namaLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
		}
	  }, true);

	  //event from Lokasi Tujuan Pandu
	  $scope.$watch('jasapandu.lokasiTujuan.mdmgKode', function() {
		if ($scope.jasapandu.lokasiTujuan !== undefined) {
		  AturanGerakPanduList.get({
			kodeLokasi: $scope.jasapandu.lokasiTujuan.mdmgKode,
			namaLokasi: $scope.jasapandu.lokasiTujuan.mdmgNama,
			flagAktif: 1
		  }, function(response) {
			$scope.lokasiTujuanGerakPandu = response.content;
			$scope.changedJenisGerakan();
		  });
		  //set jasa tunda lokasi tujuan
		  $scope.jasatunda.lokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
		  $scope.jasatunda.kodeLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgKode;
		  $scope.jasatunda.namaLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
		}
	  }, true);

	  //function change jenis gerakan
	  $scope.changedJenisGerakan = function() {
		if ($scope.lokasiAsalGerakPandu.length > 0 && $scope.lokasiTujuanGerakPandu.length === 0) {
		  $scope.jasapandu.jenisGerakan = '1';
		} else if ($scope.lokasiTujuanGerakPandu.length > 0 && $scope.lokasiAsalGerakPandu.length === 0) {
		  $scope.jasapandu.jenisGerakan = '3';
		} else {
		  $scope.jasapandu.jenisGerakan = '2';
		}
	  };

	  //get parameter Sifat Kunjungan
	  AppParam.get({
		nama: 'KUNJUNGAN'
	  }, function(response) {
		$scope.sifatKunjungan = $filter('orderBy')(response.content,'value');
		$scope.permohonan.sifatKunjungan = $scope.sifatKunjungan[0].value;
	  });

	  //get parameter kemasan
	  AppParam.get({
		nama: 'KEMASAN'
	  }, function(response) {
		$scope.kemasan = response.content;
	  });

	  //get parameter satuan
	  AppParam.get({
		nama: 'SATUAN'
	  }, function(response) {
		$scope.satuan = response.content;
	  });

	  //get jenis pandu
	  AppParam.get({
		nama: 'JENIS_PANDU'
	  }, function(response) {
		$scope.jenisPanduOption = response.content;
		$scope.jasapandu.jenisPandu = $scope.jenisPanduOption[0].value;
	  });

	  //get jenis pandu
	  AppParam.get({
		nama: 'JENIS_GERAKAN'
	  }, function(response) {
		$scope.jenisGerakanOption = response.content;
	  });

	  //get alat air
	  AppParam.get({
		nama: 'ALAT_ISI_AIR'
	  }, function(response) {
		$scope.alatIsiAir = response.content;
	  });

	  AppParam.get({
		nama: 'SATUAN_AIR_KAPAL'
	  }, function(response) {
		$scope.satuanAirKapal = response.content;
	  });

	  //get parameter posisi kapal
	  AppParam.get({
		nama: 'POSISI_KAPAL'
	  }, function(response) {
		$scope.posisiKapal = response.content;
	  });

	  //get asal dermaga tambat
	  AppParam.get({
		nama: 'ASAL_DERMAGA_TAMBAT'
	  }, function(response) {
		$scope.asalDermagaTambat = response.content;
	  });

	  //get status tambat
	  AppParam.get({
		nama: 'STATUS_TAMBAT'
	  }, function(response) {
		$scope.statusTambat = response.content;
	  });

	  // get jenis kepentingan
	  AppParam.get({
		nama: 'JENIS_KEPENTINGAN'
	  }, function(response) {
		$scope.jenisKepentingan = response.content;
	  });

	  // get jenis kegiatan tunda
	  AppParam.get({
		nama: 'JENIS_KEG_TUNDA'
	  }, function(response) {
		$scope.jenisKegTunda = response.content;
	  });

	  //get jam kerja
	  AppParam.get({
		nama: 'JAM_KERJA'
	  }, function(response) {
		$scope.jamKerja = response.content;
	  });


	  AppParam.get({
		nama: 'JENIS_KEGIATAN'
	  }, function(response) {
		$scope.jenisKegiatan = response.content;
	  });

	AppParam.get({nama:'KENDALA_OPERASIONAL'},function(response){
		$scope.kendalaOperasionalOption = response.content;
	});

	  $scope.$watch('tglPandu', function() {
		$scope.tglMulaiTunda = $scope.tglPandu;
	  });

	  $scope.changeTime = function() {
		$scope.jasatunda.jamMulai = document.getElementById('jamPanduVal').value;
	  }

	  $scope.btnKapalTundaGandeng = function() {
		if ($scope.jasatunda.jenisTunda !== '1') {
		  $scope.tundaGandengGrid = true;
		} else {
		  $scope.tundaGandengGrid = false;
		}
	  }

	  //set field dok Kesepakatan mandatory if jenisTunda = tundaGendong
	  $scope.isTundaGendong = false;
	  $scope.$watch('jasatunda.jenisTunda',function(newValue){
		$timeout(function() {
		  if (newValue == 4) {
			$scope.isTundaGendong = true;
		  } else {
			$scope.isTundaGendong = false;
		  }
		}, 1000);
	  });

	  var rulesKapalWajibPandu = function() {
		$scope.$watch('permohonan.gtKapal', function() {
		  if ($scope.permohonan.gtKapal >= 500) {
			$scope.$watch('jasapandugrid', function() {
			  if ($scope.jasapandugrid.length < 1) {
				// PMH-02
				$scope.jasapandu.jenisGerakan = '1';
			  } else {
				// console.log($scope.jasapandugrid);
			  }
			});
		  }
		});
	  };

	  /*
	   * Autocomplete
	   */

	  /*$scope.getListOfSDMKapal = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			SearchSDMKapal.get({
			  nama: value,
			  limit: '10'
			}, function(response) {
			  resolve(response);
			  response.forEach(function (response) {
				  response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ')';
			  });
			});
		  });
		}
	  };*/

	$scope.getListOfSDMKapal = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				SearchSDMKapalByCallSign.get({
					callSign: value,
			  		limit: '10'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
						response.callSign = response.callSign?response.callSign:'-';
		                response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
					});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				SearchSDMKapal.get({
					nama: value,
			  		limit: '10'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
						response.callSign = response.callSign?response.callSign:'-';
		                response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
					});
				});
			});
		}
	};

	  $scope.getListOfAlatApungPandu = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			SearchAlatApung.get({
			  nama: value.toUpperCase(),
			  jenis : 2
			}, function(response) {
			  resolve(response);
			});
		  });
		}
	  };

	  $scope.getListOfAlatApungTunda = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			SearchAlatApung.get({
			  nama: value.toUpperCase(),
			  jenis : 1
			}, function(response) {
			  resolve(response);
			});
		  });
		}
	  };

		$scope.getListPpk1Gandeng = function(value) {
			if (value) {
				return new Promise(function(resolve, reject) {
					SearchPpk1WithCabang.get({
						"ppk1": value,
						"limit": 10
					}, function(response) {
						resolve(response);
						response.forEach(function (response) {
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

	  /*
	   * End Autocomplete
	   */

	  var rulesDateTime = function() {
		if ($scope.jasalabuhgrid.length > 0) {
		  $('#tglPandu').datepicker('setStartDate', $scope.jasalabuhgrid.tglMasuk);
		}
	  };
	  	// jasalampau
	  	var getPastJasa = function(noPpk1) {
			var pastLabuh = [];
			var pastTambat = [];
			var pastPandu = [];
			var pastTunda = [];
			var pastAir = [];
			DetailByPpk1.get({ppk1:noPpk1}, function(response){
				response.detailPmh.jasa.forEach(function(item) {
					$scope.arrayJasa.push(item);
				});	

				$scope.arrayJasa.forEach(function(jasa) {
			        // Get Detail Penetapan
			        var detailPtp = response.detailPmh.ptpJasa.find(function(ptpJasa) {
						return ptpJasa.noPpkJasa == jasa.noPpkJasa;
			        });
			        jasa.ptpJasa = detailPtp;
			        // Get Detail Realisasi
			        var detailRea = response.detailPmh.reaJasa.find(function(reaJasa) {
						return reaJasa.noPpkJasa == jasa.noPpkJasa;
			        });
			        jasa.reaJasa = detailRea;
			    });
				//start - Untuk set data grid dari status detail jasa terupdate :
				$scope.arrayJasa.forEach(function(jasa){
					switch (jasa.nama) {
						case "epb_labuh":
							if(jasa.reaJasa){
								pastLabuh.push(jasa.reaJasa);
							}else if(jasa.ptpJasa) {
								if(jasa.ptpJasa.jenisRevisi===9 || jasa.ptpJasa.jenisRevisi===10){
								}else{
									pastLabuh.push(jasa.ptpJasa);
								}
							}else{
								if($routeParams.id){
									jasa.fake = false;
								}else{
									jasa.fake = true;
									pastLabuh.push(jasa);
								}
							}
						break;
						case "epb_tambat":
							if(jasa.reaJasa){
								pastTambat.push(jasa.reaJasa);
							}else if(jasa.ptpJasa) {
								if(jasa.ptpJasa.jenisRevisi===9 || jasa.ptpJasa.jenisRevisi===10){
								}else{
									pastTambat.push(jasa.ptpJasa);
								}
							}else{
								if($routeParams.id){
									jasa.fake = false;
								}else{
									jasa.fake = true;
									pastTambat.push(jasa);
								}
							}
						break;
						case "epb_pandu":
							if(jasa.reaJasa){
								jasa.reaJasa.tglPandu = jasa.reaJasa.tglMulai;
								pastPandu.push(jasa.reaJasa);
							}else if(jasa.ptpJasa) {
								if(jasa.ptpJasa.jenisRevisi===9 || jasa.ptpJasa.jenisRevisi===10){
								}else{
									jasa.ptpJasa.tglPandu = jasa.ptpJasa.tglMulai;
									pastPandu.push(jasa);
								}
							}else{
								if($routeParams.id){
									jasa.fake = false;
								}else{
									jasa.fake = true;
									pastPandu.push(jasa);
								}
							}
						break;
						case "epb_tunda":
							if(jasa.reaJasa){
								pastTunda.push(jasa.reaJasa);
							}else if(jasa.ptpJasa) {
								if(jasa.ptpJasa.jenisRevisi===9 || jasa.ptpJasa.jenisRevisi===10){
								}else{
									pastTunda.push(jasa.ptpJasa);
								}
							}else{
								if($routeParams.id){
									jasa.fake = false;
								}else{
									jasa.fake = true;
									pastTunda.push(jasa);
								}
							}
						break;
						case "epb_air_kapal":
							if(jasa.reaJasa){
								pastAir.push(jasa.reaJasa);
							}else if(jasa.ptpJasa) {
								if(jasa.ptpJasa.jenisRevisi===9 || jasa.ptpJasa.jenisRevisi===10){
								}else{
									pastAir.push(jasa.ptpJasa);
								}
							}else{
								if($routeParams.id){
									jasa.fake = false;
								}else{
									jasa.fake = true;
									pastAir.push(jasa);
								}
							}
						break;
					}
				});

				pastTambat.forEach(function(pastTambat){
					PermohonanTambatDetail.get({noPpkJasa: pastTambat.noPpkJasa}, function(response){
						pastTambat.dokumenTender = response.dokumenTender;
					})
					HistoryRevisiTambat.get({noPpkJasa:pastTambat.noPpkJasa}, function(response){
						var rHistory = response;
						if(rHistory.length > 0){
							pastTambat.tglSelesai = rHistory[0].tglSelesai;
						}
					});
				});

				$scope.buildPDF = function(nomerPpkJasa){
					PermohonanTambatDetail.get({noPpkJasa: nomerPpkJasa}, function(response){
						BuildPDF.build(response.dokumenTender);
					})
				};

				//end - Untuk set data grid dari status detail jasa terupdate :
				$scope.createPDF = function(fileName){
					BuildPDF.build(fileName);
				};

				AppParam.get({nama:'JENIS_PANDU'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<pastPandu.length;j++){
							if(pastPandu[j].jenisPanduText == null){
								if(pastPandu[j].jenisPandu == content[idx].value){
									pastPandu[j].jenisPanduText = content[idx].caption;
								}
							}
						}
					}
				});

				AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<pastPandu.length;j++){
							if(pastPandu[j].jenisGerakanText == null){
								if(pastPandu[j].jenisGerakan == content[idx].value){
									pastPandu[j].jenisGerakanText = content[idx].caption;
								}
							}
						}
					}
				});

				AppParam.get({nama:'ALAT_ISI_AIR'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<pastAir.length;j++){
							if(pastAir[j].alatIsiText == null){
								if(pastAir[j].alatIsi == content[idx].value){
									pastAir[j].alatIsiText = content[idx].caption;
								}
							}
						}
					}
				});
				
				$scope.jasalabuhgridpast = pastLabuh;
				$scope.jasatambatgridpast = pastTambat;
				$scope.jasapandugridpast = pastPandu;
				$scope.jasatundagridpast = pastTunda;
				$scope.jasaairgridpast = pastAir;
				$scope.gridPast = true;
				if($scope.jasalabuhgridpast.length > 0){
					$scope.btnLabuhSave = false;
				}

				if($scope.jasapandugrid.length > 0){
					$scope.gandengBtnOnLabuh=true;
				}

				if($scope.jasaairgridpast.length > 0){
					$scope.btnAirSave = false;
				}
			});

	  	};

	  $scope.optionKapalCharter = function() {
		// $scope.rightSelection.kadeAwal = 0;
		// $scope.rightSelection.kadeAkhir = 0;
	  }

	  LoadingScreen.hide();

	  // jasabaru
	  if ($routeParams.kodeKapal != null) {
		PermohonanByKodeKapal.get({
		  kodeKapal: $routeParams.kodeKapal
		}, function(response) { 
		  $scope.permohonan = response;
		  $scope.inputTambahJasa = true;
		  //getPastJasa($scope.permohonan.noPpk1);
		  rulesKapalWajibPandu();
		});
	  }

	  $scope.cancel = function() {
		$location.path($scope.locationPath);
	  }

	  var loaValue = [];
	  $scope.submitKapalGandeng = function() {
		var temp = $scope.kapalGandeng.kapal;
		var kapalInfo = {};
	  	var statusKapal = [];
	  	PermohonanByKodeKapal.get({kodeKapal : temp.mkplKode}, function(response){
		if(response.status != '500'){

		  	loaValue.push(parseInt(temp.mkplLoa));

			if (checkunique.indexOf(temp.mkplKode) === -1) {
				checkunique.push(temp.mkplKode);

				kapalInfo.kodeKapal = temp.mkplKode;
				kapalInfo.namaKapal = temp.mkplNama;
				kapalInfo.loa = temp.mkplLoa;
				kapalInfo.gtKapal = temp.mkplGrt;
				kapalInfo.jenisKapal = temp.mkplJenis;
				kapalInfo.negaraKapal = temp.mkplBendera;
				kapalInfo.noPpk1Tongkang = temp.noPpk1Tongkang;
				$scope.kapalGandengArray.push(kapalInfo);
				if ($routeParams.id != null) {
					$scope.kapalGandengUpdateArray.push(kapalInfo);
				}
			 	$scope.kapalGandeng.kapal = '';
			  	$('#kplGadengModal').modal('hide');

			} else if (checkunique.indexOf(temp.mkplKode) > -1) {
				$scope.setNotification  = {
					type  : 'warning',
					message : 'Kapal <b>'+ temp.mkplNama +'</b> sudah dientry. <br> Silahkan Masukan Nama Kapal Lain.<br><br>Kode validasi: <b>VALPMH-015</b>'
			 	};
				Notification.setNotification($scope.setNotification);
				$scope.kapalGandeng.kapal = '';
			}			 
		}else{
		  	$('#kplGadengModal').modal('hide');
		  	$scope.setNotification  = {
				type  : 'warning',
				message : 'Kapal <b>'+ temp.mkplNama + '</b> belum memiliki Layanan Aktif. Silahkan Pilih Kapal Lain.<br><br>Kode validasi: <b>VALPMH-016</b>'
		  	};
		  	Notification.setNotification($scope.setNotification);
		  	$scope.kapalGandeng.kapal = '';
		}
	  });
	  }

	  $scope.deleteKapalGandengView = function(i) {
		var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteGandeng) {
		  $scope.kapalGandengArray.splice(i, 1);
		  if ($routeParams.id != null) {
			$scope.kapalGandengUpdateArray.splice(i, 1);
		  }
		}
	  }

	  $scope.deleteKapalGandeng = function(idKapalGandeng, i) {
		var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteGandeng) {
		  DeleteKapalGandeng.delete({
			id: idKapalGandeng
		  }, function(response) {
			if (response.status !== '500') {
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			  $scope.kapalGandengArray.splice(i, 1);
			} else {
			  $scope.setNotification = {
				type: "danger",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			$scope.setNotification = {
			  type: "danger",
			  message: "Data tidak berhasil dihapus"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  }

	  $scope.$watch('jasalabuhgrid.length', function() {
		if ($scope.jasalabuhgrid.length > 0) {
		  $scope.btnMainSimpan = true;
		} else {
		  $scope.btnMainSimpan = false;
		}
	  });

	  $scope.$watch('jasatambatgrid.length', function() {
		if ($scope.jasatambatgrid.length > 0) {
		  $scope.btnMainSimpan = true;
		} else {
		  $scope.btnMainSimpan = false;
		}
	  });

	  $scope.$watch('jasapandugrid.length', function() {
		if ($scope.jasapandugrid.length > 0) {
		  $scope.btnMainSimpan = true;
		} else {
		  $scope.btnMainSimpan = false;
		}
	  });

	  $scope.$watch('jasatundagrid.length', function() {
		if ($scope.jasatundagrid.length > 0) {
		  $scope.btnMainSimpan = true;
		} else {
		  $scope.btnMainSimpan = false;
		}
	  });

	  $scope.$watch('jasaairgrid.length', function() {
		if ($scope.jasaairgrid.length > 0) {
		  $scope.btnMainSimpan = true;
		} else {
		  $scope.btnMainSimpan = false;
		}
	  });

	  $scope.greenBtn = function() {
		if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0) {
		  $scope.btnMainSimpan = false;
		  $scope.showLoader = true;
		  var statusWajibTunda = true;
		  if( $scope.jasapandugrid.length > 0 && ($scope.jasatundagrid.length===0 || $scope.jasatundagrid.length===undefined)){
			var loaKapal;
			if($scope.permohonan.loa){
			  loaKapal = $scope.permohonan.loa;
			}else{
			  loaKapal = $scope.valueKapal.mkplLoa?$scope.valueKapal.mkplLoa:$scope.valueKapal.loa;
			}
			/*for (var i = 0; i < $scope.jasapandugrid.length; i++) {
			  if(($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
				($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg === 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
				($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg === 'AREALABUH')
				){
				$scope.permohonan.loa = loaKapal;
				$('#ConfirmLoaJasaPandu').modal('show');
				statusWajibTunda = false;
			  }

			  console.log("------------- Informasi Validasi Wajib Tunda -----------------");
			  console.log("Panjang Loa : "+ loaKapal);
			  console.log("Lokasi asal Jenis Dermaga : "+ $scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg);
			  console.log("Lokasi tujuan Jenis Dermaga : "+ $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg);
			}*/
				$scope.loaMaxvalue = Math.max.apply(Math, loaValue);
				$scope.loaMaxvalue = $scope.loaMaxvalue?parseInt($scope.loaMaxvalue)+parseInt(loaKapal):loaKapal;
				var paramWajibTunda = {
					dataPermohonan	: $scope.permohonan,
					statusSubmit 	: 1, /* ket: 0 = submit dari form, 1 = submit dari greenBtn*/
					loaKapal 		: loaKapal,
					loaMaxvalue 	: $scope.loaMaxvalue,
					jasaPandu 		: $scope.jasapandu,
					jasaPanduGrid 	: $scope.jasapandugrid,
					jasaTunda 		: $scope.jasatunda,
					jasaTundaGrid 	: $scope.jasatundagrid
				}

				var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
				if(!validationWajibTunda){
					$scope.permohonan.loa = loaKapal;
					$('#ConfirmLoaJasaPandu').modal('show');
					$scope.showLoader = false;
					$scope.btnMainSimpan = true;
					statusWajibTunda = false;
				}
		  }
		  // End : Kondisi yang dibutuhkan agar wajib tunda
		  if(statusWajibTunda){
			if($routeParams.kodeKapal){
			  $scope.submitJasaBaru();
			}else{
			  $scope.submitDataUmum();
			}
		  }
		} else {
		  $scope.setNotification = {
			type: "danger",
			message: "Belum Ada Jasa di Permohonan Ini.<br> Silahkan Isi Jasa Terlebih Dahulu."
		  };
		  Notification.setNotification($scope.setNotification);
		}
	  }

	  $scope.submitPerJasa = function() { 
		if ($scope.jasalabuhgrid.length > 0) { 
		  for (var y = 0; y < $scope.jasalabuhgrid.length; y++) {
			$scope.submitLabuh($scope.jasalabuhgrid[y]);
		  }
		}

		if ($scope.jasatambatgrid.length > 0) { 
		  for (var y = 0; y < $scope.jasatambatgrid.length; y++) {
			$scope.submitTambat($scope.jasatambatgrid[y]);
		  }
		}

		if ($scope.jasapandugrid.length > 0) {
		  for (var y = 0; y < $scope.jasapandugrid.length; y++) {
			$scope.submitPandu($scope.jasapandugrid[y]);
		  }
		}

		if ($scope.jasatundagrid.length > 0) { 
		  for (var y = 0; y < $scope.jasatundagrid.length; y++) {
			$scope.submitTunda($scope.jasatundagrid[y]);
		  }
		}

		if ($scope.jasaairgrid.length > 0) { 
		  for (var y = 0; y < $scope.jasaairgrid.length; y++) {
			$scope.submitAirKapal($scope.jasaairgrid[y]);
		  }
		}

		$scope.$watch('queueProcess.length',function(){
		  if($scope.queueProcess.length == 0) {
			LoadingScreen.hide();
			$location.path('/transaksi/realisasi');
		  }
		});
	  }

	  $scope.submitLabuhtoGrid = function() {
		var temp = $scope.jasalabuh;
		var tempDataLabuh = {};
		tempDataLabuh.fake = true;
		tempDataLabuh.namaLokasi = temp.lokasi.mdmgNama;
		tempDataLabuh.lokasi = temp.lokasi;

		var tglMasukVal = $filter('date')($scope.tglMasuk, 'yyyy-MM-dd');
		var jamMasukVal = document.getElementById("jamMasukVal").value;
		tempDataLabuh.tglMasuk = tglMasukVal + 'T' + jamMasukVal;

		var tglKeluarVal = $filter('date')($scope.tglKeluar, 'yyyy-MM-dd');
		var jamKeluarVal = document.getElementById("jamKeluarVal").value;
		tempDataLabuh.tglKeluar = tglKeluarVal + 'T' + jamKeluarVal;

		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMasuk = Date.parse(tempDataLabuh.tglMasuk);
		var parseTglKeluar = Date.parse(tempDataLabuh.tglKeluar);
		if(parseTglMasuk>=parseTglKeluar){
		  var note =  {
				  type  : "warning",
				  message : "Waktu keberangkatan harus melebihi Waktu Kedatangan<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		tempDataLabuh.tglSetuju = $filter('date')($scope.jasalabuh.tglSetuju, 'yyyy-MM-dd') + 'T' + $scope.jasalabuh.jamSetuju;
		tempDataLabuh.jamSetuju = $scope.jasalabuh.jamSetuju;

		tempDataLabuh.catatan = $scope.jasalabuh.catatan;

		$scope.jasaLabuhArray.push(tempDataLabuh);
		$scope.jasalabuhgrid = $scope.jasaLabuhArray;
		$scope.resetLabuh();
	  }

	  $scope.submitTambattoGrid = function() {
		var temp = $scope.jasatambat;
		var tempDataTambat = {};
		tempDataTambat.fake = true;
		tempDataTambat.namaLokasi = temp.lokasi.mdmgNama;
		tempDataTambat.lokasi = temp.lokasi;

		var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
		var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
		tempDataTambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

		//concat jam dan waktu selesai
		var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
		var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
		tempDataTambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;

		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulai = Date.parse(tempDataTambat.tglMulai);
		var parseTglSelesai = Date.parse(tempDataTambat.tglSelesai);
		if(parseTglMulai>=parseTglSelesai){
		  var note =  {
				  type  : "warning",
				  message : "Waktu Mulai Tambat harus melebihi Waktu Selesai Tambat<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		tempDataTambat.tglSetuju = $filter('date')($scope.jasatambat.tglSetuju, 'yyyy-MM-dd') + 'T' + $scope.jasatambat.jamSetuju;
		tempDataTambat.jamSetuju = $scope.jasatambat.jamSetuju;

		tempDataTambat.kadeAwal = $scope.jasatambat.kadeAwal;
		tempDataTambat.kadeAkhir = $scope.jasatambat.kadeAkhir!==undefined?$scope.jasatambat.kadeAkhir:0;
		tempDataTambat.asalDermaga = $scope.jasatambat.asalDermaga;

		tempDataTambat.statusTambat = $scope.jasatambat.statusTambat;
		tempDataTambat.posisiKapal = $scope.jasatambat.posisiKapal;
		if(tempDataTambat.posisiKapal==='3'){
		  tempDataTambat.kodeKapalTender = temp.kapalTender.mkplKode;
		}else{
		  tempDataTambat.kodeKapalTender = "";
		}

		/*validasi Kade Meter*/
		// var dataKadeMeter = {
		// 	kadeAwal : tempDataTambat.kadeAwal,
		// 	maxKadeMeter : $scope.maxKadeMeter
		// }
		// var checkValidKadeMeter = Validations.maxKadeMeter(dataKadeMeter);
		// if(!checkValidKadeMeter)return false;

		tempDataTambat.flagRampdoor = $scope.jasatambat.flagRampdoor;
		tempDataTambat.catatan = $scope.jasatambat.catatan;
		$scope.jasaTambatArray.push(tempDataTambat);
		$scope.jasatambatgrid = $scope.jasaTambatArray;
		$scope.resetTambat();
	  }

	  $scope.submitPandutoGrid = function() {
		// Start : Kondisi yang dibutuhkan agar wajib tunda
		var loaKapal;
		if($scope.permohonan.loa){
		  loaKapal = $scope.permohonan.loa;
		}else{
		  loaKapal = $scope.valueKapal.mkplLoa?$scope.valueKapal.mkplLoa:$scope.valueKapal.loa;
		}

		$scope.loaMaxvalue = Math.max.apply(Math, loaValue);
		$scope.loaMaxvalue = $scope.loaMaxvalue?parseInt($scope.loaMaxvalue)+parseInt(loaKapal):loaKapal;
			
		var paramWajibTunda = {
			dataPermohonan	: $scope.permohonan,
			statusSubmit 	: 0,  /* ket: 0 = submit dari form, 1 = submit dari greenBtn*/
			loaKapal 		: loaKapal,
			loaMaxvalue 	: $scope.loaMaxvalue,
			jasaPandu 		: $scope.jasapandu,
			jasaPanduGrid 	: '',
			jasaTunda 		: $scope.jasatunda,
			jasaTundaGrid 	: $scope.jasatundagrid
		}
		var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
		if(!validationWajibTunda){
			$scope.permohonan.loa = loaKapal;
			if($scope.loaMaxvalue >= 70){
				$scope.loaMax = true;
			}
			$('#ConfirmLoaJasaPandu').modal('show');
		}
		
		/*if(loaKapal >= 70 || $scope.loaMaxvalue >= 70) { 
		  if($scope.jasatundagrid.length===undefined || $scope.jasatundagrid.length===0){
			if(($scope.jasapandu.lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandu.lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
			($scope.jasapandu.lokasiAsal.mdmgJenisDmg === 'AREALABUH' && $scope.jasapandu.lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
			($scope.jasapandu.lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandu.lokasiTujuan.mdmgJenisDmg === 'AREALABUH')){
			  $scope.permohonan.loa = loaKapal;
			  if($scope.loaMaxvalue >= 70){
				$scope.loaMax = true;
			  }
			  $('#ConfirmLoaJasaPandu').modal('show');
			}
		  }
		}*/

		var temp = $scope.jasapandu;
		var tempDataPandu = {};
		tempDataPandu.fake = true;
		tempDataPandu.lokasiAsal = temp.lokasiAsal;
		tempDataPandu.lokasiTujuan = temp.lokasiTujuan;
		tempDataPandu.namaLokasiAsal = temp.lokasiAsal.mdmgNama;
		tempDataPandu.namaLokasiTujuan = temp.lokasiTujuan.mdmgNama;
		tempDataPandu.jenisPandu = temp.jenisPandu;
		tempDataPandu.jenisGerakan = temp.jenisGerakan;
		AppParamValue.get({
		  nama: 'JENIS_PANDU',
		  value: tempDataPandu.jenisPandu
		}, {}, function(response) {
		  tempDataPandu.jenisPanduText = response[0].caption;
		});

		AppParamValue.get({
		  nama: 'JENIS_GERAKAN',
		  value: tempDataPandu.jenisGerakan
		}, {}, function(response) {
		  tempDataPandu.jenisGerakanText = response[0].caption;
		});

		var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
		var jamPanduVal = document.getElementById("jamPanduVal").value;
		tempDataPandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
		if ($scope.kapalGandengArray.length > 0) {
		  tempDataPandu.kapalGandeng = $scope.kapalGandengArray;
		}

		tempDataPandu.tglSetuju = $filter('date')($scope.jasapandu.tglSetuju, 'yyyy-MM-dd') + 'T' + $scope.jasapandu.jamSetuju;
		tempDataPandu.jamSetuju = $scope.jasapandu.jamSetuju;

		tempDataPandu.jenisKep = $scope.jasapandu.jenisKep;
		tempDataPandu.tglMulai = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
		tempDataPandu.jamMulai = $scope.jasapandu.jamMulai;
		tempDataPandu.tglSelesai = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
		tempDataPandu.jamSelesai = $scope.jasapandu.jamSelesai;
		tempDataPandu.jamNaik = $scope.jasapandu.jamNaik;
		tempDataPandu.jamKapalGerak = $scope.jasapandu.jamKapalGerak;
		tempDataPandu.jamTurun = $scope.jasapandu.jamTurun;
		tempDataPandu.namaPandu = $scope.jasapandu.namaPandu;
		tempDataPandu.kapalPandu = $scope.jasapandu.kapalPandu;
		tempDataPandu.keteranganKep = $scope.jasapandu.keteranganKep;
		tempDataPandu.flagApbs = $scope.jasapandu.flagApbs;
		tempDataPandu.tglMulaiPandu = $filter('date')($scope.jasapandu.tglMulai, 'yyyy-MM-dd') + 'T' + $scope.jasapandu.jamMulai;
		tempDataPandu.tglSelesaiPandu = $filter('date')($scope.jasapandu.tglSelesai, 'yyyy-MM-dd') + 'T' + $scope.jasapandu.jamSelesai;
		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulaiPandu = Date.parse(tempDataPandu.tglMulaiPandu);
		var parseTglSelesaiPandu = Date.parse(tempDataPandu.tglSelesaiPandu);
		if(parseTglMulaiPandu>=parseTglSelesaiPandu){
		  var note =  {
				  type  : "warning",
				  message : "Tgl & Jam Mulai Pandu harus melebihi Tgl & Jam Selesai Pandu<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		// if($scope.jasapandu.lokasiAsal.mdmgJenisDmg==='AREALABUH' && $scope.jasapandu.lokasiTujuan.mdmgJenisDmg==='AREALABUH'){
		// }else{
		//   $scope.permohonan.loa = loaKapal;
		//   $('#ConfirmLoaJasaPandu').modal('show');
		// }
		// console.log("------------- Informasi Validasi Wajib Tunda -----------------");
		// console.log("Panjang Loa : "+ loaKapal);
		// console.log("Lokasi asal Jenis Dermaga : "+ $scope.jasapandu.lokasiAsal.mdmgJenisDmg);
		// console.log("Lokasi asal Jenis Tambat : "+ $scope.jasapandu.lokasiAsal.mdmgJenisTambat);
		// End : Kondisi yang dibutuhkan agar wajib tunda

		$scope.jasaPanduArray.push(tempDataPandu);
		$scope.jasapandugrid = $scope.jasaPanduArray;
		$scope.resetPandu();
		checkunique = [];
		loaValue = [];
	  }

	  $scope.submitTundatoGrid = function() {
		var temp = $scope.jasatunda;
		var tempDataTunda = {};
		tempDataTunda.fake = true;
		if (typeof temp.lokasiAsal === 'object') {
		  tempDataTunda.kodeLokasiAsal = temp.lokasiAsal.mdmgKode;
		  tempDataTunda.namaLokasiAsal = temp.lokasiAsal.mdmgNama;
		} else {
		  tempDataTunda.kodeLokasiAsal = temp.kodeLokasiAsal;
		  tempDataTunda.namaLokasiAsal = temp.namaLokasiAsal;
		}

		if (typeof temp.lokasiTujuan === 'object') {
		  tempDataTunda.kodeLokasiTujuan = temp.lokasiTujuan.mdmgKode;
		  tempDataTunda.namaLokasiTujuan = temp.lokasiTujuan.mdmgNama;
		} else {
		  tempDataTunda.kodeLokasiTujuan = temp.kodeLokasiTujuan;
		  tempDataTunda.namaLokasiTujuan = temp.namaLokasiTujuan;
		}

		var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
		var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
		tempDataTunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
		tempDataTunda.jamMulai = jamMasukVal;

		tempDataTunda.tglSetuju = $filter('date')($scope.jasatunda.tglSetuju, 'yyyy-MM-dd') + 'T' + $scope.jasatunda.jamSetuju;
		tempDataTunda.jamSetuju = $scope.jasatunda.jamSetuju;
		tempDataTunda.jenisTunda = $scope.jasatunda.jenisTunda;
		tempDataTunda.jamKerja = $scope.jasatunda.jamKerja;
		tempDataTunda.catatan = $scope.jasatunda.catatan;
		tempDataTunda.tglSelesai = $filter('date')($scope.jasatunda.tglSelesai, 'yyyy-MM-dd') + 'T' + $scope.jasatunda.jamSelesai;
		tempDataTunda.jamSelesai = $scope.jasatunda.jamSelesai;
		tempDataTunda.kapalTundaArray = $scope.kapalTundaArray;
		tempDataTunda.kapalTundaGandengArray = $scope.kapalTundaGandengArray;
		tempDataTunda.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		tempDataTunda.uploadFile = $scope.uploadFile;

		AppParam.get({
		  nama: 'JENIS_KEG_TUNDA'
		}, function(response) {
		  var content = response.content;
		  for (var idx = 0; idx < content.length; idx++) {
			if (tempDataTunda.jenisTunda == content[idx].value) {
				tempDataTunda.jenisTundaText = content[idx].caption;
			}
		  }
		});

		// start Validasi Tgl & Jam Mulai tidak boleh melebihi Tgl & Jam Selesai
		var parseTglMulai = Date.parse(tempDataTunda.tglMulai);
		var parseTglSelesai = Date.parse(tempDataTunda.tglSelesai);
		if(parseTglMulai>=parseTglSelesai){
		  var note =  {
				  type  : "warning",
				  message : "Tgl & Jam Mulai Tunda harus melebihi Tgl & Jam Selesai Tunda<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		$scope.jasaTundaArray.push(tempDataTunda);
		$scope.jasatundagrid = $scope.jasaTundaArray;
		$scope.resetTunda();
	  }

	  $scope.submitAirKapaltoGrid = function() {
		var temp = $scope.jasaair;
		var tempDataAir = {};
		tempDataAir.fake = true;
		tempDataAir.alatIsi = temp.alatIsi;
		AppParamValue.get({
		  nama: 'ALAT_ISI_AIR',
		  value: tempDataAir.alatIsi
		}, {}, function(value) {
		  tempDataAir.alatIsiText = value[0].caption;
		});
		tempDataAir.dermaga = temp.dermaga;
		tempDataAir.namaDermaga = tempDataAir.dermaga.mdmgNama;
		tempDataAir.tglIsi = $filter('date')(temp.tglIsi, 'yyyy-MM-dd') + 'T' + temp.jamIsi;
		tempDataAir.jamIsi = temp.jamIsi;
		tempDataAir.volume = temp.volume;
		tempDataAir.satuan = temp.satuan;
		tempDataAir.catatan = temp.catatan;
		tempDataAir.tglSetuju = $filter('date')(temp.tglSetuju, 'yyyy-MM-dd') + 'T' + temp.jamSetuju;
		tempDataAir.jamSetuju = temp.jamSetuju;
		tempDataAir.tglSelesai = $filter('date')(temp.tglSelesaiIsi, 'yyyy-MM-dd') + 'T' + temp.jamSelesaiIsi;
		tempDataAir.jamSelesai = temp.jamSelesaiIsi;
		tempDataAir.tabelKapalPenunjang = $scope.tabelKapalPenunjang;
		tempDataAir.tabelAlatIsi = $scope.tabelAlatIsi;
		tempDataAir.jamKerja = temp.jamKerja;
		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulaiIsi = Date.parse(tempDataAir.tglIsi);
		var parseTglSelesaiIsi = Date.parse(tempDataAir.tglSelesai);
		if(parseTglMulaiIsi>=parseTglSelesaiIsi){
		  var note =  {
				  type  : "warning",
				  message : "Tgl & Jam Mulai Isi harus melebihi Tgl & Jam Selesai Isi<br><br>Kode validasi: <b>VALPMH-020</b>"
				};
		  Notification.setNotification(note);
		  return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		$scope.jasaAirArray.push(tempDataAir);
		$scope.jasaairgrid = $scope.jasaAirArray;
		$scope.resetAirKapal();
	  }

	  $scope.submit = function() {
		// if(typeof $scope.permohonan.namaAgen==='object'){
		  CheckLockAgen.get({
			icustomer:(typeof $scope.permohonan.namaAgen==='object')?$scope.permohonan.namaAgen.mplgKode:$scope.permohonan.kodeAgen
		  }, function(response){
			if(response.edescription != 0){
			  $scope.edescription = response.edescription;
			  $('#modalCheckLockAgen').modal('show');
			}else{
			  $scope.setNotification = {
				type: "warning",
				message: "Silahkan Lanjutkan mengisi Jasa yang akan diajukan.."
			  };

			  Notification.setNotification($scope.setNotification);
			  $scope.btnMainSimpan = true;
			  document.getElementById("labuhTab").style.display = "block";
			  document.getElementById("tambatTab").style.display = "block";
			  if ($scope.permohonan.jenisKapal != null) {
				if ($scope.permohonan.jenisKapal === 'KPLTONKANG') {
				  document.getElementById("panduTab").style.display = "none";
				  document.getElementById("tundaTab").style.display = "none";
				  // document.getElementById("airkapalTab").style.display = "none";
				} else if ($scope.permohonan.jenisKapal === 'KPLTNKGMSN') {
				  document.getElementById("panduTab").style.display = "block";
				  document.getElementById("tundaTab").style.display = "block";
				  // document.getElementById("airkapalTab").style.display = "none";
				} else {
				  document.getElementById("panduTab").style.display = "block";
				  document.getElementById("tundaTab").style.display = "block";
				  // document.getElementById("airkapalTab").style.display = "block";
				}
			  } else {
				MdmKapalSearch.get({
				  kode: $scope.permohonan.kodeKapal,
				  limit: 10
				}, function(response) {
				  if (response[0].mkplJenis === 'KPLTUNDA') {
					$scope.gandengBtn = false;
				  };
				  if (response[0].mkplJenis === 'KPLTONKANG') {
					document.getElementById("panduTab").style.display = "none";
					document.getElementById("tundaTab").style.display = "none";
					// document.getElementById("airkapalTab").style.display = "none";
				  } else if (response[0].mkplJenis === 'KPLTNKGMSN') {
					document.getElementById("panduTab").style.display = "block";
					document.getElementById("tundaTab").style.display = "block";
					// document.getElementById("airkapalTab").style.display = "none";
				  } else {
					document.getElementById("panduTab").style.display = "block";
					document.getElementById("tundaTab").style.display = "block";
					// document.getElementById("airkapalTab").style.display = "block";
				  }
				});
			  }
			  //set jam kerja default
			  $scope.jasatunda.jamKerja = "1";
			  $scope.jasaair.jamKerja = "1";


			  $scope.dataUmumBtn = false;
			  $scope.afterSubmit = true;
			  if ($routeParams.kodeKapal) {
				$scope.newJasaSaved = true;
			  }else{
				$scope.newJasaSavedFromKapal = true;
			  }
			  UserRole.checkJasa();
			}
		  });
		// }
	  }

	  //submit data umum
	  $scope.submitDataUmum = function() {
		$scope.permohonan.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
		$scope.permohonan.namaAgen = $scope.permohonan.namaAgen.mplgNama;
		// $scope.permohonan.kodeKapal = $scope.valueKapal.mkplKode;
		// $scope.permohonan.namaKapal = $scope.valueKapal.mkplNama;

		if (typeof $scope.permohonan.namaPelabuhanAsal == 'object') {
		  $scope.permohonan.kodePelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbKode;
		  $scope.permohonan.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbNama;
		}

		if (typeof $scope.permohonan.namaPelabuhanTujuan == 'object') {
		  $scope.permohonan.kodePelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbKode;
		  $scope.permohonan.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbNama;
		}

		$scope.permohonan.statusPelaksanaan = 2;
		PermohonanAdd.save({}, $scope.permohonan, function(response) {
		  if (response.status != '500' && response.status != '404') {
			$scope.permohonan = response;

			$scope.submitPerJasa();

			$scope.setNotification = {
			  type: "success",
			  message: "Data berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);

			// Set EPB
			StatusEPBPermohonan.get({
			  ppk1: response.noPpk1,
			  urutan: response.details[0].urutanPermohonan
			});
		  } else {
			$scope.setNotification = {
			  type: "warning",
			  message: response.description
			};
			Notification.setNotification($scope.setNotification);
		  }
		  $scope.agentChanged = false;
		}, function(response) {
		  $scope.setNotification = {
			type: "warning",
			message: "Data tidak berhasil tersimpan"
		  };
		  Notification.setNotification($scope.setNotification);
		});
	  };

	  $scope.update = function() {
		  if (typeof $scope.permohonan.namaAgen == 'object') {
			$scope.permohonan.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
			$scope.permohonan.namaAgen = $scope.permohonan.namaAgen.mplgNama;
		  }

		  if (typeof $scope.permohonan.namaPelabuhanAsal == 'object') {
			$scope.permohonan.kodePelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbKode;
			$scope.permohonan.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbNama;
		  }

		  if (typeof $scope.permohonan.namaPelabuhanTujuan == 'object') {
			$scope.permohonan.kodePelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbKode;
			$scope.permohonan.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbNama;
		  }

		  PermohonanEdit.update({
			id: $routeParams.id
		  }, $scope.permohonan, function(response) {
			$scope.setNotification = {
			  type: "success",
			  message: "Data berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  }, function(response) {
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
		/*==========================================jasa labuh========================================*/

	  //delete jasa labuh
	  $scope.deleteLabuh = function(id, i) {
		var checkDeleteLabuh = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteLabuh) {
		  if (id == null) {
			$scope.jasalabuhgrid.splice(i, 1);
			$scope.setNotification = {
			  type: "success",
			  message: "Data berhasil dihapus"
			};
			Notification.setNotification($scope.setNotification);
			if ($scope.jasalabuhgrid.length > 0) {
			  $scope.btnLabuhSave = false;
			} else {
			  $scope.btnLabuhSave = true;
			}
		  } else {
			PermohonanLabuhDelete.delete({
			  id: id
			}, function(response) {
			  $scope.jasalabuhgrid.splice(i, 1);
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			  if ($scope.jasalabuhgrid.length > 0) {
				$scope.btnLabuhSave = false;
			  } else {
				$scope.btnLabuhSave = true;
			  }
			}, function() {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			});
		  }
		}
	  };
	  //get pmh labuh by ppkjasa
	  $scope.editLabuh = function(noppkjasa, i) {
		$scope.indexLabuh = i;
		PermohonanLabuhDetail.get({
		  noPpkJasa: noppkjasa
		}, function(response) {
		  $scope.jasalabuh = response;
		  document.getElementById("jamMasukVal").value = $filter('date')(response.tglMasuk, 'HH:mm');
		  document.getElementById("jamKeluarVal").value = $filter('date')(response.tglKeluar, 'HH:mm');
		  $scope.tglMasuk = $scope.splitDate(response.tglMasuk);
		  $scope.tglKeluar = $scope.splitDate(response.tglKeluar);
		  $scope.jasalabuh.lokasi = response.namaLokasi;
		  setDisableDateLabuh();
		  $scope.btnLabuhSave = true;
		});
	  };

	  //submit labuh
	  $scope.submitLabuh = function(jasalabuh) {
		if ($routeParams.id) {
		  jasalabuh = $scope.jasalabuh;
		}
		jasalabuh.detailPmhId = $scope.permohonan.details[0].id;
		jasalabuh.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
		jasalabuh.noPpk1 = $scope.permohonan.noPpk1;
		if (jasalabuh.noPpkJasa === undefined) {
		  $scope.queueProcess.push("X");

		  if (jasalabuh.tglMasuk === undefined) {
			//concat jam dan waktu masuk
			var tglMasukVal = $filter('date')($scope.tglMasuk, 'yyyy-MM-dd');
			var jamMasukVal = document.getElementById("jamMasukVal").value;
			jasalabuh.tglMasuk = tglMasukVal + 'T' + jamMasukVal;
		  }

		  if (jasalabuh.tglKeluar === undefined) {
			//concat jam dan waktu keluar
			var tglKeluarVal = $filter('date')($scope.tglKeluar, 'yyyy-MM-dd');
			var jamKeluarVal = document.getElementById("jamKeluarVal").value;
			jasalabuh.tglKeluar = tglKeluarVal + 'T' + jamKeluarVal;
		  }

		  jasalabuh.kodeLokasi = jasalabuh.lokasi.mdmgKode;
		  jasalabuh.namaLokasi = jasalabuh.lokasi.mdmgNama;
		  //simpan dalam db
		  PermohonanLabuh.save(jasalabuh, function(response) {
			if (response.status !== '500') {

			  var dataPenetapan = {
				jamSetuju: jasalabuh.jamSetuju,
				kodeLokasi: response.kodeLokasi,
				namaLokasi: response.namaLokasi,
				noPpk1: response.noPpk1,
				noPpkJasa: response.noPpkJasa,
				status: response.status,
				tglKeluar: response.tglKeluar,
				tglMasuk: response.tglMasuk,
				tglSetuju: jasalabuh.tglSetuju
			  }

			  PenetapanLabuh.save(dataPenetapan, function(response2) {
				var dataRealisasi = {
				  statusPelaksanaan: 2,
				  catatan: jasalabuh.catatan,
				  kodeLokasi: response.kodeLokasi,
				  namaLokasi: response.namaLokasi,
				  noPpk1: response.noPpk1,
				  noPpkJasa: response.noPpkJasa,
				  tglKeluar: response.tglKeluar,
				  tglMasuk: response.tglMasuk
				}

				RealisasiLabuh.save(dataRealisasi, function(response3) {
				  $scope.queueProcess.pop();
				});
			  });

			  $scope.setNotification = {
				type: "success",
				message: "Jasa Labuh berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			  if ($routeParams.id) {
				response.fake = false;
				$scope.templabuh.push(response);
				$scope.jasalabuhgrid = $scope.templabuh;
			  }
			  $scope.jasalabuh.noPpkJasa = undefined;
			  $scope.jasalabuh.lokasi = '';
			  $scope.tglMasuk = new Date();
			  $scope.tglKeluar = new Date();
			  document.getElementById("jamMasukVal").value = moment().format('HH:mm');
			  document.getElementById("jamKeluarVal").value = moment().format('HH:mm');
			  $scope.btnLabuhSave = false;
			} else {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			jasalabuh.done = true;
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  };

	  //reset Labuh
	  $scope.resetLabuh = function() {
		$scope.jasalabuh = {};
		$scope.tglMasuk = new Date();
		$scope.tglKeluar = datePlus10;
		document.getElementById("jamMasukVal").value = moment().format('HH:mm');
		document.getElementById("jamKeluarVal").value = moment().format('HH:mm');
		if ($scope.jasalabuhgrid.length > 0) {
		  $scope.btnLabuhSave = false;
		}
		$scope.jasalabuh.tglSetuju = new Date();
		$scope.jasalabuh.jamSetuju = moment().format('HH:mm');
	  };

	  /*==================================jasa tambat==========================================*/
	  //delete jasa tambat
	  $scope.deleteTambat = function(id, i) {
		var checkDeleteTambat = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteTambat) {
		  if (id == null) {
			$scope.jasatambatgrid.splice(i, 1);
			$scope.setNotification = {
			  type: "success",
			  message: "Data berhasil dihapus"
			};
			Notification.setNotification($scope.setNotification);
		  } else {
			PermohonanTambatDelete.delete({
			  id: id
			}, function(response) {
			  $scope.jasatambatgrid.splice(i, 1);
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			}, function() {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			});
		  }
		}
	  };
	  //get pmh tambat by ppkjasa
	  $scope.editTambat = function(noppkjasa, i) {
		$scope.indexTambat = i;
		PermohonanTambatDetail.get({
		  noPpkJasa: noppkjasa
		}, function(response) {
		  $scope.jasatambat = response;
		  document.getElementById("jamMulaiTambatVal").value = $filter('date')(response.tglMulai, 'HH:mm');
		  document.getElementById("jamSelesaiTambatVal").value = $filter('date')(response.tglSelesai, 'HH:mm');
		  $scope.tglMulaiTambat = $scope.splitDate(response.tglMulai);
		  $scope.tglSelesaiTambat = $scope.splitDate(response.tglSelesai);
		  $scope.jasatambat.lokasi = response.namaLokasi;
		});
	  };
	  //submit tambat
	  $scope.submitTambat = function(jasatambat) {
		if ($routeParams.id) {
		  jasatambat = $scope.jasatambat;
		}
		if (jasatambat.noPpkJasa === undefined) {
		  $scope.queueProcess.push("X");
		  jasatambat.detailPmhId = $scope.permohonan.details[0].id;
		  jasatambat.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
		  jasatambat.noPpk1 = $scope.permohonan.noPpk1;

		  if (jasatambat.tglMulai === undefined) {
			//concat jam dan waktu mulai
			var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
			var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
			jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;
		  }

		  if (jasatambat.tglSelesai === undefined) {
			//concat jam dan waktu selesai
			var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
			var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
			jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
		  }

		  jasatambat.kodeLokasi = jasatambat.lokasi.mdmgKode;
		  jasatambat.namaLokasi = jasatambat.lokasi.mdmgNama;
		  jasatambat.asalDermaga = 1; //Asal Dermaga di Hardcode 1 karena belum ada kepastian dari pelindo
		  jasatambat.flagRampdoor = jasatambat.flagRampdoor.toString();
		 
		  var formData = new FormData();
		  formData.append('pmhTambat', new Blob([JSON.stringify(jasatambat)], { type: "application/json" }));

		  PermohonanTambat.save(formData, function(response) { 
			if (response.status !== '500') {
			  var dataPenetapan = {
				asalDermaga: jasatambat.asalDermaga,
				jamSetuju: jasatambat.jamSetuju,
				kadeAkhir: jasatambat.kadeAkhir,
				kadeAwal: jasatambat.kadeAwal,
				kodeLokasi: response.kodeLokasi,
				namaLokasi: response.namaLokasi,
				noPpk1: response.noPpk1,
				noPpkJasa: response.noPpkJasa,
				status: response.status,
				tglMulai: response.tglMulai,
				tglSelesai: response.tglSelesai,
				tglSetuju: jasatambat.tglSetuju,
				flagRampdoor: jasatambat.flagRampdoor
			  }

			  PenetapanTambat.save(dataPenetapan, function(response2) {
				var dataRealisasi = {
				  statusPelaksanaan: 2,
				  asalDermaga: jasatambat.asalDermaga,
				  catatan: jasatambat.catatan,
				  flagRampdoor: jasatambat.flagRampdoor,
				  kadeAkhir: response.kadeAkhir,
				  kadeAwal: response.kadeAwal,
				  kodeLokasi: response.kodeLokasi,
				  namaLokasi: response.namaLokasi,
				  noPpk1: response.noPpk1,
				  noPpkJasa: response.noPpkJasa,
				  posisiKapal: jasatambat.posisiKapal,
				  kodeKapalTender: jasatambat.kodeKapalTender,
				  statusTambat: jasatambat.statusTambat,
				  tglMulai: response.tglMulai,
				  tglSelesai: response.tglSelesai
				}

				RealisasiTambat.save(dataRealisasi, function(response3) {
				  $scope.queueProcess.pop();
				});
			  });

			  $scope.setNotification = {
				type: "success",
				message: "Jasa Tambat berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			  if ($routeParams.id) {
				response.fake = false;
				$scope.temptambat.push(response);
				$scope.jasatambatgrid = $scope.temptambat;
			  }
			  $scope.jasatambat.noPpkJasa = undefined;
			  //$scope.jasatambat.noForm = $scope.permohonan.noForm;
			  $scope.jasatambat.lokasi = '';
			  $scope.jasatambat.kadeAwal = '';
			  $scope.jasatambat.kadeAkhir = '';
			  $scope.tglMulaiTambat = new Date();
			  $scope.tglSelesaiTambat = new Date();
			  document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
			  document.getElementById("jamSelesaiTambatVal").value = moment().format('HH:mm');
			} else {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			jasatambat.done = true;
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  };

	  //reset Tambat
	  $scope.resetTambat = function() {
		$scope.jasatambat = {};
		$scope.tglMulaiTambat = new Date();
		$scope.tglSelesaiTambat = new Date();
		document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
		document.getElementById("jamSelesaiTambatVal").value = moment(timePlus1).format('HH:mm');
		$scope.jasatambat.tglSetuju = new Date();
		$scope.jasatambat.jamSetuju = moment().format('HH:mm');
		$scope.jasatambat.asalDermaga = '0';
		$scope.jasatambat.kadeAwal = 0;
		$scope.jasatambat.statusTambat = '1';
		$scope.jasatambat.posisiKapal = '1';
		$scope.jasatambat.flagRampdoor = 0;
	  };
	  /*===================================jasa pandu==========================================*/
	  //delete jasa pandu
	  $scope.deletePandu = function(id, i) {
		  var checkDeletePandu = confirm('Apakah Anda akan Menghapus data ini?');
		  if (checkDeletePandu) {
			if (id == null) {
			  $scope.jasapandugrid.splice(i, 1);
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			} else {
			  PermohonanPanduDelete.delete({
				id: id
			  }, function(response) {
				$scope.jasapandugrid.splice(i, 1);
				$scope.setNotification = {
				  type: "success",
				  message: "Data berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			  }, function() {
				$scope.setNotification = {
				  type: "warning",
				  message: "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			  });
			}
		  }
		}
		//get pmh pandu by ppkjasa
	  $scope.editPandu = function(noppkjasa, i) {
		$scope.indexPandu = i;
		PermohonanPanduDetail.get({
		  noPpkJasa: noppkjasa
		}, function(response) {
		  $scope.jasapandu = response;
		  document.getElementById("jamPanduVal").value = $filter('date')(response.tglPandu, 'HH:mm');
		  $scope.tglPandu = $scope.splitDate(response.tglPandu);
		  $scope.jasapandu.lokasiAsal = response.namaLokasiAsal;
		  $scope.jasapandu.lokasiTujuan = response.namaLokasiTujuan;
		  SearchKapalGandeng.get({
			noPpk1: $routeParams.id,
			noPpkJasa: noppkjasa
		  }, function(response) {
			if (response.totalElements > 0) {
			  $scope.kapalGandengArray = response.content;
			  $scope.gandengBtn = false;
			}
		  });
		});
	  };

	  //submit pandu
	  $scope.submitPandu = function(jasapandu) {
		if ($routeParams.id) {
		  jasapandu = $scope.jasapandu;
		  jasapandu.kapalGandeng = $scope.kapalGandengUpdateArray;
		}
		if (jasapandu.noPpkJasa === undefined) {
		  $scope.queueProcess.push("X");

		  jasapandu.jenisPanduText = $scope.temppandu.jenisPanduText;
		  jasapandu.jenisGerakanText = $scope.temppandu.jenisGerakanText;

		  jasapandu.detailPmhId = $scope.permohonan.details[0].id;
		  jasapandu.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
		  jasapandu.noPpk1 = $scope.permohonan.noPpk1;

		  //concat jam dan waktu
		  if (jasapandu.tglPandu === undefined) {
			var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
			var jamPanduVal = document.getElementById("jamPanduVal").value;
			jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
		  }

		  jasapandu.jenisPandu = parseInt(jasapandu.jenisPandu);
		  jasapandu.jenisGerakan = parseInt(jasapandu.jenisGerakan);

		  jasapandu.kodeLokasiAsal = jasapandu.lokasiAsal.mdmgKode;
		  jasapandu.namaLokasiAsal = jasapandu.lokasiAsal.mdmgNama;
		  jasapandu.kodeLokasiTujuan = jasapandu.lokasiTujuan.mdmgKode;
		  jasapandu.namaLokasiTujuan = jasapandu.lokasiTujuan.mdmgNama;


		  //temporary for fixing because jasaPandu.namaPandu is object not string.. only for fixing case
		  $scope.namaPanduFull = {
		  	nama : jasapandu.namaPandu.mpegNama, 
		  	nip : jasapandu.namaPandu.mpegNip
		  }

		  jasapandu.namaPandu = $scope.namaPanduFull.nama;

		  PermohonanPandu.save(jasapandu, function(response) {
			if (response.status !== '500') {

			  var dataPenetapan = {
				flagApbs: response.flagApbs,
				jamSetuju: jasapandu.jamSetuju,
				jenisGerakan: response.jenisGerakan,
				jenisPandu: response.jenisPandu,
				kodeLokasiAsal: response.kodeLokasiAsal,
				kodeLokasiTujuan: response.kodeLokasiTujuan,
				namaLokasiAsal: response.namaLokasiAsal,
				namaLokasiTujuan: response.namaLokasiTujuan,
				noPpk1: response.noPpk1,
				noPpkJasa: response.noPpkJasa,
				status: response.status,
				tglMulai: response.tglPandu,
				tglSetuju: jasapandu.tglSetuju
			  }

			  PenetapanPandu.save(dataPenetapan, function(response2) {
				var dataRealisasi = {
				  statusPelaksanaan: 2,
				  flagApbs: jasapandu.flagApbs,
				  jamKapalGerak: $filter('date')(jasapandu.tglMulai, 'yyyy-MM-dd') + 'T' + jasapandu.jamKapalGerak,
				  jamMulai: jasapandu.jamMulai,
				  jamNaik: $filter('date')(jasapandu.tglMulai, 'yyyy-MM-dd') + 'T' + jasapandu.jamNaik,
				  jamSelesai: jasapandu.jamSelesai,
				  jamTurun: $filter('date')(jasapandu.tglMulai, 'yyyy-MM-dd') + 'T' + jasapandu.jamTurun,
				  jenisGerakan: jasapandu.jenisGerakan,
				  jenisKep: jasapandu.jenisKep,
				  jenisPandu: jasapandu.jenisPandu,
				  kapalPandu: (jasapandu.kapalPandu) ? jasapandu.kapalPandu.nama : '',
				  keteranganKep: jasapandu.keteranganKep,
				  kodeLokasiAsal: response.kodeLokasiAsal,
				  kodeLokasiTujuan: response.kodeLokasiTujuan,
				  namaLokasiAsal: response.namaLokasiAsal,
				  namaLokasiTujuan: response.namaLokasiTujuan,
				  namaPandu: $scope.namaPanduFull.nama,
				  nipPandu: $scope.namaPanduFull.nip,
				  noPpk1: response.noPpk1,
				  noPpkJasa: response.noPpkJasa,
				  statusSiklusPandu: response.status,
				  tglMulai: $filter('date')(jasapandu.tglMulai, 'yyyy-MM-dd') + 'T' + jasapandu.jamMulai,
				  tglSelesai: $filter('date')(jasapandu.tglSelesai, 'yyyy-MM-dd') + 'T' + jasapandu.jamSelesai
				}

				RealisasiPandu.save(dataRealisasi, function(response3) {
				  $scope.queueProcess.pop();
				});

			  });

			  if (jasapandu.kapalGandeng) {
				if (jasapandu.kapalGandeng.length > 0) {
				  for (var y = 0; y < jasapandu.kapalGandeng.length; y++) {
					if (!jasapandu.kapalGandeng[y].id) {
					  $scope.kapalGandeng[y] = jasapandu.kapalGandeng[y];
					  $scope.kapalGandeng[y].noPpk1 = $scope.permohonan.noPpk1;
					  $scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
					  AddKapalGandeng.save($scope.kapalGandeng[y], function(response) {
						$scope.setNotification = {
						  type: "success",
						  message: "Data berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					  }, function() {
						$scope.setNotification = {
						  type: "warning",
						  message: "Data tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					  });
					}
				  }
				  checkunique = [];
				}
			  }

			  AppParam.get({
				nama: 'JENIS_PANDU'
			  }, function(response) {
				var content = response.content;
				for (var idx = 0; idx < content.length; idx++) {
				  for (var j = 0; j < $scope.temppandu.length; j++) {
					if ($scope.temppandu[j].jenisPanduText == null) {
					  if ($scope.temppandu[j].jenisPandu == content[idx].value) {
						$scope.temppandu[j].jenisPanduText = content[idx].caption;
					  }
					}
				  }
				}
			  });

			  AppParam.get({
				nama: 'JENIS_GERAKAN'
			  }, function(response) {
				var content = response.content;
				for (var idx = 0; idx < content.length; idx++) {
				  for (var j = 0; j < $scope.temppandu.length; j++) {
					if ($scope.temppandu[j].jenisGerakanText == null) {
					  if ($scope.temppandu[j].jenisGerakan == content[idx].value) {
						$scope.temppandu[j].jenisGerakanText = content[idx].caption;
					  }
					}
				  }
				}
			  });


			  $scope.setNotification = {
				type: "success",
				message: "Jasa Pandu berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			  if ($routeParams.id) {
				response.fake = false;
				$scope.temppandu.push(response);
				$scope.jasapandugrid = $scope.temppandu;
			  }
			  $scope.jasapandu.noPpkJasa === undefined;
			  $scope.jasapandu.lokasiAsal = '';
			  $scope.jasapandu.lokasiTujuan = '';
			  $scope.jasapandu.jenisPandu = '';
			  $scope.jasapandu.jenisGerakan = '';
			  $scope.tglPandu = new Date();
			  document.getElementById("jamPanduVal").value = moment().format('HH:mm');
			  $scope.kapalGandengArray = [];
			  $scope.kapalGandengUpdateArray = [];
			} else {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			jasapandu.done = true;
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  };

	  //reset Pandu
	  $scope.resetPandu = function() {
		$scope.jasapandu = {};
		$scope.jasapandu.jenisPandu = '1';
		$scope.tglPandu = new Date();
		document.getElementById("jamPanduVal").value = moment().format('HH:mm');
		$scope.kapalGandengArray = [];
		$scope.jasapandu.tglSetuju = new Date();
		$scope.jasapandu.jamSetuju = moment().format('HH:mm');
		$scope.jasapandu.jenisKep = 'normal';
		$scope.jasapandu.tglMulai = new Date();
		$scope.jasapandu.jamMulai = moment().format('HH:mm');
		$scope.jasapandu.tglSelesai = new Date();
		$scope.jasapandu.jamSelesai = moment(timePlus1).format('HH:mm');
		$scope.jasapandu.jamNaik = moment().format('HH:mm');
		$scope.jasapandu.jamKapalGerak = moment().format('HH:mm');
		$scope.jasapandu.jamTurun = moment(timePlus1).format('HH:mm');
		$scope.jasapandu.flagApbs = 0;
	  };
	  /*================================jasa tunda==========================================*/
	  //delete jasa tunda
	  $scope.deleteTunda = function(id, i) {
		  var checkDeleteTunda = confirm('Apakah Anda akan Menghapus data ini?');
		  if (checkDeleteTunda) {
			if (id == null) {
			  $scope.jasatundagrid.splice(i, 1);
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			} else {
			  PermohonanTundaDelete.delete({
				id: id
			  }, function(response) {
				$scope.jasatundagrid.splice(i, 1);
				$scope.setNotification = {
				  type: "success",
				  message: "Data berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			  }, function() {
				$scope.setNotification = {
				  type: "warning",
				  message: "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			  });
			}
		  }
		}
		//get pmh tunda by ppkjasa
	  $scope.editTunda = function(noppkjasa, i) {
		$scope.indexTunda = i;
		PermohonanTundaDetail.get({
		  noPpkJasa: noppkjasa
		}, function(response) {
		  $scope.jasatunda = response;
		  document.getElementById("jamMulaiTundaVal").value = $filter('date')(response.tglMulai, 'HH:mm');
		  $scope.jasatunda.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
		  $scope.tglMulaiTunda = $scope.splitDate(response.tglMulai);
		  $scope.tglSelesaiTunda = $scope.splitDate(response.tglSelesai);
		  $scope.jasatunda.lokasiAsal = response.namaLokasiAsal;
		  $scope.jasatunda.lokasiTujuan = response.namaLokasiTujuan;
		});
	  };
	  //submit tunda
	  $scope.submitTunda = function(jasatunda) {
		if ($routeParams.id) {
		  jasatunda = $scope.jasatunda;
		}
		if (jasatunda.noPpkJasa === undefined) {
		  $scope.queueProcess.push("X");

		  jasatunda.detailPmhId = $scope.permohonan.details[0].id;
		  jasatunda.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
		  jasatunda.noPpk1 = $scope.permohonan.noPpk1;

		  //concat jam dan waktu tunda
		  if (jasatunda.tglMulai === undefined) {
			var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
			var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
			jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
		  }

		  if (typeof jasatunda.lokasiAsal === 'object') {
			jasatunda.kodeLokasiAsal = jasatunda.lokasiAsal.mdmgKode;
			jasatunda.namaLokasiAsal = jasatunda.lokasiAsal.mdmgNama;
		  } else {
			jasatunda.kodeLokasiAsal = jasatunda.kodeLokasiAsal;
			jasatunda.namaLokasiAsal = jasatunda.namaLokasiAsal;
		  }

		  if (typeof jasatunda.lokasiTujuan === 'object') {
			jasatunda.kodeLokasiTujuan = jasatunda.lokasiTujuan.mdmgKode;
			jasatunda.namaLokasiTujuan = jasatunda.lokasiTujuan.mdmgNama;
		  } else {
			jasatunda.kodeLokasiTujuan = jasatunda.kodeLokasiTujuan;
			jasatunda.namaLokasiTujuan = jasatunda.namaLokasiTujuan;
		  }

		  PermohonanTunda.save(jasatunda, function(response) {
			if (response.status !== '500') {
			  var dataPenetapan = {
				jamSetuju: jasatunda.jamSetuju,
				kodeLokasiAsal: response.kodeLokasiAsal,
				kodeLokasiTujuan: response.kodeLokasiTujuan,
				namaLokasiAsal: response.namaLokasiAsal,
				namaLokasiTujuan: response.namaLokasiTujuan,
				noPpk1: response.noPpk1,
				noPpkJasa: response.noPpkJasa,
				status: response.status,
				tglMulai: response.tglMulai,
				tglSetuju: response.tglSelesai
			  }

			  PenetapanTunda.save(dataPenetapan, function(response2) {
				var dataRealisasi = {
				  statusPelaksanaan: 2,
				  catatan: jasatunda.catatan,
				  jamKerja: jasatunda.jamKerja,
				  jamMulai: jasatunda.jamMulai,
				  jamSelesai: jasatunda.jamSelesai,
				  jenisTunda: jasatunda.jenisTunda,
				  kodeLokasiAsal: response.kodeLokasiAsal,
				  kodeLokasiTujuan: response.kodeLokasiTujuan,
				  namaLokasiAsal: response.namaLokasiAsal,
				  namaLokasiTujuan: response.namaLokasiTujuan,
				  noPpk1: response.noPpk1,
				  noPpkJasa: response.noPpkJasa,
				  tglMulai: jasatunda.tglMulai,
				  tglSelesai: jasatunda.tglSelesai,
				  dokumen: jasatunda.dokumen
				}

				var formData = new FormData();
				formData.append('reaTunda', new Blob([JSON.stringify(dataRealisasi)], { type: "application/json" }));
				if (jasatunda.uploadFile !== undefined && jasatunda.uploadFile.length > 0) {
				  formData.append('file', jasatunda.uploadFile[0]);
				}
				RealisasiTunda.save(formData, function(response3) {
				  jasatunda.kapalTundaArray.forEach(function(item) {
					$scope.queueProcess.push("X");
					item.noPpk1 = response.noPpk1;
					item.noPpkJasa = response.noPpkJasa;
					AddReaKapalTunda.save(item, function(response4) {
					  $scope.queueProcess.pop();
					});
				  });

				  jasatunda.kapalTundaGandengArray.forEach(function(item) {
					$scope.queueProcess.push("X");
					item.noPpk1 = response.noPpk1;
					item.noPpkJasa = response.noPpkJasa;
					AddReaKapalTundaGandeng.save(item, function(response5) {
					  $scope.queueProcess.pop();
					});
				  });

				  $scope.queueProcess.pop();
				});

			  });

			  $scope.setNotification = {
				type: "success",
				message: "Jasa Tunda berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			  if ($routeParams.id) {
				response.fake = false;
				$scope.temptunda.push(response);
				$scope.jasatundagrid = $scope.temptunda;
			  }
			  $scope.jasatunda.noppkjasa = undefined;
			  $scope.jasatunda.lokasiAsal = '';
			  $scope.jasatunda.lokasiTujuan = '';
			  $scope.tglMulaiTunda = new Date();
			  $scope.tglSelesaiTunda = new Date();
			  document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
			} else {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil tersimpan"
			  };
			  Notification.setNotification($scope.setNotification);
			}
		  }, function() {
			jasatunda.done = true;
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  };

	  //reset Tunda
	  $scope.resetTunda = function() {
		$scope.jasatunda = {};
		$scope.kapalTundaGandeng = {};
		$scope.kapalTundaArray = [];
		$scope.kapalTundaGandengArray = [];
		$scope.tglMulaiTunda = new Date();
		$scope.tglSelesaiTunda = new Date();
		document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
		$scope.jasatunda.tglSetuju = new Date();
		$scope.jasatunda.jamSetuju = moment().format('HH:mm');
		$scope.jasatunda.tglSelesai = new Date();
		$scope.jasatunda.jamSelesai = moment(timePlus1).format('HH:mm');
		$scope.jasatunda.jenisTunda = '1';
		$scope.jasatunda.jamKerja = '1';
		$scope.kapalTundaGandeng.tglMulai = new Date();
		$scope.kapalTundaGandeng.jamMulai = moment().format('HH:mm');
		$scope.kapalTundaGandeng.tglSelesai = new Date();
		$scope.kapalTundaGandeng.jamSelesai = moment(timePlus1).format('HH:mm');
	  };

	  /*=============================jasa air kapal===========================================*/
	  //delete jasa air kapal
	  $scope.deleteAirKapal = function(id, i) {
		var checkDeleteAir = confirm('Apakah Anda akan Menghapus data ini?');
		if (checkDeleteAir) {
		  if (id == null) {
			$scope.jasatundagrid.splice(i, 1);
			$scope.setNotification = {
			  type: "success",
			  message: "Data berhasil dihapus"
			};
			Notification.setNotification($scope.setNotification);
		  } else {
			PermohonanAirKapalDelete.delete({
			  id: id
			}, function(response) {
			  $scope.jasaairgrid.splice(i, 1);
			  $scope.setNotification = {
				type: "success",
				message: "Data berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			}, function() {
			  $scope.setNotification = {
				type: "warning",
				message: "Data tidak berhasil dihapus"
			  };
			  Notification.setNotification($scope.setNotification);
			});
		  }
		}
	  };
	  //get pmh air kapal by ppkjasa
	  $scope.editAirKapal = function(noppkjasa, i) {
		$scope.indexAirKapal = i;
		PermohonanAirKapalDetail.get({
		  noPpkJasa: noppkjasa
		}, function(response) {
		  $scope.jasaair = response;
		  document.getElementById("jamIsiVal").value = $filter('date')(response.tglIsi, 'HH:mm');
		  $scope.tglIsi = $scope.splitDate(response.tglIsi);
		  $scope.jasaair.dermaga = response.namaDermaga;
		});
	  };

	  //submit air kapal
	  $scope.submitAirKapal = function(jasaair) {
		if ($routeParams.id) {
		  jasaair = $scope.jasaair;
		}
		if (jasaair.noPpkJasa === undefined) {
		  $scope.queueProcess.push("X");

		  jasaair.detailPmhId = $scope.permohonan.details[0].id;
		  jasaair.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
		  jasaair.noPpk1 = $scope.permohonan.noPpk1;

		  //concat jam dan waktu mulai
		  if (jasaair.tglIsi === undefined) {
			var tglIsiVal = $filter('date')($scope.tglIsi, 'yyyy-MM-dd');
			var jamIsiVal = document.getElementById("jamIsiVal").value;
			jasaair.tglIsi = tglIsiVal + 'T' + jamIsiVal;
		  }

		  //$scope.jasaair.alatIsi = $scope.jasaair.alatIsi;
		  jasaair.volume = parseInt(jasaair.volume);

		  jasaair.kodeDermaga = jasaair.dermaga.mdmgKode;
		  jasaair.namaDermaga = jasaair.dermaga.mdmgNama;

		  PermohonanAirKapal.save(jasaair, function(response) {
			var dataPenetapan = {
			  "alatIsi": response.alatIsi,
			  "kodeDermaga": response.kodeDermaga,
			  "namaDermaga": response.namaDermaga,
			  "noPpk1": response.noPpk1,
			  "noPpkJasa": response.noPpkJasa,
			  "satuanVolume": response.satuan,
			  "status": response.status,
			  "tglIsi": response.tglIsi,
			  "volume": response.volume
			};

			PenetapanAirKapal.save(dataPenetapan, function(response2) {
			  var dataRealisasi = {
				statusPelaksanaan: 2,
				alatIsi: jasaair.alatIsi,
				jamKerja: jasaair.jamKerja,
				jamMulaiIsi: jasaair.jamIsi,
				jamSelesaiIsi: jasaair.jamSelesai,
				jamSetuju: jasaair.jamSetuju,
				kodeDermaga: response.kodeDermaga,
				namaDermaga: response.namaDermaga,
				noPpk1: response.noPpk1,
				noPpkJasa: response.noPpkJasa,
				satuanVolume: response.satuan,
				status: response.status,
				tglMulaiIsi: jasaair.tglIsi,
				tglSelesaiIsi: jasaair.tglSelesai,
				tglSetuju: jasaair.tglSetuju,
				volume: jasaair.volume
			  }

			  RealisasiAirKapal.save(dataRealisasi, function(response3){
				jasaair.tabelAlatIsi.forEach(function(item){
				  $scope.queueProcess.push("X");
				  var dataAlatIsi = {
					alatIsi: item.alatIsi,
					alatIsiAir: item.alatIsiAir,
					alatIsiText: item.alatIsiText,
					idReaAirKapal: response3.id,
					jamMulai: item.jamMulai,
					jamSelesai: item.jamSelesai,
					mAkhir: item.mAkhir,
					mAwal: item.mAwal,
					meteranAkhir: item.meteranAkhir,
					meteranAwal: item.meteranAwal,
					tglMulaiIsi: item.tglMulaiIsi,
					tglSelesaiIsi: item.tglSelesaiIsi,
					volume: item.volume
				  }

				  RealisasiAirKapalDetailAlatIsi.save(dataAlatIsi,function(response4){
					$scope.queueProcess.pop();
				  })

				});

				jasaair.tabelKapalPenunjang.forEach(function(item){
				  $scope.queueProcess.push("X");
				  var dataKapalPenunjang = {
					idReaAirKapal: response3.id,
					jamMulaiIsi: item.jamMulaiIsi,
					jamSelesaiIsi: item.jamSelesaiIsi,
					kapal: item.kapal,
					kapalPenunjang: item.kapalPenunjang,
					kapalText: item.kapalText,
					tglMulaiIsi: item.tglMulaiIsi,
					tglSelesaiIsi: item.tglSelesaiIsi
				  }

				  RealisasiAirKapalDetailKapalPenunjang.save(dataKapalPenunjang,function(response5){
					$scope.queueProcess.pop();
				  });

				});

				$scope.queueProcess.pop();
			  })
			});

			jasaair.done = true;
			$scope.setNotification = {
			  type: "success",
			  message: "Jasa Air Kapal berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			AppParamValue.get({
			  nama: 'ALAT_ISI_AIR',
			  value: response.alatIsi
			}, {}, function(value) {
			  response.alatIsiText = value[0].caption;
			});
			if ($routeParams.id) {
			  response.fake = false;
			  $scope.tempair.push(response);
			  $scope.jasaairgrid = $scope.tempair;
			}

		  }, function() {
			jasaair.done = true;
			$scope.setNotification = {
			  type: "warning",
			  message: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
		  });
		}
	  };

	  //reset Air Kapal
	  $scope.resetAirKapal = function() {
		$scope.jasaair = {};
		$scope.tglIsi = new Date();
		document.getElementById("jamIsiVal").value = moment().format('HH:mm');
		$scope.jasaair.tglIsi = new Date();
		$scope.jasaair.jamIsi = moment().format('HH:mm');
		$scope.jasaair.tglSetuju = new Date();
		$scope.jasaair.jamSetuju = moment().format('HH:mm');
		$scope.jasaair.tglSelesaiIsi = new Date();
		$scope.jasaair.jamSelesaiIsi = moment(timePlus1).format('HH:mm');
		$scope.tempNewAlatIsi = {};
		$scope.tempNewAlatIsi.tglMulai = new Date();
		$scope.tempNewAlatIsi.jamMulai = moment().format('HH:mm');
		$scope.tempNewAlatIsi.tglSelesai = new Date();
		$scope.tempNewAlatIsi.jamSelesai = moment().format('HH:mm');
		$scope.tempNewKapalPenunjang = {};
		$scope.tempNewKapalPenunjang.tglMulai = new Date();
		$scope.tempNewKapalPenunjang.jamMulaiIsi = moment().format('HH:mm');
		$scope.tempNewKapalPenunjang.tglSelesai = new Date();
		$scope.tempNewKapalPenunjang.jamSelesai = moment(timePlus1).format('HH:mm');
		$scope.tabelAlatIsi = [];
		$scope.tabelKapalPenunjang = [];
	  };
	  /*=============================tambah jasa================================================*/
	  $scope.submitJasaBaru = function() {
		PermohonanMultiDetail.save({
		  noPpk1: $scope.permohonan.noPpk1
		}, {}, function(response) {
		  // Set EPB
		  StatusEPBPermohonan.get({
			ppk1: response.noPpk1,
			urutan: response.urutanPermohonan
		  }, function() {});

		  document.getElementById("labuhTab").style.display = "block";
		  document.getElementById("tambatTab").style.display = "block";
		  document.getElementById("panduTab").style.display = "block";
		  document.getElementById("tundaTab").style.display = "block";

		  UserRole.checkJasa();
		  $scope.permohonan.details[0] = response;
		  $scope.$watch('permohonan', function() {
			$scope.submitPerJasa();
		  });
		});
	  }

	  /*===================================autocomplete========================================*/
	  //autocomplete
	  $scope.getListOfDermagaLabuh = function(value) {
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

	  $scope.getListOfDermagaTambat = function(value) {
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

	  $scope.getListOfDermagaPandu = function(value) {
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

	  $scope.getListOfDermagaPanduTujuan = function(value) {
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

	  $scope.getListOfDermagaTunda = function(value) {
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

	  $scope.getListOfDermagaTundaTujuan = function(value) {
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

	  $scope.getListOfDermagaAir = function(value) {
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

	  $scope.getListOfAgenKapal = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			MdmPelangganSearch.get({
			  nama: value,
			  kodeTerminal : localStorage.getItem('kodeTerminal'),
			  limit: '10'
			}, function(response) {
			  resolve(response);
			  response.forEach(function (response) {
				response.mplgNamaKode = response.mplgNama +' ('+response.mplgKode + ')';
			  });
			});
		  });
		}
	  };

	  $scope.getListOfPelabuhan = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			MdmPelabuhanSearch.get({
			  nama: value,
			  limit: '10'
			}, function(response) {
			  	resolve(response);
			  	response.forEach(function (response) {
	            response.mkplNamaPlb = response.mplbNama +' ('+response.mplbKode+')';
	         });
			});
		  });
		}
	  };

	  $scope.getListOfPelabuhanTujuan = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			MdmPelabuhanSearch.get({
			  nama: value,
			  limit: '10'
			}, function(response) {
			  	resolve(response);
			  	response.forEach(function (response) {
	            response.mkplNamaPlb = response.mplbNama +' ('+response.mplbKode+')';
	         });
			});
		  });
		}
	  };

	  $scope.getListKapal = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			MdmKapalSearchByName.get({
			  "nama": value,
			  "limit": 10
			}, function(response) {
			  resolve(response);
			  response.forEach(function (response) {
				response.mkplNamaLoa = response.mkplNama +' (LOA: '+response.mkplLoa + ' GT: '+response.mkplGrt+')';
			  });
			});
		  });
		}
	  };

	$scope.getListPpk1 = function(value) {
		if (value) {
		  return new Promise(function(resolve, reject) {
			SearchPpk1WithCabang.get({
			  "ppk1": value,
			  "limit": 10
			}, function(response) {
			  resolve(response);
			});
		  });
		}
	};

	$scope.splitDate = function(date) {
		var splitDate = date.split('T');
		return new Date(splitDate[0]);
	}

	$scope.setDefaultTglPandu = function(){
		var date = $filter('date')($scope.jasapandu.tglMulai, 'dd-MM-yyyy');
		var parts = date.split("-");
		var tglMulaiPandu = parts[2]+'-'+parts[1]+'-'+parts[0];
		var jamMulaiPandu = $scope.jasapandu.jamMulai;
		var tglJamMulaiPandu = new Date(tglMulaiPandu + ' ' + jamMulaiPandu);
		var plusMinutes = tglJamMulaiPandu.setMinutes(tglJamMulaiPandu.getMinutes() + 5);
		var plusHours = tglJamMulaiPandu.setHours(tglJamMulaiPandu.getHours() + 1);
		var timePlusMinutes = $filter('date')(plusMinutes, 'HH:mm');
		var timePlusHours = $filter('date')(plusHours, 'HH:mm');

		$scope.jasapandu.jamNaik = timePlusMinutes;
		$scope.jasapandu.jamKapalGerak = timePlusMinutes;
		$scope.jasapandu.jamSelesai = timePlusHours;
		$scope.jasapandu.jamTurun = timePlusHours;
	}

	$scope.setDefaultTglPandu();

	  // akhir
	}
  ])
