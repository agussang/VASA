'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vasaApp
 */
 angular.module('vasaApp')
 .controller('MainCtrl', ['$scope','$filter','$rootScope','$controller','pfUtils','RealisasiCompletedList','KesepakatanExpiredList','PerubahanTarifList','HargaBBMLimitedList','LoadingScreen','MonitoringDetail','MQTT_PATH','OutstandingNota','KunjunganKapal','PendapatanKapal','PembatalanNota','LaporanPemanduanList',function ($scope,$filter,$rootScope,$controller,pfUtils,RealisasiCompletedList,KesepakatanExpiredList,PerubahanTarifList,HargaBBMLimitedList,LoadingScreen,MonitoringDetail,MQTT_PATH,OutstandingNota,KunjunganKapal,PendapatanKapal,PembatalanNota,LaporanPemanduanList) {
   //LoadingScreen.show();
   // angular.extend(this, $controller('MqttCtrl', {$scope: $scope})); 
   var client, message;
   $scope.currentCabang = $rootScope.namaCabang;
   $scope.listCabang = [];
   $scope.informasiOutstandingNota = "";
   $scope.items = [];

   $scope.itemsKapal=[];
   $scope.search = { tglFilter: '' };
   $scope.search.tglFilter = $filter('date')(new Date(), 'MM-yyyy');
   $scope.tanggalHariIni = new Date();
   $scope.currentMonth = $filter('uppercase')($filter('date')($scope.tanggalHariIni,'MMMM-yyyy'));

   $scope.idTerminal = localStorage.getItem('kodeTerminalBaru');
   $scope.statusUser = localStorage.getItem('statusUser');

   $scope.isOp = localStorage.getItem('idRole') == '1901' ? true : false;



   $scope.nullChecking = function(data){
    data.forEach(function(element) {
      element.noPkk = (element.noPkk !== null ?element.noPkk:'-');
    //  element.noSpb = (element.noSpb !== null ?element.noSpb:'-');
      element.namaDermaga = (element.namaDermaga !== null ?element.namaDermaga:'-');
      element.tglMasuk = (element.tglMasuk !== null ?element.tglMasuk:'-');
      element.tglKeluar = (element.tglKeluar !== null ?element.tglKeluar:'-');
      element.tglFilter = $filter('date')(element.tglPermohonan,'MMMM-yyyy');
      element.totalPandu = (element.totalPandu !== null ?element.totalPandu:0);
      element.totalTunda = (element.totalTunda !== null ?element.totalTunda:0);
      element.totalTambat = (element.totalTambat !== null ?element.totalTambat:0);
      element.totalAirKapal = (element.totalAirKapal !== null ?element.totalAirKapal:0);
      element.noPpk1 = (element.noPpk1 !== null ?element.noPpk1:'-');
      element.namaKapal = (element.namaKapal !== null ?element.namaKapal:'-');
      element.namaAgen = (element.namaAgen !== null ?element.namaAgen:'-');
      element.tglBatal = (element.tglBatal !== null ?element.tglBatal:'-');
      element.tglMulaiTunda = (element.tglMulaiTunda !== null ?element.tglMulaiTunda:'-');
      element.odb = (element.odb !== null ?element.odb:'-');

    });
  };

   OutstandingNota.get(
      {
        //params goes here
      },
      function (response) 
      {
        $scope.informasiOutstandingNota = response.length;
        $scope.items = response;
        $scope.nullChecking($scope.items);
      });

   //added by Nurika
  if (localStorage.getItem('statusUser') == 'regional') {
                $scope.idTerminal = null;
    }
   KunjunganKapal.get(
      {
        //params goes here
        kodeTerminal: $scope.idTerminal
      },
      function (response) {
        
        $scope.informasiKunjunganKapal = response.length;
        $scope.items = response;
        $scope.nullChecking($scope.items);
      });





   $scope.showModalOutstandingNota = function(){
      //Fill The $scope.items for using in outstanding modal
      OutstandingNota.get(
      {
        //params goes here
      },
      function (response) 
      {
        $scope.informasiOutstandingNota = response.length;
        $scope.items = response;
        $scope.nullChecking($scope.items);

       // parseFloat(text);


      }); 

      //show the modal
      $('#outstandingNota').modal('show');
      ;
   }

    $scope.showModalKunjunganKapal = function(){
      //Fill The $scope.items for using in outstanding modal
     //added by Nurika
      if (localStorage.getItem('statusUser') == 'regional') {
                $scope.idTerminal = null;
       }
      KunjunganKapal.get(
      {
        //params goes here
        kodeTerminal: $scope.idTerminal
      },
      function (response) 
      {
        $scope.informasiKunjunganKapal = response.length;
        $scope.items = response;
        $scope.nullChecking($scope.items);
         
      }); 

      //show the modal
      $('#kunjunganKapal').modal('show');
   }

   $scope.showModalPendapatanKapal = function(){
      var splitDate = $scope.search.tglFilter.split('-');
      $scope.bulanLaporan = splitDate[0];
      $scope.tahunLaporan = splitDate[1];
      $scope.currentMonth = $filter('uppercase')($filter('date')(new Date($scope.tahunLaporan, $scope.bulanLaporan - 1), 'MMMM-yyyy'));
      PendapatanKapal.get({
        tglNota: $scope.tahunLaporan + $scope.bulanLaporan 
      },function (response){
        $scope.items = response;
       // console.log($scope.items);
        $scope.itemsKapal = response;
        $scope.nullChecking($scope.items);
 
      }); 
      //show the modal
    $('#pendapatanKapal').modal('show');
   };



$scope.getTotalPandu = function(){
    var total = 0;
    for(var i = 0; i <  $scope.items.length; i++){



//console.log($scope.items[i]);
      //var pandu = $scope.items[i].totalPandu;
        total += parseFloat($scope.items[i].totalPandu);
    }
    return total;
}


$scope.getTotalTunda = function(){
    var total = 0;
    for(var i = 0; i <  $scope.items.length; i++){



//console.log($scope.items[i]);
      //var pandu = $scope.items[i].totalPandu;
        total += parseFloat($scope.items[i].totalTunda);
    }
    return total;
}


$scope.getTotalTambat = function(){
    var total = 0;
    for(var i = 0; i <  $scope.items.length; i++){



//console.log($scope.items[i]);
      //var pandu = $scope.items[i].totalPandu;
        total += parseFloat($scope.items[i].totalTambat);
    }
    return total;
}


$scope.getTotalAirKapal = function(){
    var total = 0;
    for(var i = 0; i <  $scope.items.length; i++){

//console.log($scope.items[i]);
      //var pandu = $scope.items[i].totalPandu;
        total += parseFloat($scope.items[i].totalAirKapal);
    }
    return total;
}



  $scope.showModalPembatalanNota = function(){
      var splitDate = $scope.search.tglFilter.split('-');
      $scope.bulanLaporan = splitDate[0];
      $scope.tahunLaporan = splitDate[1];
      $scope.currentMonth = $filter('uppercase')($filter('date')(new Date($scope.tahunLaporan, $scope.bulanLaporan - 1), 'MMMM-yyyy'));
      PembatalanNota.get({
        tglBatal: $scope.tahunLaporan + "-" + $scope.bulanLaporan 
      },function (response){
        $scope.items = response;
        $scope.nullChecking($scope.items);
      }); 
      //show the modal
    $('#pembatalanNota').modal('show');
   };

   $scope.showModalApprovalNota = function(){
      var splitDate = $scope.search.tglFilter.split('-');
      var bulan = splitDate[0];
      var tahun = splitDate[1];
      var namaKapal = $scope.search.namaKapal;
      $scope.currentMonth = $filter('uppercase')($filter('date')(new Date(tahun, bulan-1), 'MMMM-yyyy'));
      LaporanPemanduanList.get({
        tahun: tahun,
        bulan: bulan,
        namaKapal: namaKapal,
        statusNota: $scope.search.statusNota 
      },function (response){
        //LoadingScreen.hide();
        response.forEach(function (item) {
            item.jamTurun = $filter('date')(item.jamTurun, 'HH:mm');
            item.jamNaik = $filter('date')(item.jamNaik, 'HH:mm')
        }); 
        $scope.items = response;
        $scope.nullChecking($scope.items);
      });
      //show the modal
    $('#approvalNota').modal('show');
   };

   $scope.generatePdfOutstandingNota = function() {
    var namaCabang = $scope.currentCabang;
    //var reportDate = $filter('uppercase')($scope.currentMonth);

    var NIPP = localStorage.getItem('NIPP');
    var namaPetugas = localStorage.getItem('nama');
    var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

      var createTabelRow = function(item,no){
        item.tglMasuk = $filter('date')(item.tglMasuk,'dd-MM-yyyy HH:mm');
        item.tglKeluar= $filter('date')(item.tglKeluar, 'dd-MM-yyyy HH:mm'); 
        var tabelRow = [
          no.toString(),
          item.namaKapal,
          item.noPpk1,
          item.noPkk,
          item.jenisKapal,
          item.outstanding,
          item.tglMasuk,
          item.tglKeluar
        ];
        tabelRow.forEach(function(rowItem,index){
          if(rowItem == null) tabelRow[index] = '';
        });
        return tabelRow;
      }

      // $scope.bulanLaporan = function(data) {
      //   return (data.tglFilter === $scope.search.tglFilter);
      // };

      var no = 0;
      var outstandingNota = [];

      $scope.items.forEach(function(item,index){
          no++;
          var tabelRow = createTabelRow(item,no);
          outstandingNota.push(tabelRow);
      });

    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [ 40, 60, 40, 60 ],
        style: 'dataTable',
        styles: {
            header: {
              bold: true,
              color: '#000',
              fontSize: 14,
              margin: [0, 0, 0, 8],
              alignment: 'center'
            },
            dataTable: {
              color: '#000',
              fontSize: 10,
              margin: [0, 20, 0, 8],
              alignment: 'center'
            },
            footer: {
              color: '#000',
              alignment: 'justify',
              margin: [20, 20, 20, 10],
              fontSize: 8,
              italics: true
            }
        },
        footer:function(pagenumber, pagecount) {
            return {
              text:[
                { text: 'Generated by ',style:'footer'},
                { text: namaPetugas,style: 'footer'},
                { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
                { text:' from VASA \n', style: 'footer' },
                { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
              ],margin: [20, 20, 20, 10]
            };
        },
        content: [
          { text: 'LAPORAN OUTSTANDING NOTA PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          {
            style: 'dataTable',
            table:{
              headerRows: 2,
              pageBreak: 'before',
              dontBreakRows: true,
              body: [
                [{text: "NO", rowSpan: 1, style:'tableHeader'},
                {text: "NAMA KAPAL", rowSpan: 1, style:'tableHeader'},
                {text: "NO PPK1", rowSpan: 1, style:'tableHeader'},
                {text: "NO PKK", rowSpan: 1, style:'tableHeader'},
                {text: "JENIS KAPAL", rowSpan: 1, style:'tableHeader'},
                {text: "OUTSTANDING", rowSpan: 1, style:'tableHeader'},
                {text: "TANGGAL MASUK", colSpan: 1, style:'tableHeader'},
                {text: "TANGGAL KELUAR", rowSpan: 1, style:'tableHeader'},
               ]

            ].concat(outstandingNota)

          }
        }
           ]
    };

   pdfMake.createPdf(pdfContent).download('Laporan Outstanding Nota - ' + namaCabang +' - '+ '.pdf');

  };

  $scope.generatePdfKunjunganKapal = function() {
    var namaCabang = $scope.currentCabang;
    //var reportDate = $filter('uppercase')($scope.currentMonth);

    var NIPP = localStorage.getItem('NIPP');
    var namaPetugas = localStorage.getItem('nama');
    var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

      var createTabelRow = function(item,no){
        item.tglMasuk = $filter('date')(item.tglMasuk,'dd-MM-yyyy HH:mm');
        item.tglKeluar= $filter('date')(item.tglKeluar, 'dd-MM-yyyy HH:mm'); 
        var tabelRow = [
          no.toString(),
          item.noPkk,
          item.noPpk1,
          item.noPpkJasa,
          item.jenisKapal,
          item.namaDermaga,
          item.tglMasuk,
          item.tglKeluar
        ];
        tabelRow.forEach(function(rowItem,index){
          if(rowItem == null) tabelRow[index] = '';
        });
        return tabelRow;
      }

      // $scope.bulanLaporan = function(data) {
      //   return (data.tglFilter === $scope.search.tglFilter);
      // };

      var no = 0;
      var kunjunganKapal = [];

      $scope.items.forEach(function(item,index){
          no++;
          var tabelRow = createTabelRow(item,no);
          kunjunganKapal.push(tabelRow);
      });

    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [ 40, 60, 40, 60 ],
        style: 'dataTable',
        styles: {
            header: {
              bold: true,
              color: '#000',
              fontSize: 14,
              margin: [0, 0, 0, 8],
              alignment: 'center'
            },
            dataTable: {
              color: '#000',
              fontSize: 10,
              margin: [0, 20, 0, 8],
              alignment: 'center'
            },
            footer: {
              color: '#000',
              alignment: 'justify',
              margin: [20, 20, 20, 10],
              fontSize: 8,
              italics: true
            }
        },
        footer:function(pagenumber, pagecount) {
            return {
              text:[
                { text: 'Generated by ',style:'footer'},
                { text: namaPetugas,style: 'footer'},
                { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
                { text:' from VASA \n', style: 'footer' },
                { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
              ],margin: [20, 20, 20, 10]
            };
        },
        content: [
          { text: 'LAPORAN KUNJUNGAN KAPAL PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          {
            style: 'dataTable',
            table:{
              headerRows: 2,
              pageBreak: 'before',
              dontBreakRows: true,
              body: [
                [{text: "NO", rowSpan: 1, style:'tableHeader'},
                {text: "NO PKK", rowSpan: 1, style:'tableHeader'},
                {text: "NO PPK1", rowSpan: 1, style:'tableHeader'},
                {text: "NO PPKJASA", rowSpan: 1, style:'tableHeader'},
                {text: "JENIS KAPAL", rowSpan: 1, style:'tableHeader'},
                {text: "NAMA DERMAGA", rowSpan: 1, style:'tableHeader'},
                {text: "TANGGAL MASUK", colSpan: 1, style:'tableHeader'},
                {text: "TANGGAL KELUAR", rowSpan: 1, style:'tableHeader'},
               ]

            ].concat(kunjunganKapal)

          }
        }
           ]
    };

   pdfMake.createPdf(pdfContent).download('Laporan Kunjungan Kapal - ' + namaCabang +' - '+ '.pdf');

  };

  $scope.generatePdfPendapatanKapal = function() {

    var namaCabang = $scope.currentCabang;
    var reportDate = $filter('uppercase')($scope.currentMonth);

    var NIPP = localStorage.getItem('NIPP');
    var namaPetugas = localStorage.getItem('nama');
    var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

      var createTabelRow = function(item,no){
        var tabelRow = [
          no.toString(),
          item.jenisKapal,
          item.totalPandu,
          item.totalTunda,
          item.totalTambat,
          item.totalAirKapal
        ];
        tabelRow.forEach(function(rowItem,index){
          if(rowItem == null) tabelRow[index] = '';
        });
        return tabelRow;
      }

      $scope.bulanLaporan = function(data) {
        return (data.tglFilter === $scope.search.tglFilter);
      };

      var no = 0;
      var pendapatanKapal = [];

      $scope.items.forEach(function(item,index){
          no++;
          var tabelRow = createTabelRow(item,no);
          pendapatanKapal.push(tabelRow);
      });

    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'horizontal',
        pageMargins: [ 40, 60, 40, 60 ],
        style: 'dataTable',
        styles: {
            header: {
              bold: true,
              color: '#000',
              fontSize: 14,
              margin: [0, 0, 0, 8],
              alignment: 'center'
            },
            dataTable: {
              color: '#000',
              fontSize: 10,
              margin: [0, 20, 0, 8],
              alignment: 'center'
            },
            footer: {
              color: '#000',
              alignment: 'justify',
              margin: [20, 20, 20, 10],
              fontSize: 8,
              italics: true
            }
        },
        footer:function(pagenumber, pagecount) {
            return {
              text:[
                { text: 'Generated by ',style:'footer'},
                { text: namaPetugas,style: 'footer'},
                { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
                { text:' from VASA \n', style: 'footer' },
                { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
              ],margin: [20, 20, 20, 10]
            };
        },
        content: [
          { text: 'LAPORAN PENDAPATAN KAPAL PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          { text: "BULAN "+ reportDate, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          {
            style: 'dataTable',
            table:{
              headerRows: 2,
              pageBreak: 'before',
              dontBreakRows: true,
              body: [
                [{text: "NO", rowSpan: 1, style:'tableHeader'},
                {text: "JENIS KAPAL", rowSpan: 1, style:'tableHeader'},
                {text: "JASA PANDU", rowSpan: 1, style:'tableHeader'},
                {text: "JASA TUNDA", rowSpan: 1, style:'tableHeader'},
                {text: "JASA TAMBAT", rowSpan: 1, style:'tableHeader'},
                {text: "JASA AIR KAPAL", colSpan: 1, style:'tableHeader'},
               ]

            ].concat(pendapatanKapal)

          }
        }
           ]
    };

   pdfMake.createPdf(pdfContent).download('Laporan Pendapatan Kapal - ' + namaCabang +' - '+ reportDate +'.pdf');

  };
  
  $scope.generatePdfPembatalanNota = function() {

    var namaCabang = $scope.currentCabang;
    var reportDate = $filter('uppercase')($scope.currentMonth);

    var NIPP = localStorage.getItem('NIPP');
    var namaPetugas = localStorage.getItem('nama');
    var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

      var createTabelRow = function(item,no){
        var tabelRow = [
          item.noPpk1,
          item.namaKapal,
          item.namaAgen,
          item.tglMasuk,
          item.tglKeluar,
          item.tglBatal
        ];
        tabelRow.forEach(function(rowItem,index){
          if(rowItem == null) tabelRow[index] = '';
        });
        return tabelRow;
      }

      $scope.bulanLaporan = function(data) {
        return (data.tglFilter === $scope.search.tglFilter);
      };

      var no = 0;
      var pembatalanNota = [];

      $scope.items.forEach(function(item,index){
          no++;
          var tabelRow = createTabelRow(item,no);
          pembatalanNota.push(tabelRow);
      });

    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'horizontal',
        pageMargins: [ 40, 60, 40, 60 ],
        style: 'dataTable',
        styles: {
            header: {
              bold: true,
              color: '#000',
              fontSize: 14,
              margin: [0, 0, 0, 8],
              alignment: 'center'
            },
            dataTable: {
              color: '#000',
              fontSize: 10,
              margin: [0, 20, 0, 8],
              alignment: 'center'
            },
            footer: {
              color: '#000',
              alignment: 'justify',
              margin: [20, 20, 20, 10],
              fontSize: 8,
              italics: true
            }
        },
        footer:function(pagenumber, pagecount) {
            return {
              text:[
                { text: 'Generated by ',style:'footer'},
                { text: namaPetugas,style: 'footer'},
                { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
                { text:' from VASA \n', style: 'footer' },
                { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
              ],margin: [20, 20, 20, 10]
            };
        },
        content: [
          { text: 'LAPORAN PEMBATALAN NOTA KAPAL PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          { text: "BULAN "+ reportDate, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          {
            style: 'dataTable',
            table:{
              headerRows: 2,
              pageBreak: 'before',
              dontBreakRows: true,
              body: [
                [{text: "JENIS KAPAL", rowSpan: 1, style:'tableHeader'},
                {text: "JASA PANDU", rowSpan: 1, style:'tableHeader'},
                {text: "JASA TUNDA", rowSpan: 1, style:'tableHeader'},
                {text: "JASA TAMBAT", rowSpan: 1, style:'tableHeader'},
                {text: "JASA AIR KAPAL", colSpan: 1, style:'tableHeader'},
               ]

            ].concat(pembatalanNota)

          }
        }
           ]
    };

   pdfMake.createPdf(pdfContent).download('Laporan Pembatalan Nota Kapal - ' + namaCabang +' - '+ reportDate +'.pdf');

  };

  $scope.generatePdfApprovalNota = function() {

    var namaCabang = $scope.currentCabang;
    var reportDate = $filter('uppercase')($scope.currentMonth);

    var NIPP = localStorage.getItem('NIPP');
    var namaPetugas = localStorage.getItem('nama');
    var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

      var createTabelRow = function(item,no){
        var tabelRow = [
          no.toString(),
          item.noPkk,
          item.noPpk1,
          item.namaKapal,
          $filter('date')(item.jamNaik,'dd-MM-yyyy HH:mm'),
          $filter('date')(item.jamKapalGerak,'dd-MM-yyyy'),
          $filter('date')(item.jamKapalGerak, 'HH:mm'),
          $filter('date')(item.jamTurun,'dd-MM-yyyy HH:mm'),
          $filter('date')(item.tglMulaiTunda, 'dd-MM-yyyy'),
          $filter('date')(item.tglMulaiTunda, 'HH:mm'),
          item.odb,
          item.statusNota == true ? 'SUDAH NOTA':'BELUM NOTA'
        ];
        tabelRow.forEach(function(rowItem,index){
          if(rowItem == null) tabelRow[index] = '';
        });
        return tabelRow;
      }

      $scope.bulanLaporan = function(data) {
        return (data.tglFilter === $scope.search.tglFilter);
      };

      var no = 0;
      var approvalNota = [];

      $scope.items.forEach(function(item,index){
          no++;
          var tabelRow = createTabelRow(item,no);
          approvalNota.push(tabelRow);
      });

    var pdfContent = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [ 40, 60, 40, 60 ],
        style: 'dataTable',
        styles: {
            header: {
              bold: true,
              color: '#000',
              fontSize: 14,
              margin: [0, 0, 0, 8],
              alignment: 'center'
            },
            dataTable: {
              color: '#000',
              fontSize: 10,
              margin: [0, 20, 0, 8],
              alignment: 'center'
            },
            footer: {
              color: '#000',
              alignment: 'justify',
              margin: [20, 20, 20, 10],
              fontSize: 8,
              italics: true
            }
        },
        footer:function(pagenumber, pagecount) {
            return {
              text:[
                { text: 'Generated by ',style:'footer'},
                { text: namaPetugas,style: 'footer'},
                { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
                { text:' from VASA \n', style: 'footer' },
                { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
              ],margin: [20, 20, 20, 10]
            };
        },
        content: [
          { text: 'LAPORAN APPROVAL NOTA KAPAL PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          { text: "BULAN "+ reportDate, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
          {
            style: 'dataTable',
            table:{
              headerRows: 2,
              pageBreak: 'before',
              dontBreakRows: true,
              body: [
                  [{
                    text: 'No', rowSpan:2
                  }, {
                    text: 'NO PKK', rowSpan:2
                  }, {
                    text: 'NO PPK1', rowSpan: 2
                  }, {
                    text: 'NAMA KAPAL', rowSpan: 2
                  },  {
                    text: 'PANDU NAIK', rowSpan: 2
                  }, {
                    text: 'KAPAL GERAK', colSpan: 2, alignment: 'center'
                  }, {} , {
                    text: 'PANDU TURUN', rowSpan: 2
                  }, {
                    text: 'VERIFIKASI', colSpan: 2, alignment: 'center'
                  }, {
                    text: 'ODB (Hours)', rowSpan: 2
                  }, {
                    text: 'Keterangan', rowSpan: 2
                  },
                ],
                [
                  {}, {}, {}, {}, {}, {
                    text:'Tanggal'
                  }, {} ,{
                    text: 'Jam', width: 100
                  }, {
                    text: 'Tanggal'
                  }, {}, {}
                  ]
                ] .concat(approvalNota)
          }
        }
           ]
    };

   pdfMake.createPdf(pdfContent).download('Laporan Approval Nota - ' + namaCabang +' - '+ reportDate +'.pdf');

  };

   //LoadingScreen.hide();
   // RealisasiCompletedList.get(
   //  {limit: '5'},
   //   function(response){
   //   LoadingScreen.hide();
   //   // $scope.realisasiItems = response;
   //   // $scope.realisasiCounter = $scope.realisasiItems.length;
   //   //  for (var h = 0; h < $scope.realisasiItems.length; h++) {
   //   //    var jasaList = $scope.realisasiItems[h].listNamaJasa;
   //   //    var showToolTip = false;
   //   //    for (var k=0; k<jasaList.length; k++){
   //   //      $scope.realisasiItems[h].listNamaJasa[k].nama = $scope.realisasiItems[h].listNamaJasa[k].nama.split("_").join(" ");
   //   //      if($scope.realisasiItems[h].listNamaJasa[k].nama==='pandu' || $scope.realisasiItems[h].listNamaJasa[k].nama==='tambat'){
   //   //        showToolTip = true;
   //   //      }
   //   //    }
   //   //    $scope.realisasiItems[h].showToolTip = showToolTip; //untuk menentukan tooltip
   //   //  }
   //   $scope.realisasiItems = response;
   //    $scope.realisasiCounter = $scope.realisasiItems.length;
   //    for (var h = 0; h < $scope.realisasiItems.length; h++) {
   //      var jasaList = groupBy($scope.realisasiItems[h].listNamaJasa, function(item){return [item.nama, item.status];});
   //      $scope.realisasiItems[h].listNamaJasa = jasaList;
   //      var showToolTip = false;
   //      for (var k=0; k<jasaList.length; k++){
   //        $scope.realisasiItems[h].listNamaJasa[k].nama = $scope.realisasiItems[h].listNamaJasa[k][0].nama.split("_").join(" ");
   //        if($scope.realisasiItems[h].listNamaJasa[k].nama==='pandu' || $scope.realisasiItems[h].listNamaJasa[k].nama==='tambat'){
   //          showToolTip = true;
   //        }
   //      }
   //      $scope.realisasiItems[h].showToolTip = showToolTip; //untuk menentukan tooltip
   //    }
   // });

   // KesepakatanExpiredList.get({interval_day:'30'},function(response){
   //   $scope.kesepakatanItems = response;
   //   $scope.kesepakatanCounter = $scope.kesepakatanItems.length;


   //   for (var i = 0; i < $scope.kesepakatanItems.length; i++) {
   //     if ($scope.kesepakatanItems[i].jenisKesepakatan == "PER JASA PER SARANA") {
   //        $scope.kesepakatanItems[i].link ="pelanggan";
   //     } else if ($scope.kesepakatanItems[i].jenisKesepakatan == "PER LOKASI TUJUAN") {
   //        $scope.kesepakatanItems[i].link ="perlokasitujuan";
   //     } else {
   //       $scope.kesepakatanItems[i].link ="kapallangganan";
   //     }

   //   }
   // });



   // PerubahanTarifList.get({interval_day:'30'},function(response){
   //   $scope.perubahanTarifItems = response;
   //   $scope.perubahanTarifCounter = $scope.perubahanTarifItems.length;

   //   for (var j = 0; j < $scope.perubahanTarifItems.length; j++) {
   //     switch ($scope.perubahanTarifItems[j].jenisTarif) {
   //       case "TARIF TUNDA":
   //          $scope.perubahanTarifItems[j].link = 'tunda';
   //        break;
   //        case "TARIF LABUH":
   //          $scope.perubahanTarifItems[j].link = 'labuh';
   //        break;
   //        case "TARIF AIR KAPAL":
   //          $scope.perubahanTarifItems[j].link = 'airkapal';
   //        break;
   //        case "TARIF TAMBAT":
   //          $scope.perubahanTarifItems[j].link = 'tambat';
   //        break;
   //        case "TARIF PANDU":
   //          $scope.perubahanTarifItems[j].link = 'pandu';
   //        break;

   //     }

   //   }
   // });

   $scope.tglBerlaku=[];
   $scope.harga=[];

   // HargaBBMLimitedList.get({limit: '5'},function(response){
   //   $scope.hargaBBMItems = response;

   //   for (var i = 0; i < $scope.hargaBBMItems.length; i++) {

   //     $scope.tglBerlaku[i] = $filter('date')($scope.hargaBBMItems[i].tglBerlaku,'dd-MM-yyyy');
   //     $scope.harga[i] = $scope.hargaBBMItems[i].harga;
   //   }

   //   var yAxis = ['Harga BBM'];
   //   var xAxis = ['tanggal berlaku'];

   //   for (var j = 0; j < $scope.tglBerlaku.length; j++) {
   //   var  newxAxis = xAxis.push($scope.tglBerlaku[j]);
   //   }

   //   for (var k = 0; k < $scope.harga.length; k++) {
   //   var  newyAxis = yAxis.push($scope.harga[k]);
   //   }

   //   var chart = c3.generate({
   //      data: {
   //          x: 'tanggal berlaku',
   //          xFormat: '%d-%m-%Y',
   //          columns: [
   //              xAxis,
   //              yAxis
   //          ]
   //      },
   //      axis: {
   //          x: {
   //              type: 'timeseries',
   //              tick: {
   //                  format: '%d-%m-%Y'
   //              }
   //          },
   //          y : {
   //            tick: {
   //              format: d3.format(",")
   //          },

   //        }
   //      }

   //   });


   // });

   // $scope.reloadTarif = function(){
   //   PerubahanTarifList.get({interval_day:'30'},function(response){
   //     $scope.perubahanTarifItems = response;
   //     $scope.perubahanTarifCounter = $scope.perubahanTarifItems.length;

   //     for (var j = 0; j < $scope.perubahanTarifItems.length; j++) {
   //       switch ($scope.perubahanTarifItems[j].jenisTarif) {
   //         case "TARIF TUNDA":
   //            $scope.perubahanTarifItems[j].link = 'tunda';
   //          break;
   //          case "TARIF LABUH":
   //            $scope.perubahanTarifItems[j].link = 'labuh';
   //          break;
   //          case "TARIF AIR KAPAL":
   //            $scope.perubahanTarifItems[j].link = 'airkapal';
   //          break;
   //          case "TARIF TAMBAT":
   //            $scope.perubahanTarifItems[j].link = 'tambat';
   //          break;
   //          case "TARIF PANDU":
   //            $scope.perubahanTarifItems[j].link = 'pandu';
   //          break;

   //       }

   //     }
   //   });
   // };



   // $scope.reloadKesepakatan =function(){
   //   KesepakatanExpiredList.get({interval_day:'30'},function(response){
   //     $scope.kesepakatanItems = response;
   //     $scope.kesepakatanCounter = $scope.kesepakatanItems.length;

   //     for (var i = 0; i < $scope.kesepakatanItems.length; i++) {
   //       if ($scope.kesepakatanItems[i].jenisKesepakatan == "PER JASA PER SARANA") {
   //          $scope.kesepakatanItems[i].link ="pelanggan";
   //       } else if ($scope.kesepakatanItems[i].jenisKesepakatan == "PER LOKASI TUJUAN") {
   //          $scope.kesepakatanItems[i].link ="perlokasitujuan";
   //       } else {
   //         $scope.kesepakatanItems[i].link ="kapallangganan";
   //       }

   //     }
   //   });
   // };

  // $scope.reloadRealisasi =function(){
  //   RealisasiCompletedList.get({limit:'5'},
  //   function(response){
  //     $scope.realisasiItems = response;
  //     $scope.realisasiCounter = $scope.realisasiItems.length;
  //     for (var h = 0; h < $scope.realisasiItems.length; h++) {
  //       var jasaList = groupBy($scope.realisasiItems[h].listNamaJasa, function(item){return [item.nama, item.status];});
  //       $scope.realisasiItems[h].listNamaJasa = jasaList;
  //       var showToolTip = false;
  //       for (var k=0; k<jasaList.length; k++){
  //         $scope.realisasiItems[h].listNamaJasa[k].nama = $scope.realisasiItems[h].listNamaJasa[k][0].nama.split("_").join(" ");
  //         if($scope.realisasiItems[h].listNamaJasa[k].nama==='pandu' || $scope.realisasiItems[h].listNamaJasa[k].nama==='tambat'){
  //           showToolTip = true;
  //         }
  //       }
  //       $scope.realisasiItems[h].showToolTip = showToolTip; //untuk menentukan tooltip
  //     }
  //   });
  // };

  $scope.reloadBBM =function(){

  };

  function groupBy( array , f )
  {
    var groups = {};
    array.forEach( function( o )
    {
      var group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );  
    });
    return Object.keys(groups).map( function( group ){
      return groups[group]; 
    })
  }

  $scope.getDataJasa = function (dataJasa) {
    var tempJasa = [];
    var pastTambat = [];
    var pastPandu = [];

    MonitoringDetail.get({
      ppk1  : dataJasa.noPpk1,
      urutan  : dataJasa.urutanPermohonan
    }, function(response){
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
              if(jasa.ptpJasa.jenisRevisi<9){
                pastPandu.push(jasa.ptpJasa);
              }
            }else{
              pastPandu.push(jasa);
            }
          break;
          case "epb_tambat":
            if(jasa.reaJasa){
              pastTambat.push(jasa.reaJasa);
            }else if(jasa.ptpJasa) {
              if(jasa.ptpJasa.jenisRevisi<9){
                pastTambat.push(jasa.ptpJasa);
              }
            }else{
              pastTambat.push(jasa);
            }
          break;
        }
      });
      //end - Untuk set data grid dari status detail jasa terupdate :
      
      var dataToolTipJasa = '';

      if(pastPandu.length>0){
        dataToolTipJasa += 'Pandu: ';
        pastPandu.forEach(function(item){
          dataToolTipJasa += '<br>' +item.kodeLokasiAsal+' &#8594 '+item.kodeLokasiTujuan;
        });
      }
      if(pastTambat.length>0){
        if(pastPandu.length>0 && pastTambat.length>0){
          dataToolTipJasa += '<br>';
          dataToolTipJasa += '<br>';
        }
        dataToolTipJasa += 'Tambat: ';
        pastTambat.forEach(function(item){
          dataToolTipJasa += '<br>' +item.kodeLokasi;
        });
      }
      $scope.dataToolTipJasa = dataToolTipJasa;
    });
  };
}]);