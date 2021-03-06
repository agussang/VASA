'use strict';

/**
 * @ngdoc directive
 * @name vasaApp.directive:exportTable
 * @description
 * # upload
 */
angular.module('vasaApp')
.directive('exportTable', [ function () {
  var exportTable = function(){
  var link = function($scope, elm, attr){
  $scope.$on('export-pdf', function(e, d){
        elm.tableExport({type:'pdf', escape:false});
   });
  $scope.$on('export-excel', function(e, d){
         elm.tableExport({type:'excel', escape:false});
   });
  $scope.$on('export-doc', function(e, d){
       elm.tableExport({type: 'doc', escape:false});
   });
 };

  return {
    restrict: 'C',
    link: link
  };
   };


}]);
