'use strict';

describe('Controller: RevisiPerubahanpanduCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var RevisiPerubahanpanduCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevisiPerubahanpanduCtrl = $controller('RevisiPerubahanpanduCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevisiPerubahanpanduCtrl.awesomeThings.length).toBe(3);
  });
});
