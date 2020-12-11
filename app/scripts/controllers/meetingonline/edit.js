'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MeetingOnlineEditCtrl
 * @description
 * # MeetingOnlineEditCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('MeetingOnlineEditCtrl',['$scope', '$filter','$timeout', '$location', '$routeParams','$rootScope','$controller','Notification','MeetingOnlineDetail','MeetingOnlineEdit','LoadingScreen','ClusterList','ClusterMuatanList','MdmDermagaSearch','MdmDermagaSearchByKode','MeetingParticipantAdd','$window','MeetingParticipantList','MeetingParticipantDetail','MeetingParticipantEdit','MeetingParticipantDelete','$route','MeetingUserSearch','MeetingParticipantGenerate','AppParam','MeetingOnlineAdd','HasilMeetingList','HasilMeetingEdit','MdmPelangganSearch','MOL_PATH','MeetingOnlineSendEmail', function ($scope, $filter, $timeout, $location, $routeParams,$rootScope,$controller,Notification,MeetingOnlineDetail,MeetingOnlineEdit,LoadingScreen,ClusterList,ClusterMuatanList,MdmDermagaSearch,MdmDermagaSearchByKode,MeetingParticipantAdd,$window,MeetingParticipantList,MeetingParticipantDetail,MeetingParticipantEdit,MeetingParticipantDelete,$route,MeetingUserSearch,MeetingParticipantGenerate,AppParam,MeetingOnlineAdd,HasilMeetingList,HasilMeetingEdit,MdmPelangganSearch,MOL_PATH,MeetingOnlineSendEmail) {
  angular.extend(this, $controller('MqttCtrl', {$scope: $scope})); 

  LoadingScreen.show();
  $scope.options = {
    autoclose: true,
    todayBtn: '',
    todayHighlight: true
  };

  $scope.tabEditMeetingOnline = "views/meetingonline/tabEditMeetingOnline.html";
  $scope.tabEditParticipant = "views/meetingonline/tabEditParticipant.html";
  $scope.tabEditHasilMeeting = "views/meetingonline/tabEditHasilMeeting.html";
  $scope.participant = {};
  $scope.hasilMeeting = [];
  $scope.disabledInput = false;
  $scope.disabledBtnSendEmail = false;
  $scope.checkAllEmail = false;
  $scope.sortBy = '';
  $scope.sortDesc = false;
  document.getElementById("participantTab").style.display = "none";
  document.getElementById("hasilMeetingTab").style.display = "none";


  //Start Set Disabled Date :
  var setDisableDate = function(){
    /*$('#tglMeeting').datepicker('setStartDate',$scope.meeting.tglPenetapan);
    $('#tglPenetapan').datepicker('setStartDate',$scope.meeting.tglMeeting);*/
    $('#tglMeeting').mask('99-99-9999');
    $('#tglPrameeting').mask('99-99-9999');
    $('#tglPenetapan').mask('99-99-9999');
  };

  AppParam.get({nama:'USER_MEETING'},function(response){
    $scope.userRole = response.content;
  });

  $scope.$watch('meeting.tglMeeting', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  $scope.$watch('meeting.tglPrameeting', function(){
    $timeout(function() {
      setDisableDate();
    }, 1000);
  });

  // $scope.$watch('participant.userRole', function(){
  //   $timeout(function() {
  //     setDisableDate();
  //   }, 1000);
  // });

  $scope.meeting = {};
  $scope.meeting.dermaga = {};
  $scope.muatan = [];
  $scope.locationPath = '/meetingonline/list';
  $scope.tglBerlaku = new Date();
  $scope.tooltipInfo = Notification.setMessageValidFile();

  $scope.getListOfUserMeeting = function(value) {
     if (value) {
      return new Promise(function(resolve, reject) {
        MeetingUserSearch.get({
          username: value
        }, function(response) {
          resolve(response);
        });
      });
    }
  };

  $scope.editMeetingParticipant = function(id){
    MeetingParticipantDetail.get({id:id}, function(response){
        $scope.participant = response;
    });
    $('#modalAddParticipant').show();
  }

  $scope.resetParticipantForm = function(){
    $scope.participant = {};
  }

  $scope.setCheckAllSendEmail = function(value){
    $scope.itemParticipants.forEach(function(item){
      if(item.username){
        item.sendEmail = value;
      }
    });
    $scope.disabledBtnSendEmail = value;
  }

  $scope.setDisabledSendEmail = function(){
    var tempEmail =[];
    $scope.itemParticipants.forEach(function(item){
      if(item.sendEmail){
        tempEmail.push(item);
      }
    });

    if(tempEmail.length>0){
      $scope.disabledBtnSendEmail = true;
    }else{
      $scope.disabledBtnSendEmail = false;
    }
  }

  $scope.sendNumberRoomToEmail = function(){
    $scope.itemParticipants.forEach(function(item){
      if(item.sendEmail){
        MeetingOnlineSendEmail.get({
          username : item.username,
          subject : 'Ruang Meeting '+$routeParams.id,
          content : 'Ruang Meeting '+$routeParams.id
        }, function(response){
          console.log(response);
          if(response.status=='200'){
            $scope.setNotification  = {
              type : 'warning',
              message : 'Email berhasil terkirim'
            };
            Notification.setNotification($scope.setNotification);
          }else{
            $scope.setNotification  = {
              type : 'warning',
              message : 'Email tidak berhasil terkirim'
            };
            Notification.setNotification($scope.setNotification);
          }
        });
      }else{
        $scope.setNotification  = {
          type : 'warning',
          message : 'Email user belum dipilih'
        };
        Notification.setNotification($scope.setNotification);
      }
    });
  }

  $scope.getHasilMeeting = function(){
    HasilMeetingList.get({
      kodeDermaga : $scope.meeting.kodeDermaga,
      tglMeeting : $filter('date')($scope.meeting.tglPenetapan, 'yyyy-MM-ddT00:00:00'), 
      clusteringId : $scope.meeting.clusteringId
    }, function(response){
      $scope.hasilMeeting = response.content;
    });
  }

  $scope.updateHasilMeeting = function(item){
    HasilMeetingEdit.update({id:item.id},item, function(response){
      if(response.$resolved){
        $scope.setNotification  = {
          type  : "success",
          message : "Generate Hasil Meeting berhasil"
        };
        Notification.setNotification($scope.setNotification);
        $scope.getHasilMeeting();
      }else{
        $scope.setNotification  = {
          type  : "warning",
          message : "Generate Hasil Meeting tidak berhasil"
        };
        Notification.setNotification($scope.setNotification);
      }
    });
  }

  $scope.generateHasilMeeting = function(){
    $scope.hasilMeeting.forEach(function(item) {
      item.idMeeting = $routeParams.id;
      $scope.updateHasilMeeting(item);
    });
  }

  $scope.getMeetingParticipant = function(){
    $scope.itemParticipants = [];
    MeetingParticipantList.get({
      idMeeting:$routeParams.id,
      sort:$scope.sortBy == '' ? 'id,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
    }, function(response){
      response.content.forEach(function(item){
        item.sendEmail = false;
      });
      $scope.itemParticipants = response.content;
    });
  }

  $scope.generateMeetingParticipant = function(){
    MeetingParticipantGenerate.get({idMeeting:$routeParams.id}, function(response){
      if(response){
        if(response.length>0){
          $scope.setNotification  = {
            type : 'success',
            message : 'Generate Participant Berhasil'
          };
          Notification.setNotification($scope.setNotification);
          $scope.getMeetingParticipant();
          $scope.publishAfterGenerateParticipantOnMqttJS();
        }else{
          $scope.setNotification  = {
            type : 'warning',
            message : 'Participant untuk nomor ruang <b>'+$routeParams.id+'</b> tidak tersedia'
          };
          Notification.setNotification($scope.setNotification);
          $scope.getMeetingParticipant();
        }
      }
    });
  }

  $scope.deleteMeetingParticipant = function(id){
    var checkDelete = confirm('Apakah anda ingin menghapus data?');
    if(checkDelete){
      MeetingParticipantDelete.delete({id: id}, function(response) {
        $scope.setNotification  = {
          type    : "success",
          message : "Data berhasil dihapus"
        };
        Notification.setNotification($scope.setNotification);
        $scope.getMeetingParticipant();
        $scope.publishAfterGenerateParticipantOnMqttJS();
      }, function() {
        $scope.setNotification  = {
          type    : "warning",
          message : "Data tidak berhasil dihapus"
        };
        Notification.setNotification($scope.setNotification);
      });
    }
  }

  $scope.getListOfDermaga = function(value) {
    if (value && value.length <=3) {
      return new Promise(function(resolve) {
        MdmDermagaSearchByKode.get({
          kode: value,
          kodeTerminal : localStorage.getItem('kodeTerminal'),
          limit: '10'
        },
         function(response) {
          resolve(response);
            response.forEach(function(response) {
              response.mdmgNamaKode = response.mdmgNama +' ('+response.mdmgKode + ')';
            });
        });
      });
    } else if (value.length > 3 ){
      return new Promise(function(resolve) {
        MdmDermagaSearch.get({
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

	if($routeParams.id){
    $scope.getMeetingParticipant();
		MeetingOnlineDetail.get({id:$routeParams.id}, function(response){
      LoadingScreen.hide();
			if(response !== undefined){
        $scope.meeting = response;
        $scope.getHasilMeeting();

        $scope.meeting.dermaga = response.namaDermaga;
        $scope.meeting.deskripsi = response.deskripsi;
        $scope.meeting.tglMeeting = new Date(response.tglMeeting);
        $scope.meeting.tglPrameeting = new Date(response.tglPrameeting);
        $scope.meeting.pembagiUtama = response.clusteringIdParent;
        $scope.meeting.muatan = response.clusteringId;
        if(response.tglPenetapan!=null){
          $scope.meeting.tglPenetapan = new Date(response.tglPenetapan);
        }
        $scope.disabledInput = true;
        document.getElementById("participantTab").style.display = "block";
        document.getElementById("hasilMeetingTab").style.display = "block";
			}
		});
	}else{
    LoadingScreen.hide();
    $scope.disabledInput = false;
    $scope.meeting = {};
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    $scope.meeting.tglMeeting = new Date();
    $scope.meeting.tglPrameeting = yesterday;
    $scope.meeting.tglPenetapan = yesterday;
    document.getElementById("participantTab").style.display = "none";
    document.getElementById("hasilMeetingTab").style.display = "none";
	}

  ClusterList.get({}, function(response){
    $scope.pembagi = response.content;
  });

  $scope.$watch('meeting.pembagiUtama',function(newValue){
    if (newValue) {
      $scope.muatan = [];
      ClusterMuatanList.get({}, function(response){
        $scope.muatanList = response.content;
        $scope.muatanList.forEach(function(element){
          if (element.parentId === newValue){
            $scope.muatan.push(element);
          } 
        });
      });
    }
  });

  /* validasi autocomplete */
  var valueField = '';
  $scope.checkValue = function(value){
    valueField = value;
  }

  $scope.validationLookupDermaga= function(){
    if(valueField !== $scope.meeting.dermaga){
      if(typeof $scope.meeting.dermaga !== 'object'){
        $scope.setNotification  = {
          type  : 'warning',
          message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
        };
        Notification.setNotification($scope.setNotification);
        return $scope.meeting.dermaga='';
      }
    }
  };

  $scope.saveParticipant = function(){
    var itemParticipant = {
      idMeeting : $routeParams.id,
      username : $scope.participant.user.username,
      email : $scope.participant.user.username,
      userRole : $scope.participant.user.userRole,
      noPpk1 : $scope.participant.noPpk1,
      statusOnline : false
    }

    MeetingParticipantAdd.save(itemParticipant,function(response){
      $scope.setNotification  = {
        type  : "success",
        message : "Data berhasil disimpan"
      };
      Notification.setNotification($scope.setNotification);
      $scope.getMeetingParticipant();
      $scope.publishAfterGenerateParticipantOnMqttJS();
    })
    $('#modalAddParticipant').modal('hide');
  }

  $scope.backToList = function() {
    $location.path($scope.locationPath);
  };

	$scope.submit = function(){
    if (typeof $scope.meeting.dermaga === 'object') {
      $scope.meeting.kodeDermaga = $scope.meeting.dermaga.mdmgKode;
    }else{
      $scope.meeting.kodeDermaga = $routeParams.id?$scope.meeting.kodeDermaga:$scope.meeting.dermaga;
    }
    if (typeof $scope.meeting.pembagiUtama === 'object') {
      $scope.meeting.clusteringIdParent = $scope.meeting.pembagiUtama.id;
    }else{
      $scope.meeting.clusteringIdParent = $scope.meeting.pembagiUtama;
    }
    if (typeof $scope.meeting.muatan === 'object') {
      $scope.meeting.clusteringId = $scope.meeting.muatan.id;
    }else{
      $scope.meeting.clusteringId = $scope.meeting.muatan;
    }

    var postMeeting = {
      deskripsi : $scope.meeting.deskripsi,
      kodeDermaga : $scope.meeting.kodeDermaga,
      tglMeeting : $filter('date')($scope.meeting.tglMeeting, 'yyyy-MM-ddT00:00:00'),
      tglPenetapan : $filter('date')($scope.meeting.tglPenetapan, 'yyyy-MM-ddT00:00:00'),
      tglPrameeting : $filter('date')($scope.meeting.tglPenetapan, 'yyyy-MM-ddT00:00:00'),
      status : "Draft",
      clusteringId : $scope.meeting.clusteringId,
      clusteringIdParent : $scope.meeting.clusteringIdParent
    };

    if(!$routeParams.id){
      MeetingOnlineAdd.save(postMeeting, function(response){
        if(response.$resolved){
          $scope.setNotification  = {
            type : "success",
            message : "Data berhasil tersimpan"
          };
          Notification.setNotification($scope.setNotification);
          $location.path('/meetingonline/room/'+response.id);
        }else{
          $scope.setNotification  = {
            type : "warning",
            message : "Data tidak berhasil tersimpan"
          };
          Notification.setNotification($scope.setNotification);
        }
        $scope.buttonDisabled = false;
        $scope.showLoader = false;
      });
    }else{
  		MeetingOnlineEdit.update({id:$routeParams.id},postMeeting, function(response){
  			if(response.$resolved){
  				$scope.setNotification  = {
  					type	: "success",
  					message	: "Data berhasil dirubah"
  				};
  				Notification.setNotification($scope.setNotification);
          // $location.path($scope.locationPath);
        }else{
          $scope.setNotification  = {
            type  : "warning",
            message : "Data tidak berhasil dirubah"
          };
          Notification.setNotification($scope.setNotification);
        }
        $scope.buttonDisabled = false;
  		});
    }
	};

	$scope.buildPDF = function(){
		BuildPDF.build($scope.dataLabuh.dokumen);
	}

  $scope.startMeeting = function(){
    if($routeParams.id){
      $window.open(MOL_PATH+"#!/meeting/"+$routeParams.id, '_blank');
    }else{
      $window.open(MOL_PATH+"#!/", '_blank');
    }
  }

  $scope.testMqtt = function(){
    $scope.publishAfterGenerateParticipantOnMqttJS();
  }

}]);
