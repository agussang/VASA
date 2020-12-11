'use strict';

describe('Controller: LabuhViewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var LabuhViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabuhViewCtrl = $controller('LabuhViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LabuhViewCtrl.awesomeThings.length).toBe(3);
  });
});
