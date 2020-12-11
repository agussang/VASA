'use strict';

describe('Controller: BillingNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var BillingNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillingNewCtrl = $controller('BillingNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BillingNewCtrl.awesomeThings.length).toBe(3);
  });
});
