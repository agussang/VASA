'use strict';

describe('Controller: TundaListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TundaListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TundaListCtrl = $controller('TundaListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TundaListCtrl.awesomeThings.length).toBe(3);
  });
});
