'use strict';

describe('Controller: PerencanaanTambahkapalmeetingCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanTambahkapalmeetingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanTambahkapalmeetingCtrl = $controller('PerencanaanTambahkapalmeetingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanTambahkapalmeetingCtrl.awesomeThings.length).toBe(3);
  });
});
