import dichotomySearch from '../dichotomySearch';
import linearFunction from '../../modelFunctions/linearFunction';

describe('test dichotomySearch', () => {
  it('test for simple linear function', () => {
    let result = dichotomySearch(linearFunction([2, 3]), 0, -50, +50);
    expect(result).toBeCloseTo(-3 / 2);
  });
});
