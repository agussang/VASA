'use strict';

describe('Controller: LabuhNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var LabuhNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabuhNewCtrl = $controller('LabuhNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LabuhNewCtrl.awesomeThings.length).toBe(3);
  });
});
