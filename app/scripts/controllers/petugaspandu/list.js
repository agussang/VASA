'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:PetugasPanduListCtrl
 * @description
 * # PetugasPanduListCtrl
 * Controller of the vasaApp
 */
angular.module('vasaApp')
  .controller('PetugasPanduListCtrl', ['$scope','$location','$PAGE_SIZE','PetugasPanduList','LoadingScreen','PetugasPanduDelete','Notification','GrupPanduPerKawasanList','PetugasPanduEditBulk','KawasanPanduLevelDuaListByKodeCabang','SharedVariable','UserRole','Databinding','KawasanPanduLevelSatuList',function($scope,$location,$PAGE_SIZE,PetugasPanduList,LoadingScreen,PetugasPanduDelete,Notification, GrupPanduPerKawasanList,PetugasPanduEditBulk,KawasanPanduLevelDuaListByKodeCabang,SharedVariable, UserRole, Databinding,KawasanPanduLevelSatuList) {
    $scope.userRole = UserRole.getCurrentRole();
    $scope.groupId = {};
    $scope.arrayPetugas = [];
    $scope.petugasList = [];
    $scope.idCabang = localStorage.getItem('kodeCabang');

   // $scope.idCabang = $scope.idCabang.length < 2 ? '0' + $scope.idCabang : $scope.idCabang;

/*ambil idKawasan dari service DataBinding otherservice.js*/
    //$scope.idKawasan = Databinding.getIdKawasan(); ga jadi dipakai
    KawasanPanduLevelSatuList.get(function(response){
      $scope.cabang = response;
      console.log($scope.cabang);
    });


  $scope.getKawasan = function(val){
    KawasanPanduLevelDuaListByKodeCabang.get({
      kodeCabang: ('0' + $scope.idCabang).slice(-2)
    },function(response) {
        $scope.kawasan = response;
    });  
  }

  //init kawasan using default kode cabang
    $scope.getKawasan($scope.idCabang);

    $scope.$watch('idKawasan',function(newValue){
      if (newValue !== undefined){
        LoadingScreen.show();
        $scope.showTable = true;
        $scope.pageChanged(0);
        $scope.getGroupPerKawasan();
        // set idKawasan dari service DataBinding otherservice.js
        //Databinding.setIdKawasan(newValue);
      } else {
        $scope.showTable = false;
      }
    });

    $scope.optionSizePage = {
        availableOptions: [{number: 10},{number: 20},{number: 40},{number: 80}],
        selectedOption: {number: $PAGE_SIZE} //default select option size
      };

     // PAGING
    $scope.currentPage = 1;
    $scope.pageSize = $scope.optionSizePage.selectedOption.number;
    $scope.totalItems = 0;
    $scope.totalPages = 0;
    $scope.sortBy = '';
    $scope.sortDesc = false;

    $scope.pageChanged = function(newPage) {
      $scope.petugasList = [];
      var filter = {
          size : $scope.optionSizePage.selectedOption.number,
          page : newPage - 1,          
          sort : $scope.sortBy == '' ? 'lastUpdated,desc' : ($scope.sortBy + ',' + ($scope.sortDesc ? 'asc' : 'desc'))
      }

      if($scope.idKawasan != ''){
          filter.idKawasan = ($scope.idKawasan != '' ? $scope.idKawasan : '');
      }

      PetugasPanduList.get(filter,
        function(response) {
          LoadingScreen.hide();
          $scope.currentPage = response.number + 1;
          $scope.noIndex = ($scope.currentPage-1)*response.size;
          $scope.pageSize = response.size;
          $scope.totalItems = response.totalElements;
          $scope.totalPages = response.totalPages;
          $scope.allItems = response.content;
          $scope.items = $scope.allItems;
          $scope.pagingText = 'Showing '+ (($scope.pageSize * ($scope.currentPage - 1)) + 1) +' to '+ ($scope.totalItems < $scope.pageSize * $scope.currentPage ? $scope.totalItems : $scope.pageSize *
          $scope.currentPage)+' of '+$scope.totalItems;
          if($scope.idKawasan == ''){
            $scope.petugasList = [];
          }else{
            $scope.petugasList = $scope.items;
          }
          
          // $scope.items.forEach(function(element){
          //   if (element.idKawasan === $scope.idKawasan) {
          //     $scope.petugasList.push(element);
          //   }
          // });
          // console.log($scope.items);
      });
    }


       // $scope.deletePetugasPandu = function(idData){
       //   var checkDelete = confirm('Apakah anda ingin menghapus data?');
       //   if(checkDelete){
       //    PetugasPanduDelete.delete({id:idData},function(response){
       //       // console.log(response.$resolved);
       //       if(response.$resolved){
       //         $scope.setNotification  = {
       //           type	: "success",
       //           message	: "Data berhasil dihapus"
       //         };
       //       }else{
       //         $scope.setNotification  = {
       //           type	: "warning",
       //           message	: "Data tidak berhasil dihapus"
       //         };
       //       }

       //       Notification.setNotification($scope.setNotification);
       //       $scope.pageChanged(0);

       //     });
       //   }

       // };

       $scope.getGroupPerKawasan = function(){
         GrupPanduPerKawasanList.get({
          idKawasan: $scope.idKawasan
        },
        function(response){
           $scope.group = response;
           console.log($scope.group);
         });
       };


       $scope.$watch("groupId", function(newValue){
         if (typeof(newValue) !== "number"){
           $scope.isSelected = false;
         } else {
           $scope.isSelected = true;
         }
       });

       $scope.getSelectedState = function() {
         for (var i = 0; i < $scope.items.length; i++) {
           if ($scope.items[i].checked === true) {
             $scope.isChecked = true;
             break;
           } else {
             $scope.isChecked = false;
           }
         }
       };

       $scope.gantiGrupPandu = function () {
         var index = 0;
         $scope.items.forEach(function(element){
           if (element.checked === true){
             $scope.petugas = {};
             $scope.petugas.created = element.created;
             $scope.petugas.nipPandu = element.nipPandu;
             $scope.petugas.id = element.id;
             $scope.petugas.kode = element.kode;
             $scope.petugas.namaPetugas = element.namaPetugas;
             $scope.petugas.emailPetugas = element.emailPetugas;
             $scope.petugas.username = element.username;
             //$scope.petugas.hp = element.hp;
             $scope.petugas.groupId = $scope.groupId;
             $scope.petugas.idKawasan = element.idKawasan;
             $scope.petugas.photo = element.photo;
             $scope.arrayPetugas.push($scope.petugas);
           }
           index++;
         });
         if (index === $scope.items.length){
           PetugasPanduEditBulk.update($scope.arrayPetugas,
             function(response){
               //console.log($scope.petugasPandu);
               if(response.$resolved){
                 $scope.setNotification  = {
                   type	: "success", //ex : danger, warning, success, info
                   message	: "Data berhasil tersimpan"
                 };
                 Notification.setNotification($scope.setNotification);
                  $scope.pageChanged(0);
               } else {
                 $scope.setNotification  = {
                   type  : "warning", //ex : danger, warning, success, info
                   message : "Data tidak berhasil tersimpan"
                 };
                 Notification.setNotification($scope.setNotification);
                 $scope.buttonDisabled = false;
                 $scope.showLoader = false;
               }
             }
             );
         }
       };

       $scope.setKawasanPandu = function() {
         SharedVariable.setVariable($scope.idKawasan);
         $location.path('/petugaspandu/new/');
       };

  }]);
