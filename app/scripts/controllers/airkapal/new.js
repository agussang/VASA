'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AirkapalNewCtrl
 * @description
 * # AirkapalNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AirkapalNewCtrl', ['$scope','$filter','$timeout', '$location','TarifAirKapalAdd','AppParam','Notification','LoadingScreen',function ($scope,$filter,$timeout, $location,TarifAirKapalAdd,AppParam,Notification,LoadingScreen) {
	LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.airKapal = {};
	$scope.tooltipInfo = Notification.setMessageValidFile();
	
	$scope.tglBerlaku = new Date();
	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	$scope.$watch('airKapal.nilaiTarif', function(){
		$('#tarif-1').mask("0");
	});

	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
	});
	//get parameter ALAT_ISI_AIR
	AppParam.get({nama:'ALAT_ISI_AIR'},function(response){
		$scope.alatIsiAir = response.content;
	});
	//get parameter SATUAN
	AppParam.get({nama:'SATUAN_AIR_KAPAL'},function(response){
		$scope.satuan = response.content;
	});
	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});
	//get parameter jenisnegara
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

	$scope.cancel =  function(){
		$location.path('/airkapal/list');
	}

	$scope.submit = function(){

		$scope.buttonDisabled = true;
		$scope.airKapal.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	     $scope.airKapal.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.airKapal.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.airKapal.dokumen = $scope.airKapal.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.airKapal.dokumen = $scope.airKapal.dokumen.replace(fileExtension,'jpg');
	      }
	    }else{
	      $scope.setNotification  = {
	          type    : "warning", //ex : danger, warning, success, info
	          message : "Dokumen pendukung harus format PDF dan JPG"
	      };
	      Notification.setNotification($scope.setNotification);
	      return;
	    }

	   var formData = new FormData();
		formData.append('tarifAirKapal', new Blob([JSON.stringify($scope.airKapal)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		if($scope.airKapal.file == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifAirKapalAdd.save(formData,function(response){
			if(response.$resolved){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
			}
			Notification.setNotification($scope.setNotification);
			$location.path('/airkapal/list');
			$scope.buttonDisabled = false;
			$scope.showLoader = false;
			});
	}

	LoadingScreen.hide();
}]);
