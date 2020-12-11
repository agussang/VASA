'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanCtrl
 * @description
 * # PerencanaanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaanCtrl',['$scope','$rootScope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','$window','Notification','LoadingScreen','$modal','PerencanaanNew','ListKapalRekomendasi','SharedVariable','MdmDermagaSearchByKode','MdmDermagaPerJasa','ListKapalTerminalLain','ClusterGetAll','ListKapalCluster','PerencanaanSave','PenetapanSave','PenetapanUpdate','KapalPrioritas','KademeterList','AddClusteringKapal','KapalTlList','KapalTlListByDermaga','DeleteKapalPrameeting','PindahDermaga','PrameetingSave','PerencanaanGet','PersiapanPrameetingGet','SembunyikanKapal', 'PenetapanTambatByPpkJasa','PenetapanTambatEdit','HasilMeetingRevisi','InformasiKegiatanKapal','HistoryRevisiTambat','JenisRevisiTambat','PermohonanTambatDetail','StatusEPBPermohonan','HasilMeetingList','MonitoringRPKRO','PushToMeetingOnline','PermohonanMultiDetail','PermohonanTambat','PenetapanTambat','RealisasiTambatEdit','ConfirmedPenetapan','KapalGeserAdd','ParamsCabangList','KapalGeserGet','$http','API_PATH','UpdateHasilMeeting','SearchKapalGandengByNoPpk1Tongkang','PermohonanList','MeetingHistory','DeleteKapalHasilMeeting','HistoryKapalAntrian',
  	function ($scope,$rootScope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,$window,Notification,LoadingScreen,$modal,PerencanaanNew,ListKapalRekomendasi,SharedVariable,MdmDermagaSearchByKode,MdmDermagaPerJasa,ListKapalTerminalLain,ClusterGetAll,ListKapalCluster,PerencanaanSave,PenetapanSave,PenetapanUpdate,KapalPrioritas,KademeterList,AddClusteringKapal,KapalTlList,KapalTlListByDermaga,DeleteKapalPrameeting,PindahDermaga,PrameetingSave,PerencanaanGet,PersiapanPrameetingGet,SembunyikanKapal,PenetapanTambatByPpkJasa,PenetapanTambatEdit,HasilMeetingRevisi,InformasiKegiatanKapal,HistoryRevisiTambat,JenisRevisiTambat,PermohonanTambatDetail,StatusEPBPermohonan,HasilMeetingList,MonitoringRPKRO,PushToMeetingOnline,PermohonanMultiDetail,PermohonanTambat,PenetapanTambat,RealisasiTambatEdit,ConfirmedPenetapan,KapalGeserAdd,ParamsCabangList,KapalGeserGet,$http,API_PATH,UpdateHasilMeeting,SearchKapalGandengByNoPpk1Tongkang,PermohonanList,MeetingHistory, DeleteKapalHasilMeeting,HistoryKapalAntrian) {
	LoadingScreen.show();
	var canvas;
	var urlKapalkanan = '../images/container-kanan.png';
	var urlKapalkiri = '../images/container-kiri.png';
	var kdDermaga = $routeParams.kodeDermaga;
	var tglParams =  $routeParams.tgl;
	var skala = null;
	var dateToday = new Date();
	$scope.tglPrameeting = $filter('date')(tglParams, 'dd-MM-yyyy');
	$scope.disableButtonSave = false;
	$scope.dataKapal  = {};
	$scope.postKapal = {};
	$scope.dataGlobal = [];
	$scope.showEditKapal = false;
	$scope.showMoveKapal = false;
	$scope.showAction = true;
	$scope.hadapKapal  = [{value:'Kanan', name:'Kanan'},{value:'Kiri', name:'Kiri'}];
	$scope.tglMasuk = new Date(tglParams);
	$scope.tglSelesai = new Date();
	$scope.jamMasuk = moment().format('HH:mm');
	$scope.jamKeluar = moment().format('HH:mm');
	$scope.optionScale = [{name:'1:1', value:1},{name:'1:2',value:2},{name:'1:4',value:4}];
	$scope.updateScale = $scope.optionScale[0];
	$scope.isKanan = true;
	$scope.locationPath = 'meeting/report/'+kdDermaga+'/'+tglParams;
	$scope.tambahKapalNew = 'perencanaan/tambahkapal/'+kdDermaga+'/'+tglParams;
	var defGlobal = null;
	var dataKapalRekomendasi = null;
	var panjangDermaga = null;
	var kadeMeter = null;
	var canvasWidth = null;
	var kapalPerencanaan = [];
	$scope.kapalSandar = [];
	$scope.dataKapalRek = [];
	$scope.dataKapalnoCluster = [];
	$scope.dataInformasiKapal = null;
	$scope.informasiKapalSandar = null;
	$scope.updatePrameeting = [];
	$scope.options = {
		autoclose: true,
		todayBtn: 'linked',
		todayHighlight: true,
		orientation:'bottom'
	};
   	$scope.infoKapalSandarStatus = true
   	$scope.kodeKade = '-';
   	$scope.showAlertEdit = false;
   	$scope.statusEdit = true;
   	$scope.showLoading = false;
   	$scope.showLoadingData = false;
   	$scope.showLoadingSave = false;
   	$scope.message = '';
   	$scope.showSuccess = false;
   	$scope.showLoadingTos = false;
   	$scope.historyTambat = [];
   	$scope.allowBack = false;
   	$scope.historyptp = [];
   	$scope.dataKapalRev = [];
   	$scope.dataKapalPtp = []
   	$scope.statusInfo = true;
   	$scope.kapalPengganti = [];
   	var checkunique = [];
   	$scope.showDuplicate = false;
   	$scope.kodeKade = '+';
   	$scope.jasatambatbaru = {}; 
   	$scope.showMessageTime = false;
   	$scope.statusPreview = false;
   	$scope.kapalPenggantiView = [];
   	$scope.historyrea = [];
   	$scope.statusRevisiRea = false;
	$scope.statusInfo = true;
	$scope.ubahTgl = true;
	$scope.statusPerpanjangan = false;
	$scope.btnClassRpkro = 'btn-success';
	$scope.alasanGeser = 1;
	$scope.statusLain = false;
	$scope.showLoad = false;

	PerencanaanNew.get({kdDermaga:kdDermaga},function(response){
		var scale = 1;

		if(response.panjangDermaga >= 0 && response.panjangDermaga <= 69){
			scale  = 20;
		}else if(response.panjangDermaga >= 70 && response.panjangDermaga <= 120){
			scale = 10;
		}else if(response.panjangDermaga >= 121 && response.panjangDermaga <= 200){
			scale  = 5;
		}else if(response.panjangDermaga >= 201 && response.panjangDermaga <= 380){
			scale = 4;
		}else if(response.panjangDermaga >= 381 && response.panjangDermaga <= 750){
			scale = 2
		}else{
			scale = 1;
		} 

		panjangDermaga = response.panjangDermaga;
		kadeMeter = response.panjangDermaga;
		canvasWidth = response.panjangDermaga*scale;
	
		skala = scale;
		defGlobal = response;
		$scope.informationDermaga = response;
	});
	//resize canvas
	$scope.getMaxTingkatan = function() {
	  var maxTingkatan = 1;
	  for (var i = 0; i < $scope.dataKapalRek.length; i++) {
		maxTingkatan = maxTingkatan > $scope.dataKapalRek[i].tingkatan ? maxTingkatan : $scope.dataKapalRek[i].tingkatan;
	  }
	  return maxTingkatan;
	};

	$scope.getHeightOffset = function() {
		var maxTingkatan = $scope.getMaxTingkatan();
		return maxTingkatan > 3 ? ((maxTingkatan - 3) * 60) : 0;
	};

	var checkunique = [];
	//get kapal yg pny histori
	$scope.getKapalRevisi = function(x){
		HistoryRevisiTambat.get({noPpkJasa: x.noPpkJasa}, function(response){
			if(response.length > 0){
				for (var i = 0; i < response.length; i++) {
					if(response[i].jenisRevisi == 8){
						if (checkunique.indexOf(x.noPpkJasa) === -1) {
							checkunique.push(x.noPpkJasa);
							$scope.dataKapalRev.push(x);
						}					
					}
				}
			}		
		});
	}	

	//get rekomendasi kapal
	ListKapalRekomendasi.get({kdDermaga:kdDermaga,tglPerencanaan:tglParams},function(response){
		//memisahkan kapal sandar
		if (response.length >0){

			$scope.dataKapal = response;
			if($scope.dataKapal[0].kodeError === "A007"){
				$scope.dataKapal.forEach(function(item){
					if (item.kodeError === "A007") {
					  $scope.dataKapalnoCluster.push(item);
					}
				});
				$scope.showAlert = true;
				$scope.showMessage = "Beberapa Kapal belum di set cluster";
				$('#updateKapalCluster').modal('show');
			}
			$scope.dataKapal.forEach(function(item){
				if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Realisasi') {
				  	$scope.kapalSandar.push(item);
				}
				if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan == 5) {
					$scope.kapalSandar.push(item);
				}
			});

			//memisahkan kapal perencanaan
			$scope.dataKapal.forEach(function(item){
				if (item.kapalSandar == false  && item.kodeError == null) {
				   $scope.dataKapalRek.push(item);
				}
				if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan != 5) {
				  	$scope.dataKapalRek.push(item);
				  	$scope.getKapalRevisi(item);
				  	$scope.dataKapalPtp.push(item);
				}
			});
		}

		/*menentukan tombol yg hidup*/
		$scope.dataKapalRek.forEach(function(item){
			if(item.meeting == true){
				$scope.disableButtonSave = true;              
			}
			if(item.isProsesMeeting == 0){
				$scope.disableButtonSave = false;
			}
			if(item.meeting == false && item.isProsesMeeting == 1){
				$scope.disableButtonSave = false; 
			}
			if(item.meeting == true && item.isProsesMeeting != 0){
				$scope.disableButtonSave = true;             
			}
			if(item.meeting == true && item.isProsesMeeting == 2){
				$scope.disableButtonSave = true; 
			}
			if(item.meeting == false && item.isProsesMeeting == 2 && item.meetingSusulan == true){
				$scope.ButtonSaveMeetingSusulan = true;
			}			
		});
   
		//update data kapal sandar
		//marvin comment
		// $scope.updateDatakapalSandar = function(){
		// 	var heightOffset = $scope.getHeightOffset();

		// 	for(var i=0;i<$scope.kapalSandar.length;i++){
		// 		var jenis = $scope.kapalSandar[i].jenisKapal;
		// 		var hadap = ($scope.kapalSandar[i].hadapKapal == null ? 'kanan' : $scope.kapalSandar[i].hadapKapal);
		// 	   //$scope.kapalSandar[i].url = '../images_unbuild/'+jenis+'.png';
		// 	   // $scope.kapalSandar[i].url = urlKapalkanan;
		// 	   var jenis = $scope.kapalSandar[i].jenisKapal;
		// 	   if($scope.kapalSandar[i].statusLineKapal === "Realisasi"){
		// 			$scope.kapalSandar[i].Top=330-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
		// 	   }else if($scope.kapalSandar[i].statusLineKapal === "Penetapan"){
		// 			$scope.kapalSandar[i].Top=270-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
		// 	   }
			   
		// 		// $scope.dataKapalRek[i].id = i+1;
		// 		var a = $scope.kapalSandar[i].panjangKapal;
		// 		$scope.kapalSandar[i].kadeAkhir = $scope.kapalSandar[i].kadeAwal + a; 
		// 		var b = $scope.kapalSandar[i].kadeAkhir;
		// 		var c = canvasWidth -b;
		// 		var pRight = c;
				
		// 		if($scope.kapalSandar[i].panjangKapal<100 && $scope.isKanan == true){
		// 			pRight = c-40;
		// 		}else if($scope.kapalSandar[i].panjangKapal<100 && $scope.isKanan == false){
		// 			pRight = c-150;
		// 		}
		// 		$scope.kapalSandar[i].labelFromRight = pRight;
		// 		$scope.kapalSandar[i].idKapalSandar = i+1;
		// 		if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){

		// 				if(hadap == 'kiri'){
		// 					 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
		// 				}else{
		// 					 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKR.png';
		// 				}   

		// 		}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/CONTAINERLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/CONTAINER.png';
		// 				}

		// 		}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KP.png';
		// 				}

		// 		}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBM.png';
		// 				}

		// 		}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGOLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGO.png';
		// 				}

		// 		}else if(jenis === 'KPLCRUISE'){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISELEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISE.png';
		// 				}

		// 		}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANG.png';
		// 				}

		// 		}else if(jenis === 'KPLRORO'){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLROROLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
		// 				}

		// 		}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

		// 				if(hadap == 'kiri'){
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
		// 				}else{
		// 					$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
		// 				}

		// 		}else{
					
		// 				if(hadap == 'kiri'){
		// 				   $scope.kapalSandar[i].url = '../images_unbuild/KPLEFT.png';
		// 				}else{
		// 				   $scope.kapalSandar[i].url = '../images_unbuild/KP.png';
		// 				}

		// 		}
		// 	}
		// }


				//update data kapal sandar
		$scope.updateDatakapalSandar = function(){
			//alert('kesni');
			var heightOffset = $scope.getHeightOffset();

			console.log($scope.kapalSandar);

			for(var i=0;i<$scope.kapalSandar.length;i++){
				var jenis = $scope.kapalSandar[i].jenisKapal;
				var hadap = ($scope.kapalSandar[i].hadapKapal == null ? 'kanan' : $scope.kapalSandar[i].hadapKapal);

				//alert(hadap);
			   //$scope.kapalSandar[i].url = '../images_unbuild/'+jenis+'.png';
			   // $scope.kapalSandar[i].url = urlKapalkanan;
			   var jenis = $scope.kapalSandar[i].jenisKapal;
			   if($scope.kapalSandar[i].statusLineKapal === "Realisasi"){
					$scope.kapalSandar[i].Top=330-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
			   }else if($scope.kapalSandar[i].statusLineKapal === "Penetapan"){
					$scope.kapalSandar[i].Top=270-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
			   }
			   
				// $scope.dataKapalRek[i].id = i+1;
				var a = $scope.kapalSandar[i].panjangKapal;
				$scope.kapalSandar[i].kadeAkhir = $scope.kapalSandar[i].kadeAwal + a; 
				var b = $scope.kapalSandar[i].kadeAkhir;
				var c = canvasWidth -b;
				var pRight = c;
				
				if($scope.kapalSandar[i].panjangKapal<100 && $scope.isKanan == true){
					pRight = c-40;
				}else if($scope.kapalSandar[i].panjangKapal<100 && $scope.isKanan == false){
					pRight = c-150;
				}
				$scope.kapalSandar[i].labelFromRight = pRight;
				$scope.kapalSandar[i].idKapalSandar = i+1;
				if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
						}else{
							 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKR.png';
						}   

				}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/CONTAINERLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/CONTAINER.png';
						}

				}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KP.png';
						}

				}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBM.png';
						}

				}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGOLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGO.png';
						}

				}else if(jenis === 'KPLCRUISE'){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISELEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISE.png';
						}

				}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANG.png';
						}

				}else if(jenis === 'KPLRORO'){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLROROLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else{
					
						if(hadap == 'kiri' || hadap == 'Kiri'){
						   $scope.kapalSandar[i].url = '../images_unbuild/KPLEFT.png';
						}else{
						   $scope.kapalSandar[i].url = '../images_unbuild/KP.png';
						}

				}
			}
		}
		//update id
		$scope.updateIdKapalRekomendasi = function(){
			for(var i=0;i<$scope.dataKapalRek.length;i++){
				//hilangkan kondisi bila kapal penetapan ingin diberikan action
				//if($scope.dataKapalRek[i].statusLineKapal != 'Penetapan'){
					$scope.dataKapalRek[i].id = i+1;
				//}							
			}
		}

	   //update perencanaanosisi kapal perencanaan
	   //marvin comment

	 //   $scope.updatePosisi =  function (){ 
		// 	for(var i=0;i<$scope.dataKapalRek.length;i++){
		// 		var a = $scope.dataKapalRek[i].panjangKapal;
		// 		var ax = parseInt(a.toFixed());
		// 		var b = ax;
		// 		var c = parseInt(b.toFixed());
		// 		var jenis = $scope.dataKapalRek[i].jenisKapal;
		// 		var hadap = $scope.dataKapalRek[i].hadapKapal;
		// 		$scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwal;
		// 		$scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + a;
				   
		// 		if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){

		// 				if(hadap == 'kiri'){
		// 					 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
		// 				}else{
		// 					 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKR.png';
		// 				}   

		// 		}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINERLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINER.png';
		// 				}

		// 		}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
		// 				}

		// 		}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBM.png';
		// 				}

		// 		}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGOLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGO.png';
		// 				}

		// 		}else if(jenis === 'KPLCRUISE'){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISELEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISE.png';
		// 				}

		// 		}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANG.png';
		// 				}

		// 		}else if(jenis === 'KPLRORO'){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLROROLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
		// 				}

		// 		}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

		// 				if(hadap == 'kiri'){
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
		// 				}else{
		// 					$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
		// 				}

		// 		}else{
					
		// 				if(hadap == 'kiri'){
		// 				   $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
		// 				}else{
		// 				   $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
		// 				}

		// 		}
				
		// 	}
		// }
