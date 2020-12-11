'use strict';

describe('Controller: TransaksiPenetapanlabuhCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapanlabuhCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapanlabuhCtrl = $controller('TransaksiPenetapanlabuhCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapanlabuhCtrl.awesomeThings.length).toBe(3);
  });
});
