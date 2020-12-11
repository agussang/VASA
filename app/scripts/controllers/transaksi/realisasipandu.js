'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiRealisasiPanduCtrl
 * @description
 * # TransaksiRealisasiPanduCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiRealisasiPanduCtrl', ['$scope','$filter','$routeParams','$rootScope','$controller','AppParam','AppParamValue','RealisasiPandu','RealisasiPanduDetailbyPpkJasa','RealisasiPanduEdit','Notification','AturanGerakPanduList','HistoryRevisiPandu','JenisRevisiRealisasiPandu','StatusRealisasiPandu','PenetapanDetail','PermohonanDetail','JasaTunda','JasaPandu','PermohonanMultiDetail','PermohonanPandu','PenetapanPandu','ModeRealisasi','JenisRevisiRealisasiTunda','StatusRealisasiTunda','Validations','Databinding','validationForm','ParameterSiklus','BindEskalasi','UpdateStatusReaAfterEskalasi','SearchKapalGandeng','DeleteKapalGandeng','AddKapalGandeng','MdmKapalSearchByName','PermohonanByKodeKapal','SearchPpk1WithCabang','BatalTanpaLayanan','$timeout','$window',
 	function ($scope,$filter,$routeParams,$rootScope,$controller,AppParam,AppParamValue,RealisasiPandu,RealisasiPanduDetailbyPpkJasa,RealisasiPanduEdit,Notification,AturanGerakPanduList,HistoryRevisiPandu,JenisRevisiRealisasiPandu,StatusRealisasiPandu,PenetapanDetail,PermohonanDetail,JasaTunda,JasaPandu,
 		PermohonanMultiDetail,PermohonanPandu,PenetapanPandu,ModeRealisasi,JenisRevisiRealisasiTunda,StatusRealisasiTunda,Validations,Databinding,validationForm,ParameterSiklus,BindEskalasi,UpdateStatusReaAfterEskalasi,SearchKapalGandeng,DeleteKapalGandeng,AddKapalGandeng,MdmKapalSearchByName,PermohonanByKodeKapal,SearchPpk1WithCabang,BatalTanpaLayanan,$timeout,$window) {
	/*
	** tab labuh
	*/
	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
	//alert ('Cek tab jasa labuh controller');
	/* waktu tunda,lokasi asal tunda,  */
	angular.extend(this, $controller('RealisasiPermohonanCtrl', {$scope: $scope}));	
	$scope.cekDataLabuh();	
	$rootScope.tab2p1r = false;
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};
	$scope.tempSelection = null;
	$scope.rightSelection = {};
	$scope.itemSelected = [];
	$scope.avoidClick = false;
	$scope.rightReadOnly = true;
	$scope.realisasipandu = {};
	$scope.lokasiAsalGerakPandu = false;
 	$scope.lokasiTujuanGerakPandu = false;
 	$scope.rightSelection.namaLokasiAsal  = "";
 	$scope.rightSelection.namaLokasiTujuan = "";
 	$scope.rightSelection.flagApbs = '0';
 	$scope.aturanGerakByLokasiAsal = {};
 	$scope.aturanGerakByLokasiTujuan = {};
 	$scope.realisasipandu.jenisKep = 'normal';
 	$scope.rightSelection.statusSiklusPandu = '1';
	$scope.realisasipandu.jamNaik = $filter('date')(new Date(), 'HH:mm');
	$scope.realisasipandu.jamTurun = $filter('date')(new Date(), 'HH:mm');
	$scope.realisasipandu.jamKapalGerak = $filter('date')(new Date(), 'HH:mm');
 	var mainPpkJasa = '';
 	$scope.modeRealisasi = '1';
 	var tmpmoderea = [];
 	var tempAllDataTunda = [];
 	var tempDatapandu = [];
 	var fakeSelect = {};
 	$scope.modeSiklusVal = '';
 	$scope.dataParameter = [];
 	$scope.kapalGandengArray = [];
 	var jenisKapal;
 	$scope.gandengBtn = true;
 	$scope.gandengBtnTambah = true;
 	var checkunique = [];
 	$scope.kapalGandengUpdateArray = [];

 	BindEskalasi.setDefaultEskalasi();
 	$scope.$watch(function () {
    	return JasaPandu.getJasaPandu();
    },function(newVal, oldVal) {
    	var value = JasaPandu.getJasaPandu();
    	if(value.bindData){
    		$scope.panduItems = value.content;
    		$scope.panduItems.bindData = value.bindData;
    		getPanduItems();
    	}    	
    }, true);

  	var historyPandu = function(ppkJasa){
		HistoryRevisiPandu.get({noPpkJasa:ppkJasa}, function(response){ 
			if(response.length > 0){				//$scope.tempSelection = response[0];
				$scope.tempSelection.noPpkJasa = mainPpkJasa;
				$scope.tempSelection.jamMulai = $filter('date')(response[0].tglMulai, 'HH:mm');
				$scope.tempSelection.tglMulai = $filter('date')(response[0].tglMulai, 'dd-MM-yyyy');
				//var jamMulai = (moment.utc(response[0].tglMulai).format()).split("T")[1].split("Z");
				//$scope.tempSelection.jamMulai = jamMulai[0];				
			}
		});
		$scope.$watch(function(){return localStorage.getItem('kapaltunda');}, function(newVal,oldVal){
			if(newVal == 'true'){ 
				$scope.gandengBtn = false; 
				SearchKapalGandeng.get({noPpk1 : $scope.dataUmum.noPpk1, noPpkJasa : ppkJasa},function(response){
					if (response.totalElements > 0) {
						$scope.kapalGandengArray = 	response.content;
					}else{
						$scope.kapalGandengArray = [];
					}
				});					
			}else{
				$scope.gandengBtn = true; 
			}
		});
	};

	var setDefaultForm = function(){
		//$scope.realisasipandu.namaPandu = "";
		$scope.realisasipandu.kapalPandu = "";
		$scope.realisasipandu.jenisKep = 'normal';
		//$scope.rightSelection.statusSiklusPandu = '1';
		$scope.realisasipandu.keteranganKep = "";
		//$scope.realisasipandu.tglSelesai = $filter('date')(new Date(), 'dd-MM-yyyy');
		$scope.realisasipandu.tglSelesai = $filter('date')(new Date(), 'dd-MM-yyyy');
		// $scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
		$scope.realisasipandu.jamSelesai = $filter('date')(new Date(), 'HH:mm');
		$scope.realisasipandu.jamNaik = $filter('date')(new Date(), 'HH:mm');
		$scope.realisasipandu.jamTurun = $filter('date')(new Date(), 'HH:mm');
		$scope.realisasipandu.jamKapalGerak = $filter('date')(new Date(), 'HH:mm');
		$scope.kapalGandengArray = [];
		$scope.kapalGandengUpdateArray = [];
		$scope.setDefaultTglPandu();
	}

	var originItems = $scope.panduItems;
	var getPanduItems = function (item, e) {
		if($scope.panduItems.length >0){
			if($scope.modeRealisasi != '3' ){
				if(!$scope.panduItems.bindData){
					$scope.panduItems = originItems;
				}else{
					$scope.config.selectedItems = [];
				}				
			}
			$scope.items = $filter('orderBy')(JSON.parse(JSON.stringify($scope.panduItems)), 'noPpkJasa');

			for (var i = 0; i < $scope.panduItems.length; i++) {
				var itemPpkJasa = $scope.panduItems[i].noPpkJasa;
				RealisasiPanduDetailbyPpkJasa.get({
					noPpkJasa: itemPpkJasa
				}, 
				function(response) {
					var item = JSON.parse(JSON.stringify(response));
					if(response.id){
				 		$scope.itemSelected.push(item);
					}
				});
			}
			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];
			mainPpkJasa = $scope.tempSelection.noPpkJasa;	
			//$scope.tempSelection.jamPandu = $filter('date')($scope.tempSelection.tglBuat, 'HH:mm');
			//$scope.tempSelection.tglPandu = new Date($scope.tempSelection.tglBuat);
			$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
			$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
			//$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
			//$scope.tempSelection.tglSelesai = new Date($scope.tempSelection.tglSelesai);
			$scope.tempSelection.jamNaik = $filter('date')($scope.tempSelection.jamNaik, 'HH:mm');
			$scope.tempSelection.jamTurun = $filter('date')($scope.tempSelection.jamTurun, 'HH:mm');
			$scope.tempSelection.jamKapalGerak = $filter('date')($scope.tempSelection.jamKapalGerak, 'HH:mm');
			AppParamValue.get({nama:'JENIS_PANDU',value:$scope.tempSelection.jenisPandu},function(response){
				$scope.tempSelection.jenisPanduText = response[0].caption;
			});
			AppParamValue.get({nama:'JENIS_GERAKAN',value:$scope.tempSelection.jenisGerakan},function(response){
				$scope.tempSelection.jenisGerakanText = response[0].caption;
			});
			
			$scope.$watch(function(){return localStorage.getItem('kapaltunda');}, function(newVal,oldVal){
				if(newVal == 'true'){ 
					$scope.gandengBtn = false; 
					SearchKapalGandeng.get({noPpk1 : $scope.dataUmum.noPpk1, noPpkJasa : $scope.tempSelection.noPpkJasa},function(response){
						if (response.totalElements > 0) {
							$scope.kapalGandengArray = 	response.content;
						}
					});					
				}else{
					$scope.gandengBtn = true; 
				}
			});			

			historyPandu($scope.tempSelection.noPpkJasa);
			tmpmoderea.push($scope.tempSelection);
			// default time and date
			$scope.rightSelection.statusSiklusPandu = '1';
			//$scope.realisasipandu.namaPandu = "";
			$scope.realisasipandu.kapalPandu = "";
			$scope.realisasipandu.jenisKep = 'normal';
			$scope.realisasipandu.tglMulai = new Date();
			$scope.realisasipandu.tglSelesai = new Date();
			$scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
			$scope.realisasipandu.jamSelesai = $filter('date')(new Date(), 'HH:mm');
			$scope.realisasipandu.jamNaik = $filter('date')(new Date(),'HH:mm');
			$scope.realisasipandu.jamTurun = $filter('date')(new Date(),'HH:mm');
			$scope.realisasipandu.jamKapalGerak = $filter('date')(new Date(),'HH:mm');
		}
	};

	$scope.$watch('dataUmum', function(newVal, oldVal){
		getPanduItems();		
	});

	$scope.setDefaultTglPandu = function(){
		var date = $filter('date')($scope.realisasipandu.tglMulai, 'dd-MM-yyyy');
		var parts = date.split("-");
		var tglMulaiPandu = parts[2]+'-'+parts[1]+'-'+parts[0];
		var jamMulaiPandu = $scope.realisasipandu.jamMulai;
		var tglJamMulaiPandu = new Date(tglMulaiPandu + ' ' + jamMulaiPandu);
		var plusMinutes = tglJamMulaiPandu.setMinutes(tglJamMulaiPandu.getMinutes() + 5);
		var plusHours = tglJamMulaiPandu.setHours(tglJamMulaiPandu.getHours() + 1);
		var timePlusMinutes = $filter('date')(plusMinutes, 'HH:mm');
		var timePlusHours = $filter('date')(plusHours, 'HH:mm');

		// if(isEdit===undefined || isEdit===''){
			$scope.realisasipandu.jamNaik = timePlusMinutes;
			$scope.realisasipandu.jamKapalGerak = timePlusMinutes;
			$scope.realisasipandu.jamSelesai = timePlusHours;
			$scope.realisasipandu.jamTurun = timePlusHours;
		// }

		/*untuk kebutuhan validasi tidak boleh lebih dari 2 jam, dengan memberikan jam start*/
		$scope.realisasipandu.jamMulaiBefore = $scope.realisasipandu.jamMulai;
		$scope.realisasipandu.jamNaikBefore = timePlusMinutes;
		$scope.realisasipandu.jamKapalGerakBefore = timePlusMinutes;
		$scope.realisasipandu.jamSelesaiBefore = timePlusHours;
		$scope.realisasipandu.jamTurunBefore = timePlusHours;
	}

	$scope.changeJamPanduTurun = function(){
		$scope.realisasipandu.jamTurun = $filter('date')($scope.realisasipandu.jamSelesai, 'HH:mm');
	}

	$scope.$watch('realisasipandu.tglMulai', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	$scope.$watch('realisasipandu.tglSelesai', function(){
		setTimeout(function(){
			setDisableDate();
 		}, 500);
	});

	var setDisableDate = function(){
		var tglMulai = document.getElementById('tglMulaiPandu').querySelector('input').value;
		var setTglMulai = $('#tglMulaiPandu').datepicker('getDate','+1d');
		if(setTglMulai)setTglMulai.setDate(setTglMulai.getDate() + 1);
		var tglMulaiPlus1Day = $filter('date')(setTglMulai,'dd-MM-yyyy');

		// var tglSelesai = document.getElementById('tglMulaiIsiAirKapal').querySelector('input').value;
		// $scope.realisasipandu.tglSelesai = $filter('date')(tglSelesai,'dd-MM-yyyy');

		$('#tglMulaiPandu').datepicker('update');
	 	$('#tglSelesaiPandu').datepicker('setStartDate',tglMulai);
	 	$('#tglSelesaiPandu').datepicker('setEndDate',tglMulaiPlus1Day);
		$('#tglMulaiPandu').mask('99-99-9999');
		$('#tglSelesaiPandu').mask('99-99-9999');
	}

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
/*===============mode siklus==================================*/
	$scope.defaultSiklus = '';
	$scope.$watch('rightSelection.statusSiklusPandu',function(newVal,oldVal){
		$scope.defaultSiklus = oldVal;
	});

	$scope.modeSiklus = function(value){
		if(value == undefined){
			value = $scope.rightSelection.statusSiklusPandu;
		}
		AppParamValue.get({nama:'STATUS_SIKLUS_PANDU',value:value},function(response){
			$scope.modeSiklusVal = response[0].caption;
		});	
		for (var i = 0; i < ParameterSiklus.length; i++) {
			if(ParameterSiklus[i].id == value){
				$scope.dataParameter = ParameterSiklus[i];
				break;
			}
		}

		if(value == 2){
			$('#confirmbox2').modal('show');
		}		
	}

	$scope.batalSiklus = function(){
		$('#confirmbox2').modal('hide');
		$scope.rightSelection.statusSiklusPandu = $scope.defaultSiklus;		
	}

	$scope.modeSiklus();

	$scope.$watch('modeSiklusVal', function(newVal, oldVal){
		if(newVal != oldVal){
			$scope.modeSiklusVal = newVal;
		}else{
			$scope.modeSiklusVal = oldVal;
		}	
	})

	$scope.confirmRekomendasi = function(){
		$('#siklusPanduModal').modal('hide');
		$('#statusSiklusPandu').focus();
		$scope.rightSelection.statusSiklusPandu = $scope.rightSelection.siklusChosen;
		$('html,body').scrollTop(0);
	}

	$scope.confirmLevel =  function(){
		$scope.dataLevel();		
	}
/*=========mode realisasi===============================*/
 	$scope.$watch('modeRealisasi', function(){
 		tmpmoderea = [];
 		$scope.config.selectedItems = [];
		if($scope.modeRealisasi == '3'){
			getalldataPandu();
			$scope.config.multiSelect = true;
		}else if($scope.modeRealisasi == '2'){
			getalldataPandu();
			$scope.config.multiSelect = false;
		}else{
			getdatarea();
			$scope.config.multiSelect = false;
		}
	})
/*==============================================*/

	var handleSelect = function (item, e) {
		/* mode realisasi */
		if($scope.modeRealisasi == '3'){
			$scope.config.multiSelect = true;
			if(tmpmoderea.length === 2){
				tmpmoderea = [];
				$scope.config.selectedItems = [];			
				tmpmoderea.push(item);
				$scope.config.selectedItems.push(item);
			}else{
				tmpmoderea.push(item);
			}
		}
		/*-------------------------*/

		mainPpkJasa = item.noPpkJasa;
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
 		$scope.tempSelection.jamPandu = $filter('date')($scope.tempSelection.tglBuat, 'HH:mm');
		$scope.tempSelection.tglPandu = new Date($scope.tempSelection.tglBuat);
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.tglMulai = new Date($scope.tempSelection.tglMulai);
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
		$scope.tempSelection.tglSelesai = new Date($scope.tempSelection.tglSelesai);
		AppParamValue.get({nama:'JENIS_PANDU',value:item.jenisPandu},function(response){
			$scope.tempSelection.jenisPanduText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_GERAKAN',value:item.jenisGerakan},function(response){
			$scope.tempSelection.jenisGerakanText = response[0].caption;
		});
		
		historyPandu($scope.tempSelection.noPpkJasa);
	};


	$scope.getRealisasiPanduDetailbyPpkJasa = function(item){
		RealisasiPanduDetailbyPpkJasa.get({noPpkJasa: item.noPpkJasa}, function(response) {
			if(response.status!=='404'){
				/* validasi jika data sudah di verifikasi, maka data tidak bisa di edit*/
				if(Validations.checkStatusIsVerified(response)){
					$scope.rightReadOnly = true;
					return false;
				}else{
					// $scope.rightReadOnly = false;
					$scope.rightSelection = response;
					AppParamValue.get({nama:'JENIS_PANDU',value:$scope.rightSelection.jenisPandu},function(response){
						$scope.rightSelection.jenisPanduText = response[0].caption;
					});
					AppParamValue.get({nama:'JENIS_GERAKAN',value:$scope.rightSelection.jenisGerakan},function(response){
						$scope.rightSelection.jenisGerakanText = response[0].caption;
					});
					if($scope.rightSelection.statusSiklusPandu!==undefined){
						AppParamValue.get({nama:'STATUS_SIKLUS_PANDU',value:$scope.rightSelection.statusSiklusPandu},function(response){
							$scope.rightSelection.statusSiklusPanduText = response[0].caption;
							$scope.modeSiklusVal = $scope.rightSelection.statusSiklusPanduText;
						});
					}
					AppParamValue.get({nama:'JENIS_KEPENTINGAN',value:$scope.rightSelection.jenisKep},function(response){
						$scope.realisasipandu.jenisKepText = response[0].caption;
					});
					// $scope.realisasipandu.namaPandu = $scope.rightSelection.namaPandu;
					$scope.rightSelection.namaPandu = $scope.rightSelection.nipPandu? $scope.rightSelection.namaPandu:'';

					$scope.realisasipandu.kapalPandu = $scope.rightSelection.kapalPandu;
					$scope.realisasipandu.jenisKep = $scope.rightSelection.jenisKep;
					$scope.realisasipandu.keteranganKep = $scope.rightSelection.keteranganKep;
					$scope.realisasipandu.statusSiklusPandu = $scope.rightSelection.statusSiklusPandu;

					$scope.realisasipandu.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
					$scope.realisasipandu.jamSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'HH:mm');
					
					//$scope.realisasipandu.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'dd-MM-yyyy');
					//$scope.realisasipandu.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'dd-MM-yyyy');
					document.getElementById('tglMulaiPandu').querySelector('input').value = $filter('date')($scope.rightSelection.tglMulai,'dd-MM-yyyy');
					document.getElementById('tglSelesaiPandu').querySelector('input').value = $filter('date')($scope.rightSelection.tglSelesai,'dd-MM-yyyy');
					$scope.realisasipandu.jamNaik = $filter('date')($scope.rightSelection.jamNaik, 'HH:mm');
					$scope.realisasipandu.jamTurun = $filter('date')($scope.rightSelection.jamTurun, 'HH:mm');
					$scope.realisasipandu.jamKapalGerak = $filter('date')($scope.rightSelection.jamKapalGerak, 'HH:mm');

					$scope.rightSelection.lokasiAsal = {mdmgNama:$scope.rightSelection.namaLokasiAsal, mdmgKode:$scope.rightSelection.kodeLokasiAsal};
					$scope.rightSelection.lokasiTujuan = {mdmgNama:$scope.rightSelection.namaLokasiTujuan, mdmgKode:$scope.rightSelection.kodeLokasiTujuan};				
					// $scope.setDefaultTglPandu(true);
				}

				AppParamValue.get({nama:'JENIS_KEPENTINGAN',value:$scope.rightSelection.jenisKep},function(response){
					$scope.realisasipandu.jenisKepText = response[0].caption;
				});
				//$scope.realisasipandu.namaPandu = $scope.rightSelection.namaPandu;
				$scope.realisasipandu.kapalPandu = $scope.rightSelection.kapalPandu;
				$scope.realisasipandu.jenisKep = $scope.rightSelection.jenisKep;
				$scope.realisasipandu.kendalaOperasional = $scope.rightSelection.kendalaOperasional;
				$scope.realisasipandu.keteranganKep = $scope.rightSelection.keteranganKep;
				$scope.realisasipandu.statusSiklusPandu = $scope.rightSelection.statusSiklusPandu;

				$scope.realisasipandu.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
				$scope.realisasipandu.jamSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'HH:mm');
				
				//$scope.realisasipandu.tglMulai = $filter('date')($scope.rightSelection.tglMulai,'dd-MM-yyyy');
				//$scope.realisasipandu.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai,'dd-MM-yyyy');
				document.getElementById('tglMulaiPandu').querySelector('input').value = $filter('date')($scope.rightSelection.tglMulai,'dd-MM-yyyy');
				document.getElementById('tglSelesaiPandu').querySelector('input').value = $filter('date')($scope.rightSelection.tglSelesai,'dd-MM-yyyy');
				$scope.realisasipandu.jamNaik = $filter('date')($scope.rightSelection.jamNaik, 'HH:mm');
				$scope.realisasipandu.jamTurun = $filter('date')($scope.rightSelection.jamTurun, 'HH:mm');
				$scope.realisasipandu.jamKapalGerak = $filter('date')($scope.rightSelection.jamKapalGerak, 'HH:mm');

				$scope.rightSelection.lokasiAsal = {mdmgNama:$scope.rightSelection.namaLokasiAsal, mdmgKode:$scope.rightSelection.kodeLokasiAsal};
				$scope.rightSelection.lokasiTujuan = {mdmgNama:$scope.rightSelection.namaLokasiTujuan, mdmgKode:$scope.rightSelection.kodeLokasiTujuan};				
				// $scope.setDefaultTglPandu(true);
			}else{
				var getDataPtp = matchDataSelected(item);
				HistoryRevisiPandu.get({noPpkJasa:getDataPtp.noPpkJasa}, function(response){
					if(response.length > 0){
						$scope.rightSelection = response[0];
						$scope.rightSelection.noPpkJasa = getDataPtp.noPpkJasa;
						AppParamValue.get({nama:'JENIS_PANDU',value:$scope.rightSelection.jenisPandu},function(response){
							$scope.rightSelection.jenisPanduText = response[0].caption;
						});
						AppParamValue.get({nama:'JENIS_GERAKAN',value:$scope.rightSelection.jenisGerakan},function(response){
							$scope.rightSelection.jenisGerakanText = response[0].caption;
						});
						if($scope.rightSelection.statusSiklusPandu!==undefined){
							AppParamValue.get({nama:'STATUS_SIKLUS_PANDU',value:$scope.rightSelection.statusSiklusPandu},function(response){
								$scope.rightSelection.statusSiklusPanduText = response[0].caption;
							});
						}
						AppParamValue.get({nama:'JENIS_KEPENTINGAN',value:$scope.rightSelection.jenisKep},function(response){
							$scope.realisasipandu.jenisKepText = response[0].caption;
						});
						$scope.realisasipandu.tglMulai = new Date($scope.rightSelection.tglMulai);
						$scope.realisasipandu.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
						setDefaultForm();

						$scope.rightSelection.lokasiAsal = {mdmgNama:$scope.rightSelection.namaLokasiAsal, mdmgKode:$scope.rightSelection.kodeLokasiAsal};
						$scope.rightSelection.lokasiTujuan = {mdmgNama:$scope.rightSelection.namaLokasiTujuan, mdmgKode:$scope.rightSelection.kodeLokasiTujuan};
					}else{
						$scope.rightSelection = getDataPtp;
						AppParamValue.get({nama:'JENIS_PANDU',value:$scope.rightSelection.jenisPandu},function(response){
							$scope.rightSelection.jenisPanduText = response[0].caption;
						});
						AppParamValue.get({nama:'JENIS_GERAKAN',value:$scope.rightSelection.jenisGerakan},function(response){
							$scope.rightSelection.jenisGerakanText = response[0].caption;
						});
						if($scope.rightSelection.statusSiklusPandu!==undefined){
							AppParamValue.get({nama:'STATUS_SIKLUS_PANDU',value:$scope.rightSelection.statusSiklusPandu},function(response){
								$scope.rightSelection.statusSiklusPanduText = response[0].caption;
							});
						}
						AppParamValue.get({nama:'JENIS_KEPENTINGAN',value:$scope.rightSelection.jenisKep},function(response){
							$scope.realisasipandu.jenisKepText = response[0].caption;
						});
						$scope.realisasipandu.tglMulai = new Date($scope.rightSelection.tglMulai);
						$scope.realisasipandu.jamMulai = $filter('date')($scope.rightSelection.tglMulai, 'HH:mm');
						setDefaultForm();

						$scope.rightSelection.lokasiAsal = {mdmgNama:$scope.rightSelection.namaLokasiAsal, mdmgKode:$scope.rightSelection.kodeLokasiAsal};
						$scope.rightSelection.lokasiTujuan = {mdmgNama:$scope.rightSelection.namaLokasiTujuan, mdmgKode:$scope.rightSelection.kodeLokasiTujuan};				
					}
				})
				if(fakeSelect.flagFake == true && tempDatapandu.length != 0){
					$scope.rightSelection.lokasiAsal = {mdmgNama:tempDatapandu.namaLokasiTujuan, mdmgKode:tempDatapandu.kodeLokasiTujuan};
					$scope.rightSelection.lokasiTujuan = {mdmgNama:$scope.tempSelection.namaLokasiTujuan, mdmgKode:$scope.tempSelection.kodeLokasiTujuan};
					$scope.rightSelection.namaLokasiAsal = tempDatapandu.namaLokasiTujuan;
					$scope.rightSelection.namaLokasiTujuan = $scope.tempSelection.namaLokasiTujuan;
					$scope.rightSelection.kodeLokasiAsal = tempDatapandu.kodeLokasiTujuan;
					$scope.rightSelection.kodeLokasiTujuan = $scope.tempSelection.kodeLokasiTujuan;
					$scope.rightSelection.jenisPandu = '1';
 					$scope.rightSelection.statusSiklusPandu = '1';
 					$scope.rightSelection.flagFake = true;
 					$scope.realisasipandu.tglMulai = $filter('date')(new Date(), 'dd-MM-yyyy');
					$scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
					$scope.realisasipandu.noPpkJasa = undefined;
 					$scope.changeJenisGerakan();
				}
				// $scope.setDefaultTglPandu();				
			}
			$scope.$watch(function(){return localStorage.getItem('kapaltunda');}, function(newVal,oldVal){
				if(newVal == 'true'){
					$scope.gandengBtn = false; 
					$scope.gandengBtnTambah = false; 
					
					SearchKapalGandeng.get({noPpk1 : $scope.dataUmum.noPpk1, noPpkJasa : item.noPpkJasa},function(response){
						if (response.totalElements > 0) {
							$scope.kapalGandengArray = 	response.content;							
						}else{
							$scope.kapalGandengArray = [];
						}
					});					
				}else{
					$scope.gandengBtn = true; 
				}
			});	
			setTimeout(function(){
				setDisableDate();
	 		}, 500);
		});
	}
	
	var handleSelectRight = function (item, e) {
		$scope.rightReadOnly = true;
		$scope.getRealisasiPanduDetailbyPpkJasa(item);
	};

	var handleDblClickRight = function(item, e){
		$scope.getRealisasiPanduDetailbyPpkJasa(item);
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
		$('#datarea-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
 		handleSelectRight(item);
		$scope.rightReadOnly = false;
	});

	$scope.validationLookupAsalPandu = function(){
		if($scope.valueField !== $scope.rightSelection.namaLokasiAsal){
			if(typeof $scope.rightSelection.namaLokasiAsal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-006</b>'
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
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-006</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaLokasiTujuan = '';
			}
		}
	}

	$scope.validationLookupPetugas = function(){
		if($scope.valueField !== $scope.rightSelection.namaPandu){
			if(typeof $scope.rightSelection.namaPandu != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-015</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaPandu = '';
			}
		}
	}

	$scope.validationLookupKapalPandu = function(){
		if($scope.valueField !== $scope.realisasipandu.kapalPandu){
			if(typeof $scope.realisasipandu.kapalPandu != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-016</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.realisasipandu.kapalPandu = '';
			}
		}
	}

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
	
	$scope.moveSelection = function(){	
		if($scope.modeRealisasi == '3'){			
			if(tmpmoderea.length <= 1){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Anda Memilih 2 Penetapan 1 Realisasi, Silahkan Pilih Lebih dari 1 No. PPK Jasa.<br><br>Kode validasi : <b>VALREA-017</b>'
				};
				Notification.setNotification($scope.setNotification);
				return false;
			}			
		}

		$scope.$watch(function(){return localStorage.getItem('kapaltunda');}, function(newVal,oldVal){
			if(newVal == 'true'){ 
				$scope.gandengBtn = false; 
				$scope.gandengBtnTambah = false;
				SearchKapalGandeng.get({noPpk1 : $scope.dataUmum.noPpk1, noPpkJasa : $scope.tempSelection.noPpkJasa},function(response){
					if (response.totalElements > 0) {
						$scope.kapalGandengArray = 	response.content;
					}
				});					
			}else{ 
				$scope.gandengBtn = true; 
				$scope.gandengBtnTambah = true;
			}
		});

		if(tmpmoderea.length > 1){
			var match = isIncludeItem($scope.itemSelected, tmpmoderea[0], 'noPpkJasa');

			if(!match){	
				$scope.avoidClick = true;				
				var select = JSON.parse(JSON.stringify(tmpmoderea[0]));
				$scope.configRight.selectedItems = [];
				if(select.statusSiklusPandu == 0 || select.statusSiklusPandu == undefined){
					select.statusSiklusPandu = '1';
				}
				$scope.itemSelected.push(select);

				var idx = $scope.itemSelected.indexOf(select);
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightSelection.kodeLokasiTujuan = tmpmoderea[1].kodeLokasiTujuan;
				$scope.rightSelection.namaLokasiTujuan = tmpmoderea[1].namaLokasiTujuan;
				$scope.rightSelection.flagApbs = '0';
				$scope.rightSelection.mode = 3;
				$scope.rightSelection.childmode = tmpmoderea[1].noPpkJasa;
				$scope.rightSelection.nipPandu = tmpmoderea[1].nipPandu;
				$scope.rightSelection.namaPandu = tmpmoderea[1].namaPandu;
				$scope.changeJenisGerakan();

				setDefaultForm();

				$scope.rightReadOnly = false;
				$scope.config.selectedItems = [];
			}	
		}else{ 
			if($scope.modeRealisasi == '2'){ 
				var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
				if(!match){
					$scope.avoidClick = true;
					var select = JSON.parse(JSON.stringify($scope.tempSelection));					
					fakeSelect.noPpkJasa = '<no. PPK Jasa>';
					fakeSelect.noPpk1 = '';
					fakeSelect.flagFake = true;
					if(select.statusSiklusPandu == 0 || select.statusSiklusPandu == undefined){
						select.statusSiklusPandu = '1';
					}
					$scope.itemSelected.push(select);
					$scope.itemSelected.push(fakeSelect);

					var idx = $scope.itemSelected.indexOf(select);
					$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
					$scope.rightSelection = $scope.itemSelected[idx];
					$scope.rightSelection.flagApbs = '0';
					setDefaultForm();

					$scope.rightReadOnly = false;					
				}				
			}else{
	/*normal*/
				if($scope.tempSelection != null){
					var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');

					if(!match){
						$scope.avoidClick = true;
						var select = JSON.parse(JSON.stringify($scope.tempSelection));
						if(select.statusSiklusPandu == 0 || select.statusSiklusPandu == undefined){
							select.statusSiklusPandu = '1';
						}
						$scope.itemSelected.push(select);

						var idx = $scope.itemSelected.indexOf(select);
						$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
						$scope.rightSelection = $scope.itemSelected[idx];
						$scope.rightSelection.flagApbs = '0';
						$scope.rightSelection.nipPandu = $scope.itemSelected[idx].nipPandu;
						$scope.rightSelection.namaPandu = $scope.itemSelected[idx].namaPandu;
						$scope.realisasipandu.tglMulai = $scope.itemSelected[idx].tglMulai;
						$scope.realisasipandu.jamMulai = $scope.itemSelected[idx].jamMulai;
						setDefaultForm();

						$scope.rightReadOnly = false;
					}
				}
	/*---------*/				
			}
		}
	};

	$scope.openTab = function(evt){		
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tab-pane");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		menuJasa = document.getElementsByClassName("menu-jasa");
		for (i = 0; i < menuJasa.length; i++) {
			menuJasa[i].className = menuJasa[i].className.replace(" active", "");
		}
		$rootScope.tab2p1r = true;

		$('.tab-tunda').addClass("active");
		$('html,body').scrollTop(0);
		if(tempAllDataTunda.length > 0){
			var dataTunda = {};

			document.getElementById("tundaTab").style.display = "block";
			document.getElementById("tunda").style.display = "block";
			dataTunda.bindData = true;
			dataTunda.content = tempAllDataTunda;
			JasaTunda.addJasaTunda(dataTunda);
		}
	}

