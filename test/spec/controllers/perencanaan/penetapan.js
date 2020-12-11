'use strict';

describe('Controller: PerencanaanPenetapanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPenetapanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPenetapanCtrl = $controller('PerencanaanPenetapanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPenetapanCtrl.awesomeThings.length).toBe(3);
  });
});
