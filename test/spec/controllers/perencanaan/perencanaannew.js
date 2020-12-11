'use strict';

describe('Controller: PerencanaanPerencanaannewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPerencanaannewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPerencanaannewCtrl = $controller('PerencanaanPerencanaannewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPerencanaannewCtrl.awesomeThings.length).toBe(3);
  });
});
