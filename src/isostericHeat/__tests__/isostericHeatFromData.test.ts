import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import makeNoisyData from '../../variousTools/__tests__/generateData/makeNoisyData';
import langmuirFunction from '../../modelFunctions/langmuirSingleFunction';
import isostericHeatFromData from '../isostericHeatFromData';

describe('test isosteric heat calculations', () => {
  it('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let data = JSON.parse(rawData.toString());

    let [T1, T2, T3] = [273, 283, 293];
    data.p1 = data.p1.map((p: number) => p / Math.max(...data.p1));
    data.p2 = data.p2.map((p: number) => p / Math.max(...data.p2));
    data.p3 = data.p3.map((p: number) => p / Math.max(...data.p3));

    let [loadings, deltaH] = isostericHeatFromData(
      [
        { T: T1, x: data.p1, y: data.n },
        { T: T2, x: data.p2, y: data.n },
        { T: T3, x: data.p3, y: data.n },
      ],
      'langmuirSingle',
    );

    writeFileSync(
      join(__dirname, '../../../examples/data1.json'),
      JSON.stringify({ x: data.p1, y: data.n }),
    );

    writeFileSync(
      join(__dirname, '../../../examples/data2.json'),
      JSON.stringify({ x: data.p2, y: data.n }),
    );

    //for (let i = 0; i < p1.length; i++) {expect(deltaH[i]).toBeCloseTo(data.Hads[i]);}
  });

  it('simulated dataset: Taking just one dataSet', () => {
    //clear logging file, only use if you're logging each iteration
    writeFileSync(
      join(__dirname, '../../../examples/logParams.json'),
      JSON.stringify({ nm: [], KH: [], loss: [] }),
    );
    //end of file clearing
    interface LooseObject {
      [key: string]: any;
    } //this allows to add properties to objects later on
    let data1: LooseObject = makeNoisyData([2, 5], 250, 10000000);
    let data2: LooseObject = makeNoisyData([1, 7], 250, 10000000);
    data1.T = 273;
    data2.T = 293;
    let deltaH = isostericHeatFromData([data1, data2], 'langmuirSingle');
    console.log(deltaH);
    /** 
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
    );*/
  });
});
