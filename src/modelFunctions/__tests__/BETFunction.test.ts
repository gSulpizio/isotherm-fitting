import BETFunction from '../BETFunction';

describe('test BET function', () => {
  it('tests output of BET fuction', () => {
    let params = [2, 5];

    expect(BETFunction(params)(0)).toStrictEqual(0);
    expect(BETFunction(params)(0.3)).toBeCloseTo(3.2967032967032974);
    expect(BETFunction(params)(0.4)).toBeCloseTo(4.761904761904762);
    expect(BETFunction(params)(0.5)).toBeCloseTo(6.666666666666667);
  });
});
