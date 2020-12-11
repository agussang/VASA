'use strict';

describe('Controller: KademeterKademeterdermagaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KademeterKademeterdermagaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KademeterKademeterdermagaCtrl = $controller('KademeterKademeterdermagaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KademeterKademeterdermagaCtrl.awesomeThings.length).toBe(3);
  });
});
