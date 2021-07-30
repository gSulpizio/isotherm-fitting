import { nelderMead } from 'fmin';

import lossFunction from '../../isostericHeat/loss/lossFunction';
import isotherm from '../../isotherm';
import initialGuess from '../../variousTools/initialGuess';

/**
 * Performs a simple fitting of the dataset using the langmuir triple site model
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns parameters for fitted model
 */

export default function langmuirTripleFit(
  data: isotherm,

) {
  let initialValues = initialGuess([data], 'langmuirTriple');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirTriple'),
    initialValues,
  );

  return fittedParams2;
}
