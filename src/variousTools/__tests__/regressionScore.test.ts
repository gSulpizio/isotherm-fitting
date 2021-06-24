import linearFunction from '../../modelFunctions/linearFunction';
import regressionScore from '../regressionScore';
describe('test regressionScore', () => {
  it('test for simple linear regression', () => {
    let data = {
      x: [83, 71, 64, 69, 69, 64, 68, 59, 81, 91, 57, 65, 58, 62],
      y: [183, 168, 171, 178, 176, 172, 165, 158, 183, 182, 163, 175, 164, 175],
    };
    expect(
      regressionScore(data, linearFunction([0.621446972303091, 129.572099885])),
    ).toBeCloseTo(0.621446972303091);
  });
  it('test for simple a more random array', () => {
    let x = [...Array(100).keys()];
    let y = x.map((x) => 15 * x + 7);
    y = y.map((item) => item * (1 - Math.random() * 10));
    let data = { x, y };

    console.log(regressionScore(data, linearFunction([15, 7])));
  });
});
