import { nelderMead } from 'fmin';

import langmuirFunction from '../modelFunctions/langmuirSingleFunction';

import meanSquaredError from './meanSquaredError';
/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * @param {Array<Number>} p1 pressures of isotherm at T1, in kPa
 * @param {Array<Number>} p2 pressures of isotherm at T2, in kPa
 * @param {Array<Number>} p3 pressures of isotherm at T3, in kPa
 * @param {Array<Number>} [T1,T2,T3] temperatures T1,T2,T3
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuirOnData(
  data1: { T: number; x: number[]; y: number[] },
  data2: { T: number; x: number[]; y: number[] },
  data3: { T: number; x: number[]; y: number[] },
) {
  let lnp1 = data1.x.map((p) => Math.log(p));
  let lnp2 = data2.x.map((p) => Math.log(p));
  let lnp3 = data3.x.map((p) => Math.log(p));
  let deltaH = [];
  let regression: any;
  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
  let solution;
  let aggregatedData: any[] = [
    { x: data1.x, y: data1.y, T: data1.T },
    { x: data2.x, y: data2.y, T: data2.T },
    { x: data3.x, y: data3.y, T: data3.T },
  ];
  let parameters = [
    initialGuess(data1),
    initialGuess(data2),
    initialGuess(data3),
    1.1 * Math.max(...data1.y, ...data2.y, ...data3.y),
  ]; //kh1, kh2, kh3,nm

  let fitted = nelderMead(loss({ data1, data2, data3 }), parameters);
}

function loss(data: any) {
  let yHat, y;

  return function totalLoss(params: number[]) {
    let cumulatedLoss = 0;
    for (let i = 0; i < data.length; i++) {
      for (let p = 0; p < data[i].x.length; p++) {
        yHat = langmuirFunction([params[i], params[params.length - 1]])(p);
        y = data[i].y[p];
        cumulatedLoss += (yHat - y) ** 2;
      }
    }
    return cumulatedLoss
  };
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return KH;
}
