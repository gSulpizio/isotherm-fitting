import makeNoisyData from '../../../variousTools/makeNoisyData';
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
  it('On multiple dataSets', () => {
    interface looseObject {
      [label: string]: any;
    }
    let data1: looseObject = makeNoisyData([3, 5], 150);
    data1.T = 187;
    let data2: looseObject = makeNoisyData([2, 5], 150);
    data2.T = 197;
    let loadings = getnlnP([data1, data2], 'langmuirSingle', [3, 2, 5]);

    expect(data1.lnP[133]).toBeCloseTo(Math.log(data1.x[75]), 1);
    expect(data1.lnP[149]).toBeCloseTo(Math.log(data1.x[140]), 1);
    expect(data2.lnP[118]).toBeCloseTo(Math.log(data2.x[75]), 1);
  });
});
