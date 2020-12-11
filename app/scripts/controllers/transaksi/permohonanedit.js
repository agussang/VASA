'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPermohonaneditCtrl
 * @description
 * # TransaksiPermohonaneditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiPermohonaneditCtrl', ['$scope','$routeParams','$filter','$timeout','$location','PermohonanList','AppParam','MdmPelangganSearch','MdmPelabuhanSearch','MdmKapalSearchByName','PermohonanUnfinished','Notification','CheckLockAgen','PermohonanEdit','BindEskalasi','TipeEskalasi',
	function($scope,$routeParams,$filter,$timeout,$location,PermohonanList,AppParam,MdmPelangganSearch,MdmPelabuhanSearch,MdmKapalSearchByName,PermohonanUnfinished,Notification,CheckLockAgen,PermohonanEdit,BindEskalasi,TipeEskalasi){	

	var valueField = '';
	$scope.ppk1 = $routeParams.id;
	$scope.stt = $routeParams.status;
	$scope.fase = '';
	$scope.valCode = '';
	$scope.permohonan = {};
	$scope.btnMainSimpan = true;
	$scope.showLoader = false;
	$scope.escTypeCode = '';

	switch($routeParams.status) {
	    case 'P':
	    case 'N':
	        $scope.fase = 'Permohonan';
	        $scope.valCode = 'VALPMH049';
	        $scope.locationListPage = '/transaksi/permohonanlist/'+$routeParams.id;
	        break;
	    case 'D':
	    case 'C':
	        $scope.fase = 'Penetapan';
	        $scope.valCode = 'VALPTP010';
	        $scope.locationListPage = '/transaksi/penetapan/'+$routeParams.id;
	        break;
	   	case 'R':
	        $scope.fase = 'Realisasi';
	        $scope.valCode = 'VALREA024';
	        $scope.locationListPage = '/transaksi/realisasi/'+$routeParams.id;
	        break;
	    case 'T':
	        $scope.fase = 'Verifikasi';
	        break;
	}

	//cek untuk akses halaman, jika tidak eskalasi maka akan redirect ke halaman daftar
	var hasEsc = BindEskalasi.hasTempEskalasi($scope.valCode);
	var itemEskalasi = TipeEskalasi.getTipeEskalasi($scope.valCode);
	$scope.escTypeCode = itemEskalasi.escTypeCode;
	if(!hasEsc) $location.path($scope.locationListPage);

	/* get data */
	$scope.getDataUmumPMH = function(){
		PermohonanList.get({noPpk1: $routeParams.id},function(response){
			$scope.permohonan = response.content[0];
		});
	}

	$scope.getDataUmumPMH();

	/* validasi */
	$scope.checkValue = function(value){
		valueField = value;
	};

	$scope.validationLookupAgen = function(){
		if(valueField !== $scope.permohonan.namaAgen){
			if(typeof $scope.permohonan.namaAgen != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-001</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.permohonan.namaAgen = '';
			}
		}
	};

	$scope.validationNegaraAsal = function(val){
		if(val !== ''){  
			if(valueField !== $scope.permohonan.namaKapal){
				if(typeof $scope.permohonan.namaPelabuhanAsal == 'object'){
					if($scope.permohonan.namaPelabuhanAsal.mnegKode == null){
						$scope.setNotification  = {
							type	: 'warning',
							message	: '<b>Peringatan : Pelabuhan '+$scope.permohonan.namaPelabuhanAsal.mplbNama+' tidak memiliki Kode Negara, dapat meyebabkan gagal simpan jasa.</b>'
						};
						Notification.setNotification($scope.setNotification);
						$scope.permohonan.namaPelabuhanAsal = '';
					}
				}
			}
		}
	};

	$scope.validationNegaraTujuan = function(val){
		if(val !== ''){
			if(typeof $scope.permohonan.namaPelabuhanTujuan == 'object'){
				if($scope.permohonan.namaPelabuhanTujuan.mnegKode == null){
					$scope.setNotification  = {
						type	: 'warning',
						message	: '<b>Peringatan : Pelabuhan '+$scope.permohonan.namaPelabuhanTujuan.mplbNama+' tidak memiliki Kode Negara, dapat meyebabkan gagal simpan jasa.</b>'
					};
					Notification.setNotification($scope.setNotification);
					$scope.permohonan.namaPelabuhanTujuan = '';
				}
			}
		}
	};

	$scope.validationLookupAsal = function(){
		if(valueField !== $scope.permohonan.namaPelabuhanAsal){
			if(typeof $scope.permohonan.namaPelabuhanAsal != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-002</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.permohonan.namaPelabuhanAsal = '';
			}
		}
	};

	$scope.validationLookupTujuan = function(){
		if(valueField !== $scope.permohonan.namaPelabuhanTujuan){
			if(typeof $scope.permohonan.namaPelabuhanTujuan != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-003</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.permohonan.namaPelabuhanTujuan = '';
			}
		}
	};

	$scope.validationLookupKapal = function(){
		if(valueField !== $scope.permohonan.namaKapal){
			if(typeof $scope.permohonan.namaKapal!= 'object' && !$routeParams.id){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-014</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.permohonan.namaKapal = '';
			}else{
				$scope.cekLayanan($scope.permohonan.namaKapal);
			}
		}
	};

	$scope.cekLayanan = function(kapal) {
		if (kapal.mkplKode !== undefined) {
	        if(kapal.mkplBendera == null){
	        	$scope.setNotification  = {
					type	: 'warning',
					message	: 'Kapal '+kapal.mkplNama+' tidak memiliki data Bendera. <br>Silahkan informasikan ke pengguna jasa untuk melengkapi data tersebut dengan melampirkan surat ukur.'
				};
				Notification.setNotification($scope.setNotification);
				$scope.permohonan.namaKapal = '';
				return false;
	        }

	        if(kapal.mkplKode !==$scope.permohonan.kodeKapal){
				PermohonanUnfinished.get({
					kodeKapal: kapal.mkplKode
				}, function(response) {
				    if (response.flagDone===1) {
				        $scope.setNotification  = {
							type	: 'warning',
							message	: 'Kapal masih memiliki Layanan aktif.'
						};
						Notification.setNotification($scope.setNotification);
						$scope.permohonan.namaKapal = '';
				        $scope.setInformasiKapal();
				    }else{
				        $scope.setInformasiKapal(kapal);
				    }
				}, function(){});
	        }else{
	        	$scope.setInformasiKapal(kapal);
	        }
        }
	};

	$scope.setInformasiKapal = function(kapal) {
		if(kapal){
			$scope.permohonan.namaKapal = kapal.mkplNama;
			$scope.permohonan.negaraKapal = kapal.mkplBendera;
	        $scope.permohonan.gtKapal = kapal.mkplGrt;
	        $scope.permohonan.loaKapal = kapal.mkplLoa;
	        $scope.permohonan.loa = kapal.mkplLoa;
	        $scope.permohonan.kodeKapal = kapal.mkplKode;
	        $scope.permohonan.jenisKapal = kapal.mkplJenis;
	        $scope.permohonan.callSign = kapal.mkplCallSign;
		}else{
			$scope.permohonan.kodeKapal = '';
			$scope.permohonan.negaraKapal = '';
	        $scope.permohonan.gtKapal = '';
	        $scope.permohonan.loa = '';
	        $scope.permohonan.jenisKapal = '';
	        $scope.permohonan.callSign = '';
		}
	};

/*data master */
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

	$scope.getListOfPelabuhan = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmPelabuhanSearch.get({
					nama: value,
					limit: '50'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
		                response.mkplNamaPlb = response.mplbNama +' ('+response.mplbKode+')';
		            });
				});
			});
		}
	};

	$scope.getListOfPelabuhanTujuan = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmPelabuhanSearch.get({
					nama: value,
					limit: '50'
				}, function(response) {
					resolve(response);
					response.forEach(function (response) {
		                response.mkplNamaPlbTjn = response.mplbNama +' ('+response.mplbKode+')';
		            });
				});
			});
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
		                response.mkplNamaLoa = response.mkplNama +' (LOA: '+response.mkplLoa + ' GT: '+response.mkplGrt+')';
		            });
				});
			});
		}
	};

	//get parameter Sifat Kunjungan
	AppParam.get({nama: 'KUNJUNGAN'}, function(response) {
		$scope.sifatKunjungan = $filter('orderBy')(response.content,'value');
		$scope.permohonan.sifatKunjungan = $scope.sifatKunjungan[0].value;
	});

	AppParam.get({nama: 'SATUAN'}, function(response) {
		$scope.satuan = response.content;
	});

	AppParam.get({nama: 'KEMASAN'}, function(response) {
		$scope.kemasan = response.content;
		if($scope.escTypeCode){
			var item = {
			    "nama" : "KEMASAN",
			    "caption" : "",
			    "value" : ""
			};
			$scope.kemasan.push(item);
		}
	});

	$scope.setDisabledBtnUpdate = function(){
		$scope.disabledBtnUpdate = false;
		if(!$scope.permohonan.kemasanMuat && !$scope.permohonan.kemasanBongkar){
			$scope.disabledBtnUpdate = true;
		}
	}

	$scope.$watch('permohonan.kemasanBongkar', function(newVal, oldVal){
		if(!newVal){
			$scope.permohonan.jumlahBongkar = '';
			$scope.permohonan.satuanBongkar = '';
		}
		$scope.setDisabledBtnUpdate();
	});

	$scope.$watch('permohonan.kemasanMuat', function(newVal, oldVal){
		if(!newVal){
			$scope.permohonan.jumlahMuat = '';
			$scope.permohonan.satuanMuat = '';
		}
		$scope.setDisabledBtnUpdate();
	});


