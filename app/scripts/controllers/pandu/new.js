'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduNewCtrl
 * @description
 * # PanduNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PanduNewCtrl',['$scope','$filter','$timeout','$location','AppParam','Notification','TarifPanduAdd','LoadingScreen' ,function ($scope,$filter,$timeout,$location,AppParam,Notification,TarifPanduAdd, LoadingScreen) {
LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.pandu = {};
	$scope.tglBerlaku = new Date();
	$scope.locationPath = '/pandu/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	$scope.$watch('pandu.tarifTetap', function(){
		$('#tarif-1').mask("0");
	});

	$scope.$watch('pandu.tarifVariabel', function(){
		$('#tarif-2').mask("0");
	});

	/*get parameter Jenis Pelayaran */
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
		// console.log(response);
	});

	/*get parameter VALUTA */
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});

	/*get parameter jenis negara */
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

	$scope.submit = function(){
		$scope.buttonDisabled = true;
		$scope.pandu.tglBerlaku=  $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	     $scope.pandu.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.pandu.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.pandu.dokumen = $scope.pandu.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.pandu.dokumen = $scope.pandu.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifPandu', new Blob([JSON.stringify($scope.pandu)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		if($scope.pandu.dokumen == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifPanduAdd.save(formData,
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
		//return formData;
	}
	  LoadingScreen.hide();
}]);
