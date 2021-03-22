import LM from 'ml-levenberg-marquardt';
import { langmuirDoubleFunction } from './modelFunctions';

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
/**
 *
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @returns {array} initial guess:[C, nm, N]
 */
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let C = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [C, saturationLoading, 0.01];
}
