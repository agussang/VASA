'use strict';

describe('Controller: PerlokasitujuanEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerlokasitujuanEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerlokasitujuanEditCtrl = $controller('PerlokasitujuanEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerlokasitujuanEditCtrl.awesomeThings.length).toBe(3);
  });
});
