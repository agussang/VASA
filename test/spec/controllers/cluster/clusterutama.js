'use strict';

describe('Controller: ClusterClusterutamaCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ClusterClusterutamaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClusterClusterutamaCtrl = $controller('ClusterClusterutamaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClusterClusterutamaCtrl.awesomeThings.length).toBe(3);
  });
});
