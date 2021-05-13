import BETFitWeighted from '../BETFitWeighted';
import makeNoisyData from './makeNoisyData';

import { writeFileSync } from 'fs';
import { join } from 'path';

describe('test BET fit weighted', () => {
  it('simulated dataSet, test weighted fit and deduced BET area', () => {
    let data = makeNoisyData(100);
    const R = 8.31446261815324; //m^3⋅Pa⋅K^−1⋅mol^−1

    let [V, s] = [(R * 273.15) / 1, 0.162 * Math.pow(10, -18)]; //s:[m^2]
    //Here it's a weird error and i have to do this, how to efficiently counter that?
    let [weights, results] = BETFitWeighted(data);
    console.log(results);
    console.log(weights);

    //let simulated = data.x.map((item) => item * results.regression.slope + results.regression.intercept);
  });
});
