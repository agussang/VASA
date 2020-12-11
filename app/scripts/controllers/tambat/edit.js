'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TambatEditCtrl
 * @description
 * # TambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TambatEditCtrl',['$scope', '$filter','$timeout', '$location','Notification', '$routeParams','TarifTambatDetail','AppParam','TarifTambatAdd','TarifTambatEdit','TarifTambatEditApproval','BuildPDF','LoadingScreen',function ($scope, $filter, $timeout, $location,Notification, $routeParams,TarifTambatDetail,AppParam,TarifTambatAdd,TarifTambatEdit,TarifTambatEditApproval,BuildPDF,LoadingScreen) {
  LoadingScreen.show();

  $scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.dataTambat = {};
	$scope.locationPath = '/tambat/list';
	$scope.tooltipInfo = Notification.setMessageValidFile();

	$scope.$watch('dataTambat.tglBerlaku', function(){
		$('#IdtglBerlaku').mask('99-99-9999');
	});
	$scope.$watch('dataTambat.nilaiTarif', function(){
		$('#tarif-3').mask('', {reverse: true});
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
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

  		if($routeParams.id){
		TarifTambatDetail.get({id:$routeParams.id}, function(response){
      		LoadingScreen.hide();
			if(response !== undefined){
				var temp = response;
				temp.jenisPelayaran = ''+temp.jenisPelayaran;
				temp.kelasPelabuhan = ''+temp.kelasPelabuhan;
				temp.jenisTambatan = ''+temp.jenisTambatan;
				temp.jenisNegara = ''+temp.jenisNegara;
				$scope.dataTambat = temp;
				// $scope.dataLabuh = response;
				$scope.dataTambat.tglBerlaku = new Date(response.tglBerlaku);
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



   //penambahan validasi



	$scope.submit = function(){

		$scope.buttonDisabled = true;
		$scope.dataTambat.tglBerlaku = $filter('date')($scope.dataTambat.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataTambat.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataTambat.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataTambat.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');

	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataTambat.dokumen = $scope.dataTambat.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataTambat.dokumen = $scope.dataTambat.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifTambat', new Blob([JSON.stringify($scope.dataTambat)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifTambatEdit.update(formData,
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


	//approval by marvin
	$scope.submitApproval = function(){

		$scope.buttonDisabled = true;
		$scope.dataTambat.tglBerlaku = $filter('date')($scope.dataTambat.tglBerlaku, 'yyyy-MM-ddT00:00:00');

		//start untuk upload smua type file jpg dan pdf
	    $scope.dataTambat.dokumen = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataTambat.dokumen : $scope.uploadFile[0].name;
	    var fileName = $scope.dataTambat.dokumen;
		var fileExtension = fileName.replace(/^.*\./, '');

	    if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'JPG' || fileExtension === 'JPEG'){
	      if(fileExtension==='pdf' || fileExtension==='PDF'){
	        $scope.dataTambat.dokumen = $scope.dataTambat.dokumen.replace(fileExtension,'pdf');
	      }else{
	        $scope.dataTambat.dokumen = $scope.dataTambat.dokumen.replace(fileExtension,'jpg');
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
		formData.append('tarifTambat', new Blob([JSON.stringify($scope.dataTambat)], { type: "application/json" }));
		if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
	    //end untuk upload smua type file jpg dan pdf

		TarifTambatEditApproval.update(formData,
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

	//function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}
	//function build pdf
	$scope.buildPDF = function(){
		BuildPDF.build($scope.dataTambat.dokumen);
	}

}]);
