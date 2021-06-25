import SimpleLinearRegression from 'ml-regression-simple-linear';
import linearFunction from '../../modelFunctions/linearFunction';
import regressionScore from '../regressionScore';
import makeNoisyData from './generateData/makeNoisyData';
describe('test regressionScore', () => {
  it('test for simple linear regression', () => {
    let data = {
      x: [83, 71, 64, 69, 69, 64, 68, 59, 81, 91, 57, 65, 58, 62],
      y: [183, 168, 171, 178, 176, 172, 165, 158, 183, 182, 163, 175, 164, 175],
    };
    const output = regressionScore(
      data,
      linearFunction([0.62329927326, 129.572099885]),
    );
    let output2 = new SimpleLinearRegression(data.x, data.y).score(
      data.x,
      data.y,
    );
    //console.log(output, output2);
    expect(output).toBeCloseTo(0.621446972303091);
  });
  it('test for simple a more random array', () => {
    let x = [...Array(100).keys()];
    let y = x.map((x) => 15 * x + 7);
    y = y.map((item) => item * (1 - Math.random() / 3));
    let data = { x, y };
    let output = regressionScore(data, linearFunction([15, 7]));

    expect(0.95 - output).toBeLessThan(0.1);
  });
});
