'use strict';

describe('Controller: TransaksiMutasiCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiMutasiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiMutasiCtrl = $controller('TransaksiMutasiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiMutasiCtrl.awesomeThings.length).toBe(3);
  });
});
