'use strict';

/**
 * @ngdoc directive
 * @name vasaApp.directive:upload
 * @description
 * # upload
 */
angular.module('vasaApp')
.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileInput).assign(scope,element[0].files);
                scope.$apply();
            });
        }
    };
}]);