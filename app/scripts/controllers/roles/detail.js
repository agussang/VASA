'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RolesViewCtrl
 * @description
 * # RolesViewCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('RolesDetailCtrl',['$scope', '$routeParams','$location','RolesDetail','LoadingScreen', function ($scope,$routeParams,$location,RolesDetail,LoadingScreen) {
  LoadingScreen.show();
    var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  	if($routeParams.id){
		RolesDetail.get({id:$routeParams.id}, function(response){
      	LoadingScreen.hide();
			if(response !== undefined){
				$scope.dataRoles = response;
				$scope.dataRolesGrup = response.groups;
				$scope.dataRolesJasa = response.jasa;
				$scope.dataRolesJasa.flagAirKapal = ($scope.dataRolesJasa.flagAirKapal?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRolesJasa.flagLabuh = ($scope.dataRolesJasa.flagLabuh?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRolesJasa.flagPandu = ($scope.dataRolesJasa.flagPandu?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRolesJasa.flagTambat = ($scope.dataRolesJasa.flagTambat?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRolesJasa.flagTunda = ($scope.dataRolesJasa.flagTunda?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRoles.flagNotifPenetapan = ($scope.dataRoles.flagNotifPenetapan?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRoles.flagNotifRealisasi = ($scope.dataRoles.flagNotifRealisasi?"fa fa-check-square-o":"fa fa-square-o");
				$scope.dataRoles.flagNotifEskalasi = ($scope.dataRoles.flagNotifEskalasi?"fa fa-check-square-o":"fa fa-square-o");
				for (var i=0; i<$scope.dataRolesGrup.length; i++){
					$scope.dataRolesMenus = $scope.dataRolesGrup[i].menus;
					// console.log($scope.dataRolesMenus);
				}

			}else{
				dataEmpty();
			}
		}, function(){
			dataEmpty();
		});
	}else{
		dataEmpty();
	}

	//fungction cance atau tutup
	$scope.cancel =  function(){
		$location.path('/roles');
	}
}]);
