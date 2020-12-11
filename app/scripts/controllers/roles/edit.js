'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('RolesEditCtrl', ['$scope','$routeParams','$location','RolesDetail','RolesEdit','Notification','LoadingScreen','ListCabang', function ($scope,$routeParams,$location,RolesDetail,RolesEdit,Notification,LoadingScreen,ListCabang) {
	LoadingScreen.show();
	$scope.switchDefault = false;
	$scope.showLoader = false;
	$scope.dataRoles = {};
	$scope.dataRolesUpdate = {};
	// $scope.dataRoles.jasa = {};

	$scope.dataRoles.checkbox = $scope.switchDefault;
	$scope.notifcheckbox = $scope.switchDefault;
	/*$scope.flagNotifPenetapan = $scope.switchDefault;
	$scope.flagNotifRealisasi = $scope.switchDefault;
	$scope.flagNotifEskalasi = $scope.switchDefault;*/
	$scope.locationPath = '/roles';


	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};



	if($routeParams.id){
		RolesDetail.get({id:$routeParams.id}, function(response){
			LoadingScreen.hide();
			if(response !== undefined){
				//console.log(response);
				var temp = response;
				$scope.dataRoles = temp;
				$scope.dataRolesJasa = temp.jasa;
				$scope.dataRolesGrup = temp.groups;

				ListCabang.get(function(response2){
					$scope.listCabang = response2;
					
					$scope.listCabang.forEach(function(option){
						option.kodeCabang = option.kodeCabang.toString();
						option.kodeCabang = option.kodeCabang.length < 2 ? '0' +	option.kodeCabang : option.kodeCabang;
						option.namaPelbKode = option.namaTerminal + ' ('+ option.kodeCabang+')';
					})
					$scope.dataRoles.kodeCabang = response.kodeCabang;
				});

				if ($scope.dataRoles !== undefined) {

					for(var i =0; i < $scope.dataRoles.groups.length; i++){
						for(var j=0; j < $scope.dataRoles.groups[i].menus.length; j++ ){
							$scope.dataRoles.groups[i].menus[j].checkbox = false;
						}
					}
					/*
					//sort array based on kodeMenu
					for (var k = 0; k < Object.keys($scope.dataRoles.groups.length); k++) {
						$scope.dataRoles.groups[k].menus.sort(function(a, b) {
						return parseFloat(a.kodeMenu) - parseFloat(b.kodeMenu);
						});
					}

					//deklarasi variable checkbox
					for (var l = 0; l < Object.keys($scope.dataRoles.groups.length); l++) {
						for (var m = 0; m < Object.keys($scope.dataRoles.groups[l].menus.length); m++) {
								$scope.dataRoles.groups[m].menus[l].checkbox = $scope.switchDefault;
						}
					}

					//deklarasi variable group checkbox
					for (var n = 0; n < $scope.dataRoles.groups.length; n++) {
						 $scope.dataRoles.groups[n].groupCheckbox = $scope.switchDefault;
					}*/
				}
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

	$scope.selectAllNotifikasi = function(){
		var newValue = $scope.notifcheckbox;
		$scope.dataRoles.flagNotifPenetapan = newValue;
		$scope.dataRoles.flagNotifRealisasi = newValue;
		$scope.dataRoles.flagNotifEskalasi = newValue;
	};

	$scope.selectJasa = function(){
		var newValue = $scope.dataRolesJasa.checkbox;
		$scope.dataRolesJasa.flagTambat = newValue;
		$scope.dataRolesJasa.flagLabuh = newValue;
		$scope.dataRolesJasa.flagTunda = newValue;
		$scope.dataRolesJasa.flagAirKapal = newValue;
		$scope.dataRolesJasa.flagPandu = newValue;
	};

	$scope.selectAll = function(grupid,kodeMenu){
		var indexOfGroups = $scope.dataRoles.groups.findIndex(function (grup) {
					 return grup.id == grupid;
		});

		var indexOfMenus = $scope.dataRoles.groups[indexOfGroups].menus.findIndex(function (grup) {
					 return grup.kodeMenu == kodeMenu;
		});

		var newValue = $scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].checkbox ;
		$scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].pflag = newValue;
		$scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].cflag = newValue;
		$scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].uflag = newValue;
		$scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].rflag = newValue;
		$scope.dataRoles.groups[indexOfGroups].menus[indexOfMenus].dflag = newValue;

	};


	$scope.selectAllGroup = function(grupid){
		var indexOfGroups = $scope.dataRoles.groups.findIndex(function (grup) {
					 return grup.id == grupid;
		});
		var newValue = $scope.dataRoles.groups[indexOfGroups].groupCheckbox ;
		for (var l = 0; l < $scope.dataRoles.groups[indexOfGroups].menus.length; l++) {
			$scope.dataRoles.groups[indexOfGroups].menus[l].checkbox = newValue;
			$scope.dataRoles.groups[indexOfGroups].menus[l].pflag = newValue;
			$scope.dataRoles.groups[indexOfGroups].menus[l].cflag = newValue;
			$scope.dataRoles.groups[indexOfGroups].menus[l].uflag = newValue;
			$scope.dataRoles.groups[indexOfGroups].menus[l].rflag = newValue;
			$scope.dataRoles.groups[indexOfGroups].menus[l].dflag = newValue;
		}
	};


	// function update
	$scope.submit = function(){
		$scope.showLoader = true;
		$scope.dataRolesUpdate.kodeCabang = $scope.dataRoles.kodeCabang.toString();
		$scope.dataRolesUpdate.kodeCabang = $scope.dataRolesUpdate.kodeCabang.length < 2 ? '0' +	$scope.dataRolesUpdate.kodeCabang : 	$scope.dataRolesUpdate.kodeCabang;
		$scope.dataRolesUpdate.flagNotifPenetapan = $scope.dataRoles.flagNotifPenetapan;
		$scope.dataRolesUpdate.flagNotifRealisasi = $scope.dataRoles.flagNotifRealisasi;
		$scope.dataRolesUpdate.flagNotifEskalasi = $scope.dataRoles.flagNotifEskalasi;


		$scope.dataRolesUpdate.menus = [];
		// $scope.dataRolesUpdate.id = $routeParams.id;
		$scope.dataRolesUpdate.jasa = $scope.dataRolesJasa;
		$scope.dataRolesUpdate.keterangan = $scope.dataRoles.keterangan;
		$scope.dataRolesUpdate.kodeRole = $scope.dataRoles.kodeRole;
		$scope.dataRolesUpdate.namaRole = $scope.dataRoles.namaRole;
		var result = $scope.dataRoles.groups;
		for (var i=0; i<result.length; i++ ){
			var data1 = result[i].menus;
			for(var k=0; k<data1.length;k++){
				var data2 = data1[k];
				$scope.dataRolesUpdate.menus.push(data2)
			}
		}

		//////console.log($scope.dataRolesUpdate);
		RolesEdit.update({id:$routeParams.id},$scope.dataRolesUpdate,
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

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}
}]);
