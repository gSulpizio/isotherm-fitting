import { nelderMead } from 'fmin';
import LM from 'ml-levenberg-marquardt';

import isotherm from '../isotherm';
import BETFunction from '../modelFunctions/BETFunction';
import initialGuess from '../variousTools/initialGuess';


import { fitDataWeighted } from './fitDataWeighted';
import lossFunctionWeighted from './lossFunctionWeighted';

/**
 * weighted: the linear fitting is performed using weights from https://doi.org/10.1016/j.micromeso.2011.05.022
 *
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
export default function BETFitLinearDoubleWeighted(data: isotherm) {

  let fittedParams = nelderMead(
    lossFunctionWeighted([data], 'BET'),
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
  let [sampledData, regression, score] = fitDataWeighted({
    x: newData.x.slice(begin, cutoff),
    y: newData.y.slice(begin, cutoff),
  });
  let vm = 1 / (regression.slope + regression.intercept);

  return { sampledData, regression, score, vm };
}
