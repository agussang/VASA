'use strict';

describe('Controller: RevisiPerpanjanganCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerpanjanganCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerpanjanganCtrl = $controller('RevisiPerpanjanganCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerpanjanganCtrl.awesomeThings.length).toBe(3);
  });
});
