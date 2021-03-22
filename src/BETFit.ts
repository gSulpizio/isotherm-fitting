import LM from 'ml-levenberg-marquardt';
import { BETFunction } from './modelFunctions';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function BETFit(
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

  let fittedParams = LM(data, BETFunction, options);

  return fittedParams;
}

/**
 * initial Guess
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @returns {array} initial guess:[C, nm, N]
 */
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let C = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [C, saturationLoading, 0.01];
}
/**
 * function spplying consistency criteria
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {object} fittedParams - ouput of LM function
 */
function checkBETCriteria(
  fittedParams: {
    parameterValues: number[];
    parameterError: number;
    iterations: number;
  },
  data: { x: number[]; y: number[] },
) {
  let p0 = fittedParams.parameterValues[1];
  let N = fittedParams.parameterValues[2];
  let pOverp0 = (p: number) => N * p0 * (1 - p / p0);
}
