'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasTambatEditCtrl
 * @description
 * # PetugasTambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('MasterPilotEditCtrl', ['$scope', '$location', '$filter', 'Notification', '$routeParams', 'PetugasTambatEdit', 'MasterPilotShuttleCarDetail','MasterPilotBoatDetail', 'LoadingScreen','AppParam','MasterPilotShuttleCarUpdate','MasterPilotBoatUpdate', function($scope, $location, $filter, Notification, $routeParams, PetugasTambatEdit, MasterPilotShuttleCarDetail, MasterPilotBoatDetail, LoadingScreen, AppParam,MasterPilotShuttleCarUpdate,MasterPilotBoatUpdate) {
        LoadingScreen.show();
        $scope.masterpilotcar = {};
        $scope.masterpilotboat = {};
        $scope.masterpilot = {};
        $scope.tglBerlaku = new Date();

         //get parameter JENIS_KENDARAAN
        AppParam.get({nama:'JENIS_KENDARAAN_PILOT'},function(response){
          $scope.listJnsKendaraan = response.content;
        });

        $scope.isDisabledShuttleCar = true;
        $scope.isDisabledBoat = true;

        $scope.changeJnsKendaraan = function (){
          if ($scope.masterpilot.jnsKendaraan == 1 ) {
              $scope.isDisabledShuttleCar = false;
              $scope.isDisabledBoat = true;
          } else {
              $scope.isDisabledShuttleCar = true;
              $scope.isDisabledBoat = false;
          }
        }

        var dataEmpty = function() {
            $scope.detailFound = false;
            $scope.loading = false;
            $scope.contents = 'no content found';
        };

        if ($routeParams.id) {
            //tambahan untuk load hanya car saja
            if($routeParams.jenisKendaraan == 'Shuttle Car') {

                MasterPilotShuttleCarDetail.get({ id: $routeParams.id }, function(response) {
                    LoadingScreen.hide();
                    if (response !== undefined && response.status !== '404') {
                        $scope.masterpilotcar = response;
                        $scope.masterpilot.jnsKendaraan = '1';
                        $scope.changeJnsKendaraan();
    
                    } else {
                        dataEmpty();
                    }
                }, function() {
                    dataEmpty();
                });

            }
            else {
                MasterPilotBoatDetail.get({ id: $routeParams.id }, function(response) {
                    LoadingScreen.hide();
                    if (response !== undefined && response.status !== '404') {
                        $scope.masterpilotboat = response;
                        $scope.masterpilot.jnsKendaraan = '2';
                        $scope.changeJnsKendaraan();
    
                    } else {
                        dataEmpty();
                    }
                }, function() {
                    dataEmpty();
                });
            }
        } else {
            LoadingScreen.hide();
            dataEmpty();
        }


        $scope.submit = function() {
            $scope.buttonDisabled = false;
            $scope.masterpilot.tglBerlaku = $filter('date')($scope.tglBerlaku, 'yyyy-MM-ddT00:00:00'); 

            if ($scope.masterpilot.jnsKendaraan == 1 ) {
                 $scope.masterpilotcar.tglBerlaku = $scope.masterpilot.tglBerlaku;
                 MasterPilotShuttleCarUpdate.update({ id: $routeParams.id }, JSON.stringify($scope.masterpilotcar),
                    function(response) {
                        if (response.$resolved) {
                            $scope.setNotification = {
                                type: "success", //ex : danger, warning, success, info
                                message: "Data berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                            $location.path('/masterpilot/list');
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

            } else {
                  $scope.masterpilotboat.tglBerlaku = $scope.masterpilot.tglBerlaku;
                  MasterPilotBoatUpdate.update({ id: $routeParams.id }, JSON.stringify($scope.masterpilotboat),
                    function(response) {
                        if (response.$resolved) {
                            $scope.setNotification = {
                                type: "success", //ex : danger, warning, success, info
                                message: "Data berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                            $location.path('/masterpilot/list');
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
        }

        $scope.cancel = function() {
            $location.path('/masterpilot/list');
        }
    }]);