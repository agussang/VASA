'use strict';

/**
 * @ngdoc function
 * @name vasaApp.controller:RouteEditCtrl
 * @description
 * # RouteEditCtrl
 * Controller of the vasaApp
 */

 angular.module('vasaApp')
 .controller('SimulasiCtrl', ['$scope', function ($scope) {

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

	$scope.sourceCode = 'function script(){\n\treturn VASA.masa_labuh * VASA.tarif_labuh * VASA.gt_kapal;\n}\n';

	$scope.fields = [
	{
		name: 'masa_labuh',
		desc: 'Masa Labuh Kapal',
		val: 0
	},
	{
		name: 'tarif_labuh',
		desc: 'Tarif Labuh Kapal',
		val: 0
	},
	{
		name: 'gt_kapal',
		desc: 'Gross Tonage Kapal, berat kotor kapal dalam ton',
		val: 0
	}
	];

	// codemirror instance
	$scope.codemirrorLoaded = function(_editor) {
		$scope.editor = _editor;
		console.log($scope.editor);
	};

	$scope.insf = function(field) {
		var doc = $scope.editor.getDoc();
		doc.replaceSelection('VASA.' + field);
	};

	$scope.submit = function(){
		if(JSHINT($scope.sourceCode)){
      (function updateFieldsValue(){
        window.VASA = {};
    		for (var i = $scope.fields.length - 1; i >= 0; i--) {
    			var field = $scope.fields[i];
    			window.VASA[field.name] = field.val;
    		}
      })();

      var script = eval('(' + $scope.sourceCode + ')');
      alert("result : " + script());
    } else {
      alert("Sourcecode tidak valid!");
    }
	};

}]);
