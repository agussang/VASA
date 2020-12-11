'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiKapalKegiatanTetapCrudCtrl
 * @description
 * # TransaksiKapalKegiatanTetapCrudCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('TransaksiKapalKegiatanTetapCrudCtrl',['$scope','$filter','MdmDermagaPerJasa','Notification','LoadingScreen','KapalKegiatanTetapBill','KapalKegiatanTetapBillCheck','KapalKegiatanTetapBillDelete','KapalKegiatanTetapBillProcess','$timeout','$location','MdmDermagaSearchByKode','MdmPelabuhanSearch','KapalKegiatanTetapCheckbyPeriode',function($scope,$filter,MdmDermagaPerJasa,Notification,LoadingScreen,KapalKegiatanTetapBill,KapalKegiatanTetapBillCheck,KapalKegiatanTetapBillDelete,KapalKegiatanTetapBillProcess,$timeout,$location, MdmDermagaSearchByKode,MdmPelabuhanSearch,KapalKegiatanTetapCheckbyPeriode){
	LoadingScreen.show();
  $scope.showLoading = false;
  $scope.showDaftarKapal = false;
  $scope.isSelected = false;

  $scope.items = [];
  $scope.listId = [];
  $scope.kapaltetap = {};
  $scope.checkbox = {};

  $scope.optionsMonths = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true,
    	minViewMode: "months",
    	maxViewMode: "months"
	};

  $scope.optionsYears = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true,
    	minViewMode: "years",
    	maxViewMode: "years"
	};

  $scope.periodeBulan = new Date();
  $scope.periodeTahun = new Date();

	LoadingScreen.hide();

  $scope.showToolTip = function(kapal) {
    $scope.keterangan = "Kapal "+ kapal +" tidak memiliki Data Bendera";
  };

	$scope.getListOfLokasiLabuh = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaPerJasa.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    }
	};

	$scope.getListOfDermagaTambat = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
                response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaPerJasa.get({
          nama: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function (response) {
              response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    }
	};

  $scope.getListOfPelabuhan = function(value) {
    if (value) {
      return new Promise(function(resolve, reject) {
        MdmPelabuhanSearch.get({
          nama: value,
          limit: '10'
        }, function(response) {
          resolve(response);
          response.forEach(function (response) {
            response.mkplNamaPlb = response.mplbNama +' ('+response.mplbKode+')';
          });
        });
      });
    }
  };

  $scope.validationLookupPelabuhan = function(){
    if(valueField !== $scope.kapaltetap.namaPelabuhan){
      if(typeof $scope.kapaltetap.namaPelabuhan != 'object'){
        $scope.setNotification  = {
          type	: 'warning',
          message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b><br><br>Kode validasi: <b>VALPMH-002</b>'
        };
        Notification.setNotification($scope.setNotification);
        $scope.kapaltetap.namaPelabuhan = '';
      }
    }
  }


	var valueField = '';
	$scope.checkValue = function(value){
		valueField = value;
	};

	$scope.validationLookupLokasiLabuh = function(){
		if(valueField !== $scope.kapaltetap.lokasiLabuh){
			if(typeof $scope.kapaltetap.lokasiLabuh != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALOTH-001</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.kapaltetap.lokasiLabuh = '';
			}
		}
	};

	$scope.validationLookupLokasiTambat = function(){
		if(valueField !== $scope.kapaltetap.lokasiTambat){
			if(typeof $scope.kapaltetap.lokasiTambat != 'object'){
				$scope.setNotification  = {
					type	: 'warning',
					message	: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>.<br><br>Kode validasi : <b>VALOTH-002</b>'
				};
				Notification.setNotification($scope.setNotification);
				$scope.kapaltetap.lokasiTambat = '';
			}
		}
	};

    $scope.tampilkanKapal = function(){
      LoadingScreen.hide();
      $scope.showDaftarKapal = false;
      $scope.billedItemList = [];
      KapalKegiatanTetapCheckbyPeriode.get(
        {
          periodeTahun : parseInt($filter('date')($scope.periodeTahun,'yyyy')),
          periodeBulan : parseInt($filter('date')($scope.periodeBulan,'MM'))
        },function (response) {
          $scope.items = response;
          ////console.log($scope.items);
          if ($scope.items.length === 0) {
            $scope.setNotification  = {
              type	: 'warning',
              message	: 'Tidak terdapat data kapal kegiatan tetap atau kapal masih mempunyai layanan aktif'
            };
            Notification.setNotification($scope.setNotification);
          } else {
            KapalKegiatanTetapBillCheck.get({
              periodeTahun : parseInt($filter('date')($scope.periodeTahun,'yyyy')),
              periodeBulan : parseInt($filter('date')($scope.periodeBulan,'MM'))
            },function(data) {
                 $scope.bill = data;
                 $scope.bill.forEach(function(response){
                   response.items.forEach(function(element){
                        if (element.noPpk1 !== null) {
                          $scope.billedItemList.push(element.kodeKapal);
                        }
                   });
                 });
                  $timeout(function() {
                      $scope.items.forEach(function(element) {
                    if ($scope.billedItemList.includes(element.kode)) {
                      element.hideItem = true;
                    } else {
                      element.hideItem = false;
                    }
                })
                $scope.showDaftarKapal = true;
                LoadingScreen.hide();
                var itemCount = 0;
                $scope.items.forEach(function(element) {

                  if (element.hideItem === true) {
                    itemCount++;

                  } //console.log(itemCount);
                  if (itemCount === $scope.items.length) {
                    $scope.setNotification  = {
                      type	: 'warning',
                      message	: 'Semua tagihan kapal kegiatan tetap periode ini telah dicetak'
                    };
                    Notification.setNotification($scope.setNotification);
                  }
                });
                //////console.log(billedItemList);
                }, 500);

            });
          }
      });



    };

    $scope.$watch('checkbox', function(newValue) {
      $scope.items.forEach(function(element) {
        if (element.benderaText != null) {
            element.checked = newValue;
        }
      });
      $scope.getSelectedState();
    });

    $scope.getSelectedState = function() {
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].checked == true) {
          $scope.isSelected = true;
          break;
        } else {
          $scope.isSelected = false;
        }
      }
    };

    $scope.hitungTagihan = function () {
      $scope.listId = [];
      $scope.items.forEach(function(element) {
        if(element.checked == true){
          $scope.listId.push(element.id);
        }
      });

      var data = {
        periodeBulan : $filter('date')($scope.periodeBulan,'MM'),
        periodeTahun : $filter('date')($scope.periodeTahun,'yyyy'),
        namaLokasiLabuh : $scope.kapaltetap.lokasiLabuh.mdmgNama,
        kodeLokasiLabuh : $scope.kapaltetap.lokasiLabuh.mdmgKode,
        namaLokasiTambat : $scope.kapaltetap.lokasiTambat.mdmgNama,
        kodeLokasiTambat : $scope.kapaltetap.lokasiTambat.mdmgKode,
        namaPelabuhan : $scope.kapaltetap.pelabuhan.mplbNama,
        kodePelabuhan : $scope.kapaltetap.pelabuhan.mplbKode,
        listIdKapalKegiatanTetap : $scope.listId
      };

      if ($scope.listId.length == 0) {
        $scope.setNotification  = {
          type	: 'warning',
          message	: 'Pilih minimal satu kapal kegiatan tetap'
        };
      } else {
        //console.log(data);
        KapalKegiatanTetapBill.save(data,function(response){
          ////console.log(response);
          $scope.itemsBill = response.items;
          if($scope.itemsBill.length == 0) {
            $scope.setNotification  = {
    					type	: 'warning',
    					message	: 'Tidak terdapat data kapal kegiatan tetap'
    				};
    				Notification.setNotification($scope.setNotification);
            KapalKegiatanTetapBillDelete.delete({ id: response.id },function(){
              $scope.showLoading = false;
            });
          } else {
            var adaLayananAktif = false;
            $scope.itemsBill.forEach(function(item){
              if(item.flagLayananAktif) {
                  adaLayananAktif = true;
              }
            });

            if(adaLayananAktif) {
              $scope.setNotification  = {
      					type	: 'danger',
      					message	: 'Terdapat kapal dengan layanan aktif.<br><br>Kode validasi : <b>VALOTH-003</b>'
      				};
              Notification.setNotification($scope.setNotification);
              KapalKegiatanTetapBillDelete.delete({ id: response.id },function(){
                $scope.showLoading = false;
              });
            } else {
              var ProcessBill = function(index){
                if($scope.itemsBill.length > index) {
                  var item = $scope.itemsBill[index];
                  //console.log($scope.itemsBill);
                  KapalKegiatanTetapBillProcess.save({ id: item.id, kodeTerminal:localStorage.getItem('kodeTerminal')  },{}, function(response2){
                    item.noPpk1 = response2.noPpk1;
                    ProcessBill(++index);
                  });
                } else {
                  $scope.showLoading = false;
                  $scope.setNotification  = {
          					type	: 'success',
          					message	: 'Kapal Kegiatan Tetap Berhasil Disimpan'
          				};
                  Notification.setNotification($scope.setNotification);
                  $location.path('/kapalkegiatantetap');
                }
              };
              ProcessBill(0);
            }
          }
        });
      }
    };


  $scope.back = function(){
    $location.path('/kapalkegiatantetap');
  }
 }]);
