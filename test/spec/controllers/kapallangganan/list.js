'use strict';

describe('Controller: KapallanggananListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var KapallanggananListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KapallanggananListCtrl = $controller('KapallanggananListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KapallanggananListCtrl.awesomeThings.length).toBe(3);
  });
});
