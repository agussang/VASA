'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MonitoringPanduCtrl
 * @description
 * # MonitoringPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('MonitoringPanduViewCtrl', ['$scope', '$PAGE_SIZE', '$filter', '$interval', '$timeout', 'LoadingScreen', 'moment', 'PublicMdmCabang', 'ListKawasan', 'ProgressSpkOptimized', 'MonitoringPetugasPandu', 'AppParam', function ($scope, $PAGE_SIZE, $filter, $interval, $timeout, LoadingScreen, moment, PublicMdmCabang, ListKawasan, ProgressSpkOptimized, MonitoringPetugasPandu, AppParam) {
  LoadingScreen.show();

  var currentDate = new Date();
  var tanggalPandu = $filter('date')(currentDate,'yyyy-MM-dd');
  var tomorrowsDate = moment($scope.tomorrowsDate,"DD-MM-YYYY").format("YYYY-MM-DD");
  $scope.tglFilter = $filter('date')(currentDate,'dd-MM-yyyy');
  $scope.currentDate = $filter('date')(currentDate,'yyyy-MM-dd');
  $scope.tomorrowsDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1),'yyyy-MM-dd')
  $scope.listCabang = [];
  $scope.listKawasan = [];
  $scope.idCabang = localStorage.getItem('kodeCabang');

  AppParam.get({ nama: 'CABANG_MONITORING' }, function (response) {
      $scope.listCabang = response.content;
  });

  $scope.getKawasan = function(){
    ListKawasan.get({
      kodeCabang: $scope.idCabang
    },function(response) {
      $scope.listKawasan = response;
    });
  };
    
  var setDisableDate = function(){
     $('#tglAwal').datepicker('setEndDate',tomorrowsDate);
     $('#tglAwal').mask('99-99-9999');
  };

  $scope.$watch('tglAwal', function(){
     $timeout(function() {
        setDisableDate();
     }, 1000);
  });

  $scope.$watch('idCabang', function(newValue,oldValue){ 
     if($scope.idCabang != oldValue){
       $scope.idCabang = newValue;
     }else{
       $scope.idCabang = oldValue;
     } 
  });

  $scope.pageChanged = function(newPage) {
    $scope.petugasList = [];
    $scope.optionSizePage = {
    availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
      selectedOption: {number: $PAGE_SIZE} //default select option size
    };

    // PAGING
    $scope.currentPage = 1;
    $scope.pageSize = $scope.optionSizePage.selectedOption.number;
    $scope.totalItems = 0;
    $scope.totalPages = 0;
    $scope.sortBy = '';
    $scope.sortDesc = false;

    var filterSpk = {
          size : $PAGE_SIZE,
          page : newPage - 1,
          kodeCabang : ($scope.idCabang == undefined?-1 : $scope.idCabang),
          tglAwal: $scope.currentDate,
          tglAkhir: $scope.tomorrowsDate,
          sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
    }

    ProgressSpkOptimized.get(filterSpk, function(response) {
        $scope.currentPage = response.number + 1;
        $scope.noIndex = ($scope.currentPage-1)*response.size;
        $scope.pageSize = response.size;
        $scope.totalItems = response.totalElements;
        $scope.totalPages = response.totalPages;
        $scope.allItems = response.content;
      
        $scope.items = $scope.allItems;
        
        $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
        $scope.currentPage)+' of '+$scope.totalItems;

        $scope.items.forEach(function(element){              
            element.listProgress.forEach(function(data) {
              switch (data.idTahapanPandu) {
              case 1:
                element.jamPanduNaik = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 2:
                element.jamKapalBergerak = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 3:
                element.jamPanduTurun = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 4:
                element.jamIkatTunda = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 5:
                element.jamLepasTunda = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 6:
                element.jamIkatTali = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              case 7:
                element.jamLepasTali = $filter('date')(data.tglTahapan,'HH:mm');
              break;
              }
            });
        });
    });
  }

  $scope.loadPetugas = function(){
      $scope.monitoringPandu=[];
      $scope.arrayPandu=[];
      var filter = {
          tglPandu:tanggalPandu,
          kodeCabang : ($scope.idCabang == undefined?-1:$scope.idCabang)
      }

      MonitoringPetugasPandu.get(filter,function(response){ 
          for(var i = 0; i < response.length;i++){
            if (response[i].statusAbsen == 1) {
                response[i].statusAbsenText = 'ON';
                response[i].status = 'Available';                
            } else {
                response[i].statusAbsenText = 'OFF';
                response[i].status = 'Unavailable';
            }
            if (!$scope.arrayPandu.includes(response[i].petugasPandu.id)){
                $scope.monitoringPandu.push(response[i]);
                $scope.arrayPandu.push(response[i].petugasPandu.id);
            } 
          }
      });
  };
    
  $scope.changeTanggalAwal = function(){
      LoadingScreen.show();
      $scope.currentDate = moment($scope.tglFilter,"DD-MM-YYYY").format("YYYY-MM-DD");
      $scope.pageChanged(0);
      LoadingScreen.hide();
  };

  $scope.changeCabang = function(val){
      $scope.idCabang = val;
      /*get kawasan
      $scope.getKawasan();
      */
      for(var i=0;i<$scope.listCabang.length;i++){
          if($scope.listCabang[i].kodeTerminal == val){
            $scope.namaCabang = $scope.listCabang[i].namaTerminal;
            break;
          }
      }
      $scope.pageChanged(0);
      $scope.loadPetugas();
  };  

  $scope.pageChanged(0);
  $scope.loadPetugas();

  $interval( function(){ $scope.pageChanged(0);}, 30000);
  $interval( function(){ $scope.loadPetugas();}, 60000);

  $scope.$on('publishNotifikasiProgressPandu', function (event, data) {
      $scope.pageChanged(0);
      $scope.loadPetugas();
  });

  LoadingScreen.hide();
}]);