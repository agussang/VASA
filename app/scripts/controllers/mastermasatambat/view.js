'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterMasaTambatViewCtrl
 * @description
 * # MasterMasaTambatViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MasterMasaTambatViewCtrl',['$scope', '$routeParams','$location','MasaTambatDetail','ItemMasaTambatDetailId','MdmPelangganDetail',function ($scope, $routeParams,$location,MasaTambatDetail, ItemMasaTambatDetailId ,MdmPelangganDetail) {

  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};

    //get master data pelanggan
    $scope.contentOfmdmKapal = {};
    $scope.contentOfmdmPelanggan = {};

  		if($routeParams.id){
    	  MasaTambatDetail.get({id:$routeParams.id}, function(response){
          // console.log(response.id);
          $scope.idmasatambat = response.id;
          $scope.masaTambat = response;
          var active    = "YA";
          var non_active  = "TIDAK";
          $scope.masaTambat.flagGt            = ($scope.masaTambat.flagGt?active:non_active);
          $scope.masaTambat.flagJenisKapal    = ($scope.masaTambat.flagJenisKapal?active:non_active);
          $scope.masaTambat.flagKemasan       = ($scope.masaTambat.flagKemasan?active:non_active);
          $scope.masaTambat.flagPelayaran     = ($scope.masaTambat.flagPelayaran?active:non_active);
    			if(response !== undefined){

           ItemMasaTambatDetailId.get({id:$scope.idmasatambat},
            function(response1){
              console.log(response1);
              $scope.itemMasaTambat = response1;
            },
            function(response1){
              alert("Cannot get list of mdm pelanggan");
            });
            

    			}else{
    				dataEmpty();
    			}
    		}, function(){
    			dataEmpty();
    		});
    	}else{
    		dataEmpty();
    	}

      

  //tombol batal
  $scope.close =  function(){
		$location.path('/mastermasatambat/list');
	}

}]);
