'use strict';

describe('Controller: ManajementundaPerencanaanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaPerencanaanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaPerencanaanCtrl = $controller('ManajementundaPerencanaanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaPerencanaanCtrl.awesomeThings.length).toBe(3);
  });
});
