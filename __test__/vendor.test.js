'use strict';

require('../moduler/vendor');
// console.log(vendor)

const spy = jest.spyOn(console, 'log');
// const console.log = jest.fn().mockImplementation();

describe('vendor test',()=>{
  it('vendor handler functions', ()=>{
    // console.log = jest.fn();
    expect(spy).toHaveBeenCalled();
  });
});