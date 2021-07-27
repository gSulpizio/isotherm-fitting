import LM from 'ml-levenberg-marquardt';
import initialGuess from '../variousTools/initialGuess';
import langmuirDoubleFunction from '../modelFunctions/langmuirDoubleFunction';
import { nelderMead } from 'fmin';
import lossFunction from '../isostericHeat/loss/lossFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function langmuirTripleFit(
  data: { x: number[]; y: number[] },
  inputOptions: object = {},
) {
  let initialValues = initialGuess([data], 'langmuirTriple');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirTriple'),
    initialValues,
  );

  return fittedParams2;
}
