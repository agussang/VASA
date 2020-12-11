'use strict';

describe('Controller: PanduViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PanduViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PanduViewCtrl = $controller('PanduViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PanduViewCtrl.awesomeThings.length).toBe(3);
  });
});
