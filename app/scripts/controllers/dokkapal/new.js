'use strict';
/**
 * @ngdoc function
 * @name vasaApp.controller:DokKapalNewCtrl
 * @description
 * # DokKapalNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('DokkapalNewCtrl',['$scope','$location','$filter','$timeout','KapalKegiatanTetapAdd','Notification','AppParam','MdmPelangganSearch','MdmKapalList', 'MdmKapalSearchByName','PejabatPengesahanSearch','LoadingScreen','KapalKegiatanTetapByKodeKapal','Validations',function ($scope,$location,$filter,$timeout,KapalKegiatanTetapAdd,Notification,AppParam,MdmPelangganSearch,MdmKapalList,MdmKapalSearchByName,PejabatPengesahanSearch,LoadingScreen,KapalKegiatanTetapByKodeKapal,Validations) {
  LoadingScreen.show();
	$scope.dokkapal = {};
	$scope.dokkapal.status = 1;
	$scope.locationPath = '/dokkapal/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.errorMessageUploadFile = "";

	$scope.dokkapal.tglMulaiBerlaku =  new Date();
	$scope.dokkapal.tglSelesaiBerlaku = new Date();
	$scope.dokkapal.tglDitetapkan = new Date();
	$scope.dokkapal.status = 1;

	//Start Set Disabled Date :
    var setDisableDate = function(){
      $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.dokkapal.tglMulaiBerlaku);
      $('#tglMulaiBerlaku').mask('99-99-9999');
      $('#tglSelesaiBerlaku').mask('99-99-9999');
      $('#tglDitetapkan').mask('99-99-9999');
    };

    $scope.$watch('dokkapal.tglMulaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });

    $scope.$watch('dokkapal.tglSelesaiBerlaku', function(){
      $timeout(function() {
        setDisableDate();
      }, 1000);
    });
    //End Set Disabled Date :

	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true,
      orientation: "bottom auto"
	};

	$scope.dokkapal.jamMulai = moment().format('HH:mm:ss');

	 /* validasi autocomplete */
	  var valueField = '';
	  $scope.checkValue = function(value){
	    valueField = value;
	  }

	  $scope.validationLookupKapal= function(){
	    if(valueField !== $scope.kapal){
	      if(typeof $scope.kapal != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.kapal = '';
	      }
	    }
	  }

	  $scope.validationLookupKodeAgen= function(){
	    if(valueField !== $scope.dokkapal.kodeAgen){
	      if(typeof $scope.dokkapal.kodeAgen != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dokkapal.kodeAgen = '';
	      }
	    }
	  }

	  $scope.validationLookupPejabat= function(){
	    if(valueField !== $scope.dokkapal.pejabat){
	      if(typeof $scope.dokkapal.pejabat != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dokkapal.pejabat = '';
	      }
	    }
	  }

	  $scope.validationLookupPelanggan= function(){
	    if(valueField !== $scope.dokkapal.pelanggan){
	      if(typeof $scope.dokkapal.pelanggan != 'object'){
	        $scope.setNotification  = {
	          type  : 'warning',
	          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
	        };
	        Notification.setNotification($scope.setNotification);
	        $scope.dokkapal.pelanggan = '';
	      }
	    }
	  }
	  /* validasi autocomplete */

	// autocomplete pelanggan
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

	// autocomplete kapal
	$scope.getListOfKapal = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmKapalSearchByName.get({
					nama: value,
					limit: '10'
				}, function(response) {
					resolve(response);
				});
			});
		}
	};

	// autocomplete kapal
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

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.dokkapal.tglMulaiBerlaku = $filter('date')($scope.dokkapal.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dokkapal.tglSelesaiBerlaku = $filter('date')($scope.dokkapal.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		$scope.dokkapal.tglDitetapkan = $filter('date')($scope.dokkapal.tglDitetapkan, 'yyyy-MM-ddT00:00:00');
    $scope.dokkapal.pelanggan = $scope.dokkapal.kodeAgen.mplgNama;
		$scope.dokkapal.kodeAgen = $scope.dokkapal.kodeAgen.mplgKode;
		$scope.dokkapal.nama = $scope.kapal.mkplNama;
		$scope.dokkapal.kode = $scope.kapal.mkplKode;
		$scope.dokkapal.pejabat = $scope.dokkapal.pejabat.nama;


		$scope.dokkapal.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

    var dateDokkapal = {
      startDate 		: $scope.dokkapal.tglMulaiBerlaku,
      endDate 		: $scope.dokkapal.tglSelesaiBerlaku,
      titleStartDate 	: 'Tgl. Mulai Berlaku',
      titleEndDate 	: 'Tgl. Selesai Berlaku'
    }
    var validationDate = Validations.checkValidEndDate(dateDokkapal);
    if(validationDate){
      $scope.showLoader = false;
      return false;
    }

        KapalKegiatanTetapByKodeKapal.get({
	        kode: $scope.dokkapal.kode
	      }, function(response){

	        // do validation
	        var findSame = false;

	        response.content.forEach(function(item){
	          if(item.tglMulaiBerlaku == $scope.dokkapal.tglMulaiBerlaku &&
	            item.tglSelesaiBerlaku == $scope.dokkapal.tglSelesaiBerlaku ) {
	            findSame = true;
	          }
	        });

	        if(findSame) {
	          // alert('wew');
	          $scope.showLoader = false;
	          $scope.setNotification = {
	            type: "warning", //ex : danger, warning, success, info
	            message: "Data yang diinputkan sudah ada"
	          };
	          Notification.setNotification($scope.setNotification);
	          return false;
	        } else {

	        	var fileName = $scope.dokkapal.dokumen;
		        var fileExtension = fileName.replace(/^.*\./, '');
		        if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
		            if(fileExtension==='pdf' || fileExtension==='PDF'){
		                $scope.dokkapal.dokumen = $scope.dokkapal.dokumen.replace(fileExtension,'pdf');
		            }else{
		                $scope.dokkapal.dokumen = $scope.dokkapal.dokumen.replace(fileExtension,'jpg');
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
		        formData.append('kapalKegiatanTetap', new Blob([JSON.stringify($scope.dokkapal)], { type: "application/json" }));
		        if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		        if($scope.dokkapal.dokumen == null){
		            $scope.setNotification  = {
		              type    : "warning",
		              message : "Dokumen pendukung harus diisi"
		            };
		            Notification.setNotification($scope.setNotification);
		            return;
		        }
		        //end untuk upload smua type file jpg dan pdf


				KapalKegiatanTetapAdd.save(formData,
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
	    });

	}





	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	$scope.validationUploadFile = function(files) {
	    if(files[0].size > 200000000){
	    	$scope.errorMessageUploadFile = "File tidak bisa melebihi 2 MB";
	    }
	};

	LoadingScreen.hide();
}]);
