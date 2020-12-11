'use strict';

describe('Controller: TundaNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TundaNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TundaNewCtrl = $controller('TundaNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TundaNewCtrl.awesomeThings.length).toBe(3);
  });
});
