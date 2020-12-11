'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanPublicCtrl
 * @description
 * # PerencanaanPublicCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('PerencanaanPublicCtrl',['$scope','$rootScope','$filter','$routeParams','$location','$PAGE_SIZE','$timeout','$window','Notification','LoadingScreen','$modal','PerencanaanNew','ListKapalRekomendasi','SharedVariable','MdmDermagaSearchByKode','MdmDermagaPerJasa','ListKapalTerminalLain','ClusterGetAll','ListKapalCluster','PerencanaanSave','PenetapanSave','PenetapanUpdate','KapalPrioritas','KademeterList','AddClusteringKapal','KapalTlList','DeleteKapalPrameeting','PindahDermaga','PublicMdmCabang','PublicMdmCabangByRegional','ListKawasan','MdmDermagaByKodeCabang','MdmDermagaByKodeCabangByJenisDmg','ListKapalHasilMeeting','InformasiKegiatanKapal', 'PermohonanTambatDetail','PenetapanTambatByPpkJasa','RealisasiTambatDetailbyPpkJasa',function ($scope,$rootScope,$filter,$routeParams,$location,$PAGE_SIZE,$timeout,$window,Notification,LoadingScreen,$modal,PerencanaanNew,ListKapalRekomendasi,SharedVariable,MdmDermagaSearchByKode,MdmDermagaPerJasa,ListKapalTerminalLain,ClusterGetAll,ListKapalCluster,PerencanaanSave,PenetapanSave,PenetapanUpdate,KapalPrioritas,KademeterList,AddClusteringKapal,KapalTlList,DeleteKapalPrameeting,PindahDermaga,PublicMdmCabang,PublicMdmCabangByRegional,ListKawasan,MdmDermagaByKodeCabang,MdmDermagaByKodeCabangByJenisDmg,ListKapalHasilMeeting,InformasiKegiatanKapal, PermohonanTambatDetail, PenetapanTambatByPpkJasa,RealisasiTambatDetailbyPpkJasa) {

var currentDate = new Date();
var urlKapalkanan = '../images/container-kanan.png';
var urlKapalkiri = '../images/container-kiri.png';
var skala = null;
var dateToday = new Date();
$scope.disableButtonSave = false;
$scope.dataKapal  = {};
$scope.hadapKapal  = [{value:'kanan', name:'kanan'},{value:'kiri', name:'kiri'}];
$scope.optionScale = [{name:'1:1', value:1},{name:'1:2',value:2},{name:'1:4',value:4}];
$scope.updateScale = $scope.optionScale[0];
$scope.isKanan = true;
var defGlobal = null;
var panjangDermaga = null;
var kadeMeter = null;
var canvasWidth = null;
var kapalPerencanaan = [];
$scope.kapalSandar = [];
$scope.dataKapalRek = [];
$scope.dataKapalPtp = [];
$scope.dataInformasiKapal = null;
$scope.informasiKapalSandar = null;
$scope.cabang = [];
$scope.listKawasan = [];
$scope.dermaga = [];
$scope.clusterKademeter = [];
$scope.informationDermaga = [];
$scope.tglTambat = new Date();
var tglTambatVal = $filter('date')($scope.tglTambat, 'yyyy-MM-dd');
    
var canvas = new fabric.Canvas('canvas',{width: 1300, height: 500, selection: false});

$scope.options = {
     autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
};    

$scope.$watch('tglTambat', function(){
    $('#idTglTambat').mask('99-99-9999');
});


// PublicMdmCabang.get(function(response){
//     $scope.cabang = response;
// });

//marvin

var lo_id =1;

if(localStorage.statusUser =="regional" ){

   lo_id =0;
}

if(localStorage.kodeRegional=="1000"){

  lo_id =-1;
}


 //   alert(localStorage.isPusat);

  //  console.log(localStorage);


//marvin
PublicMdmCabangByRegional.get({lo_id: lo_id,kode_regional:localStorage.kodeRegional,kode_cabang:localStorage.kodeCabang },function(response) {
    $scope.cabang = response;
});


$scope.$watch("tglTambat", function(newValue, oldValue) {
    tglTambatVal = $filter('date')(newValue, 'yyyy-MM-dd');
    if($scope.idDermaga != undefined){
        return $scope.getDermagaCluster($scope.idDermaga);
    }
    
});

$scope.getDermaga = function(val){
    MdmDermagaByKodeCabang.get({kodeCabang: $scope.idCabang},function(response) {
        $scope.dermaga = response;
    });  
}




//marvin
//MdmDermagaByKodeCabangByJenisDmg

