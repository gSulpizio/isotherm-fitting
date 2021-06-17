import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../__tests__/generateData/makeNoisyData';
import langmuirFunction from '../../modelFunctions/langmuirSingleFunction';
import isostericHeatLangmuirOnData from '../isostericHeatLangmuirOnData';

describe('test Langmuir fit', () => {
  it('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let data = JSON.parse(rawData.toString());

    let [T1, T2, T3] = [273, 283, 293];
    data.p1 = data.p1.map((p: number) => p * 1000);
    data.p2 = data.p2.map((p: number) => p * 1000);
    data.p3 = data.p3.map((p: number) => p * 1000);

    let deltaH = isostericHeatLangmuirOnData([
      { T: T1, x: data.p1, y: data.n },
      { T: T2, x: data.p2, y: data.n },
      { T: T3, x: data.p3, y: data.n },
    ]);
    console.log(deltaH);
    writeFileSync(
      join(__dirname, '../../../examples/data1.json'),
      JSON.stringify({ x: data.p1, y: data.n }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/data1SIM.json'),
      JSON.stringify({
        x: data.p1,
        y: data.p1.map((x: number) =>
          langmuirFunction([deltaH.x[0], deltaH.x[3]])(x),
        ),
      }),
    );

    writeFileSync(
      join(__dirname, '../../../examples/data2.json'),
      JSON.stringify({ x: data.p2, y: data.n }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/data2SIM.json'),
      JSON.stringify({
        x: data.p2,
        y: data.p2.map((x: number) =>
          langmuirFunction([deltaH.x[1], deltaH.x[3]])(x),
        ),
      }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/data3.json'),
      JSON.stringify({ x: data.p3, y: data.n }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/data3SIM.json'),
      JSON.stringify({
        x: data.p3,
        y: data.p3.map((x: number) =>
          langmuirFunction([deltaH.x[2], deltaH.x[3]])(x),
        ),
      }),
    );
    //for (let i = 0; i < p1.length; i++) {expect(deltaH[i]).toBeCloseTo(data.Hads[i]);}
  });

  it.only('simulated dataset: Taking just one dataSet', () => {
    interface LooseObject {
      [key: string]: any;
    } //this allows to add properties to objects later on
    let data: LooseObject = makeNoisyData([2, 5], 250);
    data.T = 293;
    let deltaH = isostericHeatLangmuirOnData([data]);
    writeFileSync(
      join(__dirname, '../../../examples/data1.json'),
      JSON.stringify({ x: data.x, y: data.y }),
    );
    writeFileSync(
      join(__dirname, '../../../examples/data1SIM.json'),
      JSON.stringify({
        x: data.x,
        y: data.x.map((x: number) =>
          langmuirFunction([deltaH.x[0], deltaH.x[1]])(x),
        ),
      }),
    );
  });
});
