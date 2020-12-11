'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:TransaksiListCtrl
 * @description
 * # TransaksiListCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
	 .controller('MonitoringListCtrl', ['$scope', '$filter', '$location', '$timeout', '$route', '$routeParams', '$window', 'BindKapal', 'Notification', 'PermohonanList', 'StatusEPBPermohonan', 'ConfirmedPenetapan', 'PermohonanAll', 'PenetapanDetail', 'MonitoringDetail', 'LoadingScreen', 'UserRole', 'PermohonanGetEPB', 'PermohonanRecalculateEPB', 'InformasiKegiatanKapal', 'SearchKapalGandengByNoPpk1Tongkang', 'SpbInaportnet','TanggalBatal','PemakaianBbmTunda',function ($scope, $filter, $location, $timeout, $route, $routeParams, $window, BindKapal, Notification, PermohonanList, StatusEPBPermohonan, ConfirmedPenetapan, PermohonanAll, PenetapanDetail, MonitoringDetail, LoadingScreen, UserRole, PermohonanGetEPB, PermohonanRecalculateEPB, InformasiKegiatanKapal, SearchKapalGandengByNoPpk1Tongkang, SpbInaportnet,TanggalBatal,PemakaianBbmTunda) {
 	$scope.userRole = UserRole.getCurrentRole();
 	LoadingScreen.show();
 	$scope.orderby = 'idKapal';
 	$scope.filtersText = '';
 	var locationPath = '/transaksi/listmonitoring';
 	$scope.sortAscending = false;
 	$scope.detailJasa = [];
 	$scope.informasiLengthItem = "";
 	$scope.selectionSearch = false;
 	$scope.searchText = "";
 	$scope.infoKegiatanKapal = {};
 	$scope.infoPemakaianBbmTunda = "";
	$scope.today = new Date();
	if($routeParams.ppk1 || $routeParams.namaKapal){
		$scope.parameterUrl = true;		
	}else if($routeParams.idVisit){
		$scope.parameterUrl = true;		
		$scope.parameterIdVisit = true;
		$scope.idVisitVal = $routeParams.idVisit;
	}else{
		$scope.parameterUrl = false;
	}

	$scope.newCustomers = [];
	$scope.currentCustomer = {};

	/*Info status Pelaksanaan : 
	- 1 : Normal
	- 2 : Tanpa Permohonan
	- 3 : Putus Valuta
	- 4 : Kapal Kegiatan Tetap
	- 5 : Gerakan Geser
	*/

 	$scope.sendEsclationHistory = function(){
 		var note =  {
			type 	: 'warning',
			message : 'Test Request Eskalasi',
			hasEsc	: true,
			dataEsc : ''
		};
		Notification.setNotification(note);
 	};

 	$scope.filterConfig = [
		{
			id: 'namaKapal',
			title:  'Nama Kapal',
			placeholder: 'Filter by Nama Kapal',
			filterType: 'text'
		},
		{
			id: 'kodeKapal',
			title:  'Kode Kapal',
			placeholder: 'Filter by Kode Kapal',
			filterType: 'text'
		},
		{
			id: 'noPpk1',
			title:  'No. PPK1',
			placeholder: 'Filter by No. PPK1',
			filterType: 'text'
		},
		{
			id: 'idVisit',
			title:  'ID Visit',
			placeholder: 'Filter by ID Visit',
			filterType: 'text'
		}
	];

    //event untuk menentukan min length search berdasarkan selection
	$scope.$watch('selectionSearch', function(val)
	{ 	
		if(val.id === 'namaKapal'){
	   		$scope.filterMinLength = 3;
		}else if(val.id === 'kodeKapal'){
	   		$scope.filterMinLength = 7;
		}else if(val.id === 'noPpk1'){
	   		$scope.filterMinLength = 9;
		}else if(val.id === 'idVisit'){
	   		$scope.filterMinLength = 9;
		}
		$scope.filterPlaceholder = val.placeholder;
	});

 	$scope.config = {
 		selectItems: false,
 		multiSelect: false,
 		dblClick: false,
 		selectionMatchProp: 'namaKapal',
 		selectedItems: [],
 		showSelectBox: false,
		onClick: false
 	};

 	$scope.ascOptions = [
 		{
 			value:true,
 			caption:'Ascending'
 		},
 		{
 			value:false,
 			caption:'Descending'
 		}
 	];

 	var performActionTable = function (action, item) {
 		$scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
 	};

 	var formatCurr = function(input) {
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
        return value;
    };

 	$scope.items=[];
 	$scope.allItems = {};
 	$scope.valueKapal = BindKapal.getKapal();

 	function groupBy( array , f )
	{
		var groups = {};
		array.forEach( function( o )
		{
		var group = JSON.stringify( f(o) );
			groups[group] = groups[group] || [];
			groups[group].push( o );
		});
		return Object.keys(groups).map( function( group )
		{
			return groups[group];
		})
	}

	$scope.sortedRevisiJasa = function(a,b) {
		if (Date.parse(a.created) > Date.parse(b.created)){
			return -1;
		}
		if (Date.parse(a.created) < Date.parse(b.created)){
			return 1;
		}
		return 1;
	}

	$scope.setJenisGerakan = function(jenisGerakan){
		var jenisGerakanText = '';
		if(jenisGerakan==='1'){
			jenisGerakanText = 'Masuk';
		} else if (jenisGerakan==='3'){
			jenisGerakanText = 'Keluar';
		} else {
			jenisGerakanText = 'Pindah';
		}
		return jenisGerakanText;
	}

	$scope.pushDataDummyRea = function(jasaPtp, jasaRea, itemRea){
		var itemDataDummy = {};
		itemDataDummy.statusDummyRea = 1;
		if(jasaPtp.length>jasaRea.length){
			jasaPtp.forEach(function(item){
				if (item.nama == 'epb_tambat' || item.nama == 'epb_pandu' || item.nama == 'epb_tunda') {
					if(item.noPpkJasa !== itemRea.noPpkJasa){
						itemDataDummy = item;
						if(itemRea.id){
							itemDataDummy.nipPandu = '';
							itemDataDummy.namaPandu = '';
							itemDataDummy.statusDummyRea = 9;
						}
						jasaRea.push(itemDataDummy);
					}
				}
			});
		}
	}

	$scope.pushDataDummyPtp = function(jasaPmh, jasaPtp, itemPtp){
		var itemDataDummy = {};
		itemDataDummy.statusDummyPtp = 1;
		if(jasaPmh.length>jasaPtp.length){
			jasaPmh.forEach(function(item){
				if (item.nama == 'epb_tambat' || item.nama == 'epb_pandu' || item.nama == 'epb_tunda') {
					if(item.noPpkJasa !== itemPtp.noPpkJasa){
						itemDataDummy = item;
						if(itemPtp.id){
							itemDataDummy.nipPandu = '';
							itemDataDummy.namaPandu = '';
							itemDataDummy.statusDummyPtp = 9;
						}
						jasaPtp.push(itemDataDummy);
					}
				}
			});
		}
	}

	//function yang digunakan untuk menampilkan detail monitoring
	$scope.getMonitoringDetail = function(ppk1,urutanPermohonan,detailJasa){
	  	MonitoringDetail.get({
			ppk1 	: ppk1,
			urutan 	: urutanPermohonan
		},
		function(response){
			var pmhData = response.detailPmh.jasa;
			var ptpData = response.detailPmh.ptpJasa;
			var reaData = response.detailPmh.reaJasa;
			var revData = response.detailPmh.ptpJasaHistory;
			for (var k = 0; k<detailJasa.length; k++ ){
				detailJasa[k].detailPmhJasa = pmhData;
				detailJasa[k].detailPtpJasa = ptpData;
				detailJasa[k].detailReaJasa = reaData;
				detailJasa[k].detailRevJasa = revData;
				var jasaPmh = detailJasa[k].detailPmhJasa;
				var jasaRea = detailJasa[k].detailReaJasa;
				var jasaPtp = detailJasa[k].detailPtpJasa;
				var jasaRevisi = detailJasa[k].detailRevJasa;
				var temp = {};
				var kadeAwal,kadeAkhir;
				
				detailJasa[k].detailRevJasa.sort($scope.sortedRevisiJasa);
				detailJasa[k].detailRevJasa.forEach(function(item){
					if(item.nama == 'epb_pandu'){
						if(!temp['epb_pandu']) {
							temp['epb_pandu'] = item;
						}	
					}
					else if(item.nama == 'epb_tambat'){
						if(!temp['epb_tambat']) {
							temp['epb_tambat'] = item;
						}		
					}
					else if(item.nama == 'epb_labuh'){
						if(!temp['epb_labuh']) {
							temp['epb_labuh'] = item;
						}	
					}
					else if(item.nama == 'epb_tunda'){
						if(!temp['epb_tunda']) {
							temp['epb_tunda'] = item;
						}	
					}
					else if(item.nama == 'epb_air_kapal'){
						if(!temp['epb_air_kapal']) {
							temp['epb_air_kapal'] = item;
						}	
					}
				});

				//set jasa penetapan : 
				jasaPtp.forEach(function(item){
					if (item.nama == 'epb_pandu') {
						if(temp['epb_pandu']) {
							if(temp['epb_pandu'].jenisRevisi==8){
								item.jenisRevisi = temp['epb_pandu'].jenisRevisi;
								item.namaLokasiAsal = temp['epb_pandu'].namaLokasiAsal;
								item.kodeLokasiAsal = temp['epb_pandu'].kodeLokasiAsal;
								item.namaLokasiTujuan = temp['epb_pandu'].namaLokasiTujuan;
								item.kodeLokasiTujuan = temp['epb_pandu'].kodeLokasiTujuan;
								item.namaLokasi = temp['epb_pandu'].namaLokasi;		
								item.tglMulai = temp['epb_pandu'].tglMulai;		
							}
						}
						item.jenisGerakanText = $scope.setJenisGerakan(item.jenisGerakan);
					}else if (item.nama == 'epb_tambat') {
						if(temp['epb_tambat']) {
							if(temp['epb_tambat'].jenisRevisi==6 || temp['epb_tambat'].jenisRevisi==7 || temp['epb_tambat'].jenisRevisi==8){
								item.jenisRevisi = temp['epb_tambat'].jenisRevisi;	
								item.namaLokasi = temp['epb_tambat'].namaLokasi;
								item.kodeLokasi = temp['epb_tambat'].kodeLokasi;
								item.tglMulai = temp['epb_tambat'].tglMulai;
								// if(temp['epb_tambat'].jenisRevisi==6 && temp['epb_tambat'].status==1){
								// 	item.tglSelesai = temp['epb_tambat'].tglSelesaiBefore;
								// }else{
								// 	item.tglSelesai = temp['epb_tambat'].tglSelesai;
								// }
								item.tglSelesai = temp['epb_tambat'].tglSelesai;
								item.kadeAwal = temp['epb_tambat'].kadeAwal;
								item.kadeAkhir = temp['epb_tambat'].kadeAkhir;
							}
							/* data untuk kebutuhan modal permohonan Geser*/
						}
						if(item.prevNoPpkJasa){
							item.flagSuratPerintah = response.detailPmh.jasa[0].flagSuratPerintah?'Ada':'Tidak Ada';
							item.created = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');
							item.createdBefore = $filter('date')(item.createdBefore, 'dd-MM-yyyy HH:mm');
							item.tglMulai = $filter('date')(item.tglMulai, 'dd-MM-yyyy HH:mm');
							item.tglMulaiBefore = $filter('date')(item.tglMulaiBefore, 'dd-MM-yyyy HH:mm');
							item.tglSelesai = $filter('date')(item.tglSelesai, 'dd-MM-yyyy HH:mm');
							item.tglSelesaiBefore = $filter('date')(item.tglSelesaiBefore, 'dd-MM-yyyy HH:mm');
							item.kadeMeter = item.kadeAwal>=0?String(item.kadeAwal) +' - '+ String(item.kadeAkhir):' - ';
							item.kadeMeterBefore = item.kadeAkhir>=0?String(item.prevKadeAwal) +' - '+ String(item.prevKadeAkhir):' - ';			
						}
					}else if (item.nama == 'epb_labuh') {
						if(temp['epb_labuh']) {
							//item.tglMasuk = temp['epb_labuh'].tglMasuk;		
						}
					}else if (item.nama == 'epb_tunda') {
						if(temp['epb_tunda']) {
							if(temp['epb_tunda'].jenisRevisi==8){
								item.jenisRevisi = temp['epb_tunda'].jenisRevisi;	
								item.namaLokasiAsal = temp['epb_tunda'].namaLokasiAsal;
								item.kodeLokasiAsal = temp['epb_tunda'].kodeLokasiAsal;
								item.namaLokasiTujuan = temp['epb_tunda'].namaLokasiTujuan;
								item.kodeLokasiTujuan = temp['epb_tunda'].kodeLokasiTujuan;
								item.tglMulai = temp['epb_tunda'].tglMulai;
							}
						}
					}else if (item.nama == 'epb_air_kapal') {
						if(temp['epb_air_kapal']) {
							if(temp['epb_air_kapal'].jenisRevisi==8){
								item.jenisRevisi = temp['epb_air_kapal'].jenisRevisi;	
								item.namaDermaga = temp['epb_air_kapal'].namaDermaga;
								item.kodeDermaga = temp['epb_air_kapal'].kodeDermaga;
								item.tglIsi = temp['epb_air_kapal'].tglIsi;
							}	
						}
					}
					item.statusPenetapan = response.detailPmh.status;
					item.classBtlJasa = '';					
					if(item.jenisRevisi===9 || item.jenisRevisi===10){
						item.classBtlJasa = 'col-jasa-batal';
					}
					if (item.nama == 'epb_tambat' || item.nama == 'epb_pandu' || item.nama == 'epb_tunda') {
						$scope.pushDataDummyPtp(jasaPmh, jasaPtp, item);
					}
				});

				jasaRea.forEach(function(item){
					if (item.nama == 'epb_tambat' || item.nama == 'epb_pandu' || item.nama == 'epb_tunda') {
						$scope.pushDataDummyRea(jasaPtp, jasaRea, item);
						if (item.nama == 'epb_pandu') {
							item.jenisGerakanText = $scope.setJenisGerakan(item.jenisGerakan);
						}
					}
				});

				//set jasa history : 
				jasaRevisi.forEach(function(item){
					if (item.nama == 'epb_pandu') {
						item.namaJasa = 'Pandu';
						item.tglPengajuan = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');
						item.tgl1 = $filter('date')(item.tglMulai, 'dd-MM-yyyy HH:mm');
						item.tgl1Before = $filter('date')(item.tglMulaiBefore, 'dd-MM-yyyy HH:mm');	
						item.dermaga1 = item.namaLokasiAsal+' ('+item.kodeLokasiAsal+')';
						item.dermaga1Before = item.namaLokasiAsalBefore+' ('+item.kodeLokasiAsalBefore+')';
						item.dermaga2 = item.namaLokasiTujuan+' ('+item.kodeLokasiTujuan+')';
						item.dermaga2Before = item.namaLokasiTujuanBefore+' ('+item.kodeLokasiTujuanBefore+')';
						item.showTgl = item.tgl1Before!==item.tglMulai?true:false;
						item.showDermaga1 = item.namaLokasiAsalBefore!==item.namaLokasiAsal?true:false;
						item.showDermaga2 = item.namaLokasiTujuanBefore!==item.namaLokasiTujuan?true:false;
					}else if (item.nama == 'epb_tambat') {
						item.namaJasa = 'Tambat';
						item.dermaga2 = item.namaLokasi+' ('+item.kodeLokasi+')';
						item.dermaga2Before = item.namaLokasiBefore+' ('+item.kodeLokasiBefore+')';
						item.prevKadeAwal = item.prevKadeAwal!==null?item.prevKadeAwal:'0';
						item.prevKadeAkhir = item.prevKadeAkhir!==null?item.prevKadeAkhir:'0';
						item.kadeAwal = item.kadeAwal!==null?item.kadeAwal:'0';
						item.kadeAkhir = item.kadeAkhir!==null?item.kadeAkhir:'0';
						item.kadeMeterBefore = item.prevKadeAwal+' - '+item.prevKadeAkhir;
						item.kadeMeter = item.kadeAwal+' - '+item.kadeAkhir;
						item.tglPengajuan = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');	
						item.tgl1 = $filter('date')(item.tglMulai, 'dd-MM-yyyy HH:mm');	
						item.tgl1Before = $filter('date')(item.tglMulaiBefore, 'dd-MM-yyyy HH:mm');
						item.tgl2 = $filter('date')(item.tglSelesai, 'dd-MM-yyyy HH:mm');	
						item.tgl2Before = $filter('date')(item.tglSelesaiBefore, 'dd-MM-yyyy HH:mm');
					}else if (item.nama == 'epb_labuh') {
						item.namaJasa = 'Labuh';
						item.tglPengajuan = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');
						item.tgl1 = $filter('date')(item.tglSelesai, 'dd-MM-yyyy HH:mm');	
						item.tgl1Before = $filter('date')(item.tglSelesaiBefore, 'dd-MM-yyyy HH:mm');
					}else if (item.nama == 'epb_tunda') {
						item.namaJasa = 'Tunda';
						item.dermaga1 = item.namaLokasiAsal+' ('+item.kodeLokasiAsal+')';
						item.dermaga1Before = item.namaLokasiAsalBefore+' ('+item.kodeLokasiAsalBefore+')';;
						item.dermaga2 = item.namaLokasiTujuan+' ('+item.kodeLokasiTujuan+')';
						item.dermaga2Before = item.namaLokasiTujuanBefore+' ('+item.kodeLokasiTujuanBefore+')';;
						item.tglPengajuan = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');
						item.tgl1 = $filter('date')(item.tglMulai, 'dd-MM-yyyy HH:mm');	
						item.tgl1Before = $filter('date')(item.tglMulaiBefore, 'dd-MM-yyyy HH:mm');	
					}else if (item.nama == 'epb_air_kapal') {
						item.namaJasa = 'Air Kapal';
						item.dermaga2 = item.namaDermaga+' ('+item.kodeDermaga+')';
						item.dermaga2Before = item.namaDermagaBefore+' ('+item.kodeDermagaBefore+')';
						item.tglPengajuan = $filter('date')(item.created, 'dd-MM-yyyy HH:mm');
						item.tgl1 = $filter('date')(item.tglIsi, 'dd-MM-yyyy HH:mm');		
						item.tgl1Before = $filter('date')(item.tglIsiBefore, 'dd-MM-yyyy HH:mm');	
					}
				});
			}

			/* eksekusi pembatalan tanpa denda : */
			var data = [];
			for (var m = 0; m<jasaPmh.length; m++ ){
				if(jasaPmh[m].statusRevisi===10){
					data = {
						noPpkJasa : jasaPmh[m].noPpkJasa,
						jenisRevisi : jasaPmh[m].statusRevisi,
						nama : jasaPmh[m].nama,
						tglBatal : jasaPmh[m].lastUpdated,
						created : jasaPmh[m].lastUpdated,
					}
				}
				revData.push(data);
			}


			/* menampilkan revisi jasa */
			for (var l = 0; l<revData.length; l++ ){
				var elNoPpkJasa = angular.element(document.getElementsByClassName('.jasa-' + revData[l].noPpkJasa));
				var elJasaPmh = angular.element(document.getElementsByClassName('.col-jasapmh-batal-' + revData[l].noPpkJasa));
				var elJasaPtp = angular.element(document.getElementsByClassName('.col-jasaptp-batal-' + revData[l].noPpkJasa));
				var documentResult = document.getElementsByClassName('.col-jasaptp-batal-' + revData[l].noPpkJasa);
				$('.jasa-' + revData[l].noPpkJasa).removeClass("line-through");
				$('.col-jasapmh-batal-' + revData[l].noPpkJasa).removeClass("col-jasa-batal");
				$('.col-jasaptp-batal-' + revData[l].noPpkJasa).removeClass("col-jasa-batal");
				elNoPpkJasa.removeClass("line-through");
				elJasaPmh.removeClass("col-jasa-batal");
				elJasaPtp.removeClass("col-jasa-batal");
				if(revData[l].jenisRevisi===6){
					revData[l].showRevisi = true;
					revData[l].jenisRevisiText='Perpanjangan';
				}
				else if(revData[l].jenisRevisi===7){
					revData[l].showRevisi = true;
					revData[l].jenisRevisiText='Perpendekan';
				}
				else if(revData[l].jenisRevisi===8){
					revData[l].showRevisi = true;
					revData[l].jenisRevisiText='Perubahan';
				}
				else if (revData[l].jenisRevisi === 9 || (revData[l].jenisRevisi === 10 && revData[l].isVisible !== true) ){

					// Handle By Jquery :
					$('.jasa-' + revData[l].noPpkJasa).addClass("line-through");
					$('.col-jasapmh-batal-' + revData[l].noPpkJasa).addClass("col-jasa-batal");
					$('.col-jasaptp-batal-' + revData[l].noPpkJasa).addClass("col-jasa-batal");
					
					// Hendle By Angular Jquery :
					elNoPpkJasa.addClass("line-through");
					elJasaPmh.addClass("col-jasa-batal");
					elJasaPtp.addClass("col-jasa-batal");
					revData[l].showRevisi = true;
					revData[l].jenisRevisiText = 'Pembatalan';
				}
				else if (revData[l].jenisRevisi === 10 && revData[l].isVisible===true){
					// Handle By Jquery :
					$('.jasa-' + revData[l].noPpkJasa).removeClass("line-through");
					$('.col-jasaptp-batal-' + revData[l].noPpkJasa).addClass("col-jasa-batal");
					$('.col-jasapmh-batal-' + revData[l].noPpkJasa).removeClass("col-jasa-batal");
					
					// // Hendle By Angular Jquery :
					elNoPpkJasa.removeClass("line-through");
					elJasaPtp.addClass("col-jasa-batal");
					elJasaPmh.removeClass("col-jasa-batal");
					revData[l].showRevisi = true;
					revData[l].jenisRevisiText='Batal Sandar';
				}
			}
	  	})
	}

	var getDataEPB = function(dataDetail){
		var ppkVar = dataDetail.urutanPermohonan.toString().length;
		dataDetail.ppkVar = ppkVar===1?dataDetail.noPpk1+0+dataDetail.urutanPermohonan:dataDetail.noPpk1+dataDetail.urutanPermohonan;
		PermohonanGetEPB.get({
			noPpk1 : dataDetail.noPpk1,
			ppkVar : dataDetail.ppkVar
		},function(response){
			if(response.length>0){
				dataDetail.dataEPB = response;
			}else{
				dataDetail.dataEPB = [];
			}
		});	
	}

	$scope.$on('clickDetailPermohonan', function(event, ppk1,urutanPermohonan,detail) {
	    $scope.getMonitoringDetail(ppk1,urutanPermohonan,detail.jasa);
	    getDataEPB(detail);
	});

	var setSortedBy = function(item1, item2) {
		var compValue = 0;
		if ($scope.sortConfig.currentField.id === 'id') {
			compValue = item1.id - item2.id;
		} else if ($scope.sortConfig.currentField.id === 'kodeKapal') {
			compValue = item1.kodeKapal.localeCompare(item2.kodeKapal);
		} else if ($scope.sortConfig.currentField.id === 'namaKapal') {
			compValue = item1.namaKapal.localeCompare(item2.namaKapal);
		} else if ($scope.sortConfig.currentField.id === 'noPpk1') {
			compValue = item1.noPpk1.localeCompare(item2.noPpk1);
		} else if ($scope.sortConfig.currentField.id === 'idVisit') {
			compValue = item1.idVisit - item2.idVisit;
		} else if ($scope.sortConfig.currentField.id === 'statusNota') {
			compValue = item1.statusNota - item2.statusNota;
		}
	};

	var sortChange = function (sortId, isAscending) {
		$scope.items.sort(setSortedBy);
		$scope.isSortedBy = true;
		$scope.pageChanged(0);
	};

	$scope.sortConfig = {
		fields:[
			{
				id:'id',
				title:'Tgl. Permohonan',
				sortType:'numeric'
			},
			{
				id:'kodeKapal',
				title:'Kode Kapal',
				sortType:'alpha'
			},
			{
				id:'namaKapal',
				title:'Nama Kapal',
				sortType:'alpha'
			},
			{
				id:'idVisit',
				title:'ID Visit',
				sortType:'numeric'
			},
			{
				id:'noPpk1',
				title:'No. PPK1',
				sortType:'numeric'
			},
			{
				id:'statusNota',
				title:'Status Nota',
				sortType:'numeric'
			}
		],
		onSortChange:sortChange,
		isAscending:$scope.sortAscending
	};

	//function set pagination
	$scope.pageChanged = function(newPage){
		$scope.isLoadingCircle = 1;
		if($scope.isSortedBy){
			$scope.sortBy = $scope.sortConfig.currentField!==undefined?$scope.sortConfig.currentField.id:'lastUpdated';
			$scope.sortDesc = $scope.sortConfig.isAscending?'asc':'desc';
		}else{
			$scope.sortBy = '';
			$scope.sortDesc = 'desc';
		}
		$scope.btnResetSearch = false;
		$scope.contentSearch = false;
		var selectionSearch = $scope.selectionSearch;
		var selectionValue = '';
		var filterItem = {
			page:newPage-1,
			sort : $scope.sortBy?($scope.sortBy + ',' + $scope.sortDesc): 'lastUpdated,desc'
		}
		if($routeParams.ppk1){
			filterItem['noPpk1'] = $routeParams.ppk1;
			filterItem['size'] = 10;
			$scope.contentSearch = true;
		}else if($routeParams.idVisit){
			filterItem['idVisit'] = $routeParams.idVisit;
			filterItem['size'] = 10;
			$scope.contentSearch = true;
		}else if($routeParams.namaKapal){
			filterItem['namaKapal'] = $routeParams.namaKapal.replace(/%20/g, " ");
			filterItem['size'] = 10;
			filterItem['sort'] = $scope.sortBy?($scope.sortBy + ',' + $scope.sortDesc): 'lastUpdated,desc';
			$scope.contentSearch = true;
		}else if($scope.searchText){ 
			filterItem[selectionSearch.id] = $scope.searchText;
			filterItem['size'] = 10;
			$scope.btnResetSearch = true;
			$scope.contentSearch = true;
		}else{
			filterItem['size'] = 10; //kondisi default get data
		}
		PermohonanList.get(filterItem,function(response){
			if(response.content){
				$scope.isLoadingCircle = 0;
				$scope.currentPage = response.number+1;
				$scope.pageSize = response.size;
				$scope.totalItems = response.totalElements;
				$scope.totalPages = response.totalPages;
				$scope.items = response.content;
				var items = response.content;
				$scope.informasiLengthItem = response.content.length;
				if(items.length===0){
					$scope.searchTextItem = $scope.searchText;
					$scope.searchSelectedResponse = $scope.selectionSearch.title;
					if($routeParams.namaKapal){
						$scope.searchTextItem = $routeParams.namaKapal.replace(/%20/g, " ");
						$scope.searchSelectedResponse = "Nama Kapal ";
					}else if($routeParams.ppk1 || $routeParams.idVisit){
						$scope.searchTextItem = $routeParams.idVisit?$routeParams.idVisit:$routeParams.ppk1;
						$scope.searchSelectedResponse = "Data ";
					}
				}else{
					$scope.searchTextItem = '';
				}
			    for (var i = 0; i<items.length; i++ ){
			    	items[i].imoNo = items[i].imoNo?items[i].imoNo:'-'
			    	items[i].mmsi = items[i].mmsi?items[i].mmsi:'-'
			    	items[i].callSign = items[i].callSign?items[i].callSign:'-'
			    	items[i].lengthStringAsalTujuan = items[i].namaPelabuhanAsal.length+items[i].namaPelabuhanTujuan.length;
			     	items[i].userRole = $scope.userRole;
			     	var itemsDetails = items[i].details;
			     	// kondisi info icon kapal pada list monitoring : 
			      	items[i].showButtonDisabledPranota = true;
			      	items[i].isExistDetailPermohonan = false;
					
					if(items[i].statusNota===9){
						items[i].statusNotaText = "BATAL NOTA";
					}else if(items[i].statusNota===1){
						items[i].statusNotaText = "NOTA";
					}else{
						items[i].statusNotaText = "BELUM NOTA";
					}

					var countDetailJasa = 0;
			      	for (var j = 0; j<itemsDetails.length; j++ ){
						var 
							linkAction, linkInfo,
							dtlHasAirKapal = itemsDetails[j].hasAirKapal,
							dtlStatus = itemsDetails[j].status;

			      		if(dtlStatus==='N'){
			      			linkAction = "#/transaksi/listPermohonan/";	
			      			linkInfo = "Ke Daftar Permohonan";
			      			if(dtlHasAirKapal) linkAction = "#/airkapal/permohonan/";
			      		}else if(dtlStatus==='D' || dtlStatus==='P'){
			      			linkAction = "#/transaksi/listPenetapan/";
			      			linkInfo = "Ke Daftar Penetapan";
			      			if(dtlHasAirKapal) linkAction = "#/airkapal/penetapan/";
			      		}else if(dtlStatus==='R' || dtlStatus==='T' || dtlStatus==='C'){
			      			linkAction = "#/transaksi/listRealisasi/";	
			      			linkInfo = "Ke Daftar Realisasi";
			      			if(dtlHasAirKapal)linkAction = "#/airkapal/realisasi/";
			      		}

			      		itemsDetails[j].linkAction = linkAction+itemsDetails[j].noPpk1+'/'+itemsDetails[j].urutanPermohonan;	
			      		itemsDetails[j].linkInfo = linkInfo;	

			      		if(itemsDetails[j].status==='R' || itemsDetails[j].status==='T'){
			      			items[i].showButtonDisabledPranota = false;	
			      			// break;
			      		}
						itemsDetails[j].noPpkText = itemsDetails[j].urutanPermohonan===1?'PPK1':'Tambah Jasa';
						if(itemsDetails[j].valutaEpb==='IDR'){
							itemsDetails[j].currency = 'Rp ';
						}else{
							itemsDetails[j].currency = '$ ';
						}
						//Untuk set nama jasa :
						var itemsDetailJasa = itemsDetails[j].jasa;
						var namaJenisJasa = '';
						var tempNilaiEpb=0;
						var tempDetailNilaiEpb=0;
						/* end Untuk seting warna kapal */
						if(items[i].asalData==='V' && items[i].statusPelaksanaan===4){
							items[i].infoTooltipKapal = "Kapal Kegiatan Tetap";
							items[i].classIconKapal = "";
						}else if(items[i].asalData==='A'){
							if(itemsDetailJasa.length===0){
								items[i].infoTooltipKapal = "Anjungan";
								items[i].classIconKapal = "border-gray";
								items[i].isExistDetailPermohonan = true;
							}else{
								items[i].infoTooltipKapal = "Anjungan";
								items[i].classIconKapal = "border-orange ";
								items[i].isExistDetailPermohonan = false;
								countDetailJasa=countDetailJasa+1;
							}
						}else{
							if(itemsDetailJasa.length===0){ 
								if(itemsDetails[j-1]){
									if(itemsDetails[j-1].jasa.length > 0){
										items[i].isExistDetailPermohonan = false;
									}else{
										items[i].classIconKapal = "border-gray";
										items[i].isExistDetailPermohonan = true;
									}		
								}else{
									items[i].classIconKapal = "border-gray";
									items[i].isExistDetailPermohonan = true;
								}					
							}else{
								items[i].infoTooltipKapal = "";
								items[i].classIconKapal = "";
								items[i].isExistDetailPermohonan = false;
								countDetailJasa=countDetailJasa+1;
							}
						}
						if(items[i].asalData==='A' && countDetailJasa>0){
							items[i].classIconKapal = "border-orange ";
						}else if(items[i].asalData==='S' && countDetailJasa>0){
							items[i].classIconKapal = "border-violet";
							items[i].infoTooltipKapal = "SIUK";
						}else if(items[i].asalData==='V' && countDetailJasa>0){
							items[i].classIconKapal = "";
						}
						/* end Untuk seting warna kapal */

						for (var k = 0; k<itemsDetailJasa.length; k++ ){
							if(itemsDetailJasa[k].nama === 'epb_labuh'){namaJenisJasa = 'Labuh';}
							else if(itemsDetailJasa[k].nama === 'epb_tambat'){namaJenisJasa = 'Tambat';}
							else if(itemsDetailJasa[k].nama === 'epb_pandu'){
								namaJenisJasa = 'Pandu';
								itemsDetailJasa[k].jenisGerakanText = $scope.setJenisGerakan(itemsDetailJasa[k].jenisGerakan);
							}
							else if(itemsDetailJasa[k].nama === 'epb_tunda'){namaJenisJasa = 'Tunda';}
							else{namaJenisJasa = 'Air Kapal';}
							itemsDetailJasa[k].namaText = namaJenisJasa;
						}
					}
				}
			}
		});
		LoadingScreen.hide();
	};
	$scope.pageChanged();

	$scope.resetSearch = function () {
		$scope.searchText ='';
		$scope.btnResetSearch = false;
		$scope.loadingResetSearch = true;
  		$scope.pageChanged(0);
    };

    $scope.$on('getInfoKegiatanKapal', function(event, item, dataKapal) {
		$scope.infoKegiatanKapal = {};
		InformasiKegiatanKapal.get({
			noPpk1 : item.noPpk1,
			noPpkJasa : item.noPpkJasa
		},function(response){
			if(response.length){
				var today = $filter('date')($scope.today, 'dd-MM-yyyy');
				var endWork = $filter('date')(response[0].endWork, 'dd-MM-yyyy');
				if(today < endWork){
					response[0].endWorkText = "MASIH BERKEGIATAN";
				} else {
					response[0].endWorkText = endWork;
				}
				response[0].ewtHari = response[0].ewtHari+" Hari";
				response[0].endWork = $filter('date')($scope.today, 'dd-MM-yyyy');
				response[0].startWork = $filter('date')(response[0].startWork, 'dd-MM-yyyy');
				response[0].namaKapalText = response[0].namaKapal+' ('+response[0].kodeKapal+') ';
				response[0].targetTsd = response[0].targetTsd?formatCurr(response[0].targetTsd):' - ';
				response[0].jmlPlan = response[0].jmlPlan?formatCurr(response[0].jmlPlan):' - ';
				response[0].jmlProd = response[0].jmlProd?formatCurr(response[0].jmlProd):' - ';
				response[0].balance = response[0].balance?formatCurr(response[0].balance):' - ';
				response[0].realHari = response[0].realHari?formatCurr(response[0].realHari):' - ';
				response[0].realJam = response[0].realJam?formatCurr(response[0].realJam):' - ';
				$scope.infoKegiatanKapal = response[0];
			}
			$scope.infoKegiatanKapal.namaKapalText = dataKapal.permohonan.namaKapal+' ('+dataKapal.permohonan.kodeKapal+') ';
			$('#infoKegiatanKapal').modal('show');
		});
	});

    $scope.$watch('searchText', function(newValue, oldVal){
    	if(newValue!==undefined){
			if(newValue.length === 0){
				$scope.btnResetSearch = false;
			} else {
				$scope.btnResetSearch = true;
			}
    	}
    });
	
	$scope.close = function(){
		if($routeParams.namaKapal){
			$location.path(locationPath);		
		}else{
			$window.history.back();
		}
	}

	$scope.reCalculateEPB = function() { /*untuk perhitungan permohonan edit*/
		var noPpk1 = $(".epb-input-noPpk1").val();
		var urutanPermohonan = $(".epb-input-urutanPermohonan").val();
		PermohonanRecalculateEPB.update({
			noPpk1			 : noPpk1,
			urutanPermohonan : urutanPermohonan
		},{},function(response){
			$scope.pageChanged(0);
		});
	}

	$scope.getSpbInaportnet = function (noPpk1) {
		SpbInaportnet.get({noPpk1:noPpk1}, function (response) {
			if( response[0] != undefined){
				$scope.noSpbInaportnet = response[0].nomorSpb;
			}
		});	
	}

	$scope.getTglBatal = function (noPpk1) {
		TanggalBatal.get({ppk1:noPpk1}, function (response) {
			if( response[0] != undefined){
				$scope.newResponse = '';
				for (var i = 0; i < 10; i++) {
					$scope.newResponse = $scope.newResponse+response[i];	
				}
			}
		});	
	}

	$scope.$on('showModalPemakaianBbmTunda', function (event, item){
		PemakaianBbmTunda.get({
			noPpkJasa : item.noPpkJasa,
			noRegistrasi : item.kodeKapalTunda
		}, function(response){
			$scope.infoPemakaianBbmTunda = response.bbmTunda;
		});
		$('#modalInfoPemakaianBbmTunda').modal('show');
	});


	$scope.$on('showModalInfoOtherPMH', function(event, item) {
		$scope.infoOthersPMH = [];
		$scope.getSpbInaportnet(item.noPpk1);
		$scope.getTglBatal(item.noPpk1);
		if(item.jenisKapal == "KPLTONKANG"){
			SearchKapalGandengByNoPpk1Tongkang.get({noPpk1Tongkang : item.noPpk1},
				function(responseKplGandeng){
				PermohonanList.get({
					noPpk1 : responseKplGandeng.content[0].noPpk1
				},function(responsePMHByPpk1TB){
					if(item.noPkk){
						var noPkk = item.noPkk.indexOf("PKK");
						if(noPkk== -1)item.noPkk = '-';
					}else{
						item.noPkk = '-';
					}

					if(responseKplGandeng.content.length>0){
						item.itemGandeng = responseKplGandeng.content[0];	
						item.itemPMHKapalTB = responsePMHByPpk1TB.content[0];	
					}
					$scope.infoOthersPMH.push(item);
					$scope.infoOthersPMH = $scope.infoOthersPMH[0];
				});
			});
		}else{
			if(item.noPkk){
				var noPkk = item.noPkk.indexOf("PKK");
				if(noPkk== -1)item.noPkk = '-';
			}else{
				item.noPkk = '-';
			}
			$scope.infoOthersPMH.push(item);
			$scope.infoOthersPMH = $scope.infoOthersPMH[0];
		}
		$('#modalInfoOtherPMH').modal('show');
	});



	$scope.$on('changeClassChevron', function(event, item) {
		var chevronRight = $('#chevronList'+item.noPpk1+item.urutanPermohonan).hasClass("fa-chevron-right");
		if(chevronRight){
			$('#chevronList'+item.noPpk1+item.urutanPermohonan).removeClass('fa-chevron-right').addClass('fa-chevron-down');
		}else{
			$('#chevronList'+item.noPpk1+item.urutanPermohonan).removeClass('fa-chevron-down').addClass('fa-chevron-right');
		}
	});

	$scope.$on('getDataJasa', function(event, dataJasa) {
		var tempJasa = [];
		var pastTambat = [];
		var pastPandu = [];
		MonitoringDetail.get({
			ppk1 	: dataJasa.noPpk1,
			urutan 	: dataJasa.urutanPermohonan
		},
		function(response){
			response.detailPmh.jasa.forEach(function(item) {
				tempJasa.push(item);
			});

			tempJasa.forEach(function(jasa) {
		        // Get Detail Penetapan
		        var detailPtp = response.detailPmh.ptpJasa.find(function(ptpJasa) {
					return ptpJasa.noPpkJasa == jasa.noPpkJasa;
		        });
		        jasa.ptpJasa = detailPtp;
		        // Get Detail Realisasi
		        var detailRea = response.detailPmh.reaJasa.find(function(reaJasa) {
					return reaJasa.noPpkJasa == jasa.noPpkJasa;
		        });
		        jasa.reaJasa = detailRea;
		    });

		    //start - Untuk set data grid dari status detail jasa terupdate :
			tempJasa.forEach(function(jasa){
				switch (jasa.nama) {
					case "epb_pandu":
						if(jasa.reaJasa){
							pastPandu.push(jasa.reaJasa);
						}else if(jasa.ptpJasa) {
							pastPandu.push(jasa.ptpJasa);
						}else{
							pastPandu.push(jasa);
						}
					break;
					case "epb_tambat":
						if(jasa.reaJasa){
							pastTambat.push(jasa.reaJasa);
						}else if(jasa.ptpJasa) {
							pastTambat.push(jasa.ptpJasa);
						}else{
							pastTambat.push(jasa);
						}
					break;
				}
			});
			//end - Untuk set data grid dari status detail jasa terupdate :
			
			var info = '';
			if(pastPandu.length>0){
				info += 'Pandu: ';
				pastPandu.forEach(function(item){
					info += '<br>' +item.kodeLokasiAsal+' &#8594 '+item.kodeLokasiTujuan;
				});
			}
			if(pastTambat.length>0){
				if(pastPandu.length>0 && pastTambat.length>0){
					info += '<br>';
					info += '<br>';
				}
				info += 'Tambat: ';
				pastTambat.forEach(function(item){
					info += '<br>' +item.kodeLokasi;
				});
			}
			dataJasa.dataToolTipJasa = info;
		});
    });

}]);