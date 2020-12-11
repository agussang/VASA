'use strict';

describe('Controller: RevisiPerubahanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerubahanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerubahanCtrl = $controller('RevisiPerubahanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerubahanCtrl.awesomeThings.length).toBe(3);
  });
});
