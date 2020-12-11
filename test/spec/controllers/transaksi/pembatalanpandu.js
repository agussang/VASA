'use strict';

describe('Controller: TransaksiPembatalanpanduCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPembatalanpanduCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPembatalanpanduCtrl = $controller('TransaksiPembatalanpanduCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
