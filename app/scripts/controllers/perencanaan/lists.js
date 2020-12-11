'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PerencanaanListsCtrl
 * @description
 * # PerencanaanListsCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('PerencanaanListsCtrl', ['$scope', '$rootScope', '$filter', '$timeout', '$routeParams', '$location', '$window', 'ListKapalPrameeting', 'ReportKapalPrameeting','ReportKapalPrarencana', 'AppParam', '$PAGE_SIZE', 'Notification', 'LoadingScreen', 'UserRole', 'MdmDermagaSearchByKode', 'MdmDermagaPerJasa', 'ParamsCabangList', 'MdmDermagaByKodeCabang', function($scope, $rootScope, $filter, $timeout, $routeParams, $location, $window, ListKapalPrameeting, ReportKapalPrameeting,ReportKapalPrarencana, AppParam, $PAGE_SIZE, Notification, LoadingScreen, UserRole, MdmDermagaSearchByKode, MdmDermagaPerJasa, ParamsCabangList, MdmDermagaByKodeCabang) {
        $scope.userRole = UserRole.getCurrentRole();
        LoadingScreen.show();

        $scope.items = {};
        $scope.currentCabang = $rootScope.namaCabang;
        $scope.hasilPrameetingList = [];
        // var filterTglAwal = undefined;
        // var filterTglAkhir = undefined;
        $scope.tanggalPerencanaan = $filter('date')($routeParams.tgl, 'yyyy-MM-dd');
        $scope.kodeDermaga = $routeParams.kodeDermaga;
        $scope.showLoader = false;
        $scope.locationPath = '';
        var kota_meeting = '';
        var mng_pelayanan_kapal = '';
        $scope.dermaga = [];
        $scope.idDermaga = [{'mdmgKode' : $routeParams.kodeDermaga}];

        $scope.tanggalPrameeting = $filter('date')($scope.tanggalPerencanaan, 'dd-MM-yyyy');
        $scope.options = {
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true
        };
        $scope.optionSizePage = {
            availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
            selectedOption: {number: $PAGE_SIZE} //default select option size
        };

        ParamsCabangList.get({nama : 'KOTA_MEETING'}, function(response){
            kota_meeting = response.content[0].value;
        });

        ParamsCabangList.get({nama : 'MNG_PELAYANAN_KAPAL'}, function(response){
            mng_pelayanan_kapal = response.content[0].value;
        });

        MdmDermagaByKodeCabang.get({kodeCabang: localStorage.getItem('kodeCabang')},function(response) {
            $scope.dermaga = response;
        }); 

        $scope.getListOfDermagaLabuh = function(value) {
            if (value && value.length <= 3) {
                return new Promise(function(resolve) {
                    MdmDermagaSearchByKode.get({
                            kode: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            } else if (value.length > 3) {
                return new Promise(function(resolve) {
                    MdmDermagaPerJasa.get({
                            nama: value,
                            kodeTerminal: localStorage.getItem('kodeTerminal'),
                            limit: '10'
                        },
                        function(response) {
                            resolve(response);
                            response.forEach(function(response) {
                                response.mdmgNamaKode = response.mdmgNama + ' (' + response.mdmgKode + ')';
                            });
                        });
                });
            }
        };

        /* validasi autocomplete */
        var valueField = '';
        $scope.checkValue = function(value) {
            valueField = value;
        };

        // validation add
        $scope.validationSelectDermaga = function() {
            if (valueField !== $scope.dermaga) {
                if (typeof $scope.dermaga !== 'object') {
                    $scope.setNotification = {
                        type: 'warning',
                        message: 'Data yang Anda Masukan, <b>Tidak Ada dalam Pilihan</b>'
                    };
                    Notification.setNotification($scope.setNotification);
                    $scope.dermaga = '';
                }
            }
        };
        $scope.arrayDataKapal = [];
        $scope.arrayDataKapalNew = [];

        $scope.currentPage = 1;
        $scope.pageSize = $scope.optionSizePage.selectedOption.number;
        $scope.totalItems = 0;
        $scope.totalPages = 0;
        $scope.sortBy = '';
        $scope.sortDesc = false;

        /*$scope.loadHasilPrameeting = function(newPage) {
            $scope.hasilPrameetingList=[];
            
            
            ReportKapalPrarencana.get(
                {
                    kodeDermaga: String($scope.kodeDermaga),
                    tglPerencanaan: String($scope.tanggalPerencanaan),
                    size : $scope.optionSizePage.selectedOption.number,
                    page : newPage - 1,
                    sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                },
                function(response) {
                    // console.log(response);
                    $scope.showLoader = false;
                    LoadingScreen.hide();
                    $scope.currentPage = response.number + 1;
                    $scope.noIndex = ($scope.currentPage-1)*response.size;
                    $scope.pageSize = response.size;
                    $scope.totalItems = response.totalElements;
                    $scope.totalPages = response.totalPages;
                    response.content.forEach(function(item){
                        item.penetapanTgl = item.penetapanTgl.substring(0, 2);
                        item.penetapanJam = item.penetapanJam.substring(0, 2);
                        item.closingTgl = item.closingTgl.substring(0, 2);
                        item.closingJam = item.closingJam.substring(0, 2);
                        item.startTgl = $filter('date')(item.mulai,'dd');
                        item.startJam = $filter('date')(item.mulai,'HH');
                    });
                    $scope.hasilPrameetingList = response.content;

                    $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize * $scope.currentPage)+' of '+$scope.totalItems;
            });
        }*/

        $scope.loadHasilPrameeting = function(newPage) { 
            $scope.hasilPrameetingList=[];

            if($scope.idDermaga.length){ 
                for (var i = 0; i < $scope.idDermaga.length; i++) { 
                    var x = '';
                    if($scope.idDermaga[i].mdmgKode){
                        x = $scope.idDermaga[i].mdmgKode;
                    }else{
                        x = $scope.idDermaga[i];
                    }
                    var tglPrameeting = $scope.tanggalPrameeting.split("-");
                    // var tglPrameeting = new Date()
                    var conTglPrameeting = tglPrameeting[2] + "-" + tglPrameeting[1] + "-" + tglPrameeting[0];
                    
                    ReportKapalPrarencana.get(
                        {
                            kodeDermaga: x,
                            tglPerencanaan: conTglPrameeting,
                            size : $scope.optionSizePage.selectedOption.number,
                            page : newPage - 1,
                            sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
                        },
                        function(response) {                         

                            LoadingScreen.hide();
                            if(response.content.length > 0){
                                response.content.forEach(function(item){
                                    item.penetapanTgl = item.penetapanTgl.substring(0, 2);
                                    item.penetapanJam = item.penetapanJam.substring(0, 2);
                                    item.closingTgl = item.closingTgl.substring(0, 2);
                                    item.closingJam = item.closingJam.substring(0, 2);
                                    item.startTgl = $filter('date')(item.mulai,'dd');
                                    item.startJam = $filter('date')(item.mulai,'HH');
                                    $scope.hasilPrameetingList.push(item);  
                                });
                                                               
                            }     
                            $scope.showLoader = false;                    
                    });  
                }               
            }
        }

        $scope.loadHasilPrameeting(0);

        $scope.goToPenetapan = function() {
            $location.path('penetapan/' + $routeParams.kodeDermaga + '/' + $routeParams.tgl);
        };

        $scope.changeData = function() {
            var dermaga = '';
            var tglPrameeting = $scope.tanggalPrameeting.split("-");
            // var tglPrameeting = new Date()
            var conTglPrameeting = tglPrameeting[2] + "-" + tglPrameeting[1] + "-" + tglPrameeting[0];

            if (typeof $scope.dermaga === "string") {
                dermaga = $scope.kodeDermaga;
            } else if (typeof $scope.dermaga === "object") {
                dermaga = $scope.dermaga.mdmgKode;
            }
            //$location.path('prameeting/report/' + dermaga + '/' + conTglPrameeting);
            $scope.hasilPrameetingList = [];
            $scope.loadHasilPrameeting(0);
        };


        $scope.printHasilPrameeting = [];
        $scope.printHasilPrameetingNew = [];

        $scope.generatePdf = function() {

            var namaCabang = $filter('uppercase')($scope.currentCabang);
            var reportDate = $filter('date')($scope.tanggalPerencanaan,'dd-MM-yyyy');
            var NIPP = localStorage.getItem('NIPP');
            var namaPetugas = localStorage.getItem('nama');
            var tglLaporan = $filter('date')(Date.now(), 'dd-MM-yyyy hh:mm:ss');
            var counter = 0;
            var namaDermaga = [];
            $scope.idDermaga.forEach(function(kapal, index) {
                namaDermaga.push(kapal.mdmgNama);
            });

            var createTabelRow = function(kapal, no) {
                if(kapal.isMeetingSusulan == true){
                    var capMeetingSusulan = "\n Meeting Susulan";
                }else if(kapal.isMeetingSusulan == false){
                    var capMeetingSusulan = "";
                }else{
                   var capMeetingSusulan = ""; 
                }

                var tabelRow = [
                    no.toString(),
                    kapal.namaKapal+capMeetingSusulan,
                    kapal.noPpk1,
                    kapal.namaAgen,
                    kapal.pbm,
                    kapal.grt,
                    kapal.loa,
                    kapal.b,
                    kapal.m,
                    kapal.jenisMuatan,
                    kapal.namaDermaga,
                    kapal.kadeAwal + '-' + kapal.kadeAkhir,
                    kapal.startTgl,
                    kapal.startJam,
                    kapal.closingTgl.substring(0, 2),
                    kapal.closingJam.substring(0, 2),
                    (kapal.noGudang == ''?'-':kapal.noGudang),
                    kapal.pelabuhanAsal+ '-' +kapal.pelabuhanTujuan,
                    kapal.keteranganExKapal
                ];
               
                tabelRow.forEach(function(rowItem, index) {
                    if (rowItem == null) tabelRow[index] = '';
                });
                return tabelRow;
            }

            $scope.bulanLaporan = function(data) {
                return (data.tglFilter === $scope.tanggalPerencanaan);
            };

            var no = 0;
            var laporanPrameeting = [];

            //$scope.hasilPrameetingList[i].dataKapal.filter($scope.bulanLaporan).forEach(function(kapal,index){
            $scope.hasilPrameetingList.forEach(function(kapal, index) {
                no++;
                var tabelRow = createTabelRow(kapal,no);
                laporanPrameeting.push(tabelRow);
            });

            var pdfContent = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 50],
                styles: {
                    header: {
                        bold: true,
                        color: '#000',
                        fontSize: 12,
                        alignment: 'center'
                    },
                    subheader: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'left'
                    },
                    subheader2: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'left',
                        margin: [60, 0, 0, 0]
                    },
                    tableHeader: {
                        color: '#000',
                        bold: true,
                        fontSize: 8,
                        alignment: 'center'
                    },
                    dataTable: {
                        color: '#000',
                        fontSize: 7,
                        margin: [0, 20, 0, 8]
                    },
                    footer: {
                        color: '#000',
                        margin: [20, 20, 20, 10],
                        fontSize: 8,
                        italics: true
                    },
                    footer2: {
                        alignment: 'center',
                        margin: [0, 70, 0, 0]
                    },
                    footer3: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'center'
                    },
                    footer4: {
                        bold: true,
                        color: '#000',
                        fontSize: 8,
                        alignment: 'center',
                        margin: [60, 0, 0, 0]
                    }
                },
                footer: function(pagenumber, pagecount) {
                    return {
                        text: [
                            { text: 'Generated by ', style: 'footer' },
                            { text: namaPetugas, style: 'footer' },
                            { text: ' (' + NIPP + ') ' + ' on ' + tglLaporan, style: 'footer' },
                            { text: ' from VASA \n', style: 'footer' },
                            { text: pagenumber + ' of ' + pagecount, style: 'footer', alignment: 'right', italics: false }
                        ],
                        margin: [20, 20, 20, 10]
                    };
                },
                content: [{
                        alignment: 'justify',
                        columns: [
                            { text: 'PT.(PERSERO) PELABUHAN INDONESIA III\n', style: 'subheader' },
                            { text: 'PRARENCANA PENAMBATAN KAPAL & BONGKAR MUAT', style: 'subheader2'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'CABANG '+ namaCabang, style: 'subheader' },
                            { text: 'TERMINAL : ' + namaDermaga, style: 'subheader2' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '' },
                            { text: 'TANGGAL : '+reportDate, style: 'subheader2' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: '____________________________________________', style: 'subheader' },
                            { text: '______________________________________________________________' , style: 'subheader2' }
                        ]
                    },
                    {
                        style: 'dataTable',
                        table: {
                            headerRows: 3,
                            pageBreak: 'before',
                            dontBreakRows: true,
                            body: [
                                [
                                    { text: "\n\nNO", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nNama Kapal", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nNo PPK1", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nAgen", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nPBM", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nGRT", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nLOA", rowSpan: 3, style: 'tableHeader' },
                                    { text: "Kegiatan", colSpan: 2, style: 'tableHeader' },
                                    {},
                                    { text: "\n\nKomoditi", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nDermaga", rowSpan: 3, style: 'tableHeader' },
                                    { text: "Tambatan", colSpan: 5, style: 'tableHeader' },
                                    {},
                                    {},
                                    {},
                                    {},
                                    { text: "\n\nNo Gudang", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nAsal/Tujuan", rowSpan: 3, style: 'tableHeader' },
                                    { text: "\n\nKeterangan", rowSpan: 3, style: 'tableHeader' }
                                ],
                                [
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    { text: 'B', rowSpan: 2,style: 'tableHeader'},
                                    { text: 'M', rowSpan: 2,style: 'tableHeader'},
                                    {},
                                    {},
                                    { text: 'Posisi',rowSpan: 2,style: 'tableHeader'},
                                    { text: 'Penetapan', colSpan: 2,style: 'tableHeader'},
                                    {},
                                    { text: 'Closing',colSpan: 2,style: 'tableHeader'},
                                    {},
                                    {},
                                    {},
                                    {}
                                ],
                                [
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    { text: 'Tgl', alignment: 'center' },
                                    {text: 'Jam', alignment: 'center' },
                                    { text: 'Tgl', alignment: 'center' },
                                    {text: 'Jam', alignment: 'center' },
                                    {},
                                    {},
                                    {}
                                ]
                            ].concat(laporanPrameeting)
                        }
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
                            { text: 'MENYETUJUI PERENCANAAN INI MENJADI PENETAPAN', style: 'footer3' },
                            { text: kota_meeting+', '+ $filter('date')(new Date(),'dd-MM-yyyy'), style: 'footer4'}
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'PENAMBATAN KAPAL DAN BONGKAR MUAT', style: 'footer3' },
                            { text: 'MANAJER PELAYANAN KAPAL', style: 'footer4' }
                        ]
                    },
                    {
                        alignment: 'justify',
                        columns: [
                            { text: 'DI PELABUHAN ' + namaCabang, style: 'footer3' },
                            { text: '', style: 'footer4' }
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
                            { text: 'PADA TANGGAL ...................... ', style: 'footer3' },
                            {}
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
                            { text: 'An. KEPALA KANTOR OTORITAS PELABUHAN ' + namaCabang +'\n KABID LALA OPERASI & USAHA KEPELABUHAN',style: 'footer3'},
                            { text: mng_pelayanan_kapal, style: 'footer4' }
                        ]
                    }
                ],

            };

            pdfMake.createPdf(pdfContent).download("Laporan-Hasil-Meeting-"+namaCabang+"-"+reportDate+".pdf");
            //var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
            //window.open(url,'_blank');
        };

        $scope.generateExcel = function () {
            var namaCabang = $filter('uppercase')($scope.currentCabang);
            var reportDate = $filter('date')($scope.tanggalPerencanaan, 'dd-MM-yyyy');

            var blob = new Blob([document.getElementById('tabel-meeting').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, 'Laporan Hasil Meeting - ' + namaCabang + ' - ' + reportDate + '.xlsx');
        };

    }]);