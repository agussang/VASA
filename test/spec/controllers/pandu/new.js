'use strict';

describe('Controller: PanduNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PanduNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PanduNewCtrl = $controller('PanduNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PanduNewCtrl.awesomeThings.length).toBe(3);
  });
});
