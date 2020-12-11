'use strict';

describe('Controller: PermissionDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PermissionDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionDetailCtrl = $controller('PermissionDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionDetailCtrl.awesomeThings.length).toBe(3);
  });
});
