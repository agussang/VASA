'use strict';

describe('Service: otherservice', function () {

  // load the service's module
  beforeEach(module('vasaApp'));

  // instantiate service
  var otherservice;
  beforeEach(inject(function (_otherservice_) {
    otherservice = _otherservice_;
  }));

  it('should do something', function () {
    expect(!!otherservice).toBe(true);
  });

});
