'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiKapalGeserCtrl
 * @description
 * # TransaksiKapalGeserCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiKapalGeserCtrl',['$scope','$filter','$timeout','$location','$window','SearchPpk1','AppParam','PermohonanList','PenetapanDetail','Notification','PermohonanMultiDetail','PermohonanTambat','PenetapanTambat','PenetapanTambatEdit','RealisasiTambatEdit','PenetapanTambatByPpkJasa','MdmKapalSearchByName','PermohonanByKodeKapal','ConfirmedPenetapan','MdmDermagaSearch','Validations','RealisasiTambatDetailbyPpkJasa','LoadingScreen',function($scope,$filter,$timeout,$location,$window,SearchPpk1,AppParam,PermohonanList,PenetapanDetail,Notification,PermohonanMultiDetail,PermohonanTambat,PenetapanTambat,PenetapanTambatEdit,RealisasiTambatEdit,PenetapanTambatByPpkJasa,MdmKapalSearchByName,PermohonanByKodeKapal,ConfirmedPenetapan,MdmDermagaSearch,Validations,RealisasiTambatDetailbyPpkJasa,LoadingScreen){
 	LoadingScreen.show();
 	$scope.dataUmum = {};
 	$scope.jasatambat = {};
 	$scope.jasatambatbaru = {};
 	var detailsPenetapan = [];
 	var detailsRealisasi = [];
 	var checkTambat = false;
 	var detailsjasa = {};
 	$scope.lokasi = [];
 	$scope.btnLanjut = false;
 	document.getElementById("tambatGeserTab").style.display = "none";
 	$scope.kodeKade = '+';

 	$scope.options = {
 		autoclose: true,
 		todayBtn: 'linked',
		todayHighlight: true
	};

	AppParam.get({nama: 'KUNJUNGAN'}, function(response) {
		$scope.sifatKunjungan = response.content;
		$scope.dataUmum.sifatKunjungan = $scope.sifatKunjungan[0].value;
	});

	//get parameter kemasan
	AppParam.get({nama: 'KEMASAN'}, function(response) {
		$scope.kemasan = response.content;
	});

	//get parameter satuan
	AppParam.get({nama: 'SATUAN'}, function(response) {
		$scope.satuan = response.content;
	});

	var setDisableDateTambat = function(){
		$('#tglMulaiTambatBaru').datepicker('setStartDate',$scope.tglSelesaiTambat);
	   	$('#tglSelesaiBaru').datepicker('setStartDate',$scope.tglMulaiTambatBaru);
		$('#tglMulaiTambatBaru').mask('99-99-9999');
		$('#tglSelesaiBaru').mask('99-99-9999');
	}

	$scope.$watch('tglMulaiTambatBaru', function(){
		$timeout(function() {
			setDisableDateTambat();
		}, 1000);
	});

	$scope.$watch('tglSelesaiTambatBaru', function(){
		$timeout(function() {
			setDisableDateTambat();
		}, 1000);
	});

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

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

	$scope.checkNull = function(value){
		if($scope.dataUmum.namaKapal == null || $scope.dataUmum.namaKapal == ''){
			$scope.dataUmum = {};
			detailsPenetapan = [];
			$scope.lokasi = [];
			$scope.btnLanjut = false;
			document.getElementById("tambatGeserTab").style.display = "none";
		}
		if(typeof value != 'object'){
			$scope.dataUmum = {};
			detailsPenetapan = [];
			$scope.lokasi = [];
			$scope.dataUmum.namaKapal = value;
			$scope.btnLanjut = false;
			document.getElementById("tambatGeserTab").style.display = "none";
		}
	}

	$scope.validationLookupPpk1 = function(){
		if(typeof $scope.dataUmum.noPpk1 != 'object'){ 
			$scope.setNotification  = {
				type	: 'warning',
				message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-007</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.dataUmum = {};
			$scope.btnLanjut = false;
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
					response.forEach(function (response) {
		                response.mkplNamaLoa = response.mkplNama +' ('+response.mkplKode+', GT: '+formatSeparator(response.mkplGrt) + ', LOA: '+formatSeparator(response.mkplLoa)+', '+response.mkplJenis+')';
		            });
			  	});
			});
	  	}
	};

	$scope.getListOfDermagaTambat = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmDermagaSearch.get({
			  		nama: value,
			  		limit: '10'
			  	}, function(response) {
			  		resolve(response);
			  	});
			});
		}
	};

	$scope.nextStep = function(){
		if($scope.lokasi.length <= 0){
			$scope.setNotification  = {
				type	: 'warning',
				message	: 'Nama kapal yang Anda Masukan Tidak Memiliki Jasa Tambat,<br> Silahkan Pilih Nama Kapal Lain!<br><b>Jasa Tambat harus sudah Penetapan.</b><br><br>Kode validasi : <b>VALOTH-011</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.dataUmum = {};
			$scope.btnLanjut = false;
		}else{
			document.getElementById("tambatGeserTab").style.display = "block";
			$scope.setNotification  = {
				type	: 'warning',
				message	: 'Silahkan Lanjutkan dengan mengisi Jasa Tambat, pada Tab Tambat.'
			};
			Notification.setNotification($scope.setNotification);
		}

	}

	$scope.$watch('dataUmum.noPpk1',function(){
		if(typeof $scope.dataUmum.noPpk1 === 'object'){
			detailsPenetapan = [];
			var tempPpk1 = '';
			$scope.dataUmum.idVisit = $scope.dataUmum.noPpk1.idVisit;
			$scope.dataUmum.kodeKapal = $scope.dataUmum.noPpk1.kodeKapal;
			$scope.dataUmum.namaKapal = $scope.dataUmum.noPpk1.namaKapal;
			$scope.dataUmum.kodePelabuhanAsal = $scope.dataUmum.noPpk1.kodePelabuhanAsal;
			$scope.dataUmum.namaPelabuhanAsal = $scope.dataUmum.noPpk1.namaPelabuhanAsal;
			$scope.dataUmum.kodePelabuhanTujuan = $scope.dataUmum.noPpk1.kodePelabuhanTujuan;
			$scope.dataUmum.namaPelabuhanTujuan = $scope.dataUmum.noPpk1.namaPelabuhanTujuan;
			$scope.dataUmum.kodeAgen = $scope.dataUmum.noPpk1.kodeAgen;
			$scope.dataUmum.namaAgen = $scope.dataUmum.noPpk1.namaAgen;
			$scope.dataUmum.sifatKunjungan = $scope.dataUmum.noPpk1.sifatKunjungan;
			$scope.dataUmum.kemasanBongkar = $scope.dataUmum.noPpk1.kemasanBongkar;
			$scope.dataUmum.jumlahBongkar = $scope.dataUmum.noPpk1.jumlahBongkar;
			$scope.dataUmum.satuanBongkar = $scope.dataUmum.noPpk1.satuanBongkar;
			$scope.dataUmum.kemasanMuat = $scope.dataUmum.noPpk1.kemasanMuat;
			$scope.dataUmum.jumlahMuat = $scope.dataUmum.noPpk1.jumlahMuat;
			$scope.dataUmum.satuanMuat = $scope.dataUmum.noPpk1.satuanMuat;
			$scope.dataUmum.jenisKapal = $scope.dataUmum.noPpk1.jenisKapal;
			$scope.dataUmum.negaraKapal = $scope.dataUmum.noPpk1.negaraKapal;
			$scope.dataUmum.callSign = $scope.dataUmum.noPpk1.callSign;
			$scope.dataUmum.loa = $scope.dataUmum.noPpk1.loa;
			$scope.dataUmum.gtKapal = $scope.dataUmum.noPpk1.gtKapal;
			
			//PermohonanByKodeKapal.get({kodeKapal :  $scope.dataUmum.namaKapal.mkplKode}, function(response){
				//if(response.status != '500'){
					tempPpk1 = $scope.dataUmum.noPpk1.noPpk1;
					PermohonanList.get({noPpk1 : tempPpk1},function(response){						
						if(response.content.length > 0){
							if(response.content[0].details.length > 0){
								for (var i = 0; i < response.content[0].details.length; i++) {
									if(response.content[0].details[i].status !== 'N' || response.content[0].details[i].status !== 'P'){
										if(response.content[0].details[i].jasa.length > 0){
											for (var j = 0; j < response.content[0].details[i].jasa.length; j++) {
												if(response.content[0].details[i].jasa[j].status === 2 && response.content[0].details[i].jasa[j].nama === 'epb_tambat'){
													var status = response.content[0].details[i].status;
													if(status==='R'){ 
														RealisasiTambatDetailbyPpkJasa.get({noPpkJasa : response.content[0].details[i].jasa[j].noPpkJasa}, function(responserea){
															responserea.statusDetail = status;
															if(responserea.statusGeser === false){
																detailsRealisasi.push(responserea);
																$scope.lokasi = detailsRealisasi;
															}
														});
													}else{ 
														PenetapanTambatByPpkJasa.get({ppkjasa : response.content[0].details[i].jasa[j].noPpkJasa}, function(responseptp){
															responseptp.statusDetail = status;
															if(responseptp.statusGeser === false){
																detailsPenetapan.push(responseptp);
																$scope.lokasi = detailsPenetapan;
															}
														});
													}
												}
											}
										}
									}
								}
								$scope.btnLanjut = true;
							}
						}else{
							$scope.setNotification  = {
								type	: 'warning',
								message	: 'Nama Kapal yang Anda Masukan Tidak Memiliki Jasa Apapun,<br> Silahkan Pilih No.PPK1 Lain!<br><br>Kode validasi: <b>VALPMH-012</b>'
							};
							Notification.setNotification($scope.setNotification);
							$scope.dataUmum = {};
							$scope.btnLanjut = false;
						}
					});
				/*}
				else{
					$scope.setNotification  = {
						type	: 'danger',
						message	: response.description+'<br> <b>Kapal telah keluar.<b>',
						timeout : 10000
					};
					Notification.setNotification($scope.setNotification);
					$scope.dataUmum = {};
					$scope.btnLanjut = false;
				}*/
			//});

		}
	});
	
	LoadingScreen.hide();
	//start untuk validasi panjang loa dengan panjang dermmaga dan menentukan max kade meter :
	$scope.$watch('jasatambat.lokasi', function(newValue){
 		var lokasi = $scope.jasatambat.lokasi;
 		var loaKapal = $scope.dataUmum.loa;
 		var mdmgPanjang;
		if(typeof lokasi==='object'){
			/*validasi veirfikasi*/
			if(lokasi.statusDetail==='R' && Validations.checkStatusIsVerified(lokasi)===true){
				return false; 	
			}
			if(localStorage.kodeCabang==="31" || localStorage.kodeCabang==="21"){
				console.log("Skip Validasi Cabang...");
			}else{
				$scope.getListOfDermagaTambat(lokasi.namaLokasi).then(function(result) {
					//get panjang dermaga :
					if(result.length>0){
						result.forEach(function(item) {
							if(item.mdmgNama===lokasi.namaLokasi){
								mdmgPanjang = item.mdmgPanjang?item.mdmgPanjang:0;
							}
						});
					}else{
						mdmgPanjang = 0;
					}

					$scope.maxKadeMeter = mdmgPanjang-loaKapal;
					if(loaKapal > mdmgPanjang){
						$scope.setNotification  = {
							type    : 'warning',
							message : 'Panjang Dermaga ('+mdmgPanjang+' m) lebih kecil dari Panjang Kapal ('+loaKapal+' m)'
						};
						Notification.setNotification($scope.setNotification);
						// $scope.jasatambatbaru.kadeAwal = 0;
					}
				});
			}
			detailsjasa = $scope.jasatambat.lokasi;
			$scope.jasatambat = $scope.jasatambat.lokasi;
			$scope.jasatambat.lokasi = $scope.jasatambat.namaLokasi;
			document.getElementById("jamMulaiTambatVal").value = $filter('date')($scope.jasatambat.tglMulai, 'HH:mm');
			document.getElementById("jamSelesaiTambatVal").value =  $filter('date')($scope.jasatambat.tglSelesai, 'HH:mm');
			$scope.tglMulaiTambat = $filter('date')($scope.jasatambat.tglMulai, 'dd-MM-yyyy');
			$scope.tglSelesaiTambat = $filter('date')($scope.jasatambat.tglSelesai, 'dd-MM-yyyy');
		}
	});
	//end untuk validasi panjang loa dengan panjang dermmaga dan menentukan max kade meter :

	/*
	$scope.$watch('jasatambat.lokasi', function(){
		if(typeof $scope.jasatambat.lokasi === 'object'){
			detailsjasa = $scope.jasatambat.lokasi;
			$scope.jasatambat = $scope.jasatambat.lokasi;
			$scope.jasatambat.lokasi = $scope.jasatambat.namaLokasi;
			document.getElementById("jamMulaiTambatVal").value = $filter('date')($scope.jasatambat.tglMulai, 'HH:mm');
			document.getElementById("jamSelesaiTambatVal").value =  $filter('date')($scope.jasatambat.tglSelesai, 'HH:mm');
			$scope.tglMulaiTambat = $filter('date')($scope.jasatambat.tglMulai, 'dd-MM-yyyy');
			$scope.tglSelesaiTambat = $filter('date')($scope.jasatambat.tglSelesai, 'dd-MM-yyyy');
		}
	})
	*/

	$scope.loaValue = function(){
 		$scope.jasatambatbaru.kadeAkhir = eval(parseInt($scope.jasatambatbaru.kadeAwal) + $scope.kodeKade + parseInt($scope.dataUmum.loa));
	 	if(isNaN($scope.jasatambatbaru.kadeAkhir)){
	 		$scope.jasatambatbaru.kadeAkhir = 0;
	 	}
 	};

 	$scope.$watch('kodeKade',function(newValue,oldValue){
 		if(newValue != oldValue){
 			$scope.loaValue();
 		}
 	});

 	$scope.checkIfNull = function(){
 		if($scope.jasatambatbaru.kadeAwal == null){
 			$scope.jasatambatbaru.kadeAwal = 0;
 		}
 	};

	$scope.submitGeser = function(){
		if($scope.jasatambat.statusDetail == 'R'){
			if($scope.tglSelesaiTambat != null){	
				$scope.setNotification  = {
						type	: "warning",
						message	: "Permohonan Geser tidak dapat dilakukan, karena <b>Last Line Tambat</b> sudah diinputkan."
					};
				Notification.setNotification($scope.setNotification);
				return false;
			}	
		}

		var datapermohonan = {};
		datapermohonan.kodePelabuhanAsal = $scope.dataUmum.kodePelabuhanAsal;
		datapermohonan.namaPelabuhanAsal = $scope.dataUmum.namaPelabuhanAsal;
		datapermohonan.kodePelabuhanTujuan = $scope.dataUmum.kodePelabuhanTujuan;
		datapermohonan.namaPelabuhanTujuan = $scope.dataUmum.namaPelabuhanTujuan;
		datapermohonan.sifatKunjungan = $scope.dataUmum.sifatKunjungan;
		datapermohonan.kemasanBongkar = $scope.dataUmum.kemasanBongkar;
		datapermohonan.jumlahBongkar = $scope.dataUmum.jumlahBongkar;
		datapermohonan.satuanBongkar = $scope.dataUmum.satuanBongkar;
		datapermohonan.kemasanMuat = $scope.dataUmum.kemasanMuat;
		datapermohonan.jumlahMuat = $scope.dataUmum.jumlahMuat;
		datapermohonan.satuanMuat = $scope.dataUmum.satuanMuat;
		datapermohonan.kodeKapal = $scope.dataUmum.kodeKapal;
		datapermohonan.namaKapal = $scope.dataUmum.namaKapal;
		datapermohonan.kodeAgen = $scope.dataUmum.kodeAgen;
		datapermohonan.namaAgen = $scope.dataUmum.namaAgen;

		var datatambat = {};
		datatambat.noPpk1 = $scope.jasatambat.noPpk1;
		datatambat.kadeAwal = $scope.jasatambatbaru.kadeAwal;
		datatambat.kadeAkhir = $scope.jasatambatbaru.kadeAkhir;
		datatambat.namaLokasi = $scope.jasatambat.namaLokasi;
		datatambat.kodeLokasi = $scope.jasatambat.kodeLokasi;
		var tglTambatMskVal = $filter('date')($scope.tglMulaiTambatBaru, 'yyyy-MM-dd');
		var jamTambatMskVal = document.getElementById("jamMulaiTambatValBaru").value;
		datatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;
		var tglTambatSlsVal = $filter('date')($scope.tglSelesaiTambatBaru, 'yyyy-MM-dd');
		var jamTambatSlsVal = document.getElementById("jamSelesaiTambatValBaru").value;
		datatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
		datatambat.flagSuratPerintah = $scope.flagSuratPerintah?1:0;
		datatambat.status = 2;
		datatambat.flagRampdoor = '0';

		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulai = Date.parse(datatambat.tglMulai);
		var parseTglSelesai = Date.parse(datatambat.tglSelesai);
		if(parseTglMulai>=parseTglSelesai){
			var note =  {
							type 	: "warning",
							message : "Tgl & Jam Mulai Tambat harus melebihi Tgl & Jam Selesai Tambat"
						};
			Notification.setNotification(note);
			return false;
		}
		// end Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai

		PermohonanMultiDetail.save({noPpk1 : $scope.dataUmum.noPpk1.noPpk1}, {}, function(response){
			datatambat.detailPmhId = response.id;
			datatambat.urutanPermohonan = response.urutanPermohonan;
			datatambat.statusPelaksanaan = 5;
			var formData = new FormData();
			formData.append('pmhTambat', new Blob([JSON.stringify(datatambat)], { type: "application/json" }));
			PermohonanTambat.save(formData, function(responsetambat) {
				if(responsetambat.status != '500'){
					responsetambat.status = 2;
					responsetambat.statusPelaksanaan = 5;
					PenetapanTambat.save(responsetambat,function(responseptptambat){
						if(responseptptambat.status != '500'){
							var dataEdit = {};
							$scope.jasatambat.tglSelesai = responseptptambat.tglMulai;
							$scope.jasatambat.statusTambat = '3';
							$scope.jasatambat.statusGeser = true;
							PenetapanTambatEdit.update({id:$scope.jasatambat.noPpkJasa},$scope.jasatambat, function(responseupdateptp){
								if(responseupdateptp.status != '500'){
									$scope.setNotification  = {
										type	: "success",
										message	: "Data berhasil tersimpan"
									};
									Notification.setNotification($scope.setNotification);
								}else{
									var note  = {
										type	: "error",
										message	: "Data gagal disimpan"
									};
									Notification.setNotification(note);
								}
							});
							ConfirmedPenetapan.update({ppk1:$scope.dataUmum.noPpk1.noPpk1,urutan:datatambat.urutanPermohonan}, {},function(response){
								$scope.setNotification  = {
									type	: "success",
									message	: "Konfirmasi Data Berhasil."
								};
								Notification.setNotification($scope.setNotification);
							});
							/*if ($scope.jasatambat.statusDetail == 'R') {
								RealisasiTambatEdit.update({noPpkJasa: $scope.jasatambat.noPpkJasa}, $scope.jasatambat,function(responseupdaterea){
							       	if(responseupdaterea.status != '500'){
							       		$scope.setNotification  = {
											type	: "success",
											message	: "Data berhasil tersimpan"
										};
										Notification.setNotification($scope.setNotification);
							       	}else{
							       		var note  = {
											type	: "error",
											message	: "Data gagal disimpan"
										};
										Notification.setNotification(note);
							       	}
							    });
							}*/
							$scope.setNotification  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification($scope.setNotification);
							$scope.jasatambat = {};
							$scope.jasatambatbaru = {};
						}else{
							var note  = {
								type	: "error",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					});
					if(datatambat.flagSuratPerintah == 0){
						$timeout(function() {
							$scope.validationWajibPandu(datatambat.flagSuratPerintah);
				        }, 2000);
					}else{
						$timeout(function() {
				        	$location.path('/transaksi/penetapan');
				        }, 2000);
					}
				}else{
					var note  = {
						type	: "error",
						message	: "Data gagal disimpan"
					};
					Notification.setNotification(note);
				}

			});
		});
	}

	$scope.validationWajibPandu = function(val){
		//if(localStorage.validasiWajibPanduTunda==='1' && $scope.dataUmum.gtKapal >=500 && $scope.dataUmum.jenisKapal!=="KPLTONKANG"){
		if(val == false || val == 0){
			if(localStorage.validasiWajibPanduTunda==='1' && $scope.dataUmum.gtKapal >=500 && $scope.dataUmum.jenisKapal!=="KPLTONKANG"){
				$('#ConfirmWajibPandu').modal('show');
			}else{
				$location.path('/transaksi/penetapan');
			}
		}
	}

	$scope.openTambahJasa = function(){
		$window.location.reload();
		$location.path('/transaksi/jasabaru/'+$scope.dataUmum.kodeKapal);
	}
}]);
