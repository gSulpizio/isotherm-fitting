import langmuirSingleFunction from '../langmuirSingleFunction';

describe('test BET function', () => {
  it('tests output of BET fuction', () => {
    let params = [5, 2];
    expect(langmuirSingleFunction(params)(0)).toStrictEqual(0);
    expect(langmuirSingleFunction(params)(0.05)).toBeCloseTo(0.4);
    expect(langmuirSingleFunction(params)(0.3)).toBeCloseTo(1.2);
    expect(langmuirSingleFunction(params)(0.8)).toBeCloseTo(1.6);
  });
});
