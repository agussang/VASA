'use strict';

/**
 * @ngdoc service
 * @name vasaApp.vasaapp
 * @description
 * # vasaapp
 * Service in the vasaApp.
 */

angular.module('vasaApp')
	// tarif labuh
	.service('TarifLabuhList', ['$resource', 'API_PATH', function TarifLabuhList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_labuh', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifLabuhDetail', ['$resource', 'API_PATH', function TarifLabuhDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_labuh/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('TarifLabuhDelete', ['$resource', 'API_PATH', function TarifLabuhDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_labuh/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifLabuhAdd', ['$resource', 'API_PATH', function TarifLabuhAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_labuh', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	.service('TarifLabuhEdit', ['$resource', 'API_PATH', function TarifLabuhEdit($resource, API_PATH) {
		// return $resource(API_PATH+'tarif_labuh/:id',{},{update:{method:'PUT'}	});
		return $resource(API_PATH + 'tarif_labuh/:id', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])


	//marvin Approval

	.service('TarifLabuhEditApproval', ['$resource', 'API_PATH', function TarifLabuhEdit($resource, API_PATH) {
		// return $resource(API_PATH+'tarif_labuh/:id',{},{update:{method:'PUT'}	});
		return $resource(API_PATH + 'tarif_labuh/approval', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//tarif air kapal
	.service('TarifAirKapalList', ['$resource', 'API_PATH', function TarifAirKapalList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifAirKapalDetail', ['$resource', 'API_PATH', function TarifAirKapalDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifAirKapalDelete', ['$resource', 'API_PATH', function TarifAirKapalDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifAirKapalAdd', ['$resource', 'API_PATH', function TarifAirKapalAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('TarifAirKapalEdit', ['$resource', 'API_PATH', function TarifAirKapalEdit($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	//approval by marvin

	.service('TarifAirKapalEditApproval', ['$resource', 'API_PATH', function TarifAirKapalEditApproval($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_air_kapal/approval', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])


	//tarif pandu
	.service('TarifPanduList', ['$resource', 'API_PATH', function TarifPanduList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifPanduDetail', ['$resource', 'API_PATH', function TarifPanduDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifPanduDelete', ['$resource', 'API_PATH', function TarifPanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifPanduAdd', ['$resource', 'API_PATH', function TarifPanduAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('TarifPanduEdit', ['$resource', 'API_PATH', function TarifPanduEdit($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])


	//approval by marvin

    	.service('TarifPanduEditApproval', ['$resource', 'API_PATH', function TarifPanduEditApproval($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_pandu/approval', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	   }])



	//tarif tambat
	.service('TarifTambatList', ['$resource', 'API_PATH', function TarifTambatList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifTambatDetail', ['$resource', 'API_PATH', function TarifTambatDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifTambatDelete', ['$resource', 'API_PATH', function TarifTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifTambatAdd', ['$resource', 'API_PATH', function TarifTambatAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('TarifTambatEdit', ['$resource', 'API_PATH', function TarifTambatEdit($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	//approval by marvin

	.service('TarifTambatEditApproval', ['$resource', 'API_PATH', function TarifTambatEditApproval($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tambat/approval', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//tarif tunda
	.service('TarifTundaList', ['$resource', 'API_PATH', function TarifTundaList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifTundaDetail', ['$resource', 'API_PATH', function TarifTundaDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

.service('TarifTundaDelete', ['$resource', 'API_PATH', function TarifTundaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifTundaAdd', ['$resource', 'API_PATH', function TarifTundaAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('TarifTundaEdit', ['$resource', 'API_PATH', function TarifTundaEdit($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	//approval by marvin
   	.service('TarifTundaEditApproval', ['$resource', 'API_PATH', function TarifTundaEditApproval($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_tunda/approval', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])


//tarif kapal kepil
.service('TarifKapalKepilList', ['$resource', 'API_PATH', function TarifKapalKepilList($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifKapalKepilDetail', ['$resource', 'API_PATH', function TarifKapalKepilDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TarifKapalKepilDelete', ['$resource', 'API_PATH', function TarifKapalKepilDelete($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TarifKapalKepilAdd', ['$resource', 'API_PATH', function TarifKapalKepilAdd($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	.service('TarifKapalKepilEdit', ['$resource', 'API_PATH', function TarifKapalKepilEdit($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])

	//approval by marvin

  	.service('TarifKapalKepilEditApproval', ['$resource', 'API_PATH', function TarifKapalKepilEditApproval($resource, API_PATH) {
		return $resource(API_PATH + 'tarif_kepil/approval/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])


	//permohonan
	.service('PermohonanList', ['$resource', 'API_PATH', function PermohonanList($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PmhList', ['$resource', 'API_PATH', function PmhList($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/lite', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanDetail', ['$resource', 'API_PATH', function PermohonanList($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanDelete', ['$resource', 'API_PATH', function PermohonanDelete($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanAdd', ['$resource', 'API_PATH', function PermohonanAdd($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan', {}, { save: { method: 'POST', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanEdit', ['$resource', 'API_PATH', function PermohonanEdit($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PermohonanUnfinished', ['$resource', 'API_PATH', function PermohonanUnfinished($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/unfinished', {}, { get: { method: 'GET' } });
	}])
	.service('PermohonanDetailByPpk', ['$resource', 'API_PATH', function PermohonanList($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/ppk1/:ppk1/urutan/:urutan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanGetStatus', ['$resource', 'API_PATH', function PermohonanList($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/ppk1/:ppk1/urutan/:urutan/status', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanDetailForBatal', ['$resource', 'API_PATH', function PermohonanDetailForBatal($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/ppk1/:ppk1/urutan/:urutan/batal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanAll', ['$resource', 'API_PATH', function PermohonanAll($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanGetEPB', ['$resource', 'API_PATH', function PermohonanGetEPB($resource, API_PATH) {
		return $resource(API_PATH + 'epb/ppk1/:noPpk1/urutan/:ppkVar', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanCalculateEPB', ['$resource', 'API_PATH', function PermohonanCalculateEPB($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/calculate_epb', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('PermohonanRecalculateEPB', ['$resource', 'API_PATH', function PermohonanRecalculateEPB($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/reCalculateEpb', {}, { update: { method: 'PUT', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//as done
	.service('PermohonanSetDone', ['$resource', 'API_PATH', function PermohonanSetDone($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/:ppk1/set_as_done', {}, { update: { method: 'PUT' } });
	}])
	//update flag done menjadi 1
	.service('PermohonanSetFalse', ['$resource', 'API_PATH', function PermohonanSetFalse($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/:ppk1/set_as_false', {}, { update: { method: 'PUT' } });
	}])
	.service('PermohonanCekNota', ['$resource', 'API_PATH', function PermohonanCekNota($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/checkNota/:noPpk1', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//Layanan Baru
	.service('PermohonanByKodeKapal', ['$resource', 'API_PATH', function PermohonanByKodeKapal($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/kode_kapal/:kodeKapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//simpan permohonan dengan detail > 1
	.service('PermohonanMultiDetail', ['$resource', 'API_PATH', function PermohonanAdd($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/detail/:noPpk1', {}, { save: { method: 'POST' } });
	}])
	.service('SearchPpk1', ['$resource', 'API_PATH', function SearchPpk1(
		$resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/search?ppk1=:ppk1', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('SearchPpk1WithCabang', ['$resource', 'API_PATH', function SearchPpk1WithCabang(
		$resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/search_by_cabang?ppk1=:ppk1&limit=:limit', {}, {
			get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' }
		});
	}])
	// daftar penetapn
	.service('DaftarPenetapan', ['$resource', 'API_PATH', function PenetapanList($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/list_penetapan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('DaftarPermohonan', ['$resource', 'API_PATH', function PermohonanList($resource, API_PATH) {
		return $resource(API_PATH + 'penetapan/list_permohonan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('DaftarRealisasi', ['$resource', 'API_PATH', function RealisasiList($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/list_simple', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// penetapan
	.service('PenetapanDetail', ['$resource', 'API_PATH', function PenetapanDetail($resource, API_PATH) {
		return $resource(API_PATH + 'penetapan/ppk1/:ppk1/urutan/:urutan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//penetapan jasa air kapal
	.service('PenetapanAirKapal', ['$resource', 'API_PATH', function PenetapanAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('PenetapanAirKapalEdit', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanAirKapalStatus', ['$resource', 'API_PATH', function PenetapanAirKapalStatus($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/:noPpkJasa/status/:status', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanAirKapalDelete', ['$resource', 'API_PATH', function PenetapanAirKapalDelete($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PenetapanAirKapalDetail', ['$resource', 'API_PATH', function PenetapanAirKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanAirKapalByPpkJasa', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanAirKapalList', ['$resource', 'API_PATH', function PenetapanAirKapalList($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_air_kapal/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//penetapan jasa labuh
	.service('PenetapanLabuh', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh', {}, {
			get: { method: 'GET', 'Content-Type': 'application/json' },
			save: { method: 'POST' },
			update: { method: 'PUT' }
		});
	}])
	.service('PenetapanLabuhEdit', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanLabuhStatus', ['$resource', 'API_PATH', function PenetapanLabuhStatus($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/:noPpkJasa/status/:status', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanLabuhDelete', ['$resource', 'API_PATH', function PenetapanLabuhDelete($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PenetapanLabuhDetail', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanLabuhByPpkJasa', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanLabuhList', ['$resource', 'API_PATH', function PenetapanLabuhList($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_labuh/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//penetapan jasa pandu
	.service('PenetapanPandu', ['$resource', 'API_PATH', function PenetapanPandu($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' },
			get : { method: 'GET', 'Content-Type': 'application/json' }
		});
	}])
	.service('PenetapanPanduEdit', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanPanduStatus', ['$resource', 'API_PATH', function PenetapanPanduStatus($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/:noPpkJasa/status/:status', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanPanduDelete', ['$resource', 'API_PATH', function PenetapanPanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PenetapanPanduDetail', ['$resource', 'API_PATH', function PenetapanPanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanPanduByPpkJasa', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanPanduList', ['$resource', 'API_PATH', function PenetapanPanduList($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_pandu/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//penetapan jasa tambat
	.service('PenetapanTambat', ['$resource', 'API_PATH', function PenetapanTambat($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' },
			get: { method: 'GET', 'Content-Type': 'application/json' }
		});
	}])
	.service('PenetapanTambatEdit', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanTambatStatus', ['$resource', 'API_PATH', function PenetapanTambatStatus($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/:noPpkJasa/status/:status', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanTambatDelete', ['$resource', 'API_PATH', function PenetapanTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PenetapanTambatDetail', ['$resource', 'API_PATH', function PenetapanTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanTambatByPpkJasa', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanTambatList', ['$resource', 'API_PATH', function PenetapanTambatList($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tambat/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//penetapan tunda
	.service('PenetapanTunda', ['$resource', 'API_PATH', function PenetapanTunda($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('PenetapanTundaEdit', ['$resource', 'API_PATH', function PenetapanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/:id', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanTundaStatus', ['$resource', 'API_PATH', function PenetapanTundaStatus($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/:noPpkJasa/status/:status', {}, { update: { method: 'PUT' } });
	}])
	.service('PenetapanTundaDelete', ['$resource', 'API_PATH', function PenetapanTundaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/:ppkjasa', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PenetapanTundaDetail', ['$resource', 'API_PATH', function PenetapanTundaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanTundaByPpkJasa', ['$resource', 'API_PATH', function PenetapanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PenetapanTundaList', ['$resource', 'API_PATH', function PenetapanTundaList($resource, API_PATH) {
		return $resource(API_PATH + 'ptp_tunda/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

//realisasi jasa air kapal
.service('RealisasiAirKapal', ['$resource', 'API_PATH', function RealisasiAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiAirKapalEdit', ['$resource', 'API_PATH', function RealisasiAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal/:noPpkJasa', {}, { update: { method: 'PUT' } });
	}])
	.service('RealisasiAirKapalDelete', ['$resource', 'API_PATH', function RealisasiAirKapalDelete($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RealisasiAirKapalDetail', ['$resource', 'API_PATH', function RealisasiAirKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiAirKapalByPpkJasa', ['$resource', 'API_PATH', function RealisasiAirKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal/:ppkjasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiAirKapallList', ['$resource', 'API_PATH', function RealisasiAirKapallList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_air_kapal/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

// Realisasi Air Kapal Detail Alat Isi
.service('RealisasiAirKapalDetailAlatIsi', ['$resource', 'API_PATH', function RealisasiAirKapalDetailAlatIsi($resource, API_PATH) {
		return $resource(API_PATH + 'detail_alat_isi', {}, {
			get: { method: 'GET', 'Content-Type': 'application/json' },
			save: { method: 'POST' }
		});
	}])
	.service('RealisasiAirKapalDetailAlatIsiByIdReaAirKapal', ['$resource', 'API_PATH', function RealisasiAirKapalDetailAlatIsi($resource, API_PATH) {
		return $resource(API_PATH + 'detail_alat_isi/rea_air_kapal/:id', {}, {
			get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiAirKapalDetailAlatIsiById', ['$resource', 'API_PATH', function RealisasiAirKapalDetailAlatIsi($resource, API_PATH) {
		return $resource(API_PATH + 'detail_alat_isi/:id', {}, {
			update: { method: 'PUT' },
			delete: { method: 'DELETE' },
		});
	}])

// Realisasi Air Kapal Detail Kapal Penunjang
.service('RealisasiAirKapalDetailKapalPenunjang', ['$resource', 'API_PATH', function RealisasiAirKapalDetailKapalPenunjang($resource, API_PATH) {
		return $resource(API_PATH + 'detail_kapal_penunjang', {}, {
			get: { method: 'GET', 'Content-Type': 'application/json' },
			save: { method: 'POST' },
		});
	}])
	.service('RealisasiAirKapalDetailKapalPenunjangByIdReaAirKapal', ['$resource', 'API_PATH', function RealisasiAirKapalDetailKapalPenunjang($resource, API_PATH) {
		return $resource(API_PATH + 'detail_kapal_penunjang/rea_air_kapal/:id', {}, {
			get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiAirKapalDetailKapalPenunjangById', ['$resource', 'API_PATH', function RealisasiAirKapalDetailKapalPenunjang($resource, API_PATH) {
		return $resource(API_PATH + 'detail_kapal_penunjang/:id', {}, {
			get: { method: 'GET', 'Content-Type': 'application/json' },
			update: { method: 'PUT' },
			delete: { method: 'DELETE' },
		});
	}])

// realisasi jasa labuh
.service('RealisasiLabuh', ['$resource', 'API_PATH', function RealisasiLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiLabuhEdit', ['$resource', 'API_PATH', function RealisasiLabuhEdit($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh/:noPpkJasa', {}, { update: { method: 'PUT' } });
	}])
	.service('RealisasiLabuhDelete', ['$resource', 'API_PATH', function RealisasiLabuhDelete($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RealisasiLabuhDetail', ['$resource', 'API_PATH', function RealisasiLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiLabuhList', ['$resource', 'API_PATH', function RealisasiLabuhList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// RealisasiLabuhDetailbyPpkJasa
	.service('RealisasiLabuhDetailbyPpkJasa', ['$resource', 'API_PATH', function RealisasiLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiLabuhbyPpk1', ['$resource', 'API_PATH', function RealisasiLabuhbyPpk1($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh?noPpk1=:noPpk1', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiLabuh', ['$resource', 'API_PATH', function RealisasiLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'rea_labuh', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//realisasi jasa pandu
	.service('RealisasiPandu', ['$resource', 'API_PATH', function RealisasiPandu($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiPanduEdit', ['$resource', 'API_PATH', function RealisasiPanduEdit($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/:noPpkJasa', {}, { update: { method: 'PUT' } });
	}])
	.service('RealisasiPanduDelete', ['$resource', 'API_PATH', function RealisasiPanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RealisasiPanduDetail', ['$resource', 'API_PATH', function RealisasiPanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiPanduList', ['$resource', 'API_PATH', function RealisasiPanduList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiPanduDetailbyPpkJasa', ['$resource', 'API_PATH', function RealisasiPanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('ValidasiRealisasiSiklusPandu', ['$resource', 'API_PATH', function ValidasiRealisasiSiklusPandu($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/validasiSiklusPandu/:noPpk1', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

	//realisasi jasa tambat
	.service('RealisasiTambat', ['$resource', 'API_PATH', function RealisasiTambat($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			update: { method: 'PUT', 'Content-Type': 'application/json' }
		});
	}])
	.service('RealisasiTambatEdit', ['$resource', 'API_PATH', function RealisasiTambatEdit($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat/:noPpkJasa', {}, { update: { method: 'PUT' } });
	}])
	.service('RealisasiTambatDelete', ['$resource', 'API_PATH', function RealisasiTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RealisasiTambatDetail', ['$resource', 'API_PATH', function RealisasiTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiTambatList', ['$resource', 'API_PATH', function RealisasiTambatList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// RealisasiLabuhDetailbyPpkJasa
	.service('RealisasiTambatDetailbyPpkJasa', ['$resource', 'API_PATH', function RealisasiTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tambat/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// realisasi jasa tunda
	.service('RealisasiTunda', ['$resource', 'API_PATH', function RealisasiTunda($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tunda', {}, {
			save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity }
		});
	}])
	.service('RealisasiTundaEdit', ['$resource', 'API_PATH', function RealisasiTundaEdit($resource, API_PATH) {
		//return $resource(API_PATH+'rea_tunda/:noPpkJasa',{},{update:{method:'PUT'}});
		return $resource(API_PATH + 'rea_tunda/:noPpkJasa', {}, {
			update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity }
		});
	}])
	.service('RealisasiTundaDelete', ['$resource', 'API_PATH', function RealisasiTundaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tunda/delete/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RealisasiTundaDetail', ['$resource', 'API_PATH', function RealisasiTundaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tunda/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RealisasiTundaList', ['$resource', 'API_PATH', function RealisasiTundaList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tunda/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// realisasi jasa tunda by ppk jasa
	.service('RealisasiTundabyPpkJasa', ['$resource', 'API_PATH', function RealisasiTundaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'rea_tunda/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PemakaianBbmTunda', ['$resource', 'API_PATH', function PemakaianBbmTunda($resource, API_PATH) {
	return $resource(API_PATH + 'rea_tunda/pemakaian_bbm_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json'}});
}])
	.service('CheckAllJasaVerified', ['$resource', 'API_PATH', function CheckAllJasaVerified($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/check_all_jasa_verified/:noPpk1', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//permohonan jasa labuh
	.service('PermohonanLabuh', ['$resource', 'API_PATH', function PermohonanLabuh($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_labuh', {}, { save: { method: 'POST' } });
	}])
	.service('PermohonanLabuhDelete', ['$resource', 'API_PATH', function PermohonanLabuhDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_labuh/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanLabuhDetail', ['$resource', 'API_PATH', function PermohonanLabuhDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_labuh/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanLabuhList', ['$resource', 'API_PATH', function PermohonanLabuhList($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_labuh/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanLabuhEdit', ['$resource', 'API_PATH', function PermohonanLabuhEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_labuh/:id', {}, { update: { method: 'PUT' } });
	}])
	//permohonan air kapal
	.service('PermohonanAirKapal', ['$resource', 'API_PATH', function PermohonanAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_air_kapal', {}, { save: { method: 'POST' } });
	}])
	.service('PermohonanAirKapalDelete', ['$resource', 'API_PATH', function PermohonanAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_air_kapal/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanAirKapalDetail', ['$resource', 'API_PATH', function PermohonanAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_air_kapal/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanAirKapalList', ['$resource', 'API_PATH', function PermohonanAirKapal($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_air_kapal/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanAirKapalEdit', ['$resource', 'API_PATH', function PermohonanAirKapalEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_air_kapal/:id', {}, { update: { method: 'PUT' } });
	}])
	//permohonan tambat
	.service('PermohonanTambat', ['$resource', 'API_PATH', function PermohonanTambat($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tambat', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('PermohonanTambatDelete', ['$resource', 'API_PATH', function PermohonanTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tambat/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanTambatDetail', ['$resource', 'API_PATH', function PermohonanTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tambat/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTambatlList', ['$resource', 'API_PATH', function PermohonanTambatlList($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tambat/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTambatEdit', ['$resource', 'API_PATH', function PermohonanTambatEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tambat/:noPpkJasa', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//permohonan pandu
	.service('PermohonanPandu', ['$resource', 'API_PATH', function PermohonanPandu($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu', {}, { save: { method: 'POST', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanPanduBulk', ['$resource', 'API_PATH', function PermohonanPanduBulk($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu/bulk', {}, { save: { method: 'POST', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanPanduDelete', ['$resource', 'API_PATH', function PermohonanPanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanPanduDetail', ['$resource', 'API_PATH', function PermohonanPanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanPandulList', ['$resource', 'API_PATH', function PermohonanPandulList($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu/list', {}, { get: { method: 'GET', isArray : true, 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanPanduEdit', ['$resource', 'API_PATH', function PermohonanPanduEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_pandu/:id', {}, { update: { method: 'PUT' } });
	}])
	//permohonan tunda
	.service('PermohonanTunda', ['$resource', 'API_PATH', function PermohonanTunda($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda', {}, { save: { method: 'POST', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTundaBulk', ['$resource', 'API_PATH', function PermohonanTundaBulk($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda/bulk', {}, { save: { method: 'POST', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTundaDelete', ['$resource', 'API_PATH', function PermohonanTundaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermohonanTundaDetail', ['$resource', 'API_PATH', function PermohonanTundaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTundalList', ['$resource', 'API_PATH', function PermohonanTundalList($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermohonanTundaEdit', ['$resource', 'API_PATH', function PermohonanTundaEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pmh_tunda/:id', {}, { update: { method: 'PUT' } });
	}])
	//app_param
	.service('AppParam', ['$resource', 'API_PATH', function AppParam($resource, API_PATH) {
		return $resource(API_PATH + 'app_param/listpage', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('AppParamListByGroup', ['$resource', 'API_PATH', function AppParamListByGroup($resource, API_PATH) {
		return $resource(API_PATH + 'app_param/listpagebygroup', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('AppParamDetail', ['$resource', 'API_PATH', function AppParamDetail($resource, API_PATH) {
		return $resource(API_PATH + 'app_param/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('AppParamDelete', ['$resource', 'API_PATH', function AppParamlDelete($resource, API_PATH) {
		return $resource(API_PATH + 'app_param/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('AppParamAdd', ['$resource', 'API_PATH', function AppParamAdd($resource, API_PATH) {
		return $resource(API_PATH + 'app_param', {}, { save: { method: 'POST' } });
	}])
	.service('AppParamEdit', ['$resource', 'API_PATH', function AppParamEdit($resource, API_PATH) {
		return $resource(API_PATH + 'app_param/:id', {}, { update: { method: 'POST' } });
	}])
	.service('AppParamValue', ['$resource', 'API_PATH', function AppParamValue($resource, API_PATH) {
		return $resource(API_PATH + 'app_param?nama=:nama&value=:value', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('AppParamAllItem', ['$resource', 'API_PATH', function AppParam($resource, API_PATH) {
		return $resource(API_PATH + 'app_param', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	// master sdm kapal
	.service('MasterSDMKapalList', ['$resource', 'API_PATH', function MasterSDMKapalList($resource, API_PATH) {
		return $resource(API_PATH + 'sdm_kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasterSDMKapalDetail', ['$resource', 'API_PATH', function MasterSDMKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'sdm_kapal/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasterSDMKapalDelete', ['$resource', 'API_PATH', function MasterSDMKapalDelete($resource, API_PATH) {
		return $resource(API_PATH + 'sdm_kapal/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('MasterSDMKapalAdd', ['$resource', 'API_PATH', function MasterSDMKapalAdd($resource, API_PATH) {
		return $resource(API_PATH + 'sdm_kapal', {}, { save: { method: 'POST' } });
	}])
	.service('MasterSDMKapalEdit', ['$resource', 'API_PATH', function MasterSDMKapalEdit($resource, API_PATH) {
		return $resource(API_PATH + 'sdm_kapal/:id', {}, { update: { method: 'POST' } });
	}])
	// master surcharge tunda
	.service('MasterSurchargeTundaList', ['$resource', 'API_PATH', function MasterSurchargeTundaList($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasterSurchargeTundaDetail', ['$resource', 'API_PATH', function MasterSurchargeTundaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_tunda/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasterSurchargeTundaDelete', ['$resource', 'API_PATH', function MasterSurchargeTundaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_tunda/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('MasterSurchargeTundaAdd', ['$resource', 'API_PATH', function MasterSurchargeTundaAdd($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_tunda', {}, { save: { method: 'POST' } });
	}])
	.service('MasterSurchargeTundaEdit', ['$resource', 'API_PATH', function MasterSurchargeTundaEdit($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_tunda/:id', {}, { update: { method: 'POST' } });
	}])
	// master surcharge pandu
	.service('MasterSurchargePanduList', ['$resource', 'API_PATH', function MasterSurchargePanduList($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasterSurchargePanduDetail', ['$resource', 'API_PATH', function MasterSurchargePanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_pandu/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasterSurchargePanduDelete', ['$resource', 'API_PATH', function MasterSurchargePanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_pandu/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('MasterSurchargePanduAdd', ['$resource', 'API_PATH', function MasterSurchargePanduAdd($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_pandu', {}, { save: { method: 'POST' } });
	}])
	.service('MasterSurchargePanduEdit', ['$resource', 'API_PATH', function MasterSurchargePanduEdit($resource, API_PATH) {
		return $resource(API_PATH + 'surcharge_pandu/:id', {}, { update: { method: 'POST' } });
	}])
	// master siklus
	.service('SiklusList', ['$resource', 'API_PATH', function SiklusList($resource, API_PATH) {
		return $resource(API_PATH + 'siklus', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('SiklusDetail', ['$resource', 'API_PATH', function SiklusDetail($resource, API_PATH) {
		return $resource(API_PATH + 'siklus/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('SiklusDelete', ['$resource', 'API_PATH', function SiklusDelete($resource, API_PATH) {
		return $resource(API_PATH + 'siklus/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('SiklusAdd', ['$resource', 'API_PATH', function SiklusAdd($resource, API_PATH) {
		return $resource(API_PATH + 'siklus', {}, { save: { method: 'POST' } });
	}])
	.service('SiklusEdit', ['$resource', 'API_PATH', function SiklusEdit($resource, API_PATH) {
		return $resource(API_PATH + 'siklus/:id', {}, { update: { method: 'POST' } });
	}])
	// master masatambat
	.service('MasaTambatList', ['$resource', 'API_PATH', function MasaTambatList($resource, API_PATH) {
		return $resource(API_PATH + 'masa_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasaTambatDetail', ['$resource', 'API_PATH', function MasaTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'masa_tambat/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasaTambatDelete', ['$resource', 'API_PATH', function MasaTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'masa_tambat/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('MasaTambatAdd', ['$resource', 'API_PATH', function MasaTambatAdd($resource, API_PATH) {
		return $resource(API_PATH + 'masa_tambat', {}, { save: { method: 'POST' } });
	}])
	.service('MasaTambatEdit', ['$resource', 'API_PATH', function MasaTambatEdit($resource, API_PATH) {
		return $resource(API_PATH + 'masa_tambat/:id', {}, { update: { method: 'POST' } });
	}])
	// master masatambat
	.service('MasterDendaList', ['$resource', 'API_PATH', function MasterDendaList($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasterDendaDetail', ['$resource', 'API_PATH', function MasterDendaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasterDendaByKodeDenda', ['$resource', 'API_PATH', function MasterDendaByKodeDenda($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda?size=20&kodeDenda=:kodeDenda', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MasterDendaDelete', ['$resource', 'API_PATH', function MasterDendaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('MasterDendaAdd', ['$resource', 'API_PATH', function MasterDendaAdd($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda', {}, { save: { method: 'POST' } });
	}])
	.service('MasterDendaEdit', ['$resource', 'API_PATH', function MasterDendaEdit($resource, API_PATH) {
		return $resource(API_PATH + 'master_denda/:id', {}, { update: { method: 'POST' } });
	}])
	// detail item master masatambat
	.service('ItemMasaTambatList', ['$resource', 'API_PATH', function ItemMasaTambatList($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('ItemMasaTambatDetail', ['$resource', 'API_PATH', function ItemMasaTambatDetail($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('ItemMasaTambatDetailId', ['$resource', 'API_PATH', function ItemMasaTambatDetailId($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat/masa_tambat/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET', isArray: true } });
	}])
	.service('ItemMasaTambatDelete', ['$resource', 'API_PATH', function ItemMasaTambatDelete($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('ItemMasaTambatDeleteAll', ['$resource', 'API_PATH', function ItemMasaTambatDeleteAll($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat/masa_tambat/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('ItemMasaTambatAdd', ['$resource', 'API_PATH', function ItemMasaTambatAdd($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat', {}, { save: { method: 'POST' } });
	}])
	.service('ItemMasaTambatEdit', ['$resource', 'API_PATH', function ItemMasaTambatEdit($resource, API_PATH) {
		return $resource(API_PATH + 'item_masa_tambat/:id', {}, { update: { method: 'POST' } });
	}])
	//master dermaga kepil
	.service('MasterDermagaKepilList', ['$resource', 'API_PATH', function MasterDermagaKepilList($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('MasterDermagaKepilAdd', ['$resource', 'API_PATH', function MasterDermagaKepilAdd($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil', {}, { save: { method: 'POST' } });
	}])
	.service('MasterDermagaKepilEdit', ['$resource', 'API_PATH', function MasterDermagaKepilEdit($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil/:id', {}, { update: { method: 'POST' } });
	}])
	.service('MasterDermagaKepilDelete', ['$resource', 'API_PATH', function MasterDermagaKepilDelete($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil/:id', {}, { update: { method: 'DELETE' } });
	}])
	.service('MasterDermagaKepilDetail', ['$resource', 'API_PATH', function MasterDermagaKepilDetail($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil/:id', {}, { save: { method: 'GET' } });
	}])
	.service('MasterDermagaKepilByKodeDermaga', ['$resource', 'API_PATH', function MasterDermagaKepilByKodeDermaga($resource, API_PATH) {
		return $resource(API_PATH + 'dermaga_kepil?size=20&kodeDermaga=:kodeDermaga', {}, { save: { method: 'GET' } });
	}])
	//Kapal Langganan
	.service('KapalLanggananList', ['$resource', 'API_PATH', function KapalLanggananList($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_kapal_langganan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('KapalLanggananDetail', ['$resource', 'API_PATH', function KapalLanggananDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_kapal_langganan/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('KapalLanggananDelete', ['$resource', 'API_PATH', function SiklusDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_kapal_langganan/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('KapalLanggananAdd', ['$resource', 'API_PATH', function KapalLanggananAdd($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_kapal_langganan', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('KapalLanggananEdit', ['$resource', 'API_PATH', function KapalLanggananAdd($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_kapal_langganan/:id', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//alat apung
	.service('AlatApungList', ['$resource', 'API_PATH', function AlatApungList($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('AlatApungDetail', ['$resource', 'API_PATH', function AlatApungDetail($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('AlatApungByNoReg', ['$resource', 'API_PATH', function AlatApungByNoReg($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung?size=20&noRegistrasi=:noRegistrasi', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('AlatApungDelete', ['$resource', 'API_PATH', function AlatApungDelete($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('AlatApungAdd', ['$resource', 'API_PATH', function AlatApungAdd($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung', {}, { save: { method: 'POST' } });
	}])
	.service('AlatApungEdit', ['$resource', 'API_PATH', function AlatApungEdit($resource, API_PATH) {
		return $resource(API_PATH + 'alat_apung/:id', {}, { update: { method: 'POST' } });
	}])
	//harga bbm
	.service('HargaBBMList', ['$resource', 'API_PATH', function HargaBBMList($resource, API_PATH) {
		return $resource(API_PATH + 'harga_bbm', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('HargaBBMDetail', ['$resource', 'API_PATH', function HargaBBMDetail($resource, API_PATH) {
		return $resource(API_PATH + 'harga_bbm/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('HargaBBMDelete', ['$resource', 'API_PATH', function HargaBBMDelete($resource, API_PATH) {
		return $resource(API_PATH + 'harga_bbm/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('HargaBBMAdd', ['$resource', 'API_PATH', function HargaBBMAdd($resource, API_PATH) {
		return $resource(API_PATH + 'harga_bbm', {}, { save: { method: 'POST' } });
	}])
	.service('HargaBBMEdit', ['$resource', 'API_PATH', function HargaBBMEdit($resource, API_PATH) {
		return $resource(API_PATH + 'harga_bbm/:id', {}, { update: { method: 'POST' } });
	}])
	//Aturan gerak pandu
	.service('AturanGerakPanduList', ['$resource', 'API_PATH', function AturanGerakPanduList($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('AturanGerakPanduDetail', ['$resource', 'API_PATH', function AturanGerakPanduDetail($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('AturanGerakPanduByKodeLokasi', ['$resource', 'API_PATH', function AturanGerakPanduByKodeLokasi($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu?size=20&kodeLokasi=:kodeLokasi', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('AturanGerakPanduDelete', ['$resource', 'API_PATH', function AturanGerakPanduDelete($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('AturanGerakPanduAdd', ['$resource', 'API_PATH', function AturanGerakPanduAdd($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu', {}, { save: { method: 'POST' } });
	}])
	.service('AturanGerakPanduEdit', ['$resource', 'API_PATH', function AturanGerakPanduEdit($resource, API_PATH) {
		return $resource(API_PATH + 'aturan_gerak_pandu/:id', {}, { update: { method: 'POST' } });
	}])
	//kapal kegiatan tetap
	.service('KapalKegiatanTetapList', ['$resource', 'API_PATH', function KapalKegiatanTetapList($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('KapalKegiatanTetapDetail', ['$resource', 'API_PATH', function KapalKegiatanTetapDetail($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('KapalKegiatanTetapByKodeKapal', ['$resource', 'API_PATH', function KapalKegiatanTetapByKodeKapal($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap?size=20&kode=:kode', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('KapalKegiatanTetapDelete', ['$resource', 'API_PATH', function KapalKegiatanTetapDelete($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('KapalKegiatanTetapAdd', ['$resource', 'API_PATH', function KapalKegiatanTetapAdd($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('KapalKegiatanTetapEdit', ['$resource', 'API_PATH', function KapalKegiatanTetapEdit($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap/:id', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('KapalKegiatanTetapBill', ['$resource', 'API_PATH', function KapalKegiatanTetapBill($resource, API_PATH) {
		return $resource(API_PATH + 'bill_kegiatan_tetap', {}, {
			save: { method: 'POST', 'Content-Type': 'application/json' },
			get: { method: 'GET' }
		});
	}])
	.service('KapalKegiatanTetapBillCheck', ['$resource', 'API_PATH', function KapalKegiatanTetapBillCheck($resource, API_PATH) {
		return $resource(API_PATH + 'bill_kegiatan_tetap/check_bill/:periodeTahun/:periodeBulan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('KapalKegiatanTetapCheckbyPeriode', ['$resource', 'API_PATH', function KapalKegiatanTetapBillCheck($resource, API_PATH) {
		return $resource(API_PATH + 'kapal_kegiatan_tetap/check_by_periode/:periodeTahun/:periodeBulan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('KapalKegiatanTetapBillDelete', ['$resource', 'API_PATH', function KapalKegiatanTetapBillDelete($resource, API_PATH) {
		return $resource(API_PATH + 'bill_kegiatan_tetap/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('KapalKegiatanTetapBillProcess', ['$resource', 'API_PATH', function KapalKegiatanTetapBillProcess($resource, API_PATH) {
		return $resource(API_PATH + 'bill_kegiatan_tetap/process/:id', {}, { save: { method: 'POST' } });
	}])
	.service('KapalKegiatanTetapDeleted', ['$resource', 'API_PATH', function KapalKegiatanTetapDeleted($resource, API_PATH) {
		return $resource(API_PATH + 'bill_kegiatan_tetap/deleted_items', {}, { get: { method: 'GET' } });
	}])
	//pejabat pengesahan

.service('PejabatPengesahanList', ['$resource', 'API_PATH', function PejabatPengesahanList($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PejabatPengesahanDetail', ['$resource', 'API_PATH', function PejabatPengesahanDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PejabatPengesahanByNIP', ['$resource', 'API_PATH', function PejabatPengesahanByNIP($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan?size=20&nip=:nip', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PejabatPengesahanDelete', ['$resource', 'API_PATH', function PejabatPengesahanDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PejabatPengesahanAdd', ['$resource', 'API_PATH', function PejabatPengesahanAdd($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan', {}, { save: { method: 'POST' } });
	}])
	.service('PejabatPengesahanEdit', ['$resource', 'API_PATH', function PejabatPengesahanEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan/:id', {}, { update: { method: 'POST' } });
	}])
	.service('PejabatPengesahanSearch', ['$resource', 'API_PATH', function PejabatPengesahanSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'pejabat_pengesahan/search?nama=:nama', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	//pelanggan per jasa
	.service('PelangganPerJasaList', ['$resource', 'API_PATH', function PelangganPerJasaList($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_jasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PelangganPerJasaDetail', ['$resource', 'API_PATH', function PelangganPerJasaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_jasa/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PelangganPerJasaDelete', ['$resource', 'API_PATH', function PelangganPerJasaDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_jasa/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PelangganPerJasaAdd', ['$resource', 'API_PATH', function PelangganPerJasaAdd($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_jasa', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('PelangganPerJasaEdit', ['$resource', 'API_PATH', function PelangganPerJasaEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_jasa/:id', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//pelanggan per lokasi tujuan
	.service('PelangganPerLokasiList', ['$resource', 'API_PATH', function PelangganPerLokasiList($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_lokasi_tujuan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PelangganPerLokasiDetail', ['$resource', 'API_PATH', function PelangganPerLokasiDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_lokasi_tujuan/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PelangganPerLokasiDelete', ['$resource', 'API_PATH', function PelangganPerLokasiDelete($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_lokasi_tujuan/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PelangganPerLokasiAdd', ['$resource', 'API_PATH', function PelangganPerLokasiAdd($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_lokasi_tujuan', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('PelangganPerLokasiEdit', ['$resource', 'API_PATH', function PelangganPerLokasiEdit($resource, API_PATH) {
		return $resource(API_PATH + 'pelanggan_per_lokasi_tujuan/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	//kapal charter
	.service('KapalCharterList', ['$resource', 'API_PATH', function KapalCharterList($resource, API_PATH) {
		return $resource(API_PATH + 'kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('KapalCharterDetail', ['$resource', 'API_PATH', function KapalCharterDetail($resource, API_PATH) {
		return $resource(API_PATH + 'kapal/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('KapalCharterDelete', ['$resource', 'API_PATH', function KapalCharterDelete($resource, API_PATH) {
		return $resource(API_PATH + 'kapal/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('KapalCharterAdd', ['$resource', 'API_PATH', function KapalCharterAdd($resource, API_PATH) {
		return $resource(API_PATH + 'kapal', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('KapalCharterEdit', ['$resource', 'API_PATH', function KapalCharterEdit($resource, API_PATH) {
		return $resource(API_PATH + 'kapal/:id', {}, { update: { method: 'POST' } });
	}])
	.service('KapalCharterByKodeKapal', ['$resource', 'API_PATH', function KapalCharterByKodeKapal($resource, API_PATH) {
		return $resource(API_PATH + 'kapal?size=20&kodeKapal=:kodeKapal', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	//branch parameter
	.service('ParamsCabangList', ['$resource', 'API_PATH', function ParamsCabangList($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('ParamsCabangDetail', ['$resource', 'API_PATH', function ParamsCabangDetail($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('ParamsCabangDelete', ['$resource', 'API_PATH', function ParamsCabangDelete($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('ParamsCabangDetail', ['$resource', 'API_PATH', function ParamsCabangDetail($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('ParamsCabangAdd', ['$resource', 'API_PATH', function ParamsCabangAdd($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param', {}, { save: { method: 'POST' } });
	}])
	.service('ParamsCabangEdit', ['$resource', 'API_PATH', function ParamsCabangEdit($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param/:id', {}, { update: { method: 'POST' } });
	}])
	.service('ParamsCabangSearch', ['$resource', 'API_PATH', function ParamsCabangDetail($resource, API_PATH) {
		return $resource(API_PATH + 'branch_param/search', { 'Content-Type': 'application/json' }, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	//kantor
	.service('KantorList', ['$resource', 'API_PATH', function KantorList($resource, API_PATH) {
		return $resource(API_PATH + 'kantor', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

	//search no plat shuttle car
	.service('SearchNoPlatShuttleCar', ['$resource', 'API_PATH', function SearchNoPlatShuttleCar(
		$resource, API_PATH) {
		return $resource(API_PATH + 'car', {}, {
			get: {
				method: 'GET',
				'Content-Type': 'application/json'
			}
		});
	}])

	//resend pilot shuttle car
	.service('PilotShuttleCarResend', ['$resource', 'API_PATH', function PilotShuttleCarResend($resource, API_PATH) {
	return $resource(API_PATH + 'mobile/pilot_shuttle_car/resend', {}, { save: { method: 'POST' } });
	}])

	//resend pilot boat
	.service('PilotBoatResend', ['$resource', 'API_PATH', function PilotBoatResend($resource, API_PATH) {
	return $resource(API_PATH + 'mobile/pilot_shuttle_boat/resend', {}, { save: { method: 'POST' } });
	}])

	//search kode boat pilot boat
	.service('SearchKodeBoatPilotBoat', ['$resource', 'API_PATH', function SearchKodeBoatPilotBoat(
		$resource, API_PATH) {
		return $resource(API_PATH + 'boat', {}, {
			get: {
				method: 'GET',
				'Content-Type': 'application/json'
			}
		});
	}])
	//master pelanggan
	.service('MdmPelangganSearch', ['$resource', 'API_PATH', function MdmPelangganSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_pelanggan/search?nama=:nama&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmPelangganDetail', ['$resource', 'API_PATH', function MdmPelangganDetail($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_pelanggan', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	//master dermaga kode
	.service('MdmDermagaShow', ['$resource', 'API_PATH', function MdmDermagaShow(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_dermaga?kode=:dermaga', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmPelangganSearchByKode', ['$resource', 'API_PATH', function MdmPelangganSearchByKode($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_pelanggan?kode=:kode', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	//master dermaga
	.service('MdmDermagaSearch', ['$resource', 'API_PATH', function MdmDermagaSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_dermaga/search?nama=:nama&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmDermagaSearchByKode', ['$resource', 'API_PATH', function MdmDermagaSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_dermaga/search_by_kode?kode=:kode&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	//master dermaga jasa
	.service('MdmDermagaJasa', ['$resource', 'API_PATH', function MdmDermagaJasa(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_dermaga/:jasa/:kodeCabang?nama=:nama&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmDermagaPerJasa', ['$resource', 'API_PATH', function MdmDermagaPerJasa(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_dermaga/search?nama=:nama&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	//master data kapal
	.service('MdmKapalDetail', ['$resource', 'API_PATH', function MdmKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('MdmKapalSearch', ['$resource', 'API_PATH', function MdmKapalSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal/search?kode=:kode&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmKapalSearchByName', ['$resource', 'API_PATH', function MdmKapalSearchByName(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal/search?nama=:nama&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmKapalSearchByKode', ['$resource', 'API_PATH', function MdmKapalSearchByKode(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal/search?kode=:kode&limit=:limit', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmKapalList', ['$resource', 'API_PATH', function MdmKapalList(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal/list', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	.service('MdmKapalByKode', ['$resource', 'API_PATH', function MdmKapalDetail($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_kapal?kode=:kode', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	//master pelabuhan
	.service('MdmPelabuhanSearch', ['$resource', 'API_PATH', function MdmPelabuhanSearch(
		$resource, API_PATH) {
		return $resource(API_PATH + 'mdm_pelabuhan/search?nama=:nama', {}, {
			get: {
				method: 'GET',
				isArray: true,
				'Content-Type': 'application/json'
			}
		});
	}])
	//Roles
	.service('RolesList', ['$resource', 'API_PATH', function RolesList($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('RolesDetail', ['$resource', 'API_PATH', function RolesDetail($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('RolesByKode', ['$resource', 'API_PATH', function RolesByKode($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role?size=20&kodeRole=:kodeRole', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('RolesDelete', ['$resource', 'API_PATH', function RolesDelete($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('RolesAdd', ['$resource', 'API_PATH', function RolesAdd($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role', {}, { save: { method: 'POST' } });
	}])
	.service('RolesEdit', ['$resource', 'API_PATH', function RolesEdit($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role/:id', {}, { update: { method: 'POST' } });
	}])
	.service('RoleByKode', ['$resource', 'API_PATH', function RoleByKode($resource, API_PATH) {
		return $resource(API_PATH + 'usm_role/kode_role/:kodeRole', {}, { get: { method: 'GET' } });
	}])
	//Permission
	.service('PermissionList', ['$resource', 'API_PATH', function PermissionList($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('PermissionDetail', ['$resource', 'API_PATH', function PermissionDetail($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PermissionByKode', ['$resource', 'API_PATH', function PermissionByKode($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu?size=20&kodeMenu=:kodeMenu', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	.service('PermissionDelete', ['$resource', 'API_PATH', function PermissionDelete($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('PermissionAdd', ['$resource', 'API_PATH', function PermissionAdd($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu', {}, { save: { method: 'POST' } });
	}])
	.service('PermissionEdit', ['$resource', 'API_PATH', function PermissionEdit($resource, API_PATH) {
		return $resource(API_PATH + 'usm_menu/:id', {}, { update: { method: 'POST' } });
	}])
	//Billing
	.service('BillingList', ['$resource', 'API_PATH', function BillingList($resource, API_PATH) {
		return $resource(API_PATH + 'siklus', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('BillingAdd', ['$resource', 'API_PATH', function BillingAdd($resource, API_PATH) {
		return $resource(API_PATH + 'siklus', {}, { save: { method: 'POST' } });
	}])
	.service('BillingDelete', ['$resource', 'API_PATH', function BillingDelete($resource, API_PATH) {
		return $resource(API_PATH + 'siklus/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
	}])
	//set status transaksi
	.service('StatusEPBPermohonan', ['$resource', 'API_PATH', function StatusEPBPermohonan($resource, API_PATH) {
		return $resource(API_PATH + 'permohonan/ppk1/:ppk1/urutan/:urutan/paid', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('ConfirmedPenetapan', ['$resource', 'API_PATH', function ConfirmedPenetapan($resource, API_PATH) {
		return $resource(API_PATH + 'penetapan/ppk1/:ppk1/urutan/:urutan/confirmed', {}, { update: { method: 'PUT' } });
	}])
	.service('VerifiedRealisasi', ['$resource', 'API_PATH', function VerifiedRealisasi($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/ppk1/:ppk1/urutan/:urutan/verified', {}, { save: { method: 'POST' } });
	}])
	.service('VerifiedRealisasiByList', ['$resource', 'API_PATH', function VerifiedRealisasiByList($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/ppk1/:ppk1/pranota', {}, { save: { method: 'POST' } });
	}])
	.service('RealisasiDetailByPpk', ['$resource', 'API_PATH', function VerifiedRealisasiByList($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/ppk1/:ppk1/urutan/:urutan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	// authentication
	.service('Login', ['$resource', 'API_PATH', function Login($resource, API_PATH) {
		return $resource(API_PATH + 'auth/login', {}, { save: { method: 'POST' } });
	}])
	// list cabang
	.service('ListCabang', ['$resource', 'API_PATH', function ListCabang($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_cabang', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('ListKawasan', ['$resource', 'API_PATH', function ListKawasan($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_cabang/kode_cabang/:kodeCabang/get_kawasan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('MdmCabangSearch', ['$resource', 'API_PATH', function MdmCabangSearch($resource, API_PATH) {
		return $resource(API_PATH + 'mdm_cabang/search', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	// get pranota by noPpk1
	.service('PranotaDetail', ['$resource', 'API_PATH', function PranotaDetail($resource, API_PATH) {
		return $resource(API_PATH + 'pranota/noPpk1/:ppk1', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])
	.service('PranotaDetailExact', ['$resource', 'API_PATH', function PranotaDetailExact($resource, API_PATH) {
		return $resource(API_PATH + 'pranota/noPpk1/:ppk1/exact', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('CreateNota', ['$resource', 'API_PATH', function CreateNota($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/create_nota/:noPpk1', {}, { save: { method: 'POST' } });
	}])
	.service('PranotaPublic', ['$resource', 'API_PATH', function PranotaPublic($resource, API_PATH) {
		return $resource(API_PATH + 'public/pranota/view', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
	}])

//kapal gandeng
.service('ListKapalGandeng', ['$resource', 'API_PATH', function ListKapalGandeng($resource, API_PATH) {
	return $resource(API_PATH + 'pmh_kapal_gandeng/list',{},{get:{method:'GET','Content-Type':'application/json'}});
}])
.service('AddKapalGandeng', ['$resource', 'API_PATH', function AddKapalGandeng($resource, API_PATH) {
	return $resource(API_PATH+'pmh_kapal_gandeng',{},{save:{method:'POST'}});
}])
.service('DeleteKapalGandeng', ['$resource', 'API_PATH', function DeleteKapalGandeng($resource, API_PATH) {
	return $resource(API_PATH+'pmh_kapal_gandeng/:id',{},{delete:{method:'DELETE'} });
}])
.service('SearchKapalGandeng', ['$resource', 'API_PATH', function SearchKapalGandeng($resource, API_PATH) {
	return $resource(API_PATH+'pmh_kapal_gandeng?noPpk1=:noPpk1', {}, {
		get: {method: 'GET','Content-Type': 'application/json'}
	});
}])
.service('SearchKapalGandengByNoPpk1Tongkang', ['$resource', 'API_PATH', function SearchKapalGandengByNoPpk1Tongkang($resource, API_PATH) {
	return $resource(API_PATH+'pmh_kapal_gandeng?noPpk1Tongkang=:noPpk1Tongkang', {}, {
		get: {method: 'GET','Content-Type': 'application/json'}
	});
}])
//realisasi kapal tunda
.service('ListReaKapalTunda', ['$resource', 'API_PATH', function ListReaKapalTunda($resource, API_PATH) {
	return $resource(API_PATH + 'rea_kapal_tunda/list',{},{get:{method:'GET','Content-Type':'application/json'}});
}])
.service('AddReaKapalTunda', ['$resource', 'API_PATH', function AddReaKapalTunda($resource, API_PATH) {
	return $resource(API_PATH+'rea_kapal_tunda',{},{save:{method:'POST'}});
}])
.service('DeleteReaKapalTunda', ['$resource', 'API_PATH', function DeleteReaKapalTunda($resource, API_PATH) {
	return $resource(API_PATH+'rea_kapal_tunda/:id',{},{delete:{method:'DELETE'} });
}])
.service('SearchReaKapalTunda', ['$resource', 'API_PATH', function SearchReaKapalTunda($resource, API_PATH) {
	return $resource(API_PATH+'rea_kapal_tunda?noPpk1=:noPpk1', {}, {
		get: {method: 'GET','Content-Type': 'application/json'}
	});
}])
.service('ReaKapalTundaByPpkJasa', ['$resource', 'API_PATH', function ReaKapalTundaByPpkJasa($resource, API_PATH) {
	return $resource(API_PATH + 'rea_kapal_tunda/:noPpkJasa',{},{get:{method:'GET','Content-Type':'application/json',isArray: true,}});
}])
//realisasi kapal tunda gandeng
.service('ListReaKapalTundaGandeng', ['$resource', 'API_PATH', function ListReaKapalTundaGandeng($resource, API_PATH) {
	return $resource(API_PATH + 'rea_tunda_gandeng/list',{},{get:{method:'GET','Content-Type':'application/json'}});
}])
.service('AddReaKapalTundaGandeng', ['$resource', 'API_PATH', function AddReaKapalTundaGandeng($resource, API_PATH) {
	return $resource(API_PATH+'rea_tunda_gandeng',{},{save:{method:'POST'}});
}])
.service('DeleteReaKapalTundaGandeng', ['$resource', 'API_PATH', function DeleteReaKapalTundaGandeng($resource, API_PATH) {
	return $resource(API_PATH+'rea_tunda_gandeng/:id',{},{delete:{method:'DELETE'} });
}])
.service('SearchReaKapalTundaGandeng', ['$resource', 'API_PATH', function SearchReaKapalTundaGandeng($resource, API_PATH) {
	return $resource(API_PATH+'rea_tunda_gandeng?noPpk1=:noPpk1', {}, {
		get: {method: 'GET','Content-Type': 'application/json'}
	});
}])
.service('ReaKapalTundaGandengByPpkJasa', ['$resource', 'API_PATH', function ReaKapalTundaGandengByPpkJasa($resource, API_PATH) {
	return $resource(API_PATH + 'rea_tunda_gandeng/:noPpkJasa',{},{get:{method:'GET','Content-Type':'application/json',isArray: true,}});
}])
//pembatalan
.service('PembatalanJasaLabuh', ['$resource', 'API_PATH', function PembatalanJasaLabuh($resource, API_PATH) {
	return $resource(API_PATH+'ptp_labuh/:noPpkJasa/batal',{},{save:{method:'POST'}});
}])
.service('PembatalanJasaTambat', ['$resource', 'API_PATH', function PembatalanJasaTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tambat/:noPpkJasa/batal',{},{save:{method:'POST'}});
}])
.service('PembatalanJasaPandu', ['$resource', 'API_PATH', function PembatalanJasaPandu($resource, API_PATH) {
	return $resource(API_PATH+'ptp_pandu/:noPpkJasa/batal',{},{save:{method:'POST'}});
}])
.service('PembatalanJasaTunda', ['$resource', 'API_PATH', function PembatalanJasaTunda($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tunda/:noPpkJasa/batal',{},{save:{method:'POST'}});
}])
.service('PembatalanJasaAirKapal', ['$resource', 'API_PATH', function PembatalanJasaAirKapal($resource, API_PATH) {
	return $resource(API_PATH+'ptp_air_kapal/:noPpkJasa/batal',{},{save:{method:'POST'}});
}])
//perpanjangan/perpendekan
.service('RevisiTglJasaLabuh', ['$resource', 'API_PATH', function RevisiTglJasaLabuh($resource, API_PATH) {
	return $resource(API_PATH+'ptp_labuh/:noPpkJasa/change_date_end/:tglSelesai',{},{save:{method:'POST'}});
}])
.service('RevisiTglJasaTambat', ['$resource', 'API_PATH', function RevisiTglJasaTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tambat/:noPpkJasa/change_date_end/:tglSelesai',{},{save:{method:'POST'}});
}])
.service('RevisiTglJasaPandu', ['$resource', 'API_PATH', function RevisiTglJasaTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_pandu/:noPpkJasa/change_date_end/:tglSelesai',{},{save:{method:'POST'}});
}])
.service('RevisiTglJasaTunda', ['$resource', 'API_PATH', function RevisiTglJasaTunda($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tunda/:noPpkJasa/change_date_end/:tglSelesai',{},{save:{method:'POST'}});
}])
.service('RevisiTglJasaAirKapal', ['$resource', 'API_PATH', function RevisiTglJasaAirKapal($resource, API_PATH) {
	return $resource(API_PATH+'ptp_air_kapal/:noPpkJasa/change_date_end/:tglSelesai',{},{save:{method:'POST'}});
}])
//Perubahan
.service('PerubahanJasaLabuh', ['$resource', 'API_PATH', function PerubahanJasaLabuh($resource, API_PATH) {
	return $resource(API_PATH+'ptp_labuh/:noPpkJasa/edit',{},{save:{method:'POST'}});
}])
.service('PerubahanJasaTambat', ['$resource', 'API_PATH', function PerubahanJasaTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tambat/:noPpkJasa/edit',{},{save:{method:'POST'}});
}])
.service('PerubahanJasaPandu', ['$resource', 'API_PATH', function PerubahanJasaPandu($resource, API_PATH) {
	return $resource(API_PATH+'ptp_pandu/:noPpkJasa/edit',{},{save:{method:'POST'}});
}])
.service('PerubahanJasaTunda', ['$resource', 'API_PATH', function PerubahanJasaTunda($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tunda/:noPpkJasa/edit',{},{save:{method:'POST'}});
}])
.service('PerubahanJasaAirKapal', ['$resource', 'API_PATH', function PerubahanJasaAirKapal($resource, API_PATH) {
	return $resource(API_PATH+'ptp_air_kapal/:noPpkJasa/edit',{},{save:{method:'POST'}});
}])
.service('MDMPegawaiByNip', ['$resource', 'API_PATH', function MDMPegawaiByNip($resource, API_PATH) {
	return $resource(API_PATH+'mdm_pegawai/get_by_nip', {}, {get: {method: 'GET','Content-Type': 'application/json'}});
}])
.service('SDMKapalByNip', ['$resource', 'API_PATH', function SDMKapalByNip($resource, API_PATH) {
	return $resource(API_PATH+'mdm_sdm_kapal/get_by_nip', {}, {get: {method: 'GET',isArray:true,'Content-Type': 'application/json'}});
}])
.service('SearchSDMKapal', ['$resource', 'API_PATH', function SearchSDMKapal(
	$resource, API_PATH) {
	return $resource(API_PATH+'mdm_sdm_kapal/search?nama=:nama&limit=:limit', {}, {
		get: {
			method: 'GET',
			isArray: true,
			'Content-Type': 'application/json'
		}
	});
}])
.service('SearchSDMKapalByCallSign', ['$resource', 'API_PATH', function SearchSDMKapalByCallSign(
	$resource, API_PATH) {
	return $resource(API_PATH+'mdm_sdm_kapal/search?callSign=:callSign&limit=:limit', {}, {
		get: {
			method: 'GET',
			isArray: true,
			'Content-Type': 'application/json'
		}
	});
}])
.service('SearchAlatApung', ['$resource', 'API_PATH', function SearchAlatApung(
	$resource, API_PATH) {
	return $resource(API_PATH+'alat_apung/search?nama=:nama&jenis=:jenis', {}, {
		get: {
			method: 'GET',
			isArray: true,
			'Content-Type': 'application/json'
		}
	});
}])
//history
.service('HistoryRevisiLabuh', ['$resource', 'API_PATH', function HistoryRevisiLabuh($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_labuh/:noPpkJasa/history',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('HistoryRevisiTambat', ['$resource', 'API_PATH', function HistoryRevisiTambat($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_tambat/:noPpkJasa/history',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('HistoryRevisiPandu', ['$resource', 'API_PATH', function HistoryRevisiPandu($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_pandu/:noPpkJasa/history',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('HistoryRevisiTunda', ['$resource', 'API_PATH', function HistoryRevisiTunda($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_tunda/:noPpkJasa/history',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('HistoryRevisiAirKapal', ['$resource', 'API_PATH', function HistoryRevisiAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_air_kapal/:noPpkJasa/history',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('MonitoringDetail', ['$resource', 'API_PATH', function MonitoringDetail($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/monitoring/ppk1/:ppk1/urutan/:urutan',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('DetailByPpk1', ['$resource', 'API_PATH', function DetailByPpk1($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/monitoring/ppk1/:ppk1',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('VerifikasiPerJasa', ['$resource', 'API_PATH', function VerifikasiPerJasa($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/verifikasi/:noPpk1/:urutanPermohonan/:jenisJasa',{},{save:{method:'POST','Content-Type': 'application/json'}});
}])
.service('VerifikasiPerNoPPKJasa', ['$resource', 'API_PATH', function VerifikasiPerNoPPKJasa($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/verifikasi/:noPpkJasa',{},{save:{method:'POST','Content-Type': 'application/json'}});
}])
.service('DaftarKegiatanKapalList', ['$resource', 'API_PATH', function DaftarKegiatanKapalList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanHarianList', ['$resource', 'API_PATH', function DaftarKegiatanKapalList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_daily',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanHarianPandu', ['$resource', 'API_PATH', function LaporanHarianPandu($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_pemandu_harian',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanPemanduanList', ['$resource', 'API_PATH', function LaporanPemanduanList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_pemandu',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanKinerjaList', ['$resource', 'API_PATH', function LaporanKinerjaList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_kinerja',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanAirKapal', ['$resource', 'API_PATH', function LaporanAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_air_kapal?tahun=:tahun&bulan=:bulan',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('RealisasiCompletedList', ['$resource', 'API_PATH', function RealisasiCompletedList($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/completed?limit=:limit',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('KesepakatanExpiredList', ['$resource', 'API_PATH', function KesepakatanExpiredList($resource, API_PATH) {
	return $resource(API_PATH + 'kesepakatan/to_be_expired?interval_day=:interval_day',{},{get:{method:'GET',isArray: true,'Content-Type': 'application/json'}});
}])
.service('PerubahanTarifList', ['$resource', 'API_PATH', function PerubahanTarifList($resource, API_PATH) {
	return $resource(API_PATH + 'tarif/recently_updated?interval_day=:interval_day',{},{get:{method:'GET',isArray: true,'Content-Type': 'application/json'}});
}])
.service('HargaBBMLimitedList', ['$resource', 'API_PATH', function HargaBBMLimitedList($resource, API_PATH) {
	return $resource(API_PATH + '/harga_bbm/list_limited?limit=:limit',{},{get:{method:'GET',isArray: true,'Content-Type': 'application/json'}});
}])
.service('PermissionByKode', ['$resource', 'API_PATH', function PermissionByKode($resource, API_PATH) {
	return $resource(API_PATH + 'usm_menu?kodeMenu=:kodeMenu',{'Content-Type': 'application/json' },{get:{method:'GET'}});
}])
.service('DeleteJasaByPpkJasa', ['$resource', 'API_PATH', function DeleteJasaByPpkJasa($resource, API_PATH) {
	return $resource(API_PATH+'realisasi/del_all_jasa/:noPpkJasa',{},{delete:{method:'DELETE'}});
}])
.service('SuratPerintahAirKapal', ['$resource', 'API_PATH', function SuratPerintahAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_air_kapal/:noPpkJasa/surat_perintah',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('EPBInvoice', ['$resource', 'API_PATH', function EPBInvoice($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/kode_bayar/:kodebayar/epb_invoice',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('SetStatusEPBInvoice', ['$resource', 'API_PATH', function SetStatusEPBInvoice($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/kode_bayar/:kodebayar/paid',{},{update:{method:'PUT'} });
}])
.service('DaftarPermohonanAirKapal', ['$resource', 'API_PATH', function DaftarPermohonanAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'penetapan/list_permohonan_air_kapal/opt?groupType=:groupType',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('DaftarPenetapanAirKapal', ['$resource', 'API_PATH', function DaftarPenetapanAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/list_penetapan_air_kapal',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('DaftarRealisasiAirKapal', ['$resource', 'API_PATH', function DaftarRealisasiAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/list_realisasi_air_kapal',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('CheckLockAgen', ['$resource', 'API_PATH', function CheckLockAgen($resource, API_PATH) {
	// return $resource(API_PATH+'integration/check_lock',{},{get:{method:'GET',isArray: true,'Content-Type':'application/json'}});
	return $resource(API_PATH+'integration/check_lock',{},{get:{method:'POST'}});
}])
.service('MeetingUserList', ['$resource', 'API_PATH', function MeetingUserList($resource, API_PATH) {
	return $resource(API_PATH+'meeting_user',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('MeetingUserSearch', ['$resource', 'API_PATH', function MeetingUserSearch($resource, API_PATH) {
	return $resource(API_PATH+'meeting_user/search',{},{get:{method:'GET',isArray: true,'Content-Type': 'application/json' }});
}])
.service('MeetingUserDetail', ['$resource', 'API_PATH', function MeetingUserDetail($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_user/:id',{'Content-Type': 'application/json' },{get:{method:'GET'}});
}])
.service('MeetingUserDelete', ['$resource', 'API_PATH', function MeetingUserDelete($resource, API_PATH) {
	return $resource(API_PATH+'meeting_user/:id',{},{delete:{method:'DELETE'} });
}])
.service('MeetingUserAdd', ['$resource', 'API_PATH', function MeetingUserAdd($resource, API_PATH) {
	return $resource(API_PATH+'meeting_user',{},{save:{method:'POST', headers: { 'Content-Type': 'application/json' }}});
}])
.service('MeetingUserEdit', ['$resource', 'API_PATH', function MeetingUserEdit($resource, API_PATH) {
	return $resource(API_PATH+'meeting_user/:id',{},{update:{method:'POST'} });
}])
.service('ClusterList', ['$resource', 'API_PATH', function ClusterList($resource, API_PATH) {
	return $resource(API_PATH+'clustering/clustering_level1',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('AddCluster', ['$resource', 'API_PATH', function AddCluster($resource, API_PATH) {
	return $resource(API_PATH+'clustering',{},{save:{method:'POST'} });
}])
.service('DeleteCluster', ['$resource', 'API_PATH', function DeleteCluster($resource, API_PATH) {
	return $resource(API_PATH+'clustering/:id',{},{delete:{method:'DELETE'} });
}])
.service('ClusterDetail', ['$resource', 'API_PATH', function ClusterDetail($resource, API_PATH) {
	return $resource(API_PATH + 'clustering/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ClusterEdit', ['$resource', 'API_PATH', function ClusterEdit($resource, API_PATH) {
	return $resource(API_PATH+'clustering/:id',{},{update:{method:'PUT'}});
}])
.service('ClusterMuatanList', ['$resource', 'API_PATH', function ClusterMuatanList($resource, API_PATH) {
	return $resource(API_PATH+'clustering/clustering_level2',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ClusterGetAll', ['$resource', 'API_PATH', function ClusterGetAll($resource, API_PATH) {
	return $resource(API_PATH+'clustering',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('KedalamanList', ['$resource', 'API_PATH', function KedalamanList($resource, API_PATH) {
	return $resource(API_PATH+'kedalaman',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('AddKedalaman', ['$resource', 'API_PATH', function AddKedalaman($resource, API_PATH) {
	return $resource(API_PATH+'kedalaman',{},{save:{method:'POST'} });
}])
.service('KedalamanDetail', ['$resource', 'API_PATH', function KedalamanDetail($resource, API_PATH) {
	return $resource(API_PATH + 'kedalaman/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('KedalamanEdit', ['$resource', 'API_PATH', function KedalamanEdit($resource, API_PATH) {
	return $resource(API_PATH+'kedalaman/:id',{},{update:{method:'PUT'}});
}])
.service('DeleteKedalaman', ['$resource', 'API_PATH', function DeleteKedalaman($resource, API_PATH) {
	return $resource(API_PATH+'kedalaman/:id',{},{delete:{method:'DELETE'} });
}])
//Kesepakatan spec
.service('ParamKesepakatan', ['$resource', 'API_PATH', function ParamKesepakatan($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ParamKesepakatanAdd', ['$resource', 'API_PATH', function ParamKesepakatanAdd($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec',{},{save:{method:'POST'} });
}])
.service('ParamKesepakatanView', ['$resource', 'API_PATH', function ParamKesepakatanView($resource, API_PATH) {
	return $resource(API_PATH + 'kesepakatan_spec/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ParamKesepakatanUpdate', ['$resource', 'API_PATH', function ParamKesepakatanUpddate($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/:id',{},{update:{method:'PUT'}});
}])

//approval by marvin

.service('ParamKesepakatanUpdateApproval', ['$resource', 'API_PATH', function ParamKesepakatanUpdateApproval($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/approval/:id',{},{update:{method:'PUT'}});
}])


.service('ParamKesepakatanDelete', ['$resource', 'API_PATH', function ParamKesepakatanDelete($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/:id',{},{delete:{method:'DELETE'} });
}])
.service('ParamKesepakatanItemDetail', ['$resource', 'API_PATH', function ParamKesepakatanItemDetail($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/:id/details',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ParamKesepakatanItemAdd', ['$resource', 'API_PATH', function ParamKesepakatanItemAdd($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/kesepakatan_detail',{},{save:{method:'POST'} });
}])
.service('ParamKesepakatanItemDelete', ['$resource', 'API_PATH', function ParamKesepakatanItemDelete($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/kesepakatan_detail/:id',{},{delete:{method:'DELETE'} });
}])
.service('ParamKesepakatanItemUpdate', ['$resource', 'API_PATH', function ParamKesepakatanItemUpdate($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/kesepakatan_detail/:id',{},{update:{method:'PUT'}});
}])




.service('ParamKesepakatanItemUpdate', ['$resource', 'API_PATH', function ParamKesepakatanItemUpdate($resource, API_PATH) {
	return $resource(API_PATH+'kesepakatan_spec/kesepakatan_detail/:id',{},{update:{method:'PUT'}});
}])
.service('EPBPerpanjanganByPpkJasa', ['$resource', 'API_PATH', function EPBPerpanjanganByPpkJasa($resource, API_PATH) {
	return $resource(API_PATH + 'epb/noPpkJasa?noPpkJasa=:ppkjasa',{},{get:{method:'GET','Content-Type': 'application/json'}});
}])
.service('TagihanMinList', ['$resource', 'API_PATH', function TagihanMinList($resource, API_PATH) {
	return $resource(API_PATH+'master_tagihan_min',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('TagihanMinNew', ['$resource', 'API_PATH', function TagihanMinNew($resource, API_PATH) {
	return $resource(API_PATH+'master_tagihan_min',{},{save:{method:'POST'} });
}])
.service('TagihanMinView', ['$resource', 'API_PATH', function TagihanMinView($resource, API_PATH) {
	return $resource(API_PATH + 'master_tagihan_min/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('TagihanMinUpdate', ['$resource', 'API_PATH', function TagihanMinUpdate($resource, API_PATH) {
	return $resource(API_PATH+'master_tagihan_min/:id',{},{update:{method:'PUT'}});
}])
.service('TagihanMinDelete', ['$resource', 'API_PATH', function TagihanMinDelete($resource, API_PATH) {
	return $resource(API_PATH+'master_tagihan_min/:id',{},{delete:{method:'DELETE'} });
}])
//kademeter
.service('AddKademeter', ['$resource', 'API_PATH', function AddKademeter($resource, API_PATH) {
	return $resource(API_PATH+'clustering_dermaga',{},{save:{method:'POST'} });
}])
.service('KademeterList', ['$resource', 'API_PATH', function KademeterList($resource, API_PATH) {
	return $resource(API_PATH+'clustering_dermaga',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('KademeterDetail', ['$resource', 'API_PATH', function KedalamanDetail($resource, API_PATH) {
	return $resource(API_PATH + 'clustering_dermaga/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('KademeterEdit', ['$resource', 'API_PATH', function KedalamanEdit($resource, API_PATH) {
	return $resource(API_PATH+'clustering_dermaga/:id',{},{update:{method:'PUT'}});
}])
.service('DeleteKademeter', ['$resource', 'API_PATH', function DeleteKedalaman($resource, API_PATH) {
	return $resource(API_PATH+'clustering_dermaga/:id',{},{delete:{method:'DELETE'}});
}])
// clustering kapal
.service('AddClusteringKapal', ['$resource', 'API_PATH', function AddClusteringKapal($resource, API_PATH) {
	return $resource(API_PATH+'clustering_kapal',{},{save:{method:'POST'} });
}])
.service('ClusteringKapalList', ['$resource', 'API_PATH', function ClusteringKapalList($resource, API_PATH) {
	return $resource(API_PATH+'clustering_kapal',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ClusteringKapalDetail', ['$resource', 'API_PATH', function ClusteringKapalDetail($resource, API_PATH) {
	return $resource(API_PATH + 'clustering_kapal/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('ClusteringKapalEdit', ['$resource', 'API_PATH', function ClusteringKapalEdit($resource, API_PATH) {
	return $resource(API_PATH+'clustering_kapal/:id',{},{update:{method:'PUT'}});
}])
.service('DeleteClusterKapal', ['$resource', 'API_PATH', function DeleteClusterKapal($resource, API_PATH) {
	return $resource(API_PATH+'clustering_kapal/:id',{},{delete:{method:'DELETE'}});
}])
//meeting online
.service('MeetingOnline', ['$resource', 'API_PATH', function ParamKesepakatan($resource, API_PATH) {
	return $resource(API_PATH+'meeting_online',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('MeetingOnlineAdd', ['$resource', 'API_PATH', function ParamKesepakatanAdd($resource, API_PATH) {
	return $resource(API_PATH+'meeting_online',{},{save:{method:'POST'} });
}])
.service('MeetingOnlineDetail', ['$resource', 'API_PATH', function ParamKesepakatanView($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_online/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('MeetingOnlineEdit', ['$resource', 'API_PATH', function ParamKesepakatanUpddate($resource, API_PATH) {
	return $resource(API_PATH+'meeting_online/:id',{},{update:{method:'PUT'}});
}])
.service('MeetingOnlineDelete', ['$resource', 'API_PATH', function ParamKesepakatanDelete($resource, API_PATH) {
	return $resource(API_PATH+'meeting_online/:id',{},{delete:{method:'DELETE'} });
}])
//pembatalan pmh tanpa denda
.service('BatalPmhLabuh', ['$resource', 'API_PATH', function BatalPmhLabuh($resource, API_PATH) {
	return $resource(API_PATH+'pmh_labuh/batal/:ppkjasa',{},{update:{method:'PUT'} });
}])
.service('BatalPmhTambat', ['$resource', 'API_PATH', function BatalPmhTambat($resource, API_PATH) {
	return $resource(API_PATH+'pmh_tambat/batal/:ppkjasa',{},{update:{method:'PUT'} });
}])
.service('BatalPmhPandu', ['$resource', 'API_PATH', function BatalPmhPandu($resource, API_PATH) {
	return $resource(API_PATH+'pmh_pandu/batal/:ppkjasa',{},{update:{method:'PUT'} });
}])
.service('BatalPmhTunda', ['$resource', 'API_PATH', function BatalPmhTunda($resource, API_PATH) {
	return $resource(API_PATH+'pmh_tunda/batal/:ppkjasa',{},{update:{method:'PUT'} });
}])
.service('BatalPmhAirKapal', ['$resource', 'API_PATH', function BatalPmhAirKapal($resource, API_PATH) {
	return $resource(API_PATH+'pmh_air_kapal/batal/:ppkjasa',{},{update:{method:'PUT'} });
}])
//pembatalan ptp tanpa denda
.service('JenisRevisiLabuh', ['$resource', 'API_PATH', function JenisRevisiLabuh($resource, API_PATH) {
	return $resource(API_PATH+'ptp_labuh/:ppkjasa/set_jenis_revisi/:jenisRevisi',{},{update:{method:'PUT'} });
}])
.service('StatusLabuh', ['$resource', 'API_PATH', function StatusLabuh($resource, API_PATH) {
	return $resource(API_PATH+'ptp_labuh/:ppkjasa/set_status/:status',{},{update:{method:'PUT'} });
}])
.service('JenisRevisiTambat', ['$resource', 'API_PATH', function JenisRevisiTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tambat/:ppkjasa/set_jenis_revisi/:jenisRevisi',{},{update:{method:'PUT'} });
}])
.service('StatusTambat', ['$resource', 'API_PATH', function StatusTambat($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tambat/:ppkjasa/set_status/:status',{},{update:{method:'PUT'} });
}])
.service('JenisRevisiAir', ['$resource', 'API_PATH', function JenisRevisiAir($resource, API_PATH) {
	return $resource(API_PATH+'ptp_air_kapal/:ppkjasa/set_jenis_revisi/:jenisRevisi',{},{update:{method:'PUT'} });
}])
.service('StatusAir', ['$resource', 'API_PATH', function StatusAir($resource, API_PATH) {
	return $resource(API_PATH+'ptp_air_kapal/:ppkjasa/set_status/:status',{},{update:{method:'PUT'} });
}])
//as cancel mode
.service('JenisRevisiRealisasiPandu', ['$resource', 'API_PATH', function JenisRevisiRealisasiPandu($resource, API_PATH) {
	return $resource(API_PATH+'ptp_pandu/:ppkjasa/set_jenis_revisi/:jenisRevisi',{},{update:{method:'PUT'} });
}])
.service('StatusRealisasiPandu', ['$resource', 'API_PATH', function StatusRealisasiPandu($resource, API_PATH) {
	return $resource(API_PATH+'ptp_pandu/:ppkjasa/set_status/:status',{},{update:{method:'PUT'} });
}])
.service('JenisRevisiRealisasiTunda', ['$resource', 'API_PATH', function JenisRevisiRealisasiTunda($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tunda/:ppkjasa/set_jenis_revisi/:jenisRevisi',{},{update:{method:'PUT'} });
}])
.service('StatusRealisasiTunda', ['$resource', 'API_PATH', function StatusRealisasiTunda($resource, API_PATH) {
	return $resource(API_PATH+'ptp_tunda/:ppkjasa/set_status/:status',{},{update:{method:'PUT'} });
}])
//cek smua jasa msh aktif
.service('CheckAllBatal', ['$resource', 'API_PATH', function CheckAllBatal($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/:ppk1/check_all_batal',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('PenetapanSetDone', ['$resource', 'API_PATH', function PenetapanSetDone($resource, API_PATH) {
	return $resource(API_PATH+'penetapan/ppk1/:ppk1/set_permohonan_as_done',{},{update:{method:'PUT'} });
}])
/* notifikasi */
.service('NotifikasiMsgListDetail', ['$resource', 'API_PATH', function NotifikasiMsgListDetail($resource, API_PATH) {
	return $resource(API_PATH+'notification_msg',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('NotifikasiMsgList', ['$resource', 'API_PATH', function NotifikasiMsgList($resource, API_PATH) {
	return $resource(API_PATH + 'notification_type/list', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])

.service('NotifikasiMsgSetAsRead', ['$resource', 'API_PATH', function NotifikasiMsgSetAsRead($resource, API_PATH) {
	return $resource(API_PATH + 'notification_msg/set_as_read/:idNotifMsg', {}, { update: { method: 'PUT' } });
}])

.service('NotifikasiMsgSetAsUnread', ['$resource', 'API_PATH', function NotifikasiMsgSetAsUnread($resource, API_PATH) {
	return $resource(API_PATH + 'notification_msg/set_as_unread/:idNotifMsg', {}, { update: { method: 'PUT' } });
}])

.service('NotifikasiMsgByType', ['$resource', 'API_PATH', function NotifikasiMsgByType($resource, API_PATH) {
	return $resource(API_PATH + 'notification_msg/notif_type/:idNotifType', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])

//Escalation Type
.service('TipeEskalasiList', ['$resource', 'API_PATH', function TipeEskalasiList($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TipeEskalasiDetail', ['$resource', 'API_PATH', function TipeEskalasiDetaiil($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
	.service('TipeEskalasiDelete', ['$resource', 'API_PATH', function TipeEskalasiDelete($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type/:id', {}, { delete: { method: 'DELETE' } });
	}])
	.service('TipeEskalasiAdd', ['$resource', 'API_PATH', function TipeEskalasiAdd($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type', {}, { save: { method: 'POST' } });
	}])
	.service('TipeEskalasiEdit', ['$resource', 'API_PATH', function TipeEskalasiEdit($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
	}])
	.service('CekTipeEskalasiKode', ['$resource', 'API_PATH', function CekTipeEskalasiKode($resource, API_PATH) {
		return $resource(API_PATH + 'escalation_type/kode/:kode', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])

//Escalation History
.service('RiwayatEskalasiList', ['$resource', 'API_PATH', function RiwayatEskalasiList($resource, API_PATH) {

	return $resource(API_PATH+'escalation_history',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('RiwayatEskalasiDetail', ['$resource', 'API_PATH', function RiwayatEskalasiDetaiil($resource, API_PATH) {
	return $resource(API_PATH + 'escalation_history/:id',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('RiwayatEskalasiDelete', ['$resource', 'API_PATH', function RiwayatEskalasiDelete($resource, API_PATH) {
	return $resource(API_PATH+'escalation_history/:id',{},{delete:{method:'DELETE'} });
}])
.service('RiwayatEskalasiAdd', ['$resource', 'API_PATH', function RiwayatEskalasiAdd($resource, API_PATH) {
	return $resource(API_PATH+'escalation_history',{},{save:{method:'POST'} });
}])
.service('RiwayatEskalasiEdit', ['$resource', 'API_PATH', function RiwayatEskalasiEdit($resource, API_PATH) {
	return $resource(API_PATH+'escalation_history/:id',{},{update:{method:'POST', headers: { 'Content-Type': 'application/json'  }, transformRequest: angular.identity} });
}])
.service('PerencanaanNew', ['$resource', 'API_PATH', function PerencanaanNew($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/:kdDermaga',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('PublicPerencanaanNew', ['$resource', 'API_PATH', function PublicPerencanaanNew($resource, API_PATH) {
	return $resource(API_PATH + 'public/perencanaan/:kdDermaga',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('PerencanaanSave', ['$resource', 'API_PATH', function PerencanaanSave($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_prameeting', {}, { save: { method: 'POST' } });
}])
.service('PenetapanSave', ['$resource', 'API_PATH', function PenetapanSave($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting', {}, { save: { method: 'POST' } });
}])
//menambahkan API history_kapal_antrian by kodeDermaga dan tglPrameeting
.service('HistoryKapalAntrian', ['$resource', 'API_PATH', function HistoryKapalAntrian($resource, API_PATH) {
	return $resource(API_PATH + 'history_kapal_antrian/:kodeDermaga/:tglPrameeting', {}, { save: { method: 'POST' } });
}])
.service('PenetapanUpdate', ['$resource', 'API_PATH', function PenetapanUpdate($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/:id', {}, { update: { method: 'PUT' } });
}])
.service('UpdateHasilMeeting', ['$resource', 'API_PATH', function UpdateHasilMeeting($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/report', {}, { update: { method: 'PUT' } });
}])
.service('DeleteKapalHasilMeeting', ['$resource', 'API_PATH', function DeleteKapalHasilMeeting($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/perencanaan/:noPpkJasa', {}, { delete: { method: 'DELETE' } });
}])
.service('CancelRPKRO', ['$resource', 'API_PATH', function CancelRPKRO($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/batal_rpkro/:noPpkJasa', {}, { delete: { method: 'DELETE' } });
}])
.service('ListKapalRekomendasi', ['$resource', 'API_PATH', function ListKapalRekomendasi($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/rekomendasi_kapal/:kdDermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PublicListKapalRekomendasi', ['$resource', 'API_PATH', function PublicListKapalRekomendasi($resource, API_PATH) {
	return $resource(API_PATH + 'public/perencanaan/rekomendasi_kapal/:kdDermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('DeleteKapalPrameeting', ['$resource', 'API_PATH', function GrupPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/delete_kapal_prameeting', {}, { delete: { method: 'DELETE' } });
}])
.service('ListKapalHasilMeeting', ['$resource', 'API_PATH', function ListKapalHasilMeeting($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/rekomendasi_kapal/:kdDermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('ListKapalTerminalLain', ['$resource', 'API_PATH', function ListKapalTerminalLain($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/list_kapal_per_dermaga/:kdDermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('ListKapalCluster', ['$resource', 'API_PATH', function ListKapalCluster($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/list_kapal_per_Cluster/:kdDermaga/:clusteringId', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('ListKapalPrameeting', ['$resource', 'API_PATH', function ListKapalPrameeting($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/get_rekomendasi_prameeting', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PindahDermaga', ['$resource', 'API_PATH', function PindahDermaga($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/kapal_pindah_dermaga', {}, { update: { method: 'PUT' } });
}])
.service('ReportKapalPrameeting', ['$resource', 'API_PATH', function ReportKapalPrameeting($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_prameeting/get_report_hasil_prameeting', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('ReportKapalPrarencana', ['$resource', 'API_PATH', function ReportKapalPrarencana($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_prameeting/report_prarencana', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('ReportKapalMeeting', ['$resource', 'API_PATH', function ReportKapalPrameeting($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/get_report_hasil_meeting', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PublicReportHasilMeeting', ['$resource', 'API_PATH', function PublicReportHasilMeeting($resource, API_PATH) {
	return $resource(API_PATH + 'public/hasil_meeting/get_report_hasil_meeting', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KapalPrioritas', ['$resource', 'API_PATH', function KapalPrioritas($resource, API_PATH) {
	return $resource(API_PATH + '/perencanaan/get_kapal_prioritas', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('GetPasangSurut', ['$resource', 'API_PATH', function GetPasangSurut($resource, API_PATH) {
	return $resource(API_PATH + 'pasang_surut/per_tanggal/month/:month/year/:year', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PasangSurutSave', ['$resource', 'API_PATH', function PasangSurutSave($resource, API_PATH) {
	return $resource(API_PATH + 'pasang_surut', {}, { save: { method: 'POST' } });
}])
//grup pandu
.service('GrupPanduList', ['$resource', 'API_PATH', function GrupPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupPanduPerKawasanList', ['$resource', 'API_PATH', function GrupPanduPerKawasanList($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu/idKawasan/:idKawasan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('GrupPanduDetail', ['$resource', 'API_PATH', function GrupPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupPanduDelete', ['$resource', 'API_PATH', function GrupPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('GrupPanduAdd', ['$resource', 'API_PATH', function GrupPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu', {}, { save: { method: 'POST' } });
}])
.service('GrupPanduEdit', ['$resource', 'API_PATH', function GrupPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'group_perencanaan_pandu/:id', {}, { update: { method: 'PUT' } });
}])
//grup tambat
.service('GrupTambatList', ['$resource', 'API_PATH', function GrupTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupTambatDetail', ['$resource', 'API_PATH', function GrupTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupTambatSearch', ['$resource', 'API_PATH', function GrupTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat/search', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('GrupTambatDelete', ['$resource', 'API_PATH', function GrupTambatDelete($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('GrupTambatAdd', ['$resource', 'API_PATH', function GrupTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat', {}, { save: { method: 'POST' } });
}])
.service('GrupTambatEdit', ['$resource', 'API_PATH', function GrupTambatEdit($resource, API_PATH) {
	return $resource(API_PATH + 'group_petugas_tambat/:id', {}, { update: { method: 'PUT' } });
}])
//master pilot
.service('MasterPilotShuttleCarList', ['$resource', 'API_PATH', function MasterPilotList($resource, API_PATH) {
	return $resource(API_PATH + 'car', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MasterPilotShuttleCarAdd', ['$resource', 'API_PATH', function MasterPilotShuttleCarAdd($resource, API_PATH) {
	return $resource(API_PATH+'car',{},{save:{method:'POST'}});
}])

.service('MasterPilotShuttleCarUpdate', ['$resource', 'API_PATH', function MasterPilotShuttleCarUpdate($resource, API_PATH) {return $resource(API_PATH + 'car/:id', {}, { update: { method: 'PUT' } });
}])

.service('MasterPilotShuttleCarDetail', ['$resource', 'API_PATH', function PetugasTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'car/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])

.service('PilotShuttleCarAdd', ['$resource', 'API_PATH', function PilotBoatAdd($resource, API_PATH) {
	return $resource(API_PATH+'pilot_shuttle_car',{},{save:{method:'POST'}});
}])

.service('MasterPilotBoatAdd', ['$resource', 'API_PATH', function MasterPilotBoatAdd($resource, API_PATH) {
	return $resource(API_PATH+'boat',{},{save:{method:'POST'}});
}])

.service('PilotBoatAdd', ['$resource', 'API_PATH', function PilotBoatAdd($resource, API_PATH) {
	return $resource(API_PATH+'pilot_shuttle_boat',{},{save:{method:'POST'}});
}])

.service('MasterPilotBoatUpdate', ['$resource', 'API_PATH', function MasterPilotShuttleCarUpdate($resource, API_PATH) {return $resource(API_PATH + 'boat/:id', {}, { update: { method: 'PUT' } });
}])
.service('MasterPilotBoatList', ['$resource', 'API_PATH', function MasterPilotBoatList($resource, API_PATH) {
	return $resource(API_PATH + 'boat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])

.service('MasterPilotBoatDetail', ['$resource', 'API_PATH', function PetugasTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'boat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])

.service('CarDelete', ['$resource', 'API_PATH', function CarDelete($resource, API_PATH) {
	return $resource(API_PATH + 'car/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('BoatDelete', ['$resource', 'API_PATH', function CarDelete($resource, API_PATH) {
	return $resource(API_PATH + 'boat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('PilotBoatBatal', ['$resource', 'API_PATH', function PilotBoatBatal($resource, API_PATH) {return $resource(API_PATH + 'pilot_shuttle_boat/batal/:nomorSpkPandu', {}, { update: { method: 'PUT' } });
}])

.service('PilotShuttleCarBatal', ['$resource', 'API_PATH', function PilotBoatBatal($resource, API_PATH) {return $resource(API_PATH + 'pilot_shuttle_car/batal/:nomorSpkPandu', {}, { update: { method: 'PUT' } });
}])

.service('PilotShuttleCarStatus', ['$resource', 'API_PATH', function PilotBoatBatal($resource, API_PATH) {return $resource(API_PATH + 'pilot_shuttle_car/diterima', {}, { update: { method: 'PUT' } });
}])

.service('PilotBoatStatus', ['$resource', 'API_PATH', function PilotBoatBatal($resource, API_PATH) {return $resource(API_PATH + 'pilot_shuttle_boat/diterima', {}, { update: { method: 'PUT' } });
}])
//kawasan pandu
.service('KawasanPanduList', ['$resource', 'API_PATH', function KawasanPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KawasanPanduLevelSatuList', ['$resource', 'API_PATH', function KawasanPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan/list_kawasan_level1', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KawasanPanduLevelDuaList', ['$resource', 'API_PATH', function KawasanPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan/list_kawasan_level2', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KawasanPanduLevelDuaListByKodeCabang', ['$resource', 'API_PATH', function KawasanPanduLevelDuaListByKodeCabang($resource, API_PATH) {return $resource(API_PATH + 'kawasan/list_kawasan_level2_kode_cabang', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KawasanPanduDetail', ['$resource', 'API_PATH', function KawasanPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KawasanPanduDelete', ['$resource', 'API_PATH', function KawasanPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('KawasanPanduAdd', ['$resource', 'API_PATH', function KawasanPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan', {}, { save: { method: 'POST' } });
}])
.service('KawasanPanduEdit', ['$resource', 'API_PATH', function KawasanPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'kawasan/:id', {}, { update: { method: 'PUT' } });
}])
//jam kerja pandu
.service('JamKerjaPanduList', ['$resource', 'API_PATH', function JamKerjaPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JamKerjaPanduPerKawasanList', ['$resource', 'API_PATH', function JamKerjaPanduPerKawasanList($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu/idKawasan/:idKawasan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('JamKerjaPanduDetail', ['$resource', 'API_PATH', function JamKerjaPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JamKerjaPanduDelete', ['$resource', 'API_PATH', function JamKerjaPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('JamKerjaPanduAdd', ['$resource', 'API_PATH', function JamKerjaPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu', {}, { save: { method: 'POST' } });
}])
.service('JamKerjaPanduEdit', ['$resource', 'API_PATH', function JamKerjaPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_pandu/:id', {}, { update: { method: 'PUT' } });
}])
//jam kerja tunda
.service('JamKerjaTambatList', ['$resource', 'API_PATH', function JamKerjaTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JamKerjaTambatDetail', ['$resource', 'API_PATH', function JamKerjaTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JamKerjaTambatDelete', ['$resource', 'API_PATH', function JamKerjaTambatDelete($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('JamKerjaTambatAdd', ['$resource', 'API_PATH', function JamKerjaTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_tambat', {}, { save: { method: 'POST' } });
}])
.service('JamKerjaTambatEdit', ['$resource', 'API_PATH', function JamKerjaTambatEdit($resource, API_PATH) {
	return $resource(API_PATH + 'jam_kerja_tambat/:id', {}, { update: { method: 'PUT' } });
}])
//petugas pandu
.service('PetugasPanduList', ['$resource', 'API_PATH', function PetugasPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PetugasPanduPerKawasanList', ['$resource', 'API_PATH', function PetugasPanduPerKawasanList($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/:idKawasan', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PetugasPanduPerJadwalPandu', ['$resource', 'API_PATH', function PetugasPanduPerKawasanList($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/tglJadwal', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PetugasPanduDetail', ['$resource', 'API_PATH', function PetugasPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PetugasPanduDelete', ['$resource', 'API_PATH', function PetugasPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('PetugasPanduAdd', ['$resource', 'API_PATH', function PetugasPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu', {}, { save: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
}])
.service('PetugasPanduEdit', ['$resource', 'API_PATH', function PetugasPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/:id', {}, { update: { method: 'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity } });
}])
.service('PetugasPanduEditBulk', ['$resource', 'API_PATH', function PetugasPanduEditBulk($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/update_more_than_one', {}, { update: { method: 'PUT', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PetugasPanduSearch', ['$resource', 'API_PATH', function PetugasPanduSearch($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_pandu/search?nama=:nama', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
//petugastambat
.service('PetugasTambatList', ['$resource', 'API_PATH', function PetugasTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PetugasTambatDetail', ['$resource', 'API_PATH', function PetugasTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PetugasTambatDelete', ['$resource', 'API_PATH', function PetugasTambatDelete($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('PetugasTambatAdd', ['$resource', 'API_PATH', function PetugasTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_tambat', {}, { save: { method: 'POST' } });
}])
.service('PetugasTambatEdit', ['$resource', 'API_PATH', function PetugasTambatEdit($resource, API_PATH) {
	return $resource(API_PATH + 'petugas_tambat/:id', {}, { update: { method: 'PUT' } });
}])
//manajemen tunda
.service('KapalTundaList', ['$resource', 'API_PATH', function KapalTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'kapal_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KapalTundaId', ['$resource', 'API_PATH', function KapalTundaId($resource, API_PATH) {
	return $resource(API_PATH + 'kapal_tunda/:kodeKapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AturanKapalTundaList', ['$resource', 'API_PATH', function AturanKapalTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'aturan_kapal_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AturanKapalTundaDetail', ['$resource', 'API_PATH', function AturanKapalTundaDetail($resource, API_PATH) {
	return $resource(API_PATH + 'aturan_kapal_tunda/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AturanKapalTundaDelete', ['$resource', 'API_PATH', function AturanKapalTundaDelete($resource, API_PATH) {
	return $resource(API_PATH + 'aturan_kapal_tunda/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('AturanKapalTundaAdd', ['$resource', 'API_PATH', function AturanKapalTundaAdd($resource, API_PATH) {
	return $resource(API_PATH + 'aturan_kapal_tunda', {}, { save: { method: 'POST' } });
}])
.service('AturanKapalTundaEdit', ['$resource', 'API_PATH', function AturanKapalTundaEdit($resource, API_PATH) {
	return $resource(API_PATH + 'aturan_kapal_tunda/:id', {}, { update: { method: 'PUT' } });
}])
.service('HistoriKapalTundaList', ['$resource', 'API_PATH', function HistoriKapalTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'history_kapal_tunda/kodeKapal/:kodeKapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AddHistoryKapalTunda', ['$resource', 'API_PATH', function AddHistoryKapalTunda($resource, API_PATH) {
	return $resource(API_PATH + 'history_kapal_tunda', {}, { save: { method: 'POST' } });
}])
.service('LaporanDowntimeKapalTunda', ['$resource', 'API_PATH', function LaporanDowntimeKapalTunda($resource, API_PATH) {
	return $resource(API_PATH + 'history_kapal_tunda/downtime', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringJadwalTunda', ['$resource', 'API_PATH', function MonitoringJadwalTunda($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tunda/monitoring', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AktivitasTunda', ['$resource', 'API_PATH', function MonitoringJadwalTunda($resource, API_PATH) {
	return $resource(API_PATH + 'kapal_tunda/monitoring_aktivitas', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('AntrianTundaList', ['$resource', 'API_PATH', function AntrianTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_tunda/antrian_tunda', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('RequestEscalationHistory', ['$resource', 'API_PATH', function RequestEscalationHistory($resource, API_PATH) {
	return $resource(API_PATH + 'escalation_history/request/:escTypeCode/username/:username', {}, { update: { method: 'PUT' } });
}])
.service('UpdateStatusReaAfterEskalasi', ['$resource', 'API_PATH', function UpdateStatusReaAfterEskalasi($resource, API_PATH) {
	return $resource(API_PATH + 'realisasi/eskalasi_jasa/:noPpkJasa', {}, { update: { method: 'PUT' } });
}])
.service('PerencanaanTundaList', ['$resource', 'API_PATH', function PerencanaanTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/ptp_pandu/ohn', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PerencanaanTundaListOptimized', ['$resource', 'API_PATH', function PerencanaanTundaListOptimized($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/ptp_pandu/ohn/opt', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaTundaDetail', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaDetail($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/assign_tunda?noPpkJasa=:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaTundaList', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/spk_tunda', {}, { get: { method: 'GET' ,isArray: true,'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaTundaAdd', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaAdd($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/assign_tunda', {}, { save: { method: 'POST', 'Content-Type': 'application/json' } });
}])
.service('PerencanaanTundaDelete', ['$resource', 'API_PATH', function PerencanaanPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/batal_jasa_tunda/:noPpkJasa', {}, { delete: { method: 'DELETE' } });
}])
.service('SpkTundaDelete', ['$resource', 'API_PATH', function SpkPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/batal_spk_tunda/:nomorSpkTunda', {}, { delete: { method: 'DELETE' } });
}])
.service('TundaTanpaPanduList', ['$resource', 'API_PATH', function TundaTanpaPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/pmh_tunda', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('TundaTanpaPanduAdd', ['$resource', 'API_PATH', function TundaTanpaPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/assign_tunda/tanpa_pandu', {}, { save: { method: 'POST',isArray: true, 'Content-Type': 'application/json' } });
	}])
//jadwal pandu
.service('JadwalPanduList', ['$resource', 'API_PATH', function JadwalPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JadwalPanduDetail', ['$resource', 'API_PATH', function JadwalPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JadwalPanduDelete', ['$resource', 'API_PATH', function JadwalPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('JadwalPanduAdd', ['$resource', 'API_PATH', function JadwalPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu', {}, { save: { method: 'POST' } });
}])
.service('JadwalPanduEdit', ['$resource', 'API_PATH', function JadwalPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('JadwalPanduCurrentMonthList', ['$resource', 'API_PATH', function JadwalPanduCurrentMonthList($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_pandu/month/:month/year/:year', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('ReaPanduDesktopAdd', ['$resource', 'API_PATH', function ReaPanduDesktopAdd($resource, API_PATH) {
	return $resource(API_PATH + '/realisasi/rea_pandu/desktop', {}, { save: { method: 'POST' } });
}])
//jadwal tambat
.service('JadwalTambatList', ['$resource', 'API_PATH', function JadwalTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat/id_group/{idGroup}/periode/{blnThn}', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('JadwalTambatDelete', ['$resource', 'API_PATH', function JadwalTambatDelete($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat/by_date/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('JadwalTambatAdd', ['$resource', 'API_PATH', function JadwalTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat', {}, { save: { method: 'POST' } });
}])
.service('JadwalTambatEdit', ['$resource', 'API_PATH', function JadwalTambatEdit($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat/:id', {}, { update: { method: 'PUT' } });
}])
.service('JadwalTambatPerBulan', ['$resource', 'API_PATH', function JadwalTambatPerBulan($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat/', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JadwalTambatPerPetugasAdd', ['$resource', 'API_PATH', function JadwalTambatPerPetugasAdd($resource, API_PATH) {
	return $resource(API_PATH + 'jadwal_tambat/id_petugas/:idPetugas', {}, { save: { method: 'POST' } });
}])
.service('JadwalTambatMappingList', ['$resource', 'API_PATH', function JadwalTambatMappingList($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_jadwal_dermaga_tambat', {}, { get: { method: 'GET' } });
}])
.service('DermagaTambatMappingDetail', ['$resource', 'API_PATH', function DermagaTambatMappingDetail($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_group_dermaga_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('JadwalTambatMappingDelete', ['$resource', 'API_PATH', function JadwalTambatMappingDelete($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_jadwal_dermaga_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('JadwalTambatMappingAdd', ['$resource', 'API_PATH', function JadwalTambatMappingAdd($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_jadwal_dermaga_tambat', {}, { save: { method: 'POST' } });
}])
.service('JadwalTambatMappingEdit', ['$resource', 'API_PATH', function JadwalTambatMappingEdit($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_jadwal_dermaga_tambat/:id', {}, { update: { method: 'PUT' } });
}])
//kesediaan pandu
.service('KesediaanPanduList', ['$resource', 'API_PATH', function KesediaanPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KesediaanPanduPerHariList', ['$resource', 'API_PATH', function KesediaanPanduPerHariList($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu/get_petugas', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KesediaanPanduDetail', ['$resource', 'API_PATH', function KesediaanPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KesediaanPanduDelete', ['$resource', 'API_PATH', function KesediaanPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('KesediaanPanduAdd', ['$resource', 'API_PATH', function KesediaanPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu', {}, { save: { method: 'POST' } });
}])
.service('KesediaanPanduEdit', ['$resource', 'API_PATH', function KesediaanPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('PetugasPanduPerHariList', ['$resource', 'API_PATH', function PetugasPanduPerHariList($resource, API_PATH) {
	return $resource(API_PATH + 'kesediaan_pandu/get_petugas_tanggal', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('DermagaPanduList', ['$resource', 'API_PATH', function DermagaPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kategorisasi_dermaga_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('DermagaPanduDetail', ['$resource', 'API_PATH', function DermagaPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'kategorisasi_dermaga_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('DermagaPanduDelete', ['$resource', 'API_PATH', function DermagaPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'kategorisasi_dermaga_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('DermagaPanduAdd', ['$resource', 'API_PATH', function DermagaPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'kategorisasi_dermaga_pandu', {}, { save: { method: 'POST' } });
}])
.service('DermagaPanduEdit', ['$resource', 'API_PATH', function DermagaPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'kategorisasi_dermaga_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('DermagaTambatMappingList', ['$resource', 'API_PATH', function DermagaTambatMappingList($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_group_dermaga_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('DermagaTambatMappingDelete', ['$resource', 'API_PATH', function DermagaTambatMappingDelete($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_group_dermaga_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('DermagaTambatMappingAdd', ['$resource', 'API_PATH', function DermagaTambatMappingAdd($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_group_dermaga_tambat', {}, { save: { method: 'POST' } });
}])
.service('DermagaTambatMappingEdit', ['$resource', 'API_PATH', function DermagaTambatMappingEdit($resource, API_PATH) {
	return $resource(API_PATH + 'mapping_group_dermaga_tambat/:id', {}, { update: { method: 'PUT' } });
}])
.service('MonitoringTambatList', ['$resource', 'API_PATH', function MonitoringTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/monitoring_tambat', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('MonitoringPanduList', ['$resource', 'API_PATH', function MonitoringPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringAntrianPanduList', ['$resource', 'API_PATH', function MonitoringAntrianPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/antrian_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringAntrianPanduTest', ['$resource', 'API_PATH', function MonitoringAntrianPandutTest($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/test/antrian_pandu', {}, { get: { 
		method: 'GET',
		'Content-Type': 'application/json',
		interceptor: {
            response: function(response) {      
                var result = response.resource;        
                result.$status = response.status;
                return result;
            }
        } 
	} });
}])
.service('MonitoringAntrianPanduTestOpt', ['$resource', 'API_PATH', function MonitoringAntrianPandutTest($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/antrian_pandu_opt', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringAntrianPanduTanpaTambat', ['$resource', 'API_PATH', function MonitoringAntrianPandutTest($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/antrian_pandu_wt', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringAntrianPanduTanpaTambatBaru', ['$resource', 'API_PATH', function MonitoringAntrianPandutTest($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/test/antrian_pandu_per_jasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringPanduGenerateViewToTable', ['$resource', 'API_PATH', function MonitoringAntrianPandutTest($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/generateViewToTable', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringPetugasPandu', ['$resource', 'API_PATH', function MonitoringPetugasPandu($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/status_petugas_pandu', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('DashboardPandu', ['$resource', 'API_PATH', function DashboardPandu($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/dashboard_pandu', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('MonitoringPanduDetail', ['$resource', 'API_PATH', function MonitoringPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MonitoringPanduDelete', ['$resource', 'API_PATH', function MonitoringPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('MonitoringPanduAdd', ['$resource', 'API_PATH', function MonitoringPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu', {}, { save: { method: 'POST' } });
}])
.service('MonitoringPanduEdit', ['$resource', 'API_PATH', function MonitoringPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('PerencanaanPanduDelete', ['$resource', 'API_PATH', function PerencanaanPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/batal_jasa_pandu/:noPpkJasaPandu', {}, { delete: { method: 'DELETE' } });
}])
.service('SpkPanduDelete', ['$resource', 'API_PATH', function SpkPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_pandu/batal_spk_pandu/:noPpkJasaPandu', {}, { delete: { method: 'DELETE' } });
}])
.service('GrupDermagaTambatList', ['$resource', 'API_PATH', function GrupDermagaTambatList($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupDermagaTambatSearch', ['$resource', 'API_PATH', function GrupDermagaTambatSearch($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat/search', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('GrupDermagaTambatDetail', ['$resource', 'API_PATH', function GrupDermagaTambatDetail($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('GrupDermagaTambatDelete', ['$resource', 'API_PATH', function GrupDermagaTambatDelete($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('GrupDermagaTambatAdd', ['$resource', 'API_PATH', function GrupDermagaTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat', {}, { save: { method: 'POST' } });
}])
.service('GrupDermagaTambatEdit', ['$resource', 'API_PATH', function GrupDermagaTambatEdit($resource, API_PATH) {
	return $resource(API_PATH + 'group_dermaga_tambat/:id', {}, { update: { method: 'PUT' } });
}])
// Meeting Participant
.service('MeetingParticipantList', ['$resource', 'API_PATH', function MeetingParticipantList($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MeetingParticipantDetail', ['$resource', 'API_PATH', function MeetingParticipantDetail($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
}])
.service('MeetingParticipantDelete', ['$resource', 'API_PATH', function MeetingParticipantDelete($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('MeetingParticipantAdd', ['$resource', 'API_PATH', function MeetingParticipantAdd($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant', {}, { save: { method: 'POST', headers: { 'Content-Type': 'application/json' } } });
}])
.service('MeetingParticipantEdit', ['$resource', 'API_PATH', function MeetingParticipantEdit($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant/:id', {}, { update: { method: 'PUT' } });
}])
.service('MeetingParticipantGenerate', ['$resource', 'API_PATH', function MeetingParticipantGenerate($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_participant/generate_participant', {}, { get: { method: 'GET',isArray: true, 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaNumber', ['$resource', 'API_PATH', function SuratPerintahKerjaNumber($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/generate_spk_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaNumberPpkJasaTambat', ['$resource', 'API_PATH', function SuratPerintahKerjaNumberPpkJasaTambat($resource, API_PATH) {
	return $resource(API_PATH + '/surat_perintah_kerja_pandu/generate_no_spk/get_no_ppk_jasa_tambat', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	}])
.service('SpogNumber', ['$resource', 'API_PATH', function SpogNumber($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/check_spog', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('ProgressSpk', ['$resource', 'API_PATH', function SuratPerintahKerjaNumber($resource, API_PATH) {
	return $resource(API_PATH + 'progress_spk', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('ProgressSpkOptimized', ['$resource', 'API_PATH', function SuratPerintahKerjaNumber($resource, API_PATH) {
	return $resource(API_PATH + 'progress_spk/activity', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('OfflineSpkList', ['$resource', 'API_PATH', function SuratPerintahKerjaNumber($resource, API_PATH) {
	return $resource(API_PATH + 'public/offline_spk/getFromSync/:isSync', {}, { get: { method: 'GET',isArray: true, 'Content-Type': 'application/json' } });
}])
.service('OfflineSpkPanduAdd', ['$resource', 'API_PATH', function OfflineSpkPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'public/offline_spk', {}, { save: { method: 'POST' } });
}])
.service('SuratPerintahKerjaPanduDetail', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduDetail($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaPanduRpkro', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduRpkro($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/rpkro/:noPpkJasaPandu', {}, { get: { method: 'GET', 'Content-Type': 'text' } });
}])
.service('SuratPerintahKerjaPanduDelete', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduDelete($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('SuratPerintahKerjaPanduAdd', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduAdd($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu', {}, { save: { method: 'POST' } });
}])
.service('SuratPerintahKerjaPanduResend', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduResend($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/resend', {}, { save: { method: 'POST' } });
}])
.service('SuratPerintahKerjaPanduEdit', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduEdit($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('SuratPerintahKerjaPanduEditFlagDone', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduEditFlagDone($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/only_spk_pandu/:id', {}, { update: { method: 'PUT' } });
}])
.service('SuratPerintahKerjaPanduEditStatus', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduEditStatus($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_pandu/status/:id', {}, { update: { method: 'PUT' } });
}])
.service('SuratPerintahKerjaPanduCancel', ['$resource', 'API_PATH', function SuratPerintahKerjaPanduCancel($resource, API_PATH) {
	return $resource(API_PATH + '/surat_perintah_kerja_pandu/pembatalan', {}, { update: { method: 'PUT' } });
}])
.service('SuratPerintahKerjaTundaDelete', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaDelete($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_tunda/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('SuratPerintahKerjaTundaEdit', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaEdit($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_tunda/:id', {}, { update: { method: 'PUT' } });
}])
.service('SuratPerintahKerjaTundaCreate', ['$resource', 'API_PATH', function SuratPerintahKerjaTundaCreate($resource, API_PATH) {
	return $resource(API_PATH + '/surat_perintah_kerja_tunda/send_notif', {}, { update: { method: 'PUT' } });
}])
.service('SpkTundaNumber', ['$resource', 'API_PATH', function SpkTundaNumber($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_tunda/nomorSpk', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('SuratPerintahKerjaTambatAdd', ['$resource', 'API_PATH', function SuratPerintahKerjaTambatAdd($resource, API_PATH) {
	return $resource(API_PATH + 'surat_perintah_kerja_tambat/update_ohn/:nomorSpk', {}, { update: { method: 'PUT' } });
}])
.service('InformasiKegiatanKapal', ['$resource', 'API_PATH', function InformasiKegiatanKapal($resource, API_PATH) {
	return $resource(API_PATH + 'informasi_kegiatan_kapal/informasi_kegiatan_kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PublicInformasiKegiatanKapal', ['$resource', 'API_PATH', function PublicInformasiKegiatanKapal($resource, API_PATH) {
	return $resource(API_PATH + 'public/informasi_kegiatan_kapal/informasi_kegiatan_kapal', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('CheckBatasMasaTambat', ['$resource', 'API_PATH', function CheckBatasMasaTambat($resource, API_PATH) {
	return $resource(API_PATH + 'pmh_tambat/get_batas_masa_tambat', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
//branch param min. kpl. tunda
.service('BranchMinKplTundaList', ['$resource', 'API_PATH', function BranchMinKplTundaList($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('BranchMinKplTundaDetail', ['$resource', 'API_PATH', function BranchMinKplTundaDetail($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
}])
.service('BranchMinKplTundaDelete', ['$resource', 'API_PATH', function BranchMinKplTundaDelete($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('BranchMinKplTundaDetail', ['$resource', 'API_PATH', function BranchMinKplTundaDetail($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt/:id', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
}])
.service('BranchMinKplTundaAdd', ['$resource', 'API_PATH', function BranchMinKplTundaAdd($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt', {}, { save: { method: 'POST' } });
}])
.service('BranchMinKplTundaEdit', ['$resource', 'API_PATH', function BranchMinKplTundaEdit($resource, API_PATH) {
	return $resource(API_PATH + 'branch_param_min_kt/:id', {}, { update: { method: 'PUT' } });
}])
.service('ProgressSpkView', ['$resource', 'API_PATH', function ProgressSpkView($resource, API_PATH) {
	return $resource(API_PATH + 'progress_spk/kodeCabang', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
//master dermaga 
.service('MdmDermagaByKodeCabang', ['$resource', 'API_PATH', function MdmDermagaByKodeCabang(
	$resource, API_PATH) {
	return $resource(API_PATH + 'mdm_dermaga/search_by_kode_cabang', {}, {
		get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' }
	});
}])

//marvin add

.service('MdmDermagaByKodeCabangByJenisDmg', ['$resource', 'API_PATH', function MdmDermagaByKodeCabangByJenisDmg(
	$resource, API_PATH) {
	return $resource(API_PATH + 'mdm_dermaga/search_by_kode_cabang_jenis_dmg', {}, {
		get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' }
	});
}])

.service('PublicMdmCabang', ['$resource', 'API_PATH', function PublicMdmCabang($resource, API_PATH) {
	 return $resource(API_PATH + 'public/mdm_cabang', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])

//marvin
.service('PublicMdmCabangByRegional', ['$resource', 'API_PATH', function PublicMdmCabangByRegional($resource, API_PATH) {
	 return $resource(API_PATH + 'public/mdm_cabang/byRegional', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])

//marvin

.service('BatalJasaTanpaDenda', ['$resource', 'API_PATH', function BatalJasaTanpaDenda($resource, API_PATH) {
		return $resource(API_PATH + 'realisasi/batal_jasa_tanpa_denda/:noPpkJasa', {}, { save: { method: 'POST' } });
}])


//marvin absensi pandu


.service('AbsensiPandu', ['$resource', 'API_PATH', function AbsensiPandu($resource, API_PATH) {
		return $resource(API_PATH + 'public/absensi_pandu?nip=:nip&tglMasuk=:timeAbsen', {}, { save: { method: 'POST' } });
}])

//marvin
.service('AbsensiPanduIfExist', ['$resource', 'API_PATH', function AbsensiPanduIfExist($resource, API_PATH) {
		return $resource(API_PATH + 'public/absensi_pandu/cek_kesediaan_absensi_pandu?nip=:nip&tanggal=:timeAbsen', { 'Content-Type': 'application/json' }, { get: { method: 'GET' } });
}])

//absensi_pandu/cek_kesediaan_absensi_pandu

.service('CheckIdVisit', ['$resource', 'API_PATH', function CheckIdVisit($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/check_id_visit/kode_kapal/:kodeKapal',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('GenerateIdVisit', ['$resource', 'API_PATH', function GenerateIdVisit($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/get_id_visit/kode_kapal/:kodeKapal',{},{get:{method:'GET'}});
}])
.service('PmhLayananKapal', ['$resource', 'API_PATH', function PmhLayananKapal($resource, API_PATH) {
	return $resource(API_PATH+'pmh_labuh/kode_kapal/:kodeKapal',{},{get:{method:'GET'}});
}])
//Kapal Bebas Pandu Tunda
.service('KapalBebasPTList', ['$resource', 'API_PATH', function KapalBebasPTList($resource, API_PATH) {
	return $resource(API_PATH+'master_kapal_bebas_pt',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('KapalBebasPTDetail', ['$resource', 'API_PATH', function KapalBebasPTDetail($resource, API_PATH) {
	return $resource(API_PATH + 'master_kapal_bebas_pt/:id',{'Content-Type': 'application/json' },{get:{method:'GET'}});
}])
.service('KapalBebasPTDelete', ['$resource', 'API_PATH', function KapalBebasPTDelete($resource, API_PATH) {
	return $resource(API_PATH+'master_kapal_bebas_pt/:id',{},{delete:{method:'DELETE'} });
}])
.service('KapalBebasPTAdd', ['$resource', 'API_PATH', function KapalBebasPTAdd($resource, API_PATH) {
	return $resource(API_PATH+'master_kapal_bebas_pt',{},{save:{method:'POST'}});
}])
.service('KapalBebasPTEdit', ['$resource', 'API_PATH', function KapalBebasPTEdit($resource, API_PATH) {
	return $resource(API_PATH+'master_kapal_bebas_pt/:id',{},{update:{method:'PUT'}	});
}])
//persiapan prameeting
.service('PersiapanPrameeting', ['$resource', 'API_PATH', function PersiapanPrameeting($resource, API_PATH) {
   	return $resource(API_PATH + 'persiapan_prameeting/pmh_tambat', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PrameetingAddKapal', ['$resource', 'API_PATH', function PrameetingAddKapal($resource, API_PATH) {
    return $resource(API_PATH + 'persiapan_prameeting/tambah_kapal', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('CheckPersiapanPrameeting', ['$resource', 'API_PATH', function CheckPersiapanPrameeting($resource, API_PATH) {
    return $resource(API_PATH + 'perencanaan/check_persiapan_prameeting/:kdDermaga', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('UpdateStatusTl', ['$resource', 'API_PATH', function UpdateStatusTl($resource, API_PATH) {
    return $resource(API_PATH + 'persiapan_prameeting/status_tl', {}, { update: { method: 'PUT' } });
}])
.service('MeetingAddKapal', ['$resource', 'API_PATH', function MeetingAddKapal($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/tambah_kapal/:kdDermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KapalTlList', ['$resource', 'API_PATH', function KapalTlList($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting/kapal_tl', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('KapalTlListByDermaga', ['$resource', 'API_PATH', function KapalTlListByDermaga($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting/kapal_tl/kode_dermaga', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('PrameetingSave', ['$resource', 'API_PATH', function PrameetingSave($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting', {}, { save: { method: 'POST' } });
}])
.service('PrameetingUpdate', ['$resource', 'API_PATH', function PrameetingUpdate($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting/:id', {}, { update: { method: 'PUT' } });
}])
.service('AddReportPersiapan', ['$resource', 'API_PATH', function AddReportPersiapan($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting_report', {}, { save: { method: 'POST' } });
}])
.service('ReportPersiapan', ['$resource', 'API_PATH', function ReportPersiapan($resource, API_PATH) {
    return $resource(API_PATH + 'persiapan_prameeting_report/pmh_tambat', {}, { get: { method: 'GET',isArray:true, 'Content-Type': 'application/json' } });
}])
.service('SaveAntrianPrameeting', ['$resource', 'API_PATH', function SaveAntrianPrameeting($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting_report/bulk', {}, { save: { method: 'POST', isArray: true, 'Content-Type': 'application/json'} });
}])
//Prioritas kapal
// .service('AddPrioritasKapal', ['$resource', 'API_PATH', function AddPrioritasKapal($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal', {}, { save: { method: 'POST' } });
// }])
// .service('PrioritasKapalList', ['$resource', 'API_PATH', function PrioritasKapalList($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
// }])
// .service('PrioritasKapalDetail', ['$resource', 'API_PATH', function PrioritasKapalDetail($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
// }])
// .service('PrioritasKapalEdit', ['$resource', 'API_PATH', function PrioritasKapalEdit($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal/:id', {}, { update: { method: 'PUT' } });
// }])
// .service('DeletePrioritasKapal', ['$resource', 'API_PATH', function DeletePrioritasKapal($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal/:id', {}, { delete: { method: 'DELETE' } });
// }])
// .service('GetPrioritasByNama', ['$resource', 'API_PATH', function GetPrioritasByNama($resource, API_PATH) {
// 	return $resource(API_PATH + 'prioritas_kapal/nama_prioritas_kapal', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
// }])
//Informasi Dermaga
.service('AddInformasiDermaga', ['$resource', 'API_PATH', function AddInformasiDermaga($resource, API_PATH) {
    return $resource(API_PATH + 'informasi_dermaga/', {}, { save: { method: 'POST' } });
}])
.service('InformasiDermagaList', ['$resource', 'API_PATH', function InformasiDermagaList($resource, API_PATH) {
    return $resource(API_PATH + 'informasi_dermaga', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('InformasiDermagaDetail', ['$resource', 'API_PATH', function InformasiDermagaDetail($resource, API_PATH) {
    return $resource(API_PATH + 'informasi_dermaga/:id', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('InformasiDermagaEdit', ['$resource', 'API_PATH', function InformasiDermagaEdit($resource, API_PATH) {
    return $resource(API_PATH + 'informasi_dermaga/:id', {}, { update: { method: 'PUT' } });
}])
.service('DeleteInformasiDermaga', ['$resource', 'API_PATH', function DeleteInformasiDermaga($resource, API_PATH) {
    return $resource(API_PATH + 'informasi_dermaga/:id', {}, { delete: { method: 'DELETE' } });
}])
.service('ProgressSpkAdd', ['$resource', 'API_PATH', function ProgressSpkAdd($resource, API_PATH) {
    return $resource(API_PATH + 'progress_spk/:id', {}, { update: { method: 'POST', 'Content-Type': 'application/json' } });
}])
.service('ProgressSpkEdit', ['$resource', 'API_PATH', function ProgressSpkEdit($resource, API_PATH) {
    return $resource(API_PATH + 'progress_spk/:id', {}, { update: { method: 'PUT', 'Content-Type': 'application/json' } });
}])
.service('TahapanPanduList', ['$resource', 'API_PATH', function TahapanPanduList($resource, API_PATH) {
    return $resource(API_PATH + 'mobile/tahapan_pandu/list', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json' } });
}])
.service('SetBatalKonfirmasiPenetapan', ['$resource', 'API_PATH', function SetBatalKonfirmasiPenetapan($resource, API_PATH) {
    return $resource(API_PATH + 'penetapan/update_detail_permohonan/:noPpk1/:urutanPermohonan', {}, { update: { method: 'PUT' } });
}])
.service('SetIsPrameetingAsFalse', ['$resource', 'API_PATH', function SetIsPrameetingAsFalse($resource, API_PATH) {
    return $resource(API_PATH + 'pmh_tambat/set_is_prameeting_as_false/:noPpkJasa', {}, { update: { method: 'PUT' } });
}])
//Revisi Anjungan
.service('RevisiAnjungan', ['$resource', 'API_PATH', function RevisiAnjungan($resource, API_PATH) {
	return $resource(API_PATH+'revisi_anjungan',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('RevisiAnjunganDetail', ['$resource', 'API_PATH', function RevisiAnjunganDetail($resource, API_PATH) {
	return $resource(API_PATH + 'revisi_anjungan/:id',{'Content-Type': 'application/json' },{get:{method:'GET'}});
}])
.service('RevisiAnjunganDelete', ['$resource', 'API_PATH', function RevisiAnjunganDelete($resource, API_PATH) {
	return $resource(API_PATH+'revisi_anjungan/:id',{},{delete:{method:'DELETE'} });
}])
.service('RevisiAnjunganAdd', ['$resource', 'API_PATH', function RevisiAnjunganAdd($resource, API_PATH) {
	return $resource(API_PATH+'revisi_anjungan',{},{save:{method:'POST'}});
}])
.service('RevisiAnjunganEdit', ['$resource', 'API_PATH', function RevisiAnjunganEdit($resource, API_PATH) {
	return $resource(API_PATH+'revisi_anjungan/:id',{},{update:{method:'PUT'}	});
}])
//kedatangan kapal
.service('KedatanganList', ['$resource', 'API_PATH', function TahapanPanduList($resource, API_PATH) {
	return $resource(API_PATH + 'kedatangan_kapal', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KedatanganAdd', ['$resource', 'API_PATH', function ProgressSpkAdd($resource, API_PATH) {
	return $resource(API_PATH + 'kedatangan_kapal', {}, { update: { method: 'POST', 'Content-Type': 'application/json' } });
}])
.service('KedatanganEdit', ['$resource', 'API_PATH', function ProgressSpkEdit($resource, API_PATH) {
	return $resource(API_PATH + 'kedatangan_kapal/:id', {}, { update: { method: 'PUT', 'Content-Type': 'application/json' } });
}])
.service('KedatanganDelete', ['$resource', 'API_PATH', function KapalBebasPTDelete($resource, API_PATH) {
	return $resource(API_PATH+'kedatangan_kapal/:id',{},{delete:{method:'DELETE'} });
}])
.service('KedatanganDetail', ['$resource', 'API_PATH', function KapalBebasPTDelete($resource, API_PATH) {
	return $resource(API_PATH+'kedatangan_kapal/:id',{},{get:{ method: 'GET', 'Content-Type': 'application/json' } });
}])
//Hasil Meeting
.service('HasilMeetingList', ['$resource', 'API_PATH', function HasilMeetingList($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('HasilMeetingEdit', ['$resource', 'API_PATH', function HasilMeetingEdit($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/:id', {}, { update: { method: 'PUT', 'Content-Type': 'application/json' } });
}])
.service('HasilMeetingResetRpkro', ['$resource', 'API_PATH', function HasilMeetingResetRpkro($resource, API_PATH) {
	return $resource(API_PATH + 'inaportnet/status_batal_ppk_by_rpkro?nomorRpkro=:nomorRpkro', {}, { update: { method: 'POST', 'Content-Type': 'application/json' } });
}])
//Meeting Online
.service('MeetingOnlineSendEmail', ['$resource', 'API_PATH', function MeetingOnlineSendEmail($resource, API_PATH) {
	return $resource(API_PATH + 'meeting_online/send_email', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('HasilMeetingRevisi', ['$resource', 'API_PATH', function HasilMeetingRevisi($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/perubahan_penetapan', {}, { update: { method: 'PUT', 'Content-Type': 'application/json' } });
}])
.service('CheckIdVisitAirKapal', ['$resource', 'API_PATH', function CheckIdVisitAirKapal($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/check_id_visit_air_kapal/kode_kapal/:kodeKapal',{},{get:{method:'GET','Content-Type': 'application/json' }});
}])
.service('PerencanaanGet', ['$resource', 'API_PATH', function PerencanaanGet($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_prameeting', {}, { get: { method: 'GET' } });
}])
.service('PublicPerencanaanGet', ['$resource', 'API_PATH', function PublicPerencanaanGet($resource, API_PATH) {
	return $resource(API_PATH + 'public/hasil_prameeting', {}, { get: { method: 'GET' } });
}])
.service('ReportKapalAntrian', ['$resource', 'API_PATH', function ReportKapalAntrian($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/get_report_antrian_hasil_meeting', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PersiapanPrameetingGet', ['$resource', 'API_PATH', function PersiapanPrameetingGet($resource, API_PATH) {
	return $resource(API_PATH + 'persiapan_prameeting', {}, { get: { method: 'GET' } });
}])
.service('GrandLaporanAirKapal', ['$resource', 'API_PATH', function GrandLaporanAirKapal($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/report_air_kapal_with_total?tahun=:tahun&bulan=:bulan',{},{get:{method:'GET','Content-Type':'application/json'}});
}])
.service('SembunyikanKapal', ['$resource', 'API_PATH', function SembunyikanKapal($resource, API_PATH) {
	return $resource(API_PATH + 'perencanaan/visible_kapal_penetapan?noPpkJasa=:ppkjasa&isVisible=:visible',{},{update: { method: 'PUT', 'Content-Type': 'application/json' }} );
}])
.service('KapalLastLine', ['$resource', 'API_PATH', function KapalLastLine($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/get_report_rea_tambat',{},{get: { method: 'GET', 'Content-Type': 'application/json' }} );
}])
.service('MonitoringRPKRO', ['$resource', 'API_PATH', function MonitoringRPKRO($resource, API_PATH) {
	return $resource(API_PATH + 'hasil_meeting/monitoring_rpkro',{},{get: { method: 'GET', 'Content-Type': 'application/json' }} );
}])
.service('MeetingMessageAdd', ['$resource', 'API_PATH', function MeetingMessageAdd($resource, API_PATH) {
	return $resource(API_PATH+'public/meeting_message',{},{save:{method:'POST', headers: { 'Content-Type': undefined }, transformRequest: angular.identity}});
}])
.service('PersiapanPrameetingList', ['$resource', 'API_PATH', function PersiapanPrameetingList($resource, API_PATH) {
	return $resource(API_PATH + 'public/persiapan_prameeting/list_by_agen', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('PembatalanSpkList', ['$resource', 'API_PATH', function PembatalanSPKList($resource, API_PATH) {
	return $resource(API_PATH + 'history_pembatalan_spk', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('KapalGeserAdd', ['$resource', 'API_PATH', function KapalGeserAdd($resource, API_PATH) {
	return $resource(API_PATH+'kapal_geser',{},{ save: { method: 'POST', 'Content-Type': 'application/json'}});
}])
.service('KapalGeserGet', ['$resource', 'API_PATH', function KapalGeserGet($resource, API_PATH) {
	return $resource(API_PATH+'kapal_geser',{},{ get: { method: 'GET' , 'Content-Type': 'application/json'}});
}])
.service('KapalSandarMonitorPtp', ['$resource', 'API_PATH', function KapalSandarMonitorPtp($resource, API_PATH) {
	return $resource(API_PATH+'hasil_meeting/get_report/realisasi_tambat/penetapan',{},{ get: { method: 'GET' ,isArray: true, 'Content-Type': 'application/json'}});
}])
.service('KapalSandarMonitorRea', ['$resource', 'API_PATH', function KapalSandarMonitorRea($resource, API_PATH) {
	return $resource(API_PATH+'hasil_meeting/get_report/realisasi_tambat/kapal_sandar',{},{ get: { method: 'GET' ,isArray: true , 'Content-Type': 'application/json'}});
}])
//api for kapal sandar sudah last line
// .service('KapalSandarMonitorReaTambat', ['$resource', 'API_PATH', function KapalSandarMonitorRea($resource, API_PATH) {
// 	return $resource(API_PATH+'hasil_meeting/get_report/realisasi_tambat/kapal_sandar',{},{ get: { method: 'GET' ,isArray: true , 'Content-Type': 'application/json'}});
// }])
.service('BatalTanpaLayanan', ['$resource', 'API_PATH', function BatalTanpaLayanan($resource, API_PATH) {
	return $resource(API_PATH + 'ptp_pandu/:ppkJasa/pembatalan_tanpa_pandu', {}, { update: { method: 'PUT', 'Content-Type': 'application/json' } });
}])
.service('SilaporList', ['$resource', 'API_PATH', function SilaporList($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/report_silapor',{},{ get: { method: 'GET' ,isArray: true, 'Content-Type': 'application/json'}});
}])
.service('SilaporExcel', ['$resource', 'API_PATH', function SilaporList($resource, API_PATH) {
	return $resource(API_PATH+'public/permohonan/report_silapor',{},{ get: { method: 'GET', 'Content-Type': 'application/json'}});
}])
.service('SpbInaportnet', ['$resource', 'API_PATH', function SpbInaportnet($resource, API_PATH) {
	return $resource(API_PATH + 'spb_inaportnet/:noPpk1', {}, { get: { method: 'GET', isArray: true,'Content-Type': 'application/json'}});
}])
.service('CheckSpbInaportnet', ['$resource', 'API_PATH', function CheckSpbInaportnet($resource, API_PATH) {
	return $resource(API_PATH + 'spb_inaportnet/:noPpk1', {}, { get: { method: 'GET', isArray: true, 'Content-Type': 'application/json'}});
}])
.service('TanggalBatal', ['$resource', 'API_PATH', function TanggalBatal($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/tanggal_batal', {}, { get: { method: 'GET', 'Content-Type': 'application/json'}});
}])
.service('PNBPList', ['$resource', 'API_PATH', function PNBPList($resource, API_PATH) {
	return $resource(API_PATH + 'public/permohonan/report_pnbp', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
.service('MeetingHistory', ['$resource', 'API_PATH', function MeetingHistory($resource, API_PATH) {
	return $resource(API_PATH+'history_hasil_meeting_report/generate_save?kodeDermaga=:kodeDermaga&tglMeeting=:tglMeeting',{},{ save: { method: 'POST', isArray: true, 'Content-Type': 'application/json'}});
}])
//pandu comar
.service('PanduComar', ['$resource', 'API_PATH', function PanduComar($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu/buat_pandu', {}, { save: { method: 'POST', 'Content-Type': 'application/json' } });
}])
.service('PanduComarList', ['$resource', 'API_PATH', function PanduComarList($resource, API_PATH) {
		return $resource(API_PATH + 'rea_pandu', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
}])
// .service('JasaKapalList', ['$resource', 'API_PATH', function JasaKapalList($resource, API_PATH) {
// 	return $resource(API_PATH+'permohonan/report_jasa_kapal',{},{ get: { method: 'GET' ,isArray: true, 'Content-Type': 'application/json'}});
// }])
// API untuk laporan jasa kapal
.service('JasaKapalExcel', ['$resource', 'API_PATH', function JasaKapalExcel($resource, API_PATH) {
	return $resource(API_PATH+'permohonan/print_report_jasa_kapal',{},{ get: { method: 'GET', 'Content-Type': 'application/json'}});
}])
// API untuk dashboard-card
.service('OutstandingNota', ['$resource', 'API_PATH', function OutstandingNota($resource, API_PATH) {
	return $resource(API_PATH+'dashboard/outstanding',{},{ get: { method: 'GET', 'Content-Type': 'application/json', isArray:true}});
}])
.service('KunjunganKapal', ['$resource', 'API_PATH', function OutstandingNota($resource, API_PATH) {
	return $resource(API_PATH+'dashboard/kunjunganKapal',{},{ get: { method: 'GET', 'Content-Type': 'application/json', isArray:true}});
}])
.service('PendapatanKapal', ['$resource', 'API_PATH', function PendapatanKapal($resource, API_PATH) {
	return $resource(API_PATH + 'dashboard/pendapatanJenisKapal',{},{ get:{ method: 'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('PembatalanNota', ['$resource', 'API_PATH', function PembatalanNota($resource, API_PATH) {
	return $resource(API_PATH + 'dashboard/batalNota',{},{ get:{ method: 'GET',isArray: true,'Content-Type':'application/json'}});
}])
//API untuk laporan arus dan laporan produksi
.service('LaporanArusList', ['$resource', 'API_PATH', function LaporanArusList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/laporan_untuk_arus',{},{ get:{ method: 'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('LaporanProduksiList', ['$resource', 'API_PATH', function LaporanProduksiList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/laporan_untuk_produksi',{},{ get:{ method: 'GET',isArray: true,'Content-Type':'application/json'}});
}])
.service('MonitoringIpadPandu', ['$resource', 'API_PATH', function MonitoringIpadPandu($resource, API_PATH) {
	return $resource(API_PATH + 'monitoring_ipad_pandu',{},{ get:{ method: 'GET','Content-Type':'application/json'}});
}])
//list noppkjasa
.service('NoPpkJasaList', ['$resource', 'API_PATH', function NoPpkJasaList($resource, API_PATH) {
	return $resource(API_PATH + 'permohonan/list_no_ppk_jasa',{},{ get:{ method: 'GET','Content-Type':'application/json'}});
}])
.service('MasterCabangList', ['$resource', 'API_PATH', function MasterCabangList($resource, API_PATH) {
	return $resource(API_PATH + 'master_cabang',{},{ get:{ method: 'GET','Content-Type':'application/json'}});
}])

.service('CekKesediaanAbsensiPandu', ['$resource', 'API_PATH', function CekKesediaanAbsensiPandu($resource, API_PATH) {
	return $resource(API_PATH + 'public/absensi_pandu/cek_kesediaan_absensi_pandu',{},{ get:{ method: 'GET','Content-Type':'application/json'}});
}])



	// .service('PermohonanPanduBulk', ['$resource', 'API_PATH', function PermohonanPanduBulk($resource, API_PATH) {
	// 	return $resource(API_PATH + 'rea_pandu/buat_pandu', {}, { save: { method: 'POST', isArray: true, 'Content-Type': 'application/json' } });
	// }])
	// .service('PermohonanPanduDelete', ['$resource', 'API_PATH', function PermohonanPanduDelete($resource, API_PATH) {
	// 	return $resource(API_PATH + 'pmh_pandu/:id', {}, { delete: { method: 'DELETE' } });
	// }])
	// .service('PermohonanPanduDetail', ['$resource', 'API_PATH', function PermohonanPanduDetail($resource, API_PATH) {
	// 	return $resource(API_PATH + 'pmh_pandu/:noPpkJasa', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	// }])
	// .service('PermohonanPandulList', ['$resource', 'API_PATH', function PermohonanPandulList($resource, API_PATH) {
	// 	return $resource(API_PATH + 'pmh_pandu/list', {}, { get: { method: 'GET', 'Content-Type': 'application/json' } });
	// }])
	// .service('PermohonanPanduEdit', ['$resource', 'API_PATH', function PermohonanPanduEdit($resource, API_PATH) {
	// 	return $resource(API_PATH + 'pmh_pandu/:id', {}, { update: { method: 'PUT' } });
	// }])

; //end vasaapp