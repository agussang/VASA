'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringRpkroCtrl
 * @description
 * # MonitoringRpkroCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MonitoringRpkroCtrl',['$scope','$filter','$timeout','$window','MdmDermagaPerJasa','MdmDermagaSearchByKode','Notification','MonitoringRPKRO','UpdateHasilMeeting','LoadingScreen','CancelRPKRO','HasilMeetingResetRpkro',
function ($scope,$filter,$timeout,$window,MdmDermagaPerJasa,MdmDermagaSearchByKode,Notification,MonitoringRPKRO,UpdateHasilMeeting,LoadingScreen,CancelRPKRO,HasilMeetingResetRpkro) {
	$scope.pageSize = 40;
	var valueField = '';
	$scope.dataMonitoring = [];
	$scope.rpkroTglPerencanaan = new Date();

	$scope.checkValue = function(value){
		valueField = value;
	}

	$scope.validationLookupLokasiTambat = function(){
		if(valueField !== $scope.rpkroDermaga){
			if(typeof $scope.rpkroDermaga != 'object'){					
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH007</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.rpkroDermaga = '';
			}
		}
	}

	$scope.getListOfDermagaTambat = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				MdmDermagaSearchByKode.get({
					kode: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				MdmDermagaPerJasa.get({
					nama: value,
					kodeTerminal : localStorage.getItem('kodeTerminal'),
					limit: '10'
				},
				 function(response) {
					resolve(response);
						response.forEach(function (response) {
							response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
						});
				});
			});
		}
	};

    $scope.loadMonitoring = function(newPage) { 
    	LoadingScreen.show();
    	$scope.dataMonitoring = [];
        // PAGING
        $scope.optionSizePage = {
            availableOptions: [10,20,40,80,160],
            selectedOption: 40 //default select option size
        };

        $scope.currentPage = 1;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;
        $scope.pagingText = '';

        var filterRpkro = {
        	size: $scope.pageSize,
            page: newPage - 1,
            sort: $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
        }

        if($scope.rpkroTglPerencanaan){
        	filterRpkro.tglPerencanaan = moment($scope.rpkroTglPerencanaan, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if($scope.rpkroDermaga){
        	filterRpkro.kdDermaga = $scope.rpkroDermaga.mdmgKode;
        }

        if($scope.rpkroNamaKapal){
        	filterRpkro.namaKapal = $filter('uppercase')($scope.rpkroNamaKapal);
        }

        if($scope.rpkroPpk1){
        	filterRpkro.noPpk1 = $scope.rpkroPpk1;
        }

        MonitoringRPKRO.get(filterRpkro,function(response) {
        	if(response.content){
	            if(response.content.length > 0){
	            	$scope.currentPage = response.number + 1;
	                $scope.noIndex = ($scope.currentPage-1)*response.size;
	                $scope.pageSize = response.size;
	                $scope.totalItems = response.totalElements;
	               	$scope.totalPages = response.totalPages;
	            	$scope.dataMonitoring = response.content;
	            	LoadingScreen.hide();
	            }else{
	            	LoadingScreen.hide();
	            }        		
        	}else{
            	$scope.dataMonitoring = [];
            	LoadingScreen.hide();
                $scope.setNotification  = {
			        type  : 'danger',
			        message : '<b>'+response.pesan+'</b>'
			    };
			    Notification.setNotification($scope.setNotification);
            }                  
        });  
    }

    $scope.loadMonitoring(0);

	$scope.reset = function(){
		$scope.rpkroTglPerencanaan = new Date();
		$scope.rpkroNamaKapal = undefined;
		$scope.rpkroDermaga = undefined;
		$scope.rpkroPpk1 = undefined;
		$scope.loadMonitoring(0);
	}

	$scope.hapusTgl = function(){
		$scope.rpkroTglPerencanaan = undefined;
	};
	
    /*kirim rpkro*/
	$scope.sendRPKRO = function(data){		
		$scope.postHasilMeeting = {};
		$scope.postHasilMeeting.noPpk1 = data.noPpk1;
		$scope.postHasilMeeting.noPpkJasa = data.noPpkJasa;
		$scope.postHasilMeeting.isRpkro = true;

		UpdateHasilMeeting.update($scope.postHasilMeeting,function(response){
            if(response.errorCode == null){
                 $timeout(function() {
                    $scope.setNotification  = {
			          type  : 'success',
			          message : '<b>RPKRO Berhasil di update</b>'
			        };
			        Notification.setNotification($scope.setNotification);
                }, 2000);
                $scope.loadMonitoring(0);
            }else{
            	 $timeout(function() {
                    $scope.setNotification  = {
			          type  : 'danger',
			          message : '<b>Gagal</b><br>'+response.errorMessage
			        };
			        Notification.setNotification($scope.setNotification);
                }, 2000);
            }
        });
	}

	/*reset status rpkro inaportnet*/
	$scope.resetRpkro = function(data){
		$scope.nomorRpkro = data.nomorRpkro;
		var confirmDelete = confirm('Apakah anda ingin mereset rpkro kapal ini?');
		if (confirmDelete) {
			HasilMeetingResetRpkro.update({nomorRpkro:$scope.nomorRpkro},{},function(response){
            if(response.$resolved == true){
		       	$timeout(function() {
                    $scope.setNotification  = {
			          type  : 'success',
			          message : '<b>RPKRO Berhasil di reset</b>'
			        };
			        Notification.setNotification($scope.setNotification);
                }, 2000);
                $scope.loadMonitoring(0);
		    }else{
	           	$timeout(function() {
                    $scope.setNotification  = {
			          type  : 'danger',
			          message : '<b>Gagal reset Rpkro</b><br>'
			        };
			        Notification.setNotification($scope.setNotification);
	                }, 2000);	            
			    }
			});
		}
	}

    /*tombol batal dilineup*/
	$scope.deleteHasilMeeting = function(data){
		$scope.noPpkJasa = data.noPpkJasa;
		var confirmDelete = confirm('Apakah anda ingin membatalkan kapal ini?');
		if(confirmDelete){
			CancelRPKRO.delete({noPpkJasa:$scope.noPpkJasa},function(response){                            
		        if(response.$resolved == true){
		        	$timeout(function() {
	                    $scope.setNotification  = {
			                type    : "success",
			                message : "Kapal berhasil dihapus"
			            };
		            	Notification.setNotification($scope.setNotification);
		            	$scope.loadMonitoring(0);
	                }, 2000);	
		        }else{
	            	$timeout(function() {
						$scope.setNotification  = {
			                type    : "warning",
			                message : "Kapal tidak berhasil dihapus"
			            };
			            Notification.setNotification($scope.setNotification);
	                }, 2000);		            
		        }
		    });
		}
		
	}
}])