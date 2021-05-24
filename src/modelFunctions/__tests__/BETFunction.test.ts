import BETFunction from '../BETFunction';

describe('test BET function', () => {
  it('tests output of BET fuction', () => {
    let params = [2, 5, 0.1];
    expect(BETFunction(params)(0)).toStrictEqual(0);
    expect(BETFunction(params)(0.3)).toBeCloseTo(1.9699);
    expect(BETFunction(params)(0.4)).toBeCloseTo(2.367);
    expect(BETFunction(params)(0.5)).toBeCloseTo(2.699);
  });
});
