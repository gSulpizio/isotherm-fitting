import { writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../../dev tools/makeNoisyData';
import BETFitLinearSingle from '../BETFitLinearSingle';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';

describe('test BET fit', () => {
  it('simulated dataSet, test linear Single fit and deduced BET area', () => {
    let data = makeNoisyData([2, 5], 150, 10);

    let results = BETFitLinearSingle(data);

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item: number) =>
        item * results.regression.slope + results.regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFitSampled.json'),
      JSON.stringify({ x: results.sampledData.x, y: results.sampledData.y }),
    );
  });
});
