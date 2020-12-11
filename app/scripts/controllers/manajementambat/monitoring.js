'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringTambatCtrl
 * @description
 * # MonitoringTambatCtrlCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MonitoringTambatCtrl', ['$scope','$PAGE_SIZE','$filter','LoadingScreen','MonitoringTambatList','MdmDermagaSearchByKode','MdmDermagaPerJasa', function($scope,$PAGE_SIZE,$filter,LoadingScreen, MonitoringTambatList, MdmDermagaSearchByKode, MdmDermagaPerJasa) {


    $scope.parent = {checkOut:''};
    $scope.kodeDermaga = {};
    $scope.tanggalTambat = {};

    $scope.parent = {checkOut:''};

    $scope.$watch('search.tglLaporanHarian', function(newValue) {
  		if(newValue){
        $scope.tanggalTambat = $filter('date')(newValue,'yyyy-MM-dd');
      }
    });

    $scope.getListOfDermaga = function(value) {
  		if (value && value.length <=3) {
  			return new Promise(function(resolve) {
  				MdmDermagaSearchByKode.get({
  					kode: value,
  					kodeTerminal : localStorage.getItem('kodeTerminal'),
  					limit: '10'
  				},
  				 function(response) {
  					resolve(response);
  						response.forEach(function (response) {
  							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
  						});
  				});
  			});
  		} else if (value.length > 3 ){
  			return new Promise(function(resolve) {
  				MdmDermagaPerJasa.get({
  					nama: value,
  					kodeTerminal : localStorage.getItem('kodeTerminal'),
  					limit: '10'
  				},
  				 function(response) {
  					resolve(response);
  						response.forEach(function (response) {
  							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
  						});
  				});
  			});
  		}
  	};

    $scope.submit = function() {
      LoadingScreen.show();
      MonitoringTambatList.get(
        {
          kdDermaga : $scope.monitoring.dermaga.mdmgKode,
          tglTambat : $scope.tanggalTambat
        },
        function(response) {
          $scope.items = response;
          LoadingScreen.hide();
      });
    };


  }]);
