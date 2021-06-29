import makeNoisyData from '../../variousTools/makeNoisyData';
import BETFitLinearDoubleWeighted from '../BETFitLinearDoubleWeighted';
import { writeFileSync } from 'fs';
import { join } from 'path';

describe('test BET weights', () => {
  it('createdNoisyData test', () => {
    let data = makeNoisyData([2, 5], 1000, 50);
    let [sampledData, regression, score] = BETFitLinearDoubleWeighted(data);

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
