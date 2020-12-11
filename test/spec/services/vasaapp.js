'use strict';

describe('Service: vasaapp', function () {

  // load the service's module
  beforeEach(module('vasaApp'));

  // instantiate service
  var vasaapp;
  beforeEach(inject(function (_vasaapp_) {
    vasaapp = _vasaapp_;
  }));

  it('should do something', function () {
    expect(!!vasaapp).toBe(true);
  });

});
