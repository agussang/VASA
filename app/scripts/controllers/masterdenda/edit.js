'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterDendaEditCtrl
 * @description
 * # MasterDendaEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MasterDendaEditCtrl',['$scope', '$routeParams', '$location', 'MasterDendaDetail','MasterDendaAdd','MasterDendaEdit','Notification','AppParam','MdmDermagaSearch','LoadingScreen','MdmDermagaSearchByKode',function ($scope, $routeParams, $location, MasterDendaDetail, MasterDendaAdd, MasterDendaEdit,Notification, AppParam, MdmDermagaSearch,LoadingScreen,MdmDermagaSearchByKode) {
  LoadingScreen.show();

  $scope.dataMasterDenda={};

  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };

  //get parameter JENIS_DENDA
  AppParam.get({nama:'JENIS_DENDA'},function(response){
    $scope.jenisDenda = response.content;
  });

  //get parameter JASA
  AppParam.get({nama:'JASA'},function(response){
    $scope.jenisJasa = response.content;
  });

  //get parameter SIFAT_DENDA
  AppParam.get({nama:'SIFAT_DENDA'},function(response){
    $scope.sifatDenda = response.content;
  });


	$scope.cancel =  function(){
		$location.path('/masterdenda/list');
	};

   /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
   }

  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.dataMasterDenda.namaDermaga){
      if(typeof $scope.dataMasterDenda.namaDermaga != 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        //$scope.dataMasterDenda.namaDermaga = valueField;
        $scope.dataMasterDenda.namaDermaga ='';
      }
    }
  }
  /*end validasi autocomplete*/



  // get list dermaga
   $scope.getListOfDermaga = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal: localStorage.getItem('kodeTerminal'),
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
          kodeTerminal: localStorage.getItem('kodeTerminal'),
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
		MasterDendaDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.dataMasterDenda = response;
        $scope.dataMasterDenda.jenisJasa= ''+$scope.dataMasterDenda.jenisJasa;
        $scope.dataMasterDenda.jenisDenda= ''+$scope.dataMasterDenda.jenisDenda;
        $scope.dataMasterDenda.sifatDenda= ''+$scope.dataMasterDenda.sifatDenda;
        console.log(response);
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
    if ($scope.dataMasterDenda.mdmgKode = null){
       $scope.dataMasterDenda.kodeDermaga=  $scope.dataMasterDenda.namaDermaga.mdmgKode ;
       $scope.dataMasterDenda.namaDermaga = $scope.dataMasterDenda.namaDermaga.mdmgNama ;
    }else{
      $scope.dataMasterDenda.kodeDermaga =$scope.dataMasterDenda.namaDermaga.mdmgKode == null ? $scope.dataMasterDenda.kodeDermaga:$scope.dataMasterDenda.namaDermaga.mdmgKode ;
      $scope.dataMasterDenda.namaDermaga =$scope.dataMasterDenda.namaDermaga.mdmgNama == null ? $scope.dataMasterDenda.namaDermaga:$scope.dataMasterDenda.namaDermaga.mdmgNama;
    }

    }
  catch(err) {
    $scope.setNotification  = {
          type  : "warning", //ex : danger, warning, success, info
          message : "Data tidak berhasil tersimpan"
        };

     }


  console.log($scope.dataMasterDenda.kodeDermaga);
  console.log($scope.dataMasterDenda.namaDermaga);

    MasterDendaEdit.update($scope.dataMasterDenda,function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type	: "success", //ex : danger, warning, success, info
          message	: "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/masterdenda/list');
      }else{
        $scope.setNotification  = {
          type	: "warning", //ex : danger, warning, success, info
          message	: "Data tidak berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
        $location.path('/masterdenda/list');
      }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
    });
  };

   $scope.changeDermaga = function(data) {
      $scope.dataMasterDenda.kodeDermaga = data.mdmgKode;
    }

}]);
