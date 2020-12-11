'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JadwalTambatCtrl
 * @description
 * # JadwalTambatCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .config(['calendarConfig', function(calendarConfig) {
  //calendarConfig.dateFormatter = 'moment';
  calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
  calendarConfig.showTimesOnWeekView = true;
}])
  .controller('JadwalTambatCtrl', ['$scope','$location','$filter','$timeout','$route','$modal','LoadingScreen','Notification','GrupTambatList','JamKerjaTambatList','PetugasTambatList','JadwalTambatMappingList','JadwalTambatMappingAdd','JadwalTambatMappingEdit','JadwalTambatMappingDelete','MdmDermagaSearch','MdmDermagaSearchByKode','JadwalTambatPerPetugasAdd','JadwalTambatAdd','JadwalTambatEdit','JadwalTambatDelete','JadwalTambatPerBulan','moment','calendarConfig', function($scope,$location, $filter, $timeout,$route,$modal,LoadingScreen,Notification,GrupTambatList,JamKerjaTambatList,PetugasTambatList,JadwalTambatMappingList,JadwalTambatMappingAdd,JadwalTambatMappingEdit,JadwalTambatMappingDelete,MdmDermagaSearch,MdmDermagaSearchByKode,JadwalTambatPerPetugasAdd,JadwalTambatAdd,JadwalTambatEdit,JadwalTambatDelete,JadwalTambatPerBulan,moment, calendarConfig) {
    $scope.petugas = {};
    $scope.grupTambat = {};
    $scope.jadwalTambat = {};
    $scope.events = [];
    $scope.calendarView = 'month';
    $scope.cellIsOpen = false;
    $scope.openCalendar = false;
    $scope.viewDate = new Date();

    var tglAkhir, tglMulai, checkJamMulai;

    var actions = [/*{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(event) {
        $("#modalEditJadwal").modal();
        $scope.selectedEvent = event.calendarEvent;
      }
    }, */{
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(events) {
        $("#modalHapusJadwal").modal();
        $scope.selectedEvent = events.calendarEvent;
      }
    }];

    moment.locale('id', {
      week : {
        dow : 1 //Hari senin jadi hari pertama di kalender
      }
    });


    $scope.loadEvent= function(periode) {
      $scope.events = [];
      LoadingScreen.show();
      JadwalTambatPerBulan.get({blnThn:$filter('date')(periode,'yyyy-MM')},function(response) {
        $scope.createEventArray(response.content,  $scope.jadwalTambat.idGroupPetugasTambat);
      });
      LoadingScreen.hide();
    };

    $scope.eventClicked = function(event) {
      $scope.cellIsOpen = true;
    };

    $scope.closeCalendar = function() {
      $scope.openCalendar = false;
    };

    $scope.$watch('viewDate',function(newValue){
      $scope.loadEvent(newValue);
    });

    $scope.timespanClicked = function(date) {
        $scope.lastDateClicked = $filter('date')(date,'dd-MM-yyyy');
        $("#modalTambahJadwal").modal();
    };

    $scope.tampilanTahun = function() {
      LoadingScreen.show();
      $scope.calendarView = 'year';
      $scope.cellIsOpen = false;
      LoadingScreen.hide();
    };

    $scope.tampilanBulan = function() {
      LoadingScreen.show();
      $scope.calendarView = 'month';
      $scope.cellIsOpen = false;
      LoadingScreen.hide();
    };

    $scope.tampilanMinggu = function() {
      LoadingScreen.show();
      $scope.calendarView = 'week';
      $scope.cellIsOpen = false;
      LoadingScreen.hide();
    };

    // get list dermaga
    $scope.getListOfDermaga = function(value) {
      if (value && value.length <=3) {
        return new Promise(function(resolve) {
          MdmDermagaSearchByKode.get({
            kode: value,
            kodeTerminal: localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
            //console.log(response);
          });
        });
      } else if (value.length > 3 ){
        return new Promise(function(resolve) {
          MdmDermagaSearch.get({
            nama: value,
            kodeTerminal: localStorage.getItem('kodeTerminal'),
            limit: '10'
          },
           function(response) {
            resolve(response);
              response.forEach(function (response) {
                  response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
              });
            //console.log(response);
          });
        });
      }
    };

    /* validasi autocomplete */
    var valueField = '';
    $scope.checkValue = function(value){
      valueField = value;
    };

    $scope.validationLookupDermaga= function(){
      if(valueField !== $scope.dermaga){
        if(typeof $scope.dermaga !== 'object'){
          $scope.setNotification  = {
            type  : 'warning',
            message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
          };
          Notification.setNotification($scope.setNotification);
          $scope.jadwalTambat.dermaga='';
        }
      }
    };
    /*end validasi autocomplete*/


    PetugasTambatList.get(function(response) {
      $scope.petugas = response.content;
    });

    JamKerjaTambatList.get(function(response){
      LoadingScreen.show();
      $scope.shiftKerja = response.content;
      $scope.shiftKerja.forEach(function(data) {
        data.labelJam = data.kodeShift +' (' + moment(data.jamMulai, "HH:mm:ss").format("HH:mm") + ' - ' + moment(data.jamAkhir, "HH:mm:ss").format("HH:mm") + ')';
      });
      LoadingScreen.hide();
    });

    $timeout( function(){
      GrupTambatList.get(function(response) {
        $scope.grupTambat = $filter('orderBy')(response.content,'nama');
        $scope.grupTambat.forEach(function(data) {
          data.petugas = [];
          $scope.petugas.forEach(function(element) {
             if (element.idGroupPetugasTambat === data.id) {
               data.petugas.push(element);
             }
          });
        });
        LoadingScreen.hide();
      });
     }, 500 );

     $scope.tampilanJadwal = function(data) {
       $scope.jadwalTambat.namaGroupPetugasTambat = data.nama;
       $scope.jadwalTambat.idGroupPetugasTambat = data.id;
       $scope.jadwalTambat.kodeCabang = data.kodeCabang;
       $scope.openCalendar = true;
       $scope.loadEvent($scope.viewDate);
     };

     $scope.tampilanJadwalPetugas = function(data) {
       LoadingScreen.show();
       $scope.petugasTambat = data;
       $scope.petugasTambat.idPetugasTambat = data.id;
       $scope.openCalendar = true;
       LoadingScreen.hide();
     };

     $scope.createEventArray = function(data, idGroup){
       data.forEach(function(element) {
         if (element.idGroupPetugasTambat === idGroup){
           $scope.events.push({
               id: element.id,
               idGroup: element.idGroupPetugasTambat,
               idJamKerjaTambat: element.idJamKerjaTambat,
               title: 'Shift',
               color: calendarConfig.colorTypes.info,
               startsAt: moment(element.jamMulai),
               endsAt: moment(element.jamAkhir),
               draggable: true,
               resizable: true,
               actions: actions
           });
         }
       });
     };

     $scope.setTanggalMulai = function(date,shift){
       tglMulai = moment(date,'DD-MM-YYYY').format('YYYY-MM-DDT');
       checkJamMulai = moment(shift.jamAkhir,'hh:mm:ss').diff(moment(shift.jamMulai,'hh:mm:ss'));
     };

     $scope.setTanggalAkhir = function(date) {
       if (checkJamMulai >= 0) {
         tglAkhir = tglMulai;
       } else {
         tglAkhir = moment(date,'DD-MM-YYYY').addadd('days', 1).format('YYYY-MM-DDT');
       }
     };

     $scope.setJadwalTambat = function(item, date, shift) {
       item.tglMulai = moment(date,'DD-MM-YYYY').format('YYYY-MM-DDT00:00:00');
       item.jamMulai =  tglMulai.toString()+shift.jamMulai;
       item.jamAkhir =  tglAkhir.toString()+shift.jamAkhir;
       item.idJamKerjaTambat = shift.id;
     };

     $scope.saveJadwalTambat = function(item) {
       JadwalTambatAdd.save(item,  function(response){
           $scope.setNotification  = {
             type  : "success", //ex : danger, warning, success, info
             message : "Data berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $location.path('/manajementambat/jadwaltambat');
           $scope.loadEvent($scope.viewDate);
         },
         function(response){
           $scope.setNotification  = {
             type  : "warning", //ex : danger, warning, success, info
             message : "Data tidak berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $scope.buttonDisabled = false;
           $scope.showLoader = false;
         });
     };

     $scope.editJadwalTambat = function(idJadwal,item) {
       JadwalTambatEdit.update({id:idJadwal},item, function(response){
           $scope.setNotification  = {
             type  : "success", //ex : danger, warning, success, info
             message : "Data berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $location.path('/manajementambat/jadwaltambat');
           $scope.loadEvent($scope.viewDate);
         },
         function(response){
           $scope.setNotification  = {
             type  : "warning", //ex : danger, warning, success, info
             message : "Data tidak berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $scope.buttonDisabled = false;
           $scope.showLoader = false;
         });
     };

     $scope.deleteJadwalTambat= function() {
       var idJadwalTambat = $scope.selectedEvent.idGroup+'_'+moment($scope.selectedEvent.startsAt,"YYYY-MM-DD").format("YYYY-MM-DD");
       if(idJadwalTambat !== null){
        JadwalTambatDelete.delete({id:idJadwalTambat},function(response){
           if(response.$resolved){
             $scope.setNotification  = {
               type	: "success",
               message	: "Data berhasil dihapus"
             };
           }else{
             $scope.setNotification  = {
               type	: "warning",
               message	: "Data tidak berhasil dihapus"
             };
           }
           $scope.events = [];
           $location.path('/manajementambat/jadwaltambat');
           $scope.loadEvent($scope.viewDate);
           Notification.setNotification($scope.setNotification);
         });
       }
     };

     $scope.submit = function() {
       $scope.setTanggalMulai($scope.lastDateClicked, $scope.shift);
       $scope.setTanggalAkhir($scope.lastDateClicked);
       $scope.setJadwalTambat($scope.jadwalTambat,$scope.lastDateClicked, $scope.shift);
       $scope.saveJadwalTambat($scope.jadwalTambat);
     };

     $scope.update = function() {
       $scope.setTanggalMulai($scope.lastDateClicked, $scope.shift);
       $scope.setTanggalAkhir($scope.lastDateClicked);
       $scope.setJadwalTambat($scope.jadwalTambat,$scope.lastDateClicked, $scope.shift);
       $scope.jadwalTambat.id = $scope.selectedEvent.id;
       console.log($scope.jadwalTambat);
       //$scope.editJadwalTambat($scope.selectedEvent.id,$scope.jadwalTambat);
     };


     /* CRUD jadwal per petugas */

     $scope.setJadwalTambatPetugas = function(item, petugas, date, shift, dermaga){
       item.idGroupPetugasTambat = petugas.idGroupPetugasTambat;
       item.namaGroupPetugasTambat = petugas.namaGroupPetugasTambat;
       item.tglMulai = moment(date,'DD-MM-YYYY').format('YYYY-MM-DDT00:00:00');
       item.jamMulai =  tglMulai.toString()+shift.jamMulai;
       item.jamAkhir =  tglAkhir.toString()+shift.jamAkhir;
       item.idJamKerjaTambat = $scope.shift.id;
       item.kodeCabang = localStorage.getItem('kodeCabang').toString();
       item.kodeCabang = item.kodeCabang.length < 2 ? '0' +	item.kodeCabang : item.kodeCabang;
       item.kodeDermaga = dermaga.mdmgKode;
       item.namaDermaga = dermaga.mdmgNama;
     };

     $scope.saveJadwalTambatPerPetugas = function(petugas, item) {
       JadwalTambatPerPetugasAdd.save({idPetugas:petugas.idPetugasTambat}, item,  function(response){
           $scope.setNotification  = {
             type  : "success", //ex : danger, warning, success, info
             message : "Data berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $location.path('/manajementambat/jadwaltambat');
         },
         function(response){
           $scope.setNotification  = {
             type  : "warning", //ex : danger, warning, success, info
             message : "Data tidak berhasil tersimpan"
           };
           Notification.setNotification($scope.setNotification);
           $scope.buttonDisabled = false;
           $scope.showLoader = false;
         });
     };

     $scope.submitPerPetugas = function() {
       $scope.setTanggalMulai($scope.lastDateClicked, $scope.shift, $scope.lastDateClicked, $scope.dermaga);
       $scope.setTanggalAkhir($scope.lastDateClicked);
       $scope.setJadwalTambatPetugas($scope.jadwalTambat, $scope.petugasTambat, $scope.shift,$scope.dermaga);
       $scope.saveJadwalTambatPerPetugas($scope.petugasTambat, $scope.jadwalTambat);
     };

/* CRUD jadwal per petugas end*/

  }]);
