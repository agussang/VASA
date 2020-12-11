'use strict';

describe('Controller: KapallanggananViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KapallanggananViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KapallanggananViewCtrl = $controller('KapallanggananViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KapallanggananViewCtrl.awesomeThings.length).toBe(3);
  });
});
