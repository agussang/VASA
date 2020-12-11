'use strict';

describe('Controller: TransaksiPenetapantundaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapantundaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapantundaCtrl = $controller('TransaksiPenetapantundaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapantundaCtrl.awesomeThings.length).toBe(3);
  });
});
