'use strict';

describe('Controller: ManajementundaAturankapaltundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ManajementundaAturankapaltundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManajementundaAturankapaltundaCtrl = $controller('ManajementundaAturankapaltundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManajementundaAturankapaltundaCtrl.awesomeThings.length).toBe(3);
  });
});
