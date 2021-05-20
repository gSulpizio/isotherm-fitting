import LM from 'ml-levenberg-marquardt';
import langmuirDoubleFunction from '../modelFunctions/langmuirDoubleFunction';

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

  let fittedParams = LM(data, langmuirDoubleFunction, options);

  return fittedParams;
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  let nm1 = 0.5 * saturationLoading;
  let nm2 = 0.5 * saturationLoading;
  let K1 = 0.6 * KH; //why 0.4 and 0.6?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let K2 = 0.4 * KH;
  return [K1, K2, nm1, nm2];
}
