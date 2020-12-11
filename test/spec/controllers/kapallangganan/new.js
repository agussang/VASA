'use strict';

describe('Controller: KapallanggananNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KapallanggananNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KapallanggananNewCtrl = $controller('KapallanggananNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KapallanggananNewCtrl.awesomeThings.length).toBe(3);
  });
});
