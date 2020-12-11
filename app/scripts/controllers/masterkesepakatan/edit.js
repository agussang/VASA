'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterKesepakatanNewCtrl
 * @description
 * # MasterKesepakatanNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterKesepakatanEditCtrl',['$scope','$location','$window','$modal','$rootScope', '$routeParams','$filter','$timeout','MasaTambatAdd','ItemMasaTambatAdd','Notification','AppParam','MdmDermagaSearchByKode','MdmDermagaPerJasa','MdmKapalSearchByName','MdmPelangganSearch','ParamKesepakatanView','SearchAlatApung','AppParamValue','ParamKesepakatanUpdate','ParamKesepakatanItemDelete','ParamKesepakatanItemDetail','ParamKesepakatanItemAdd','ParamKesepakatanItemUpdate','AlatApungByNoReg','MdmKapalByKode','MdmPelangganSearchByKode','MdmDermagaShow','AppParamAllItem','ParamKesepakatanUpdateApproval',function ($scope,$location,$window,$modal,$rootScope,$routeParams,$filter,$timeout,MasaTambatAdd,ItemMasaTambatAdd,Notification,AppParam,MdmDermagaSearchByKode,MdmDermagaPerJasa,MdmKapalSearchByName,MdmPelangganSearch,ParamKesepakatanView,SearchAlatApung,AppParamValue,ParamKesepakatanUpdate,ParamKesepakatanItemDelete,ParamKesepakatanItemDetail,ParamKesepakatanItemAdd,ParamKesepakatanItemUpdate,AlatApungByNoReg,MdmKapalByKode,MdmPelangganSearchByKode,MdmDermagaShow,AppParamAllItem,ParamKesepakatanUpdateApproval) {
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
	$scope.prmkspkt.berlakuDi = '';
	$scope.tglMulai = new Date();
	$scope.tglSelesai = new Date();
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
	$scope.splitDate = function(date){
		var splitDate = date.split('T');
		return new Date(splitDate[0]);
	}

  	ParamKesepakatanView.get({id:$routeParams.id},function(response){
		if(response.status !== '500'){
			$scope.prmkspkt.isDermaga = response.isDermaga;
			$scope.prmkspkt.isGt = response.isGt;
			$scope.prmkspkt.isJenisPelayaran = response.isJenisPelayaran;
			$scope.prmkspkt.isKodeKapal = response.isKodeKapal;
			$scope.prmkspkt.isMinUtility = response.isMinUtility;
			$scope.prmkspkt.isPelanggan = response.isPelanggan;
			$scope.prmkspkt.isValuta = response.isValuta;
			$scope.prmkspkt.isCustom = response.isCustom;
			$scope.prmkspkt.isJenisGerakanPandu = response.isJenisGerakanPandu;
			$scope.prmkspkt.isJenisKapal = response.isJenisKapal;
			$scope.prmkspkt.isJenisPandu = response.isJenisPandu;
			$scope.prmkspkt.isKapalNegara = response.isKapalNegara;
			$scope.prmkspkt.isKapalTunda = response.isKapalTunda;
			$scope.prmkspkt.isLokasiAwal = response.isLokasiAwal;
			$scope.prmkspkt.isLokasiTujuan = response.isLokasiTujuan;
			$scope.prmkspkt.isBendera = response.isBendera;
			$scope.prmkspkt.isLoa = response.isLoa;
			$scope.prmkspkt.isSifatKunjungan = response.isSifatKunjungan;
			$scope.prmkspkt.isJenisTunda = response.isJenisTunda;
			$scope.prmkspkt.jasa = ''+response.jasa;
			$scope.prmkspkt.kodeKesepakatan = response.kodeKesepakatan;
			if(response.berlakuDi == '' || response.berlakuDi == null){
				$scope.prmkspkt.berlakuDi = '';
			}else{
				$scope.prmkspkt.berlakuDi = ''+response.berlakuDi;
			}			

			AppParamValue.get({nama:'JASA', value:response.jasa}, {}, function(response){
				$scope.prmkspkt.jasaText = response[0].caption;
			});

			$scope.tglSelesai = $scope.splitDate(response.tglSelesai);
			$scope.tglMulai =  $scope.splitDate(response.tglMulai);	
			$scope.paramKesepakatanArray = response.newDetails;	
		}
  	});
	//validasi dermaga
  	$scope.checkValue = function(value) {
		valueField = value;
  	}

  	$scope.validationLookupDermaga = function(){
		if(valueField !== $scope.prmkspktdetail.dermaga){
	  		if(typeof $scope.prmkspktdetail.dermaga != 'object'){
				$scope.setNotification  = {
		  			type  : 'warning',
		  			message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
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
		  type  : 'warning',
		  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
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
		  type  : 'warning',
		  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-001</b>'
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
		  type  : 'warning',
		  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALREA-009</b>'
		};
		Notification.setNotification($scope.setNotification);
		$scope.prmkspktdetail.kapalTunda = '';
	  }
	}
  }

	$scope.openAdd= function(){
		$scope.prmkspktdetail = {};
	}

	// function save  
	$scope.submit = function(){		


  		$scope.buttonDisabled = true;
		for (var y = 0; y < $scope.paramKesepakatanArray.length; y++) {
			$scope.updateItemKspt= $scope.paramKesepakatanArray[y];
			if($scope.updateItemKspt.valuta == 'null'){
				$scope.updateItemKspt.valuta = '';
			}
			if($scope.updateItemKspt.jenisKapal == 'null'){
				$scope.updateItemKspt.jenisKapal = '';
			}
			if($scope.updateItemKspt.id){   
				ParamKesepakatanItemUpdate.update({id:$scope.updateItemKspt.id},$scope.updateItemKspt,function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});       
			}

			if(!$scope.updateItemKspt.id){
				$scope.updateItemKspt.idKspSpec = $routeParams.id;
				ParamKesepakatanItemAdd.save($scope.updateItemKspt,function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			}
		}

		$timeout(function() {
			ParamKesepakatanView.get({id:$routeParams.id},function(response){
				if(response.status != '500'){
					$scope.prmkspkt.newDetails = response.newDetails;
					$scope.KesepakatanSpecSubmit();
				}
			});
		}, 3000);
	}



    	$scope.submitApproval = function(){		
  		$scope.buttonDisabled = true;
		for (var y = 0; y < $scope.paramKesepakatanArray.length; y++) {
			$scope.updateItemKspt= $scope.paramKesepakatanArray[y];
			if($scope.updateItemKspt.valuta == 'null'){
				$scope.updateItemKspt.valuta = '';
			}
			if($scope.updateItemKspt.jenisKapal == 'null'){
				$scope.updateItemKspt.jenisKapal = '';
			}
			if($scope.updateItemKspt.id){   
				ParamKesepakatanItemUpdate.update({id:$scope.updateItemKspt.id},$scope.updateItemKspt,function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});       
			}

			if(!$scope.updateItemKspt.id){
				$scope.updateItemKspt.idKspSpec = $routeParams.id;
				ParamKesepakatanItemAdd.save($scope.updateItemKspt,function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			}
		}

		$timeout(function() {
			ParamKesepakatanView.get({id:$routeParams.id},function(response){
				if(response.status != '500'){
					$scope.prmkspkt.newDetails = response.newDetails;
					$scope.KesepakatanSpecSubmitApproval();
				}
			});
		}, 3000);
	}


	$scope.KesepakatanSpecSubmitApproval = function(){		
		$scope.prmkspkt.tglMulai = $filter('date')($scope.tglMulai, 'yyyy-MM-ddTHH:mm:ss');
  		$scope.prmkspkt.tglSelesai = $filter('date')($scope.tglSelesai, 'yyyy-MM-ddTHH:mm:ss');
  		ParamKesepakatanUpdateApproval.update({id:$routeParams.id},$scope.prmkspkt,function(response){
			if(response.status != '500'){
				$scope.paramKesepakatanArray = response.newDetails;
				$scope.showLoader = false;
				$scope.setNotification  = {
						type  : "success",
						message : "<b>Update Detail Data Berhasil.</b>"
					};
				Notification.setNotification($scope.setNotification);
				// $timeout(function() {
				// 	$window.location.reload();
				// }, 2000);
				ParamKesepakatanView.get({id:$routeParams.id},function(response){
					$scope.paramKesepakatanArray = response.newDetails;
					$scope.showLoader = false;
					$scope.setNotification  = {
						type  : "success",
						message : "<b>Update Detail Data Berhasil.</b>"
					};
					Notification.setNotification($scope.setNotification);
					// $timeout(function() {
					// 	$window.location.reload();
					// }, 2000);
				},function(response1){
					alert("Cannot get list");
				});
			}		
  		},function(){
			$scope.setNotification  = {
				type  : "warning",
				message : "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
        	$scope.showLoader = false;
		});
	}


	$scope.KesepakatanSpecSubmit = function(){		
		$scope.prmkspkt.tglMulai = $filter('date')($scope.tglMulai, 'yyyy-MM-ddTHH:mm:ss');
  		$scope.prmkspkt.tglSelesai = $filter('date')($scope.tglSelesai, 'yyyy-MM-ddTHH:mm:ss');
  		ParamKesepakatanUpdate.update({id:$routeParams.id},$scope.prmkspkt,function(response){
			if(response.status != '500'){
				$scope.paramKesepakatanArray = response.newDetails;
				$scope.showLoader = false;
				$scope.setNotification  = {
						type  : "success",
						message : "<b>Update Detail Data Berhasil.</b>"
					};
				Notification.setNotification($scope.setNotification);
				// $timeout(function() {
				// 	$window.location.reload();
				// }, 2000);
				ParamKesepakatanView.get({id:$routeParams.id},function(response){
					$scope.paramKesepakatanArray = response.newDetails;
					$scope.showLoader = false;
					$scope.setNotification  = {
						type  : "success",
						message : "<b>Update Detail Data Berhasil.</b>"
					};
					Notification.setNotification($scope.setNotification);
					// $timeout(function() {
					// 	$window.location.reload();
					// }, 2000);
				},function(response1){
					alert("Cannot get list");
				});
			}		
  		},function(){
			$scope.setNotification  = {
				type  : "warning",
				message : "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
        	$scope.showLoader = false;
		});
	}
  // function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
 	}

  //masa tambat detail
	$scope.submitKesepakatanDetail = function(){
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

	$scope.submitKesepakatanDetailEdit = function(){
		if($scope.prmkspktdetail.dermaga != null){
			if(typeof $scope.prmkspktdetail.dermaga == 'object'){
				$scope.prmkspktdetail.dermagaText = $scope.prmkspktdetail.dermaga.mdmgNama;
		  		$scope.prmkspktdetail.dermaga = $scope.prmkspktdetail.dermaga.mdmgKode; 
			}else{
				$scope.prmkspktdetail.dermaga = $scope.prmkspktdetail.kodeDermaga;
			}
		}
		if($scope.prmkspktdetail.kapalTunda != null){
			if(typeof $scope.prmkspktdetail.kapalTunda == 'object'){
				$scope.prmkspktdetail.kapalTundaText = $scope.prmkspktdetail.kapalTunda.nama;
		  		$scope.prmkspktdetail.kapalTunda = $scope.prmkspktdetail.kapalTunda.noRegistrasi;
			}else{
				$scope.prmkspktdetail.kapalTunda = $scope.prmkspktdetail.kodeKapalTunda
			}
		}
		if($scope.prmkspktdetail.kodeKapal != null){
			if(typeof $scope.prmkspktdetail.kapal == 'object'){
				$scope.prmkspktdetail.kodeKapal = $scope.prmkspktdetail.kapal.mkplKode;
		  		$scope.prmkspktdetail.kapal = $scope.prmkspktdetail.kapal.mkplNama;
			}
		}
		if($scope.prmkspktdetail.lokasiAwal != null){
			if(typeof $scope.prmkspktdetail.lokasiAwal == 'object'){
				$scope.prmkspktdetail.lokasiAwalText = $scope.prmkspktdetail.lokasiAwal.mdmgNama;
		  		$scope.prmkspktdetail.lokasiAwal = $scope.prmkspktdetail.lokasiAwal.mdmgKode;
			}else{
				$scope.prmkspktdetail.lokasiAwal = $scope.prmkspktdetail.kodeLokasiAwal
			}
		}
		if($scope.prmkspktdetail.lokasiTujuan != null){
			if(typeof $scope.prmkspktdetail.lokasiTujuan == 'object'){
				$scope.prmkspktdetail.lokasiTujuanText = $scope.prmkspktdetail.lokasiTujuan.mdmgNama;
		  		$scope.prmkspktdetail.lokasiTujuan = $scope.prmkspktdetail.lokasiTujuan.mdmgKode;
			}else{
				$scope.prmkspktdetail.lokasiTujuan = $scope.prmkspktdetail.kodeLokasiTujuan
			}
		}
		if($scope.prmkspktdetail.pelanggan != null){
			if(typeof $scope.prmkspktdetail.pelanggan == 'object'){
				$scope.prmkspktdetail.pelangganText = $scope.prmkspktdetail.pelanggan.mplgNama;
		  		$scope.prmkspktdetail.pelanggan = $scope.prmkspktdetail.pelanggan.mplgKode; 
			}else{
				$scope.prmkspktdetail.pelanggan = $scope.prmkspktdetail.kodePelanggan; 
			}
		}
		if($scope.prmkspktdetail.jenisPandu != null){
			AppParamValue.get({nama:'JENIS_PANDU', value:$scope.prmkspktdetail.jenisPandu}, {}, function(response){
				$scope.prmkspktdetail.jenisPanduText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.jenisGerakanPandu != null){
			AppParamValue.get({nama:'JENIS_GERAKAN', value:$scope.prmkspktdetail.jenisGerakanPandu}, {}, function(response){
				$scope.prmkspktdetail.jenisGerakanPanduText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.jenisKapal != null){
			AppParamValue.get({nama:'JENIS_KAPAL', value:$scope.prmkspktdetail.jenisKapal}, {}, function(response){
				$scope.prmkspktdetail.jenisKapalText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.jenisPelayaran != null){
			AppParamValue.get({nama:'JENIS_PELAYARAN', value:$scope.prmkspktdetail.jenisPelayaran}, {}, function(response){
				$scope.prmkspktdetail.jenisPelayaranText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.sifat != null){
			AppParamValue.get({nama:'SIFAT_KESEPAKATAN', value:$scope.prmkspktdetail.sifat}, {}, function(response){
				$scope.prmkspktdetail.sifatText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.bendera != null){
			AppParamValue.get({nama:'JENIS_NEGARA', value:$scope.prmkspktdetail.bendera}, {}, function(response){
				$scope.prmkspktdetail.benderaText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.sifatKunjungan != null){
			AppParamValue.get({nama:'KUNJUNGAN', value:$scope.prmkspktdetail.sifatKunjungan}, {}, function(response){
				$scope.prmkspktdetail.sifatKunjunganText = response[0].caption;
			});
		}
		if($scope.prmkspktdetail.jenisTunda != null){
			AppParamValue.get({nama:'JENIS_KEG_TUNDA', value:$scope.prmkspktdetail.jenisTunda}, {}, function(response){
				$scope.prmkspktdetail.jenisTundaText = response[0].caption;
			});
		}		
		$('#editDetailParamModal').modal('hide');
	}

	$scope.deleteParameterDetailView = function(i){
		$scope.paramKesepakatanArray.splice(i, 1);  
	}

	$scope.deleteParameterDetail= function(idDetail,i){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			ParamKesepakatanItemDelete.delete({id:idDetail},function(response){
				if(response.status !== '500'){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.paramKesepakatanArray.splice(i, 1);
				}else{
					$scope.setNotification  = {
						type  : "danger",
						message : "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}
			},function(){
				$scope.setNotification  = {
					type  : "danger",
					message : "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			});
		}
	}

	$scope.changeValue = function(val){
		if(val != '3' || val != '2'){
			$scope.prmkspktdetail.valutaTarif = '';
		}
	}

	$scope.updateParameterDetail = function(idItem){  
		var dataEdit = $scope.paramKesepakatanArray;
		for (var i = 0; i < dataEdit.length; i++) {
			if(dataEdit[i].id == idItem){
		 		$scope.prmkspktdetail = dataEdit[i];		 		
		 		$scope.prmkspktdetail.jenisGerakanPandu = ''+$scope.prmkspktdetail.jenisGerakanPandu;
				$scope.prmkspktdetail.jenisPandu = ''+$scope.prmkspktdetail.jenisPandu;
				$scope.prmkspktdetail.jenisKapal = ''+$scope.prmkspktdetail.jenisKapal;
				$scope.prmkspktdetail.sifat = ''+$scope.prmkspktdetail.sifat;
				$scope.prmkspktdetail.valuta = ''+$scope.prmkspktdetail.valuta;
				$scope.prmkspktdetail.jenisPelayaran = ''+$scope.prmkspktdetail.jenisPelayaran;
				$scope.prmkspktdetail.bendera = ''+$scope.prmkspktdetail.bendera;
				$scope.prmkspktdetail.sifatKunjungan = ''+$scope.prmkspktdetail.sifatKunjungan;
				$scope.prmkspktdetail.jenisTunda = ''+$scope.prmkspktdetail.jenisTunda;
				$scope.prmkspktdetail.roundingJamTunda = ''+$scope.prmkspktdetail.roundingJamTunda;

				if($scope.prmkspktdetail.valuta == 'null'){
					$scope.prmkspktdetail.valuta ='';
				}
				if($scope.prmkspktdetail.kapalTunda != null){
					AlatApungByNoReg.get({noRegistrasi:$scope.prmkspktdetail.kapalTunda},function(response){
						$scope.prmkspktdetail.kodeKapalTunda = response.content[0].noRegistrasi;
						$scope.prmkspktdetail.kapalTunda = response.content[0].nama;
						$scope.prmkspktdetail.kapalTundaText = response.content[0].nama;
					});
				}
				if($scope.prmkspktdetail.kodeKapal != null){
					MdmKapalByKode.get({kode:$scope.prmkspktdetail.kodeKapal},function(response){
						$scope.prmkspktdetail.kodeKapal = response.mkplKode;
						$scope.prmkspktdetail.kapal = response.mkplNama;
					});
				}
				if($scope.prmkspktdetail.pelanggan != null){
					MdmPelangganSearchByKode.get({kode:$scope.prmkspktdetail.pelanggan}, function(response){
						$scope.prmkspktdetail.kodePelanggan = response.mplgKode;
						$scope.prmkspktdetail.pelanggan = response.mplgNama;
					});				
				}
				if($scope.prmkspktdetail.dermaga != null){
					MdmDermagaSearchByKode.get({kode: $scope.prmkspktdetail.dermaga,kodeTerminal : localStorage.getItem('kodeTerminal'),limit: '10'}, function(response){
						$scope.prmkspktdetail.kodeDermaga = response[0].mdmgKode;
						$scope.prmkspktdetail.dermaga = response[0].mdmgNama;
						$scope.prmkspktdetail.dermagaText = response[0].mdmgNama;
					});
				}
				if($scope.prmkspktdetail.lokasiAwal != null){
					MdmDermagaSearchByKode.get({kode: $scope.prmkspktdetail.lokasiAwal,kodeTerminal : localStorage.getItem('kodeTerminal'),limit: '10'}, function(response){
						$scope.prmkspktdetail.kodeLokasiAwal = response[0].mdmgKode;
						$scope.prmkspktdetail.lokasiAwal = response[0].mdmgNama;
						$scope.prmkspktdetail.lokasiAwalText = response[0].mdmgNama;
					});
				}
				if($scope.prmkspktdetail.lokasiTujuan != null){
					MdmDermagaSearchByKode.get({kode: $scope.prmkspktdetail.lokasiTujuan,kodeTerminal : localStorage.getItem('kodeTerminal'),limit: '10'}, function(response){
						$scope.prmkspktdetail.kodeLokasiTujuan = response[0].mdmgKode;
						$scope.prmkspktdetail.lokasiTujuan = response[0].mdmgNama;
						$scope.prmkspktdetail.lokasiTujuanText = response[0].mdmgNama;
					});
				}
		  		break;				
			}
		}
	}

	$scope.saveMasaTambatDetail = function(){
		$scope.prmkspktdetailUpdate.jenisPelayaranText = $scope.jenisPelayaranText;
		$scope.prmkspktdetailUpdate.jenisPelayaran = $scope.prmkspktdetailUpdate.jenisPelayaran;
	}  

}]);
