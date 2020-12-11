'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPermohonannewCtrl
 * @description
 * # TransaksiPermohonannewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiPermohonannewCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$filter', '$timeout','$http','API_PATH','BindKapal','$window',
		'PermohonanAdd', 'PermohonanAirKapal', 'PermohonanLabuh', 'PermohonanTambat', 'PermohonanTunda',
		'PermohonanPandu', 'PermohonanDetail', 'PermohonanLabuhDetail', 'PermohonanAirKapalDetail', 'PermohonanTambatDetail',
		'PermohonanPanduDetail', 'PermohonanTundaDetail', 'AppParam', 'MdmPelangganSearch', 'MdmPelabuhanSearch', 'MdmDermagaJasa','MdmDermagaPerJasa', 'AppParamValue', 'PermohonanAirKapalDelete',
		'PermohonanLabuhDelete', 'PermohonanTambatDelete', 'PermohonanPanduDelete', 'PermohonanTundaDelete', 'PermohonanLabuhEdit',
		'PermohonanAirKapalEdit', 'PermohonanTambatEdit', 'PermohonanPanduEdit', 'PermohonanTundaEdit','MdmKapalSearchByName','AturanGerakPanduList','PermohonanList','Notification','ListKapalGandeng',
		'AddKapalGandeng','DeleteKapalGandeng','SearchKapalGandeng','MdmKapalSearch','PermohonanEdit','PermohonanByKodeKapal','PermohonanMultiDetail','validationForm',
		'PermohonanDetailByPpk','UserRole','LoadingScreen','PermohonanSetDone','DetailByPpk1','MdmDermagaSearchByKode','BuildPDF','CheckLockAgen','PermohonanCalculateEPB','PermohonanRecalculateEPB',
		'PermohonanGetEPB','Validations','PermohonanUnfinished','KapalLangsungSandar','PermohonanPanduBulk','PermohonanTundaBulk','SharedVariable','HistoryRevisiTambat','BindEskalasi','TipeEskalasi',
		'TipeEskalasiList','CheckBatasMasaTambat','GenerateIdVisit','PmhLayananKapal','MdmKapalByKode','SearchPpk1WithCabang',
