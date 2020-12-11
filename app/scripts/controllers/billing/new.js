'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

 angular.module('vasaApp')
 .controller('BillingAddCtrl', ['$scope','$location','BillingAdd','Notification','LoadingScreen', function ($scope,$location,BillingAdd,Notification,LoadingScreen) {
  LoadingScreen.show();
  $scope.switchDefault = true;
 	$scope.dataBilling = {};
 	$scope.dataBilling.create = $scope.switchDefault;
 	$scope.dataBilling.read = $scope.switchDefault;
 	$scope.dataBilling.update = $scope.switchDefault;
 	$scope.dataBilling.delete = $scope.switchDefault;
 	$scope.dataBilling.print = $scope.switchDefault;
 	$scope.locationPath = '/billing';
 	$scope.dataBilling.status = true;

 	var dataEmpty = function(){
 		$scope.detailFound 	= false;
 		$scope.loading 		= false;
 		$scope.contents 	= 'no content found';
 	};


	//option datepicker
	$scope.options = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true
	};

	// // function update
	// $scope.submit = function(){
	// 	BillingAdd.update($scope.dataBilling,
	// 		function(response){
	// 			$scope.setNotification  = {
	// 				type	: "success", //ex : danger, warning, success, info
	// 				message	: "Data berhasil tersimpan"
	// 			};
	// 			Notification.setNotification($scope.setNotification);
	// 			$location.path($scope.locationPath);
	// 		},
	// 		function(response){
	// 			$scope.setNotification  = {
	// 				type	: "warning", //ex : danger, warning, success, info
	// 				message	: "Data tidak berhasil tersimpan"
	// 			};
	// 			Notification.setNotification($scope.setNotification);
	// 			$scope.buttonDisabled = false;
	// 			$scope.showLoader = false;
	// 		}
	// 	);
	// }

	// function cancel
	$scope.cancel =  function(){
		$location.path($scope.locationPath);
	}

	$scope.editorOptions = {
		lineWrapping : true,
		lineNumbers: true,
		mode: 'javascript',
		extraKeys: {"Ctrl-Space": "autocomplete"},
		gutters: ["CodeMirror-lint-markers"],
		lint: true,
		autoCloseBrackets: true,
		globalScope:false,
		matchBrackets:true,
	};

	$scope.dataBilling.sourceCode = 'function myScript(){\n\treturn 100;\n}\n';

	$scope.fields = [
	{
		name: 'masa_labuh',
		desc: 'Masa Labuh Kapal',
		val: 0
	},
	{
		name: 'etmal',
		desc: 'Hasil perhitungan Etmal',
		val: 0
	},
	{
		name: 'gt',
		desc: 'Gross Tonage Kapal, berat kotor kapal dalam ton',
		val: 0
	},
	{
		name: 'flagship',
		desc: 'Bendera Kapal',
		val: 'id'
	}
	];

	(function populateFieldsValue(){
		window.VASA = {};
		for (var i = $scope.fields.length - 1; i >= 0; i--) {
			var field = $scope.fields[i];
			window.VASA[field.name] = field.val;
		}
	})();

	// codemirror instance
	$scope.codemirrorLoaded = function(_editor) {
		$scope.editor = _editor;
		console.log($scope.editor);
	};

	$scope.insf = function(field) {
		// console.log(field);
		var doc = $scope.editor.getDoc();
		doc.replaceSelection('VASA.' + field);
	};

	$scope.submit = function(){
		var validation = JSHINT($scope.dataBilling.sourceCode);
		if(validation){
			$scope.setNotification  = {
				type	: "success",
				message	: "Sourcecode diterima."
				};
			Notification.setNotification($scope.setNotification);
		}
		else{
			$scope.setNotification  = {
				type	: "danger",
				message	: "Sourcecode tidak valid!"
				};
			Notification.setNotification($scope.setNotification);
		}
	};

  LoadingScreen.hide();
}]);
