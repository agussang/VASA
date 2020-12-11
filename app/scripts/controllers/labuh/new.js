'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhNewCtrl
 * @description
 * # LabuhNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('LabuhNewCtrl',['$scope', '$filter','$timeout', '$location','TarifLabuhAdd','Notification','AppParam','LoadingScreen', function ($scope,$filter,$timeout,$location,TarifLabuhAdd,Notification,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true

	};

	$scope.labuh = {};
	$scope.locationPath = '/labuh/list';
	$scope.tglBerlaku = new Date();
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});
	/*
	$scope.$watch('labuh.nilaiTarif', function(){
		if ((''+$scope.labuh.nilaiTarif).length > 15) {
			$scope.setNotification  = {
	          type    : "warning", //ex : danger, warning, success, info
	          message : "Nilai yang Anda Masukan, <b>Melebihi Jumlah Maksimal</b>"
	      };
	      Notification.setNotification($scope.setNotification);
	      return $scope.labuh.nilaiTarif = '';
		}
	});
	*/

	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		LoadingScreen.hide();
		$scope.jnsPelayaran = response.content;
	});
	//get parameter KELAS_PELABUHAN
	AppParam.get({nama:'KELAS_PELABUHAN'},function(response){
		$scope.klsPelabuhan = response.content;
	});
	//get parameter KUNJUNGAN
	AppParam.get({nama:'KUNJUNGAN'},function(response){
		$scope.kunjungan = response.content;
	});

	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});

	//get parameter jenis negara
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.labuh.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	     $scope.labuh.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.labuh.dokumen;
	    var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.labuh.dokumen = $scope.labuh.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.labuh.dokumen = $scope.labuh.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifLabuh', new Blob([JSON.stringify($scope.labuh)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		if($scope.labuh.dokumen == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifLabuhAdd.save(formData,
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
}]);
