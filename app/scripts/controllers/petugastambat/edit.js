'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasTambatEditCtrl
 * @description
 * # PetugasTambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('PetugasTambatEditCtrl', ['$scope', '$location', '$filter', 'Notification', '$routeParams', 'PetugasTambatEdit', 'PetugasTambatDetail', 'GrupTambatList', 'GrupDermagaTambatList', 'LoadingScreen', function($scope, $location, $filter, Notification, $routeParams, PetugasTambatEdit, PetugasTambatDetail, GrupTambatList, GrupDermagaTambatList, LoadingScreen) {
        LoadingScreen.show();
        $scope.petugasTambat = {};

        var dataEmpty = function() {
            $scope.detailFound = false;
            $scope.loading = false;
            $scope.contents = 'no content found';
        };

        GrupTambatList.get(function(response) {
            $scope.grupTambat = response.content;
        });

        GrupDermagaTambatList.get(function(response) {
            $scope.grupDermaga = response.content;
        });

        if ($routeParams.id) {
            PetugasTambatDetail.get({ id: $routeParams.id }, function(response) {
                LoadingScreen.hide();
                if (response !== undefined) {
                    //console.log($scope.petugasTambat);
                    $scope.petugasTambat = response;

                } else {
                    dataEmpty();
                }
            }, function() {
                dataEmpty();
            });
        } else {
            LoadingScreen.hide();
            dataEmpty();
        }


        $scope.submit = function() {
            $scope.buttonDisabled = false;

            PetugasTambatEdit.update({ id: $routeParams.id }, JSON.stringify($scope.petugasTambat),
                function(response) {
                    //console.log($scope.petugasTambat);
                    if (response.$resolved) {
                        $scope.setNotification = {
                            type: "success", //ex : danger, warning, success, info
                            message: "Data berhasil tersimpan"
                        };
                        Notification.setNotification($scope.setNotification);
                        $location.path('/petugastambat/list');
                    }
                },
                function(response) {
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data tidak berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.buttonDisabled = false;
                    $scope.showLoader = false;
                });

        }

        $scope.cancel = function() {
            $location.path('/petugastambat/list');
        }
    }]);