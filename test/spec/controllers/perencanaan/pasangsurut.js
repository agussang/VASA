'use strict';

describe('Controller: PerencanaanPasangsurutCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPasangsurutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPasangsurutCtrl = $controller('PerencanaanPasangsurutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPasangsurutCtrl.awesomeThings.length).toBe(3);
  });
});
