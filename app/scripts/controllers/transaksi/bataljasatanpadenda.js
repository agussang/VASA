'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaannewCtrl
 * @description
 * # PerencanaannewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('BataljasatanpadendaCtrl',['$scope','$filter','$routeParams','$location','$window','$PAGE_SIZE','$timeout','Notification','LoadingScreen','$modal','BatalJasaTanpaDenda','AbsensiPanduIfExist','AbsensiPandu', function ($scope,$filter,$routeParams,$location,$window,$PAGE_SIZE,$timeout,Notification,LoadingScreen,$modal,BatalJasaTanpaDenda,AbsensiPanduIfExist,AbsensiPandu) {
  	 //LoadingScreen.show();
  	// LoadingScreen.show();

   $scope.tabelHistoryAbsen = [];

   $scope.gridPast =true;
		
	$scope.bataljasatanpadenda = {};
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	$scope.optionReadonly = {
		enableOnReadonly: false
	};

	$scope.greenBtn = function() {
		$location.path($window.history.back());
	};

	// 	$scope.valueField = '';
	// $scope.checkValue = function(value){
	// 	$scope.valueField = value;
	// }

//batal jasa 
	$scope.submit = function(){


		BatalJasaTanpaDenda.save({noPpkJasa:$scope.bataljasatanpadenda.noPpkJasa},JSON.stringify($scope.bataljasatanpadenda),function(response){
			if(response){
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Jasa berhasil di Batalkan"
				};
				Notification.setNotification($scope.setNotification);
				// $scope.tagihanData.kodeAktif = 1;
				// $scope.tagihanData.valuta = $scope.valuta[0].value;
				// $location.path($scope.locationPath);
			}else{
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Jasa tidak berhasil Batalkan"
				};
				Notification.setNotification($scope.setNotification);
			}
			$scope.showLoader = false;
		},function(response){
			$scope.setNotification  = {
				type	: "danger", //ex : danger, warning, success, info
				message	: "Error Network..."
			};	
			Notification.setNotification($scope.setNotification);
			$scope.showLoader = false;
		});
	}






	
//absen pandu



      $scope.absenPandu = function(){

           LoadingScreen.show();

            var temp = $scope.absenpandu;


            var tempDataAbsen = {};

            tempDataAbsen.nip = temp.nip;
       

			var tglAbsenMskVal = $filter('date')($scope.absenpandu.tglAbsenPandu, 'yyyy-MM-dd');
			var jamAbsenMskVal = document.getElementById("jamMulaiAbsenPanduVal").value;
			tempDataAbsen.timeAbsen = tglAbsenMskVal + ' ' + jamAbsenMskVal;


		AbsensiPandu.save({nip:tempDataAbsen.nip, timeAbsen: tempDataAbsen.timeAbsen },JSON.stringify(tempDataAbsen),function(response){
			if(response.id > 0){

               $scope.tabelHistoryAbsen = [];
                $scope.absenpandu.nip='';
                $scope.absenpandu.tglAbsenPandu='';
                document.getElementById("jamMulaiAbsenPanduVal").value = '';

                //alert(tempDataAbsen.nip);

            //   historyAbsen(tempDataAbsen.nip);
				$scope.setNotification  = {
					type	: "success", //ex : danger, warning, success, info
					message	: "Berhasil Absen Pandu"
				};
				Notification.setNotification($scope.setNotification);
            
                
                $scope.tabelHistoryAbsen.push(response);
                $scope.gridPast =true;

			    LoadingScreen.hide();
			}else{
				$scope.setNotification  = {
					type	: "danger", //ex : danger, warning, success, info
					message	: "Tidak Berhasil Absen Pandu " + response.description
				};
				Notification.setNotification($scope.setNotification);

				LoadingScreen.hide();
			}
			
		},function(response){
			$scope.setNotification  = {
				type	: "danger", //ex : danger, warning, success, info
				message	: "Error Network..."
			};	
			Notification.setNotification($scope.setNotification);

			LoadingScreen.hide();
		
		});
	}





	var historyAbsen = function(nip, timeAbsen){
		AbsensiPanduIfExist.get({nip:nip, timeAbsen: timeAbsen}, function(response){
			var history = response;

                $scope.tabelHistoryAbsen = [];

               // $scope.tabelHistoryAbsen.push(history);
			//
		
		            if(history.id > 0){
                       
					  $scope.tabelHistoryAbsen.push(history);
					  LoadingScreen.hide();
		            
		            }else{
                     
                     $scope.setNotification  = {
							type	: "danger", //ex : danger, warning, success, info
							message	: "No data Absen" + response.description
						};	
						Notification.setNotification($scope.setNotification);
						LoadingScreen.hide();


		            }

                  $scope.gridPast =true;

					//console.log($scope.tabelHistoryAbsen);

					//alert('kesinii');
				
			LoadingScreen.hide();
	
		});

		
	};





	$scope.cekHistory = function(){


        LoadingScreen.show();
            var temp = $scope.absenpandu;


            var tempDataAbsen = {};

            tempDataAbsen.nip = temp.nip;
       

			var tglAbsenMskVal = $filter('date')($scope.absenpandu.tglAbsenPandu, 'yyyy-MM-dd');
			var jamAbsenMskVal = document.getElementById("jamMulaiAbsenPanduVal").value;
			tempDataAbsen.timeAbsen = tglAbsenMskVal + 'T' + jamAbsenMskVal;


			historyAbsen(tempDataAbsen.nip, tglAbsenMskVal);

	}









}]);
