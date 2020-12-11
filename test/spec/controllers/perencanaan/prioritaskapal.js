'use strict';

describe('Controller: PerencanaanPrioritaskapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanPrioritaskapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanPrioritaskapalCtrl = $controller('PerencanaanPrioritaskapalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanPrioritaskapalCtrl.awesomeThings.length).toBe(3);
  });
});
