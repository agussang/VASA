'use strict';

describe('Controller: RolesListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RolesListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RolesListCtrl = $controller('RolesListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RolesListCtrl.awesomeThings.length).toBe(3);
  });
});
