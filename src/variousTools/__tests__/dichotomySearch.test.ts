import dichotomySearch from '../dichotomySearch';
import linearFunction from '../../modelFunctions/linearFunction';
import makeNoisyData from '../makeNoisyData';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';

describe('test dichotomySearch', () => {
  it('test for simple linear function', () => {
    let result = dichotomySearch(linearFunction([2, 3]), 0, -50, 50);
    expect(result).toBeCloseTo(-3 / 2);
  });
  it('test for some other function', () => {
    const fx = (x: number) => 5 / x + 1;
    let result = dichotomySearch(fx, 0, -500000000000, -1);
    expect(result).toBeCloseTo(-5);
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

    expect(result).toBeCloseTo(data.x[173]);
  });
});
