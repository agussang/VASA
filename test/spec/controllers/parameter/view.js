'use strict';

describe('Controller: ParameterViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ParameterViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParameterViewCtrl = $controller('ParameterViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParameterViewCtrl.awesomeThings.length).toBe(3);
  });
});
