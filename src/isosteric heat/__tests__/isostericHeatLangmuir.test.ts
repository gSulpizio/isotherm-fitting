import { writeFileSync } from 'fs';
import { join } from 'path';

import isostericHeatLangmuir from '../isostericHeatLangmuir';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
    let heat1 = isostericHeatLangmuir(1.5, [2, 5, 293], [3, 6, 273]);
    let heat2 = isostericHeatLangmuir(3.5, [2, 5, 293], [3, 6, 273]);
    console.log(heat1, heat2);
    expect(heat1).toBeCloseTo(heat2);
  });
});