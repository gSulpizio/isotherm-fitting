import { nelderMead } from 'fmin';

import langmuirSingleLoss from './loss/langmuirSingleLoss';
/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * @param {Array<Number>} p1 pressures of isotherm at T1, in kPa
 * @param {Array<Number>} p2 pressures of isotherm at T2, in kPa
 * @param {Array<Number>} p3 pressures of isotherm at T3, in kPa
 * @param {Array<Number>} [T1,T2,T3] temperatures T1,T2,T3
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuirOnData(data: any[]) {
  let deltaH = [];
  let regression: any;
  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
  let solution;

  let parameters = [];
  for (const dataSet of data) {
    parameters.push(initialGuess(dataSet));
  }
  parameters.push(1.1 * Math.max(...data[0].y));

  //params: [kh1, kh2, kh3,...,nm]
  let fitted = nelderMead(langmuirSingleLoss(data), parameters);

  return fitted;
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[]; T: number }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let a = data.x[0] == 0 ? data.x[1] : data.x[0];
  let b = data.y[0] == 0 ? data.y[1] : data.y[0];
  let KH = b / a / (saturationLoading - data.y[0]);
  return KH;
}
