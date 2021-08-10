import isotherm from '../isotherm';
import modelScoring from './modelScoring';
/**
 * Sorts the models from the lowest AIC score (position 0) to the highest AIC score.
 * Also computes the probability to fit the data in a better way of each model compared to the first (best) one following: https://en.wikipedia.org/wiki/Akaike_information_criterion#How_to_use_AIC_in_practice
 * This probability is defined by: p=exp[((AIC_{min} − AIC_{i})/2)]
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns
 */
export default function modelRankingAIC(data: isotherm) {
  let scoredModels = modelScoring(data);
  let group = 1;
  scoredModels.sort(function (a, b) {
    return a.AIC - b.AIC;
  });
  for (let i = 0; i < scoredModels.length; i++) {
    scoredModels[i].pAIC = Math.exp(
      (scoredModels[0].AIC - scoredModels[i].AIC) / 2,
    );

    //grouping within std
    scoredModels[i].groupAIC = group;
    if (i < scoredModels.length - 1) {
      if (
        Math.abs(scoredModels[i].AIC - scoredModels[i + 1].AIC) >
        scoredModels[0].standardDeviation
      ) {
        group++;
      }
    }
  }

  return scoredModels;
}
