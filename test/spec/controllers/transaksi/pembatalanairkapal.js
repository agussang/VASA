'use strict';

describe('Controller: TransaksiPembatalanairkapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPembatalanairkapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPembatalanairkapalCtrl = $controller('TransaksiPembatalanairkapalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
