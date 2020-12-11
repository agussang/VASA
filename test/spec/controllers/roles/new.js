'use strict';

describe('Controller: RolesNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RolesNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RolesNewCtrl = $controller('RolesNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RolesNewCtrl.awesomeThings.length).toBe(3);
  });
});
