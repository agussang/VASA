'use strict';

describe('Controller: PerencanaanPerencanaanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPerencanaanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPerencanaanCtrl = $controller('PerencanaanPerencanaanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPerencanaanCtrl.awesomeThings.length).toBe(3);
  });
});
