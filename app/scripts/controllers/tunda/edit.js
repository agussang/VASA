'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaEditCtrl
 * @description
 * # TundaEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TundaEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','BuildPDF','AppParam','Notification','TarifTundaEdit','TarifTundaEditApproval','TarifTundaAdd','TarifTundaDetail','LoadingScreen', function ($scope,$routeParams,$filter,$timeout,$location,BuildPDF,AppParam,Notification,TarifTundaEdit,TarifTundaEditApproval,TarifTundaAdd,TarifTundaDetail,LoadingScreen) {
  LoadingScreen.show();
  	$scope.options = {
	    autoclose: true,
	    todayBtn: '',
	    todayHighlight: true
	};

  	$scope.dataTunda = {};
  	$scope.locationPath = '/tunda/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

  	$scope.$watch('dataTunda.tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});


    AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
		// console.log(response);
	});

	//get parameter VALUTA
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

	/* get Jenis negara*/
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

	if($routeParams.id){
		TarifTundaDetail.get({id:$routeParams.id}, function(response){
     	LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				temp.jenisPelayaran = ''+temp.jenisPelayaran;
				temp.jenisNegara = ''+temp.jenisNegara;
				$scope.dataTunda = temp;
				$scope.dataTunda.tglBerlaku = new Date (response.tglBerlaku);
				$scope.dataTunda.minGt =parseInt(response.minGt);
				$scope.dataTunda.maxGt =parseInt(response.maxGt);
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
	$scope.cancel = function(){
		$location.path ('/tunda/list');
	}
    $scope.submit = function(){
    	$scope.buttonDisabled = true;
		$scope.dataTunda.tglBerlaku = $filter('date')($scope.dataTunda.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataTunda.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataTunda.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataTunda.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');

	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataTunda.dokumen = $scope.dataTunda.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataTunda.dokumen = $scope.dataTunda.dokumen.replace(fileExtension,'jpg');
	      }
	    }else{
	      $scope.setNotification  = {
	        type  : "warning", //ex : danger, warning, success, info
	        message : "Dokumen pendukung harus format PDF dan JPG"
	      };
	      Notification.setNotification($scope.setNotification);
	      return;
	    }

	    var formData = new FormData();
		formData.append('tarifTunda', new Blob([JSON.stringify($scope.dataTunda)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf


		TarifTundaEdit.update(formData,
			function(response){
				if(response.$resolved){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil dirubah"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil dirubah"
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



	$scope.submitApproval = function(){
    	$scope.buttonDisabled = true;
		$scope.dataTunda.tglBerlaku = $filter('date')($scope.dataTunda.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataTunda.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataTunda.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataTunda.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');

	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataTunda.dokumen = $scope.dataTunda.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataTunda.dokumen = $scope.dataTunda.dokumen.replace(fileExtension,'jpg');
	      }
	    }else{
	      $scope.setNotification  = {
	        type  : "warning", //ex : danger, warning, success, info
	        message : "Dokumen pendukung harus format PDF dan JPG"
	      };
	      Notification.setNotification($scope.setNotification);
	      return;
	    }

	    var formData = new FormData();
		formData.append('tarifTunda', new Blob([JSON.stringify($scope.dataTunda)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf


		TarifTundaEditApproval.update(formData,
			function(response){
				if(response.$resolved){
					$scope.setNotification  = {
						type	: "success", //ex : danger, warning, success, info
						message	: "Data berhasil dirubah"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				}else{
					$scope.setNotification  = {
						type	: "warning", //ex : danger, warning, success, info
						message	: "Data tidak berhasil dirubah"
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
	//function build pdf
	$scope.buildPDF = function(){
		BuildPDF.build($scope.dataTunda.dokumen);
	}

  }]);
