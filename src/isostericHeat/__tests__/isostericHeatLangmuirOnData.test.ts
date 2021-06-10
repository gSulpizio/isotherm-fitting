import { readFileSync } from 'fs';
import { join } from 'path';

import isostericHeatLangmuirOnData from '../isostericHeatLangmuirOnData';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let data = JSON.parse(rawData.toString());

    let [T1, T2, T3] = [273, 283, 293];
    data.p1 = data.p1.map((p: number) => p * 1000);
    data.p2 = data.p2.map((p: number) => p * 1000);
    data.p3 = data.p3.map((p: number) => p * 1000);

    let deltaH = isostericHeatLangmuirOnData(
      { T: T1, x: data.p1, y: data.n },
      { T: T2, x: data.p2, y: data.n },
      { T: T3, x: data.p3, y: data.n },
    );
    //for (let i = 0; i < p1.length; i++) {expect(deltaH[i]).toBeCloseTo(data.Hads[i]);}
  });
});
