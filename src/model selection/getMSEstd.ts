import looseData from './looseData';

/**
 * Gets the standard deviation of all the Mean Squared Errors for error bars / tolerance
 * @param {Array} scoredModels : array of objects containing at least the Mean Squared error of each model
 * @returns {number} Standard deviation of the mean squared errors
 */
export default function getMSEstd(scoredModels: looseData) {
  let meanMSE = 0;
  for (let i = 0; i < scoredModels.length; i++) {
    meanMSE += scoredModels[i].MSE;
  }
  meanMSE = meanMSE / scoredModels.length;
  let squaredSum = 0;
  for (let i = 0; i < scoredModels.length; i++) {
    squaredSum += (scoredModels[i].MSE - meanMSE) ** 2;
  }
  return Math.sqrt(squaredSum / scoredModels.length);
}
