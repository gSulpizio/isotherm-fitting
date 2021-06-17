import langmuirFunction from '../../modelFunctions/langmuirSingleFunction';

/**
 * Curried function that returns a cumulated loss function
 * @param data {object} aggregated data object {{T, x, y}, {T, x, y}, {T, x, y}}
 * @returns {number} cumulated loss
 */

export default function langmuirSingleLoss(data: any[]) {
  let yHat, y;
  return function totalLoss(params: number[]) {
    let cumulatedLoss = 0;
    for (let i = 0; i < data.length; i++) {
      for (let p = 0; p < data[i].x.length; p++) {
        yHat = langmuirFunction([params[i], params[params.length - 1]])(p);
        y = data[i].y[p];
        cumulatedLoss += (yHat - y) ** 2;
      }
    }
    return cumulatedLoss;
  };
}
