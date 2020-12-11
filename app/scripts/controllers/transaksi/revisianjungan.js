'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RevisiAnjunganCtrl
 * @description
 * # RevisiAnjunganCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('RevisiAnjunganCtrl',['$scope','$filter','$routeParams','LoadingScreen','RevisiAnjungan','$PAGE_SIZE','UserRole','RevisiAnjunganEdit','Notification', function($scope,$filter,$routeParams,LoadingScreen,RevisiAnjungan,$PAGE_SIZE,UserRole,RevisiAnjunganEdit,Notification){

  $scope.userRole = UserRole.getCurrentRole();

  $scope.items=[];
  $scope.search = {};
  $scope.itemDetailRevisi = {};
  $scope.parent = {tanggal:''};
  var currentDate = new Date();
  $scope.search.tglFilter = $filter('date')(currentDate,'MM-yyyy');
  var splitDate = $scope.search.tglFilter.split('-');
  $scope.bulanLaporan = splitDate[0];
  $scope.tahunLaporan = splitDate[1];
  LoadingScreen.show();

  $scope.optionSizePage = {
      availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
      selectedOption: {number: $PAGE_SIZE} //default select option size
    };
    $scope.options = {
      filter: [
        {value: undefined , name: 'Menunggu Review'},
        {value: 0, name: 'Disetujui'},
        {value: 1, name: 'Ditolak'}
      ]
  };
  $scope.filterConfig = [
    {
      id: 'namaKapal',
      title:  'Nama Kapal',
      placeholder: 'Filter by Nama Kapal'
    },
    {
      id: 'noPpk1',
      title:  'No. PPK1',
      placeholder: 'Filter by No. PPK1'
    }
  ];
  
  // PAGING
  $scope.currentPage = 1;
  $scope.pageSize = $scope.optionSizePage.selectedOption.number;  
  $scope.totalItems = 0;
  $scope.totalPages = 0;
  $scope.sortBy = '';
  $scope.sortDesc = false;
  $scope.option = [];
  $scope.option.value = $scope.options.filter[0].value;
  if(!$routeParams.ppk1){
    $scope.showAction = true;
  }else{
    $scope.showAction = false;
  }

  $scope.pageChanged = function(newPage) {
    $scope.btnResetSearch = false;
    $scope.contentSearch = false;
    $scope.loadingResetSearch = false;

    var selectionSearch = $scope.selectionSearch;
    var filterItem = {
      page : newPage-1,
      groupType: $scope.option.value!==undefined?$scope.option.value:null,
      sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
    }
    if($routeParams.ppk1 && !$scope.searchText){
      filterItem['noPpk1'] = $routeParams.ppk1;
      filterItem['size'] = 99999;
    }else if($scope.searchText && !$routeParams.ppk1){
      filterItem[selectionSearch.id] = $scope.searchText;
      filterItem['size'] = 99999;
      $scope.btnResetSearch = true;
      $scope.contentSearch = true;
    }else if($scope.searchText && $routeParams.ppk1){ 
      filterItem[selectionSearch.id] = $scope.searchText;
      filterItem['size'] = 99999;
      $scope.btnResetSearch = true;
      $scope.contentSearch = true;
    }


    if($routeParams.ppk1){
      filterItem['noPpk1'] = $routeParams.ppk1;
      filterItem['size'] = 99999;
    }else if($scope.searchText){
      filterItem[selectionSearch.id] = $scope.searchText;
      filterItem['size'] = 99999;
      $scope.btnResetSearch = true;
      $scope.contentSearch = true;
    }else{
      filterItem['size'] = $scope.optionSizePage.selectedOption.number; //kondisi default get data
    }
    RevisiAnjungan.get(filterItem,
    	function(response){
      LoadingScreen.hide();
  		$scope.currentPage = response.number + 1;
  		$scope.noIndex = ($scope.currentPage-1)*response.size;
  		$scope.pageSize = response.size;
  		$scope.totalItems = response.totalElements;
  		$scope.totalPages = response.totalPages;
      $scope.allItems = response.content;
			$scope.items = $scope.allItems;

      $scope.items.forEach(function(item){ 
        item = $scope.setTextFromCode(item);
      });
      $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
    });
 	}

  
  $scope.setTextFromCode = function(item){
    if(item.jenisRevisi===6)item.jenisRevisiText = "Perpanjangan";
    if(item.jenisRevisi===7)item.jenisRevisiText = "Perpendekan";
    if(item.jenisRevisi===8)item.jenisRevisiText = "Perubahan";

    if(item.kodeJasa===2)item.kodeJasaText = "Tambat";
    if(item.kodeJasa===4)item.kodeJasaText = "Pandu";
    if(item.kodeJasa===5)item.kodeJasaText = "Tunda";
    if(item.status===1){
      item.statusPengajuanText = "Disetujui";
      item.fontColor = "green";
      item.infoTooltip = "";
    }else if(item.status===0){
      item.statusPengajuanText = "Ditolak";
      item.fontColor = "red";
      item.infoTooltip = item.alasanTolak;
    }
    return item;
  };

  $scope.showModalPermohonanRevisi = function(item){
    $scope.itemDetailRevisi = $scope.setTextFromCode(item);
    $('#modalPermohonanRevisi').modal('show');
  }

  $scope.showModalKonfirmasiPersetuajanRevisi = function(item){
    $scope.itemSetujuRevisi = item;
    $('#modalKonfirmasiPersetuajanRevisi').modal('show');
  } 
  
  $scope.showModalKonfirmasiPenolakanRevisi = function(item){
    $scope.itemTolakRevisi = item;
    $('#modalKonfirmasiPenolakanRevisi').modal('show');
  }

  $scope.updateRevisiAnjungan = function(statusSubmit){
    /*
      Keteangan Status Submit :
      0 = Tidak Disetujui
      1 = Disetujui
    */
    var dataRevisi = {};
    if(statusSubmit===0){
      dataRevisi = $scope.itemTolakRevisi;
      dataRevisi.status = 0;
    }else if(statusSubmit===1){
      dataRevisi = $scope.itemSetujuRevisi;
      dataRevisi.status = 1; 
    }

    RevisiAnjunganEdit.update({id:dataRevisi.id}, dataRevisi,function(response){
      if(response.status==='500'){
        $scope.setNotification  = {
          type  : "warning",
          message : "Data tidak berhasil tersimpan"
        };
      }else{
        $scope.setNotification  = {
          type  : "success",
          message : "Data berhasil tersimpan"
        };
      }
      Notification.setNotification($scope.setNotification);
      $scope.pageChanged($scope.currentPage);
    },function(response){
      $scope.setNotification  = {
        type  : "warning",
        message : "Data tidak berhasil tersimpan"
      };
      Notification.setNotification($scope.setNotification);
      $scope.pageChanged($scope.currentPage);
    });
  }
  
  $scope.pageChanged(0);

}]);
