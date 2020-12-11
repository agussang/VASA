// 'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalBebasPTDetailCtrl
 * @description
 * # KapalBebasPTDetailCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('KapalBebasPTDetailCtrl',['$scope', '$routeParams','$filter','KapalBebasPTDetail','BuildPDF','LoadingScreen',function ($scope, $routeParams,$filter,KapalBebasPTDetail,BuildPDF,LoadingScreen) {
    LoadingScreen.show();
    var dataEmpty = function(){
      $scope.detailFound = false;
      $scope.loading = false;
      $scope.contents = 'no content found';
    };
    $scope.noDocument = false;

    if($routeParams.id){
      KapalBebasPTDetail.get({id:$routeParams.id}, function(response){
        LoadingScreen.hide();
        if(response !== undefined){
          $scope.contentKapalBebasPTDetails = response;
          $scope.img = 'data:image/jpg;base64,'+ $scope.contentKapalBebasPTDetails.dokumen;
          if ($scope.contentKapalBebasPTDetails.dokumen == null ) {
            $scope.contentKapalBebasPTDetails.dokumen == false;
          }else{
            $scope.contentKapalBebasPTDetails.dokumen == true;
          }
          $scope.contentKapalBebasPTDetails.tglBerlaku = $filter('date')($scope.contentKapalBebasPTDetails.tglBerlaku, 'dd-MM-yyyy');
          $scope.contentKapalBebasPTDetails.flagAktif = ($scope.contentKapalBebasPTDetails.flagAktif === 1 ?"AKTIF":"TIDAK AKTIF")
        }else{
          dataEmpty();
        }
      }, function(){
        dataEmpty();
      });
    }else{
      LoadingScreen.hide();
      dataEmpty();
    }

    $scope.buildPDF = function(){
      BuildPDF.build($scope.contentKapalBebasPTDetails.dokumen);
    }
}]);
