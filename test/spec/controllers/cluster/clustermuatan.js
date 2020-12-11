'use strict';

describe('Controller: ClusterClustermuatanCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ClusterClustermuatanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClusterClustermuatanCtrl = $controller('ClusterClustermuatanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClusterClustermuatanCtrl.awesomeThings.length).toBe(3);
  });
});
