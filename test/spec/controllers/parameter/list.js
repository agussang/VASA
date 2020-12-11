'use strict';

describe('Controller: ParameterListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ParameterListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParameterListCtrl = $controller('ParameterListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParameterListCtrl.awesomeThings.length).toBe(3);
  });
});
