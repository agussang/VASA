'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PanduEditCtrl
 * @description
 * # PanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PanduEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','BuildPDF','AppParam','TarifPanduEdit','TarifPanduEditApproval','TarifPanduAdd','TarifPanduDetail','Notification','LoadingScreen', function ($scope,$routeParams,$filter,$timeout,$location,BuildPDF,AppParam,TarifPanduEdit,TarifPanduEditApproval,TarifPanduAdd,TarifPanduDetail,Notification, LoadingScreen) {
LoadingScreen.show();
    $scope.options = {
	    autoclose: true,
	    todayBtn: '',
	    todayHighlight: true
	};

	$scope.dataPandu = {};
	$scope.locationPath = '/pandu/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('dataPandu.tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	/*get parameter Jenis Pelayaran*/
    AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
	});

	/*get parameter VALUTA*/
	AppParam.get({nama:'VALUTA'},function(response){
		$scope.valuta = response.content;
	});

	/*get parameter jenis negara*/
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		TarifPanduDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				temp.jenisNegara = ''+temp.jenisNegara;
				$scope.dataPandu = temp;
				$scope.dataPandu.tglBerlaku = new Date (response.tglBerlaku);
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

	$scope.cancel=function(){
		$location.path('/pandu/list');
	}

    $scope.submit = function(){
    	$scope.buttonDisabled = true;
    	$scope.dataPandu.id = $routeParams.id;
		$scope.dataPandu.tglBerlaku = $filter('date')($scope.dataPandu.tglBerlaku, 'yyyy-MM-ddT00:00:00');


		//start untuk upload smua type file jpg dan pdf
	   $scope.dataPandu.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataPandu.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataPandu.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataPandu.dokumen = $scope.dataPandu.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataPandu.dokumen = $scope.dataPandu.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifPandu', new Blob([JSON.stringify($scope.dataPandu)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifPanduEdit.update(formData,
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
				console.log (response);
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
    	$scope.dataPandu.id = $routeParams.id;
		$scope.dataPandu.tglBerlaku = $filter('date')($scope.dataPandu.tglBerlaku, 'yyyy-MM-ddT00:00:00');


		//start untuk upload smua type file jpg dan pdf
	   $scope.dataPandu.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataPandu.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataPandu.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataPandu.dokumen = $scope.dataPandu.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataPandu.dokumen = $scope.dataPandu.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifPandu', new Blob([JSON.stringify($scope.dataPandu)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifPanduEditApproval.update(formData,
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
				console.log (response);
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
		BuildPDF.build($scope.dataPandu.dokumen);
	}


  }]);
