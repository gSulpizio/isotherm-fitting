import { nelderMead } from 'fmin';

import getFunction from '../isostericHeat/loss/getFunction';
import regressionScore from '../variousTools/regressionScore';

import getWeights from './getWeights';
import lossFunctionWeighted from './lossFunctionWeighted';

/**
 * returns fitted data points, linear regression params and regression score function
 * @param {dataXY} data
 * @returns {Array} [data, regression, score]:fitted data points, linear regression params and regression score function
 */
export function fitData(data: { x: number[]; y: number[] }): any[] {
  //if no weights have been declarded, make an array with ones:

  let newData = { x: [...data.x], y: [...data.y] };

  //ICI FAUT REMPLACER LM PEUT ETRE PAR UNE LOSS FUNCTION
  let parameters = [1, 0];
  let weights = new Array(data.x.length).fill(1);
  let regression = nelderMead(
    lossFunctionWeighted([data], 'linearFunction', weights),
    parameters,
  );
  const score = regressionScore(
    data,
    getFunction('linearFunction')(regression.x),
  );
  if (newData.x.length < 5 || score > 0.9999) {
    let finalParameters = {
      slope: regression.x[0],
      intercept: regression.x[1],
    };
    return [data, finalParameters, score]; 
  }

  //make new dataset without last point
  let newDataPop: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };

  newDataPop.x.pop();
  newDataPop.y.pop();
  //make new dataset without last point
  let newDataShift: { x: number[]; y: number[] } = {
    x: [...newData.x],
    y: [...newData.y],
  };
  newDataShift.x.shift();
  newDataShift.y.shift();

  //new regression with shortened data
  const regressionPop = nelderMead(
    lossFunctionWeighted(
      [newDataPop],
      'linearFunction',
      getWeights(newDataPop),
    ),
    parameters,
  );
  const regressionShift = nelderMead(
    lossFunctionWeighted(
      [newDataShift],
      'linearFunction',
      getWeights(newDataShift),
    ),
    parameters,
  );
  let popScore = regressionScore(
    newDataPop,
    getFunction('linearFunction')(regressionPop.x),
  );
  let shiftScore = regressionScore(
    newDataShift,
    getFunction('linearFunction')(regressionShift.x),
  );

  if (popScore > shiftScore) {
    return fitData(newDataPop);
  }

  return fitData(newDataShift);
}
export function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH =
    data.y[0] / data.x[0] / (saturationLoading - data.y[0]) ||
    data.y[1] / data.x[1] / (saturationLoading - data.y[1]);
  let N = 0.1;
  return [KH, saturationLoading, N];
}
