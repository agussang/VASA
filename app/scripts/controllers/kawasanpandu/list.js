'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KawasanPanduListCtrl
 * @description
 * # KawasanPanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('KawasanPanduListCtrl', ['$scope', '$location', '$PAGE_SIZE', 'KawasanPanduList', 'KawasanPanduDelete', 'KawasanPanduLevelDuaList', 'LoadingScreen', 'Notification', 'UserRole', function($scope, $location, $PAGE_SIZE, KawasanPanduList, KawasanPanduDelete, KawasanPanduLevelDuaList, LoadingScreen, Notification, UserRole) {
        $scope.userRole = UserRole.getCurrentRole();
        LoadingScreen.show();

        KawasanPanduLevelDuaList.get(function(response) {
            $scope.items = response;
            LoadingScreen.hide();
        });

        $scope.deleteKawasanPandu = function(idData) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                KawasanPanduDelete.delete({ id: idData }, function(response) {
                    // console.log(response.$resolved);
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

        };

    }]);