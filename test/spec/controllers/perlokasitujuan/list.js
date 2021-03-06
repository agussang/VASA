'use strict';

describe('Controller: PerlokasitujuanListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerlokasitujuanListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerlokasitujuanListCtrl = $controller('PerlokasitujuanListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerlokasitujuanListCtrl.awesomeThings.length).toBe(3);
  });
});
