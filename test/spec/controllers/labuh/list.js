'use strict';

describe('Controller: LabuhListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var LabuhListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LabuhListCtrl = $controller('LabuhListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LabuhListCtrl.awesomeThings.length).toBe(3);
  });
});