function($scope, $location, $rootScope, $routeParams, $filter, $timeout, $http,API_PATH, BindKapal, $window,
	PermohonanAdd, PermohonanAirKapal, PermohonanLabuh, PermohonanTambat, PermohonanTunda,
	PermohonanPandu, PermohonanDetail, PermohonanLabuhDetail, PermohonanAirKapalDetail, PermohonanTambatDetail,
	PermohonanPanduDetail, PermohonanTundaDetail, AppParam, MdmPelangganSearch, MdmPelabuhanSearch, MdmDermagaJasa, MdmDermagaPerJasa,AppParamValue, PermohonanAirKapalDelete,
	PermohonanLabuhDelete, PermohonanTambatDelete, PermohonanPanduDelete, PermohonanTundaDelete, PermohonanLabuhEdit,
	PermohonanAirKapalEdit, PermohonanTambatEdit, PermohonanPanduEdit, PermohonanTundaEdit,MdmKapalSearchByName,AturanGerakPanduList,PermohonanList,Notification,ListKapalGandeng,
	AddKapalGandeng,DeleteKapalGandeng,SearchKapalGandeng,MdmKapalSearch,PermohonanEdit,PermohonanByKodeKapal,PermohonanMultiDetail,validationForm,
	PermohonanDetailByPpk,UserRole,LoadingScreen,PermohonanSetDone,DetailByPpk1,MdmDermagaSearchByKode,BuildPDF,CheckLockAgen,PermohonanCalculateEPB,
	PermohonanRecalculateEPB,PermohonanGetEPB,Validations,PermohonanUnfinished,KapalLangsungSandar,PermohonanPanduBulk, PermohonanTundaBulk,SharedVariable,HistoryRevisiTambat,BindEskalasi,
	TipeEskalasi,TipeEskalasiList,CheckBatasMasaTambat,GenerateIdVisit,PmhLayananKapal,MdmKapalByKode,SearchPpk1WithCabang){
	LoadingScreen.show();
		document.getElementById("labuhTab").style.display = "none";
		document.getElementById("tambatTab").style.display = "none";
		document.getElementById("panduTab").style.display = "none";
		document.getElementById("tundaTab").style.display = "none";
		document.getElementById("airkapalTab").style.display = "none";
		$scope.tooltipInfo = Notification.setMessageValidFile();
		$scope.options = {
			autoclose: true,
			todayBtn: 'linked',
			todayHighlight: true,
			orientation:'bottom'
		};
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
		$scope.jasalabuhgrid = [];
		$scope.jasatambatgrid = [];
		$scope.jasapandugrid = [];
		$scope.jasatundagrid = [];
		$scope.jasaairgrid = [];
		$scope.editForm = false;
		$scope.permohonan.btnLabuh = 'active';
		$scope.gandengBtn = true;
		$scope.gandengBtnOnLabuh = true;
		$scope.kapalGandeng = {};
		$scope.kapalGandengArray = [];
		$scope.kapalGandengUpdateArray = [];
		$scope.btnSubmit = true;
		$scope.inputTambahJasa = false;
		$scope.newJasaSaved = false;
		$scope.btnLabuhSave = true;
		$scope.btnAirSave = true;
		$scope.jasalabuhgridpast = [];
		$scope.jasatambatgridpast = [];
		$scope.jasapandugridpast = [];
		$scope.jasatundagridpast = [];
		$scope.jasaairgridpast = [];
		$scope.gridPast = false;
		$scope.jasaLabuhArray = [];
		$scope.jasaTambatArray = [];
		$scope.jasaPanduArray = [];
		$scope.jasaTundaArray = [];
		$scope.jasaAirArray = [];
		$scope.alert = {};
		$scope.alert.show = false;
		$scope.arrayJasa = [];
		$scope.showLoader = false;
		$scope.disabledColoumnKapal = true;
		$scope.tooltipInfoVal41 = "Karena default tanggal pada VASA hari ini, maka inputan tidak boleh kurang dari hari ini.<br><br>Kode validasi: <b>VALPMH-041</b>";
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
		$scope.jamSelesaiTunda = moment(timePlus1).format('HH:mm');
		$scope.jasapandu.lokasiAsal = "";
		$scope.jasapandu.lokasiTujuan = "";
		$scope.lokasiAsalGerakPandu = "";
		$scope.lokasiTujuanGerakPandu = "";
		$scope.btnMainSimpan = false;
		$scope.afterSubmit = false;
		$scope.agentChanged = false;
		$scope.loaMax = false;
		$scope.loaMaxvalue = 0;
		$scope.showEntryKemasan = false;
		$scope.flagBongkarMuat = false;
		$scope.requiredEntryKemasan = false;
		$scope.dermagaAirRequired = false;
		$scope.escTypeCode = '';
		if(!$routeParams.escMode)BindEskalasi.setDefaultEskalasi();
		var kapalWajibPandu = false;
		var checkunique = [];
		var checkPastLabuh = [];
		var checkPastTambat = [];
		var checkPastPandu = [];
		var checkPastTunda = [];
		var checkPastAir = [];
		var valueField = '';

		$scope.valueKapal = BindKapal.getKapal(); 
		$scope.isAirKapal = SharedVariable.getSharedVariables();

		if ($scope.isAirKapal === false) {
			$scope.locationPath = '/transaksi/permohonanlist';
		} else {
			$scope.locationPath = '/airkapal/permohonan';
		}
		
		if($routeParams.escMode){
			//cek untuk akses halaman, jika tidak melalui eskalasi maka akan redirect ke halaman daftar permohonan.
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH032');
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH032');
			if(hasEsc){
				document.getElementById("tambatTab").style.display = "none";
				$scope.escTypeCode = itemEskalasi.escTypeCode;
				$scope.afterSubmit = true;
				$scope.dataUmumBtn = true;
				$scope.btnSubmit = true;
			}else{
				$window.history.back();
			}
		}

		$scope.getTipeEskalasi = function(){
			TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
				TipeEskalasi.setTipeEskalasi(response.content);
			});
		};

		$scope.getTipeEskalasi();

		$scope.checkValue = function(value){
			valueField = value;
		}

		$scope.goHistoryPage = function(){
			$location.path($scope.locationPath);
		}

		$scope.setShowKemasan = function(){
			if(typeof $scope.jasatambat.lokasi === 'object'){
				var jenisDmg = $scope.jasatambat.lokasi.mdmgJenisDmg;
				var kemasanBongkar = $scope.permohonan.kemasanBongkar;
				var kemasanMuat = $scope.permohonan.kemasanMuat;
				var flagTender = $scope.jasatambat.flagTender;
				var sifatKunjungan = $scope.permohonan.sifatKunjungan;
				if((kemasanBongkar=='' || kemasanBongkar==undefined) && (kemasanMuat=='' || kemasanMuat==undefined) && jenisDmg==='DMGUMUM' && flagTender==='0'){
					$scope.showEntryKemasan = true;
					if(($scope.permohonan.kemasanBongkarTambat==='' || $scope.permohonan.kemasanBongkarTambat===undefined) && ($scope.permohonan.kemasanMuatTambat==='' || $scope.permohonan.kemasanMuatTambat===undefined) && sifatKunjungan==='1'){
						$scope.requiredEntryKemasan = true;
					}else{
						$scope.requiredEntryKemasan = false;
					}
				}else{
					$scope.showEntryKemasan = false;
					$scope.requiredEntryKemasan = false;
				}
			}
		}

		/*start untuk menentukan show entry kemasan dan required entry kemasan*/
		$scope.$watch('jasatambat.lokasi', function() {
			$scope.setShowKemasan();
		});

		$scope.$watch('flagBongkarMuat', function(newValue) {
			if(newValue){
				$http.get(API_PATH+'pmh_tambat/get_batas_masa_tambat?kodeCabang='+String(localStorage.kodeTerminal)+'&kodeKapal='+$scope.permohonan.kodeKapal)
				.success(function (response) {
					if(response){
						$scope.requiredEntryKemasan = false;
						$scope.flagBongkarMuat = true;
					}else{
						$('#modalValidationTanpaBM').modal('show');
						$scope.requiredEntryKemasan = true;
						$scope.flagBongkarMuat = false;
						$scope.permohonan.kemasanBongkarTambat = '';
						$scope.permohonan.kemasanMuatTambat = '';
					}
				});
			}else{
				$scope.requiredEntryKemasan = true;
			}
		});

		$scope.$watch('jasatambat.flagTender', function() {
			$scope.setShowKemasan();
		});

		$scope.$watch('permohonan.kemasanBongkarTambat', function() {
			$scope.setShowKemasan();
		});

		$scope.$watch('permohonan.kemasanMuatTambat', function() {
			$scope.setShowKemasan();
		});

		$scope.$watch('permohonan.sifatKunjungan', function() {
			$scope.setShowKemasan();
		});
		/*end untuk menentukan show entry kemasan dan required entry kemasan*/

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

		$scope.validationLookupPpk1 = function() {
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

		$scope.validationLookupAgen = function(){
			if(valueField !== $scope.permohonan.namaAgen){
				if(typeof $scope.permohonan.namaAgen != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-001</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaAgen = '';
				}
			}
		}

		$scope.validationNegaraAsal = function(val){
			if(val !== ''){
				if(typeof $scope.permohonan.namaPelabuhanAsal == 'object'){
					if($scope.permohonan.namaPelabuhanAsal.mnegKode == null){
						$scope.setNotification  = {
							type	: 'warning',
							message	: '<b>Peringatan : Pelabuhan '+$scope.permohonan.namaPelabuhanAsal.mplbNama+' tidak memiliki Kode Negara, dapat meyebabkan gagal simpan jasa.</b>'
						};
						Notification.setNotification($scope.setNotification);
						$scope.permohonan.namaPelabuhanAsal = '';
					}
				}
			}
		}

		$scope.validationNegaraTujuan = function(val){
			if(val !== ''){
				if(typeof $scope.permohonan.namaPelabuhanTujuan == 'object'){
					if($scope.permohonan.namaPelabuhanTujuan.mnegKode == null){
						$scope.setNotification  = {
							type	: 'warning',
							message	: '<b>Peringatan : Pelabuhan '+$scope.permohonan.namaPelabuhanTujuan.mplbNama+' tidak memiliki Kode Negara, dapat meyebabkan gagal simpan jasa.</b>'
						};
						Notification.setNotification($scope.setNotification);
						$scope.permohonan.namaPelabuhanTujuan = '';
					}
				}
			}
		}

		$scope.validationLookupAsal = function(){
			if(valueField !== $scope.permohonan.namaPelabuhanAsal){
				if(typeof $scope.permohonan.namaPelabuhanAsal != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-002</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaPelabuhanAsal = '';
				}
			}
		}
		$scope.validationLookupTujuan = function(){
			if(valueField !== $scope.permohonan.namaPelabuhanTujuan){
				if(typeof $scope.permohonan.namaPelabuhanTujuan != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-003</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaPelabuhanTujuan = '';
				}
			}
		}

		$scope.validationLookupLokasiLabuh = function(){
			if(valueField !== $scope.jasalabuh.lokasi){
				if(typeof $scope.jasalabuh.lokasi != 'object'){
					$scope.setNotification  = {
						type	: "warning",
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-005</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasalabuh.lokasi = '';
				}else if (typeof $scope.jasalabuh.lokasi == 'object'){
					AturanGerakPanduList.get({
						kodeLokasi: $scope.jasalabuh.lokasi.mdmgKode,
						namaLokasi: $scope.jasalabuh.lokasi.mdmgNama,
						flagAktif:1
					}, function(response) {
						if(response.content.length>0){
							$scope.setNotification  = {
								type	: 'warning',
								message	: 'Lokasi Labuh tidak boleh diisi '+response.content[0].namaLokasi+'</b><br><br>Kode validasi: <b>VALPMH-040</b>'
							};
							Notification.setNotification($scope.setNotification);
							$scope.jasalabuh.lokasi = '';
						}
					});
				}
			}
		}

		$scope.validationLookupLokasiTambat = function(){
			if(valueField !== $scope.jasatambat.lokasi){
				if(typeof $scope.jasatambat.lokasi != 'object'){					
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH007</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.showEntryKemasan = false;
					$scope.jasatambat.lokasi = '';
				}else{
					if($scope.jasatambat.lokasi.mdmgJenisDmg == 'AREALABUH'){
						$scope.setNotification  = {
							type	: 'warning',
							message	: 'Jenis Dermaga '+$scope.jasatambat.lokasi.mdmgNama+' adalah <b>'+$scope.jasatambat.lokasi.mdmgJenisDmg+'</b><br><br>Kode validasi: <b>VALPMH048</b>',
							timeout : 10000
						};
						Notification.setNotification($scope.setNotification);
						$scope.showEntryKemasan = false;
						$scope.jasatambat.lokasi = '';
					}
				}
			}
		}

		$scope.validationLookupAsalPandu = function(){
			if(valueField !== $scope.jasapandu.lokasiAsal){
				if(typeof $scope.jasapandu.lokasiAsal != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-009</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasapandu.lokasiAsal = '';
				}
			}
		}

		$scope.validationLookupTujuanPandu = function(){
			if(valueField !== $scope.jasapandu.lokasiTujuan){
				if(typeof $scope.jasapandu.lokasiTujuan != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-009</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasapandu.lokasiTujuan = '';
				}
			}
		}

		$scope.validationLookupAsalTunda = function(){
			if(valueField !== $scope.jasatunda.lokasiAsal){
				if(typeof $scope.jasatunda.lokasiAsal != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-012</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasatunda.lokasiAsal = '';
				}else if (typeof $scope.jasatunda.lokasiAsal==='object'){
					var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH026');
					var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH026');
					var	statusEskalasi = itemEskalasi.id!==undefined?true:false;
					if(hasEsc){
						return true;
					}else{
						AturanGerakPanduList.get({
							kodeLokasi: $scope.jasatunda.lokasiAsal.mdmgKode,
							namaLokasi: $scope.jasatunda.lokasiAsal.mdmgNama,
							flagAktif:1
						}, function(response) {
							if(response.content.length>0){
								$scope.setNotification  = {
									type	: 'warning',
									message	: 'Lokasi Asal Tunda tidak boleh diisi '+$scope.jasatunda.lokasiAsal.mdmgNama+'</b><br><br>Kode validasi: <b>VALPMH-026</b>',
									hasEsc	: statusEskalasi,
									dataEsc : itemEskalasi
								};
								Notification.setNotification($scope.setNotification);
								$scope.jasatunda.lokasiAsal = '';
							}
						});
					}
				}
			}
		}

		$scope.validationLookupTujuanTunda = function(){
			var jasaPanduGrid;

			if(valueField !== $scope.jasatunda.lokasiTujuan){
				if(typeof $scope.jasatunda.lokasiTujuan != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-012</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasatunda.lokasiTujuan = '';
				}else if (typeof $scope.jasatunda.lokasiTujuan== 'object'){
					var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH026');
					var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH026');
					var	statusEskalasi = itemEskalasi.id!==undefined?true:false;
					if(hasEsc){
						return true;
					}else{
						AturanGerakPanduList.get({
							kodeLokasi: $scope.jasatunda.lokasiTujuan.mdmgKode,
							namaLokasi: $scope.jasatunda.lokasiTujuan.mdmgNama,
							flagAktif:1
						}, function(response) {
							if(response.content.length>0){
								$scope.setNotification  = {
									type	: 'warning',
									message	: 'Lokasi Tujuan Tunda tidak boleh diisi '+$scope.jasatunda.lokasiTujuan.mdmgNama+'</b><br><br>Kode validasi: <b>VALPMH-026</b>',
									hasEsc	: statusEskalasi,
									dataEsc : itemEskalasi
								};
								Notification.setNotification($scope.setNotification);
								$scope.jasatunda.lokasiTujuan = '';
							}
						});
					}
				}

				// if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
				// 	jasaPanduGrid = $scope.jasapandugridpast;
				// }else if($scope.jasalabuhgridpast.length===0 && $scope.jasalabuhgrid.length>0){
				// 	jasaPanduGrid = $scope.jasapandugrid;
				// }else{
				// 	jasaPanduGrid = $scope.jasapandugrid;
				// }

				// if(jasaPanduGrid.length>0){
				// 	var itemPandu = typeof jasaPanduGrid[0].lokasiTujuan==='object'?jasaPanduGrid[0].lokasiTujuan.mdmgKode:jasaPanduGrid[0].kodeLokasiTujuan;
				// 	var itemTunda = typeof $scope.jasatunda.lokasiTujuan==='object'?$scope.jasatunda.lokasiTujuan.mdmgKode:$scope.jasatunda.lokasiTujuan.kodeLokasiTujuan;
				// 	if(itemPandu!==itemTunda){
				// 		$scope.setNotification  = {
				// 			type	: 'warning',
				// 			message	: 'Lokasi Tunda harus sama dengan Lokasi Pandu<br><br>Kode validasi: <b>VALPMH-027</b>'
				// 		};
				// 		Notification.setNotification($scope.setNotification);
				// 		$scope.jasatunda.lokasiTujuan = '';
				// 	}
				// }

			}
		}

		$scope.validationLookupDermagaAir= function(){
			if(valueField !== $scope.jasaair.dermaga){
				if(typeof $scope.jasaair.dermaga != 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-013</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.jasaair.dermaga = '';
				}
			}
		}

		$scope.validationLookupKapalGandeng = function(){
			if(valueField !== $scope.kapalGandeng.kapal){
				if(typeof $scope.kapalGandeng.kapal!= 'object'){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandeng.kapal = '';
				}
			}
		}

		$scope.validationLookupKapal = function(){
			if(valueField !== $scope.permohonan.namaKapal){
				if(typeof $scope.permohonan.namaKapal!= 'object' && !$routeParams.id){
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaKapal = '';
				}else{
					$scope.cekLayanan($scope.permohonan.namaKapal);
				}
			}
		}

		$scope.cekLayanan = function(kapal) {
			if (kapal.mkplKode !== undefined) {
	        	if(kapal.mkplBendera == null){
	        		$scope.setNotification  = {
						type	: 'warning',
						message	: 'Kapal '+kapal.mkplNama+' tidak memiliki data Bendera. <br>Silahkan informasikan ke pengguna jasa untuk melengkapi data tersebut dengan melampirkan surat ukur.'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaKapal = '';
					return false;
	        	}

	        	if(kapal.mkplKode !==$scope.permohonan.kodeKapal){
					PermohonanUnfinished.get({
					  	kodeKapal: kapal.mkplKode
					}, function(response) {
				        if (response.flagDone===1) {
				        	$scope.setNotification  = {
								type	: 'warning',
								message	: 'Kapal masih memiliki Layanan aktif.'
							};
							Notification.setNotification($scope.setNotification);
							$scope.permohonan.namaKapal = '';
				        	$scope.setInformasiKapal();
				        }else{
				        	$scope.setInformasiKapal(kapal);
				        }
					}, function(){});
	        	}else{
	        		$scope.setInformasiKapal(kapal);
	        	}
        	}
		};

		$scope.setInformasiKapal = function(kapal) {
			if(kapal){
				$scope.permohonan.namaKapal = kapal.mkplNama;
				$scope.permohonan.negaraKapal = kapal.mkplBendera;
	        	$scope.permohonan.gtKapal = kapal.mkplGrt;
	        	$scope.permohonan.loaKapal = kapal.mkplLoa;
	        	$scope.permohonan.loa = kapal.mkplLoa;
	        	$scope.permohonan.kodeKapal = kapal.mkplKode;
	        	$scope.permohonan.jenisKapal = kapal.mkplJenis;
	        	$scope.permohonan.callSign = kapal.mkplCallSign;
			}else{
				$scope.permohonan.kodeKapal = '';
				$scope.permohonan.negaraKapal = '';
	        	$scope.permohonan.gtKapal = '';
	        	$scope.permohonan.loa = '';
	        	$scope.permohonan.jenisKapal = '';
	        	$scope.permohonan.callSign = '';
			}
		};

		$scope.checkDisabledEditKapal = function() {
			if($routeParams.id){
				// untuk menentukan disabled coloumn kapal
				$http.get(API_PATH+'permohonan/check_edit/'+$routeParams.id)
				.success(function (response) {
					if(response){
						$scope.disabledColoumnKapal = false;
					}else{
						$scope.setNotification  = {
							type	: 'warning',
							message	: 'Kapal tidak bisa dilakukan edit.'
						};
						Notification.setNotification($scope.setNotification);
					}
				});
			}else{
				var hasParams = Boolean(Object.keys($routeParams).length);
				if(!hasParams){
					$scope.disabledColoumnKapal = false;
				}else{
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Kapal tidak bisa dilakukan edit.'
					};
					Notification.setNotification($scope.setNotification);
				}
			}

		};

		$scope.validationDataTambat =  function(jasa){
			var jasaTambatGrid;
			if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
				jasaTambatGrid = $scope.jasatambatgridpast;
			}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
				jasaTambatGrid = $scope.jasatambatgrid;
			}else{
				jasaTambatGrid = $scope.jasatambatgrid;
			}

			jasaTambatGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatGrid)), '-noPpkJasa');

			if(jasaTambatGrid.length > 0){
				var tglMulaiVal0 = Date.parse(jasaTambatGrid[0].tglMulai);
				var tglSelesaiVal0 = Date.parse(jasaTambatGrid[0].tglSelesai);
				var tglMulaiVal1 = Date.parse(jasa.tglMulai);
				var tglSelesaiVal1 = Date.parse(jasa.tglSelesai);

				if((jasa.kodeLokasi == jasaTambatGrid[0].kodeLokasi) && (tglMulaiVal1 == tglMulaiVal0) && (tglSelesaiVal1 == tglSelesaiVal0)){
					return false;
				}else if((jasa.kodeLokasi == jasaTambatGrid[0].kodeLokasi) && (tglMulaiVal1 <= tglMulaiVal0)){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}

		$scope.backToList = function() {
			$location.path($scope.locationPath);
		};

		$scope.$watch('valueKapal', function() { 
			if ($scope.valueKapal != null) { 
				if($scope.valueKapal.gantiAgen || $scope.isAirKapal){
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
					if($scope.valueKapal.gantiAgen){
						$scope.valueKapal.mkplKode = $scope.valueKapal.kodeKapal;
						$scope.valueKapal.mkplNama = $scope.permohonan.namaKapal;
						$scope.valueKapal.mkplJenis = $scope.permohonan.jenisKapal;
					}
					if($scope.isAirKapal){
						$scope.permohonan.kodeKapal = $scope.valueKapal.kodeKapal;
						$scope.permohonan.jenisKapal = $scope.valueKapal.jenisKapal;
						$scope.permohonan.negaraKapal = $scope.valueKapal.negaraKapal;
						$scope.permohonan.callSign = $scope.valueKapal.callSign;
						$scope.permohonan.loa = $scope.valueKapal.loa;
						$scope.permohonan.gtKapal = $scope.valueKapal.gtKapal;
						$scope.permohonan.kodeAgen = $scope.valueKapal.kodeAgen;
						$scope.permohonan.namaAgen = $scope.valueKapal.namaAgen;	
						$scope.permohonan.idVisit = $scope.valueKapal.idVisit;
						document.getElementById("labuhTab").style.display = "none";
						document.getElementById("tambatTab").style.display = "none";	
						document.getElementById("panduTab").style.display = "none";
						document.getElementById("tundaTab").style.display = "none";			
					}
					$scope.agentChanged = true;
				}else{ 
					$scope.permohonan.namaKapal = $scope.valueKapal.mkplNama;
					$scope.permohonan.kodeKapal = $scope.valueKapal.mkplKode;
					$scope.permohonan.jenisKapal = $scope.valueKapal.mkplJenis;
					$scope.permohonan.negaraKapal = $scope.valueKapal.mkplBendera;
					$scope.permohonan.callSign = $scope.valueKapal.mkplCallSign;
					$scope.permohonan.loa = $scope.valueKapal.mkplLoa;
					$scope.permohonan.gtKapal = $scope.valueKapal.mkplGrt;
					/*VALPMH-033*/
					if($scope.valueKapal.mkplJenis === 'KPLTUNDA'|| $scope.valueKapal.mkplJenis === 'TB'){
						$scope.gandengBtn = false; 
						if(localStorage.validasiWajibPanduTunda==='1'){
							$scope.gandengBtnOnLabuh = false;
						}
					}
					/*VALPMH-019*/
					if($scope.valueKapal.mkplJenis === 'KPLTONKANG'){
						document.getElementById("panduTab").style.display = "none";
						document.getElementById("tundaTab").style.display = "none";
					}else if($scope.valueKapal.mkplJenis === 'KPLTNKGMSN'){
						document.getElementById("panduTab").style.display = "block";
						document.getElementById("tundaTab").style.display = "block";
					}
					/*else{
						document.getElementById("panduTab").style.display = "block";
						document.getElementById("tundaTab").style.display = "block";
						document.getElementById("airkapalTab").style.display = "block";
					}	*/

					if($scope.valueKapal.mkplGrtl > 500){
						if($scope.jasapandugrid < 1){
							$scope.jasapandu.jenisGerakan = '1';
						}
					}
				}
			}
		});

		$scope.$watch('tglMasuk', function(newVal, OldVal){
			if(OldVal != newVal){
				datePlus10 = new Date($scope.tglMasuk);
				datePlus10.setDate(datePlus10.getDate() + 10);
				$scope.tglKeluar = datePlus10;
			}
			$timeout(function() {
	            setDisableDateLabuh();
	        }, 1000);
		});

		$scope.$watch('jamPandu', function(){
			$scope.jasatunda.jamMulai = $scope.jamPandu;
		});

		$scope.$watch('tglKeluar', function(){
			$timeout(function() {
				setDisableDateLabuh();
			}, 1000);
		});

		$scope.$watch('tglMulaiTambat', function(){
			$timeout(function() {
				setDisableDateTambat();
			}, 1000);
		});

		$scope.$watch('tglSelesaiTambat', function(){
			$timeout(function() {
				setDisableDateTambat();
			}, 1000);
		});

		$scope.$watch('tglPandu', function(){
			$timeout(function() {
				setDisableDatePandu();
			}, 1000);
		});



		$scope.$watch('tglPandu', function(){
			$('#tglPandu').mask('99-99-9999');
			$scope.tglMulaiTunda = new Date($scope.tglPandu);
		});

		$scope.$watch('tglMulaiTunda', function(){
			$('#tglMulaiTunda').mask('99-99-9999');
		});

		$scope.$watch('tglIsi', function(){
			$('#tglIsiAirKapal').mask('99-99-9999');
		});

		$scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
			if(dataEsc.valCode==='VALPMH041'){
				$scope.escTypeCode = dataEsc.escTypeCode;
			}
		});


		var setDisableDateLabuh = function(){
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
				$('#labuhTglMasuk').datepicker('setStartDate','01-01-2000');
			}else{
   				$('#labuhTglMasuk').datepicker('setStartDate',$scope.tglMasuk);
   			}
   			$('#labuhTglKeluar').datepicker('setStartDate',$scope.tglMasuk);
			$('#labuhTglMasuk').mask('99-99-9999');
			$('#labuhTglKeluar').mask('99-99-9999');
		}

		var setDisableDateTambat = function(){
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
       			$('#tglMulaiTambat').datepicker('setStartDate','01-01-2000');
			}else{
       			$('#tglMulaiTambat').datepicker('setStartDate',$scope.tglMulaiTambat);
   			}
   			$('#tglSelesaiTambat').datepicker('setStartDate',$scope.tglMulaiTambat);
			$('#tglMulaiTambat').mask('99-99-9999');
			$('#tglSelesaiTambat').mask('99-99-9999');
		}

		var setDisableDatePandu = function(){
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
       			$('#tglPandu').datepicker('setStartDate','01-01-2000');
			}else{
       			$('#tglPandu').datepicker('setStartDate',$scope.tglPandu);
   			}
		}

		var setDisableDateTunda = function(){
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
       			$('#tglMulaiTunda').datepicker('setStartDate','01-01-2000');
			}else{
       			$('#tglMulaiTunda').datepicker('setStartDate',$scope.tglMulaiTunda);
   			}
		}

		var setDisableDateAirKapal = function(){
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
       			$('#tglIsiAirKapal').datepicker('setStartDate','01-01-2000');
			}else{
       			$('#tglIsiAirKapal').datepicker('setStartDate',$scope.tglIsi);
   			}
		}

		//event from Lokasi Asal Pandu
		$scope.$watch('jasapandu.lokasiAsal.mdmgKode', function() {
			if($scope.jasapandu.lokasiAsal!==undefined){
				AturanGerakPanduList.get({
					kodeLokasi: $scope.jasapandu.lokasiAsal.mdmgKode,
					namaLokasi: $scope.jasapandu.lokasiAsal.mdmgNama,
					flagAktif:1
				}, function(response) {
					$scope.lokasiAsalGerakPandu = response.content;
					$scope.changedJenisGerakan();
				});
				//set jasa tunda lokasi asal
				$scope.jasatunda.lokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
				$scope.jasatunda.kodeLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgKode;
				$scope.jasatunda.namaLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
				$scope.jasatunda.jenisDermagaAsal = $scope.jasapandu.lokasiAsal.mdmgJenisDmg;
			}
		}, true);

		//event from Lokasi Tujuan Pandu
		$scope.$watch('jasapandu.lokasiTujuan.mdmgKode', function() {
			if($scope.jasapandu.lokasiTujuan!==undefined){
				AturanGerakPanduList.get({
					kodeLokasi: $scope.jasapandu.lokasiTujuan.mdmgKode,
					namaLokasi: $scope.jasapandu.lokasiTujuan.mdmgNama,
					flagAktif:1
				}, function(response) {
					$scope.lokasiTujuanGerakPandu = response.content;
					$scope.changedJenisGerakan();
				});
				//set jasa tunda lokasi tujuan
				$scope.jasatunda.lokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
				$scope.jasatunda.kodeLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgKode;
				$scope.jasatunda.namaLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
				$scope.jasatunda.jenisDermagaTujuan = $scope.jasapandu.lokasiTujuan.mdmgJenisDmg;
			}
		}, true);

		//function change jenis gerakan
		$scope.changedJenisGerakan = function() {
			if($scope.lokasiAsalGerakPandu.length>0 && $scope.lokasiTujuanGerakPandu.length===0){
				$scope.jasapandu.jenisGerakan = '1';
			}else if($scope.lokasiTujuanGerakPandu.length>0 && $scope.lokasiAsalGerakPandu.length===0){
				$scope.jasapandu.jenisGerakan = '3';
			}else{
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

		$scope.$watch('tglPandu', function(){
			$scope.tglMulaiTunda = $scope.tglPandu;
		});

		$scope.changeTime = function(){
			$scope.jasatunda.jamMulai = document.getElementById('jamPanduVal').value;
		}

		/*VALPMH-018*/
		var rulesKapalWajibPandu = function(){
			$scope.$watch('permohonan.gtKapal', function(){
				if($scope.permohonan.gtKapal >= 500){
					$scope.$watch('jasapandugrid', function(){
						if($scope.jasapandugrid.length < 1){
							// PMH-02
							$scope.jasapandu.jenisGerakan = '1';
						}else{
							//console.log($scope.jasapandugrid);
						}
					});
				}
			});
		};

		var rulesDateTime = function(){
			if($scope.jasalabuhgrid.length > 0) {
				$('#tglPandu').datepicker('setStartDate',$scope.jasalabuhgrid.tglMasuk);
			}
		};
// jasalampau
		var getPastJasa = function(noPpk1){
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
				})
				$scope.buildPDF = function(nomerPpkJasa){
					PermohonanTambatDetail.get({noPpkJasa: nomerPpkJasa}, function(response){
							BuildPDF.build(response.dokumenTender);
					})
				}
				//end - Untuk set data grid dari status detail jasa terupdate :
				$scope.createPDF = function(fileName){
							BuildPDF.build(fileName);
				}

				// PermohonanDetail.get({id:noPpk1}, function(response){
				// 	for (var i = 0; i < response.details.length; i++) {
				// 		for (var y = 0; y < response.details[i].jasa.length; y++) {
				// 			var namaJasa = response.details[i].jasa[y].nama.substr(response.details[i].jasa[y].nama.indexOf("_") + 1);
				// 			if (namaJasa === 'labuh') {
				// 				if (checkPastLabuh.indexOf(response.details[i].jasa[y].noPpkJasa) === -1) {
				// 					pastLabuh.push(response.details[i].jasa[y]);
				// 				}
				// 			} else if (namaJasa === 'tambat') {
				// 				if (checkPastTambat.indexOf(response.details[i].jasa[y].noPpkJasa) === -1) {
				// 					pastTambat.push(response.details[i].jasa[y]);
				// 				}
				// 			} else if (namaJasa === 'pandu') {
				// 				if (checkPastPandu.indexOf(response.details[i].jasa[y].noPpkJasa) === -1) {
				// 					pastPandu.push(response.details[i].jasa[y]);
				// 				}
				// 			} else if (namaJasa === 'tunda') {
				// 				if (checkPastTunda.indexOf(response.details[i].jasa[y].noPpkJasa) === -1) {
				// 					pastTunda.push(response.details[i].jasa[y]);
				// 				}
				// 			} else if (namaJasa === 'air_kapal') {
				// 				if (checkPastAir.indexOf(response.details[i].jasa[y].noPpkJasa) === -1) {
				// 					pastAir.push(response.details[i].jasa[y]);
				// 				}
				// 			}
				// 		}
				// 	}
				// });

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
		LoadingScreen.hide(); 
// tambah jasa baru
		if ($routeParams.kodeKapal != null){  
			PermohonanList.get({noPpk1 : $routeParams.kodeKapal}, function(response){ 
				MdmKapalByKode.get({kode : $routeParams.kodeKapal}, function(responseKapal){
					response.jenisKapal = responseKapal.mkplJenis;
				});
				PermohonanDetail.get({id:response.noPpk1}, function(responsePpk){
					response.details = responsePpk.details;
				})
				$scope.permohonan = response.content[0];
				$scope.inputTambahJasa = true;
				getPastJasa($scope.permohonan.noPpk1);
				rulesKapalWajibPandu();

				$scope.$watch('permohonan',function(){ 
					MdmKapalByKode.get({kode : $scope.permohonan.kodeKapal}, function(responseKapal){ 
						if(responseKapal.mkplJenis === 'KPLTUNDA' || responseKapal.mkplJenis=== 'TB'){
							$scope.gandengBtn = false;
							if(localStorage.validasiWajibPanduTunda==='1'){
								$scope.gandengBtnOnLabuh = false;
							}
						};
					});
				});
				
				document.getElementById("labuhTab").style.display = "none";
				document.getElementById("tambatTab").style.display = "none";
				document.getElementById("panduTab").style.display = "none";
				document.getElementById("tundaTab").style.display = "none";
				document.getElementById("airkapalTab").style.display = "none";
			});
		}

		if ($routeParams.id != null) {
			PermohonanDetailByPpk.get({ppk1:$routeParams.id,urutan:$routeParams.urutan},function(response) {
				$scope.inputTambahJasa = false;
				var temp = response;
				var jasa = [];
				$scope.editForm = true;
				var labuhBtn = 'active';
				var tambatBtn = 'active';
				var panduBtn = 'active';
				var tundaBtn = 'active';
				var airBtn = 'active';
				var labuhTab = true;
				var tambatTab = true;
				var panduTab = true;
				var tundaTab = true;
				var airTab = true;
				// $scope.btnSubmit = false;
				$scope.btnSubmit = $routeParams.escMode?true:false;
				$scope.gridPast = false;
				checkPastLabuh = [];
				checkPastTambat = [];
				checkPastPandu = [];
				checkPastTunda = [];
				checkPastAir = [];

				if($scope.isAirKapal){
					document.getElementById("labuhTab").style.display = "none";
					document.getElementById("tambatTab").style.display = "none";
					document.getElementById("panduTab").style.display = "none";
					document.getElementById("tundaTab").style.display = "none";
					document.getElementById("airkapalTab").style.display = "block";
				}else{
					document.getElementById("labuhTab").style.display = "block";
					if($routeParams.escMode){
						document.getElementById("tambatTab").style.display = "none";
					}else{
						document.getElementById("tambatTab").style.display = "block";
					}
					document.getElementById("panduTab").style.display = "block";
					document.getElementById("tundaTab").style.display = "block";
					document.getElementById("airkapalTab").style.display = "none";				
				}

				UserRole.checkJasa();

				for (var i = 0; i < response.details[0].jasa.length; i++) {
					var namaJasa = response.details[0].jasa[i].nama.substr(response.details[0].jasa[i].nama.indexOf("_") + 1);
					jasa.push(namaJasa);
					response.details[0].jasa[i].fake = false;
					if (namaJasa === 'labuh') {
						$scope.templabuh.push(response.details[0].jasa[i]);
						checkPastLabuh.push(response.details[0].jasa[i].noPpkJasa);
					} else if (namaJasa === 'tambat') {
						$scope.temptambat.push(response.details[0].jasa[i]);
						checkPastTambat.push(response.details[0].jasa[i].noPpkJasa);
					} else if (namaJasa === 'tunda') {
						$scope.temptunda.push(response.details[0].jasa[i]);
						checkPastTunda.push(response.details[0].jasa[i].noPpkJasa);
					} else if (namaJasa === 'pandu') {
						$scope.temppandu.push(response.details[0].jasa[i]);
						checkPastPandu.push(response.details[0].jasa[i].noPpkJasa);
					} else if (namaJasa === 'air_kapal') {
						$scope.tempair.push(response.details[0].jasa[i]);
						checkPastAir.push(response.details[0].jasa[i].noPpkJasa);
					}
				}

				AppParam.get({nama:'JENIS_PANDU'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<$scope.temppandu.length;j++){
							if($scope.temppandu[j].jenisPanduText == null){
								if($scope.temppandu[j].jenisPandu == content[idx].value){
									$scope.temppandu[j].jenisPanduText = content[idx].caption;
								}
							}
						}
					}
				});

				AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<$scope.temppandu.length;j++){
							if($scope.temppandu[j].jenisGerakanText == null){
								if($scope.temppandu[j].jenisGerakan == content[idx].value){
									$scope.temppandu[j].jenisGerakanText = content[idx].caption;
								}
							}
						}
					}
				});

				$scope.jasalabuhgrid = $scope.templabuh;
				$scope.jasatambatgrid = $scope.temptambat;
				$scope.jasapandugrid = $scope.temppandu;
				$scope.jasatundagrid = $scope.temptunda;
				$scope.jasaairgrid = $scope.tempair;
				$scope.permohonan = temp;

				if($scope.jasalabuhgrid.length > 0){
					$scope.btnLabuhSave = false;
				}
				if($scope.jasapandugrid.length > 0){
					$scope.gandengBtnOnLabuh=true;
				}
				if($scope.jasaairgrid.length > 0){
					document.getElementById("airkapalTab").style.display = "block";
					$scope.btnAirSave = false;
				}
				rulesKapalWajibPandu();

				MdmKapalSearch.get({kode : temp.kodeKapal, limit : 10},function(response){
					/*VALPMH-033*/
					if(response[0].mkplJenis === 'KPLTUNDA' || response[0].mkplJenis === 'TB'){
						$scope.gandengBtn = false;
						if(localStorage.validasiWajibPanduTunda==='1'){
							$scope.gandengBtnOnLabuh = false;
						}
					};
					/*VALPMH-019*/
					if(response[0].mkplJenis === 'KPLTONKANG'){
						document.getElementById("panduTab").style.display = "none";
						document.getElementById("tundaTab").style.display = "none";
					}else if(response[0].mkplJenis === 'KPLTNKGMSN'){
						document.getElementById("panduTab").style.display = "block";
						document.getElementById("tundaTab").style.display = "block";
					}else{
						if(!$scope.isAirKapal){
							document.getElementById("panduTab").style.display = "block";
							document.getElementById("tundaTab").style.display = "block";
						}						
					}
				});

				getPastJasa($scope.permohonan.noPpk1);
			});
		}

		$scope.cancel = function() {
			$location.path($scope.locationPath);
		}

		var loaValue = [];
		$scope.submitKapalGandeng = function(){
			var temp = $scope.kapalGandeng.kapal;
			var kapalInfo = {};
			var statusKapal = [];
			PermohonanByKodeKapal.get({kodeKapal : temp.mkplKode}, function(response){
				if(response.status != '500'){
					loaValue.push(parseInt(temp.mkplLoa));
					if (checkunique.indexOf(temp.mkplKode) === -1) {
					    checkunique.push(temp.mkplKode);

						kapalInfo.noPpk1Tongkang = temp.noPpk1;
						kapalInfo.kodeKapal = temp.mkplKode;
						kapalInfo.namaKapal = temp.mkplNama;
						kapalInfo.loa = temp.mkplLoa;
						kapalInfo.gtKapal = temp.mkplGrt;
						kapalInfo.jenisKapal = temp.mkplJenis;
						kapalInfo.negaraKapal = temp.mkplBendera;
						$scope.kapalGandengArray.push(kapalInfo);
						if ($routeParams.id != null) {
							$scope.kapalGandengUpdateArray.push(kapalInfo);
						}
						$scope.kapalGandeng.kapal = '';
						$('#kplGadengModal').modal('hide');

					} else if (checkunique.indexOf(temp.mkplKode) > -1) {
						$scope.setNotification  = {
							type	: 'warning',
							message	: 'Kapal <b>'+ temp.mkplNama + '</b> sudah dientry. <br> Silahkan Masukan Nama Kapal Lain.<br><br>Kode validasi: <b>VALPMH-015</b>'
						};
						Notification.setNotification($scope.setNotification);
						$scope.kapalGandeng.kapal = '';
					}
				}else{
					$('#kplGadengModal').modal('hide');
					$scope.setNotification  = {
						type	: 'warning',
						message	: 'Kapal <b>'+ temp.mkplNama + '</b> belum memiliki Layanan Aktif. Silahkan Pilih Kapal Lain.<br><br>Kode validasi: <b>VALPMH-016</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.kapalGandeng.kapal = '';
				}
			});
		}

		$scope.deleteKapalGandengView = function(i){
			var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
			if(checkDeleteGandeng){
				checkunique.splice(i, 1);
				$scope.kapalGandengArray.splice(i, 1);
				if ($routeParams.id != null) {
					$scope.kapalGandengUpdateArray.splice(i, 1);
				}
			}

		}

		$scope.deleteKapalGandeng = function(idKapalGandeng,i){
			var checkDeleteGandeng = confirm('Apakah Anda akan Menghapus data ini?');
			if(checkDeleteGandeng){
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
		}

		$scope.$watch('jasalabuhgrid.length', function(){
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = true;
			}else{
				$scope.btnMainSimpan = false;
			}
		});

		$scope.$watch('jasatambatgrid.length', function(){
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = true;
			}else{
				$scope.btnMainSimpan = false;
			}
		});

		$scope.$watch('jasapandugrid.length', function(){
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = true;
			}else{
				$scope.btnMainSimpan = false;
			}
		});

		$scope.$watch('jasatundagrid.length', function(){
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = true;
			}else{
				$scope.btnMainSimpan = false;
			}
		});

		$scope.$watch('jasaairgrid.length', function(){
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = true;
			}else{
				$scope.btnMainSimpan = false;
			}
		});
		$scope.isKapalTender=false;

		$scope.$watch('jasatambat.flagTender', function(){
			if ($scope.jasatambat.flagTender == 1) {
					$scope.isKapalTender = true;
			} else {
					$scope.isKapalTender = false;
			}
		});


		$scope.greenBtn = function(){
	
			if($scope.jasalabuhgrid.length > 0 || $scope.jasatambatgrid.length > 0 || $scope.jasapandugrid.length > 0 || $scope.jasatundagrid.length > 0 || $scope.jasaairgrid.length > 0){
				$scope.btnMainSimpan = false;
				$scope.showLoader = true;
				/* validation wajib tunda VALPMH-017*/
				var statusWajibTunda = true;
				var statusWajibPandu = true;
				var loaKapal;

				if($scope.permohonan.loa != null){
					loaKapal = $scope.permohonan.loa;
				}else{
					loaKapal = $scope.valueKapal.mkplLoa?$scope.valueKapal.mkplLoa:$scope.valueKapal.loa;
				}

				// if(loaKapal>=70){
				// 	if( $scope.jasapandugrid.length > 0 && ($scope.jasatundagrid.length===0 || $scope.jasatundagrid.length===undefined)){
				// 		for (var i = 0; i < $scope.jasapandugrid.length; i++) {
				// 			if(($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
				// 				($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg === 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg !== 'AREALABUH') ||
				// 				($scope.jasapandugrid[i].lokasiAsal.mdmgJenisDmg !== 'AREALABUH' && $scope.jasapandugrid[i].lokasiTujuan.mdmgJenisDmg === 'AREALABUH')
				// 				){
				// 				$scope.permohonan.loa = loaKapal;
				// 				$('#ConfirmLoaJasaPandu').modal('show');
				// 				$scope.showLoader = false;
				// 				$scope.btnMainSimpan = true;
				// 				statusWajibTunda = false;
				// 			}
				// 		}
				// 	}
				// }

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

				/*validasi Wajib Pandu*/
				var validationWajibPandu = $scope.validationWajibPandu();
				if(statusWajibTunda && !validationWajibPandu) {
					$scope.showLoader = false;
					$scope.btnMainSimpan = true;
					statusWajibPandu = false;
				}

				if(statusWajibTunda && statusWajibPandu){
					if($routeParams.kodeKapal){
						$scope.submitJasaBaru();
					}else{
						if($scope.isAirKapal == false){
							if($scope.jasalabuhgrid.length == 0){
								$scope.setNotification  = {
									type	: "warning",
									message	: "Permohonan Jasa Kapal Baru harus memiliki Jasa Labuh"
								};
								Notification.setNotification($scope.setNotification);
								return false;
							}					
						}
						$scope.submitDataUmum();
					}
					BindEskalasi.setDefaultEskalasi();
				}
			}else{
				$scope.setNotification  = {
					type	: "danger",
					message	: "Belum Ada Jasa di Permohonan Ini.<br> Silahkan Isi Jasa Terlebih Dahulu.<br><br>Kode validasi :<b>VALPMH-037</b>"
				};
				Notification.setNotification($scope.setNotification);
			}
		}

		$scope.submitPerJasa = function(){
			if($scope.jasalabuhgrid.length > 0){
				for (var y = 0; y < $scope.jasalabuhgrid.length; y++) {
					$scope.submitLabuh($scope.jasalabuhgrid[y]);
				}
			}

			if($scope.jasatambatgrid.length > 0){
				for (var y = 0; y < $scope.jasatambatgrid.length; y++) {
					$scope.submitTambat($scope.jasatambatgrid[y]);
				}
			}

			if ($scope.jasapandugrid.length > 1) {
					for (var y = 0; y < $scope.jasapandugrid.length; y++) {
							$scope.constructPanduBulk($scope.jasapandugrid[y]);
						}
					$scope.submitPanduBulk($scope.jasapandugrid);
			} else if($scope.jasapandugrid.length == 1){
					$scope.submitPandu($scope.jasapandugrid[0]);
			}

			if ($scope.jasatundagrid.length > 1) {
					for (var y = 0; y < $scope.jasatundagrid.length; y++) {
							$scope.constructTundaBulk($scope.jasatundagrid[y]);
						}
					$scope.submitTundaBulk($scope.jasatundagrid);
			} else if($scope.jasatundagrid.length == 1){
					$scope.submitTunda($scope.jasatundagrid[0]);
			}

			if($scope.jasaairgrid.length > 0){
				for (var y = 0; y < $scope.jasaairgrid.length; y++) {
					$scope.submitAirKapal($scope.jasaairgrid[y]);
				}
			}
			$scope.btnMainSimpan = false;
			$timeout(function() {
				if($routeParams.ppk1PutusAgen){
					$scope.submitPutusAgen();
				}
				$scope.setCalculateEPB();
	            $scope.goHistoryPage();
	        }, 3000);
		}

		$scope.submitLabuhtoGrid = function(){
			var temp = $scope.jasalabuh;
			var tempDataLabuh = {};
			tempDataLabuh.fake = true;
			tempDataLabuh.kodeLokasi = temp.lokasi.mdmgKode;
			tempDataLabuh.namaLokasi = temp.lokasi.mdmgNama;
			tempDataLabuh.lokasi = temp.lokasi;
			tempDataLabuh.jenisDermaga = temp.lokasi.mdmgJenisDmg;

			var tglMasukVal = $filter('date')($scope.tglMasuk, 'yyyy-MM-dd');
			var jamMasukVal = document.getElementById("jamMasukVal").value;
				tempDataLabuh.tglMasuk = tglMasukVal + 'T' + jamMasukVal;

			var tglKeluarVal = $filter('date')($scope.tglKeluar, 'yyyy-MM-dd');
			var jamKeluarVal = document.getElementById("jamKeluarVal").value;
				tempDataLabuh.tglKeluar = tglKeluarVal + 'T' + jamKeluarVal;

			var parseTglMasuk = Date.parse(tempDataLabuh.tglMasuk);
			var parseTglKeluar = Date.parse(tempDataLabuh.tglKeluar);

			if((parseTglMasuk > parseTglKeluar) || (parseTglMasuk == parseTglKeluar)){
				var note =  {
								type 	: "warning",
								message : "Waktu Keberangkatan harus melebihi Waktu Kedatangan<br><br>Kode validasi: <b>VALPMH-020</b>"
							};
				Notification.setNotification(note);
				return false;
			}

			var loaKapal;
			if($scope.permohonan.loa){
				loaKapal = $scope.permohonan.loa;
			}else{
				loaKapal = $scope.valueKapal.mkplLoa?$scope.valueKapal.mkplLoa:$scope.valueKapal.loa;
			}

			if($scope.kapalGandengArray.length > 0){
				tempDataLabuh.kapalGandeng = $scope.kapalGandengArray;
			}

			var R1 = validationForm.required('Lokasi Labuh', tempDataLabuh.namaLokasi);
			if(!R1){return R1;}
			var R2 = validationForm.required('Tanggal Kedatangan', tglMasukVal);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Keberangkatan', tglKeluarVal);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Kedatangan', jamMasukVal);
			if(!R4){return R4;}
			var R5 = validationForm.required('Jam Keberangkatan', jamKeluarVal);
			if(!R5){return R5;}

			$scope.jasaLabuhArray.push(tempDataLabuh);
			$scope.jasalabuhgrid = $scope.jasaLabuhArray;
			$scope.validationWajibPandu();
			// BindEskalasi.setDefaultEskalasi();
			$scope.resetLabuh();
		}

		$scope.myValueFunction = function() {
		   return "test";
		};

		$scope.submitTambattoGrid =  function(){
			var temp = $scope.jasatambat;
			var jasaTambatGrid;
			var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
			if(langsungSandar == true){
				var validationDermaga = $scope.validationDermagaTambat(temp);
				if(!validationDermaga) return false;
			}

			if($scope.jasatambatgridpast.length > 0 && $scope.jasatambatgrid.length > 0){
				jasaTambatGrid = $scope.jasatambatgrid;
			} else if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
				jasaTambatGrid = $scope.jasatambatgridpast;
			}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
				jasaTambatGrid = $scope.jasatambatgrid;
			}
			
			var tempDataTambat = {};
			tempDataTambat.fake = true;
			tempDataTambat.kodeLokasi = temp.lokasi.mdmgKode;
			tempDataTambat.namaLokasi = temp.lokasi.mdmgNama;
			tempDataTambat.lokasi = temp.lokasi;
			tempDataTambat.jenisDermaga = temp.lokasi.mdmgJenisDmg;

			var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
			var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
			tempDataTambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

			//concat jam dan waktu selesai
			var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
			var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
			tempDataTambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;

			if(jasaTambatGrid != undefined){
				if(jasaTambatGrid.length < 1){
					var validationPanduTambat = $scope.validationTglTambat(tempDataTambat);
					if(validationPanduTambat != undefined){
						if((!validationPanduTambat.matchMasuk && !validationPanduTambat.matchKeluar) || (validationPanduTambat.matchMasuk && !validationPanduTambat.matchKeluar) || (!validationPanduTambat.matchMasuk && validationPanduTambat.matchKeluar)){
							return false;
						}
					}				
				}			
			}


			var parseTglMulaiTambat = Date.parse(tempDataTambat.tglMulai);
			var parseTglSelesaiTambat = Date.parse(	tempDataTambat.tglSelesai);

			if((parseTglMulaiTambat > parseTglSelesaiTambat) || (parseTglMulaiTambat == parseTglSelesaiTambat)){
				var note =  {
								type 	: "warning",
								message : "Waktu Selesai harus melebihi Waktu Mulai<br><br>Kode validasi: <b>VALPMH-020</b>"
							};
				Notification.setNotification(note);
				return false;
			}

			if(!$scope.validationDataTambat(tempDataTambat)){
				var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH045');
				var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH045');
				var statusEskalasi = itemEskalasi.id!==undefined?true:false;
				if(hasEsc){
					return true;
				}else{
					var note =  {
									type 	: "warning",
									message : "<b>Data yang diinput terdeteksi duplikat.</b><br>Silahkan Periksa kembali Data yang diinputkan.<br><br>Kode validasi : <b>VALPMH-045</b>",
									hasEsc	: statusEskalasi,
									dataEsc : itemEskalasi
								};
					Notification.setNotification(note);
					return false;
				}
			}

			tempDataTambat.flagTender = $scope.jasatambat.flagTender;
			tempDataTambat.flagRampdoor = $scope.jasatambat.flagRampdoor;
			tempDataTambat.dokumenTender = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
			tempDataTambat.uploadFile = $scope.uploadFile;

			var R1 = validationForm.required('Lokasi Tambat', tempDataTambat.namaLokasi);
			if(!R1){return R1;}
			var R2 = validationForm.required('Tanggal Mulai Tambat', tglTambatMskVal);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Selesai Tambat', tglTambatSlsVal);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Mulai Tambat', jamTambatMskVal);
			if(!R4){return R4;}
			var R5 = validationForm.required('Jam Selesai Tambat', jamTambatSlsVal);
			if(!R5){return R5;}

			$scope.jasaTambatArray.push(tempDataTambat);
			$scope.jasatambatgrid = $scope.jasaTambatArray;
			$scope.validationWajibPandu();
			$scope.setDefaultDermagaAirKapal();
			// BindEskalasi.setDefaultEskalasi();
			$scope.resetTambat();
		}

		$scope.submitPandutoGrid = function(){
			var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
			var temp = $scope.jasapandu;
			var tempDataPandu = {};
			tempDataPandu.fake = true;
			tempDataPandu.lokasiAsal = temp.lokasiAsal;
			tempDataPandu.lokasiTujuan = temp.lokasiTujuan;
			tempDataPandu.namaLokasiAsal = temp.lokasiAsal.mdmgNama;
			tempDataPandu.namaLokasiTujuan = temp.lokasiTujuan.mdmgNama;
			tempDataPandu.kodeLokasiAsal = temp.lokasiAsal.mdmgKode;
			tempDataPandu.kodeLokasiTujuan = temp.lokasiTujuan.mdmgKode;
			tempDataPandu.jenisPandu = temp.jenisPandu;
			tempDataPandu.jenisGerakan = temp.jenisGerakan;
			tempDataPandu.jenisDermagaAsal = temp.lokasiAsal.mdmgJenisDmg;
			tempDataPandu.jenisDermagaTujuan = temp.lokasiTujuan.mdmgJenisDmg;
			AppParamValue.get({nama:'JENIS_PANDU', value:tempDataPandu.jenisPandu}, {}, function(response){
				tempDataPandu.jenisPanduText = response[0].caption;
			});

			AppParamValue.get({nama:'JENIS_GERAKAN', value:tempDataPandu.jenisGerakan}, {}, function(response){
				tempDataPandu.jenisGerakanText = response[0].caption;
			});

			var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
			var jamPanduVal = document.getElementById("jamPanduVal").value;
			tempDataPandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
			if($scope.kapalGandengArray.length > 0){
				tempDataPandu.kapalGandeng = $scope.kapalGandengArray;
			}

			/*validasi dermaga tujuan pandu :*/
			var validationDermaga = $scope.validationTujuanLokasiPandu(tempDataPandu);
			if(!validationDermaga) return false;

			/*validasi dermaga asal pandu :
			var validationAsalDermaga = $scope.validationAsalLokasiPandu(tempDataPandu);
			if(!validationAsalDermaga) return false;
			*/

			/* validasi Tgl pandu toleransi 1 jam:*/
			var validationTglPandu = $scope.validationTglPandu(tempDataPandu);
			if(!validationTglPandu) return false;
			

			// Start : Kondisi yang dibutuhkan agar wajib tunda VALPMH-017
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

			var R1 = validationForm.required('Lokasi Asal Pandu', tempDataPandu.namaLokasiAsal);
			if(!R1){return R1;}
			var R2 = validationForm.required('Lokasi Tujuan Pandu', tempDataPandu.namaLokasiTujuan);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Pandu', tglPanduVal);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Pandu', jamPanduVal);
			if(!R4){return R4;}

			$scope.jasaPanduArray.push(tempDataPandu);
			$scope.jasapandugrid = $scope.jasaPanduArray;
			// BindEskalasi.setDefaultEskalasi();
			$scope.resetPandu();
			checkunique = [];
			loaValue = [];
		}

		$scope.submitTundatoGrid = function(){
			var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);

			var temp = $scope.jasatunda;
			var tempDataTunda = {};
			tempDataTunda.fake = true;
			if (typeof temp.lokasiAsal === 'object') {
				tempDataTunda.kodeLokasiAsal = temp.lokasiAsal.mdmgKode;
				tempDataTunda.namaLokasiAsal = temp.lokasiAsal.mdmgNama;
				tempDataTunda.jenisDermagaAsal = temp.lokasiAsal.mdmgJenisDmg;
			}else{
				tempDataTunda.kodeLokasiAsal = temp.kodeLokasiAsal;
				tempDataTunda.namaLokasiAsal = temp.namaLokasiAsal;
				tempDataTunda.jenisDermagaAsal = temp.jenisDermagaAsal;
			}

			if (typeof temp.lokasiTujuan === 'object') {
				tempDataTunda.kodeLokasiTujuan = temp.lokasiTujuan.mdmgKode;
				tempDataTunda.namaLokasiTujuan = temp.lokasiTujuan.mdmgNama;
				tempDataTunda.jenisDermagaTujuan = temp.lokasiTujuan.mdmgJenisDmg;
			}else{
				tempDataTunda.kodeLokasiTujuan = temp.kodeLokasiTujuan;
				tempDataTunda.namaLokasiTujuan = temp.namaLokasiTujuan;
				tempDataTunda.jenisDermagaTujuan = temp.jenisDermagaTujuan;
			}

			var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
			var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
			tempDataTunda.tglMulai = tglMasukVal+'T'+jamMasukVal;
			tempDataTunda.tundaExtra =  $scope.jasatunda.tundaExtra;
			/* validasi dermaga pandu :*/
			var validationDermaga = $scope.validationAsalTujuanLokasiTunda(tempDataTunda);
			if(!validationDermaga) return false;

			/* validasi Tgl Tunda :*/
			//if(langsungSandar === false){
				var validationTglTunda = $scope.validationTglTunda(tempDataTunda);
				if(!validationTglTunda){
					 return false;
				}
			//}

			var R1 = validationForm.required('Lokasi Asal Tunda', tempDataTunda.namaLokasiAsal);
			if(!R1){return R1;}
			var R2 = validationForm.required('Lokasi Tujuan Tunda', tempDataTunda.namaLokasiTujuan);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Tunda', tglMasukVal);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Tunda', jamMasukVal);
			if(!R4){return R4;}

			$scope.jasaTundaArray.push(tempDataTunda);
			$scope.jasatundagrid = $scope.jasaTundaArray;
			// BindEskalasi.setDefaultEskalasi();
			$scope.resetTunda();
		}

		$scope.setDefaultDermagaAirKapal = function () {
			if($scope.jasatambatgridpast.length > 0 && $scope.jasatambatgrid.length > 0){
				var jasaTambatGrid = $scope.jasatambatgrid;
			} else if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
				jasaTambatGrid = $scope.jasatambatgridpast;
			}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
				jasaTambatGrid = $scope.jasatambatgrid;
			}

				if (jasaTambatGrid != undefined) {
					var index = jasaTambatGrid.length-1;
					if (jasaTambatGrid[index].lokasi != null || jasaTambatGrid[index].lokasi != undefined) {
						$scope.jasaair.dermaga = jasaTambatGrid[index].lokasi;
					} else {
						$scope.jasaair.dermaga = jasaTambatGrid[index].namaLokasi;
						$scope.jasaair.kodeDermaga = jasaTambatGrid[index].kodeLokasi;
						$scope.jasaair.jenisDermaga = jasaTambatGrid[index].jenisDermaga;
					}
				}
		}


		$scope.validasiAirKapal = function (tempDataAir) {
			var check = true;
			/*if(tempDataAir.alatIsi == 1 || tempDataAir.alatIsi == 4) {
				Jika alat isi pipa air atau tangki
				if($scope.jasatambatgridpast.length == 0 && $scope.jasatambatgrid.length == 0){
					var note =  {
						type 	: "warning",
						message : "Permohonan Air Kapal tidak bisa dilakukan jika tidak ada permohonan tambat. <br><br>Kode validasi : <b>VALPMH-042</b>"
					};
					Notification.setNotification(note);
					check = false;
				}else {*/
				if($scope.jasatambatgridpast.length > 0 && $scope.jasatambatgrid.length > 0){
					if($scope.jasatambatgridpast.length > 0 && $scope.jasatambatgrid.length > 0){
						var jasaTambatGrid = $scope.jasatambatgrid;
					} else if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
						jasaTambatGrid = $scope.jasatambatgridpast;
					}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
						jasaTambatGrid = $scope.jasatambatgrid;
					}
					
					jasaTambatGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatGrid)), '-noPpkJasa');
					if (jasaTambatGrid[0].namaLokasi == tempDataAir.dermaga.mdmgNama || jasaTambatGrid[0].namaLokasi == tempDataAir.dermaga) {
						var tglMulaiTambat = Date.parse(jasaTambatGrid[0].tglMulai);
						var tglSelesaiTambat = Date.parse(jasaTambatGrid[0].tglSelesai);
						var tglIsiAirKapal = Date.parse(tempDataAir.tglIsi);

						if (tglIsiAirKapal < tglMulaiTambat || tglIsiAirKapal > tglSelesaiTambat) {
							var noteTglTambat =  {
								type 	: "warning",
								message : "Tanggal isi air kapal harus berada di antara tgl mulai tambat dan tgl selesai tambat. <br><br>Kode validasi : <b>VALPMH-043</b>"
							};
							Notification.setNotification(noteTglTambat);
							check = false;
						}
					}
					else {
						var noteLokasi =  {
							type 	: "warning",
							message : "Nama dermaga harus sama dengan lokasi tambat. <br><br>Kode validasi : <b>VALPMH-029</b>"
						};
						Notification.setNotification(noteLokasi);
						check = false;
					}
				}

				if($scope.jasalabuhgridpast.length == 0 && $scope.jasalabuhgrid.length == 0){
					var note =  {
									type 	: "warning",
									message : "Permohonan Air Kapal tidak bisa dilakukan jika tidak ada permohonan labuh. <br><br>Kode validasi : <b>VALPMH-044</b>"
								};
					Notification.setNotification(note);
					check = false;
				} else {
					var jasaLabuhGrid;
					if($scope.jasalabuhgridpast.length>0 && $scope.jasalabuhgrid.length===0){
						var jasaLabuhGrid = $scope.jasalabuhgridpast;
					}else if($scope.jasapandugridpast.length===0 && $scope.jasalabuhgrid.length>0){
						var jasaLabuhGrid = $scope.jasalabuhgrid;
					}else{
						var jasaLabuhGrid = $scope.jasalabuhgrid;
					}

					var tglMulaiLabuh = Date.parse(jasaLabuhGrid[0].tglMasuk);
					var tglSelesaiLabuh = Date.parse(jasaLabuhGrid[0].tglKeluar);
					var tglIsiAirKapal = Date.parse(tempDataAir.tglIsi);


					if (tglIsiAirKapal < tglMulaiLabuh || tglIsiAirKapal > tglSelesaiLabuh) {
						var noteTglLabuh =  {
										type 	: "warning",
										message : "Tanggal isi air kapal harus berada di antara tgl mulai labuh dan tgl selesai labuh"
									};
						Notification.setNotification(noteTglLabuh);
						check = false;
					}
				}
			/*}*/
			return check;
		}

		/*$scope.$watch('jasaair.alatIsi',function (newValue) {
			 if (newValue == 2 || newValue == 3 || newValue == undefined) {
				$scope.dermagaAirRequired = false;
			 } else {
				$scope.dermagaAirRequired = true;
			 }
		});*/

		$scope.submitAirKapaltoGrid = function(){
			var temp = $scope.jasaair;
			var tempDataAir = {};

			tempDataAir.fake = true;
			tempDataAir.alatIsi = temp.alatIsi;
			AppParamValue.get({nama:'ALAT_ISI_AIR', value:tempDataAir.alatIsi}, {}, function(value){
				tempDataAir.alatIsiText = value[0].caption;
			});

			if (typeof temp.dermaga === 'object') {
				tempDataAir.dermaga = temp.dermaga;
				tempDataAir.namaDermaga = tempDataAir.dermaga.mdmgNama;
				tempDataAir.jenisDermaga = tempDataAir.dermaga.mdmgJenisDmg;
				tempDataAir.kodeDermaga = tempDataAir.dermaga.mdmgKode;
			}else{
				tempDataAir.dermaga = temp.dermaga;
				tempDataAir.namaDermaga = tempDataAir.dermaga;
				tempDataAir.jenisDermaga = $scope.jasaair.jenisDermaga;
				tempDataAir.kodeDermaga = $scope.jasaair.kodeDermaga;
			}

			var tglIsiVal = $filter('date')($scope.tglIsi, 'yyyy-MM-dd');
			var jamIsiVal = document.getElementById("jamIsiVal").value;
			tempDataAir.tglIsi = tglIsiVal + 'T' + jamIsiVal;
			tempDataAir.volume = temp.volume;
			tempDataAir.satuan = temp.satuan;

			/*if ($scope.isLoketAir == true) {
				//do nothing
			} else {
				if ($scope.permohonan.jenisKapal !== 'KPLTUNDA' || $scope.permohonan.jenisKapal !== 'TB') {
					var validationAirKapal = $scope.validasiAirKapal(tempDataAir);
					if(!validationAirKapal)	return false;
				}
			}


			if ($scope.dermagaAirRequired) {
				var R1 = validationForm.required('Nama Dermaga', tempDataAir.namaDermaga);
				if(!R1){return R1;}
			}*/


			var R2 = validationForm.required('Tanggal Isi', tglIsiVal);
			if(!R2){return R2;}
			var R3 = validationForm.required('Jam Isi', jamIsiVal);
			if(!R3){return R3;}
			var R4 = validationForm.required('Volume', tempDataAir.volume);
			if(!R4){return R4;}
			var R5 = validationForm.required('Satuan', tempDataAir.satuan);
			if(!R5){return R5;}

			$scope.jasaAirArray.push(tempDataAir);
			$scope.jasaairgrid = $scope.jasaAirArray;
			$scope.resetAirKapal();
		}
