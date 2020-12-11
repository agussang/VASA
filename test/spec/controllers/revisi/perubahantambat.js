'use strict';

describe('Controller: RevisiPerubahantambatCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerubahantambatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerubahantambatCtrl = $controller('RevisiPerubahantambatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerubahantambatCtrl.awesomeThings.length).toBe(3);
  });
});
