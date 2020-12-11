'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiPerubahanCtrl
 * @description
 * # RevisiPerubahanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RevisiPerubahanCtrl',['$scope','$routeParams','$location','$window','AppParam','AppParamValue','MdmDermagaPerJasa','PenetapanDetail','MdmKapalSearchByName','LoadingScreen','UserRole','MdmDermagaSearchByKode', function ($scope,$routeParams,$location,$window,AppParam,AppParamValue,MdmDermagaPerJasa,PenetapanDetail,MdmKapalSearchByName,LoadingScreen,UserRole,MdmDermagaSearchByKode) {
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

	AppParam.get({nama:'SATUAN_AIR_KAPAL'},function(response){
		$scope.satuanAirKapal = response.content;
	});

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
			if(temp.details[0].ptpJasa[i].status != 9){
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
	LoadingScreen.hide();
	$scope.valueField = '';
	$scope.checkValue = function(value){
		$scope.valueField = value;
	}

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
				});
			});
		}
	};

	$scope.$watch('tglMulaiTambat', function(){
		$('#tglMulaiTambat').mask('99-99-9999');
	});

	$scope.$watch('tglSelesaiTambat', function(){
		$('#tglSelesaiTambat').mask('99-99-9999');
	});

	$scope.$watch('tglPandu', function(){
		$('#tglPandu').mask('99-99-9999');
	});

	$scope.$watch('tglMulaiTunda', function(){
		$('#tglMulaiTunda').mask('99-99-9999');
	});

	$scope.$watch('tglIsi', function(){
		$('#tglIsiAirKapal').mask('99-99-9999');
	});

	$scope.$watch('tempSelection.jamMulai', function(){
		$('#jamMulaiTambatVal').mask('99:99');
	});

	$scope.$watch('tempSelection.jamMulai', function(){
		$('#jamPanduVal').mask('99:99');
	});

	$scope.$watch('tempSelection.jamMulai', function(){
		$('#jamMulaiTundaVal').mask('99:99');
	});

	$scope.$watch('tempSelection.jamIsi', function(){
		$('#jamIsiVal').mask('99:99');
	});
}]);
