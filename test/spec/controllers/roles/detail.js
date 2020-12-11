'use strict';

describe('Controller: RolesDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RolesDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RolesDetailCtrl = $controller('RolesDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RolesDetailCtrl.awesomeThings.length).toBe(3);
  });
});
