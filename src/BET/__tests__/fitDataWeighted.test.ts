import { fitDataWeighted } from '../fitDataWeighted';

describe('test fitDataWeighted', () => {
  it('test for simple linear function', () => {
    let x = [...Array(100).keys()];
    let y = x.map((x) => 15 * x + 7);
    y = y.map((item) => item * (1 - Math.random() / 3));
    let data = { x, y };

    let [fittedData, regression, score] = fitDataWeighted(data);
    let toprint = '';
    for (let i = 0; i < y.length; i++) {
      toprint += x[i] + ',' + y[i] + '\n';
    }
    console.log(toprint);

    console.log(score);
    let ySimulated = x.map((x) => regression.slope * x + regression.intercept);
    for (let i = 0; i < x.length; i++) {
      expect(ySimulated[i]).toBeCloseTo(y[i]);
    }
  });
});
