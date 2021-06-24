import makeNoisyData from '../../variousTools/__tests__/generateData/makeNoisyData';
import BETFitLinearDoubleWeighted from '../BETFitLinearDoubleWeighted';

describe('test BET weights', () => {
  it('createdNoisyData test', () => {
    let data = makeNoisyData([2, 5], 100);
    let output = BETFitLinearDoubleWeighted(data);
    console.log(output);
  });
});
