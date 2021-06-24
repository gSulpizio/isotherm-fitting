import LM from 'ml-levenberg-marquardt';
import getWeights from './getWeights';
import BETFunction from '../modelFunctions/BETFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function BETFitWeighted(data: { x: number[]; y: number[] }) {
  let weights = getWeights(data);
  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 100000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
    weights: weights,
  };

  let result = LM(data, BETFunction, options);

  return { weights: weights, result: result };
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH =
    data.y[0] / data.x[0] / (saturationLoading - data.y[0]) ||
    data.y[1] / data.x[1] / (saturationLoading - data.y[1]);
  return [KH, saturationLoading, 0.01];
}
