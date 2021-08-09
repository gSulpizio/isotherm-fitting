import isotherm from '../isotherm';
import getFunction from '../variousTools/getFunction';

import simpleMSE from './simpleMSE';

/**
 * Computes the Bayesian information criterion: https://en.wikipedia.org/wiki/Bayesian_information_criterion
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @param {string} functionName: string containing the name of the model to be evaluated
 * @param {Array<number>} fittedParams: array of the parameters that were fitted
 * @returns {number} AIC
 */

export default function BIC(
  data: isotherm,
  MSE:number,
  fittedParams: number[],
) {
  return (
    2 * Math.log(MSE) +
    fittedParams.length * Math.log(data.x.length)
  );
}
