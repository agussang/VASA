'use strict';

describe('Controller: PerencanaanPreprameetingCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPreprameetingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPreprameetingCtrl = $controller('PerencanaanPreprameetingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPreprameetingCtrl.awesomeThings.length).toBe(3);
  });
});
