'use strict';

describe('Controller: ParameterNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ParameterNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParameterNewCtrl = $controller('ParameterNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParameterNewCtrl.awesomeThings.length).toBe(3);
  });
});
