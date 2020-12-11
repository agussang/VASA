'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaNewCtrl
 * @description
 * # TundaNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('KapalKepilNewCtrl', ['$scope','$filter','$timeout','$location','AppParam','TarifKapalKepilAdd','Notification','LoadingScreen',function ($scope,$filter,$timeout,$location,AppParam,TarifKapalKepilAdd,Notification,LoadingScreen) {
	LoadingScreen.show();

	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

  	$scope.tglBerlaku = new Date();
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.kapalkepil = {};

	$scope.$watch('tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		LoadingScreen.hide();
		$scope.jnsPelayaran = response.content;
		// console.log(response);
	});


	//get parameter VALUTA
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;

	});

	$scope.cancel =  function(){
		$location.path('/kepil/list');
	}

	$scope.submit = function(){

		$scope.kapalkepil.tglBerlaku= moment($scope.tglBerlaku).format('YYYY-MM-DDTHH:mm:ss');

		//start untuk upload smua type file jpg dan pdf
	     $scope.kapalkepil.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? null : $scope.uploadFile[0].name;

	    //untuk menyimpan file upload
	    var fileName = $scope.kapalkepil.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.kapalkepil.dokumen = $scope.kapalkepil.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.kapalkepil.dokumen = $scope.kapalkepil.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifKepil', new Blob([JSON.stringify($scope.kapalkepil)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);

		if($scope.kapalkepil.dokumen == null){
			$scope.setNotification  = {
				type	: "warning", //ex : danger, warning, success, info
				message	: "Dokumen pendukung harus diisi"
			};
			Notification.setNotification($scope.setNotification);
			return;
		}
	    //end untuk upload smua type file jpg dan pdf

		TarifKapalKepilAdd.save(formData, function(response){

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
			$location.path('/kepil/list');
			$scope.buttonDisabled = false;
			$scope.showLoader = false;

		});
	}

}]);
