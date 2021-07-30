import { nelderMead } from 'fmin';

import lossFunction from '../../isostericHeat/loss/lossFunction';
import isotherm from '../../isotherm';
import initialGuess from '../../variousTools/initialGuess';

/**
 * Performs a simple direct fitting of the dataset using the BET model
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns parameters for fitted model
 */

export default function BETDirectFit(
  data: isotherm,
) {
  let initialValues = initialGuess([data], 'BET');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'BET'),
    initialValues,
  );

  return fittedParams2;
}
