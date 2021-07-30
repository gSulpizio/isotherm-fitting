import { nelderMead } from 'fmin';

import aggregatedData from '../aggregatedData';
import getConstants from '../variousTools/getConstants';
import initialGuess from '../variousTools/initialGuess';

import getSlopes from './getSlopes';
import getlnP from './getlnP';
import lossFunction from './loss/lossFunction';

/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * because p is relative, the sat pressure is needed for the heat calculations.
 * If p' is the relative pressure and p0 the saturation pressure, then:
 * p=p'*p0, so ln(p)=ln(p')+ln(p0)
 * @param {Array} data aggregated data object [{T, x, y,pSat}, {T, x, y,pSat}, {T, x, y,pSat}]. At the minimum, the temperature T, the pressure x, the loading y and the saturation pressure pSat are needed
 * @param {string} functionName string containing the name of the desired function
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatFromData(
  data: aggregatedData,
  functionName: string,
) {
  if (data.length < 2) {
    throw 'isostericHeat: there are not enough data sets to compute isosteric heat, at least 2 data sets needed';
  }

  let regression: any;

  let parameters = initialGuess(data, functionName);
  //params: [kh1, kh2, kh3,...,nm]
  let fittedParameters = nelderMead(
    lossFunction(data, functionName),
    parameters,
  );
  let loadings = getlnP(data, functionName, fittedParameters.x); //adds lnP to data, returns the loadings
  let inverseTemperatures = [];
  for (let dataSet of data) {
    inverseTemperatures.push(1 / dataSet.T);
  }

  let deltaH = [];

  for (let i = 0; i < data[0].lnP.length; i++) {
    regression = getSlopes(data, i);
    deltaH.push(regression.slope);
  }

  let R = getConstants('R');
  deltaH = deltaH.map((x) => x * R);

  return [loadings, deltaH];
}