// yoop
		$scope.submit = function(){
			if($routeParams.kodeKapal == undefined){
				CheckLockAgen.get({
	            	icustomer:(typeof $scope.permohonan.namaAgen==='object')?$scope.permohonan.namaAgen.mplgKode:$scope.permohonan.kodeAgen,
	            	kodeCabang : localStorage.kodeCabang
	          	}, function(response){
	          		if(response.status != '500'){   		
		          		if(response.edescription != 0){
		              		$scope.edescription = response.edescription;
		              		$('#modalCheckLockAgen').modal('show');
		            	}else{
							$scope.setNotification  = {
								type	: "warning",
								message	: "Silahkan Lanjutkan mengisi Jasa yang akan diajukan.."
							};
							Notification.setNotification($scope.setNotification);
							$scope.btnMainSimpan = true;
							if($scope.isAirKapal){
								document.getElementById("labuhTab").style.display = "none";
								document.getElementById("tambatTab").style.display = "none";
								document.getElementById("panduTab").style.display = "none";
								document.getElementById("tundaTab").style.display = "none";
								document.getElementById("airkapalTab").style.display = "block";
							}else{
								document.getElementById("labuhTab").style.display = "block";
								document.getElementById("tambatTab").style.display = "block";
								/*VALPMH-019*/
								if($scope.permohonan.jenisKapal != null){
									if($scope.permohonan.jenisKapal === 'KPLTONKANG'){
										document.getElementById("panduTab").style.display = "none";
										document.getElementById("tundaTab").style.display = "none";
									}else if($scope.permohonan.jenisKapal === 'KPLTNKGMSN'){
										document.getElementById("panduTab").style.display = "block";
										document.getElementById("tundaTab").style.display = "block";
									}else{
										document.getElementById("panduTab").style.display = "block";
										document.getElementById("tundaTab").style.display = "block";
									}
								}else{
									MdmKapalSearch.get({kode : $scope.permohonan.kodeKapal, limit : 10},function(response){
										/*VALPMH-033*/
										if(response[0].mkplJenis === 'KPLTUNDA'){
											$scope.gandengBtn = false;
											if(localStorage.validasiWajibPanduTunda==='1'){
												$scope.gandengBtnOnLabuh = false;
											}
										};
										/*VALPMH-019*/
										if(response[0].mkplJenis === 'KPLTONKANG'){
											document.getElementById("panduTab").style.display = "none";
											document.getElementById("tundaTab").style.display = "none";
										}else if(response[0].mkplJenis=== 'KPLTNKGMSN'){
											document.getElementById("panduTab").style.display = "block";
											document.getElementById("tundaTab").style.display = "block";
										}else{
											document.getElementById("panduTab").style.display = "block";
											document.getElementById("tundaTab").style.display = "block";
											UserRole.checkJasa();
										}
									});
								}								
							}

							$scope.dataUmumBtn = false;
							$scope.afterSubmit = true;
							if($routeParams.kodeKapal && !$scope.isAirKapal){
								$scope.newJasaSaved = true;
							}
							UserRole.checkJasa();
							$scope.setDefaultDermagaAirKapal();
						}
					}else{
						$scope.setNotification  = {
							type	: "danger",
							message	: "<b>API Intergration Locking Error</b>. <br><br>"+ response.description
						};

						Notification.setNotification($scope.setNotification);
					}
				});
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Silahkan Lanjutkan mengisi Jasa yang akan diajukan.."
				};
				Notification.setNotification($scope.setNotification);
				$scope.btnMainSimpan = true;
				document.getElementById("labuhTab").style.display = "block";
				document.getElementById("tambatTab").style.display = "block";
				/*VALPMH-019*/
				if($scope.permohonan.jenisKapal != null){
					if($scope.permohonan.jenisKapal === 'KPLTONKANG'){
						document.getElementById("panduTab").style.display = "none";
						document.getElementById("tundaTab").style.display = "none";
					}else if($scope.permohonan.jenisKapal === 'KPLTNKGMSN'){
						document.getElementById("panduTab").style.display = "block";
						document.getElementById("tundaTab").style.display = "block";
					}else{
						document.getElementById("panduTab").style.display = "block";
						document.getElementById("tundaTab").style.display = "block";
					}
				}else{
					MdmKapalSearch.get({kode : $scope.permohonan.kodeKapal, limit : 10},function(response){
						/*VALPMH-033*/
						if(response[0].mkplJenis === 'KPLTUNDA'){
							$scope.gandengBtn = false;
							if(localStorage.validasiWajibPanduTunda==='1'){
								$scope.gandengBtnOnLabuh = false;
							}
						};
						/*VALPMH-019*/
						if(response[0].mkplJenis === 'KPLTONKANG'){
							document.getElementById("panduTab").style.display = "none";
							document.getElementById("tundaTab").style.display = "none";
						}else if(response[0].mkplJenis=== 'KPLTNKGMSN'){
							document.getElementById("panduTab").style.display = "block";
							document.getElementById("tundaTab").style.display = "block";
						}else{
							document.getElementById("panduTab").style.display = "block";
							document.getElementById("tundaTab").style.display = "block";
							UserRole.checkJasa();
						}
					});
				}

				$scope.dataUmumBtn = false;
				$scope.afterSubmit = true;
				if($routeParams.kodeKapal){
					$scope.newJasaSaved = true;
				}
				UserRole.checkJasa();
				$scope.setDefaultDermagaAirKapal();
			}
		}

		//submit data umum
		$scope.submitDataUmum = function() {
			/*PermohonanUnfinished.get({kodeKapal:$scope.valueKapal.mkplKode}, function(response) {
				if (response.id != null) {
					$scope.setNotification  = {
						type	: "danger",
						message	: "Kapal memiliki layanan aktif. Silahkan tambah jasa pada daftar permohonan."
					};
					Notification.setNotification($scope.setNotification);
					return false;
				}else{
					if(response.status == '500'){
		        		if (response.description.indexOf('returns more than one elements') > -1) {
		        			$scope.setNotification  = {
								type	: "danger",
								message	: "Data hasil pencarian lebih dari 1 data, Silahkan hubungi administrator."
							};
							Notification.setNotification($scope.setNotification);
		        		}
		        		return false;
		        	}else{
		        		return true;
		        	}		        	
				}
			});*/

			if($scope.isAirKapal){
				if(typeof $scope.permohonan.namaAgen == 'object'){ 
					$scope.permohonan.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
					$scope.permohonan.namaAgen = $scope.permohonan.namaAgen.mplgNama;
				}
			}else{

				$scope.permohonan.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
				$scope.permohonan.namaAgen = $scope.permohonan.namaAgen.mplgNama;
				$scope.permohonan.kodeKapal = $scope.valueKapal.mkplKode;
				$scope.permohonan.namaKapal = $scope.valueKapal.mkplNama;
				$scope.permohonan.jenisKapal = $scope.valueKapal.mkplJenis;				
			}


			$scope.permohonan.kodeTerminal = localStorage.getItem('kodeTerminal');

			if(typeof $scope.permohonan.namaPelabuhanAsal == 'object'){
				$scope.permohonan.kodePelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbKode;
				$scope.permohonan.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbNama;
			}

			if(typeof $scope.permohonan.namaPelabuhanTujuan == 'object'){
				$scope.permohonan.kodePelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbKode;
				$scope.permohonan.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbNama;
			}

			/*jika terdapat  entry kemasan pada form tambat*/
			if($scope.permohonan.kemasanBongkarTambat || $scope.permohonan.kemasanMuatTambat){
				$scope.permohonan.kemasanBongkar = $scope.permohonan.kemasanBongkarTambat;
				$scope.permohonan.kemasanMuat = $scope.permohonan.kemasanMuatTambat;
			}
			
/*simpan dataumum*/
			PermohonanAdd.save({}, $scope.permohonan, function(response) {
				if(response.status !== '500' || response.status !== '404'){
					$scope.permohonan = response;
					$scope.$watch('permohonan',function(){
						$scope.submitPerJasa();
					});
					$scope.setNotification  = {
							type		: "success",
							message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				}else{
					$scope.setNotification  = {
						type	: "warning",
						message	: response.description
					};
					Notification.setNotification($scope.setNotification);
				}
				UserRole.checkJasa();
				$scope.agentChanged = false;
			}, function(response) {
				$scope.setNotification  = {
					type		: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
			});
		};

		$scope.update = function(){
			$scope.permohonanEdit = {};
			if(typeof $scope.permohonan.namaKapal==='object'){
				// $timeout(function() {
					$scope.cekLayanan($scope.permohonan.namaKapal);
				// }, 1000);
			}

			if($scope.permohonan.namaKapal === undefined || $scope.permohonan.namaKapal===''){
				$('#namaKapalDataUmum').focus();
				return false;
			}

			/*Entry dari form jasa tambat*/
			if($scope.permohonan.kemasanBongkarTambat || $scope.permohonan.kemasanMuatTambat){
				$scope.permohonan.kemasanBongkar = $scope.permohonan.kemasanBongkarTambat;
				$scope.permohonan.kemasanMuat = $scope.permohonan.kemasanMuatTambat;
			}

			CheckLockAgen.get({
            	icustomer:(typeof $scope.permohonan.namaAgen==='object')?$scope.permohonan.namaAgen.mplgKode:$scope.permohonan.kodeAgen,
            	kodeCabang : localStorage.kodeCabang
          	}, function(response){
          		if(response.edescription != '0'){
              		$scope.edescription = response.edescription;
              		$('#modalCheckLockAgen').modal('show');
            	}else{
					if(typeof $scope.permohonan.namaKapal == 'object'){
						$scope.permohonanEdit.kodeKapal = $scope.permohonan.namaKapal.mkplKode;
						$scope.permohonanEdit.namaKapal = $scope.permohonan.namaKapal.mplgNama;
					}else{
						$scope.permohonanEdit.kodeKapal =  $scope.permohonan.kodeKapal;
						$scope.permohonanEdit.namaKapal =  $scope.permohonan.namaKapal;
					}

					if(typeof $scope.permohonan.namaAgen == 'object'){
						$scope.permohonanEdit.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
						$scope.permohonanEdit.namaAgen = $scope.permohonan.namaAgen.mplgNama;
					}else{
						$scope.permohonanEdit.kodeAgen = $scope.permohonan.kodeAgen;
						$scope.permohonanEdit.namaAgen = $scope.permohonan.namaAgen;
					}

					if(typeof $scope.permohonan.namaPelabuhanAsal == 'object'){
						$scope.permohonanEdit.kodePelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbKode;
						$scope.permohonanEdit.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbNama;
					}else{
						$scope.permohonanEdit.kodePelabuhanAsal = $scope.permohonan.kodePelabuhanAsal;
						$scope.permohonanEdit.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal;
					}

					if(typeof $scope.permohonan.namaPelabuhanTujuan == 'object'){
						$scope.permohonanEdit.kodePelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbKode;
						$scope.permohonanEdit.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbNama;
					}else{
						$scope.permohonanEdit.kodePelabuhanTujuan = $scope.permohonan.kodePelabuhanTujuan;
						$scope.permohonanEdit.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan;
					}
					$scope.permohonanEdit.jenisKapal = $scope.permohonan.jenisKapal;	


					PermohonanEdit.update({id:$routeParams.id}, $scope.permohonanEdit,function(response){
						if(response.status==='500'){
							if($scope.permohonan.namaKapal==='')$('#namaKapalDataUmum').focus();
							$scope.setNotification  = {
								type	: "warning",
								message	: "Data tidak berhasil tersimpan"
							};
						}else{
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
						}
						Notification.setNotification($scope.setNotification);
					},function(response){
						$scope.setNotification  = {
							type	: "warning",
							message	: "Data tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					});
				}
			});
		}
 /*==========================================jasa labuh========================================*/

 		//delete jasa labuh
		$scope.deleteLabuh = function(id, i) {
			var checkDeleteLabuh = confirm('Apakah Anda akan Menghapus data ini?');
			if (checkDeleteLabuh) {
				var jenisKapal = $scope.permohonan.jenisKapal?$scope.permohonan.jenisKapal:$scope.valueKapal.mkplJenis;
				if(id == null){
					$scope.jasalabuhgrid.splice(i, 1);
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					if($scope.jasalabuhgrid.length > 0){
						$scope.btnLabuhSave = false;
					}else{
						$scope.btnLabuhSave = true;
						if(jenisKapal === 'KPLTUNDA' || jenisKapal === 'TB'){
							$scope.gandengBtnOnLabuh = false;
						}
					}
				}else{
					PermohonanLabuhDelete.delete({
						id: id
					}, function(response) {
						$scope.jasalabuhgrid.splice(i, 1);
						$scope.setNotification  = {
							type		: "success",
							message	: "Data berhasil dihapus"
						};
						Notification.setNotification($scope.setNotification);
						$scope.setCalculateEPB();
						if($scope.jasalabuhgrid.length > 0){
							$scope.btnLabuhSave = false;
						}else{
							$scope.btnLabuhSave = true;
						}
					}, function() {
						$scope.setNotification  = {
							type		: "warning",
							message	: "Data tidak berhasil dihapus"
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
				$scope.jamMasuk = $filter('date')(response.tglMasuk, 'HH:mm');
				$scope.jamKeluar = $filter('date')(response.tglKeluar, 'HH:mm');
				$scope.tglMasuk = $scope.splitDate(response.tglMasuk);
				$scope.tglKeluar = $scope.splitDate(response.tglKeluar);
				$scope.jasalabuh.lokasi = response.namaLokasi;
				$scope.jasalabuh.jenisDermaga = response.jenisDermaga;
				setDisableDateLabuh();
				$scope.btnLabuhSave = true;
			});
		};

		//submit labuh
		$scope.submitLabuh = function(jasalabuh) {
			if($routeParams.id){
				jasalabuh = $scope.jasalabuh;
			}
			jasalabuh.detailPmhId = $scope.permohonan.details[0].id;
			jasalabuh.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
			jasalabuh.noPpk1 = $scope.permohonan.noPpk1;
			if (jasalabuh.noPpkJasa === undefined) {

				if(jasalabuh.tglMasuk === undefined){
					//concat jam dan waktu masuk
					var tglMasukVal = $filter('date')($scope.tglMasuk, 'yyyy-MM-dd');
					var jamMasukVal = document.getElementById("jamMasukVal").value;
					jasalabuh.tglMasuk = tglMasukVal + 'T' + jamMasukVal;
				}

				if(jasalabuh.tglKeluar === undefined){
					//concat jam dan waktu keluar
					var tglKeluarVal = $filter('date')($scope.tglKeluar, 'yyyy-MM-dd');
					var jamKeluarVal = document.getElementById("jamKeluarVal").value;
					jasalabuh.tglKeluar = tglKeluarVal + 'T' + jamKeluarVal;
				}

				jasalabuh.kodeLokasi = jasalabuh.lokasi.mdmgKode;
				jasalabuh.namaLokasi = jasalabuh.lokasi.mdmgNama;
				jasalabuh.jenisDermaga = jasalabuh.lokasi.mdmgJenisDmg;

				if($routeParams.id){
					var parseTglMasuk = Date.parse(jasalabuh.tglMasuk);
					var parseTglKeluar = Date.parse(jasalabuh.tglKeluar);
					if(parseTglMasuk >= parseTglKeluar){
						var note =  {
										type 	: "warning",
										message : "Waktu Keberangkatan harus melebihi Waktu Kedatangan<br><br>Kode validasi: <b>VALPMH-020</b>"
									};
						Notification.setNotification(note);
						return false;
					}
					$scope.validationWajibPandu();

					var R1 = validationForm.required('Lokasi Labuh', jasalabuh.namaLokasi);
					if(!R1){return R1;}
					var R2 = validationForm.required('Tanggal Kedatangan', $scope.tglMasuk);
					if(!R2){return R2;}
					var R3 = validationForm.required('Tanggal Keberangkatan',  $scope.tglKeluar);
					if(!R3){return R3;}
					var R4 = validationForm.required('Jam Kedatangan', jamMasukVal);
					if(!R4){return R4;}
					var R5 = validationForm.required('Jam Keberangkatan', jamKeluarVal);
					if(!R5){return R5;}

				}
				//simpan dalam db
				PermohonanLabuh.save(jasalabuh, function(response) {
					if(response.status !== '500'){
						$scope.setNotification  = {
							type	: "success",
							message	: "Jasa Labuh berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						if($routeParams.id){
							response.fake = false;
							$scope.templabuh.push(response);
							$scope.jasalabuhgrid = $scope.templabuh;
							$scope.setCalculateEPB();
						}
						$scope.jasalabuh.noPpkJasa = undefined;
						$scope.jasalabuh.lokasi = '';
						$scope.tglMasuk = new Date();
						$scope.tglKeluar = new Date();
						document.getElementById("jamMasukVal").value = moment().format('HH:mm');
						document.getElementById("jamKeluarVal").value = moment().format('HH:mm');
						$scope.btnLabuhSave = false;
					}else{
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Labuh tidak berhasil tersimpan."+response.description
						};
						Notification.setNotification($scope.setNotification);
					}
				}, function() {
					$scope.setNotification  = {
						type	: "danger",
						message	: "Jasa Labuh tidak berhasil tersimpan."+response.description
					};
					Notification.setNotification($scope.setNotification);
				});
			} else {
				var tglMasukVal = $filter('date')($scope.tglMasuk, 'yyyy-MM-dd');
				var jamMasukVal = document.getElementById("jamMasukVal").value;
				$scope.jasalabuh.tglMasuk = tglMasukVal + 'T' + jamMasukVal;
				if (typeof $scope.jasalabuh.lokasi === 'object') {
					$scope.jasalabuh.kodeLokasi = $scope.jasalabuh.lokasi.mdmgKode;
					$scope.jasalabuh.namaLokasi = $scope.jasalabuh.lokasi.mdmgNama;
					$scope.jasalabuh.jenisDermaga = $scope.jasalabuh.lokasi.mdmgJenisDmg;
				}

					//concat jam dan waktu keluar
				var tglKeluarVal = $filter('date')($scope.tglKeluar, 'yyyy-MM-dd');
				var jamKeluarVal = document.getElementById("jamKeluarVal").value;
				$scope.jasalabuh.tglKeluar = tglKeluarVal + 'T' + jamKeluarVal;

				if($routeParams.id){
					var parseTglMasuk = Date.parse($scope.jasalabuh.tglMasuk);
					var parseTglKeluar = Date.parse($scope.jasalabuh.tglKeluar);
					if(parseTglMasuk >= parseTglKeluar){
						var note =  {
										type 	: "warning",
										message : "Waktu Keberangkatan harus melebihi Waktu Kedatangan<br><br>Kode validasi: <b>VALPMH-020</b>"
									};
						Notification.setNotification(note);
						return false;
					}
					$scope.validationWajibPandu();
				}

				PermohonanLabuhEdit.update({
					id: $scope.jasalabuh.noPpkJasa
				}, $scope.jasalabuh, function(response) {
					$scope.setNotification  = {
						type	: "success",
						message	: "Jasa Labuh berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$scope.setCalculateEPB();
					$scope.jasalabuhgrid[$scope.indexLabuh].namaLokasi = response.namaLokasi;
					$scope.jasalabuhgrid[$scope.indexLabuh].tglMasuk = response.tglMasuk;
					$scope.jasalabuhgrid[$scope.indexLabuh].tglKeluar = response.tglKeluar;
					$scope.jasalabuh.noPpkJasa = undefined;
					//$scope.jasalabuh.noForm = $scope.permohonan.noForm;
					$scope.jasalabuh.lokasi = '';
					$scope.tglMasuk = new Date();
					$scope.tglKeluar = datePlus10;
					document.getElementById("jamMasukVal").value = moment().format('HH:mm');
					document.getElementById("jamKeluarVal").value = moment().format('HH:mm');
					$scope.btnLabuhSave = false;
				}, function() {
					$scope.setNotification  = {
						type	: "danger",
						message	: "Jasa Labuh tidak berhasil tersimpan"
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
			if($scope.jasalabuhgrid.length > 0){
				$scope.btnLabuhSave = false;
				$scope.gandengBtnOnLabuh = true;
			}
		};

		$scope.validationWajibPandu = function(){
			var 
				itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH031'),
				hasEsc = BindEskalasi.hasTempEskalasi('VALPMH031'),
				statusEskalasi = itemEskalasi.id!==undefined?true:false;

			$rootScope.statusEskalasiModal = statusEskalasi;
			if(hasEsc){
				return true;
			}else{
				// return false;
				var totalGTKapalGandeng = 0;
				var jasaLabuhGrid,jasaPanduGrid;
				var kodeKapal = $scope.permohonan.kodeKapal?$scope.permohonan.kodeKapal:$scope.valueKapal.mkplKode;
				var jenisKapal = $scope.permohonan.jenisKapal?$scope.permohonan.jenisKapal:$scope.valueKapal.mkplJenis;
				var gtKapal = $scope.permohonan.gtKapal?$scope.permohonan.gtKapal:$scope.valueKapal.mkplGrt;

				/* set jasaLabuhGrid */
				if($scope.jasalabuhgridpast.length>0 && $scope.jasalabuhgrid.length===0){
					jasaLabuhGrid = $scope.jasalabuhgridpast;
				}else if($scope.jasalabuhgridpast.length===0 && $scope.jasalabuhgrid.length>0){
					jasaLabuhGrid = $scope.jasalabuhgrid;
				}else{
					jasaLabuhGrid = $scope.jasalabuhgrid;
				}

				/* set jasaPanduGrid */
				if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
					jasaPanduGrid = $scope.jasapandugridpast;
				}else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
					jasaPanduGrid = $scope.jasapandugrid;
				}else{
					jasaPanduGrid = $scope.jasapandugrid;
				}

				if(jenisKapal==='KPLTUNDA' && $scope.kapalGandengArray.length > 0 && $scope.gandengBtnOnLabuh===false){
					for(var i = 0;i<$scope.kapalGandengArray.length; i++) {
					    totalGTKapalGandeng += $scope.kapalGandengArray[i].gtKapal;
					}
				}
				gtKapal = gtKapal+totalGTKapalGandeng;
				if(localStorage.validasiWajibPanduTunda==='1' && jasaLabuhGrid.length>0 && jasaPanduGrid.length===0 && gtKapal >=500 && jenisKapal!=="KPLTONKANG"){
					var note =  {
						hasEsc	: statusEskalasi,
						dataEsc : itemEskalasi,
						dataItem : $scope.permohonan,
						showNotif : "hide"
					};
					Notification.setNotification(note);
					$('#ConfirmWajibPandu').modal('show');
					return false;
				}else{
					return true;
				}
			}
		}

/*==================================jasa tambat==========================================*/
		$scope.validationDataTambat = function(jasa){
			var jasaTambatGrid;
			if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
				jasaTambatGrid = $scope.jasatambatgridpast;
			}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
				jasaTambatGrid = $scope.jasatambatgrid;
			}else{
				jasaTambatGrid = $scope.jasatambatgrid;
			}

			jasaTambatGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatGrid)), '-noPpkJasa');

			if(jasaTambatGrid.length > 0){
				var tglMulaiVal0 = Date.parse(jasaTambatGrid[0].tglMulai);
				var tglSelesaiVal0 = Date.parse(jasaTambatGrid[0].tglSelesai);
				var tglMulaiVal1 = Date.parse(jasa.tglMulai);
				var tglSelesaiVal1 = Date.parse(jasa.tglSelesai);

				if((jasa.kodeLokasi == jasaTambatGrid[0].kodeLokasi) && (tglMulaiVal1 == tglMulaiVal0) && (tglSelesaiVal1 == tglSelesaiVal0)){
					return false;
				}else if((jasa.kodeLokasi == jasaTambatGrid[0].kodeLokasi) && (tglMulaiVal1 <= tglMulaiVal0)){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}

		$scope.validationTglTambat = function(jasaTambat){
			var jasaPanduGrid,panduMasuk,panduKeluar,matchMasuk = true,matchKeluar = true;
			var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH045');
			var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH045');
			var statusEskalasi = itemEskalasi.id!==undefined?true:false;
			if(hasEsc){
				matchMasuk = true;
				matchKeluar = true;
			}else{
				if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
					jasaPanduGrid = $scope.jasapandugridpast;
				}else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
					jasaPanduGrid = $scope.jasapandugrid;
				}else{
					jasaPanduGrid = $scope.jasapandugrid;
				}
				jasaPanduGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaPanduGrid)), 'noPpkJasa');
				if(jasaPanduGrid.length > 0){
					for (var i = 0; i < jasaPanduGrid.length; i++) {
						switch(jasaPanduGrid[i].jenisGerakan) {
						    case '1':
						        panduMasuk = jasaPanduGrid[i];
						        break;
						    case '3':
						        panduKeluar = jasaPanduGrid[i];
						        break;
						}
					}
					if(panduMasuk.jenisPandu != '2'){
						if(panduMasuk !== undefined){
							var tglPanduMasuk = Date.parse($filter('date')(panduMasuk.tglPandu, 'yyyy-MM-dd'));
							var tglMulai = Date.parse($filter('date')(jasaTambat.tglMulai, 'yyyy-MM-dd'));
							if(tglMulai > tglPanduMasuk){
								var note =  {
											type 	: 'warning',
											message : 'Tanggal Mulai Tidak Bisa Lebih Besar Dari Tanggal Pandu Gerakan Masuk.<br><br>Kode validasi: <b>VALPMH-045</b>',
											hasEsc	: statusEskalasi,
											dataEsc : itemEskalasi
										};
								Notification.setNotification(note);
								$("#tglMulaiTambat").focus();
								matchMasuk = false;
							}
						}
						if(panduKeluar !== undefined){
							var tglPanduKeluar = Date.parse($filter('date')(panduKeluar.tglPandu, 'yyyy-MM-dd'));
							var tglSelesai = Date.parse($filter('date')(jasaTambat.tglSelesai, 'yyyy-MM-dd'));
							if(tglSelesai > tglPanduKeluar){
								var note =  {
											type 	: 'warning',
											message : 'Tanggal Selesai Tidak Bisa Lebih Besar Dari Tanggal Pandu Gerakan Keluar.<br><br>Kode validasi: <b>VALPMH-045</b>',
											hasEsc	: statusEskalasi,
											dataEsc : itemEskalasi
										};
								Notification.setNotification(note);
								$("#tglSelesaiTambat").focus();
								matchKeluar = false;
							}
						}
					}

				}

				return {"matchMasuk":matchMasuk, "matchKeluar":matchKeluar};
			}
		}
			//delete jasa tambat
			$scope.deleteTambat = function(id, i) {
				var checkDeleteTambat = confirm('Apakah Anda akan Menghapus data ini?');
				if (checkDeleteTambat) {
					if(id == null){
						$scope.jasatambatgrid.splice(i, 1);
						$scope.setNotification  = {
							type	: "success",
							message	: "Data berhasil dihapus"
						};
						Notification.setNotification($scope.setNotification);
					}else{
						PermohonanTambatDelete.delete({
							id: id
						}, function(response) {
							$scope.jasatambatgrid.splice(i, 1);
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil dihapus"
							};
							Notification.setNotification($scope.setNotification);
							$scope.setCalculateEPB();
						}, function() {
							$scope.setNotification  = {
								type	: "warning",
								message	: "Data tidak berhasil dihapus"
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
					$scope.getListOfDermagaTambat(response.kodeLokasi).then(function(data){
						var jenisDmg = data[0].mdmgJenisDmg;
						var kemasanBongkar = $scope.permohonan.kemasanBongkar;
						var kemasanMuat = $scope.permohonan.kemasanMuat;
						var flagTender = response.flagTender;
						var sifatKunjungan = $scope.permohonan.sifatKunjungan;
						if((kemasanBongkar=='' || kemasanBongkar==undefined) && (kemasanMuat=='' || kemasanMuat==undefined) && jenisDmg==='DMGUMUM' && flagTender==='0'){
							$scope.showEntryKemasan = true;
							if(sifatKunjungan==='1'){
								$scope.requiredEntryKemasan = true;
							}else{
								$scope.requiredEntryKemasan = false;
							}
						}else{
							$scope.showEntryKemasan = false;
							$scope.requiredEntryKemasan = false;
						}
					});
					document.getElementById("jamMulaiTambatVal").value = $filter('date')(response.tglMulai, 'HH:mm');
					document.getElementById("jamSelesaiTambatVal").value = $filter('date')(response.tglSelesai, 'HH:mm');
					$scope.jamMulai = $filter('date')(response.tglMulai, 'HH:mm');
					$scope.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
					//$scope.jamSelesai = $scope.splitDate(response.tglSelesai);
					$scope.tglMulaiTambat = $scope.splitDate(response.tglMulai);
					$scope.tglSelesaiTambat = $scope.splitDate(response.tglSelesai);
					$scope.jasatambat.lokasi = response.namaLokasi;
					$scope.jasatambat.dokumenTender = response.dokumenTender;
					$scope.jasatambat.flagRampdoor = response.flagRampdoor;
				});
			};
			//submit tambat
			$scope.submitTambat = function(jasatambat) {
				if($routeParams.id){
					jasatambat = $scope.jasatambat;
					var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
					var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
					jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

					var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
					var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
					jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
				}
				if (jasatambat.noPpkJasa === undefined) {
					jasatambat.detailPmhId = $scope.permohonan.details[0].id;
					jasatambat.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
					jasatambat.noPpk1 = $scope.permohonan.noPpk1;

					if(jasatambat.tglMulai === undefined){
						//concat jam dan waktu mulai
						var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
						var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
						jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;
					}

					if(jasatambat.tglSelesai === undefined){
						//concat jam dan waktu selesai
						var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
						var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
						jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
					}

					jasatambat.kodeLokasi = jasatambat.lokasi.mdmgKode;
					jasatambat.namaLokasi = jasatambat.lokasi.mdmgNama;
					jasatambat.jenisDermaga = jasatambat.lokasi.mdmgJenisDmg;

					jasatambat.kadeAwal = 0;
					jasatambat.kadeAkhir = 0;

					if(jasatambat.flagTender === undefined){
						jasatambat.flagTender = $scope.jasatambat.flagTender;
					}

					if(jasatambat.flagRampdoor === undefined){
						jasatambat.flagRampdoor = $scope.jasatambat.flagRampdoor;
					}

					if($routeParams.id){
						/* Start validasi dermaga tambat :*/
						var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
						if(langsungSandar == true){
							var validationDermaga = $scope.validationDermagaTambat(jasatambat);
							if(!validationDermaga) return false;
						}
						/* End validasi dermaga tambat :*/

						var parseTglMulai = Date.parse(jasatambat.tglMulai);
						var parseTglSelesai = Date.parse(jasatambat.tglSelesai);
						if(parseTglMulai >= parseTglSelesai){
							var note =  {
											type 	: "warning",
											message : "Waktu Selesai harus melebihi Waktu Mulai<br><br>Kode validasi: <b>VALPMH-020</b>"
										};
							Notification.setNotification(note);
							return false;
						}
						if(!$scope.validationDataTambat(jasatambat)){
							var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH045');
							var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH045');
							var statusEskalasi = itemEskalasi.id!==undefined?true:false;
							if(hasEsc){
								return true;
							}else{
								var note =  {
												type 	: "warning",
												message : "<b>Data yang diinput terdeteksi duplikat.</b><br>Silahkan Periksa kembali Data yang diinputkan.<br><br>Kode validasi : <b>VALPMH-045</b>",
												hasEsc	: statusEskalasi,
												dataEsc : itemEskalasi
											};
								Notification.setNotification(note);
								return false;
							}
						}
						$scope.validationWajibPandu();

						var R1 = validationForm.required('Lokasi Labuh', jasatambat.namaLokasi);
						if(!R1){return R1;}
						var R2 = validationForm.required('Tanggal Mulai Tambat', tglTambatMskVal);
						if(!R2){return R2;}
						var R3 = validationForm.required('Tanggal Selesai Tambat', tglTambatSlsVal);
						if(!R3){return R3;}
						var R4 = validationForm.required('Jam Mulai Tambat', jamTambatMskVal);
						if(!R4){return R4;}
						var R5 = validationForm.required('Jam Selesai Tambat', jamTambatSlsVal);
						if(!R5){return R5;}
					}

					var formData = new FormData();
					formData.append('pmhTambat', new Blob([JSON.stringify(jasatambat)], { type: "application/json" }));
					if (jasatambat.uploadFile !== undefined && jasatambat.uploadFile.length > 0) {
						formData.append('file', jasatambat.uploadFile[0]);
					}

					PermohonanTambat.save(formData, function(response) {
						if(response.status !== '500'){
							$scope.setNotification  = {
								type	: "success",
								message	: "Jasa Tambat berhasil tersimpan"
							};
							Notification.setNotification($scope.setNotification);
							if($routeParams.id){
								response.fake = false;
								$scope.temptambat.push(response);
								$scope.jasatambatgrid = $scope.temptambat;
								$scope.setCalculateEPB();
								BindEskalasi.setDefaultEskalasi();
							}
							if($scope.permohonan.kemasanBongkarTambat || $scope.permohonan.kemasanMuatTambat){
								$scope.update();
							}
							$scope.showEntryKemasan = false;
							$scope.requiredEntryKemasan = false;
							$scope.jasatambat.noPpkJasa = undefined;
							//$scope.jasatambat.noForm = $scope.permohonan.noForm;
							$scope.jasatambat.lokasi = '';
							$scope.jasatambat.kadeAwal = '';
							$scope.jasatambat.kadeAkhir = '';
							$scope.tglMulaiTambat = new Date();
							$scope.tglSelesaiTambat = new Date();
							$scope.jasatambat.flagTender = '0';
							$scope.jasatambat.flagRampdoor = '0';
							document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
							document.getElementById("jamSelesaiTambatVal").value = moment(timePlus1).format('HH:mm');
						}else{
							$scope.setNotification  = {
								type	: "danger",
								message	: "Jasa Tambat tidak berhasil tersimpan."+response.description
							};
							Notification.setNotification($scope.setNotification);
						}
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Tambat tidak berhasil tersimpan."+response.description
						};
						Notification.setNotification($scope.setNotification);
					});
				} else {
					//concat jam dan waktu mulai
					var tglTambatMskVal = $filter('date')($scope.tglMulaiTambat, 'yyyy-MM-dd');
					var jamTambatMskVal = document.getElementById("jamMulaiTambatVal").value;
					$scope.jasatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;

					//concat jam dan waktu selesai
					var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambat, 'yyyy-MM-dd');
					var jamTambatSlsVal = document.getElementById("jamSelesaiTambatVal").value;
					$scope.jasatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;

					if (typeof $scope.jasatambat.lokasi === 'object') {
						$scope.jasatambat.kodeLokasi = $scope.jasatambat.lokasi.mdmgKode;
						$scope.jasatambat.namaLokasi = $scope.jasatambat.lokasi.mdmgNama;
						$scope.jasatambat.jenisDermaga = $scope.jasatambat.lokasi.mdmgJenisDmg;
					}

					/* validasi dermaga tambat :*/
					var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
					if(langsungSandar == true){
						var validationDermaga = $scope.validationDermagaTambat($scope.jasatambat);
						if(!validationDermaga) return false;
					}

					var parseTglMulai = Date.parse($scope.jasatambat.tglMulai);
					var parseTglSelesai = Date.parse($scope.jasatambat.tglSelesai);
					if(parseTglMulai >= parseTglSelesai){
						var note = 	{
										type 	: "warning",
										message : "Waktu Selesai harus melebihi Waktu Mulai<br><br>Kode validasi: <b>VALPMH-020</b>"
									};
						Notification.setNotification(note);
						return false;
					}

					var formData = new FormData();
					formData.append('pmhTambat', new Blob([JSON.stringify($scope.jasatambat)], { type: "application/json" }));
					if ($scope.jasatambat.uploadFile !== undefined && $scope.jasatambat.uploadFile.length > 0) {
						formData.append('file', $scope.jasatambat.uploadFile[0]);
					}

					PermohonanTambatEdit.update({
						noPpkJasa: $scope.jasatambat.noPpkJasa
					}, formData, function(response) {
						$scope.setNotification  = {
							type	: "success",
							message	: "Jasa Tambat berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						$scope.setCalculateEPB();
						BindEskalasi.setDefaultEskalasi();

						if($scope.permohonan.kemasanBongkarTambat || $scope.permohonan.kemasanMuatTambat){
							$scope.update();
						}
						$scope.showEntryKemasan = false;
						$scope.requiredEntryKemasan = false;
						$scope.jasatambatgrid[$scope.indexTambat].namaLokasi = response.namaLokasi;
						$scope.jasatambatgrid[$scope.indexTambat].tglMulai = response.tglMulai;
						$scope.jasatambatgrid[$scope.indexTambat].tglSelesai = response.tglSelesai;
						$scope.jasatambatgrid[$scope.indexTambat].kadeAwal = response.kadeAwal;
						$scope.jasatambatgrid[$scope.indexTambat].kadeAkhir = response.kadeAkhir;
						$scope.jasatambat.noPpkJasa = undefined;
						//$scope.jasatambat.noForm = $scope.permohonan.noForm;
						$scope.jasatambat.lokasi = '';
						$scope.jasatambat.kadeAwal = '';
						$scope.jasatambat.kadeAkhir = '';
						$scope.tglMulaiTambat = new Date();
						$scope.tglSelesaiTambat = new Date();
						$scope.jasatambat.flagTender = '0';
						$scope.jasatambat.flagRampdoor = '0';
						document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
						document.getElementById("jamSelesaiTambatVal").value = moment(timePlus1).format('HH:mm');
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Tambat tidak berhasil tersimpan."+response.description
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
				$scope.jasatambat.flagTender = '0';
				$scope.jasatambat.flagRampdoor = '0';
				document.getElementById("jamMulaiTambatVal").value = moment().format('HH:mm');
				document.getElementById("jamSelesaiTambatVal").value = moment(timePlus1).format('HH:mm');
				$scope.showEntryKemasan = false;
				$scope.requiredEntryKemasan = false;
			};

			$scope.validationDermagaTambat = function(jasaTambat){
				var match = true;
				var jasaLabuhGrid,jasaPanduGrid, failedMessage;

				/* set jasaTambatGrid */
				if($scope.jasalabuhgridpast.length>0 && $scope.jasalabuhgrid.length===0){
					jasaLabuhGrid = $scope.jasalabuhgridpast;
				}else if($scope.jasalabuhgridpast.length===0 && $scope.jasalabuhgrid.length>0){
					jasaLabuhGrid = $scope.jasalabuhgrid;
				}else{
					jasaLabuhGrid = $scope.jasalabuhgrid;
				}
				if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
					jasaPanduGrid = $scope.jasapandugridpast;
				}else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
					jasaPanduGrid = $scope.jasapandugrid;
				}else{
					jasaPanduGrid = $scope.jasapandugrid;
				}

				jasaPanduGrid.sort($scope.sortedNoPpkJasa); //cek tambat baru pertama kali
				if($scope.jasatambatgridpast.length == 0 && $scope.jasatambatgrid.length == 0){
					if(jasaLabuhGrid.length>0 && jasaTambat.lokasi){
						//var itemJnsDmg = jasaLabuhGrid[0].jenisDermaga;
						//if(itemJnsDmg != 'AREALABUH'){
							var itemLabuh = jasaLabuhGrid[0].kodeLokasi;
							if(itemLabuh!==jasaTambat.lokasi.mdmgKode){
								match = false;
								failedMessage = "Lokasi Tambat harus sama dengan Lokasi Labuh<br><br>Kode validasi: <b>VALPMH-022</b>"
							}
						//}else{
							if(jasaPanduGrid.length>0 && jasaTambat.lokasi){
								var itemPandu = typeof jasaPanduGrid[0].lokasiTujuan==='object'?jasaPanduGrid[0].lokasiTujuan.mdmgKode:jasaPanduGrid[0].kodeLokasiTujuan;
								var itemTambat = typeof jasaTambat.lokasi==='object'?jasaTambat.lokasi.mdmgKode:jasaTambat.kodeLokasi;

								if(itemPandu!==itemTambat){
									match = false;
									failedMessage = "Lokasi Tambat harus sama dengan Lokasi Tujuan Pandu<br><br>Kode validasi: <b>VALPMH-038</b>"
								}
							}
						//}
					}
				}

				if(!match){
					var note =  {
									type 	: "warning",
									message : failedMessage
								};
					Notification.setNotification(note);
					$("#jasatambat_lokasi").focus();
				}
				return match;
			}
/*===================================jasa pandu==========================================*/
			//delete jasa pandu
			$scope.deletePandu = function(id, i) {
					var checkDeletePandu = confirm('Apakah Anda akan Menghapus data ini?');
					if (checkDeletePandu) {
						if(id == null){
							$scope.jasapandugrid.splice(i, 1);
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil dihapus"
							};
							Notification.setNotification($scope.setNotification);
						}else{
							PermohonanPanduDelete.delete({
								id: id
							}, function(response) {
								$scope.jasapandugrid.splice(i, 1);
								$scope.setNotification  = {
									type		: "success",
									message	: "Data berhasil dihapus"
								};
								Notification.setNotification($scope.setNotification);
								$scope.setCalculateEPB();
							}, function() {
								$scope.setNotification  = {
									type		: "warning",
									message	: "Data tidak berhasil dihapus"
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
					$scope.jamPandu = $filter('date')(response.tglPandu, 'HH:mm');
					$scope.tglPandu = $scope.splitDate(response.tglPandu);
					$scope.jasapandu.lokasiAsal = response.namaLokasiAsal;
					$scope.jasapandu.lokasiTujuan = response.namaLokasiTujuan;
					SearchKapalGandeng.get({noPpk1 : $routeParams.id, noPpkJasa : noppkjasa},function(response){
						if (response.totalElements > 0) {
							$scope.kapalGandengArray = 	response.content;
							$scope.gandengBtn = false;
							if(localStorage.validasiWajibPanduTunda==='1'){
								$scope.gandengBtnOnLabuh = false;
							}
						}
					});
				});
			};

			//submit pandu
			$scope.constructPanduBulk = function (jasapandu) {
				AppParam.get({nama:'JENIS_PANDU'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<$scope.temppandu.length;j++){
							if($scope.temppandu[j].jenisPanduText == null){
								if($scope.temppandu[j].jenisPandu == content[idx].value){
									$scope.temppandu[j].jenisPanduText = content[idx].caption;
								}
							}
						}
					}
				});

				AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
					var content = response.content;
					for(var idx = 0; idx < content.length;idx++){
						for(var j=0;j<$scope.temppandu.length;j++){
							if($scope.temppandu[j].jenisGerakanText == null){
								if($scope.temppandu[j].jenisGerakan == content[idx].value){
									$scope.temppandu[j].jenisGerakanText = content[idx].caption;
								}
							}
						}
					}
				});

				jasapandu.jenisPanduText = $scope.temppandu.jenisPanduText;
				jasapandu.jenisGerakanText = $scope.temppandu.jenisGerakanText;

				jasapandu.detailPmhId = $scope.permohonan.details[0].id;
				jasapandu.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
				jasapandu.noPpk1 = $scope.permohonan.noPpk1;

				if(jasapandu.tglPandu === undefined){
					var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
					var jamPanduVal = document.getElementById("jamPanduVal").value;
					jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
				}

				jasapandu.jenisPandu = parseInt(jasapandu.jenisPandu);
				jasapandu.jenisGerakan = parseInt(jasapandu.jenisGerakan);

				jasapandu.kodeLokasiAsal = jasapandu.lokasiAsal.mdmgKode;
				jasapandu.namaLokasiAsal = jasapandu.lokasiAsal.mdmgNama;
				jasapandu.jenisDermagaAsal = jasapandu.lokasiAsal.mdmgJenisDmg;
				jasapandu.kodeLokasiTujuan = jasapandu.lokasiTujuan.mdmgKode;
				jasapandu.namaLokasiTujuan = jasapandu.lokasiTujuan.mdmgNama;
				jasapandu.jenisDermagaTujuan = jasapandu.lokasiTujuan.mdmgJenisDmg;

				var loaKapal = $scope.permohonan.loa?$scope.permohonan.loa:$scope.valueKapal.mkplLoa;

				if($routeParams.id){
					/* validasi dermaga tujuan pandu :*/
					var validationDermaga = $scope.validationTujuanLokasiPandu(jasapandu);
					if(!validationDermaga) return false;

					/*validasi dermaga asal pandu :
					var validationAsalDermaga = $scope.validationAsalLokasiPandu(jasapandu);
					if(!validationAsalDermaga) return false;
					*/

					/* validasi Tgl Pandu toleransi 1 jam:*/
					var validationTglPandu = $scope.validationTglPandu(jasapandu);
					if(!validationTglPandu) return false;
					

					/* validasi Wajig Tunda :*/
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

				}

				if(jasapandu.kapalGandeng){
					if(jasapandu.kapalGandeng.length > 0){
						for (var y = 0; y < jasapandu.kapalGandeng.length; y++) {
							if(!jasapandu.kapalGandeng[y].id){
								$scope.kapalGandeng[y] = jasapandu.kapalGandeng[y];
								$scope.kapalGandeng[y].noPpk1 = $scope.permohonan.noPpk1;
								$scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
								AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
									$scope.setNotification  = {
										type	: "success",
										message	: "Data berhasil tersimpan"
									};
									Notification.setNotification($scope.setNotification);
								},function(){
									$scope.setNotification  = {
										type	: "danger",
										message	: "Data tidak berhasil tersimpan"
									};
									Notification.setNotification($scope.setNotification);
								});
							}
						}
						checkunique = [];
					}
				}

				}


			$scope.submitPanduBulk = function(jasapandu){
					PermohonanPanduBulk.save(jasapandu,function(response) {
						$scope.setNotification  = {
							type	: "success",
							message	: "Data berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					},function(){
						$scope.setNotification  = {
							type	: "danger",
							message	: "Data tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					});
			}

			$scope.submitPandu = function(jasapandu) {
				 var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
				if($routeParams.id){
					jasapandu = $scope.jasapandu;
					var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
					var jamPanduVal = document.getElementById("jamPanduVal").value;
					jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
					jasapandu.kapalGandeng = $scope.kapalGandengUpdateArray;
				}

				if (jasapandu.noPpkJasa === undefined) {
					jasapandu.jenisPanduText = $scope.temppandu.jenisPanduText;
					jasapandu.jenisGerakanText = $scope.temppandu.jenisGerakanText;

					jasapandu.detailPmhId = $scope.permohonan.details[0].id;
					jasapandu.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
					jasapandu.noPpk1 = $scope.permohonan.noPpk1;

					if(jasapandu.tglPandu === undefined){
						var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
						var jamPanduVal = document.getElementById("jamPanduVal").value;
						jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;
					}

					jasapandu.jenisPandu = parseInt(jasapandu.jenisPandu);
					jasapandu.jenisGerakan = parseInt(jasapandu.jenisGerakan);

					jasapandu.kodeLokasiAsal = jasapandu.lokasiAsal.mdmgKode;
					jasapandu.namaLokasiAsal = jasapandu.lokasiAsal.mdmgNama;
					jasapandu.jenisDermagaAsal = jasapandu.lokasiAsal.mdmgJenisDmg;
					jasapandu.kodeLokasiTujuan = jasapandu.lokasiTujuan.mdmgKode;
					jasapandu.namaLokasiTujuan = jasapandu.lokasiTujuan.mdmgNama;
					jasapandu.jenisDermagaTujuan = jasapandu.lokasiTujuan.mdmgJenisDmg;

					var loaKapal = $scope.permohonan.loa?$scope.permohonan.loa:$scope.valueKapal.mkplLoa;
					if($routeParams.id){
						/* validasi dermaga tujuan pandu :*/
						var validationDermaga = $scope.validationTujuanLokasiPandu(jasapandu);
						if(!validationDermaga) return false;

						/*validasi dermaga asal pandu :
						var validationAsalDermaga = $scope.validationAsalLokasiPandu(jasapandu);
						if(!validationAsalDermaga) return false;
						*/

						/* validasi Tgl Pandu toleransi 1 jam:*/
						var validationTglPandu = $scope.validationTglPandu(jasapandu);
						if(!validationTglPandu) return false;
						

						/* validasi Wajig Tunda :*/
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

						var R1 = validationForm.required('Lokasi Asal Pandu', jasapandu.namaLokasiAsal);
						if(!R1){return R1;}
						var R2 = validationForm.required('Lokasi Tujuan Pandu', jasapandu.namaLokasiTujuan);
						if(!R2){return R2;}
						var R3 = validationForm.required('Tanggal Pandu', tglPanduVal);
						if(!R3){return R3;}
						var R4 = validationForm.required('Jam Pandu', jamPanduVal);
						if(!R4){return R4;}

					}

					PermohonanPandu.save(jasapandu, function(response) {
						if(response.status !== '500'){
							if(jasapandu.kapalGandeng){
								if(jasapandu.kapalGandeng.length > 0){
									for (var y = 0; y < jasapandu.kapalGandeng.length; y++) {
										if(!jasapandu.kapalGandeng[y].id){
											$scope.kapalGandeng[y] = jasapandu.kapalGandeng[y];
											$scope.kapalGandeng[y].noPpk1 = $scope.permohonan.noPpk1;
											$scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
											AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
												$scope.setNotification  = {
													type	: "success",
													message	: "Data berhasil tersimpan"
												};
												Notification.setNotification($scope.setNotification);
											},function(){
												$scope.setNotification  = {
													type	: "danger",
													message	: "Data tidak berhasil tersimpan."+response.description
												};
												Notification.setNotification($scope.setNotification);
											});
										}
									}
									checkunique = [];
								}
							}

							AppParam.get({nama:'JENIS_PANDU'}, function(response){
								var content = response.content;
								for(var idx = 0; idx < content.length;idx++){
									for(var j=0;j<$scope.temppandu.length;j++){
										if($scope.temppandu[j].jenisPanduText == null){
											if($scope.temppandu[j].jenisPandu == content[idx].value){
												$scope.temppandu[j].jenisPanduText = content[idx].caption;
											}
										}
									}
								}
							});

							AppParam.get({nama:'JENIS_GERAKAN'}, function(response){
								var content = response.content;
								for(var idx = 0; idx < content.length;idx++){
									for(var j=0;j<$scope.temppandu.length;j++){
										if($scope.temppandu[j].jenisGerakanText == null){
											if($scope.temppandu[j].jenisGerakan == content[idx].value){
												$scope.temppandu[j].jenisGerakanText = content[idx].caption;
											}
										}
									}
								}
							});


							$scope.setNotification  = {
								type	: "success",
								message	: "Jasa Pandu berhasil tersimpan"
							};
							Notification.setNotification($scope.setNotification);
							if($routeParams.id){
								response.fake = false;
								$scope.temppandu.push(response);
								$scope.jasapandugrid = $scope.temppandu;
								BindEskalasi.setDefaultEskalasi();
								$scope.setCalculateEPB();

								var validationWajibTunda = Validations.checkWajibTunda(paramWajibTunda);
								if(!validationWajibTunda){
									$scope.permohonan.loa = loaKapal;
									if($scope.loaMaxvalue >= 70){
										$scope.loaMax = true;
									}
									$('#ConfirmLoaJasaPandu').modal('show');
								}
							}
							$scope.jasapandu.noPpkJasa === undefined;
							$scope.jasapandu.lokasiAsal = '';
							$scope.jasapandu.lokasiTujuan = '';
							$scope.jasapandu.jenisPandu = '1';
							$scope.jasapandu.jenisGerakan = '';
							$scope.tglPandu = new Date();
							document.getElementById("jamPanduVal").value = moment().format('HH:mm');
							$scope.kapalGandengArray = [];
							$scope.kapalGandengUpdateArray = [];
						}else{
							$scope.setNotification  = {
								type	: "danger",
								message	: "Jasa Pandu tidak berhasil tersimpan."+response.description
							};
							Notification.setNotification($scope.setNotification);
						}
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Pandu tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					});
				} else {
					//concat jam dan waktu
					var tglPanduVal = $filter('date')($scope.tglPandu, 'yyyy-MM-dd');
					var jamPanduVal = document.getElementById("jamPanduVal").value;
					$scope.jasapandu.tglPandu = tglPanduVal + 'T' + jamPanduVal;

					$scope.jasapandu.jenisPandu = parseInt($scope.jasapandu.jenisPandu);
					$scope.jasapandu.jenisGerakan = parseInt($scope.jasapandu.jenisGerakan);

					if (typeof $scope.jasapandu.lokasiAsal === 'object') {
						$scope.jasapandu.kodeLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgKode;
						$scope.jasapandu.namaLokasiAsal = $scope.jasapandu.lokasiAsal.mdmgNama;
					}

					if (typeof $scope.jasapandu.lokasiTujuan === 'object') {
						$scope.jasapandu.kodeLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgKode;
						$scope.jasapandu.namaLokasiTujuan = $scope.jasapandu.lokasiTujuan.mdmgNama;
					}

					if($routeParams.id){
						/* validasi dermaga tujuan pandu :*/
						var validationDermaga = $scope.validationTujuanLokasiPandu($scope.jasapandu);
						if(!validationDermaga) return false;

						/*validasi dermaga asal pandu :
						var validationAsalDermaga = $scope.validationAsalLokasiPandu($scope.jasapandu);
						if(!validationAsalDermaga) return false;
						*/

						/* validasi Tgl Pandu toleransi 1 jam:*/
						var validationTglPandu = $scope.validationTglPandu(jasapandu);
						if(!validationTglPandu) return false;
						
					}

					PermohonanPanduEdit.update({
						id: $scope.jasapandu.noPpkJasa
					}, $scope.jasapandu, function(response) {
						if($scope.kapalGandengUpdateArray.length > 0){
							for (var y = 0; y < $scope.kapalGandengUpdateArray.length; y++) {
								if(!$scope.kapalGandengUpdateArray[y].id){
									$scope.kapalGandeng[y] = $scope.kapalGandengUpdateArray[y];
									$scope.kapalGandeng[y].noPpk1 = $scope.jasapandu.noPpk1;
									$scope.kapalGandeng[y].noPpkJasa = $scope.jasapandu.noPpkJasa;
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
							$scope.kapalGandengArray = [];
							$scope.kapalGandengUpdateArray = [];
						}
						$scope.setNotification  = {
							type	: "success",
							message	: "Jasa Pandu berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						BindEskalasi.setDefaultEskalasi();
						$scope.setCalculateEPB();
						$scope.jasapandugrid[$scope.indexPandu].namaLokasiAsal = response.namaLokasiAsal;
						$scope.jasapandugrid[$scope.indexPandu].namaLokasiTujuan = response.namaLokasiTujuan;
						$scope.jasapandugrid[$scope.indexPandu].tglPandu = response.tglPandu;

						AppParamValue.get({nama:'JENIS_PANDU', value:response.jenisPandu}, {}, function(response){
							$scope.jasapandugrid[$scope.indexPandu].jenisPanduText = response[0].caption;
						});

						AppParamValue.get({nama:'JENIS_GERAKAN', value:response.jenisGerakan}, {}, function(response){
							$scope.jasapandugrid[$scope.indexPandu].jenisGerakanText = response[0].caption;
						});

						// $scope.jasapandugrid[$scope.indexPandu].jenisPanduText = response.jenisPanduText;
						// $scope.jasapandugrid[$scope.indexPandu].jenisGerakanText = response.jenisGerakanText;
						$scope.jasapandugrid[$scope.indexPandu].flagApbs = response.flagApbs;
						$scope.jasapandu.noPpkJasa = undefined;
						//$scope.jasapandu.noForm = $scope.permohonan.noForm;
						$scope.jasapandu.lokasiAsal = '';
						$scope.jasapandu.lokasiTujuan = '';
						$scope.jasapandu.jenisPandu = '1';
						$scope.jasapandu.jenisGerakan = '';
						$scope.tglPandu = new Date();
						document.getElementById("jamPanduVal").value = moment().format('HH:mm');
						$scope.kapalGandengArray = [];
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Pandu tidak berhasil tersimpan."+response.description
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
			};

			$scope.validationAsalLokasiPandu = function(jasaPandu){
				var match = true;
				var jasaTambatGrid;
				/* set jasaTambatGrid */
				if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
					jasaTambatGrid = $scope.jasatambatgridpast;
				}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
					jasaTambatGrid = $scope.jasatambatgrid;
				}else{
					jasaTambatGrid = $scope.jasatambatgrid;
				}
				jasaTambatGrid = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatGrid)), '-noPpkJasa');

				if(jasaTambatGrid.length > 0 && jasaPandu.lokasiAsal){
					var itemTambat;
					jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
					if(jasaPandu.jenisDermagaAsal!==null){
						if(jasaPandu.jenisDermagaAsal.indexOf('DMG') >= 0 ){
							if(jasaPandu.jenisGerakan == '3'){
								if(typeof jasaTambatGrid[0].lokasi==='object'){
									itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
								}else{
									itemTambat = jasaTambatGrid[0].kodeLokasi;
								}

								if(typeof jasaPandu.lokasiAsal==='object'){
									if(itemTambat!==jasaPandu.lokasiAsal.mdmgKode){
										if(jasaPandu.lokasiAsal.mdmgJenisDmg == 'AREALABUH'){
											match = true;
										}else{
											match = false;
										}
									}
								}
							}
						}
					}
				}

				if(!match){
					var note =  {
									type 	: "warning",
									message : "Lokasi Asal Pandu Gerakan Keluar harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-046</b>"
								};
					Notification.setNotification(note);
					$("#jasapanduLokasiAsal").focus();
					$scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
					$scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
				}
				return match;
			}

			$scope.validationTujuanLokasiPandu = function(jasaPandu){
				var match = true;
				var jasaTambatGrid;
				var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);

				/* set jasaTambatGrid */
				if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
					jasaTambatGrid = $scope.jasatambatgridpast;
				}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
					jasaTambatGrid = $scope.jasatambatgrid;
				}else{
					jasaTambatGrid = $scope.jasatambatgrid;
				}

				jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
				if(langsungSandar == true){
					if(jasaTambatGrid.length>0 && jasaPandu.lokasiTujuan){
						var itemTambat;					
						if(jasaPandu.jenisDermagaTujuan!==null){
							if(jasaPandu.jenisDermagaTujuan.indexOf('DMG') >= 0 ){
								if(jasaPandu.jenisDermagaTujuan != 'DMGKHUSUS'){
									if(jasaPandu.jenisGerakan == '1'){
										if(typeof jasaTambatGrid[0].lokasi==='object'){
											itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
										}else{
											itemTambat = jasaTambatGrid[0].kodeLokasi;
										}

										if(typeof jasaPandu.lokasiTujuan==='object'){
											if(itemTambat!==jasaPandu.lokasiTujuan.mdmgKode){
												match = false;
											}
										}
									}
								}
							}
						}
					}					
				}
				
				if(langsungSandar == false){
					if(jasaTambatGrid.length>0 && jasaPandu.lokasiTujuan){
						var itemTambat;					
						if(jasaPandu.jenisDermagaTujuan!==null){
							if(typeof jasaTambatGrid[0].lokasi==='object'){
								itemTambat = jasaTambatGrid[0].lokasi.mdmgKode;
							}else{
								itemTambat = jasaTambatGrid[0].kodeLokasi;
							}

							if(jasaPandu.jenisGerakan == '2'){
								if(jasaPandu.jenisDermagaTujuan.indexOf('DMG') >= 0 ){
									if(jasaPandu.jenisDermagaTujuan != 'DMGKHUSUS'){
										if(typeof jasaPandu.lokasiTujuan==='object'){
											if(itemTambat!==jasaPandu.lokasiTujuan.mdmgKode){
												match = false;
											}
										}										
									}
								}
							}
						}
					}
				}


				if(!match){
					var note =  {
									type 	: "warning",
									message : "Lokasi Tujuan Pandu Gerakan Masuk harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-023</b>"
								};
					Notification.setNotification(note);
					$("#jasapanduLokasiTujuan").focus();
					$scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
					$scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
				}
				return match;
			}

			$scope.validationTglPandu = function(jasaPandu){
				var match = true;
				var jasaTambatGrid;
				var failedMessage;
				var statusEskalasi = false;

				/* set jasaTambatGrid */
				if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
					jasaTambatGrid = $scope.jasatambatgridpast;
				}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
					jasaTambatGrid = $scope.jasatambatgrid;
				}else{
					jasaTambatGrid = $scope.jasatambatgrid;
				}

				if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
					jasaTambatGrid = $scope.jasatambatgridpast;
				}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
					jasaTambatGrid = $scope.jasatambatgrid;
				}else{
					jasaTambatGrid = $scope.jasatambatgrid;
				}

				if(jasaTambatGrid.length>0){
					var itemTambat,tglPandu,tglMulaiTambat,tglSelesaiTambat,tglPanduDiff;
					tglPandu = $filter('date')(jasaPandu.tglPandu, 'dd-MM-yyyy');
					//tglMulaiTambat = $filter('date')(jasaTambatGrid[0].tglMulai, 'dd-MM-yyyy');
					tglMulaiTambat = Date.parse(jasaTambatGrid[0].tglMulai);
					tglPanduDiff = Date.parse(jasaPandu.tglPandu);
					tglSelesaiTambat = Date.parse(jasaTambatGrid[0].tglSelesai);

					if(jasaPandu.jenisGerakan == '1'){
						var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH024');
						var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH024');
						if(hasEsc){
							match = true;
						}else{
							/*if(tglPandu!==tglMulaiTambat){
								match = false;
								statusEskalasi = itemEskalasi.id!==undefined?true:false;
								failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Mulai Tambat.<br><br>Kode validasi: <b>VALPMH-024</b>";
							}*/
							if(tglMulaiTambat > tglPanduDiff){
	                            var selisih = parseInt(tglMulaiTambat)-parseInt(tglPanduDiff);
	                            if(selisih > 3600000){
	                                match = false;
	                                failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Masuk Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-024</b>"
								}
							}else{
	                            var selisih = parseInt(tglPanduDiff)-parseInt(tglMulaiTambat);
	                            if(selisih > 3600000){
									match = false;
									failedMessage = "Tanggal Pandu Gerakan Masuk harus sama dengan Tanggal Masuk Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-024</b>"
	                            }
	                        }
						}
					}

					if(jasaPandu.jenisGerakan == '2'){
						if(jasaTambatGrid[0].kodeLokasi == jasaPandu.kodeLokasiTujuan){
	                        if(tglMulaiTambat > tglPanduDiff){
	                            var selisih = parseInt(tglMulaiTambat)-parseInt(tglPanduDiff);
	                            if(selisih > 3600000){
	                                match = false;
	                                failedMessage = "Toleransi tidak boleh lebih dari 1 Jam dengan Jasa Tambat.<br><br>Kode validasi: <b>VALPMH-047</b>"
								}
							}else{
	                            var selisih = parseInt(tglPanduDiff)-parseInt(tglMulaiTambat);
	                            if(selisih > 3600000){
									match = false;
									failedMessage = "Toleransi tidak boleh lebih dari 1 Jam dengan Jasa Tambat.<br><br>Kode validasi: <b>VALPMH-047</b>"
	                            }
	                        }							
						}
					}

					if(jasaPandu.jenisGerakan == '3'){
						var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH039');
						var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH039');
						if(hasEsc){
							match = true;
						}else{
	                        if(tglSelesaiTambat > tglPanduDiff){
	                            var selisih = parseInt(tglSelesaiTambat)-parseInt(tglPanduDiff);
	                            if(selisih > 3600000){
	                                match = false;
									statusEskalasi = itemEskalasi.id!==undefined?true:false;
	                                failedMessage = "Tanggal Pandu Gerakan Keluar harus sama dengan Tanggal Selesai Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-039</b>";
								}
							}else{
	                            var selisih = parseInt(tglPanduDiff)-parseInt(tglSelesaiTambat);
	                            if(selisih > 3600000){
									match = false;
									statusEskalasi = itemEskalasi.id!==undefined?true:false;
									failedMessage = "Tanggal Pandu Gerakan Keluar harus sama dengan Tanggal Selesai Tambat,<br> dengan Toleransi 1 Jam.<br><br>Kode validasi: <b>VALPMH-039</b>";
	                            }
	                        }
	                    }
					}
				}

				if(!match){
					var note =  {
									type 	: "warning",
									message : failedMessage,
									hasEsc	: statusEskalasi,
									dataEsc : itemEskalasi
								};
					Notification.setNotification(note);
					$("#tglPandu").focus();
					$scope.jasapandu.jenisGerakan = jasaPandu.jenisGerakan.toString();
					$scope.jasapandu.jenisPandu = jasaPandu.jenisPandu.toString();
				}
				return match;
			}
