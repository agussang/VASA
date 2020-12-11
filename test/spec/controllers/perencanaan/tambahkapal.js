'use strict';

describe('Controller: PerencanaanTambahkapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanTambahkapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanTambahkapalCtrl = $controller('PerencanaanTambahkapalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanTambahkapalCtrl.awesomeThings.length).toBe(3);
  });
});
