import { nelderMead } from 'fmin';
import initialGuess from './loss/initialGuess';
import lossFunction from './loss/lossFunction';
import getnlnP from './getlnP';
import SimpleLinearRegression from 'ml-regression-simple-linear';

/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * @param {Array<Number>} p1 pressures of isotherm at T1, in kPa
 * @param {Array<Number>} p2 pressures of isotherm at T2, in kPa
 * @param {Array<Number>} p3 pressures of isotherm at T3, in kPa
 * @param {Array<Number>} [T1,T2,T3] temperatures T1,T2,T3
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatFromData(
  data: any[],
  functionName: string,
) {
  if (data.length < 2) {
    throw 'isostericHeat: there are not enough data sets to compute isosteric heat, at least 2 data sets needed';
  }

  let regression: any;
  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]

  let parameters = initialGuess(data, functionName);
  //params: [kh1, kh2, kh3,...,nm]
  let fittedParameters = nelderMead(
    lossFunction(data, functionName),
    parameters,
  );

  let loadings = getnlnP(data, functionName, fittedParameters);
  let inverseTemperatures = [];
  for (let dataSet of data) {
    inverseTemperatures.push(1 / dataSet.T);
  }
  let lnP: number[] = [];
  let deltaH = [];
  for (let i = 0; i < data[0].lnP.length; i++) {
    lnP = [];
    for (let dataSet of data) {
      lnP.push(dataSet.lnP[i]);
    }
    regression = new SimpleLinearRegression(inverseTemperatures, lnP);
    lnP = [];
    deltaH.push(regression.slope);
    console.log(lnP, regression.slope);
  }
  //console.log(loadings, data[0].lnP);
  deltaH = deltaH.map((x) => x * R);
  return [loadings, deltaH];
}
