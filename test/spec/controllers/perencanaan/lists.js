'use strict';

describe('Controller: PerencanaanListsCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var PerencanaanListsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerencanaanListsCtrl = $controller('PerencanaanListsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PerencanaanListsCtrl.awesomeThings.length).toBe(3);
  });
});
