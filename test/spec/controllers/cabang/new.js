'use strict';

describe('Controller: CabangNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var CabangNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabangNewCtrl = $controller('CabangNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabangNewCtrl.awesomeThings.length).toBe(3);
  });
});
