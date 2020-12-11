'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PasangsurutCtrl
 * @description
 * # PasangsurutCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PasangsurutCtrl',['$scope', '$filter', '$timeout','$routeParams', '$location','$window','GetPasangSurut','PasangSurutSave','AppParam','$PAGE_SIZE','Notification','LoadingScreen','UserRole',function ($scope,$filter,$timeout,$routeParams,$location,$window,GetPasangSurut,PasangSurutSave,AppParam,$PAGE_SIZE,Notification,LoadingScreen,UserRole) {
	   $scope.userRole = UserRole.getCurrentRole();

	     //list data
	      $scope.items=[];
	     $scope.inputData = [{value:'', name:'Jam 1'},{value:'', name:'Jam 2'},{value:'', name:'Jam 3'},{value:'', name:'Jam 4'},{value:'', name:'Jam 5'},{value:'', name:'Jam 6'},{value:'', name:'Jam 7'},{value:'', name:'Jam 8'},{value:'', name:'Jam 9'},{value:'', name:'Jam 10'},{value:'', name:'Jam 11'},{value:'', name:'Jam 12'},{value:'', name:'Jam 13'},{value:'', name:'Jam 14'},{value:'', name:'Jam 15'},{value:'', name:'Jam 16'},{value:'', name:'Jam 17'},{value:'', name:'Jam 18'},{value:'', name:'Jam 19'},{value:'', name:'Jam 20'},{value:'', name:'Jam 21'},{value:'', name:'Jam 22'},{value:'', name:'Jam 23'},{value:'', name:'Jam 24'}];;
	      
	       var filterTglAwal = $filter('date')(new Date(),'yyyy-MM');

	      $scope.showLoader = false;
	      $scope.locationPath = '';
	      $scope.optionSizePage = {
	         availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
	         selectedOption: {number: $PAGE_SIZE} //default select option size
        };


        
        $scope.options = {
          autoclose: true,
          viewMode: "months",
          format: "mm-yyyy",
          minViewMode: "months",
          language: 'id'
        };
        $scope.newOptions = {
          autoclose: true,
          format: "dd-mm-yyyy",
          language: 'id'
        };

  	    var currentDate = new Date();
        $scope.tglMulai =  new Date();


        $scope.$watch('tglMulai', function(){
		        $('#tanggalMulaiId').mask('99-9999');
	    });
        $scope.tglInit = $filter('date')(new Date(),'dd-MM-yyyy');

	       // PAGING
        $scope.currentPage = 1;
	      $scope.pageSize = $scope.optionSizePage.selectedOption.number;
	      $scope.totalItems = 0;
	      $scope.totalPages = 0;
	      $scope.sortBy = '';
	      $scope.sortDesc = false;


	      $scope.pageChanged = function(newPage,tglMulai) {
           LoadingScreen.show();
		        if(tglMulai !== 0){
			           var year = $filter('date')(tglMulai, 'yyyy');
			           var month = $filter('date')(tglMulai, 'MM');
		        }
		        	
		        GetPasangSurut.get(
			           {
					          month : month,
					          year: year,
				              size : $scope.optionSizePage.selectedOption.number,
				              page : newPage - 1,
				              sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
			            },
			            function(response) {
				          	console.log(response);
				          	$scope.showLoader = false;
				          	LoadingScreen.hide();
				          	$scope.currentPage = response.number + 1;
				          	$scope.noIndex = ($scope.currentPage-1)*response.size;
			            	$scope.pageSize = response.size;
			            	$scope.totalItems = response.totalElements;
				          	$scope.totalPages = response.totalPages;
		              		$scope.allItems = response;
				          	$scope.items = $scope.allItems;

				          $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
		            });
	            };



	      $scope.prosesFilter = function(){
		        $scope.showLoader = true;
		        var filterTanggalMulai = new Date($scope.tglMulai);
		        $scope.pageChanged(0,filterTanggalMulai);
		  };

		$scope.newPasangSurut = function(){
			var hour = "";
			var tglInitial = $filter('date')($scope.tglInit,'yyyy-MM-dd');
			// console.log($scope.dataPost);
			for(var i=0; i<=$scope.inputData.length; i++){
				var a = i+1;
				if(a<10){
					var hour = "0"+a+":00:00";
				}else{
					var hour = a+":00:00";
				}
				var timeInitial = tglInitial+" "+hour;
				if($scope.inputData[i].value == ''){
					$scope.inputData[i].value = 0;
				}
				var x = $scope.inputData[i].value;
				PasangSurutSave.save({tanggalPasangSurut:timeInitial,pasangSurut:x},function(response){
                            console.log(response);
                            if(response.$resolved == true){
                                $scope.setNotification  = {
                                    type    : "success",
                                    message : "Data Berhasil Disimpan"
                                };
                                Notification.setNotification($scope.setNotification);
                                
                            }else{
                                $scope.setNotification  = {
                                    type    : "warning",
                                    message : "Data tidak Berhasil Disimpan"
                                };
                                Notification.setNotification($scope.setNotification);
                            }

                        });
                                        
			}
			
		}

}]);
