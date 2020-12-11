'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TambatNewCtrl
 * @description
 * # TambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TambatNewCtrl', ['$scope','$filter','$timeout', '$location','Notification','TarifTambatAdd','AppParam','LoadingScreen', function ($scope,$filter,$timeout, $location,Notification,TarifTambatAdd,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};
	$scope.tambat = {};
	$scope.locationPath = '/tambat/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();
	$scope.tglBerlaku = new Date();

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});
	$scope.$watch('nilaiTarif', function(){
		$('#tarif-1').mask("0");
	});

	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
	});

	//get parameter KELAS_PELABUHAN
	AppParam.get({nama:'KELAS_PELABUHAN'},function(response){
		$scope.klsPelabuhan = response.content;
	});

	//get parameter JENIS_TAMBATAN
	AppParam.get({nama:'JENIS_TAMBATAN'},function(response){
		$scope.jnsTambatan = response.content;
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
		$scope.tambat.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.tambat.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.tambat.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.tambat.dokumen = $scope.tambat.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.tambat.dokumen = $scope.tambat.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifTambat', new Blob([JSON.stringify($scope.tambat)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
		if($scope.tambat.dokumen == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifTambatAdd.save(formData,
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
