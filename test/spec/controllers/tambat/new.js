'use strict';

describe('Controller: TambatNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TambatNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TambatNewCtrl = $controller('TambatNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TambatNewCtrl.awesomeThings.length).toBe(3);
  });
});