/*get after mode realisasi*/
	var getdatarea = function(){
		var tempPanduItem = [];
		PenetapanDetail.get({ppk1: $routeParams.ppk1, urutan: $routeParams.urutan}, function(response) {
			var jasa = [];
			var temp = response;
			for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
				var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
				jasa.push(namaJasa);
				if(temp.details[0].ptpJasa[i].status != 9){
					 if (namaJasa === "pandu") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							tempPanduItem.push(temp.details[0].ptpJasa[i]);
						}
					}				
				}
			}
			$scope.items = $filter('orderBy')(JSON.parse(JSON.stringify(tempPanduItem)), 'noPpkJasa');
			$scope.panduItems = $scope.items;
		});
	}
/*------------------*/

var getalldataPandu = function(){
	var tempAllDataPandu = [];
	tempAllDataTunda = [];
	PermohonanDetail.get({id:$routeParams.ppk1},function(response){
		if(response.details.length > 0){
			for (var i = 0; i < response.details.length; i++) {
				if(response.details[i].status === 'C' || response.details[i].status === 'R'){
					var urutan = response.details[i].urutanPermohonan;
					PenetapanDetail.get({ppk1: $routeParams.ppk1, urutan: response.details[i].urutanPermohonan}, function(response) {
						var jasa = [];
						var temp = response;
						for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
							var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
							if(temp.details[0].ptpJasa[i].status != 9){
								temp.details[0].ptpJasa[i].urutan = urutan;
								if (namaJasa === "pandu") {
									if(temp.details[0].ptpJasa[i].status  != 10){
										if(temp.details[0].ptpJasa[i].status  != 2){											
											tempAllDataPandu.push(temp.details[0].ptpJasa[i]);
										}
									}
								}
								if (namaJasa === "tunda") {
									if(temp.details[0].ptpJasa[i].status  != 10){
										if(temp.details[0].ptpJasa[i].status  != 2){
											tempAllDataTunda.push(temp.details[0].ptpJasa[i]);
										}
									}
								}				
							}
						}
						if($scope.modeRealisasi == '3'){
							if(tempAllDataPandu.length > 0){
								$scope.items =  $filter('orderBy')(JSON.parse(JSON.stringify(tempAllDataPandu)), 'noPpkJasa');
								$scope.panduItems = $scope.items;
							}							
						}

						
					});					
				}
			}
			
		}
	})
};
/*----------------*/

