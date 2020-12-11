'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerlokasitujuanEditCtrl
 * @description
 * # PerlokasitujuanEditCtrl
 * Controller of the vasaApp
 */

  angular.module('vasaApp')
  .controller('PerlokasitujuanEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','Notification','AppParam','PelangganPerLokasiEdit','PelangganPerLokasiAdd','PelangganPerLokasiDetail','MdmDermagaSearch','MdmPelangganSearch','PejabatPengesahanSearch','BuildPDF','LoadingScreen','Validations','MdmDermagaSearchByKode','MdmDermagaPerJasa', function ($scope,$routeParams,$filter,$timeout,$location,Notification,AppParam,PelangganPerLokasiEdit,PelangganPerLokasiAdd,PelangganPerLokasiDetail,MdmDermagaSearch,MdmPelangganSearch,PejabatPengesahanSearch,BuildPDF,LoadingScreen,Validations,MdmDermagaSearchByKode,MdmDermagaPerJasa) {
	
	LoadingScreen.show();
  $scope.perlokasi = {};
	$scope.locationPath = '/perlokasitujuan/list';
  $scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.required = true;
	$scope.options = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
	};

  //Start Set Disabled Date :
	var setDisableDate = function(){
		$('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.perlokasi.tglMulaiBerlaku);
		$('#tglMulaiBerlaku').mask('99-99-9999');
		$('#tglSelesaiBerlaku').mask('99-99-9999');
		$('#tglSepakat').mask('99-99-9999');
	};

	$scope.$watch('perlokasi.tglMulaiBerlaku', function(){
		$timeout(function() {
		  setDisableDate();
		}, 1000);
	});

	$scope.$watch('perlokasi.tglSelesaiBerlaku', function(){
		$timeout(function() {
		  setDisableDate();
		}, 1000);
	});
	//End Set Disabled Date :

	//get parameter JASA
	AppParam.get({nama:'JASA'},function(response){
		$scope.jasa = response.content;

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

	$scope.validationLookupDermaga= function(){
		if(valueField !== $scope.perlokasi.dermagaText){
			if(typeof $scope.perlokasi.dermagaText != 'object'){
				$scope.setNotification  = {
					type  	: 'warning',
					message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.perlokasi.dermagaText = '';
			}
		}
	}

	$scope.validationLookupPelanggan= function(){
		if(valueField !== $scope.perlokasi.kodePelangganText){
			if(typeof $scope.perlokasi.kodePelangganText != 'object'){
				$scope.setNotification  = {
				  type 		: 'warning',
				  message 	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.perlokasi.kodePelangganText = '';
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

	$scope.validationLookupNamaPelanggan= function(){
		if(valueField !== $scope.langganan.pelangganPelabuhan){
		  if(typeof $scope.langganan.pelangganPelabuhan != 'objec t'){
		    $scope.setNotification  = {
		      type  : 'warning',
		      message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
		    };
		    Notification.setNotification($scope.setNotification);
		    $scope.langganan.pelangganPelabuhan = '';
		  }
		}
	}

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

	var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  if($routeParams.id){
		PelangganPerLokasiDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				$scope.perlokasi = temp;
				$scope.perlokasi.jasa = ''+response.jasa;
				$scope.perlokasi.tglMulaiBerlaku = new Date (response.tglMulaiBerlaku);
				$scope.perlokasi.tglSelesaiBerlaku = new Date (response.tglSelesaiBerlaku);
				$scope.perlokasi.tglSepakat = new Date(response.tglSepakat);
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
    LoadingScreen.hide();
		dataEmpty();
	}

  $scope.submit = function(){
	  if (typeof $scope.perlokasi.dermagaText === 'object') {
			$scope.perlokasi.dermaga = $scope.perlokasi.dermagaText.mdmgKode;
			$scope.perlokasi.dermagaText = $scope.perlokasi.dermagaText.mdmgNama;
		}

	  var namadermaga = $scope.perlokasi.dermagaText.mdmgNama;
		$scope.buttonDisabled = true;
		$scope.perlokasi.tglMulaiBerlaku = $filter('date')($scope.perlokasi.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.perlokasi.tglSelesaiBerlaku = $filter('date')($scope.perlokasi.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.perlokasi.tglSepakat = $filter('date')($scope.perlokasi.tglSepakat, 'yyyy-MM-ddT00:00:00');
		// $scope.perlokasi.dermaga = $scope.perlokasi.dermaga;
		// $scope.perlokasi.dermagaText = namadermaga;
		$scope.perlokasi.jasa = parseInt($scope.perlokasi.jasa);
		$scope.perlokasi.kodePelangganText = '';
		$scope.perlokasi.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.perlokasi.dokumen : $scope.uploadFile[0].name;
		$scope.perlokasi.pejabat = $scope.perlokasi.pejabat.nama === undefined ? $scope.perlokasi.pejabat : $scope.perlokasi.pejabat.nama;

		if($scope.perlokasi.nilaiTagihan === "0"){
			$scope.perlokasi.nilaiPelabuhan = "";
			$scope.perlokasi.nilaiPelanggan = "";
	  }

		if($scope.perlokasi.nilaiTagihan === "1"){
			$scope.perlokasi.nilai = "";
			$scope.perlokasi.valuta= "";
	  }

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
	 //start untuk upload smua type file jpg dan pdf
  	$scope.perlokasi.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.perlokasi.dokumen : $scope.uploadFile[0].name;

	  var fileName = $scope.perlokasi.dokumen;
	  var fileExtension = fileName.replace(/^.*\./, '');

	  if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'JPG' || fileExtension === 'jpeg' || fileExtension === 'JPEG'){
			if(fileExtension==='pdf' || fileExtension==='PDF'){
				$scope.perlokasi.dokumen = $scope.perlokasi.dokumen.replace(fileExtension,'pdf');
			}else{
				$scope.perlokasi.dokumen = $scope.perlokasi.dokumen.replace(fileExtension,'jpg');
			}
	  }else{
			$scope.setNotification  = {
				type  	: "warning",
				message : "Dokumen pendukung harus format PDF dan JPG"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
			$scope.showLoader = false;
			return;
	  }

  	var formData = new FormData();
	  formData.append('pelangganPerLokasiTujuan', new Blob([JSON.stringify($scope.perlokasi)], { type: "application/json" }));
	  if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    	//end untuk upload smua type file jpg dan pdf

		PelangganPerLokasiEdit.update({id:$routeParams.id},formData,
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
			}
		);
	};

		$scope.cancel =  function(){
		$location.path($scope.locationPath);
	};

	$scope.changePelanggan = function(data) {
		$scope.perlokasi.kodePelanggan = data.mplgKode;
  }

  $scope.changeLokasi = function(data) {
		$scope.perlokasi.dermaga = data.mdmgKode;
  }

	$scope.buildPDF = function(){
		BuildPDF.build($scope.perlokasi.dokumen);
	}

}]);