$scope.getDermagaByJenisDmg = function(val){
    MdmDermagaByKodeCabangByJenisDmg.get({kodeCabang: $scope.idCabang,mdmg_jenis_dmg:'DMGUMUM'},function(response) {
        $scope.dermaga = response;
    });  
}



$scope.getDermagaCluster = function(val){
    LoadingScreen.show();
    PerencanaanNew.get({kdDermaga:val, kodeCabang : '0'+$scope.idCabang},function(response){
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
        $scope.refreshCanvas();
        $scope.getDataKapal(val);
    }); 

    KademeterList.get({kdDermaga:val, kdCabang:$scope.idCabang},function(response){
        $scope.clusterKademeter = response.content;
    });      
}

$scope.getDataKapal = function(val){
    $scope.kapalSandar = [];
    $scope.dataKapalRek = [];
    
    if($scope.idCabang < 10){
        var number = '' + $scope.idCabang;
        number = '0'+number;
    }

    ListKapalHasilMeeting.get({kdDermaga:val,tglPerencanaan:tglTambatVal,kodeCabang:number},function(response){
        //console.log(val+","+tglTambatVal+","+number+",");
        LoadingScreen.hide();
        $scope.dataKapal = response;
        if($scope.dataKapal.length > 0 ){
            $scope.dataKapal.forEach(function(item){
                if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Realisasi') {
                    $scope.kapalSandar.push(item);
                }
                if (item.kapalSandar == false  && item.kodeError == null) {
                    $scope.dataKapalRek.push(item);
                }
                if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan != 5) {
                    $scope.dataKapalRek.push(item);
                }
                if (item.kapalSandar == true && item.kodeError == null && item.statusLineKapal == 'Penetapan' && item.statusPelaksanaan == 5) {
                    $scope.kapalSandar.push(item);
                }
            });
        }else{
            $scope.kapalSandar = [];
            $scope.dataKapalRek = [];
        }
        $scope.indexSelected = 0;
        canvas.observe('mouse:down', function(){ }); 
        $scope.updateIdKapalRekomendasi();
        $scope.updatePosisi();
        $scope.configScale();
        $scope.updateAntrian();
        $scope.updateWaktuTambat();
        $scope.updateTop();
        $scope.draw();

        //console.log($scope.dataKapalRek);
    })  
}


//update perencanaanosisi kapal perencanaan
// marvin comment
//$scope.updatePosisi =  function (){ 
//     for(var i=0;i<$scope.dataKapalRek.length;i++){
//         var a = $scope.dataKapalRek[i].panjangKapal;
//         var ax = parseInt(a.toFixed());
//         var b = ax;
//         var c = parseInt(b.toFixed());
//         var jenis = $scope.dataKapalRek[i].jenisKapal;
//         var hadap = $scope.dataKapalRek[i].hadapKapal;
//         $scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwal;
//         $scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + a;
                   
//         if((jenis === 'CURAH KER')||(jenis ===  'CURAH KERI')||(jenis === 'KPLCURAHKR')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKRLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCURAHKR.png';
//             }   
//         }else if((jenis === 'CONTAINER')||(jenis ===  'GC')||(jenis === 'GENERAL CA')||(jenis === 'KPLBGCARGO')||(jenis ===  'KPLNOPTKMS')||(jenis === 'PETI KEMAS')){
//              if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/CONTAINERLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/CONTAINER.png';
//             }
//         }else if((jenis === 'KP')||(jenis === 'KPLBARU')||(jenis === 'KPLBCUKAI')||(jenis === 'KPLCONDSAT')||(jenis === 'KPLIKAN')||(jenis === 'KPLKPLP')||(jenis === 'KPLKRKRMB')||(jenis === 'KPLLAINNYA')||(jenis === 'KPLLAYAR')||(jenis === 'KPLLCTLST')||(jenis === 'KPLLPG')||(jenis === 'KPLLRMOTOR')||(jenis === 'KPLRMOTOR')||(jenis === 'KPLNAVIGSI')||(jenis === 'KPLNEGARA')||(jenis === 'KPLPEMDA')||(jenis === 'KPLPENLITI')||(jenis === 'KPLPERANG')||(jenis === 'KPLPLYRKYT')||(jenis === 'KPLPOLRI')||(jenis === 'KPLSAR')||(jenis === 'KPLSBANDAR')||(jenis === 'KPLTUNDA')||(jenis === 'KPLWISATA')||(jenis === 'LAIN')||(jenis === 'RR')||(jenis === 'TAGIHAN')||(jenis === 'TB')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
//             }
//         }else if((jenis === 'KPLCAIRBBM')||(jenis === 'KPLCAIRNON')||(jenis === 'TANKERBBM')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBMLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCAIRBBM.png';
//             }
//         }else if((jenis === 'KPLCARGO')||(jenis === 'KPLPTKEMAS')||(jenis === 'KPLPTKMS')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGOLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCARGO.png';
//             }
//         }else if(jenis === 'KPLCRUISE'){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISELEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLCRUISE.png';
//             }
//         }else if((jenis === 'KPLPNMPANG')||(jenis === 'WISATA MAR')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANGLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLPNMPANG.png';
//             }
//         }else if(jenis === 'KPLRORO'){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLROROLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
//             }
//         }else if((jenis === 'KPLTONKANG')||(jenis === 'KPLTNKGMSN')){
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLTONKANGLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLRORO.png';
//             }
//         }else{                    
//             if(hadap == 'kiri'){
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KPLEFT.png';
//             }else{
//                 $scope.dataKapalRek[i].url = '../images_unbuild/KP.png';
//             }
//         }                
//     }
// }

