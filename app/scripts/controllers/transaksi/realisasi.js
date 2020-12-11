'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RealisasiPermohonanCtrl
 * @description
 * # RealisasiPermohonanCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
	 .controller('RealisasiPermohonanCtrl', ['$scope', '$rootScope', '$routeParams', '$filter', 'AppParam', '$location', '$window', 'PermohonanDetail', 'PenetapanDetail', 'PenetapanLabuh', 'MdmDermagaJasa', 'MdmDermagaPerJasa', 'UserRole', 'SearchSDMKapal', 'SearchSDMKapalByCallSign', 'SearchAlatApung', 'LoadingScreen', 'MdmKapalSearchByName', 'JasaTunda', 'MdmDermagaSearchByKode', 'DetailByPpk1', 'Databinding', 'MdmKapalByKode', 'PermohonanList', 'MonitoringDetail', 'TipeEskalasiList', 'TipeEskalasi', 'BindEskalasi', 'Notification','RealisasiTambatDetailbyPpkJasa','KapalBebasPTList',
		 function ($scope, $rootScope, $routeParams, $filter, AppParam, $location, $window, PermohonanDetail, PenetapanDetail, PenetapanLabuh, MdmDermagaJasa, MdmDermagaPerJasa, UserRole, SearchSDMKapal, SearchSDMKapalByCallSign, SearchAlatApung, LoadingScreen, MdmKapalSearchByName, JasaTunda, MdmDermagaSearchByKode, DetailByPpk1, Databinding, MdmKapalByKode, PermohonanList, MonitoringDetail, TipeEskalasiList, TipeEskalasi, BindEskalasi, Notification, RealisasiTambatDetailbyPpkJasa,KapalBebasPTList) {

    LoadingScreen.show();
    UserRole.checkJasa();
	var labuhTab = true;
	var tambatTab = true;
	var panduTab = true;
	var tundaTab = true;
	var airTab = true;
	$rootScope.disabledTglKeluarLabuh = true;
	$rootScope.adaDataLabuh = false;
	$scope.labuh = [];
	$scope.tambat = [];
	$scope.tunda = [];
	$scope.panduMasuk = [];
	$scope.panduKeluar =[];
	$scope.panduPindah = [];
	$scope.matchMasuk = true;
	$scope.matchKeluar = true;
	$scope.rekomendasi = [];
	$scope.disabledReaLokasiTambat = true;
	$scope.dataLabuhPpk = [];
	$rootScope.hapusLastline = false;
	$scope.jasaPerPtpD = [];
	$scope.jasaPerPtpC = [];
	$scope.jasaPerReaR = [];
	$scope.jasaPerReaT = [];
	$scope.jasaPerPmhN = [];
	$scope.jasaPerPmhP = [];
	//added by cahyo in 03/12/2018 for adding is user regional or not
	$scope.isRegional = (localStorage.getItem('statusUser') === 'regional');
	$scope.kodeTerminalN = null;
	$scope.noPpkJasaTambat = null;
	//end of add
    
   //request dari user bila ada superVerif maka diangap user regional
	if (localStorage.getItem('superVerif') == 1) {
				 $scope.isRegional =true;
	}

	var userRoleData = JSON.parse(localStorage.getItem('userRole'));
	if(userRoleData.jasa.flagTunda) {
		document.getElementById("tundaTab").style.display = "block";
	}
	//document.getElementById("tundaTab").style.display = "block";

    $scope.revisiForm = false;
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true
	};

	$scope.valueField = '';
	$scope.checkValue = function(value){
		$scope.valueField = value;
	}

	$scope.getTipeEskalasi = function(){
		TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
			$scope.tooltipInfoVALREA026 = TipeEskalasi.getTipeEskalasi('VALREA026').valDesc;
			$scope.tooltipInfoVALREA025 = TipeEskalasi.getTipeEskalasi('VALREA025').valDesc;
		});
	};

  	$scope.getTipeEskalasi();

	// $scope.$on('eventFromEskalasi', function (event, dataEsc, item) {
	// 	//console.log("kesini123");
	// 	// if(dataEsc.valCode==='VALREA025'){ 
	// 	// 	console.log(event)
	// 	// 	console.log(dataEsc)
	// 	// 	console.log(item)
	// 	// }
	// });

	// autocomplete kapal
	$scope.getListKapal = function(value) {
	  	if (value) {
			return new Promise(function(resolve, reject) {
			  	MdmKapalSearchByName.get({
					"nama": value,
					"limit": 150
			  	}, function(response) {
					resolve(response);
			  	});
			});
	  	}
	};

	// autocomplete or typeahead
	$scope.getListOfLokasiLabuh = function(value) {
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

	// $scope.getListOfSDMKapal = function(value) {
	// 	if (value) {
	// 		return new Promise(function(resolve, reject) {
	// 			SearchSDMKapal.get({
	// 		  		nama: value,
	// 		  		limit: '5'
	// 		  	}, function(response) {
	// 		  		resolve(response);
	// 	            response.forEach(function (response) {
	// 	                response.mpegNamaNip = response.mpegNama +' ('+response.mpegNip + ')';
	// 	            });
	// 		  	});
	// 		});
	// 	}
	// };

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

	$scope.getListOfAlatApung = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				SearchAlatApung.get({
			  		nama: value.toUpperCase()
			  	}, function(response) {
			  		resolve(response);
			  	});
			});
		}
	};

	$scope.getListOfAlatApungPandu = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				SearchAlatApung.get({
			  		nama: value.toUpperCase(),
			  		jenis : 2
			  	}, function(response) {
			  		resolve(response);
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

	$scope.setDisabledTglKeluarLabuh = function(){
		DetailByPpk1.get({ppk1 : $routeParams.ppk1},function(response){
    
			var reaJasa = $filter('orderBy')(response.detailPmh.reaJasa,'-noPpkJasa');	
			var jasaTambatTersedia = [];
			/*untuk jasa tanpa pandu hanya tunda*/
			var jasaPanduTersedia = [];
			/**/
			for (var i = 0; i < reaJasa.length; i++) {
				if (reaJasa[i].nama==='epb_tambat'){
					jasaTambatTersedia.push(reaJasa[i]);
				}
				/*untuk jasa tanpa pandu hanya tunda*/
				if (reaJasa[i].nama==='epb_pandu'){
					jasaTambatTersedia.push(reaJasa[i]);
				}
				/**/					
			}
			jasaTambatTersedia = $filter('orderBy')(JSON.parse(JSON.stringify(jasaTambatTersedia)), '-create');

			KapalBebasPTList.get({
				kodeKapal :response.permohonan.kodeKapal
			},function (argument) {
				if(argument.content.length > 0){
				    $rootScope.disabledTglKeluarLabuh = false;
				   	return false;
				}				    	
			});	
			for (var i = 0; i < reaJasa.length; i++) {
				if(localStorage.validasiWajibPanduTunda=='1'){					
					if(reaJasa[i].nama==='epb_air_kapal'){
						if(jasaTambatTersedia.length > 0){
							if(jasaTambatTersedia[0].tglSelesai == null){
								$rootScope.disabledTglKeluarLabuh = true;
							}else{ 
								$rootScope.disabledTglKeluarLabuh = false;		
							}							
							break;
						}else{ 
							$rootScope.disabledTglKeluarLabuh = false;
						}
						/* validasi untuk air kapal pipa dan tandon
						if(reaJasa[i].alatIsi == 1 || reaJasa[i].alatIsi == 4){
							if(jasaTersedia.indexOf('epb_tambat') == -1){
								$rootScope.disabledTglKeluarLabuh = true;
							}else{
								$rootScope.disabledTglKeluarLabuh = false;
							}
							break;
						}*/
					}
					/*untuk jasa tanpa pandu hanya tunda*/
					if(reaJasa[i].nama==='epb_tunda'){
						if(jasaPanduTersedia.length == 0){
							$rootScope.disabledTglKeluarLabuh = false;
						}else{
							$rootScope.disabledTglKeluarLabuh = true;
						}
					}
					/**/
					if($scope.dataUmum.jenisKapal == 'KPLTONKANG' || $scope.dataUmum.gtKapal < 500){
						$rootScope.disabledTglKeluarLabuh = false;
						break;
					}
					if(reaJasa[i].nama==='epb_pandu' && reaJasa[i].jenisPandu != '1')	{
						$rootScope.disabledTglKeluarLabuh = false;
						break;
					}
					if(reaJasa[i].nama==='epb_pandu' && reaJasa[i].statusSiklusPandu != '1')	{
						$rootScope.disabledTglKeluarLabuh = false;
						break;
					}
					if(reaJasa[i].nama==='epb_pandu' && reaJasa[i].jenisGerakan == '3' && reaJasa[i].jenisPandu == '1'){							
						$rootScope.disabledTglKeluarLabuh = false;
						break;
					}								
				}else{
					if(reaJasa[i].nama==='epb_tambat'){
						if(reaJasa[i].tglSelesai != null){
							$rootScope.disabledTglKeluarLabuh = false;
						}else{
							$rootScope.disabledTglKeluarLabuh = true;		
						}							
						break;
					}
					if(reaJasa[i].nama==='epb_air_kapal'){
						if(jasaTambatTersedia.length > 0){
							if(jasaTambatTersedia[0].tglSelesai == null){
								$rootScope.disabledTglKeluarLabuh = true;
							}else{ 
								$rootScope.disabledTglKeluarLabuh = false;		
							}							
							break;
						}else{ 
							$rootScope.disabledTglKeluarLabuh = false;
						}
						/* validasi untuk air kapal pipa dan tandon
						if(reaJasa[i].alatIsi == 1 || reaJasa[i].alatIsi == 4){ 
							if(jasaTersedia.indexOf('epb_tambat') == -1){
								$rootScope.disabledTglKeluarLabuh = true;
							}else{
								$rootScope.disabledTglKeluarLabuh = false;
							}
							break;
						}else{
							$rootScope.disabledTglKeluarLabuh = false;
						}*/							
					}							
				}
			}
		});
		$scope.$watch(function () { return Databinding.getFirstValue(); }, function (newValue, oldValue) {
	        if (newValue !== oldValue){
	        	$rootScope.disabledTglKeluarLabuh = false;
	        }
	    });
	}
		
	$scope.setDisabledTglKeluarLabuh();

	$scope.cekDataLabuh = function(){ //VALREA-020 
		DetailByPpk1.get({ppk1 : $routeParams.ppk1},function(response){
			var reaJasa = $filter('orderBy')(response.detailPmh.reaJasa,'-noPpkJasa');	
			for (var i = 0; i < reaJasa.length; i++) {
				if(reaJasa[i].nama==='epb_labuh'){
					$scope.dataLabuhPpk = reaJasa[i];
					$rootScope.adaDataLabuh = true;
					break;
				}else{
					$rootScope.adaDataLabuh = false;
				}
			}
			$scope.$watch(function () { return $rootScope.adaDataLabuh; }, function (newValue, oldValue) {		        
		        $rootScope.adaDataLabuh = newValue;
		    });	
		});
			    
	};
	
	//$scope.cekDataLabuh();
	var ppkExist = [];

	var toTitleCase = function(str){
	    return str.replace(/\w\S*/g, function(txt){
	       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}

	$scope.setDataPandu = function(){		
		DetailByPpk1.get({ppk1 : $routeParams.ppk1},function(response){
			var reaJasa = $filter('orderBy')(response.detailPmh.reaJasa,'noPpkJasa');				
			for (var i = 0; i < reaJasa.length; i++) {
				if(reaJasa[i].nama==='epb_pandu'){
					switch(reaJasa[i].jenisGerakan) {
						case '1':
						    Databinding.setPanduMasuk(reaJasa[i]);
						    break;
						case '3':
						    Databinding.setPanduKeluar(reaJasa[i]);
						    break;
					}
				}
			}			
			
			var ptpJasa = $filter('orderBy')(response.detailPmh.ptpJasa,'noPpkJasa');
			for (var i = 0; i < ptpJasa.length; i++) {
				if(ptpJasa[i].status != 9){
					if(ptpJasa[i].status != 10){
						if (ptpJasa[i].nama == 'epb_labuh') {
							$scope.labuh.push(ptpJasa[i]);
						} else if (ptpJasa[i].nama == 'epb_tambat') {
							$scope.tambat.push(ptpJasa[i]);
						} else if (ptpJasa[i].nama === 'epb_tunda') {
							$scope.tunda.push(ptpJasa[i]);
						} else if (ptpJasa[i].nama === 'epb_pandu') {
							if(ptpJasa[i].jenisGerakan == '1'){
								$scope.panduMasuk.push(ptpJasa[i]);
							}else if(ptpJasa[i].jenisGerakan == '2'){
								$scope.panduPindah.push(ptpJasa[i]);
							}else if(ptpJasa[i].jenisGerakan == '3'){
								$scope.panduKeluar.push(ptpJasa[i]);
							}
						}
					}
				}			
			}

			for (var i = 0; i < $scope.statusSiklusPandu.length; i++) {
				$scope.statusSiklusPandu[i].rekomendasi = false;
				if($scope.labuh.length == 0){ /*tidak memiliki labuh*/
					if($scope.statusSiklusPandu[i].value == '4'){
			            $scope.statusSiklusPandu[i].rekomendasi = true;
			            $scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
		          	} 
		          	if($scope.panduMasuk.length > 0){ /*memiliki labuh dan pandu masuk*/
			            if($scope.statusSiklusPandu[i].value == '2'){
			              	$scope.statusSiklusPandu[i].rekomendasi = true;
			              	$scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
			            } 
		          	}else
		          	if($scope.panduKeluar.length > 0){ /*memiliki labuh dan pandu keluar*/
			            if($scope.statusSiklusPandu[i].value == '3'){
			              	$scope.statusSiklusPandu[i].rekomendasi = true;
			              	$scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
			            }
			        }
			        if($scope.panduPindah.length > 0){ /*memiliki labuh dan pandu pindah*/
						if($scope.statusSiklusPandu[i].value == '5'){
					        $scope.statusSiklusPandu[i].rekomendasi = true;
					        $scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
					    }	        	
			        }
				}else{ /*memiliki labuh*/
					if($scope.statusSiklusPandu[i].value == '1'){
			            $scope.statusSiklusPandu[i].rekomendasi = true;
			            $scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
			        }
			        if($scope.labuh.length > 0 && $scope.panduMasuk.length > 0 && $scope.panduKeluar.length > 0){ 
			        	if($scope.statusSiklusPandu[i].value == '1'){
				            $scope.statusSiklusPandu[i].rekomendasi = true;
				            $scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
				        }
			        }else
					if($scope.labuh.length > 0 && $scope.panduMasuk.length > 0){ /*memiliki labuh dan pandu masuk*/
			            if($scope.statusSiklusPandu[i].value == '2'){
			              	$scope.statusSiklusPandu[i].rekomendasi = true;
			              	$scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
			            } 
		          	}else
		          	if($scope.labuh.length > 0 && $scope.panduKeluar.length > 0){ /*memiliki labuh dan pandu keluar*/
			            if($scope.statusSiklusPandu[i].value == '3'){
			              	$scope.statusSiklusPandu[i].rekomendasi = true;
			              	$scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
			            }
			        }
			        if($scope.labuh.length > 0 && $scope.panduPindah.length > 0){ /*memiliki labuh dan pandu pindah*/
			        	/*for (var j = 0; j< $scope.panduPindah.length; j++) {
							if(($scope.panduPindah.jenisDermagaAsal == 'DOCKING' && $scope.panduPindah.jenisDermagaTujuan == 'DOCKING') || ($scope.panduPindah.jenisDermagaAsal == 'DOCKING' && $scope.panduPindah.jenisDermagaTujuan == 'AREALABUH') ){
								if($scope.statusSiklusPandu[i].value == '5'){
					              	$scope.statusSiklusPandu[i].rekomendasi = true;
					              	$scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
					            }
							}
						}*/
						if($scope.statusSiklusPandu[i].value == '5'){
					        $scope.statusSiklusPandu[i].rekomendasi = true;
					        $scope.rekomendasi.push($scope.statusSiklusPandu[i].value);
					    }	        	
			        }
				}
			}	
		});
	}
	//$scope.setDataPandu();

$scope.dataLevel = function(){
	PermohonanList.get({'noPpk1': $routeParams.ppk1},function(response){
		for (var j = 0; j < response.content[0].details.length; j++) {
			var ppk1 = response.content[0].details[j].noPpk1;
			var urutan = response.content[0].details[j].urutanPermohonan;
			MonitoringDetail.get({ppk1 : ppk1, urutan : urutan},function(response){
				var reaJasa = $filter('orderBy')(response.detailPmh.reaJasa,'noPpkJasa');				
				for (var i = 0; i < reaJasa.length; i++) {
					reaJasa[i].statusDetail = response.detailPmh.status;
					reaJasa[i].namaJasa = toTitleCase(reaJasa[i].nama.replace(/_/g,'').replace('epb',''));
					if (reaJasa[i].namaJasa.indexOf('Air') > -1) {
						var str = reaJasa[i].namaJasa;
						reaJasa[i].namaJasa = str.replace('Airkapal','Air Kapal');
					}

					if(reaJasa[i].jenisGerakan){
						var jns;
						switch(reaJasa[i].jenisGerakan) {
							case '1':
								jns = 'Masuk';
								reaJasa[i].namaJasa = reaJasa[i].namaJasa + ' ' + jns;
							break;
							case '2':
								jns = 'Pindah';
								reaJasa[i].namaJasa = reaJasa[i].namaJasa + ' ' + jns;
								break;
							case '3':
								jns = 'Keluar';
								reaJasa[i].namaJasa = reaJasa[i].namaJasa + ' ' + jns;
								break;
						}
					}

					if(reaJasa[i].status == 2){
						if (ppkExist.indexOf(reaJasa[i].noPpkJasa) === -1) {
							ppkExist.push(reaJasa[i].noPpkJasa);
		          			$scope.jasaPerReaT.push(reaJasa[i]);
		          		}
					}else if(reaJasa[i].status == 1){
						if (ppkExist.indexOf(reaJasa[i].noPpkJasa) === -1) {
							ppkExist.push(reaJasa[i].noPpkJasa);
		          			$scope.jasaPerReaR.push(reaJasa[i]);
		          		}
					}
				}

				var ptpJasa = $filter('orderBy')(response.detailPmh.ptpJasa,'noPpkJasa');
				for (var i = 0; i < ptpJasa.length; i++) {
					ptpJasa[i].statusDetail = response.detailPmh.status;
					ptpJasa[i].tglKonfirmasi = response.detailPmh.tglKonfirmasi;
					if(ptpJasa[i].status != 9){
						if(ptpJasa[i].status != 10){
							ptpJasa[i].namaJasa = toTitleCase(ptpJasa[i].nama.replace(/_/g,'').replace('epb',''));
							
							if (ptpJasa[i].namaJasa.indexOf('Air') > -1) {
								var str = ptpJasa[i].namaJasa;
								ptpJasa[i].namaJasa = str.replace('Airkapal','Air Kapal');
							}

							if(ptpJasa[i].jenisGerakan){
								var jns;
								switch(ptpJasa[i].jenisGerakan) {
									case '1':
									    jns = 'Masuk';
									    ptpJasa[i].namaJasa = ptpJasa[i].namaJasa + ' ' + jns;
									    break;
									case '2':
									    jns = 'Pindah';
									    ptpJasa[i].namaJasa = ptpJasa[i].namaJasa + ' ' + jns;
									    break;
									case '3':
									    jns = 'Keluar';
									    ptpJasa[i].namaJasa = ptpJasa[i].namaJasa + ' ' + jns;
									    break;
								}
							}	

							if(ptpJasa[i].statusDetail == 'C'){
								if (ppkExist.indexOf(ptpJasa[i].noPpkJasa) === -1) {
									ppkExist.push(ptpJasa[i].noPpkJasa);
				          			$scope.jasaPerPtpC.push(ptpJasa[i]);
				          		}
							}else if(ptpJasa[i].statusDetail == 'D'){
								if (ppkExist.indexOf(ptpJasa[i].noPpkJasa) === -1) {
									ppkExist.push(ptpJasa[i].noPpkJasa);
				          			$scope.jasaPerPtpD.push(ptpJasa[i]);
				          		}
							}

						}
					}			
				}
				var pmhJasa = $filter('orderBy')(response.detailPmh.jasa,'noPpkJasa');
				for (var i = 0; i < pmhJasa.length; i++) {
					if(pmhJasa[i].statusRevisi != 10){
						pmhJasa[i].statusDetail = response.detailPmh.status;
						pmhJasa[i].tglBayarEpb = response.detailPmh.tglBayarEpb;
						pmhJasa[i].namaJasa = toTitleCase(pmhJasa[i].nama.replace(/_/g,'').replace('epb',''));
						
						if (pmhJasa[i].namaJasa.indexOf('Air') > -1) {
							var str = pmhJasa[i].namaJasa;
							pmhJasa[i].namaJasa = str.replace('Airkapal','Air Kapal');
						}
						
						if(pmhJasa[i].jenisGerakan){
							var jns;
							switch(pmhJasa[i].jenisGerakan) {
								case '1':
								    jns = 'Masuk';
								    pmhJasa[i].namaJasa = pmhJasa[i].namaJasa + ' ' + jns;
								    break;
								case '2':
								    jns = 'Pindah';
								    pmhJasa[i].namaJasa = pmhJasa[i].namaJasa + ' ' + jns;
								    break;
								case '3':
								    jns = 'Keluar';
								    pmhJasa[i].namaJasa = pmhJasa[i].namaJasa + ' ' + jns;
								    break;
							}
						}
						if(pmhJasa[i].statusDetail == 'P'){
							if (ppkExist.indexOf(pmhJasa[i].noPpkJasa) === -1) {
								ppkExist.push(pmhJasa[i].noPpkJasa);
					          	$scope.jasaPerPmhP.push(pmhJasa[i]);
					        }
						}else if(pmhJasa[i].statusDetail == 'N'){
							if (ppkExist.indexOf(pmhJasa[i].noPpkJasa) === -1) {
								ppkExist.push(pmhJasa[i].noPpkJasa);
					          	$scope.jasaPerPmhN.push(pmhJasa[i]);
					        }
						}
					}
				}	
			})
		}

	})
}

		$scope.greenBtn = function() {
			$location.path($window.history.back());
		};

		// setting config tab item for jasa
		$scope.dataUmum = {};
		$scope.labuhItems = [];
		$scope.tambatItems = [];
		$scope.tundaItems = [];
		$scope.panduItems = [];
		$scope.airItems = [];

		// options for pf-datepicker
		$scope.options = {
			enableOnReadonly:false,
		};
		/*parameter form*/
		//get parameter Sifat Kunjungan
		AppParam.get({
			nama: 'KUNJUNGAN'
		}, function(response) {
			$scope.sifatKunjungan = response.content;
		});

		//get parameter kemasan
		AppParam.get({
			nama: 'KEMASAN'
		}, function(response) {
			$scope.kemasan = response.content;
		});

		//get parameter satuan
		AppParam.get({
			nama: 'SATUAN'
		}, function(response) {
			$scope.satuan = response.content;
		});

		//get jenis pandu
		AppParam.get({
			nama: 'JENIS_PANDU'
		}, function(response) {
			$scope.jenisPanduOption = response.content;
		});

		//get jenis pandu
		AppParam.get({
			nama: 'JENIS_GERAKAN'
		}, function(response) {
			$scope.jenisGerakanOption = response.content;
		});
		//get parameter posisi kapal
		AppParam.get({
			nama: 'POSISI_KAPAL'
		}, function(response) {
			$scope.posisiKapal = response.content;
		});
		//get alat isi air
		AppParam.get({nama:'ALAT_ISI_AIR'},function(response){
			$scope.alatIsiAir = response.content;
		});

		//get jam kerja
		AppParam.get({nama:'JAM_KERJA'},function(response){
			$scope.jamKerja = response.content;
		});
		//get status bukti labuh
		AppParam.get({nama:'STATUS_BUKTI_LABUH'},function(response){
			$scope.statusBuktiLabuh = response.content;
		});
		//get status tambat
		AppParam.get({nama:'STATUS_TAMBAT'},function(response){
			$scope.statusTambat = response.content;
		});

		// get jenis kepentingan
		AppParam.get({nama:'JENIS_KEPENTINGAN'},function(response){
			$scope.jenisKepentingan = response.content;
		});

		// get status siklus pandu
		AppParam.get({nama:'STATUS_SIKLUS_PANDU'},function(response){
			$scope.statusSiklusPandu = response.content;
		});

		// get jenis kegiatan tunda
		AppParam.get({nama:'JENIS_KEG_TUNDA'},function(response){
			$scope.jenisKegTunda = response.content;
		});

		AppParam.get({nama:'JENIS_KEGIATAN'},function(response){
			$scope.jenisKegiatan = response.content;
		});

		// get status tunda
		AppParam.get({nama:'STATUS_TUNDA'},function(response){
			$scope.statusTunda = response.content;
		});

		//get parameter satuan
		AppParam.get({
			nama: 'SATUAN_AIR_KAPAL'
		}, function(response) {
			$scope.satuanAirKapal = response.content;
		});

		//get asal dermaga tambat
		AppParam.get({nama:'ASAL_DERMAGA_TAMBAT'},function(response){
			$scope.asalDermagaTambat = response.content;
		});

		AppParam.get({nama:'KENDALA_OPERASIONAL'},function(response){
			$scope.kendalaOperasionalOption = response.content;
		});

		/* get all jasa */
		PenetapanDetail.get({ppk1: $routeParams.ppk1, urutan: $routeParams.urutan
		}, function(response) {
			var labuhBtn = 'btn btn-primary';
			var tambatBtn = 'btn btn-primary';
			var panduBtn = 'btn btn-primary';
			var tundaBtn = 'btn btn-primary';
			var airBtn = 'btn btn-primary';

			var temp = response;
			temp.kemasanMuat = '' + temp.kemasanMuat;
			temp.kemasanBongkar = '' + temp.kemasanBongkar;
			temp.satuanMuat = '' + temp.satuanMuat;
			temp.satuanBongkar = '' + temp.satuanBongkar;
			MdmKapalByKode.get({kode: temp.kodeKapal}, function(response){
				temp.rampdoor = response.mkplRampdoor;
				temp.jenisKapal = response.mkplJenis;
				if(temp.jenisKapal=== 'KPLTUNDA'|| temp.jenisKapal === 'TB'){
					localStorage.setItem('kapaltunda', true);
				}else{
					localStorage.setItem('kapaltunda', false);
				}
			});

			var jasa = [];
			for (var i = 0; i < temp.details[0].ptpJasa.length; i++) {
				var namaJasa = temp.details[0].ptpJasa[i].nama.substr(temp.details[0].ptpJasa[i].nama.indexOf("_") + 1);
				jasa.push(namaJasa);
				if(temp.details[0].ptpJasa[i].status != 9){
					if (namaJasa == "labuh") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							$scope.labuhItems.push(temp.details[0].ptpJasa[i]);
							var btnlabuh = jasa.indexOf("labuh") - 1;
						}
					} else if (namaJasa == "tambat") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							$scope.tambatItems.push(temp.details[0].ptpJasa[i]);
							$scope.kodeTerminalN = temp.details[0].ptpJasa[i].kodeTerminal;
							$scope.noPpkJasaTambat = temp.details[0].ptpJasa[i].noPpkJasa;
						}
					} else if (namaJasa === "tunda") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							$scope.tundaItems.push(temp.details[0].ptpJasa[i]);
						}
					} else if (namaJasa === "pandu") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							$scope.panduItems.push(temp.details[0].ptpJasa[i]);
						}
					} else if (namaJasa === "air_kapal") {
						if(temp.details[0].ptpJasa[i].status  != 10){
							$scope.airItems.push(temp.details[0].ptpJasa[i]);
						}
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

			if (jasa.indexOf("labuh") === -1) {
				labuhBtn = "btn btn-default";
				labuhTab = false;
			}
			if (jasa.indexOf("tambat") === -1) {
				tambatBtn = "btn btn-default";
				tambatTab = false;
			}
			if (jasa.indexOf("tunda") === -1) {
				tundaBtn = "btn btn-default";
				tundaTab = false;
				//document.getElementById("tundaTab").style.display = "none";
			}
			if (jasa.indexOf("pandu") === -1) {
				panduBtn = "btn btn-default";
				panduTab = false;
			}
			if (jasa.indexOf("air_kapal") === -1) {
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
			temp.cabang = parseInt(localStorage.getItem('kodeCabang'));			
			$scope.dataUmum = temp;
			if($scope.dataUmum.details[0].status === 'C'){
				$scope.revisiForm = false;
			}else{
				$scope.revisiForm = true;
			}

			//add by cahyo for getting kode terminal from rea tambat
			//still not optimized because is repeated 6 times in extended controller..
			//many room for improvement..
			RealisasiTambatDetailbyPpkJasa.get({ noPpkJasa: $scope.noPpkJasaTambat }, function (response) {
				var item = JSON.parse(JSON.stringify(response));
				$scope.kodeTerminalN = item.kodeTerminal;
				// console.log($scope.kodeTerminalN);
			});
			//end of add
		});
		LoadingScreen.hide();

		//add by cahyo for checking if it terminal or not terminal
		$scope.isTerminal = function () {
			console.log(localStorage.getItem('kodeTerminal') + " = " + $scope.kodeTerminalN);
			if ($scope.kodeTerminalN) {
				return localStorage.getItem('kodeTerminalBaru') == $scope.kodeTerminalN;
			} else {
				return true;
			} 
			
			//return localStorage.getItem('kodeTerminalBaru') == $scope.kodeTerminalN;
		  //return true;
		  //  console.log(kodeTerminal === localStorage.getItem('kodeTerminal'));
		  //  return kodeTerminal === localStorage.getItem('kodeTerminal');
		}

			 $scope.isRegionalByPass = function () {
				 //for bypass regional even its not regional
				 //bypass only if theres is parameter cabang super verif 
				 if (localStorage.getItem('superVerif') == 1) {
					// return false;
					 $scope.isRegional =true;
					 return false;
				 } else {
					 return $scope.isRegional;
				 }
			 }
		//end off add by cahyo

	}]);