import makeNoisyData from '../../variousTools/__tests__/generateData/makeNoisyData';
import getWeights from '../getWeights';

describe('test BET weights', () => {
  it('simple four point dataset', () => {
    let data = { x: [0, 1, 2, 3], y: [0, 1, 2, 3] };

    let output = getWeights(data);

    expect(output).toStrictEqual([0, Math.sqrt(2), Math.sqrt(2), 0]);
  });
});
