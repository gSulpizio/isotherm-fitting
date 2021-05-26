import { readFileSync } from 'fs';
import { join } from 'path';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import LM from 'ml-levenberg-marquardt';

import isostericHeatLangmuirOnFit from '../isostericHeatLangmuirOnFit';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let data = JSON.parse(rawData.toString());
    let result = LM({ x: data.p1, y: data.n }, langmuirSingleFunction);
    console.log(result);
    let [T1, T2, T3] = [273, 283, 293];

    let heat1 = isostericHeatLangmuirOnFit(1.5, [2, 5, 293], [3, 6, 273]);
    let heat2 = isostericHeatLangmuirOnFit(3.5, [2, 5, 293], [3, 6, 273]);
    console.log(heat1, heat2);
    //expect(heat1).toBeCloseTo(heat2);
  });
});
