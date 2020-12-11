'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:EskalasiCtrl
 * @description
 * # EskalasiCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('EskalasiCtrl', ['$scope','$rootScope','$filter','Login','Notification','UserRole','RoleByKode','BindEskalasi','MDMPegawaiByNip','RiwayatEskalasiAdd','RequestEscalationHistory',function ($scope,$rootScope,$filter,Login,Notification,UserRole,RoleByKode,BindEskalasi,MDMPegawaiByNip,RiwayatEskalasiAdd,RequestEscalationHistory) {

	// var tglSekarang = $filter('date')(new Date(),'yyyy-MM-dd')+'T'+moment().format('HH:mm');

	$scope.showModalEsc = function(){
		if(localStorage.userApprover){
			$scope.getMDMPegawaiByNip();
			$rootScope.notification.status = "hide";
			$rootScope.modalNotification.status = "hide";
			$('.modal').modal('hide');
			$('#escalationConfirm').modal('show');
		}else{
			var note = {
				type 	: "warning",
				message : "ESKALASI_APPROVER belum tersedia"
			};
			Notification.setNotification(note);	
		}
		$rootScope.userApprover.username = localStorage.userApprover;
	};

	$scope.confirmEscalation = function(){
		$rootScope.notification.status = "hide";
		$rootScope.modalNotification.status = "hide";
		$('#escalationConfirm').modal('hide');
		$('#escalationForm').modal('show');
		$scope.sendNotifEsc();
	};

	$scope.sendNotifEsc = function(typeCode){
		RequestEscalationHistory.update({
			escTypeCode: $rootScope.notification.dataEsc.escTypeCode,
			username: localStorage.username
		}, {}, function(response) {
		}, function() {
			// console.log("kesini 2");
		});
		$rootScope.$broadcast('eventMqttByLogin');
	};

	$scope.getMDMPegawaiByNip = function() {
		var userApprover = "";
		MDMPegawaiByNip.get({ nip : localStorage.userApprover},function(response) {
			$rootScope.userApprover.nama = response.nama?response.nama:' - ';
		});
	}

	$scope.closeNotifEsc = function(){
		$rootScope.notification.status = "hide";	
	};

	$scope.submitEsc = function(){
		var minLengthKet = 30;
		if($rootScope.notification.dataEsc.keterangan.length<=minLengthKet){
			var note = {
				type 	: "warning",
				message : "Keterangan terlalu pendek, minimum <b>"+minLengthKet+"</b> karakter."
			};
			Notification.setModalNotification(note);
			$('#eskalasiKeterangan').focus();
			return false;
		}
		Login.save({
				username : localStorage.userApprover,
				password : $rootScope.notification.dataEsc.password,
				isEskalasi : true,
				token : localStorage.token
			}, function(response){
			if(response.responType){
				if(response.responType=='S'){
					BindEskalasi.setTempEskalasi($rootScope.notification);
					$scope.saveRiwayatEskalasi($rootScope.notification.dataEsc);
					localStorage.setItem('token', localStorage.token);					
				}else{
					var messageRespon;
					if(response.responType==='E-003' || response.responType==='E-018'){
						messageRespon = response.responType +' - Harap ganti password anda';
					}else{
						messageRespon = response.responType +' - '+ response.responText;
					}
					var note = {
						type 	: "danger",
						message : messageRespon
					};
					Notification.setModalNotification(note);
				}
			}else{
				var note = {
					type 	: "danger",
					message : "Autentikasi gagal, silahkan masukkan ulang password anda.<br>"+response.description
				};
				Notification.setModalNotification(note);
			}
		});
	};

	$scope.saveRiwayatEskalasi = function(item){
		var  noPpk1 = '', noPpkJasa = '';
		if($rootScope.notification.dataItem){
			if($rootScope.notification.dataItem.noPpk1){
				noPpk1 = $rootScope.notification.dataItem.noPpk1,
				noPpkJasa = $rootScope.notification.dataItem.noPpkJasa?$rootScope.notification.dataItem.noPpkJasa:'';
			}
		}

		RiwayatEskalasiAdd.save({
			approvedBy : localStorage.userApprover,
			escReason : item.keterangan,
			idEscType : $rootScope.notification.dataEsc.id,
			username : localStorage.username,
			idUserRole : parseInt(localStorage.idRole),
			noPpk1 : noPpk1,
			noPpkJasa : noPpkJasa 
		}, function(response){
			if(response.id){
				$rootScope.$broadcast('eventFromEskalasi',$rootScope.notification.dataEsc, $rootScope.notification.dataItem);
				var note = {
					type 	: "success",
					message : "Autentikasi diterima, otorisasi eskalasi sukses diberikan."
				};
				Notification.setModalNotification(note);
				Notification.setNotification(note);
				$('#escalationForm').modal('hide');
			}else{
				var note = {
					type 	: "danger",
					message : "Autentikasi gagal, Riwayat eskalasi tidak tersimpan.<br>"+response.description
				};
				Notification.setModalNotification(note);
			}
		});
	}
}]);
