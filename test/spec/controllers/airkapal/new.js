'use strict';

describe('Controller: AirkapalNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var AirkapalNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AirkapalNewCtrl = $controller('AirkapalNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AirkapalNewCtrl.awesomeThings.length).toBe(3);
  });
});
