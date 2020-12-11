'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPembatalanairkapalCtrl
 * @description
 * # TransaksiPembatalanairkapalCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiPembatalanairkapalCtrl', ['$scope','$controller','$filter','$routeParams','PembatalanJasaAirKapal','Notification','BatalPmhAirKapal','PenetapanAirKapalByPpkJasa','CheckAllBatal','PermohonanSetDone','PenetapanSetDone',function ($scope,$controller,$filter,$routeParams,PembatalanJasaAirKapal,Notification,BatalPmhAirKapal,PenetapanAirKapalByPpkJasa,CheckAllBatal,PermohonanSetDone,PenetapanSetDone) {
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
		item.tglIsi = new Date(item.tglIsi);
		var jamIsi = (moment.utc(item.tglIsi).format()).split("T")[1].split("Z");
		item.jamIsi = jamIsi[0];
 		$scope.tempSelection = item;
 	};

 	var handleSelectRight = function (item, e) {
 		$scope.rightSelection = item;
 	};

 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.airItems.length > 0){
 			$scope.itemsPenetapan = JSON.parse(JSON.stringify($scope.airItems));

 			$scope.config.selectedItems.push($scope.itemsPenetapan[0]);
 			handleSelect($scope.itemsPenetapan[0]);

			if($routeParams.status == 'C'){
	 			for (var i = 0; i < $scope.airItems.length; i++) {
					if($scope.airItems[i].status === 9){
						$scope.jamPembatalanAirKapal =  $filter('date')($scope.airItems[i].tglBatal, 'HH:mm:ss');
						$scope.tglPembatalanAirKapal = new Date($scope.airItems[i].tglBatal);
						$scope.itemSelected.push($scope.airItems[i]);
					}
				}
			}else if($routeParams.status == 'D'){
				for (var i = 0; i < $scope.airItems.length; i++) {
					var data = $scope.airItems[i];
					PenetapanAirKapalByPpkJasa.get({ppkjasa : $scope.airItems[i].noPpkJasa}, function(response){
						if(response.jenisRevisi == 10){
							$scope.itemSelected.push(response);
							$scope.jamPembatalanAirKapal =  $filter('date')(response.tglBatal, 'HH:mm:ss');
							$scope.tglPembatalanAirKapal = new Date(response.tglBatal);
						}else{
							if(data.statusRevisi === 10){
								$scope.jamPembatalanAirKapal =  $filter('date')(data.lastUpdated, 'HH:mm:ss');
								$scope.tglPembatalanAirKapal = new Date(data.lastUpdated);
								$scope.itemSelected.push(data);
							}	
						}
					})
				}
			}else{
	 			for (var i = 0; i < $scope.airItems.length; i++) {
					if($scope.airItems[i].statusRevisi === 10){
						$scope.jamPembatalanAirKapal =  $filter('date')($scope.airItems[i].lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanAirKapal = new Date($scope.airItems[i].lastUpdated);
						$scope.itemSelected.push($scope.airItems[i]);
					}
				}				
			}
 		}
 	});

	var isIncludeItem = function(array, item, identifier){
		console.log(array);
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

	// handle pembatalan jasa
	$scope.batalAirKapal = function(){
		if($scope.rightSelection.status != 9){
			if($routeParams.status == 'C'){
				PembatalanJasaAirKapal.save({noPpkJasa:$scope.rightSelection.noPpkJasa},{},
					function(response){
						if(response.status == 9){
							var note  = {
								type	: "success", //ex : danger, warning, success, info
								message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
							};
							Notification.setNotification(note);
							$scope.getPenetapanById();
							$scope.jamPembatalanAirKapal =  $filter('date')(response.tglBatal, 'HH:mm:ss');
							$scope.tglPembatalanAirKapal = new Date(response.tglBatal);
							$scope.configRight.selectedItems = [];
							$scope.avoidClick = false;
							$scope.disabledBtn = true;
							PenetapanSetDone.update({ppk1:$routeParams.ppk1},{}, function(response){});
						}
					}
				);				
			}else if($routeParams.status == 'D'){
				if($scope.rightSelection.status == 2){
					JenisRevisiAir.update({ppkjasa:$scope.rightSelection.noPpkJasa,jenisRevisi:10}, {},function(response){
						if(response.id){
							StatusAir.update({ppkjasa:$scope.rightSelection.noPpkJasa,status:10}, {},function(response){
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
					BatalPmhAirKapal.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
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
				BatalPmhAirKapal.update({ppkjasa:$scope.rightSelection.noPpkJasa},{},function(response){
					if(response.statusRevisi == 10){
						var note  = {
							type	: "success", //ex : danger, warning, success, info
							message	: "Jasa dengan no. PPK Jasa:"+$scope.rightSelection.noPpkJasa+" berhasil dibatalkan"
						};
						Notification.setNotification(note);
						$scope.jamPembatalanAirKapal =  $filter('date')(response.lastUpdated, 'HH:mm:ss');
						$scope.tglPembatalanAirKapal = new Date(response.lastUpdated);
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
				$scope.batalAirKapal();
			}
		}
	});
}]);
