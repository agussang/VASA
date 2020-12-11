'use strict';

describe('Controller: TransaksiPenetapan2Ctrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapan2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapan2Ctrl = $controller('TransaksiPenetapan2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapan2Ctrl.awesomeThings.length).toBe(3);
  });
});
