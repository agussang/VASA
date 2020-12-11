'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingOnlineViewCtrl
 * @description
 * # MeetingOnlineViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  	.controller('MeetingOnlineViewCtrl',['$scope', '$routeParams','$filter','MeetingOnlineDetail','LoadingScreen',function ($scope, $routeParams,$filter,MeetingOnlineDetail,LoadingScreen) {
      LoadingScreen.show();
  		var dataEmpty = function(){
			$scope.detailFound = false;
			$scope.loading = false;
			$scope.contents = 'no content found';
		};
		$scope.noDocument = false;

  		if($routeParams.id){
		MeetingOnlineDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      // console.log(response);
			if(response !== undefined){
				$scope.meeting = response;
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

}]);
