'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiMutasiCtrl
 * @description
 * # TransaksiMutasiCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiMutasiCtrl', ['$scope','$routeParams','AppParam','AppParamValue','PermohonanDetailByPpk','PenetapanDetail', function ($scope,$routeParams,AppParam,AppParamValue,PermohonanDetailByPpk,PenetapanDetail) {
	$scope.dataUmum = {};
	$scope.labuhItems = [];
	$scope.tambatItems = [];
	$scope.tundaItems = [];
	$scope.panduItems = [];
	$scope.airItems = [];

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

/*Get penetapan by id*/
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

		var jasa = [];
		for (var i = 0; i < temp.details[0].jasa.length; i++) {
			var namaJasa = temp.details[0].jasa[i].nama.substr(temp.details[0].jasa[i].nama.indexOf("_") + 1);
			jasa.push(namaJasa);
			if(namaJasa === 'labuh'){
				$scope.labuhItems.push(temp.details[0].jasa[i]);
			}else if(namaJasa === 'tambat'){
				$scope.tambatItems.push(temp.details[0].jasa[i]);
			}else if(namaJasa === 'tunda'){
				$scope.tundaItems.push(temp.details[0].jasa[i]);
			}else if(namaJasa === 'pandu'){
				$scope.panduItems.push(temp.details[0].jasa[i]);
			}else if(namaJasa === 'air_kapal'){
				$scope.airItems.push(temp.details[0].jasa[i]);
			}
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
}]);
