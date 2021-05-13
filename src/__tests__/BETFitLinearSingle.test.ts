import BETFitLinearSingle from '../BETFitLinearSingle';
import { langmuirSingleFunction } from '../modelFunctions';
import makeNoisyData from './makeNoisyData';

import { writeFileSync } from 'fs';
import { join } from 'path';
import BETFitLinear from '../BETFitLinearSingle';

describe('test BET fit', () => {
  it('simulated dataSet, test linear Single fit and deduced BET area', () => {
    let data = makeNoisyData(100);
    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let results = BETFitLinearSingle(data);

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify(dataSet));

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );

    let simulated = data.x.map(
      (item) => item * results.regression.slope + results.regression.intercept,
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: simulated }),
    );
    writeFileSync(
      join(__dirname, '../../examples/BETFitSampled.json'),
      JSON.stringify({ x: results.sampledData.x, y: results.sampledData.y }),
    );
  });
});
/**
 * Generates a random number following a normal distribution
 * @returns {number}  random number
 */
function randomGaussian() {
  return (
    Math.sqrt(-2 * Math.log(Math.random())) *
    Math.cos(2 * Math.PI * Math.random())
  );
}
