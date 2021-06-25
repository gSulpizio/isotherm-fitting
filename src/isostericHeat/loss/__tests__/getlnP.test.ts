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
    //console.log('original ln p from data:',data.y.map((x: number) => Math.log(x)),);
    //console.log('returned:', data.lnP);
    //console.log(data.x[130], loadings[130]);
  });
});
