import getFunction from '../isostericHeat/loss/getFunction';
import getParameters from '../variousTools/getParameters';
/**
 * Curried function that returns a cumulated loss function
 * @param {object} data  aggregated data object {{T, x, y}, {T, x, y}, {T, x, y}}
 * @returns {number} cumulated loss
 */

export default function lossFunctionWeighted(
  data: any[],
  functionName: string,
  weights: number[] = [],
) {
  if (weights.length===0) {
    for(let i of data[0].x){
    weights.push(1)
  }
  }
  let yHat, y;
  let selectedParameters
  let usedFunction = getFunction(functionName);
  return function totalLoss(params: number[]) {
    let cumulatedLoss = 0;
    for (let i = 0; i < data.length; i++) {
      for (let p = 0; p < data[i].x.length; p++) {
          selectedParameters=getParameters(functionName, i, params)
        yHat = usedFunction(selectedParameters)(
          data[i].x[p],
        );
        y = data[i].y[p];
        cumulatedLoss += weights[p] * (yHat - y) ** 2;
      }
    }
    return cumulatedLoss;
  };
}
