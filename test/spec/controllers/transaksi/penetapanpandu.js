'use strict';

describe('Controller: TransaksiPenetapanpanduCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapanpanduCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapanpanduCtrl = $controller('TransaksiPenetapanpanduCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapanpanduCtrl.awesomeThings.length).toBe(3);
  });
});
