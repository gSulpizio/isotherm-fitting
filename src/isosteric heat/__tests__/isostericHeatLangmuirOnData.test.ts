import { readFileSync } from 'fs';
import { join } from 'path';

import isostericHeatLangmuirOnData from '../isostericHeatLangmuirOnData';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let data = JSON.parse(rawData.toString());

    let [T1, T2, T3] = [273, 283, 293];
    let p1 = data.p1.map((p: number) => p * 1000);
    let p2 = data.p2.map((p: number) => p * 1000);
    let p3 = data.p3.map((p: number) => p * 1000);

    let deltaH = isostericHeatLangmuirOnData(p1, p2, p3, [T1, T2, T3]);
    for (let i = 0; i < p1.length; i++) {
      expect(deltaH[i]).toBeCloseTo(data.Hads[i]);
    }
  });
});
