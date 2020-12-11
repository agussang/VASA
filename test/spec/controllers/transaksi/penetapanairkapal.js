'use strict';

describe('Controller: TransaksiPenetapanairkapalCtrl', function () {

  // load the controller's module
  beforeEach(module('vasaApp'));

  var TransaksiPenetapanairkapalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiPenetapanairkapalCtrl = $controller('TransaksiPenetapanairkapalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransaksiPenetapanairkapalCtrl.awesomeThings.length).toBe(3);
  });
});
