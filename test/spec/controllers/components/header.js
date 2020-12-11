'use strict';

describe('Controller: ComponentsHeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ComponentsHeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentsHeaderCtrl = $controller('ComponentsHeaderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
