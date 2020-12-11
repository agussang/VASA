'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterMasaTambatViewCtrl
 * @description
 * # MasterMasaTambatViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterKesepakatanViewCtrl',['$scope', '$routeParams','$location','ParamKesepakatanView','AppParamValue',function ($scope, $routeParams,$location,ParamKesepakatanView,AppParamValue) {
    $scope.prmkspkt = {}; // arrayparent
  	var dataEmpty = function(){
			 $scope.detailFound = false;
			 $scope.loading = false;
			 $scope.contents = 'no content found';
		};

    //get master data pelanggan
    $scope.contentOfmdmKapal = {};
    $scope.contentOfmdmPelanggan = {};

    $scope.splitDate = function(date){
      var splitDate = date.split('T');
      return new Date(splitDate[0]);
    }

    ParamKesepakatanView.get({id:$routeParams.id},function(response){
    if(response.status !== '500'){
      $scope.prmkspkt.isDermaga = response.isDermaga;
      $scope.prmkspkt.isGt = response.isGt;
      $scope.prmkspkt.isJenisPelayaran = response.isJenisPelayaran;
      $scope.prmkspkt.isKodeKapal = response.isKodeKapal;
      $scope.prmkspkt.isMinUtility = response.isMinUtility;
      $scope.prmkspkt.isPelanggan = response.isPelanggan;
      $scope.prmkspkt.isValuta = response.isValuta;
      $scope.prmkspkt.isCustom = response.isCustom;
      $scope.prmkspkt.isJenisGerakanPandu = response.isJenisGerakanPandu;
      $scope.prmkspkt.isJenisKapal = response.isJenisKapal;
      $scope.prmkspkt.isJenisPandu = response.isJenisPandu;
      $scope.prmkspkt.isKapalNegara = response.isKapalNegara;
      $scope.prmkspkt.isKapalTunda = response.isKapalTunda;
      $scope.prmkspkt.isLokasiAwal = response.isLokasiAwal;
      $scope.prmkspkt.isLokasiTujuan = response.isLokasiTujuan;
      $scope.prmkspkt.isBendera = response.isBendera;
      $scope.prmkspkt.isLoa = response.isLoa;
      $scope.prmkspkt.isSifatKunjungan = response.isSifatKunjungan;
      $scope.prmkspkt.isJenisTunda = response.isJenisTunda;
      $scope.prmkspkt.jasa = ''+response.jasa;
      $scope.prmkspkt.isNoPpk1 = response.isNoPpk1;
      $scope.prmkspkt.isNoPpkJasa = response.isNoPpkJasa;
      $scope.prmkspkt.kodeKesepakatan = response.kodeKesepakatan;

      if(response.berlakuDi == '' || response.berlakuDi == null){
        $scope.prmkspkt.berlakuDi = '';
      }else{
        $scope.prmkspkt.berlakuDi = ''+response.berlakuDi;
      }     

      AppParamValue.get({nama:'JASA', value:response.jasa}, {}, function(response){
        $scope.prmkspkt.jasaText = response[0].caption;
      });

      $scope.tglSelesai = $scope.splitDate(response.tglSelesai);
      $scope.tglMulai =  $scope.splitDate(response.tglMulai); 
      $scope.paramKesepakatanArray = response.newDetails;     
    }
    });

      

  //tombol batal
  $scope.close =  function(){
		$location.path('/paramkesepakatan/list');
	}

}]);
