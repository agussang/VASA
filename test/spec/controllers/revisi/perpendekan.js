'use strict';

describe('Controller: RevisiPerpendekanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerpendekanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerpendekanCtrl = $controller('RevisiPerpendekanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerpendekanCtrl.awesomeThings.length).toBe(3);
  });
});
