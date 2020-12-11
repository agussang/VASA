'use strict';

/**
 * @ngdoc overview
 * @name vasaApp
 * @description
 * # vasaApp
 *
 * Main module of the application.
 */
angular
.module('vasaApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'patternfly',
	'mgcrea.ngStrap',
	'ui.codemirror',
	'ui.bootstrap',
	'angular.filter',
	'highcharts-ng',
	'patternfly.charts',
	'base64',
	'naif.base64',
	'infinite-scroll',
	'mwl.calendar'
])
.provider('RouteData', function () {
  	var settings = {};
  	var hookToRootScope = false;

  	this.applyConfig = function(newSettings) {
    	settings = newSettings;
  	};

  	this.hookToRootScope = function(enableRootScopeHook) {
    	hookToRootScope = enableRootScopeHook;
  	};

  	function RouteData() {

    	this.set = function(index, value) {
      		settings[index] = value;
    	};

    	this.get = function(index) {
      		if(settings.hasOwnProperty(index)) {
        		return settings[index];
      		} 
    	};

    this.isHookedToRootSope = function() {
      		return hookToRootScope;
    	};
  	}

  	this.$get = function() {
      	return new RouteData();
  	};
})
.config(['$routeProvider','$provide', '$httpProvider','RouteDataProvider', function ($routeProvider, $provide, $httpProvider,RouteDataProvider) {
	RouteDataProvider.applyConfig({
    	bodyStyle: {
      		'background-color': 'white'
   		 }
	});

	RouteDataProvider.hookToRootScope(true);


	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main',
		title: 'Dashboard'
	})
	.when('/403', {
		templateUrl: 'views/403.html',
		title: '403',
		controller: '403Ctrl',
		controllerAs: '403'
	})
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about',
		title: 'About Vasa'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl',
		controllerAs: 'login',
		title: 'Login'
	})
	.when('/eskalasi', {
		templateUrl: 'views/eskalasi/escModal.html',
		controller: 'EskalasiCtrl',
		controllerAs: 'eskalasi',
		title: 'Eskalasi'
	})
	.when('/labuh/view/:id', {
		templateUrl: 'views/labuh/view.html',
		controller: 'LabuhViewCtrl',
		controllerAs: 'labuh/view',
		title: 'Tarif Labuh Detail',
		kodeMenu: '2501',
		flagMenu: 'rflag'
	})
	.when('/labuh/list', {
		templateUrl: 'views/labuh/list.html',
		controller: 'LabuhListCtrl',
		controllerAs: 'labuh/list',
		title: 'Tarif Labuh List',
		kodeMenu: '2501',
		flagMenu: 'rflag'
	})
	.when('/labuh/edit/:id', {
		templateUrl: 'views/labuh/edit.html',
		controller: 'LabuhEditCtrl',
		controllerAs: 'labuh/edit',
		title: 'Tarif Labuh Edit',
		kodeMenu: '2501',
		flagMenu: 'uflag'
	})
	.when('/labuh/new', {
		templateUrl: 'views/labuh/new.html',
		controller: 'LabuhNewCtrl',
		controllerAs: 'labuh/new',
		title: 'Tarif Labuh Baru',
		kodeMenu: '2501',
		flagMenu: 'cflag'
	})
	.when('/tambat/list', {
		templateUrl: 'views/tambat/list.html',
		controller: 'TambatListCtrl',
		controllerAs: 'tambat/list',
		title: 'Tarif Tambat List',
		kodeMenu: '2502',
		flagMenu: 'rflag'
	})
	.when('/tambat/new', {
		templateUrl: 'views/tambat/new.html',
		controller: 'TambatNewCtrl',
		controllerAs: 'tambat/new',
		title: 'Tarif Tambat Baru',
		kodeMenu: '2502',
		flagMenu: 'cflag'
	})
	.when('/tambat/edit/:id', {
		templateUrl: 'views/tambat/edit.html',
		controller: 'TambatEditCtrl',
		controllerAs: 'tambat/edit',
		title: 'Tarif Tambat Edit',
		kodeMenu: '2502',
		flagMenu: 'uflag'
	})
	.when('/tambat/view/:id', {
		templateUrl: 'views/tambat/view.html',
		controller: 'TambatViewCtrl',
		controllerAs: 'tambat/view',
		title: 'Tarif Tambat Detail',
		kodeMenu: '2502',
		flagMenu: 'rflag'
	})
	.when('/airkapal/view/:id', {
		templateUrl: 'views/airkapal/view.html',
		controller: 'AirkapalViewCtrl',
		controllerAs: 'airkapal/view',
		title: 'Tarif Air Kapal Detail',
		kodeMenu: '2503',
		flagMenu: 'rflag'
	})
	.when('/airkapal/list', {
		templateUrl: 'views/airkapal/list.html',
		controller: 'AirkapalListCtrl',
		controllerAs: 'airkapal/list',
		title: 'Tarif Air Kapal List',
		kodeMenu: '2503',
		flagMenu: 'rflag'
	})
	.when('/airkapal/edit/:id', {
		templateUrl: 'views/airkapal/edit.html',
		controller: 'AirkapalEditCtrl',
		controllerAs: 'airkapal/edit',
		title: 'Tarif Air Kapal Edit',
		kodeMenu: '2503',
		flagMenu: 'uflag'
	})
	.when('/airkapal/new', {
		templateUrl: 'views/airkapal/new.html',
		controller: 'AirkapalNewCtrl',
		controllerAs: 'airkapal/new',
		title: 'Tarif Air Kapal Baru',
		kodeMenu: '2503',
		flagMenu: 'cflag'
	})
	.when('/pandu/list', {
		templateUrl: 'views/pandu/list.html',
		controller: 'PanduListCtrl',
		controllerAs: 'pandu/list',
		title: 'Tarif Pandu List',
		kodeMenu: '2504',
		flagMenu: 'rflag'
	})
	.when('/pandu/edit/:id', {
		templateUrl: 'views/pandu/edit.html',
		controller: 'PanduEditCtrl',
		controllerAs: 'pandu/edit',
		title: 'Tarif Pandu Edit',
		kodeMenu: '2504',
		flagMenu: 'uflag'
	})
	.when('/pandu/new', {
		templateUrl: 'views/pandu/new.html',
		controller: 'PanduNewCtrl',
		controllerAs: 'pandu/new',
		title: 'Tarif Pandu Baru',
		kodeMenu: '2504',
		flagMenu: 'cflag'
	})
	.when('/pandu/view/:id', {
		templateUrl: 'views/pandu/view.html',
		controller: 'PanduViewCtrl',
		controllerAs: 'pandu/view',
		title: 'Tarif Pandu Detail',
		kodeMenu: '2504',
		flagMenu: 'rflag'
	})
	.when('/tunda/list', {
		templateUrl: 'views/tunda/list.html',
		controller: 'TundaListCtrl',
		controllerAs: 'tunda/list',
		title: 'Tarif Tunda List',
		kodeMenu: '2505',
		flagMenu: 'rflag'
	})
	.when('/tunda/view/:id', {
		templateUrl: 'views/tunda/view.html',
		controller: 'TundaViewCtrl',
		controllerAs: 'tunda/view',
		title: 'Tarif Tunda Detail',
		kodeMenu: '2505',
		flagMenu: 'rflag'
	})
	.when('/tunda/new', {
		templateUrl: 'views/tunda/new.html',
		controller: 'TundaNewCtrl',
		controllerAs: 'tunda/new',
		title: 'Tarif Tunda Baru',
		kodeMenu: '2505',
		flagMenu: 'cflag'
	})
	.when('/tunda/edit/:id', {
		templateUrl: 'views/tunda/edit.html',
		controller: 'TundaEditCtrl',
		controllerAs: 'tunda/edit',
		title: 'Tarif Tunda Edit',
		kodeMenu: '2505',
		flagMenu: 'uflag'
	})
	.when('/transaksi/penetapan', {
		templateUrl: 'views/transaksi/daftarpenetapan.html',
		controller: 'DaftarPenetapanCtrl',
		controllerAs: 'DaftarPenetapanCtrl/penetapan',
		title: 'Daftar Penetapan',
		kodeMenu: '3204',
		flagMenu: 'rflag'

	})
	.when('/transaksi/penetapan/:ppk1', {
		templateUrl: 'views/transaksi/daftarpenetapan.html',
		controller: 'DaftarPenetapanCtrl',
		controllerAs: 'DaftarPenetapanCtrl/penetapan',
		title: 'Daftar Penetapan',
		kodeMenu: '3204',
		flagMenu: 'rflag'

	})
	.when('/transaksi/listPenetapan/:ppk1', {
		templateUrl: 'views/transaksi/daftarpenetapan.html',
		controller: 'DaftarPenetapanCtrl',
		controllerAs: 'DaftarPenetapanCtrl/penetapan',
		title: 'Daftar Penetapan',
		kodeMenu: '3204',
		flagMenu: 'rflag'

	})
	.when('/transaksi/listPenetapan/:ppk1/:urutan', {
		templateUrl: 'views/transaksi/daftarpenetapan.html',
		controller: 'DaftarPenetapanCtrl',
		controllerAs: 'DaftarPenetapanCtrl/penetapan',
		title: 'Daftar Penetapan',
		kodeMenu: '3204',
		flagMenu: 'rflag'

	})
	.when('/transaksi/realisasi', {
		templateUrl: 'views/transaksi/daftarrealisasi.html',
		controller: 'DaftarRealisasiCtrl',
		controllerAs: 'DaftarRealisasiCtrl/realisasi',
		title: 'Daftar Realisasi',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/transaksi/realisasi/:ppk1', {
		templateUrl: 'views/transaksi/daftarrealisasi.html',
		controller: 'DaftarRealisasiCtrl',
		controllerAs: 'DaftarRealisasiCtrl/realisasi',
		title: 'Daftar Realisasi',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listRealisasi/:ppk1', {
		templateUrl: 'views/transaksi/daftarrealisasi.html',
		controller: 'DaftarRealisasiCtrl',
		controllerAs: 'DaftarRealisasiCtrl/realisasi',
		title: 'Daftar Realisasi',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listRealisasi/:ppk1/:urutan', {
	templateUrl: 'views/transaksi/daftarrealisasi.html',
		controller: 'DaftarRealisasiCtrl',
		controllerAs: 'DaftarRealisasiCtrl/realisasi',
		title: 'Daftar Realisasi',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/transaksi/permohonanlist', {
		templateUrl: 'views/transaksi/daftarpermohonan.html',
		controller: 'DaftarPermohonanCtrl',
		controllerAs: 'DaftarPermohonanCtrl/permohonan',
		title: 'Daftar Permohonan',
		kodeMenu: '3202',
		flagMenu: 'rflag'
	})
	.when('/transaksi/permohonanlist/:ppk1', {
		templateUrl: 'views/transaksi/daftarpermohonan.html',
		controller: 'DaftarPermohonanCtrl',
		controllerAs: 'DaftarPermohonanCtrl/permohonan',
		title: 'Daftar Permohonan',
		kodeMenu: '3202',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listPermohonan/:ppk1', {
		templateUrl: 'views/transaksi/daftarpermohonan.html',
		controller: 'DaftarPermohonanCtrl',
		controllerAs: 'DaftarPermohonanCtrl/permohonan',
		title: 'Daftar Permohonan',
		kodeMenu: '3202',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listPermohonan/:ppk1/:urutan', {
		templateUrl: 'views/transaksi/daftarpermohonan.html',
		controller: 'DaftarPermohonanCtrl',
		controllerAs: 'DaftarPermohonanCtrl/permohonan',
		title: 'Daftar Permohonan',
		kodeMenu: '3202',
		flagMenu: 'rflag'
	})
	.when('/transaksi/list', {
		templateUrl: 'views/transaksi/list.html',
		controller: 'TransaksiListCtrl',
		controllerAs: 'transaksi/list',
		title: 'Transaksi',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/transaksi/new', {
		templateUrl: 'views/transaksi/layanannew.html',
		controller: 'TransaksiLayanannewCtrl',
		controllerAs: 'transaksi/layananNew',
		title: 'Layanan Baru',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/transaksi/permohonan/:id/:urutan', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/transaksi/permohonan/:id/:urutan/:escMode', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/transaksi/jasabaru/:kodeKapal', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan Tambah Jasa',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/transaksi/permohonan', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/transaksi/realisasi/:ppk1/:urutan', {
		templateUrl: 'views/transaksi/realisasi.html',
		controller: 'RealisasiPermohonanCtrl',
		controllerAs: 'transaksi/realisasi',
		title: 'Realisasi',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listmonitoring', {
		templateUrl: 'views/transaksi/listmonitoring.html',
		controller: 'MonitoringListCtrl',
		controllerAs: 'transaksi/listmonitoring',
		title: 'Monitoring',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listmonitoring/:ppk1', {
		templateUrl: 'views/transaksi/listmonitoring.html',
		controller: 'MonitoringListCtrl',
		controllerAs: 'transaksi/listmonitoring',
		title: 'Monitoring',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listmonitoring/namaKapal/:namaKapal', {
		templateUrl: 'views/transaksi/listmonitoring.html',
		controller: 'MonitoringListCtrl',
		controllerAs: 'transaksi/listmonitoring',
		title: 'Monitoring',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/transaksi/listmonitoring/idvisit/:idVisit', {
		templateUrl: 'views/transaksi/listmonitoring.html',
		controller: 'MonitoringListCtrl',
		controllerAs: 'transaksi/listmonitoring',
		title: 'Monitoring',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about',
		title: 'About',
		kodeMenu: '',
		flagMenu: 'rflag'
	})
	.when('/transaksi/penetapan/:ppk1/:urutan', {
		templateUrl: 'views/transaksi/penetapannew.html',
		controller: 'TransaksiPenetapannewCtrl',
		controllerAs: 'transaksi/penetapannew',
		title: 'Penetapan',
		kodeMenu: '3204',
		flagMenu: 'uflag'
	})
	.when('/airkapal/permohonan', {
		templateUrl: 'views/daftarairkapal/permohonan.html',
		controller: 'DaftarPermohonanAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/permohonan',
		title: 'Daftar Permohonan Air Kapal',
		kodeMenu: '3301',
		flagMenu: 'rflag'
	})
	.when('/airkapal/permohonan/:ppk1', {
		templateUrl: 'views/daftarairkapal/permohonan.html',
		controller: 'DaftarPermohonanAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/permohonan',
		title: 'Daftar Permohonan Air Kapal',
		kodeMenu: '3301',
		flagMenu: 'rflag'
	})
	.when('/airkapal/penetapan', {
		templateUrl: 'views/daftarairkapal/penetapan.html',
		controller: 'DaftarPenetapanAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/penetapan',
		title: 'Daftar Penetapan Air Kapal',
		kodeMenu: '3302',
		flagMenu: 'rflag'
	})
	.when('/airkapal/penetapan/:ppk1', {
		templateUrl: 'views/daftarairkapal/penetapan.html',
		controller: 'DaftarPenetapanAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/penetapan',
		title: 'Daftar Penetapan Air Kapal',
		kodeMenu: '3302',
		flagMenu: 'rflag'
	})
	.when('/airkapal/realisasi', {
		templateUrl: 'views/daftarairkapal/realisasi.html',
		controller: 'DaftarRealisasiAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/realisasi',
		title: 'Daftar Realisasi Air Kapal',
		kodeMenu: '3303',
		flagMenu: 'rflag'
	})
	.when('/airkapal/realisasi/:ppk1', {
		templateUrl: 'views/daftarairkapal/realisasi.html',
		controller: 'DaftarRealisasiAirKapalCtrl',
		controllerAs: 'DaftarAirKapalCtrl/realisasi',
		title: 'Daftar Realisasi Air Kapal',
		kodeMenu: '3303',
		flagMenu: 'rflag'
	})
	.when('/pandu/list/:idList', {
		templateUrl: 'views/pandu/list.html',
		controller: 'PanduListCtrl',
		controllerAs: 'pandu/list',
		title: 'Tarif Pandu',
		kodeMenu: '2504',
		flagMenu: 'rflag'
	})
	.when('/pandu/edit', {
		templateUrl: 'views/pandu/edit.html',
		controller: 'PanduEditCtrl',
		controllerAs: 'pandu/edit',
		title: 'Tarif Pandu Edit',
		kodeMenu: '2504',
		flagMenu: 'uflag'
	})
	.when('/pandu/new', {
		templateUrl: 'views/pandu/new.html',
		controller: 'PanduNewCtrl',
		controllerAs: 'pandu/new',
		title: 'Tarif Pandu Baru',
		kodeMenu: '2504',
		flagMenu: 'cflag'
	})
	.when('/pandu/view/:id', {
		templateUrl: 'views/pandu/view.html',
		controller: 'PanduViewCtrl',
		controllerAs: 'pandu/view',
		title: 'Tarif Pandu Detail',
		kodeMenu: '2504',
		flagMenu: 'rflag'
	})
	.when('/tunda/list', {
		templateUrl: 'views/tunda/list.html',
		controller: 'TundaListCtrl',
		controllerAs: 'tunda/list',
		title: 'Tarif Tunda List',
		kodeMenu: '2505',
		flagMenu: 'rflag'
	})

	.when('/tunda/view', {
		templateUrl: 'views/tunda/view.html',
		controller: 'TundaViewCtrl',
		controllerAs: 'tunda/view',
		kodeMenu: '2505',
		flagMenu: 'rflag'
	})
	.when('/tunda/new', {
		templateUrl: 'views/tunda/new.html',
		controller: 'TundaNewCtrl',
		controllerAs: 'tunda/new',
		title: 'Tarif Tunda Baru',
		kodeMenu: '2505',
		flagMenu: 'cflag'
	})
	.when('/tunda/edit/:id', {
		templateUrl: 'views/tunda/edit.html',
		controller: 'TundaEditCtrl',
		controllerAs: 'tunda/edit',
		title: 'Tarif Tunda Edit',
		kodeMenu: '2505',
		flagMenu: 'uflag'
	})
	.when('/kepil/list', {
		templateUrl: 'views/kapalkepil/list.html',
		controller: 'KapalKepilCtrl',
		controllerAs: 'kapalkepil/list',
		kodeMenu: '2506',
		flagMenu: 'rflag'
	})
	.when('/kepil/view/:id', {
		templateUrl: 'views/kapalkepil/view.html',
		controller: 'KapalKepilViewCtrl',
		controllerAs: 'kapalkepil/view',
		title: 'Tarif Kapal Kepil Detail',
		kodeMenu: '2506',
		flagMenu: 'rflag'
	})
	.when('/kepil/new', {
		templateUrl: 'views/kapalkepil/new.html',
		controller: 'KapalKepilNewCtrl',
		controllerAs: 'kapalkepil/new',
		title: 'Tarif Kapal kepil Baru',
		kodeMenu: '2506',
		flagMenu: 'cflag'
	})
	.when('/kepil/edit/:id', {
		templateUrl: 'views/kapalkepil/edit.html',
		controller: 'KapalKepilEditCtrl',
		controllerAs: 'kapalkepil/edit',
		title: 'Tarif Kapal Kepil Edit',
		kodeMenu: '2506',
		flagMenu: 'uflag'
	})
	.when('/masterdermagakepil/list', {
		templateUrl: 'views/masterdermagakepil/list.html',
		controller: 'MasterDermagaKepilListCtrl',
		controllerAs: 'masterdermagakepil/list',
		title: 'Master Dermaga Kepil List',
		kodeMenu: '2209',
		flagMenu: 'rflag'

	})
	.when('/masterdermagakepil/view/:id', {
		templateUrl: 'views/masterdermagakepil/view.html',
		controller: 'MasterDermagaKepilViewCtrl',
		controllerAs: 'masterdermagakepil/view',
		title: 'Master Dermaga Kepil Detail',
		kodeMenu: '2209',
		flagMenu: 'rflag'
	})
	.when('/masterdermagakepil/edit/:id', {
		templateUrl: 'views/masterdermagakepil/edit.html',
		controller: 'MasterDermagaKepilEditCtrl',
		controllerAs: 'masterdermagakepil/edit',
		title: 'Master Dermaga Kepil Edit',
		kodeMenu: '2209',
		flagMenu: 'uflag'
	})
	.when('/masterdermagakepil/new', {
		templateUrl: 'views/masterdermagakepil/new.html',
		controller: 'MasterDermagaKepilNewCtrl',
		controllerAs: 'masterdermagakepil/new',
		title: 'Master Dermaga Kepil Baru',
		kodeMenu: '2209',
		flagMenu: 'cflag'
	})
	.when('/kapalcharter/list', {
		templateUrl: 'views/kapalcharter/list.html',
		controller: 'KapalCharterListCtrl',
		controllerAs: 'kapalcharter/list',
		title: 'Master Kapal Charter List',
		kodeMenu: '2201',
		flagMenu: 'rflag'
	})
	.when('/kapalcharter/new', {
		templateUrl: 'views/kapalcharter/new.html',
		controller: 'KapalCharterNewCtrl',
		controllerAs: 'kapalcharter/new',
		title: 'Master Kapal Charter Baru',
		kodeMenu: '2201',
		flagMenu: 'cflag'
	})
	.when('/kapalcharter/edit/:id', {
		templateUrl: 'views/kapalcharter/edit.html',
		controller: 'KapalCharterEditCtrl',
		controllerAs: 'kapalcharter/edit',
		kodeMenu: '2201',
		flagMenu: 'uflag'
	})
	.when('/kapalcharter/view/:id', {
	  	templateUrl: 'views/kapalcharter/view.html',
	  	controller:'KapalCharterViewCtrl',
	  	controllerAs:'kapalcharter/view',
	  	title: 'Master Kapal Charter Detail'
	})
	.when('/alatapung/list', {
		templateUrl: 'views/alatapung/list.html',
		controller: 'AlatApungListCtrl',
		controllerAs: 'alatapung/list',
		title: 'Master Alat Apung List',
		kodeMenu: '2202',
		flagMenu: 'rflag'
	})
	.when('/alatapung/new', {
		templateUrl: 'views/alatapung/new.html',
		controller: 'AlatApungNewCtrl',
		controllerAs: 'alatapung/new',
		title: 'Master Alat Apung Baru',
		kodeMenu: '2202',
		flagMenu: 'cflag'
	})
	.when('/alatapung/edit/:id', {
		templateUrl: 'views/alatapung/edit.html',
		controller: 'AlatApungEditCtrl',
		controllerAs: 'alatapung/edit',
		title: 'Master Alat Apung Edit',
		kodeMenu: '2202',
		flagMenu: 'uflag'
	})
	.when('/alatapung/view/:id', {
		templateUrl: 'views/alatapung/view.html',
		controller: 'AlatApungViewCtrl',
		controllerAs: 'alatapung/view',
		title: 'Master Alat Apung Detail',
		kodeMenu: '2202',
		flagMenu: 'rflag'
	})
	.when('/pejabat/list', {
		templateUrl: 'views/pejabat/list.html',
		controller: 'PejabatListCtrl',
		controllerAs: 'pejabat/list',
		title: 'Master Pejabat Pengesahan List',
		kodeMenu: '2203',
		flagMenu: 'rflag'
	})
	.when('/pejabat/new', {
		templateUrl: 'views/pejabat/new.html',
		controller: 'PejabatNewCtrl',
		controllerAs: 'pejabat/new',
		title: 'Master Pejabat Pengesahan Baru',
		kodeMenu: '2203',
		flagMenu: 'cflag'
	})
	.when('/pejabat/edit/:id', {
		templateUrl: 'views/pejabat/edit.html',
		controller:'PejabatEditCtrl',
		controllerAs:'pejabat/edit',
		title: 'Master Pejabat Pengesahan Edit',
		kodeMenu: '2203',
		flagMenu: 'uflag'
	})
	.when('/pejabat/view/:id', {
		templateUrl: 'views/pejabat/view.html',
		controller: 'PejabatViewCtrl',
		controllerAs: 'pejabat/view',
		title: 'Master Pejabat Pengesahan Detail',
		kodeMenu: '2203',
		flagMenu: 'rflag'
	})
	.when('/parameter/list', {
		templateUrl: 'views/parameter/list.html',
		controller: 'ParameterListCtrl',
		controllerAs: 'parameter/list',
		title: 'Parameter Aplikasi List',
		kodeMenu: '2101',
		flagMenu: 'rflag'

	})
	.when('/parameter/new', {
		templateUrl: 'views/parameter/new.html',
		controller: 'ParameterNewCtrl',
		controllerAs: 'parameter/new',
		title: 'Parameter Aplikasi Baru',
		kodeMenu: '2101',
		flagMenu: 'cflag'
	})
	.when('/parameter/edit/:id', {
		templateUrl: 'views/parameter/edit.html',
		controller: 'ParameterEditCtrl',
		controllerAs: 'parameter/edit',
		title: 'Parameter Aplikasi Edit',
		kodeMenu: '2101',
		flagMenu: 'uflag'
	})
	.when('/parameter/view/:id', {
		templateUrl: 'views/parameter/view.html',
		controller: 'ParameterViewCtrl',
		controllerAs: 'parameter/view',
		title: 'Parameter Aplikasi Detail',
		kodeMenu: '2101',
		flagMenu: 'rflag'
	})
	/*Parameter Aplikasi new*/
	.when('/parameteraplikasi/list', {
		templateUrl: 'views/parameteraplikasi/list.html',
		controller: 'ParameterAplikasiListCtrl',
		controllerAs: 'parameteraplikasi/list',
		title: 'Parameter Aplikasi List',
		kodeMenu: '2101',
		flagMenu: 'rflag'

	})
	.when('/parameteraplikasi/new', {
		templateUrl: 'views/parameteraplikasi/new.html',
		controller: 'ParameterAplikasiNewCtrl',
		controllerAs: 'parameteraplikasi/new',
		title: 'Parameter Aplikasi Baru',
		kodeMenu: '2101',
		flagMenu: 'cflag'
	})
	.when('/parameteraplikasi/edit/:nama', {
		templateUrl: 'views/parameteraplikasi/edit.html',
		controller: 'ParameterAplikasiEditCtrl',
		controllerAs: 'parameteraplikasi/edit',
		title: 'Parameter Aplikasi Edit',
		kodeMenu: '2101',
		flagMenu: 'uflag'
	})
	.when('/parameteraplikasi/view/:nama', {
		templateUrl: 'views/parameteraplikasi/view.html',
		controller: 'ParameterAplikasiViewCtrl',
		controllerAs: 'parameteraplikasi/view',
		title: 'Parameter Aplikasi Detail',
		kodeMenu: '2101',
		flagMenu: 'rflag'
	})
	.when('/pembatalanspk', {
		templateUrl: 'views/other/pembatalanspk.html',
		controller: 'PembatalanSpkCtrl',
		controllerAs: 'other/pembatalanspk',
		title: 'History Pembatalan SPK',
		kodeMenu: '4113',
		flagMenu: 'rflag'
	})
	.when('/silapor', {
		templateUrl: 'views/other/silapor.html',
		controller: 'SilaporCtrl',
		controllerAs: 'other/silapor',
		title: 'Laporan Silapor',
		kodeMenu: '4114',
		flagMenu: 'rflag'
	})
	//empty
	.when('/profilkapal/:kode', {
		templateUrl: 'views/other/profilkapal.html',
		controller: 'OtherProfilkapalCtrl',
		controllerAs: 'other/profilkapal',
		title: 'Profil Kapal',
		kodeMenu: '',
		flagMenu: ''
	})
	.when('/profilagen/:kode', {
		templateUrl: 'views/other/profilagen.html',
		controller: 'OtherProfilagenCtrl',
		controllerAs: 'other/profilagen',
		title: 'Profil Agen',
		kodeMenu: '',
		flagMenu: ''
	})
	.when('/profilperusahaan/:kode', {
		templateUrl: 'views/other/profilperusahaan.html',
		controller: 'OtherProfilperusahaanCtrl',
		controllerAs: 'other/profilperusahaan',
		title: 'Profil Perusahaan',
		kodeMenu: '',
		flagMenu: ''
	})
	//end empty

	.when('/bbm', {
		templateUrl: 'views/masterhargabbm/list.html',
		controller: 'MasterhargabbmListCtrl',
		controllerAs: 'masterhargabbm/list',
		title: 'Harga BBM',
		kodeMenu: '2601',
		flagMenu: 'rflag'
	})
	.when('/bbm/new', {
		templateUrl: 'views/masterhargabbm/new.html',
		controller: 'MasterhargabbmAddCtrl',
		controllerAs: 'masterhargabbm/add',
		title: 'Harga BBM Baru',
		kodeMenu: '2601',
		flagMenu: 'cflag'
	})
	.when('/bbm/edit/:id', {
		templateUrl: 'views/masterhargabbm/edit.html',
		controller: 'MasterhargabbmEditCtrl',
		controllerAs: 'masterhargabbm/edit',
		title: 'Harga BBM Edit',
		kodeMenu: '2601',
		flagMenu: 'uflag'
	})
	.when('/bbm/view/:id', {
		templateUrl: 'views/masterhargabbm/view.html',
		controller: 'MasterhargabbmViewCtrl',
		controllerAs: 'masterhargabbm/view',
		title: 'Harga BBM Detail',
		kodeMenu: '2601',
		flagMenu: 'rflag'
	})
	.when('/kepil/edit/:id', {
		templateUrl: 'views/kapalkepil/edit.html',
		controller: 'KapalKepilEditCtrl',
		controllerAs: 'kapalkepil/edit',
		title: 'Tarif Kapal Kepil Edit',
		kodeMenu: '2506',
		flagMenu: 'uflag'
	})
	.when('/surchargepandu/list', {
		templateUrl: 'views/mastersurchargepandu/list.html',
		controller: 'MspanduListCtrl',
		controllerAs: 'mastersurchargepandu/list',
		title: 'Surcharge Pandu',
		kodeMenu: '2602',
		flagMenu: 'rflag'
	})
	.when('/surchargepandu/new', {
		templateUrl: 'views/mastersurchargepandu/new.html',
		controller: 'MspanduNewCtrl',
		controllerAs: 'mastersurchargepandu/new',
		title: 'Surcharge Pandu Baru',
		kodeMenu: '2602',
		flagMenu: 'cflag'
	})
	.when('/surchargepandu/edit/:id', {
		templateUrl: 'views/mastersurchargepandu/edit.html',
		controller: 'MspanduEditCtrl',
		controllerAs: 'mastersurchargepandu/edit',
		title: 'Surcharge Pandu Edit',
		kodeMenu: '2602',
		flagMenu: 'uflag'
	})
	.when('/surchargepandu/view/:id', {
		templateUrl: 'views/mastersurchargepandu/view.html',
		controller: 'MspanduViewCtrl',
		controllerAs: 'mastersurchargepandu/view',
		title: 'Surcharge Pandu Detail',
		kodeMenu: '2602',
		flagMenu: 'rflag'
	})
	.when('/perlokasitujuan/list', {
		templateUrl: 'views/perlokasitujuan/list.html',
		controller: 'PerlokasitujuanListCtrl',
		controllerAs: 'perlokasitujuan/list',
		title: 'Perlokasi Tujuan',
		kodeMenu: '2403',
		flagMenu: 'rflag'
	})
	.when('/perlokasitujuan/new', {
		templateUrl: 'views/perlokasitujuan/new.html',
		controller: 'PerlokasitujuanNewCtrl',
		controllerAs: 'perlokasitujuan/new',
		title: 'Perlokasi Tujuan Baru',
		kodeMenu: '2403',
		flagMenu: 'cflag'
	})
	.when('/perlokasitujuan/edit/:id', {
		templateUrl: 'views/perlokasitujuan/edit.html',
		controller: 'PerlokasitujuanEditCtrl',
		controllerAs: 'perlokasitujuan/edit',
		title: 'Perlokasi Tujuan Edit',
		kodeMenu: '2403',
		flagMenu: 'uflag'
	})
	.when('/perlokasitujuan/view/:id', {
		templateUrl: 'views/perlokasitujuan/view.html',
		controller: 'PerlokasitujuanViewCtrl',
		controllerAs: 'perlokasitujuan/view',
		title: 'Perlokasi Tujuan Detail',
		kodeMenu: '2403',
		flagMenu: 'rflag'
	})
	.when('/pelanggan/list', {
		templateUrl: 'views/pelanggan/list.html',
		controller: 'PelangganListCtrl',
		controllerAs: 'pelanggan/list',
		title: 'Pelanggan Perjasa',
		kodeMenu: '2401',
		flagMenu: 'rflag'
	})
	.when('/pelanggan/new', {
		templateUrl: 'views/pelanggan/new.html',
		controller: 'PelangganNewCtrl',
		controllerAs: 'pelanggan/new',
		title: 'Pelanggan Perjasa Baru',
		kodeMenu: '2401',
		flagMenu: 'cflag'
	})
	.when('/pelanggan/edit/:id', {
		templateUrl: 'views/pelanggan/edit.html',
		controller: 'PelangganEditCtrl',
		controllerAs: 'pelanggan/edit',
		title: 'Pelanggan Perjasa Edit',
		kodeMenu: '2401',
		flagMenu: 'uflag'
	})
	.when('/pelanggan/view/:id', {
		templateUrl: 'views/pelanggan/view.html',
		controller: 'PelangganViewCtrl',
		controllerAs: 'pelanggan/view',
		title: 'Pelanggan Perjasa Detail',
		kodeMenu: '2401',
		flagMenu: 'rflag'
	})
	.when('/mastersdmkapal/view/:id', {
		templateUrl: 'views/mastersdmkapal/view.html',
		controller: 'MasterSDMKapalViewCtrl',
		controllerAs: 'mastersdmkapal/view',
		title: 'Master SDM Kapal Detail',
		kodeMenu: '2204',
		flagMenu: 'rflag'
	})
	.when('/mastersdmkapal/list', {
		templateUrl: 'views/mastersdmkapal/list.html',
		controller: 'MasterSDMKapalListCtrl',
		controllerAs: 'mastersdmkapal/list',
		title: 'Master SDM Kapal',
		kodeMenu: '2204',
		flagMenu: 'rflag'

	})
	.when('/mastersdmkapal/edit/:id', {
		templateUrl: 'views/mastersdmkapal/edit.html',
		controller: 'MasterSDMKapalEditCtrl',
		controllerAs: 'mastersdmkapal/edit',
		title: 'Master SDM Kapal Edit',
		kodeMenu: '2204',
		flagMenu: 'uflag'
	})
	.when('/mastersdmkapal/new', {
		templateUrl: 'views/mastersdmkapal/new.html',
		controller: 'MasterSDMKapalNewCtrl',
		controllerAs: 'mastersdmkapal/new',
		title: 'Master SDM Kapal Baru',
		kodeMenu: '2204',
		flagMenu: 'cflag'
	})
	.when('/mastersurchargetunda/list', {
		templateUrl: 'views/mastersurchargetunda/list.html',
		controller: 'MartersurchargetundaListCtrl',
		controllerAs: 'mastersurchargetunda/list',
		title: 'Master Surcharge Tunda',
		kodeMenu: '2603',
		flagMenu: 'rflag'
	})
	.when('/mastersurchargetunda/view/:id', {
		templateUrl: 'views/mastersurchargetunda/view.html',
		controller: 'MartersurchargetundaViewCtrl',
		controllerAs: 'mastersurchargetunda/view',
		title: 'Master Surcharge Tunda Detail',
		kodeMenu: '2603',
		flagMenu: 'rflag'
	})
	.when('/mastersurchargetunda/edit/:id', {
		templateUrl: 'views/mastersurchargetunda/edit.html',
		controller: 'MartersurchargetundaEditCtrl',
		controllerAs: 'mastersurchargetunda/edit',
		title: 'Master Surcharge Tunda Edit',
		kodeMenu: '2603',
		flagMenu: 'uflag'
	})
	.when('/mastersurchargetunda/new', {
		templateUrl: 'views/mastersurchargetunda/new.html',
		controller: 'MastersurchargetundaNewCtrl',
		controllerAs: 'mastersurchargetunda/new',
		title: 'Master Surcharge Tunda Baru',
		kodeMenu: '2603',
		flagMenu: 'cflag'
	})
	.when('/dokkapal/new', {
		templateUrl: 'views/dokkapal/new.html',
		controller: 'DokkapalNewCtrl',
		controllerAs: 'dokkapal/new',
		title: 'Master Dokumen Kapal Kegiatan Tetap Baru',
		kodeMenu: '2205',
		flagMenu: 'cflag'
	})
	.when('/dokkapal/list', {
		templateUrl: 'views/dokkapal/list.html',
		controller: 'DokkapalListCtrl',
		controllerAs: 'dokkapal/list',
		title: 'Master Dokumen Kapal Kegiatan Tetap',
		kodeMenu: '2205',
		flagMenu: 'rflag'
	})
	.when('/dokkapal/view/:id', {
		templateUrl: 'views/dokkapal/view.html',
		controller: 'DokkapalViewCtrl',
		controllerAs: 'dokkapal/view',
		title: 'Master Dokumen Kapal Kegiatan Tetap Detail',
		kodeMenu: '2205',
		flagMenu: 'rflag'
	})
	.when('/dokkapal/edit/:id', {
		templateUrl: 'views/dokkapal/edit.html',
		controller: 'DokkapalEditCtrl',
		controllerAs: 'dokkapal/edit',
		title: 'Master Dokumen Kapal Kegiatan Tetap Edit',
		kodeMenu: '2205',
		flagMenu: 'uflag'
	})
	.when('/siklus/new', {
		templateUrl: 'views/siklus/new.html',
		controller: 'SiklusNewCtrl',
		controllerAs: 'siklus/new',
		title: 'Master Siklus Baru',
		kodeMenu: '2206',
		flagMenu: 'cflag'
	})
	.when('/siklus/list', {
		templateUrl: 'views/siklus/list.html',
		controller: 'SiklusListCtrl',
		controllerAs: 'siklus/list',
		title: 'Master Siklus',
		kodeMenu: '2206',
		flagMenu: 'rflag'
	})
	.when('/siklus/view/:id', {
		templateUrl: 'views/siklus/view.html',
		controller: 'SiklusViewCtrl',
		controllerAs: 'siklus/view',
		title: 'Master Siklus Detail',
		kodeMenu: '2206',
		flagMenu: 'rflag'
	})
	.when('/siklus/edit/:id', {
		templateUrl: 'views/siklus/edit.html',
		controller: 'SiklusEditCtrl',
		controllerAs: 'siklus/edit',
		title: 'Master Siklus Edit',
		kodeMenu: '2206',
		flagMenu: 'uflag'
	})
	.when('/mastermasatambat/new', {
		templateUrl: 'views/mastermasatambat/new.html',
		controller: 'MasterMasaTambatNewCtrl',
		controllerAs: 'mastermasatambat/new',
		title: 'Master Tambat Baru',
		kodeMenu: '2207',
		flagMenu: 'cflag'
	})
	.when('/mastermasatambat/list', {
		templateUrl: 'views/mastermasatambat/list.html',
		controller: 'MasterMasaTambatListCtrl',
		controllerAs: 'mastermasatambat/list',
		title: 'Master Tambat',
		kodeMenu: '2207',
		flagMenu: 'rflag'
	})
	.when('/mastermasatambat/view/:id', {
		templateUrl: 'views/mastermasatambat/view.html',
		controller: 'MasterMasaTambatViewCtrl',
		controllerAs: 'mastermasatambat/view',
		title: 'Master Tambat Detail',
		kodeMenu: '2207',
		flagMenu: 'rflag'
	})
	.when('/mastermasatambat/edit/:idisPranotaPublic', {
		templateUrl: 'views/mastermasatambat/edit.html',
		controller: 'MasterMasaTambatEditCtrl',
		controllerAs: 'mastermasatambat/edit',
		title: 'Master Tambat Edit',
		kodeMenu: '2207',
		flagMenu: 'uflag'
	})
	.when('/masterdenda/new', {
		templateUrl: 'views/masterdenda/new.html',
		controller: 'MasterDendaNewCtrl',
		controllerAs: 'masterdenda/new',
		title: 'Master Denda Baru',
		kodeMenu: '2208',
		flagMenu: 'cflag'
	})
	.when('/masterdenda/list', {
		templateUrl: 'views/masterdenda/list.html',
		controller: 'MasterDendaListCtrl',
		controllerAs: 'masterdenda/list',
		title: 'Master Denda',
		kodeMenu: '2208',
		flagMenu: 'rflag'
	})
	.when('/masterdenda/view/:id', {
		templateUrl: 'views/masterdenda/view.html',
		controller: 'MasterDendaViewCtrl',
		controllerAs: 'masterdenda/view',
		title: 'Master Denda Detail',
		kodeMenu: '2208',
		flagMenu: 'rflag'
	})
	.when('/masterdenda/edit/:id', {
		templateUrl: 'views/masterdenda/edit.html',
		controller: 'MasterDendaEditCtrl',
		controllerAs: 'masterdenda/edit',
		title: 'Master Denda Edit',
		kodeMenu: '2208',
		flagMenu: 'uflag'
	})
	.when('/kapallangganan/list', {
		templateUrl: 'views/kapallangganan/list.html',
		controller: 'KapallanggananListCtrl',
		controllerAs: 'kapallangganan/list',
		title: 'Pelanggan Kapal Langganan',
		kodeMenu: '2402',
		flagMenu: 'rflag'
	})
	.when('/kapallangganan/new', {
		templateUrl: 'views/kapallangganan/new.html',
		controller: 'KapallanggananNewCtrl',
		controllerAs: 'kapallangganan/new',
		title: 'Pelanggan Kapal Langganan Baru',
		kodeMenu: '2402',
		flagMenu: 'cflag'
	})
	.when('/kapallangganan/view/:id', {
		templateUrl: 'views/kapallangganan/view.html',
		controller: 'KapallanggananViewCtrl',
		controllerAs: 'kapallangganan/view',
		title: 'Pelanggan Kapal Langganan Detail',
		kodeMenu: '2402',
		flagMenu: 'rflag'
	})
	.when('/kapallangganan/edit/:id', {
		templateUrl: 'views/kapallangganan/edit.html',
		controller: 'KapallanggananEditCtrl',
		controllerAs: 'kapallangganan/edit',
		title: 'Pelanggan Kapal Langganan Edit',
		kodeMenu: '2402',
		flagMenu: 'uflag'
	})
	.when('/masterhargabbm/add', {
		templateUrl: 'views/masterhargabbm/add.html',
		controller: 'MasterhargabbmAddCtrl',
		controllerAs: 'masterhargabbm/add',
		title: 'Master Harga BBM',
		kodeMenu: '2601',
		flagMenu: 'cflag'
	})
	.when('/cabang/list', {
		templateUrl: 'views/cabang/list.html',
		controller: 'CabangListCtrl',
		controllerAs: 'cabang/list',
		title: 'Parameter Cabang',
		kodeMenu: '2102',
		flagMenu: 'rflag'
	})
	.when('/cabang/new', {
		templateUrl: 'views/cabang/new.html',
		controller: 'CabangNewCtrl',
		controllerAs: 'cabang/new',
		title: 'Parameter Cabang baru',
		kodeMenu: '2102',
		flagMenu: 'cflag'
	})
	.when('/cabang/edit/:id', {
		templateUrl: 'views/cabang/edit.html',
		controller: 'CabangEditCtrl',
		controllerAs: 'cabang/edit',
		title: 'Parameter Cabang Edit',
		kodeMenu: '2102',
		flagMenu: 'uflag'
	})
	.when('/cabang/view/:id', {
		templateUrl: 'views/cabang/view.html',
		controller: 'CabangViewCtrl',
		controllerAs: 'cabang/view',
		title: 'Parameter Cabang Detail',
		kodeMenu: '2102',
		flagMenu: 'rflag'
	})
	.when('/roles', {
		templateUrl: 'views/roles/list.html',
		controller: 'RolesListCtrl',
		controllerAs: 'roles/list',
		title: 'Roles',
		kodeMenu: '2103',
		flagMenu: 'rflag'
	})
	.when('/roles/detail/:id', {
		templateUrl: 'views/roles/detail.html',
		controller: 'RolesDetailCtrl',
		controllerAs: 'roles/detail',
		title: 'Roles Detail',
		kodeMenu: '2103',
		flagMenu: 'rflag'
	})
	.when('/roles/edit/:id', {
		templateUrl: 'views/roles/edit.html',
		controller: 'RolesEditCtrl',
		controllerAs: 'roles/edit',
		title: 'Roles Edit',
		kodeMenu: '2103',
		flagMenu: 'uflag'
	})
	.when('/roles/new', {
		templateUrl: 'views/roles/new.html',
		controller: 'RolesAddCtrl',
		controllerAs: 'roles/new',
		title: 'Roles Baru',
		kodeMenu: '2103',
		flagMenu: 'cflag'
	})
	.when('/permission', {
		templateUrl: 'views/permission/list.html',
		controller: 'PermissionListCtrl',
		controllerAs: 'permission/list',
		title: 'Permissions',
		kodeMenu: '2104',
		flagMenu: 'rflag'
	})
	.when('/permission/detail/:id', {
		templateUrl: 'views/permission/detail.html',
		controller: 'PermissionDetailCtrl',
		controllerAs: 'permission/detail',
		title: 'Permissions Detail',
		kodeMenu: '2104',
		flagMenu: 'rflag'
	})
	.when('/permission/edit/:id', {
		templateUrl: 'views/permission/edit.html',
		controller: 'PermissionEditCtrl',
		controllerAs: 'permission/edit',
		title: 'Permissions Edit',
		kodeMenu: '2104',
		flagMenu: 'uflag'
	})
	.when('/permission/new', {
		templateUrl: 'views/permission/new.html',
		controller: 'PermissionAddCtrl',
		controllerAs: 'permission/new',
		title: 'Permissions Baru',
		kodeMenu: '2104',
		flagMenu: 'cflag'
	})
	//Empty
	.when('/billing', {
		templateUrl: 'views/billing/list.html',
		controller: 'BillingListCtrl',
		controllerAs: 'billing/list',
		title: 'Formula Billing',
		kodeMenu: '',
		flagMenu: ''
	})
	.when('/billing/new', {
		templateUrl: 'views/billing/new.html',
		controller: 'BillingAddCtrl',
		controllerAs: 'billing/new',
		title: 'Formula Billing Baru',
		kodeMenu: '',
		flagMenu: ''
	})
	//end
	.when('/transaksi/verifikasi/:ppk1/:urutan', {
		templateUrl: 'views/transaksi/verifikasi.html',
		controller: 'TransaksiVerifikasiCtrl',
		controllerAs: 'transaksi/verifikasi',
		title: 'Verifikasi Realisasi',
		kodeMenu: '3205',
		flagMenu: 'uflag'
	})
	.when('/transaksi/pranota/:ppk1/:add', {
		templateUrl: 'views/transaksi/pranota.html',
		controller: 'TransaksiPranotaCtrl',
		controllerAs: 'transaksi/pranota',
		title: 'Cek Pranota',
		kodeMenu: '3205',
		flagMenu: 'uflag'
	})
	.when('/transaksi/pranota/:ppk1', {
		templateUrl: 'views/transaksi/pranota.html',
		controller: 'TransaksiPranotaCtrl',
		controllerAs: 'transaksi/pranota',
		title: 'Pranota',
		kodeMenu: '3205',
		flagMenu: 'rflag'
	})
	.when('/vasapublic/pranotapublic/:ppk1/:add', {
		templateUrl: 'views/transaksi/pranota.html',
		controller: 'TransaksiPranotaPublicCtrl',
		controllerAs: 'pranotapublic',
		title: 'Pranota'
	})
	.when('/vasapublic/pranotapublic/:ppk1', {
		templateUrl: 'views/transaksi/pranota.html',
		controller: 'TransaksiPranotaPublicCtrl',
		controllerAs: 'pranotapublic',
		title: 'Pranota'
	})
	.when('/transaksi/pembatalan/:ppk1/:urutan/:status', {
	  	templateUrl: 'views/transaksi/pembatalan.html',
	  	controller: 'TransaksiPembatalanCtrl',
	  	controllerAs: 'transaksi/pembatalan',
	  	title: 'Pembatalan Baru',
	  	kodeMenu: '',
		flagMenu: 'uflag'
	})
	.when('/transaksi/epb_invoice/:ppk1/:kodeBayar', {
		templateUrl: 'views/transaksi/estimasiperhitunganbiaya.html',
		controller: 'EstimasiPerhitunganBiayaCtrl',
		controllerAs: 'transaksi/estimasiperhitunganbiaya',
		title: 'Estimasi Perhitungan Biaya'
	})
	.when('/simulasi', {
		templateUrl: 'views/simulasi.html',
		controller: 'SimulasiCtrl',
		controllerAs: 'simulasi',
		title: 'Simulasi Formula',
		kodeMenu: '',
		flagMenu: ''
	})
	.when('/transaksi/mutasi/:ppk1/:urutan', {
	  	templateUrl: 'views/transaksi/mutasi.html',
	  	controller: 'TransaksiMutasiCtrl',
	  	controllerAs: 'transaksi/mutasi',
	  	title: 'Perpanjangan/Perpendekan Baru',
	  	kodeMenu: '3204',
		flagMenu: 'uflag'
	})
	.when('/aturangerakpandu/new', {
		templateUrl: 'views/aturangerakpandu/new.html',
		controller: 'AturangerakpanduNewCtrl',
		controllerAs: 'aturangerakpandu/new',
		title: 'Aturan Gerak Pandu Baru',
		kodeMenu: '2105',
		flagMenu: 'cflag'
	})
	.when('/aturangerakpandu', {
		templateUrl: 'views/aturangerakpandu/list.html',
		controller: 'AturangerakpanduListCtrl',
		controllerAs: 'aturangerakpandu/list',
		title: 'Aturan Gerak Pandu',
		kodeMenu: '2105',
		flagMenu: 'rflag'
	})
	.when('/aturangerakpandu/view/:id', {
		templateUrl: 'views/aturangerakpandu/view.html',
		controller: 'AturangerakpanduViewCtrl',
		controllerAs: 'aturangerakpandu/view',
		title: 'Aturan Gerak Pandu Detail',
		kodeMenu: '2105',
		flagMenu: 'rflag'
	})
	.when('/aturangerakpandu/edit/:id', {
		templateUrl: 'views/aturangerakpandu/edit.html',
		controller: 'AturangerakpanduEditCtrl',
		controllerAs: 'aturangerakpandu/edit',
		title: 'Aturan Gerak Pandu Edit',
		kodeMenu: '2105',
		flagMenu: 'uflag'
	})
	.when('/perpanjangan/:ppk1/:urutan', {
	  	templateUrl: 'views/revisi/perpanjangan.html',
	  	controller: 'RevisiPerpanjanganCtrl',
	  	controllerAs: 'revisi/perpanjangan',
	  	title: 'Perpanjangan Baru',
	  	kodeMenu: '',
		flagMenu: ''
	})
	.when('/perpendekan/:ppk1/:urutan', {
	  templateUrl: 'views/revisi/perpendekan.html',
	  controller: 'RevisiPerpendekanCtrl',
	  controllerAs: 'revisi/perpendekan',
	  title: 'Perpendekan Baru',
	  kodeMenu: '',
	  flagMenu: ''
	})
	.when('/perubahan/:ppk1/:urutan', {
	  templateUrl: 'views/revisi/perubahan.html',
	  controller: 'RevisiPerubahanCtrl',
	  controllerAs: 'revisi/perubahan',
	  title: 'Perubahan',
	  kodeMenu: '',
	  flagMenu: 'uflag'
	})
	.when('/daftarkegiatankapal', {
		templateUrl: 'views/laporan/daftarkegiatankapal.html',
		controller: 'DaftarKegiatanKapalCtrl',
		controllerAs: 'laporan/daftarkegiatankapal',
		title: 'Daftar Kegiatan Kapal',
		kodeMenu: '4101',
		flagMenu: 'rflag'
	})
	.when('/laporanharian', {
		templateUrl: 'views/laporan/laporanharian.html',
		controller: 'LaporanHarianCtrl',
		controllerAs: 'laporan/laporanharian',
		title: 'Laporan Harian Kapal',
		kodeMenu: '4102',
		flagMenu: 'rflag'
	})
	.when('/laporanpemanduan', {
		templateUrl: 'views/laporan/laporanpemanduan.html',
		controller: 'LaporanPemanduanCtrl',
		controllerAs: 'laporan/laporanpemanduan',
		title: 'Laporan Kegiatan Pemanduan',
		kodeMenu: '4103',
		flagMenu: 'rflag'
	})
	.when('/rekapitulasikinerja', {
		templateUrl: 'views/laporan/rekapitulasikinerja.html',
		controller: 'RekapitulasiKinerjaCtrl',
		controllerAs: 'laporan/rekapitulasikinerja',
		title: 'Rekapitulasi Kinerja Pandu',
		kodeMenu: '4104',
		flagMenu: 'rflag'
	})
	.when('/pivotkeuangan', {
		templateUrl: 'views/laporan/pivotkeuangan.html',
		controller: 'PivotKeuanganCtrl',
		controllerAs: 'transaksi/pivotokeuangan',
		title: 'Pivot Keuangan',
		kodeMenu: '4105',
		flagMenu: 'rflag'
	})
	.when('/pivotoperasi', {
		templateUrl: 'views/laporan/pivotoperasi.html',
		controller: 'PivotOperasiCtrl',
		controllerAs: 'transaksi/pivotoperasi',
		title: 'Pivot Operasi',
		kodeMenu: '4106',
		flagMenu: 'rflag'
	})
	.when('/laporanairkapal', {
		templateUrl: 'views/laporan/laporanairkapal.html',
		controller: 'LaporanAirKapalCtrl',
		controllerAs: 'laporan/laporanairkapal',
		title: 'Laporan Produksi dan Pendapatan Air Kapal',
		kodeMenu: '4107',
		flagMenu: 'rflag'
	})
	.when('/laporanpnbp', {
		templateUrl: 'views/laporan/laporanpnbp.html',
		controller: 'LaporanPNBPCtrl',
		controllerAs: 'laporan/laporanpnbp',
		title: 'Laporan PNBP',
		kodeMenu: '4107',
		flagMenu: 'rflag'
	})
	.when('/transaksi/putusvaluta', {
		templateUrl: 'views/transaksi/putusvaluta.html',
		controller: 'PutusValutaCtrl',
		controllerAs: 'transaksi/putusvaluta',
		title: 'Putus Valuta',
		kodeMenu:'3209',
		flagMenu:'cflag'
	})
	.when('/transaksi/gantiagen', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})

	.when('/transaksi/gantiagen/:ppk1PutusAgen', {
		templateUrl: 'views/transaksi/permohonannew.html',
		controller: 'TransaksiPermohonannewCtrl',
		controllerAs: 'transaksi/permohonanNew',
		title: 'Permohonan',
		kodeMenu: '3202',
		flagMenu: 'cflag'
	})
	.when('/kapalkegiatantetap', {
		templateUrl: 'views/transaksi/kapalkegiatantetap.html',
		controller: 'TransaksiKapalKegiatanTetapCtrl',
		controllerAs: 'transaksi/kapalkegiatantetap',
		title : 'Kapal Kegiatan Tetap',
		kodeMenu:'3206',
		flagMenu: 'rflag'
	})
	.when('/revisianjungan', {
		templateUrl: 'views/transaksi/revisianjungan.html',
		controller: 'RevisiAnjunganCtrl',
		controllerAs: 'transaksi/revisianjungan',
		title : 'Revisi Anjungan',
		kodeMenu:'3210',
		flagMenu: 'rflag'
	})
	.when('/kapalkegiatantetap/new', {
		templateUrl: 'views/transaksi/kapalkegiatantetapcrud.html',
		controller: 'TransaksiKapalKegiatanTetapCrudCtrl',
		controllerAs: 'transaksi/kapalkegiatantetapcrud',
		title : 'Kapal Kegiatan Tetap',
		kodeMenu:'3206',
		flagMenu:'cflag'
	})
	.when('/kapalkegiatantetap/deleted', {
		templateUrl: 'views/transaksi/kapalkegiatantetapdeleted.html',
		controller: 'KapalKegiatanTetapDeletedCtrl',
		controllerAs: 'transaksi/kapalkegiatantetapdeleted',
		title : 'Kapal Kegiatan Tetap Terhapus',
		kodeMenu:'3206',
		flagMenu:'rflag'
	})
	.when('/realisasi/new', {
		templateUrl: 'views/transaksi/realisasitanpapermohonan.html',
		controller: 'TransaksiRealisasiTanpaPermohonanCtrl',
		controllerAs: 'transaksi/realisasitanpapermohonan',
		title : 'Realisasi Tanpa Permohonan',
		kodeMenu: '3208',
		flagMenu:'cflag'
	})
	.when('/kapalgeser', {
		templateUrl: 'views/transaksi/kapalgeser.html',
		controller: 'TransaksiKapalGeserCtrl',
		controllerAs: 'transaksi/kapalgeser',
		title : 'Permohonan Geser',
		kodeMenu:'3207',
		flagMenu: 'cflag'
	})
	.when('/suratperintahairkapal/:noPpkJasa', {
		templateUrl: 'views/transaksi/suratperintahairkapal.html',
		controller: 'SuratPerintahAirKapalCtrl',
		controllerAs: 'transaksi/suratperintahairkapal',
		title : 'Surat Perintah Air Kapal'
	})		//marvin
	.when('/transaksi/bataljasatanpadenda', {
		templateUrl: 'views/transaksi/bataljasatanpadenda.html',
		controller: 'BataljasatanpadendaCtrl',
		controllerAs: 'transaksi/bataljasatanpadenda',
		title: 'Batal Jasa Tanpa Deda',
		kodeMenu: '3304',
		flagMenu: 'cflag'
	})
	.when('/perencanaan/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/perencanaan.html',
	  	controller: 'PerencanaanCtrl',
	 	controllerAs: 'perencanaan/perencanaan',
	  	title: 'Pra-Meeting',
		kodeMenu: '3401',
		flagMenu: 'cflag'
	})
	.when('/vasapublic/perencanaanpublic/:kodeDermaga/:tgl/:kodeCabang', {
		templateUrl: 'views/perencanaan/perencanaanpublic.html',
		controller: 'PerencanaanTambatPublicCtrl',
		controllerAs: 'perencanaan/perencanaanpublic',
		title: 'Perencanaan'
	})
	.when('/perencanaan', {
	  	templateUrl: 'views/perencanaan/perencanaannew.html',
	  	controller: 'PerencanaannewCtrl',
	 	controllerAs: 'perencanaan/perencanaannew',
	  	title: 'Pra-Meeting',
		kodeMenu: '3401',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/preprameeting/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/preprameeting.html',
	  	controller: 'PreprameetingCtrl',
	  	controllerAs: 'perencanaan/preprameeting',
	  	title: 'Persiapan Prameeting',
		kodeMenu: '3404',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/preprameeting', {
	  	templateUrl: 'views/perencanaan/preprameetingmenu.html',
	  	controller: 'PreprameetingmenuCtrl',
	  	controllerAs: 'perencanaan/preprameetingmenu',
	  	title: 'Persiapan Prameeting',
		kodeMenu: '3404',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/reportantrian', {
	  	templateUrl: 'views/perencanaan/reportantrian.html',
	  	controller: 'ReportantrianCtrl',
	  	controllerAs: 'perencanaan/reportantrian',
	  	title: 'Laporan Antrian',
		kodeMenu: '3412',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/tambahkapal/:kodeDermaga/:tgl/:isMeetingSusulan', {
	  	templateUrl: 'views/perencanaan/tambahkapal.html',
	  	controller: 'PerencanaanTambahkapalCtrl',
	  	controllerAs: 'perencanaan/tambahkapal'
	})
	.when('/hasilmeeting/tambahkapalmeeting/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/tambahkapalmeeting.html',
	  	controller: 'TambahkapalmeetingCtrl',
	 	controllerAs: 'perencanaan/tambahkapalmeeting'
	})
	.when('/penetapanmeeting', {
	  	templateUrl: 'views/perencanaan/penetapanmeeting.html',
	  	controller: 'PenetapanMeetingCtrl',
	  	controllerAs: 'perencanaan/penetapanmeeting',
	  	title: 'Penetapan Meeting',
		kodeMenu: '3403',
		flagMenu: 'rflag'
	})
	.when('/prameeting/report/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/lists.html',
	  	controller: 'PerencanaanListsCtrl',
	  	controllerAs: 'prameeting/report',
	  	title: 'Pra-Meeting',
		kodeMenu: '4110',
		flagMenu: 'rflag'

	})
	.when('/meeting/report/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/reportmeeting.html',
	  	controller: 'PerencanaanReportmeetingCtrl',
	  	controllerAs: 'perencanaan/reportmeeting',
	  	title: 'Laporan Lineup Kapal',
		kodeMenu: '4111',
		flagMenu: 'rflag'
	})
	.when('/penetapan/:kodeDermaga/:tgl', {
	  	templateUrl: 'views/perencanaan/penetapan.html',
	  	controller: 'PerencanaanPenetapanCtrl',
	  	controllerAs: 'perencanaan/penetapan',
	  	title: 'Penetapan Meeting',
		kodeMenu: '3403',
		flagMenu: 'rflag'
	})/*
	.when('/perencanaan/prioritaskapal', {
	  	templateUrl: 'views/perencanaan/laporan.html',
		controller: 'PrioritaskapalCtrl',
	  	controllerAs: 'perencanaan/prioritaskapal'
	})
	.when('/perencanaan/persiapanprameeting', {
	 	templateUrl: 'views/perencanaan/persiapanprameeting.html',
	 	controller: 'PersiapanprameetingCtrl',
	 	controllerAs: 'perencanaan/persiapanprameeting'
	})*/
	.when('/perencanaan/laporanprameeting', {
		templateUrl: 'views/perencanaan/laporanprameeting.html',
		controller: 'LaporanPraMeetingCtrl',
		controllerAs: 'perencanaan/laporanprameeting',
		title: 'Laporan Meeting',
		kodeMenu: '4110',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/laporanmeeting', {
		templateUrl: 'views/perencanaan/laporanmeeting.html',
		controller: 'LaporanMeetingCtrl',
		controllerAs: 'perencanaan/laporanmeeting',
	  	title: 'Laporan Lineup Kapal',
		kodeMenu: '4111',
		flagMenu: 'rflag'
	})
	.when('/perencanaan/pasangsurut', {
	  	templateUrl: 'views/perencanaan/pasangsurut.html',
	  	controller: 'PasangsurutCtrl',
	  	controllerAs: 'perencanaan/pasangsurut'
	})
	.when('/monitoring/rpkro',{
		templateUrl: 'views/perencanaan/monitoringrpkro.html',
		controller: 'MonitoringRpkroCtrl',
		controllerAs: 'perencanaan/monitoringrpkro',
		title: 'Monitoring RPKRO',
		kodeMenu: '3402',
		flagMenu: 'rflag'
	})
	.when('/cluster/clusterutama', {
		templateUrl: 'views/cluster/clusterutama.html',
	  	controller: 'ClusterutamaCtrl',
	  	controllerAs: 'cluster/clusterutama',
	  	title: 'Master Pembagi Utama Dermaga',
		kodeMenu: '2301',
		flagMenu: 'rflag'
	})
	.when('/cluster/clustermuatan', {
	  	templateUrl: 'views/cluster/clustermuatan.html',
	  	controller: 'ClustermuatanCtrl',
	  	controllerAs: 'cluster/clustermuatan',
	  	title: 'Master Jenis Muatan',
		kodeMenu: '2302',
		flagMenu: 'rflag'
	})
	.when('/cluster/clusteringkapal', {
	  	templateUrl: 'views/cluster/clusteringkapal.html',
	 	controller: 'ClusteringkapalCtrl',
	  	controllerAs: 'cluster/clusteringkapal',
	  	title: 'Master Jenis Kapal',
		kodeMenu: '2306',
		flagMenu: 'rflag'
	})
	.when('/kademeter/kedalaman', {
	  	templateUrl: 'views/kademeter/kedalaman.html',
	  	controller: 'KademeterKedalamanCtrl',
	  	controllerAs: 'kademeter/kedalaman',
	  	title: 'Master Kedalaman',
		kodeMenu: '2303',
		flagMenu: 'rflag'
	})
	.when('/kademeter/informasidermaga', {
	  	templateUrl: 'views/kademeter/informasidermaga.html',
	  	controller: 'KademeterInformasidermagaCtrl',
	  	controllerAs: 'kademeter/informasidermaga',
	  	title: 'Master Informasi Dermaga',
		kodeMenu: '2308',
		flagMenu: 'rflag'
	})
	.when('/paramkesepakatan/new', {
		templateUrl: 'views/masterkesepakatan/new.html',
		controller: 'MasterKesepakatanNewCtrl',
		controllerAs: 'masterkesepakatan/new',
		title: 'Parameter Kesepakatan Baru',
		kodeMenu: '2210',
		flagMenu: 'cflag'
	})
	.when('/paramkesepakatan/list', {
		templateUrl: 'views/masterkesepakatan/list.html',
		controller: 'MasterKesepakatanListCtrl',
		controllerAs: 'masterkesepakatan/list',
		title: 'Parameter Kesepakatan',
		kodeMenu: '2210',
		flagMenu: 'rflag'
	})
	.when('/paramkesepakatan/view/:id', {
		templateUrl: 'views/masterkesepakatan/view.html',
		controller: 'MasterKesepakatanViewCtrl',
		controllerAs: 'masterkesepakatan/view',
		title: 'Parameter Kesepakatan Detail',
		kodeMenu: '2210',
		flagMenu: 'rflag'
	})
	.when('/paramkesepakatan/edit/:id', {
		templateUrl: 'views/masterkesepakatan/edit.html',
		controller: 'MasterKesepakatanEditCtrl',
		controllerAs: 'masterkesepakatan/edit',
		title: 'Parameter Kesepakatan Edit',
		kodeMenu: '2210',
		flagMenu: 'uflag'
	})
	.when('/riwayateskalasi/list', {
		templateUrl: 'views/riwayateskalasi/list.html',
		controller: 'RiwayatEskalasiListCtrl',
		controllerAs: 'riwayateskalasi/list',
		title: 'Riwayat Eskalasi',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/riwayateskalasi/list/:id', {
		templateUrl: 'views/riwayateskalasi/list.html',
		controller: 'RiwayatEskalasiListCtrl',
		controllerAs: 'riwayateskalasi/list',
		title: 'Riwayat Eskalasi',
		kodeMenu: '3201',
		flagMenu: 'rflag'
	})
	.when('/tagihanminimum', {
		templateUrl: 'views/tagihanmin/list.html',
		controller: 'TagihanMinListCtrl',
		controllerAs: 'tagihanmin/list',
		title: 'Master Tagihan Minimum',
		kodeMenu: '2211',
		flagMenu: 'rflag'
	})
	.when('/tagihanminimum/new', {
		templateUrl: 'views/tagihanmin/new.html',
		controller: 'TagihanMinNewCtrl',
		controllerAs: 'tagihanmin/new',
		title: 'Master Tagihan Minimum',
		kodeMenu: '2211',
		flagMenu: 'cflag'
	})
	.when('/tagihanminimum/edit/:id', {
		templateUrl: 'views/tagihanmin/edit.html',
		controller: 'TagihanMinEditCtrl',
		controllerAs: 'tagihanmin/edit',
		title: 'Master Tagihan Minimum',
		kodeMenu: '2211',
		flagMenu: 'uflag'
	})
	.when('/tagihanminimum/view/:id', {
		templateUrl: 'views/tagihanmin/view.html',
		controller: 'TagihanMinViewCtrl',
		controllerAs: 'tagihanmin/view',
		title: 'Master Tagihan Minimum',
		kodeMenu: '2211',
		flagMenu: 'rflag'
	})
	.when('/kademeter/kademeterdermaga', {
	  	templateUrl: 'views/kademeter/kademeterdermaga.html',
	  	controller: 'KademeterdermagaCtrl',
	  	controllerAs: 'kademeter/kademeterdermaga',
	 	title: 'Master Kade Meter',
		kodeMenu: '2305',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/perencanaan', {
		templateUrl: 'views/manajemenpandu/perencanaan.html',
		controller: 'PerencanaanPanduCtrl',
	  	controllerAs: 'manajemenpandu/perencanaan',
	  	title: 'Perencanaan Pandu',
		kodeMenu: '3503',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/perencanaanbaru', {
		templateUrl: 'views/manajemenpandu/perencanaanbaru.html',
		controller: 'PerencanaanPanduBaruCtrl',
	  	controllerAs: 'manajemenpandu/perencanaanbaru',
	  	title: 'Perencanaan Pandu Baru',
		kodeMenu: '4121',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/perencanaantanpatambat', {
		templateUrl: 'views/manajemenpandu/perencanaantanpatambat.html',
		controller: 'PerencanaanPanduTanpaTambatCtrl',
	  	controllerAs: 'manajemenpandu/perencanaantanpatambat',
	  	title: 'Perencanaan Pandu Tanpa Tambat',
		kodeMenu: '4122',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/monitoring', {
		templateUrl: 'views/manajemenpandu/monitoring.html',
		controller: 'MonitoringPanduCtrl',
	  	controllerAs: 'manajemenpandu/monitoring',
	  	title: 'Monitoring Pandu',
		kodeMenu: '3502',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/monitoringpandu', {
		templateUrl: 'views/manajemenpandu/monitoringpandu.html',
		controller: 'MonitoringKepanduanCtrl',
	  	controllerAs: 'manajemenpandu/monitoringpandu',
	  	title: 'Monitoring Pandu',
		kodeMenu: '3602',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/offlinespkpandu', {
		templateUrl: 'views/manajemenpandu/offlinespkpandu.html',
		controller: 'OfflineSpkPandu',
	  	controllerAs: 'manajemenpandu/offlinespkpandu',
	  	title: 'Monitoring Offline SPK Pandu',
		kodeMenu: '4123',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/dashboard', {
		templateUrl: 'views/manajemenpandu/dashboard.html',
		controller: 'DashboardKepanduanCtrl',
		controllerAs: 'manajemenpandu/dashboard',
		title: 'Dashboard Pandu',
		kodeMenu: '3500',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/jadwalpandu', {
		templateUrl: 'views/manajemenpandu/jadwalpandu.html',
		controller: 'JadwalPanduCtrl',
		controllerAs: 'manajemenpandu/jadwalpandu',
		title: 'Jadwal Pandu',
		kodeMenu: '3501',
		flagMenu: 'rflag'
	})
	.when('/manajemenpandu/kesediaanpandu', {
		templateUrl: 'views/manajemenpandu/kesediaanpandu.html',
		controller: 'KesediaanPanduCtrl',
	  	controllerAs: 'manajemenpandu/kesediaanpandu'
	})
	.when('/manajementambat/jadwaltambat', {
		templateUrl: 'views/manajementambat/jadwaltambat.html',
		controller: 'JadwalTambatCtrl',
		controllerAs: 'maanjementambat/jadwaltambat',
		title: 'Jadwal Tambat',
		kodeMenu: '3505',
		flagMenu: 'rflag'
	})
	.when('/manajementambat/monitoring', {
		templateUrl: 'views/manajementambat/monitoring.html',
		controller: 'MonitoringTambatCtrl',
		controllerAs: 'manajementambat/jadwaltambat',
		title: 'Monitoring Tambat',
		kodeMenu: '3506',
		flagMenu: 'rflag'
	})
	.when('/kawasanpandu/list', {
		templateUrl: 'views/kawasanpandu/list.html',
		controller: 'KawasanPanduListCtrl',
		controllerAs: 'kawasanpandu/list',
		title: 'Kawasan Pandu',
		kodeMenu: '2701',
		flagMenu: 'rflag'
	})
	.when('/kawasanpandu/edit/:id', {
		templateUrl: 'views/kawasanpandu/edit.html',
		controller: 'KawasanPanduEditCtrl',
		controllerAs: 'kawasanppandu/edit',
		title: 'Kawasan Pandu',
		kodeMenu: '2701',
		flagMenu: 'uflag'
	})
	.when('/kawasanpandu/new', {
		templateUrl: 'views/kawasanpandu/new.html',
		controller: 'KawasanPanduNewCtrl',
		controllerAs: 'kawasanpandu/new',
		title: 'Kawasan Pandu',
		kodeMenu: '2701',
		flagMenu: 'cflag'
	})
	.when('/gruppandu/list', {
		templateUrl: 'views/gruppandu/list.html',
		controller: 'GrupPanduListCtrl',
		controllerAs: 'gruppandu/list',
		title: 'Grup Pandu',
		kodeMenu: '2702',
		flagMenu: 'rflag'
	})
	.when('/gruppandu/edit/:id', {
		templateUrl: 'views/gruppandu/edit.html',
		controller: 'GrupPanduEditCtrl',
		controllerAs: 'gruppandu/edit',
		title: 'Grup Pandu',
		kodeMenu: '2702',
		flagMenu: 'uflag'
	})
	.when('/gruppandu/new', {
		templateUrl: 'views/gruppandu/new.html',
		controller: 'GrupPanduNewCtrl',
		controllerAs: 'gruppandu/new',
		title: 'Grup Pandu',
		kodeMenu: '2702',
		flagMenu: 'cflag'
	})
	.when('/gruptambat/list', {
		templateUrl: 'views/gruptambat/list.html',
		controller: 'GrupTambatListCtrl',
		controllerAs: 'gruptambat/list',
		title: 'Grup Tambat',
		kodeMenu: '2803',
		flagMenu: 'rflag'
	})
	.when('/gruptambat/edit/:id', {
		templateUrl: 'views/gruptambat/edit.html',
		controller: 'GrupTambatEditCtrl',
		controllerAs: 'gruptambat/edit',
		title: 'Grup Tambat',
		kodeMenu: '2803',
		flagMenu: 'uflag'
	})
	.when('/gruptambat/new', {
		templateUrl: 'views/gruptambat/new.html',
		controller: 'GrupTambatNewCtrl',
		controllerAs: 'gruptambat/new',
		title: 'Grup Tambat',
		kodeMenu: '2803',
		flagMenu: 'cflag'
	})
	.when('/grupdermagatambat/list', {
		templateUrl: 'views/grupdermagatambat/list.html',
		controller: 'GrupDermagaTambatListCtrl',
		controllerAs: 'grupdermagatambat/list',
		title: 'Grup Dermaga Tambat',
		kodeMenu: '2801',
		flagMenu: 'rflag'
	})
	.when('/grupdermagatambat/edit/:id', {
		templateUrl: 'views/grupdermagatambat/edit.html',
		controller: 'GrupDermagaTambatEditCtrl',
		controllerAs: 'grupdermagatambat/edit',
		title: 'Grup Dermaga Tambat',
		kodeMenu: '2801',
		flagMenu: 'uflag'
	})
	.when('/grupdermagatambat/new', {
		templateUrl: 'views/grupdermagatambat/new.html',
		controller: 'GrupDermagaTambatNewCtrl',
		controllerAs: 'grupdermagatambat/new',
		title: 'Grup Dermaga Tambat',
		kodeMenu: '2801',
		flagMenu: 'cflag'
	})
	.when('/dermagapandu/list', {
		templateUrl: 'views/dermagapandu/list.html',
		controller: 'DermagaPanduListCtrl',
		controllerAs: 'dermagapandu/list',
		kodeMenu: '2707',
		flagMenu: 'rflag'
	})
	.when('/dermagapandu/edit/:id', {
		templateUrl: 'views/dermagapandu/edit.html',
		controller: 'DermagaPanduEditCtrl',
		controllerAs: 'dermagapandu/edit',
		kodeMenu: '2707',
		flagMenu: 'uflag'
	})
	.when('/dermagapandu/new', {
		templateUrl: 'views/dermagapandu/new.html',
		controller: 'DermagaPanduNewCtrl',
		controllerAs: 'dermagapandu/new',
		kodeMenu: '2707',
		flagMenu: 'cflag'
	})
	.when('/dermagatambat/list', {
		templateUrl: 'views/dermagatambat/list.html',
		controller: 'DermagaTambatListCtrl',
		controllerAs: 'dermagatambat/list',
		title: 'Dermaga Tambat',
		kodeMenu: '2802',
		flagMenu: 'cflag'
	})
	.when('/dermagatambat/edit/:id', {
		templateUrl: 'views/dermagatambat/edit.html',
		controller: 'DermagaTambatEditCtrl',
		controllerAs: 'dermagatambat/edit',
		title: 'Dermaga Tambat',
		kodeMenu: '2802',
		flagMenu: 'uflag'
	})
	.when('/dermagatambat/new', {
		templateUrl: 'views/dermagatambat/new.html',
		controller: 'DermagaTambatNewCtrl',
		controllerAs: 'dermagatambat/new',
		title: 'Dermaga Tambat',
		kodeMenu: '2802',
		flagMenu: 'cflag'
	})
	.when('/jamkerjapandu/list', {
		templateUrl: 'views/jamkerjapandu/list.html',
		controller: 'JamKerjaPanduListCtrl',
		controllerAs: 'jamkerjapandu/list',
		title: 'Jam Kerja Pandu',
		kodeMenu: '2703',
		flagMenu: 'rflag'
	})
	.when('/jamkerjapandu/edit/:id', {
		templateUrl: 'views/jamkerjapandu/edit.html',
		controller: 'JamKerjaPanduEditCtrl',
		controllerAs: 'jamkerjapandu/edit',
		title: 'Jam Kerja Pandu',
		kodeMenu: '2703',
		flagMenu: 'rflag'
	})
	.when('/jamkerjapandu/new', {
		templateUrl: 'views/jamkerjapandu/new.html',
		controller: 'JamKerjaPanduNewCtrl',
		controllerAs: 'jamkerjapandu/new',
		title: 'Jam Kerja Pandu',
		kodeMenu: '2703',
		flagMenu: 'rflag'
	})
	.when('/jamkerjatambat/list', {
		templateUrl: 'views/jamkerjatambat/list.html',
		controller: 'JamKerjaTambatListCtrl',
		controllerAs: 'jamkerjatambat/list',
		title: 'Jam Kerja Tambat',
		kodeMenu: '2804',
		flagMenu: 'rflag'
	})
	.when('/jamkerjatambat/edit/:id', {
		templateUrl: 'views/jamkerjatambat/edit.html',
		controller: 'JamKerjaTambatEditCtrl',
		controllerAs: 'jamkerjatambat/edit',
		title: 'Jam Kerja Tambat',
		kodeMenu: '2804',
		flagMenu: 'rflag'
	})
	.when('/jamkerjatambat/new', {
		templateUrl: 'views/jamkerjatambat/new.html',
		controller: 'JamKerjaTambatNewCtrl',
		controllerAs: 'jamkerjatambat/new',
		title: 'Jam Kerja Tambat',
		kodeMenu: '2804',
		flagMenu: 'rflag'
	})
	.when('/petugaspandu/list', {
		templateUrl: 'views/petugaspandu/list.html',
		controller: 'PetugasPanduListCtrl',
		controllerAs: 'petugaspandu/list',
		title: 'Petugas Pandu',
		kodeMenu: '2704',
		flagMenu: 'rflag'
	})
	.when('/petugaspandu/edit/:id', {
		templateUrl: 'views/petugaspandu/edit.html',
		controller: 'PetugasPanduEditCtrl',
		controllerAs: 'petugaspandu/edit',
		title: 'Petugas Pandu',
		kodeMenu: '2704',
		flagMenu: 'uflag'
	})
	.when('/petugaspandu/view/:id', {
		templateUrl: 'views/petugaspandu/view.html',
		controller: 'PetugasPanduViewCtrl',
		controllerAs: 'petugaspandu/view',
		title: 'Petugas Pandu',
		kodeMenu: '2704',
		flagMenu: 'rflag'
	})
	.when('/petugaspandu/new', {
		templateUrl: 'views/petugaspandu/new.html',
		controller: 'PetugasPanduNewCtrl',
		controllerAs: 'petugaspandu/new',
		title: 'Petugas Pandu',
		kodeMenu: '2704',
		flagMenu: 'cflag'
	})
	.when('/petugastambat/list', {
		templateUrl: 'views/petugastambat/list.html',
		controller: 'PetugasTambatListCtrl',
		controllerAs: 'petugastambat/list',
		title: 'Petugas Tambat',
		kodeMenu: '2805',
		flagMenu: 'rflag'
	})
	.when('/petugastambat/edit/:id', {
		templateUrl: 'views/petugastambat/edit.html',
		controller: 'PetugasTambatEditCtrl',
		controllerAs: 'petugastambatedit',
		title: 'Petugas Tambat',
		kodeMenu: '2805',
		flagMenu: 'uflag'
	})
	.when('/petugastambat/new', {
		templateUrl: 'views/petugastambat/new.html',
		controller: 'PetugasTambatNewCtrl',
		controllerAs: 'petugastambat/new',
		title: 'Petugas Tambat',
		kodeMenu: '2805',
		flagMenu: 'cflag'
	})
	.when('/masterpilot/list', {
		templateUrl: 'views/masterpilot/list.html',
		controller: 'MasterPilotListCtrl',
		controllerAs: 'masterpilot/list',
		title: 'Master Pilot',
		kodeMenu: '4124',
		flagMenu: 'rflag'
	})
	.when('/masterpilot/new', {
		templateUrl: 'views/masterpilot/new.html',
		controller: 'MasterPilotNewCtrl',
		controllerAs: 'masterpilot/new',
		title: 'Master Pilot',
		kodeMenu: '4124',
		flagMenu: 'rflag'
	})
	.when('/masterpilot/edit/:id/jenis/:jenisKendaraan', {
		templateUrl: 'views/masterpilot/edit.html',
		controller: 'MasterPilotEditCtrl',
		controllerAs: 'masterpilot/edit',
		title: 'Master Pilot',
		kodeMenu: '4124',
		flagMenu: 'rflag'
	})
	.when('/manajementunda/perencanaan', {
	  	templateUrl: 'views/manajementunda/perencanaan.html',
	 	controller: 'PerencanaanTundaCtrl',
	 	controllerAs: 'manajementunda/perencanaan',
	 	title:'Perencanaan Tunda'
	})
	.when('/manajementunda/perencanaan/:ppk1', {
		templateUrl: 'views/manajementunda/perencanaan.html',
		controller: 'PerencanaanTundaCtrl',
		controllerAs: 'manajementunda/perencanaan',
		title: 'Perencanaan Tunda'
	})
	.when('/manajementunda/aturankapaltunda', {
	 	templateUrl: 'views/aturankapaltunda/list.html',
		controller: 'AturanKapalTundaListCtrl',
		controllerAs: 'aturankapaltunda/list',
		title: 'Aturan Kapal Tunda',
		kodeMenu: '2706',
		flagMenu: 'rflag'
	})
	.when('/manajementunda/aturankapaltunda/new', {
		templateUrl: 'views/aturankapaltunda/new.html',
		controller: 'AturanKapalTundaNewCtrl',
		controllerAs: 'manajementunda/aturankapaltunda/new',
		title: 'Aturan Kapal Tunda',
		kodeMenu: '2706',
		flagMenu: 'cflag'
	})
	.when('/manajementunda/aturankapaltunda/edit/:id', {
		templateUrl: 'views/aturankapaltunda/edit.html',
		controller: 'AturanKapalTundaEditCtrl',
		controllerAs: 'aturankapaltunda/edit',
		title: 'Aturan Kapal Tunda',
		kodeMenu: '2706',
		flagMenu: 'uflag'
	})
	.when('/manajementunda/aturankapaltunda/view/:id', {
		templateUrl: 'views/aturankapaltunda/view.html',
		controller: 'AturanKapalTundaViewCtrl',
		controllerAs: 'aturankapaltunda/view',
		title: 'Aturan Kapal Tunda',
		kodeMenu: '2706',
		flagMenu: 'uflag'
	})
	//tipe eskalasi
	.when('/tipeeskalasi', {
		templateUrl: 'views/tipeeskalasi/list.html',
		controller: 'TipeEskalasiListCtrl',
		controllerAs: 'tipeeskalasi/list',
		title: 'Tipe Eskalasi',
	})
	.when('/tipeeskalasi/new', {
		templateUrl: 'views/tipeeskalasi/new.html',
		controller: 'TipeEskalasiNewCtrl',
		controllerAs: 'tipeeskalasi/new',
		title: 'Tipe Eskalasi',
	})
	.when('/tipeeskalasi/edit/:id', {
	  	templateUrl: 'views/tipeeskalasi/edit.html',
	 	controller: 'TipeEskalasiEditCtrl',
	  	controllerAs: 'tipeeskalasi/edit',
	  	title: 'Tipe Eskalasi',
	})
	.when('/tipeeskalasi/view/:id', {
	  templateUrl: 'views/tipeeskalasi/view.html',
	  controller: 'TipeEskalasiViewCtrl',
	  controllerAs: 'tipeeskalasi/view',
	  title: 'Tipe Eskalasi',
	  
	})
	.when('/manajementunda/listkapaltunda', {
	  	templateUrl: 'views/manajementunda/listkapaltunda.html',
	  	controller: 'ManajemenListkapaltundaCtrl',
	  	controllerAs: 'manajementunda/listkapaltunda',
	  	title: 'Daftar Kapal Tunda',
		kodeMenu: '2705',
		flagMenu: 'rflag'
	})
	.when('/manajementunda/historikapaltunda/:kodeKapal', {
	  	templateUrl: 'views/manajementunda/historikapaltunda.html',
	  	controller: 'ManajemenHistorikapaltundaCtrl',
		controllerAs: 'manajementunda/historikapaltunda',
		title: 'Daftar Kapal Tunda',
		kodeMenu: '2705',
		flagMenu: 'rflag'
	})
	.when('/manajementunda/laporankapaltunda', {
	  	templateUrl: 'views/manajementunda/laporankapaltunda.html',
	  	controller: 'ManajemenLaporankapaltundaCtrl',
	  	controllerAs: 'manajementunda/laporankapaltunda',
	  	title: 'Riwayat Downtime',
		kodeMenu: '4109',
		flagMenu: 'rflag'
	})
	.when('/manajementunda/realisasitunda', {
	  	templateUrl: 'views/manajementunda/realisasitunda.html',
	  	controller: 'ManajementundaRealisasitundaCtrl',
	  	controllerAs: 'manajementunda/realisasitunda',
	  	title: 'Realisasi Tunda',
	  	kodeMenu: '4109',
	  	flagMenu: 'rflag'
	})
	.when('/manajementunda/monitoring', {
	  	templateUrl: 'views/manajementunda/monitoring.html',
	  	controller: 'MonitoringTundaCtrl',
	  	controllerAs: 'manajementunda/monitoring',
	  	title: 'Monitoring Tunda',
	  	kodeMenu: '3504',
	  	flagMenu: 'rflag'
	})
	.when('/transaksi/dataumum/:id/:status', {
		templateUrl: 'views/transaksi/permohonanedit.html',
		controller: 'TransaksiPermohonaneditCtrl',
		controllerAs: 'transaksi/permohonanedit',
		title: 'Edit Data Umum'
	})
	.when('/kapal_tunda_min/list', {
		templateUrl: 'views/cabang_min_kt/list.html',
		controller: 'CabangMinKtListCtrl',
		controllerAs: 'cabang_min_kt/list',
		title: 'Kapal Tunda Minimum',
		kodeMenu: '2212',
		flagMenu: 'rflag'
	})
	.when('/kapal_tunda_min/new', {
		templateUrl: 'views/cabang_min_kt/new.html',
		controller: 'CabangMinKtNewCtrl',
		controllerAs: 'cabang_min_kt/new',
		title: 'Kapal Tunda Minimum baru',
		kodeMenu: '2212',
		flagMenu: 'cflag'
	})
	.when('/kapal_tunda_min/edit/:id', {
		templateUrl: 'views/cabang_min_kt/edit.html',
		controller: 'CabangMinKtEditCtrl',
		controllerAs: 'cabang_min_kt/edit',
		title: 'Kapal Tunda Minimum Edit',
		kodeMenu: '2212',
		flagMenu: 'uflag'
	})
	.when('/kapal_bebas_pandu_tunda/list', {
		templateUrl: 'views/kapalbebaspt/list.html',
		controller: 'KapalBebasPTListCtrl',
		controllerAs: 'kapal_bebas_pandu_tunda/list',
		title: 'Kapal Bebas Pandu Tunda List',
		kodeMenu: '2213',
		flagMenu: 'rflag'
	})
	.when('/kapal_bebas_pandu_tunda/new', {
		templateUrl: 'views/kapalbebaspt/new.html',
		controller: 'KapalBebasPTNewCtrl',
		controllerAs: 'kapal_bebas_pandu_tunda/new',
		title: 'Kapal Bebas Pandu Tunda Baru',
		kodeMenu: '2213',
		flagMenu: 'cflag'
	})
	.when('/kapal_bebas_pandu_tunda/edit/:id', {
		templateUrl: 'views/kapalbebaspt/edit.html',
		controller: 'KapalBebasPTEditCtrl',
		controllerAs: 'kapal_bebas_pandu_tunda/edit',
		title: 'Kapal Bebas Pandu Tunda Edit',
		kodeMenu: '2213',
		flagMenu: 'uflag'
	})
	.when('/kapal_bebas_pandu_tunda/view/:id', {
		templateUrl: 'views/kapalbebaspt/view.html',
		controller: 'KapalBebasPTDetailCtrl',
		controllerAs: 'kapal_bebas_pandu_tunda/view',
		title: 'Kapal Bebas Pandu Tunda Detail',
		kodeMenu: '2213',
		flagMenu: 'rflag'
	})
	.when('/monitoring_tambat', {
		templateUrl: 'views/dirops/perencanaan.html',
		controller: 'PerencanaanPublicCtrl',
		controllerAs: 'dirops/perencanaan',
		title: 'Monitoring Tambat',
		kodeMenu: '3601',
		flagMenu: 'rflag'
	})
	.when('/monitoring_pandu', {
		templateUrl: 'views/dirops/monitoringpandu.html',
		controller: 'MonitoringPanduViewCtrl',
		controllerAs: 'dirops/monitoringpandu',
		title: 'Monitoring Pandu',
		kodeMenu: '3602',
		flagMenu: 'rflag'
	})
	.when('/monitoring_tunda', {
		templateUrl: 'views/dirops/monitoringtunda.html',
		controller: 'MonitoringTundaViewCtrl',
		controllerAs: 'dirops/monitoringtunda',
		title: 'Monitoring Tunda',
		kodeMenu: '3603',
		flagMenu: 'rflag'
	})
	.when('/kedatangan', {
		templateUrl: 'views/kedatangankapal/list.html',
		controller: 'ListKedatanganKapalCtrl',
		controllerAs: 'kedatangankapal/list',
		title: 'Daftar Kedatangan Kapal',
		kodeMenu: '3604',
		flagMenu: 'rflag'
	})
	.when('/kedatangan/add', {
		templateUrl: 'views/kedatangankapal/add.html',
		controller: 'AddKedatanganKapalCtrl',
		controllerAs: 'kedatangankapal/add',
		title: 'Daftar Kedatangan Kapal',
		kodeMenu: '3604',
		flagMenu: 'cflag'
	})
	.when('/kedatangan/edit/:id', {
		templateUrl: 'views/kedatangankapal/edit.html',
		controller: 'EditKedatanganKapalCtrl',
		controllerAs: 'kedatangankapal/edit',
		title: 'Daftar Kedatangan Kapal',
		kodeMenu: '3604',
		flagMenu: 'uflag'
	})
	.when('/kapal_sandar', {
		templateUrl: 'views/kapalsandar/list.html',
		controller: 'MonitoringKapalSandarCtrl',
		controllerAs: 'kapalsandar/list',
		title: 'Monitoring Kapal Sandar',
		kodeMenu: '3605',
		flagMenu: 'rflag'
	})
	.when('/panducomar', {
		templateUrl: 'views/transaksi/panducomar.html',
		controller: 'PanduComarCtrl',
		controllerAs: 'transaksi/panducomar',
		title : 'Pandu Comar',
		kodeMenu:'3210',
		flagMenu: 'rflag'
	})
	.when('/jasakapal', {
		templateUrl: 'views/other/jasakapal.html',
		controller: 'JasaKapalCtrl',
		controllerAs: 'other/jasakapal',
		title: 'Laporan Jasa Kapal',
		kodeMenu: '4114',
		flagMenu: 'rflag'
	})
	.when('/laporanarus', {
		templateUrl: 'views/laporan/laporanarus.html',
		controller: 'LaporanArusCtrl',
		controllerAs: 'laporan/laporanarus',
		title: 'Laporan Arus',
		kodeMenu: '4118',
		flagMenu: 'rflag'
	})
	.when('/laporanproduksi', {
		templateUrl: 'views/laporan/laporanproduksi.html',
		controller: 'LaporanProduksiCtrl',
		controllerAs: 'laporan/laporanproduksi',
		title: 'Laporan Produksi',
		kodeMenu: '4119',
		flagMenu: 'rflag'
	})
	.otherwise({
		redirectTo: '/'
	});

	// define interceptor
	$provide.factory('VasaHttpInterceptor', ['$q','$window','$rootScope','$location', function($q, $window, $rootScope,$location){
		return {
			request: function(config){
				if($window.localStorage.token){
					config.headers['X-Token'] = $window.localStorage.token;
				}
				return config;
			},
			response: function(response){
				if(response.headers('X-Token')){
					$window.localStorage.token = response.headers('X-Token');
					$rootScope.kodeCabang = '02';
				}
				return response || $q.when(response);
			},
			responseError:function(rejection){
				if(rejection.status===401){
					$rootScope.$broadcast('showModalSession');
					// localStorage.clear();
					// $location.path('/');
				}
        return rejection;
			}
		};
	}]);

	$httpProvider.interceptors.push('VasaHttpInterceptor');
}])