/*submit update*/
	$scope.update = function(){
		$scope.btnMainSimpan = false;
		$scope.showLoader = true;
		if(typeof $scope.permohonan.namaKapal==='object'){
			$scope.cekLayanan($scope.permohonan.namaKapal);
		}

		if($scope.permohonan.namaKapal === undefined || $scope.permohonan.namaKapal===''){
			$('#namaKapalDataUmum').focus();
			return false;
		}

		CheckLockAgen.get({
            icustomer:(typeof $scope.permohonan.namaAgen==='object')?$scope.permohonan.namaAgen.mplgKode:$scope.permohonan.kodeAgen,
            kodeCabang : localStorage.kodeCabang
          }, function(response){
          	if(response.edescription != '0'){
          		$scope.btnMainSimpan = true;
          		$scope.showLoader = false;
              	$scope.getDataUmumPMH();
              	$scope.edescription = response.edescription;
              	$('#modalCheckLockAgen').modal('show');
            }else{
            	var dataEdit ={};
				if(typeof $scope.permohonan.namaKapal == 'object'){
					dataEdit.kodeKapal = $scope.permohonan.namaKapal.mkplKode;
					dataEdit.namaKapal = $scope.permohonan.namaKapal.mplgNama;
				}else{
					dataEdit.kodeKapal = $scope.permohonan.kodeKapal;
					dataEdit.namaKapal = $scope.permohonan.namaKapal;
				}

				if(typeof $scope.permohonan.namaAgen == 'object'){
					dataEdit.kodeAgen = $scope.permohonan.namaAgen.mplgKode;
					dataEdit.namaAgen = $scope.permohonan.namaAgen.mplgNama;
				}else{
					dataEdit.kodeAgen = $scope.permohonan.kodeAgen;
					dataEdit.namaAgen = $scope.permohonan.namaAgen;
				}

				if(typeof $scope.permohonan.namaPelabuhanAsal == 'object'){
					dataEdit.kodePelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbKode;
					dataEdit.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal.mplbNama;
				}else{
					dataEdit.kodePelabuhanAsal = $scope.permohonan.kodePelabuhanAsal;
					dataEdit.namaPelabuhanAsal = $scope.permohonan.namaPelabuhanAsal;
				}

				if(typeof $scope.permohonan.namaPelabuhanTujuan == 'object'){
					dataEdit.kodePelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbKode;
					dataEdit.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan.mplbNama;
				}else{
					dataEdit.kodePelabuhanTujuan = $scope.permohonan.kodePelabuhanTujuan;
					dataEdit.namaPelabuhanTujuan = $scope.permohonan.namaPelabuhanTujuan;
				}

				dataEdit.sifatKunjungan = $scope.permohonan.sifatKunjungan;
				dataEdit.kemasanBongkar = $scope.permohonan.kemasanBongkar;
				dataEdit.kemasanMuat = $scope.permohonan.kemasanMuat;
				dataEdit.jumlahBongkar = $scope.permohonan.jumlahBongkar;
				dataEdit.jumlahMuat = $scope.permohonan.jumlahMuat;
				dataEdit.satuanBongkar = $scope.permohonan.satuanBongkar;
				dataEdit.satuanMuat = $scope.permohonan.satuanMuat;

				PermohonanEdit.update({id:$routeParams.id}, dataEdit,function(response){
					if(response.status=='500'){
						$scope.setNotification  = {
							type	: "warning",
							message	: "Data tidak berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);						
					}else{
						$scope.setNotification  = {
							type	: "success",
							message	: "Data berhasil tersimpan"
						};
						Notification.setNotification($scope.setNotification);
						BindEskalasi.setDefaultEskalasi();
						$scope.showLoader = false;
						$scope.btnMainSimpan = true;
						
						$timeout(function() {
							$location.path($scope.locationListPage); 
				        }, 2000);
					}					
				},function(response){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			}
		});
	}
}]);