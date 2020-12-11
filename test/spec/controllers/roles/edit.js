'use strict';

describe('Controller: RolesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RolesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RolesEditCtrl = $controller('RolesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RolesEditCtrl.awesomeThings.length).toBe(3);
  });
});
