import langmuirDoubleFunction from '../langmuirDoubleFunction';
describe('test langmuir double function output', () => {
  it('tests output of BET fuction', () => {
    let params = [5, 4, 2, 3];
    expect(langmuirDoubleFunction(params)(0)).toStrictEqual(0);
    expect(langmuirDoubleFunction(params)(0.01)).toBeCloseTo(0.2106);
    expect(langmuirDoubleFunction(params)(0.05)).toBeCloseTo(0.9);
    expect(langmuirDoubleFunction(params)(0.6)).toBeCloseTo(3.617);
    expect(langmuirDoubleFunction(params)(1)).toBeCloseTo(4.0666);
  });
});
