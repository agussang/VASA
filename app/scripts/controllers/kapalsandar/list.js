'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringKapalSandarCtrl
 * @description
 * # MonitoringKapalSandarCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MonitoringKapalSandarCtrl',['$scope','$filter','KapalSandarMonitorPtp','KapalSandarMonitorRea','LoadingScreen','Notification','MdmDermagaSearchByKode','MdmDermagaPerJasa',function ($scope,$filter,KapalSandarMonitorPtp,KapalSandarMonitorRea,LoadingScreen,Notification,MdmDermagaSearchByKode,MdmDermagaPerJasa) {
	$scope.dataMonitorPtp = [];
	$scope.dataMonitorRea = [];
	$scope.dataMonitorReaTambat = [];
	$scope.sandarTgl = new Date();

	var valueField = '';

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.optionsStart = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.optionsEnd = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	// $scope.$watch('ptpTglAwal', function(newVal, oldVal){
	// 	if($scope.ptpTglAwal != undefined){
	// 		var x = $scope.ptpTglAwal.setDate($scope.ptpTglAwal.getDate()+7);
	// 		$('#idtgltambatakhir').datepicker('setEndDate',new Date(x));			
	// 	}
	// })

	$scope.hapusTglPtp = function(){
		$scope.ptpTglAwal = undefined;
		$scope.ptpTglAkhir = undefined;
	};

	$scope.hapusTglRea = function(){
		$scope.reaTglAwal = undefined;
		$scope.reaTglAkhir = undefined;
	};

	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.validationLookupLokasiTambat = function(){
		if(valueField !== $scope.ptpDermaga){
			if(typeof $scope.ptpDermaga != 'object'){					
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH007</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.ptpDermaga = '';
			}
		}
	}

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

    $scope.loadMonitoringRea = function() { 

        var filterRea = {};

        /*if($scope.rpkroTglPerencanaan){
        	filterRpkro.tglPerencanaan = moment($scope.rpkroTglPerencanaan, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }*/

        if($scope.sandarDermaga){
        	filterRea.kdDermaga = $scope.sandarDermaga.mdmgKode;
        }

        if($scope.sandarNamaKapal){
        	filterRea.namaKapal = $filter('uppercase')($scope.sandarNamaKapal);
        }

        if($scope.sandarPpk1){
        	filterRea.noPpk1 = $scope.sandarPpk1;
        }

        KapalSandarMonitorRea.get(filterRea,function(response) {
            if(response.length > 0){
            	$scope.dataMonitorRea = response;
            }else{
            	$scope.dataMonitorRea = []
            }
        });  
    }

       $scope.loadMonitoringPtp = function() { 
        var filterPtp = {};

        if($scope.ptpTglAwal){
        	filterPtp.dateStart = moment($scope.ptpTglAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if($scope.ptpTglAkhir){
        	filterPtp.dateEnd = moment($scope.ptpTglAkhir, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if($scope.ptpDermaga){
        	filterPtp.kdDermaga = $scope.ptpDermaga.mdmgKode;
        }

        if($scope.ptpNamaKapal){
        	filterPtp.namaKapal = $filter('uppercase')($scope.ptpNamaKapal);
        }

        if($scope.ptpPpk1){
        	filterPtp.noPpk1 = $scope.ptpPpk1;
        }

        KapalSandarMonitorPtp.get(filterPtp,function(response) {
            if(response.length > 0){
            	$scope.dataMonitorPtp = response;
            }else{
            	$scope.dataMonitorPtp = []
            }
        });  
    }

    $scope.loadMonitoringReaTambat = function() { 
        var filterReaTambat = {};

        if($scope.reaTglAwal){
        	filterReaTambat.tglMulaiTambat = moment($scope.reaTglAwal, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if($scope.reaTglAkhir){
        	filterReaTambat.tglSelesaiTambat = moment($scope.reaTglAkhir, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if($scope.reaDermaga){
        	filterReaTambat.kdDermaga = $scope.reaDermaga.mdmgKode;
        }

        if($scope.reaNamaKapal){
        	filterReaTambat.namaKapal = $filter('uppercase')($scope.reaNamaKapal);
        }

        if($scope.reaPpk1){
        	filterReaTambat.noPpk1 = $scope.reaPpk1;
        }

        filterReaTambat.statusNota= 0;

        filterReaTambat.isViewLastLine = true;


        KapalSandarMonitorRea.get(filterReaTambat,function(response) {
            if(response.length > 0){
            	$scope.dataMonitorReaTambat = response;
            }else{
            	$scope.dataMonitorReaTambat = [];
            }
        });  
    }

	$scope.loadMonitoringPtp();
	$scope.loadMonitoringRea();
	$scope.loadMonitoringReaTambat();

	$scope.resetPtp = function(){
		$scope.ptpNamaKapal = undefined;
		$scope.ptpDermaga = undefined;
		$scope.ptpPpk1 = undefined;
		$scope.loadMonitoringPtp();
	}

	$scope.resetRea = function(){
		$scope.sandarDermaga = undefined;
		$scope.sandarNamaKapal = undefined;
		$scope.sandarPpk1 = undefined;
		$scope.loadMonitoringRea();
	}

	$scope.resetReaTambat = function(){
		$scope.reaNamaKapal = undefined;
		$scope.reaDermaga = undefined;
		$scope.reaPpk1 = undefined;
		$scope.loadMonitoringReaTambat();
	}
}])