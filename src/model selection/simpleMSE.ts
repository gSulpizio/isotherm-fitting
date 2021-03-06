/**
 * Compute the mean squared error between a model and a data set
 * @param {array<number>} y array of f(x) from data
 * @param {array<number>} yhat array of f(x) from model
 * @returns {number} the cumulated loss of the data
 */
export default function simpleMSE(y: number[], yhat: number[]) {
  let cumulatedLoss = 0;
  let dataLength=y.length
  for (let i = 0; i < dataLength; i++) {
    cumulatedLoss += (y[i] - yhat[i]) ** 2;
  }
  return cumulatedLoss/dataLength;
}
