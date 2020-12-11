
'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPranotaCtrl
 * @description
 * # TransaksiPranotaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiPranotaCtrl',['$scope','$routeParams','$location','$filter','$window','$timeout','$route','$http','$rootScope','PranotaDetail','VerifiedRealisasi','Notification','PermohonanGetStatus','VerifiedRealisasiByList','MdmCabangSearch','PejabatPengesahanList','UserRole','VerifikasiPerNoPPKJasa','LoadingScreen','CheckAllJasaVerified','API_PATH','PermohonanSetDone','RealisasiLabuh','CreateNota','TipeEskalasi','BindEskalasi','TipeEskalasiList','UpdateStatusReaAfterEskalasi','ValidasiRealisasiSiklusPandu','CheckSpbInaportnet','ParamsCabangList', function ($scope,$routeParams,$location,$filter,$window,$timeout,$route,$http,$rootScope,PranotaDetail,VerifiedRealisasi,Notification,PermohonanGetStatus,VerifiedRealisasiByList,MdmCabangSearch,PejabatPengesahanList,UserRole,VerifikasiPerNoPPKJasa,LoadingScreen,CheckAllJasaVerified,API_PATH,PermohonanSetDone,RealisasiLabuh,CreateNota,TipeEskalasi,BindEskalasi,TipeEskalasiList,UpdateStatusReaAfterEskalasi,ValidasiRealisasiSiklusPandu,CheckSpbInaportnet,ParamsCabangList) {
  	LoadingScreen.show();
  	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

	var userRoleData = JSON.parse(localStorage.getItem('userRole'));
	$scope.userRole = UserRole.getCurrentRole();

	$scope.items=[];
	$scope.details=[];
	$scope.detailsItem =[];
	$scope.tglSekarang = new Date();
	$scope.locationPath = '/transaksi/realisasi';
	$scope.setNotification = '';
	$scope.detailJasaWaktu = '';
	$scope.namaPejabatPengesahan = {};
	$scope.statusButtonVerifiedLabuh = false;
	$scope.statusButtonCheckKirimNota = false;
	$scope.statusButtonCheckKirimNotaAirKapal = false;
	$scope.confirmKirimNota = true;
	$scope.isShowBtnEkspor = true;
	$scope.isStatusVerifikasiLabuh = true;
	$scope.isBtnBatalVerifyTambat = false;
	$scope.isBtnBatalVerifyPandu = false;
	$scope.isBtnBatalVerifyTunda = false;
	$scope.isBtnBatalVerifyAirKapal = false;
	$scope.itemBatalVerifikasi = [];
	$scope.sktdTeks = '';

	//added by cahyo in 03/12/2018 for adding is user regional or not
	$scope.isRegional = (localStorage.getItem('statusUser') === 'regional');

	   //request dari user bila ada superVerif maka diangap user regional
	if (localStorage.getItem('superVerif') == 1) {
				 $scope.isRegional =true;
	}

	//end of add
	var rowJumlah = '-------------------------';
	var rowJasa = { text:'-----------------------------------------------------------------------------------------------------------------------------------------------------------',alignment: 'center'};

   	$scope.getTipeEskalasi = function(){
		TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	if($location.path().indexOf("vasapublic") > -1){
		$scope.isPranotaPublic = true;
	} else{
		$scope.isPranotaPublic = false;
		$scope.getTipeEskalasi();
	}

	function toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
   	}

	$scope.getDataMdmCabang = function(kodeCabang){
	 	$scope.kotaCabangPelabuhan = localStorage.namaCabang;
	}

	var setFormatDate = function(date) {
		if(date){
			return $filter('date')(date, 'dd-MM-yyyy HH:mm:ss');
		}
	}

	var setFormatDateNonSecond = function(date) {
		if(date){
			return $filter('date')(date, 'dd-MM-yyyy HH:mm');
		}
	}

	var formatCurr = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 4);
        var str = '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var res = str.split(".");
		var value = "";
		if(res.length===2){
			var mystring = res[1];
			var res2 = mystring.replace(",", "");
			value = res[0]+'.'+res2;
		}else{
			value = str;
		}
        return value;
    };

    var formatCurr2 = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        var str = '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var res = str.split(".");
		var value = "";
		if(res.length===2){
			var mystring = res[1];
			var res2 = mystring.replace(",", "");
			value = res[0]+'.'+res2;
		}else{
			value = str;
		}
        return value;
    };

    var handleDataNull = function(data) {
    	var item = String(data);
    	if(item ==='null' || item==='undefined') item = '-';
		return item;
    };

    var preventNull = function(data){
		if(data == null) data = '';
		return data;
	}

	$scope.getDataPejabatPengesahan = function(dataPranota){
		if(dataPranota){
			PejabatPengesahanList.get({},
			function(response){
				if(response.content.length>0){
					for (var i = 0; i<response.content.length; i++){
						if(response.content[i].otorisasi){
							if(dataPranota.itemAirKapal.length>0){
								if(response.content[i].jenisDokumen=='PRNTAIR'){
									$scope.namaPejabatPengesahan = response.content[i];
								}
							}else {
								if(response.content[i].jenisDokumen=='PRNTLTA'){
									$scope.namaPejabatPengesahan = response.content[i];
								}
							}
						}
					}
				}
		  	})
		}
	}

	$scope.close = function(){
		$window.history.back();
	}

	$timeout(function() {
		$scope.informationPranota = 'Data Pranota tidak tersedia';
	},10);

	var getStatusPermohonan = function(){
		PermohonanGetStatus.get({ppk1:$routeParams.ppk1,urutan:1}, function(response){
			$scope.statusPermohonan = response[0];
		}, function(){
			$scope.statusPermohonan = '';
		});
	}

	$scope.checkAllJasaVerified = function(){
		$http.get(API_PATH+'realisasi/check_all_jasa_verified/'+$routeParams.ppk1)
		.success(function (response) {
			if(response){
				$scope.statusButtonVerifiedLabuh = true;
			}
		});
	}

	// $scope.checkKirimNota = function(noPpk1){
	// 	var str = noPpk1;
	// 	var n = str.indexOf("A");
	// 	console.log(n);
	// 	var checkNota = false;
	// 	if(n===-1){
	// 		checkNota = $scope.checkKirimNotaNormal();			
	// 	}else{
	// 		checkNota = $scope.checkKirimNotaAirKapal();			
	// 	}
	// 	console.log(checkNota)
	// 	return checkNota;
	// }	

	$scope.checkKirimNota = function(){
		$http.get(API_PATH+'realisasi/check_kirim_nota/'+$routeParams.ppk1)
		.success(function (response) {
			if(response){
				$scope.statusButtonCheckKirimNota =  true;
			}
		});
	}

	$scope.checkKirimNotaAirKapal = function(){
		$http.get(API_PATH+'realisasi/check_kirim_nota_air_kapal/'+$routeParams.ppk1)
		.success(function (response) {
			if(response){
				$scope.statusButtonCheckKirimNotaAirKapal = true;
			}
		});
	}

	//function get data pranota
	$scope.getDataPranota = function(){

		PranotaDetail.get({ppk1:$routeParams.ppk1}, function(response){
			if(response !== undefined){
				$scope.responsePranota = response;
				console.log(response);
				$scope.isShowBtnEkspor = true;
				var itemsTemp = [];
				response = $filter('orderBy')(response,'noPpk1');
				for (var x = 0; x<response.length; x++){
					getStatusPermohonan();
					$scope.getDataMdmCabang(response[0].kodeCabang);
					$scope.getDataPejabatPengesahan(response[0]);
					$scope.checkAllJasaVerified();
					$scope.checkKirimNota();
					$scope.checkKirimNotaAirKapal();
					if(response[x].sktd===1)$scope.sktdTeks = '(SKTD)';

					$scope.responsePranota[x] = response[x];
					var str = response[x].noPpk1;
					var n = str.indexOf("A");
					if(n===-1){
						$scope.responsePranota[x].judulPranota = 'PERHITUNGAN JASA LABUH/TAMBAT/PANDU/TUNDA/KEPIL';
						$scope.responsePranota[x].jenisPranota = 'normal';
						$scope.responsePranota[x].textButtonKirimNota = 'Kirim Nota';
					}else{
						$scope.responsePranota[x].judulPranota = 'PERHITUNGAN JASA AIR KAPAL';
						$scope.responsePranota[x].jenisPranota = 'airKapal'
						$scope.responsePranota[x].textButtonKirimNota = 'Kirim Nota Air Kapal'
					}
					// Sort Data and Check User Role
			        var userRoleData = JSON.parse(localStorage.getItem('userRole'));

			        itemsTemp[x] = $scope.responsePranota[x].items.slice(0);
			        $scope.responsePranota[x].items = [];
			        $scope.responsePranota[x].itemLabuh = [];
			        $scope.responsePranota[x].itemPandu = [];
			        $scope.responsePranota[x].itemTambat = [];
			        $scope.responsePranota[x].itemTunda = [];
			        $scope.responsePranota[x].itemAirKapal = [];

			        itemsTemp[x].forEach(function(item,index){
						if(userRoleData) {
							if(!userRoleData.jasa.flagLabuh) return true;
						}
						if(item.jenisJasaText === "LABUH") {
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemLabuh.push(item);
						}
						if($scope.responsePranota[x].itemLabuh.length>0){
							if($scope.responsePranota[x].itemLabuh[0].reaDetails){
								if($scope.responsePranota[x].itemLabuh[0].reaDetails.status==2){
									// Untuk menentukan eskalasi verifikasi dapat digunakan
									$scope.isStatusVerifikasiLabuh = false; 
								}
							}
						}
			        });

			        itemsTemp[x].forEach(function(item,index){
						if(userRoleData) {
							if(!userRoleData.jasa.flagTambat) return true;
						}
						if(item.jenisJasaText === "TAMBAT") {
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemTambat.push(item);
						}
						if(item.jenisJasaText === "KEPIL") {
							$scope.responsePranota[x].items.push(item);
						}
			        });

			        itemsTemp[x].forEach(function(item,index){
						if(userRoleData) {
							if(!userRoleData.jasa.flagPandu) return true;
						}
						if(item.jenisJasaText === "PANDU") {
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemPandu.push(item);
						}
			        });

			        itemsTemp[x].forEach(function(item,index){
						if(userRoleData) {
							if(!userRoleData.jasa.flagTunda) return true;
						}
						if(item.jenisJasaText === "TUNDA") {
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemTunda.push(item);
						}
			        });

			        itemsTemp[x].forEach(function(item,index){

						if(userRoleData) {
							if(!userRoleData.jasa.flagAirKapal) return true;
						}
						if(item.jenisJasaText === "AIR KAPAL") {
							$scope.responsePranota[x].judulPranota = 'PERHITUNGAN JASA AIR KAPAL';
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemAirKapal.push(item);
						}
			        });

			        itemsTemp[x].forEach(function(item,index){
						if(userRoleData) {
							if(!userRoleData.jasa.flagAirKapal) return true;
						}
						if(item.jenisJasaText === "" || item.jenisJasaText === null) {
							$scope.responsePranota[x].items.push(item);
							$scope.responsePranota[x].itemAirKapal.push(item);
						}
			        });
			        // End Sort Data and Check User Role

					if($scope.responsePranota[x].valuta==='IDR'){
						$scope.responsePranota[x].valutaMataUang = 'Rp';
						$scope.responsePranota[x].valutaTerbilang = 'rupiah';
					}else{
						$scope.responsePranota[x].valutaMataUang = '$';
						$scope.responsePranota[x].valutaTerbilang = 'dollar';
					}
					// $scope.allItems = response[x].items;
					// $scope.items = response[x].items;
					// $scope.judulJasaPranota = $scope.items;
					$scope.getDataMdmCabang($scope.responsePranota[x].kodeCabang);
					$scope.getDataPejabatPengesahan($scope.responsePranota[x]);
					for (var i = 0; i<response[x].items.length; i++){
						if(response[x].items[i].jenisJasaText ==='LABUH'){
							response[x].items[i].jenisJasaTextNormal = 'Labuh';
							// console.log(response[x].items[i].details[3]);
						}else if(response[x].items[i].jenisJasaText ==='TAMBAT'){
							response[x].items[i].jenisJasaTextNormal = 'Tambat';
						}else if(response[x].items[i].jenisJasaText ==='PANDU'){
							response[x].items[i].jenisJasaTextNormal = 'Pandu';
							/*console.log(response[x].items[i].details);*/
						}else if(response[x].items[i].jenisJasaText ==='TUNDA'){
							response[x].items[i].jenisJasaTextNormal = 'Tunda';
						}else if(response[x].items[i].jenisJasaText ==='AIR KAPAL'){
							response[x].items[i].jenisJasaTextNormal = 'Air Kapal';
						}else if(response[x].items[i].jenisJasaText ==='KEPIL'){
							response[x].items[i].jenisJasaTextNormal = 'Kepil';
							// console.log(response[x].items[i].details);
						}else{
							response[x].items[i].jenisJasaTextNormal = '';
						}
					}
				}
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
		LoadingScreen.hide();		
	};

	if($scope.isPranotaPublic){
		LoadingScreen.hide();
	} else {
		if($routeParams.add && $routeParams.ppk1){
			VerifiedRealisasiByList.save({ppk1:$routeParams.ppk1},{},function(response){
				if(response.status==='500'){
					$scope.setNotification  = {
						type	: "danger",
						message	: "Cetak Pranota tidak berhasil."
					};
					Notification.setNotification($scope.setNotification);
					$window.history.back();
					LoadingScreen.hide();
				}else{
					$scope.getDataPranota();
				}
			},function(){
				$window.history.back();
			});
		}else{
			$scope.getDataPranota();
		}
	}

	$scope.confirmKirimNota = function(dataPranota){
		$scope.labelKirimNota = dataPranota.jenisPranota==='airKapal'?"Air Kapal ":"";
		$scope.noPpk1KirimNota = dataPranota.noPpk1;
		$('#confirmKirimNota').modal('show');
	}

	$scope.createNota = function(noPpk1){
		CreateNota.save({noPpk1:noPpk1},{},
		function(response){
			if(response.status!=='500'){
				$scope.setNotification  = {
					type	: "success",
					message	: "Nota dengan PPK1: <b>"+noPpk1+"</b> sukses terkirim ke SAP."
				};
			}else{
				var description = response.description;
				$scope.setNotification  = {
					type	: "warning",
					message	: "Nota dengan PPK1: <b>"+noPpk1+"</b> gagal terkirim ke SAP.<br><br>Error : ["+description+"]"
				};
			}
	Notification.setNotification($scope.setNotification);
			$scope.getDataPranota();
		});
	}

	$scope.verifikasiPerNoPPKJasa = function(params){
		if(params.statusTglSelesai){
			$scope.setNotification  = {
					type	: "warning",
					message	: "Verifikasi jasa "+params.labelJenisJasa+" belum dapat dilakukan, karena last line belum diinputkan. <br><br>Kode validasi : <b>VALOTH-006</b>"
				};
			Notification.setNotification($scope.setNotification);
			return false;
		}

		VerifikasiPerNoPPKJasa.save({noPpkJasa:params.noPpkJasa},{},
		function(response){
			var notifMsg = "";
			if(response.status==='500'){
				/* Validasi cek kapal rea tunda untuk Jasa Tunda: */
				if(String(params.jenisJasa)==='5' && response.description.indexOf("belum ada kapal tunda") > -1){
					$('#validasiVerifikasiKapalTunda').modal('show');
				}else{
					$scope.setNotification  = {
						type	: "warning",
						message	: response.description
					};
					Notification.setNotification($scope.setNotification);
				}
			}else{
				// if(String(params.jenisJasa)==='3'){
				// 	notifMsg = "Verifikasi "+params.labelJenisJasa+" : <b>"+params.noPpkJasa+"</b> Berhasil.<br><b>Catatan : <b>nota air kapal belum dapat ditagihkan sebelum dilakukan Verifikasi Labuh";
				// }else{
					if((String(params.jenisJasa)==='1' || String(params.jenisJasa)==='3') && response.eDocNumber){
						notifMsg = "Verifikasi "+params.labelJenisJasa+" : <b>"+params.noPpkJasa+"</b> Berhasil.<br>Nomor Dokumen SAP : <b>"+response.eDocNumber+"</b>";
					}else{
						notifMsg = "Verifikasi "+params.labelJenisJasa+" : <b>"+params.noPpkJasa+"</b> Berhasil.";
					}
				// }
				$scope.setNotification  = {
					type	: "success",
					message	: notifMsg
				};
				Notification.setNotification($scope.setNotification);
				$scope.getDataPranota();
			}
		},function(){
			$scope.setNotification  = {
				type	: "danger",
				message	: "Verifikasi Realisasi gagal."
			};
			Notification.setNotification($scope.setNotification);
			$scope.getDataPranota();
		});
	};

	$scope.konfirmasiLabuh = function(){
		$('#confirmVerifikasi').modal('show');
	};

	$scope.setStatusDefaultVerifikasiNoPpkJasa = function(dataEsc, item){
		var hasEsc = BindEskalasi.hasTempEskalasi(dataEsc.valCode);
		$scope.isBtnBatalVerifyTambat = false; 
		if(hasEsc) {
			UpdateStatusReaAfterEskalasi.update({noPpkJasa:item.noPpkJasa},{},function(response){
				$scope.getDataPranota();
			});
		}
	};

	$scope.$on('eventFromEskalasi', function (event, data, item) {
		$scope.setStatusDefaultVerifikasiNoPpkJasa(data,item);
	});

	$scope.confirmBatalVerifikasi = function(item){
		item.labelJenisJasa = toTitleCase(item.nama.toString().replace('epb_', ''));
		
		if(item.nama == 'epb_tambat'){
			item.valCode = 'VALOTH013';
			item.infoKodeVal = 'VALOTH-013';
		}else if(item.nama == 'epb_pandu'){
			item.valCode = 'VALOTH014';
			item.infoKodeVal = 'VALOTH-014';
		}else if(item.nama == 'epb_tunda'){
			item.valCode = 'VALOTH015';
			item.infoKodeVal = 'VALOTH-015';
		}else if(item.nama == 'epb_air_kapal'){
			item.valCode = 'VALOTH016';
			item.infoKodeVal = 'VALOTH-016';
			item.labelJenisJasa = toTitleCase(item.labelJenisJasa.toString().replace('_', ' '));
		}
		$scope.itemBatalVerifikasi = item;

		var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi(item.valCode),
			hasEsc = BindEskalasi.hasTempEskalasi(item.valCode),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		$rootScope.statusEskalasiModal = statusEskalasi;
		var note =  {
			hasEsc	: statusEskalasi,
			dataEsc : itemEskalasi,
			dataItem : item,
			showNotif : "hide"
		};
		Notification.setNotification(note);
		$('#confirmBatalVerifikasi').modal('show');
	}

	$scope.checkSPBKapal = function(){
		ParamsCabangList.get({
			nama 	: 'ENTRY_INAPORTNET',
			value 	: 1
		}, function(responseParams){
			if(responseParams.content.length>0){
				CheckSpbInaportnet.get({noPpk1:$routeParams.ppk1}, function(responseSpb){
					if(responseSpb.length>0){
						$('#confirmLabuh').modal('show');
					}else{
						$('#confirmSPB').modal('show');
					}
				});
			}else{
				$('#confirmLabuh').modal('show');
			}
		});
	}

	$scope.confirmVerifikasi = function(noPpk1,urutanPermohonan,jenisJasa,labelJenisJasa,noPpkJasa,item){
		$scope.confirmVerifikasi.noPpk1 = noPpk1;
		$scope.confirmVerifikasi.urutanPermohonan = urutanPermohonan;
		$scope.confirmVerifikasi.jenisJasa = jenisJasa;
		$scope.confirmVerifikasi.labelJenisJasa = labelJenisJasa;
		$scope.confirmVerifikasi.noPpkJasa = noPpkJasa;
		var itemLabuh = $scope.responsePranota[0].itemLabuh;
		var itemPandu = $scope.responsePranota[0].itemPandu;
		var itemTambat = $scope.responsePranota[0].itemTambat;
		var labelTglKeluar = '';
		if(item.jenisJasa===1){
			$scope.confirmVerifikasi.statusTglSelesai = item.reaDetails.tglKeluar===null || item.reaDetails.tglKeluar===''?true:false;
			labelTglKeluar = 'waktu keberangkatan labuh';
		}else if(item.jenisJasa===2){
			$scope.confirmVerifikasi.statusTglSelesai = item.reaDetails.tglSelesai===null || item.reaDetails.tglSelesai===''?true:false;
			labelTglKeluar = 'last line';
		}else{
			$scope.confirmVerifikasi.statusTglSelesai = false;
		}

		if($scope.confirmVerifikasi.statusTglSelesai){
			$scope.setNotification  = {
					type	: "warning",
					message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena <b>"+labelTglKeluar+"</b> belum diinputkan.<br><br>Kode validasi : <b>VALOTH-006</b>"
				};
			Notification.setNotification($scope.setNotification);
			return false;
		}

		/*
		Keterangan Validasi Labuh :
		a. Jika Wajib Pandu, verifikasi labuh harus ngecek sudah memiliki pandu keluar atau blm
	    b. Jika Tidak Wajib Pandu, verifikasi labuh harus ngecek lastline tambat sudah terisi atau blm
		*/

		if(item.jenisJasa===1){
			var isValidVerify = true;
			if(localStorage.validasiWajibPanduTunda==='1' && $scope.responsePranota[0].gtKapal>=500 && $scope.responsePranota[0].jenisKapal!=="KPLTONKANG" && itemPandu.length>0 && item.reaDetails.tglKeluar){
				var temp = [];
				$scope.responsePranota[0].itemPandu.forEach(function(item){
					temp.push(item.noPpkJasa); 
				});

				var maxNoPpkJasa = Math.max.apply(Math, temp); //untuk mencari maksimal noPpkJasa terakhir
				$scope.responsePranota[0].itemPandu.forEach(function(item){
					maxNoPpkJasa = String(maxNoPpkJasa);
					item.noPpkJasa = String(item.noPpkJasa);
					if(maxNoPpkJasa===item.noPpkJasa){ //cek noPpkJasa terakhir
						if(item.statusSiklusPandu == '1'){
							if(item.reaDetails.jenisGerakan!=='3'){
								$scope.setNotification  = {
									type	: "warning",
									message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena <b>Jenis Gerakan</b> pada <b>Pandu belum keluar</b>. <br><br>Kode validasi : <b>VALOTH-007</b>"
								};
								isValidVerify = false;
							}
						}
					}
				});
			}else{
				if(itemPandu.length>0){
					for (var i = 0; i<itemPandu.length; i++){
						if(itemPandu[i].reaDetails.jenisGerakan==='3'){
							if(itemPandu[i].reaDetails.tglSelesai==='' || itemPandu[i].reaDetails.tglSelesai===null){
								$scope.setNotification  = {
									type	: "warning",
									message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> dapat dilakukan <b>setelah Realisasi Gerakan Keluar dan Tgl.Selesai Labuh diisi</b>. <br><br>Kode validasi : <b>VALOTH-008</b>"
								};
								isValidVerify = false;
							}				}
					}
				}
				if(itemTambat.length>0){
					for (var i = 0; i<itemTambat.length; i++){
						if(itemTambat[i].reaDetails.tglSelesai===null || itemTambat[i].reaDetails.tglSelesai===''){
							$scope.setNotification  = {
								type	: "warning",
								message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena <b>last line</b> pada <b>Tambat belum diinput</b>. <br><br>Kode validasi : <b>VALOTH-009</b>"
							};
							isValidVerify = false;
						}
					}
				}
			}
			
			if(isValidVerify){
				var hasEsc = BindEskalasi.hasTempEskalasi('VALOTH020');
				if (!hasEsc) {
					ValidasiRealisasiSiklusPandu.get({noPpk1:$routeParams.ppk1}, function(response){
						if(response.result){
							$scope.checkSPBKapal();
						}else if(response.result===0){
							$scope.infoSiklusPandu = "Siklus jasa pandu terputus dari dermaga <b>"+response.namaLokasi1+"</b> ke dermaga <b>"+response.namaLokasi2+"</b>.";
							var
								itemEskalasi = TipeEskalasi.getTipeEskalasi('VALOTH020'),
								hasEsc = BindEskalasi.hasTempEskalasi('VALOTH020'),
								statusEskalasi = itemEskalasi.id !== undefined ? true : false;
							itemEskalasi.valDesc = $scope.infoSiklusPandu;
							$rootScope.statusEskalasiModal = statusEskalasi;
							var note = {
								hasEsc: statusEskalasi,
								dataEsc: itemEskalasi,
								dataItem: item,
								showNotif: "hide"
							};
							Notification.setNotification(note);
							$('#validasiSiklusPandu').modal('show');
						}else{
							$scope.setNotification  = {
								type	: "warning",
								message	: response.description
							};
							Notification.setNotification($scope.setNotification);
						}
					});
				}else{
					$scope.checkSPBKapal();
				}
			}else{
				Notification.setNotification($scope.setNotification);
			}
		}

		/*Keterangan Validasi Pandu :
		a. harus mengecek tglkeluar labuh sudah diisi atau belum
		b. harus mengecek jenis gerakan pandu sudah terisi
		*/
		if(item.jenisJasa===4){
			var isValidVerify = true;
			if(!item.reaDetails.nipPandu){ // Jika nipp pandu kosong
				$scope.setNotification  = {
					timeout : 10000,
					type	: "warning",
					message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena NIPP Petugas Pandu kosong.<br><br>Silahkan lengkapi dengan mengedit jasa pandu di <a href='/#/transaksi/realisasi/"+item.reaDetails.noPpk1+"' target='_blank'>Daftar Realisasi</a>."
				};
				isValidVerify = false
			}
			if(!item.reaDetails.jenisPanduText){ // Jika jenis gerakan pandu kosong
				$scope.setNotification  = {
					timeout : 10000,
					type	: "warning",
					message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena Jenis Pandu kosong.<br><br>Silahkan lengkapi dengan mengedit jasa pandu di <a href='/#/transaksi/realisasi/"+item.reaDetails.noPpk1+"' target='_blank'>Daftar Realisasi</a>."
				};
				isValidVerify = false
			}
			if(item.reaDetails.jenisGerakan==='3'){
				if(itemLabuh[0].reaDetails.tglKeluar==='' || itemLabuh[0].reaDetails.tglKeluar===null){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Verifikasi jasa <b>"+labelJenisJasa+"</b> belum dapat dilakukan, karena <b>last line</b> pada <b>Labuh</b> belum diinputkan. <br><br>Kode validasi : <b>VALOTH-010</b>"
					};
					isValidVerify = false;
				} 
			}

			if(isValidVerify){
				$('#confirmVerifikasi').modal('show');
			}else{
				Notification.setNotification($scope.setNotification);
			}
		}

		if(item.jenisJasa===2 || item.jenisJasa===3 || item.jenisJasa===5){
			$('#confirmVerifikasi').modal('show');
		}
	}

	$scope.printPDF = function(dataPranota){
		var table = document.getElementById('exportthis').innerHTML;
		var myWindow = $window.open('', '', 'width=800, height=600');
		myWindow.document.write(table);
		myWindow.print();
	};

	function groupBy( array , f ){
		var groups = {};
		array.forEach( function( o )
		{
		var group = JSON.stringify( f(o) );
			groups[group] = groups[group] || [];
			groups[group].push( o );
		});
		return Object.keys(groups).map( function( group )
		{
			return groups[group];
		})
	}

	$scope.cetakPDF = function(itemPranota){
		/*keterangan jenis jasa :
			@ 1 = jasa Labuh
			@ 2 = jasa Tambat
			@ 3 = jasa Air Kapal
			@ 4 = jasa Pandu
			@ 5 = jasa Tunda
			@ 6 = jasa Kepil
		*/
		var contentPDF = [];
		
		for (var x = 0; x<itemPranota.length; x++){
			var dataTitleItems = [];
			var dataItems = [];
			var dataRumusDetails = [];
			var dataPranota = [];
			var rowHeader = [];
			
				dataPranota = itemPranota[x];
				angular.forEach(itemPranota[x].items, function(value, key){
					var waktuMulai = '';
					var waktuSelesai = '';
					var lokasi = '';
					var kadeMeter = '';
					var kodeKapalTender = '';
					var kodeKapalTenderText = '';
					var rumusDetail = [];
					var rumusDetail2 = [];
					var itemKapalGandeng = [];
					var itemKapalGandengHeader = [];
					var itemKapalGandengFooter = [];
					var itemSurcharge = [];
					var result = [];

					var maxUrutan;
					var array=[];
					if(value.terbilang==='zero'){ value.terbilang ='nol';}
					if(value.jenisJasa===1){ // BARIS JASA LABUH
						waktuMulai 		= value.reaDetails?setFormatDateNonSecond(value.reaDetails.tglMasuk):'';
						waktuSelesai 	= value.reaDetails?setFormatDateNonSecond(value.reaDetails.tglKeluar):'';
						lokasi 			= value.reaDetails?value.reaDetails.namaLokasi:'-';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						result.sort();
						result.reverse();
						/*result.sort(function(obj1, obj2) {
							// Ascending: first age less than the previous
							return obj1.urutan - obj2.urutan;
						});*/
						angular.forEach(result, function(val, key){
							var gt='',masaLabuh='',tarif='',prosen1='',prosen2='',subTotal='',urutan='',total='',namaKomponen='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='';
							angular.forEach(result[key], function(val2, key2){

								if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Masa Labuh'){
									masaLabuh = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif'){
									tarif = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen I'){
									prosen1 = val2.value;
								}else if(val2.namaKomponen==='Prosen II'){
									prosen2 = val2.value;
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Pendapatan'){
									total = formatCurr2(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});

							// urutan = $filter('orderBy')(urutan,'urutan');
							// if(urutan<99){
							if(urutan<30){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													'Masa '+urutan, '', '( '+gt+' X '+masaLabuh+' X '+tarif+' X '+prosen1+'% ) X '+prosen2+'% = '+subTotal,'', ''
												]
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							}else if(urutan>29 && urutan<99){
								if(urutan===40){
									rumusDetail.push({
										text: '',
										pageBreak: 'after'
									});
								}

								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													'Masa '+urutan, '', '( '+gt+' X '+masaLabuh+' X '+tarif+' X '+prosen1+'% ) X '+prosen2+'% = '+subTotal,'', ''
												]
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							} else if(urutan===999){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													namaKomponen, '', '','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							} else if(urutan>110 && urutan<888){
								if(urutan!==777){
									rumusDetail.push({
										table: {
											headerRows: 1,
												"widths" : [100,20,280,20,60],
												body: [
													[
														keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal,'', ''
													],
												]
											},
											style: 'header',
											layout: 'noBorders'
									});
								}
							} else if(urutan===888){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													ketDenda, '', '','= '+dataPranota.valutaMataUang, { text: totalDenda, alignment: 'right'}
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							}
							

						});
					}else if(value.jenisJasa===2){ // BARIS JASA TAMBAT 
						waktuMulai 		= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglMulai:'');
						waktuSelesai 	= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglSelesai:'');
						lokasi 			= value.reaDetails?value.reaDetails.namaLokasi:'-';
						kadeMeter 		= value.reaDetails?value.reaDetails.kadeAwal+' - '+value.reaDetails.kadeAkhir:'-';
						kodeKapalTender = value.reaDetails?value.reaDetails.kodeKapalTender:'';
						kodeKapalTenderText = value.reaDetails?value.reaDetails.kodeKapalTenderText:'';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});
						angular.forEach(result, function(val, key){
							var gt='',masaLabuh='',tarif='',etmal='',prosenBiaya='',prosenMasa='',urutan='',subTotal='',keterangan='',total='',prosenBiaya='',namaKomponen='',totalDenda='',ketDenda='',biayaJasa='',keterangan='',jenisKemasanBongkar='',jenisKemasanMuat='';
							var subTotalOri = '';
							angular.forEach(result[key], function(val2, key2){
								if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif'){
									tarif = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Etmal'){
									etmal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen Masa'){
									prosenMasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Sub Total Ori'){
									subTotalOri = val2.value?'( Nilai Asli : '+formatCurr(val2.value)+' )':'';
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Total Pendapatan'){
									total = formatCurr2(val2.value);
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Jenis Kemasan Bongkar'){
									jenisKemasanBongkar = val2.ext1?val2.ext1:' - ';
								}else if(val2.namaKomponen==='Jenis Kemasan Muat'){
									jenisKemasanMuat = val2.ext1?val2.ext1:' - ';
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan<50){
								if(urutan===1){
									rumusDetail.push({
										table: {
										headerRows: 1,
											"widths" : [90,10,280,20,60],
											body: [
												[
													'Kemasan Bongkar/Muat ', ':',''+jenisKemasanBongkar+'/'+jenisKemasanMuat, '',''
												]
											]
										},
										style: 'header',
										layout: 'noBorders'
									});
								};
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												keterangan, '', '( '+gt+' X '+tarif+' X '+etmal+' X '+prosenBiaya+'% ) X '+prosenMasa+' = '+subTotal+' '+subTotalOri,'',''
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan>50 && urutan<99){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal+' '+subTotalOri,'', ''
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							} else if(urutan===999){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													namaKomponen, '', '','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							} else if(urutan>110 && urutan<888){
								if(urutan!==777){
									rumusDetail.push({
										table: {
											headerRows: 1,
												"widths" : [100,20,280,20,60],
												body: [
													[
														keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal,'', ''
													],
												]
											},
											style: 'header',
											layout: 'noBorders'
									});
								}
							} else if(urutan===888){
								rumusDetail.push({
									table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													ketDenda, '', '','= '+dataPranota.valutaMataUang, { text: totalDenda, alignment: 'right'}
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
								});
							}
						});
					}else if(value.jenisJasa===3){ // BARIS JASA AIR KAPAL
						waktuMulai 		= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglMulaiIsi:'');
						waktuSelesai 	= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglSelesaiIsi:'');
						lokasi 			= value.reaDetails?value.reaDetails.namaDermaga:'-';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						angular.forEach(result, function(val, key){
							var tarif='',volume='',prosen='',total='',urutan='',subTotal='',namaKomponen='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='',alatIsi='',keteranganTarif='';
							angular.forEach(result[key], function(val2, key2){
								if(val2.namaKomponen==='Tarif'){
									tarif = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Volume'){
									volume = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen'){
									prosen = val2.value;
								}else if(val2.namaKomponen==='Total'){
									total = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Alat isi'){
									alatIsi = val2.ext1;
								}else if(val2.namaKomponen==='Keterangan Tarif'){
									keteranganTarif = val2.ext1?val2.ext1:'';
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan===1){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												alatIsi+',','', '','', ''
											],
											[
												'','', tarif+' '+keteranganTarif+' X '+volume+' X '+prosen+'%','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}else if(urutan>1 && urutan<99){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												'','', tarif+' X '+volume+' X '+prosen+'%','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===999){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												namaKomponen, '', '','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan>110 && urutan<888){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal,'', ''
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===888){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												ketDenda, '', '','= '+dataPranota.valutaMataUang, { text: totalDenda, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}
						});
					}else if(value.jenisJasa===4){ // BARIS JASA PANDU
						waktuMulai 		= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglMulai:'');
						waktuSelesai 	= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglSelesai:'');
						lokasi 			= value.reaDetails?'Dari '+value.reaDetails.namaLokasiAsal+' Ke '+ value.reaDetails.namaLokasiTujuan:'-';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						angular.forEach(result, function(val, key){
							var gerakan='',tarifTetap='',prosen1='',prosen2='',prosenMasa='',urutan='',totalBiayaTetap='',totalBiayaVariable='',tarifVariable='',gt='',tarifVariable='',surchargeBBM='',tglBBM='',tglKurs='',nilaiKurs='',hargaBBM='',kapalTongkang='',gtTongkang='',loaTongkang='',totalGtTongkang='',totalLoaTongkang='',total='',subTotal='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='',namaKomponen='',total2='',jumlahKapal='',totalSurcharge='',dwtTongkang='',totalDwtTongkang='';
							angular.forEach(result[key], function(val2, key2){

								val2.value = String(val2.value);

								///console.log(typeof val2.value);
								if(val2.value==null || val2.value==undefined){
									// console.log("kesini");
									// console.log(val2.value);
									val2.value = '';
								}
								//if(rowItem == null) tabelRow[index] = '';

								if(val2.namaKomponen==='Gerakan'){
									gerakan = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Tetap'){
									tarifTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen I'){
									prosen1 = val2.value;
								}else if(val2.namaKomponen==='Prosen II'){
									prosen2 = val2.value;
								}else if(val2.namaKomponen==='Prosen Masa'){
									prosenMasa = val2.value;
								}else if(val2.namaKomponen==='Total Biaya Tetap'){
									totalBiayaTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Biaya Variabel'){
									totalBiayaVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Variable'){
									tarifVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Surcharge BBM'){
									surchargeBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal BBM'){
									tglBBM = val2.ext1;
								}else if(val2.namaKomponen==='Harga BBM'){
									hargaBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal kurs'){
									tglKurs = val2.ext1;
								}else if(val2.namaKomponen==='Nilai kurs'){
									nilaiKurs = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Kapal Tongkang'){
									kapalTongkang = val2.ext1;
								}else if(val2.namaKomponen==='GT Tongkang'){
									gtTongkang = val2.value;
								}else if(val2.namaKomponen==='LOA Tongkang'){
									loaTongkang = val2.value;
								}else if(val2.namaKomponen==='DWT Tongkang'){
									dwtTongkang = val2.value;
								}else if(val2.namaKomponen==='Total GT Tongkang'){
									totalGtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total LOA Tongkang'){
									totalLoaTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total DWT Tongkang'){
									totalDwtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total'){
									total2 = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Pendapatan'){
									total = formatCurr2(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah kapal'){
									jumlahKapal = formatCurr(val2.value);
								}
								// else if(val2.namaKomponen==='Total'){
								// 	totalSurcharge = formatCurr(val2.value);
								// }
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan<99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												''+value.reaDetails.jenisGerakanText+',', '', '','', ''
											],
											[
												'B. Tetap', '', '( 1 X '+gerakan+' X '+tarifTetap+' X '+prosen1+'% ) X '+prosen2+'% = '+totalBiayaTetap,'', ''
											],
											[
												'B. Variable', '', '( '+gt+' X 1 X '+tarifVariable+' X '+prosen1+'% ) X '+prosen2+'% = '+totalBiayaVariable, '',''
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===999){

								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												namaKomponen, '', '','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
								return true;
							} else if(urutan>110 && urutan<888){
								if(urutan!==777){
									rumusDetail.push({
										table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													urutan+''+keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal,'', ''
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
									});
								}
							} else if(urutan===888){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												ketDenda, '', '','= '+dataPranota.valutaMataUang, { text: totalDenda, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,100,200,20,60],
										body:[
											[
												'','','','',''
											],
											[
												'FUEL SURCHARGE','(( '+surchargeBBM+' X '+jumlahKapal+' ) / '+ nilaiKurs +' )','', '= '+dataPranota.valutaMataUang, { text: total2, alignment: 'right'}
											],
											[
												'Tgl. BBM : '+handleDataNull(tglBBM),' / Harga BBM : '+hargaBBM,'','',''
											],
											[
												'Tgl. Kurs : '+handleDataNull(tglKurs),' / Nilai Kurs : '+nilaiKurs,'','',''
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===110){
								itemKapalGandengFooter.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												'JUMLAH',{ text: totalGtTongkang, alignment: 'right'}, { text: totalLoaTongkang, alignment: 'right'}, { text: totalDwtTongkang, alignment: 'right'}
											],
											[
												'','','',''
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===100){
								itemKapalGandengHeader.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												'KAPAL YANG DIGANDENG',{ text: 'GRT', alignment: 'right'},{ text: 'LOA', alignment: 'right'},{ text: 'DWT', alignment: 'right'}
											],
											[
												''+kapalTongkang,{ text: formatCurr(''+gtTongkang), alignment: 'right'}, { text: formatCurr(''+loaTongkang), alignment: 'right'}, { text: formatCurr(''+dwtTongkang), alignment: 'right'}
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else{
								itemKapalGandeng.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												''+kapalTongkang,{ text: formatCurr(''+gtTongkang), alignment: 'right'}, { text: formatCurr(''+loaTongkang), alignment: 'right'}, { text: formatCurr(''+dwtTongkang), alignment: 'right'}
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}
						});
					}else if(value.jenisJasa===5){// BARIS JASA TUNDA
						waktuMulai 		= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglMulai:'');
						waktuSelesai 	= setFormatDateNonSecond(value.reaDetails?value.reaDetails.tglSelesai:'');
						lokasi 			= value.reaDetails.namaLokasiAsal?'Dari '+value.reaDetails.namaLokasiAsal+' Ke '+ value.reaDetails.namaLokasiTujuan:'';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						angular.forEach(result, function(val, key){
							if(!val){
								val = {};
							}
							var gerakan='',tarifTetap='',prosen1='',prosen2='',prosenMasa='',urutan='',totalBiayaTetap='',totalBiayaVariable='',tarifVariable='',gt='',surchargeBBM='',tglBBM='',tglKurs='',nilaiKurs='',hargaBBM='',kapalTongkang='',gtTongkang='',loaTongkang='',totalGtTongkang='',totalLoaTongkang='',jumlahJam='',kapalTunda='',total='',subTotal='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='',namaKomponen='',jumlahKapal='',totalSurcharge='',hpKapalTunda='',hpTotal='',jamTunda='',dwtTongkang='',totalDwtTongkang='';
							angular.forEach(result[key], function(val2, key2){
								if(!val2){
									val2 = {};
								}
								if(val2.namaKomponen==='Gerakan'){
									gerakan = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Tetap'){
									tarifTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen I'){
									prosen1 = val2.value;
								}else if(val2.namaKomponen==='Prosen II'){
									prosen2 = val2.value;
								}else if(val2.namaKomponen==='Total biaya tetap'){
									totalBiayaTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total biaya variabel'){
									totalBiayaVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Variabel'){
									tarifVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Surcharge BBM'){
									surchargeBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal BBM'){
									tglBBM = val2.ext1;
								}else if(val2.namaKomponen==='Harga BBM'){
									hargaBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal kurs'){
									tglKurs = val2.ext1;
								}else if(val2.namaKomponen==='Nilai kurs'){
									nilaiKurs = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Kapal Tongkang'){
									kapalTongkang = val2.ext1;
								}else if(val2.namaKomponen==='GT Tongkang'){
									gtTongkang = val2.value;
								}else if(val2.namaKomponen==='LOA Tongkang'){
									loaTongkang = val2.value;
								}else if(val2.namaKomponen==='DWT Tongkang'){
									dwtTongkang = val2.value;
								}else if(val2.namaKomponen==='Total GT Tongkang'){
									totalGtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total LOA Tongkang'){
									totalLoaTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total DWT Tongkang'){
									totalDwtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah Jam'){
									jumlahJam  = val2.value;
								}else if(val2.namaKomponen==='Kapal tunda'){
									kapalTunda  = val2.ext1;
								}else if(val2.namaKomponen==='Total Pendapatan'){
									total = formatCurr2(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah kapal'){
									jumlahKapal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total'){
									totalSurcharge = formatCurr(val2.value);
								}else if(val2.namaKomponen==='HP Kapal Tunda'){
									hpKapalTunda = formatCurr(val2.value);
								}else if(val2.namaKomponen==='HP Total'){
									hpTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jam tunda'){
									jamTunda = formatCurr(val2.value);
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan<99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												handleDataNull(''+kapalTunda)+',', '', '','', ''
											],
											[
												'B. Tetap', '', '( '+hpKapalTunda+' / '+hpTotal+' ) X ( '+tarifTetap+' X '+jumlahJam+' X '+prosen1+'% ) X '+prosen2+'% = '+totalBiayaTetap,'', ''
											],
											[
												'B. Variable', '', '( '+hpKapalTunda+' / '+hpTotal+' ) X (( '+tarifVariable+' X '+jumlahJam+' X '+gt+' ) X '+prosen1+'% ) X '+prosen2+'% = '+totalBiayaVariable, '', ''
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}else if(urutan===999){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												namaKomponen, '', '','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan>110 && urutan<888){
								if(urutan!==777){
									rumusDetail.push({
										table: {
										headerRows: 1,
											"widths" : [100,20,280,20,60],
											body: [
												[
													keterangan, '', biayaJasa+' X '+prosenBiaya+'% = '+subTotal,'', ''
												],
											]
										},
										style: 'header',
										layout: 'noBorders'
									});
								}
							} else if(urutan===888){
								rumusDetail.push({
									table: {
									headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												ketDenda, '', '','= '+dataPranota.valutaMataUang, { text: totalDenda, alignment: 'right'}
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,150,150,20,60],
										body:[
											[
												'','','','',''
											],
											[
												'FUEL SURCHARGE','(( '+surchargeBBM+' X '+jumlahKapal+' ) / '+ nilaiKurs +' X '+jamTunda+' )','', '= '+dataPranota.valutaMataUang, { text: totalSurcharge, alignment: 'right'}
											],
											[
												'Tgl. BBM : '+handleDataNull(tglBBM),' / Harga BBM : '+hargaBBM,'','',''
											],
											[
												'Tgl. Kurs : '+handleDataNull(tglKurs),' / Nilai Kurs : '+nilaiKurs,'','',''
											],
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===110){
								itemKapalGandengFooter.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												'JUMLAH',{ text: totalGtTongkang, alignment: 'right'}, { text: totalLoaTongkang, alignment: 'right'}, { text: totalDwtTongkang, alignment: 'right'}
											],
											[
												'','','',''
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else if(urutan===100){
								itemKapalGandengHeader.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												'KAPAL YANG DIGANDENG',{ text: 'GRT', alignment: 'right'},{ text: 'LOA', alignment: 'right'},{ text: 'DWT', alignment: 'right'}
											],
											[
												''+kapalTongkang,{ text: formatCurr(''+gtTongkang), alignment: 'right'}, { text: formatCurr(''+loaTongkang), alignment: 'right'}, { text: formatCurr(''+dwtTongkang), alignment: 'right'}
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							} else{
								itemKapalGandeng.push({
									table: {
										headerRows: 1,
										"widths" : [100,30,30,30],
										body:[
											[
												''+kapalTongkang,{ text: formatCurr(''+gtTongkang), alignment: 'right'}, { text: formatCurr(''+loaTongkang), alignment: 'right'}, { text: formatCurr(''+dwtTongkang), alignment: 'right'}
											]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}
						});
					}else if(value.jenisJasa===6){// BARIS JASA KEPIL
						// waktuMulai 		= setFormatDate(value.reaDetails?value.reaDetails.tglMulai:'');
						// waktuSelesai 	= setFormatDate(value.reaDetails?value.reaDetails.tglSelesai:'');
						// lokasi 			= value.reaDetails?'Dari '+value.reaDetails.namaLokasiAsal+' Ke '+ value.reaDetails.namaLokasiTujuan:'';
						result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						angular.forEach(result, function(val, key){
							if(!val){
								val = {};
							}
							var gerakan='',tarifTetap='',prosen='',prosen1='',prosen2='',prosenMasa='',urutan='',totalBiayaTetap='',totalBiayaVariable='',tarifVariable='',gt='',surchargeBBM='',tglBBM='',tglKurs='',nilaiKurs='',hargaBBM='',kapalTongkang='',gtTongkang='',loaTongkang='',totalGtTongkang='',totalLoaTongkang='',jumlahJam='',kapalTunda='',total='',subTotal='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='',namaKomponen='',jumlahKapal='',totalSurcharge='',tarif='',jumlahGerakan='',dwtTongkang='',totalDwtTongkang='';
							angular.forEach(result[key], function(val2, key2){
								if(!val2){
									val2 = {};
								}
								if(val2.namaKomponen==='Gerakan'){
									gerakan = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Tetap'){
									tarifTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen'){
									prosen = val2.value;
								}else if(val2.namaKomponen==='Prosen I'){
									prosen1 = val2.value;
								}else if(val2.namaKomponen==='Prosen II'){
									prosen2 = val2.value;
								}else if(val2.namaKomponen==='Total biaya tetap'){
									totalBiayaTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total biaya variabel'){
									totalBiayaVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Variabel'){
									tarifVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Surcharge BBM'){
									surchargeBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal BBM'){
									tglBBM = val2.ext1;
								}else if(val2.namaKomponen==='Harga BBM'){
									hargaBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal kurs'){
									tglKurs = val2.ext1;
								}else if(val2.namaKomponen==='Nilai kurs'){
									nilaiKurs = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Kapal Tongkang'){
									kapalTongkang = val2.ext1;
								}else if(val2.namaKomponen==='GT Tongkang'){
									gtTongkang = val2.value;
								}else if(val2.namaKomponen==='LOA Tongkang'){
									loaTongkang = val2.value;
								}else if(val2.namaKomponen==='DWT Tongkang'){
									dwtTongkang = val2.value;
								}else if(val2.namaKomponen==='Total GT Tongkang'){
									totalGtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total LOA Tongkang'){
									totalLoaTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total DWT Tongkang'){
									totalDwtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah Jam'){
									jumlahJam  = val2.value;
								}else if(val2.namaKomponen==='Kapal tunda'){
									kapalTunda  = val2.ext1;
								}else if(val2.namaKomponen==='Total'){
									total = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah kapal'){
									jumlahKapal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total'){
									totalSurcharge = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Lokasi'){
									lokasi = handleDataNull(''+val2.ext1);
								}else if(val2.namaKomponen==='Tarif'){
									tarif = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah gerakan'){
									jumlahGerakan = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal mulai'){
									waktuMulai = setFormatDateNonSecond(val2.ext1);
								}else if(val2.namaKomponen==='Tanggal selesai'){
									waktuSelesai = setFormatDateNonSecond(val2.ext1);
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan<99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											// [
											// 	handleDataNull(''+lokasi)+',', '', '','', ''
											// ],
											[
												'B. Tetap', '', '( '+tarif+' X '+jumlahGerakan+' X '+prosen+'% )','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
											// [
											// 	'','','','',''
											// ]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}
						});
					}else{// BARIS JASA OTHER
						// waktuMulai 		= setFormatDate(value.reaDetails?value.reaDetails.tglMulai:'');
						// waktuSelesai 	= setFormatDate(value.reaDetails?value.reaDetails.tglSelesai:'');
						// lokasi 			= value.reaDetails?'Dari '+value.reaDetails.namaLokasiAsal+' Ke '+ value.reaDetails.namaLokasiTujuan:'';
						// result 			= groupBy(dataPranota.items[key].details, function(item){ return [item.urutan, item.jenisJasa];});

						angular.forEach(result, function(val, key){
							if(!val){
								val = {};
							}
							var gerakan='',tarifTetap='',prosen='',prosen1='',prosen2='',prosenMasa='',urutan='',totalBiayaTetap='',totalBiayaVariable='',tarifVariable='',gt='',surchargeBBM='',tglBBM='',tglKurs='',nilaiKurs='',hargaBBM='',kapalTongkang='',gtTongkang='',loaTongkang='',totalGtTongkang='',totalLoaTongkang='',jumlahJam='',kapalTunda='',total='',subTotal='',keterangan='',prosenBiaya='',totalDenda='',ketDenda='',biayaJasa='',namaKomponen='',jumlahKapal='',totalSurcharge='',lokasi='',tarif='',jumlahGerakan='';
							angular.forEach(result[key], function(val2, key2){
								if(!val2){
									val2 = {};
								}
								if(val2.namaKomponen==='Gerakan'){
									gerakan = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Tetap'){
									tarifTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='GT'){
									gt = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Prosen'){
									prosen = val2.value;
								}else if(val2.namaKomponen==='Prosen I'){
									prosen1 = val2.value;
								}else if(val2.namaKomponen==='Prosen II'){
									prosen2 = val2.value;
								}else if(val2.namaKomponen==='Total biaya tetap'){
									totalBiayaTetap = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total biaya variabel'){
									totalBiayaVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tarif Variabel'){
									tarifVariable = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Surcharge BBM'){
									surchargeBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal BBM'){
									tglBBM = val2.ext1;
								}else if(val2.namaKomponen==='Harga BBM'){
									hargaBBM = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Tanggal kurs'){
									tglKurs = val2.ext1;
								}else if(val2.namaKomponen==='Nilai kurs'){
									nilaiKurs = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Kapal Tongkang'){
									kapalTongkang = val2.ext1;
								}else if(val2.namaKomponen==='GT Tongkang'){
									gtTongkang = val2.value;
								}else if(val2.namaKomponen==='LOA Tongkang'){
									loaTongkang = val2.value;
								}else if(val2.namaKomponen==='Total GT Tongkang'){
									totalGtTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total LOA Tongkang'){
									totalLoaTongkang = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah Jam'){
									jumlahJam  = val2.value;
								}else if(val2.namaKomponen==='Kapal tunda'){
									kapalTunda  = val2.ext1;
								}else if(val2.namaKomponen==='Total'){
									total = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Sub Total'){
									subTotal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Keterangan'){
									keterangan = val2.ext1;
								}else if(val2.namaKomponen==='Prosen Biaya'){
									prosenBiaya = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total Denda'){
									totalDenda = formatCurr(val2.value);
									ketDenda = val2.namaKomponen;
								}else if(val2.namaKomponen==='Biaya Jasa'){
									biayaJasa = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah kapal'){
									jumlahKapal = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Total'){
									totalSurcharge = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Lokasi'){
									lokasi = val2.ext1?val2.ext1:'';
								}else if(val2.namaKomponen==='Tarif'){
									tarif = formatCurr(val2.value);
								}else if(val2.namaKomponen==='Jumlah gerakan'){
									jumlahGerakan = formatCurr(val2.value);
								}
								urutan = parseInt(val2.urutan);
								namaKomponen = val2.namaKomponen;
							});
							if(urutan<99){
								rumusDetail.push({
									table: {
										headerRows: 1,
										"widths" : [100,20,280,20,60],
										body: [
											[
												handleDataNull(''+lokasi)+',', '', '','', ''
											],
											[
												'B. Tetap', '', '( '+tarif+' X '+jumlahGerakan+' X '+prosen+'% )','= '+dataPranota.valutaMataUang, { text: total, alignment: 'right'}
											],
											// [
											// 	'','','','',''
											// ]
										]
									},
									style: 'header',
									layout: 'noBorders'
								});
							}
						});
					}
					dataItems.push(
						value.jenisJasaText?{
							text: 'PERHITUNGAN JASA '+value.jenisJasaText,
							style: 'headerTitle'
						}:{},
						value.jenisJasaText?{
							table: {
							  	headerRows: 1,
							  	// widths: [ '*', 'auto', 100, '*' ],
							    body: [
									[
										'No PPK', ':', value.noPpkJasa,'',''
									],
									waktuSelesai?[
										'Waktu', ':', waktuMulai?'Dari '+waktuMulai+' sampai '+waktuSelesai:'-','',''
									]:
									[
										'Waktu', ':', waktuMulai?'Dari '+waktuMulai+' ':'-','',''										
									],
									[
										'Lokasi', ':', lokasi?lokasi:'','',''
									],
									value.jenisJasaText==='PANDU'?[
										'Jenis Pandu', ':', value.reaDetails.jenisPanduText,'',''
									]:['', '', '','',''],
									value.jenisJasaText==='TAMBAT'?[
										'Kade Meter', ':', kadeMeter?kadeMeter:'','',''
									]:['', '', '','',''],
									value.jenisJasaText==='TAMBAT'?[
										'Kapal Tender', ':', kodeKapalTender?kodeKapalTenderText+' ( '+kodeKapalTender+' )':'','',''
									]:['', '', '','',''],
							    ]
							},
							style: 'header',
							layout: 'noBorders'
						}:{},
						itemKapalGandengHeader,
						itemKapalGandeng,
						itemKapalGandengFooter,
						rumusDetail,
						{
							table: {
							  	headerRows: 1,
							  	"widths" : [120,250,30,20,60],
							    body: [
									value.jenisJasaText?[
										'', '', '','',{ text:rowJumlah,alignment: 'right'}
									]:[
										'','', '','',''
									],
									value.jenisJasaText?[
										'Total Biaya '+value.jenisJasaText, '', '','= '+dataPranota.valutaMataUang+' ',{ text: formatCurr2(value.total),alignment: 'right'}
									]:[
										'Tambahan SLG', '', '','= Rp ',{ text: formatCurr(value.totalIdr),alignment: 'right'}
									],
									value.jenisJasaText?[
										'', '', '','',{ text:rowJumlah,alignment: 'right'}
									]:[
										'','', '','',''
									],
									// value.jenisJasaText?[
									// 	// 'Terbilang ', ':', value.terbilang,'',''
									// 	'Terbilang',': '+value.terbilang, '','',''
									// ]:[
									// 	'','', '','',''
									// ]
							    ]
							},
							style: 'header',
							layout: 'noBorders'
						},
						{ text:'-----------------------------------------------------------------------------------------------------------------------------------------------------------',alignment: 'center'},
						// Sementara bgni dlu dh, terpksa, krna urgent, nanti dieksekusi dengan cara lain : :(
						key===2	?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===5	?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===8	?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===11 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===14 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===17 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===20 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===23 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===26 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===29 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===32 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===35 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===38 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===41 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===44 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===47 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===50 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===53 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===56 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===59 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===62 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===65 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===68 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===71 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===74 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===77 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===80 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===83 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===86 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===89 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===92 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===95 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===98 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===101 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===103 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===106 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===109 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===112 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===115 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===118 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===121 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===124 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===127 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===130 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===133 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===136 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===139 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===142 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===145 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===148 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===151 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===154 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===157 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===160 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===163 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===166 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===169 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===172 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===175 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===178 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===181 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===184 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===187 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===190 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===193 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===196 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===199 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===202 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===205 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===208 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===211 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===214 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===217 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===220 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===223 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===226 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===229 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===232 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:'',
						key===235 ?{
							text: '',
							pageOrientation: 'portrait',
							pageBreak: 'after'
						}:''
						// Sementara dlu dh, bgni, terpksa, krna urgent, nanti dieksekusi dengan cara lain : :(


					);
					// console.log(value.terbilang);
				});
			


			
				rowHeader.push(
					{
						table: {
							headerRows: 1,
							widths: [ 400, 150 ],
							body: [
								['PT. (PERSERO) PELABUHAN INDONESIA III, CABANG : '+itemPranota[x].kodeCabangText+' '+$scope.sktdTeks, ''],
							]
						},
						style: 'header',
						layout: 'noBorders'
				    },
				    {
						text: itemPranota[x].judulPranota,
						style: 'headerTitle',
						alignment: 'center'
					},
					{
						table: {
							headerRows: 1,
							widths: [ 90, 2, 150, 90, 2, 150 ],
							body: [
								[
									'No PPK Pertama', ':', itemPranota[x].noPpk1,
									'Pelanggan', ':', itemPranota[x].namaAgen
								],
								[
									'Kapal', ':', itemPranota[x].namaKapal,
									'Bank', ':', '-'
								],
								[
									'Jenis Kapal', ':', itemPranota[x].jenisKapal?itemPranota[x].jenisKapal:'',
									'Valuta', ':', itemPranota[x].valuta?itemPranota[x].valuta:''
								],
								[
									'Pelayaran', ':', itemPranota[x].jenisPelayaran?itemPranota[x].jenisPelayaran:'',
									'Pelabuhan Asal/Tujuan', ':', itemPranota[x].pelabuhanAsal+' / '+itemPranota[x].pelabuhanTujuan
								],
								[
									'Trayek', ':', handleDataNull(itemPranota[x].trayek),
									'Bendera', ':', handleDataNull(itemPranota[x].bendera)
								],
								[
									'Kunjungan', ':', itemPranota[x].sifatKunjungan,
									'Kemasan Bongkar/Muat', ':', handleDataNull(''+itemPranota[x].kemasanBongkar)+' / '+handleDataNull(itemPranota[x].kemasanMuat)
								],
								[
									'GT/LOA/DWT', ':', ''+itemPranota[x].gtKapal+' / '+itemPranota[x].loaKapal+' / '+itemPranota[x].dwtKapal,
									'Tonase Bongkar/Muat', ':', handleDataNull(''+itemPranota[x].jumlahBongkar)+' '+handleDataNull(''+itemPranota[x].satuanBongkar)+' / '+handleDataNull(''+itemPranota[x].jumlahMuat)+' '+handleDataNull(itemPranota[x].satuanMuat)
								],
								[
									'', '', '',
									'Batas Masa Tambat', ':', ''+itemPranota[x].batasMasaTambat
								]
							]
						},
						style: 'header',
						layout: 'noBorders'
				    },
				   	rowJasa,
					dataItems,
					
					{
						table: {
							headerRows: 1,
							"widths" : [120,250,30,20,60],
							body: [
								[
									'Tgl Kurs ',{ text: ': '+$filter('date')(itemPranota[x].tglKurs, 'dd-MM-yyyy'),alignment: 'left'},'','',''
								],
								[
									'Nilai Kurs ',{ text: ': '+formatCurr(itemPranota[x].kurs),alignment: 'left'},'','',''
								],
								itemPranota[x].valuta==='USD'?[
									'TOTAL '+itemPranota[x].valuta,'','',  '= '+itemPranota[x].valutaMataUang, { text: formatCurr(itemPranota[x].total),alignment: 'right'}
								]:['','', '','',''],
								[
									'TOTAL IDR ','' ,'',  '= Rp ', { text: formatCurr(itemPranota[x].totalIdr),alignment: 'right'}
								],
								[
									'Terbilang',': '+itemPranota[x].terbilang+' rupiah', '','',''
								]
							]
						},
						style: 'header',
						layout: 'noBorders'
						
				    },
				    rowJasa,
					{
						text: '\n\n\n'+$scope.kotaCabangPelabuhan+', '+ $filter('date')(new Date(), 'dd-MM-yyyy')
	            +'\n'+handleDataNull($scope.namaPejabatPengesahan.jabatanTercetak),
						style: 'header',
						alignment: 'right'
					},
					{
						text: '\n\n\n\n'+handleDataNull($scope.namaPejabatPengesahan.nama),
						style: 'headerTitle',
						alignment: 'right',
					}
					// {
					// 	text: '',
					// 	pageOrientation: 'portrait',
					// 	pageBreak: 'after'
					// }
				);

			contentPDF[x] = {
				pageSize: 'A4',
	        	pageOrientation: 'portrait',
				pageMargins: [ 30, 30, 30, 200 ],
				// width: 150,
				// height: 800,
				content: [
					rowHeader,
				],
				styles: {
					headerTitle: {
						fontSize: 10,
						bold: true
					},
					// header: {
					// 	fontSize: 8
					// },
					bigger: {
						fontSize: 8,
						italics: true,
					},
					header: {
						fontSize: 8
					},
					subheader: {
						fontSize: 14
					},
					superMargin: {
						margin: [20, 0, 40, 0],
						fontSize: 15,
					}
				},
				defaultStyle: {
					columnGap: 20,
				}
			}

			// if($location.path().indexOf("vasapublic") > -1){
			// 	console.log("keisni")
			// 	pdfMake.createPdf(contentPDF[x]).download(itemPranota[x].noPpk1+' - '+itemPranota[x].namaKapal+'.pdf');
			// } else{
				if(itemPranota[x].noPpk1.indexOf("A") === -1){
					pdfMake.createPdf(contentPDF[0]).download(itemPranota[0].noPpk1+' - '+itemPranota[0].namaKapal+'.pdf'); 
				}else{
					if(itemPranota.length>1){
						$timeout(function() {
							pdfMake.createPdf(contentPDF[1]).download(itemPranota[1].noPpk1+' - '+itemPranota[1].namaKapal+'.pdf'); 
						}, 2000);
					}else{
						pdfMake.createPdf(contentPDF[0]).download(itemPranota[0].noPpk1+' - '+itemPranota[0].namaKapal+'.pdf'); 
					}
				}
				// pdfMake.createPdf(contentPDF[x]).open(itemPranota[x].noPpk1+' - '+itemPranota[x].namaKapal+'.pdf'); 
			// }
		};
	};

	//add by cahyo for checking if it terminal or not terminal
	$scope.isTerminal = function (kodeTerminal) {
		if (localStorage.getItem('superVerif') == 1){
			return true;
		} else {
			//console.log(kodeTerminal === localStorage.getItem('kodeTerminalBaru'));
			return kodeTerminal === localStorage.getItem('kodeTerminalBaru');
		}
	}

	$scope.isRegionalByPass = function () {
		//for bypass regional even its not regional
		//bypass only if theres is parameter cabang super verif 
		if (localStorage.getItem('superVerif') == 1){
			return false;
		}else{
			return $scope.isRegional;
		}
	}
	//end off add by cahyo
}])
// .filter('formatCurr', ['$filter', function($filter) {
//     return function(input) {
//         input = parseFloat(input);
//         input = input.toFixed(input % 1 === 0 ? 0 : 2);
//         return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     };
// }]);
;
