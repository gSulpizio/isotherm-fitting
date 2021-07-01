import { fitData } from '../fitData';

describe('test getParams', () => {
  it('test for simple linear function', () => {
    let x = [...Array(100).keys()];
    let y = x.map((x) => 15 * x + 7);
    let data = { x, y };
    let [fittedData, regression, score] = fitData(data);
    let ySimulated = x.map((x) => regression.slope * x + regression.intercept);
    expect(ySimulated).toStrictEqual(y);
  });
});
