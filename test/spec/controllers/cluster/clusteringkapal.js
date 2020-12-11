'use strict';

describe('Controller: ClusterClusteringkapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ClusterClusteringkapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClusterClusteringkapalCtrl = $controller('ClusterClusteringkapalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClusterClusteringkapalCtrl.awesomeThings.length).toBe(3);
  });
});
