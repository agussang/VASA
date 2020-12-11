'use strict';

describe('Controller: TransaksiLayanannewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiLayanannewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiLayanannewCtrl = $controller('TransaksiLayanannewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiLayanannewCtrl.awesomeThings.length).toBe(3);
  });
});
