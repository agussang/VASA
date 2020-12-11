'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AddKedatanganKapalCtrl
 * @description
 * # AddKedatanganKapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('AddKedatanganKapalCtrl',['$scope','MdmKapalSearchByName','KedatanganAdd','$filter','Notification',function ($scope,MdmKapalSearchByName,KedatanganAdd,$filter,Notification) {

	$scope.kedatangan = {};
	$scope.requiredVal = true; var valueField = '';
		$scope.checkValue = function(value) {
			valueField = value;
		}
	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

	$scope.getListKapal = function(value) {
	  	if (typeof value != 'object') {
			return new Promise(function(resolve, reject) {
			  	MdmKapalSearchByName.get({
					"nama": value,
					"limit": 10
			  	}, function(response) {
					resolve(response);
		            response.forEach(function (response) {
		                response.mkplNamaLoa = response.mkplNama +' ('+response.mkplKode+', GT: '+formatSeparator(response.mkplGrt) + ', LOA: '+formatSeparator(response.mkplLoa)+', '+response.mkplJenis+')';
		            });
			  	});
			});
	  	}
	};

	var valueField = '';
	$scope.checkValue = function(value){
	    valueField = value;
	}
	$scope.validationLookupKapal = function() {
		if (typeof $scope.valueKapal == 'object') {			
			$scope.kedatangan.kodeKapal = $scope.valueKapal.mkplKode;
			$scope.kedatangan.namaKapal = $scope.valueKapal.mkplNama;
			$scope.kedatangan.callSign = $scope.valueKapal.mkplCallSign;
			$scope.kedatangan.imo = $scope.valueKapal.msiCode;
			$scope.requiredVal = false;
		}else{
			$scope.kedatangan.namaKapal = $scope.valueKapal
		}
	}

	var dmstolonlat = function(latDeg,latMin,latSec,latDir,lonDeg,lonMin,lonSec,lonDir){
	    // Assume the value to be zero if the user does not enter value
	    if (latDeg == null){
	      	latDeg = 0;
	    }
	    if (latMin == null){
	      	latMin = 0;
	    }
	    if (latSec == null){
	      	latSec = 0;
	    }
	    if(latDir == null){
	    	latDir = 'N';
	    }
	    if (lonDeg == null){
	      	lonDeg = 0;
	    }
	    if (lonMin == null){
	      	lonMin = 0
	    }
	    if (lonSec == null){
	     	lonSec = 0;
	    }
	    if(lonDir == null){
	    	lonDir = 'E';
	    }

	 	// Check if any error occurred
	    if (isNaN(latDeg) || isNaN(lonDeg) || isNaN(latMin) || isNaN(lonMin) || isNaN(lonSec) || isNaN(lonSec)) {
	      	var setNotification  = {
		        type	: 'danger',
		        message	: 'Latitude dan Longitude harus berupa angka'
		    };
		    Notification.setNotification(setNotification);
		    return false;
	    } else if (latDeg != Math.round(latDeg) || lonDeg != Math.round(lonDeg) || latMin != Math.round(latMin) || lonMin != Math.round(lonMin)) {
	      	//The value of the given number rounded to the nearest integer.
	      	var setNotification  = {
		        type	: 'danger',
		        message	: 'Error Math Round'
		    };
		    Notification.setNotification(setNotification);
		    return false;
	    } else if (latDeg < -90 || latDeg > 90 || lonDeg < -180 || lonDeg > 180 || latMin < -60 || latMin > 60 || lonMin < -60 || lonMin > 60 /*|| latSec < -60 || latSec > 60 || lonSec < -60 || lonSec > 60*/) {
	    	var setNotification  = {
		        type	: 'danger',
		        message	: 'Posisi yang diinputkan tidak valid'
		    };
		    Notification.setNotification(setNotification);
		    return false;
	    } else {
	    	// If no error, then go on
		    // Change to absolute value
		    latDeg = Math.abs(latDeg);
		    lonDeg = Math.abs(lonDeg);
		    latMin = Math.abs(latMin);
		    lonMin = Math.abs(lonMin);
		    latSec = Math.abs(latSec);
		    lonSec = Math.abs(lonSec);

		    // Convert to Decimal Degrees Representation
		    var lat = latDeg + (latMin/60) + (latSec / 60 / 60 / 100);
		    var lon = lonDeg + (lonMin/60) + (lonSec / 60 / 60 / 100 );
		    if ( lat <= 90 && lon <= 180 && lat >=0 && lon >= 0 ){
		    	lat = (lat*100000000)/100000000;
	      		lon = (lon*100000000)/100000000;
		    }
		    if(latDir == 'S'){
		    	lat = lat * -1;
		    }
		    if(lonDir == 'W'){
		    	lon = lon * -1;
		    }
	    }    
	    return {'lat':lat, 'lon' :lon};
	}

	$scope.submit = function(){
		var tglDatangVal = $filter('date')($scope.tglDatang, 'yyyy-MM-dd');
		var jamDatangVal = document.getElementById("jamDatangVal").value;
		$scope.kedatangan.tglDatang = tglDatangVal + 'T' + jamDatangVal;
		$scope.kedatangan.asalData = 'V';
		$scope.kedatangan.status = true;
		$scope.kedatangan.namaKapal = $filter('uppercase')($scope.kedatangan.namaKapal);
		var latlon = dmstolonlat($scope.kedatangan.latDegrees,$scope.kedatangan.latMinutes,$scope.kedatangan.latSeconds,$scope.kedatangan.latDirection,$scope.kedatangan.lonDegrees,$scope.kedatangan.lonMinutes,$scope.kedatangan.lonSeconds,$scope.kedatangan.lonDirection);
		$scope.kedatangan.lat = latlon.lat;
		$scope.kedatangan.lon = latlon.lon;
		if(latlon != false){
			KedatanganAdd.save($scope.kedatangan, function(response){
				if(response.status == '404'){
					var setNotification  = {
		            	type	: 'danger',
		            	message	: 'Kapal yang sama dengan waktu kedatangan yang sama tidak dapat diinputkan'
		          	};
		          	Notification.setNotification(setNotification);
				}else{
					if(response.status !='500'){
						$scope.kedatangan = {};
						var setNotification  = {
			            	type	: 'success',
			            	message	: 'Data Berhasil disimpan'
			          	};
			          	Notification.setNotification(setNotification);
			          	$scope.kedatangan = {};
			          	$scope.tglDatang = '';
			          	document.getElementById("jamDatangVal").value = '';
					}
				}
			});			
		}
	}
}]);