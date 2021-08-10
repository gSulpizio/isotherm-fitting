import isotherm from '../isotherm';

/**
 * Computes the Akaike information criterion: https://en.wikipedia.org/wiki/Akaike_information_criterion
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @param {number} MSE: Mean Squared Error between data and model
 * @param {Array<number>} fittedParams: array of the parameters that were fitted
 * @returns {number} AIC
 */

export default function AIC(
  data: isotherm,
  MSE: number,
  fittedParams: number[],
) {
  return data.x.length * Math.log(MSE) + 2 * fittedParams.length;
}
