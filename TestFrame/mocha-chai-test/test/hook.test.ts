import { assert } from 'chai';
import { describe, it } from 'mocha';

/*
    钩子测试
      runs before all tests in this block
      runs before each test in this block
          ✔ hello
      runs after each test in this block
      runs after all tests in this block
*/
describe('钩子测试', function () {
  it('hello', () => {
    assert.notEqual(1 + 2, 2, '1+2 is notEqual 2');
  });

  // 表示 describe 这一组测试开始前便执行的函数
  before(function () {
    console.log('runs before all tests in this block');
  });

  // 每一个测试用例开始前执行的函数
  beforeEach(function () {
    console.log('runs before each test in this block');
  });

  // 每一个测试用例结束后执行的函数
  afterEach(function () {
    console.log('runs after each test in this block');
  });

  // 表示 describe 这一组测试结束后便执行的函数
  after(function () {
    console.log('runs after all tests in this block');
  });

  // test cases
});

/*

EXAMPLE:

  describe('Connection', function() {
      var db = new Connection,
        tobi = new User('tobi'),
        loki = new User('loki'),
        jane = new User('jane');

      beforeEach(function(done) {
        db.clear(function(err) {
          if (err) return done(err);
          db.save([tobi, loki, jane], done);
        });
      });

      describe('#find()', function() {
        it('respond with matching records', function(done) {
          db.find({type: 'User'}, function(err, res) {
            if (err) return done(err);
            res.should.have.length(3);
            done();
          });
        });
      });
  });
*/
