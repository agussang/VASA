'use strict';

describe('Controller: TransaksiPembatalanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPembatalanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPembatalanCtrl = $controller('TransaksiPembatalanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPembatalanCtrl.awesomeThings.length).toBe(3);
  });
});
