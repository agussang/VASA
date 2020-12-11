'use strict';

describe('Controller: TransaksiPermohonannewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPermohonannewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPermohonannewCtrl = $controller('TransaksiPermohonannewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPermohonannewCtrl.awesomeThings.length).toBe(3);
  });
});
