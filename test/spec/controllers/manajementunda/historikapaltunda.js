'use strict';

describe('Controller: ManajementundaHistorikapaltundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaHistorikapaltundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaHistorikapaltundaCtrl = $controller('ManajementundaHistorikapaltundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaHistorikapaltundaCtrl.awesomeThings.length).toBe(3);
  });
});
