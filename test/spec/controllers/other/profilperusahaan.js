'use strict';

describe('Controller: OtherProfilperusahaanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var OtherProfilperusahaanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtherProfilperusahaanCtrl = $controller('OtherProfilperusahaanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OtherProfilperusahaanCtrl.awesomeThings.length).toBe(3);
  });
});
