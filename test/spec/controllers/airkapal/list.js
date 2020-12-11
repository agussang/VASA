'use strict';

describe('Controller: AirkapalListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var AirkapalListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AirkapalListCtrl = $controller('AirkapalListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AirkapalListCtrl.awesomeThings.length).toBe(3);
  });
});
