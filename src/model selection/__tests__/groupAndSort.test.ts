import getMSEstd from '../getMSEstd';
import groupAndSort from '../groupAndSort';
import looseData from '../looseData';

describe('test groupAndSort', () => {
  let data: looseData = [
    {
      name: '2nd best BIC, worst AIC',
      BIC: 1,
      AIC: 55,
      MSE: 0,
      fittedParameters: [2, 5, 8],
    },
    {
      name: 'best BIC, best AIC',
      BIC: 3,
      AIC: -10,
      MSE: 10,
      fittedParameters: [2, 5],
    },
    {
      name: 'Worst BIC, 2nd best AIC',
      BIC: 150,
      AIC: -11,
      MSE: 35,
      fittedParameters: [2, 5, 13],
    },
  ];
  it('for BIC', () => {
    let result = groupAndSort(data, 'BIC');
    console.log('FOR BIC:', result);
  });
  it('for AIC', () => {
    let result = groupAndSort(data, 'AIC');
    console.log('FOR AIC:', result);
  });
});
