const should = require('should');
const sinon = require('sinon');
require('should-sinon');

const Dict = require('../dist').default;

it('constructor requires new', () => {
  Dict.should.throw();
});

it('construct args', () => {
  (new Dict()).size.should.equal(0);
});

it('constructor iterable', () => {
  sinon.spy(Dict.prototype, 'set');

  const entries = [
    ['key1', 'key2', 'value1'],
    ['key3', 'key4', 'value2'],
  ];
  const iterable = new Dict(entries);

  iterable.size.should.equal(2);

  iterable.set.should.be.calledTwice();
  iterable.set.getCall(0).args.should.deepEqual(entries[0]);
  iterable.set.getCall(1).args.should.deepEqual(entries[1]);

  iterable.get('key1', 'key2').should.equal('value1');
  iterable.get('key3', 'key4').should.equal('value2');

  Dict.prototype.set.restore();
});

it('get set', () => {
  const dict = new Dict();
  dict.set('a', 'b', 'value').should.equal(dict);
  dict.size.should.be.equal(1);
  dict.get('a', 'b').should.equal('value');
  dict.has('a', 'b').should.be.true();
});

it('overwrite', () => {
  const dict = new Dict();
  dict.set('a', 'b', 'value').should.equal(dict);
  dict.set('a', 'b', 'new value').should.equal(dict);
  dict.has('a', 'b').should.be.true();
  dict.get('a', 'b').should.equal('new value');
  dict.size.should.be.equal(1);
});

it('overwrite partial', () => {
  const dict = new Dict();
  dict.set('a', 'b', 'c', 'deep value').should.equal(dict);
  dict.has('a', 'b', 'c').should.be.true();
  dict.get('a', 'b', 'c').should.equal('deep value');

  dict.has('a', 'b').should.be.false();
  should(dict.get('a', 'b')).be.undefined();

  dict.set('a', 'b', 'value').should.equal(dict);
  dict.has('a', 'b').should.be.true();
  dict.get('a', 'b').should.equal('value');

  dict.has('a', 'b', 'c').should.be.true();
  dict.get('a', 'b', 'c').should.equal('deep value');
  dict.size.should.be.equal(2);
});

it('delete', () => {
  const dict = new Dict();
  dict.set('a', 'b', 'value');
  dict.has('a', 'b').should.be.true();
  dict.delete('a', 'b').should.be.true();
  dict.has('a', 'b').should.be.false();
  dict.size.should.equal(0);
});

it('delete non existing', () => {
  const dict = new Dict();
  dict.delete('nope').should.be.false();
});

it('delete partial', () => {
  const dict = new Dict();
  dict.set('a', 'b', 'value');
  dict.has('a', 'b').should.be.true();
  dict.delete('a').should.be.false();
  dict.has('a', 'b').should.be.true();
  dict.size.should.equal(1);
});

it('clear', () => {
  const dict = new Dict([
    [['a', 'b', 'c'], '3'],
    [['a', 'a'], '1'],
    [['a', 'b'], '2'],
  ]);
  dict.size.should.equal(3);
  dict.clear();
  dict.size.should.equal(0);
  dict.has('a', 'b').should.be.false();
});

it('iterable', () => {
  const dict = new Dict();

  dict.keys().should.be.iterator().and.be.iterable();
  dict.values().should.be.iterator().and.be.iterable();
  dict.entries().should.be.iterator().and.be.iterator();
  dict.should.be.iterable();
});

it('iterable ordered', () => {
  const dict = new Dict();
  // insertion order
  dict.set('a', 'b', 'c', '3');
  dict.set('a', 'a', '1');
  dict.set('a', 'b', '2');

  const entries = [
    [['a', 'b', 'c'], '3'],
    [['a', 'a'], '1'],
    [['a', 'b'], '2'],
  ];

  [...dict.keys()].should.deepEqual([['a', 'b', 'c'], ['a', 'a'], ['a', 'b']]);
  [...dict.values()].should.deepEqual(['3', '1', '2']);
  [...dict.entries()].should.deepEqual(entries);
  [...dict].should.deepEqual(entries);
});

it('forEach', () => {
  const cb = sinon.spy();
  const dict = new Dict();
  dict.set('a', 'b', 'c', '3');
  dict.set('a', 'a', '1');

  dict.forEach.should.throw();
  dict.forEach(cb);

  cb.should.be.calledTwice().and.alwaysCalledOn(undefined);
  cb.getCall(0).should.be.calledWith('3', ['a', 'b', 'c'], dict);
  cb.getCall(1).should.be.calledWith('1', ['a', 'a'], dict);
});

it('forEach scoped', () => {
  const cb = sinon.spy();
  const scope = {};
  const dict = new Dict();
  dict.set('a', 'b', 'c', '3');
  dict.set('a', 'a', '1');

  dict.forEach(cb, scope);

  cb.should.be.calledTwice().and.alwaysCalledOn(scope);
  cb.getCall(0).should.be.calledWith('3', ['a', 'b', 'c'], dict);
  cb.getCall(1).should.be.calledWith('1', ['a', 'a'], dict);
});
