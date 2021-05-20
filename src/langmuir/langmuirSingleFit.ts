import LM from 'ml-levenberg-marquardt';
import langmuirSingleFunction from '../modelFunctions/langmuirSingleFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function langmuirSingleFit(
  data: { x: number[]; y: number[] },
  inputOptions: object = {},
) {
  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 10000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
  };

  let fittedParams = LM(data, langmuirSingleFunction, options);

  return fittedParams;
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [KH, saturationLoading];
}
