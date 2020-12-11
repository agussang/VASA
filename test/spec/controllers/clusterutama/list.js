'use strict';

describe('Controller: ClusterutamaListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var ClusterutamaListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClusterutamaListCtrl = $controller('ClusterutamaListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClusterutamaListCtrl.awesomeThings.length).toBe(3);
  });
});
