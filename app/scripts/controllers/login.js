
'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
	.controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'Login', 'Notification', 'UserRole', 'RoleByKode', '$cookies', 'AppParamValue', 'ParamsCabangList', 'TipeEskalasiList', 'MasterCabangList', 'TipeEskalasi', 'ValidationByAppParams', '$timeout', function ($scope, $location, $rootScope, Login, Notification, UserRole, RoleByKode, $cookies, AppParamValue, ParamsCabangList, TipeEskalasiList, MasterCabangList,TipeEskalasi,ValidationByAppParams,$timeout) {
	$scope.username = $cookies.get('username');
	$scope.showLoader = false;

	$scope.logOut = function(){
		localStorage.clear();
		location.reload();
	};

	// Hide & show password function
	$scope.hideShowPassword = function(){
		if ($rootScope.inputTypePassword == 'password')
		  	$rootScope.inputTypePassword = 'text';
		else
		  	$rootScope.inputTypePassword = 'password';
	};

	$scope.getParamsCabang = function() {
		var userApprover = "";
		ParamsCabangList.get({ nama : 'ESKALASI_APPROVER'},function(response) {
			if(response.content.length>0) userApprover = response.content[0].value;
			localStorage.setItem('userApprover', userApprover);
			$rootScope.userEskalasiApprover = userApprover;
		});
	}

	$scope.getTipeEskalasi = function(){
		TipeEskalasiList.get({size : 9999, page : -1, sort : 'escTypeCode,desc'}, function(response) {
			TipeEskalasi.setTipeEskalasi(response.content);
		});
	};

	$scope.doLogin = function(){
		$scope.showLoader = true;
		Login.save({username:$scope.username,password:$scope.password}, function(response){
			/*timeout untuk server 504 portalSI*/
			$timeout(function(){
				if(!response){
					var note = {
						type: "danger", //ex : danger, warning, success, info
						message: "Tidak dapat tersambung dengan server Login"
					};
					Notification.setNotification(note);
					return false;
				}
			}, 20000);

			if(response.responType){
				if(response.responType=='S'){					

					localStorage.setItem('username', response.username);
					if(response.hakakses == '1303'){
						localStorage.setItem('viewonly', true);
						$rootScope.viewOnly = true;
					}
					// Get User Role
					RoleByKode.get({kodeRole:response.hakakses},function(response2){
						if(response2.idRole) {
							$scope.showLoader = false;
							localStorage.setItem('nama', response.nama);
							localStorage.setItem('namaCabang', response.namacabang);
							localStorage.setItem('Authorization', true);
							$rootScope.logged = false;
							var kodeCabang = parseInt(response.kdcabang);
							var kodeTerminal = parseInt(response.kdterminal);
							if(kodeTerminal == 0 || !kodeTerminal){
								kodeTerminal = kodeCabang;
							}
							localStorage.setItem('kodeCabang', kodeCabang);
							//localStorage.setItem('kodeTerminal', kodeTerminal);
							//adding kodeRegional by cahyo in 30/11/2018
							localStorage.setItem('kodeTerminalBaru', kodeTerminal);
								//change by cahyo for penyesuaian in 17/12/2018
								localStorage.setItem('kodeRegional', response.personarea ? response.personarea : response2.kodeRegional);
								localStorage.setItem('namaRegional', response.regional ? response.regional : response2.kodeRegional);
								//end of change
							if(response.iduser == '101'){
								response.loid = 0;
							}
							localStorage.setItem('namaTerminal', response.terminal);
							localStorage.setItem('statusUser', response.loid == 2?'terminal':'regional');

							if (localStorage.getItem('statusUser') == 'terminal') {
								$rootScope.inTerminal = true;
								localStorage.setItem('inTerminal', $rootScope.inTerminal);
							} else {
								$rootScope.inTerminal = localStorage.getItem('inTerminal');
							}
							console.log(localStorage.getItem('kodeRegional'));
							//for getting old terminal
							MasterCabangList.get(
								{ 
									kodeTerminal: kodeTerminal,
									kodeRegional: localStorage.getItem('kodeRegional'),
									kodeCabang: kodeCabang
								}, function (response) 
								{
									var item = JSON.parse(JSON.stringify(response));
									console.log(item.content.length);

									if (item.content.length != 0){
										//rewrite kode terminal to old kode terminal
										kodeTerminal = parseInt(item.content[0].kodeKawasan);
										localStorage.setItem('kodeTerminal', kodeTerminal);
										//localStorage.setItem('namaTerminal', item.content[0].namaTerminal);
										//localStorage.setItem('namaRegional', item.content[0].namaRegional);
										//console.log(item.content[0].kodeKawasan);
									} else {
										// if user role not found
										var note = {
											type: "danger", //ex : danger, warning, success, info
											message: "Kode Cabang anda "+kodeCabang+" Kode Terminal anda " + kodeTerminal + " atau kode Regional anda" + localStorage.getItem('kodeRegional')+" tidak ditemukan di master cabang, silahkan hubungi Administrator VASA Pelindo III."
										};
										Notification.setNotification(note);
										localStorage.clear();
									}
									
								});
							//end of add
							$rootScope.isPusat = (kodeCabang == 1?true:false);
							localStorage.setItem('isPusat', $rootScope.isPusat);
							localStorage.setItem('NIPP',$scope.username);
							ValidationByAppParams.setItem(kodeTerminal);							
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
							ParamsCabangList.get({ nama: 'SUPER_VERIF', value: '1' }, function (response) {
								if (response.content.length > 0) {
									localStorage.setItem('superVerif', 1);
								}
							});
							$scope.getParamsCabang();
							$scope.getTipeEskalasi();
							$cookies.put('username',$scope.username, {
								expires: new Date("February 22, 9999 00:00:00")
							});
							localStorage.setItem('userRole',JSON.stringify(response2));
							localStorage.setItem('idRole',response2.idRole);
							$rootScope.$broadcast('eventGetDataSubscribe');
							UserRole.checkMenu();
							$('#modalSurveyApp').modal('show');
							$location.path('/');
						} else {
							// if user role not found
							localStorage.clear();
							var note = {
								type: "danger", //ex : danger, warning, success, info
								message: "Anda tidak memiliki Hak Akses, silahkan hubungi Administrator VASA Pelindo III. <br><br>Kode role <b>"+response.hakakses+"</b> tidak terdaftar di <b>"+response.namacabang+"</b> dengan kode kawasan <b>"+response.kdterminal+"</b>."
							};
							Notification.setNotification(note);
						}
					});
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
					Notification.setNotification(note);
					localStorage.clear();
					$scope.showLoader = false;
				}
			}else{
				var note = {
						type: "danger",
						message: response.description
					};
				Notification.setNotification(note);
				localStorage.clear();
				$scope.showLoader = false;
			}
		});
	};


	/* mqtt-client */

}]);
