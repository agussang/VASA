'use strict';

describe('Controller: TambatListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TambatListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TambatListCtrl = $controller('TambatListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TambatListCtrl.awesomeThings.length).toBe(3);
  });
});
