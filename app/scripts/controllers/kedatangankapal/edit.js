'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:EditKedatanganKapalCtrl
 * @description
 * # EditKedatanganKapalCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('EditKedatanganKapalCtrl',['$scope','MdmKapalSearchByName','$routeParams','KedatanganDetail','KedatanganEdit','$filter','Notification',function ($scope,MdmKapalSearchByName,$routeParams,KedatanganDetail,KedatanganEdit,$filter,Notification) {
	
	$scope.kedatangan = {};

	var formatSeparator = function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

	$scope.getListKapal = function(value) {
	  	if (value) {
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

	$scope.validationLookupKapal = function() {
		if (typeof $scope.kedatangan.namaKapal == 'object') {
			$scope.kedatangan.callSign = $scope.kedatangan.namaKapal.mkplCallSign;
			$scope.kedatangan.imo = $scope.kedatangan.namaKapal.msiCode;
			$scope.kedatangan.kodeKapal = $scope.kedatangan.namaKapal.mkplKode;
			$scope.kedatangan.namaKapal = $scope.kedatangan.namaKapal.mkplNama;			
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
	    }else if (latDeg < -90 || latDeg > 90 || lonDeg < -180 || lonDeg > 180 || latMin < -60 || latMin > 60 || lonMin < -60 || lonMin > 60 /*|| latSec < -60 || latSec > 60 || lonSec < -60 || lonSec > 60*/) {
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
		    var lon = lonDeg + (lonMin/60) + (lonSec / 60 / 60 / 100);
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

	var lonlattodms = function(lat,lon){
		// Retrieve Lat and Lon information
		if (lat == null){
			var lat = 0;
		}    
    	if (lon == null){
            var lon = 0;
    	}
	    // Check if any error occurred
	    if (isNaN(lat)) {
	      	$scope.kedatangan.latDegrees = 0;
	      	$scope.kedatangan.latMinutes = 0;
	      	$scope.kedatangan.latSeconds = 0;
	    } else  if (isNaN(lon)) {
	      	$scope.kedatangan.lonDegrees = 0;
	      	$scope.kedatangan.lonMinutes = 0;
	      	$scope.kedatangan.lonSeconds = 0;
	    } else if (lat < -90 || lat > 90 ) {
	        $scope.kedatangan.latDegrees = 0;
	      	$scope.kedatangan.latMinutes = 0;
	      	$scope.kedatangan.latSeconds = 0;
	    } else if(lon < -180 || lon > 180){
	    	$scope.kedatangan.lonDegrees = 0;
	      	$scope.kedatangan.lonMinutes = 0;
	      	$scope.kedatangan.lonSeconds = 0;
	    } else {
	    	// then a positive latitude value regards North, negative latitude value regards South
	    	if(lat > 0){
	    		$scope.kedatangan.latDirection = 'N';
	    	}else{
	    		$scope.kedatangan.latDirection = 'S';
	    	}

	    	// then a positive longitude value regards East, negative longitude value regards West
	    	if(lon > 0){
	    		$scope.kedatangan.lonDirection = 'E';
	    	}else{
	    		$scope.kedatangan.lonDirection = 'W';
	    	}

	    	// Change to absolute value
		    lat = Math.abs(lat);
		    lon = Math.abs(lon);

			// Convert to Degree Minutes Seconds Representation
		    var LatDeg = Math.floor(lat);
		    var LatMin = Math.floor((lat-LatDeg)*60);
		    var LatSec = Math.round(((((lat - LatDeg) - (LatMin/60)) * 60 * 60) * 100)*100)/100;
		    var LonDeg = Math.floor(lon);
		    var LonMin = Math.floor((lon-LonDeg)*60);
		    var LonSec =  Math.round(((((lon - LonDeg) - (LonMin / 60 )) * 60 * 60) * 100)*100)/100;

		    // Copy result to the board
		    $scope.kedatangan.latDegrees = LatDeg;
		    $scope.kedatangan.latMinutes = LatMin;
		    $scope.kedatangan.latSeconds = LatSec;
		    $scope.kedatangan.lonDegrees = LonDeg;
		    $scope.kedatangan.lonMinutes = LonMin;
		    $scope.kedatangan.lonSeconds = LonSec;
	    }
	}

	$scope.getDetail = function(){
		KedatanganDetail.get({id:$routeParams.id},function(response) {
			$scope.kedatangan.kodeKapal = response.kodeKapal;
			$scope.kedatangan.namaKapal = response.namaKapal;
			$scope.kedatangan.asalData = response.asalData;
			$scope.kedatangan.status = response.status;
			$scope.kedatangan.isLabuh = response.isLabuh;
			$scope.kedatangan.callSign = response.callSign;
			$scope.kedatangan.imo = response.imo;
			$scope.jamDatang = $filter('date')(response.tglDatang, 'HH:mm');
			$scope.tglDatang = $filter('date')(response.tglDatang, 'dd-MM-yyyy');
			lonlattodms(response.lat, response.lon);
		});	
	}

	$scope.getDetail();

	$scope.submit = function(){
		var jamDatangVal = document.getElementById("jamDatangVal").value;
		if(typeof $scope.tglDatang === 'object'){
			if($scope.tglDatang.toString().indexOf('-') === -1){
				$scope.kedatangan.tglDatang = $filter('date')($scope.tglDatang,'yyyy-MM-dd')+'T'+jamDatangVal;
			}
		}else{
			var formatTglSetuju = $scope.tglDatang.split('-');
			var newFormatTglSetuju = formatTglSetuju[1]+'-'+formatTglSetuju[0]+'-'+formatTglSetuju[2];
			$scope.kedatangan.tglDatang = $filter('date')(new Date(newFormatTglSetuju),'yyyy-MM-dd')+'T'+jamDatangVal;
		}
		var latlon = dmstolonlat($scope.kedatangan.latDegrees,$scope.kedatangan.latMinutes,$scope.kedatangan.latSeconds,$scope.kedatangan.latDirection,$scope.kedatangan.lonDegrees,$scope.kedatangan.lonMinutes,$scope.kedatangan.lonSeconds,$scope.kedatangan.lonDirection);
		$scope.kedatangan.lat = latlon.lat;
		$scope.kedatangan.lon = latlon.lon;
		$scope.kedatangan.status = true;
		$scope.kedatangan.namaKapal = $filter('uppercase')($scope.kedatangan.namaKapal);
		if(latlon != false){
			KedatanganEdit.update({id:$routeParams.id},$scope.kedatangan, function(response){ console.log('1');
				if(response.status !='500'){
					var setNotification  = {
		            	type	: 'success',
		            	message	: 'Data Berhasil disimpan'
		          	};
		          	Notification.setNotification(setNotification);
		          	$scope.getDetail();
				}
				console.log(response);
			});			
		}
	}

}]);