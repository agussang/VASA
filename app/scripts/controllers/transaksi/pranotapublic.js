
'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPranotaPublicCtrl
 * @description
 * # TransaksiPranotaPublicCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('TransaksiPranotaPublicCtrl',['$scope','$routeParams','$location','$filter','$route','$controller','$timeout','PranotaPublic','UserRole','LoadingScreen', function ($scope,$routeParams,$location,$filter,$route,$controller,$timeout,PranotaPublic,UserRole,LoadingScreen) {
	angular.extend(this, $controller('TransaksiPranotaCtrl', {$scope: $scope})); 

  	// LoadingScreen.show();s
  	var dataEmpty = function(){
  		console.log("Data Pranota tidak ada");
	};

	$scope.items=[];
	$scope.details=[];
	$scope.detailsItem =[];
	$scope.sktdTeks = '';
	$scope.isShowBtnEkspor = true;
	$scope.namaPejabatPengesahan = {};
	$scope.dataPranota = {};

	if($location.path().indexOf("vasapublic") > -1){
		$scope.isPranotaPublic = true;
	} else{
		$scope.isPranotaPublic = false;
	}

	//function get data pranota
	$scope.getDataPranotaPublic = function(){
		PranotaPublic.get({ze:$routeParams.ppk1}, function(response){
			console.log(response);
			if(response !== undefined){
				$scope.responsePranota = response;
				console.log(response);
				if(response.length>0){
					$scope.isShowBtnEkspor = true;
					var itemsTemp = [];
					response = $filter('orderBy')(response,'noPpk1');
					for (var x = 0; x<response.length; x++){
						console.log(response[x])
						if(response[x].sktd===1)$scope.sktdTeks = '(SKTD)';
						$scope.namaPejabatPengesahan.nama = response[x].namaPejabat;
						$scope.namaPejabatPengesahan.jabatanTercetak = response[x].jabatan;
						$scope.kotaCabangPelabuhan = response[x].namaCabang;
						response[x].kodeCabangText = response[x].namaCabang;

						$scope.responsePranota[x] = response[x];
						var str = response[x].noPpk1;
						var n = str.indexOf("A");
						if(n===-1){
							$scope.responsePranota[x].judulPranota = 'PERHITUNGAN JASA LABUH/TAMBAT/PANDU/TUNDA/KEPIL';
							$scope.responsePranota[x].jenisPranota = 'normal';
							$scope.responsePranota[x].textButtonKirimNota = 'Kirim Nota';
						}else{
							$scope.responsePranota[x].judulPranota = 'PERHITUNGAN JASA AIR KAPAL';
							$scope.responsePranota[x].jenisPranota = 'airKapal'
							$scope.responsePranota[x].textButtonKirimNota = 'Kirim Nota Air Kapal'
						}
						// Sort Data and Check User Role
				        var userRoleData = JSON.parse(localStorage.getItem('userRole'));

				        itemsTemp[x] = $scope.responsePranota[x].items.slice(0);
				        $scope.responsePranota[x].items = [];
				        $scope.responsePranota[x].itemLabuh = [];
				        $scope.responsePranota[x].itemPandu = [];
				        $scope.responsePranota[x].itemTambat = [];
				        $scope.responsePranota[x].itemTunda = [];
				        $scope.responsePranota[x].itemAirKapal = [];

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagLabuh) return true;
				          }
				          if(item.jenisJasaText === "LABUH") {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemLabuh.push(item);
				          }
				        });

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagTambat) return true;
				          }
				          if(item.jenisJasaText === "TAMBAT") {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemTambat.push(item);
				          }
				          if(item.jenisJasaText === "KEPIL") {
				            $scope.responsePranota[x].items.push(item);
				          }
				        });

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagPandu) return true;
				          }
				          if(item.jenisJasaText === "PANDU") {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemPandu.push(item);
				          }
				        });

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagTunda) return true;
				          }
				          if(item.jenisJasaText === "TUNDA") {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemTunda.push(item);
				          }
				        });

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagAirKapal) return true;
				          }
				          if(item.jenisJasaText === "AIR KAPAL") {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemAirKapal.push(item);
				          }
				        });

				        itemsTemp[x].forEach(function(item,index){
				          if(userRoleData) {
				            if(!userRoleData.jasa.flagAirKapal) return true;
				          }
				          if(item.jenisJasaText === "" || item.jenisJasaText === null) {
				            $scope.responsePranota[x].items.push(item);
				            $scope.responsePranota[x].itemAirKapal.push(item);
				          }
				        });
				        // End Sort Data and Check User Role
						if($scope.responsePranota[x].valuta==='IDR'){
							$scope.responsePranota[x].valutaMataUang = 'Rp';
							$scope.responsePranota[x].valutaTerbilang = 'rupiah';
						}else{
							$scope.responsePranota[x].valutaMataUang = '$';
							$scope.responsePranota[x].valutaTerbilang = 'dollar';
						}

						for (var i = 0; i<response[x].items.length; i++){
							if(response[x].items[i].jenisJasaText ==='LABUH'){
								response[x].items[i].jenisJasaTextNormal = 'Labuh';
							}else if(response[x].items[i].jenisJasaText ==='TAMBAT'){
								response[x].items[i].jenisJasaTextNormal = 'Tambat';
							}else if(response[x].items[i].jenisJasaText ==='PANDU'){
								response[x].items[i].jenisJasaTextNormal = 'Pandu';
							}else if(response[x].items[i].jenisJasaText ==='TUNDA'){
								response[x].items[i].jenisJasaTextNormal = 'Tunda';
							}else if(response[x].items[i].jenisJasaText ==='AIR KAPAL'){
								response[x].items[i].jenisJasaTextNormal = 'Air Kapal';
							}else if(response[x].items[i].jenisJasaText ==='KEPIL'){
								response[x].items[i].jenisJasaTextNormal = 'Kepil';
							}else{
								response[x].items[i].jenisJasaTextNormal = '';
							}
						}
					}
					// $scope.cetakPDF($scope.responsePranota);
				}else{
					$scope.isShowBtnEkspor = false;
				}
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
		LoadingScreen.hide();		
	};

    $scope.getDataPranotaPublic();
}]);