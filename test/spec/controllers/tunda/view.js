'use strict';

describe('Controller: TundaViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TundaViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TundaViewCtrl = $controller('TundaViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TundaViewCtrl.awesomeThings.length).toBe(3);
  });
});
