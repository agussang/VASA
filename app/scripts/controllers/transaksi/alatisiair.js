'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:AlatIsiAirCtrl
 * @description
 * # AlatIsiAirCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('AlatIsiAirCtrl', ['$scope','$filter','$routeParams','$controller','AppParam','PermohonanDetail','PenetapanDetail','RealisasiTambat',function ($scope,$filter,$routeParams,$controller,AppParam,PermohonanDetail,PenetapanDetail,RealisasiPandu) {
  /*
  ** tab labuh
  */
  // extend controller di atasnya (penetapan new); untuk mengambil data permohonan, supaya tidak request berkali-kali
  //alert ('Cek tab jasa labuh controller');
  /* waktu tunda,lokasi asal tunda,  */
  angular.extend(this, $controller('RealisasiPermohonanCtrl', {$scope: $scope}));


  $scope.tempSelection = null;
  $scope.rightSelection = null;
  $scope.itemSelected = [];
  $scope.avoidClick = false;
  $scope.rightReadOnly = true;
  $scope.realisasitambat = {};

  $scope.$watch('dataUmum', function(newVal, oldVal){
    if($scope.tambatItems.length >0){
      $scope.items = JSON.parse(JSON.stringify($scope.tambatItems));

      $scope.config.selectedItems.push($scope.items[0]);
      $scope.tempSelection = $scope.items[0];
      console.log ($scope.tempSelection);
      $scope.tempSelection.jamBuat = $filter('date')($scope.tempSelection.tglBuat, 'HH:mm:ss');
      $scope.tempSelection.jamKapalGerak = $filter('date')($scope.tempSelection.jamKapalGerak, 'HH:mm:ss');
      $scope.tempSelection.jamNaik = $filter('date')($scope.tempSelection.jamNaik, 'HH:mm:ss');
      $scope.tempSelection.jamTurun = $filter('date')($scope.tempSelection.jamTurun, 'HH:mm:ss');
      $scope.tempSelection.jamMulaiPandu = $filter('date')($scope.tempSelection.jamMulaiPandu, 'HH:mm:ss');
      $scope.tempSelection.jamSelesaiPandu = $filter('date')($scope.tempSelection.tglSelesaiPandu, 'HH:mm:ss');
      $scope.tempSelection.tglBuat = $filter('date')($scope.tempSelection.tglBuat, 'yyyy-MM-dd');
      $scope.tempSelection.tglSelesaiPandu = $filter('date')($scope.tempSelection.tglSelesaiPandu, 'yyyy-MM-dd');
    }
  });

  var handleSelect = function (item, e) {
    $scope.tempSelection = item;
  };

  var handleSelectRight = function (item, e) {
    $scope.rightSelection = item;
  };

  var handleDblClickRight = function(item, e){
    $scope.rightReadOnly = false;
  }

  // untuk membandingkan scope yang akan di-push; identifier adalah properti dari item
  var isIncludeItem = function(array, item, identifier){
    var match = false;
    for(var i=0,len=array.length;i<len;i++){
      if(array[i][identifier]==item[identifier]){
        match = true;
      }
    }
    return match;
  };

  $scope.moveSelection = function(){

    if($scope.tempSelection != null){
      var match = isIncludeItem($scope.itemSelected, $scope.tempSelection, 'noPpkJasa');

      if(!match){
        $scope.avoidClick = true;
        var select = JSON.parse(JSON.stringify($scope.tempSelection));

        $scope.itemSelected.push(select);

        var idx = $scope.itemSelected.indexOf(select);
        $scope.configRight.selectedItems.push($scope.itemSelected[idx]);
        $scope.rightSelection = $scope.itemSelected[idx];
        console.log($scope.rightSelection);
        $scope.rightReadOnly = false;
      }
    }
  };

  $scope.savePandu= function(){
    // $scope.rightSelection = {};
    $scope.realisasipandu.noPpk1 = $scope.dataUmum.noPpk1;

    $scope.realisasipandu.noPpkJasa = $scope.tempSelection.noPpkJasa;

    $scope.realisasipandu.jamBuat = $scope.rightSelection.jamBuat;
    $scope.realisasipandu.kodeLokasiAsal = $scope.rightSelection.kodeLokasiAsal;
    $scope.realisasipandu.kodeLokasiTujuan = $scope.rightSelection.kodeLokasiTujuan;
    $scope.realisasipandu.jenisPanduOption = $scope.rightSelection.jenisPanduOption;
    $scope.realisasipandu.jenisGerakanOption = $scope.rightSelection.jenisGerakanOption;
    $scope.realisasipandu.apbs = $scope.rightSelection.apbs;
    $scope.realisasipandu.sikluspandu = $scope.rightSelection.sikluspandu;
    $scope.realisasipandu.kendala = $scope.rightSelection.kendala;
    $scope.realisasipandu.keteranganKep = $scope.rightSelection.keteranganKep;
    $scope.realisasipandu.kapalPandu = $scope.rightSelection.kapalPandu;
    $scope.realisasipandu.tglMulai = $scope.tempSelection.tglMulai;
    $scope.realisasipandu.jamMulai = $scope.tempSelection.jamMulai;
    $scope.realisasipandu.tglSelesai = $filter('date')($scope.rightSelection.tglSelesai, 'yyyy-MM-ddT00:00:00');
    $scope.realisasipandu.jamSelesai = $scope.rightSelection.jamSelesai;
    $scope.realisasipandu.jamNaik = $scope.tempSelection.jamNaik;
    $scope.realisasipandu.jamTurun = $scope.tempSelection.jamTurun;
    $scope.realisasipandu.jamKapalGerak = $scope.tempSelection.jamKapalGerak;

    $scope.configRight.selectedItems = [];
    $scope.avoidClick = false;
    $scope.rightReadOnly = true;

    RealisasiPandu.save($scope.realisasipandu,function(response){
      console.log(response);
    })
  };


  $scope.config = {
    selectItems: true,
    multiSelect: false,
    dblClick: false,
    selectionMatchProp: 'noPpkJasa',
    selectedItems: [],
    showSelectBox: false,
    onSelect: handleSelect,
  };

  $scope.configRight = {
    selectItems: true,
    multiSelect: false,
    dblClick: true,
    selectionMatchProp: 'noPpkJasa',
    selectedItems: [],
    showSelectBox: false,
    onSelect: handleSelectRight,
    onDblClick:handleDblClickRight,
  };


  // $scope.config.selectedItems.push($scope.items[0]);
  // $scope.tempSelection = $scope.items[0];
 }]);
