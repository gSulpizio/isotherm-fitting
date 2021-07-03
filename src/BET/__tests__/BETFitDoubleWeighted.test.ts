import { writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../../dev tools/makeNoisyData';
import BETFitLinearDoubleWeighted from '../BETFitLinearDoubleWeighted';

describe('test BET weights', () => {
  it('createdNoisyData test', () => {
    let data = makeNoisyData([2, 5], 1000, 50);
    let result = BETFitLinearDoubleWeighted(data);

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * result.regression.slope + result.regression.intercept,
    );
    console.log(result.score)
    writeFileSync(
      join(__dirname, '../../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFitSampled.json'),
      JSON.stringify({ x: result.sampledData.x, y: result.sampledData.y }),
    );
  });
});
