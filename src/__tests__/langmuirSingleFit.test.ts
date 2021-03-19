import langmuirSingleFit from '../langmuirSingleFit';
import { langmuirSingleFunction } from '../modelFunctions';

import { writeFileSync } from 'fs';
import { join } from 'path';

test('test Langmuir fit', () => {
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
