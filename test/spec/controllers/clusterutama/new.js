'use strict';

describe('Controller: ClusterutamaNewCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ClusterutamaNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClusterutamaNewCtrl = $controller('ClusterutamaNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClusterutamaNewCtrl.awesomeThings.length).toBe(3);
  });
});
