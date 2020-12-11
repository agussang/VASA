'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TundaEditCtrl
 * @description
 * # TundaEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalKepilEditCtrl',['$scope','$routeParams','$filter','$timeout','$location','BuildPDF','AppParam','TarifKapalKepilEdit','TarifKapalKepilEditApproval','TarifKapalKepilAdd','TarifKapalKepilDetail','Notification','LoadingScreen', function ($scope,$routeParams,$filter,$timeout,$location,BuildPDF,AppParam,TarifKapalKepilEdit,TarifKapalKepilEditApproval,TarifKapalKepilAdd,TarifKapalKepilDetail, Notification,LoadingScreen) {
    LoadingScreen.show();
  	$scope.options = {
	    autoclose: true,
	    todayBtn: '',
	    todayHighlight: true
	};

  	$scope.dataKepil = {};
  	$scope.locationPath = '/kepil/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

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
	var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  	if($routeParams.id){
		TarifKapalKepilDetail.get({id:$routeParams.id}, function(response){
			// console.log(response);
			if(response !== undefined){
				var temp = response;
				$scope.dataKepil = temp;
				$scope.dataKepil.tglBerlaku = new Date($scope.dataKepil.tglBerlaku);
				//$scope.dataKepil.tglBerlaku = $filter('date')($scope.dataKepil.tglBerlaku, 'dd-MM-yyyy');

			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		dataEmpty();
	}

  $scope.cancel =  function(){
    $location.path('/kepil/list');
  }


    $scope.submit = function(){
      $scope.buttonDisabled = true;
			//alert is undifined
		//
		if ($scope.dataKepil.jenisPelayaran == undefined ){
			alert ("Jenis Pelayaran Belum dipilih");
			return false;
			}
		if ($scope.dataKepil.valuta == undefined ){
			alert ("Jenis Valuta Belum dipilih");
			return false;
			}

		$scope.dataKepil.tglBerlaku=  $filter('date')($scope.dataKepil.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataKepil.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataKepil.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataKepil.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataKepil.dokumen = $scope.dataKepil.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataKepil.dokumen = $scope.dataKepil.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifKepil', new Blob([JSON.stringify($scope.dataKepil)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifKapalKepilEdit.update({id:$routeParams.id},formData,	function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path($scope.locationPath);
			},
			function(response){
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
  );

	}


	 $scope.submitApproval = function(){
      $scope.buttonDisabled = true;
			//alert is undifined

		//
		if ($scope.dataKepil.jenisPelayaran == undefined ){
			alert ("Jenis Pelayaran Belum dipilih");
			return false;
			}
		if ($scope.dataKepil.valuta == undefined ){
			alert ("Jenis Valuta Belum dipilih");
			return false;
			}

		$scope.dataKepil.tglBerlaku=  $filter('date')($scope.dataKepil.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataKepil.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataKepil.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataKepil.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataKepil.dokumen = $scope.dataKepil.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataKepil.dokumen = $scope.dataKepil.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifKepil', new Blob([JSON.stringify($scope.dataKepil)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifKapalKepilEditApproval.update({id:$routeParams.id},formData,	function(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Data berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$location.path($scope.locationPath);
			},
			function(response){
				$scope.setNotification  = {
					type	: "warning", //ex : danger, warning, success, info
					message	: "Data tidak berhasil tersimpan"
				};
				Notification.setNotification($scope.setNotification);
				$scope.buttonDisabled = false;
				$scope.showLoader = false;
			}
  );

	}
	//function build pdf
	$scope.buildPDF = function(){
		BuildPDF.build($scope.dataKepil.dokumen);
	}

  }]);