/*================================jasa tunda==========================================*/
			//delete jasa tunda
			$scope.deleteTunda = function(id, i) {
					var checkDeleteTunda = confirm('Apakah Anda akan Menghapus data ini?');
					if (checkDeleteTunda) {
						if(id == null){
							$scope.jasatundagrid.splice(i, 1);
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil dihapus"
							};
							Notification.setNotification($scope.setNotification);
						}else{
							PermohonanTundaDelete.delete({
								id: id
							}, function(response) {
								$scope.jasatundagrid.splice(i, 1);
								$scope.setNotification  = {
									type	: "success",
									message	: "Data berhasil dihapus"
								};
								Notification.setNotification($scope.setNotification);
								$scope.setCalculateEPB();
							}, function() {
								$scope.setNotification  = {
									type	: "warning",
									message	: "Data tidak berhasil dihapus"
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
					$scope.jamMulaiTunda = $filter('date')(response.tglMulai, 'HH:mm');
					$scope.jasatunda.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
					$scope.tglMulaiTunda = $scope.splitDate(response.tglMulai);
					$scope.tglSelesaiTunda = $scope.splitDate(response.tglSelesai);
					$scope.jasatunda.lokasiAsal = response.namaLokasiAsal;
					$scope.jasatunda.lokasiTujuan = response.namaLokasiTujuan;
					$scope.jasatunda.tundaExtra = response.tundaExtra;
				});
			};
			//submit tunda
			$scope.constructTundaBulk = function (jasatunda) {
				if($routeParams.id){
					jasatunda = $scope.jasatunda;
					var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
					var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
					jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
				}
				if (jasatunda.noPpkJasa === undefined) {
					jasatunda.detailPmhId = $scope.permohonan.details[0].id;
					jasatunda.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
					jasatunda.noPpk1 = $scope.permohonan.noPpk1;

					//concat jam dan waktu tunda
					if(jasatunda.tglMulai === undefined){
						var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
						var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
						jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
					}

					jasatunda.tglSelesai = $filter('date')($scope.tglSelesaiTunda, 'yyyy-MM-ddT00:00:00');
					//var jamSelesaiVal = document.getElementById("jamSelesaiTundaVal").value;
					// $scope.jasatunda.tglSelesai = tglSelesaiVal + 'T' + jamSelesaiVal;

					if (typeof jasatunda.lokasiAsal === 'object') {
						jasatunda.kodeLokasiAsal = jasatunda.lokasiAsal.mdmgKode;
						jasatunda.namaLokasiAsal = jasatunda.lokasiAsal.mdmgNama;
						jasatunda.jenisDermagaAsal = jasatunda.lokasiAsal.mdmgJenisDmg;
					}else{
						jasatunda.kodeLokasiAsal = jasatunda.kodeLokasiAsal;
						jasatunda.namaLokasiAsal = jasatunda.namaLokasiAsal;
						jasatunda.jenisDermagaAsal = jasatunda.jenisDermagaAsal;
					}

					if (typeof jasatunda.lokasiTujuan === 'object') {
						jasatunda.kodeLokasiTujuan = jasatunda.lokasiTujuan.mdmgKode;
						jasatunda.namaLokasiTujuan = jasatunda.lokasiTujuan.mdmgNama;
						jasatunda.jenisDermagaTujuan = jasatunda.lokasiTujuan.mdmgJenisDmg;
					}else{
						jasatunda.kodeLokasiTujuan = jasatunda.kodeLokasiTujuan;
						jasatunda.namaLokasiTujuan = jasatunda.namaLokasiTujuan;
						jasatunda.jenisDermagaTujuan = jasatunda.jenisDermagaTujuan;
					}

					if($routeParams.id){
						/* validasi dermaga pandu :*/
						var validationDermaga = $scope.validationAsalTujuanLokasiTunda(jasatunda);
						if(!validationDermaga) return false;

						/* validasi Tgl Tunda :*/
						var validationTglTunda = $scope.validationTglTunda(jasatunda);
						if(!validationTglTunda) return false;
					}
			}
		};

			$scope.submitTundaBulk = function(jasatunda){				
				PermohonanTundaBulk.save(jasatunda,function(response) {
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$scope.setCalculateEPB();
				},function(){
					$scope.setNotification  = {
						type	: "danger",
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			};

			$scope.submitTunda = function(jasatunda) {
				if($routeParams.id){
					jasatunda = $scope.jasatunda;
					var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
					var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
					jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
				}
				if (jasatunda.noPpkJasa === undefined) {
					jasatunda.detailPmhId = $scope.permohonan.details[0].id;
					jasatunda.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
					jasatunda.noPpk1 = $scope.permohonan.noPpk1;

					//concat jam dan waktu tunda
					if(jasatunda.tglMulai === undefined){
						var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
						var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
						jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;
					}

					jasatunda.tglSelesai = $filter('date')($scope.tglSelesaiTunda, 'yyyy-MM-ddT00:00:00');
					//var jamSelesaiVal = document.getElementById("jamSelesaiTundaVal").value;
					// $scope.jasatunda.tglSelesai = tglSelesaiVal + 'T' + jamSelesaiVal;

					if (typeof jasatunda.lokasiAsal === 'object') {
						jasatunda.kodeLokasiAsal = jasatunda.lokasiAsal.mdmgKode;
						jasatunda.namaLokasiAsal = jasatunda.lokasiAsal.mdmgNama;
						jasatunda.jenisDermagaAsal = jasatunda.lokasiAsal.mdmgJenisDmg;
					}else{
						jasatunda.kodeLokasiAsal = jasatunda.kodeLokasiAsal;
						jasatunda.namaLokasiAsal = jasatunda.namaLokasiAsal;
						jasatunda.jenisDermagaAsal = jasatunda.jenisDermagaAsal;
					}

					if (typeof jasatunda.lokasiTujuan === 'object') {
						jasatunda.kodeLokasiTujuan = jasatunda.lokasiTujuan.mdmgKode;
						jasatunda.namaLokasiTujuan = jasatunda.lokasiTujuan.mdmgNama;
						jasatunda.jenisDermagaTujuan = jasatunda.lokasiTujuan.mdmgJenisDmg;
					}else{
						jasatunda.kodeLokasiTujuan = jasatunda.kodeLokasiTujuan;
						jasatunda.namaLokasiTujuan = jasatunda.namaLokasiTujuan;
						jasatunda.jenisDermagaTujuan = jasatunda.jenisDermagaTujuan;
					}

					if($routeParams.id){
						/* validasi dermaga pandu :*/
						var validationDermaga = $scope.validationAsalTujuanLokasiTunda(jasatunda);
						if(!validationDermaga) return false;

						/* validasi Tgl Tunda :*/
						var validationTglTunda = $scope.validationTglTunda(jasatunda);
						if(!validationTglTunda) return false;

						var R1 = validationForm.required('Lokasi Asal Tunda', jasatunda.namaLokasiAsal);
						if(!R1){return R1;}
						var R2 = validationForm.required('Lokasi Tujuan Tunda', jasatunda.namaLokasiTujuan);
						if(!R2){return R2;}
						var R3 = validationForm.required('Tanggal Tunda', tglMasukVal);
						if(!R3){return R3;}
						var R4 = validationForm.required('Jam Tunda', jamMasukVal);
						if(!R4){return R4;}
					}

					PermohonanTunda.save(jasatunda, function(response) {
						if(response.status !== '500'){
							$scope.setNotification  = {
								type	: "success",
								message	: "Jasa Tunda berhasil tersimpan"
							};
							Notification.setNotification($scope.setNotification);
							if($routeParams.id){
								response.fake = false;
								$scope.temptunda.push(response);
								$scope.jasatundagrid = $scope.temptunda;
								BindEskalasi.setDefaultEskalasi();
								$scope.setCalculateEPB();
							}
							$scope.jasatunda.noppkjasa = undefined;
							$scope.jasatunda.lokasiAsal = '';
							$scope.jasatunda.lokasiTujuan = '';
							$scope.tglMulaiTunda = new Date();
							$scope.tglSelesaiTunda = new Date();
							document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
						}else{
							$scope.setNotification  = {
								type	: "danger",
								message	: "Jasa Tunda tidak berhasil tersimpan."+response.description
							};
							Notification.setNotification($scope.setNotification);
						}
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Tunda tidak berhasil tersimpan."+response.description
						};
						Notification.setNotification($scope.setNotification);
					});
				} else {
					//concat jam dan waktu tunda
					var tglMasukVal = $filter('date')($scope.tglMulaiTunda, 'yyyy-MM-dd');
					var jamMasukVal = document.getElementById("jamMulaiTundaVal").value;
					$scope.jasatunda.tglMulai = tglMasukVal + 'T' + jamMasukVal;

					// var tglSelesaiVal = $filter('date')($scope.tglSelesaiTunda, 'yyyy-MM-dd');
					// var jamSelesaiVal = document.getElementById("jamSelesaiTundaVal").value;
					// $scope.jasatunda.tglSelesai = tglSelesaiVal + 'T' + jamSelesaiVal;

					if (typeof $scope.jasatunda.lokasiAsal === 'object') {
						$scope.jasatunda.kodeLokasiAsal = $scope.jasatunda.lokasiAsal.mdmgKode;
						$scope.jasatunda.namaLokasiAsal = $scope.jasatunda.lokasiAsal.mdmgNama;
					}

					if (typeof $scope.jasatunda.lokasiTujuan === 'object') {
						$scope.jasatunda.kodeLokasiTujuan = $scope.jasatunda.lokasiTujuan.mdmgKode;
						$scope.jasatunda.namaLokasiTujuan = $scope.jasatunda.lokasiTujuan.mdmgNama;
					}

					if($routeParams.id){
						/* validasi dermaga pandu :*/
						var validationDermaga = $scope.validationAsalTujuanLokasiTunda($scope.jasatunda);
						if(!validationDermaga) return false;

						/* validasi Tgl Tunda :*/
						var validationTglTunda = $scope.validationTglTunda($scope.jasatunda);
						if(!validationTglTunda) return false;
					}

					PermohonanTundaEdit.update({
						id: $scope.jasatunda.noPpkJasa
					}, $scope.jasatunda, function(response) {
						$scope.setNotification  = {
							type	: "success",
							message	: "Jasa Tunda berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						BindEskalasi.setDefaultEskalasi();
						$scope.setCalculateEPB();
						$scope.jasatundagrid[$scope.indexTunda].namaLokasiAsal = response.namaLokasiAsal;
						$scope.jasatundagrid[$scope.indexTunda].tglMulai = response.tglMulai;
						$scope.jasatundagrid[$scope.indexTunda].tglSelesai = response.tglSelesai;
						$scope.jasatundagrid[$scope.indexTunda].namaLokasiAsal = response.namaLokasiAsal;
						$scope.jasatundagrid[$scope.indexTunda].namaLokasiTujuan = response.namaLokasiTujuan;
						$scope.jasatunda.noPpkJasa = undefined;
						//$scope.jasatunda.noForm = $scope.permohonan.noForm;
						$scope.jasatunda.lokasiAsal = '';
						$scope.jasatunda.lokasiTujuan = '';
						$scope.tglMulaiTunda = new Date();
						$scope.tglSelesaiTunda = new Date();
						document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
						//document.getElementById("jamSelesaiTundaVal").value = moment().format('HH:mm');
						$timeout(function() {
							$scope.alertShow = false;
						}, 5000);
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Tunda tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
					})
				}
			};

			$scope.resetTunda = function() {
				$scope.jasatunda = {};
				$scope.tglMulaiTunda = new Date();
				$scope.tglSelesaiTunda = new Date();
				document.getElementById("jamMulaiTundaVal").value = moment().format('HH:mm');
			};

			$scope.validationAsalTujuanLokasiTunda = function(jasaTunda){
				var match = true;
				var failedMessage;
				var jasaPanduGrid,jasaTambatGrid;
				var statusEskalasi = false;
				var itemEskalasi = {};

				/* set jasaPanduGrid */
				if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
					jasaPanduGrid = $scope.jasapandugridpast;
				}else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
					jasaPanduGrid = $scope.jasapandugrid;
				}else{
					jasaPanduGrid = $scope.jasapandugrid;
				}

				/* set jasaTambatGrid */
				if($scope.jasatambatgridpast.length>0 && $scope.jasatambatgrid.length===0){
					jasaTambatGrid = $scope.jasatambatgridpast;
				}else if($scope.jasatambatgridpast.length===0 && $scope.jasatambatgrid.length>0){
					jasaTambatGrid = $scope.jasatambatgrid;
				}else{
					jasaTambatGrid = $scope.jasatambatgrid;
				}

				if (typeof jasaTunda.lokasiAsal === 'object') {
					jasaTunda.kodeLokasiAsal = jasaTunda.lokasiAsal.mdmgKode;
					jasaTunda.namaLokasiAsal = jasaTunda.lokasiAsal.mdmgNama;
				}else{
					jasaTunda.kodeLokasiAsal = jasaTunda.kodeLokasiAsal;
					jasaTunda.namaLokasiAsal = jasaTunda.namaLokasiAsal;
				}

				if (typeof jasaTunda.lokasiTujuan === 'object') {
					jasaTunda.kodeLokasiTujuan = jasaTunda.lokasiTujuan.mdmgKode;
					jasaTunda.namaLokasiTujuan = jasaTunda.lokasiTujuan.mdmgNama;
				}else{
					jasaTunda.kodeLokasiTujuan = jasaTunda.kodeLokasiTujuan;
					jasaTunda.namaLokasiTujuan = jasaTunda.namaLokasiTujuan;
				}

				if(jasaPanduGrid.length>0){
					var itemPanduLokasiAsal,itemPanduLokasiTujuan;
					/*untuk sorting noPpkJasaTerbaru*/
					jasaPanduGrid.sort($scope.sortedNoPpkJasa);

					// for(var i=0;i<jasaPanduGrid.length;i++){
						itemPanduLokasiAsal = typeof jasaPanduGrid[0].lokasiAsal==='object'?jasaPanduGrid[0].lokasiAsal.mdmgKode:jasaPanduGrid[0].kodeLokasiAsal;
						itemPanduLokasiTujuan = typeof jasaPanduGrid[0].lokasiTujuan==='object'?jasaPanduGrid[0].lokasiTujuan.mdmgKode:jasaPanduGrid[0].kodeLokasiTujuan;

						if(itemPanduLokasiAsal!==jasaTunda.kodeLokasiAsal && itemPanduLokasiTujuan === jasaTunda.kodeLokasiTujuan){
							if(jasaPanduGrid[0].jenisGerakan == '1'){
								AturanGerakPanduList.get({
									kodeLokasi: jasaTunda.kodeLokasiAsal,
									flagAktif:1
								}, function(response) {
									if(response.content.length>0){
										match = false;
										failedMessage = "Asal Tunda tidak boleh dari "+jasaTunda.namaLokasiAsal+"<br><br>Kode validasi : <b>VALPMH-034</b>";
									}
								});
							}else if(jasaPanduGrid[0].jenisGerakan == '2'){
								match = false;
								failedMessage = "Lokasi Asal dan Lokasi Tujuan Tunda harus sama dengan Asal Tujuan Pandu<br><br>Kode validasi: <b>VALPMH-027</b>";
							}
						}else if(itemPanduLokasiAsal===jasaTunda.kodeLokasiAsal && itemPanduLokasiTujuan !== jasaTunda.kodeLokasiTujuan){
							if(jasaPanduGrid[0].jenisGerakan == '3'){
								AturanGerakPanduList.get({
									kodeLokasi: jasaTunda.kodeLokasiTujuan,
									flagAktif:1
								}, function(response) {
									if(response.content.length>0){
										match = false;
										failedMessage = "Tujuan Tunda tidak boleh dari "+jasaTunda.namaLokasiTujuan+"<br><br>Kode validasi : <b>VALPMH-035</b>";
									}
								});
							}else if(jasaPanduGrid[0].jenisGerakan == '2'){
								match = false;
								failedMessage = "Lokasi Asal dan Lokasi Tujuan Tunda harus sama dengan Asal Tujuan Pandu<br><br>Kode validasi: <b>VALPMH-027</b>";
							}
						}else if(itemPanduLokasiTujuan === jasaTunda.kodeLokasiTujuan){
								AturanGerakPanduList.get({
									kodeLokasi: jasaTunda.kodeLokasiTujuan,
									flagAktif:1
								}, function(response) {
									if(response.content.length>0){
										match = false;
										failedMessage = "Tujuan Tunda tidak boleh dari "+jasaTunda.namaLokasiTujuan+"<br><br>Kode validasi : <b>VALPMH-035</b>";
									}
								});
						}
					// }
				}

				if(match){
					if(jasaTambatGrid.length>0 && jasaTunda.lokasiTujuan){
					var itemTambat;
					jasaTambatGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/
						for(var i=0;i<jasaTambatGrid.length;i++){
							itemTambat = typeof jasaTambatGrid[0].lokasi==='object'?jasaTambatGrid[0].lokasi.mdmgKode:jasaTambatGrid[0].kodeLokasi;
							itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH028');
							var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH028');
							if(hasEsc){
								match = true;
							}else{
								if(itemTambat!==jasaTunda.lokasiTujuan.mdmgKode) {
									match = false;
									statusEskalasi = itemEskalasi.id!==undefined?true:false;
									failedMessage = "Lokasi Tujuan Tunda harus sama dengan Lokasi Tambat<br><br>Kode validasi: <b>VALPMH-028</b>";
								}
							}
						}
					}
				}

				if(!match){

					var note =  {
									type 	: "warning",
									message : failedMessage,
									hasEsc	: statusEskalasi,
									dataEsc : itemEskalasi
								};
					Notification.setNotification(note);
					$("#jasapanduLokasiTujuan").focus();
				}
				return match;
			}

			$scope.validationTglTunda = function(jasaTunda){
				var match = true;
				var jasaPanduGrid, failedMessage;
				var itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH036');
				var hasEsc = BindEskalasi.hasTempEskalasi('VALPMH036');
				var statusEskalasi = itemEskalasi.id!==undefined?true:false;
				var langsungSandar = KapalLangsungSandar.jasaLabuh($scope.jasalabuhgridpast,$scope.jasalabuhgrid);
				if(hasEsc){ /*cek eskalasi*/
					match = true;
				}else{
					/* set jasaPanduGrid */
					if($scope.jasapandugridpast.length>0 && $scope.jasapandugrid.length===0){
						jasaPanduGrid = $scope.jasapandugridpast;
					}else if($scope.jasapandugridpast.length===0 && $scope.jasapandugrid.length>0){
						jasaPanduGrid = $scope.jasapandugrid;
					}else{
						jasaPanduGrid = $scope.jasapandugrid;
					}

					var tglTunda,tglPandu;
					if(jasaPanduGrid.length>0){
						//jasaPanduGrid.sort($scope.sortedNoPpkJasa); /*untuk sorting noPpkJasaTerbaru*/

						tglTunda = Date.parse(jasaTunda.tglMulai);
						tglPandu = Date.parse(jasaPanduGrid[0].tglPandu);

						if(langsungSandar == false){
							if(jasaPanduGrid[0].jenisDermagaAsal != 'AREALABUH ' && jasaPanduGrid[0].jenisDermagaTujuan != 'AREALABUH'){
		                        if(tglTunda > tglPandu){
		                            var selisih = parseInt(tglTunda)-parseInt(tglPandu);
		                            if(selisih > 3600000){
		                                match = false;
		                                failedMessage = "Perbedaan antara Jam Pandu dan Jam Tunda tidak boleh lebih dari 1 jam.<br><br>Kode validasi : <b>VALPMH-036</b>"
									}
								}else{
		                            var selisih = parseInt(tglPandu)-parseInt(tglTunda);
		                            if(selisih > 3600000){
										match = false;
										failedMessage = "Perbedaan antara Jam Pandu dan Jam Tunda tidak boleh lebih dari 1 jam.<br><br>Kode validasi : <b>VALPMH-036</b>"
		                            }
		                        }
							}						
						}else{
							if(jasaPanduGrid[0].jenisGerakan == '2' || jasaPanduGrid[0].jenisGerakan == '3'){
								if(jasaPanduGrid[0].jenisDermagaAsal != 'AREALABUH ' && jasaPanduGrid[0].jenisDermagaTujuan != 'AREALABUH'){
			                        if(tglTunda > tglPandu){
			                            var selisih = parseInt(tglTunda)-parseInt(tglPandu);
			                            if(selisih > 3600000){
			                                match = false;
			                                failedMessage = "Perbedaan antara Jam Pandu dan Jam Tunda tidak boleh lebih dari 1 jam.<br><br>Kode validasi : <b>VALPMH-036</b>"
										}
									}else{
			                            var selisih = parseInt(tglPandu)-parseInt(tglTunda);
			                            if(selisih > 3600000){
											match = false;
											failedMessage = "Perbedaan antara Jam Pandu dan Jam Tunda tidak boleh lebih dari 1 jam.<br><br>Kode validasi : <b>VALPMH-036</b>"
			                            }
			                        }
								}
							}
						}

					}
					if(!match){
						var note =  {
										type 	: "warning",
										message : failedMessage,
										hasEsc	: statusEskalasi,
										dataEsc : itemEskalasi
									};
						Notification.setNotification(note);
						$("#jamMulaiTundaVal").focus();
					}
				}
				return match;
			}
/*=============================jasa air kapal===========================================*/
			//delete jasa air kapal
			$scope.deleteAirKapal = function(id, i) {
				var checkDeleteAir = confirm('Apakah Anda akan Menghapus data ini?');
				if (checkDeleteAir) {
					if(id == null){
						$scope.jasaairgrid.splice(i, 1);
						$scope.setNotification  = {
							type	: "success",
							message	: "Data berhasil dihapus"
						};
						Notification.setNotification($scope.setNotification);
						if($scope.jasaairgrid.length > 0){
							$scope.btnAirSave = false;
						}else{
							$scope.btnAirSave = true
						}
					}else{
						PermohonanAirKapalDelete.delete({
							id: id
						}, function(response) {
							$scope.jasaairgrid.splice(i, 1);
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil dihapus"
							};
							Notification.setNotification($scope.setNotification);
							$scope.setCalculateEPB();
							if($scope.jasaairgrid.length > 0){
								$scope.btnAirSave = false;
							}else{
								$scope.btnAirSave = true;
							}
						}, function() {
							$scope.setNotification  = {
								type		: "warning",
								message	: "Data tidak berhasil dihapus"
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
					$scope.jamIsi = $filter('date')(response.tglIsi, 'HH:mm');
					$scope.tglIsi = $scope.splitDate(response.tglIsi);
					$scope.jasaair.dermaga = response.namaDermaga;
				});
			};



			//submit air kapal
			$scope.submitAirKapal = function(jasaair) {
				if($routeParams.id){
					jasaair = $scope.jasaair;
				}

				if (jasaair.noPpkJasa === undefined) {
					jasaair.detailPmhId = $scope.permohonan.details[0].id;
					jasaair.urutanPermohonan = $scope.permohonan.details[0].urutanPermohonan;
					jasaair.noPpk1 = $scope.permohonan.noPpk1;

					//concat jam dan waktu mulai
					if(jasaair.tglIsi === undefined){
						var tglIsiVal = $filter('date')($scope.tglIsi, 'yyyy-MM-dd');
						var jamIsiVal = document.getElementById("jamIsiVal").value;
						jasaair.tglIsi = tglIsiVal + 'T' + jamIsiVal;
					}

					//$scope.jasaair.alatIsi = $scope.jasaair.alatIsi;
					jasaair.volume = parseInt(jasaair.volume);

					if (typeof jasaair.dermaga === 'object') {
						jasaair.kodeDermaga = jasaair.dermaga.mdmgKode;
						jasaair.namaDermaga = jasaair.dermaga.mdmgNama;
						jasaair.jenisDermaga = jasaair.dermaga.mdmgJenisDmg;
					}else{
						jasaair.namaDermaga = jasaair.dermaga;
						jasaair.kodeDermaga = jasaair.kodeDermaga;
					}

					if($routeParams.id){
						/*if ($scope.permohonan.jenisKapal !== 'KPLTUNDA' || $scope.permohonan.jenisKapal !== 'TB') {
							var validationAirKapal = $scope.validasiAirKapal(jasaair);
							if(!validationAirKapal)	return false;
						}*/

						var R1 = validationForm.required('Nama Dermaga', jasaair.namaDermaga);
						if(!R1){return R1;}
						var R2 = validationForm.required('Tanggal Isi', tglIsiVal);
						if(!R2){return R2;}
						var R3 = validationForm.required('Jam Isi', jamIsiVal);
						if(!R3){return R3;}
						var R4 = validationForm.required('Volume', jasaair.volume);
						if(!R4){return R4;}
						var R5 = validationForm.required('Satuan', jasaair.satuan);
						if(!R5){return R5;}
					}

					PermohonanAirKapal.save(jasaair, function(response) {
						$scope.setNotification  = {
							type	: "success",
							message	: "Jasa Air Kapal berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						AppParamValue.get({nama:'ALAT_ISI_AIR', value:response.alatIsi}, {}, function(value){
							response.alatIsiText = value[0].caption;
						});
						if($routeParams.id){
							response.fake = false;
							$scope.tempair.push(response);
							$scope.jasaairgrid = $scope.tempair;
							$scope.setCalculateEPB();
						}

						$scope.jasaair.noPpkJasa = undefined;
						$scope.jasaair.dermaga = '';
						$scope.jasaair.alatIsi = '';
						$scope.jasaair.volume = '';
						$scope.jasaair.satuan = '';
						$scope.tglIsi = new Date();
						document.getElementById("jamIsiVal").value = moment().format('HH:mm');
						//$scope.jamIsi = $filter('date')($scope.tglIsi, 'HH:mm');
						$scope.jamIsi = moment().format('HH:mm');
						$scope. btnAirSave = false;
					}, function() {
						$scope.setNotification  = {
							type	: "warning",
							message	: "Jasa Air Kapal tidak berhasil tersimpan."+response.description
						};
						Notification.setNotification($scope.setNotification);
					});
				} else {
					//concat jam dan waktu mulai
					var tglIsiVal = $filter('date')($scope.tglIsi, 'yyyy-MM-dd');
					var jamIsiVal = document.getElementById("jamIsiVal").value;
					$scope.jasaair.tglIsi = tglIsiVal + 'T' + jamIsiVal;

					$scope.jasaair.alatIsi = parseInt($scope.jasaair.alatIsi);
					$scope.jasaair.volume = parseInt($scope.jasaair.volume);

					if (typeof $scope.jasaair.dermaga === 'object') {
						$scope.jasaair.kodeDermaga = $scope.jasaair.dermaga.mdmgKode;
						$scope.jasaair.namaDermaga = $scope.jasaair.dermaga.mdmgNama;
					}

					PermohonanAirKapalEdit.update({
						id: $scope.jasaair.noPpkJasa
					}, $scope.jasaair, function(response) {
						$scope.setNotification  = {
							type	: "success",
							message	: "Data berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						$scope.setCalculateEPB();

						AppParamValue.get({nama:'ALAT_ISI_AIR', value:response.alatIsi}, {}, function(value){
							$scope.jasaairgrid[$scope.indexAirKapal].alatIsiText = value[0].caption;
						});
						$scope.jasaairgrid[$scope.indexAirKapal].namaDermaga = response.namaDermaga;
						$scope.jasaairgrid[$scope.indexAirKapal].tglIsi = response.tglIsi;
						$scope.jasaairgrid[$scope.indexAirKapal].volume = response.volume
						$scope.jasaair.noPpkJasa = undefined;
						//$scope.jasaair.noForm = $scope.permohonan.noForm;
						$scope.jasaair.dermaga = '';
						$scope.jasaair.alatIsi = '';
						$scope.jasaair.volume = '';
						$scope.jasaair.satuan = '';
						$scope.tglIsi = new Date();
						document.getElementById("jamIsiVal").value = moment().format('HH:mm');
						$scope.jamIsi = moment().format('HH:mm');
						$scope.btnAirSave = false;
					}, function() {
						$scope.setNotification  = {
							type	: "danger",
							message	: "Jasa Air Kapal tidak berhasil tersimpan."+response.description
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
				if($scope.jasaairgrid.length > 0){
					$scope.btnAirSave = false;
				}
			};
/*=============================tambah jasa================================================*/

			$scope.submitJasaBaru = function(){
				PermohonanMultiDetail.save({noPpk1 : $scope.permohonan.noPpk1}, {}, function(response){
					//$scope.newJasaSaved = true;
					document.getElementById("labuhTab").style.display = "block";
					document.getElementById("tambatTab").style.display = "block";
					document.getElementById("panduTab").style.display = "block";
					document.getElementById("tundaTab").style.display = "block";
					document.getElementById("airkapalTab").style.display = "none";
					UserRole.checkJasa();
					$scope.permohonan.details[0].id = response.id;
					$scope.permohonan.details[0].urutanPermohonan = response.urutanPermohonan;
					$scope.$watch('permohonan',function(){
						$scope.submitPerJasa();
					});
				});
			}
/*=================================== Putus Agen ===========================================*/
			$scope.submitPutusAgen = function(){
				PermohonanSetDone.update({ppk1:$routeParams.ppk1PutusAgen}, {},function(response){});
			};
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
					limit: '50'
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
					limit: '50'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
		                response.mkplNamaPlbTjn = response.mplbNama +' ('+response.mplbKode+')';
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

	$scope.splitDate = function(date){
		var splitDate = date.split('T');
		return new Date(splitDate[0]);
	}

	/*validation form */
	$scope.validateForm = function(formObj) {
		formObj.submitButton.disabled = true;
	    formObj.submitButton.value = 'Please Wait...';
	   	return true;
	}

	/*function for sorted by new noPpkJasa*/
	$scope.sortedNoPpkJasa = function(a,b) {

		if (a.noPpkJasa > b.noPpkJasa){
			return -1;
		}
		if (a.noPpkJasa < b.noPpkJasa){
			return 1;
		}
		return 1;
	}

	$scope.setCalculateEPB = function() { /*untuk perhitungan permohonan baru dan tambah jasa*/
		if($routeParams.id && $routeParams.urutan){
			var dataDetail = $scope.permohonan.details[0];
			var lengthUrutan = dataDetail.urutanPermohonan.toString().length;
			dataDetail.ppkVar = lengthUrutan===1?dataDetail.noPpk1+0+dataDetail.urutanPermohonan:dataDetail.noPpk1+dataDetail.urutanPermohonan;
			PermohonanGetEPB.get({
				noPpk1 : dataDetail.noPpk1,
				ppkVar : dataDetail.ppkVar
			},function(response){
				// if(response[0].id){ /*jika data sudah ada, maka kalkulasi ulang*/
				if($routeParams.id){
					$scope.reCalculateEPB();
				} else { /*jika data tidak ada, maka hitung kalkulasi*/
					$scope.calculateEPB();
				}
			});
		}else{
			$scope.calculateEPB();
		}
	}

	$scope.calculateEPB = function() { /*untuk perhitungan permohonan baru dan tambah jasa*/
		PermohonanCalculateEPB.save({
			noPpk1			 : $scope.permohonan.noPpk1,
			urutanPermohonan : $scope.permohonan.details[0].urutanPermohonan
		},{},function(response){});
	}

	$scope.reCalculateEPB = function() { /*untuk perhitungan permohonan edit*/
		PermohonanRecalculateEPB.update({
			noPpk1			 : $routeParams.id,
			urutanPermohonan : $routeParams.urutan
		},{},function(response){});
	}

	$scope.getDataEPB = function(dataDetail){
		var lengthUrutan = dataDetail.urutanPermohonan.toString().length;
		dataDetail.ppkVar = lengthUrutan===1?dataDetail.noPpk1+0+dataDetail.urutanPermohonan:dataDetail.noPpk1+dataDetail.urutanPermohonan;
		return PermohonanGetEPB.get({
			noPpk1 : dataDetail.noPpk1,
			ppkVar : dataDetail.ppkVar
		},function(response){});
	}

	$scope.showModalValidationVAL041 = function(dataDetail){
		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALPMH041'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALPMH041'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			dataItem : dataDetail,
			showNotif : "hide"
		};
		Notification.setNotification(note);
		$('#modalValidationVAL041').modal('show');
	}

	$scope.checkValidasiBackDate = function(){
		setDisableDateLabuh();
		setDisableDateTambat();
		setDisableDatePandu();
		setDisableDateTunda();
		setDisableDateAirKapal();
	}

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
// akhir
}])
