'use strict';

describe('Controller: CabangViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var CabangViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CabangViewCtrl = $controller('CabangViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CabangViewCtrl.awesomeThings.length).toBe(3);
  });
});
