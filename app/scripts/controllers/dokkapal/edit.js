'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalKegiatanTetapEditCtrl
 * @description
 * # KapalKegiatanTetapEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('DokkapalEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','KapalKegiatanTetapDetail','KapalKegiatanTetapEdit','Notification','AppParam','MdmPelangganSearch','MdmPelangganSearchByKode','MdmKapalList','BuildPDF','MdmKapalSearchByName','PejabatPengesahanSearch','LoadingScreen','Validations',function ($scope,$routeParams,$filter,$timeout,$location,KapalKegiatanTetapDetail,KapalKegiatanTetapEdit,Notification,AppParam,MdmPelangganSearch,MdmPelangganSearchByKode,MdmKapalList,BuildPDF,MdmKapalSearchByName,PejabatPengesahanSearch,LoadingScreen,Validations) {
	LoadingScreen.show();
	$scope.dataDokkapal = {};
	$scope.locationPath = '/dokkapal/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.errorMessageUploadFile = '';
	$scope.showLoader = false;
	$scope.Date= $filter('date')(new Date(), 'dd-MM-yyyy');
	$scope.options = {
	      autoclose: true,
	      todayBtn: '',
	      todayHighlight: true,
				orientation: "bottom"
	  };

	  	//Start Set Disabled Date :
    var setDisableDate = function(){
      $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.dataDokkapal.tglMulaiBerlaku);
      $('#tglMulaiBerlaku').mask('99-99-9999');
      $('#tglSelesaiBerlaku').mask('99-99-9999');
      $('#tglDitetapkan').mask('99-99-9999');
    };

    $scope.$watch('dataDokkapal.tglMulaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });

    $scope.$watch('dataDokkapal.tglSelesaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });
    //End Set Disabled Date :

  /* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	 $scope.validationLookupPejabat= function(){
	    if(valueField !== $scope.dataDokkapal.pejabat){
	      if(typeof $scope.dataDokkapal.pejabat != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        return $scope.dataDokkapal.pejabat = valueField;
	      }
	    }
	  }

	  $scope.validationLookupPelanggan= function(){
	    if(valueField !== $scope.dataDokkapal.pelanggan){
	      if(typeof $scope.dataDokkapal.pelanggan != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        return $scope.dataDokkapal.pelanggan = valueField;
	      }
	    }
	  }

	  /* validasi autocomplete */


	//get parameter JENIS_KAPAL
	AppParam.get({nama:'JENIS_KAPAL'},function(response){
		LoadingScreen.hide();
		$scope.jenisKapal = response.content;
	});

	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

  	if($routeParams.id){
		KapalKegiatanTetapDetail.get({id:$routeParams.id},
			function(response){

				if(response !== undefined){
					$scope.dataDokkapal = response;
					$scope.dataDokkapal.jenisKapal 	= ''+response.jenisKapal;
					MdmPelangganSearchByKode.get({kode:response.kodeAgen,kodeTerminal : localStorage.getItem('kodeTerminal')}, function(responseMDMPelanggan){
						$scope.dataDokkapal.namaAgen 	= responseMDMPelanggan.mplgNama;
					});
					$scope.dataDokkapal.tglMulaiBerlaku = new Date($scope.dataDokkapal.tglMulaiBerlaku);
					$scope.dataDokkapal.tglSelesaiBerlaku = new Date($scope.dataDokkapal.tglSelesaiBerlaku);
					$scope.dataDokkapal.tglDitetapkan = new Date($scope.dataDokkapal.tglDitetapkan);
				}else{
					dataEmpty();
				}
			},
			function(){
				dataEmpty();
			}
		);
	}else{
		dataEmpty();
	}

	$scope.submit = function(){
		$scope.showLoader = true;
		$scope.buttonDisabled = true;
		$scope.dataDokkapal.tglMulaiBerlaku = $filter('date')($scope.dataDokkapal.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dataDokkapal.tglSelesaiBerlaku = $filter('date')($scope.dataDokkapal.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dataDokkapal.tglDitetapkan = $filter('date')($scope.dataDokkapal.tglDitetapkan, 'yyyy-MM-ddT00:00:00');
		$scope.dataDokkapal.kodeAgen = $scope.dataDokkapal.nama.mplgKode === undefined ? $scope.dataDokkapal.kodeAgen : $scope.dataDokkapal.nama.mplgKode;
		$scope.dataDokkapal.nama = $scope.dataDokkapal.nama.mkplNama === undefined ? $scope.dataDokkapal.nama : $scope.dataDokkapal.nama.mkplNama;
		$scope.dataDokkapal.kode = $scope.dataDokkapal.kode.mkplKode === undefined ? $scope.dataDokkapal.kode : $scope.dataDokkapal.kode.mkplKode;
		$scope.dataDokkapal.pejabat = $scope.dataDokkapal.pejabat.nama === undefined ? $scope.dataDokkapal.pejabat : $scope.dataDokkapal.pejabat.nama;
		$scope.dataDokkapal.pelanggan = $scope.dataDokkapal.namaAgen.mplgNama === undefined ? $scope.dataDokkapal.pelanggan : $scope.dataDokkapal.namaAgen.mplgNama;
		$scope.dataDokkapal.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataDokkapal.dokumen : $scope.uploadFile[0].name;

		var fileName = $scope.dataDokkapal.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
		if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'JPG' || fileExtension === 'jpeg' || fileExtension === 'JPEG'){
		if(fileExtension==='pdf' || fileExtension==='PDF'){
		    $scope.dataDokkapal.dokumen = $scope.dataDokkapal.dokumen.replace(fileExtension,'pdf');
		}else{
		    $scope.dataDokkapal.dokumen = $scope.dataDokkapal.dokumen.replace(fileExtension,'jpg');
		}
		}else{
		 $scope.setNotification  = {
		    type    : "warning", //ex : danger, warning, success, info
		    message : "Dokumen pendukung harus format PDF dan JPG"
		 };
		 Notification.setNotification($scope.setNotification);
		 $scope.buttonDisabled = false;
		 $scope.showLoader = false;
		 return;
		}

		var dateDokkapal = {
			startDate 		: $scope.dataDokkapal.tglMulaiBerlaku,
			endDate 		: $scope.dataDokkapal.tglSelesaiBerlaku,
			titleStartDate 	: 'Tgl. Mulai Berlaku',
			titleEndDate 	: 'Tgl. Selesai Berlaku'
		}
		var validationDate = Validations.checkValidEndDate(dateDokkapal);
		if(validationDate){
			$scope.showLoader = false;
			return false;
		}

		var formData = new FormData();
		formData.append('kapalKegiatanTetap', new Blob([JSON.stringify($scope.dataDokkapal)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		//end untuk upload smua type file jpg dan pdf
		KapalKegiatanTetapEdit.save(formData,
			function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path($scope.locationPath);
			},
			function(response){
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
		);
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	// autocomplete
	$scope.getListOfKapal = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmKapalSearchByName.get({"nama":value, "limit":10}, function(response){
					resolve(response);
				});
			});
		}
	};

	$scope.getListOfPelanggan = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmPelangganSearch.get({"nama":value, "limit":10, "kodeTerminal" : localStorage.getItem('kodeTerminal')}, function(response){
					resolve(response);
					response.forEach(function (response) {
						response.mplgNamaKode = response.mplgNama +' ('+response.mplgKode + ')';
					});
				});
			});
		}
	};

	// autocomplete pejabat
	$scope.getListOfPejabat = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				PejabatPengesahanSearch.get({
					nama: value,
					limit: '10'
				}, function(response) {
					resolve(response);
				});
			});
		}
	};

	$scope.changeKapal = function(data){
		$scope.dataDokkapal.kode = data.mkplKode;
	}

	$scope.changePelanggan = function(data){
		$scope.dataDokkapal.kodeAgen = data.mplgKode;
	}

	$scope.validationUploadFile = function(files) {
	    if(files[0].size > 200000000){
	    	$scope.errorMessageUploadFile = "File tidak bisa melebihi 2 MB";
	    }
	}

	//function build pdf
	$scope.buildPDF = function(){
		BuildPDF.build($scope.dataDokkapal.dokumen);
	}



}]);
