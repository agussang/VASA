'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:JadwalPanduCtrl
 * @description
 * # JadwalPanduCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
    .controller('JadwalPanduCtrl', ['$scope', '$location', '$filter', '$timeout', '$route', 'JamKerjaPanduList', 'GrupPanduPerKawasanList', 'LoadingScreen', 'JadwalPanduCurrentMonthList', 'JadwalPanduAdd', 'Notification', 'KawasanPanduLevelDuaList', 'JadwalPanduDelete', 'UserRole', function($scope, $location, $filter, $timeout, $route, JamKerjaPanduList, GrupPanduPerKawasanList, LoadingScreen, JadwalPanduCurrentMonthList, JadwalPanduAdd, Notification, KawasanPanduLevelDuaList, JadwalPanduDelete, UserRole) {
        $scope.userRole = UserRole.getCurrentRole();
        $scope.parent = { search: '' };
        $scope.search = {};
        $scope.test = [];
        $scope.dataJadwalPandu = {};
        $scope.arrayGroup = [];
        $scope.shiftKerjaTemp = {};
        $scope.shiftKerja = [];

        var currentMonth = $filter('date')(new Date(), 'MM-yyyy');

        $scope.search.jadwalPandu = currentMonth;

        $scope.openPerencanaanPandu = function() {
            $location.path('/manajemenpandu/perencanaan');
        };

        $scope.getGrupPandu = function() {
            GrupPanduPerKawasanList.get({ idKawasan: $scope.idKawasan }, function(response) {
                $scope.group = response;
            });
        };

        KawasanPanduLevelDuaList.get(function(response) {
            $scope.kawasan = response;
        });

        $scope.$watch('idKawasan', function(newValue) {
            if (newValue !== undefined) {
                $scope.getJamkerja();
                $scope.showTable = true;
                $scope.getGrupPandu();
                $scope.splitDate($scope.search.jadwalPandu);
                $timeout(function() {
                    $scope.loadTabelJadwal();
                }, 500);
            } else {
                $scope.showTable = false;
            }
        });

        $scope.getJamkerja = function() {
            JamKerjaPanduList.get({size : 999, page : -1},function(response) {
                $scope.shiftKerja = [];
                $scope.shiftKerjaTemp = response.content;
                $scope.shiftKerjaTemp.forEach(function(element) {
                    element.labelJamMulai = moment(element.jamMulai, "HH:mm").format("HH:mm");
                    element.labelJamAkhir = moment(element.jamAkhir, "HH:mm").format("HH:mm");
                    element.label = "Jam " + element.labelJamMulai + " - " + element.labelJamAkhir;
                    if (element.idKawasan === $scope.idKawasan) {
                        $scope.shiftKerja.push(element);
                    }
                });
            });
        };


        $scope.jumlahHariDalamBulan = function(bulan, tahun) {
            return new Date(tahun, bulan, 0).getDate();
        };

        $scope.buatTanggal = function(jumlahHari) {
            $scope.arrayTanggal = [];
            var indexJamKerja = 0;
            $scope.shiftKerja.forEach(function(item) {
                $scope.arrayTanggal[indexJamKerja] = [];
                var indexTanggalPandu = 1;
                while (indexTanggalPandu <= jumlahHari) {
                    var hariPandu = indexTanggalPandu.toString().length === 1 ? '0' + indexTanggalPandu.toString() : indexTanggalPandu.toString();
                    $scope.arrayTanggal[indexJamKerja].push({
                        idCell: hariPandu + item.id.toString(),
                        index: indexTanggalPandu,
                        idJamKerja: item.id,
                        groupId: [],
                        groupName: [],
                        tanggalPandu: $scope.tahunPandu + '-' + $scope.bulanPandu + '-' + hariPandu,
                        bulanTahunPandu: $scope.bulanPandu + $scope.tahunPandu
                    });
                    indexTanggalPandu++;
                }
                indexJamKerja++;
            });
        };

        $scope.splitDate = function(item) {
            var splitDate = item.split('-');
            $scope.bulanPandu = splitDate[0];
            $scope.tahunPandu = splitDate[1];
        };

        $scope.$watch('search.jadwalPandu', function(newValue) {
            if (newValue) {
                $scope.splitDate(newValue);
                $scope.loadTabelJadwal();
            }
        });

        $scope.loadTabelJadwal = function() {
            if ($scope.search.jadwalPandu !== undefined) {
                LoadingScreen.show();
                $scope.getJadwalBulanIni();
                $scope.buatTanggal($scope.jumlahHariDalamBulan($scope.bulanPandu, $scope.tahunPandu));
                LoadingScreen.hide();

            }
        };

        $scope.findGroupName = function(idGrup, idData) {
            $scope.group.forEach(function(element) {
                if (element.id === idGrup) {
                    $scope.arrayTanggal[$scope.index][$scope.parentIndex].groupName.push({
                        name: element.namaGroup,
                        id: idData
                    });
                }
            });
        };

        $scope.getJadwalBulanIni = function() {
            $scope.dataTanggal = [];
            JadwalPanduCurrentMonthList.get({
                month: $scope.bulanPandu,
                year: $scope.tahunPandu,
                idKawasan: $scope.idKawasan
            }, function(response) {
                response.forEach(function(item) {
                    item.idCell = $filter('date')(item.mulai, 'dd') + item.idJamKerja.toString();
                    item.idNamaGrup = item.id;
                    item.idCheck = item.idCell + item.groupId.toString() + item.idKawasan.toString();
                    if (item.idKawasan === $scope.idKawasan) {
                        $scope.dataTanggal.push(item);
                    }
                });
                $timeout(function () {
                  $scope.insertJadwaltoArrayTanggal();
                }, 1000);

            });
        };


        $scope.insertJadwaltoArrayTanggal = function() {
            $scope.dataTanggal.forEach(function(item) {
                $scope.arrayTanggal.forEach(function(parentElement) {
                    parentElement.forEach(function(element) {
                        if (item.idCell === element.idCell) {
                            element.groupId.push(item.groupId);
                            element.groupName.push({
                                name: item.namaGroup,
                                id: item.idNamaGrup
                            });
                        }
                    });
                });
            });
        };

        var listener = function() {
            $scope.$watch('arrayTanggal', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if ($scope.index !== undefined) {
                        $scope.newCell = newValue[$scope.index][$scope.parentIndex];
                        $scope.oldCell = oldValue[$scope.index][$scope.parentIndex];
                        if ($scope.newCell.groupId === undefined) {
                            //do nothing
                        } else if ($scope.oldCell.groupId === undefined) {
                            //do nothing
                        } else if ($scope.newCell.groupId.length > $scope.oldCell.groupId.length && $scope.oldCell.bulanTahunPandu === $scope.newCell.bulanTahunPandu) {
                            $scope.createJadwalPandu();
                        } else if ($scope.newCell.groupId.length < $scope.oldCell.groupId.length && $scope.oldCell.bulanTahunPandu === $scope.newCell.bulanTahunPandu) {
                            //do nothing
                        }
                    }
                }
            }, true);
        };

        listener();


        $scope.update = function(index, parentIndex) {
            $scope.index = index;
            $scope.parentIndex = parentIndex;
        };

        $scope.createJadwalPandu = function() {
            $scope.dataJadwalPandu.groupId = parseInt($scope.newCell.groupId.filter(function(e) { return this.indexOf(e) < 0; }, $scope.oldCell.groupId));
            $scope.dataJadwalPandu.idJamKerja = parseInt($scope.newCell.idJamKerja);
            $scope.dataJadwalPandu.tanggalPandu = $filter('date')($scope.newCell.tanggalPandu, 'yyyy-MM-ddT00:00:00');
            $scope.dataJadwalPandu.idCell = $filter('date')($scope.newCell.tanggalPandu, 'dd') + $scope.newCell.idJamKerja;
            $scope.dataJadwalPandu.idKawasan = $scope.idKawasan;
            $scope.dataJadwalPandu.idCheck = $scope.dataJadwalPandu.idCell + $scope.dataJadwalPandu.groupId.toString() + $scope.idKawasan.toString();

            var findSame = $scope.dataTanggal.some(function(item) {
                return (item.idCheck === $scope.dataJadwalPandu.idCheck);
            });

            if (findSame || $scope.dataJadwalPandu.groupId == null) {
                return false;
            } else {
                //element doesn't exist
                LoadingScreen.show();
                JadwalPanduAdd.save($scope.dataJadwalPandu, function(response) {
                        if (response.status == "500") {
                            $scope.setNotification = {
                                type: "warning",
                                message: "Data tidak berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                        } else {
                            $scope.setNotification = {
                                type: "success",
                                message: "Data berhasil tersimpan"
                            };
                            Notification.setNotification($scope.setNotification);
                            $scope.findGroupName($scope.newCell.groupId[$scope.newCell.groupId.length - 1], response.id);
                            $scope.loadTabelJadwal();
                        }


                    },
                    function() {
                        $scope.setNotification = {
                            type: "warning",
                            message: "Data tidak berhasil tersimpan"
                        };
                        Notification.setNotification($scope.setNotification);
                    });
                    LoadingScreen.hide();

            }
        };

        $scope.deleteJadwalPandu = function(array, idData) {
            var checkDelete = confirm('Apakah anda ingin menghapus data?');
            if (checkDelete) {
                JadwalPanduDelete.delete({ id: idData }, function(response) {
                    if (response.$resolved) {
                        $scope.setNotification = {
                            type: "success",
                            message: "Data berhasil dihapus"
                        };
                    } else {
                        $scope.setNotification = {
                            type: "warning",
                            message: "Data tidak berhasil dihapus"
                        };
                    }
                    Notification.setNotification($scope.setNotification);
                    $scope.loadTabelJadwal();
                });
            }
        };
    }]);