'use strict';

describe('Controller: AirkapalViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var AirkapalViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AirkapalViewCtrl = $controller('AirkapalViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AirkapalViewCtrl.awesomeThings.length).toBe(3);
  });
});