var savedetail = function(arraypandu){
	var arraypmh = {};
	var arrayptp = {};
	var arrayrea = {};
	
	/*array permohonan*/
	AppParamValue.get({nama:'JENIS_PANDU', value:arraypandu.jenisPandu}, {}, function(response){
		arraypmh.jenisPanduText = response[0].caption;
	});

	AppParamValue.get({nama:'JENIS_GERAKAN', value:arraypandu.jenisGerakan}, {}, function(response){
		arraypmh.jenisGerakanText = response[0].caption;
	});
	arraypmh.noPpk1 = arraypandu.noPpk1;
	arraypmh.tglPandu = arraypandu.tglMulai;
	arraypmh.jenisPandu = parseInt(arraypandu.jenisPandu);
	arraypmh.jenisGerakan = parseInt(arraypandu.jenisGerakan);
	arraypmh.kodeLokasiAsal = arraypandu.kodeLokasiAsal;
	arraypmh.namaLokasiAsal = arraypandu.namaLokasiAsal;
	arraypmh.kodeLokasiTujuan = arraypandu.kodeLokasiTujuan;
	arraypmh.namaLokasiTujuan = arraypandu.namaLokasiTujuan;

	/*array penetapan*/
	arrayptp.noPpk1 = arraypandu.noPpk1;	
	arrayptp.kodeLokasiAsal = arraypandu.kodeLokasiAsal;
	arrayptp.namaLokasiAsal = arraypandu.namaLokasiAsal;
	arrayptp.kodeLokasiTujuan = arraypandu.kodeLokasiTujuan;
	arrayptp.namaLokasiTujuan = arraypandu.namaLokasiTujuan;
	arrayptp.jenisPandu = ''+arraypandu.jenisPandu;
	arrayptp.jenisGerakan = ''+arraypandu.jenisGerakan;
	arrayptp.flagApbs = arraypandu.flagApbs;
	arrayptp.tglMulai = arraypandu.tglMulai;
	arrayptp.tglSetuju = arraypandu.tglMulai;
	
	arrayrea = arraypandu;

	var arrayMode = {
		mode : $scope.modeRealisasi,
		noPpk1 : arraypandu.noPpk1,
		namaLokasiAsal : arraypandu.namaLokasiAsal,
		kodeLokasiAsal : arraypandu.kodeLokasiAsal,
		namaLokasiTujuan : arraypandu.namaLokasiTujuan,
		kodeLokasiTujuan : arraypandu.kodeLokasiTujuan,
		jenisGerakan : $scope.rightSelection.jenisGerakan
	};
			
	/*if($scope.tempSelection.jenisGerakan == '2'){
		arrayMode.kodeAsal =  '01';
		arrayMode.namaAsal = 'JAMUANG';
		arrayMode.kodeTujuan = '07';
		arrayMode.namaTujuan = 'JAMRUD UTARA';												
	}
	ModeRealisasi.addMode(arrayMode);
	$scope.openTab();*/

/*	var parseTglMulai = Date.parse($scope.realisasipandu.tglMulai);
	var parseTglSelesai = Date.parse($scope.realisasipandu.tglSelesai);

	if($scope.realisasipandu.tglSelesai && parseTglMulai>parseTglSelesai){
		var note =  {
			type 	: "warning",
			message : "Tgl & Jam Mulai tidak boleh melebihi Tgl & Jam Selesai"
		};
		Notification.setNotification(note);
		return false;
	}
*/

	if(arrayrea.jenisGerakan == '1'){
		$scope.$watch('arrayrea', function (newValue, oldValue) {
			Databinding.setPanduMasuk(newValue);				
		});
	}
	if(arrayrea.jenisGerakan == '3'){
		$scope.$watch('arrayrea', function (newValue, oldValue) {
			Databinding.setPanduKeluar(newValue);				
		});
	}

	if(arraypandu.noPpkJasa == undefined){	
		PermohonanMultiDetail.save({noPpk1 : arraypandu.noPpk1}, {}, function(response){
			arraypmh.detailPmhId = response.id;
			arraypmh.urutanPermohonan = response.urutanPermohonan;			
			PermohonanPandu.save(arraypmh, function(responsepmh) {
				arrayptp.noPpkJasa = responsepmh.noPpkJasa;
				PenetapanPandu.save(arrayptp,function(responseptp){
					arrayrea.noPpkJasa = responsepmh.noPpkJasa;
					RealisasiPandu.save(arrayrea,function(responserea) {
						if (responserea.id) {
							if(arrayrea.jenisGerakan == '1'){									
								Databinding.setPanduMasuk(responserea);
							}
							if(arrayrea.jenisGerakan == '3'){
								Databinding.setPanduKeluar(responserea);
							}
							var arrayMode = {
								mode : $scope.modeRealisasi,
								noPpk1 : arraypandu.noPpk1,
								detailPmhId : arraypmh.detailPmhId,
								urutan : arraypmh.urutanPermohonan,
								namaLokasiAsal : arraypandu.namaLokasiAsal,
								kodeLokasiAsal : arraypandu.kodeLokasiAsal,
								namaLokasiTujuan : arraypandu.namaLokasiTujuan,
								kodeLokasiTujuan : arraypandu.kodeLokasiTujuan,
								jenisGerakan : $scope.tempSelection.jenisGerakan
							};
							
							if($scope.tempSelection.jenisGerakan == '2' || $scope.tempSelection.jenisGerakan == '3'){								
								arrayMode.kodeAsal =  tempDatapandu.kodeLokasiAsal;
								arrayMode.namaAsal = tempDatapandu.namaLokasiAsal;
								arrayMode.kodeTujuan = tempDatapandu.kodeLokasiTujuan;
								arrayMode.namaTujuan = tempDatapandu.namaLokasiTujuan;																			
							}

							if($scope.kapalGandengArray.length > 0){
								for (var y = 0; y < $scope.kapalGandengArray.length; y++) {
									if(!$scope.kapalGandengArray[y].id){
										$scope.kapalGandeng[y] = $scope.kapalGandengArray[y];
										$scope.kapalGandeng[y].noPpk1 = $scope.dataUmum.noPpk1;
										$scope.kapalGandeng[y].noPpkJasa = responserea.noPpkJasa;
										AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
											$scope.setNotification  = {
												type	: "success",
												message	: "Data Kapal Gandeng berhasil tersimpan"
											};
											Notification.setNotification($scope.setNotification);
										},function(){
											$scope.setNotification  = {
												type	: "danger",
												message	: "Data Kapal Gandeng tidak berhasil tersimpan"
											};
											Notification.setNotification($scope.setNotification);
										});
									}
								}
								checkunique = [];
							}

							ModeRealisasi.addMode(arrayMode);
							var note = {
								type: "success",
								message: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							$scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
							setDefaultForm();
							$scope.openTab();
						} else {
							if($scope.tempSelection.jenisGerakan == '3'){
								var note = {
									type: "error",
									message: "Data gagal disimpan. <br> Pastikan Realisasi Pandu Masuk sudah dilakukan. <br><br> Kode Validasi : <b>VALREA-018</b>"
								};
							}else{
								var note = {
									type: "error",
									message: "Data gagal disimpan"
								};
							}
							Notification.setNotification(note);
						}
					},function(response) {
						var note = {
							type: "error",
							message: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					})
				})
			},function(response) {
					var note = {
						type: "error",
						message: "Data gagal disimpan"
					};
				Notification.setNotification(note);
			})
		});
	}else{	
		RealisasiPandu.save(arrayrea,function(response) {
			if (response.id) {
				if(arrayrea.jenisGerakan == '1'){									
					Databinding.setPanduMasuk(response);
				}
				if(arrayrea.jenisGerakan == '3'){
					Databinding.setPanduKeluar(response);
				}
				if($scope.kapalGandengArray.length > 0){
					for (var y = 0; y < $scope.kapalGandengArray.length; y++) {
						if(!$scope.kapalGandengArray[y].id){
							$scope.kapalGandeng[y] = $scope.kapalGandengArray[y];
							$scope.kapalGandeng[y].noPpk1 = $scope.dataUmum.noPpk1;
							$scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
							AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
								$scope.setNotification  = {
									type	: "success",
									message	: "Data Kapal Gandeng berhasil tersimpan"
								};
								Notification.setNotification($scope.setNotification);
							},function(){
								$scope.setNotification  = {
									type	: "danger",
									message	: "Data Kapal Gandeng tidak berhasil tersimpan"
								};
								Notification.setNotification($scope.setNotification);
							});
						}
					}
					checkunique = [];
				}
				var note = {
					type: "warning",
					message: "Silahkan merealisasi Jasa Pandu Selanjutnya!"
				};
				Notification.setNotification(note);
				tempDatapandu = response;
				$('html,body').scrollTop(0);
				if($scope.itemSelected.length > 0){
					for (var i = 0; i < $scope.itemSelected.length; i++) {
						if($scope.itemSelected[i].flagFake){					
							$scope.configRight.selectedItems.push($scope.itemSelected[i]);
							handleSelectRight($scope.itemSelected[i]);
							break;
						}
					}
				}
				setDefaultForm();
			} else {
				if(arrayrea.jenisGerakan == '3'){
					var note = {
						type: "error",
						message: "Data gagal disimpan. <br> Pastikan Realisasi Pandu Masuk sudah dilakukan. <br><br> Kode Validasi : <b>VALREA-018</b>"
					};
				}else{
					var note = {
						type: "error",
						message: "Data gagal disimpan"
					};
				}
				Notification.setNotification(note);
			}
		},function(response) {
			var note = {
				type: "error",
				message: "Data gagal disimpan"
			};
			Notification.setNotification(note);
		});
	}

};
/*------------------*/
	$scope.savePandu= function(){			
		if($scope.configRight.selectedItems.length>0){					
			//fungsi untuk cek siklus pandu sama dengan rekomendasi
			/*if($scope.rekomendasi.indexOf($scope.rightSelection.statusSiklusPandu) == -1){
				if(($scope.rekomendasi.indexOf($scope.rightSelection.siklusChosen) == -1) || ($scope.rightSelection.siklusChosen != $scope.rightSelection.statusSiklusPandu)){
					$('#siklusPanduModal').modal('show');
					return false;
				}				
			}*/

			var jamMulai = document.getElementById('timeTglmulaipandu').querySelector('input').value;
			var jamSelesai = document.getElementById('timeTglselesaipandu').querySelector('input').value;
			var jamNaik = document.getElementById('timePandujamnaik').querySelector('input').value;
			var jamTurun = document.getElementById('timePandujamturun').querySelector('input').value;
			var jamKapalGerak = document.getElementById('timePandujamkapalbergerak').querySelector('input').value;
			
			$scope.realisasipandu.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.realisasipandu.noPpkJasa = $scope.rightSelection.noPpkJasa;
			// $scope.realisasipandu.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal;
			// $scope.realisasipandu.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan;
			if (typeof $scope.rightSelection.namaLokasiAsal === 'object') {
				$scope.realisasipandu.kodeLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgKode;
				$scope.realisasipandu.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal.mdmgNama;
			}else{
				$scope.realisasipandu.kodeLokasiAsal = $scope.rightSelection.kodeLokasiAsal;
				$scope.realisasipandu.namaLokasiAsal = $scope.rightSelection.namaLokasiAsal;
			}
			if (typeof $scope.rightSelection.namaLokasiTujuan === 'object') {
				$scope.realisasipandu.kodeLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgKode;
				$scope.realisasipandu.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan.mdmgNama;			
			}else{
				$scope.realisasipandu.kodeLokasiTujuan = $scope.rightSelection.kodeLokasiTujuan;
				$scope.realisasipandu.namaLokasiTujuan = $scope.rightSelection.namaLokasiTujuan;
			}
			if (typeof $scope.rightSelection.namaPandu === 'object') {
				$scope.realisasipandu.nipPandu = $scope.rightSelection.namaPandu.mpegNip;
				$scope.realisasipandu.namaPandu = $scope.rightSelection.namaPandu.mpegNama;			
			}else{
				$scope.realisasipandu.nipPandu = $scope.rightSelection.nipPandu;
				$scope.realisasipandu.namaPandu = $scope.rightSelection.namaPandu;
			}
			$scope.realisasipandu.jenisPandu = $scope.rightSelection.jenisPandu;
			$scope.realisasipandu.jenisGerakan = $scope.rightSelection.jenisGerakan;
			$scope.realisasipandu.flagApbs = $scope.rightSelection.flagApbs;
			$scope.realisasipandu.statusSiklusPandu = $scope.rightSelection.statusSiklusPandu;

			/*informasi level transaksi*/
			if($scope.realisasipandu.jenisGerakan == '3'){
				$scope.confirmLevel();
				if($scope.jasaPerPmhN.length > 0 || $scope.jasaPerPmhP.length > 0 || $scope.jasaPerPtpD.length > 0){
					$('#levelJasaModal').modal('show');
					return false;
				}						
			}
			
			if(typeof $scope.realisasipandu.tglMulai === 'object'){
				if($scope.realisasipandu.tglMulai.toString().indexOf('-') === -1){
					$scope.realisasipandu.tglMulai = $filter('date')($scope.realisasipandu.tglMulai,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else if($scope.realisasipandu.tglMulai.indexOf('T') > 0){
				$scope.realisasipandu.tglMulai = $scope.realisasipandu.tglMulai;
			}else{				
				var formatTglMulai = $scope.realisasipandu.tglMulai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.realisasipandu.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulai;			
			}

			if(typeof $scope.realisasipandu.tglSelesai === 'object'){
				if($scope.realisasipandu.tglSelesai.toString().indexOf('-') === -1){
					$scope.realisasipandu.tglSelesai = $filter('date')($scope.realisasipandu.tglSelesai,'yyyy-MM-dd')+'T'+jamSelesai;
				}
			}if($scope.realisasipandu.tglSelesai.indexOf('T') > 0){
				$scope.realisasipandu.tglSelesai = $scope.realisasipandu.tglSelesai;
			}else{
				var formatTglSelesai = $scope.realisasipandu.tglSelesai.split('-');
				var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
				$scope.realisasipandu.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+jamSelesai;
			}
			var tglNaik = $filter('date')(($scope.realisasipandu.tglMulai), 'yyyy-MM-dd')+'T'+jamNaik;
			var tglTurun = $filter('date')($scope.realisasipandu.tglSelesai, 'yyyy-MM-dd')+'T'+jamTurun;
			var tglKapalGerak = $filter('date')($scope.realisasipandu.tglMulai, 'yyyy-MM-dd')+'T'+jamKapalGerak;
			$scope.realisasipandu.jamNaik = tglNaik;
			$scope.realisasipandu.jamTurun = tglTurun;
			// $scope.realisasipandu.jamPandu = $scope.tempSelection.jamPandu;
			$scope.realisasipandu.jamKapalGerak = tglKapalGerak;

			var rightPpkJasa = $scope.rightSelection.noPpkJasa;
			for (var i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].noPpkJasa === rightPpkJasa) {
					var status = $scope.items[i].status;
				}
			}
			
			if (typeof $scope.realisasipandu.petugas === 'object') {
				$scope.realisasipandu.petugas = $scope.realisasipandu.petugas.mpegNama;
			}
			
			if($scope.realisasipandu.kapalPandu != null){
				if (typeof $scope.realisasipandu.kapalPandu === 'object') {
					$scope.realisasipandu.kapalPandu = $scope.realisasipandu.kapalPandu.nama;
				}				
			}
			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;

			// start Validasi Tgl & Jam Mulai tidak boleh melebihi Tgl & Jam Selesai
			/*var parseTglMulai = Date.parse($scope.realisasipandu.tglMulai);
			var parseTglSelesai = Date.parse($scope.realisasipandu.tglSelesai);
			if($scope.realisasipandu.tglSelesai && parseTglMulai >= parseTglSelesai){
				var note =  {
								type 	: "warning",
								message : "Tgl & Jam Mulai tidak boleh melebihi Tgl & Jam Selesai.<br><br>Kode validasi : <b>VALREA-001</b>"
							};
				Notification.setNotification(note);
				return false;
			}*/

			var dataTglMulaiSelesaiPandu = {
				startDate 		: $scope.realisasipandu.tglMulai, 
				endDate 		: $scope.realisasipandu.tglSelesai,
				titleStartDate 	: "Tgl & Jam Mulai",
				titleEndDate 	: "Tgl & Jam Selesai"
			}
			var validateTglMulaiSelesaiPandu = Validations.checkStartEndDate(dataTglMulaiSelesaiPandu);
			if(!validateTglMulaiSelesaiPandu)return false;

			var dataJamNaikGerakPandu = {
				startDate 		: $scope.realisasipandu.jamNaik, 
				endDate 		: $scope.realisasipandu.jamKapalGerak,
				titleStartDate 	: "Jam Pandu Naik",
				titleEndDate 	: "Jam Kapal Bergerak"
			}
			var validateJamNaikGerakPandu = Validations.checkStartEndDate(dataJamNaikGerakPandu);
			if(!validateJamNaikGerakPandu)return false;

			var dataJamGerakTurunPandu = {
				startDate 		: $scope.realisasipandu.jamKapalGerak, 
				endDate 		: $scope.realisasipandu.jamTurun,
				titleStartDate 	: "Jam Kapal Bergerak",
				titleEndDate 	: "Jam Pandu Turun"
			}
			var validateJamGerakTurunPandu = Validations.checkStartEndDate(dataJamGerakTurunPandu);
			if(!validateJamGerakTurunPandu)return false;
			
			/*validasi form*/
			var R1 = validationForm.required('Lokasi Asal Pandu',$scope.realisasipandu.namaLokasiAsal);
			if(!R1){return R1;}
			var R2 = validationForm.required('Lokasi Tujuan Pandu',$scope.realisasipandu.namaLokasiTujuan);
			if(!R2){return R2;}
			var R3 = validationForm.required('Petugas Pandu', $scope.realisasipandu.namaPandu);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jenis Pandu', $scope.realisasipandu.jenisPandu);
			if(!R4){return R4;}
			var R5 = validationForm.required('Jenis Gerakan', $scope.realisasipandu.jenisGerakan);
			if(!R5){return R5;}
			var R6 = validationForm.required('APBS/Alur Pelayaran', $scope.realisasipandu.flagApbs);
			if(!R6){return R6;}
			var R7 = validationForm.required('Siklus Pandu',$scope.realisasipandu.statusSiklusPandu);
			if(!R7){return R7;}
			var R8 = validationForm.required('Tanggal Mulai Pandu',$scope.realisasipandu.tglMulai);
			if(!R8){return R8;}
			var R9 = validationForm.required('Jam Mulai Pandu', jamMulai);
			if(!R9){return R9;}
			var R10 = validationForm.required('Tanggal Selesai Pandu', $scope.realisasipandu.tglSelesai);
			if(!R10){return R10;}
			var R11 = validationForm.required('Jam Selesai Pandu', jamSelesai);
			if(!R11){return R11;}
			var R12 = validationForm.required('Jam Naik Kapal', jamNaik);
			if(!R12){return R12;}
			var R13 = validationForm.required('Jam Turun Kapal', jamTurun);
			if(!R13){return R13;}
			var R14 = validationForm.required('Jam Kapal Bergerak', jamKapalGerak);
			if(!R14){return R14;}

			if ($scope.rightSelection.tglVerifikasi === undefined) {
				if($rootScope.adaDataLabuh == false){
					if($scope.rightSelection.jenisGerakan == '3'){
						var note = {
							type: "error",
							message: "Pandu keluar tidak bisa diinputkan bila jasa labuh belum realisasi. <br><br>Kode validasi : <b>VALREA-020</b>"
						};
						Notification.setNotification(note);
						return false;						
					} 
				}
				if($scope.modeRealisasi == '2'){
					if($scope.rightSelection.flagFake === true){
						$scope.realisasipandu.noPpkJasa = undefined;
					}		
					savedetail($scope.realisasipandu);
				}else{
					RealisasiPandu.save($scope.realisasipandu,
						function(response) {
							if (response.id) {
								getdatarea();
								if($scope.realisasipandu.jenisGerakan == '1'){									
									Databinding.setPanduMasuk(response);
								}
								if($scope.realisasipandu.jenisGerakan == '3'){
									Databinding.setPanduKeluar(response);
								}

								if($scope.kapalGandengArray.length > 0){
									for (var y = 0; y < $scope.kapalGandengArray.length; y++) {
										if(!$scope.kapalGandengArray[y].id){
											$scope.kapalGandeng[y] = $scope.kapalGandengArray[y];
											$scope.kapalGandeng[y].noPpk1 = $scope.dataUmum.noPpk1;
											$scope.kapalGandeng[y].noPpkJasa = response.noPpkJasa;
											AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
												$scope.setNotification  = {
													type	: "success",
													message	: "Data Kapal Gandeng berhasil tersimpan"
												};
												Notification.setNotification($scope.setNotification);
											},function(){
												$scope.setNotification  = {
													type	: "danger",
													message	: "Data Kapal Gandeng tidak berhasil tersimpan"
												};
												Notification.setNotification($scope.setNotification);
											});
										}
									}
									checkunique = [];
								}

								/*mode realisasi*/
								if($scope.modeRealisasi == '3'){
									if($scope.rightSelection.mode){
										JenisRevisiRealisasiPandu.update({ppkjasa:$scope.rightSelection.childmode,jenisRevisi:10}, {},function(response){
											StatusRealisasiPandu.update({ppkjasa:$scope.rightSelection.childmode,status:10}, {},function(response){
												var note = {
													type: "success",
													message: "Data berhasil tersimpan"
												};
												Notification.setNotification(note);
												tmpmoderea = [];
												$scope.items = [];
												getdatarea();
												if(tempAllDataTunda.length > 0){
													var arrayMode = {};	
													if( $scope.rightSelection.jenisGerakan != '3'){
														arrayMode = {
															mode : $scope.modeRealisasi,
															namaLokasiAsal : $scope.realisasipandu.namaLokasiAsal,
															kodeLokasiAsal : $scope.realisasipandu.kodeLokasiAsal,
															namaLokasiTujuan : $scope.realisasipandu.namaLokasiTujuan,
															kodeLokasiTujuan : $scope.realisasipandu.kodeLokasiTujuan,
															jenisGerakan : $scope.realisasipandu.jenisGerakan
														}													
													}										

													ModeRealisasi.addMode(arrayMode);
													$scope.openTab();
													var note = {
														type: "warning",
														message: "Data berhasil tersimpan, <br> Silahkan dilanjutkan dengan merealisasikan Jasa Tunda."
													};
													Notification.setNotification(note);
												}	
											});
										});
									}									
								}
							
								var note = {
									type: "success",
									message: "Data berhasil tersimpan"
								};
								Notification.setNotification(note);
								$scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
								setDefaultForm();
								BindEskalasi.setDefaultEskalasi();
							} else {	
								var msg = 'Data tidak Tersimpan.';
								var failedType = 'error';
								var failedMsg;

								if(response.description){
									failedType = 'error';
									failedMsg = response.description.match(/\[(.*?)\]/);									
								}

								if(failedMsg != null || failedMsg != undefined){
									failedType = 'warning',
									msg = failedMsg[1] + '<br><br><b>System Notification</b>'
								}

								var note = {
									type: failedType,
									message: msg
								};					
								Notification.setNotification(note);
							}
						},
						function(response) {
							var note = {
								type: "error",
								message: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					);					
				}

			}else{
				RealisasiPanduEdit.update({noPpkJasa: $scope.rightSelection.noPpkJasa}, $scope.realisasipandu,
					function(response) {
						if (response.id) {
							if($scope.realisasipandu.jenisGerakan == '1'){									
								Databinding.setPanduMasuk(response);
							}
							if($scope.realisasipandu.jenisGerakan == '3'){
								Databinding.setPanduKeluar(response);
							}
							if($scope.kapalGandengUpdateArray.length > 0){
								for (var y = 0; y < $scope.kapalGandengUpdateArray.length; y++) {
									if(!$scope.kapalGandengUpdateArray[y].id){
										$scope.kapalGandeng[y] = $scope.kapalGandengUpdateArray[y];
										$scope.kapalGandeng[y].noPpk1 = $scope.realisasipandu.noPpk1;
										$scope.kapalGandeng[y].noPpkJasa = $scope.rightSelection.noPpkJasa;
										AddKapalGandeng.save($scope.kapalGandeng[y],function(response){
											$scope.setNotification  = {
												type	: "success",
												message	: "Data Kapal Gandeng berhasil tersimpan"
											};
											Notification.setNotification($scope.setNotification);
										},function(){
											$scope.setNotification  = {
												type	: "warning",
												message	: "Data Kapal Gandeng tidak berhasil tersimpan"
											};
											Notification.setNotification($scope.setNotification);
										});
									}
								}
								checkunique = [];
								$scope.kapalGandengArray = [];
								$scope.kapalGandengUpdateArray = [];
							}
							var note = {
							 	type: "success",
								message: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
							$scope.realisasipandu.jamMulai = $filter('date')(new Date(), 'HH:mm');
							setDefaultForm();
							if(response.status===2){
								UpdateStatusReaAfterEskalasi.update({noPpkJasa:response.noPpkJasa},{},function(response){
									console.log(response);
								});
							}	
							BindEskalasi.setDefaultEskalasi();				
						} 
						else {
							var msg = 'Data tidak Tersimpan.';
							var failedType = 'error';
							var failedMsg;

							if(response.description){
								failedType = 'error';
								failedMsg = response.description.match(/\[(.*?)\]/);									
							}

							if(failedMsg != null || failedMsg != undefined){
								failedType = 'warning',
								msg = failedMsg[1] + '<br><br><b>System Notification</b>'
							}

							var note = {
								type: failedType,
								message: msg
							};					
							Notification.setNotification(note);
						}
					},
					function(response) {
						var note = {
						 type: "error",
						 message: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			}
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

		$scope.modeRealisasi = '1';
		setDefaultForm();
	};

	//event dari Lokasi Asal dan Tujuan Pandu VALREA-007
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
		}
	}

	//function set jenis gerakan VALREA-007
	var setJenisGerakan = function() {
		if($scope.lokasiAsalGerakPandu.length>0 && ($scope.lokasiTujuanGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.rightSelection.jenisGerakan = '1'; // MASUK
		}else if($scope.lokasiTujuanGerakPandu.length>0 && ($scope.lokasiAsalGerakPandu.length===0 || $scope.lokasiTujuanGerakPandu.length===undefined)){
			$scope.rightSelection.jenisGerakan = '3'; // KELUAR
		}else{
			$scope.rightSelection.jenisGerakan = '2'; // PINDAH
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

	$scope.submitKapalGandeng = function(){
		var temp = $scope.kapalGandeng.kapal;
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
					kapalInfo.jenisKapal = temp.mkplJenis;
					kapalInfo.negaraKapal = temp.mkplBendera;
					kapalInfo.noPpk1Tongkang = temp.noPpk1Tongkang;
					$scope.kapalGandengArray.push(kapalInfo);
					$scope.kapalGandengUpdateArray.push(kapalInfo);
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
					//app131216 VALPMH032 dihilangkan
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
		var panjangArray = $scope.kapalGandengArray.length;
		if(i != 0){
			i = i- panjangArray;
		}
		if(checkDeleteGandeng){
			checkunique.splice(i, 1); 
			$scope.kapalGandengArray.splice(i, 1);
			$scope.kapalGandengUpdateArray.splice(i, 1); 
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

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

	$scope.$on('batalTanpaLayanan', function(event, item) {
		var confirmTanpaLayanan = confirm('Pembatalan dengan tombol ini adalah Pembatalan yang disebabkan Pandu tidak melayani.\n Apakah Anda yakin akan membatalkan jasa ini ?');
		if(confirmTanpaLayanan == true){
			BatalTanpaLayanan.update({ppkJasa : item},{}, function(a){
				if(a.id){
					$scope.setNotification  = {
						type	: "success",
						message	: "Jasa berhasil dibatalkan. \n Halaman ini akan automatis reload."
					};
					Notification.setNotification($scope.setNotification);
					$timeout(function() {
						$window.location.reload();
					}, 5000);
				}else{
					$scope.setNotification  = {
						type	: "danger",
						message	: a.description
					};
					Notification.setNotification($scope.setNotification);
				}
			})
		}
	});
}]);
