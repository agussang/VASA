'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ParameterAplikasiNewCtrl
 * @description
 * # ParameterAplikasiNewCtrl
 * Controller of the vasaApp
 */

  angular.module('vasaApp')
.controller('ParameterAplikasiNewCtrl', ['$scope','$filter','$timeout', '$location','Notification',
	'AppParamAdd','AppParamEdit','AppParam','LoadingScreen','AppParamDelete','AppParamListByGroup',
	function ($scope,$filter,$timeout, $location,Notification,
		AppParamAdd,AppParamEdit,AppParam,LoadingScreen,AppParamDelete,AppParamListByGroup) {
  	LoadingScreen.show();
	$scope.locationPath = '/parameteraplikasi/list';
	$scope.parameter = {};
	$scope.itemDataParams = [];
	$scope.itemDeleteParams = [];
	$scope.parameter.isNumeric = 1;
	$scope.disabledParameterNama = false;
	var active = "YA";
	var non_active = "TIDAK";

	// autocomplete
	$scope.listOfParam = [];
	AppParamListByGroup.get({
		size : 9999
	}, function(response){
		LoadingScreen.hide();
	    $scope.listOfParam = response.content;
	});

	$scope.submitToGrid = function(){
		var isParameterExist = $scope.validationDuplicateParameter();
		if(isParameterExist){
			if($scope.parameter.id){
				for (var i = 0; i<$scope.itemDataParams.length; i++ ){
					if($scope.itemDataParams[i].id === $scope.parameter.id){
						$scope.parameter.isNumericText = $scope.parameter.isNumeric === 1 ?active:non_active;
						$scope.itemDataParams[i] = $scope.parameter;
					}
				}
			}else{
				$scope.parameter.isNumericText = $scope.parameter.isNumeric === 1 ?active:non_active;
				$scope.itemDataParams.push($scope.parameter);
			}
			$scope.resetParam();
		}
	}

	$scope.validationDuplicateParameter = function(){
		var match = true;
		if($scope.itemDataParams.length>0){
			for (var i = 0; i<$scope.itemDataParams.length; i++ ){
				if($scope.itemDataParams[i].id!== $scope.parameter.id){
					if($scope.itemDataParams[i].caption===$scope.parameter.caption && $scope.itemDataParams[i].value===$scope.parameter.value){
						$scope.setNotification  = {
							type	: "warning",
							message	: "Data dengan <b>judul "+$scope.parameter.caption+"</b> dan <b>nilai "+$scope.parameter.value+"</b> sudah ada"
						}
						Notification.setNotification($scope.setNotification);
						$("#parameter_caption").focus();
						$("#parameter_value").focus();
						match = false;
					}
				}else if($scope.parameter.id===undefined){
					if($scope.itemDataParams[i].caption===$scope.parameter.caption && $scope.itemDataParams[i].value===$scope.parameter.value){
						$scope.setNotification  = {
							type	: "warning",
							message	: "Data dengan <b>judul "+$scope.parameter.caption+"</b> dan <b>nilai "+$scope.parameter.value+"</b> sudah ada"
						}
						Notification.setNotification($scope.setNotification);
						$("#parameter_caption").focus();
						$("#parameter_value").focus();
						match = false;
					}
				}
			}
		}
		return match;
	}

	$scope.deleteFromGrid = function(index, key){
		var checkDelete = confirm('Apakah anda ingin menghapus data?');
		if(checkDelete){
			$scope.itemDataParams.splice(index,1);
			$scope.itemDeleteParams.push(key);
		}
		$scope.resetParam();
	}

	$scope.editParam = function(parameterId){
		AppParamDetail.get({id:parameterId}, function(response){
			LoadingScreen.hide();
			$scope.parameter = response;
		});	
	}

	$scope.resetParam = function(){
		$scope.parameter = {}
		if($scope.itemDataParams.length>0){
			$scope.parameter.nama = $scope.itemDataParams[0].nama;
			$scope.disabledParameterNama = true;
		}else{
			$scope.disabledParameterNama = false;
		}
		$scope.parameter.isNumeric = 1;
	}

	$scope.cancel = function(){
		$location.path($scope.locationPath);
	}

	$scope.submit = function(){
		for (var i = 0; i<$scope.itemDataParams.length; i++ ){
			$scope.itemDataParams[i].caption;
			if($scope.itemDataParams[i].id){
				$scope.updateParameter($scope.itemDataParams[i]);
			}else{
				$scope.addParameter($scope.itemDataParams[i]);
			}
		}

		if($scope.itemDeleteParams.length>0){/* untuk mengeksekusi jika terdapat data yang dihapus*/
			for (var i = 0; i<$scope.itemDeleteParams.length; i++ ){
				console.log($scope.itemDeleteParams[i].id);
				if($scope.itemDeleteParams[i].id){
					$scope.deleteParameter($scope.itemDeleteParams[i].id);
				}
			}
		}

		$timeout(function() {
			$scope.setNotification  = {
				type	: "success",
				message	: "Data berhasil tersimpan"
			};
			Notification.setNotification($scope.setNotification);
			$scope.buttonDisabled = false;
			$scope.showLoader = false;
			$location.path($scope.locationPath);
        }, 2000);
	}

    $scope.updateParameter = function(item){
		AppParamEdit.update(item, function(response){
			/*if(response.$resolved){
				$scope.setNotification  = {
					type	: "success",
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
			}
			Notification.setNotification($scope.setNotification);*/
		});
	}

	$scope.addParameter = function(item){
		item.isNumeric = parseInt(item.isNumeric);
		AppParamAdd.save(item, function(response){
			/*if(response.$resolved){
				$scope.setNotification  = {
					type	: "success",
					message	: "Data berhasil tersimpan"
				};
			}else{
				$scope.setNotification  = {
					type	: "warning",
					message	: "Data tidak berhasil tersimpan"
				};
			}
			Notification.setNotification($scope.setNotification);*/
		});
	}

	$scope.getDataParameter = function(namaParameter){
		$scope.itemDataParams = [];
		AppParam.get({
			nama: namaParameter,
			sort: 'value,asc'
		}, function(response) {
			LoadingScreen.hide();
			var temp = response.content;
			if(temp.length>0){
				for (var i = 0; i<temp.length; i++ ){
					temp[i].isNumericText = (temp[i].isNumeric === 1 ?active:non_active);
					$scope.itemDataParams.push(temp[i]);
				}
			}else{
				$scope.itemDataParams = [];
			}
		});
	}

	$scope.deleteParameter = function(id){
		AppParamDelete.delete({id:id},function(response){});
	}

  	$scope.$watch('parameter.nama', function(newValue){
	    if(typeof newValue == 'string'){
			$scope.parameter.maxlength = 30;
	    } else if (typeof newValue == 'undefined') {
	    	$scope.parameter.maxlength = null;
	    }
 	});

	var valueField = '';
		$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.checkLookupNama = function(){
		if(valueField !== $scope.parameter.nama){
			$scope.getDataParameter($scope.parameter.nama);
		}
	}
}]);
