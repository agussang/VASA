'use strict';

describe('Controller: KademeterKedalamanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KademeterKedalamanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KademeterKedalamanCtrl = $controller('KademeterKedalamanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KademeterKedalamanCtrl.awesomeThings.length).toBe(3);
  });
});
