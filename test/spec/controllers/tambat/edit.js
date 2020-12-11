'use strict';

describe('Controller: TambatEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TambatEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TambatEditCtrl = $controller('TambatEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TambatEditCtrl.awesomeThings.length).toBe(3);
  });
});
