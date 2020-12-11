'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

angular.module('vasaApp')
.controller('RolesAddCtrl', ['$scope','$location','RolesAdd','PermissionList','Notification','LoadingScreen','RolesByKode','ListCabang','MdmCabangSearch', function ($scope,$location,RolesAdd,PermissionList,Notification,LoadingScreen,RolesByKode,ListCabang) {
	LoadingScreen.show();
	$scope.showLoader = false;
	$scope.buttonDisabled = true;
	$scope.switchDefault = false;
	$scope.dataRoles = {};
	$scope.jasa = {};
	$scope.jasa.flagTambat = $scope.switchDefault;
	$scope.jasa.flagLabuh = $scope.switchDefault;
	$scope.jasa.flagTunda = $scope.switchDefault;
	$scope.jasa.flagAirKapal = $scope.switchDefault;
	$scope.jasa.flagPandu = $scope.switchDefault;
	$scope.jasa.checkbox = $scope.switchDefault;
	$scope.notifcheckbox = $scope.switchDefault;
	$scope.flagNotifPenetapan = $scope.switchDefault;
	$scope.flagNotifRealisasi = $scope.switchDefault;
	$scope.flagNotifEskalasi = $scope.switchDefault;

	$scope.isPusat = localStorage.getItem('isPusat');
	////console.log($scope.isPusat);
	$scope.locationPath = '/roles';

	//var	namaCabang 	= localStorage.getItem('namaCabang');
	//var kodeCabang = localStorage.getItem('kodeCabang');

	$scope.dataRoles.kodeCabang = localStorage.getItem('kodeCabang').toString();


		ListCabang.get(function(response){
			$scope.listCabang = response;
			$scope.listCabang.forEach(function(option){
				option.kodeCabang = option.kodeCabang.toString();
				option.kodeCabang = option.kodeCabang.length < 2 ? '0' +	option.kodeCabang : option.kodeCabang; 
				option.namaPelbKode = option.namaTerminal + ' ('+ option.kodeCabang+')';
			})
		});


	var dataEmpty = function(){
		$scope.detailFound 	= false;
		$scope.loading 		= false;
		$scope.contents 	= 'no content found';
	};

	$scope.selectAllNotifikasi = function(){
		var newValue = $scope.notifcheckbox;
		$scope.flagNotifPenetapan = newValue;
		$scope.flagNotifRealisasi = newValue;
		$scope.flagNotifEskalasi = newValue;
	};

	$scope.selectJasa = function(){
		var newValue = $scope.jasa.checkbox;

		$scope.jasa.flagTambat = newValue;
		$scope.jasa.flagLabuh = newValue;
		$scope.jasa.flagTunda = newValue;
		$scope.jasa.flagAirKapal = newValue;
		$scope.jasa.flagPandu = newValue;
	};

	//get list permission menu
	PermissionList.get({size: 199},function(response){

		// //console.log(response);
		var dataGroup = response.content;

		var groups = {};

		for(var i = 0; i < dataGroup.length; i++) {
		    var item = dataGroup[i];

		    if(!groups[item.grup]) {
				groups[item.grup] = [];
				groups[item.grup].nama = item.grupText;
				groups[item.grup].grupid = item.grup;
				groups[item.grup].groupCheckbox = $scope.switchDefault;
		    }

		    groups[item.grup].push({
		        idMenu: item.kodeMenu,
		        namaMenu: item.namaMenu,
		        id: item.id,
		        print: $scope.switchDefault,
		        read: $scope.switchDefault,
		        update: $scope.switchDefault,
		        create: $scope.switchDefault,
		        delete: $scope.switchDefault,
				checkbox: $scope.switchDefault
		    });

		}

		$scope.hakAksesMenu = groups;

		$scope.selectAllGroup = function(grupid){

			var newValue = groups[grupid].groupCheckbox ;

			for (var l = 0; l < groups[grupid].length; l++) {
				groups[grupid][l].checkbox = newValue;
				groups[grupid][l].print = newValue;
				groups[grupid][l].create = newValue;
				groups[grupid][l].update = newValue;
				groups[grupid][l].read = newValue;
				groups[grupid][l].delete = newValue;
			}
		};

		$scope.selectAll = function(grupid,idMenu){
			var indexOfGroup = groups[grupid].findIndex(function (grup) {
  				return grup.idMenu == idMenu;
			});
			var newValue = groups[grupid][indexOfGroup].checkbox ;
			groups[grupid][indexOfGroup].print = newValue;
			groups[grupid][indexOfGroup].create = newValue;
			groups[grupid][indexOfGroup].update = newValue;
			groups[grupid][indexOfGroup].read = newValue;
			groups[grupid][indexOfGroup].delete = newValue;
		};

	});



	// // function update
	$scope.submit = function(){
		$scope.showLoader = true;
		$scope.dataRoles.kodeCabang = $scope.dataRoles.kodeCabang.toString();
		$scope.dataRoles.kodeCabang = $scope.dataRoles.kodeCabang.length < 2 ? '0' +	$scope.dataRoles.kodeCabang : 	$scope.dataRoles.kodeCabang;
		$scope.dataRoles.flagNotifPenetapan = $scope.flagNotifPenetapan;
		$scope.dataRoles.flagNotifRealisasi = $scope.flagNotifRealisasi;
		$scope.dataRoles.flagNotifEskalasi = $scope.flagNotifEskalasi;
		$scope.dataRoles.menus = [];
		var result = [];
		for(var x in $scope.hakAksesMenu) {
		    if(Object.prototype.hasOwnProperty.call($scope.hakAksesMenu, x)) {
		        var obj = {};
		        obj[x] = $scope.hakAksesMenu[x];
		        result.push(obj);
		    }
		}
		for (var n in result ){
			var data1 = result[n];
			for(var k in data1 ){
				var data2 = data1[k];
				for(var l=0; l<data2.length; l++){
					var dataPostMenus = data2[l];
					$scope.dataRoles.menus.push({
						cflag : dataPostMenus.create,
						dflag : dataPostMenus.delete,
						id : dataPostMenus.id,
						kodeMenu : dataPostMenus.idMenu,
						namaMenu : dataPostMenus.namaMenu,
						pflag : dataPostMenus.print,
						rflag : dataPostMenus.read,
						uflag : dataPostMenus.update
					});
				}
			}
		}
		// $scope.dataRoles.menus = JSON.stringify($scope.dataRoles.menus);
		$scope.dataRoles.jasa = {
			flagAirKapal : $scope.jasa.flagAirKapal,
			flagLabuh : $scope.jasa.flagLabuh,
			flagPandu : $scope.jasa.flagPandu,
			flagTambat : $scope.jasa.flagTambat,
			flagTunda :	$scope.jasa.flagTunda
		};

		RolesByKode.get({
			kodeRole:$scope.dataRoles.kodeRole
		},function(response){
			var findSame = false;
			response.content.forEach(function(item){
				if((item.kodeRole == $scope.dataRoles.kodeRole) && (item.kodeCabang == $scope.dataRoles.kodeCabang)){
					findSame = true;
				}
			});

			if(findSame){
				$scope.showLoader = false;
				$scope.setNotification = {
					type: "warning", 
					message: "Data yang di inputkan sudah ada"
				};
				Notification.setNotification($scope.setNotification);
				return false;
			}else{
				RolesAdd.save($scope.dataRoles,
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


//console.log($scope.dataRoles);
		});


	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	LoadingScreen.hide();
}]);
