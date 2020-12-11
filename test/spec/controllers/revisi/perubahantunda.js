'use strict';

describe('Controller: RevisiPerubahantundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerubahantundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerubahantundaCtrl = $controller('RevisiPerubahantundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerubahantundaCtrl.awesomeThings.length).toBe(3);
  });
});
