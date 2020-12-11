'use strict';

describe('Controller: RevisiPerubahanairkapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerubahanairkapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerubahanairkapalCtrl = $controller('RevisiPerubahanairkapalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerubahanairkapalCtrl.awesomeThings.length).toBe(3);
  });
});
