'use strict';

describe('Controller: KapallanggananEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KapallanggananEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KapallanggananEditCtrl = $controller('KapallanggananEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KapallanggananEditCtrl.awesomeThings.length).toBe(3);
  });
});
