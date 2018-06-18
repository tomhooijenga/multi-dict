const should = require('should');
const sinon = require('sinon');
require('should-sinon');

const Dict = require('../dist').default;

it('constructor requires new', () => {
    (() => {
        Dict();
    }).should.throw();
});

it('construct args', () => {
    (new Dict()).size.should.equal(0);
    (new Dict(null)).size.should.equal(0);
    (new Dict(undefined)).size.should.equal(0);
});

it('constructor iterable', () => {
    sinon.spy(Dict.prototype, 'set');

    const entries = [
        ['key1', 'key2', 'value1'],
        ['key3', 'key4', 'value2']
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