import LM from 'ml-levenberg-marquardt';

import langmuirSingleFunction from '../modelFunctions/langmuirSingleFunction';
import initialGuess from '../variousTools/initialGuess';
import { nelderMead } from 'fmin';
import lossFunction from '../isostericHeat/loss/lossFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function langmuirSingleFit(
  data: { x: number[]; y: number[] },
  inputOptions: object = {},
) {
  let initialValues = initialGuess([data], 'langmuirSingle');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirSingle'),
    initialValues,
  );

  return fittedParams2;
}
