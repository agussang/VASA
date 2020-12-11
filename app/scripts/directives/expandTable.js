'use strict';

angular.module('vasaApp')
.directive('expand', function () {
            return {
                restrict: 'A',
                controller: ['$scope', function ($scope) {
                    $scope.$on('onExpandAll', function (event, args) {
                        $scope.expanded = args.expanded;
                    });
                }]
            };
        });
