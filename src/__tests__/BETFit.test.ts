import BETFit from '../BETFit';
import { BETFunction } from '../modelFunctions';

import { writeFileSync } from 'fs';
import { join } from 'path';

describe('test BET fit', () => {
  it('first dataSet', () => {
    let data = {
      x: [
        0.0171192,
        0.0586318,
        0.102329,
        0.211573,
        0.303338,
        0.412581,
        0.499976,
        0.60485,
        0.705355,
        0.801489,
        0.901993,
        0.998128,
      ],
      y: [
        20.6782,
        69.2916,
        102.611,
        143.577,
        168.157,
        188.367,
        199.838,
        212.947,
        223.325,
        230.972,
        237.527,
        242.443,
      ],
    };

    let [dataSet, results, score] = BETFit(data);

    console.log(score(dataSet.x, dataSet.y));
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: results }),
    );
    //console.log(results);

    //debugging:
    //plotting p vs
    //let p0 = Math.max(...data.x);
    //let firstCriteria = (p: number, N: number) => N * p0 * (1 - p / p0); //p=data.x, N=data.y
    //let yFit = [];
    //for (let i = 0; i < data.x.length; i++) {
    //  yFit.push(firstCriteria(data.x[i], data.y[i]));
    //}
    //end of debugging

    //let yFit = data.x.map((item) => BETFunction(results.parameterValues)(item));
    //for (let i = 0; i < yFit.length; i++) {expect(Math.abs(yFit[i] - data.y[i])).toBeLessThan(0.9 * data.y[i]);}

    //writing results to plot
    //writeFileSync(join(__dirname, '../../examples/data.json'),JSON.stringify(data));

    //writeFileSync(join(__dirname, '../../examples/BETFit.json'),JSON.stringify({ x: data.x, y: yFit }));
  });
  it.only('simulated dataSet, test linear fit and deduced BET area', () => {
    let data = {
      x: [
        0.0171192,
        0.0586318,
        0.102329,
        0.211573,
        0.303338,
        0.412581,
        0.499976,
        0.60485,
        0.705355,
        0.801489,
        0.901993,
        0.998128,
      ],
      y: [
        20.6782,
        69.2916,
        102.611,
        143.577,
        168.157,
        188.367,
        199.838,
        212.947,
        223.325,
        230.972,
        237.527,
        242.443,
      ],
    };

    let [dataSet, results, score] = BETFit(data);
    console.log(results);
    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: results }),
    );
    //console.log(results);

    //debugging:
    //plotting p vs
    //let p0 = Math.max(...data.x);
    //let firstCriteria = (p: number, N: number) => N * p0 * (1 - p / p0); //p=data.x, N=data.y
    //let yFit = [];
    //for (let i = 0; i < data.x.length; i++) {
    //  yFit.push(firstCriteria(data.x[i], data.y[i]));
    //}
    //end of debugging

    let yFit = data.x.map((item) => results.slope * item + results.intercept);
    //for (let i = 0; i < yFit.length; i++) {expect(Math.abs(yFit[i] - data.y[i])).toBeLessThan(0.9 * data.y[i]);}

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );

    writeFileSync(
      join(__dirname, '../../examples/BETFit.json'),
      JSON.stringify({ x: data.x, y: yFit }),
    );
  });
});
