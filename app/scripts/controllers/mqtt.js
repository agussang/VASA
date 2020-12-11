'use strict';

/**
 * @ngdoc overview
 * @name meetingOnlineApp
 * @description
 * # meetingOnlineApp
 *
 * Main module of the application.
 */
angular.module('vasaApp')
.controller('MqttCtrl', ['$scope','$rootScope','$window','MQTT_PATH','$routeParams',function ($scope, $rootScope,$window,MQTT_PATH,$routeParams) {
  var client, message;
    function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){
       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  $scope.showWebNotifikasi = function(item){
    webNotification.showNotification(item.title, {
      body  : item.body,
      icon  : 'images/logo-notification-vasa.png',
      onClick: function onNotificationClicked() {
        // console.log('Notification clicked.');
      },
      autoClose: 4000
    }, function onShow(error, hide) {
      if (error) {
        window.alert('Unable to show notification: ' + error.message);
      } else {
        // console.log('Notification Shown.');
        setTimeout(function hideNotification() {
           hide();
        }, 5000);
      }
    });
  }

  $scope.playAudio = function() {
    var audio = new Audio("sounds/iphone.mp3");
    audio.play();
  };

  $scope.getMqttClient = function(){
      var makeid = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }

      if(localStorage.token){
        client = new Paho.MQTT.Client(MQTT_PATH.wsbroker, Number(MQTT_PATH.wsport), MQTT_PATH.wsclientId+localStorage.getItem('username')+'-'+makeid());
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({onSuccess:onConnect});           
      }

      function onConnect() {
        var
          itemRole = JSON.parse(localStorage.userRole),
          username = localStorage.getItem('username'),
          kodeCabang = localStorage.getItem('kodeCabang');

        if(itemRole.flagNotifPenetapan)client.subscribe("transaksi/penetapan/"+ itemRole.kodeRole, {qos : 2});
        if(itemRole.flagNotifRealisasi)client.subscribe("transaksi/realisasi/" + itemRole.kodeRole, {qos : 2});
        if(itemRole.flagNotifPmhPandu)client.subscribe("transaksi/permohonan/pandu/" + kodeCabang+"/" +itemRole.kodeRole, {qos : 2}); 
        
       
        
        if(itemRole.flagNotifEskalasi){
          client.subscribe("escalation/request/" + username, {qos : 2});
          client.subscribe("escalation/approved/" + username, {qos : 2});
        }
        client.subscribe("vasa/testNotifikasi/"+localStorage.nama,{qos: 2});
        client.subscribe("/notif/progress/pandu/#",{qos: 2});
        client.subscribe("/notif/pandu/spk/#",{qos: 2});
        // client.subscribe("/pandu/location/#",{qos: 2});
      }

      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
          // client.connect({onSuccess:onConnect});
        } 
      }

      function onMessageArrived(message) {
        $rootScope.$broadcast('eventGetDataSubscribe');
        var
          str = message.destinationName,
          res = str.split("/");
        // console.log(str);
        if(res[0]==='transaksi' || res[0]==='escalation' || res[1]==='testNotifikasi'){
          if(res[0]==='escalation') res[0]='eskalasi';
          var item = {
            title : 'Notifikasi ' +toTitleCase(res[0]),
            body  : message.payloadString
          }
          $scope.playAudio();
          $scope.showWebNotifikasi(item);
        }else{
          if(str==='notif/progress/pandu'){
            $rootScope.$broadcast('subscribeProgressPandu');
          }
          if(res[1]==='pandu' && res[2]==='location'){
            $rootScope.$broadcast('subscribePetugasPandu');
          }
          if(res[1]==='notif' && (res[2]==='pandu' || res[2]==='progress')){
            $rootScope.$broadcast('subscribeProgressPandu');
          }
        } if(str==='transaksi/permohonan/pandu/'){
          $rootScope.$broadcast('subscribePermohonanPandu');
        }
      }
    }

    $scope.publishTestWebNotifikasiOnMqttJS = function(){
      message = new Paho.MQTT.Message("Halo "+localStorage.nama);
      message.destinationName = "vasa/testNotifikasi/"+localStorage.nama;
      message.qos = 2;
      client.send(message);
    }

    $scope.publishAfterGenerateParticipantOnMqttJS = function(){
      message = new Paho.MQTT.Message("Generate participant");
      message.destinationName = "meetingOnline/room/"+String($routeParams.id)+"/generateParticipant/"+localStorage.nama;
      message.qos = 2;
      client.send(message);
    }

    $scope.publishAfterUpdateHasilMeetingOnMqttJS = function(item){
      if(item.idMeeting){
        message = new Paho.MQTT.Message(localStorage.nama+" melakukan perubahan penetapan");
        message.destinationName = "meetingOnline/room/"+String(item.idMeeting)+"/updateHasilMeeting/"+localStorage.nama;
        message.qos = 2;
        client.send(message);
      }
    }

    $rootScope.publishNotifikasiOnMainJS = function(){
      message = new Paho.MQTT.Message("Halo "+localStorage.nama);
      message.destinationName = "vasa/testNotifikasi/"+localStorage.nama;
      message.qos = 2;
      client.send(message);
    }

    $rootScope.$on('publishNotifikasiOnMainJS', function (event, data) {
      $rootScope.publishNotifikasiOnMainJS();
    });

    $scope.getMqttClient();

}]);
