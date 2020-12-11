
'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:ComponentsHeaderCtrl
 * @description
 * # ComponentsHeaderCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
    .controller('ComponentsHeaderCtrl', ['$scope', '$rootScope', '$route', '$controller', 'Login', 'ListCabang', 'ListKawasan', 'MdmCabangSearch', 'Notification', 'UserRole', 'LoadingScreen', '$window', '$timeout', 'NotifikasiMsgList', 'NotifikasiMsgByType', 'NotifikasiMsgSetAsRead', 'NotifikasiMsgSetAsUnread', 'NotifikasiMsgListDetail', '$filter', 'MQTT_PATH', '$location', '$interval', 'AppParamValue', 'ValidationByAppParams', 'MasterCabangList', 'RoleByKode', function ($scope, $rootScope, $route, $controller, Login, ListCabang, ListKawasan, MdmCabangSearch, Notification, UserRole, LoadingScreen, $window, $timeout, NotifikasiMsgList, NotifikasiMsgByType, NotifikasiMsgSetAsRead, NotifikasiMsgSetAsUnread, NotifikasiMsgListDetail, $filter, MQTT_PATH, $location, $interval, AppParamValue, ValidationByAppParams, MasterCabangList,RoleByKode) {
   UserRole.checkMenu();

   angular.extend(this, $controller('MqttCtrl', {$scope: $scope})); 
   $scope.currentCabang = $rootScope.namaCabang;
   //$rootScope.isPusat = localStorage.getItem('isPusat');
   $scope.confirm = {};

   $scope.listCabang = [];
   $scope.listKawasan = {};
   $scope.isKawasan = {};
   $rootScope.liClasShowDrawer = "";
   $scope.notify = {};
   $rootScope.modalSearch = {};
   $rootScope.contentNotifikasi = [];
   $scope.actionsText = "";
   $scope.notify.status = "hide";
   $scope.hideDrawer = true;
   var namaCabang = localStorage.getItem('namaCabang');
   var kodeCabang = localStorage.getItem('kodeCabang');

   //add by cahyo for changing terminal in 11/02/2018
   $scope.currentTerminal = $rootScope.namaTerminal;
   $scope.listTerminal = [];
   $scope.masterCabangDetail;
   
       console.log($rootScope.namaTerminal);
   // $scope.inRegional = true;
   //end adding by cahyo

   /*Pagging*/
   $scope.currentPage = 1;
   $scope.pageSize = 10;
   $scope.totalItems = 0;
   $scope.totalPages = 0;
   $scope.sortBy = '';
   $scope.sortDesc = false;
   $scope.items=[];

   /*$scope.option = [];
   $scope.option.value = $scope.options.filter[0].value;*/

  var namaCabang  = localStorage.getItem('namaCabang');
  var kodeCabang  = localStorage.getItem('kodeCabang');
  
  if(localStorage.getItem('viewonly')){
     $rootScope.viewOnly = localStorage.getItem('viewonly');
  }

  if(localStorage.token && $location.path().indexOf("vasapublic") < 0){
    ListCabang.get(
    function(response){
      if (response[0] !== undefined) {

        var index = response.findIndex(function (cabang) {
            return cabang.namaPelb == namaCabang;
        });

        if (index >= 0) {
          //console.log(response[index]);
          if (response[index].kodeCabangInduk == 0){
            $scope.isKawasan = false;
          } else {
            $scope.isKawasan = true;
          }
        }
      }
    });

    MdmCabangSearch.get({nama:namaCabang},
      function(response){
        if (response.kodeCabangInduk == 0){
          $scope.isKawasan = false;
        } else {
          $scope.isKawasan = true;
        }
      }
    );
  }

  $scope.$watch('isPusat', function() {
    if($scope.isPusat != false && localStorage.token){
      ListCabang.get(function(response){
        $scope.listCabang = response;
      });
    }
  });

  $scope.getListOfKawasan = function() {
        ListKawasan.get({
          kodeCabang: localStorage.getItem('kodeCabang')
        },
         function(response) {
          $scope.listKawasan = response;
          if ($scope.listKawasan[0] == undefined) {
            $scope.hasKawasan = false;
          } else {
            $scope.hasKawasan = true;
          }
        });

    };
  
  //add by cahyo for list terminal
  $scope.getListTerminal = function() {
     if (localStorage.getItem('isPusat') == 'true'){
        MasterCabangList.get(
           {
            size : 1000
           }, function (response) {
              var item = JSON.parse(JSON.stringify(response));
              $scope.listTerminal = item.content;

              if ($scope.listTerminal[0] == undefined) {
                 $scope.hasTerminal = false;

              } else {
                 $scope.hasTerminal = true;
              }
              //rewrite kode terminal to old kode terminal
              //kodeTerminal = parseInt(item.content[0].kodeKawasan);
              //localStorage.setItem('kodeTerminal', kodeTerminal);
              //console.log(item.content[0].kodeKawasan);
           });
     } else {
        MasterCabangList.get(
           {
              kodeRegional: localStorage.getItem('kodeRegional')
           }, function (response) {
              var item = JSON.parse(JSON.stringify(response));
              $scope.listTerminal = item.content;

              if ($scope.listTerminal[0] == undefined) {
                 $scope.hasTerminal = false;

              } else {
                 $scope.hasTerminal = true;
              }
              //rewrite kode terminal to old kode terminal
              //kodeTerminal = parseInt(item.content[0].kodeKawasan);
              //localStorage.setItem('kodeTerminal', kodeTerminal);
              //console.log(item.content[0].kodeKawasan);
           });
     }
     
							//end of add
  }

  $scope.switchCabang = function(){
    // set cabang
    var kodeCabang = $scope.currentCabang;
    $scope.confirm.username = localStorage.username;
    for(var i=0;i<$scope.listCabang.length;i++){
      if($scope.listCabang[i].kodeTerminal == kodeCabang){
        $scope.currentNamaCabang = $scope.listCabang[i].namaTerminal;
        break;
      }
    }
  };

  //add by cahyo
       $scope.switchTerminal = function () {
          $scope.confirm.username = localStorage.username;
          $scope.currentNamaCabang = $scope.masterCabangDetail.namaCabang;
          $scope.currentCabang = $scope.masterCabangDetail.kodeCabang;
          $scope.currentTerminal = $scope.masterCabangDetail.kodeKawasan;
          $scope.currentNamaTerminal = $scope.masterCabangDetail.namaKawasan;
          $scope.currentTerminalNew = $scope.masterCabangDetail.kodeTerminal;
          $scope.currentNamaTerminalNew = $scope.masterCabangDetail.namaTerminal;
       };
   //end of add

  $scope.switchKawasan = function(){
    // set kawasan
    var kodeKawasan = $scope.currentCabang;
    $scope.confirm.username = localStorage.username;
    for(var i=0;i<$scope.listKawasan.length;i++){
      if($scope.listKawasan[i].kodeTerminal == kodeKawasan){
        $scope.currentNamaCabang = $scope.listKawasan[i].namaTerminal;
        break;
      }
   };
  };

  $scope.authSwitch = function(){
    if($scope.confirm.username && $scope.confirm.password){
      Login.save({username:$scope.confirm.username, password:$scope.confirm.password, kodeCabang:$scope.currentCabang},function(response){
        if(response.responType == 'S'){
          $scope.modalDismiss = 'modal';
          if($scope.currentCabang!=1){
            localStorage.setItem('isPusat', false);
          }
          var kodeTerminal = parseInt(response.kdterminal);
          if(kodeTerminal == 0){
            kodeTerminal = response.kdCabang;
          }
          localStorage.setItem('kodeCabang', $scope.currentCabang);
          localStorage.setItem('namaCabang', $scope.currentNamaCabang);
          localStorage.setItem('kodeTerminal',kodeTerminal);
          ValidationByAppParams.setItem(kodeTerminal);
          RoleByKode.get({kodeRole:response.hakakses},function(response2){ console.log('1');
            if(response2.idRole) {
              localStorage.setItem('userRole',JSON.stringify(response2));
              localStorage.setItem('idRole',response2.idRole);
            }
          })
          //untuk menentukan berlakunya validasi wajib pandu tunda
          AppParamValue.get({
              nama: 'WAJIB_PANDU_TUNDA',
              value: String(kodeTerminal)
          }, function(response) {
              var hasWajibPandu = 0;
              if(response.length>0){
                if(response[0].isNumeric){
                  hasWajibPandu = 1;
                }
              }
              localStorage.setItem('validasiWajibPanduTunda', hasWajibPandu);
          });
          UserRole.checkMenu();
          $timeout(function () {
            location.reload();
          },3000)
          
        }
        else{
          $scope.modalDismiss = '';
          $scope.notify.type = 'danger';
          $scope.notify.message = response.responText;
          $scope.notify.status = 'show';
          $timeout(function () {
            $scope.notify.status = "hide";
          }, 5000);
        }
      });
    }
    else{
      $scope.notify.type = 'danger';
      $scope.notify.message = 'NIPP dan Password tidak boleh kosong!';
      $scope.notify.status = 'show';
      $timeout(function () {
        $scope.notify.status = "hide";
      }, 5000);
    }
  };

  $scope.authSwitchTerminal = function () {
      if ($scope.confirm.username && $scope.confirm.password) {
         Login.save({ username: $scope.confirm.username, password: $scope.confirm.password, kodeCabang: $scope.currentCabang, kodeTerminal: $scope.currentTerminalNew }, function (response) {
              if (response.responType == 'S') {
                 $scope.modalDismiss = 'modal';
                   if ($scope.currentCabang != 1) {
                      localStorage.setItem('isPusat', false);
                   }
                   var kodeTerminal = parseInt($scope.currentTerminal);
                   if (kodeTerminal == 0) {
                      kodeTerminal = response.kdCabang;
                   }
                 localStorage.setItem('kodeCabang', parseInt($scope.currentCabang));
                   localStorage.setItem('namaCabang', $scope.currentNamaCabang);
                   localStorage.setItem('kodeTerminal', kodeTerminal);
                   localStorage.setItem('namaTerminal', $scope.currentNamaTerminalNew);
                 localStorage.setItem('inTerminal', true);
                 localStorage.setItem('kodeTerminalBaru', parseInt($scope.currentTerminalNew));
                   ValidationByAppParams.setItem(kodeTerminal);
                   RoleByKode.get({ kodeRole: response.hakakses }, function (response2) {
                      console.log('1');
                      if (response2.idRole) {
                         localStorage.setItem('userRole', JSON.stringify(response2));
                         localStorage.setItem('idRole', response2.idRole);
                      }
                   })
                   //untuk menentukan berlakunya validasi wajib pandu tunda
                   AppParamValue.get({
                      nama: 'WAJIB_PANDU_TUNDA',
                      value: String(kodeTerminal)
                   }, function (response) {
                      var hasWajibPandu = 0;
                      if (response.length > 0) {
                         if (response[0].isNumeric) {
                            hasWajibPandu = 1;
                         }
                      }
                      localStorage.setItem('validasiWajibPanduTunda', hasWajibPandu);
                   });
                   UserRole.checkMenu();
                   $timeout(function () {
                      location.reload();
                   }, 3000)

                }
                else {
                   $scope.modalDismiss = '';
                   $scope.notify.type = 'danger';
                   $scope.notify.message = response.responText;
                   $scope.notify.status = 'show';
                   $timeout(function () {
                      $scope.notify.status = "hide";
                   }, 5000);
                }
             });
          }
          else {
             $scope.notify.type = 'danger';
             $scope.notify.message = 'NIPP dan Password tidak boleh kosong!';
             $scope.notify.status = 'show';
             $timeout(function () {
                $scope.notify.status = "hide";
             }, 5000);
          }
       };

   $scope.setItemMessage = function(item){
      var
         flagRead,
         flagStatus,
         textDate,
         today =  $filter('date')(new Date(),'dd'),
         tglNotif = $filter('date')(item.created,'dd'),
         hours = $filter('date')(item.created,'HH'),
         currentHours = $filter('date')(new Date(),'HH');

      if (item.isRead===0){
         flagRead = true;
         flagStatus = 'warning';
      } else{
         flagRead = false;
         flagStatus = 'ok';
      }

      if(today-tglNotif == 0){
         var hours1 = currentHours-hours;  
         if(hours1<12){
            textDate = '1';
         }else{
            textDate = "Hari Ini | "+$filter('date')(item.created,'HH:mm');
         } 
      }else if (today-tglNotif == 1) {
         textDate = "Kemarin"+" | "+$filter('date')(item.created,'HH:mm');
      }else {
         textDate = item.createdDayText +" | "+ $filter('date')(item.created,'HH:mm');
      }

      var msg = {
         unread   : flagRead,
         status   : flagStatus,
         actions  : menuActions,
         textdate : textDate,
         message  : item.notifMsg,
         created  : $filter('date')(item.created,'yyyy-MM-dd HH:mm:ss'),
         urlMsg   : item.notifUrl?item.notifUrl:'0',
         cursor   : item.notifUrl?'cursor-pointer':'',
         idMsg    : item.id
      };

      return msg;
   }

   $scope.setTextDay = function(date){
        var day;
        switch (new Date(date).getDay()) {
            case 0:
                day = "Minggu";
                break;
            case 1:
                day = "Senin";
                break;
            case 2:
                day = "Selasa";
                break;
            case 3:
                day = "Rabu";
                break;
            case 4:
                day = "Kamis";
                break;
            case 5:
                day = "Jumat";
                break;
            case 6:
                day = "Sabtu";
        }
        return day;
   };

   $scope.getNotificationMessage = function(group,loadMore){
      var
         itemRole = JSON.parse(localStorage.userRole),
         limit = 3,
         limitNotif = loadMore?group.notifications.length+limit:limit;

      if(group.heading === "Transaksi"){
         group.notifications = [];
         $scope.groups[0].notifications = [];

         NotifikasiMsgListDetail.get({
            kodeRoleReceiver : itemRole.kodeRole,
            kodeCabangReceiver : itemRole.kodeCabang,
            size : limitNotif,
            sort : "created,desc"
         },function(response){
            $scope.showLoader = false;
            var item = response.content;
            for(var i=0;i<item.length;i++){
               item[i].createdDayText = $scope.setTextDay(item[i].created);
               var msg = $scope.setItemMessage(item[i]);
               if(loadMore){
                  group.notifications.push(msg);
               }else{
                  $scope.groups[0].notifications.push(msg);
               }
               $('.js-load').append(group.notifications);
            }
         });
      } else if(group.heading === "Eskalasi") {
         group.notifications = [];
         $scope.groups[1].notifications = [];

         NotifikasiMsgListDetail.get({
            username : localStorage.getItem('username'),
            size : limitNotif,
            idNotifType : 3,
            sort : "created,desc"
         },function(response){
            $scope.showLoader = false;
            var item = response.content;
            for(var i=0;i<item.length;i++){
               item[i].notifMsg = item[i].notifMsg+' ('+ $filter('date')(item[i].created,'dd-MM-yyyy')+') ';
               item[i].createdDayText = $scope.setTextDay(item[i].created);
               var msg = $scope.setItemMessage(item[i]);
               if(loadMore){
                  group.notifications.push(msg);
               }else{
                  $scope.groups[1].notifications.push(msg);
               }
               $('.js-load').append(group.notifications);
            }
         });
      }
   }

   $scope.getDataSubscribe = function(isReset){
      var
         itemRole = JSON.parse(localStorage.userRole),
         totalNotifTransaksi = 0,
         totalNotifEskalasi = 0;

      /* untuk menentukan total badge transaksi */
      if(itemRole.flagNotifPenetapan || itemRole.flagNotifRealisasi){
         NotifikasiMsgListDetail.get({
            kodeRoleReceiver : itemRole.kodeRole,
            kodeCabangReceiver : itemRole.kodeCabang,
            sort : "created,desc",
            size : 99999,
            isRead : 0
         },function(response){
            $scope.groups[0].totalNotif = response.content.length;
            $scope.groups[0].subHeading = response.content.length +" Notifikasi Baru";
            if(!isReset){
               $scope.getNotificationMessage($scope.groups[0]);
            }
         });
      }

      /* untuk menentukan total badge eskalasi */
      if(itemRole.flagNotifEskalasi){
         NotifikasiMsgListDetail.get({
            username : localStorage.getItem('username'),
            sort : "created,desc",
            idNotifType : 3,
            size : 99999,
            isRead : 0
         },function(response){
            $scope.groups[1].totalNotif = response.content.length;
            $scope.groups[1].subHeading = response.content.length +" Notifikasi Baru";
            if(!isReset){
               $scope.getNotificationMessage($scope.groups[1]);
            }
         });
      }
   }

   $scope.resetSearchNotifikasi = function(){
      $rootScope.modalSearch.searchNotifikasi = "";
   }

   
   function toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
   }

   $scope.toggleShowDrawer = function () {
      $scope.hideDrawer = !$scope.hideDrawer;
      if($rootScope.liClasShowDrawer===""){
         $rootScope.liClasShowDrawer = "open";
         if (document.querySelector("#subheading-include > div > div.drawer-pf-title.ng-scope > h3").innerHTML="<marquee>server notifikasi gangguan sementara</marquee>"){
            document.querySelector("#subheading-include > div > div.drawer-pf-title.ng-scope > h3").innerHTML="Notifikasi";
            //client.connect({onSuccess:onConnect});
         }
      }else {
         $rootScope.liClasShowDrawer = "";
      }
   };

   var menuActions = [
      {
         name: 'Action',
         title: 'Perform an action'
      },
      {
         name: 'Disabled Action',
         title: 'Unavailable action',
         isDisabled: true
      }
   ];

   $scope.groups = [
      {
         heading: "Transaksi",
         subHeading: "0 Notifikasi Baru",
         notifications: [],
         isLoading: false,
         isShow: false,
         isLoadMore: true
      },
      {
         heading: "Eskalasi",
         subHeading: "0 Notifikasi Baru",
         notifications: [],
         isLoading: false,
         isShow: false,
         isLoadMore: true
      },{
         heading: "Test Notifikasi",
         subHeading: "",
         notifications: [],
         isLoading: false,
         isShow: false,
         isLoadMore: false
      }
   ];

   $scope.Hidedrawer=  function () {
      $scope.hideDrawer = false;
      $scope.hideDrawer = !$scope.hideDrawer;
   }


   $scope.customScope = {};
   $scope.customScope.getNotficationStatusIconClass = function (notification) {
      var retClass = '';
      if (notification && notification.status) {
         if (notification.status === 'info') {
            retClass = "pficon pficon-info";
         } else if (notification.status === 'error') {
            retClass = "pficon pficon-error-circle-o";
         } else if (notification.status === 'warning') {
            retClass = "fa fa-circle";
         } else if (notification.status === 'ok') {
            retClass = "fa fa-circle-o";
         }
      }
      return retClass;
   };

   $scope.customScope.markRead = function (notification) {
      if (notification.unread) {
         NotifikasiMsgSetAsRead.update({idNotifMsg:notification.idMsg},{},function(response){
            notification.unread = false;
            notification.status = 'ok';
            var notificationGroup = $scope.groups.find(function(group) {
               return group.notifications.find(function(nextNotification) {
                  return notification == nextNotification;
               });
            });
            var unread = notificationGroup.notifications.filter(function(nextNotification) {
               return nextNotification.unread;
            });
            $scope.getDataSubscribe(true);
         }); 
      }
   }

   $scope.readFromSearchModal = function (notification) {
      NotifikasiMsgSetAsRead.update({idNotifMsg:notification.idMsg},{},function(response){
         $location.path(notification.urlMsg);
         $scope.getDataSubscribe(true);
      }); 
   }

   /* drawer config */
   /*$scope.loadMore = function (group) {
      $scope.showLoader = true;
      $scope.getNotificationMessage(group,true);
   };*/

   $scope.$on('loadMore', function(event, group) {
      $scope.getNotificationMessage(group,true);
      $scope.showLoader = false;
   });

   $scope.getDataNotifikasi = function(type){
      var
         itemRole = JSON.parse(localStorage.userRole),
         totalNotifTransaksi = 0,
         totalNotifEskalasi = 0;
      /* untuk menentukan total badge transaksi */
      if(type.toLowerCase()==='transaksi'){
         if(itemRole.flagNotifPenetapan || itemRole.flagNotifRealisasi){
            NotifikasiMsgListDetail.get({
               kodeRoleReceiver : itemRole.kodeRole,
               kodeCabangReceiver : itemRole.kodeCabang,
               sort : "created,desc",
               isRead : $rootScope.modalSearch.checkboxIsRead,
               size : 99999
            },function(response){
               $rootScope.contentNotifikasi.items = [];
               for(var i=0;i<response.content.length;i++){
                  response.content[i].createdDayText = $scope.setTextDay(response.content[i].created);
                  $rootScope.contentNotifikasi.items[i] = $scope.setItemMessage(response.content[i]);
               };
            });
         }  
      }
      /* untuk menentukan total badge eskalasi */
      if(type.toLowerCase()==='eskalasi'){
         if(itemRole.flagNotifEskalasi){
            NotifikasiMsgListDetail.get({
               username : localStorage.getItem('username'),
               sort : "created,desc",
               idNotifType : 3,
               isRead : $rootScope.modalSearch.checkboxIsRead,
               size : 99999
            },function(response){
               $rootScope.contentNotifikasi.items = [];
               for(var i=0;i<response.content.length;i++){
                  response.content[i].notifMsg = response.content[i].notifMsg+' ('+ $filter('date')(response.content[i].created,'dd-MM-yyyy')+') ';
                  response.content[i].createdDayText = $scope.setTextDay(response.content[i].created);
                  $rootScope.contentNotifikasi.items[i] = $scope.setItemMessage(response.content[i]);
               };
            });
         }
      }
   }

   $scope.customScope.linkFromMessage = function(link){
      $location.path(link);
   };

   $scope.getDataTempNotifikasi = function(type){
      $scope.getDataNotifikasi(type);
   }

   // $scope.showModalSearchNotifikasi = function(item){
   //    $rootScope.modalSearch = item;
   //    $rootScope.modalSearch.checkboxIsRead = 0;
   //    $rootScope.modalSearch.searchNotifikasi = '';
   //    $scope.getDataNotifikasi(item.heading);
   //    $('#modalSearchNotifikasi').modal('show');
   // }

   $scope.$on('showModalSearchNotifikasi', function(event, item) {
      $rootScope.modalSearch = item;
      $rootScope.modalSearch.checkboxIsRead = 0;
      $rootScope.modalSearch.searchNotifikasi = '';
      $scope.getDataNotifikasi(item.heading);
      $('#modalSearchNotifikasi').modal('show');
   });

    $scope.$on('eventGetDataSubscribe', function (event, data) {
        $scope.getDataSubscribe();
    });

    if(localStorage.userRole){
        $scope.getDataSubscribe();
    }

    $scope.$on('testWebNotifikasi', function() {
        $rootScope.$broadcast('publishNotifikasiOnMainJS');
    });

    $rootScope.$on('showModalSession', function (event, data) {
        LoadingScreen.hide();
        if($location.path().indexOf("vasapublic") < 0){
            $('#modalSessionTimeOut').modal('show');
        }        
    });

    $scope.logOutBySession = function(){
        LoadingScreen.hide();
        localStorage.clear();
        $rootScope.logged = true;
        $route.reload();
        $location.path('/login');
    };

   //  $scope.showRegional = function(){
   //     console.log(localStorage.getItem('statusUser') === 'regional');
   //     console.log($scope.inRegional);
   //     if ((localStorage.getItem('statusUser') === 'regional') && $scope.inRegional){
          
   //        return true;
   //     } else {
   //        return false;
   //     }
   //  }

    $scope.openSurveyAppVASA = function () {
      $window.open('https://kuesioner.pelindo.co.id/c_kuesionersdhbuat/isik/42', '_blank');
    };
}]);