.run(['$rootScope','$location','$route','$interval','Databinding','RouteData','API_PATH',function($rootScope,$location,$route,$interval,Databinding,RouteData,API_PATH){
	if(RouteData.isHookedToRootSope()) {
    	$rootScope.RouteData = RouteData;
  	}

  	$rootScope.$on('$routeChangeStart', function(event, current, previous) {
    	var route = current.$$route;
    	if(typeof(route) !== 'undefined' && typeof(route['RouteData']) !== 'undefined') {
      		var data = route['RouteData'];
      		for(var index in data)
        	RouteData.set(index, data[index]);
    	} 
  	});
	var checkToken = function() {
		if(localStorage.token) {
			$.ajax({
				type: 'GET',
				url: API_PATH+'auth/check_token',
				headers: {
					"X-Token": localStorage.token
				}
			}).done(function(result){
				if(!result) {
					if($location.path().indexOf("vasapublic") < 0 ){
						$rootScope.$broadcast('showModalSession');
					}
				}
			});
		}
	};

	setInterval(function(){ checkToken(); }, 2*60*1000);
	// End Check Token

	$rootScope.logged = false;
	$rootScope.header = 'views/components/header.html';
	$rootScope.footer = 'views/components/footer.html';
	$rootScope.username = localStorage.getItem('nama');
	$rootScope.namaCabang = localStorage.getItem('namaCabang');
	//add by cahyo
	$rootScope.namaTerminal = localStorage.getItem('namaTerminal');
	$rootScope.inTerminal = localStorage.getItem('inTerminal');
	$rootScope.namaRegional = localStorage.getItem('namaRegional');
	//end add
	$rootScope.$on('$routeChangeSuccess', function(){
		checkToken();

		//stop interval didaftar permohonan bila path bukan daftar permohonan
		if($rootScope.location.indexOf('permohonanlist') < 0) {
			if (angular.isDefined($rootScope.startPmh)) {
            	$interval.cancel($rootScope.startPmh);
          	}
		}

		//set idKawsan bila bukan halaman petugas pandu
		if($rootScope.location.indexOf('petugaspandu') < 0) {
			Databinding.setIdKawasan('');
		}

		// Check User Role
		var userRoleData = JSON.parse(localStorage.getItem('userRole'));
		if(userRoleData) {
			var hasPermission = true;
			userRoleData.groups.forEach(function(group){
				group.menus.forEach(function(menu){
					if(menu.kodeMenu == $route.current.$$route.kodeMenu) {
						hasPermission = menu[$route.current.$$route.flagMenu];
					}
				});
			});
			if(!hasPermission) {
				$location.path('/403');
			}
		}

		// Set Title
		if($route.current.$$route.title) {
			$('title').text($route.current.$$route.title + ' - VASA');
		} else {
			$('title').text('VASA');
		}

		// Configure Navbar
		$('#vasa-navbar').find('.open').each(function(){
			$(this).removeClass('open');
		});

		$('#vasa-navbar').find('.active').each(function(){
			$(this).removeClass('active');
		});

		var isFoundMatch = false;

		$('#vasa-navbar').find('.menu-cabang a').each(function(){
			var url = $(this).attr('href').substring(1);
			if(url.match($route.current.$$route.regexp)){
				isFoundMatch = true;
				$(this).parents('.menu-utama').each(function(){
					$(this).addClass('open');
				});
				$(this).parent('li').addClass('active');
			}
		});

		if(!isFoundMatch) {
			var routeMap = [
				//Dashboard
					{
						path: '/#',
						parentPath : '/#'
					},
				//Administrasi
					//Pengaturan
						//Parameter Aplikasi
							{
								path: '/parameter/new',
								parentPath : '/parameter/list'
							},
							{
								path: '/parameter/edit/:id',
								parentPath : '/parameter/list'
							},
							{
								path: '/parameter/view/:id',
								parentPath : '/parameter/list'
							},
						//Parameter Aplikasi Baru
							{
								path: '/parameteraplikasi/new',
								parentPath : '/parameteraplikasi/list'
							},
							{
								path: '/parameteraplikasi/edit/:id',
								parentPath : '/parameteraplikasi/list'
							},
							{
								path: '/parameteraplikasi/view/:id',
								parentPath : '/parameteraplikasi/list'
							},
						//Parameter Cabang
							{
								path: '/cabang/new',
								parentPath : '/cabang/list'
							},
							{
								path: '/cabang/edit/:id',
								parentPath : '/cabang/list'
							},
							{
								path: '/cabang/view/:id',
								parentPath : '/cabang/list'
							},

						//Roles
							{
								path: '/roles/new',
								parentPath : '/roles'
							},
							{
								path: '/roles',
								parentPath : '/roles/list'
							},
							{
								path: '/roles/detail/:id',
								parentPath : '/roles'
							},
							{
								path: '/roles/edit/:id',
								parentPath : '/roles'
							},
						//Permissions
							{
								path: '/permission/new',
								parentPath : '/permission'
							},
							{
								path: '/permission',
								parentPath : '/permission/list'
							},
							{
								path: '/permission/detail/:id',
								parentPath : '/permission'
							},
							{
								path: '/permission/edit/:id',
								parentPath : '/permission'
							},
						//Aturan Gerak
							{
								path: '/aturangerakpandu',
								parentPath : '/aturangerakpandu/list'
							},
							{
								path: '/aturangerakpandu/new',
								parentPath : '/aturangerakpandu'
							},
							{
								path: '/aturangerakpandu/view/:id',
								parentPath : '/aturangerakpandu'
							},
							{
								path: '/aturangerakpandu/edit/:id',
								parentPath : '/aturangerakpandu'
							},
					//Pemeliharaan tarif
						//Tarif Labuh
							{
								path: '/labuh/list',
								parentPath : '/aturangerakpandu/list'
							},
							{
								path: '/labuh/new',
								parentPath : '/labuh/list'
							},
							{
								path: '/labuh/view/:id',
								parentPath : '/labuh/list'
							},
							{
								path: '/labuh/edit/:id',
								parentPath : '/labuh/list'
							},
						//Tarif Tambat
							{
								path: '/tambat/list',
								parentPath : '/tambat/list'
							},
							{
								path: '/tambat/new',
								parentPath : '/tambat/list'
							},
							{
								path: '/tambat/view/:id',
								parentPath : '/tambat/list'
							},
							{
								path: '/tambat/edit/:id',
								parentPath : '/tambat/list'
							},
						//Tarif Air Kapal
							{
								path: '/airkapal/list',
								parentPath : '/airkapal/list'
							},
							{
								path: '/airkapal/new',
								parentPath : '/airkapal/list'
							},
							{
								path: '/airkapal/view/:id',
								parentPath : '/airkapal/list'
							},
							{
								path: '/airkapal/edit/:id',
								parentPath : '/airkapal/list'
							},
						//Tarif Pandu
							{
								path: '/pandu/list',
								parentPath : '/pandu/list'
							},
							{
								path: '/pandu/new',
								parentPath : '/pandu/list'
							},
							{
								path: '/pandu/view/:id',
								parentPath : '/pandu/list'
							},
							{
								path: '/pandu/edit/:id',
								parentPath : '/pandu/list'
							},
						//Tarif Tunda
							{
								path: '/tunda/list',
								parentPath : '/tunda/list'
							},
							{
								path: '/tunda/new',
								parentPath : '/tunda/list'
							},
							{
								path: '/tunda/view/:id',
								parentPath : '/tunda/list'
							},
							{
								path: '/tunda/edit/:id',
								parentPath : '/tunda/list'
							},
						//Tarif Kepil
							{
								path: '/kepil/list',
								parentPath : '/kepil/list'
							},
							{
								path: '/kepil/new',
								parentPath : '/kepil/list'
							},
							{
								path: '/kepil/view/:id',
								parentPath : '/kepil/list'
							},
							{
								path: '/kepil/edit/:id',
								parentPath : '/kepil/list'
							},
							// Dermaga Pandu
							{
								path: '/dermagapandu/list',
								parentPath : '/dermagapandu/list'
							},
							{
								path: '/dermagapandu/new',
								parentPath : '/dermagapandu/list'
							},
							{
								path: '/dermagapandu/view/:id',
								parentPath : '/dermagapandu/list'
							},
							{
								path: '/dermagapandu/edit/:id',
								parentPath : '/dermagapandu/list'
							},

					//Pemeliharaan Master
						//Kapal Charter
							{
								path: '/kapalcharter/list',
								parentPath : '/kapalcharter/list'
							},
							{
								path: '/kapalcharter/new',
								parentPath : '/kapalcharter/list'
							},
							{
								path: '/kapalcharter/view/:id',
								parentPath : '/kapalcharter/list'
							},
							{
								path: '/kapalcharter/edit/:id',
								parentPath : '/kapalcharter/list'
							},
						//Alat Apung
							{
								path: '/alatapung/list',
								parentPath : '/alatapung/list'
							},
							{
								path: '/alatapung/new',
								parentPath : '/alatapung/list'
							},
							{
								path: '/alatapung/view/:id',
								parentPath : '/alatapung/list'
							},
							{
								path: '/alatapung/edit/:id',
								parentPath : '/alatapung/list'
							},
						//Master Jabatan
							{
								path: '/pejabat/list',
								parentPath : '/pejabat/list'
							},
							{
								path: '/pejabat/new',
								parentPath : '/pejabat/list'
							},
							{
								path: '/pejabat/view/:id',
								parentPath : '/pejabat/list'
							},
							{
								path: '/pejabat/edit/:id',
								parentPath : '/pejabat/list'
							},
						//Dokumen Kapal Kegiatan Tetap
							{
								path: '/dokkapal/list',
								parentPath : '/dokkapal/list'
							},
							{
								path: '/dokkapal/new',
								parentPath : '/dokkapal/list'
							},
							{
								path: '/dokkapal/view/:id',
								parentPath : '/dokkapal/list'
							},
							{
								path: '/dokkapal/edit/:id',
								parentPath : '/dokkapal/list'
							},
						//Master Siklus
							{
								path: '/siklus/list',
								parentPath : '/siklus/list'
							},
							{
								path: '/siklus/new',
								parentPath : '/siklus/list'
							},
							{
								path: '/siklus/view/:id',
								parentPath : '/siklus/list'
							},
							{
								path: '/siklus/edit/:id',
								parentPath : '/siklus/list'
							},
						//Masa Tambat
							{
								path: '/mastermasatambat/list',
								parentPath : '/mastermasatambat/list'
							},
							{
								path: '/mastermasatambat/new',
								parentPath : '/mastermasatambat/list'
							},
							{
								path: '/mastermasatambat/view/:id',
								parentPath : '/mastermasatambat/list'
							},
							{
								path: '/mastermasatambat/edit/:id',
								parentPath : '/mastermasatambat/list'
							},
						//Master Denda
							{
								path: '/masterdenda/list',
								parentPath : '/masterdenda/list'
							},
							{
								path: '/masterdenda/new',
								parentPath : '/masterdenda/list'
							},
							{
								path: '/masterdenda/view/:id',
								parentPath : '/masterdenda/list'
							},
							{
								path: '/masterdenda/edit/:id',
								parentPath : '/masterdenda/list'
							},
						//Master Dermaga Kepil
							{
								path: '/masterdermagakepil/list',
								parentPath : '/masterdermagakepil/list'
							},
							{
								path: '/masterdermagakepil/new',
								parentPath : '/masterdermagakepil/list'
							},
							{
								path: '/masterdermagakepil/view/:id',
								parentPath : '/masterdermagakepil/list'
							},
							{
								path: '/masterdermagakepil/edit/:id',
								parentPath : '/masterdermagakepil/list'
							},
					//Master Fuel Surcharge
						//Master Harga BBM
							{
								path: '/bbm',
								parentPath : '/bbm'
							},
							{
								path: '/bbm/new',
								parentPath : '/bbm'
							},
							{
								path: '/bbm/view/:id',
								parentPath : '/bbm'
							},
							{
								path: '/bbm/edit/:id',
								parentPath : '/bbm'
							},
						//Master Surcharge Pandu
							{
								path: '/surchargepandu/list',
								parentPath : '/surchargepandu/list'
							},
							{
								path: '/surchargepandu/new',
								parentPath : '/surchargepandu/list'
							},
							{
								path: '/surchargepandu/view/:id',
								parentPath : '/surchargepandu/list'
							},
							{
								path: '/surchargepandu/edit/:id',
								parentPath : '/surchargepandu/list'
							},
						//Master Surcharge Tunda
							{
								path: '/mastersurchargetunda/list',
								parentPath : '/mastersurchargetunda/list'
							},
							{
								path: '/mastersurchargetunda/new',
								parentPath : '/mastersurchargetunda/list'
							},
							{
								path: '/mastersurchargetunda/view/:id',
								parentPath : '/mastersurchargetunda/list'
							},
							{
								path: '/mastersurchargetunda/edit/:id',
								parentPath : '/mastersurchargetunda/list'
							},
					//Pemeliharaan Kesepakatan
						//Pelanggan Perjasa
							{
								path: '/pelanggan/list',
								parentPath : '/pelanggan/list'
							},
							{
								path: '/pelanggan/new',
								parentPath : '/pelanggan/list'
							},
							{
								path: '/pelanggan/view/:id',
								parentPath : '/pelanggan/list'
							},
							{
								path: '/pelanggan/edit/:id',
								parentPath : '/pelanggan/list'
							},
						//Pelanggan Kapal langganan
							{
								path: '/kapallangganan/list',
								parentPath : '/kapallangganan/list'
							},
							{
								path: '/kapallangganan/new',
								parentPath : '/kapallangganan/list'
							},
							{
								path: '/kapallangganan/view/:id',
								parentPath : '/kapallangganan/list'
							},
							{
								path: '/kapallangganan/edit/:id',
								parentPath : '/kapallangganan/list'
							},
						//Perlokasi Tujuan
							{
								path: '/perlokasitujuan/list',
								parentPath : '/perlokasitujuan/list'
							},
							{
								path: '/perlokasitujuan/new',
								parentPath : '/perlokasitujuan/list'
							},
							{
								path: '/perlokasitujuan/view/:id',
								parentPath : '/perlokasitujuan/list'
							},
							{
								path: '/perlokasitujuan/edit/:id',
								parentPath : '/perlokasitujuan/list'
							},
							//master kesepakatan
							{
								path: '/masterkesepakatan/list',
								parentPath : '/masterkesepakatan/list'
							},
							{
								path: '/masterkesepakatan/new',
								parentPath : '/masterkesepakatan/list'
							},
							{
								path: '/masterkesepakatan/view/:id',
								parentPath : '/masterkesepakatan/list'
							},
							{
								path: '/masterkesepakatan/edit/:id',
								parentPath : '/masterkesepakatan/list'
							},
							//Tagihan Minimum
							{
								path: '/tagihanminimum',
								parentPath : '/tagihanminimum'
							},
							{
								path: '/tagihanminimum/new',
								parentPath : '/tagihanminimum'
							},
							{
								path: '/tagihanminimum/view/:id',
								parentPath : '/tagihanminimum'
							},
							{
								path: '/tagihanminimum/edit/:id',
								parentPath : '/tagihanminimum'
							},
							//kapal tunda minimum Cabang
							{
								path: '/kapal_tunda_min/new',
								parentPath : '/kapal_tunda_min/list'
							},
							{
								path: '/kapal_tunda_min/edit/:id',
								parentPath : '/kapal_tunda_min/list'
							},
							//Kapal Bebas Pandu Tunda
							{
								path: '/kapal_bebas_pandu_tunda/list',
								parentPath : '/kapal_bebas_pandu_tunda/list'
							},
							{
								path: '/kapal_bebas_pandu_tunda/new',
								parentPath : '/kapal_bebas_pandu_tunda/list'
							},
							{
								path: '/kapal_bebas_pandu_tunda/view/:id',
								parentPath : '/kapal_bebas_pandu_tunda/list'
							},
							{
								path: '/kapal_bebas_pandu_tunda/edit/:id',
								parentPath : '/kapal_bebas_pandu_tunda/list'
							},
				//Transaksi
					//Monitoring
						{
							path: '/transaksi/listmonitoring',
							parentPath : '/transaksi/transaksi'
						},
						{
							path: '/transaksi/listmonitoring/:id',
							parentPath : '/transaksi/listmonitoring'
						},
						{
							path: '/transaksi/listmonitoring/idvisit/:idVisit',
							parentPath : '/transaksi/listmonitoring'
						},
						{
							path: '/transaksi/listmonitoring/namaKapal/:namaKapal',
							parentPath : '/transaksi/listmonitoring'
						},
						{
							path: '/riwayateskalasi',
							parentPath : '/riwayateskalasi'
						},


							// {
							// 	path: '/perlokasitujuan/view/:id',
							// 	parentPath : '/perlokasitujuan/list'
							// },

 //marvin
					//batal jasa tanpa denda
						{
							path: '/transaksi/bataljasatanpadenda',
							parentPath : '/transaksi/bataljasatanpadenda'
						},	
					//Permohonan
						{
							path: '/transaksi/jasabaru/:id',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/list',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/new',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/permohonan',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/permohonan',
							parentPath : '/transaksi/dataumum/:id/:status'
						},
						{
							path: '/transaksi/permohonan/:ppk1',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/permohonanlist/:ppk1',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/listPermohonan/:ppk1',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/listPermohonan/:ppk1/:urutan',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/permohonan/:id/:urutan',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/permohonan/:id/:urutan/:escMode',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/gantiagen',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/kegiatantetap',
							parentPath : '/transaksi/permohonanlist'
						},
						{
							path: '/transaksi/kegiatantetapnew',
							parentPath : '/transaksi/permohonanlist'
						},{
							path: '/transaksi/kegiatantetapnew',
							parentPath : '/transaksi/permohonanlist'
						},

					//Penetapan
						{
							path: '/transaksi/penetapan/:id/:urutan',
							parentPath : '/transaksi/penetapan'
						},
						{
							path: '/transaksi/penetapan/:ppk1',
							parentPath : '/transaksi/penetapan'
						},
						{
							path: '/transaksi/listPenetapan/:ppk1',
							parentPath : '/transaksi/penetapan'
						},
						{
							path: '/transaksi/listPenetapan/:ppk1/:urutan',
							parentPath : '/transaksi/penetapan'
						},
						{
							path: '/transaksi/pembatalan/:id/:urutan/:status',
							parentPath : '/transaksi/penetapan'
						},

						{
							path : '/perubahan/:ppk1/:urutan',
							parentPath : '/transaksi/penetapan'
						},
						{
							path : '/perpanjangan/:ppk1/:urutan',
							parentPath : '/transaksi/penetapan'
						},
						{
							path : '/perpendekan/:ppk1/:urutan',
							parentPath : '/transaksi/penetapan'
						},
					//Realisasi
						{
							path : '/transaksi/realisasi/:ppk1/:urutan',
							parentPath : '/transaksi/realisasi'
						},
						{
							path : '/transaksi/realisasi/:ppk1',
							parentPath : '/transaksi/realisasi'
						},
						{
							path : '/transaksi/listRealisasi/:ppk1',
							parentPath : '/transaksi/realisasi'
						},
						{
							path : '/transaksi/listRealisasi/:ppk1/:urutan',
							parentPath : '/transaksi/realisasi'
						},
						{
							path : '/transaksi/pranota/:ppk1/:urutan',
							parentPath : '/transaksi/realisasi'
						},
						{
							path : '/transaksi/pranota/:ppk1',
							parentPath : '/transaksi/realisasi'
						},
						//Revisi Anjungan
						{
							path : '/revisianjungan',
							parentPath : '/revisianjungan'
						},
						//Kapal Kegiatan Tetap
						{
							path : '/kapalkegiatantetap/new',
							parentPath : '/kapalkegiatantetap'
						},
						{
							path : '/kapalkegiatantetap/deleted',
							parentPath : '/kapalkegiatantetap'
						},
						//AirKapal
						{
							path : '/airkapal/permohonan',
							parentPath : '/airkapal/'
						},
						{
							path : '/airkapal/permohonan/:ppk1',
							parentPath : '/airkapal/permohonan'
						},
						{
							path : '/airkapal/penetapan',
							parentPath : '/airkapal'
						},
						{
							path : '/airkapal/penetapan/:ppk1',
							parentPath : '/airkapal/penetapan'
						},
						{
							path : '/airkapal/realisasi',
							parentPath : '/airkapal'
						},
						{
							path : '/airkapal/realisasi/:ppk1',
							parentPath : '/airkapal/realisasi'
						},
						// laporankapaltunda
						{
							path: '/manajementunda/laporankapaltunda',
							parentPath : '/manajementunda/laporankapaltunda'
						},
						// perencanaan
						{
							path: '/perencanaan',
							parentPath : '/perencanaan'
						},
						{
							path: '/perencanaan/:kodeDermaga/:tgl',
							parentPath : '/perencanaan'
						},
						{
							path: '/penetapan/:kodeDermaga/:tgl',
							parentPath : '/penetapanmeeting'
						},
						{
							path: '/perencanaan/preprameeting/:kodeDermaga/:tgl',
							parentPath : '/perencanaan/preprameeting'
						},
						{
							path: '/perencanaan/tambahkapal/:kodeDermaga/:tgl/:isMeetingSusulan',
							parentPath : '/perencanaan/preprameeting'
						},
						{
							path: '/hasilmeeting/tambahkapalmeeting/:kodeDermaga/:tgl',
							parentPath : '/perencanaan/preprameeting'
						},
						{
							path: '/perencanaan/preprameeting',
							parentPath : '/perencanaan/preprameeting'
						},
						{
							path: '/perencanaan/laporanprameeting',
							parentPath : 'perencanaan/laporanprameeting'
						},
						{
							path: '/prameeting/report/:kodeDermaga/:tgl',
							parentPath : '/perencanaan/laporanprameeting'
						},
						{
							path: '/meeting/report/:kodeDermaga/:tgl',
							parentPath : '/perencanaan/laporanmeeting'
						},
						{
							path: '/perencanaan/laporanmeeting',
							parentPath : '/perencanaan/laporanmeeting'
						},
						{
							path: '/perencanaan/reportantrian',
							parentPath : '/perencanaan/reportantrian'
						},
						/*{
							path: '/perencanaan/list/:kodeDermaga/:tgl',
							parentPath : '/laporanprameeting'
						},*/
						// manajementunda
						{
							path: '/manajementunda/listkapaltunda',
							parentPath : '/manajementunda/listkapaltunda'
						},
						{
							path: '/manajementunda/aturankapaltunda',
							parentPath : '/manajementunda/aturankapaltunda'
						},
						//tipe eskalasi
						{
							path: '/tipeeskalasi',
							parentPath : '/tipeeskalasi'
						},
						// meetinguser
						{
							path: '/meetinguser/new',
							parentPath : '/meetinguser/list'
						},
						{
							path: '/meetinguser/list',
							parentPath : '/meetinguser/list'
						},
						{
							path: '/meetinguser/view/:id',
							parentPath : '/meetinguser/list'
						},
						{
							path: '/meetinguser/edit/:id',
							parentPath : '/meetinguser/list'
						},
						// clusteringkapal
						{
							path: '/cluster/clusteringkapal',
							parentPath : '/cluster/clusteringkapal'
						},
						// informasidermaga
						{
							path: 'kademeter/informasidermaga',
							parentPath : 'kademeter/informasidermaga'
						},
						// kademeterdermaga
						{
							path: '/kademeter/kademeterdermaga',
							parentPath : '/kademeter/kademeterdermaga'
						},
						// clusterutama
						{
							path: '/cluster/clusterutama',
							parentPath : '/cluster/clusterutama'
						},
						// clustermuatan
						{
							path: '/cluster/clustermuatan',
							parentPath : '/cluster/clustermuatan'
						},
						// manajemenpandu
						{
							path: '/manajemenpandu/jadwalpandu',
							parentPath : '/manajemenpandu/jadwalpandu'
						},
						{
							path: '/manajemenpandu/realisasipandu',
							parentPath : '/manajemenpandu/realisasipandu'
						},
						{
							path: '/manajemenpandu/monitoringpandu',
							parentPath : '/manajemenpandu/monitoringpandu'
						},
						{
							path: '/manajemenpandu/monitoring',
							parentPath : '/manajemenpandu/monitoring'
						},
						// kawasanpandu
						{
							path: '/kawasanpandu/list',
							parentPath : '/kawasanpandu/list'
						},{
							path: '/kawasanpandu/edit/:id',
							parentPath : '/kawasanpandu/list'
						},{
							path: '/kawasanpandu/new',
							parentPath : '/kawasanpandu/list'
						},
						// gruppandu
						{
							path: '/gruppandu/list',
							parentPath : '/gruppandu/list'
						},{
							path: '/gruppandu/edit/:id',
							parentPath : '/gruppandu/list'
						},{
							path: '/gruppandu/new',
							parentPath : '/gruppandu/list'
						},
						// jamkerjapandu
						{
							path: '/jamkerjapandu/list',
							parentPath : '/jamkerjapandu/list'
						},{
							path: '/jamkerjapandu/edit/:id',
							parentPath : '/jamkerjapandu/list'
						},{
							path: '/jamkerjapandu/new',
							parentPath : '/jamkerjapandu/list'
						},
						// petugaspandu
						{
							path: '/petugaspandu/list',
							parentPath : '/petugaspandu/list'
						},{
							path: '/petugaspandu/edit/:id',
							parentPath : '/petugaspandu/list'
						},{
							path: '/petugaspandu/new',
							parentPath : '/petugaspandu/list'
						},
						// grupdermagatambat
						{
							path: '/grupdermagatambat/list',
							parentPath : '/grupdermagatambat/list'
						},{
							path: '/grupdermagatambat/edit/:id',
							parentPath : '/grupdermagatambat/list'
						},{
							path: '/grupdermagatambat/new',
							parentPath : '/grupdermagatambat/list'
						},
						// dermagatambat
						{
							path: '/dermagatambat/list',
							parentPath : '/dermagatambat/list'
						},{
							path: '/dermagatambat/edit/:id',
							parentPath : '/dermagatambat/list'
						},{
							path: '/dermagatambat/new',
							parentPath : '/dermagatambat/list'
						},
						// dermagatambat
						{
							path: '/gruptambat/list',
							parentPath : '/gruptambat/list'
						},{
							path: '/gruptambat/edit/:id',
							parentPath : '/gruptambat/list'
						},{
							path: '/gruptambat/new',
							parentPath : '/gruptambat/list'
						},
						// jamkerjatambat
						{
							path: '/jamkerjatambat/list',
							parentPath : '/jamkerjatambat/list'
						},{
							path: '/jamkerjatambat/edit/:id',
							parentPath : '/jamkerjatambat/list'
						},{
							path: '/jamkerjatambat/new',
							parentPath : '/jamkerjatambat/list'
						},
						// petugastambat
						{
							path: '/petugastambat/list',
							parentPath : '/petugastambat/list'
						},{
							path: '/petugastambat/edit/:id',
							parentPath : '/petugastambat/list'
						},{
							path: '/petugastambat/new',
							parentPath : '/petugastambat/list'
						},
						//Master Pilot
						{
							path: '/masterpilot/list',
							parentPath : '/masterpilot/list'
						},
						{
							path: '/masterpilot/new',
							parentPath : '/masterpilot/list'
						},
						{
							path: '/masterpilot/edit/:id',
							parentPath : '/masterpilot/list'
						},
						//meetingonline
						{
							path: '/monitoring/rpkro',
							parentPath : '/monitoring/rpkro'
						},
						/*{
							path: '/meetingonline/new',
							parentPath : '/meetingonline/list'
						},
						{
							path: '/meetingonline/view/:id',
							parentPath : '/meetingonline/list'
						},
						{
							path: '/meetingonline/edit/:id',
							parentPath : '/meetingonline/list'
						},
						{
							path: '/meetingonline/room/:id',
							parentPath : '/meetingonline/list'
						},
						{
							path: '/meetingonline/room',
							parentPath : '/meetingonline/list'
						},*/
						{
							path: '/manajementambat/jadwaltambat',
							parentPath : '/manajementambat/jadwaltambat'
						},
						{
							path: '/manajementambat/monitoring',
							parentPath : '/manajementambat/monitoring'
						},
						{
							path: '/manajemenpandu/perencanaan',
							parentPath : '/manajemenpandu/perencanaan'
						},
						{
							path : '/paramkesepakatan/new',
							parentPath : '/paramkesepakatan/list'
						},
						{
							path : '/paramkesepakatan/list',
							parentPath : '/paramkesepakatan/list'
						},
						{
							path : '/paramkesepakatan/view/:id',
							parentPath : '/paramkesepakatan/list'
						},
						{
							path : '/paramkesepakatan/edit/:id',
							parentPath : '/paramkesepakatan/list'
						}, //operasional
						{
							path : '/monitoring_tambat',
							parentPath : '/monitoring_tambat'
						},
						{
							path : '/monitoring_pandu',
							parentPath : '/monitoring_pandu'
						},
						{
							path : '/kedatangan',
							parentPath : '/kedatangan'
						},
						{
							path : '/kedatangan/edit/:id',
							parentPath : '/kedatangan'
						},
						{
							path : '/kedatangan/add',
							parentPath : '/kedatangan'
						},
						{
							path : '/kapal_sandar',
							parentPath : '/kapal_sandar'
						}
				//Laporan
					//Daftar Kegiatan Kapal
					//Laporan Harian
					//Laporan Kegiatan Pemanduan
					//Rekapitulasi Kinerja Petugas
					//Pivot Keuangan
					//Pivot Operasional
			];

			routeMap.forEach(function(routeItem){
				if(routeItem.path.match($route.current.$$route.regexp)){
					$('#vasa-navbar').find('.menu-cabang a').each(function(){
						var url = $(this).attr('href').substring(1);
						if(url == routeItem.parentPath){
							$(this).parents('.menu-utama').each(function(){
								$(this).addClass('open');
							});
							$(this).parent('li').addClass('active');
						}
					});
				}
			});
		}
	});
	$rootScope.$on('$routeChangeStart', function(){
		var authorization = localStorage.getItem('Authorization');
		$rootScope.username = localStorage.getItem('nama');
		$rootScope.namaCabang = localStorage.getItem('namaCabang');
		//add by cahyo
		$rootScope.namaTerminal = localStorage.getItem('namaTerminal');
		$rootScope.inTerminal = localStorage.getItem('inTerminal');
		$rootScope.namaRegional = localStorage.getItem('namaRegional');
		//end add
		$rootScope.isPusat = localStorage.getItem('isPusat');
		if(authorization === null){
			if($location.path().indexOf("vasapublic") > -1){
				$location.path($location.path());
			} else{
				$location.path('/login');
			}
			$rootScope.logged = true;
		}else{
			if($location.path().indexOf("vasapublic") > -1){
				// localStorage.clear();
				$rootScope.logged = true;
			}
		}
		$rootScope.location = $location.path();
	});
	$rootScope.notification  = {
		status	: "hide",
		type	: false,
		message	: false,
		icon	: false,
		hasEsc	: false,
		dataEsc : false
	};
	$rootScope.modalNotification  = {
		status	: "hide",
		type	: false,
		message	: false,
		icon	: false
	};
	// Set the default value of inputTypePassword
	$rootScope.userApprover = {};
	$rootScope.inputTypePassword = 'password';
}]);

