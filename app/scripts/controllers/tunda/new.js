'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaNewCtrl
 * @description
 * # TundaNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TundaNewCtrl', ['$scope','$filter','$timeout','$location','AppParam','Notification','TarifTundaAdd','LoadingScreen' ,function ($scope,$filter,$timeout,$location,AppParam,Notification,TarifTundaAdd,LoadingScreen) {
	LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};
	$scope.tunda = {};
	$scope.tglBerlaku = new Date();
	$scope.locationPath = '/tunda/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});
	/* get parameter pelayaran */
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
	});

	/* get parameter valuta */
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});

	/*get Jenis perairan*/
	AppParam.get({nama:'JENIS_PERAIRAN'},function(response){
		$scope.jnsPerairan = response.content;
	});

	/* get Jenis kegiatan*/
	AppParam.get({nama:'JENIS_KEGIATAN'},function(response){
		$scope.jnsKegiatan = response.content;
	});

	/* get jenis negara */
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.tunda.tglBerlaku= moment($scope.tglBerlaku).format('YYYY-MM-DDTHH:mm:ss');

		//start untuk upload smua type file jpg dan pdf
	     $scope.tunda.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.tunda.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.tunda.dokumen = $scope.tunda.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.tunda.dokumen = $scope.tunda.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifTunda', new Blob([JSON.stringify($scope.tunda)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

		if($scope.tunda.dokumen == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifTundaAdd.save(formData,
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
	LoadingScreen.hide();
}]);
