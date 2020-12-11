'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalKegiatanTetapDeletedCtrl
 * @description
 * # KapalKegiatanTetapDeletedCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalKegiatanTetapDeletedCtrl', ['$scope', 'LoadingScreen', 'KapalKegiatanTetapDeleted', '$PAGE_SIZE', function($scope, LoadingScreen, KapalKegiatanTetapDeleted, $PAGE_SIZE) {
    LoadingScreen.show();
    $scope.data = [];
    
    // PAGING
    $scope.optionSizePage = {
      availableOptions: [{
        number: 10
      }, {
        number: 20
      }, {
        number: 40
      }, {
        number: 80
      }],
      selectedOption: {
        number: $PAGE_SIZE
      }
    };

    $scope.currentPage = 1;
    $scope.pageSize = $scope.optionSizePage.selectedOption.number;
    $scope.totalItems = 0;
    $scope.totalPages = 0;
    $scope.sortBy = '';
    $scope.sortDesc = false;
    $scope.pagingText = '';

    $scope.pageChanged = function(newPage) {
      KapalKegiatanTetapDeleted.get({
          size: $scope.optionSizePage.selectedOption.number,
          page: newPage - 1
        },
        function(response) {
          LoadingScreen.hide();
          $scope.currentPage = response.number + 1;
          $scope.noIndex = ($scope.currentPage - 1) * response.size;
          $scope.pageSize = response.size;
          $scope.totalItems = response.totalElements;
          $scope.totalPages = response.totalPages;
          $scope.data = response.content;
          $scope.pagingText = 'Showing ' + (($scope.pageSize * ($scope.currentPage - 1)) + 1) + ' to ' + ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage) + ' of ' + $scope.totalItems;
        });
    }

    $scope.pageChanged(0);

  }]);
