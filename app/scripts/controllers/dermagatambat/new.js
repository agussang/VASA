'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:DermagaTambatNewCtrl
 * @description
 * # DermagaTambatNewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('DermagaTambatNewCtrl', ['$scope', '$location', '$route', 'MdmDermagaSearchByKode', 'MdmDermagaSearch', 'Notification', 'AppParam', 'LoadingScreen', 'DermagaTambatMappingAdd', 'GrupDermagaTambatList', 'DermagaTambatMappingList', function($scope, $location, $route, MdmDermagaSearchByKode, MdmDermagaSearch, Notification, AppParam, LoadingScreen, DermagaTambatMappingAdd, GrupDermagaTambatList, DermagaTambatMappingList) {
        $scope.dermagaTambat = {};
        $scope.mapping = {};

        $scope.getListOfDermaga = function(value) {
            if (value && value.length <= 3) {
                return new Promise(function(resolve) {
                    MdmDermagaSearchByKode.get({
                            kode: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            } else if (value.length > 3) {
                return new Promise(function(resolve) {
                    MdmDermagaSearch.get({
                            nama: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            }
        };

        GrupDermagaTambatList.get(function(response) {
            $scope.grup = response.content;
            //console.log($scope.grup);
        });

        /* validasi autocomplete */
        var valueField = '';
        $scope.checkValue = function(value) {
            valueField = value;
        };

        $scope.validationLookupDermaga = function() {
            if (valueField !== $scope.dermagaTambat.dermaga) {
                if (typeof $scope.dermagaTambat.dermaga !== 'object') {
                    $scope.setNotification = {
                        type: 'warning',
                        message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.DermagaTambat = '';
                }
            }
        };
        /*end validasi autocomplete*/

        $scope.cancel = function() {
            $location.path('/dermagatambat/list');
        };

        $scope.submit = function() {
            $scope.buttonDisabled = false;
            $scope.mapping.kodeDermaga = $scope.dermagaTambat.dermaga.mdmgKode;
            $scope.mapping.namaDermaga = $scope.dermagaTambat.dermaga.mdmgNama;
            $scope.mapping.namaGroupDermagaTambat = $scope.dermagaTambat.grup.nama;
            $scope.mapping.idGroupDermagaTambat = $scope.dermagaTambat.grup.id;

            DermagaTambatMappingList.get({ kodeDermaga: $scope.mapping.kodeDermaga }, function(response) {
                var findSame = false;
                if (response.content !== 'undefined') {
                    response.content.forEach(function(element) {
                        if (element.kodeDermaga === $scope.mapping.kodeDermaga) {
                            findSame = true;
                        }
                    });
                }

                if (findSame) {
                    $scope.showLoader = false;
                    $scope.setNotification = {
                        type: "warning", //ex : danger, warning, success, info
                        message: "Data yang diinputkan sudah ada"
                    };
                    Notification.setNotification($scope.setNotification);
                    return false;
                } else {
                    DermagaTambatMappingAdd.save($scope.mapping,
                        function(response) {
                            $scope.setNotification = {
                                type: "success", //ex : danger, warning, success, info
                                message: "Data berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                            $location.path('/dermagatambat/list');
                            $route.reload();
                        },
                        function(response) {
                            $scope.setNotification = {
                                type: "warning", //ex : danger, warning, success, info
                                message: "Data tidak berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                            $scope.buttonDisabled = false;
                            $scope.showLoader = false;
                        }
                    );
                }
            });

        };



        $scope.cancel = function() {
            $location.path('/dermagatambat/list');
        };

    }]);