'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:LaporanHarianCtrl
 * @description
 * # LaporanHarianCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('LaporanPNBPCtrl',['$scope','$filter','$rootScope','ListCabang','PNBPList','LoadingScreen','$http','API_PATH',
    function ($scope,$filter,$rootScope,ListCabang,PNBPList,LoadingScreen,$http,API_PATH) {
    
    $scope.currentCabang = $rootScope.namaCabang;
    $scope.confirm = {};
    $scope.listCabang = [];
    $scope.search = { tglFilter: '' };
    $scope.search.tglFilter = $filter('date')(new Date(), 'MM-yyyy');
    // $scope.idCabang = localStorage.getItem('kodeCabang');
    $scope.idCabang = localStorage.getItem('kodeTerminal');
    
    $scope.$watch('isPusat', function() {
      if($scope.isPusat !== null){
        ListCabang.get(function(response){
          $scope.listCabang = response;
        });
      } else {
        $scope.currentCabang ="";
      }
    });

  $scope.currentCabang = $filter('uppercase')($scope.currentCabang);

  $scope.tanggalHariIni = new Date();
  $scope.currentMonth = $filter('uppercase')($filter('date')($scope.tanggalHariIni,'MMMM-yyyy'));

  $scope.items = [];

  // $scope.nullChecking = function(data){
  //   data.forEach(function (element) {
  //     element.area  = (element.area !== null ?element.area:'-');
  //     element.bendera = (element.bendera !== null ?element.bendera:'-');
  //     element.dwt  = (element.dwt !==null ?element.dwt:'-');
  //     element.gtKapal  = (element.gtKapal !== null ?element.gtKapal:'-');
  //     element.jumlahTunda  = (element.jumlahTunda !== null ?element.jumlahTunda:'-');
  //     element.lamaPelayanan = (element.lamaPelayanan !== null ?element.lamaPelayanan:'-');
  //     element.loa  = (element.loa !== null ?element.loa:'-');
  //     element.namaAgen  = (element.namaAgen !== null ?element.namaAgen:'-');
  //     element.namaKapal  = (element.namaKapal !== null ?element.namaKapal:'-');
  //     element.noPkk  = (element.noPkk !== null ?element.noPkk:'-');
  //     element.noPpk1  = (element.noPpk1 !== null ?element.noPpk1:'-');
  //     element.pendPandu  = (element.pendPandu !== null ?element.pendPandu:'-');
  //     element.pendTunda  = (element.pendTunda !== null ?element.pendTunda:'-');
  //     element.pnpbPandu  = (element.pnpbPandu !== null ?element.pnpbPandu:'-');
  //     element.pnpbTunda  = (element.pnpbTunda !== null ?element.pnpbTunda:'-');
  //     element.surcharge  = (element.surcharge !== null ?element.surcharge:'-');
  //     element.tglKeluar  = (element.tglKeluar !== null ?element.tglKeluar:'-');
  //     element.tglMasuk  = (element.tglMasuk !== null ?element.tglMasuk:'-');
  //     element.tglFilter = $filter('date')(element.tglPermohonan,'MMMM-yyyy');
  //   });
  // };

  // $scope.loadLaporanPnbp = function() {
  //   var splitDate = $scope.search.tglFilter.split('-');
  //   $scope.bulanLaporan = splitDate[0];
  //   $scope.tahunLaporan = splitDate[1];
  //   $scope.currentMonth = $filter('uppercase')($filter('date')(new Date($scope.tahunLaporan, $scope.bulanLaporan - 1), 'MMMM-yyyy'));
  //   LoadingScreen.show();
  //   PNBPList.get({
  //     kodeCabang: ('0' + $scope.idCabang).slice(-2),
  //     periode: $scope.bulanLaporan + $scope.tahunLaporan

  //   },function (response) {
  //     $scope.items = response;
  //     //$scope.nullChecking($scope.items);
  //   }); 
  //   LoadingScreen.hide();
  // };

    $scope.$watch('search.tglFilter', function (newValue) {
      if (newValue) {
        //$scope.loadLaporanPnbp();
      }
    });
  
  // $scope.generatePdf = function() {

  //   var namaCabang = $scope.currentCabang;
  //   var reportDate = $filter('uppercase')($scope.currentMonth);

  //   var NIPP = localStorage.getItem('NIPP');
  //   var namaPetugas = localStorage.getItem('nama');
  //   var tglLaporan = $filter('date')(Date.now(),'dd-MM-yyyy hh:mm:ss');

  //     var createTabelRow = function(item,no){
  //       var tabelRow = [
  //         no.toString(),
  //         item.area,
  //         item.bendera,
  //         item.dwt,
  //         item.gtKapal,
  //         item.jumlahTunda,
  //         item.lamaPelayanan,
  //         item.loa,
  //         item.namaAgen,
  //         item.namaKapal,
  //         item.noPkk,
  //         item.noPpk1,
  //         item.pendPandu,
  //         item.pendTunda,
  //         item.pnpbPandu,
  //         item.pnpbTunda,
  //         item.surcharge,
  //         item.tglKeluar,
  //         item.tglMasuk
  //       ];
  //       tabelRow.forEach(function(rowItem,index){
  //         if(rowItem == null) tabelRow[index] = '';
  //       });
  //       return tabelRow;
  //     }

  //     $scope.bulanLaporan = function(data) {
  //       return (data.tglFilter === $scope.search.tglFilter);
  //     };

  //     var no = 0;
  //     var laporanPnbp = [];

  //     $scope.items.forEach(function(item,index){
  //         no++;
  //         var tabelRow = createTabelRow(item,no);
  //         laporanPnbp.push(tabelRow);
  //     });

  //   var pdfContent = {
  //       pageSize: 'A4',
  //       pageOrientation: 'landscape',
  //       pageMargins: [ 40, 60, 40, 60 ],
  //       style: 'dataTable',
  //       styles: {
  //           header: {
  //             bold: true,
  //             color: '#000',
  //             fontSize: 14,
  //             margin: [0, 0, 0, 8],
  //             alignment: 'center'
  //           },
  //           dataTable: {
  //             color: '#000',
  //             fontSize: 10,
  //             margin: [0, 20, 0, 8],
  //             alignment: 'center'
  //           },
  //           footer: {
  //             color: '#000',
  //             alignment: 'justify',
  //             margin: [20, 20, 20, 10],
  //             fontSize: 8,
  //             italics: true
  //           }
  //       },
  //       footer:function(pagenumber, pagecount) {
  //           return {
  //             text:[
  //               { text: 'Generated by ',style:'footer'},
  //               { text: namaPetugas,style: 'footer'},
  //               { text:' ('+ NIPP +') '+ ' on '+ tglLaporan, style: 'footer'},
  //               { text:' from VASA \n', style: 'footer' },
  //               { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment:'right', italics:false }
  //             ],margin: [20, 20, 20, 10]
  //           };
  //       },
  //       content: [
  //         { text: 'LAPORAN PNBP PT PELABUHAN INDONESIA III '+ namaCabang, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
  //         { text: "BULAN "+ reportDate, fontSize: 14, bold: true, alignment:'center',margin: [0, 0, 0, 8] },
  //         {
  //           style: 'dataTable',
  //           table:{
  //             headerRows: 2,
  //             pageBreak: 'before',
  //             dontBreakRows: true,
  //             body: [
  //               [{text: "NO", rowSpan: 1, style:'tableHeader'},
  //               {text: "AREA", rowSpan: 1, style:'tableHeader'},
  //               {text: "BENDERA", rowSpan: 1, style:'tableHeader'},
  //               {text: "DWT", rowSpan: 1, style:'tableHeader'},
  //               {text: "GT KAPAL", rowSpan: 1, style:'tableHeader'},
  //               {text: "JUMLAH TUNDA", colSpan: 1, style:'tableHeader'},
  //               {text: "LAMA PELAYANAN", rowSpan: 1, style:'tableHeader'},
  //               {text: "LOA", rowSpan: 1, style:'tableHeader'},
  //               {text: "NAMA AGEN", rowSpan: 1, style:'tableHeader'},
  //               {text: "NAMA KAPAL", rowSpan: 1, style:'tableHeader'},
  //               {text: "NO PKK", rowSpan: 1, style:'tableHeader'},
  //               {text: "NO PPK1", rowSpan: 1, style:'tableHeader'},
  //               {text: "PENDAPATAN PANDU", rowSpan: 1, style:'tableHeader'},
  //               {text: "PENDAPATAN TUNDA", rowSpan: 1, style:'tableHeader'},
  //               {text: "PNPB PANDU", rowSpan: 1, style:'tableHeader'},
  //               {text: "PNPB TUNDA", rowSpan: 1, style:'tableHeader'},
  //               {text: "SURCHARGE", rowSpan: 1, style:'tableHeader'},
  //               {text: "TGL KELUAR", rowSpan: 1, style:'tableHeader'},
  //               {text: "TGL MASUK", rowSpan: 1, style:'tableHeader'},
  //              ]

  //           ].concat(laporanPnbp)

  //         }
  //       }
  //          ]
  //   };

  //  pdfMake.createPdf(pdfContent).download('Laporan PNBP - ' + namaCabang +' - '+ reportDate +'.pdf');

  // };

  $scope.generateExcel = function () {
            LoadingScreen.show();
            var namaCabang = $filter('uppercase')($scope.currentCabang);
            var splitDate = $scope.search.tglFilter.split('-');
            $scope.bulanLaporan = splitDate[0];
            $scope.tahunLaporan = splitDate[1];
            $scope.currentMonth = $filter('uppercase')($filter('date')(new Date($scope.tahunLaporan, $scope.bulanLaporan - 1), 'MMMM-yyyy'));

            var namaFile = '';
            var url = '';
            $http.get(API_PATH + 'public/permohonan/report_pnbp?kodeCabang=' + ('0' + $scope.idCabang).slice(-2) + '&periode=' + $scope.bulanLaporan +  $scope.tahunLaporan)
                .success(function (response) {
                    if (response) {
                        LoadingScreen.hide();
                        namaFile = response;
                        url = API_PATH +'public/file/download?filename='+ namaFile;
                        window.open(url, '_blank');
                    }
                });
        };

}]);
