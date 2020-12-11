'use strict';

describe('Controller: TransaksiPenetapannewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapannewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapannewCtrl = $controller('TransaksiPenetapannewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapannewCtrl.awesomeThings.length).toBe(3);
  });
});
