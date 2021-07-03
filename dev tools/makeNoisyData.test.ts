import makeNoisyData from './makeNoisyData';

describe('makeNoisyData', () => {
  it('standard', () => {
    let data = makeNoisyData([1,2], 150, 10000);
    console.log(data)
  });
});
