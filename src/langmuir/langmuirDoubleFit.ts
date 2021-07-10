import LM from 'ml-levenberg-marquardt';
import initialGuess from '../variousTools/initialGuess';
import langmuirDoubleFunction from '../modelFunctions/langmuirDoubleFunction';
import { nelderMead } from 'fmin';
import lossFunction from '../isostericHeat/loss/lossFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function langmuirDoubleFit(
  data: { x: number[]; y: number[] },
  inputOptions: object = {},
) {
  let initialValues = initialGuess([data], 'langmuirDouble');

  let fittedParams2 = nelderMead(
    lossFunction([data], 'langmuirDouble'),
    initialValues,
  );

  return fittedParams2;
}
