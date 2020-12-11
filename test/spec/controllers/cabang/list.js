'use strict';

describe('Controller: CabangListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var CabangListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabangListCtrl = $controller('CabangListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabangListCtrl.awesomeThings.length).toBe(3);
  });
});
