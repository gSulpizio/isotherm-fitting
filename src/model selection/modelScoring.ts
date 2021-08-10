import * as things from '../directFitting/models';
import isotherm from '../isotherm';

import AIC from './AIC';
import BIC from './BIC';
import simpleMSE from './simpleMSE';
import getFunction from '../variousTools/getFunction';

import looseData from './looseData';

/**
 * Compute AIC and BIC scores
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns {Array} array containing objects: {modelName, AIC, BIC}
 */

export default function modelScoring(data: isotherm) {
  let functionNames: string[] = Object.keys(things);
  let fittingFunctions = Object.values(things);
  let BICScores = [];
  let AICScores = [];
  let fittedParameters: number[] = [];
  let finalResult: looseData = [];

  for (let i = 0; i < functionNames.length; i++) {
    fittedParameters = fittingFunctions[i](data).x;
    let fn = getFunction(functionNames[i]);
    let yHat = data.x.map((item: number) => fn(fittedParameters)(item));
    let MSE = simpleMSE(data.y, yHat);
    let std = Math.sqrt(MSE);
    try {
      AICScores[i] = AIC(data, MSE, fittedParameters);
    } catch {
      AICScores[i] = '???';
    }
    try {
      BICScores[i] = BIC(data, MSE, fittedParameters);
    } catch {
      BICScores[i] = '???';
    }
    finalResult.push({
      modelName: functionNames[i],
      AIC: AICScores[i],
      BIC: BICScores[i],
      standardDeviation: std,
    });
  }
  return finalResult;
}
