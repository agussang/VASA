'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerlokasitujuanNewCtrl
 * @description
 * # PerlokasitujuanNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('PerlokasitujuanNewCtrl',['$scope', '$filter','$timeout', '$location','Notification', 'PelangganPerLokasiAdd','MdmDermagaSearch','MdmPelangganSearch','AppParam','PejabatPengesahanSearch','LoadingScreen','Validations','MdmDermagaSearchByKode','MdmDermagaPerJasa', function ($scope,$filter,$timeout,$location,Notification,PelangganPerLokasiAdd,MdmDermagaSearch,MdmPelangganSearch,AppParam,PejabatPengesahanSearch, LoadingScreen,Validations,MdmDermagaSearchByKode,MdmDermagaPerJasa) {

	LoadingScreen.show();
	$scope.perlokasi = {};
	$scope.perlokasi.status=1;
	$scope.perlokasi.nilaiTagihan=0;
	$scope.locationPath = '/perlokasitujuan/list';
  $scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.perlokasi.aktif = true;
	$scope.required = true;
	$scope.tglMulaiBerlaku = new Date();
	$scope.tglSelesaiBerlaku = new Date();
	$scope.tglSepakat = new Date();

	//Start Set Disabled Date :
	var setDisableDate = function(){
		$('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.tglMulaiBerlaku);
		$('#tglMulaiBerlaku').mask('99-99-9999');
		$('#tglSelesaiBerlaku').mask('99-99-9999');
		$('#tglSepakat').mask('99-99-9999');
	};

	$scope.$watch('tglMulaiBerlaku', function(){
		$timeout(function() {
		  setDisableDate();
		}, 1000);
	});

	$scope.$watch('tglSelesaiBerlaku', function(){
		$timeout(function() {
		  setDisableDate();
		}, 1000);
	});
	//End Set Disabled Date :

	$scope.options = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
	};

	//get parameter JASA
	AppParam.get({nama:'JASA'},function(response){
		$scope.jasa = response.content;

	});

	//get parameter persetujuan
  AppParam.get({nama:'PERSETUJUAN'},function(response){
    $scope.persetujuan = response.content;
  });

	//get valuta
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupPelanggan = function(){
    if(valueField !== $scope.mdmPelanggan){
      if(typeof $scope.mdmPelanggan != 'object'){
        $scope.setNotification  = {
          type : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.mdmPelanggan = '';
      }
    }
  }

  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.dermagaText){
      if(typeof $scope.dermagaText != 'object'){
        $scope.setNotification  = {
          type : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.dermagaText = '';
      }
    }
  }

  $scope.validationLookupPejabat= function(){
    if(valueField !== $scope.perlokasi.pejabat){
      if(typeof $scope.perlokasi.pejabat != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.perlokasi.pejabat = '';
      }
    }
  }

  $scope.validationLookupPelangganPelabuhan= function(){
    if(valueField !== $scope.perlokasi.pelanggan){
      if(typeof $scope.perlokasi.pelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.perlokasi.pelanggan = '';
      }
    }
  }
  /* end validasi autocomplete */

  $scope.getListOfDermaga = function(value) {
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

  /*autocomplete master data pelanggan*/
  $scope.getListOfPelanggan = function(value) {
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

	/*autocomplete master pejabat pelabuhan*/
  $scope.getListOfPejabat = function(value) {
    if (value) {
      var upper_value = $filter('uppercase')(value);
      return new Promise(function(resolve, reject) {
        PejabatPengesahanSearch.get({
          nama: upper_value,
          limit: '10'
        }, function(response) {
           resolve(response);
        });
      });
    }
  };

	/*autocomplete master pelanggan pelabuhan*/
 	$scope.getListOfPelangganpelabuhan = function(value) {
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

	$scope.$watch('perlokasi.nilaiPelabuhan', function () {
  	if($scope.perlokasi.nilaiPelabuhan !== null)
		{
			$scope.perlokasi.nilaiPelanggan = 100 - $scope.perlokasi.nilaiPelabuhan;
		}
	});

	$scope.$watch('perlokasi.nilaiPelanggan', function () {
  	if($scope.perlokasi.nilaiPelanggan !== null)
		{
			$scope.perlokasi.nilaiPelabuhan = 100 - $scope.perlokasi.nilaiPelanggan;
		}
	});

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.perlokasi.kodePelanggan=$scope.mdmPelanggan.mplgKode;
		$scope.perlokasi.kodePelangganText=$scope.mdmPelanggan.mplgNama;
		$scope.perlokasi.tglMulaiBerlaku = $filter('date')($scope.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.perlokasi.tglSelesaiBerlaku = $filter('date')($scope.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.perlokasi.tglSepakat = $filter('date')($scope.tglSepakat, 'yyyy-MM-ddT00:00:00');
		$scope.perlokasi.dermaga = $scope.dermagaText.mdmgKode;
		$scope.perlokasi.dermagaText = $scope.dermagaText.mdmgNama;
		$scope.perlokasi.jasa = parseInt($scope.perlokasi.jasa);
		$scope.perlokasi.persetujuan = parseInt(2,10);
		$scope.perlokasi.pejabat = $scope.perlokasi.pejabat.nama;

	 	//untuk menyimpan file upload
		var datePerlokasiTujuan = {
			startDate 		: $scope.perlokasi.tglMulaiBerlaku,
			endDate 		: $scope.perlokasi.tglSelesaiBerlaku,
			titleStartDate 	: 'Tgl. Mulai Berlaku',
			titleEndDate 	: 'Tgl. Selesai Berlaku'
		}
		var validationDate = Validations.checkValidEndDate(datePerlokasiTujuan);
		if(validationDate){
			$scope.showLoader = false;
			return false;
		}

		$scope.perlokasi.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

    var fileName = $scope.perlokasi.dokumen;
    var fileExtension = fileName.replace(/^.*\./, '');
    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
			if(fileExtension==='pdf' || fileExtension==='PDF'){
				$scope.perlokasi.dokumen = $scope.perlokasi.dokumen.replace(fileExtension,'pdf');
			}else{
				$scope.perlokasi.dokumen = $scope.perlokasi.dokumen.replace(fileExtension,'jpg');
			}
    }else{
			$scope.setNotification  = {
				type    : "warning",
				message : "Dokumen pendukung harus PDF dan JPG"
			};
			Notification.setNotification($scope.setNotification);
			return;
    }

    var formData = new FormData();
    formData.append('pelangganPerLokasiTujuan', new Blob([JSON.stringify($scope.perlokasi)], { type: "application/json" }));
    if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
    if($scope.perlokasi.dokumen == null){
		$scope.setNotification  = {
			type  	: "warning",
			message : "Dokumen pendukung harus diisi"
		};
		Notification.setNotification($scope.setNotification);
		return;
    }
    //end untuk upload smua type file jpg dan pdf

		PelangganPerLokasiAdd.save(formData,
		function(response){
			$scope.setNotification  = {
				type	: "success",
				message	: "Data berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$location.path($scope.locationPath);
		},
		function(response){
			$scope.setNotification  = {
				type	: "warning",
				message	: "Data tidak berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
			$scope.showLoader = false;
		});
	};

	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	};

	$scope.Resetval = function () {
	  $scope.perlokasi.nilaiPelabuhan = "";
	  $scope.perlokasi.nilaiPelanggan = "";
	 }

  $scope.Resetvalue = function () {
    $scope.perlokasi.nilai = "";
    $scope.perlokasi.valuta = "";
  }
	
	LoadingScreen.hide();
}]);