//update perencanaanosisi kapal perencanaan
//marvin revisi hadap kiri kanan
$scope.updatePosisi =  function (){ 

   // console.log('kesiniiii');
    for(var i=0;i<$scope.dataKapalRek.length;i++){
        var a = $scope.dataKapalRek[i].panjangKapal;
        var ax = parseInt(a.toFixed());
        var b = ax;
        var c = parseInt(b.toFixed());
        var jenis = $scope.dataKapalRek[i].jenisKapal;
        var hadap = $scope.dataKapalRek[i].hadapKapal;
        $scope.dataKapalRek[i].posisiDepan = $scope.dataKapalRek[i].kadeAwal;
        $scope.dataKapalRek[i].posisiAkhir=$scope.dataKapalRek[i].posisiDepan + a;

       // alert(hadap);
                   
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

$scope.updateIdKapalRekomendasi = function(){
    for(var i=0;i<$scope.dataKapalRek.length;i++){
        $scope.dataKapalRek[i].id = i+1;
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

$scope.draw = function(){
    var isKanan = $scope.isKanan;
    var heightOffset = $scope.getHeightOffset();
        //build canvas
    canvas.setHeight(500 + heightOffset);

    canvas.on("object:selected", function (options, event) {
        var object = options.target; //This is the object 
        $scope.$apply();
    });
    //end canvas

    //build kademeter
    var line = new fabric.Line([0, 400+heightOffset, (kadeMeter*skala)+30, 400+heightOffset], {
        stroke: 'red'
    });
    canvas.add(line);  

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
            var textKademeter = i/skala;
            var text = new fabric.Text(''+textKademeter, { left: j-5, top: 410+heightOffset, fontSize: 10 });
            canvas.add(text);
        }
    }else if(isKanan == false){ 
        var i=0;
        while(i<canvasWidth){
            i=i+30;
                
            var circle = new fabric.Circle({
                radius: 2, fill: 'green', left: i, top: 400+heightOffset
            });
            canvas.add(circle);
            var textKademeter = i/skala;
            var text = new fabric.Text(''+textKademeter, { left: i-5, top: 410+heightOffset, fontSize: 10 });
            canvas.add(text);
        }
    }
    //end kademeter

    //cluster
    if(isKanan == true){
        //console.log(defGlobal.clusteringDermagas);
        for(var i=0; i<defGlobal.clusteringDermagas.length; i++){
            var bClustering = defGlobal.clusteringDermagas[i];
            //config
            var cWidth = (bClustering.kadeAkhir-bClustering.kadeAwal)*skala;
            var cLeft = canvasWidth-(bClustering.kadeAkhir*skala);
            var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:265+heightOffset, opacity:0.5});
            canvas.add(cluster);
        }
    }else if(isKanan == false){
        for(var i=0; i<defGlobal.clusteringDermagas.length; i++){
            var bClustering = defGlobal.clusteringDermagas[i];
            //config
            var cWidth = (bClustering.kadeAkhir-bClustering.kadeAwal)*skala;
            var cLeft = bClustering.kadeAwal*skala;
            var cluster = new fabric.Rect({ width: cWidth,left:cLeft, height: 130,fill: bClustering.warna, top:265+heightOffset, opacity:0.5});
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
            var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430+heightOffset, opacity:0.5});
            canvas.add(kedalaman);
            var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435+heightOffset, fontSize: 10 });
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
            var kedalaman = new fabric.Rect({ width: cWidth,left:cLeft, height: 20,fill:bWarna, top:430+heightOffset, opacity:0.5});
            canvas.add(kedalaman);
            var textkedalaman = new fabric.Text(''+bKedalaman.kedalaman, { left:cRight, top: 435+heightOffset, fontSize: 10 });
            canvas.add(textkedalaman);
        }
    }

    canvas.forEachObject(function(o) {
        o.selectable = false;
    });     
    $scope.updateDatakapalSandar(isKanan);   
    
}

