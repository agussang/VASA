'use strict';

describe('Controller: MasterhargabbmListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var MasterhargabbmListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterhargabbmListCtrl = $controller('MasterhargabbmListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MasterhargabbmListCtrl.awesomeThings.length).toBe(3);
  });
});
