'use strict';

/**
 * @ngdoc service
 * @name vasaApp.otherservice
 * @description
 * # otherservice
 * Service in the vasaApp.
 */
angular.module('vasaApp')
.factory('Autocomplete', function() {
	var Autocomplete = function(serviceFunction, param){
		this.serviceFunction = serviceFunction;
		this.param = param;
	};
	Autocomplete.prototype.get = function(value){
		if (value) {
			var self = this;
			return new Promise(function(resolve) {
				var serviceParam = { "limit": 10 };
				serviceParam[self.param] = value;
				self.serviceFunction.get(serviceParam, function(response) {
					resolve(response);
				});
			});
		}
	};
	return Autocomplete;
})
.factory('Databinding', function () {

    var firstValue = '';
    var panduMasuk;
    var panduKeluar;
	var idKawasan = '';

    return {
        getFirstValue: function () {
            return firstValue;
        },
        setFirstValue: function (value) {
            firstValue = value;
        },
        getPanduMasuk : function(){
        	return panduMasuk;
        },
        setPanduMasuk : function(value){
        	panduMasuk = value;
        },
        getPanduKeluar : function(){
        	return panduKeluar;
        },
        setPanduKeluar : function(value){
        	panduKeluar = value;
        },
		setIdKawasan : function(value){
			idKawasan = value;
		},
		getIdKawasan : function(){
			return idKawasan;
		}
    };
})
.service('LoadingScreen', function() {
	var loading_screen;
	this.show = function() {
		loading_screen = pleaseWait({
			logo : 'images/vasalogin.png',
			loadingHtml: '<div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>'
		});
	};

	this.hide = function() {
		loading_screen.finish();
	};
})
.service('PDF', function() {
	this.htmlTabel2PDF = function(htmlTabel,title) {
		var tableBody = [];
		// generate table body
		htmlTabel.each(function(){
			// iterate thead tr and tbody tr
			$(this).find('thead tr, tbody tr').each(function(){
				var row = [];
				// iterate tr th and tr td
				$(this).find('th, td').each(function(){
					var colSpan = parseInt($(this).attr('colspan'));
          if(!colSpan){ colSpan = 1; }

          var rowSpan = parseInt($(this).attr('rowspan'));
          if(!rowSpan){ rowSpan = 1; }

					var cell = {
						rowSpan : rowSpan,
						colSpan : colSpan,
						text : $(this).text()
					};

					if($(this).is('th')){
						cell.style = 'header';
					}

					// fill missing cell because colspan
					row.push(cell);
					if(colSpan > 1) {
						for(var i = 1; i < colSpan; i++){
							row.push('');
						}
					}
				});
				tableBody.push(row);
			});
		});

		// fill missing cell because rowspan
		tableBody.forEach(function(row, rowIndex){
      row.forEach(function(cell, colIndex){
        if(cell.rowSpan) {
          if(cell.rowSpan > 1) {
						for(var i = 1; i < cell.rowSpan; i++){
							var nextRow = tableBody[rowIndex+i];
							var nextRow1 = nextRow.slice(0,colIndex);
							nextRow1.push('');
							tableBody[rowIndex+i] = nextRow1.concat(nextRow.slice(colIndex,nextRow.length));
						}
          }
        }
      });
    });

		// prepare pdf content
		var contentPDF = {
			pageSize: 'A4',
			pageOrientation: 'landscape',
			styles: {
				title: {
					bold: true,
					color: '#000',
					fontSize: 12,
					margin: [0, 0, 0, 8]
				},
				dataTable: {
					color: '#333',
					fontSize: 6,
				},
				header: {
					color: '#000',
					fontSize: 7,
					bold: true,
					alignment: 'center'
				}
			},
			content: [
				{
					text: title,
					style: 'title'
				},
				{
					style: 'dataTable',
					table: {
						body: tableBody
					}
				}
			]
		};
		pdfMake.createPdf(contentPDF).download('Pivot.pdf');
	};
})
.service('UserRole', ['$route',function ($route) {
	this.checkMenu = function(){
		// get user role data
		var userRoleData = JSON.parse(localStorage.getItem('userRole'));

		// if userRoleData not found return function
		if(!userRoleData) {return true;}

		var mainMenus = [
			{ 'kodeMenu' : '2100', 'label' : 'Setting', 'show' : false },
			{ 'kodeMenu' : '2200', 'label' : 'Pemeliharaan Master', 'show' : false },
			{ 'kodeMenu' : '2300', 'label' : 'Perencanaan', 'show' : false },
			{ 'kodeMenu' : '2400', 'label' : 'Pemeliharaan Kesepakatan', 'show' : false },
			{ 'kodeMenu' : '2500', 'label' : 'Pemeliharaan Tarif', 'show' : false },
			{ 'kodeMenu' : '2600', 'label' : 'Master Fuel Surcharge', 'show' : false },
			{ 'kodeMenu' : '2700', 'label' : 'Pandu/Tunda', 'show' : false },
			{ 'kodeMenu' : '2800', 'label' : 'Tambat', 'show' : false },
			{ 'kodeMenu' : '3200', 'label' : 'Transaksi List', 'show' : false },
			{ 'kodeMenu' : '3300', 'label' : 'Air Kapal', 'show' : false },
			{ 'kodeMenu' : '3400', 'label' : 'Perencanaan', 'show' : false },
			{ 'kodeMenu' : '3500', 'label' : 'SIM Pandu Tunda', 'show' : false },
			{ 'kodeMenu' : '3600', 'label' : 'Operasional', 'show' : false },
			{ 'kodeMenu' : '4100', 'label' : 'Laporan', 'show' : false }
		];

		userRoleData.groups.forEach(function(groupData, index){
			groupData.menus.forEach(function(menu,index){
				if(!menu.rflag) {
					$('.menu-cabang[kode-menu=' + menu.kodeMenu + ']').hide();
				} else {
					var mainMenu = mainMenus.filter(function(m){
						return m.kodeMenu == (menu.kodeMenu.substring(0,2)+'00');
					});
					mainMenu[0].show = true;
				}
			});
		});

		var showAdministrasi = false;

		mainMenus.forEach(function(mainMenu,index){
			if(!mainMenu.show) {
				$('.menu-utama[kode-menu=' + mainMenu.kodeMenu + ']').hide();
			} else if (mainMenu.kodeMenu.substring(0,1) == 2) {
				showAdministrasi = true;
			}
		});

		if(!showAdministrasi) {
			$('.menu-utama[kode-menu=2000]').hide();
		}
	};

	this.checkJasa = function(){
		// get user role data
		var userRoleData = JSON.parse(localStorage.getItem('userRole'));
		// if userRoleData not found return function
		if(!userRoleData) {return true;}

		// Apply Jasa Options
		if(!userRoleData.jasa.flagLabuh) {
			$('.menu-jasa[kode-menu=labuh]').hide();
			$(".access-jasa-labuh").hide();
		}
		if(!userRoleData.jasa.flagPandu) {
			$('.menu-jasa[kode-menu=pandu]').hide();
			$(".access-jasa-pandu").hide();
		}
		if(!userRoleData.jasa.flagTunda) {
			$('.menu-jasa[kode-menu=tunda]').hide();
			$(".access-jasa-tunda").hide();
		}
		if(!userRoleData.jasa.flagTambat) {
			$('.menu-jasa[kode-menu=tambat]').hide();
			$(".access-jasa-tambat").hide();
		}
		if(!userRoleData.jasa.flagAirKapal) {
			$('.menu-jasa[kode-menu=airkapal]').hide();
			$(".access-jasa-airkapal").hide();
		}
	};

	this.getCurrentRole = function(){
		var currentRole = {
			cflag: true,
			dflag: true,
			pflag: true,
			rflag: true,
			uflag: true
		};
		var userRoleData = JSON.parse(localStorage.getItem('userRole'));
		if(userRoleData) {
			userRoleData.groups.forEach(function(group){
				group.menus.forEach(function(menu){
					if(menu.kodeMenu === $route.current.$$route.kodeMenu) {
						currentRole = menu;
					}
				});
			});
		}
		return currentRole;
	};
}])
.service('BindKapal', function () {
	/*digunakan untuk receive dan retrive data kapal layanan baru*/
	// this.kapal = null;
	var kapal = null;

	var addKapal = function(val){
		kapal = val;
	};

	var getKapal = function(){
		return kapal;
	};

	return {
		addKapal: addKapal,
		getKapal: getKapal
	};
})
.service('BindApung', function() {
    this.option = "";
})
.service('SharedVariable', function () {
    var variable = false;
    return {
        getSharedVariables: function () {
            return variable;
        },
        setVariable: function(value){
           variable = value;
        }
    };
})
.service('TipeEskalasi', function () {
    var temp = [];
    return {
        setTipeEskalasi: function(value){
           	temp = value;
        },
        getTipeEskalasi: function (valCode) {
        	var itemTipeEskalasi = {};
        	temp.forEach(function(item){
        		if(item.valCode===valCode){
        			itemTipeEskalasi = item;
        		} 
			});
        	return itemTipeEskalasi;	
        }
    };
})
.service('ServiceKapalBebasPanduTunda', ['$filter','KapalBebasPTList', function ($filter,KapalBebasPTList) {
    var temp = [];
    var today = $filter('date')(new Date(),'yyyy-MM-dd');
    return {
        setItem: function(){
           	KapalBebasPTList.get({ flagAktif:1, size:9999 }, function(response) {
				if(response.content.length>0){
					temp = response.content;
				}
			});
        },
        checkWajibTunda: function (kodeKapal) {
        	var isKapalBebasPT = false;
        	temp.forEach(function(item){
        		item.tglBerlaku = $filter('date')(new Date(item.tglBerlaku),'yyyy-MM-dd');
        		if(item.kodeKapal===kodeKapal && item.jenisBebasPt>1 && item.tglBerlaku>=today){
        			isKapalBebasPT = true;
        		} 
			});
        	return isKapalBebasPT;	
        }
    };
}])
.service('ServiceAturanGerakPanduTunda', ['AturanGerakPanduList', function (AturanGerakPanduList) {
    var temp = [];
    return {
        setItem: function(){
           	AturanGerakPanduList.get({
				flagAktif:1
			}, function(response) {
				if(response.content.length>0){
					temp = response.content;
				}
			});
        },
        getItem: function (kodeLokasi) {
        	var isGerakPT = false;
        	temp.forEach(function(item){
        		if(item.kodeLokasi===kodeLokasi){
        			isGerakPT = true;
        		} 
			});
        	return isGerakPT;	
        }
    };
}])
.service('BindNotifikasi', function () {
    var tempTransaksi = [];
    var tempEskalasi = [];
    return {
        setTempNotifikasiTransaksi: function(value){
           	tempTransaksi.push(value);
        },
        setTempNotifikasiEskalasi: function(value){
           	tempEskalasi.push(value);
        },
        getTempNotifikasiTransaksi: function(value){
           	return tempTransaksi;
        },
        getTempNotifikasiEskalasi: function(value){
           	return tempEskalasi;
        },
        setDefaultNotifikasi: function () {
            tempTransaksi = [];
            tempEskalasi = [];
        }
    };
})
.service('BindEskalasi', function () {
    var temp = [];
    return {
        setTempEskalasi: function(value){
           	temp.push(value);
        },
        hasTempEskalasi: function (valCode) {
        	var match = false;
        	temp.forEach(function(item){
        		if(item.dataEsc.valCode===valCode) match = true;
			});
        	return match;
        },
        setDefaultEskalasi: function () {
            temp = [];
        }
    };
})
.service('Notification', ['$rootScope','$timeout', function ($rootScope,$timeout) {
	this.setNotification = function(notification){
		$('.notifEsc').removeClass('hide');
    	var icon = "";
    	var hasEsc = notification.hasEsc===true && localStorage.userApprover?true:false;  	
    	var timeout = notification.timeout?notification.timeout:5000;
    		status = notification.showNotif==="hide"?"hide":"show";

    	switch(notification.type) {
		    case "success":
		        icon = "pficon-ok";
		        break;
		    case "danger":
		        icon = "pficon-error-circle-o";
		        break;
		    case "error":
		        icon = "pficon-error-circle-o";
		        break;
		    case "warning":
		        icon = "pficon-warning-triangle-o";
                break;
		    case "info":
		        icon = "pficon-info";
		        break;
		    default:
		        icon = "hide";
		}
		if(notification.dataEsc){
			notification.dataEsc.password = "";
			notification.dataEsc.keterangan = "";
		}
		$rootScope.userEskalasiApprover = localStorage.userApprover;
		$rootScope.notification  = {
			class	: "toast-pf",
			status	: status,
			type	: notification.type,
			message	: notification.message,
			icon	: icon,
			hasEsc	: hasEsc,
			dataEsc : notification.dataEsc,
			dataItem : notification.dataItem
		};

		$timeout(function () {
			$rootScope.notification.status = "hide";
		}, hasEsc?15000:timeout);
	};
	this.setModalNotification = function(notification){
    	var icon = "";
    	switch(notification.type) {
		    case "success":
		        icon = "pficon-ok";
		        break;
		    case "danger":
		        icon = "pficon-error-circle-o";
		        break;
		    case "error":
		        icon = "pficon-error-circle-o";
		        break;
		    case "warning":
		        icon = "pficon-warning-triangle-o";
                break;
		    case "info":
		        icon = "pficon-info";
		        break;
		    default:
		        icon = "hide";
		}
		
		$rootScope.modalNotification  = {
			class	: "toast-pf",
			status	: "show",
			type	: notification.type, //ex : danger, warning, success,
			message	: notification.message,
			icon	: icon
		};
		$timeout(function () {
			$rootScope.modalNotification.status = "hide";
		}, 5000);
	};
	this.setMessageValidFile = function(){
    	return "Format yang dapat diterima <b>PDF</b> atau <b>JPG</b>, ukuran maks. <b>10MB</b>";
	};
}])
.service('BuildPDF', ['$http','API_PATH', function ($http,API_PATH) {
	this.build = function(filename){
	    $http.get(API_PATH+'file/download?filename='+filename, {responseType:'arraybuffer'})
		.success(function (response) {
			var fileName = filename;
			var fileExtension = fileName.replace(/^.*\./, '');
			if(fileExtension === 'pdf'){
				var file = new Blob([response], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);

			}else if(fileExtension ==='jpg'){
				var file = new Blob([response], {type: 'image/jpeg'});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}

		});
	};
}])
.service('ValidationByAppParams', ['AppParamValue', function (AppParamValue) {
	this.setItem = function(kodeTerminal){
		var kodeTerminal = kodeTerminal?kodeTerminal:localStorage.getItem('kodeTerminal');
	    AppParamValue.get({
			nama: 'CAB_KWS_BEBAS_TUNDA',
			value: kodeTerminal
		}, function(response) {
			var hasWajibTunda = 1;
			if(response.length>0){
				if(response[0].isNumeric){
					hasWajibTunda = 0;
				}
			}
			var dataItem = { CAB_KWS_BEBAS_TUNDA : hasWajibTunda };
			localStorage.setItem('validationByAppParams', JSON.stringify(dataItem));
		});
	};
}])
.service('JasaTunda', function () {
	/*digunakan untuk receive dan retrive data tunda saat realisasi sata mode realisasi bukan normal*/
	var dataJasaTunda = null;

	var addJasaTunda = function(val){
		dataJasaTunda = val;
	};

	var getJasaTunda = function(){
		return dataJasaTunda;
	};

	return {
		addJasaTunda: addJasaTunda,
		getJasaTunda: getJasaTunda
	};
})
.service('JasaPandu', function () {
	/*digunakan untuk receive dan retrive data pandu saat realisasi sata mode realisasi bukan normal*/
	var dataJasaPandu = null;

	var addJasaPandu = function(val){
		dataJasaPandu = val;
	};

	var getJasaPandu = function(){
		return dataJasaPandu;
	};

	return {
		addJasaPandu: addJasaPandu,
		getJasaPandu: getJasaPandu
	};
})
.service('ModeRealisasi', function(){
	/*digunakan untuk receive dan retrive mode realiasi pandu*/
	var modeValue = null;

	var addMode = function(val){
		modeValue = val;
	};

	var getMode = function(){
		return modeValue;
	};

	return {
		addMode : addMode,
		getMode : getMode
	};
})
.service('Validations', ['$rootScope','$timeout','Notification','TipeEskalasi','BindEskalasi','ValidationByAppParams','ServiceAturanGerakPanduTunda','ServiceKapalBebasPanduTunda', function ($rootScope,$timeout,Notification,TipeEskalasi,BindEskalasi,ValidationByAppParams,ServiceAturanGerakPanduTunda,ServiceKapalBebasPanduTunda) {
    this.checkStatusIsVerified = function(data){ 
    	//status 1:belum Verifikasi, status 2:sudah Verifikasi
    	var 
			itemEskalasi = TipeEskalasi.getTipeEskalasi('VALREA022'),
			hasEsc = BindEskalasi.hasTempEskalasi('VALREA022'),
			statusEskalasi = itemEskalasi.id!==undefined?true:false,
			match = false;
		if(hasEsc){
			match = false;
		}else{
	    	var str = data.nama;
			var namaJasa = str.replace("epb_", "").toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();});
	    	if(data.status!==1){

				var messages =  {
					type : "warning",
					message : "Edit jasa "+namaJasa+" "+data.noPpkJasa+" tidak diijinkan, karena telah diverifikasi.<br><br>Kode validasi : <b>VALREA-022</b>",
					hasEsc : statusEskalasi,
					dataItem : data,
					dataEsc : itemEskalasi
				};
				Notification.setNotification(messages);
				match = true;
			}else{
				match = false;
			}
		}
		return match;
	};
	this.checkStatusIsVerifyLabuh = function(data){ 
    	//status 1:belum Verifikasi, status 2:sudah Verifikasi
    	var str = data.nama;
		var namaJasa = str.replace("epb_", "").toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();});
    	if(data.status!==1){
			var messages =  {
				type 	: "warning",
				message : "Edit jasa "+namaJasa+" "+data.noPpkJasa+" tidak diijinkan, karena telah diverifikasi.<br><br>Kode validasi : <b>VALREA-022</b>"
			};
			Notification.setNotification(messages);
			return true;
		}else{
			return false;
		}
	};
	/* Validasi jasa Pandu wajib Tunda */
	this.checkWajibTunda = function(data){
		// Dibukakan lagi validasi pada tanggal 20-07-2017 :
		/* keterangan parameter :
			- data.statusSubmit = 1 adalah data dari form,
			- data.statusSubmit = 2 adalah data detail dari grid
		*/
		ValidationByAppParams.setItem();
		var 
			match = true,
			checkAturanGerakPT,
			checkKapalBebasPT,
			validJenisDermaga = 'AREALABUH',
			isValidationByAppParams = JSON.parse(localStorage.getItem('validationByAppParams')), 
			typeVal = data.loaMaxvalue >= 70?'VALPMH017':'VALPMH011',
			itemEskalasi = TipeEskalasi.getTipeEskalasi(typeVal),
			hasEsc = BindEskalasi.hasTempEskalasi(typeVal),
			statusEskalasi = itemEskalasi.id!==undefined?true:false;

		checkKapalBebasPT = ServiceKapalBebasPanduTunda.checkWajibTunda(data.dataPermohonan.kodeKapal);
		data.loaMaxvalue = data.loaMaxvalue?data.loaMaxvalue:data.loaKapal;

		$rootScope.statusEskalasiModal = statusEskalasi;
		if(hasEsc){
			match = true;
		}else{
			var note =  {  
				hasEsc : statusEskalasi,
				dataEsc : itemEskalasi,
				dataItem : data,
				showNotif : "hide"
			};

			if(isValidationByAppParams.CAB_KWS_BEBAS_TUNDA){
			/*validasi wajib tunda berdasarkan app param CAB_KWS_BEBAS_TUNDA*/
				if(localStorage.validasiWajibPanduTunda==='1'){
				/*validasi wajib pandu tunda berdasarkan app param WAJIB_PANDU_TUNDA*/
					console.log(checkKapalBebasPT);
					if(!checkKapalBebasPT){
						/*Cek ke Master Kapal Bebas Pandu Tunda, apakah kodeKapal terdaftar*/
						if(data.statusSubmit===0){
						/* statusSubmit = 0 adalah data dari SubmitPandu, SubmitGridPandu Peermohonan*/
							/*pandu masuk*/
							if((data.loaKapal>=70 || data.loaMaxvalue >= 70) && (data.jasaTundaGrid.length===undefined || data.jasaTundaGrid.length===0)){
								if((data.jasaPandu.lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg !== validJenisDermaga) ||
									(data.jasaPandu.lokasiAsal.mdmgJenisDmg === validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg !== validJenisDermaga) ||
									(data.jasaPandu.lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg === validJenisDermaga)){
									if(data.jasaPandu){
										checkAturanGerakPT = ServiceAturanGerakPanduTunda.getItem(data.jasaPandu.lokasiAsal.mdmgKode);
										/* Cek lokasi asal pandu pada Aturan Gerak Pandu Tunda*/
										if(!checkAturanGerakPT){
											match = false;
										}	
									}else{
										match = false;
									}
								}
							}
							/*pandu keluar*/
							if((data.loaKapal>=70 || data.loaMaxvalue >= 70) && (data.jasaTundaGrid.length > 0)){
								if((data.jasaPandu.lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg !== validJenisDermaga) ||
									(data.jasaPandu.lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg === validJenisDermaga) ||
									(data.jasaPandu.lokasiAsal.mdmgJenisDmg === validJenisDermaga && data.jasaPandu.lokasiTujuan.mdmgJenisDmg !== validJenisDermaga)){
									match = false;
								}
							}
						} else if(data.statusSubmit===1){
							/* statusSubmit = 1 adalah data dari GreenBtn Permohonan*/

							if(data.loaKapal>=70 && data.jasaPanduGrid.length > 0 && (data.jasaTundaGrid.length===0 || data.jasaTundaGrid.length===undefined)){
								for (var i = 0; i < data.jasaPanduGrid.length; i++) {
									if((data.jasaPanduGrid[i].lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPanduGrid[i].lokasiTujuan.mdmgJenisDmg !== validJenisDermaga) ||
										(data.jasaPanduGrid[i].lokasiAsal.mdmgJenisDmg === validJenisDermaga && data.jasaPanduGrid[i].lokasiTujuan.mdmgJenisDmg !== validJenisDermaga) ||
										(data.jasaPanduGrid[i].lokasiAsal.mdmgJenisDmg !== validJenisDermaga && data.jasaPanduGrid[i].lokasiTujuan.mdmgJenisDmg === validJenisDermaga)
										){
										if(data.jasaPanduGrid[i].jenisGerakan==='1'){
											checkAturanGerakPT = ServiceAturanGerakPanduTunda.getItem(data.jasaPanduGrid[i].lokasiAsal.mdmgKode);
											/*Cek lokasi asal pandu pada Aturan Gerak Pandu Tunda*/
											if(!checkAturanGerakPT){
												match = false;
											}
										}else{
											match = false;	
										}
									}
								}
							}
						}
					} /* end Cek ke Master Kapal Bebas Pandu Tunda, apakah kodeKapal terdaftar */
				} /* end validasi wajib pandu tunda berdasarkan app param WAJIB_PANDU_TUNDA */
			} /* end validasi wajib tunda berdasarkan app param CAB_KWS_BEBAS_TUNDA */
			if(!match)Notification.setNotification(note);
		}
		return match;
	};
	this.checkValidEndDate = function(data){
		var match = false;
    	var parseStartDate = Date.parse(data.startDate);
		var parseEndDate = Date.parse(data.endDate);
		var titleStartDate = 'Tgl Mulai';
		var titleEndDate = 'Tgl Selesai';
		if(data.titleStartDate && data.titleEndDate){
			titleStartDate = data.titleStartDate;
			titleEndDate = data.titleEndDate;
		}

		if(parseEndDate < parseStartDate){
			var note =  {
				type 	: "warning",
				message : "<b>"+titleEndDate+"</b> harus melebihi <b>"+titleStartDate+"</b>"
			};
			Notification.setNotification(note);
			match = true;
		}
		return match;
	};
	this.checkStartEndDate = function(data){
		var match = true;
    	var parseStartDate = Date.parse(data.startDate);
		var parseEndDate = Date.parse(data.endDate);
		var titleStartDate = data.titleStartDate;
		var titleEndDate = data.titleEndDate;

		if(parseEndDate && parseStartDate>parseEndDate){
			var note =  {
				type 	: "warning",
				message : "<b>"+titleEndDate+"</b> harus melebihi <b>"+titleStartDate+"</b>.<br><br>Kode validasi : <b>VALREA-001</b>"
			};
			Notification.setNotification(note);
			match = false;
		}
		return match;
	};
	this.maxKadeMeter = function(data){
		var match = true;
		if(data.kadeAwal>data.maxKadeMeter){
			var note =  {
				type	: 'warning',
				message	: 'Kade Meter melebihi batas maksimal Kade.<br><br>Kode validasi : <b>VALPTP-004</b>'
			};
			Notification.setNotification(note);
			match = false;
		}
		return match;
	};
}])
.service('WaitingTime', ['$timeout',function($timeout){
	this.default = function(){
		$timeout(function(){
			console.log('1');
		}, 2000);
	};
	this.custom = function(timeValue){
		$timeout(function(){
			console.log('2');
		}, timeValue);
	};
}])
.service('KapalLangsungSandar', function(){
	/* digunakan untuk mengetahui kapal langsung sandar ato berlabuh dikolam labuh*/
	this.jasaLabuh = function(past,current){
		var dataLabuh;
		if(past.length>0 && current.length===0){
			dataLabuh = past;
		}else if(past.length===0 && current.length>0){
			dataLabuh = current;
		}else{
			dataLabuh = current;
		}

		if(dataLabuh.length > 0){
			if(dataLabuh[0].jenisDermaga != null){
				if(dataLabuh[0].jenisDermaga.indexOf('DMG') >= 0 ){
					/*langsung sandar*/
					return true;
				}else{
					/*berlabuh*/
					return false;
				}				
			}
		}else{
			return false;
		}

	}
})
.service('validationForm',['Notification',function(Notification){
	/*validasi form input required*/
	this.required = function(label,value){
		var note = {
				type	: 'warning',
				message	: '<strong>'+label+' Harus Diisi.</strong>'
			}
		if(value == '' || value == null){			
			Notification.setNotification(note);
			return false;
		}else{
			return true;
		}
	}
}])
.service('ParameterSiklus', function(){
	var params = [
	{
		'id' : 1,
		'name' : 'NORMAL',
		'labuh' : true,
		'tambat' : true,
		'masuk' : true,
		'pindah' : false,
		'keluar' : true,
		'tunda' : true
	},
	{
		'id' : 2,
		'name' : 'PTS TNP GRKN KELUAR',
		'labuh' : true,
		'tambat' : false,
		'masuk' : true,
		'pindah' : false,
		'keluar' : false,
		'tunda' : false
	},
	{
		'id' : 3,
		'name' : 'PTS TNP GRKN MASUK',
		'labuh' : true,
		'tambat' : false,
		'masuk' : false,
		'pindah' : false,
		'keluar' : true,
		'tunda' : false		
	},
	{
		'id' : 4,
		'name' : 'TANPA LABUH TAMBAT',
		'labuh' : false,
		'tambat' : false,
		'masuk' : true,
		'pindah' : true,
		'keluar' : true,
		'tunda' : false				
	},
	{
		'id' : 5,
		'name' : 'PTS TNP GRKN MASUK KELUAR',
		'labuh' : true,
		'tambat' : false,
		'masuk' : false,
		'pindah' : true,
		'keluar' : false,
		'tunda' : false				
	}]
	return params;
})
.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
              //Also remove . and , so its gives a cleaner result.
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
})
.filter("timeago", function () {
   return function (time, local, raw) {
      if (!time) return "never";

      if (!local) {
         (local = Date.now())
      }

      if (angular.isDate(time)) {
         time = time.getTime();
      } else if (typeof time === "string") {
         time = new Date(time).getTime();
      }

      if (angular.isDate(local)) {
         local = local.getTime();
      }else if (typeof local === "string") {
         local = new Date(local).getTime();
      }

      if (typeof time !== 'number' || typeof local !== 'number') {
         return;
      }

      var
         offset = Math.abs((local - time) / 1000),
         span = [],
         MINUTE = 60,
         HOUR = 3600,
         DAY = 86400,
         WEEK = 604800,
         MONTH = 2629744,
         YEAR = 31556926,
         DECADE = 315569260;

      if (offset <= MINUTE)              span = [ '', raw ? 'now' : 'less than a minute' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
      else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'decade' ];
      else                               span = [ '', 'a long time' ];

      span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
      span = span.join(' ');

      if (raw === true) {
          return span;
      }
      return (time <= local) ? span + ' ago' : 'in ' + span;

      /*if (offset <= MINUTE)              span = [ '', raw ? 'now' : 'less than a minute' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
      else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'decade' ];
      else                               span = [ '', 'a long time' ];

      span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
      span = span.join(' ');

      if (raw === true) {
          return span;
      }
      return (time <= local) ? span + ' ago' : 'in ' + span;*/
   }
})
.directive('autoscroll', function () {
  return function(scope, element, attrs) {
    var pos = element[0].parentNode.parentNode.scrollHeight;
    $(element).parent().parent().animate({
      scrollTop : pos
    }, 1);
  };
})
.factory('socket', function ($rootScope, MOL_PATH) {
  var socket = io.connect(MOL_PATH);
  if (socket.socket.connected === false) {
    // console.warn("Socket.io di "+MOL_PATH+" offline, tetapi ini tidak menyebabkan gangguan pada aplikasi VASA. (Mohon untuk menghubungi IT Pelindo untuk run "+MOL_PATH+")");
  }
  var disconnect = false;
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        if (!disconnect) {
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        }
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },
    disconnect: function() {
      disconnect = true;
      socket.disconnect();
    }
  }
})
.service('PushToMeetingOnline', ['$rootScope','$routeParams','$timeout','$filter','MeetingMessageAdd','PermohonanList','PersiapanPrameetingGet','AppParam','socket', function ($rootScope,$routeParams,$timeout,$filter,MeetingMessageAdd,PermohonanList,PersiapanPrameetingGet,AppParam,socket) {
	var splitDate = function(date, type){
		var date2;
		if(type===1){
			date2 = $filter('date')(new Date(date),'dd-MM-yyyy')
		}else{
			date2 = $filter('date')(new Date(date),'HH:mm')
		}
		return date2;
	};
	var saveMessage = function(item){
		var messageForm = {
            agenFrom    : item.nama,
        	userNameFrom: item.nama,
            userFrom    : 'sistemvasa',
            noRuang     : item.noRuang,
            idMeeting   : parseInt(item.idMeeting),
            message     : item.message,
            fileAttach  : '',
            userRole    : '3',
        	status      : 1
        }
        console.log(messageForm);
        var formData = new FormData();
        formData.append('meetingMessage', new Blob([JSON.stringify(messageForm)], { type: "application/json" }));
        MeetingMessageAdd.save(formData,function(response){
            if(response.id){
                socket.emit('sendMessageByAppVasa', response);
            }
        });
	};
	this.setMessage = function(typeMethod,newValue,oldValue){
		var 
			message, kodeAgen, subject,
			createRoom = false,
			cekPenetapanMeeting = true,
			noRuang = [],
			kodeCabang = localStorage.kodeCabang.length < 2 ? '0' +	localStorage.kodeCabang : localStorage.kodeCabang,
			formatTglMeeting = $filter('date')($routeParams.tgl, 'yyMMdd'),
			paramKodeDermaga = $routeParams.kodeDermaga;

		var isMeetingSusulan = newValue.isMeetingSusulan?true:false,
			numberTL = '00',
			isTL = newValue.tl?true:false,
			textTL = isTL?'TL':'';
		/* Cek cabang Meeting Online */
		AppParam.get({
			nama 	: 'CAB_MEETINGONLINE',
			value 	: kodeCabang
		}, function(response) {
			if(response.content.length>0){
				PermohonanList.get({
					noPpk1  : newValue.noPpk1,
					size 	: 1
				},function(response){
					if(response.content){
						var kodeAgen = response.content[0].kodeAgen;
						console.log('deleteKapalPerencanaan');
						console.log(typeMethod);
			    	/* Runyem banget ini message :: */
				    	switch(typeMethod) {
						    case "tambahKapalPerencanaan":
						    	subject = "Informasi Penambahan Kapal";
						    	message = "Kapal <b>"+newValue.namaKapal+" ("+newValue.kodeKapal+") </b> telah ditambahkan ke antrian Lokasi <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+")</b>";
						    	if(isTL){
						    		noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL});
						    	}else{
							    	if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
							    }
								createRoom = true;
						        break;
						    case "tambahKapalTLPerencanaan":
						    	subject = "Informasi Penambahan Kapal TL";
						    	message = "Kapal "+textTL+" <b>"+newValue.namaKapal+" ("+newValue.kodeKapal+") </b> telah ditambahkan ke antrian Lokasi <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+")</b>";
						    	if(isTL){
						    		noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL});
						    	}else{
							    	if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
							    }
								createRoom = true;
						        break;
						    case "editKapalPerencanaan":
						    	subject = "Informasi Perubahan Kapal";
						        message = "Kapal <b>"+oldValue.namaKapal+" ("+oldValue.kodeKapal+") </b> telah dilakukan perubahan.<br><br>Informasi Tambat : <br>Lokasi : <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+")</b><br>Tgl. Mulai : <b>"+splitDate(newValue.mulai,1)+" "+splitDate(newValue.mulai,2)+"</b><br>Tgl. Selesai : <b>"+splitDate(newValue.selesai,1)+" "+splitDate(newValue.selesai,2)+"</b><br>Kade Meter : <b>"+newValue.kadeAwal+" - "+newValue.kadeAkhir+"</b><br>Arah Kapal : <b>"+newValue.arahKapal+"</b>";
						    		if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
						        break;
						    case "pindahKapalPerencanaan":
						    	console.log("pindahKapalPerencanaan");
						    	subject = "Informasi Perpindahan Kapal";
						    	newValue.namaDermaga = newValue.namaDermaga?newValue.namaDermaga:newValue.namaLokasi;
						    	newValue.kodeDermaga = newValue.kodeDermaga?newValue.kodeDermaga:newValue.kodeLokasi;
					    		message = "Kapal <b>"+oldValue.namaKapal+" ("+oldValue.kodeKapal+") </b> telah dilakukan perpindahan Lokasi Dermaga dari <b>"+newValue.namaDermagaBefore+" ("+newValue.kodeDermagaBefore+")</b> ke <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+").";
						    		if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
								createRoom = true;
								break;
							case "penetapanMeeting":
						    	subject = "Informasi Penetapan Meeting";
					    		message = "Meeting pada dermaga <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+") </b> telah ditetapkan.";
						    		if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
								break;
							    cekPenetapanMeeting = true;
							case "penetapanMeetingSusulan":
						    	subject = "Informasi Penetapan Meeting";
					    		message = "Meeting pada dermaga <b>"+newValue.namaDermaga+" ("+newValue.kodeDermaga+") </b> telah ditetapkan.";
						    		if(isMeetingSusulan){
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							    	}else{
										noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							    	}
							    cekPenetapanMeeting = true;
								break;
						    case "deleteKapalPerencanaan":
						    	oldValue.kodeKapal = oldValue.kodeKapal?oldValue.kodeKapal:newValue.kodeKapal;
						    	oldValue.namaKapal = oldValue.namaKapal?oldValue.namaKapal:newValue.namaKapal;
						    	oldValue.kodeDermaga = oldValue.kodeDermaga?oldValue.kodeDermaga:oldValue.kodeLokasi;
						    	oldValue.namaDermaga = oldValue.namaDermaga?oldValue.namaDermaga:oldValue.namaLokasi;
						    	subject = "Informasi Hapus Kapal dari perencanaan";
						        message = "Kapal <b>"+oldValue.namaKapal+" ("+oldValue.kodeKapal+") </b> telah dihilangkan dari antrian Lokasi <b>"+oldValue.namaDermaga+" ("+oldValue.kodeDermaga+")</b>.";
						    		if(isMeetingSusulan){
							    		noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+kodeAgen});
							        }else{
							    		noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
							        }
								createRoom = true;
						        break;
						    default:
						        message = "Test komunikasi Realtime";
						    	noRuang.push({noRuang : formatTglMeeting+'.'+kodeCabang+'.'+numberTL+'.'+paramKodeDermaga});
						}

						noRuang.forEach(function (item) {
							var itemMessage = {
						        nama        : 'Sistem VASA',
						        noRuang     : item.noRuang,
						        message     : message,
						        idMeeting 	: formatTglMeeting+kodeCabang,
						    };
						    saveMessage(itemMessage);
							/* Untuk menampilkan modal pop up jika ada room baru */
							if(createRoom){
								var ItemRoom = {
									kodeAgen 	: kodeAgen,
									noRuang 	: item.noRuang,
									idMeeting 	: formatTglMeeting+""+kodeCabang,
									newValue	: newValue,
									oldValue	: oldValue,
									message 	: message,
									subject		: subject
								}
					            socket.emit('createRoomByAppVasa', ItemRoom);
							}
						});

						/* Untuk Disable chat meeting online jika sudah ditetapkan meeting*/
						if(cekPenetapanMeeting){
					        socket.emit('checkPenetapanMeeting', noRuang);
						}
					};
				});
			}
		});
	}
	// };
}])
.directive('capitalize', function() {
	return {
	  require: 'ngModel',
	  link: function(scope, element, attrs, modelCtrl) {
	    var capitalize = function(inputValue) {
	      // if (inputValue == undefined) inputValue = '';
	      if(typeof inputValue==='string'){
		      var capitalized = inputValue.toUpperCase();
		      if (capitalized !== inputValue) {
		        modelCtrl.$setViewValue(capitalized);
		        modelCtrl.$render();
		      }
		      return capitalized;
	      }
	    }
	    modelCtrl.$parsers.push(capitalize);
	    capitalize(scope[attrs.ngModel]);
	  }
	};
})
.filter('formatCurr', ['$filter', function($filter) {
    return function(input) {
       	input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 4);
        var str = '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var res = str.split(".");
		var value = "";
		if(res.length===2){
			var mystring = res[1];
			var res2 = mystring.replace(",", "");
			value = res[0]+'.'+res2;
		}else{
			value = str;
		}
        // return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return value;
    };
}])
.filter('formatCurr2', ['$filter', function($filter) {
    return function(input,test) {
       	input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        var str = '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		var res = str.split(".");
		var value = "";
		if(res.length===2){
			var mystring = res[1];
			var res2 = mystring.replace(",", "");
			value = res[0]+'.'+res2;
		}else{
			value = str;
		}
        // return '' + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return value;
    };
}])
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
})
;

