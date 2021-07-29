import getFunction from '../isostericHeat/loss/getFunction';
import isotherm from '../isotherm';

import MSE from './simpleMSE';

/**
 * Computes the Akaike information criterion: https://en.wikipedia.org/wiki/Akaike_information_criterion
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @param {string} functionName: string containing the name of the model to be evaluated
 * @param {Array<number>} fittedParams: array of the parameters that were fitted
 * @returns {number} AIC
 */

export default function AIC(
  data: isotherm,
  functionName: string,
  fittedParams: number[],
) {
  const fn = getFunction(functionName);
  let yHat = data.x.map((item: number) => fn(fittedParams)(item));
  return data.x.length * Math.log(MSE(data.y, yHat)) + 2 * fittedParams.length;
}
