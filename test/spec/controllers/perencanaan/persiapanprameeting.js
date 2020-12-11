'use strict';

describe('Controller: PerencanaanPersiapanprameetingCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPersiapanprameetingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPersiapanprameetingCtrl = $controller('PerencanaanPersiapanprameetingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPersiapanprameetingCtrl.awesomeThings.length).toBe(3);
  });
});
