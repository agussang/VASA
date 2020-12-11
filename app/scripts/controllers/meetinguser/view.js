// 'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingUserViewCtrl
 * @description
 * # MeetingUserViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MeetingUserViewCtrl',['$scope', '$routeParams','$filter','$location','MeetingUserDetail','LoadingScreen',function ($scope, $routeParams,$filter,$location,MeetingUserDetail,LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
    $scope.kodeCabang = localStorage.getItem('kodeCabang');
		$scope.noDocument = false;

  		if($routeParams.id){
		MeetingUserDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.meetingUserDetails = response;
        $scope.meetingUserDetails.idAgen = $scope.kodeCabang+$scope.meetingUserDetails.mplgKode;
        //console.log($scope.meetingUserDetails);
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

  $scope.close = function(){
      $location.path('/meetinguser/list');
  }

}]);
