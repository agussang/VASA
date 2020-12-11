// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-07-15 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
      'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
      'bower_components/bootstrap-touchspin/src/jquery.bootstrap-touchspin.js',
      'bower_components/d3/d3.js',
      'bower_components/c3/c3.js',
      'bower_components/datatables/media/js/jquery.dataTables.js',
      'bower_components/datatables-colreorder/js/dataTables.colReorder.js',
      'bower_components/datatables-colvis/js/dataTables.colVis.js',
      'bower_components/moment/moment.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/google-code-prettify/bin/prettify.min.js',
      'bower_components/matchHeight/dist/jquery.matchHeight.js',
      'bower_components/patternfly-bootstrap-combobox/js/bootstrap-combobox.js',
      'bower_components/patternfly-bootstrap-treeview/dist/bootstrap-treeview.js',
      'bower_components/patternfly/dist/js/patternfly.js',
      'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-patternfly/dist/angular-patternfly.js',
      'bower_components/angular-strap/dist/angular-strap.js',
      'bower_components/angular-strap/dist/angular-strap.tpl.js',
      'bower_components/codemirror/lib/codemirror.js',
      'bower_components/codemirror/mode/javascript/javascript.js',
      'bower_components/codemirror/addon/hint/show-hint.js',
      'bower_components/codemirror/addon/hint/javascript-hint.js',
      'bower_components/codemirror/addon/lint/lint.js',
      'bower_components/codemirror/addon/lint/javascript-lint.js',
      'bower_components/codemirror/addon/edit/closebrackets.js',
      'bower_components/codemirror/addon/edit/matchbrackets.js',
      'bower_components/angular-ui-codemirror/ui-codemirror.js',
      'bower_components/jshint/dist/jshint.js',
      'bower_components/pdfmake/build/pdfmake.js',
      'bower_components/pdfmake/build/vfs_fonts.js',
      'bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
      'bower_components/angular-filter/dist/angular-filter.js',
      'bower_components/html2canvas/build/html2canvas.js',
      'bower_components/please-wait/build/please-wait.js',
      'bower_components/highcharts-ng/dist/highcharts-ng.js',
      'bower_components/highcharts/highcharts.js',
      'bower_components/fabric.js/dist/fabric.min.js',
      'bower_components/paho-mqtt-js/mqttws31.js',
      'bower_components/bootstrap-combobox/js/bootstrap-combobox.js',
      'bower_components/simple-web-notification/web-notification.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/angular-base64/angular-base64.js',
      'bower_components/angular-base64-upload/src/angular-base64-upload.js',
      'bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
