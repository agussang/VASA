'use strict';

describe('Controller: KademeterInformasidermagaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KademeterInformasidermagaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KademeterInformasidermagaCtrl = $controller('KademeterInformasidermagaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KademeterInformasidermagaCtrl.awesomeThings.length).toBe(3);
  });
});
