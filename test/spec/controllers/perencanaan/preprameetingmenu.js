'use strict';

describe('Controller: PerencanaanPreprameetingmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPreprameetingmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPreprameetingmenuCtrl = $controller('PerencanaanPreprameetingmenuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPreprameetingmenuCtrl.awesomeThings.length).toBe(3);
  });
});
