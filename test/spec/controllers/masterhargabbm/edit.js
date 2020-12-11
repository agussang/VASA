'use strict';

describe('Controller: MasterhargabbmEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var MasterhargabbmEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterhargabbmEditCtrl = $controller('MasterhargabbmEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MasterhargabbmEditCtrl.awesomeThings.length).toBe(3);
  });
});
