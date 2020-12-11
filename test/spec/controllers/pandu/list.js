'use strict';

describe('Controller: PanduListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PanduListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PanduListCtrl = $controller('PanduListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PanduListCtrl.awesomeThings.length).toBe(3);
  });
});
