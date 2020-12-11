'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapannewCtrl
 * @description
 * # TransaksiPenetapannewCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
	 .controller('TransaksiPenetapannewCtrl', ['$scope', '$filter', '$routeParams', '$location', 'AppParam', 'PermohonanDetailByPpk', 'PermohonanLabuh', 'PenetapanLabuh', 'MdmDermagaJasa', 'MdmDermagaPerJasa', 'UserRole', 'LoadingScreen', 'MdmDermagaSearchByKode', 'SearchSDMKapal', 'SearchSDMKapalByCallSign', 'TipeEskalasiList', 'PenetapanTambatByPpkJasa', 'TipeEskalasi', function ($scope, $filter, $routeParams, $location, AppParam, PermohonanDetailByPpk, PermohonanLabuh, PenetapanLabuh, MdmDermagaJasa, MdmDermagaPerJasa, UserRole, LoadingScreen, MdmDermagaSearchByKode, SearchSDMKapal, SearchSDMKapalByCallSign, TipeEskalasiList, PenetapanTambatByPpkJasa,TipeEskalasi) {
  LoadingScreen.show();
  UserRole.checkJasa();
  $scope.penetapanLabuh = 'views/transaksi/penetapanlabuh.html';
	$scope.penetapanTambat = 'views/transaksi/penetapantambat.html';
	$scope.penetapanPandu = 'views/transaksi/penetapanpandu.html';
	$scope.penetapanTunda = 'views/transaksi/penetapantunda.html';
	$scope.penetapanAirKapal = 'views/transaksi/penetapanairkapal.html';
	$scope.dataUmum = {};
	$scope.labuhItems = [];
	$scope.tambatItems = [];
	$scope.tundaItems = [];
	$scope.panduItems = [];
	$scope.airItems = [];
	$scope.revisiForm = false;
	 //added by cahyo in 03/12/2018 for adding is user regional or not
	 $scope.isRegional = (localStorage.getItem('statusUser') === 'regional');
	 $scope.kodeTerminalN = null;
	 $scope.noPpkJasaTambat = null;
	//end of add


   //request dari user bila ada superVerif maka diangap user regional
	if (localStorage.getItem('superVerif') == 1) {
				 $scope.isRegional =true;
	}

	// options for pf-datepicker
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.optionReadOnly = {
		enableOnReadonly : false
	};

  $scope.getTipeEskalasi = function(){
    TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
      TipeEskalasi.setTipeEskalasi(response.content);
    });
  };

  $scope.getTipeEskalasi();

	$scope.greenBtn = function() {
		$location.path('/transaksi/penetapan');
	};

	// PermohonanLabuh.get(function(response){
	// 	console.log(response);
	// });

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

	//get parameter satuan
	AppParam.get({nama:'SATUAN_AIR_KAPAL'},function(response){
		$scope.satuanAirKapal = response.content;
	});

	//get asal dermaga tambat
	AppParam.get({nama:'ASAL_DERMAGA_TAMBAT'},function(response){
		$scope.asalDermagaTambat = response.content;
	});

	/*Get Permohonan by id*/
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
		  	if(temp.details[0].jasa[i].statusRevisi != 10){
				if(namaJasa === 'labuh'){
					$scope.labuhItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'tambat'){
					$scope.tambatItems.push(temp.details[0].jasa[i]);
					$scope.kodeTerminalN = temp.details[0].jasa[i].kodeTerminal;
					$scope.noPpkJasaTambat = temp.details[0].jasa[i].noPpkJasa;
				}else if(namaJasa === 'tunda'){
					$scope.tundaItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'pandu'){
					$scope.panduItems.push(temp.details[0].jasa[i]);
				}else if(namaJasa === 'air_kapal'){
					$scope.airItems.push(temp.details[0].jasa[i]);
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
		if($scope.dataUmum.details[0].status === 'P'){
			$scope.revisiForm = false;
		}else{
			$scope.revisiForm = true;
		}
		//add by cahyo for getting kode terminal from ptp tambat
		//still not optimized because is repeated 6 times in extended controller..
		//many room for improvement..
		PenetapanTambatByPpkJasa.get({ ppkjasa: $scope.noPpkJasaTambat }, function (response) {
			var item = JSON.parse(JSON.stringify(response));
			$scope.kodeTerminalN = item.kodeTerminal;
			// console.log(item.kodeTerminal);
		});
		//end of add
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

	/*$scope.getListOfSDMKapal = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				SearchSDMKapal.get({
					nama: value,
					limit: '5'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
						response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ')';
					});
				});
			});
		}
	};*/

	$scope.getListOfSDMKapal = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				SearchSDMKapalByCallSign.get({
					callSign: value,
			  		limit: '10'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
						response.callSign = response.callSign?response.callSign:'-';
		                response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
					});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				SearchSDMKapal.get({
					nama: value,
			  		limit: '10'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
						response.callSign = response.callSign?response.callSign:'-';
		                response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ', CS: '+response.callSign+')';
					});
				});
			});
		}
	};

	 //add by cahyo for checking if it terminal or not terminal
	 $scope.isTerminal = function () {
		 //console.log(localStorage.getItem('kodeTerminal') + " = " + $scope.kodeTerminalN);
		 if ($scope.kodeTerminalN){
			 return localStorage.getItem('kodeTerminalBaru') == $scope.kodeTerminalN;
		 }else{
			 return true;
		 } 
		 
		 //return true;
		//  console.log(kodeTerminal === localStorage.getItem('kodeTerminal'));
		//  return kodeTerminal === localStorage.getItem('kodeTerminal');
	 }

		 $scope.isRegionalByPass = function () {
			 //for bypass regional even its not regional
			 //bypass only if theres is parameter cabang super verif 
			 if (localStorage.getItem('superVerif') == 1) {
				 //return false;
				 $scope.isRegional =true;
				 return false;
			 } else {
				 return $scope.isRegional;
			 }
		 }
	//end off add by cahyo
}]);
