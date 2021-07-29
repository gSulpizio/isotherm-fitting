//import logParameters from '../../../dev tools/logParameters';
import getParameters from '../../variousTools/getParameters';

import getFunction from './getFunction';
/**
 * Curried function that returns a cumulated loss function
 * @param {object} data  aggregated data object {{T, x, y}, {T, x, y}, {T, x, y}}
 * @returns {number} cumulated loss
 */

export default function lossFunction(data: any[], functionName: string) {
  let yHat, y;
  let usedFunction = getFunction(functionName);
  return function totalLoss(params: number[]) {
    let cumulatedLoss = 0;

    for (let i = 0; i < data.length; i++) {
      for (let p = 0; p < data[i].x.length; p++) {
        yHat = usedFunction(getParameters(functionName, i, params))(
          data[i].x[p],
        );
        y = data[i].y[p];
        cumulatedLoss += (yHat - y) ** 2;
      }
    }

    return cumulatedLoss;
  };
}
