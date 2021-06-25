import dichotomySearch from '../dichotomySearch';
import linearFunction from '../../modelFunctions/linearFunction';
import makeNoisyData from './generateData/makeNoisyData';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';

describe('test dichotomySearch', () => {
  it('test for simple linear function', () => {
    let result = dichotomySearch(linearFunction([2, 3]), 0, -50, +50);
    expect(result).toBeCloseTo(-3 / 2);
  });

  it('langmuir single site', () => {
    let data = makeNoisyData([2, 5], 300, 1000);

    let result = dichotomySearch(
      langmuirSingleFunction([2, 5]),
      data.y[173],
      0,
      100,
      0.0001,
    );
    console.log(result);
    expect(result).toBeCloseTo(data.x[173]);
  });
});
