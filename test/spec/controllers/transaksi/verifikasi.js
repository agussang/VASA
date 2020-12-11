'use strict';

describe('Controller: TransaksiVerifikasiCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiVerifikasiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiVerifikasiCtrl = $controller('TransaksiVerifikasiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiVerifikasiCtrl.awesomeThings.length).toBe(3);
  });
});
