'use strict';

describe('Controller: TransaksiListCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiListCtrl = $controller('TransaksiListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiListCtrl.awesomeThings.length).toBe(3);
  });
});
