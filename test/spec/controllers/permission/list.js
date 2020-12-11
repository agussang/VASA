'use strict';

describe('Controller: PermissionListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PermissionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionListCtrl = $controller('PermissionListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionListCtrl.awesomeThings.length).toBe(3);
  });
});
