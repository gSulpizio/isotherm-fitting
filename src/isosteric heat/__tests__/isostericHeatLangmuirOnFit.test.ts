import { readFileSync } from 'fs';
import { join } from 'path';
import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import LM from 'ml-levenberg-marquardt';

import isostericHeatLangmuirOnFit from '../isostericHeatLangmuirOnFit';

describe('test Langmuir fit', () => {
  it.only('first dataSet', () => {
    let rawData = readFileSync(join(__dirname, './data/data.json'));
    let wholeData = JSON.parse(rawData.toString());

    let regression1 = data1(wholeData);

    let regression2 = data2(wholeData);

    let regression3 = data3(wholeData);

    let [T1, T2, T3] = [273, 283, 293];

    let heat = isostericHeatLangmuirOnFit(
      5.7,
      [...regression1.parameterValues, T1],
      [...regression2.parameterValues, T2],
      [...regression3.parameterValues, T3],
    );
    console.log(heat);
    //expect(heat1).toBeCloseTo(heat2);
  });
});
//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [KH, saturationLoading];
}

function data1(wholeData: any) {
  let data1 = { x: wholeData.p1, y: wholeData.n };
  let options1 = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data1),
  };
  return LM(data1, langmuirSingleFunction, options1);
}

function data2(wholeData: any) {
  let data2 = { x: wholeData.p2, y: wholeData.n };
  let options2 = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data2),
  };
  return LM(data2, langmuirSingleFunction, options2);
}
function data3(wholeData: any) {
  let data3 = { x: wholeData.p3, y: wholeData.n };
  let options3 = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data3),
  };
  return LM(data3, langmuirSingleFunction, options3);
}
