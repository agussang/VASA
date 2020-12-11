'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiLayanannewCtrl
 * @description
 * # TransaksiLayanannewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiLayanannewCtrl', ['$scope','$filter', '$rootScope', '$location', '$timeout', 'BindKapal', 'PermohonanUnfinished', 'MdmKapalList', 'MdmKapalSearchByName','PmhList', 'Notification', 'PermohonanSetDone', 'LoadingScreen','RealisasiLabuhbyPpk1','MdmKapalSearchByKode','SharedVariable','CheckIdVisit','$http','API_PATH','PmhLayananKapal','PermohonanByKodeKapal', function($scope, $filter, $rootScope, $location, $timeout, BindKapal, PermohonanUnfinished, MdmKapalList, MdmKapalSearchByName, PmhList, Notification, PermohonanSetDone, LoadingScreen, RealisasiLabuhbyPpk1,MdmKapalSearchByKode,SharedVariable,CheckIdVisit,$http,API_PATH,PmhLayananKapal,PermohonanByKodeKapal) {

	$scope.showLayanan1 = false;
	$scope.showLayanan2 = false;
	$scope.showToast = false;
	$scope.isDisabled = true;

	$scope.permohonanId = null;
	$scope.permohonanGantiAgen = {};
	$scope.textKelengkapan = '';
	$scope.myVar = '';
	$scope.availablePpk1 = undefined;
	// autocomplete kapal
	$scope.getListKapal = function(value) {
	  	if (value) {
			return new Promise(function(resolve, reject) {
			  	MdmKapalSearchByName.get({
					"nama": value,
					"limit": 10
			  	}, function(response) {
					resolve(response);
		            response.forEach(function (response) {
		                response.mkplNamaLoa = response.mkplNama +' ('+response.mkplKode+', GT: '+formatSeparator(response.mkplGrt) + ', LOA: '+formatSeparator(response.mkplLoa)+', '+response.mkplJenis+')';
		            });
			  	});
			});
	  	}
	};

	$scope.getListKapalByKode = function(value) {
	  	if (value) {
			return new Promise(function(resolve, reject) {
			  	MdmKapalSearchByKode.get({
					"kode": value,
					"limit": 10
			  	}, function(response) {
					resolve(response);
		            response.forEach(function (response) {
		                response.mkplNamaLoa = response.mkplNama +' ('+response.mkplKode+', GT: '+formatSeparator(response.mkplGrt) + ', LOA: '+formatSeparator(response.mkplLoa)+', '+response.mkplJenis+')';
		            });
			  	});
			});
	  	}
	};

	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.selectKapalConfig = [
		{
			id: 'namaKapal',
			title:  'Nama',
			placeholder: 'Cari berdasarkan Nama Kapal'
		},
		{
			id: 'kodeKapal',
			title:  'Kode',
			placeholder: 'Cari berdasarkan Kode Kapal'
		}
	];

	$scope.$watch('selectionSearchKapal', function(val)
	{
		$scope.filterPlaceholder = val.placeholder;
		$scope.kapal='';
	});

	$scope.resetSearch = function () {
		$scope.kapal ='';
    };

	$scope.validationLookupKapal = function(){
		if(valueField !== $scope.kapal){
			if(typeof $scope.kapal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.kapal = '';
			}
		}
	}

	$scope.cekLayanan = function(kapal) {
		var isAirKapal = SharedVariable.getSharedVariables();

		if (kapal.mkplKode === undefined) {
			$scope.showToast = true;
			$timeout(function() {
			  $scope.showToast = false;
			}, 5000);
		} else {
        	if(kapal.mkplBendera == null){
        		$scope.textKelengkapan = '<b><span class="pficon pficon-warning-triangle-o"></span> Peringatan : Kapal '+kapal.mkplNama+' tidak memiliki data Bendera.</b>';
        		$('#kondisi4').modal('show');
        		return false;
        	}
        	if(kapal.mkplLoa == null || kapal.mkplLoa == 0 || kapal.mkplLoa == ''){
        		$scope.textKelengkapan = '<b><span class="pficon pficon-warning-triangle-o"></span> Peringatan : Kapal '+kapal.mkplNama+' tidak memiliki data Loa.</b>';
        		$('#kondisi4').modal('show');
        		return false;
        	}
        	if(kapal.mkplGrt == null || kapal.mkplGrt == 0 || kapal.mkplGrt == ''){
        		$scope.textKelengkapan = '<b><span class="pficon pficon-warning-triangle-o"></span> Peringatan : Kapal '+kapal.mkplNama+' tidak memiliki data GT.</b>';
        		$('#kondisi4').modal('show');
        		return false;
        	}
			if(kapal.mkplJenis == null){
        		$scope.textKelengkapan = '<b><span class="pficon pficon-warning-triangle-o"></span> Peringatan : Kapal '+kapal.mkplNama+' tidak memiliki data Jenis Kapal.</b>';
        		$('#kondisi4').modal('show');
        		return false;
        	}

			if(isAirKapal){
				$http.get(API_PATH+'permohonan/check_id_visit_air_kapal/kode_kapal/'+kapal.mkplKode)
				.success(function (response) {
					if(response == false){
						$scope.permohonanId = null;
						$('#kondisi5').modal('show');
						SharedVariable.setVariable(false);
					}else{
						PermohonanByKodeKapal.get({kodeKapal : kapal.mkplKode},function(response){
							if (response.id != null) {
				        		$scope.permohonanId = response.id;		        				
						        response.jenisKapal = kapal.mkplJenis;
								BindKapal.addKapal(response);
								$timeout(function() {
									$location.path('/transaksi/permohonan');
								}, 200);
							}else{
								$('#kondisi2').modal('show');
						        $scope.permohonanId = null;
			        		}
						});
					}
				})
				.error(function(response){
					$scope.setNotification  = {
						type	: 'danger',
						message	: response.description
					};
					Notification.setNotification($scope.setNotification);
				});
			}else{
				$http.get(API_PATH+'permohonan/check_id_visit/kode_kapal/'+kapal.mkplKode)
				.success(function (response) {
					if(response == false){
						$scope.permohonanId = null;
						$scope.availablePpk1 = undefined;
						$('#kondisi2').modal('show');
	        		}else if(response == true){
						PmhList.get({kodeKapal : kapal.mkplKode},function(response){ 
	        				if (response.content.length > 0) {
	        					$scope.availablePpk1 = []; 
	        					var no = 0;
	        					response.content.forEach(function(item){
			        				if(item.flagDone == 1 && item.details[0].jasa.length > 0){
			        					if(item.details[0].jasa[0].nama != 'epb_air_kapal'){
				        					item.idData = no++;
				        					var noDetail = item.details.length - 1;
				        					item.eta = item.details[noDetail].jasa[0].tglMasuk;
				        					
				        					$scope.availablePpk1.push(item);	        						
			        					}
			        				}   						
			        			}); 
			        			$scope.availablePpk1 =  $filter('orderBy')(JSON.parse(JSON.stringify($scope.availablePpk1)), '-noPpk1');
			        			if($scope.availablePpk1.length > 0){
			        				$('#kondisi1').modal('show');
			        			}else{
			        				$('#kondisi2').modal('show');
					        		$scope.permohonanId = null;
			        			}
			        		} else{
			        			$('#kondisi2').modal('show');
					        	$scope.permohonanId = null;
			        		}
		        		})   					
	        		}	
	        	})
				.error(function(response){
					$scope.setNotification  = {
		            		type	: 'danger',
		            		message	: response.description
		          	};
		          	Notification.setNotification($scope.setNotification);
				});			
			}
			$scope.isDisabled = false;

			/*
				PermohonanUnfinished.get({
				  	kodeKapal: kapal.mkplKode
				}, function(response) {
			        if (response.id != null) {
			        	$scope.permohonanId = response.id;

						PermohonanList.get({kodeKapal : kapal.mkplKode},function(response){
							if(response.content[0]){
								var detailPermohonan = $filter('orderBy')(response.content, '-created');
								$scope.permohonanGantiAgen = detailPermohonan[0];
								var textKondisi1 = "Dengan No. PPK1 : <strong>"+detailPermohonan[0].noPpk1+"</strong>";
						  		$('#kondisi1').modal('show');
						  		document.getElementById('textNoppk1').innerHTML = textKondisi1;
							}else{
								$('#kondisi2').modal('show');
			        			$scope.permohonanId = null;
							}
					  	});
			        } else {
			        	if(response.status == '500'){
			        		if (response.description.indexOf('returns more than one elements') > -1) {
			        			$scope.setNotification  = {
									type	: "danger",
									message	: "Data hasil pencarian lebih dari 1 data, Silahkan hubungi administrator."
								};
								Notification.setNotification($scope.setNotification);
			        		}
			        	}else{
			        		$('#kondisi2').modal('show');
			        		$scope.permohonanId = null;
			        	}		        	
			        }

				}, function() {
				  	$scope.showLayanan2 = true;
				 	$scope.showLayanan1 = false;
				  	$scope.permohonanId = null;
				});  
			*/

			
		};
	};
	$scope.namaKapal = function(value) { console.log(value);
		var dataKapal; console.log($scope.availablePpk1);	
		if($scope.availablePpk1){ 
			if($scope.availablePpk1.length > 0){
				dataKapal = $scope.availablePpk1[value];
				$scope.permohonanId = dataKapal.id;	
			}else{
				dataKapal = value;
			}
		}else{
			dataKapal = value;
		}
		
	  	BindKapal.addKapal(dataKapal);
	  	if ($scope.permohonanId === null) {
	  		$timeout(function() {
				$location.path('/transaksi/permohonan');
			}, 200);
      	} else {
      		$('#kondisi1').modal('hide');
      		$timeout(function() {
				$location.path('/transaksi/jasabaru/'+dataKapal.noPpk1);
			}, 200);
      	}
	}

	$scope.confirmPutusAgen = function(){
		$('#kondisi3').modal('hide');
		$timeout(function() {
			$location.path('/transaksi/gantiagen/'+$scope.permohonanGantiAgen.noPpk1);
		}, 200);
	}

	$scope.gantiAgen = function() {
    	RealisasiLabuhbyPpk1.get({
      		noPpk1: $scope.permohonanGantiAgen.noPpk1
    	},function (response) {
      		if (response.content[0] == undefined || response.content[0] == null) {
        		$scope.setNotification  = {
          			type	: 'warning',
          			message	: 'putus agen tidak dapat dilakukan sebelum ada lastline labuh'
       			};
        		Notification.setNotification($scope.setNotification);
        		$('#kondisi1').modal('hide');
      		} else {
	        	var statusLabuh = response.content[0].status;
	       		if (statusLabuh >= 1) {
	          		$scope.permohonanGantiAgen.gantiAgen = true;
	          		BindKapal.addKapal($scope.permohonanGantiAgen);
	          		$('#kondisi1').modal('hide');
	          		$('#kondisi3').modal('show');
	        	} else {
	          		$scope.setNotification  = {
	            		type	: 'warning',
	            		message	: 'putus agen tidak dapat dilakukan sebelum ada lastline labuh'
	          		};
	          		Notification.setNotification($scope.setNotification);
	          		$('#kondisi1').modal('hide');
	        	}
      		}
    	})
	};

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    $scope.kondisi5Tidak = function(){
    	$timeout(function() {
			$location.path('/airkapal/permohonan');
		}, 200);
    }
  }]);