(function() {
	var hn = '10.37.127.95';
	var alocal = (hn.indexOf('192') === 0) || (hn.indexOf('127') === 0) || (hn.indexOf('localhost') === 0 || (hn.indexOf('0.0.0.0') === 0));
	var clientMqtt = alocal?'vasa-develop-':'vasa-production-';
	var localAPI, ipMqtt, ipMeetingOnline;
	if(hn==='10.0.127.95' || hn==='vasa-dev.pelindo.co.id'){
		localAPI = 'vasa-dev.pelindo.co.id';
		ipMqtt = 'Notifvasa.pelindo.co.id';
		ipMeetingOnline = 'vasa.pelindo.co.id:3000';
	}else if(hn==='10.37.127.95' || hn==='vasa3.pelindo.co.id'){
		localAPI = 'vasa3.pelindo.co.id';
		ipMqtt = 'Notifvasa.pelindo.co.id';
		ipMeetingOnline = 'vasa.pelindo.co.id:3000';
	}else if(hn==='10.0.130.19'){
		localAPI = '10.0.130.19:8081';
		ipMqtt = '10.0.130.19';
		ipMeetingOnline = '10.0.130.19:3000';
	}else{
		localAPI = '10.0.130.19:8081';
		ipMqtt = '10.0.130.19';
		ipMeetingOnline = '10.0.130.19:3000';
		/* jika mau akses ke prod dari lokal */
		
		//localAPI = 'vasa.pelindo.co.id';
		// ipMqtt = 'Notifvasa.pelindo.co.id';
		// ipMeetingOnline = 'vasa.pelindo.co.id:3000';
		
	}

	angular.module('vasaApp')
	// Aslinya dicoment dahulu : 
	/*.constant('API_PATH', alocal ? 'http://10.0.130.19:8080/api/': '/api/')
	.constant('BASE_PATH', alocal ? 'http://10.0.130.19:8080/' : '/')*/
	.constant('API_PATH', 'https://'+localAPI+'/api/')
	.constant('BASE_PATH', 'https://'+localAPI+'/')
	.constant('MQTT_PATH', { wsbroker : ipMqtt, wsport : 8884, wsclientId : clientMqtt })
	.constant('MOL_PATH', 'http://'+ipMeetingOnline)
	.constant('$PAGE_SIZE', 10);
})();
