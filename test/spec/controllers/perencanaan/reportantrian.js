'use strict';

describe('Controller: PerencanaanReportantrianCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanReportantrianCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanReportantrianCtrl = $controller('PerencanaanReportantrianCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanReportantrianCtrl.awesomeThings.length).toBe(3);
  });
});
