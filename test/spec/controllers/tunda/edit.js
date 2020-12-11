'use strict';

describe('Controller: TundaEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TundaEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TundaEditCtrl = $controller('TundaEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TundaEditCtrl.awesomeThings.length).toBe(3);
  });
});
