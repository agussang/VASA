'use strict';

describe('Controller: TambatViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TambatViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TambatViewCtrl = $controller('TambatViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TambatViewCtrl.awesomeThings.length).toBe(3);
  });
});
