'use strict';

describe('Controller: AirkapalEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var AirkapalEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AirkapalEditCtrl = $controller('AirkapalEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AirkapalEditCtrl.awesomeThings.length).toBe(3);
  });
});
