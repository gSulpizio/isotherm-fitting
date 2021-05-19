import langmuirSingleFit from '../langmuirSingleFit';
import langmuirSingleFunction from '../modelFunctions/langmuirSingleFunction';

import { writeFileSync } from 'fs';
import { join } from 'path';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
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
    let results = langmuirSingleFit(data);
    let yFit = data.x.map((item) =>
      langmuirSingleFunction(results.parameterValues)(item),
    );
    for (let i = 0; i < yFit.length; i++) {
      expect(Math.abs(yFit[i] - data.y[i])).toBeLessThan(0.9 * data.y[i]);
    }

    //writing results to plot
    writeFileSync(
      join(__dirname, '../../examples/data.json'),
      JSON.stringify(data),
    );

    writeFileSync(
      join(__dirname, '../../examples/singleFit.json'),
      JSON.stringify({ x: data.x, y: yFit }),
    );
  });
  it('second dataSet, with 0 as first point', () => {
    let data = {
      x: [
        0.0,
        0.5,
        1.0,
        1.5,
        2.0,
        2.5,
        3.0,
        3.5,
        4.0,
        4.5,
        5.0,
        5.5,
        6.0,
        6.5,
        7.0,
        7.5,
        8.0,
        8.5,
        9.0,
        9.5,
        10.0,
        10.5,
        11.0,
        11.5,
        12.0,
      ],
      y: [
        0.0,
        2.5,
        3.333,
        3.75,
        4.0,
        4.167,
        4.286,
        4.375,
        4.444,
        4.5,
        4.545,
        4.583,
        4.615,
        4.643,
        4.667,
        4.688,
        4.706,
        4.722,
        4.737,
        4.75,
        4.762,
        4.773,
        4.783,
        4.792,
        4.8,
      ],
    };
    let results = langmuirSingleFit(data);
    let yFit = data.x.map((item) =>
      langmuirSingleFunction(results.parameterValues)(item),
    );
    for (let i = 0; i < yFit.length; i++) {
      expect(Math.abs(yFit[i] - data.y[i])).toBeLessThan(0.9 * data.y[i]);
    }
  });
});
