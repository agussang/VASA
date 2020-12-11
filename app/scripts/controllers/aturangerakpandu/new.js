'use strict';
/**
 * @ngdoc function
 * @name vasaApp.controller:aturangerakpanduNewCtrl
 * @description
 * # aturangerakpanduNewCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('AturangerakpanduNewCtrl',['$scope','$location','AturanGerakPanduAdd','Notification','MdmDermagaSearch','LoadingScreen','AturanGerakPanduByKodeLokasi',function ($scope,$location,AturanGerakPanduAdd,Notification,MdmDermagaSearch,LoadingScreen,AturanGerakPanduByKodeLokasi) {
	LoadingScreen.show();

	$scope.aturangerakpandu = {};

	$scope.aturangerakpandu.flagAktif = 1;
	$scope.locationPath = '/aturangerakpandu';
	$scope.maxlength = 30;




	// autocomplete dermaga
	$scope.getListOfDermaga = function(value) {
		if (value) {
			return new Promise(function(resolve, reject) {
				MdmDermagaSearch.get({
				  	nama: value,
				  	kodeTerminal : localStorage.getItem('kodeTerminal'),
				  	limit: '10'
				}, function(response) {
				  	resolve(response);
						response.forEach(function(response){
							response.mdmgNamaKode = response.mdmgNama + ' (' +response.mdmgKode+ ')';
						});
				});
			});
		}
	};

	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.validationLookupDermaga = function(){
		if(valueField !== $scope.dermaga){
			if(typeof $scope.dermaga != 'object'){
				$scope.setNotification  = {
					type  : 'warning',
					message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.dermaga = '';
			}
		}
	}

	$scope.submit = function(){
		$scope.aturangerakpandu.kodeLokasi = $scope.dermaga.mdmgKode;
		$scope.aturangerakpandu.namaLokasi = $scope.dermaga.mdmgNama;
		//console.log($scope.aturangerakpandu);return;

		if ($scope.aturangerakpandu.kodeLokasi === undefined  ) {
			$scope.setNotification  = {
					type	: "warning",
					message	: "Data yang Anda Masukan, Tidak Ada dalam pilihan"
				};
				Notification.setNotification($scope.setNotification);
				return;
		}

		AturanGerakPanduByKodeLokasi.get({
			kodeLokasi:$scope.aturangerakpandu.kodeLokasi
		},function(response){
			var findSame = false
			response.content.forEach(function(item){
				if(item.kodeKapal == $scope.aturangerakpandu.kodeKapal){
					findSame = true;
				}
			});

			if(findSame){
				$scope.showLoader = false;
	        	$scope.setNotification = {
		            type: "warning", //ex : danger, warning, success, info
		            message: "Data yang di inputkan sudah ada"
	          	};
	          	Notification.setNotification($scope.setNotification);
          	  	return false;
			}else{

				AturanGerakPanduAdd.save($scope.aturangerakpandu,
				function(response){
					$scope.setNotification  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$location.path($scope.locationPath);
				},
				function(response){
					$scope.setNotification  = {
						type	: "warning",
						message	: "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
					$scope.buttonDisabled = false;
					$scope.showLoader = false;
				});
			}
		});


	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	LoadingScreen.hide();

}]);
