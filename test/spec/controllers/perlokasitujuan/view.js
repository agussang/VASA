'use strict';

describe('Controller: PerlokasitujuanViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerlokasitujuanViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerlokasitujuanViewCtrl = $controller('PerlokasitujuanViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerlokasitujuanViewCtrl.awesomeThings.length).toBe(3);
  });
});
