'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanCtrl
 * @description
 * # PerencanaanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaanTambatPublicCtrl',['$scope','$rootScope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','$window','Notification','LoadingScreen','PublicPerencanaanNew','PublicListKapalRekomendasi','PublicPerencanaanGet','PublicInformasiKegiatanKapal','socket',
  	function ($scope,$rootScope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,$window,Notification,LoadingScreen,PublicPerencanaanNew,PublicListKapalRekomendasi,PublicPerencanaanGet,PublicInformasiKegiatanKapal,socket) {
  	socket.on('testing', function(item) {
		console.log("test")
	});
	// LoadingScreen.show();
	var canvas;
	var urlKapalkanan = '../images/container-kanan.png';
	var urlKapalkiri = '../images/container-kiri.png';
	var kdDermaga = $routeParams.kodeDermaga;
	var tglParams =  $routeParams.tgl;
	var kodeCabangParams =  $routeParams.kodeCabang;
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
   	$scope.loadPerencanaan = true;

	PublicPerencanaanNew.get({
		kdDermaga 	: kdDermaga,
		kodeCabang  : kodeCabangParams
	},function(response){
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

	//get rekomendasi kapal
	PublicListKapalRekomendasi.get({
		kdDermaga 		: kdDermaga,
		tglPerencanaan 	: tglParams,
		kodeCabang  	: kodeCabangParams
	},function(response){
		$scope.loadPerencanaan = false;
		
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
			});

			//memisahkan kapal perencanaan
			$scope.dataKapal.forEach(function(item){
				if (item.kapalSandar == false  && item.kodeError == null) {
				   $scope.dataKapalRek.push(item);
				}
				if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan') {
				  	$scope.dataKapalRek.push(item);
				}
			});
		}
		// LoadingScreen.hide();

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
		$scope.updateDatakapalSandar = function(){
			var heightOffset = $scope.getHeightOffset();

			for(var i=0;i<$scope.kapalSandar.length;i++){
				var jenis = $scope.kapalSandar[i].jenisKapal;
				var hadap = ($scope.kapalSandar[i].hadapKapal == null ? 'kanan' : $scope.kapalSandar[i].hadapKapal);
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

						if(hadap == 'kiri'){
							 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
						}else{
							 $scope.kapalSandar[i].url = '../images_unbuild/KPLCURAHKR.png';
						}   

				}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/CONTAINERLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/CONTAINER.png';
						}

				}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KP.png';
						}

				}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCAIRBBM.png';
						}

				}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGOLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCARGO.png';
						}

				}else if(jenis === 'KPLCRUISE'){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISELEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLCRUISE.png';
						}

				}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLPNMPANG.png';
						}

				}else if(jenis === 'KPLRORO'){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLROROLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

						if(hadap == 'kiri'){
							$scope.kapalSandar[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
						}else{
							$scope.kapalSandar[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else{
					
						if(hadap == 'kiri'){
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
	   $scope.updatePosisi =  function (){ 
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

						if(hadap == 'kiri'){
							 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
						}else{
							 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKR.png';
						}   

				}else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINERLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/CONTAINER.png';
						}

				}else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
						}

				}else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBM.png';
						}

				}else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGOLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGO.png';
						}

				}else if(jenis === 'KPLCRUISE'){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISELEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISE.png';
						}

				}else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANG.png';
						}

				}else if(jenis === 'KPLRORO'){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLROROLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){

						if(hadap == 'kiri'){
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
						}else{
							$scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
						}

				}else{
					
						if(hadap == 'kiri'){
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
					var pRight = c-40;
				}else if($scope.dataKapalRek[i].panjangKapal>50<100){
					 var pRight = c-70;
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
					if($scope.postKapal.kapalSandar == false){
						$scope.forkapalSandar = false;
						$scope.forkapalRekomendasi = true;
					}else{
						$scope.forkapalSandar = true;
						$scope.forkapalRekomendasi = false;
					}
					
				}			
			}

			//Check data sdh pernah diedit, untuk ditampilkan pada form
			PublicPerencanaanGet.get({
				noPpkJasa 	: $scope.postKapal.noPpkJasa,
				kodeCabang  : kodeCabangParams
			}, function(res){ 
				/*LoadingScreen.hide();*/
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
					for (var i = 0; i < $scope.kapalSandar.length; i++) {
						if($scope.postKapal.kodeKapalTender == $scope.kapalSandar[i].kodeKapal){
							$scope.selectedVessel = $scope.kapalSandar[i];
						}
					}
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
				// $('#editKapalModal ').modal('show');
			}
		}

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

		var canvas = new fabric.Canvas('canvas',{width: 1300, height: 500, selection: false});
		var canvasPrint = new fabric.Canvas('canvas-print',{width: 1300, height: 500, selection: false});

		canvas.observe('mouse:down', function(){ });
		
		$timeout(function() {		
			/*LoadingScreen.hide();*/
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
		var line = new fabric.Line([0, 400+heightOffset, kadeMeter*skala, 400+heightOffset], {
			stroke: 'red'
		});
		canvas.add(line);
		canvasPrint.add(line);
		
		if(isKanan == true){			
			var i =canvasWidth;
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
				var textKademeter = i/skala;
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
		}
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
						}/*else if(objRef.statusLineKapal === "Penetapan"){
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
							var captionKapal = new fabric.Text(namaKapal,{ 
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
						}	*/					
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
						 }/*else if(objRef.statusLineKapal === "Penetapan"){
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
							var captionKapal = new fabric.Text(namaKapal,{ 
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
						}*/						
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
		   
			   /*LoadingScreen.hide();*/
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

	$scope.editDetailKapal = function(data){
		// console.log(data);
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

	/*$scope.updatePersiapanPrameeting = function(rekomendasi){
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
	}*/

	$scope.infoKapalRek = function(id){
		$scope.infoKapalSandarStatus = true; 
		$scope.dataKapalRek.forEach(function(item){
			if (item.id == id) { 
				$scope.showLoadingTos = true;			  	
			  	PublicInformasiKegiatanKapal.get({
					noPpk1  	: item.noPpk1,
					noPpkJasa   : item.noPpkJasa,
					kodeCabang  : kodeCabangParams
				},function(response){
					/*LoadingScreen.hide();*/
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
			  	PublicInformasiKegiatanKapal.get({
					noPpk1  	: item.noPpk1,
					noPpkJasa 	: item.noPpkJasa,
					kodeCabang  : kodeCabangParams
				},function(response){
					/*LoadingScreen.hide();*/
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

	$rootScope.$on('eventFromPerencanaan', function (event, item) {
		console.log("kesini");
		console.log(item);
        $scope.getKapalRek();
    });
   
	$scope.getKapalRek = function(x){
		$scope.showLoading = true;
		PublicListKapalRekomendasi.get({
			kdDermaga 		: kdDermaga,
			tglPerencanaan 	: tglParams,
			kodeCabang  	: kodeCabangParams
		},function(response){
			/*LoadingScreen.hide();*/
			if (response.length >0){				
				$scope.kapalSandar = [];
				$scope.dataKapalRek = [];
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
				});

				//memisahkan kapal perencanaan
				$scope.dataKapal.forEach(function(item){
					if (item.kapalSandar == false  && item.kodeError == null) {
					   $scope.dataKapalRek.push(item);
					}
					if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan') {
					  	$scope.dataKapalRek.push(item);
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
				$scope.showLoading = false;
				$scope.showSuccessSave = true;
				$timeout(function() {
		            $scope.showSuccessSave = false;
		        }, 2000);
			}
		})
	}

	$scope.batalEditPtp = function(){
		$scope.infoKapalSandarStatus = true;
	}

}]);
