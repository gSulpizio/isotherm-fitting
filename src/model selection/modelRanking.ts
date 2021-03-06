import isotherm from '../isotherm';
import getMSEstd from './getMSEstd';
import groupAndSort from './groupAndSort';
import looseData from './looseData';
import modelScoring from './modelScoring';
/**
 * Sorts the models from the lowest BIC score (position 0) to the highest BIC score.
 * Also computes the probability to fit the data in a better way of each model compared to the first (best) one following: https://en.wikipedia.org/wiki/Akaike_information_criterion#How_to_use_BIC_in_practice
 * This probability is defined by: p=exp[((BIC_{min} − BIC_{i})/2)]
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @param {string} method: selected method, can be 'AIC' or BIC
 * @returns
 */
export default function modelRanking(data: isotherm, method: string) {
  let scoredModels = modelScoring(data);
  scoredModels.sort(function (a, b) {
    return a[method] - b[method];
  });
  for (let i = 0; i < scoredModels.length; i++) {
    scoredModels[i]['p' + method] = Math.exp(
      (scoredModels[0][method] - scoredModels[i][method]) / 2,
    );
  }
  groupAndSort(scoredModels, method);
  return scoredModels;
}
