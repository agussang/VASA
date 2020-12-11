'use strict';

describe('Controller: TransaksiPembatalantundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPembatalantundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPembatalantundaCtrl = $controller('TransaksiPembatalantundaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