$scope.updateDatakapalSandar = function(isKanan){
    var heightOffset = $scope.getHeightOffset();
    for(var i=0;i<$scope.kapalSandar.length;i++){
        $scope.kapalSandar[i].url = urlKapalkanan;
        // $scope.kapalSandar[i].Top=330-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
        // $scope.dataKapalRek[i].id = i+1;
        if($scope.kapalSandar[i].statusLineKapal === "Realisasi"){
            $scope.kapalSandar[i].Top=330-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
        }else if($scope.kapalSandar[i].statusLineKapal === "Penetapan"){
            $scope.kapalSandar[i].Top=270-($scope.kapalSandar[i].tingkatan*60)+heightOffset;
        }

        var a = $scope.kapalSandar[i].panjangKapal;
        var b = $scope.kapalSandar[i].kadeAkhir;
        var c = canvasWidth -b;

        var pRight = c;
        if($scope.kapalSandar[i].panjangKapal<100){
            var pRight = c-40;
        }
        $scope.kapalSandar[i].labelFromRight = pRight; 
        $scope.kapalSandar[i].idKapalSandar = i+1;               
    }
    $scope.refreshDataKapal(isKanan); 
}

$scope.refreshCanvas = function(){
    canvas.clear();
    $scope.informationDermaga = [];
    $scope.clusterKademeter = [];
    $scope.kapalSandar = [];
}

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

$scope.refreshDataKapal = function(isKanan){
    var heightOffset = $scope.getHeightOffset();
    if($scope.kapalSandar.length > 0){
        for(var i=0; i<$scope.kapalSandar.length; i++){
            var objRef = $scope.kapalSandar[i];
            var namaKapal = objRef.namaKapal;
            var pLeft = canvasWidth - (objRef.kadeAwal*skala);
            var topR = 350 -(objRef.tingkatan * 60)+heightOffset;
            var topP = 280 -(objRef.tingkatan * 60)+heightOffset;
            var url = objRef.url;
            if(isKanan == true){  
                if(objRef.statusLineKapal === "Realisasi"){                         
                    fabric.Image.fromURL(url, function(img) {
                         canvas.add(img).renderAll();
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
                    canvas.add(captionKapal);
                }else if(objRef.statusLineKapal === "Penetapan"){
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
                }                         
            }else if(isKanan == false){
                fabric.Image.fromURL(url, function(img) {
                    canvas.add(img).renderAll();
                }, {
                    left: objRef.kadeAwal*skala,
                    top: topR-5,
                    width : objRef.panjangKapal*skala,
                    opacity:0.5,
                    height : 40,
                    lockMovementX : true,
                    lockMovementY : true,
                    lockScalingX : true,
                    lockScalingY : true
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
            }                        
        }                    
    }
    //draw kapal perencanaan
    if($scope.dataKapalRek.length > 0){ 
        for(var i=0; i<$scope.dataKapalRek.length; i++){
            var objRef = $scope.dataKapalRek[i];
            var namaKapal = objRef.namaKapal;
            var pLeft = canvasWidth - (objRef.posisiDepan*skala);

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

$scope.infoKapalSandar = function(id){ 
    $scope.kapalSandar.forEach(function(item){
        if (item.idKapalSandar == id) {
            $scope.informasiKapalSandar = item;

            RealisasiTambatDetailbyPpkJasa.get({
                noPpkJasa : item.noPpkJasa
            },function(response){
                $scope.reaTambat = response;;
            });
        }
    });


      
    $('#infoKapalSandar').modal('show');
}

$scope.infoKapalRek = function(id){ 
    $scope.infoKapalSandarStatus = true; 
    $scope.dataKapalRek.forEach(function(item){
        if (item.id == id) { 
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
            });
            $scope.dataInformasiKapal = item;

            PermohonanTambatDetail.get({
                noPpkJasa : item.noPpkJasa
            },function(response){
                //console.log(response);
                $scope.pmhTambat = response;
            });

            PenetapanTambatByPpkJasa.get({
                noPpkJasa : item.noPpkJasa
            },function(response){
                //console.log(response);
                $scope.ptpTambat = response.content[0];
                //console.log($scope.ptpTambat);
            });

            
        }
    });
        
    $('#infoKapalRekomendasi').modal('show');       
}


//$scope.pmhTambat = response



}]);
