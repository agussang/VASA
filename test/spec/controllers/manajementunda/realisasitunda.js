'use strict';

describe('Controller: ManajementundaRealisasitundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaRealisasitundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaRealisasitundaCtrl = $controller('ManajementundaRealisasitundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaRealisasitundaCtrl.awesomeThings.length).toBe(3);
  });
});