//marvin

	   $scope.updatePosisi =  function (){ 

	   	//alert('sini');
			for(var i=0;i<$scope.dataKapalRek.length;i++){
				var a = $scope.dataKapalRek[i].panjangKapal;
				var ax = parseInt(a.toFixed());
				var b = ax;
				var c = parseInt(b.toFixed());
				var jenis = $scope.dataKapalRek[i].jenisKapal;
				var hadap = $scope.dataKapalRek[i].hadapKapal;
				$scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwal;
				$scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + a;
				   
				if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
						}else{
							 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKR.png';
						}   

				}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINERLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINER.png';
						}

				}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
						}

				}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBM.png';
						}

				}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGOLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGO.png';
						}

				}else if(jenis === 'KPLCRUISE'){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISELEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISE.png';
						}

				}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANG.png';
						}

				}else if(jenis === 'KPLRORO'){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLROROLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

						if(hadap == 'kiri' || hadap == 'Kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else{
					
						if(hadap == 'kiri' || hadap == 'Kiri'){
						   $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
						}else{
						   $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
						}

				}
				
			}
		}

		/*menentukan lewat icon (i)*/
		$scope.configScale = function(){
			for(var i=0;i<$scope.dataKapalRek.length;i++){
				var a = $scope.dataKapalRek[i].panjangKapal;
				var b = $scope.dataKapalRek[i].posisiAkhir;

				var c = canvasWidth - ($scope.dataKapalRek[i].posisiDepan*skala);

				var pRight =  c-($scope.dataKapalRek[i].panjangKapal*skala);
				
				if($scope.dataKapalRek[i].panjangKapal<50){
					pRight = c-40;
				}else if($scope.dataKapalRek[i].panjangKapal>50<100){
					pRight = c-70;
				}
				
				$scope.dataKapalRek[i].labelFromRight = pRight;			
				
			}
		}

		//update antrian
		$scope.updateAntrian = function(){
			$scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
			for(var i=0;i<$scope.dataKapalRek.length;i++){ 
				//membandingkan dengan data sebelumnya
				var maxAntrian=0;
				for(var j=0;j<i;j++){
					if(j != i){
						//kapal yg rekomendasi
						var kondisi11= ($scope.dataKapalRek[i].kadeAwal>=$scope.dataKapalRek[j].kadeAwal);
						var kondisi12= ($scope.dataKapalRek[i].kadeAwal<=$scope.dataKapalRek[j].kadeAkhir);                    
						var kondisi21= ($scope.dataKapalRek[i].kadeAkhir>=$scope.dataKapalRek[j].kadeAwal);
						var kondisi22= ($scope.dataKapalRek[i].kadeAkhir<=$scope.dataKapalRek[j].kadeAkhir);

						var kondisi31 = ($scope.dataKapalRek[j].kadeAwal >= $scope.dataKapalRek[i].kadeAwal);
						var kondisi32 = ($scope.dataKapalRek[j].kadeAwal <= $scope.dataKapalRek[i].kadeAkhir);
						var kondisi41 = ($scope.dataKapalRek[j].kadeAkhir >= $scope.dataKapalRek[i].kadeAwal);
						var kondisi42 = ($scope.dataKapalRek[j].kadeAkhir <= $scope.dataKapalRek[i].kadeAkhir);
						
						if( (kondisi11 && kondisi12) || (kondisi21 && kondisi22) || (kondisi31 && kondisi32) || (kondisi41 && kondisi42) ){
							if($scope.dataKapalRek[j].tingkatan > maxAntrian){
								maxAntrian=$scope.dataKapalRek[j].tingkatan;
							}
						}   						
					}              
				}

				/*tingkatan digunakan untuk gambar by tingkatan*/
				$scope.dataKapalRek[i].tingkatan=maxAntrian+1;				
			}
		}

		$scope.updateWaktuTambat = function(){
			for(var i=0; i<$scope.dataKapalRek.length; i++){
				for(var j=0; j<i; j++){
					var kondisi11= ($scope.dataKapalRek[i].kadeAwal>=$scope.dataKapalRek[j].kadeAwal);
					var kondisi12= ($scope.dataKapalRek[i].kadeAwal<=$scope.dataKapalRek[j].kadeAkhir);                    
					var kondisi21= ($scope.dataKapalRek[i].kadeAkhir>=$scope.dataKapalRek[j].kadeAwal);
					var kondisi22= ($scope.dataKapalRek[i].kadeAkhir<=$scope.dataKapalRek[j].kadeAkhir);
					
					if( (kondisi11 && kondisi12) || (kondisi21 && kondisi22) ){
						var parseTglMulaiKondisi1 = Date.parse($scope.dataKapalRek[i].mulai);
						var parseTglSelesaiKondisi1 = Date.parse($scope.dataKapalRek[i].selesai);
						var parseTglMulaiKondisi2 = Date.parse($scope.dataKapalRek[j].mulai);
						var parseTglSelesaiKondisi2 = Date.parse($scope.dataKapalRek[j].selesai);
						if(parseTglSelesaiKondisi2 >= parseTglMulaiKondisi1){
							var formatJamTanggalMulai = $filter('date')($scope.dataKapalRek[i].mulai,'yyyy-MM-dd HH:mm');
							var formatJamTanggalSelesai = $filter('date')($scope.dataKapalRek[i].selesai,'yyyy-MM-dd HH:mm');
							var selisihJam = moment.utc(moment(formatJamTanggalSelesai,"yyyy-MM-dd HH:mm").diff(moment(formatJamTanggalMulai,"yyyy-MM-dd HH:mm"))).format("HH:mm");
							var a = selisihJam.split(":");
							var diffHours = parseInt(a[0]);
							var diffMinutes = parseInt(a[1]);
							$scope.dataKapalRek[i].mulai = $scope.dataKapalRek[j].selesai;
							var convertWaktuMulai = $filter('date')($scope.dataKapalRek[i].mulai,'yyyy-MM-dd HH:mm');
							var dateAfterConvert = new Date(convertWaktuMulai);
							dateAfterConvert.setHours(dateAfterConvert.getHours() + diffHours);
							dateAfterConvert.setMinutes(dateAfterConvert.getMinutes() + diffMinutes);
							$scope.dataKapalRek[i].selesai = $filter('date')(dateAfterConvert,'yyyy-MM-ddTHH:mm');
							
						}
					}
				}
			}
		}

		//update top kapal perencanaan
		$scope.updateTop =  function (){
			var heightOffset = $scope.getHeightOffset();
			for(var i=0;i<$scope.dataKapalRek.length;i++){
				$scope.dataKapalRek[i].Top=250-($scope.dataKapalRek[i].tingkatan*60)+heightOffset;
			}
			for (var i = 0; i < $scope.kapalSandar.length; i++) {

				if ($scope.kapalSandar[i].statusLineKapal === "Realisasi") {
					$scope.kapalSandar[i].Top = 330 - ($scope.kapalSandar[i].tingkatan * 60) + heightOffset;
				} else if ($scope.kapalSandar[i].statusLineKapal === "Penetapan") {
					$scope.kapalSandar[i].Top = 270 - ($scope.kapalSandar[i].tingkatan * 60) + heightOffset;
				}
			}
		}

		//update clustering
		$scope.updateClusteringId = function(){
			var clusteringId = null;
			for(var i=0;i<$scope.dataKapalRek.length;i++){
				if($scope.dataKapalRek[i].kadeAwal < $scope.dataKapalRek[i].kadeClusteringAwal || $scope.dataKapalRek[i].kadeAkhir > $scope.dataKapalRek[i].kadeClusteringAkhir ){

					var a = $scope.dataKapalRek[i].kadeAwal;
					var b = $scope.dataKapalRek[i].kadeAkhir;
					var c = (a+b)/2;
					var d = defGlobal.clusteringDermagas;

					d.forEach(function(data) {
						if(c < data.kadeAkhir+1 && c > data.kadeAwal ){
							// $scope.dataKapalRek[i].kadeAwal = data.
							clusteringId = data.clusteringId;
						}
					});
					$scope.dataKapalRek[i].clusteringId = clusteringId;
				}
			}
		}

		if(response.length > 0){
			$scope.updateDatakapalSandar();
			$scope.updateIdKapalRekomendasi();
			$scope.updatePosisi();
			$scope.configScale();
			$scope.updateAntrian();
			$scope.updateWaktuTambat();
			$scope.updateTop();
			// $scope.updateClusteringId(); 
		}

		dataKapalRekomendasi = $scope.dataKapalRek;

		//add kapal dari TL
		$scope.addKapal = function(){
			var idKapalTl = $scope.postKapal.id,
				dermagaLength=defGlobal.panjangDermaga;
			var kapalTopost = {};

			$scope.postKapal.direct = 0;
			var a = $scope.postKapal.panjangKapal;
			var b = a;
			if($scope.postKapal.direct == 1){
				var c = $scope.postKapal.posisiDepan - a;
			}else{
				var c = $scope.postKapal.posisiDepan;
			};
			
			var cPost = parseInt(c.toFixed());
			var d = $scope.postKapal.panjangKapal+$scope.postKapal.posisiDepan;
			var dPost = parseInt(d.toFixed());
			var e = c+a;
			var ePost = parseInt(e.toFixed());
			var tglMulai = $filter('date')($scope.postKapal.tglMasuk, 'yyyy-MM-dd');
			var jamMulai = $scope.jamMasuk;
			var tglSelesai = $filter('date')($scope.postKapal.tglSelesai, 'yyyy-MM-dd');
			var jamSelesai = $scope.jamKeluar;
			kapalTopost.tglMasuk = $scope.postKapal.tglMasuk;
			kapalTopost.tglSelesai = $scope.postKapal.tglSelesai;
			if(typeof $scope.postKapal.tglMasuk === 'object'){
				if($scope.postKapal.tglMasuk.toString().indexOf('-') === -1){
					$scope.postKapal.waktuMulai = $filter('date')($scope.postKapal.tglMasuk,'yyyy-MM-dd')+'T'+jamMulai;
				}
			}else{
				var formatTglMulai = $scope.postKapal.tglMasuk.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.postKapal.waktuMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMulai;
			}

			if(typeof $scope.postKapal.tglSelesai === 'object'){
				if($scope.postKapal.tglSelesai.toString().indexOf('-') === -1){
					$scope.postKapal.waktuSelesai = $filter('date')($scope.postKapal.tglSelesai,'yyyy-MM-dd')+'T'+jamSelesai;
				}
			}else{
				var formatTglMulai = $scope.postKapal.tglSelesai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				$scope.postKapal.waktuSelesai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamSelesai;
			}
			kapalTopost.kodeKapal = $scope.postKapal.kodeKapal;
			kapalTopost.jenisKapal = $scope.postKapal.jenisKapal;
			kapalTopost.kadeAwalKeseluruhan = cPost + 1 ;
			kapalTopost.kadeAwal = cPost;
			kapalTopost.kadeAkhir = ePost;
			kapalTopost.kadeAkhirKeseluruhan = ePost;
			kapalTopost.panjangKapal = $scope.postKapal.panjangKapal;
			kapalTopost.noPpk1 = $scope.postKapal.noPpk1;
			kapalTopost.noPpkJasa = $scope.postKapal.noPpkJasa;
			
			kapalTopost.namaKapal = $scope.postKapal.namaKapal;
			kapalTopost.hadapKapal = $scope.postKapal.hadap;
			kapalTopost.jamMasuk = $scope.jamMasuk;
			kapalTopost.jamKeluar = $scope.jamKeluar;
			kapalTopost.mulai = $scope.postKapal.waktuMulai;
			kapalTopost.selesai = $scope.postKapal.waktuSelesai;
			
			var clusterKade = ((kapalTopost.kadeAkhir - kapalTopost.kadeAwal)/2) + kapalTopost.kadeAwal; 
			$scope.clusterKademeter.forEach(function(x){ 
				if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){ 
					kapalTopost.kadeClusteringAwal = x.kadeAwal;
					kapalTopost.kadeClusteringAkhir = x.kadeAkhir;			
					kapalTopost.clusteringId = x.clusteringId;
				}
			});

			kapalTopost.kapalSandar = $scope.postKapal.kapalSandar;
			kapalTopost.tl = $scope.postKapal.tl;
			kapalTopost.permohonanMulai = null;
			kapalTopost.permohonanSelesai = null;
			kapalTopost.kapalSandar = false;
			kapalTopost.isMeetingSusulan = $scope.postKapal.isMeetingSusulan;
			var parseTglMulai = Date.parse(kapalTopost.mulai);
			var parseTglSelesai = Date.parse(kapalTopost.selesai);
			var hadap = kapalTopost.hadapKapal;
			var jenis = kapalTopost.jenisKapal;

			if(parseTglMulai > parseTglSelesai){
				$scope.showAlert = true;
				$scope.showMessage = "Waktu Selesai harus lebih dari Waktu Mulai";
				$scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
				$scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
				return false;
			}

			PersiapanPrameetingGet.get({noPpkJasa : $scope.postKapal.noPpkJasa},function(res){
				if(res.content.length > 0){
					if(res.content[0].isPrameeting == false){
						$scope.dataKapalRek.push(kapalTopost);

						if(kapalTopost.tl !== true){
							$scope.kapalTerminalLain.splice(idKapalTl,1);
							 $('#tambahKapalModal').modal('hide');
						}else if(kapalTopost.tl == true){
							var kapalToAdd = {};
							kapalToAdd.clusteringId =  kapalTopost.clusteringId;
							kapalToAdd.kodeKapal = $scope.postKapal.kodeKapal;
							kapalToAdd.kodeDermaga = kdDermaga;
							kapalToAdd.isPrameeting = 1;
							kapalToAdd.noPpk1 = $scope.postKapal.noPpk1;
							kapalToAdd.noPpkJasa = $scope.postKapal.noPpkJasa;
							kapalToAdd.tglPrameeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
							
							PrameetingSave.save(kapalToAdd,function(response){
							    /* Push to Meeting Online */
							    response.namaDermaga = $scope.informationDermaga.namaDermaga;
							    response.tl = true;
								PushToMeetingOnline.setMessage('tambahKapalTLPerencanaan',response);
								/* --- */
							});
							$scope.updateKapalRek(kapalTopost);
							$scope.KapalTl.splice(idKapalTl,1);
							 $('#tambahKapalTlModal').modal('hide');
						}

						
						$scope.showAlert = false;
						$scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
						$scope.updateIdKapalRekomendasi();
						$scope.updatePosisi();
						$scope.configScale();
						$scope.updateAntrian();
						$scope.updateWaktuTambat();
						$scope.updateTop();
						// $scope.updateClusteringId();
						$scope.refreshCanvas(); 
						$scope.draw();
					}else{
						$('#tambahKapalTlModal').modal('hide');						
					   $scope.setNotification  = {
							type    : "warning", //ex : danger, warning, success, info
							message : "Kapal "+$scope.postKapal.namaKapal+' telah digunakan.<br> Silakan Pilih kapal lainnya.'
						};
						Notification.setNotification($scope.setNotification);
						$scope.KapalTl.splice(idKapalTl,1);
					}
				}else{
					console.log('tidak ada data');
				}
			});
		}

		/*get data untuk diedit*/
		$scope.indexSelected=0;
		$scope.editKapal = function(data){
			$scope.selectedVessel = null;
			$scope.showAlert = false;
			$scope.showLoadingData = true;
			var modalTrue = true;
			var id = data.id; 
			var dataEdit = $scope.dataKapalRek;
			var dataByRek = {};	
			$scope.showAction = true;
			$scope.showEditKapal = false;
			$scope.showMoveKapal = false;
			$scope.showGeserKapal = false;
			//get data dari data rekomendasi yg sdh diambil pertama kali untuk ditampilkan di form
			for (var i = 0; i < dataEdit.length; i++) {
				if(dataEdit[i].id == id){
					$scope.postKapal = dataEdit[i];
					dataByRek = dataEdit[i];
					$scope.postKapal.imgId = dataEdit[i].id;
					$scope.postKapal.tglMasuk = $filter('date')(dataEdit[i].mulai, 'dd-MM-yyyy');
					$scope.postKapal.tglSelesai = $filter('date')(dataEdit[i].selesai, 'dd-MM-yyyy');
					$scope.tglMulaiPermohonan = $filter('date')(dataEdit[i].permohonanMulai, 'dd-MM-yyyy');
					$scope.tglSelesaiPermohonan = $filter('date')(dataEdit[i].permohonanSelesai, 'dd-MM-yyyy');
					$scope.jamMulaiPermohonan = $filter('date')(dataEdit[i].permohonanMulai, 'HH:mm');
					$scope.jamSelesaiPermohonan = $filter('date')(dataEdit[i].permohonanSelesai, 'HH:mm');
					$scope.postKapal.jamMasuk = $filter('date')(dataEdit[i].mulai, 'HH:mm');
					$scope.postKapal.jamKeluar = $filter('date')(dataEdit[i].selesai, 'HH:mm');
					$scope.postKapal.hadapKapal = ($scope.postKapal.hadapKapal == null ? $scope.informationDermaga.hadapDermaga : $scope.postKapal.hadapKapal);
					$scope.postKapal.pmhKapalGandengs = dataByRek.pmhKapalGandengs;
					$scope.postKapal.flagTender = ($scope.postKapal.flagTender == null ? 0 : $scope.postKapal.flagTender );
					if($scope.postKapal.kapalSandar == false){
						$scope.forkapalSandar = false;
						$scope.forkapalRekomendasi = true;
					}else{
						$scope.forkapalSandar = true;
						$scope.forkapalRekomendasi = false;
					}
					
					SearchKapalGandengByNoPpk1Tongkang.get({noPpk1Tongkang : $scope.postKapal.noPpk1},function(responseKplGandeng){
						if(responseKplGandeng.totalElements != 0){
							PermohonanList.get({
								noPpk1 : responseKplGandeng.content[0].noPpk1
							},function(responsePMHByPpk1TB){
								if(responseKplGandeng.content.length>0){
									$scope.postKapal.infoTB = responsePMHByPpk1TB.content[0];
								}
							})
						}
					});
				}			
			}
				
			//Check data sdh pernah diedit, untuk ditampilkan pada form
			PerencanaanGet.get({noPpkJasa:$scope.postKapal.noPpkJasa}, function(res){ 
				if(res.content.length > 0){ 
					$scope.showLoadingData = false;
					$scope.postKapal = res.content[0];
					$scope.postKapal.imgId = id;
					$scope.postKapal.tglMasuk = $filter('date')(res.content[0].mulai, 'dd-MM-yyyy');
					$scope.postKapal.tglSelesai = $filter('date')(res.content[0].selesai, 'dd-MM-yyyy');
					$scope.tglMulaiPermohonan = $filter('date')(res.content[0].permohonanMulai, 'dd-MM-yyyy');
					$scope.tglSelesaiPermohonan = $filter('date')(res.content[0].permohonanSelesai, 'dd-MM-yyyy');
					$scope.jamMulaiPermohonan = $filter('date')(res.content[0].permohonanMulai, 'HH:mm');
					$scope.jamSelesaiPermohonan = $filter('date')(res.content[0].permohonanSelesai, 'HH:mm');
					$scope.postKapal.jamMasuk = $filter('date')(res.content[0].mulai, 'HH:mm');
					$scope.postKapal.jamKeluar = $filter('date')(res.content[0].selesai, 'HH:mm');
					$scope.postKapal.kapalSandar = dataByRek.kapalSandar
					$scope.postKapal.hadapKapal = ($scope.postKapal.hadapKapal == null ? $scope.informationDermaga.hadapDermaga : $scope.postKapal.hadapKapal);
					$scope.postKapal.pmhKapalGandengs = $scope.postKapal.pmhKapalGandengs;

					for (var i = 0; i < $scope.dataKapal.length; i++) {
						if($scope.postKapal.kodeKapalTender == $scope.dataKapal[i].kodeKapal){
							$scope.selectedVessel = $scope.dataKapal[i];
						}
					}
					
					SearchKapalGandengByNoPpk1Tongkang.get({noPpk1Tongkang : $scope.postKapal.noPpk1},function(responseKplGandeng){
						if(responseKplGandeng.totalElements != 0){
							PermohonanList.get({
								noPpk1 : responseKplGandeng.content[0].noPpk1
							},function(responsePMHByPpk1TB){
								if(responseKplGandeng.content.length>0){
									$scope.postKapal.infoTB = responsePMHByPpk1TB.content[0];
								}
							})
						}
					});
					if($scope.postKapal.kapalSandar == false){
						$scope.forkapalSandar = false;
						$scope.forkapalRekomendasi = true;
					}else{
						$scope.forkapalSandar = true;
						$scope.forkapalRekomendasi = false;
					}
				}else{
					$scope.showLoadingData = false;
				}
			});

			if(modalTrue){
				$scope.allowBack =  false;
				$('#editKapalModal ').modal('show');
			}
		}

		/*fungsi simpan setelah edit kapal*/
		$scope.updateKapalRek = function(data){ 
			$scope.showLoading= true;
			var kapalUpdate = {};
			var id = $scope.postKapal.id; 
			var dermagaLength = defGlobal.panjangDermaga;
				   
			if(data.kadeAwalKeseluruhan >= dermagaLength){
				$scope.showAlert = true;
				$scope.showMessage = "Kademeter Melebihi Panjang Dermaga";
				$scope.postKapal.tglMasuk = data.tglMasuk;
				$scope.postKapal.tglSelesai = data.tglSelesai;
				return false;
			}
			
			var a = data.panjangKapal;
			var b = a;
			if(data.direct == 1){
				var c = data.kadeAwalKeseluruhan - a;
			}else{
				var c = data.kadeAwalKeseluruhan;
			};
			var cPost = parseInt(c.toFixed());  
			var d = c+a;
			var dPost = parseInt(d.toFixed());
			var e = c+a;
			var ePost = parseInt(e.toFixed());
			var tglMasuk = $filter('date')(data.tglMasuk, 'yyyy-MM-dd');
			var tglSelesai = $filter('date')(data.tglSelesai, 'yyyy-MM-dd');
			var staticTglMulai = $filter('date')(data.mulai, 'yyyy-MM-dd');
			var jamMasuk = data.jamMasuk;
			var jamKeluar = data.jamKeluar;
			var waktuMulai = staticTglMulai+'T'+jamMasuk;
			var waktuSelesai = tglSelesai+'T'+jamKeluar;
			if(typeof data.tglMasuk === 'object'){
				if(data.tglMasuk.toString().indexOf('-') === -1){
					kapalUpdate.waktuMulai = $filter('date')(data.tglMasuk,'yyyy-MM-dd')+'T'+jamMasuk;
				}
			}else{
				var formatTglMulai = data.tglMasuk.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				kapalUpdate.waktuMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMasuk;
			}
			if(typeof data.tglSelesai === 'object'){
				if(data.tglSelesai.toString().indexOf('-') === -1){
					kapalUpdate.waktuSelesai = $filter('date')(data.tglSelesai,'yyyy-MM-dd')+'T'+jamKeluar;
				}
			}else{
				var formatTglMulai = data.tglSelesai.split('-');
				var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
				kapalUpdate.waktuSelesai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamKeluar;
			}

			kapalUpdate.kadeAkhir = parseInt((data.kadeAwal + a).toFixed());
			kapalUpdate.kadeAkhirKeseluruhan = kapalUpdate.kadeAkhir;
			kapalUpdate.mulai = kapalUpdate.waktuMulai;
			kapalUpdate.isPrameeting = 1;
			kapalUpdate.selesai = kapalUpdate.waktuSelesai;    
			if($scope.selectedVessel){
				kapalUpdate.kodeKapalTender = $scope.selectedVessel.kodeKapal;
				kapalUpdate.kodeKapalTenderText = $scope.selectedVessel.namaKapal;
				kapalUpdate.noPpkJasaTender = $scope.selectedVessel.noPpkJasa;
			}
			
			if(data.direct == 1){ 
				kapalUpdate.kadeAwalKeseluruhan = cPost ;
				kapalUpdate.kadeAwal = cPost;
			}else{ 
				kapalUpdate.kadeAwalKeseluruhan = data.kadeAwal + 1;
				kapalUpdate.kadeAwal = data.kadeAwal;
			};

			var clusterKade = ((kapalUpdate.kadeAkhir - kapalUpdate.kadeAwal)/2) + kapalUpdate.kadeAwal; 
			$scope.clusterKademeter.forEach(function(x){ 
				if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
					kapalUpdate.kadeClusteringAwal = x.kadeAwal;
					kapalUpdate.kadeClusteringAkhir = x.kadeAkhir;			
					kapalUpdate.clusteringId = x.clusteringId;
				}
			});

			var parseTglMulai = Date.parse(kapalUpdate.mulai);
			var parseTglSelesai = Date.parse(kapalUpdate.selesai);
			if(parseTglMulai > parseTglSelesai){
	            var selisih = parseInt(parseTglMulai)-parseInt(parseTglSelesai);
			}else if(parseTglSelesai > parseTglMulai){
	            var selisih = parseInt(parseTglSelesai)-parseInt(parseTglMulai);
	        }
			if(parseTglMulai >= parseTglSelesai){
				$scope.showAlert = true;
				$scope.showMessage = "Waktu Selesai harus melebihi Waktu Mulai";
				$scope.showLoading= false;
				return false;
			}
			if(selisih < 3600000 || selisih == 3600000){
				$scope.showAlert = true;
				$scope.showMessage = "Waktu Selesai harus melebihi Waktu Mulai , Minimal 2 jam setelah waktu mulai.";
				$scope.showLoading= false;
				return false;
			}
			if(data.kadeAwal >= $scope.informationDermaga.panjangDermaga-10){
				$scope.showAlert = true;
				$scope.showMessage = "Kade Awal harus kurang dari Panjang Dermaga, Panjang Dermaga : "+$scope.informationDermaga.panjangDermaga+' m';
				$scope.showLoading= false;
				return false;
			}
			
			kapalUpdate.panjangKapal = data.panjangKapal;
			kapalUpdate.noPpk1 = data.noPpk1;
			kapalUpdate.noPpkJasa = data.noPpkJasa;
			// if($scope.ButtonSaveMeetingSusulan == true){
			// 	kapalUpdate.isMeetingSusulan = true;
			// }else{
			// 	kapalUpdate.isMeetingSusulan = data.meetingSusulan; 
			// }  
			kapalUpdate.isMeetingSusulan = data.meetingSusulan;   
			kapalUpdate.kodeKapal = data.kodeKapal;
			kapalUpdate.namaKapal = data.namaKapal;
			kapalUpdate.kodeDermaga = kdDermaga;
			kapalUpdate.tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
			kapalUpdate.arahKapal = data.hadapKapal;
			kapalUpdate.flagTender = data.flagTender;
			if (data.flagTender == 1) {
				kapalUpdate.flagTender = true;
			} else {
				kapalUpdate.flagTender = false;
				kapalUpdate.kodeKapalTender = '';
				kapalUpdate.kodeKapalTenderText = '';
				kapalUpdate.noPpkJasaTender = '';
			}
			kapalUpdate.pmhKapalGandengs = data.pmhKapalGandengs; 

                //marvin revisi hadap kiri kanan
			PerencanaanSave.save(kapalUpdate,function(response){ 
				if(response.id){
					$scope.showAlert = false;    
					$('#editKapalModal').modal('hide');  


					var dataEdit = $scope.dataKapalRek;

					console.log($scope.dataKapalRek);
					
					for (var i = 0; i < $scope.dataKapalRek.length; i++) {
						if($scope.dataKapalRek[i].id == data.imgId){ 

							//
							kapalUpdate.kapalSandar = $scope.dataKapalRek[i].kapalSandar;						
							$scope.dataKapalRek[i] = kapalUpdate;
							$scope.dataKapalRek[i].id = data.imgId;


							$scope.refreshCanvas();
                       // alert($scope.dataKapalRek[i].arahKapal);
							
							//$scope.updatePosisi();

							//marvin 



					        var a = $scope.dataKapalRek[i].panjangKapal;
					        var ax = parseInt(a.toFixed());
					        var b = ax;
					        var c = parseInt(b.toFixed());
					        var jenis = $scope.dataKapalRek[i].jenisKapal;
					        var hadap = $scope.dataKapalRek[i].arahKapal;
					        $scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwal;
					        $scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + a;

					                   
					        if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKR.png';
					            }   
					        }else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){
					             if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/CONTAINERLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/CONTAINER.png';
					            }
					        }else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
					            }
					        }else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBM.png';
					            }
					        }else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGOLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGO.png';
					            }
					        }else if(jenis === 'KPLCRUISE'){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISELEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISE.png';
					            }
					        }else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANG.png';
					            }
					        }else if(jenis === 'KPLRORO'){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLROROLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
					            }
					        }else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){
					            if(hadap == 'kiri' || hadap == 'Kiri'){
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
					            }
					        }else{                    



					        //alert(hadap);
					       // alert(jenis);
					            if(hadap == 'kiri' || hadap == 'Kiri'){

					            	//alert('joss');
					                $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
					            }else{
					                $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
					            }


									//alert($scope.dataKapalRek[i].url);

					        }                



							//marvinnn




							$scope.configScale();
							$scope.updateAntrian();
							$scope.updateWaktuTambat();
							$scope.updateTop();
							$scope.draw();							
						}
					}

					$scope.showLoading = false;
					$scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
					$scope.showEditKapal = false;
					$scope.showAction = true;
					$scope.disableButtonSave = false; 
					$scope.setNotification  = {
						type    : "success", //ex : danger, warning, success, info
						message : "Berhasil Edit Data."
					};
					Notification.setNotification($scope.setNotification);

					/* Push to MeeetingOnline*/
					response.namaDermaga = $scope.informationDermaga.namaDermaga;
					PushToMeetingOnline.setMessage('editKapalPerencanaan',response,$scope.postKapal);
					/* --- */
				}
			});
		}

			//marvin comment
			
		// 	PerencanaanSave.save(kapalUpdate,function(response){ 
		// 		if(response.id){
		// 			$scope.showAlert = false;    
		// 			$('#editKapalModal').modal('hide');  
		// 			var dataEdit = $scope.dataKapalRek;
		// 			for (var i = 0; i < $scope.dataKapalRek.length; i++) {
		// 				if($scope.dataKapalRek[i].id == data.imgId){ 
		// 					kapalUpdate.kapalSandar = $scope.dataKapalRek[i].kapalSandar;						
		// 					$scope.dataKapalRek[i] = kapalUpdate;
		// 					$scope.dataKapalRek[i].id = data.imgId;
		// 					$scope.refreshCanvas();
		// 					$scope.updatePosisi();
		// 					$scope.configScale();
		// 					$scope.updateAntrian();
		// 					$scope.updateWaktuTambat();
		// 					$scope.updateTop();
		// 					$scope.draw();							
		// 				}
		// 			}
		// 			$scope.showLoading = false;
		// 			$scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
		// 			$scope.showEditKapal = false;
		// 			$scope.showAction = true;
		// 			$scope.disableButtonSave = false; 
		// 			$scope.setNotification  = {
		// 				type    : "success", //ex : danger, warning, success, info
		// 				message : "Berhasil Edit Data."
		// 			};
		// 			Notification.setNotification($scope.setNotification);

		// 			/* Push to MeeetingOnline*/
		// 			response.namaDermaga = $scope.informationDermaga.namaDermaga;
		// 			PushToMeetingOnline.setMessage('editKapalPerencanaan',response,$scope.postKapal);
		// 			/* --- */
		// 		}
		// 	});
		// }


		$scope.pushUpdateKapalSandar = function(){
			$scope.kapalUpdate = {};
			var id = $scope.postKapal.id, 
				dermagaLength=defGlobal.panjangDermaga;
				var dataEdit = $scope.kapalSandar;
			for (var i = 0; i < dataEdit.length; i++) {
				if(dataEdit[i].id == id){
				   
					$scope.kapalUpdate = dataEdit[i];
					var a = $scope.postKapal.panjangKapal;
					if($scope.postKapal.direct == 1){
						var c = ($scope.postKapal.kadeAwal ) - a;
					}else{
						var c = $scope.postKapal.kadeAwal;
					};
					
					var cPost = parseInt(c.toFixed());
					var d = c+a;
					var dPost = parseInt(d.toFixed());
					var e = c+a;
					var ePost = parseInt(e.toFixed());
					$scope.kapalUpdate.id = id;
					$scope.kapalUpdate.kadeAwal = cPost;
					$scope.kapalUpdate.kadeAkhir = dPost;
					$scope.kapalUpdate.kadeAkhirKeseluruhan = ePost;
				   
					if($scope.postKapal.direct == 1){
						 $scope.kapalUpdate.kadeAwalKeseluruhan = cPost ;
					}else{
						 $scope.kapalUpdate.kadeAwalKeseluruhan = $scope.postKapal.kadeAwalKeseluruhan;
					};
					
					var updateKapal = $scope.kapalUpdate;
					
					dataEdit[i] = updateKapal;
					$scope.showAlert = false;
					
					$('#editKapalModal').modal('hide');  
				}
			}
			$scope.refreshCanvas();
			$scope.updateDatakapalSandar();
			$scope.draw();
		}

		var canvas = new fabric.Canvas('canvas',{width: 3000, height: 500, selection: false});
		var canvasPrint = new fabric.Canvas('canvas-print',{width: 3000, height: 500, selection: false});

		canvas.observe('mouse:down', function(){ });
		
		$timeout(function() {		
			LoadingScreen.hide();
			$scope.dataKapalRek = dataKapalRekomendasi;
			$scope.draw();		
		}, 3000);
	
	$scope.draw = function(){
		var isKanan = $scope.isKanan;
		 var heightOffset = $scope.getHeightOffset();
		//build canvas
		canvas.setHeight(500 + heightOffset);
		canvasPrint.setHeight(500 + heightOffset);
		canvas.on("object:selected", function (options, event) {

			var object = options.target; //This is the object 

			$scope.editKapal(object);
			$scope.$apply();
		});
		//end canvas

		//build kademeter
		var line = new fabric.Line([0, 400+heightOffset, (kadeMeter*skala)+30, 400+heightOffset], {
			stroke: 'red'
		});
		canvas.add(line);
		canvasPrint.add(line);
		
		
		if(isKanan == true){
			var i = canvasWidth;
			var j = 0;
			while(i > 0 || i == 0){
				i = i-30;
				j= j+30;
				
				var circle = new fabric.Circle({
					radius: 2, fill: 'green', left: j, top: 400+heightOffset
				});
				canvas.add(circle);
				canvasPrint.add(circle); 
				var textKademeter = i/skala;
				var text = new fabric.Text(''+textKademeter, { left: j-5, top: 410+heightOffset, fontSize: 10 });
				canvas.add(text);
				canvasPrint.add(text);
			}
		}else if(isKanan == false){ 
			var i=0;
			while(i<canvasWidth){
				i=i+30;
				
				var circle = new fabric.Circle({
					radius: 2, fill: 'green', left: i, top: 400+heightOffset
				});
				canvas.add(circle);
				canvasPrint.add(circle);
				var textKademeter = i/skala;
				var text = new fabric.Text(''+textKademeter, { left: i-5, top: 410+heightOffset, fontSize: 10 });
				canvas.add(text);
				canvasPrint.add(text);
			}
		}
		
		/*if(isKanan == true){			
			var i =canvasWidth; console.log(i);
			var j = 0;
			while(i>0){

				i=i-100;
				j=j+100;
				if(i < 0){
					break;
				}
				var circle = new fabric.Circle({
					radius: 2, fill: 'green', left: j, top: 400+heightOffset
				});
				canvas.add(circle);
				canvasPrint.add(circle);
				var textKademeter = i/skala;console.log(textKademeter);
				var text = new fabric.Text(''+textKademeter, { left: j-5, top: 410+heightOffset, fontSize: 10 });
				canvas.add(text);
				canvasPrint.add(text);
			}
		}else if(isKanan == false){
			var i=0;
			while(i<canvasWidth){
				i=i+100;
				
				var circle = new fabric.Circle({
					radius: 2, fill: 'green', left: i, top: 400+heightOffset
				});
				canvas.add(circle);
				canvasPrint.add(circle);
				var textKademeter = i/skala;
				var text = new fabric.Text(''+textKademeter, { left: i-5, top: 410+heightOffset, fontSize: 10 });
				canvas.add(text);
				canvasPrint.add(text);
			}
		}*/
		//end kademeter

		//cluster
		if(isKanan == true){
			for(var i=0; i<defGlobal.clusteringDermagas.length; i++){
				var bClustering = defGlobal.clusteringDermagas[i];
				//config
				var cWidth = (bClustering.kadeAkhir-bClustering.kadeAwal)*skala;
				var cLeft = canvasWidth-(bClustering.kadeAkhir*skala);
				var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:265+heightOffset, opacity:0.5});
				canvas.add(cluster);
				canvasPrint.add(cluster);
			}
		}else if(isKanan == false){
			for(var i=0; i<defGlobal.clusteringDermagas.length; i++){
				var bClustering = defGlobal.clusteringDermagas[i];
				//config
				var cWidth = (bClustering.kadeAkhir-bClustering.kadeAwal)*skala;
				var cLeft = bClustering.kadeAwal*skala;
				var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:265+heightOffset, opacity:0.5});
				canvas.add(cluster);
				canvasPrint.add(cluster);
			}

		}
		//kedalaman
		if(isKanan == true){
			for(var i=0; i<defGlobal.kedalamans.length; i++){
				var bKedalaman = defGlobal.kedalamans[i];
				var bWarna = defGlobal.kedalamans[i].warna;
				//config
				var cWidth = (bKedalaman.kadeAkhir-bKedalaman.kadeAwal)*skala;
				var cLeft = canvasWidth-(bKedalaman.kadeAkhir*skala);
				var cRight1 = ((bKedalaman.kadeAkhir-bKedalaman.kadeAwal)*skala)/2;
				var cRight = cLeft + cRight1;
				var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430+heightOffset, opacity:0.5});
				canvas.add(kedalaman);
				canvasPrint.add(kedalaman);
				var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435+heightOffset, fontSize: 10 });
				canvas.add(textkedalaman);
				canvasPrint.add(textkedalaman);
			}

		}else if(isKanan == false){
			for(var i=0; i<defGlobal.kedalamans.length; i++){
				var bKedalaman = defGlobal.kedalamans[i];
				var bWarna = defGlobal.kedalamans[i].warna;
				//config
				var cWidth = (bKedalaman.kadeAkhir-bKedalaman.kadeAwal)*skala;
				var cLeft = bKedalaman.kadeAwal*skala;
				var cRight1 = ((bKedalaman.kadeAkhir-bKedalaman.kadeAwal)*skala)/2;
				var cRight = cLeft + cRight1;
				var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430+heightOffset, opacity:0.5});
				canvas.add(kedalaman);
				canvasPrint.add(kedalaman);
				var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435+heightOffset, fontSize: 10 });
				canvas.add(textkedalaman);
				canvasPrint.add(textkedalaman);
			}
		}
		
		$scope.refreshDataKapal = function(){
		  	var heightOffset = $scope.getHeightOffset();
			if($scope.kapalSandar.length > 0){
				for(var i=0; i<$scope.kapalSandar.length; i++){
					var objRef = $scope.kapalSandar[i];
					var namaKapal = objRef.namaKapal;
					var pLeft = canvasWidth - (objRef.kadeAwal*skala);
					var topR = 350 -(objRef.tingkatan * 60)+heightOffset;
					var topP = 280 -(objRef.tingkatan * 60)+heightOffset;
					var url = objRef.url;
					if(objRef.flagTender == 1){
						var captionTender = "\n (Tender";
						if(objRef.kodeKapalTenderText != null){
							captionTender += ' '+objRef.kodeKapalTenderText;
						}
						captionTender += ')';
					}else{
						var captionTender = "";
					}
					var statusGeser = '';
					if(objRef.statusPelaksanaan == 5){
						statusGeser = '\n Geser'
					}

					if(isKanan == true){
						if(objRef.statusLineKapal === "Realisasi"){							
							fabric.Image.fromURL(url, function(img) {
								canvas.add(img).renderAll();
								canvasPrint.add(img).renderAll();
							}, {
							id: objRef.id,
							left: pLeft-(objRef.panjangKapal*skala),
							top: topR-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal+captionTender,{ 
								left: pLeft-objRef.panjangKapal,
								top: topR+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvas.add(captionKapal);
						}else if(objRef.statusLineKapal === "Penetapan"){
							// console.log(canvasWidth);
							fabric.Image.fromURL(url, function(img) {
							canvas.add(img).renderAll();
							}, {
							id: objRef.id,
							left: pLeft-objRef.panjangKapal,
							top: topP-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal + statusGeser,{ 
								left: pLeft-objRef.panjangKapal,
								top: topP+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvas.add(captionKapal);
						}				
					}else if(isKanan == false){
						 if(objRef.statusLineKapal === "Realisasi"){
							fabric.Image.fromURL(url, function(img) {
								canvas.add(img).renderAll();
								canvasPrint.add(img).renderAll();
							}, {
							id: objRef.id,
							left: objRef.kadeAwal*skala,
							top: topR-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal+captionTender,{ 
								left: objRef.kadeAwal*skala,
								top: topR+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvas.add(captionKapal);
						 }else if(objRef.statusLineKapal === "Penetapan"){
							fabric.Image.fromURL(url, function(img) {
							canvas.add(img).renderAll();
							}, {
							id: objRef.id,
							left: objRef.kadeAwal*skala,
							top: topP-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal+statusGeser,{ 
								left: objRef.kadeAwal*skala,
								top: topP+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvas.add(captionKapal);
						}					
					}					
				}	 
			}
			
			//draw kapal perencanaan
			if($scope.dataKapalRek.length > 0){ 
				for(var i=0; i<$scope.dataKapalRek.length; i++){
					var objRef = $scope.dataKapalRek[i];
					var namaKapal = objRef.namaKapal;
					var pLeft = canvasWidth - (objRef.posisiDepan*skala);
					if(objRef.meetingSusulan == true || objRef.isMeetingSusulan == true){
						var captionMeetingSusulan = "\n meeting susulan";
					}else{
						var captionMeetingSusulan = "";
					}

					if(objRef.flagTender == 1){
						var captionTender = "\n (Tender";
						if(objRef.kodeKapalTenderText != null){
							captionTender += ' '+objRef.kodeKapalTenderText;
						}
						captionTender += ')';
					}else{
						var captionTender = "";
					}

					if(objRef.pmhKapalGandengs != null){
						var captionGandeng = " (Gandeng";
						objRef.pmhKapalGandengs.forEach(function (itemGndng) {
							captionGandeng += ' '+ itemGndng.namaKapal;
						})
						captionGandeng += ')';
					}else{
						var captionGandeng = "";
					}

					if(objRef.statusLineKapal == 'Penetapan'){
						var captionPtp = "\n Penetapan";
						var selectable = false;
					}else{
						var captionPtp = "";
						var selectable = true;
					}
					var top = 270 -(objRef.tingkatan * 60)+heightOffset;
					var url = objRef.url;
					
					if(isKanan == true){ 
						fabric.Image.fromURL(url, function(img) {
							canvas.add(img).renderAll();
							canvasPrint.add(img).renderAll();
						}, {
						id: objRef.id,
						left: pLeft-(objRef.panjangKapal*skala),
						top: top-10,
						width : objRef.panjangKapal*skala,
						opacity:0.5,
						height : 40,
						lockMovementX : true,
						lockMovementY : true,
						lockScalingX : true,
						lockScalingY : true,
						lockRotation: true,
						selectable : selectable 
						});
						
						var captionKapal = new fabric.Text(namaKapal+captionTender+captionMeetingSusulan+captionPtp+captionGandeng,{ 
							left: pLeft-(objRef.panjangKapal*skala),
							top: top+30, 
							fontSize: 10,
							width: objRef.panjangKapal,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							selectable : selectable 

						});
						canvas.add(captionKapal);
					}else if(isKanan == false){						
						fabric.Image.fromURL(url, function(img) {
							canvas.add(img).renderAll();
							canvasPrint.add(img).renderAll();
						}, {
						id: objRef.id,
						left: objRef.posisiDepan*skala,
						top: top,
						width : objRef.panjangKapal*skala,
						opacity:0.5,
						height : 40,
						lockMovementX : true,
						lockMovementY : true,
						lockScalingX : true,
						lockScalingY : true,
						lockRotation: true,
						selectable : selectable 
						});
						var captionKapal = new fabric.Text(namaKapal+captionTender+captionMeetingSusulan+captionPtp+captionGandeng,{ 
							left: objRef.posisiDepan*skala,
							top: top+30, 
							fontSize: 10,
							width: objRef.panjangKapal,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							selectable : selectable 
						});
						canvas.add(captionKapal);
					}					
				}		   
			}			
		}

		$scope.refreshDataKapalToPrint = function(){
		  	var heightOffset = $scope.getHeightOffset();
			if($scope.kapalSandar.length > 0){
				for(var i=0; i<$scope.kapalSandar.length; i++){
					var objRef = $scope.kapalSandar[i];
					var namaKapal = objRef.namaKapal;
					var pLeft = canvasWidth - (objRef.kadeAwal*skala);
					var topR = 350 -(objRef.tingkatan * 60)+heightOffset;
					var topP = 280 -(objRef.tingkatan * 60)+heightOffset;
					var url = objRef.url;
					if(objRef.flagTender == 1){
						var captionTender = " (Tender)";
					}else{
						var captionTender = "";
					}
					
					if(isKanan == true){
						if(objRef.statusLineKapal === "Realisasi"){							
							fabric.Image.fromURL(url, function(img) {
								canvasPrint.add(img).renderAll();
							}, {
							id: objRef.id,
							left: pLeft-(objRef.panjangKapal*skala),
							top: topR-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal,{ 
								left: pLeft-objRef.panjangKapal,
								top: topR+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvasPrint.add(captionKapal);
						}	
					}else if(isKanan == false){
						 if(objRef.statusLineKapal === "Realisasi"){
							fabric.Image.fromURL(url, function(img) {
								canvasPrint.add(img).renderAll();
							}, {
							id: objRef.id,
							left: objRef.kadeAwal*skala,
							top: topR-5,
							width : objRef.panjangKapal*skala,
							opacity:0.5,
							height : 40,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							lockRotation: true,
							selectable : false

							});
							var captionKapal = new fabric.Text(namaKapal,{ 
								left: objRef.kadeAwal*skala,
								top: topR+35, 
								fontSize: 10,
								width: objRef.panjangKapal,
								lockMovementX : true,
								lockMovementY : true,
								lockScalingX : true,
								lockScalingY : true,
								selectable : false 

							});
							canvasPrint.add(captionKapal);
						}
					}					
				}	 
			}
			
			//draw kapal perencanaan
			if($scope.dataKapalRek.length > 0){ 
				for(var i=0; i<$scope.dataKapalRek.length; i++){
					var objRef = $scope.dataKapalRek[i];
					var namaKapal = objRef.namaKapal;
					var pLeft = canvasWidth - (objRef.posisiDepan*skala);
					if(objRef.meetingSusulan == true || objRef.isMeetingSusulan == true){
						var captionMeetingSusulan = "\n meeting susulan";
					}else{
						var captionMeetingSusulan = "";
					}

					if(objRef.flagTender == 1){
						var captionTender = " (Tender";
						if(objRef.kodeKapalTenderText != null){
							captionTender += ' '+objRef.kodeKapalTenderText;
						}
						captionTender += ')';
					}else{
						var captionTender = "";
					}

					if(objRef.statusLineKapal == 'Penetapan'){
						var captionPtp = "\n Penetapan";
						var selectable = false;
					}else{
						var captionPtp = "";
						var selectable = true;
					}
					var top = 270 -(objRef.tingkatan * 60)+heightOffset;
					var url = objRef.url;
					
					if(isKanan == true){ 
						fabric.Image.fromURL(url, function(img) {
							canvasPrint.add(img).renderAll();
						}, {
						id: objRef.id,
						left: pLeft-(objRef.panjangKapal*skala),
						top: top-10,
						width : objRef.panjangKapal*skala,
						opacity:0.5,
						height : 40,
						lockMovementX : true,
						lockMovementY : true,
						lockScalingX : true,
						lockScalingY : true,
						lockRotation: true,
						selectable : selectable 
						});
						
						var captionKapal = new fabric.Text(namaKapal,{ 
							left: pLeft-(objRef.panjangKapal*skala),
							top: top+35, 
							fontSize: 10,
							width: objRef.panjangKapal,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							selectable : selectable 

						});
						canvasPrint.add(captionKapal);
					}else if(isKanan == false){						
						fabric.Image.fromURL(url, function(img) {
							canvasPrint.add(img).renderAll();
						}, {
						id: objRef.id,
						left: objRef.posisiDepan*skala,
						top: top,
						width : objRef.panjangKapal*skala,
						opacity:0.5,
						height : 40,
						lockMovementX : true,
						lockMovementY : true,
						lockScalingX : true,
						lockScalingY : true,
						lockRotation: true,
						selectable : selectable 
						});
						var captionKapal = new fabric.Text(namaKapal,{ 
							left: objRef.posisiDepan*skala,
							top: top+35, 
							fontSize: 10,
							width: objRef.panjangKapal,
							lockMovementX : true,
							lockMovementY : true,
							lockScalingX : true,
							lockScalingY : true,
							selectable : selectable 
						});
						canvasPrint.add(captionKapal);
					}					
				}		   
			}			
		}
		canvas.forEachObject(function(o) {
			o.selectable = false;
		});
		$scope.refreshDataKapal(); 
		$scope.refreshDataKapalToPrint();  
		$scope.refreshCanvas = function(){ 
			canvas.clear();
			canvasPrint.clear();
		}
	}
	
		$scope.generateFileName = function(){
			var tglPr =  $scope.tglPrameeting;
			var title = 'RENCANA PENETAPAN TAMBATAN KAPAL DI DERMAGA PELABUHAN '+ $scope.namaCabang +'<br>';
			title += 'Dermaga : '+ $scope.informationDermaga.namaDermaga +'<br>';
			title += 'Tanggal : '+ tglPr;
			return title;
		}

		$scope.printKapal = function(){
			var heightOffset = $scope.getHeightOffset();
			var dateCreated = new Date();
			var dateCreatedPrint = $filter('date')(dateCreated, 'dd-MM-yyyy HH:mm:ss');
			var username = localStorage.getItem('username');
			$scope.cvs = document.getElementById('canvas-print');
			var w = 1300;
			var h = 500+heightOffset;
			var fileName = $scope.generateFileName();
			var footer = "Generated by "+username+ " on "+dateCreatedPrint+ " from VASA PELINDO III";
			var url = $scope.cvs.toDataURL();
			var title = $scope.generateFileName();
			var axx = Canvas2Image.convertToPNG($scope.cvs, w, h);
		   	var elements1 = document.getElementById('printKapal');
		   	var elements2 = document.getElementById('keterangan');
		   	var elements3 = document.getElementById('title-x');
			var myPrintCanvas = $window.open(''); 
			myPrintCanvas.document.write('<h5>' + title  + '</h5>');
			var img=myPrintCanvas.document.createElement("img"); 
			img.src=url;
			myPrintCanvas.document.body.appendChild(img);
			myPrintCanvas.document.body.appendChild(elements1);
			myPrintCanvas.document.body.appendChild(elements2);
			myPrintCanvas.document.write('<footer><i>' + footer  + '</i></footer>');
			img.onload = function(){ 
				myPrintCanvas.print();
			}; 	
		}

		$scope.downloadImagePrameeting = function(){
			var heightOffset = $scope.getHeightOffset();
			var w = 1300;
			var h = 500+heightOffset;
			var fileName = $scope.generateFileName();
			var url = $scope.cvs.toDataURL();
			 
			$("<a>", {	href: url,download: fileName })
			.on("click", function() {$(this).remove()})
			.appendTo("body")[0].click();
		}
	   

	},function(){
		   
			   LoadingScreen.hide();
			   $scope.setNotification  = {
					type    : "danger", //ex : danger, warning, success, info
					message : "Koneksi tidak terhubung..."
				};
				Notification.setNotification($scope.setNotification);
					
	   
	});//end kapal rekomendasi
	
	$scope.tambahKapalPerencanaan = function(id){
		var dataToadd = $scope.kapalTerminalLain;
		for (var i = 0; i < dataToadd.length; i++) {
		 $scope.postKapal = dataToadd[id];
		 $scope.postKapal.id = id;
		 $scope.postKapal.tglMasuk = $filter('date')(tglParams, 'dd-MM-yyyy');
		 $scope.postKapal.tglSelesai = $filter('date')(tglParams, 'dd-MM-yyyy');
		}
		
	}

	$scope.tambahKapalTl = function(id){
		var dataToadd = $scope.KapalTl;
		for (var i = 0; i < dataToadd.length; i++) { 
			$scope.postKapal = dataToadd[id];
			$scope.postKapal.id = id;
			$scope.postKapal.tglMasuk = $filter('date')(tglParams, 'dd-MM-yyyy');
			$scope.postKapal.tglSelesai = $filter('date')(tglParams, 'dd-MM-yyyy');
			$scope.postKapal.hadap = ($scope.postKapal.hadapKapal == null ? $scope.informationDermaga.hadapDermaga : $scope.postKapal.hadapKapal); 
		}
	}

	$scope.showEdit = function(){
		$scope.allowBack = false;
		$scope.showEditKapal = true;
		$scope.showAction = false;
	}
	$scope.showGeser = function(){
		$scope.allowBack = true;
		$scope.showGeserKapal = true;
		$scope.showAction = false;
	}

	$scope.cancel = function(){
		$scope.showEditKapal = false;
		$scope.showGeserKapal = false;
		$scope.showMoveKapal = false;
		$scope.showAction = true;
	}

	/*$scope.cancelEdit = function(dataKapal){ console.log('2'); console.log(dataKapal);
		var kapalUpdate = {};
	    var jamMasuk = dataKapal.jamMasuk;
	    var jamKeluar = dataKapal.jamKeluar;
	    if(typeof dataKapal.tglMasuk === 'object'){
	        if(dataKapal.tglMasuk.toString().indexOf('-') === -1){
	        	kapalUpdate.waktuMulai = $filter('date')(dataKapal.tglMasuk,'yyyy-MM-dd')+'T'+jamMasuk;
	        }
	    }else{
	        var formatTglMulai = dataKapal.tglMasuk.split('-');
	        var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
	        kapalUpdate.waktuMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMasuk;
	    }
	    if(typeof dataKapal.tglSelesai === 'object'){
	        if(dataKapal.tglSelesai.toString().indexOf('-') === -1){
	          	kapalUpdate.waktuSelesai = $filter('date')(dataKapal.tglSelesai,'yyyy-MM-dd')+'T'+jamKeluar;
	        }
	    }else{
	        var formatTglMulai = dataKapal.tglSelesai.split('-');
	        var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
	        kapalUpdate.waktuSelesai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamKeluar;
	    }
		kapalUpdate.mulai = kapalUpdate.waktuMulai;
		kapalUpdate.selesai = kapalUpdate.waktuSelesai; 

	    var parseTglMulai = Date.parse(kapalUpdate.mulai);
	    var parseTglSelesai = Date.parse(kapalUpdate.selesai);

	    if(parseTglMulai > parseTglSelesai){
	        var selisih = parseInt(parseTglMulai)-parseInt(parseTglSelesai);
	    }else if(parseTglSelesai > parseTglMulai){
	        var selisih = parseInt(parseTglSelesai)-parseInt(parseTglMulai);
	    }

	    if(parseTglMulai >= parseTglSelesai){
	        $scope.showAlert = true;
	        $scope.showMessage = "Waktu Selesai harus melebihi Waktu Mulai";
	        return false;
	    }else{

	    }
	    if(selisih <= 3600000){
	        $scope.showAlert = true;
	        $scope.showMessage = "Waktu Selesai harus melebihi Waktu Mulai";
	        return false;
	    }
	}*/

	//autocomplete
	$scope.getListOfDermagaLabuh = function(value) {
		if (value && value.length <=3) {
			return new Promise(function(resolve) {
				MdmDermagaSearchByKode.get({
					kode: value,
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
		} else if (value.length > 3 ){
			return new Promise(function(resolve) {
				MdmDermagaPerJasa.get({
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

	/* validasi autocomplete */
	var valueField = '';
	$scope.checkValue = function(value){
	  valueField = value;
	}

	 // validation add
	$scope.validationSelectDermaga= function(){
		if(valueField !== $scope.dermaga){
		  if(typeof $scope.dermaga != 'object' ){
			$scope.setNotification  = {
			  type  : 'warning',
			  message : 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
			};
			Notification.setNotification($scope.setNotification);
			$scope.dermaga = '';
		  }
		}
	}

	$scope.getKapalTerminalLain = function(data){
		if(data){
			return new Promise(function(resolve, reject) {
				ListKapalTerminalLain.get({
					kdDermaga: kdDermaga,
					tglPerencanaan: tglParams
					
				}, function(response) {
					resolve(response);
					$scope.datakapalTl = response;
					var arrayKodeKapal = [];
					$scope.kapalTerminalLain = [];
					$scope.dataKapalRek.forEach(function(item){
						arrayKodeKapal.push(item.kodeKapal);
					});
					
					$scope.datakapalTl.forEach(function(item){
						if (!arrayKodeKapal.includes(item.kodeKapal)) {
						  $scope.kapalTerminalLain.push(item);
						}
					});
					
				});
			});
		}
	}

	KapalTlList.get({tglPenetapan:tglParams},function(response){
		if(response.$resolved == true){
			$scope.KapalTl = response;
		}

	});

	//autocomplete cluster/pembagi utama
	$scope.getListOfclusterUtama = function(value) {
	  if (value) {
		return new Promise(function(resolve, reject) {
		  ClusterGetAll.get({
			nama: value
			
		  }, function(response) {
			resolve(response.content);
		  });
		});
	  }
	};

	$scope.getKapalCluster = function(data){
		var clusteringId = data.id;
		ListKapalCluster.get({kdDermaga:kdDermaga,tglPerencanaan:tglParams,clusteringId:clusteringId},function(response){
			$scope.kapalRekCluster = response;
		});
	}

	KademeterList.get({kdDermaga:kdDermaga},function(response){
		$scope.clusterKademeter = response.content;

	});

	$scope.updateKapal = function(){
		for(var i=0; i<$scope.dataKapalnoCluster.length; i++){
		   
			$scope.dataKapalnoCluster[i].clusteringId = $scope.dataKapalnoCluster[i].cluster;
			$scope.dataKapalnoCluster[i].kodeKapal = $scope.dataKapalnoCluster[i].kodeKapal;
			delete $scope.dataKapalnoCluster[i].cluster;
			delete $scope.dataKapalnoCluster[i].hadapKapal;
			delete $scope.dataKapalnoCluster[i].jenisKapal;
			delete $scope.dataKapalnoCluster[i].kadeAkhir;
			delete $scope.dataKapalnoCluster[i].kadeAkhirKeseluruhan;
			delete $scope.dataKapalnoCluster[i].kadeAwal;
			delete $scope.dataKapalnoCluster[i].kadeAwalKeseluruhan;
			delete $scope.dataKapalnoCluster[i].kadeClusteringAkhir;
			delete $scope.dataKapalnoCluster[i].kadeClusteringAwal;
			delete $scope.dataKapalnoCluster[i].kapalSandar;
			delete $scope.dataKapalnoCluster[i].kodeError;
			delete $scope.dataKapalnoCluster[i].mulai;
			delete $scope.dataKapalnoCluster[i].namaDermaga;
			delete $scope.dataKapalnoCluster[i].kodeDermaga;
			delete $scope.dataKapalnoCluster[i].namaKapal;
			delete $scope.dataKapalnoCluster[i].noPpk1;
			delete $scope.dataKapalnoCluster[i].noPpkJasa;
			delete $scope.dataKapalnoCluster[i].panjangKapal;
			delete $scope.dataKapalnoCluster[i].pesan;
			delete $scope.dataKapalnoCluster[i].selesai;
			delete $scope.dataKapalnoCluster[i].tingkatan;
			delete $scope.dataKapalnoCluster[i].top;
			delete $scope.dataKapalnoCluster[i].url;
			
			if($scope.dataKapalnoCluster[i].clusteringId == undefined){
				$scope.showAlert = true;
				$scope.showMessage = "Cluster Kapal Tidak Diketahui";
				return;
			}else{
				AddClusteringKapal.save($scope.dataKapalnoCluster[i],function(response){
					if(response){
						
						$timeout(function() {
						   $window.location.reload();
						}, 3000);
					}
				});
			}			
		}
	}

	$scope.savePerencanaan = function(data){ 
		var kapalPrameeting = {};
		kapalPrameeting.kadeAwal = data.kadeAwal;
		kapalPrameeting.kadeAkhir = data.kadeAkhir;
		kapalPrameeting.kadeAwalKeseluruhan = data.kadeAwalKeseluruhan;
		kapalPrameeting.kadeAkhirKeseluruhan = data.kadeAkhirKeseluruhan;
		kapalPrameeting.kadeClusteringAwal = (data.kadeClusteringAwal == null ? 0 : data.kadeClusteringAwal);
		kapalPrameeting.kadeClusteringAkhir = (data.kadeClusteringAkhir == null ? 0 : data.kadeClusteringAkhir);
		kapalPrameeting.panjangKapal = data.panjangKapal;
		kapalPrameeting.clusteringId = (data.clusteringId == null ? 0 : data.clusteringId);
		kapalPrameeting.noPpk1 = data.noPpk1;
		kapalPrameeting.noPpkJasa =data.noPpkJasa;
		kapalPrameeting.isMeeting = true;
		kapalPrameeting.isMeetingSusulan = data.isMeetingSusulan;
		kapalPrameeting.kodeKapal = data.kodeKapal;
		kapalPrameeting.namaKapal = data.namaKapal;
		kapalPrameeting.kodeDermaga = kdDermaga;
		kapalPrameeting.tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
		kapalPrameeting.arahKapal = data.hadapKapal;
		kapalPrameeting.mulai = data.mulai;		
		kapalPrameeting.selesai = data.selesai;
		kapalPrameeting.flagTender = data.flagTender;
		if(data.flagTender == 1){
			kapalPrameeting.kodeKapalTender = data.kodeKapalTender;
			kapalPrameeting.kodeKapalTenderText = data.kodeKapalTenderText;
		}		

		PerencanaanGet.get({noPpkJasa:kapalPrameeting.noPpkJasa}, function(res){
			if(res.content.length == 0){
				PerencanaanSave.save(kapalPrameeting,function(response){
					var xdata = response;
					var dataToadd = {};
					dataToadd.kadeAwal = xdata.kadeAwal;
					dataToadd.kadeAkhir = xdata.kadeAkhir;
					dataToadd.kadeAwalKeseluruhan = xdata.kadeAwalKeseluruhan;
					dataToadd.kadeAkhirKeseluruhan = xdata.kadeAkhirKeseluruhan;
					dataToadd.panjangKapal = xdata.panjangKapal;
					var clusterKade = ((xdata.kadeAkhir - xdata.kadeAwal)/2) + xdata.kadeAwal; 
					$scope.clusterKademeter.forEach(function(x){ 
						if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
							dataToadd.kadeClusteringAwal = x.kadeAwal;
							dataToadd.kadeClusteringAkhir = x.kadeAkhir;			
							dataToadd.clusteringId = x.clusteringId;
						}else{
							var lastElement =$scope.clusterKademeter[$scope.clusterKademeter.length - 1];
							dataToadd.kadeClusteringAwal = lastElement.kadeAwal;
							dataToadd.kadeClusteringAkhir = lastElement.kadeAkhir;			
							dataToadd.clusteringId = lastElement.clusteringId;
						}
					});
					dataToadd.komoditi = xdata.komoditi;
					dataToadd.kodeAgen = null;
					dataToadd.keterangan = null;
					dataToadd.isPrameeting = true;
					dataToadd.isDitetapkan = true;
					dataToadd.isMeeting = true;
			  		dataToadd.isMeetingSusulan = xdata.isMeetingSusulan,
					dataToadd.noPpk1 = xdata.noPpk1;
					dataToadd.noPpkJasa = xdata.noPpkJasa;
					dataToadd.kodeKapal = xdata.kodeKapal;
					dataToadd.namaKapal = xdata.namaKapal;
					dataToadd.kodeDermaga = kdDermaga;
					dataToadd.tglMeeting = xdata.tglMeeting;
					dataToadd.arahKapal = xdata.arahKapal;
					dataToadd.mulai = xdata.mulai;
					dataToadd.selesai = xdata.selesai;
					dataToadd.tglPenetapan = $filter('date')(new Date(),'yyyy-MM-ddTHH:mm:ss');
					PenetapanSave.save(dataToadd,function(ydata){
						LoadingScreen.hide();
						MeetingHistory.save({kodeDermaga:dataToadd.kodeDermaga , tglMeeting: tglParams},{},function(xdata){ 
							console.log('Menyimpan Histori meeting');
						});
						//Menambahkan API history_kapal_antrian dengan kodeDermaga dan tglPrameeting
						HistoryKapalAntrian.save({kodeDermaga:dataToadd.kodeDermaga , tglPrameeting: tglParams},{},function(xdata){ 
							console.log('History Kapal Antrian');
						});					
					});
				});				
			}
		})		
	}

	$scope.updatePersiapanPrameeting = function(rekomendasi){
		$scope.updatePrameeting = rekomendasi;
		for(var i=0; i<rekomendasi.length; i++){
			$scope.updatePrameeting[i].clusteringId = rekomendasi[i].clusteringId;
			$scope.updatePrameeting[i].kodeKapal = rekomendasi[i].kodeKapal;
			$scope.updatePrameeting[i].kodeDermaga = kdDermaga;
			$scope.updatePrameeting[i].isPrameeting = 1;
			$scope.updatePrameeting[i].noPpk1 = rekomendasi[i].noPpk1;
			$scope.updatePrameeting[i].noPpkJasa = rekomendasi[i].noPpkJasa;
			$scope.updatePrameeting[i].tglPrameeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');

			 PrameetingSave.save($scope.updatePrameeting[i],function(response){
				if(response){
					$timeout(function() {
					 	$window.location.reload();					   
					}, 3000);				   
				}				
			});
		};
	}

	$scope.savePenetapan = function(dataKapalRek){		
		var kapalPrameeting = {};
		kapalPrameeting.kadeAwal = dataKapalRek.kadeAwal;
		kapalPrameeting.kadeAkhir = dataKapalRek.kadeAkhir;
		kapalPrameeting.kadeAwalKeseluruhan = dataKapalRek.kadeAwalKeseluruhan;
		kapalPrameeting.kadeAkhirKeseluruhan = dataKapalRek.kadeAkhirKeseluruhan;
		kapalPrameeting.panjangKapal = dataKapalRek.panjangKapal;

		var clusterKade = ((kapalPrameeting.kadeAkhir - kapalPrameeting.kadeAwal)/2) + kapalPrameeting.kadeAwal; 
		$scope.clusterKademeter.forEach(function(x){ 
			if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
				kapalPrameeting.kadeClusteringAwal = x.kadeAwal;
				kapalPrameeting.kadeClusteringAkhir = x.kadeAkhir;			
				kapalPrameeting.clusteringId = x.clusteringId;
			}else{
				var lastElement =$scope.clusterKademeter[$scope.clusterKademeter.length - 1];
				kapalPrameeting.kadeClusteringAwal = lastElement.kadeAwal;
				kapalPrameeting.kadeClusteringAkhir = lastElement.kadeAkhir;			
				kapalPrameeting.clusteringId = lastElement.clusteringId;
			}
		});

		kapalPrameeting.noPpk1 = dataKapalRek.noPpk1;
		kapalPrameeting.noPpkJasa = dataKapalRek.noPpkJasa;
		kapalPrameeting.isMeeting = true;
		kapalPrameeting.isMeetingSusulan = dataKapalRek.meetingSusulan;
		kapalPrameeting.kodeKapal = dataKapalRek.kodeKapal;
		kapalPrameeting.namaKapal = dataKapalRek.namaKapal;
		kapalPrameeting.kodeDermaga = kdDermaga;
		kapalPrameeting.tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
		kapalPrameeting.arahKapal = dataKapalRek.hadapKapal;
		kapalPrameeting.mulai = dataKapalRek.mulai;		
		kapalPrameeting.selesai = dataKapalRek.selesai;		

		$scope.getHistory(dataKapalRek.noPpkJasa, true, dataKapalRek);

		PerencanaanGet.get({noPpkJasa:kapalPrameeting.noPpkJasa}, function(res){
			var xdata = {};
			var dataToadd = {};
			if(res.content.length > 0){
				xdata = res.content[0];	
				dataToadd.kadeAwal = xdata.kadeAwal;
				dataToadd.kadeAkhir = xdata.kadeAkhir;
				dataToadd.kadeAwalKeseluruhan = xdata.kadeAwalKeseluruhan;
				dataToadd.kadeAkhirKeseluruhan = xdata.kadeAkhirKeseluruhan;
				dataToadd.panjangKapal = xdata.panjangKapal;
				var clusterKade = ((xdata.kadeAkhir - xdata.kadeAwal)/2) + xdata.kadeAwal; 
				$scope.clusterKademeter.forEach(function(x){ 
					if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
						dataToadd.kadeClusteringAwal = x.kadeAwal;
						dataToadd.kadeClusteringAkhir = x.kadeAkhir;			
						dataToadd.clusteringId = x.clusteringId;
					}else{
						var lastElement =$scope.clusterKademeter[$scope.clusterKademeter.length - 1];
						dataToadd.kadeClusteringAwal = lastElement.kadeAwal;
						dataToadd.kadeClusteringAkhir = lastElement.kadeAkhir;			
						dataToadd.clusteringId = lastElement.clusteringId;
					}
				});					
				dataToadd.komoditi = xdata.komoditi;
				dataToadd.kodeAgen = null;
				dataToadd.keterangan = null;
				dataToadd.isPrameeting = true;
				dataToadd.isDitetapkan = true;
				dataToadd.isMeeting = true;
	  			dataToadd.isMeetingSusulan = xdata.isMeetingSusulan,
				dataToadd.noPpk1 = xdata.noPpk1;
				dataToadd.noPpkJasa = xdata.noPpkJasa;
				dataToadd.kodeKapal = xdata.kodeKapal;
				dataToadd.namaKapal = xdata.namaKapal;
				dataToadd.kodeDermaga = kdDermaga;
				dataToadd.tglMeeting = xdata.tglMeeting;
				dataToadd.arahKapal = xdata.arahKapal;
				dataToadd.mulai = xdata.mulai;
				dataToadd.selesai = xdata.selesai;
				dataToadd.flagTender = xdata.flagTender;
				dataToadd.tglPenetapan = $filter('date')(new Date(),'yyyy-MM-ddTHH:mm:ss');
				if(xdata.flagTender == 1){
					dataToadd.kodeKapalTender = xdata.kodeKapalTender;
					dataToadd.kodeKapalTenderText = xdata.kodeKapalTenderText;
				}	

				PenetapanSave.save(dataToadd,function(ydata){ 
					LoadingScreen.hide();	
					if(ydata.id){
						MeetingHistory.save({kodeDermaga:dataToadd.kodeDermaga , tglMeeting: tglParams},{},function(xdata){ 
							console.log('Menyimpan Histori meeting');
						});
						// Menambahkan API history_antrian_kapal dengan kodeDermaga dan tglPrameeting
						HistoryKapalAntrian.save({kodeDermaga:dataToadd.kodeDermaga , tglPrameeting: tglParams},{},function(xdata){ 
							console.log('History Antrian Kapal');
						});
					}					
				});
			}
			else{
				$scope.savePerencanaan(kapalPrameeting);
			}
		});
	}

	$scope.tetapkanPrameeting = function(){
		var confirmPenetapan = confirm('Apakah anda ingin menetapkan prameeting ini?');
		LoadingScreen.show();

		if(confirmPenetapan == true){ 
			for (var i = 0; i < $scope.dataKapalRek.length; i++) {
				if($scope.dataKapalRek[i].statusLineKapal != 'Penetapan'){					
					$scope.savePenetapan($scope.dataKapalRek[i]);
				}				
			}
			LoadingScreen.hide();
			$timeout(function() {
				/* push to Meeting Online*/
				var typeMethod;
				if($scope.ButtonSaveMeetingSusulan) {
					typeMethod = 'penetapanMeetingSusulan';
				}else{
					typeMethod = 'penetapanMeeting';
				}
				$scope.dataKapalRek.kodeDermaga = kdDermaga;
				$scope.dataKapalRek.namaDermaga = $scope.informationDermaga.namaDermaga;
				PushToMeetingOnline.setMessage('penetapanMeeting',$scope.dataKapalRek);
				/* --- */

				$location.path($scope.locationPath);
			}, 4000);
		}else{
			LoadingScreen.hide();
		}		
	}

	$scope.getHistory = function(jasa, x, dataKapalRek){ 
		HistoryRevisiTambat.get({noPpkJasa: jasa}, function(response){
			if(response.length > 0){
				for (var i = 0; i < response.length; i++) {
					if(response[i].jenisRevisi == 8){
						$scope.historyptp.push(response[i]);
					}
				}
				$scope.historyTambat = response[0];
				$scope.historyTambat.jamMulai = $filter('date')(response[0].tglMulai, 'HH:mm');
				$scope.historyTambat.jamSelesai = $filter('date')(response[0].tglSelesai, 'HH:mm');
			 	$scope.historyTambat.tglMulai = $filter('date')(response[0].tglMulai, 'dd-MM-yyyy');
				$scope.historyTambat.tglSelesai = $filter('date')(response[0].tglSelesai, 'dd-MM-yyyy');
				if(response[0].kadeAwal > response[0].kadeAkhir){
					$scope.historyTambat.kodeKade = '-';
				}else{
					$scope.historyTambat.kodeKade = '+';
				}

				if(x == true){
					var dataUpdateRevisi = {};
					dataUpdateRevisi.noPpk1 =  $scope.historyTambat.noPpk1;
					dataUpdateRevisi.noPpkJasa = $scope.historyTambat.noPpkjasa;
					dataUpdateRevisi.kodeLokasi = kdDermaga;
					dataUpdateRevisi.namaLokasi = $scope.informationDermaga.namaDermaga;
					dataUpdateRevisi.tglMulai = dataKapalRek.mulai;
					dataUpdateRevisi.tglSelesai = dataKapalRek.selesai;
					dataUpdateRevisi.kadeAwal = dataKapalRek.kadeAwal;
					dataUpdateRevisi.kadeAkhir = dataKapalRek.kadeAkhir;

					PenetapanTambatEdit.update({id:$scope.historyTambat.noPpkJasa},dataUpdateRevisi, function(response){
						if(response.id){
							console.log("memiliki data revisi. Berhasil di update");
						}
					})	
				}
			}else{
				$scope.historyptp = [];
				$scope.historyTambat = [];
			}
		});	
	}

	$scope.infoKapalRek = function(id){ 
		$scope.infoKapalSandarStatus = true; 
		$scope.dataKapalRek.forEach(function(item){
			if (item.id == id) { 
				$scope.showLoadingTos = true;
				$scope.getHistory(item.noPpkJasa);		  	
			  	InformasiKegiatanKapal.get({
					noPpk1 : item.noPpk1,
					noPpkJasa : item.noPpkJasa
				},function(response){
					if(response.length > 0){
						response.forEach(function(d){
							if(d.jenisKegiatan == 'MUAT'){
								$scope.dataInformasiKapal.infoTosMuat = d;
							}else if(d.jenisKegiatan == 'BONGKAR'){
								$scope.dataInformasiKapal.infoTosBongkar = d;
							}
						});
					}else{
						$scope.dataInformasiKapal.infoTosMuat = {};
						$scope.dataInformasiKapal.infoTosBongkar = {};
					}
					$scope.showLoadingTos = false;					
				})
				$scope.dataInformasiKapal = item;
			}
		});
		$('#infoKapalRekomendasi').modal('show');		
	}

	$scope.infoKapalSandar = function(id){
		 $scope.kapalSandar.forEach(function(item){
			if (item.idKapalSandar == id) {
				$scope.showLoadingTos = true;
				$scope.getHistoryRea(item.noPpkJasa);				  	
			  	InformasiKegiatanKapal.get({
					noPpk1 : item.noPpk1,
					noPpkJasa : item.noPpkJasa
				},function(response){
					if(response.length > 0){
						response.forEach(function(d){
							if(d.jenisKegiatan == 'MUAT'){
								$scope.informasiKapalSandar.infoTosMuat = d;
							}else if(d.jenisKegiatan == 'BONGKAR'){
								$scope.informasiKapalSandar.infoTosBongkar = d;
							}
						});
					}else{
						$scope.informasiKapalSandar.infoTosMuat = {};
						$scope.informasiKapalSandar.infoTosBongkar = {};
					}
					$scope.showLoadingTos = false;					
				})
			  	$scope.informasiKapalSandar = item;
			}
		});
		 
		$('#infoKapalSandar').modal('show');
		$scope.statusInfo = true;
	}

	$scope.tambahKapal = function(){
	   	if($scope.dataKapalRek.length == 0){
			$location.path('perencanaan/tambahkapal/'+kdDermaga+'/'+tglParams+'/'+0);
	   	};
		$scope.dataKapalRek.forEach(function(item){
			if (item.isProsesMeeting == 1 || item.isProsesMeeting == 2) {
				$('#meetingSusulanModal').modal('show');
			}else if(item.isProsesMeeting == 0){
				$location.path('perencanaan/tambahkapal/'+kdDermaga+'/'+tglParams+'/'+0);
			}
		});
		
	}

	$scope.checkMeetingSusulan = function(){
			 $('#meetingSusulanModal').modal('hide');
			$scope.locationMeetingSusulan = 'perencanaan/tambahkapal/'+kdDermaga+'/'+tglParams+'/'+1;
			$location.path($scope.locationMeetingSusulan);
	}

	$scope.showDelete = function(){
		$scope.allowBack = true;
		var idDelete = $scope.postKapal.imgId;
			var dataKapal = $scope.dataKapalRek;
			for (var i = 0; i < dataKapal.length; i++) {
				if(dataKapal[i].id == idDelete){
					$scope.noPpkjasa = dataKapal[i].noPpkJasa;

					var confirmDelete = confirm('Apakah anda ingin menghapus kapal ini?');
					if(confirmDelete){
						$scope.dataKapalRek.splice(i,1);
						DeleteKapalPrameeting.delete({noPpkJasa:$scope.noPpkjasa},function(response){
							
							if(response.$resolved == true){
								$scope.setNotification  = {
									type    : "success",
									message : "Kapal berhasil dihapus"
								};
								Notification.setNotification($scope.setNotification);

								/* Push To MettingOnline */
								response.namaDermaga = $scope.informationDermaga.namaDermaga;
								PushToMeetingOnline.setMessage('deleteKapalPerencanaan', response, $scope.postKapal);
								/* --- */
								
							}else{
								$scope.setNotification  = {
									type    : "warning",
									message : "Kapal tidak berhasil dihapus"
								};
								Notification.setNotification($scope.setNotification);
							}

						});
					};
										
				}
				
			}
			$scope.refreshCanvas();
			$scope.updatePosisi();
			$scope.configScale();
			$scope.updateAntrian();
			$scope.updateWaktuTambat();
			$scope.updateTop();
			$scope.draw();
			
			$scope.showAction = true;
			$('#editKapalModal').modal('hide');			 
	};

	$scope.moveKapal = function(){
		$scope.allowBack = true;
		$scope.showMoveKapal = true;
		$scope.showAction = false;
	};
   
	$scope.doMove = function(){
		$scope.showLoading = true;
		var idMove = $scope.postKapal.imgId;
		$scope.kdDermagaBaru = $scope.postKapal.dermaga.mdmgKode;
			var dataKapal = $scope.dataKapalRek;
			for (var i = 0; i < dataKapal.length; i++) {
				if(dataKapal[i].id == idMove){
					$scope.noPpkJasa = dataKapal[i].noPpkJasa;					
					PindahDermaga.update({noPpkJasa:$scope.noPpkJasa,kodeLokasi:$scope.kdDermagaBaru},function(response){
						if(response.id){
							$scope.showLoading = false;
							$scope.showSuccess = true;
							$scope.dataKapalRek.splice(i,1);
							$('#message').html('Kapal berhasil dipindah. <a href="#/perencanaan/'+$scope.kdDermagaBaru+'/'+$routeParams.tgl+'">ke Dermaga Baru</a>');	
							console.log($scope.shoLoading);
							/* Push To MettingOnline */
							response.namaDermagaBefore = $scope.informationDermaga.namaDermaga;
							response.kodeDermagaBefore = $scope.informationDermaga.kodeDermaga;
							PushToMeetingOnline.setMessage('pindahKapalPerencanaan', response, $scope.postKapal)	
							/* --- */					
						}else{
							$scope.showLoading = false;
							$scope.setNotification  = {
								type    : "warning",
								message : "Kapal tidak berhasil dipindahkan"
							};
							Notification.setNotification($scope.setNotification);
						}
						$scope.showMoveKapal = false;
					});										
				}
				
			}

			$scope.refreshCanvas();
			$scope.updatePosisi();
			$scope.configScale();
			$scope.updateAntrian();
			$scope.updateWaktuTambat();
			$scope.updateTop();
			// $scope.updateClusteringId();
			$scope.draw();
			// $scope.showDeleteKapal = false;
			$scope.showAction = true;
			$('#editKapalModal').modal('hide');
	};

/*penetapan*/
	$scope.getKapalRek = function(x){
		$scope.showLoading = true;
		ListKapalRekomendasi.get({kdDermaga:kdDermaga,tglPerencanaan:tglParams},function(response){
			if (response.length >0){				
				$scope.kapalSandar = [];
				$scope.dataKapalRek = [];
				$scope.dataKapalPtp = [];
				$scope.dataKapalnoCluster = [];
				$scope.dataKapal = response;
				if($scope.dataKapal[0].kodeError === "A007"){
					$scope.dataKapal.forEach(function(item){
						if (item.kodeError === "A007") {
						  $scope.dataKapalnoCluster.push(item);
						}
					});
					$scope.showAlert = true;
					$scope.showMessage = "Beberapa Kapal belum di set cluster";
					$('#updateKapalCluster').modal('show');
				}
				$scope.dataKapal.forEach(function(item){
					if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Realisasi') {
					  $scope.kapalSandar.push(item);
					}
					if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan == 5) {
						$scope.kapalSandar.push(item);
					}
				});

				//memisahkan kapal perencanaan
				$scope.dataKapal.forEach(function(item){
					if (item.kapalSandar == false  && item.kodeError == null) {
					   $scope.dataKapalRek.push(item);
					}
					if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan != 5) {
					  	$scope.dataKapalRek.push(item);
					  	$scope.dataKapalPtp.push(item)
					}
				});

				$scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);

				$scope.updateDatakapalSandar();
				$scope.updateIdKapalRekomendasi();
				$scope.updatePosisi();
				$scope.configScale();
				$scope.updateAntrian();
				$scope.updateWaktuTambat();
				$scope.updateTop();
				$scope.refreshCanvas(); 
				$scope.draw();
				if(typeof x == 'object'){
					$scope.showLoading = false;
					$scope.showSuccess = true;
					$('#message').html('Kapal berhasil dipindah. <a href="#/perencanaan/'+x.kodeDermaga+'/'+x.tglMeeting+'">ke Dermaga Baru</a>');
				}else{
					$scope.showLoading = false;
					$scope.showSuccessSave = true;
					$timeout(function() {
			            $scope.showSuccessSave = false;
			        }, 2000);
				}			
				
			}
		})
	}

	$scope.refreshTl = function(){
		KapalTlList.get({tglPenetapan:tglParams},function(response){
			if(response.$resolved == true){
				$scope.KapalTl = response;
			}
		});
	}

	$scope.hideVesel = function(noPpkjasa,id,dataInformasiKapal){	
		SembunyikanKapal.update({ppkjasa : noPpkjasa, visible : false},{}, function(response){
			if(response.id){
				$('#infoKapalRekomendasi').modal('hide');
				PushToMeetingOnline.setMessage('deleteKapalPerencanaan', dataInformasiKapal, response);
				$scope.getKapalRek();				
			}
		});
	};

	$scope.editKapalPtp = function(dataKapal,status){
		$scope.showLoadingData = true;
		$scope.infoKapalSandarStatus = false; 
		$scope.statusEdit = status;
		PenetapanTambatByPpkJasa.get({ppkjasa : dataKapal.noPpkJasa }, function(response){
			if(response.id){
				$scope.showLoadingData = false;
				$scope.dataPtp = response;
				$scope.dataPtp.jamMulai = $filter('date')(response.tglMulai, 'HH:mm');
				$scope.dataPtp.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
			 	$scope.dataPtp.tglMulai = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
				$scope.dataPtp.tglSelesai = $filter('date')(response.tglSelesai, 'dd-MM-yyyy');
				$scope.dataPtp.panjangKapal = dataKapal.panjangKapal;
				if(response.kadeAwal > response.kadeAkhir){
					$scope.dataPtp.kodeKade = '-';
				}else{
					$scope.dataPtp.kodeKade = '+';
				}
			}
		});
	}

/*revisi ptp */
	$scope.revisiKapalPtp = function(dataKapal){ 
		$scope.showLoadingData = true;
		$scope.infoKapalSandarStatus = false; 
		$scope.statusEdit = undefined;
		PenetapanTambatByPpkJasa.get({ppkjasa : dataKapal.noPpkJasa }, function(response){
			if(response.id){
				$scope.showLoadingData = false;
				$scope.dataPtp = response;
				$scope.dataPtp.jamMulai = $filter('date')(response.tglMulai, 'HH:mm');
				$scope.dataPtp.jamSelesai = $filter('date')(response.tglSelesai, 'HH:mm');
			 	$scope.dataPtp.tglMulai = $filter('date')(response.tglMulai, 'dd-MM-yyyy');
				$scope.dataPtp.tglSelesai = $filter('date')(response.tglSelesai, 'dd-MM-yyyy');
				$scope.dataPtp.panjangKapal = dataKapal.panjangKapal;
				if(response.kadeAwal > response.kadeAkhir){
					$scope.dataPtp.kodeKade = '-';
				}else{
					$scope.dataPtp.kodeKade = '+';
				}
			}
		});
		$scope.getHistory(dataKapal.noPpkJasa);
		$scope.showLoadingData = false;
	}

	$scope.batalEditPtp = function(){
		$scope.infoKapalSandarStatus = true;
	}

	$scope.updateKapalPtp = function(status){
		$scope.penetapantambat = {};
		$scope.penetapantambat.noPpk1 = $scope.dataPtp.noPpk1;
		$scope.penetapantambat.noPpkJasa = $scope.dataPtp.noPpkJasa;
		if (typeof $scope.dataPtp.namaLokasi === 'object') {
			$scope.penetapantambat.kodeLokasi = $scope.dataPtp.namaLokasi.mdmgKode;
			$scope.penetapantambat.namaLokasi = $scope.dataPtp.namaLokasi.mdmgNama;
		}else{
			$scope.penetapantambat.kodeLokasi = $scope.dataPtp.kodeLokasi;
			$scope.penetapantambat.namaLokasi = $scope.dataPtp.namaLokasi;
		}
		if(typeof $scope.dataPtp.tglMulai === 'object'){
			if($scope.dataPtp.tglMulai.toString().indexOf('-') === -1){
				$scope.penetapantambat.tglMulai = $filter('date')($scope.dataPtp.tglMulai,'yyyy-MM-dd')+'T'+$scope.dataPtp.jamMulai;
			}else{
				$scope.penetapantambat.tglMulai = $filter('date')($scope.dataPtp.tglMulai,'yyyy-MM-dd')+'T'+$scope.dataPtp.jamMulai;
			}
		}else{
			var formatTglMulai = $scope.dataPtp.tglMulai.split('-');
			var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
			$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.dataPtp.jamMulai;
		}

		if(typeof $scope.dataPtp.tglSelesai === 'object'){
			if($scope.dataPtp.tglSelesai.toString().indexOf('-') === -1){
				$scope.penetapantambat.tglSelesai = $filter('date')($scope.dataPtp.tglSelesai,'yyyy-MM-dd')+'T'+$scope.dataPtp.jamSelesai;
			}else{
				$scope.penetapantambat.tglSelesai = $filter('date')($scope.dataPtp.tglSelesai,'yyyy-MM-dd')+'T'+$scope.dataPtp.jamSelesai;
			}
		}else{
			var formatTglSelesai = $scope.dataPtp.tglSelesai.split('-');
			var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
			$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.dataPtp.jamSelesai;
		}

		$scope.penetapantambat.kadeAwal = $scope.dataPtp.kadeAwal; 
		$scope.penetapantambat.kadeAkhir = eval(parseInt($scope.dataPtp.kadeAwal) + $scope.dataPtp.kodeKade+ Math.ceil($scope.dataPtp.panjangKapal));
		
		var parseTglMulai = Date.parse($scope.penetapantambat.tglMulai);
		var parseTglSelesai = Date.parse($scope.penetapantambat.tglSelesai);
		if($scope.penetapantambat.tglSelesai && ((parseTglMulai > parseTglSelesai) || (parseTglMulai == parseTglSelesai))){
			$scope.showAlertEdit = true;
			$scope.messageAlert = "Waktu Selesai harus lebih dari Waktu Mulai";
			return false;
		}
		
		PenetapanTambatEdit.update({id:$scope.dataPtp.noPpkJasa},$scope.penetapantambat, 
			function(response){
				if(response.id){
					$('#infoKapalRekomendasi').modal('hide');
					if(typeof $scope.dataPtp.tglMulai === 'object'){
						if($scope.dataPtp.tglMulai.toString().indexOf('-') === -1){
							$scope.penetapantambat.tglMulai = $filter('date')($scope.dataPtp.tglMulai,'yyyy-MM-dd')+'_'+$scope.dataPtp.jamMulai;
						}else{
							$scope.penetapantambat.tglMulai = $filter('date')($scope.dataPtp.tglMulai,'yyyy-MM-dd')+'_'+$scope.dataPtp.jamMulai;
						}
					}else{
						var formatTglMulai = $scope.dataPtp.tglMulai.split('-');
						var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
						$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'_'+$scope.dataPtp.jamMulai;
					}

					if(typeof $scope.dataPtp.tglSelesai === 'object'){
						if($scope.dataPtp.tglSelesai.toString().indexOf('-') === -1){
							$scope.penetapantambat.tglSelesai = $filter('date')($scope.dataPtp.tglSelesai,'yyyy-MM-dd')+'_'+$scope.dataPtp.jamSelesai;
						}else{
							$scope.penetapantambat.tglSelesai = $filter('date')($scope.dataPtp.tglSelesai,'yyyy-MM-dd')+'_'+$scope.dataPtp.jamSelesai;
						}
					}else{
						var formatTglSelesai = $scope.dataPtp.tglSelesai.split('-');
						var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
						$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'_'+$scope.dataPtp.jamSelesai;
					}
					var postMeetingPtp = {
						kodeDermaga : $scope.penetapantambat.kodeLokasi,
						panjangKapal : $scope.dataPtp.panjangKapal,
						noPpk1 : $scope.penetapantambat.noPpk1 ,
						noPpkJasa : $scope.penetapantambat.noPpkJasa,
						tglMulai : $scope.penetapantambat.tglMulai,
						tglSelesai : $scope.penetapantambat.tglSelesai
					};
					
					if(status == false){						
						postMeetingPtp.kadeAwal = $scope.penetapantambat.kadeAwal;
						postMeetingPtp.kadeAkhir = $scope.penetapantambat.kadeAkhir;
						var clusterKade = ((postMeetingPtp.kadeAkhir - postMeetingPtp.kadeAwal)/2) + postMeetingPtp.kadeAwal; 
						$scope.clusterKademeter.forEach(function(x){ 
							if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
								postMeetingPtp.clusteringId = x.clusteringId;
							}else{
								var lastElement =$scope.clusterKademeter[$scope.clusterKademeter.length - 1];
								postMeetingPtp.clusteringId = lastElement.clusteringId;
							}
						});						
					}					
					HasilMeetingRevisi.update(postMeetingPtp,{}, function(response){
						console.log('No.PPK1 '+$scope.penetapantambat.noPpk1+' dengan No.PPK Jasa '+$scope.penetapantambat.noPpkJasa+' memperbaharui hasil meeting tambatan.')
						if(status == true){
							MonitoringRPKRO.get({noPpk1 : $scope.penetapantambat.noPpk1},function(response) {
								var tglPerencanaan = $filter('date')(response.content[0].tglPerencanaan, 'yyyy-MM-dd')
								$scope.getKapalRek({'kodeDermaga' : $scope.penetapantambat.kodeLokasi,'tglMeeting':tglPerencanaan});
							})	
						}else{
							$scope.getKapalRek();
						}						
						$scope.infoKapalSandarStatus = true;						
					});					
				}
			}
		)
	}

	$scope.pembatalanHistory = function(){ 
		for (var i = 0; i < $scope.historyptp.length; i++) {
			JenisRevisiTambat.update({ppkjasa:$scope.historyptp[i].noPpkJasa,jenisRevisi:10}, {},function(response){
				if(response.id){
					console.log($scope.historyptp[i].noPpkJasa + ' sdh dibatalkan');
				}
			});
		}	
	}

	$scope.pembatalanPtp = function(dataKapal){
		$scope.getHistory(dataKapal.noPpkJasa);		
		/*batalkan penetapan*/	
		DeleteKapalHasilMeeting.delete({noPpkJasa:dataKapal.noPpkJasa}, {},function(response){
			if(response){ 
				/*hapus hasil meeting kembali ke antrian*/	
				DeleteKapalPrameeting.delete({noPpkJasa:dataKapal.noPpkJasa},function(response){							
					if(response.$resolved == true){		
						$scope.getKapalRek();
					}
				});	

				$scope.pembatalanHistory();
				
				$('#infoKapalRekomendasi').modal('hide');				
				$scope.getKapalRek();
			}else{
				$scope.setNotification  = {
					type    : "warning",
					message : "Kapal tidak berhasil dibatalkan"
				};
				Notification.setNotification($scope.setNotification);
			}
		});
	}
 	$scope.loaValuePtp = function(){
 		var kadeAwal = $('#penetapanTambatKadeAwal').val();
	 	$scope.historyTambat.kadeAkhir = eval(parseInt($scope.historyTambat.kadeAwal) + $scope.historyTambat.kodeKade +parseInt($scope.dataInformasiKapal.panjangKapal));
		if(isNaN($scope.historyTambat.kadeAkhir)){
			$scope.historyTambat.kadeAkhir = 0;
		}
 	};

	$scope.$watch('historyTambat.kadeAwal',function(newValue,oldValue){
 		if(newValue != oldValue){
 			$scope.loaValuePtp();
 		}
 	})

	$scope.updateRevisiPtp = function(x){
		$scope.penetapantambat = {};	
		$scope.penetapantambat.noPpk1 = $scope.historyTambat.noPpk1;
		$scope.penetapantambat.noPpkJasa = $scope.historyTambat.noPpkJasa;
		if (typeof $scope.historyTambat.namaLokasi === 'object') {
			$scope.penetapantambat.kodeLokasi = $scope.historyTambat.namaLokasi.mdmgKode;
			$scope.penetapantambat.namaLokasi = $scope.historyTambat.namaLokasi.mdmgNama;
		}else{
			$scope.penetapantambat.kodeLokasi = $scope.historyTambat.kodeLokasi;
			$scope.penetapantambat.namaLokasi = $scope.historyTambat.namaLokasi;
		}
		if(typeof $scope.historyTambat.tglMulai === 'object'){
			if($scope.historyTambat.tglMulai.toString().indexOf('-') === -1){
				$scope.penetapantambat.tglMulai = $filter('date')($scope.historyTambat.tglMulai,'yyyy-MM-dd')+'T'+$scope.historyTambat.jamMulai;
			}else{
				$scope.penetapantambat.tglMulai = $filter('date')($scope.historyTambat.tglMulai,'yyyy-MM-dd')+'T'+$scope.historyTambat.jamMulai;
			}
		}else{
			var formatTglMulai = $scope.historyTambat.tglMulai.split('-');
			var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
			$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+$scope.historyTambat.jamMulai;
		}

		if(typeof $scope.historyTambat.tglSelesai === 'object'){
			if($scope.historyTambat.tglSelesai.toString().indexOf('-') === -1){
				$scope.penetapantambat.tglSelesai = $filter('date')($scope.historyTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.historyTambat.jamSelesai;
			}else{
				$scope.penetapantambat.tglSelesai = $filter('date')($scope.historyTambat.tglSelesai,'yyyy-MM-dd')+'T'+$scope.historyTambat.jamSelesai;
			}
		}else{
			var formatTglSelesai = $scope.historyTambat.tglSelesai.split('-');
			var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
			$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.historyTambat.jamSelesai;
		}
		$scope.penetapantambat.kadeAwal = $scope.historyTambat.kadeAwal;
		$scope.penetapantambat.kadeAkhir = $scope.historyTambat.kadeAkhir;
		//$scope.penetapantambat.kadeAkhir = eval(parseInt($scope.historyTambat.kadeAwal) + $scope.historyTambat.kodeKade+ parseInt($scope.dataPtp.panjangKapal));
		PenetapanTambatEdit.update({id:$scope.historyTambat.noPpkJasa},$scope.penetapantambat, 
			function(response){
				if(response.id){
					var note  = {
						type	: "success",
						message	: "Data berhasil tersimpan"
					};
					Notification.setNotification(note);

					//cek hasil meeting 
					HasilMeetingList.get({noPpkJasa : $scope.dataPtp.noPpkJasa},function(response){
						if(response.content){
							if(typeof $scope.historyTambat.tglMulai === 'object'){
								if($scope.historyTambat.tglMulai.toString().indexOf('-') === -1){
									$scope.penetapantambat.tglMulai = $filter('date')($scope.historyTambat.tglMulai,'yyyy-MM-dd')+'_'+$scope.historyTambat.jamMulai;
								}else{
									$scope.penetapantambat.tglMulai = $filter('date')($scope.historyTambat.tglMulai,'yyyy-MM-dd')+'_'+$scope.historyTambat.jamMulai;
								}
							}else{
								var formatTglMulai = $scope.historyTambat.tglMulai.split('-');
								var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
								$scope.penetapantambat.tglMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'_'+$scope.historyTambat.jamMulai;
							}

							if(typeof $scope.historyTambat.tglSelesai === 'object'){
								if($scope.historyTambat.tglSelesai.toString().indexOf('-') === -1){
									$scope.penetapantambat.tglSelesai = $filter('date')($scope.historyTambat.tglSelesai,'yyyy-MM-dd')+'_'+$scope.historyTambat.jamSelesai;
								}else{
									$scope.penetapantambat.tglSelesai = $filter('date')($scope.historyTambat.tglSelesai,'yyyy-MM-dd')+'_'+$scope.historyTambat.jamSelesai;
								}
							}else{
								var formatTglSelesai = $scope.historyTambat.tglSelesai.split('-');
								var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
								$scope.penetapantambat.tglSelesai = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'_'+$scope.historyTambat.jamSelesai;
							}
							
							var postMeetingPtp = {
								kodeDermaga : $scope.penetapantambat.kodeLokasi,
								panjangKapal : $scope.dataPtp.panjangKapal,
								noPpk1 : $scope.penetapantambat.noPpk1 ,
								noPpkJasa : $scope.dataPtp.noPpkJasa,
								tglMulai : $scope.penetapantambat.tglMulai,
								tglSelesai : $scope.penetapantambat.tglSelesai
							}
							
							if($scope.historyTambat.kodeLokasi == $scope.penetapantambat.kodeLokasi){
								postMeetingPtp.kadeAwal = $scope.penetapantambat.kadeAwal;
								postMeetingPtp.kadeAkhir = $scope.penetapantambat.kadeAkhir;
								postMeetingPtp.kodeDermaga = $scope.penetapantambat.kodeLokasi;
								var clusterKade = ((postMeetingPtp.kadeAkhir - postMeetingPtp.kadeAwal)/2) + postMeetingPtp.kadeAwal; 
								$scope.clusterKademeter.forEach(function(x){ 
									if(x.kadeAwal <= clusterKade &&  clusterKade <= x.kadeAkhir){
										postMeetingPtp.clusteringId = x.clusteringId;
									}else{
										var lastElement =$scope.clusterKademeter[$scope.clusterKademeter.length - 1];
										postMeetingPtp.clusteringId = lastElement.clusteringId;
									}
								});									
							}
							
							HasilMeetingRevisi.update(postMeetingPtp,{}, function(response){
								console.log('No.PPK1 '+$scope.penetapantambat.noPpk1+' dengan No.PPK Jasa '+$scope.penetapantambat.noPpkJasa+' memperbaharui hasil meeting tambatan.')
								$('#infoKapalRekomendasi').modal('hide');
								if($scope.historyTambat.kodeLokasi != $scope.penetapantambat.kodeLokasi){
									MonitoringRPKRO.get({noPpk1 : $scope.penetapantambat.noPpk1},function(response) {
										var tglPerencanaan = $filter('date')(response.content[0].tglPerencanaan, 'yyyy-MM-dd')
										$scope.getKapalRek({'kodeDermaga' : $scope.penetapantambat.kodeLokasi,'tglMeeting':tglPerencanaan});
									})										
								}else{
									$scope.getKapalRek();
								}								
							});
						}
					});
				}else{
					var note  = {
						type	: "error",
						message	: "Data gagal disimpan"
					};
					Notification.setNotification(note);
				}
			},
			function(response){
				var note  = {
					type	: "error",
					message	: "Data gagal disimpan"
				};
				Notification.setNotification(note);
			}
		);
	}

/*jam*/
	$scope.$watch('historyptp.length', function() {
		var c1 = $('#penetapanTambatJamMulaiValRev').is(':visible');
		var c2 = $('#penetapanTambatJamSelesaiValRev').is(':visible');
		if(c1 == true){
			$('#penetapanTambatJamMulaiValRev').mask('99:99');
		}
		if(c2 == true){
			$('#penetapanTambatJamSelesaiValRev').mask('99:99');
		}		
	});

	$scope.$watch(function () {
	   	return document.getElementById("penetapanTambatJamMulaiVal");
	}, function(val) {
	   	$('#penetapanTambatJamMulaiVal').mask('99:99');
		$('#penetapanTambatJamSelesaiVal').mask('99:99');
	});

	$scope.$watch(function () {
	   	return document.getElementById("jamMasukEditVal");
	}, function(val) {
	   	$('#jamMasukEditVal').mask('99:99');
		$('#jamKeluarEditVal').mask('99:99');
	});	

	$scope.$watch(function () {
	   	return document.getElementById("jamMasukValTL");
	}, function(val) {
	   	$('#jamMasukValTL').mask('99:99');
		$('#jamKeluarValTL').mask('99:99');
	});	

	$scope.$watch(function () {
	   	return document.getElementById("jamMasukVal");
	}, function(val) {
	   	$('#jamMasukVal').mask('99:99');
		$('#jamKeluarVal').mask('99:99');
	});

	$scope.$watch(function () {
	   	return document.getElementById("jamMulaiTambatValBaru");
	}, function(val) {
	   	$('#jamMulaiTambatValBaru').mask('99:99');
		$('#jamSelesaiTambatValBaru').mask('99:99');
	});

/*kapal geser */
	$scope.geserKapal = function(data){
		$scope.statusInfo = false;
		$scope.statusPreview = false;
		$scope.statusRevisiRea = false;
		$scope.statusLain = false;
		$scope.showLoad = false;
		$scope.jasatambat = data;
		$scope.jamMulai = $filter('date')(data.mulai, 'HH:mm');
		$scope.tglMulai = $filter('date')(data.mulai, 'dd-MM-yyyy');
		$scope.jasatambatbaru.kodeKade = '+';
	}

	$scope.pilihKapal = function(x){
		var temp = x;
		if(typeof x!= 'object'){
			$scope.showDuplicate = true;
			$scope.selectedVesselGeser = '';
			$scope.messageDuplicate = 'Data yang Anda Masukan Tidak Ada dalam Pilihan';
			$timeout(function() {		
				$scope.showDuplicate = false;				
			}, 5000);
		}else{
			if (checkunique.indexOf(temp.noPpkJasa) === -1) {
				checkunique.push(temp.noPpkJasa);
		        $scope.kapalPengganti.push(x);
		        $scope.selectedVesselGeser = '';
			} else { 
				$scope.showDuplicate = true;
				$scope.messageDuplicate = 'Tidak Dapat Menginputkan Data yang Sama';
				$timeout(function() {		
					$scope.showDuplicate = false;				
				}, 5000);
			}			
		}
	}

	$scope.deleteKapalPenggantiView = function(i){
		var checkDeleteTunda = confirm('Apakah Anda akan Menghapus data ini?');
		if(checkDeleteTunda){
			checkunique.splice(i, 1);
			$scope.kapalPengganti.splice(i, 1);
		}
	}

	$scope.loaValue = function(){
 		$scope.jasatambatbaru.kadeAkhir = eval(parseInt($scope.jasatambatbaru.kadeAwal) + $scope.kodeKade + parseInt($scope.jasatambat.panjangKapal));
	 	if(isNaN($scope.jasatambatbaru.kadeAkhir)){
	 		$scope.jasatambatbaru.kadeAkhir = 0;
	 	}
 	};

 	$scope.resetGeser = function(){
 		$scope.statusInfo = true;
 		$scope.statusRevisiRea = false;
 		$scope.statusPerpanjangan = false;
 		$scope.showLoad = false;
 		$scope.btnClassRpkro="btn-success";
 		$scope.ubahTgl = true;
		$scope.jasatambat = [];
		$scope.jasatambatbaru = [];
		$scope.kapalPengganti = [];
		checkunique = [];
 	}

	$scope.addKapalPengganti = function(x,y){
		var kapalPengganti = {};
		kapalPengganti.kodeKapalInduk = y.kodeKapal;
		kapalPengganti.namaKapalInduk = y.namaKapal;
		kapalPengganti.noPpkJasaInduk = y.noPpkJasa;
		kapalPengganti.noPpk1Induk = y.noPpk1;
		kapalPengganti.kodeKapalPengganti = x.kodeKapal;
		kapalPengganti.namaKapalPengganti = x.namaKapal;
		kapalPengganti.noPpkJasaPengganti = x.noPpkJasa;
		kapalPengganti.noPpk1Pengganti = x.noPpk1;
		KapalGeserAdd.save(kapalPengganti, function(response){
			if(response.id){
				console.log('Kapal pengganti ' + kapalPengganti.namaKapalPengganti +' berhasil diinput');
			}
		})
	}

	$scope.addKeteranganKapal = function(x,y){
		var kapalPengganti = {};
		kapalPengganti.kodeKapalInduk = y.kodeKapal;
		kapalPengganti.namaKapalInduk = y.namaKapal;
		kapalPengganti.noPpkJasaInduk = y.noPpkJasa;
		kapalPengganti.noPpk1Induk = y.noPpk1;
		kapalPengganti.keterangan = x;
		KapalGeserAdd.save(kapalPengganti, function(response){
			if(response.id){
				console.log(kapalPengganti.namaKapalInduk + ' dengan keterangan '+ kapalPengganti.keterangan);
			}
		})
	}

	$scope.submitKapalGeser = function(){
		$scope.showLoad = true;
		var datatambat = {};
		datatambat.noPpk1 = $scope.jasatambat.noPpk1;
		datatambat.kadeAwal = $scope.jasatambatbaru.kadeAwal;
		datatambat.kadeAkhir = $scope.jasatambatbaru.kadeAkhir;
		datatambat.namaLokasi = $scope.jasatambat.namaDermaga;
		datatambat.kodeLokasi = $scope.jasatambat.kodeDermaga;
		var tglTambatMskVal = $filter('date')($scope.jasatambatbaru.tglMulaiTambatBaru, 'yyyy-MM-dd');
		var jamTambatMskVal = document.getElementById("jamMulaiTambatValBaru").value;
		datatambat.tglMulai = tglTambatMskVal + 'T' + jamTambatMskVal;
		var tglTambatSlsVal = $filter('date')($scope.jasatambatbaru.tglSelesaiTambatBaru, 'yyyy-MM-dd');
		var jamTambatSlsVal = document.getElementById("jamSelesaiTambatValBaru").value;
		datatambat.tglSelesai = tglTambatSlsVal + 'T' + jamTambatSlsVal;
		datatambat.flagSuratPerintah = 1;
		datatambat.status = 2;
		datatambat.flagRampdoor = '0';

		var dataInduk = datatambat;
		var keteranganGeser = $scope.jasatambatbaru.keteranganGeser;
		// start Validasi Tgl & Jam Mulai harus melebihi Tgl & Jam Selesai
		var parseTglMulai = Date.parse(datatambat.tglMulai);
		var parseTglSelesai = Date.parse(datatambat.tglSelesai);
		if(parseTglMulai>=parseTglSelesai){
			$scope.showAlertTime = true;
			$scope.showMessageTime = "Waktu Selesai harus melebihi Waktu Mulai";
			return false;
		}
	
		PermohonanMultiDetail.save({noPpk1 : $scope.jasatambat.noPpk1}, {}, function(response){
			datatambat.detailPmhId = response.id;
			datatambat.urutanPermohonan = response.urutanPermohonan;
			datatambat.statusPelaksanaan = 5;
			var formData = new FormData();
			formData.append('pmhTambat', new Blob([JSON.stringify(datatambat)], { type: "application/json" }));			
			/*simpan pmh*/
			PermohonanTambat.save(formData, function(responsetambat) {
				if(responsetambat.status != '500'){
					responsetambat.status = 2;
					responsetambat.statusPelaksanaan = 5;
					responsetambat.isVisible = true;
					/*simpan ptp*/
					PenetapanTambat.save(responsetambat,function(responseptptambat){
						$scope.jasatambat.tglSelesai = responseptptambat.tglMulai;
						$scope.jasatambat.statusTambat = '3';
						$scope.jasatambat.statusGeser = true;
						$scope.jasatambat.kodeLokasi = $scope.jasatambat.kodeDermaga;
						$scope.jasatambat.namaLokasi = $scope.jasatambat.namaDermaga;
						$scope.jasatambat.tglMulai = $scope.jasatambat.mulai;
						$scope.jasatambat.posisiKapal = '1';
						$scope.jasatambat.flagRampdoor =  '0';	
						
						PenetapanTambatEdit.update({id:$scope.jasatambat.noPpkJasa},$scope.jasatambat, function(responseupdateptp){
							if(responseupdateptp.status != '500'){
								console.log('Berhasil update ppk jasa '+ $scope.jasatambat.noPpkJasa +'menjadi jasa geser');
							}else{
								console.log('Gagal update ppk jasa '+ $scope.jasatambat.noPpkJasa +'menjadi jasa geser');
							}
						});
						/*konfirmasi ptp ppkjasa baru*/
						ConfirmedPenetapan.update({ppk1:$scope.jasatambat.noPpk1,urutan:datatambat.urutanPermohonan}, {},function(responseCOnfirm){
							console.log('response konfirmasi ptp geser '+responseCOnfirm);
						});
						$scope.showLoad = false;
						/*update realisasi ppk jasa lama*/						
						RealisasiTambatEdit.update({noPpkJasa: $scope.jasatambat.noPpkJasa}, $scope.jasatambat,function(responseupdaterea){
							if(responseupdaterea.status != '500'){
								console.log('Berhasil update realisasi ppk jasa '+ $scope.jasatambat.noPpkJasa );
							}else{
								console.log('Gagal update ppk jasa '+ $scope.jasatambat.noPpkJasa);
							}
							dataInduk.noPpkJasa = responseptptambat.noPpkJasa;
							dataInduk.kodeKapal = $scope.jasatambat.kodeKapal;
							dataInduk.namaKapal = $scope.jasatambat.namaKapal;

							var i = 0;
							if($scope.alasanGeser == 1){
								if($scope.kapalPengganti.length > 0){
									for (i = 0; i < $scope.kapalPengganti.length; i++) {
										$scope.addKapalPengganti($scope.kapalPengganti[i],dataInduk);
									}								
								}								
							}

							if($scope.alasanGeser == 0){
								$scope.addKeteranganKapal(keteranganGeser,dataInduk);
							}							

							$scope.$watch('i',function(newVal, oldVal){ 
								if(i == $scope.kapalPengganti.length){
									$('#infoKapalSandar').modal('hide');
									$scope.getKapalRek();
									$scope.statusInfo = true;
									$scope.resetGeser();
								}
							})
						});
		
					})
				}
			})
		})
	};

/*kapal geser preview*/
$scope.previewGeserKapal = function(x){
	$scope.statusInfo = false;
	$scope.statusPreview = true;
	$scope.jasatambat = x;
	KapalGeserGet.get({noPpkJasaInduk:x.noPpkJasa},function(r){
		if(r.totalElements > 0){
			$scope.kapalPenggantiView = r.content;
			if(r.content[0].keterangan != null){
				$scope.kapalPenggantiView = {};
				$scope.kapalPenggantiView.keterangan = r.content[0].keterangan;
				$scope.kapalPenggantiView.status = 0;
				$scope.statusLain = true;
			}else{
				$scope.kapalPenggantiView = r.content;
				$scope.statusLain = false;
			}
		}else{
			$scope.kapalPenggantiView = [];
			$scope.statusLain = false;
		}
	})
}

/*ambil parameter kota meeting untuk report*/
ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
    $scope.kota_meeting = response.content[0].value;
});

ParamsCabangList.get({nama : 'PJ_PPSA'}, function(response){
	if(response.content.length > 0){
		$scope.pjPpsa = response.content[0].value;
	}else{
		$scope.pjPpsa = '';
	} 
});
/*cetak spg*/
$scope.cetakSpg = function(x){
	var dataCetak = x;
	var dataInduk = [[
			x.namaKapal,
			'Tgl '+$filter('date')(x.mulai,'dd/MM/yyyy'),
			'Jam '+$filter('date')(x.mulai,'HH:mm'),
			'Digeser pada posisi ',
			x.kadeAwal.toString()+' - '+x.kadeAkhir.toString()
		]];
	var m = 0;
	var dataPengganti = [];
    var createLL = function(data,m){
        var tabelRow = [
            m.toString()+'. ',
            data.namaKapalPengganti,
            'Sandar pada posisi',
            data.ptpTambat.kadeAwal.toString()+' - '+ data.ptpTambat.kadeAkhir.toString(),
            'Tgl '+$filter('date')(data.ptpTambat.tglMulai,'dd/MM/yyyy'),
            'Jam '+$filter('date')(data.ptpTambat.tglMulai,'HH:mm')           
        ];                
        return tabelRow;
    }
    if($scope.kapalPenggantiView.status == undefined){
	    $scope.kapalPenggantiView.forEach(function(ll, index) {
	        m++
	        var tabelRow = createLL(ll,m);                
	        dataPengganti.push(tabelRow);
	        var status = undefined;
	    })   	
    }else{
    	var keterangan = $scope.kapalPenggantiView.keterangan;
    	var status = $scope.kapalPenggantiView.status;
    }


    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'potrait',
        pageMargins: [40, 120, 40, 40],
        styles: {
                    dataTable: {
                    	bold: true,
                    	fontSize : 11,
                        color: '#000',
                        margin: [20, 0, 0, 0]
                    },
                    footer1: {
                        alignment: 'center',
                        margin: [0, 10, 0, 0]
                    },
                    footer2: {
                        alignment: 'center',
                        margin: [0, 50, 0, 0]
                    },
                    footer3: {
                        color: '#000',
                        fontSize : 11,
                        alignment: 'center'
                    },
                    footer4: {
                        color: '#000',
                        fontSize : 11,
                        alignment: 'center',
                        margin: [0, 0, 0, 0]
                    }
        		},
        content:[{
        			alignment: 'left',
        			fontSize : 11,
                    columns: [
                        {},
                        {},
                        { text : '' , width : 30},
                        { text : 'Kepada', width : 200}
                    ]
        		},
        		{
        			alignment: 'left',
        			fontSize : 11,
                    columns: [
                        {}
                    ]
        		},
        		{
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                        { text : 'Perihal : ', width : 60},
                        { text : 'PERGESERAN KAPAL ', width : 200,  margin: [0, 0, 30, 0]},
                        {},
                        {}
                    ]
                },
                {
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                    	{ text : '', width : 60},
                     	{ text : 'PANGKALAN '+dataCetak.namaDermaga, width : 230,  margin: [0, 0, 50, 0]},
                        { text : 'YTH.', width : 30},
                        { text : dataCetak.namaAgen, width : 200}
                    ]
                },
                {
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                     	{ text : ''},
                        { text : ''},
                        { text : '', width : 30},
                        { text : 'Di \n',width : 200}
                    ]
                },
                {
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                     	{ text : ''},
                        { text : ''},
                        { text : '', width : 30},
                        { text : $scope.kota_meeting, width : 200}
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer2' }
                    ]
                },
               	{
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                     	{ text :'1.'+ (status != undefined ?  keterangan :'Untuk memberi kesempatan sandar kapal-kapal tersebut dibawah ini:')}
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer1' }
                    ]
                },
				{
					style: 'dataTable',					
					table: {
						body: [	].concat(status == undefined ? dataPengganti : '')
					},
					layout: 'noBorders'
				},
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer2' }
                    ]
                },
                {
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                     	{ text : '2. Diperintahkan agar kapal-kapal tersebut dibawah ini:'}
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer1' }
                    ]
                },
				{
					style: 'dataTable',					
					table: {
						body: [	].concat(dataInduk)
					},
					layout: 'noBorders'
				},
                {
                    alignment: 'justify',
                    columns: [ 
                        { text: '\n', style: 'footer2' }
                    ]
                },
                {
                    alignment: 'left',
                    fontSize : 11,
                    columns: [
                     	{ text : '3. Demikian atas perhatian dan pelaksanaannya diucapkan terima kasih.'}
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer2' }
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        {},
                        { text: $scope.kota_meeting+', '+ $filter('date')(new Date(),'dd/MM/yyyy'), style: 'footer4'}
                    ]
                },
                {
                    alignment: 'justify',                    
                    columns: [
                        {},
                        { text: 'PENANGGUNG JAWAB PPSA', style: 'footer4'}
                    ]
                },
                {
                    alignment: 'justify',
                    columns: [
                        { text: '\n', style: 'footer3' }
                    ]
                },
                {
                    alignment: 'justify',                    
                    columns: [
                        {},
                        { text: $scope.pjPpsa, style: 'footer4'}
                    ]
                }
                ]
   	};
   	pdfMake.createPdf(pdfContent).download('SPG_'+x.namaKapal+'_'+$filter('date')(new Date(),'dd/MM/yyyy')+'.pdf');
}

/*perpanjangan / perpendekan*/
$scope.getHistoryRea = function(jasa, x, dataKapalRea){
	HistoryRevisiTambat.get({noPpkJasa:jasa},function(y){
		if(y.length>0){
			for(var i=0;i<y.length;i++){
				if(y[i].jenisRevisi == 6 || y[i].jenisRevisi == 7){
					$scope.historyrea.push(y[i]);
					break;
				}
			}
			$scope.revRea = $scope.historyrea[0];
			$scope.revJamSelesai = $filter("date")($scope.historyrea[0].tglSelesai,"HH:mm");
			$scope.revTglSelesai = $filter("date")($scope.historyrea[0].tglSelesai,"dd-MM-yyyy");
		}else{
			$scope.historyrea = [];
		}
	});
}

$scope.ubahTglBtn = function(a){
	$scope.ubahTgl = a;
}

$scope.revisiRea = function(a){
	$scope.resetGeser();
	$scope.getHistoryRea(a.noPpkJasa);
	$scope.statusRevisiRea = true;
	$scope.statusInfo = false;
	$scope.reaTambat = a;
	$scope.revRea.namaKapal = a.namaKapal;
}

$scope.submitRevisiRea = function(){
	var a={};
	a.noPpk1 = $scope.reaTambat.noPpk1;
	a.noPpkJasa = $scope.revRea.noPpkJasa;
	a.kodeLokasi = $scope.revRea.kodeLokasi;
	a.namaLokasi = $scope.revRea.namaLokasi;
	a.tglMulai = $scope.revRea.tglMulai;
	a.kadeAwal = $scope.revRea.kadeAwal;
	a.kadeAkhir = $scope.revRea.kadeAkhir;
	if(typeof $scope.revTglSelesai === 'object'){
		if($scope.revTglSelesai.toString().indexOf('-') === -1){
			a.tglSelesai = $filter('date')($scope.revTglSelesai,'yyyy-MM-dd')+'T'+$scope.revJamSelesai;
		}else{
			a.tglSelesai = $filter('date')($scope.revTglSelesai,'yyyy-MM-dd')+'T'+$scope.revJamSelesai;
		}
	}else{
		var formatTglSelesai = $scope.revTglSelesai.split('-');
		var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
		a.tglSelesai= $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'T'+$scope.revJamSelesai;
	}

	PenetapanTambatEdit.update({id:a.noPpkJasa},a,function(b){
		if(b.status != "500"){
			$scope.ubahTglBtn(true);
			$scope.txtPerpanjangan = "Update data perpanjangan berhasil.\nSilakan kirim ulang RPKRO ";
			var c = {
				kodeDermaga:$scope.reaTambat.kodeDermaga,
				panjangKapal:$scope.reaTambat.panjangKapal,
				noPpk1:$scope.reaTambat.noPpk1,
				noPpkJasa:$scope.reaTambat.noPpkJasa,
				tglMulai:$filter("date")(new Date($scope.revRea.tglMulai),"yyyy-MM-dd_HH:mm"),
				tglSelesai:$filter("date")(new Date(a.tglSelesai),"yyyy-MM-dd_HH:mm")
			};
			var d="kodeDermaga="+c.kodeDermaga+"&noPpk1="+c.noPpk1+"&noPpkJasa="+c.noPpkJasa+"&panjangKapal="+c.panjangKapal+"&tglMulai="+c.tglMulai+"&tglSelesai="+c.tglSelesai;
			$http.put(API_PATH+"hasil_meeting/perubahan_penetapan?"+d)
			.success(function(x){
				if(x == true){
					$scope.statusPerpanjangan = true;
					$scope.alertClass = "alert-success";
					$scope.iconClass="pficon-ok";
					$scope.btnClassRpkro="btn-danger";
					console.log("No.PPK1 "+$scope.reaTambat.noPpk1+" dengan No.PPK Jasa "+$scope.reaTambat.noPpkJasa+" memperbaharui hasil meeting tambatan.");
				}else{
					$scope.statusPerpanjangan = true;
					$scope.alertClass="alert-danger";
					$scope.iconClass="pficon-error-circle-o";
					$scope.txtPerpanjangan="Update data perpanjangan tidak berhasil.\n"+b.description
				}
			})
		}else{
			$scope.statusPerpanjangan = true;
			$scope.alertClass = "alert-danger";
			$scope.iconClass = "pficon-error-circle-o";
			$scope.txtPerpanjangan="Update data perpanjangan tidak berhasil.\n"+b.description;		
		}
	},function(){
		$scope.statusPerpanjangan = true;
		$scope.alertClass = "alert-danger";
		$scope.iconClass = "pficon-error-circle-o";
		$scope.txtPerpanjangan="Update data perpanjangan tidak berhasil.";
	})
}

$scope.resendRpkro = function(){
	var a;
	var b = $('#jamSelesaiRev').val();
	if(typeof $scope.revTglSelesai === 'object'){
		if($scope.revTglSelesai.toString().indexOf('-') === -1){
			a = $filter('date')($scope.revTglSelesai,'yyyy-MM-dd')+'_'+b;
		}else{
			a = $filter('date')($scope.revTglSelesai,'yyyy-MM-dd')+'_'+b;
		}
	}else{
		var formatTglSelesai = $scope.revTglSelesai.split('-');
		var newFormatTglSelesai = formatTglSelesai[1]+'-'+formatTglSelesai[0]+'-'+formatTglSelesai[2];
		a = $filter('date')(new Date(newFormatTglSelesai),'yyyy-MM-dd')+'_'+b;
	}	

	var d = {
		kodeDermaga:$scope.reaTambat.kodeDermaga,
		panjangKapal:$scope.reaTambat.panjangKapal,
		noPpk1:$scope.reaTambat.noPpk1,
		noPpkJasa:$scope.reaTambat.noPpkJasa,
		tglMulai:$filter("date")(new Date($scope.revRea.tglMulai),"yyyy-MM-dd_HH:mm"),
		tglSelesai:a
	};

	var e = "kodeDermaga="+d.kodeDermaga+"&noPpk1="+d.noPpk1+"&noPpkJasa="+d.noPpkJasa+"&panjangKapal="+d.panjangKapal+"&tglMulai="+d.tglMulai+"&tglSelesai="+a;
	$http.put(API_PATH+"hasil_meeting/perubahan_penetapan?"+e).success(function(x){
		if(x == true){
			var b = {};
			b.noPpk1 = $scope.reaTambat.noPpk1;
			b.noPpkJasa = $scope.reaTambat.noPpkJasa;
			b.isRpkro = true;

			UpdateHasilMeeting.update(b,function(x){
				if(x.errorCode == null){
					$("#infoKapalSandar").modal("hide");
					$scope.showLoading = false;
					$scope.showSuccess = true;
					$("#message").html("RPKRO No PPK Jasa "+$scope.reaTambat.noPpkJasa+" telah dikirim ulang.");
					$scope.resetGeser();
					$timeout(function(){
						$scope.showSuccess=!1
					},3000)					
				}else{
					$scope.statusPerpanjangan = true;
					$scope.alertClass = "alert-danger";
					$scope.iconClass = "pficon-error-circle-o";
					$scope.txtPerpanjangan = 'Tidak dapat mengirim ulang RPKRO. \n'+x.errorMessage;
				}
			})
		}else{
			$scope.statusPerpanjangan = true;
			$scope.alertClass = "alert-danger";
			$scope.iconClass = "pficon-error-circle-o";
			$scope.txtPerpanjangan = "Kirim ulang RPKRO tidak berhasil. silakan dicoba lagi melalui monitoring RPKRO";
		}
	})
}

$scope.$watch('tglPrameeting',function(newVal, oldVal){
	if(newVal != oldVal){
		$scope.perencanaanByTgl();
	}
})
$scope.perencanaanByTgl = function(){ 
	var tglmeeting = moment($scope.tglPrameeting, 'DD-MM-YYYY').format('YYYY-MM-DD');
	$location.path('/perencanaan/'+kdDermaga+'/'+tglmeeting);
};

}]);
