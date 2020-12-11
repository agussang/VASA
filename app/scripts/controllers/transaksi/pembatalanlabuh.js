'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPembatalanlabuhCtrl
 * @description
 * # TransaksiPembatalanlabuhCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiPembatalanlabuhCtrl', ['$scope','$controller','$filter','$routeParams','PenetapanLabuhStatus','Notification','PembatalanJasaLabuh','BatalPmhLabuh','JenisRevisiLabuh','StatusLabuh','PenetapanLabuhByPpkJasa','CheckAllBatal','PermohonanSetDone','PenetapanSetDone',function ($scope, $controller,$filter,$routeParams,PenetapanLabuhStatus,Notification,PembatalanJasaLabuh,BatalPmhLabuh,JenisRevisiLabuh,StatusLabuh,PenetapanLabuhByPpkJasa,CheckAllBatal,PermohonanSetDone,PenetapanSetDone) {
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
		item.tglMasuk = new Date(item.tglMasuk);
		item.tglKeluar = new Date(item.tglKeluar);
		var jamMasuk = (moment.utc(item.tglMasuk).format()).split("T")[1].split("Z");
		var jamKeluar = (moment.utc(item.tglKeluar).format()).split("T")[1].split("Z");
		item.jamMasuk = jamMasuk[0];
		item.jamKeluar = jamKeluar[0];
		$scope.tempSelection = item;
	};

	var handleSelectRight = function (item, e) {
		$scope.rightSelection = item;
	};

	$scope.$watch('dataUmum', function(newVal, oldVal){
		if($scope.labuhItems.length > 0){
			$scope.itemsPenetapan = JSON.parse(JSON.stringify($scope.labuhItems));

			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
			handleSelect($scope.itemsPenetapan[0]);		
			if($routeParams.status == 'C'){
				for (var i = 0; i < $scope.labuhItems.length; i++) {
					if($scope.labuhItems[i].status === 9){
						$scope.jamPembatalanLabuh =  $filter('date')($scope.labuhItems[i].tglBatal, 'HH:mm:ss');
						$scope.tglPembatalanLabuh = new Date($scope.labuhItems[i].tglBatal);
						$scope.itemSelected.push($scope.labuhItems[i]);
					}
				}
			}else if($routeParams.status == 'D'){
				for (var i = 0; i < $scope.labuhItems.length; i++) {
					var data = $scope.labuhItems[i];
					PenetapanLabuhByPpkJasa.get({ppkjasa : $scope.labuhItems[i].noPpkJasa}, function(response){
						if(response.jenisRevisi == 10){
							$scope.itemSelected.push(response);
							$scope.jamPembatalanLabuh =  $filter('date')(response.tglBatal, 'HH:mm:ss');
							$scope.tglPembatalanLabuh = new Date(response.tglBatal);
						}else{
							if(data.statusRevisi === 10){
								$scope.jamPembatalanLabuh =  $filter('date')(data.lastUpdated, 'HH:mm:ss');
								$scope.tglPembatalanLabuh = new Date(data.lastUpdated);
								$scope.itemSelected.push(data);
							}						
						}
					})
				}
			}else{
				for (var i = 0; i < $scope.labuhItems.length; i++) {
					if($scope.labuhItems[i].statusRevisi === 10){
						$scope.jamPembatalanLabuh =  $filter('date')($scope.labuhItems[i].lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanLabuh = new Date($scope.labuhItems[i].lastUpdated);
						$scope.itemSelected.push($scope.labuhItems[i]);
					}
				}				
			}
		}
	});

	// untuk membandingkan scope yang akan di-push; identifier adalah properti dari item
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
				$scope.disabledBtn = false;
				$scope.rightReadOnly = false;
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

	// handle pembatalan jasa based on noPpkJasa
	$scope.batalLabuh = function(){
		if($scope.rightSelection.status != 9){
			if($routeParams.status == 'C'){
				PembatalanJasaLabuh.save({noPpkJasa:$scope.rightSelection.noPpkJasa},{},
					function(response){
						if(response.status == 9){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
							};
							Notification.setNotification(note);
							$scope.jamPembatalanLabuh =  $filter('date')(response.tglBatal, 'HH:mm:ss');
							$scope.tglPembatalanLabuh = new Date(response.tglBatal);
							$scope.configRight.selectedItems = [];
							$scope.avoidClick = false;
							$scope.disabledBtn = true;
							PenetapanSetDone.update({ppk1:$routeParams.ppk1},{}, function(response){});
						}
					}
				);				
			}else if($routeParams.status == 'D'){
				if($scope.rightSelection.status == 2){
					JenisRevisiLabuh.update({ppkjasa:$scope.rightSelection.noPpkJasa,jenisRevisi:10}, {},function(response){
						if(response.id){
							StatusLabuh.update({ppkjasa:$scope.rightSelection.noPpkJasa,status:10}, {},function(response){
								if(response.id){
									var note  = {
										type	: "success", //ex : danger, warning, success, info
										message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
									};
									Notification.setNotification(note);
									$scope.jamPembatalanLabuh =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
									$scope.tglPembatalanLabuh = new Date(response.lastUpdated);
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
					BatalPmhLabuh.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
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
				BatalPmhLabuh.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
					if(response.statusRevisi == 10){
						var note  = {
							type	: "success", //ex : danger, warning, success, info
							message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
						};
						Notification.setNotification(note);
						$scope.jamPembatalanLabuh =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanLabuh = new Date(response.lastUpdated);
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
				$scope.batalLabuh();
			}
		}
	});
 }]);
