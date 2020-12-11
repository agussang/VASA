'use strict';

describe('Controller: PerlokasitujuanNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerlokasitujuanNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerlokasitujuanNewCtrl = $controller('PerlokasitujuanNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerlokasitujuanNewCtrl.awesomeThings.length).toBe(3);
  });
});
