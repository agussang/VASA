'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDermagaKepilEditCtrl
 * @description
 * # MasterDermagaKepilEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MasterDermagaKepilEditCtrl',['$scope', '$routeParams', '$location', 'MasterDermagaKepilDetail','MasterDendaAdd','MasterDermagaKepilEdit','Notification','AppParam','MdmDermagaSearch','LoadingScreen','MdmDermagaSearchByKode',function ($scope, $routeParams, $location, MasterDermagaKepilDetail, MasterDendaAdd, MasterDermagaKepilEdit,Notification, AppParam, MdmDermagaSearch,LoadingScreen,MdmDermagaSearchByKode) {
  LoadingScreen.show();
  $scope.dataMasterKepil={};

  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };



	$scope.cancel =  function(){
		$location.path('/masterdermagakepil/list');
	};

     /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.dataMasterKepil.namaDermaga){
      if(typeof $scope.dataMasterKepil.namaDermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.dataMasterKepil.namaDermaga = '';
      }
    }
  }
  
  // get list dermaga
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
          //console.log(response);
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaSearch.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
          //console.log(response);
        });
      });
    }
  };


  	if($routeParams.id){
		MasterDermagaKepilDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.dataMasterKepil = response;
        // console.log(response);
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

  try {
    if ($scope.dataMasterKepil.mdmgKode = null){
       $scope.dataMasterKepil.kodeDermaga=  $scope.dataMasterKepil.namaDermaga.mdmgKode ;
       $scope.dataMasterKepil.namaDermaga = $scope.dataMasterKepil.namaDermaga.mdmgNama ;
    }else{
      $scope.dataMasterKepil.kodeDermaga =$scope.dataMasterKepil.namaDermaga.mdmgKode == null ? $scope.dataMasterKepil.kodeDermaga:$scope.dataMasterKepil.namaDermaga.mdmgKode ;
      $scope.dataMasterKepil.namaDermaga =$scope.dataMasterKepil.namaDermaga.mdmgNama == null ? $scope.dataMasterKepil.namaDermaga:$scope.dataMasterKepil.namaDermaga.mdmgNama;
    }

    }
  catch(err) {
    $scope.setNotification  = {
          type  : "warning", //ex : danger, warning, success, info
          message : "Data tidak berhasil tersimpan"
        };

     }

    MasterDermagaKepilEdit.update($scope.dataMasterKepil,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type	: "success", //ex : danger, warning, success, info
          message	: "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/masterdermagakepil/list');
      }else{
        $scope.setNotification  = {
          type	: "warning", //ex : danger, warning, success, info
          message	: "Data tidak berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/masterdermagakepil/list');
      }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
    });
  };

   $scope.changeDermaga = function(data) {
      $scope.dataMasterDenda.kodeDermaga = data.mdmgKode;
    }

}]);

