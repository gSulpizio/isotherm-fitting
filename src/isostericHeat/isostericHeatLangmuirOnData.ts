import { nelderMead } from 'fmin';
import initialGuess from './loss/initialGuess';
import lossFunction from './loss/lossFunction';
/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * @param {Array<Number>} p1 pressures of isotherm at T1, in kPa
 * @param {Array<Number>} p2 pressures of isotherm at T2, in kPa
 * @param {Array<Number>} p3 pressures of isotherm at T3, in kPa
 * @param {Array<Number>} [T1,T2,T3] temperatures T1,T2,T3
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuirOnData(
  data: any[],
  functionName: string,
) {
  let deltaH = [];
  let regression: any;
  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
  let solution;
  let parameters = initialGuess(data, functionName);
  //params: [kh1, kh2, kh3,...,nm]
  let fitted = nelderMead(lossFunction(data, functionName), parameters);

  return fitted;
}
