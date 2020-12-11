'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterKesepakatanNewCtrl
 * @description
 * # MasterKesepakatanNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterKesepakatanNewCtrl',['$scope','$location','$modal','$rootScope', '$routeParams','$filter','$timeout','MasaTambatAdd','ItemMasaTambatAdd','Notification','AppParam','MdmDermagaSearchByKode','MdmDermagaPerJasa','MdmKapalSearchByName','MdmPelangganSearch','ParamKesepakatanAdd','SearchAlatApung','AppParamValue','AppParamAllItem','SearchPpk1','NoPpkJasaList', function ($scope,$location,$modal,$rootScope,$routeParams,$filter,$timeout,MasaTambatAdd,ItemMasaTambatAdd,Notification,AppParam,MdmDermagaSearchByKode,MdmDermagaPerJasa,MdmKapalSearchByName,MdmPelangganSearch,ParamKesepakatanAdd,SearchAlatApung,AppParamValue,AppParamAllItem,SearchPpk1,NoPpkJasaList) {
	$scope.prmkspkt = {}; // arrayparent
  	$scope.switchDefault = 1;
  	$scope.prmkspkt.isDermaga = $scope.switchDefault;
  	$scope.prmkspkt.isGt = $scope.switchDefault;
  	$scope.prmkspkt.isJenisPelayaran = $scope.switchDefault;
  	$scope.prmkspkt.isKodeKapal = $scope.switchDefault;
  	$scope.prmkspkt.isMinUtility = $scope.switchDefault;
  	$scope.prmkspkt.isPelanggan = $scope.switchDefault;
  	$scope.prmkspkt.isValuta = $scope.switchDefault;
  	$scope.prmkspkt.isCustom = $scope.switchDefault;
  	$scope.prmkspkt.isJenisGerakanPandu = $scope.switchDefault;
  	$scope.prmkspkt.isJenisKapal = $scope.switchDefault;
  	$scope.prmkspkt.isJenisPandu = $scope.switchDefault;
  	$scope.prmkspkt.isKapalNegara = $scope.switchDefault;
  	$scope.prmkspkt.isKapalTunda = $scope.switchDefault;
  	$scope.prmkspkt.isLokasiAwal = $scope.switchDefault;
  	$scope.prmkspkt.isLokasiTujuan = $scope.switchDefault;
  	$scope.prmkspkt.isBendera = $scope.switchDefault;
  	$scope.prmkspkt.isLoa = $scope.switchDefault;
  	$scope.prmkspkt.isSifatKunjungan = $scope.switchDefault;
  	$scope.prmkspkt.isJenisTunda = $scope.switchDefault;
  	$scope.prmkspkt.isNoPpk1 = $scope.switchDefault; 
  	$scope.prmkspkt.isNoPpkJasa = $scope.switchDefault;	
  	$scope.prmkspkt.berlakuDi = '';

  	$scope.locationPath = '/paramkesepakatan/list';

  	$scope.prmkspktdetail = {}; //arraymodalnew
  	$scope.paramKesepakatanArray = [];
  	$scope.masatambatDetailUpdateArray = [];
  	$scope.prmkspktdetailUpdate = [];//arraymodalupdate
  	$scope.postMasaTambatMaster = {};
  	$scope.postDetailMasaTambatMaster = {};  
  	$scope.prmkspktdetail.bebasDenda = 0;
	var valueField = '';

	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	//separator kapal data
	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
	//copy to reset masatambatDetailArray
	$scope.originalParamKesepakatanArray = angular.copy($scope.paramKesepakatanArray);

  	$scope.cancelUpdateMasaTambatDetail = function(){
		$scope.paramKesepakatanArray = angular.copy($scope.paramKesepakatanArray);
  	}

  	//parameter
  	AppParamAllItem.get({nama:'JENIS_PELAYARAN'},function(response){    
		$scope.jenisPelayaran = response;
  	});

  	AppParamAllItem.get({nama:'JASA'},function(response){
		$scope.jasa = response;
  	});

  	AppParamAllItem.get({nama:'VALUTA'},function(response){
		$scope.valuta = response;
	});

	AppParamAllItem.get({nama: 'JENIS_PANDU'}, function(response) {
		$scope.jenisPanduOption = response;
	});

	AppParamAllItem.get({nama: 'JENIS_GERAKAN'}, function(response) {
		$scope.jenisGerakanOption = response;
	});
	AppParamAllItem.get({nama: 'JENIS_KAPAL'}, function(response) {
		$scope.jenisKapalOption = response;
	});
	AppParamAllItem.get({nama: 'SIFAT_KESEPAKATAN'}, function(response) {
		$scope.sifatKesepakatanOption = response;
  	});
 	AppParamAllItem.get({nama: 'JENIS_NEGARA'}, function(response) {
		$scope.jenisNegaraOption = response;
  	});

  	AppParamAllItem.get({nama: 'KUNJUNGAN'}, function(response) {
		$scope.sifatKunjunganOption = response;
  	});

  	AppParamAllItem.get({nama: 'JENIS_KEG_TUNDA'}, function(response) {
		$scope.jenisTundaOption = response;
  	});

  	//validasi dermaga
	$scope.checkValue = function(value) {
		valueField = value;
	}

 	$scope.validationLookupDermaga = function(){
		if(valueField !== $scope.prmkspktdetail.dermaga){
			if(typeof $scope.prmkspktdetail.dermaga != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.prmkspktdetail.dermaga = '';
			}
		}
	}

  	//get dermaga
	$scope.getListOfDermaga = function(value) {
    	if (value && value.length <=3) {
      		return new Promise(function(resolve) {
        		MdmDermagaSearchByKode.get({
          			kode: value,
          			kodeTerminal : localStorage.getItem('kodeTerminal'),
          			limit: '10'
        		}, function(response) {
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
        		}, function(response) {
          			resolve(response);
            		response.forEach(function (response) {
                		response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            		});
        		});
      		});
    	}
	};
  	// get jenisPelayaranText
  	$scope.getJenisPelayaran = function(jnspl){
		AppParam.get({nama:'JENIS_PELAYARAN'}, function(response){
	  		var content = response.content;
	  		for(var idx = 0; idx < content.length;idx++){
				if (content[idx].value == jnspl) {
					$scope.jenisPelayaranText = content[idx].caption;
				}
	  		}
		});
  	}

	// get kapal
	$scope.getListKapal = function(value) {
	  	if (value) {
			return new Promise(function(resolve, reject) {
			  	MdmKapalSearchByName.get({
					"nama": value,
					"limit": 10
			  	}, function(response) {
					resolve(response);
		            response.forEach(function (response) {
		                response.mkplNamaLoa = response.mkplNama +' (GT: '+formatSeparator(response.mkplGrt) + ' LOA: '+formatSeparator(response.mkplLoa)+')';
		            });
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
	//validasi kapal
	$scope.validationLookupKapal = function(){
		if(valueField !== $scope.prmkspktdetail.kapal){
			if(typeof $scope.prmkspktdetail.kapal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.prmkspktdetail.kapal = '';
			}
		}
	}
	//get pelanggan
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
	//validasi pelanggan
	$scope.validationLookupAgen = function(){
		if(valueField !== $scope.prmkspktdetail.pelanggan){
			if(typeof $scope.prmkspktdetail.pelanggan != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-001</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.prmkspktdetail.pelanggan = '';
			}
		}
	}
	$scope.validationLookupKapalTunda = function(){
		if($scope.valueField !== $scope.prmkspktdetail.kapalTunda){
			if(typeof $scope.prmkspktdetail.kapalTunda != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-009</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.prmkspktdetail.kapalTunda = '';
			}
		}
	}

	/*list ppk1*/
    $scope.getListOfPpk1 = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        SearchPpk1.get({
            ppk1: value,
            limit : 10
          }, function(response) {
            resolve(response);
          });
      });
    }
  };

  $scope.validationLookupKapal = function(){
		if(valueField !== $scope.prmkspktdetail.noPpk1){
			if(typeof $scope.prmkspktdetail.noPpk1 != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.prmkspktdetail.noPpk1 = '';
			}
		}
	}

  $scope.getPpkJasaList = function(value){
  	if(value){
  		NoPpkJasaList.get({ppk1 : value.noPpk1
  				},function(response){
  					//deklarasi array
  					$scope.noPpkJasa = [];
  					//input array from jasa 
					response.noPpkJasaLabuh.forEach(function(element) {
						$scope.noPpkJasa.push({value : element, caption : element});
					});
					response.noPpkJasaPandu.forEach(function(element) {
  						$scope.noPpkJasa.push({value : element, caption : element});
					});
					response.noPpkJasaTunda.forEach(function(element) {
  						$scope.noPpkJasa.push({value : element, caption : element});
					});
					response.noPpkJasaTambat.forEach(function(element) {
  						$scope.noPpkJasa.push({value : element, caption : element});
					});
					response.noPpkJasaAirKapal.forEach(function(element) {
  						$scope.noPpkJasa.push({value : element, caption : element});
					});
  				}
  			);
  	}
  };
	$scope.$watch('prmkspktdetail.sifat', function(newVal, oldVal){
		if(newVal != '3' || newVal != '2'){
			$scope.prmkspktdetail.valutaTarif = '';
		}
	});

  	// function save  
  	$scope.submit = function(){
  		$scope.prmkspkt.jasa = parseInt($scope.prmkspkt.jasa);
  		$scope.prmkspkt.tglMulai = $filter('date')($scope.tglMulai, 'yyyy-MM-ddTHH:mm:ss');
  		$scope.prmkspkt.tglSelesai = $filter('date')($scope.tglSelesai, 'yyyy-MM-ddTHH:mm:ss');
  		$scope.prmkspkt.newDetails = $scope.paramKesepakatanArray;
		for (var i = 0; i < $scope.prmkspkt.newDetails.length; i++) {
			if($scope.prmkspkt.newDetails[i].valuta == 'null'){
				$scope.prmkspkt.newDetails[i].valuta = '';
			}
		}
  		$scope.buttonDisabled = true;
  		ParamKesepakatanAdd.save($scope.prmkspkt,function(response){
  			if(response.status != '500'){
  				$scope.setNotification  = {
					type  : "success", 
					message : "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);  
				$location.path($scope.locationPath);
  			}else{
  				$scope.setNotification  = {
					type  : "warning",
					message : "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
	        	$scope.showLoader = false;
  			}			
  		},function(){
			$scope.setNotification  = {
				type  : "warning",
				message : "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
        	$scope.showLoader = false;
		})
		$timeout(function() {
  			$scope.setNotification  = {
				type  : "success", 
				message : "Data berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);  
			$location.path($scope.locationPath);			
		}, 2000);
  	}

	// function cancel
  	$scope.cancel =  function(){
		$location.path($scope.locationPath);
 	}

	$scope.openAdd= function(){
		$scope.prmkspktdetail = {};
	}

  //masa tambat detail
  	$scope.submitMasatambatDetail = function(){
	  	if($scope.prmkspkt.isDermaga == 1){
			if(typeof $scope.prmkspktdetail.dermaga == 'object'){
				$scope.prmkspktdetail.dermagaText = $scope.prmkspktdetail.dermaga.mdmgNama;
		  		$scope.prmkspktdetail.dermaga = $scope.prmkspktdetail.dermaga.mdmgKode; 
			}else{
				$scope.prmkspktdetail.dermagaText = $scope.prmkspktdetail.dermaga;
		  		$scope.prmkspktdetail.dermaga = $scope.prmkspktdetail.kodeDermaga; 
			}  
	  	}

	  	if($scope.prmkspkt.isKodeKapal == 1){
			if(typeof $scope.prmkspktdetail.kapal == 'object'){
				$scope.prmkspktdetail.kodeKapal = $scope.prmkspktdetail.kapal.mkplKode;
		  		$scope.prmkspktdetail.kapal = $scope.prmkspktdetail.kapal.mkplNama;
			}else{
				$scope.prmkspktdetail.kodeKapal = $scope.prmkspktdetail.kodeKapal;
		  		$scope.prmkspktdetail.kapal = $scope.prmkspktdetail.kapal;
			}
	  	}

	  	if($scope.prmkspkt.isPelanggan == 1){
			if(typeof $scope.prmkspktdetail.pelanggan == 'object'){
				$scope.prmkspktdetail.pelangganText = $scope.prmkspktdetail.pelanggan.mplgNama;
		  		$scope.prmkspktdetail.pelanggan = $scope.prmkspktdetail.pelanggan.mplgKode; 
			}else{
				$scope.prmkspktdetail.pelangganText = $scope.prmkspktdetail.pelanggan;
		  		$scope.prmkspktdetail.pelanggan = $scope.prmkspktdetail.kodePelanggan; 
			}    
	  	}

	  	if($scope.prmkspkt.isKapalTunda == 1){
			if(typeof $scope.prmkspktdetail.kapalTunda == 'object'){
				$scope.prmkspktdetail.kapalTundaText = $scope.prmkspktdetail.kapalTunda.nama;
		  		$scope.prmkspktdetail.kapalTunda = $scope.prmkspktdetail.kapalTunda.noRegistrasi;
			}else{
				$scope.prmkspktdetail.kapalTundaText = $scope.prmkspktdetail.kapalTunda;
		  		$scope.prmkspktdetail.kapalTunda = $scope.prmkspktdetail.kodeKapalTunda;
			}       
	  	}

	  	if($scope.prmkspkt.isLokasiAwal == 1){
			if(typeof $scope.prmkspktdetail.lokasiAwal == 'object'){
				$scope.prmkspktdetail.lokasiAwalText = $scope.prmkspktdetail.lokasiAwal.mdmgNama;
		  		$scope.prmkspktdetail.lokasiAwal = $scope.prmkspktdetail.lokasiAwal.mdmgKode;
			}else{
				$scope.prmkspktdetail.lokasiAwalText = $scope.prmkspktdetail.lokasiAwal;
		  		$scope.prmkspktdetail.lokasiAwal = $scope.prmkspktdetail.kodeLokasiAwal;
			}      
	  	}

	  	if($scope.prmkspkt.isLokasiTujuan == 1){
			if(typeof $scope.prmkspktdetail.lokasiTujuan == 'object'){
				$scope.prmkspktdetail.lokasiTujuanText = $scope.prmkspktdetail.lokasiTujuan.mdmgNama;
		  		$scope.prmkspktdetail.lokasiTujuan = $scope.prmkspktdetail.lokasiTujuan.mdmgKode;
			}else{
				$scope.prmkspktdetail.lokasiTujuanText = $scope.prmkspktdetail.lokasiTujuan;
		  		$scope.prmkspktdetail.lokasiTujuan = $scope.prmkspktdetail.kodeLokasiTujuan;
			}      
	  	}

	  	if($scope.prmkspkt.isNoPpk1 == 1){
			if(typeof $scope.prmkspktdetail.noPpk1 == 'object'){
		  		$scope.prmkspktdetail.noPpk1 = $scope.prmkspktdetail.noPpk1.noPpk1;
			}else{
				$scope.prmkspktdetail.noPpk1;
			}      
	  	}

	  	if($scope.prmkspkt.isNoPpkJasa == 1){
			if(typeof $scope.prmkspktdetail.noPpkJasa == 'object'){
		  		$scope.prmkspktdetail.noPpkJasa;
			}      
	  	}

		AppParamValue.get({nama:'JENIS_PANDU', value:$scope.prmkspktdetail.jenisPandu}, {}, function(response){
			$scope.prmkspktdetail.jenisPanduText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_GERAKAN', value:$scope.prmkspktdetail.jenisGerakanPandu}, {}, function(response){
			$scope.prmkspktdetail.jenisGerakanPanduText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_KAPAL', value:$scope.prmkspktdetail.jenisKapal}, {}, function(response){
			$scope.prmkspktdetail.jenisKapalText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_PELAYARAN', value:$scope.prmkspktdetail.jenisPelayaran}, {}, function(response){
			$scope.prmkspktdetail.jenisPelayaranText = response[0].caption;
		});
		AppParamValue.get({nama:'SIFAT_KESEPAKATAN', value:$scope.prmkspktdetail.sifat}, {}, function(response){
			$scope.prmkspktdetail.sifatText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_NEGARA', value:$scope.prmkspktdetail.bendera}, {}, function(response){
			$scope.prmkspktdetail.benderaText = response[0].caption;
		});
		AppParamValue.get({nama:'KUNJUNGAN', value:$scope.prmkspktdetail.sifatKunjungan}, {}, function(response){
			$scope.prmkspktdetail.sifatKunjunganText = response[0].caption;
		});
		AppParamValue.get({nama:'JENIS_KEG_TUNDA', value:$scope.prmkspktdetail.jenisTunda}, {}, function(response){
			$scope.prmkspktdetail.jenisTundaText = response[0].caption;
		});
		$scope.paramKesepakatanArray.push($scope.prmkspktdetail);
		$scope.isActive = false;
		
		if($scope.paramKesepakatanArray.length > 0){
		  $scope.disabledFlagbtn = true;
		}
		$('#parameterModal').modal('hide');
  	}


  	$scope.deleteParameterDetailView = function(i){
		$scope.paramKesepakatanArray.splice(i, 1);	
  	}

  	$scope.updateParameterDetail = function(id){   
		var dataEdit = $scope.paramKesepakatanArray;
	
		for (var i = 0; i < dataEdit.length; i++) {
	 		$scope.prmkspktdetailUpdate = dataEdit[id];
	  		break;
		}
  	}

  	$scope.saveMasaTambatDetail = function(){
		$scope.prmkspktdetailUpdate.jenisPelayaranText = $scope.jenisPelayaranText;
		$scope.prmkspktdetailUpdate.jenisPelayaran = $scope.prmkspktdetailUpdate.jenisPelayaran;
  	}  

}]);
