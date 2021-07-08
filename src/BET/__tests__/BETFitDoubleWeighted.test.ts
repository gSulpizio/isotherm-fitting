import { writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../../dev tools/makeNoisyData';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import BETFitLinearDoubleWeighted from '../BETFitLinearDoubleWeighted';

describe('test BET weights', () => {
  it('createdNoisyData test', () => {
    let parameters = [2, 5];
    let data = makeNoisyData(parameters, 150, 10);
    let result = BETFitLinearDoubleWeighted(data);

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * result.regression.slope + result.regression.intercept,
    );
    console.log(result.score);
    writeFileSync(
      join(__dirname, '../../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    result.sampledData.x = data.x;
    result.sampledData.y = data.x.map((item: number) =>
      langmuirSingleFunction(parameters)(item),
    );
    writeFileSync(
      join(__dirname, '../../../examples/BETFitSampled.json'),
      JSON.stringify({ x: result.sampledData.x, y: result.sampledData.y }),
    );
  });
});
