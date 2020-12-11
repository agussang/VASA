'use strict';

describe('Controller: PermissionNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PermissionNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionNewCtrl = $controller('PermissionNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionNewCtrl.awesomeThings.length).toBe(3);
  });
});
