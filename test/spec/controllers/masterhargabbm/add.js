'use strict';

describe('Controller: MasterhargabbmAddCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var MasterhargabbmAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterhargabbmAddCtrl = $controller('MasterhargabbmAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MasterhargabbmAddCtrl.awesomeThings.length).toBe(3);
  });
});
