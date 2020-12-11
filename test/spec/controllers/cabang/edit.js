'use strict';

describe('Controller: CabangEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var CabangEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabangEditCtrl = $controller('CabangEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabangEditCtrl.awesomeThings.length).toBe(3);
  });
});
