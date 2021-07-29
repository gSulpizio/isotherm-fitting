import { nelderMead } from 'fmin';

import lossFunction from '../isostericHeat/loss/lossFunction';
import isotherm from '../isotherm';
import initialGuess from '../variousTools/initialGuess';

/**
 * Performs a simple fitting of the dataset using the langmuir double site model
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns parameters for fitted model
 */

export default function langmuirDoubleFit(
  data: isotherm,
) {
  let initialValues = initialGuess([data], 'langmuirDouble');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirDouble'),
    initialValues,
  );

  return fittedParams2;
}
