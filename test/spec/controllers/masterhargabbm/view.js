'use strict';

describe('Controller: MasterhargabbmViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var MasterhargabbmViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterhargabbmViewCtrl = $controller('MasterhargabbmViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MasterhargabbmViewCtrl.awesomeThings.length).toBe(3);
  });
});
