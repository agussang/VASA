'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:KapalCharterEditCtrl
 * @description
 * # KapalCharterEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('KapalCharterEditCtrl',['$scope', '$routeParams','$filter','$location','$timeout', 'KapalCharterDetail','KapalCharterAdd','KapalCharterEdit','Notification','MdmPelangganDetail','MdmPelangganSearch','MdmKapalSearchByName','BuildPDF','LoadingScreen','KapalCharterByKodeKapal','Validations',function ($scope, $routeParams, $filter, $location, $timeout, KapalCharterDetail, KapalCharterAdd ,KapalCharterEdit,Notification, MdmPelangganDetail,MdmPelangganSearch,MdmKapalSearchByName,BuildPDF,LoadingScreen,KapalCharterByKodeKapal,Validations) {
  LoadingScreen.show();
  $scope.options = {
	    autoclose: true,
	    todayBtn: '',
	    todayHighlight: true
	};
  $scope.locationPath = '/kapalcharter/list';
  $scope.tooltipInfo = Notification.setMessageValidFile();


  //Start Set Disabled Date :
  var setDisableDate = function(){
    $('#tglSelesaiBerlaku').datepicker('setStartDate',$scope.dataKapalCharter.tglMulaiBerlaku);
    $('#tglMulaiBerlaku').mask('99-99-9999');
    $('#tglSelesaiBerlaku').mask('99-99-9999');
  };

  $scope.$watch('dataKapalCharter.tglMulaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  $scope.$watch('dataKapalCharter.tglSelesaiBerlaku', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });
  //End Set Disabled Date :

  $scope.dataKapalCharter = {};
  $scope.dataKapalCharter.status = 1;



  var dataEmpty = function(){
  $scope.detailFound = false;
  $scope.loading = false;
  $scope.contents = 'no content found';
  };

	$scope.cancel =  function(){
		$location.path('/kapalcharter/list');
	}

  	if($routeParams.id){
		KapalCharterDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
      if(response !== undefined){
				$scope.dataKapalCharter = response;
				$scope.dataKapalCharter.tglMulaiBerlaku = new Date(response.tglMulaiBerlaku);
       	$scope.dataKapalCharter.tglSelesaiBerlaku = new Date(response.tglSelesaiBerlaku);

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

	// autocomplete
    $scope.getListOfKapal = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmKapalSearchByName.get({
            nama: value,
            limit: '10'
          }, function(response) {
            resolve(response);
          });
        });
      }
    };
    //autocomplete master data pelanggan
    $scope.getListOfPelanggan = function(value) {
      if (value) {
        return new Promise(function(resolve, reject) {
          MdmPelangganSearch.get({
            nama: value,
            kodeTerminal : localStorage.getItem('kodeTerminal'),
            limit: '10'
          }, function(response) {
            resolve(response);
            response.forEach(function (response) {
              response.mplgNamaKode = response.mplgNama +' ('+response.mplgKode + ')';
            });
          });
        });
      }
    };


  $scope.submit = function(){
    $scope.buttonDisabled = true;
    //$scope.dataKapalCharter.kantorId = 0;

    $scope.dataKapalCharter.tglMulaiBerlaku = $filter('date')($scope.dataKapalCharter.tglMulaiBerlaku, 'yyyy-MM-ddT00:00:00');
    $scope.dataKapalCharter.tglSelesaiBerlaku = $filter('date')($scope.dataKapalCharter.tglSelesaiBerlaku, 'yyyy-MM-ddT00:00:00');

    //start untuk upload smua type file jpg dan pdf
    $scope.dataKapalCharter.dokCharter = $scope.uploadFile === undefined || $scope.uploadFile.length === 0 ? $scope.dataKapalCharter.dokCharter : $scope.uploadFile[0].name;

    var curDate = new Date();

      if(new Date($scope.dataKapalCharter.tglMulaiBerlaku) > new Date($scope.dataKapalCharter.tglSelesaiBerlaku)){
        $scope.setNotification = {
          type: "warning", //ex : danger, warning, success, info
          message: "Tanggal Selesai Berlaku harus lebih atau sama dengan Tanggal Mulai Berlaku"
        };
        Notification.setNotification($scope.setNotification);
        return false;
      }

      var dateKapalCharter = {
        startDate 		: $scope.dataKapalCharter.tglMulaiBerlaku,
        endDate 		: $scope.dataKapalCharter.tglSelesaiBerlaku,
        titleStartDate 	: 'Tgl. Mulai Berlaku',
        titleEndDate 	: 'Tgl. Selesai Berlaku'
      }
      var validationDate = Validations.checkValidEndDate(dateKapalCharter);
      if(validationDate){
        $scope.showLoader = false;
        return false;
        console.log($scope.showLoader);
      }

    // check validation

      KapalCharterByKodeKapal.get({
        kodeKapal: $scope.dataKapalCharter.kodeKapal
      }, function(response) {
        // do validation
        var findSame = false;
        response.content.forEach(function(item){
          if(item.tglMulaiBerlaku == $scope.dataKapalCharter.tglMulaiBerlaku &&
            item.tglSelesaiBerlaku == $scope.dataKapalCharter.tglSelesaiBerlaku ) {
            findSame = false;
          }

        });

        if(findSame) {
          // alert('wew');
          $scope.showLoader = false;
          $scope.setNotification = {
            type: "warning", //ex : danger, warning, success, info
            message: "Data yang diinputkan sudah ada"
          };
          Notification.setNotification($scope.setNotification);
          return false;
        } else {
          // do save
          var fileName = $scope.dataKapalCharter.dokCharter;
          var fileExtension = fileName.replace(/^.*\./, '');
          if(fileExtension === 'pdf' || fileExtension === 'PDF' || fileExtension === 'jpg' || fileExtension === 'JPG' || fileExtension === 'jpeg' || fileExtension === 'JPEG'){
            if(fileExtension==='pdf' || fileExtension==='PDF'){
              $scope.dataKapalCharter.dokCharter = $scope.dataKapalCharter.dokCharter.replace(fileExtension,'pdf');
            }else{
              $scope.dataKapalCharter.dokCharter = $scope.dataKapalCharter.dokCharter.replace(fileExtension,'jpg');
            }
          }else{
            $scope.setNotification  = {
              type    : "warning", //ex : danger, warning, success, info
              message : "Dokumen Charter harus format PDF dan JPG"
            };
            Notification.setNotification($scope.setNotification);
            return;
          }

          var formData = new FormData();
          formData.append('kapalCharter', new Blob([JSON.stringify($scope.dataKapalCharter)], { type: "application/json" }));
          if ($scope.uploadFile !== undefined && $scope.uploadFile.length > 0) formData.append("file", $scope.uploadFile[0]);
          //end untuk upload smua type file jpg dan pdf

          KapalCharterAdd.save(formData,
            function(response){
              if(response.$resolved){
                $scope.setNotification  = {
                  type  : "success", //ex : danger, warning, success, info
                  message : "Data berhasil dirubah"
                };
                Notification.setNotification($scope.setNotification);
                $location.path($scope.locationPath);
              }else{
                $scope.setNotification  = {
                  type  : "warning", //ex : danger, warning, success, info
                  message : "Data tidak berhasil dirubah"
                };
                Notification.setNotification($scope.setNotification);
              }
              $scope.buttonDisabled = false;
              $scope.showLoader = false;
            },
            function(response){
              $scope.setNotification  = {
                type  : "danger", //ex : danger, warning, success, info
                message : "Koneksi tidak terhubung..."
              };
              Notification.setNotification($scope.setNotification);
              $scope.buttonDisabled = false;
              $scope.showLoader = false;
            });
        }
      });

  }
  //function build pdf
  $scope.buildPDF = function(){
      BuildPDF.build($scope.dataKapalCharter.dokCharter);
  }

}]);
