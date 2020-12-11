'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerpendekanCtrl
 * @description
 * # RevisiPerpendekanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerpendekanCtrl',['$scope','$routeParams','$location','$filter','AppParam','AppParamValue','Notification','PenetapanDetail','RevisiTglJasaTambat','HistoryRevisiTambat','LoadingScreen','UserRole', function ($scope,$routeParams,$location,$filter,AppParam,AppParamValue,Notification,PenetapanDetail,RevisiTglJasaTambat,HistoryRevisiTambat,LoadingScreen,UserRole) {
	UserRole.checkJasa();
	LoadingScreen.show();
	$scope.dataUmum = {};
	$scope.tambatItems = [];
	$scope.tambatPenetapanItems = [];
	$scope.ubahTgl = true;
	$scope.tabelHistoryTambat = [];
	var tempPpkJasa = '';
	var mainPpkJasa = '';
	$scope.dataRetrive = [];

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.optionReadonly = {
		enableOnReadonly: false
	};

	$scope.greenBtn = function() {
		$location.path('/transaksi/penetapan');
	};

/*parameter form*/
	//get parameter Sifat Kunjungan
	AppParam.get({nama:'KUNJUNGAN'},function(response){
		$scope.sifatKunjungan = response.content;
	});

	//get parameter kemasan
	AppParam.get({nama:'KEMASAN'},function(response){
		$scope.kemasan = response.content;
	});

	//get parameter satuan
	AppParam.get({nama:'SATUAN'},function(response){
		$scope.satuan = response.content;
	});

	//get jenis pandu
	AppParam.get({nama:'JENIS_PANDU'},function(response){
		$scope.jenisPanduOption = response.content;
	});

	//get jenis pandu
	AppParam.get({nama:'JENIS_GERAKAN'},function(response){
		$scope.jenisGerakanOption = response.content;
	});

	//get alat isi air
	AppParam.get({nama:'ALAT_ISI_AIR'},function(response){
		$scope.alatIsiAir = response.content;
	});

	var setDisableDate = function(dateStart,dateEnd){
		$('#tglSelesaiTambat').datepicker('setStartDate',dateStart);
		var formatTglSelesai = $scope.tempSelection.tglSelesai.split('-');
		var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
		var newDateEnd = new Date(newFormatTglSelesai);
		var dateEndTemp = new Date(newDateEnd.getTime());
		dateEndTemp.setDate(newDateEnd.getDate()+1);
		$('#tglSelesaiTambat').datepicker('setEndDate',dateEndTemp);
		$('#tglSelesaiTambat').datepicker('setDatesDisabled',[dateEndTemp]);
		$('#jamSelesaiTambatVal').mask('99:99');
		$('#tglSelesaiTambat').mask('99-99-9999');
	}

	var tempSelectionValue = function(item){
		$scope.tempSelection = item;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
		$scope.ubahTgl = true;
		setDisableDate($scope.tempSelection.tglMulai,$scope.tempSelection.tglSelesai);
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
 		mainPpkJasa = item.noPpkJasa;
		var getData = matchDataSelected(item);
		$scope.tempSelection = getData;
		$scope.tempSelection.jamMulai = $filter('date')($scope.tempSelection.tglMulai, 'HH:mm');
		$scope.tempSelection.jamSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'HH:mm');
		$scope.tempSelection.tglMulai = $filter('date')($scope.tempSelection.tglMulai, 'dd-MM-yyyy');
		$scope.tempSelection.tglSelesai = $filter('date')($scope.tempSelection.tglSelesai, 'dd-MM-yyyy');
 		retrive(item.noPpkJasa);
 		tempPpkJasa = $scope.tempSelection.noPpkJasa;
 		historyTambat($scope.tempSelection.noPpkJasa);
 	};

	var retrive = function(ppkJasa){
		HistoryRevisiTambat.get({noPpkJasa:ppkJasa}, function(response){
			var rHistory = response;
			if(rHistory.length > 0){
				$scope.dataRetrive = rHistory[0];
				tempPpkJasa = $scope.dataRetrive.noPpkJasa;
				if($scope.dataRetrive.length === undefined){
					tempSelectionValue($scope.dataRetrive);
				}
			}else{
				$scope.dataRetrive = [];
			}
		});
	}

	var historyTambat = function(ppkJasa){
		HistoryRevisiTambat.get({noPpkJasa:ppkJasa}, function(response){
			var history = response;
			$scope.tabelHistoryTambat = [];
			for (var i = 0; i < history.length; i++) {
				if(history[i].jenisRevisi == 7){
					$scope.tabelHistoryTambat.push(history[i]);
				}
			}
		});
	};

	$scope.ubahTglBtn = function(val){
		$scope.ubahTgl = val;
	};

	$scope.batalUbah = function(val){
		$scope.ubahTgl = val;
	};

	PenetapanDetail.get({ppk1:$routeParams.ppk1, urutan:$routeParams.urutan},function(response){
		var tambatBtn = 'btn btn-primary';
		var tambatTab = true;

		var temp = response;
		temp.kemasanMuat = ''+temp.kemasanMuat;
		temp.kemasanBongkar = ''+temp.kemasanBongkar;
		temp.satuanMuat = ''+temp.satuanMuat;
		temp.satuanBongkar = ''+temp.satuanBongkar;

		var jasa = [];
		for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
			var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
			jasa.push(namaJasa);
			if(namaJasa === 'tambat' && temp.details[0].ptpJasa[i].parentPtpJasaId == null  && temp.details[0].ptpJasa[i].status != 9){
				$scope.tambatItems.push(temp.details[0].ptpJasa[i]);
			}
		}

		if($scope.tambatItems.length <= 0){
			tambatTab = false;
		}

		if(jasa.indexOf("tambat") === -1){
			tambatTab = false;
		}


		temp.btnTambat = tambatBtn;
		temp.tabTambat = tambatTab;
		$scope.dataUmum = temp;

		$scope.itemsPenetapan = JSON.parse(JSON.stringify($scope.tambatItems));
		$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
		handleSelect($scope.itemsPenetapan[0]);
		tempPpkJasa = $scope.tempSelection.noPpkJasa;
		setDisableDate($scope.tempSelection.tglMulai,$scope.tempSelection.tglSelesai);
	});
	LoadingScreen.hide();
 	$scope.config = {
 		selectItems: true,
 		multiSelect: false,
 		dblClick: false,
 		selectionMatchProp: 'noPpkJasa',
 		selectedItems: [],
 		showSelectBox: false,
 		onSelect: handleSelect,
 	};

 $scope.submitPerpendekan = function(){
 	var tglSelesaiValue = null;

	var formatTglMulai = $scope.tempSelection.tglMulai.split('-');
	var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
	var tglMulaiValue = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.tempSelection.jamMulai;

	if(typeof $scope.tempSelection.tglSelesai === 'object'){
		if($scope.tempSelection.tglSelesai.toString().indexOf('-') === -1){
			tglSelesaiValue = $filter('date')($scope.tempSelection.tglSelesai,'yyyy-MM-dd')+'T'+$scope.tempSelection.jamSelesai;
		}
	}else{
		var formatTglSelesai = $scope.tempSelection.tglSelesai.split('-');
		var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
		tglSelesaiValue = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.tempSelection.jamSelesai;
	}
	
 	RevisiTglJasaTambat.save({noPpkJasa:tempPpkJasa,tglSelesai:tglSelesaiValue},{},function(response){
 		if(response.status !== '500' || response.status !== '404'){
 			var note  = {
				type	: "success", //ex : danger, warning, success, info
				message	: "Jasa berhasil diperpendek."
			};
			Notification.setNotification(note);
			tempSelectionValue(response);
 			historyTambat(mainPpkJasa);
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
 }]);
