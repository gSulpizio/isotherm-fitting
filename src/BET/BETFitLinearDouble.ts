import { nelderMead } from 'fmin';

import lossFunction from '../isostericHeat/loss/lossFunction';
import isotherm from '../isotherm';
import BETFunction from '../modelFunctions/BETFunction';
import { fitData } from '../variousTools/fitData';
import initialGuess from '../variousTools/initialGuess';


/**
 * Double fit: once the function is fitted with a chosen model, the model is fitted with a linear function
 * 
 *  the monolayer adsorbed gas quantity:
 *
 * v_m=1/(Slope+intercept)
 *
 * BET constant c=1+slope/intercept
 *
 * Total surface area: S_total=v_m*N*s/V where N is the avogadro number,
 * s is the adsorption cross section of the adsorbate,
 * V the molar volume of the adsorbate gas (STP)
 *
 * Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
 *
 * specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent
 *
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns {object} { sampledData, regression, score, vm }
 */

export default function BETFitLinearDouble(data: isotherm) {
  //let fluidProperties = getProperties(gasName, temperature);

  //let fittedParams2 = LM(data, BETFunction, options);
  let fittedParams = nelderMead(
    lossFunction([data], 'BET'),
    initialGuess([data], 'BET'),
  );

  let newData = {
    x: data.x,
    y: data.x.map((x) => BETFunction(fittedParams.x)(x)),
  };
  let cutoff = 0;
  let begin = 0;
  //find where 1/3 of the range is:
  while (cutoff < data.x.length) {
    if (data.x[begin] < 0.1) {
      begin++;
    }
    if (data.x[cutoff] > 1 / 3) {
      break;
    }
    cutoff++;
  }
  let [sampledData, regression, score] = fitData({
    x: newData.x.slice(begin, cutoff),
    y: newData.y.slice(begin, cutoff),
  });
  let vm = 1 / (regression.slope + regression.intercept);

  return { sampledData, regression, score, vm };
}
