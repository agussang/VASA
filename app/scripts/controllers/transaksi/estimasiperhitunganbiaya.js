'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:EstimasiPerhitunganBiayaCtrl
 * @description
 * # EstimasiPerhitunganBiayaCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
.controller('EstimasiPerhitunganBiayaCtrl',['$scope','$routeParams','$location','$filter','$window','$rootScope','EPBInvoice','MdmPelangganSearch','MdmCabangSearch','SetStatusEPBInvoice','Notification',function ($scope,$routeParams,$location,$filter,$window,$rootScope,EPBInvoice,MdmPelangganSearch,MdmCabangSearch,SetStatusEPBInvoice,Notification) {
  $scope.listJasa = [];
  $scope.listJasaAirKapal = [];
  $scope.epb = {};

  var arrow = '\u2192';

  var dataEmpty = function(){
		$scope.detailFound = false;
		$scope.loading = false;
		$scope.contents = 'no content found';
	};

  EPBInvoice.get({kodebayar:$routeParams.kodeBayar}, function(response){
      $scope.epb = response;
     
      if($scope.epb.valuta==='IDR'){
        $scope.epb.valutaMataUang = 'Rp';
        $scope.epb.valutaTerbilang = 'rupiah';
      }else{
        $scope.epb.valutaMataUang = '$';
        $scope.epb.valutaTerbilang = 'dollar';
      }

      $scope.epb.noPpk1 = $routeParams.ppk1;

      $scope.listJasa = $filter('orderBy') (response.listJasaLabuh
													.concat(response.listJasaTambat)
													.concat(response.listJasaPandu)
													.concat(response.listJasaTunda),'tglMulai');

			$scope.epb.kodeBayar = $routeParams.kodeBayar;

      $scope.listJasaAirKapal = $filter('orderBy')(response.listJasaAirKapal,'tglMulai');
      $scope.epb.subtotalJasa = 0;
      $scope.listJasa.forEach(function (element) {
          $scope.epb.subtotalJasa = $scope.epb.subtotalJasa + element.nilaiEpb;
              if (element.namaJasa == 'Tunda' || element.namaJasa == 'Pandu') {
                  element.hide = true;
                  element.tglSelesai = ' ';
                  element.namaDermaga = element.namaLokasiAsal +' '+arrow+' '+element.namaLokasiTujuan;
                  element.namaDermagatoPrint = element.namaLokasiAsal +' -> '+element.namaLokasiTujuan;
              } else {
                element.namaDermagatoPrint = element.namaDermaga;
                if(element.tglSelesai==null || element.tglSelesai==''){
                  element.hide = true;
                }else{
                  element.hide = false;
                  element.tglSelesai = $filter('date')(element.tglSelesai, 'dd-MM-yyyy HH:mm');
                  element.tglSelesai = ' s.d '+ element.tglSelesai ;
                }
              }
        });
      $scope.epb.subtotalJasaAirKapal = 0;
      $scope.listJasaAirKapal.forEach(function(element){
        $scope.epb.subtotalJasaAirKapal = $scope.epb.subtotalJasaAirKapal + element.nilaiEpb;
        element.namaDermagatoPrint = element.namaDermaga;
      });

   });

	 MdmPelangganSearch.get({nama:$scope.epb.namaAgen,limit:1,kodeTerminal : localStorage.getItem('kodeTerminal')},function(response){
		 response[0].mplgAlamat = response[0].mplgAlamat == null ? "": response[0].mplgAlamat;
		 response[0].mplgKota = response[0].mplgKota == null ? "": response[0].mplgKota;
		 $scope.epb.alamatAgen = response[0].mplgAlamat + ' ' + response[0].mplgKota;
		 $scope.epb.teleponAgen = response[0].mplgTelepon;
		 $scope.alamatTitle = $scope.titleCase($scope.epb.alamatAgen);
	 });

  $scope.currentCabang = $rootScope.namaCabang;

	$scope.close = function(){
		$window.history.back();
	};

  $scope.setStatusEpbFromInvoice = function(){
    SetStatusEPBInvoice.update({kodebayar:$routeParams.kodeBayar}, {},function(response){
      if(response.status==='500'){
        $scope.setNotification  = {
          type : "warning",
          message : response.description
        };
        Notification.setNotification($scope.setNotification);
      }else{
        $scope.setNotification  = {
          type : "success",
          message : "Data berhasil tersimpan"
        };
        Notification.setNotification($scope.setNotification);
      }
    });
  };


  $scope.titleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  $scope.namaCabangTitle =  $scope.titleCase($scope.currentCabang);

	var kodeCabang = localStorage.getItem('kodeCabang');

	MdmCabangSearch.get({
		kodeCabang 	: parseInt(kodeCabang)
	},
	function(response){
		response[0].alamatPelb = response[0].alamatPelb == null ? " ": response[0].alamatPelb;
		response[0].kotaPelb = response[0].kotaPelb == null ? " ": response[0].kotaPelb;
		$scope.epb.alamat = response[0].alamatPelb+' '+response[0].kotaPelb;
		$scope.alamatTitleCase = $scope.titleCase($scope.epb.alamat);

	});

  $scope.confirm = function() {
      var checkDelete = confirm('Apakah anda yakin seluruh nilai EPB sudah benar?');
      if (checkDelete) {
        $scope.generate();
      }
  };


  $scope.generate = function() {

		var namaCabang = $filter('uppercase')($scope.currentCabang);

    var alamat    = $scope.epb.alamatTitle == null ? '' : $scope.epb.alamatTitle ;
    var telepon   = $scope.epb.teleponAgen == null ? '' : $scope.epb.teleponAgen ;
    var materai   = $scope.epb.materai == null ? '' : $scope.epb.materai ;
    var ppn       = $scope.epb.ppn == null ? '' : "Rp.  " + $filter('currency')($scope.epb.ppn,'',2);
    var jumlahIDRTemp = $scope.epb.jumlahIdr == null ? " " : "Rp.  " + $filter('currency')($scope.epb.jumlahIdr,'',2);
    var jumlahIDRLabelTemp = $scope.epb.jumlahIdr == null ? " " : "Jumlah IDR :";
    var kurs      = $scope.epb.kurs == null ? '' : $scope.epb.kurs ;
    var tambahan = $scope.epb.tambahan == 0 ? " " : "Rp.  " + $filter('currency')($scope.epb.tambahan,'',2);
    var tambahanLabel = $scope.epb.tambahan == 0 ? " " : "SLG of Pilot  :" ;

    var subtotalJasaLabel = $scope.listJasa.length == 0 ? " ": "Subtotal Jasa :";
    var subtotalJasaAirKapalLabel = $scope.listJasaAirKapal.length == 0 ? " ": "Subtotal Air Kapal :";
    var subtotalJasa = $scope.listJasa.length == 0 ? " ": $scope.epb.valutaMataUang+' '+$filter('currency')($scope.epb.subtotalJasa,'',2);
    var subtotalJasaAirKapal = $scope.listJasaAirKapal.length == 0 ? " ": $scope.epb.valutaMataUang+' '+$filter('currency')($scope.epb.subtotalJasaAirKapal,'',2);

    var jumlahIDR = $scope.epb.valuta == 'IDR' ? " " : jumlahIDRTemp;
    var jumlahIDRLabel = $scope.epb.valuta == 'IDR' ? " " : jumlahIDRLabelTemp;

		var createTabelRow = function(item,no){
			var tabelRow = [
				no.toString(),
				item.namaJasa,
				item.namaDermagatoPrint,
        $filter('date')(item.tglMulai,'dd-MM-yyyy HH:mm') +'\n'+$filter('date')(item.tglSelesai,'dd-MM-yyyy HH:mm'),
				item.keterangan,
        '',
        { text: [
            { text: item.valutaMataUang +' '+ $filter('currency')(item.nilaiEpb,"",2), style: 'tabTotal1' }
            ]
        }
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
		var estimasiPerhitunganBiaya = [];
    var epbAirKapal = [];


		$scope.listJasa.forEach(function(item,index){
				no++;
        if(item.tglSelesai === null){
          item.tglSelesai = '';
        }
        if(item.valuta==='IDR'){
          item.valutaMataUang = 'Rp';
          item.valutaTerbilang = 'rupiah';
        }else{
          item.valutaMataUang = '$';
          item.valutaTerbilang = 'dollar';
        }
       
				var tabelRow = createTabelRow(item,no);
				estimasiPerhitunganBiaya.push(tabelRow);
		});
    //console.log(estimasiPerhitunganBiaya);
    $scope.listJasaAirKapal.forEach(function(item,index){
        no++;
        if(item.tglSelesai === null){
          item.tglSelesai = '';
        }
        if(item.valuta==='IDR'){
          item.valutaMataUang = 'Rp';
          item.valutaTerbilang = 'rupiah';
        }else{
          item.valutaMataUang = '$';
          item.valutaTerbilang = 'dollar';
        }
       
        var tabelRow = createTabelRow(item,no);
        epbAirKapal.push(tabelRow);
    });

		var pdfContent = {
				pageSize: 'A4',
        pageOrientation: 'portrait',
				pageMargins: [ 20, 20, 20, 20 ],
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
							fontSize: 10,
							alignment: 'left'
						},
						subheader2: {
							color: '#000',
							fontSize: 10,
							alignment: 'left',
							margin: [0, 0, 0, 0]
						},
            subheader3: {
              color: '#000',
              fontSize: 12,
              alignment: 'left',
              margin: [0, 15, 0, 5]
            },
            subheader4: {
              color: '#000',
              fontSize: 10,
              alignment: 'left',
              margin: [0, 10, 0, 5]
            },
            paragraph: {
              color: '#000',
              fontSize: 10,
              alignment: 'left',
              margin: [0, 5, 0, 5]
            },
            paragraph2: {
              color: '#000',
              fontSize: 8,
              alignment: 'left',
              margin: [0, 0, 0, 0]
            },
						tableHeader: {
              color: '#000',
              bold: true,
              fontSize: 8,
              alignment: 'center'
            },
            tabTotal1: {
              color: '#000',
              bold: false,
              fontSize: 8,
              alignment: 'right'
            },
            tabTotal: {
              color: '#000',
              bold: true,
              fontSize: 8,
              alignment: 'right'
            },
            tabGrandTotal: {
              color: '#000',
              bold: true,
              fontSize: 10,
              alignment: 'right'
            },
            detailTagihan: {
              color: '#000',
              bold: true,
              fontSize: 8,
              alignment: 'right'
						},
						dataTable: {
							color: '#000',
							fontSize: 8,
							margin: [0, 20, 0, 8]
						}
					},

				content: [
					{
							alignment: 'justify',
							columns: [
								{	width:360, text: 'PT PELABUHAN INDONESIA III (PERSERO)', style:'subheader'},
								{ text: 'No. Permohonan : ' + $scope.epb.noPpk1, style:'subheader'}
							]
						},
					 {
							alignment: 'justify',
							columns: [
								{	width:360, text: namaCabang, style:'subheader2'},
								{ text: 'Kode Bayar : '+$scope.epb.kodeBayar, style:'subheader2'}
							]
						},
            {
							alignment: 'justify',
							columns: [
								{	width:360 ,text: 'PENGGUNA JASA', style:'subheader3'},
								{ text: 'KETERANGAN', style:'subheader3'}
							]
  					},
            {
  						alignment: 'justify',
  						columns: [
  							{	width:360, text: $scope.epb.namaAgen, style:'paragraph2'},
  							{ text: 'Kapal : '+$scope.epb.namaKapal, style:'paragraph2'}
  						]
  					},
            {
  						alignment: 'justify',
  						columns: [
  							{	width:360, text: ' ditagihkan kepada '+ $scope.epb.namaAgen , style:'paragraph2'},
  							{ text: 'Asal : '+$scope.epb.namaPelabuhanAsal, style:'paragraph2'}
  						]
  					},
            {
  						alignment: 'justify',
  						columns: [
  							{	width:360, text: alamat, style:'paragraph2'},
  							{ text: 'Tujuan : '+$scope.epb.namaPelabuhanTujuan, style:'paragraph2'}
  						]
  					},
            {
  						alignment: 'justify',
  						columns: [
  							{	width:360, text: telepon, style:'subheader'},
  							{ text: 'ETA : '+ $filter('date')($scope.epb.tglMulai?$scope.epb.tglMulai:' - ', 'dd-MM-yyyy HH:mm'), style:'paragraph2'}
  						]
  					},
            {
  						alignment: 'justify',
  						columns: [
  							{	width:360, text: '', style:'subheader'},
  							{ text: 'ETD : '+$filter('date')($scope.epb.tglSelesai?$scope.epb.tglSelesai:' - ', 'dd-MM-yyyy HH:mm'), style:'paragraph2'}
  						]
  					},
						{
							style: 'dataTable',
              layout: 'noBorders',
              table:{
                headerRows: 1,
                pageBreak: 'before',
                dontBreakRows: true,
                widths: [ 'auto', 'auto',80, 80,'auto', 'auto', 100 ],
								body:[
									[{text: "#", style:'tableHeader'},
									{text: "Jasa", style:'tableHeader'},
									{text: "Lokasi", style:'tableHeader'},
									{text: "Waktu", style:'tableHeader'},
									{text: "keterangan", style:'tableHeader'},
                  {text: "Tagihan", colSpan :2, style:'tableHeader'},
                  {alignment:'justify'}
								]
              ].concat(estimasiPerhitunganBiaya)
               .concat([
                 [{text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: subtotalJasaLabel, style:'tableHeader',alignment:'right'},
                 {text: subtotalJasa, colSpan :2, style:'tableHeader',alignment:'right'},
                 {alignment:'justify'}
               ]
             ])
               .concat(epbAirKapal)
               .concat([
                 [{text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: "", style:'tableHeader'},
                 {text: subtotalJasaAirKapalLabel, style:'tableHeader',alignment:'right'},
                 {text: subtotalJasaAirKapal, colSpan :2, style:'tableHeader',alignment:'right'},
                 {alignment:'justify'}
               ]
             ])
							}
						},
            {
  						alignment: 'right',
  						columns: [
  							{	width: 460, text: 'PT Pelabuhan Indonesia III (Persero)', style:'paragraph2'},
  							{ width: 100, text: '-------------------------------------------------------------------', fontSize:6}
  						]
  					},
            {
  						alignment: 'right',
  						columns: [
  							{	width: 350, text: 'Cabang ' + $scope.namaCabangTitle, style:'paragraph2'},
                { width: 100, text: "", style:'tabTotal1', alignment:'right'},
                { text:""}
  						]
  					},
            {
              alignment: 'right',
              columns: [
                { width: 300, text: ''},
                { width: 100, text: 'Total : ', style:'tabTotal1', alignment:'right'},
                { text: $scope.epb.valutaMataUang+' '+$filter('currency')($scope.epb.subtotal,'',2), style:'tabTotal1'}
              ]
            },
						{
  						alignment: 'right',
  						columns: [
                { width: 300, text: $scope.alamatTitleCase, style:'paragraph2'},
                { width: 100, text: jumlahIDRLabel, style:'tabTotal1', alignment:'right'},
                { text: jumlahIDR, style:'tabTotal1'}
  						]
  					},
            {
              alignment: 'right',
              columns: [
                { width: 300, text: " ", style:'paragraph2'},
                { width: 100, text: tambahanLabel, style:'tabTotal1', alignment:'right'},
                { text: tambahan, style:'tabTotal1'}
              ]
            },
            {
              alignment: 'right',
              columns: [
                { width: 300, text: " ", style:'paragraph2'},
                { width: 100, text: "PPN :", style:'tabTotal1', alignment:'right'},
                { text: ppn, style:'tabTotal1'}
              ]
            },
            {
  						alignment: 'right',
              headerRows: 1,
  						columns: [
                { width: 240, text: '', style:'paragraph2'},
                { width: 60, text: '$ 1 = Rp '+$filter('currency')(kurs,'',2), style:'tabTotal1', fontSize: 6},
                { width: 100, text: 'Materai : ', style:'tabTotal1', alignment:'right'},
                { text: 'Rp.  '+'  '+$filter('currency')(materai,'',2), style:'tabTotal1'}
  						]
  					},
            {
              alignment: 'right',
              columns: [
                { width: 460, text: ''},
                { width: 100, text: '-------------------------------------------------------------------', fontSize:6}
              ]
            },
            {
              alignment: 'right',
              columns: [
                { width: 300, text: '', style:'subheader4'},
                { width: 100, text: 'Grand Total : ', style:'tabGrandTotal', alignment:'right'},
                { text: 'Rp.  '+$filter('currency')($scope.epb.grandtotal,'',2), style:'tabGrandTotal'}
              ]
            },
            {
  						alignment: 'right',
  						columns: [
                { width: 460, text: ''},
                { width: 100, text: '-------------------------------------------------------------------', fontSize:6}
  						]
  					},
            /*{
  						alignment: 'right',
  						columns: [
                { width: 350, text: '', style:'paragraph2'},
                { width: 100, text: 'kurs : ', style:'tabTotal', alignment:'right'},
                { text: 'Rp '+$filter('currency')(kurs,'',2), style:'tabTotal'}
  						]
  					},*/
            {
  						columns: [
  							{	width: 200,text: '', style:'subheader'},
                {
                  alignment:'center',
    							style: 'dataTable',
                  italics: true,
                  layout: {
    												hLineColor: function(i, node) {
    														return (i === 0 || i === node.table.body.length) ? 'red' : 'red';
    												},
    												vLineColor: function(i, node) {
    														return (i === 0 || i === node.table.widths.length) ? 'red' : 'red';
    												},
    						},
    							table:{
    								headerRows: 1,
    								body:[
    									[
                        {text: "BUKAN BUKTI BAYAR", style:'subheader'},
    								  ]
                  ]
    							}
    						}
  						]
  					},
            {
  							alignment: 'justify',
  							columns: [
  								{ text: '* Jasa air kapal tidak dihitung dalam PPN.', style:'paragraph2'}
  							]
  						},

				],

		};

	pdfMake.createPdf(pdfContent).download('epb - kode bayar :' + $scope.epb.kodeBayar +'.pdf');
	//var url = 'data:text/json;charset=utf8,'+encodeURIComponent(JSON.stringify(dd));
	//window.open(url,'_blank');
	};


}]);
