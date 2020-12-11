'use strict';

describe('Controller: PermissionEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PermissionEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionEditCtrl = $controller('PermissionEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionEditCtrl.awesomeThings.length).toBe(3);
  });
});
