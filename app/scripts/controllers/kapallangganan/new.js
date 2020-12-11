'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapallanggananNewCtrl
 * @description
 * # KapallanggananNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapallanggananNewCtrl',['$scope', '$filter','$timeout','Notification', '$location','KapalLanggananAdd','AppParam','MdmKapalList','MdmPelangganSearch','MdmDermagaSearch','MdmKapalSearchByName','PejabatPengesahanSearch','LoadingScreen','Validations', function ($scope,$filter,$timeout,Notification,$location,KapalLanggananAdd,AppParam,MdmKapalList,MdmPelangganSearch,MdmDermagaSearch,MdmKapalSearchByName,PejabatPengesahanSearch,LoadingScreen,Validations) {
  LoadingScreen.show();
  	//PARAMS
	$scope.langganan = {};
	$scope.locationPath = '/kapallangganan/list';
  $scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.langganan.status = 1;
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};
	$scope.langganan.tagihan=0;
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
 //  $scope.$watch('tglBerlaku', function(){
	// 	$('#tglBerlaku').mask('99-99-9999');
	// 	$('#tglmulaiBerlaku').mask('99-99-9999');
	// 	$('#tglselesaiBerlaku').mask('99-99-9999');
	// });
	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
    LoadingScreen.hide();
    $scope.jnsPelayaran = response.content;

	});

	//get parameter JASA
	AppParam.get({nama:'JASA'},function(response){
		// console.log(response);
		$scope.jasa = response.content;
	});
	 //get  valuta
   AppParam.get({nama:'VALUTA'},function(response){
    $scope.valuta = response.content;

   });
/* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupKapal= function(){
    if(valueField !== $scope.langganan.namaKapal){
      if(typeof $scope.langganan.namaKapal != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.namaKapal = '';
      }
    }
  }

  $scope.validationLookupNama= function(){
    if(valueField !== $scope.langganan.namaPelanggan){
      if(typeof $scope.langganan.namaPelanggan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.namaPelanggan = '';
      }
    }
  }

  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.langganan.dermaga){
      if(typeof $scope.langganan.dermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.dermaga = '';
      }
    }
  }

  $scope.validationLookupPejabat= function(){
    if(valueField !== $scope.langganan.pejabatPelabuhan){
      if(typeof $scope.langganan.pejabatPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.pejabatPelabuhan = '';
      }
    }
  }

  $scope.validationLookupPelanggan= function(){
    if(valueField !== $scope.langganan.pelangganPelabuhan){
      if(typeof $scope.langganan.pelangganPelabuhan != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.langganan.pelangganPelabuhan = '';
      }
    }
  }

  /* end validasi autocomplete */



  // get list dermaga
  $scope.getListOfDermaga = function(value) {

    if (value) {
      return new Promise(function(resolve, reject) {
        MdmDermagaSearch.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        }, function(response) {
          resolve(response);
          response.forEach(function(response){
            response.mdmgNamaKode = response.mdmgNama+' ('+ response.mdmgKode+')';
          });
        });

      });
    }
  };

  //get data kapal
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

	//get list pelanggan
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
  //get data master kapal
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
  //get list pelanggan
  $scope.getListPelanggan = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        MdmPelangganSearch.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        }, function(response) {
          resolve(response);
        });
      });
    }
  };

  $scope.$watch('langganan.pelabuhan', function () {
    if($scope.langganan.pelabuhan !== null)
    {
      $scope.langganan.pelanggan = 100 - $scope.langganan.pelabuhan;
    }
  });

  $scope.$watch('langganan.pelanggan', function () {
    if($scope.langganan.pelanggan !== null)
    {
      $scope.langganan.pelabuhan = 100 - $scope.langganan.pelanggan;
    }
  });

	$scope.showErrdate = false;
	$scope.submit = function(){
		$scope.buttonDisabled = true;
		var codePelanggan = $scope.langganan.namaPelanggan.mplgKode;
		var codeKapal = $scope.langganan.namaKapal.mkplKode;
		var namadermaga = $scope.langganan.dermaga.mdmgNama;
		$scope.langganan.tglMulaiBerlaku = $filter('date')($scope.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
		/*if($scope.langganan.tglMulaiBerlaku === undefined){
			$scope.showErrdate = true;
			return;
		}*/
		$scope.langganan.tglSelesaiBerlaku = $filter('date')($scope.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');
		/*if($scope.langganan.tglSelesaiBerlaku === undefined){
			$scope.showErrdate = true;
			return;
		}*/
		$scope.langganan.tglSepakat = $filter('date')($scope.tglSepakat, 'yyyy-MM-ddT00:00:00');
		/*if($scope.langganan.tglSepakat === undefined){
			$scope.showErrdate = true;
			return;
		}*/
		$scope.langganan.persetujuan = parseInt(2,10);
		$scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;
		$scope.langganan.dermaga = $scope.langganan.dermaga.mdmgKode;
		$scope.langganan.namaDermaga = namadermaga;
		$scope.langganan.namaPelanggan = $scope.langganan.namaPelanggan.mplgNama;
		$scope.langganan.kodePelanggan = codePelanggan;
		$scope.langganan.namaKapal = $scope.langganan.namaKapal.mkplNama;
		$scope.langganan.kodeKapal = codeKapal;
		$scope.langganan.jasa = parseInt($scope.langganan.jasa);
		$scope.langganan.pejabatPelabuhan = $scope.langganan.pejabatPelabuhan.nama;
		//$scope.langganan.pelangganPelabuhan = $scope.langganan.pelangganPelabuhan.mplgNama;
		//console.log ($scope.langganan); return;
		// var formData = new FormData();
		// formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], { type: "application/json" }));
		// if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);


		// if($scope.langganan.dokumen == null){
	 //      $scope.setNotification  = {
	 //        type  : "warning", //ex : danger, warning, success, info
	 //        message : "Dokumen pendukung harus diisi"
	 //      };
	 //      Notification.setNotification($scope.setNotification);
	 //      return;
	 //    }
	 //    var fileName = $scope.langganan.dokumen;
	 //    var fileExtension = fileName.replace(/^.*\./, '');
	 //    if(fileExtension === 'pdf' || fileExtension === 'jpg'){

	 //    }else{
	 //      $scope.setNotification  = {
	 //        type  : "warning", //ex : danger, warning, success, info
	 //        message : "Dokumen pendukung harus format pdf dan jpg"
	 //      };
	 //      Notification.setNotification($scope.setNotification);
	 //      return;
	 //    }

   var dateKapalLangganan = {
     startDate 		: $scope.langganan.tglMulaiBerlaku,
     endDate 		: $scope.langganan.tglSelesaiBerlaku,
     titleStartDate 	: 'Tgl. Mulai Berlaku',
     titleEndDate 	: 'Tgl. Selesai Berlaku'
   }
   var validationDate = Validations.checkValidEndDate(dateKapalLangganan);
   if(validationDate){
     $scope.showLoader = false;
     return false;
   }
        $scope.langganan.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

        var fileName = $scope.langganan.dokumen;
        var fileExtension = fileName.replace(/^.*\./, '');
        if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
            if(fileExtension==='pdf' || fileExtension==='PDF'){
                $scope.langganan.dokumen = $scope.langganan.dokumen.replace(fileExtension,'pdf');
            }else{
                $scope.langganan.dokumen = $scope.langganan.dokumen.replace(fileExtension,'jpg');
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
        formData.append('pelangganKapalLangganan', new Blob([JSON.stringify($scope.langganan)], { type: "application/json" }));
        if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
        if($scope.langganan.dokumen == null){
            $scope.setNotification  = {
              type    : "warning",
              message : "Dokumen pendukung harus diisi"
            };
            Notification.setNotification($scope.setNotification);
            return;
        }
        //end untuk upload smua type file jpg dan pdf


		KapalLanggananAdd.save(formData,
			function(response){
				if(response.$resolved){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				}
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			},
			function(response){
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Koneksi tidak terhubung..."
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			});
	}

	$scope.cancel =  function(){
		$location.path('/kapallangganan/list');
	}


	$scope.Resetval = function () {
     $scope.langganan.pelanggan = "";
     $scope.langganan.pelabuhan = "";
     //console.log($scope.pelanggan.pelabuhan);
  	}

    $scope.Resetvalue = function () {
    $scope.langganan.nilai = "";
    $scope.langganan.valuta = "";
    //console.log($scope.pelanggan.pelabuhan);
  	}
}]);
