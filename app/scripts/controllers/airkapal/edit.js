'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AirkapalEditCtrl
 * @description
 * # AirkapalEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
 .controller('AirkapalEditCtrl',['$scope', '$filter','$timeout', '$location', '$routeParams','BuildPDF','TarifAirKapalDetail','AppParam','TarifAirKapalAdd','TarifAirKapalEdit','TarifAirKapalEditApproval','Notification','LoadingScreen',function ($scope, $filter, $timeout, $location, $routeParams,BuildPDF,TarifAirKapalDetail,AppParam,TarifAirKapalAdd,TarifAirKapalEdit,TarifAirKapalEditApproval,Notification,LoadingScreen) {
  LoadingScreen.show();
  $scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.dataAirKapal = {};
    $scope.locationPath = '/airkapal/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

    $scope.$watch('dataAirKapal.tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
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
	//get parameter jenis negara
	AppParam.get({nama:'JENIS_NEGARA'},function(response){
		$scope.jenisNegara = response.content;
	})
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		TarifAirKapalDetail.get({id:$routeParams.id}, function(response){
      	LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				temp.jenisPelayaran = ''+temp.jenisPelayaran;
				temp.alatIsiAir = ''+temp.alatIsiAir;
				temp.satuan = ''+temp.satuan;
				temp.jenisNegara = ''+temp.jenisNegara;
				$scope.dataAirKapal = temp;
				$scope.dataAirKapal.tglBerlaku = new Date(response.tglBerlaku);
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
    $location.path('/airkapal/list');
  }

	$scope.submit = function(){
    $scope.showLoader = true;
		$scope.dataAirKapal.tglBerlaku = $filter('date')($scope.dataAirKapal.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataAirKapal.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataAirKapal.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataAirKapal.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataAirKapal.dokumen = $scope.dataAirKapal.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataAirKapal.dokumen = $scope.dataAirKapal.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifAirKapal', new Blob([JSON.stringify($scope.dataAirKapal)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifAirKapalEdit.update(formData,
	      function(response){
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
    $scope.showLoader = true;
		$scope.dataAirKapal.tglBerlaku = $filter('date')($scope.dataAirKapal.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataAirKapal.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataAirKapal.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataAirKapal.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');
	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataAirKapal.dokumen = $scope.dataAirKapal.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataAirKapal.dokumen = $scope.dataAirKapal.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifAirKapal', new Blob([JSON.stringify($scope.dataAirKapal)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifAirKapalEditApproval.update(formData,
	      function(response){
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
			BuildPDF.build($scope.dataAirKapal.dokumen);
		}

}]);
