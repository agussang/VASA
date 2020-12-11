'use strict';

describe('Controller: BillingListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var BillingListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillingListCtrl = $controller('BillingListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BillingListCtrl.awesomeThings.length).toBe(3);
  });
});
