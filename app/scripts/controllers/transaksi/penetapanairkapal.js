'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiPenetapanairkapalCtrl
 * @description
 * # TransaksiPenetapanairkapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('TransaksiPenetapanairkapalCtrl',['$scope','$filter','$routeParams','$controller','AppParam','PermohonanDetailByPpk','PermohonanAirKapal','PenetapanAirKapal','PenetapanAirKapalByPpkJasa', 'PenetapanAirKapalEdit','Notification','validationForm','MdmDermagaSearch', function ($scope,$filter,$routeParams,$controller,AppParam,PermohonanDetailByPpk,PermohonanAirKapal,PenetapanAirKapal, PenetapanAirKapalByPpkJasa, PenetapanAirKapalEdit, Notification,validationForm,MdmDermagaSearch) {
   	/*
 	** tab air kapal
 	*/
 	// extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
 	angular.extend(this, $controller('TransaksiPenetapannewCtrl', {$scope: $scope}));

 	$scope.tempSelection = null;
 	$scope.rightSelection = null;
 	$scope.itemSelected = [];
 	$scope.avoidClick = false;
 	$scope.rightReadOnly = true;
 	$scope.penetapanair = {};
  	$scope.dermagaAirRequired = false;

 	$scope.$watch('dataUmum', function(newVal, oldVal){
 		if($scope.airItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.airItems));

 			for(var i=0;i<$scope.airItems.length;i++){
 				if($scope.airItems[i].status === 2){
 					var itemPpkJasa = $scope.airItems[i].noPpkJasa;
 					PenetapanAirKapalByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}

 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.satuanVolume = $scope.tempSelection.satuan;
			$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
			$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi, 'dd-MM-yyyy');
 		}
 	});

  	$scope.$watch('rightSelection.alatIsi',function (newValue) {
     	if (newValue == 2 || newValue == 3) {
      		$scope.dermagaAirRequired = false;
     	}else{
      		$scope.dermagaAirRequired = true;
     	}
  	});


 	var matchDataSelected = function(item){
 		var match = {};
 		var items = JSON.parse(JSON.stringify($scope.airItems));
		for(var i=0;i < items.length;i++){
			if(items[i].noPpkJasa==item.noPpkJasa){
				match = items[i];
			}
		}
		return match;
 	}

 	var handleSelect = function (item, e) {
 		var getData = matchDataSelected(item);
 		$scope.tempSelection = getData;
		$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
		$scope.tempSelection.tglIsi = $filter('date')($scope.tempSelection.tglIsi, 'dd-MM-yyyy');
	}

	var handleSelectRight = function (item, e) {
		PenetapanAirKapalByPpkJasa.get({ppkjasa : item.noPpkJasa}, function(response){
			if(response.status!=='404'){
				$scope.rightSelection = response;
				$scope.rightSelection.jamIsi = $filter('date')(response.tglIsi, 'HH:mm');
		 		$scope.rightSelection.tglIsi = $filter('date')(response.tglIsi, 'dd-MM-yyyy');
			}else{
				var getDataPmh = matchDataSelected(item);
				$scope.rightSelection = getDataPmh;
				$scope.rightSelection.jamIsi = $filter('date')(getDataPmh.tglIsi, 'HH:mm');
				$scope.rightSelection.tglIsi = $filter('date')(getDataPmh.tglIsi, 'dd-MM-yyyy');
			}
		});
		// $scope.rightSelection = item;
		// $scope.rightSelection.jamIsi = $filter('date')($scope.rightSelection.tglIsi, 'HH:mm');
		// $scope.rightSelection.tglIsi = $filter('date')($scope.rightSelection.tglIsi, 'dd-MM-yyyy');
	};

	var handleDblClickRight = function(item, e){
		$scope.rightReadOnly = false;
	}

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

	$scope.$on('editByListNoPPKJasa', function(event, item) {
		$('.btn-list-mobile').removeClass('fa-pencil-square').addClass('fa-pencil-square-o');
		$('#dataptp-'+item.noPpkJasa).removeClass('fa-pencil-square-o').addClass('fa-pencil-square');
 		handleSelectRight(item);
 		handleDblClickRight(item);
	});

	$scope.validationLookupDermagaAir = function(){
		if($scope.valueField !== $scope.rightSelection.namaDermaga){
			if(typeof $scope.rightSelection.namaDermaga != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br><b>Kode validasi : VALPTP-009</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rightSelection.namaDermaga = '';
			}
		}
	}

	$scope.moveSelection = function(){
		if($scope.tempSelection != null){
			var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');
			if(!match){
				$scope.avoidClick = true;
				$scope.configRight.selectedItems = [];
				var select = JSON.parse(JSON.stringify($scope.tempSelection));

				$scope.itemSelected.push(select);

				var idx = $scope.itemSelected.indexOf(select);
				$scope.itemSelected[idx].satuanVolume = $scope.itemSelected[idx].satuan;
				$scope.itemSelected[idx].tglIsi = $filter('date')($scope.itemSelected[idx].tglIsi, 'dd-MM-yyyy');
				$scope.configRight.selectedItems.push($scope.itemSelected[idx]);
				$scope.rightSelection = $scope.itemSelected[idx];
				if($scope.rightSelection.kodeDermaga == null || $scope.rightSelection.kodeDermaga == ''){
					MdmDermagaSearch.get({
						nama: $scope.rightSelection.namaDermaga,
					  	kodeTerminal : localStorage.getItem('kodeTerminal'),
						limit: '10'
					}, function(response){
						$scope.rightSelection.kodeDermaga = response[0].mdmgKode;
					})
				}
				$scope.rightReadOnly = false;
			}
		}
	};

	//function reset air
	$scope.resetAir = function() {
		$scope.avoidClick = false;
		var select = [];
		$scope.itemSelected = select;

		var idx = $scope.itemSelected.indexOf(select);
		$scope.configRight.selectedItems.shift($scope.itemSelected[idx]);
		$scope.rightSelection = $scope.itemSelected[idx];
		$scope.rightReadOnly = true;
		//$scope.realisasiair = '';

		if($scope.airItems.length >0){
 			$scope.items = JSON.parse(JSON.stringify($scope.airItems));

 			for(var i=0;i<$scope.airItems.length;i++){
 				if($scope.airItems[i].status === 2){
 					var itemPpkJasa = $scope.airItems[i].noPpkJasa;
 					PenetapanAirKapalByPpkJasa.get({ppkjasa:itemPpkJasa}, function(response){
 						var item = JSON.parse(JSON.stringify(response));
 						$scope.itemSelected.push(item);
 					});
 				}
 			}
 			$scope.items[0]
 			$scope.config.selectedItems.push($scope.items[0]);
			$scope.tempSelection = $scope.items[0];

			$scope.tempSelection.jamIsi = $filter('date')($scope.tempSelection.tglIsi, 'HH:mm');
			$scope.tempSelection.tglIsi = new Date($scope.tempSelection.tglIsi);
 		}
	};

	$scope.saveAir = function(){

		// $scope.rightSelection = {};
		if($scope.configRight.selectedItems.length>0){
			var jamIsi = document.getElementById('jamIsiEdit').querySelector('input').value;

			$scope.penetapanair.noPpk1 = $scope.dataUmum.noPpk1;
			$scope.penetapanair.noPpkJasa = $scope.tempSelection.noPpkJasa;
			$scope.penetapanair.alatIsi = ''+$scope.rightSelection.alatIsi;
			// $scope.penetapanair.tglSetuju = $filter('date')($scope.tglSetuju, 'yyyy-MM-ddT00:00:00');
			//$scope.penetapanair.namaDermaga = $scope.rightSelection.namaDermaga;
		    if ($scope.dermagaAirRequired) {
		        if (typeof $scope.rightSelection.namaDermaga === 'object') {
		  			$scope.penetapanair.kodeDermaga = $scope.rightSelection.namaDermaga.mdmgKode;
		  			$scope.penetapanair.namaDermaga = $scope.rightSelection.namaDermaga.mdmgNama;
		  		}else{
		  			$scope.penetapanair.kodeDermaga = $scope.rightSelection.kodeDermaga;
		  			$scope.penetapanair.namaDermaga = $scope.rightSelection.namaDermaga;
		  		}
		    }else{ 
		    	if($scope.rightSelection.namaDermaga != ''){ 
			        if (typeof $scope.rightSelection.namaDermaga === 'object') {
			        	if($scope.rightSelection.namaDermaga != null){
			        		$scope.penetapanair.kodeDermaga = $scope.rightSelection.namaDermaga.mdmgKode;
			  				$scope.penetapanair.namaDermaga = $scope.rightSelection.namaDermaga.mdmgNama;
			        	}		  			
			  		}else{
			  			$scope.penetapanair.kodeDermaga = $scope.rightSelection.kodeDermaga;
			  			$scope.penetapanair.namaDermaga = $scope.rightSelection.namaDermaga;
			  		}
		    	}
		    }

			//$scope.penetapanair.tglIsi = $filter('date')($scope.rightSelection.tglIsi,'yyyy-MM-dd')+'T'+jamIsi;
			$scope.penetapanair.volume = $scope.rightSelection.volume;
			$scope.penetapanair.satuanVolume = $scope.rightSelection.satuanVolume;
			$scope.penetapanair.status = $scope.rightSelection.status;

			if(typeof $scope.rightSelection.tglIsi === 'object'){
				if($scope.rightSelection.tglIsi.toString().indexOf('-') === -1){
					$scope.penetapanair.tglIsi = $filter('date')($scope.rightSelection.tglIsi,'yyyy-MM-dd')+'T'+$scope.rightSelection.jamIsi;
				}
			}else{
				var formatTglIsi = $scope.rightSelection.tglIsi.split('-');
				var newFormatTglIsi = formatTglIsi[1]+'-'+formatTglIsi[0]+'-'+formatTglIsi[2];
				$scope.penetapanair.tglIsi = $filter('date')(new Date(newFormatTglIsi),'yyyy-MM-dd')+'T'+$scope.rightSelection.jamIsi;
			}

			/*validasi Form*/
		      if ($scope.dermagaAirRequired) {
		        var R1 = validationForm.required('Nama Dermaga',$scope.penetapanair.namaDermaga);
		        if(!R1){return R1;}
		      }

			var R2 = validationForm.required('Volume Air',$scope.penetapanair.volume);
			if(!R2){return R2;}
			var R3 = validationForm.required('Tanggal Isi Air',$scope.rightSelection.tglIsi);
			if(!R3){return R3;}
			var R4 = validationForm.required('Jam Isi Air',$scope.rightSelection.jamIsi);
			if(!R4){return R4;}
			var R5 = validationForm.required('Satuan Volume Air',$scope.penetapanair.satuanVolume);
			if(!R5){return R5;}

			if($scope.rightSelection.parentPtpJasaId === undefined){
				PenetapanAirKapal.save($scope.penetapanair,
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
						}
						else{
							var note  = {
								type	: "error",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "error",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					}
				);
			}else{
				PenetapanAirKapalEdit.update({id:$scope.rightSelection.noPpkJasa},$scope.penetapanair,
					function(response){
						if(response.id){
							var note  = {
								type	: "success",
								message	: "Data berhasil tersimpan"
							};
							Notification.setNotification(note);
						}
						else{
							var note  = {
								type	: "error",
								message	: "Data gagal disimpan"
							};
							Notification.setNotification(note);
						}
					},
					function(response){
						var note  = {
							type	: "error",
							message	: "Data gagal disimpan"
						};
						Notification.setNotification(note);
					});
			}

			// PenetapanAirKapal.save($scope.penetapanair,function(response){
			// 	console.log(response);
			// });

			$scope.configRight.selectedItems = [];
			$scope.avoidClick = false;
			$scope.rightReadOnly = true;
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
		onDblClick:handleDblClickRight,
	};
  }]);
