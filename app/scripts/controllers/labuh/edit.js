'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LabuhEditCtrl
 * @description
 * # LabuhEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('LabuhEditCtrl',['$scope', '$filter','$timeout', '$location', '$routeParams','BuildPDF','Notification','TarifLabuhDetail','AppParam','TarifLabuhAdd','TarifLabuhEdit','TarifLabuhEditApproval','LoadingScreen',function ($scope, $filter, $timeout, $location, $routeParams,BuildPDF,Notification,TarifLabuhDetail,AppParam,TarifLabuhAdd,TarifLabuhEdit,TarifLabuhEditApproval,LoadingScreen) {
  LoadingScreen.show();
  $scope.options = {
	    autoclose: true,
	    todayBtn: '',
	    todayHighlight: true
	};

	$scope.dataLabuh = {};
	$scope.locationPath = '/labuh/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('dataPandu.tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});

	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jnsPelayaran = response.content;
		// console.log(response);
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

	//get parameter VALUTA
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	});

  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		TarifLabuhDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				var temp = response;
				temp.jenisPelayaran = ''+temp.jenisPelayaran;
				temp.kelasPelabuhan = ''+temp.kelasPelabuhan;
				temp.kunjungan = ''+temp.kunjungan;
				temp.jenisNegara = ''+temp.jenisNegara;
				$scope.dataLabuh = temp;
				$scope.dataLabuh.tglBerlaku = new Date(response.tglBerlaku);
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

	$scope.submit = function(){


		$scope.buttonDisabled = true;
		$scope.dataLabuh.id = $routeParams.id;
		$scope.dataLabuh.tglBerlaku = $filter('date')($scope.dataLabuh.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataLabuh.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataLabuh.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataLabuh.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataLabuh.dokumen = $scope.dataLabuh.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataLabuh.dokumen = $scope.dataLabuh.dokumen.replace(fileExtension,'jpg');
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
	    formData.append('tarifLabuh', new Blob([JSON.stringify($scope.dataLabuh)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf


	//alert('kesinixx');
		TarifLabuhEdit.save(formData,
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
		$scope.dataLabuh.id = $routeParams.id;
		$scope.dataLabuh.tglBerlaku = $filter('date')($scope.dataLabuh.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataLabuh.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataLabuh.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataLabuh.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataLabuh.dokumen = $scope.dataLabuh.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataLabuh.dokumen = $scope.dataLabuh.dokumen.replace(fileExtension,'jpg');
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
	    formData.append('tarifLabuh', new Blob([JSON.stringify($scope.dataLabuh)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifLabuhEditApproval.save(formData,
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
		BuildPDF.build($scope.dataLabuh.dokumen);
	}

}]);
