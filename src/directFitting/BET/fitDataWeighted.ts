import { nelderMead } from 'fmin';

import getFunction from '../../variousTools/getFunction';
import regressionScore from '../../variousTools/regressionScore';

import getWeights from './getWeights';
import lossFunctionWeighted from './lossFunctionWeighted';

/**
 * returns fitted data points, linear regression params and regression score function
 * @param {dataXY} data
 * @returns {Array} [data, regression, score]:fitted data points, linear regression params and regression score function
 */
export function fitDataWeighted(
  data: { x: number[]; y: number[] },
  weights: number[] = [],
): any[] {
  //if no weights have been declarded, make an array with ones:

  let newData = { x: [...data.x], y: [...data.y] };

  let parameters = [1, 0];
  if (weights === []) {
    weights = getWeights(newData);
  }
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
    return [data, finalParameters, score]; //    TODO: interpolation should be implemented here
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
    return fitDataWeighted(newDataPop);
  }

  return fitDataWeighted(newDataShift);
}
