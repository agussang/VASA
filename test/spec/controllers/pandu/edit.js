'use strict';

describe('Controller: PanduEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PanduEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PanduEditCtrl = $controller('PanduEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PanduEditCtrl.awesomeThings.length).toBe(3);
  });
});
