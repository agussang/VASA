'use strict';

describe('Controller: ManajementundaLaporankapaltundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaLaporankapaltundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaLaporankapaltundaCtrl = $controller('ManajementundaLaporankapaltundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaLaporankapaltundaCtrl.awesomeThings.length).toBe(3);
  });
});
