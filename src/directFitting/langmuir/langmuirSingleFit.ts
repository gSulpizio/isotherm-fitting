import { nelderMead } from 'fmin';

import lossFunction from '../../isostericHeat/loss/lossFunction';
import isotherm from '../../isotherm';
import initialGuess from '../../variousTools/initialGuess';

/**
 * Performs a simple fitting of the dataset using the langmuir single site model
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns parameters for fitted model
 */

export default function langmuirSingleFit(
  data: isotherm,

) {
  let initialValues = initialGuess([data], 'langmuirSingle');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirSingle'),
    initialValues,
  );

  return fittedParams2;
}
