'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPembatalanpanduCtrl
 * @description
 * # TransaksiPembatalanpanduCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiPembatalanpanduCtrl', ['$scope','$controller', '$filter','$routeParams','PembatalanJasaPandu','Notification','BatalPmhPandu','JenisRevisiRealisasiPandu','StatusRealisasiPandu','PenetapanPanduByPpkJasa','CheckAllBatal','PermohonanSetDone','PenetapanSetDone',function ($scope, $controller, $filter, $routeParams,PembatalanJasaPandu,Notification,BatalPmhPandu,JenisRevisiRealisasiPandu,StatusRealisasiPandu,PenetapanPanduByPpkJasa,CheckAllBatal,PermohonanSetDone,PenetapanSetDone) {
	// extend pembatalan.js
	angular.extend(this, $controller('TransaksiPembatalanCtrl', {$scope: $scope}));	
	$scope.itemSelected = [];
	$scope.disabledBtn = true;
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true,
		enableOnReadonly : false
	};

	var handleSelect = function (item, e) {
		if($routeParams.status == 'N' || $routeParams.status == 'P'){
			item.tglMulai = new Date(item.tglPandu);
		}else{
			item.tglMulai = new Date(item.tglMulai);
		}				
		//var jamMulai = (moment.utc(item.tglMulai).format()).split("T")[1].split("Z");
		item.jamMulai = $filter('date')(item.tglMulai, 'HH:mm:ss');
		$scope.tempSelection = item;
	};

	var handleSelectRight = function (item, e) {
		$scope.rightSelection = item;
	};

	$scope.$watch('dataUmum', function(newVal, oldVal){
		if($scope.panduItems.length > 0){
			$scope.itemsPenetapan = $scope.panduItems;
			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
			handleSelect($scope.itemsPenetapan[0]);			
			if($routeParams.status == 'C'){
				for (var i = 0; i < $scope.panduItems.length; i++) {
					if($scope.panduItems[i].status === 9){
						$scope.jamPembatalanPandu =  $filter('date')($scope.panduItems[i].tglBatal, 'HH:mm:ss');
						$scope.tglPembatalanPandu = new Date($scope.panduItems[i].tglBatal);
						$scope.itemSelected.push($scope.panduItems[i]);
					}
				}
			}else if($routeParams.status == 'D'){
				for (var i = 0; i < $scope.panduItems.length; i++) {
					var data = $scope.panduItems[i];
					PenetapanPanduByPpkJasa.get({ppkjasa : $scope.panduItems[i].noPpkJasa}, function(response){
						if(response.jenisRevisi == 10){
							$scope.itemSelected.push(response);
							$scope.jamPembatalanPandu =  $filter('date')(response.tglBatal, 'HH:mm:ss');
							$scope.tglPembatalanPandu = new Date(response.tglBatal);
						}else{
							if(data.statusRevisi === 10){
								$scope.jamPembatalanPandu =  $filter('date')(data.lastUpdated, 'HH:mm:ss');
								$scope.tglPembatalanPandu = new Date(data.lastUpdated);
								$scope.itemSelected.push(data);
							}
						}
					})
				}
			}else{
				for (var i = 0; i < $scope.panduItems.length; i++) {
					if($scope.panduItems[i].statusRevisi === 10){
						$scope.jamPembatalanPandu =  $filter('date')($scope.panduItems[i].lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanPandu = new Date($scope.panduItems[i].lastUpdated);
						$scope.itemSelected.push($scope.panduItems[i]);
					}
				}				
			}
		}
	});

	var isIncludeItem = function(array, item, identifier){
		var match = false;
		for(var i=0,len=array.length;i<len;i++){
			if(array[i][identifier]==item[identifier]){
				match = true;
			}
		}
		return match;
	};

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				var select = JSON.parse(JSON.stringify($scope.tempSelection));

				$scope.itemSelected.push(select);

				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].tglMasuk = new Date($scope.itemSelected[idx].tglMasuk);
				$scope.itemSelected[idx].tglKeluar = new Date($scope.itemSelected[idx].tglKeluar);
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				$scope.rightReadOnly = false;
				$scope.disabledBtn = false;
			}
		}
	};

	$scope.config = {
		selectItems: true,
		multiSelect: false,
		dblClick: false,
		selectionMatchProp: 'noPpkJasa',
		selectedItems: [],
		showSelectBox: false,
		onSelect: handleSelect,
	};

	$scope.configRight = {
		selectItems: true,
		multiSelect: false,
		dblClick: true,
		selectionMatchProp: 'noPpkJasa',
		selectedItems: [],
		showSelectBox: false,
		onSelect: handleSelectRight,
		// onDblClick:handleDblClickRight,
	};

	// handle pembatalan jasa
	$scope.batalPandu = function(){
		if($scope.rightSelection.status != 9){
			if($routeParams.status == 'C'){
				PembatalanJasaPandu.save({noPpkJasa:$scope.rightSelection.noPpkJasa},{},
					function(response){
						if(response.status == 9){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
							};
							Notification.setNotification(note);
							$scope.getPenetapanById();
							$scope.jamPembatalanPandu =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
							$scope.tglPembatalanPandu = new Date(response.lastUpdated);
							$scope.configRight.selectedItems = [];
							$scope.avoidClick = false;
							$scope.disabledBtn = true;
							PenetapanSetDone.update({ppk1:$routeParams.ppk1},{}, function(response){});
						}
					}
				)
			}else if($routeParams.status == 'D'){
				if($scope.rightSelection.status == 2){
					JenisRevisiRealisasiPandu.update({ppkjasa:$scope.rightSelection.noPpkJasa,jenisRevisi:10}, {},function(response){
						if(response.id){
							StatusRealisasiPandu.update({ppkjasa:$scope.rightSelection.noPpkJasa,status:10}, {},function(response){
								if(response.id){
									var note  = {
										type	: "success", //ex : danger, warning, success, info
										message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
									};
									Notification.setNotification(note);
									$scope.jamPembatalanTunda =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
									$scope.tglPembatalanTunda = new Date(response.lastUpdated);
									$scope.configRight.selectedItems = [];
									$scope.avoidClick = false;
									$scope.disabledBtn = true;
									PenetapanSetDone.update({ppk1:$routeParams.ppk1},{}, function(response){});				
								}
							});	
						}else{
							var note  = {
								type	: "danger", //ex : danger, warning, success, info
								message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" tidak berhasil dibatalkan"
							};
							Notification.setNotification(note);
						}
					});
				}else{
					BatalPmhPandu.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
						if(response.statusRevisi == 10){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
							};
							Notification.setNotification(note);
							$scope.jamPembatalanTunda =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
							$scope.tglPembatalanTunda = new Date(response.lastUpdated);
							$scope.configRight.selectedItems = [];
							$scope.avoidClick = false;
							$scope.disabledBtn = true;
							CheckAllBatal.get({ppk1:$routeParams.ppk1}, function(response){
								if(response == true){
									PermohonanSetDone.update({ppk1:$routeParams.ppk1}, {},function(response){});
								}
							});
						}
					});
				}
			}else{
				BatalPmhPandu.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
					if(response.statusRevisi == 10){
						var note  = {
							type	: "success", //ex : danger, warning, success, info
							message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
						};
						Notification.setNotification(note);
						$scope.jamPembatalanPandu =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanPandu = new Date(response.lastUpdated);
						$scope.configRight.selectedItems = [];
						$scope.avoidClick = false;
						$scope.disabledBtn = true;
						CheckAllBatal.get({ppk1:$routeParams.ppk1}, function(response){
							if(response == true){
								PermohonanSetDone.update({ppk1:$routeParams.ppk1}, {},function(response){});
							}
						});
					}
				})
			}

		}
	};

	$scope.$on('fireBatal', function(e){
		if($scope.rightSelection){
			if($scope.candidate == $scope.rightSelection.noPpkJasa){
				$scope.batalPandu();
			}
		}
	});
}]);
