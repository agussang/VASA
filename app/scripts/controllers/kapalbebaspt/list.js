'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterListCtrl
 * @description
 * # KapalCharterListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('KapalBebasPTListCtrl', ['$scope','$window','$filter','KapalBebasPTList','KapalBebasPTDelete','$PAGE_SIZE','Notification','AppParam','LoadingScreen','UserRole',function ($scope,$window,$filter,KapalBebasPTList,KapalBebasPTDelete,$PAGE_SIZE,Notification,AppParam,LoadingScreen, UserRole) {
$scope.userRole = UserRole.getCurrentRole();
LoadingScreen.show();
$scope.items=[];
var varItems = [];
$scope.filtersText = "";
  //filter
  var matchesFilter = function (item, filter) {
  var match = true;
  if (filter.id === 'nomorSk') {
    match = item.nomorSk.match(filter.value) !== null;
  } else if (filter.id === 'kodeKapal') {
    match = item.kodeKapal.match(filter.value) !== null;
  } else if (filter.id === 'namaKapal') {
    match = item.namaKapal.match(filter.value) !== null;
  } else if (filter.id === 'jenisBebasPt' && item.jenisBebasPtText!==null) {
    match = item.jenisBebasPtText===filter.value;
  } else if (filter.id === 'tglBerlaku') {
    match = item.tglBerlaku.match(filter.value) !== null;
  } else if (filter.id === 'dokumen') {
    match = item.dokumen.match(filter.value) !== null;
  } else if (filter.id === 'flagAktif') {
    match = item.flagAktif===filter.value;
  }
  return match;
  };

  //get parameter JENIS_BEBAS_PANDU_TUNDA
  AppParam.get({nama:'JENIS_BEBAS_PANDU_TUNDA', sort:'value,asc'},function(response){
    $scope.jenisBebasPt = [];
    for (var i = 0; i<response.content.length; i++ ){
      $scope.jenisBebasPt.push(response.content[i].caption);
      $scope.filterConfig.fields[3].filterValues = $scope.jenisBebasPt;
    }
  })

  var matchesFilters = function (item, filters) {
  var matches = true;

  filters.forEach(function(filter) {
    if (!matchesFilter(item, filter)) {
      matches = false;
      return false;
    }
  });
  return matches;
  };

  var applyFilters = function (filters) {
  $scope.items = [];
  if (filters && filters.length > 0) {
    $scope.allItems.forEach(function (item) {
      if(filters[0].type==='date'){
        filters[0].value = $filter('date')(filters[0].value, 'yyyy-MM-dd');
      }

      if (matchesFilters(item, filters)) {
        $scope.items.push(item);
      }
    });
  } else {
    $scope.items = $scope.allItems;
  }
  $scope.filterConfig.resultsCount = $scope.items.length;
  };

  var filterChange = function (filters) {
  filters.forEach(function (filter) {
    $scope.filtersText += filter.title + " : " + filter.value + "\n";
  });
  applyFilters(filters);
  };

  $scope.filterConfig = {
  fields: [
   {
      id: 'nomorSk',
      title:  'Nomor SK',
      placeholder: 'Filter by Nomor SK...',
      filterType: 'text'
    },
    {
      id: 'kodeKapal',
      title:  'Kode Kapal',
      placeholder: 'Filter by Kode Kapal...',
      filterType: 'text'
    },
    {
      id: 'namaKapal',
      title:  'Nama Kapal',
      placeholder: 'Filter by Nama Kapal...',
      filterType: 'text'
    },
    {
        id: 'jenisBebasPt',
        title:  'Jenis Bebas Pandu Tunda',
        placeholder: 'Filter by Jenis Bebas Pandu Tunda...',
        filterType: 'select',
        filterValues: []
    },
    {
      id: 'tglBerlaku',
      title:  'Tgl. Berlaku',
      placeholder: 'Filter by Tgl. Mulai Berlaku...',
      filterType: 'date'
    },
    {
        id: 'flagAktif',
        title:  'Status',
        placeholder: 'Filter by Status...',
        filterType: 'select',
                filterValues: ['AKTIF', 'TIDAK AKTIF']
      },
      ],
  resultsCount: $scope.items.length,
  appliedFilters: [],
  onFilterChange: filterChange
  };

//deleteKapalBebasPT
  $scope.deleteKapalBebasPT = function(idData){
    var checkDelete = confirm('Apakah anda ingin menghapus data?');
    if(checkDelete){
      KapalBebasPTDelete.delete({id:idData},function(response){
        if(response.$resolved){
          $scope.setNotification  = {
            type  : "success",
            message : "Data berhasil dihapus"
          };
        }else{
          $scope.setNotification  = {
            type  : "warning",
            message : "Data tidak berhasil dihapus"
          };
        }
        Notification.setNotification($scope.setNotification);
        $scope.pageChanged(0);
      });
    }
  }

  // PAGING
  $scope.optionSizePage = {
      availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
      selectedOption: {number: $PAGE_SIZE} //default select option size
    };
  $scope.currentPage = 1;
  $scope.pageSize = $scope.optionSizePage.selectedOption.number;
  $scope.totalItems = 0;
  $scope.totalPages = 0;
  $scope.sortBy = '';
  $scope.sortDesc = false;
  $scope.pagingText = '';
  $scope.pageChanged = function(newPage) {
    KapalBebasPTList.get(
    {
      size : $scope.optionSizePage.selectedOption.number,
      page : newPage - 1,
      sort : $scope.sortBy == '' ? 'id,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
    },
    function(response) {
      LoadingScreen.hide();
      $scope.currentPage = response.number + 1;
      $scope.pageSize = $scope.optionSizePage.selectedOption.number;
      $scope.pageSize = response.size;
      $scope.totalItems = response.totalElements;
      $scope.totalPages = response.totalPages;
      $scope.allItems = response.content;
      $scope.items = $scope.allItems;
      for (var i = 0; i<$scope.items.length; i++ ){
        $scope.items[i].flagAktif    = ($scope.items[i].flagAktif  ?"AKTIF":"TIDAK AKTIF");
      }
      $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
  });
}
    $scope.pageChanged(0);
}]);
