'use strict';

describe('Controller: ManajementundaListkapaltundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaListkapaltundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaListkapaltundaCtrl = $controller('ManajementundaListkapaltundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaListkapaltundaCtrl.awesomeThings.length).toBe(3);
  });
});
