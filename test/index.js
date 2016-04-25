var chai = require('chai');
chai.should();

var u = require('../index');

describe("untab", function(){
  it("should remove leading whitespace", function(){
    u`   test`.should.equal('test');
  });

  it("should ignore leading newlines", function(){
    u`
    test`.should.equal('test');
  });

  it("should ignore unindented first line", function(){
    u`test
      test`.should.equal('test\ntest');
  });

  it("should remove whitespace from all lines", function(){
    u`
    test
    test2`.should.equal('test\ntest2');
  });

  it("should only remove as many whitespace characters as is on the first line", function(){
    u`
    test
      test2`.should.equal('test\n  test2');
  });

  it("should support interleaving", function(){
    u`
    test
      ${5}
      test2`.should.equal('test\n  5\n  test2');
  });

  it("should not affect whitespace in interleaved values", function(){
    u`
    ${'  test'}
    test2`.should.equal('  test\ntest2');
  });

  it("should not fail if subsequent lines have too few spaces", function(){
    u`
      test
    test2`.should.equal('test\ntest2');
  });
});