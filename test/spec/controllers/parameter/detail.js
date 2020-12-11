'use strict';

describe('Controller: ParameterDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ParameterDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParameterDetailCtrl = $controller('ParameterDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParameterDetailCtrl.awesomeThings.length).toBe(3);
  });
});
