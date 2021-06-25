import makeNoisyData from '../../../variousTools/__tests__/generateData/makeNoisyData';
import getnlnP from '../../getlnP';

describe('test getlnP', () => {
  it('on simulated data', () => {
    interface looseObject {
      [label: string]: any;
    }
    let data: looseObject = makeNoisyData([3, 5], 150);
    data.T = 187;

    let loadings = getnlnP([data], 'langmuirSingle', [3, 5]);
    expect(data.lnP[32]).toBeCloseTo(Math.log(data.x[10]), 1);
  });
});
