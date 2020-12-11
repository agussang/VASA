'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanPenetapanCtrl
 * @description
 * # PerencanaanPenetapanCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PerencanaanPenetapanCtrl',['$scope','$rootScope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','$window','$controller','Notification','LoadingScreen','$modal','PerencanaanNew','ListKapalHasilMeeting','SharedVariable','MdmDermagaSearchByKode','MdmDermagaPerJasa','ListKapalTerminalLain','ClusterGetAll','ListKapalCluster','PerencanaanSave','PenetapanSave','KapalPrioritas','KademeterList','AddClusteringKapal','KapalTlList','DeleteKapalHasilMeeting', function ($scope,$rootScope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,$window,$controller,Notification,LoadingScreen,$modal,PerencanaanNew,ListKapalHasilMeeting,SharedVariable,MdmDermagaSearchByKode,MdmDermagaPerJasa,ListKapalTerminalLain,ClusterGetAll,ListKapalCluster,PerencanaanSave,PenetapanSave,KapalPrioritas,KademeterList,AddClusteringKapal,KapalTlList,DeleteKapalHasilMeeting) {
    angular.extend(this, $controller('MqttCtrl', {$scope: $scope})); 
    LoadingScreen.show();
    var canvas;
    var urlKapalkanan = '../images/container-kanan.png';
    var urlKapalkiri = '../images/container-kiri.png';
    var kdDermaga = $routeParams.kodeDermaga;
    var tglParams =  $routeParams.tgl;
    var skala = null;
    $scope.tanggalPrameeting = $filter('date')(tglParams, 'dd-MM-yyyy');
    $scope.dataKapal  = {};
    $scope.postKapal = {};
    $scope.dataGlobal = [];
    $scope.showEditKapal = false;
    $scope.showAction = true;
    $scope.hadapKapal  = [{value:'kanan', name:'kanan'},{value:'kiri', name:'kiri'}];
    $scope.tglMasuk = new Date(tglParams);
    $scope.tglSelesai = new Date();
    $scope.tglMeetingPrint = $filter('date')($scope.tglSelesai, 'dd-MM-yyyy');
    $scope.jamMasuk = moment().format('HH:mm');
    $scope.jamKeluar = moment().format('HH:mm');
    $scope.optionScale = [{name:'1:1', value:1},{name:'1:2',value:2},{name:'1:4',value:4}];
    $scope.updateScale = $scope.optionScale[0];
    $scope.isKanan = true;
    $scope.locationPath = 'meeting/report/'+kdDermaga+'/'+tglParams;
    $scope.tambahKapalNew = 'hasilmeeting/tambahkapalmeeting/'+kdDermaga+'/'+tglParams;
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

    $scope.options = {
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        orientation:'bottom'
    };
    // KapalPrioritas.get({kdDermaga:kdDermaga,tglPerencanaan:tglParams},function(response){
    //     console.log(response);
    // });

    PerencanaanNew.get({kdDermaga:kdDermaga},function(response){
        // console.log(response);
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

    //get rekomendasi kapal
    ListKapalHasilMeeting.get({kdDermaga:kdDermaga,tglPerencanaan:tglParams},function(response){
        // console.log(response);
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
                if (item.kapalSandar == true && item.kodeError == null) {
                  $scope.kapalSandar.push(item);
                }
            });

            //memisahkan kapal perencanaan
            $scope.dataKapal.forEach(function(item){
                if (item.kapalSandar == false  && item.kodeError == null) {
                	$scope.tglMeeting = $filter('date')(item.tglMeeting, 'dd-MM-yyyy');
                   	$scope.dataKapalRek.push(item);
                }
            });
        }
       
        

        //update data kapal sandar
        $scope.updateDatakapalSandar = function(){
            for(var i=0;i<$scope.kapalSandar.length;i++){
               // $scope.kapalSandar[i].url = urlKapalkanan;
               var jenis = $scope.kapalSandar[i].jenisKapal;
               $scope.kapalSandar[i].url = '../images_unbuild/'+jenis+'.png';
               if($scope.kapalSandar[i].statusLineKapal === "Realisasi"){
                    $scope.kapalSandar[i].Top=330-($scope.kapalSandar[i].tingkatan*60);
               }else if($scope.kapalSandar[i].statusLineKapal === "Penetapan"){
                    $scope.kapalSandar[i].Top=270-($scope.kapalSandar[i].tingkatan*60);
               }
                // $scope.dataKapalRek[i].id = i+1;
                var a = $scope.kapalSandar[i].panjangKapal;
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
                
            }
        }

       //update posisi kapal perencanaan
       // $scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
       $scope.updatePosisi =  function (){
            for(var i=0;i<$scope.dataKapalRek.length;i++){
                var a = $scope.dataKapalRek[i].panjangKapal;
                var b = (15/100)*a;
                var c = parseInt(b.toFixed());
                 var jenis = $scope.dataKapalRek[i].jenisKapal;
                 var hadap = $scope.dataKapalRek[i].hadapKapal;
                $scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwalKeseluruhan + c;
                $scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + $scope.dataKapalRek[i].panjangKapal;

                if($scope.dataKapalRek[i].hadapKapal == 'kanan'){
                    // $scope.dataKapalRek[i].url = urlKapalkanan;
                    $scope.dataKapalRek[i].url = '../images_unbuild/'+jenis+'.png';

                }else if($scope.dataKapalRek[i].hadapKapal == 'kiri'){
                    // $scope.dataKapalRek[i].url = urlKapalkiri;
                    $scope.dataKapalRek[i].url = '../images_unbuild/'+jenis+'.png';

                }else{
                    // $scope.dataKapalRek[i].url = urlKapalkanan;
                    $scope.dataKapalRek[i].url = '../images_unbuild/'+jenis+'.png';
                    
                   
                }
                $scope.dataKapalRek[i].id = i+1;
                
            }
        }

        $scope.configScale = function(){
            for(var i=0;i<$scope.dataKapalRek.length;i++){
                var a = $scope.dataKapalRek[i].panjangKapal;
                var b = $scope.dataKapalRek[i].posisiAkhir;
               var c = canvasWidth - ($scope.dataKapalRek[i].posisiDepan*skala);

                var pRight =  c-($scope.dataKapalRek[i].panjangKapal*skala);
                if($scope.dataKapalRek[i].panjangKapal<100){
                    var pRight = c-40;
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
                    
                    var kondisi11= ($scope.dataKapalRek[i].kadeAwal>=$scope.dataKapalRek[j].kadeAwal);
                    var kondisi12= ($scope.dataKapalRek[i].kadeAwal<=$scope.dataKapalRek[j].kadeAkhir);                    
                    var kondisi21= ($scope.dataKapalRek[i].kadeAkhir>=$scope.dataKapalRek[j].kadeAwal);
                    var kondisi22= ($scope.dataKapalRek[i].kadeAkhir<=$scope.dataKapalRek[j].kadeAkhir);
                    
                    if( (kondisi11 && kondisi12) || (kondisi21 && kondisi22) ){
                        if($scope.dataKapalRek[j].tingkatan > maxAntrian){
                            maxAntrian=$scope.dataKapalRek[j].tingkatan;
                            // console.log(maxAntrian);
                        }
                    }                    
                }
                $scope.dataKapalRek[i].tingkatan=maxAntrian+1;
                // console.log($scope.dataKapalRek[i].tingkatan);
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
            for(var i=0;i<$scope.dataKapalRek.length;i++){
                $scope.dataKapalRek[i].Top=260-($scope.dataKapalRek[i].tingkatan*60);
            }
        }

        //update clustering
        $scope.updateClusteringId = function(){
            var clusteringId = null;
            for(var i=0;i<$scope.dataKapalRek.length;i++){
                if($scope.dataKapalRek[i].kadeAwal < $scope.dataKapalRek[i].kadeClusteringAwal || $scope.dataKapalRek[i].kadeAkhir > $scope.dataKapalRek[i].kadeClusteringAkhir ){

                    // console.log($scope.dataKapalRek[i].namaKapal);
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
            $scope.updatePosisi();
            $scope.configScale();
            $scope.updateAntrian();
            $scope.updateWaktuTambat();
            $scope.updateTop();
            $scope.updateClusteringId(); 
        }
       
        // console.log( $scope.dataKapalRek);
        dataKapalRekomendasi = $scope.dataKapalRek;


        //add kapal
        $scope.addKapal = function(){

           
            var idKapalTl = $scope.postKapal.id,
                dermagaLength=defGlobal.panjangDermaga;
            var kapalTopost = {};
            if($scope.postKapal.posisiDepan >= dermagaLength){
                $scope.showAlert = true;
                $scope.showMessage = "Kademeter Melebihi Panjang Dermaga";
                $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                return;
            }
            var kapalTopost = {};
            var a = $scope.postKapal.panjangKapal;
            var b = (15/100)*a;
            if($scope.postKapal.direct == 1){
                var c = ($scope.postKapal.posisiDepan - b) - a;
            }else{
                var c = $scope.postKapal.posisiDepan + b;
            };
            // var c = $scope.postKapal.posisiDepan + b;
            var cPost = parseInt(c.toFixed());
            var d = b + $scope.postKapal.panjangKapal+$scope.postKapal.posisiDepan;
            var dPost = parseInt(d.toFixed());
            var e = c+a+b;
            var ePost = parseInt(e.toFixed());
            var tglMulai = $filter('date')($scope.postKapal.tglMasuk, 'yyyy-MM-dd');
            var jamMulai = $scope.jamMasuk;
            var tglSelesai = $filter('date')($scope.postKapal.tglSelesai, 'yyyy-MM-dd');
            var jamSelesai = $scope.jamKeluar;
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
            if($scope.postKapal.direct == 1){
                 kapalTopost.kadeAwalKeseluruhan = cPost;
            }else{
                 kapalTopost.kadeAwalKeseluruhan = $scope.postKapal.posisiDepan;
            };
            // kapalTopost.kadeAwalKeseluruhan = $scope.postKapal.posisiDepan;
            kapalTopost.kadeAkhirKeseluruhan = ePost;
            kapalTopost.panjangKapal = $scope.postKapal.panjangKapal;
            kapalTopost.noPpk1 = $scope.postKapal.noPpk1;
            kapalTopost.noPpkJasa = $scope.postKapal.noPpkJasa;
            kapalTopost.kadeAwal = cPost;
            kapalTopost.kadeAkhir = dPost;
            kapalTopost.namaKapal = $scope.postKapal.namaKapal
            kapalTopost.hadapKapal = $scope.postKapal.hadap;
            kapalTopost.jamMasuk = $scope.jamMasuk;
            kapalTopost.jamKeluar = $scope.jamKeluar;
            kapalTopost.mulai = $scope.postKapal.waktuMulai;
            kapalTopost.selesai = $scope.postKapal.waktuSelesai;
            kapalTopost.kadeClusteringAwal = $scope.postKapal.kadeClusteringAwal;
            kapalTopost.kadeClusteringAkhir = $scope.postKapal.kadeClusteringAkhir;
            kapalTopost.kapalSandar = $scope.postKapal.kapalSandar;
            kapalTopost.tl = $scope.postKapal.tl;
            var parseTglMulai = Date.parse(kapalTopost.mulai);
            var parseTglSelesai = Date.parse(kapalTopost.selesai);

            if(kapalTopost.hadapKapal == 1){
                kapalTopost.url = urlKapalkanan;
            }else{
                kapalTopost.url = urlKapalkiri;
            }

            if(kapalTopost.kadeAwal < kapalTopost.kadeClusteringAwal || kapalTopost.kadeAkhir > kapalTopost.kadeClusteringAkhir){
                $scope.showAlert = true;
                $scope.showMessage = "Kademeter Melebihi Cluster Kapal ("+$scope.postKapal.kadeClusteringAwal+" s/d "+$scope.postKapal.kadeClusteringAkhir+")";
                $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                return;
            }
            if(parseTglMulai > parseTglSelesai){
                $scope.showAlert = true;
                $scope.showMessage = "Waktu Selesai harus lebih dari Waktu Mulai";
                $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                return;
            }

            
            $scope.dataKapalRek.push(kapalTopost);
            if(kapalTopost.tl !== true){
                $scope.kapalTerminalLain.splice(idKapalTl,1);
                 $('#tambahKapalModal').modal('hide');
            }else if(kapalTopost.tl == true){
                $scope.KapalTl.splice(idKapalTl,1);
                 $('#tambahKapalTlModal').modal('hide');
            }
            
            $scope.showAlert = false;
            $scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
            $scope.updatePosisi();
            $scope.configScale();
            $scope.updateAntrian();
            $scope.updateWaktuTambat();
            $scope.updateTop();
            $scope.updateClusteringId();
            $scope.refreshCanvas(); 
            $scope.draw();
            
            // console.log($scope.dataKapalRek);
           
        }

        //edit kapal
        $scope.pushUpdateKapal = function(){
            $scope.kapalUpdate = {};
            var id = $scope.postKapal.id, 
                dermagaLength=defGlobal.panjangDermaga;
           
            if($scope.postKapal.kadeAwalKeseluruhan >= dermagaLength){
                $scope.showAlert = true;
                $scope.showMessage = "Kademeter Melebihi Panjang Dermaga";
                $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                return;
            }

            var dataEdit = $scope.dataKapalRek;
            for (var i = 0; i < dataEdit.length; i++) {
                if(dataEdit[i].id == id){
                    // console.log(dataEdit[i]);
                    $scope.kapalUpdate = dataEdit[i];
                    // $scope.indexSelected=i; 
                    var a = $scope.postKapal.panjangKapal;
                    var b = (15/100)*a;
                    if($scope.postKapal.direct == 1){
                        var c = ($scope.postKapal.kadeAwalKeseluruhan - b) - a;
                    }else{
                        var c = $scope.postKapal.kadeAwalKeseluruhan + b;
                    };
                    // var c = $scope.postKapal.kadeAwalKeseluruhan + b;
                    var cPost = parseInt(c.toFixed());
                    var d = c+a;
                    var dPost = parseInt(d.toFixed());
                    var e = c+a+b;
                    var ePost = parseInt(e.toFixed());
                    var tglMasuk = $filter('date')($scope.postKapal.tglMasuk, 'yyyy-MM-dd');
                    var tglSelesai = $filter('date')($scope.postKapal.tglSelesai, 'yyyy-MM-dd');
                    var staticTglMulai = $filter('date')(dataEdit[i].mulai, 'yyyy-MM-dd');
                    var jamMasuk = $scope.postKapal.jamMasuk;
                    var jamKeluar = $scope.postKapal.jamKeluar;
                    var waktuMulai = staticTglMulai+'T'+jamMasuk;
                    var waktuSelesai = tglSelesai+'T'+jamKeluar;
                    if(typeof $scope.postKapal.tglMasuk === 'object'){
                        if($scope.postKapal.tglMasuk.toString().indexOf('-') === -1){
                            $scope.postKapal.waktuMulai = $filter('date')($scope.postKapal.tglMasuk,'yyyy-MM-dd')+'T'+jamMasuk;
                        }
                    }else{
                        var formatTglMulai = $scope.postKapal.tglMasuk.split('-');
                        var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
                        $scope.postKapal.waktuMulai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamMasuk;
                    }
                    if(typeof $scope.postKapal.tglSelesai === 'object'){
                        if($scope.postKapal.tglSelesai.toString().indexOf('-') === -1){
                            $scope.postKapal.waktuSelesai = $filter('date')($scope.postKapal.tglSelesai,'yyyy-MM-dd')+'T'+jamKeluar;
                        }
                    }else{
                        var formatTglMulai = $scope.postKapal.tglSelesai.split('-');
                        var newFormatTglMulai = formatTglMulai[1]+'-'+formatTglMulai[0]+'-'+formatTglMulai[2];
                        $scope.postKapal.waktuSelesai = $filter('date')(new Date(newFormatTglMulai),'yyyy-MM-dd')+'T'+jamKeluar;
                    }
                    $scope.kapalUpdate.id = id;
                    $scope.kapalUpdate.kadeAwal = cPost;
                    $scope.kapalUpdate.kadeAkhir = dPost;
                    $scope.kapalUpdate.kadeAkhirKeseluruhan = ePost;
                    // $scope.kapalUpdate.mulai = waktuMulai;
                    $scope.kapalUpdate.mulai = $scope.postKapal.waktuMulai
                    $scope.kapalUpdate.selesai = $scope.postKapal.waktuSelesai;
                    var parseTglMulai = Date.parse($scope.kapalUpdate.mulai);
                    var parseTglSelesai = Date.parse($scope.kapalUpdate.selesai);
                    if($scope.postKapal.direct == 1){
                         $scope.kapalUpdate.kadeAwalKeseluruhan = cPost ;
                    }else{
                         $scope.kapalUpdate.kadeAwalKeseluruhan = $scope.postKapal.kadeAwalKeseluruhan;
                    };
                    // $scope.kapalUpdate.kadeAwalKeseluruhan = $scope.postKapal.kadeAwalKeseluruhan
                    // if($scope.kapalUpdate.kadeAwal < dataEdit[i].kadeClusteringAwal || $scope.kapalUpdate.kadeAkhir > dataEdit[i].kadeClusteringAkhir){
                    //     $scope.showAlert = true;
                    //     $scope.showMessage = "Kademeter Melebihi Cluster Kapal ("+dataEdit[i].kadeClusteringAwal+" s/d "+dataEdit[i].kadeClusteringAkhir+")";
                    //     $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                    //     $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                    //     var bTofixed = parseInt(b.toFixed());
                    //     var returnKadeAwalKeseluruhan = $scope.postKapal.posisiDepan - bTofixed;
                    //     $scope.postKapal.kadeAwalKeseluruhan = returnKadeAwalKeseluruhan;
                    //     return;
                        
                    // }
                    if(parseTglMulai > parseTglSelesai){
                        $scope.showAlert = true;
                        $scope.showMessage = "Waktu Selesai harus lebih dari Waktu Mulai";
                        $scope.postKapal.tglMasuk = $scope.postKapal.tglMasuk;
                        $scope.postKapal.tglSelesai = $scope.postKapal.tglSelesai;
                        return;
                    }
                    // console.log($scope.kapalUpdate);
                    // return;
                    var updateKapal = $scope.kapalUpdate;
                    dataEdit[i] = updateKapal;
                    $scope.showAlert = false;
                    // console.log(dataEdit[i]);
                    $('#editKapalModal').modal('hide');  
                }
            }
            
            $scope.dataKapalRek = $filter('orderBy')($scope.dataKapalRek, 'mulai', false);
            $scope.refreshCanvas();
            $scope.updatePosisi();
            $scope.configScale();
            $scope.updateAntrian();
            $scope.updateWaktuTambat();
            $scope.updateTop();
            $scope.updateClusteringId();
            $scope.draw();
            
            // console.log($scope.dataKapal);
            $scope.showEditKapal = false;
            $scope.showAction = true;

        }

        $scope.indexSelected=0;
        $scope.editKapal = function(data){
            $scope.showAlert = false;
            var modalTrue = false;
            var id = data.id;
            var dataEdit = $scope.dataKapalRek;
            for (var i = 0; i < dataEdit.length; i++) {
                if(dataEdit[i].id == id){
                    // console.log(dataEdit[i]);

                    $scope.postKapal = dataEdit[i];
                    $scope.postKapal.tglMasuk = $filter('date')(dataEdit[i].mulai, 'dd-MM-yyyy');
                    $scope.postKapal.tglSelesai = $filter('date')(dataEdit[i].selesai, 'dd-MM-yyyy');
                    $scope.postKapal.jamMasuk = $filter('date')(dataEdit[i].mulai, 'HH:mm');
                    $scope.postKapal.jamKeluar = $filter('date')(dataEdit[i].selesai, 'HH:mm');

                    // $scope.indexSelected=i;
                    // console.log($scope.postKapal.tglMasuk);
                    if($scope.postKapal.kapalSandar == false){
                        modalTrue = true;
                    }
                    
                }
                
            }

            if(modalTrue){
                 $('#editKapalModal').modal('show');
            }
           
           
        }



        //draw cavas
         var canvas = new fabric.Canvas('canvas',{width: 1300, height: 500, selection: false});
    canvas.observe('mouse:down', function(){ });
    
    $timeout(function() {
        // console.log(defGlobal);
        LoadingScreen.hide();
        $scope.dataKapalRek = dataKapalRekomendasi;
        $scope.draw();
        
    }, 3000);
    
    $scope.draw = function(){
        var isKanan = $scope.isKanan;
        //build canvas
        canvas.on("object:selected", function (options, event) {
            var object = options.target; //This is the object 
            // console.log(object);
            $scope.editKapal(object);
            $scope.$apply();
        });
        //end canvas

        //build kademeter
        var line = new fabric.Line([0, 400, kadeMeter*skala, 400], {
            stroke: 'red'
        });
        canvas.add(line);
        
        if(isKanan == true){
            // console.log(canvasWidth)
            var i =canvasWidth;
            var j = 0;
            while(i>0){

                i=i-100;
                j=j+100;
                if(i < 0){
                    break;
                }
                var circle = new fabric.Circle({
                    radius: 2, fill: 'green', left: j, top: 400
                });
                canvas.add(circle);
                var textKademeter = i/skala;
                var text = new fabric.Text(''+textKademeter, { left: j-5, top: 410, fontSize: 10 });
                canvas.add(text);
            }
        }else if(isKanan == false){
            var i=0;
            while(i<canvasWidth){
                i=i+100;
                
                var circle = new fabric.Circle({
                    radius: 2, fill: 'green', left: i, top: 400
                });
                canvas.add(circle);
                var textKademeter = i/skala;
                var text = new fabric.Text(''+textKademeter, { left: i-5, top: 410, fontSize: 10 });
                canvas.add(text);
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
                var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:270, opacity:0.5});
                canvas.add(cluster);

            }
        }else if(isKanan == false){
            for(var i=0; i<defGlobal.clusteringDermagas.length; i++){
                var bClustering = defGlobal.clusteringDermagas[i];
                //config
                var cWidth = (bClustering.kadeAkhir-bClustering.kadeAwal)*skala;
                var cLeft = bClustering.kadeAwal*skala;
                var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:270, opacity:0.5});
                canvas.add(cluster);

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
                var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430, opacity:0.5});
                canvas.add(kedalaman);
                var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435, fontSize: 10 });
                canvas.add(textkedalaman);

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
                var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430, opacity:0.5});
                canvas.add(kedalaman);
                var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435, fontSize: 10 });
                canvas.add(textkedalaman);

            }
        }
        
        $scope.refreshDataKapal = function(){
          
             if($scope.kapalSandar.length > 0){
               for(var i=0; i<$scope.kapalSandar.length; i++){
                    var objRef = $scope.kapalSandar[i];
                    var namaKapal = objRef.namaKapal;
                    var pLeft = canvasWidth - (objRef.kadeAwal*skala);
                    var topR = 350 -(objRef.tingkatan * 60);
                    var topP = 280 -(objRef.tingkatan * 60);
                    var url = objRef.url;
                    if(isKanan == true){
                        if(objRef.statusLineKapal === "Realisasi"){
                            // console.log(canvasWidth);
                            fabric.Image.fromURL(url, function(img) {
                            canvas.add(img).renderAll();
                            }, {
                            // id: objRef.id,
                            left: pLeft-(objRef.panjangKapal*skala),
                            top: topR-5,
                            width : objRef.panjangKapal*skala,
                            opacity:0.5,
                            height : 40,
                            lockMovementX : true,
                            lockMovementY : true,
                            lockScalingX : true,
                            lockScalingY : true,
                            lockRotation: true

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
                            canvas.add(captionKapal);
                        }else if(objRef.statusLineKapal === "Penetapan"){
                            // console.log(canvasWidth);
                            fabric.Image.fromURL(url, function(img) {
                            canvas.add(img).renderAll();
                            }, {
                            // id: objRef.id,
                            left: pLeft-objRef.panjangKapal,
                            top: topP-5,
                            width : objRef.panjangKapal*skala,
                            opacity:0.5,
                            height : 40,
                            lockMovementX : true,
                            lockMovementY : true,
                            lockScalingX : true,
                            lockScalingY : true,
                            lockRotation: true

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
                        }
                        
                    }else if(isKanan == false){
                         if(objRef.statusLineKapal === "Realisasi"){
                            fabric.Image.fromURL(url, function(img) {
                            canvas.add(img).renderAll();
                            }, {
                            // id: objRef.id,
                            left: objRef.kadeAwal*skala,
                            top: topR-5,
                            width : objRef.panjangKapal*skala,
                            opacity:0.5,
                            height : 40,
                            lockMovementX : true,
                            lockMovementY : true,
                            lockScalingX : true,
                            lockScalingY : true,
                            lockRotation: true

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
                            canvas.add(captionKapal);
                         }else if(objRef.statusLineKapal === "Penetapan"){
                            fabric.Image.fromURL(url, function(img) {
                            canvas.add(img).renderAll();
                            }, {
                            // id: objRef.id,
                            left: objRef.kadeAwal*skala,
                            top: topP-5,
                            width : objRef.panjangKapal*skala,
                            opacity:0.5,
                            height : 40,
                            lockMovementX : true,
                            lockMovementY : true,
                            lockScalingX : true,
                            lockScalingY : true,
                            lockRotation: true

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
                    var top = 280 -(objRef.tingkatan * 60);
                    var url = objRef.url;
                    if(isKanan == true){
                        // console.log(canvasWidth);
                        fabric.Image.fromURL(url, function(img) {
                        canvas.add(img).renderAll();
                        }, {
                        id: objRef.id,
                        left:  pLeft-(objRef.panjangKapal*skala),
                        top: top,
                        width : objRef.panjangKapal*skala,
                        opacity:0.5,
                        height : 40,
                        lockMovementX : true,
                        lockMovementY : true,
                        lockScalingX : true,
                        lockScalingY : true,
                        lockRotation: true

                        });
                        var captionKapal = new fabric.Text(namaKapal,{ 
                            left: pLeft-objRef.panjangKapal,
                            top: top+40, 
                            fontSize: 10,
                            width: objRef.panjangKapal,
                            lockMovementX : true,
                            lockMovementY : true,
                            lockScalingX : true,
                            lockScalingY : true,
                            selectable : false 

                        });
                        canvas.add(captionKapal);
                    }else if(isKanan == false){
                        
                        fabric.Image.fromURL(url, function(img) {
                        canvas.add(img).renderAll();
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
                        lockRotation: true

                        });
                        var captionKapal = new fabric.Text(namaKapal,{ 
                            left: objRef.posisiDepan*skala,
                            top: top+40, 
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
         canvas.forEachObject(function(o) {
                o.selectable = false;
            });
        $scope.refreshDataKapal();  
        $scope.refreshCanvas = function(){
            canvas.clear();
        }
    }
     $scope.generateFileName = function(){
        var tglPr =  $scope.tglPrameeting;
        return "Meeting"+" "+$scope.tglMeeting;
    }


    $scope.printKapal = function(){
      
        // $window.open(imgPrint);
        var dateCreated = new Date();
        var dateCreatedPrint = $filter('date')(dateCreated, 'dd-MM-yyyy HH:mm:ss');
        var username = localStorage.getItem('username'); 
       	$scope.cvs = document.getElementById('canvas');
        var w = 1300;
        var h = 500;
        var fileName = $scope.generateFileName();
        var footer = "Generated by "+username+ " on "+dateCreatedPrint+ " from VASA PELINDO III";
        var url = $scope.cvs.toDataURL();
        var title = $scope.generateFileName();
        var axx = Canvas2Image.convertToPNG($scope.cvs, w, h);
       
        var myPrintCanvas = $window.open(''); 
        myPrintCanvas.document.write('<h1>' + title  + '</h1>');
        var img=myPrintCanvas.document.createElement("img"); 
        img.src=url;
        myPrintCanvas.document.body.appendChild(img);
        myPrintCanvas.document.write('<footer><i>' + footer  + '</i></footer>');  
        img.onload = function(){ 
            myPrintCanvas.print();
        };     
        
           
                
    }

    $scope.downloadImageMeeting = function(){
        var w = 1300;
        var h = 500;
        var fileName = $scope.generateFileName();
        var url = $scope.cvs.toDataURL();
         
         $("<a>", {
                    href: url,
                    download: fileName
                  })
                  .on("click", function() {$(this).remove()})
                  .appendTo("body")[0].click()

    }
       

    });


    // $scope.dataKapal = $filter('orderBy')($scope.dataKapal, 'jamMasuk', false);
    $scope.tambahKapalPerencanaan = function(id){
        // console.log(id);
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
            
        }
    }

    $scope.showEdit = function(){
        $scope.showEditKapal = true;
        $scope.showAction = false;
    }

    $scope.editDetailKapal = function(data){
        // console.log(data);
    }

   
    


    $scope.cancel = function(){
        $scope.showEditKapal = false;
        $scope.showAction = true;
    }

    //autocomplete
    $scope.getListOfDermagaLabuh = function(value) {
        if (value && value.length <=3) {
            return new Promise(function(resolve) {
                MdmDermagaSearchByKode.get({
                    kode: value,
                    kodeTerminal : 1,
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
                    kodeTerminal : 1,
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
        // console.log(response);
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
            // console.log(response);
            $scope.kapalRekCluster = response;
        });
    }

    KademeterList.get({kdDermaga:kdDermaga},function(response){
        // console.log(response);
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

    $scope.saveData = function(){
        
        for(var i=0; i<$scope.dataKapalRek.length; i++){
             $scope.dataKapalRek[i].kadeAwal = $scope.dataKapalRek[i].kadeAwal;
                $scope.dataKapalRek[i].kadeAkhir = $scope.dataKapalRek[i].kadeAkhir;
                $scope.dataKapalRek[i].kadeAwalKeseluruhan = $scope.dataKapalRek[i].kadeAwalKeseluruhan;
                $scope.dataKapalRek[i].kadeAkhirKeseluruhan = $scope.dataKapalRek[i].kadeAkhirKeseluruhan;
                $scope.dataKapalRek[i].kadeClusteringAwal = $scope.dataKapalRek[i].kadeClusteringAwal;
                $scope.dataKapalRek[i].kadeClusteringAkhir = $scope.dataKapalRek[i].kadeClusteringAkhir;
                $scope.dataKapalRek[i].panjangKapal = $scope.dataKapalRek[i].panjangKapal;
                $scope.dataKapalRek[i].clusteringId = $scope.dataKapalRek[i].clusteringId;
                $scope.dataKapalRek[i].komoditi = null;
                $scope.dataKapalRek[i].pbm = null;
                $scope.dataKapalRek[i].kodeAgen = null;
                $scope.dataKapalRek[i].keterangan = null;
                $scope.dataKapalRek[i].isDitetapkan = false;
                $scope.dataKapalRek[i].noPpk1 = $scope.dataKapalRek[i].noPpk1;
                $scope.dataKapalRek[i].noPpkJasa = $scope.dataKapalRek[i].noPpkJasa;
                $scope.dataKapalRek[i].kodeKapal = $scope.dataKapalRek[i].kodeKapal;
                $scope.dataKapalRek[i].namaKapal = $scope.dataKapalRek[i].namaKapal;
                $scope.dataKapalRek[i].kodeDermaga = kdDermaga;
                // $scope.dataKapalRek[i].tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
                $scope.dataKapalRek[i].arahKapal = 'kanan';
                // $scope.dataKapalRek[i].tglJamAwalTambat = $scope.dataKapalRek[i].mulai;
                // $scope.dataKapalRek[i].tglJamAkhirTambat = $scope.dataKapalRek[i].selesai;
                delete $scope.dataKapalRek[i].hadapKapal;
                delete $scope.dataKapalRek[i].kapalSandar;
                delete $scope.dataKapalRek[i].kodeError;
                delete $scope.dataKapalRek[i].labelFromRight;
                delete $scope.dataKapalRek[i].namaDermaga;
                delete $scope.dataKapalRek[i].posisiAkhir;
                delete $scope.dataKapalRek[i].posisiDepan;
                delete $scope.dataKapalRek[i].pesan;
                delete $scope.dataKapalRek[i].top;
                delete $scope.dataKapalRek[i].url;
                delete $scope.dataKapalRek[i].tingkatan;
                delete $scope.dataKapalRek[i].Top;
                delete $scope.dataKapalRek[i].id;

                    PenetapanSave.save($scope.dataKapalRek[i],function(response){
                    	// console.log(response);
                        LoadingScreen.hide();
                        if(response){
                            if(response.idMeeting)$scope.publishAfterUpdateHasilMeetingOnMqttJS(response);
                            $timeout(function() {
                                $location.path($scope.locationPath);
                                $scope.setNotification  = {
		                            type    : "success",
		                            message : "Data berhasil disimpan"
		                        };
		                        Notification.setNotification($scope.setNotification);
		                        $window.location.reload();
                            }, 3000);
                            
                        }
                    });
        }
        
    }

    $scope.tetapkanMeeting = function(){

    	var confirmPenetapan = confirm('Apakah anda ingin menetapkan prameeting ini?');
        LoadingScreen.show();
        // console.log($scope.dataKapalRek);
        if(confirmPenetapan){
            for(var i=0; i<$scope.dataKapalRek.length; i++){
                $scope.dataKapalRek[i].kadeAwal = $scope.dataKapalRek[i].kadeAwal;
                $scope.dataKapalRek[i].kadeAkhir = $scope.dataKapalRek[i].kadeAkhir;
                $scope.dataKapalRek[i].kadeAwalKeseluruhan = $scope.dataKapalRek[i].kadeAwalKeseluruhan;
                $scope.dataKapalRek[i].kadeAkhirKeseluruhan = $scope.dataKapalRek[i].kadeAkhirKeseluruhan;
                $scope.dataKapalRek[i].kadeClusteringAwal = $scope.dataKapalRek[i].kadeClusteringAwal;
                $scope.dataKapalRek[i].kadeClusteringAkhir = $scope.dataKapalRek[i].kadeClusteringAkhir;
                $scope.dataKapalRek[i].panjangKapal = $scope.dataKapalRek[i].panjangKapal;
                $scope.dataKapalRek[i].clusteringId = $scope.dataKapalRek[i].clusteringId;
                $scope.dataKapalRek[i].komoditi = null;
                $scope.dataKapalRek[i].pbm = null;
                $scope.dataKapalRek[i].kodeAgen = null;
                $scope.dataKapalRek[i].keterangan = null;
                $scope.dataKapalRek[i].isDitetapkan = true;
                $scope.dataKapalRek[i].noPpk1 = $scope.dataKapalRek[i].noPpk1;
                $scope.dataKapalRek[i].noPpkJasa = $scope.dataKapalRek[i].noPpkJasa;
                $scope.dataKapalRek[i].kodeKapal = $scope.dataKapalRek[i].kodeKapal;
                $scope.dataKapalRek[i].namaKapal = $scope.dataKapalRek[i].namaKapal;
                $scope.dataKapalRek[i].kodeDermaga = kdDermaga;
                // $scope.dataKapalRek[i].tglMeeting = $filter('date')(tglParams, 'yyyy-MM-ddT00:00');
                $scope.dataKapalRek[i].arahKapal = 'kanan';
                // $scope.dataKapalRek[i].tglJamAwalTambat = $scope.dataKapalRek[i].mulai;
                // $scope.dataKapalRek[i].tglJamAkhirTambat = $scope.dataKapalRek[i].selesai;
                delete $scope.dataKapalRek[i].hadapKapal;
                delete $scope.dataKapalRek[i].kapalSandar;
                delete $scope.dataKapalRek[i].kodeError;
                delete $scope.dataKapalRek[i].labelFromRight;
                delete $scope.dataKapalRek[i].namaDermaga;
                delete $scope.dataKapalRek[i].posisiAkhir;
                delete $scope.dataKapalRek[i].posisiDepan;
                delete $scope.dataKapalRek[i].pesan;
                delete $scope.dataKapalRek[i].top;
                delete $scope.dataKapalRek[i].url;
                delete $scope.dataKapalRek[i].tingkatan;
                delete $scope.dataKapalRek[i].Top;
                delete $scope.dataKapalRek[i].id;

                    // console.log($scope.dataKapalRek[i]);
                    PenetapanSave.save($scope.dataKapalRek[i],function(response){
                        // console.log(response);
                        LoadingScreen.hide();
                        if(response){
                             $timeout(function() {
                                // $location.path($scope.locationPath);
                            }, 3000);
                            
                        }
                    });
                
                
                
            }
            $location.path($scope.locationPath);
        }
        
    }

    $scope.tambahKapal = function(){
        $location.path($scope.tambahKapalNew);
    }

    $scope.infoKapalRek = function(id){
        // console.log(id);
        $scope.dataKapalRek.forEach(function(item){
            if (item.id == id) {
              $scope.dataInformasiKapal = item;

            }
        });
         // console.log($scope.dataInformasiKapal);
        $('#infoKapalRekomendasi').modal('show');
    }

    $scope.infoKapalSandar = function(id){
         // console.log(id);
         $scope.kapalSandar.forEach(function(item){
            if (item.idKapalSandar == id) {
              $scope.informasiKapalSandar = item;

            }
        });
         // console.log($scope.dataInformasiKapal);
        $('#infoKapalSandar').modal('show');
    }

    $scope.showDelete  = function(){
        var idDelete = $scope.postKapal.id;
            var dataKapal = $scope.dataKapalRek;
            for (var i = 0; i < dataKapal.length; i++) {
                if(dataKapal[i].id == idDelete){
                    $scope.noPpkJasa = dataKapal[i].noPpkJasa;

                    var confirmDelete = confirm('Apakah anda ingin menghapus kapal ini?');
                    if(confirmDelete){
                    	// console.log(dataKapal[i]);
                        $scope.dataKapalRek.splice(i,1);
                        DeleteKapalHasilMeeting.delete({noPpkJasa:$scope.noPpkJasa},function(response){
                            
                            if(response.$resolved == true){
                                $scope.setNotification  = {
                                    type    : "success  ",
                                    message : "Kapal berhasil dihapus"
                                };
                                Notification.setNotification($scope.setNotification);
                                
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
            $scope.updateClusteringId();
            $scope.draw();
            // $scope.showDeleteKapal = false;
            $scope.showAction = true;
            $('#editKapalModal').modal('hide');
             
    };

    
}]);
