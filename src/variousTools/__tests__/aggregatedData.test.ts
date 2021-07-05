import aggregatedData from '../../aggregatedData';
import makeNoisyDataLoose from '../../../dev tools/makeNoisyDataLoose';

describe('test getParams', () => {
  it('test for simple linear function', () => {
    let data1 = makeNoisyDataLoose([5, 2], 100);
    let data: aggregatedData = [];
    data.push(data1);
    console.log(data[0]);
  });
});
