'use strict';

describe('Controller: OtherProfilagenCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var OtherProfilagenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtherProfilagenCtrl = $controller('OtherProfilagenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OtherProfilagenCtrl.awesomeThings.length).toBe(3);
  });
});
