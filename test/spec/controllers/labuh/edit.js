'use strict';

describe('Controller: LabuhEditCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var LabuhEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabuhEditCtrl = $controller('LabuhEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LabuhEditCtrl.awesomeThings.length).toBe(3);
  });
});
