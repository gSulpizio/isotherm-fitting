import langmuirTripleFunction from '../langmuirTripleFunction';

describe('test langmuir Triple function output', () => {
  it('tests output of BET fuction', () => {
    let params = [5, 4, 8, 2, 3, 1];
    expect(langmuirTripleFunction(params)(0)).toStrictEqual(0);
    expect(langmuirTripleFunction(params)(0.3)).toBeCloseTo(3.542245989);
    expect(langmuirTripleFunction(params)(1.1)).toBeCloseTo(5.03471132);
    expect(langmuirTripleFunction(params)(2)).toBeCloseTo(5.426024955);
    expect(langmuirTripleFunction(params)(4.1)).toBeCloseTo(5.704977152);
  });
});
