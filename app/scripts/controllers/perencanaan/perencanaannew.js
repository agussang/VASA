'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaannewCtrl
 * @description
 * # PerencanaannewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaannewCtrl',['$scope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','Notification','LoadingScreen','$modal','MdmDermagaSearchByKode','MdmDermagaPerJasa','PerencanaanNew','CheckPersiapanPrameeting', function ($scope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,Notification,LoadingScreen,$modal,MdmDermagaSearchByKode,MdmDermagaPerJasa,PerencanaanNew,CheckPersiapanPrameeting) {
  	// LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.tglPerencanaan = new Date();

	$scope.$watch('tglPerencanaan', function(){
		$('#IdtglPerencanaan').mask('99-99-9999');
	});
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

	/* validasi autocomplete */
	var valueField = '';
	$scope.checkValue = function(value){
	  valueField = value;
	}

	 // validation add
    $scope.validationSelectDermaga= function(){
	    if(valueField !== $scope.dermaga){
	      if(typeof $scope.dermaga != 'object' ){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dermaga = '';
	      }
	    }
	}
	$scope.checkPersiapan = function(kd,tgl) {
		// body...
		// var kdDermaga = $scope.dermaga.mdmgKode;
		// var tglPerencanaan = $filter('date')($scope.tglPerencanaan, 'yyyy-MM-dd');
		CheckPersiapanPrameeting.get({kdDermaga:kd,tglPerencanaan:tgl},function(response){
			// console.log(response.status);
			if(response.status == true){
				$location.path('/perencanaan/preprameeting/'+kd+'/'+tgl);
				
			}else{
				$scope.setNotification  = {
			          type  : 'warning',
			          message : 'Data Persiapan belum di buat, <b>Buat Persiapan</b>'
			        };
			        Notification.setNotification($scope.setNotification);
			}
		})
	}

	$scope.createPerenanaan = function(){
	    LoadingScreen.show();
		var kdDermaga = $scope.dermaga.mdmgKode;
		var tglPerencanaan = $filter('date')($scope.tglPerencanaan, 'yyyy-MM-dd');
		
		PerencanaanNew.get({kdDermaga:kdDermaga}, function(response){
	      LoadingScreen.hide();
			console.log(response);
				if(response.kodeError !== "A002"){
					// $scope.dataEdit = response;
					// $location.path('/perencanaan/preprameeting/'+kdDermaga+'/'+tglPerencanaan);
					// $scope.setNotification  = {
			  //         type  : 'warning',
			  //         message : 'Data Persiapan belum di buat, <b>Buat Persiapan</b>'
			  //       };
			  //       Notification.setNotification($scope.setNotification);
			  		$scope.checkPersiapan(kdDermaga,tglPerencanaan);
			       
				}else{
					$scope.setNotification  = {
			          type  : 'warning',
			          message : 'Dermaga yang Anda pilih, <b>Belum di verifikasi</b>'
			        };
			        Notification.setNotification($scope.setNotification);
			        $scope.dermaga = '';
					// dataEmpty();
				}
			}, function(){
				dataEmpty();
			});
	}


}]);
