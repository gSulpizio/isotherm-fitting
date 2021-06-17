import { writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../__tests__/generateData/makeNoisyData';
import BETFitLinearSingle from '../BETFitLinearSingle';

describe('test BET fit', () => {
  it('simulated dataSet, test linear Single fit and deduced BET area', () => {
    let data = makeNoisyData([2, 5], 100);

    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let [sampledData, regression, score] = BETFitLinearSingle(data);
    console.log(regression);
    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * regression.slope + regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFitSampled.json'),
      JSON.stringify({ x: sampledData.x, y: sampledData.y }),
    );
  });
});
