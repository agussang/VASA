'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:dermagaPanduListCtrl
 * @description
 * # dermagaPanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('DermagaPanduListCtrl', ['$scope', '$location', '$PAGE_SIZE', '$filter', 'DermagaPanduList', 'DermagaPanduDelete', 'DermagaPanduEdit', 'LoadingScreen', 'UserRole', 'Notification', function($scope, $location, $PAGE_SIZE, $filter, DermagaPanduList, DermagaPanduDelete, DermagaPanduEdit, LoadingScreen, UserRole, Notification) {
        LoadingScreen.show();
        $scope.userRole = UserRole.getCurrentRole();
        $scope.loadTable = function() {
            DermagaPanduList.get({ size: 999 }, function(response) {
                $scope.items = $filter('orderBy')(response.content, 'lokasi');
                LoadingScreen.hide();
            });
        };

        $scope.loadTable();

        $scope.deleteDermagaPandu = function(idData) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                DermagaPanduDelete.delete({ id: idData }, function(response) {
                    if (response.$resolved) {
                        $scope.setNotification = {
                            type: "success",
                            message: "Data berhasil dihapus"
                        };
                    } else {
                        $scope.setNotification = {
                            type: "warning",
                            message: "Data tidak berhasil dihapus"
                        };
                    }
                    Notification.setNotification($scope.setNotification);
                });
            }
            $scope.items = [];
            LoadingScreen.show();
            $scope.loadTable();
        };

    }]);