'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AturanGerakPanduEditCtrl
 * @description
 * # AturanGerakPanduEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AturangerakpanduEditCtrl',['$scope','$routeParams','$location','AturanGerakPanduDetail','AturanGerakPanduEdit','Notification','MdmDermagaSearch','LoadingScreen',function ($scope,$routeParams,$location,AturanGerakPanduDetail,AturanGerakPanduEdit,Notification,MdmDermagaSearch,LoadingScreen) {
	LoadingScreen.show();

	$scope.aturangerakpandu = {};
	$scope.locationPath = '/aturangerakpandu';

	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

  	if($routeParams.id){
		AturanGerakPanduDetail.get({id:$routeParams.id},

			function(response){
			LoadingScreen.hide();
				if(response !== undefined){
					console.log(response);
					$scope.aturangerakpandu = response;
					$scope.dermaga = response.namaLokasi;
					$scope.aturangerakpandu.kodeLokasi = response.kodeLokasi;
				}else{
					dataEmpty();
				}
			},
			function(){
				dataEmpty();
			}
		);
	}else{
		LoadingScreen.hide();
		dataEmpty();
	}

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

     /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupDermaga= function(){
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
      	$scope.aturangerakpandu.namaLokasi = $scope.dermaga.mdmgNama === undefined ? $scope.aturangerakpandu.namaLokasi:$scope.dermaga.mdmgNama;
      	$scope.aturangerakpandu.kodeLokasi = $scope.dermaga.mdmgKode === undefined ? $scope.aturangerakpandu.kodeLokasi:$scope.dermaga.mdmgKode;


		AturanGerakPanduEdit.save($scope.aturangerakpandu,
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
			}
		);
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

}]);
