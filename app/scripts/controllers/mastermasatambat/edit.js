'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MasterMasaTambatEditCtrl
 * @description
 * # MasterMasaTambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MasterMasaTambatEditCtrl',['$scope','$location','$window','$rootScope', '$routeParams','$timeout','MasaTambatDetail','MasaTambatAdd','ItemMasaTambatAdd','ItemMasaTambatDetailId','ItemMasaTambatDelete','ItemMasaTambatEdit','Notification','AppParam','LoadingScreen',function ($scope,$location,$window,$rootScope,$routeParams,$timeout,MasaTambatDetail,MasaTambatAdd,ItemMasaTambatAdd,ItemMasaTambatDetailId,ItemMasaTambatDelete,ItemMasaTambatEdit,Notification,AppParam,LoadingScreen) {
	LoadingScreen.show();
	$scope.masatambat = {};
	$scope.locationPath = '/mastermasatambat/list';
	$scope.masatambatDetail = {};
	$scope.masatambatDetailArray = [];
	$scope.masatambatDetailUpdateArray = [];
	$scope.masatambatDetailUpdate = [];
	$scope.postMasaTambatMaster = {};
	$scope.postDetailMasaTambatMaster = {};
	$scope.updateItemMasaTambat = {};
	$scope.addNewItemMasaTambat = {};
	$scope.isActive = false;


	//get parameter JENIS_PELAYARAN
	AppParam.get({nama:'JENIS_PELAYARAN'},function(response){
		$scope.jenisPelayaran = response.content;
	});

	//get parameter JENIS_KAPAL
	AppParam.get({nama:'JENIS_KAPAL',size:50},function(response){
		$scope.jenisKapal = response.content;
	});

	//get parameter KEMASAN
	AppParam.get({nama:'KEMASAN'},function(response){
		$scope.jenisKemasan = response.content;
	});

	// get jenisPelayaranText
	$scope.getJenisPelayaran = function(jnspl){
		AppParam.get({nama:'JENIS_PELAYARAN'}, function(response){
			var content = response.content;
			for(var idx = 0; idx < content.length;idx++){
				if (content[idx].value == jnspl) {
					$scope.jenisPelayaranText = content[idx].caption;
				}
			}
		});
	}

	// get jenisKemasanText
	$scope.getJenisKemasan = function(jnskms){
		AppParam.get({nama:'KEMASAN'}, function(response){
			var content = response.content;
			for(var idx = 0; idx < content.length;idx++){
				if (content[idx].value == jnskms) {
					$scope.jenisKemasanText = content[idx].caption;
				}
			}
		});
	}

	// get jenisKapalText
	$scope.getJenisKapal = function(jnskpl){
		AppParam.get({nama:'JENIS_KAPAL'}, function(response){
			var content = response.content;
			for(var idx = 0; idx < content.length;idx++){
				if (content[idx].value == jnskpl) {
					$scope.jenisKapalText = content[idx].caption;
				}
			}
		});
	}

	//get by id
	if($routeParams.idisPranotaPublic){
		MasaTambatDetail.get({id:$routeParams.idisPranotaPublic}, function(response){
			LoadingScreen.hide();
			$scope.masaTambat = response;
			$scope.masatambat.gt = ($scope.masaTambat.flagGt?true:false);
			$scope.masatambat.jnsPelayaran = ($scope.masaTambat.flagPelayaran?true:false);
			$scope.masatambat.jnsKemasan = ($scope.masaTambat.flagKemasan?true:false);
			$scope.masatambat.jnsKapal = ($scope.masaTambat.flagJenisKapal?true:false);


			if(response !== undefined){
				$scope.idmasatambat = response.id;
				ItemMasaTambatDetailId.get({id:$scope.idmasatambat},function(response1){
					//id:$routeParams.id;
					$scope.masatambatDetailArray = response1;
				},function(response1){
					alert("Cannot get list of mdm pelanggan");
				});
			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		LoadingScreen.hide();
		// dataEmpty();
	}

	//add new item masa tambat
	$scope.addNewItemMasaTambat = function() {
		for (var y = 0; y < $scope.masatambatDetailUpdateArray.length; y++) {
			$scope.addNewItemMasaTambat[y] = $scope.masatambatDetailUpdateArray[y];
			$scope.addNewItemMasaTambat[y].idMasaTambat = $scope.idmasatambat;
			if (y == $scope.masatambatDetailArray.length) {
				ItemMasaTambatAdd.save($scope.addNewItemMasaTambat[y],function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			}
		}
	}

	// function save
	$scope.submit = function(){
		for (var y = 0; y < $scope.masatambatDetailArray.length; y++) {
			$scope.updateItemMasaTambat[y] = $scope.masatambatDetailArray[y];
			if($scope.updateItemMasaTambat[y].id){   
				ItemMasaTambatEdit.update($scope.updateItemMasaTambat[y],function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});       
			}

			if(!$scope.updateItemMasaTambat[y].id){
				$scope.updateItemMasaTambat[y].idMasaTambat = $scope.idmasatambat;
				ItemMasaTambatAdd.save($scope.updateItemMasaTambat[y],function(response){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				},function(){
					$scope.setNotification  = {
						type  : "warning",
						message : "Data tidak berhasil tersimpan"
					};
					Notification.setNotification($scope.setNotification);
				});
			}
		}

		ItemMasaTambatDetailId.get({id:$scope.idmasatambat},function(response){
			$scope.masatambatDetailArray = response;
			$scope.showLoader = false;
			$scope.setNotification  = {
				type  : "success",
				message : "<b>Update Detail Data Berhasil.</b>"
			};
			Notification.setNotification($scope.setNotification);
			$timeout(function() {
				$window.location.reload();
			}, 2000);

		},function(response1){
			alert("Cannot get list of mdm pelanggan");
		});

		// if($scope.masatambatDetailUpdateArray.length != 0){
		// 	$scope.addNewItemMasaTambat();
		// 	$window.location.reload();
		// }else{
		// 	$window.location.reload();
		// }
	}

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	//masa tambat detail
	$scope.submitMasatambatDetail = function(){
		var msTambatInfo = {};
		msTambatInfo.gtMin = $scope.masatambatDetail.gtmin;
		msTambatInfo.gtMax = $scope.masatambatDetail.gtmax;
		msTambatInfo.jenisPelayaran = $scope.masatambatDetail.jenisPelayaran;
		msTambatInfo.jenisPelayaranText = $scope.jenisPelayaranText;
		msTambatInfo.jenisKemasan = $scope.masatambatDetail.jenisKemasan;
		msTambatInfo.jenisKemasanText = $scope.jenisKemasanText;
		msTambatInfo.jenisKapal = $scope.masatambatDetail.jenisKapal;
		msTambatInfo.jenisKapalText = $scope.jenisKapalText;
		msTambatInfo.masaTambat = $scope.masatambatDetail.mstambatday;
		$scope.masatambatDetailArray.push(msTambatInfo);
		if($scope.masatambatDetailArray.length > 0){
			$scope.disabledFlagbtn = true;
		}
		if ($scope.idmasatambat != null) {
			$scope.masatambatDetailUpdateArray.push(msTambatInfo);
			LoadingScreen.show();
		}
		LoadingScreen.hide();
		//$scope.masatambatDetail = '';
		
	}


	$scope.deleteMasaTambatDetailView = function(i){
		$scope.masatambatDetailArray.splice(i, 1);
	}

	$scope.deleteMasaTambatDetail = function(idMasaTamabatDetail,i){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			ItemMasaTambatDelete.delete({id:idMasaTamabatDetail},function(response){
				if(response.status !== '500'){
					$scope.setNotification  = {
						type  : "success",
						message : "Data berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
					$scope.masatambatDetailArray.splice(i, 1);
				}else{
					$scope.setNotification  = {
						type  : "danger",
						message : "Data tidak berhasil dihapus"
					};
					Notification.setNotification($scope.setNotification);
				}
			},function(){
				$scope.setNotification  = {
					type  : "danger",
					message : "Data tidak berhasil dihapus"
				};
				Notification.setNotification($scope.setNotification);
			});
		}
	}

	$scope.updateMasaTambatDetail = function(id){
		var dataEdit = $scope.masatambatDetailArray;

		for (var i = 0; i < dataEdit.length; i++) {
			$scope.masatambatDetailUpdate = dataEdit[id];
			$scope.masatambatDetailUpdate.jenisPelayaran = ''+$scope.masatambatDetailUpdate.jenisPelayaran;
			$scope.masatambatDetailUpdate.jenisKemasan = ''+$scope.masatambatDetailUpdate.jenisKemasan;
			$scope.masatambatDetailUpdate.jenisKapal = ''+$scope.masatambatDetailUpdate.jenisKapal;
			$scope.jenisPelayaranText = $scope.masatambatDetailUpdate.jenisPelayaranText;
			$scope.jenisKemasanText = $scope.masatambatDetailUpdate.jenisKemasanText;
			$scope.jenisKapalText = $scope.masatambatDetailUpdate.jenisKapalText;
		}
	}

	$scope.saveMasaTambatDetail = function(){
		$scope.masatambatDetailUpdate.jenisPelayaranText = $scope.jenisPelayaranText;
		$scope.masatambatDetailUpdate.jenisKemasanText = $scope.jenisKemasanText;
		$scope.masatambatDetailUpdate.jenisKapalText = $scope.jenisKapalText;
	}

}]);
