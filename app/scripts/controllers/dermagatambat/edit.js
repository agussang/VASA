'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KawasantambatEditCtrl
 * @description
 * # KawasantambatEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('DermagaTambatEditCtrl', ['$scope', '$location', '$filter', 'Notification', '$routeParams', 'LoadingScreen', 'MdmDermagaSearch', 'MdmDermagaSearchByKode', 'DermagaTambatMappingList', 'DermagaTambatMappingEdit', function($scope, $location, $filter, Notification, $routeParams, LoadingScreen, MdmDermagaSearch, MdmDermagaSearchByKode, DermagaTambatMappingList, DermagaTambatMappingEdit) {


        $scope.dermagatambat = {};

        var dataEmpty = function() {
            $scope.detailFound = false;
            $scope.loading = false;
            $scope.contents = 'no content found';
        };

        $scope.edit = function() {
            console.log('yay');
            $("#editDermaga").modal();
            /*DermagaTambatList.get({ id: id }, function(response) {
                console.log(response);
                if (response !== undefined) {

                    $scope.dermagatambat = response;

                } else {
                    dataEmpty();
                }
            }
            ,
            function() {
                dataEmpty();
            });*/
        }



        $scope.dermagatambat = {};

        $scope.cancel = function() {
            $location.path('/dermagatambat/list');
        };

        $scope.submit = function() {
            $scope.buttonDisabled = false;
            DermagaTambatEdit.update({ id: $routeParams.id }, JSON.stringify($scope.dermagatambat),
                function(response) {
                    $scope.setNotification = {
                        type: "success", //ex : danger, warning, success, info
                        message: "Data berhasil tersimpan"
                    };
                    Notification.setNotification($scope.setNotification);
                    $location.path('/dermagatambat/list');
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
        };

        $scope.cancel = function() {
            $location.path('/dermagatambat/list');
        };

    }]);