'use strict';

describe('Controller: ParameterEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ParameterEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParameterEditCtrl = $controller('ParameterEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParameterEditCtrl.awesomeThings.length).toBe(3);
  });
});
