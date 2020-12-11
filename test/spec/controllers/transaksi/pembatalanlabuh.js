'use strict';

describe('Controller: TransaksiPembatalanlabuhCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPembatalanlabuhCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPembatalanlabuhCtrl = $controller('TransaksiPembatalanlabuhCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
