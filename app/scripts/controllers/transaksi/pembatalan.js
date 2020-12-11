'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPembatalanCtrl
 * @description
 * # TransaksiPembatalanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiPembatalanCtrl',['$scope','$routeParams','$location','$window','AppParam','AppParamValue','PermohonanDetailForBatal','PenetapanDetail','LoadingScreen','UserRole','PermohonanDetailByPpk','PenetapanPanduByPpkJasa','PermohonanPanduDetail','PenetapanLabuhByPpkJasa', function ($scope,$routeParams,$location,$window,AppParam,AppParamValue,PermohonanDetailForBatal,PenetapanDetail,LoadingScreen,UserRole,PermohonanDetailByPpk,PenetapanPanduByPpkJasa,PermohonanPanduDetail,PenetapanLabuhByPpkJasa) {
	UserRole.checkJasa();
	LoadingScreen.show();
	$scope.dataUmum = {};
	$scope.labuhItems = [];
	$scope.tambatItems = [];
	$scope.tundaItems = [];
	$scope.panduItems = [];
	$scope.airItems = [];
	$scope.labuhPenetapanItems = [];
	$scope.tambatPenetapanItems = [];
	$scope.tundaPenetapanItems = [];
	$scope.panduPenetapanItems = [];
	$scope.airPenetapanItems = [];
	var service = 'PenetapanDetail';
	$scope.stt = $routeParams.status;
	

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.optionReadonly = {
		enableOnReadonly: false
	};

	$scope.greenBtn = function() {
		$location.path($window.history.back());
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

	var getPenetapanDetail =  function(){
		PenetapanDetail.get({ppk1:$routeParams.ppk1, urutan:$routeParams.urutan},function(response){
			var labuhBtn = 'btn btn-primary';
			var tambatBtn = 'btn btn-primary';
			var panduBtn = 'btn btn-primary';
			var tundaBtn = 'btn btn-primary';
			var airBtn = 'btn btn-primary';
			var labuhTab = true;
			var tambatTab = true;
			var panduTab = true;
			var tundaTab = true;
			var airTab = true;

			var temp = response;
			temp.kemasanMuat = ''+temp.kemasanMuat;
			temp.kemasanBongkar = ''+temp.kemasanBongkar;
			temp.satuanMuat = ''+temp.satuanMuat;
			temp.satuanBongkar = ''+temp.satuanBongkar;

			var jasa = [];
			for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
				var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
				jasa.push(namaJasa);
				if(namaJasa === 'labuh'){
					$scope.labuhItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'tambat'){
					$scope.tambatItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'tunda'){
					$scope.tundaItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'pandu'){
					$scope.panduItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'air_kapal'){
					$scope.airItems.push(temp.details[0].ptpJasa[i]);
				}
			}

			if($scope.labuhItems.length <= 0){
				labuhTab = false;
			}
			if($scope.tambatItems.length <= 0){
				tambatTab = false;
			}
			if($scope.tundaItems.length <= 0){
				tundaTab = false;
			}
			if($scope.panduItems.length <= 0){
				panduTab = false;
			}
			if($scope.airItems.length <= 0){
				airTab = false;
			}

			if(jasa.indexOf("labuh") === -1){
				labuhBtn = "btn btn-default";
				labuhTab = false;
			}
			if(jasa.indexOf("tambat") === -1){
				tambatBtn = "btn btn-default";
				tambatTab = false;
			}
			if(jasa.indexOf("tunda") === -1){
				tundaBtn = "btn btn-default";
				tundaTab = false;
			}
			if(jasa.indexOf("pandu") === -1){
				panduBtn = "btn btn-default";
				panduTab = false;
			}
			if(jasa.indexOf("air_kapal") === -1){
				airBtn = "btn btn-default";
				airTab = false;
			}

			temp.btnLabuh = labuhBtn;
			temp.btnTambat = tambatBtn;
			temp.btnPandu = panduBtn;
			temp.btnTunda = tundaBtn;
			temp.btnAir = airBtn;
			temp.tabLabuh = labuhTab;
			temp.tabTambat = tambatTab;
			temp.tabPandu = panduTab;
			temp.tabTunda = tundaTab;
			temp.tabAir = airTab;
			$scope.dataUmum = temp;
		});
	}
	/*Get penetapan by id*/
	$scope.getPenetapanById = function(){
		PenetapanDetail.get({ppk1:$routeParams.ppk1,urutan:$routeParams.urutan}, function(response){
			var temp = response;
			$scope.labuhPenetapanItems = [];
			$scope.tambatPenetapanItems = [];
			$scope.tundaPenetapanItems = [];
			$scope.panduPenetapanItems = [];
			$scope.airPenetapanItems = [];
			for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
				var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
				if(namaJasa === 'labuh'){
					$scope.labuhPenetapanItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'tambat'){
					$scope.tambatPenetapanItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'tunda'){
					$scope.tundaPenetapanItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'pandu'){
					$scope.panduPenetapanItems.push(temp.details[0].ptpJasa[i]);
				}else if(namaJasa === 'air_kapal'){
					$scope.airPenetapanItems.push(temp.details[0].ptpJasa[i]);
				}
			}

			$scope.dataPenetapan = temp;
		});
		LoadingScreen.hide();
	}

	var getPermohonanDetail = function(){
		PermohonanDetailByPpk.get({ppk1:$routeParams.ppk1,urutan:$routeParams.urutan}, function(response){
			var labuhBtn = 'btn btn-primary';
			var tambatBtn = 'btn btn-primary';
			var panduBtn = 'btn btn-primary';
			var tundaBtn = 'btn btn-primary';
			var airBtn = 'btn btn-primary';
			var labuhTab = true;
			var tambatTab = true;
			var panduTab = true;
			var tundaTab = true;
			var airTab = true;

			var temp = response;
			temp.kemasanMuat = ''+temp.kemasanMuat;
			temp.kemasanBongkar = ''+temp.kemasanBongkar;
			temp.satuanMuat = ''+temp.satuanMuat;
			temp.satuanBongkar = ''+temp.satuanBongkar;
			$scope.labuhPenetapanItems = [];
			$scope.tambatPenetapanItems = [];
			$scope.tundaPenetapanItems = [];
			$scope.panduPenetapanItems = [];
			$scope.airPenetapanItems = [];

			var jasa = [];
			for (var i = 0; i < temp.details[0].jasa.length; i++) {
				var namaJasa = temp.details[0].jasa[i].nama.substr(temp.details[0].jasa[i].nama.indexOf("_") + 1);
				jasa.push(namaJasa);
				if(namaJasa === 'labuh'){
					$scope.labuhPenetapanItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'tambat'){
					$scope.tambatPenetapanItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'tunda'){
					$scope.tundaPenetapanItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'pandu'){
					$scope.panduPenetapanItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'air_kapal'){
					$scope.airPenetapanItems.push(temp.details[0].jasa[i]);
				}
			}

			if($scope.labuhPenetapanItems.length <= 0){
				labuhTab = false;
			}
			if($scope.tambatPenetapanItems.length <= 0){
				tambatTab = false;
			}
			if($scope.tundaPenetapanItems.length <= 0){
				tundaTab = false;
			}
			if($scope.panduPenetapanItems.length <= 0){
				panduTab = false;
			}
			if($scope.airPenetapanItems.length <= 0){
				airTab = false;
			}

			if(jasa.indexOf("labuh") === -1){
				labuhBtn = "btn btn-default";
				labuhTab = false;
			}
			if(jasa.indexOf("tambat") === -1){
				tambatBtn = "btn btn-default";
				tambatTab = false;
			}
			if(jasa.indexOf("tunda") === -1){
				tundaBtn = "btn btn-default";
				tundaTab = false;
			}
			if(jasa.indexOf("pandu") === -1){
				panduBtn = "btn btn-default";
				panduTab = false;
			}
			if(jasa.indexOf("air_kapal") === -1){
				airBtn = "btn btn-default";
				airTab = false;
			}

			temp.btnLabuh = labuhBtn;
			temp.btnTambat = tambatBtn;
			temp.btnPandu = panduBtn;
			temp.btnTunda = tundaBtn;
			temp.btnAir = airBtn;
			temp.tabLabuh = labuhTab;
			temp.tabTambat = tambatTab;
			temp.tabPandu = panduTab;
			temp.tabTunda = tundaTab;
			temp.tabAir = airTab;
			$scope.dataUmum = temp;	
			$scope.dataPenetapan = temp;
			$scope.labuhItems = $scope.labuhPenetapanItems;
			$scope.tambatItems = $scope.tambatPenetapanItems;
			$scope.tundaItems = $scope.tundaPenetapanItems;
			$scope.panduItems = $scope.panduPenetapanItems;
			$scope.airItems = $scope.airPenetapanItems;

		})
		LoadingScreen.hide();
	}

	switch($routeParams.status) {
	    case 'N':
	        getPermohonanDetail();
	        break;
	    case 'P':
	        getPermohonanDetail();
	        break;
	    case 'D':
	       getPermohonanDetail();
	       break;
	    default:
	        getPenetapanDetail();
	        $scope.getPenetapanById();
	}

	//getPenetapanById();
	$scope.candidatePpkjasa = undefined;
	$scope.triggerBatal = function(noPpkJasa){
		$scope.candidate = noPpkJasa;
		$scope.candidatePpkjasa = noPpkJasa;
	};

	$scope.doBatal = function(){
		$scope.$broadcast('fireBatal');
	}
}]);
