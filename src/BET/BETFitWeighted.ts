import LM from 'ml-levenberg-marquardt';

import BETFunction from '../modelFunctions/BETFunction';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function BETFitWeighted(data: { x: number[]; y: number[] }) {
  let weights = [0];
  for (let i = 1; i < data.x.length - 1; i++) {
    weights.push(
      Math.sqrt(
        (data.x[i] - data.x[i - 1]) ** 2 + (data.y[i] - data.y[i - 1]) ** 2,
      ) /
        2 +
        Math.sqrt(
          (data.x[i] - data.x[i + 1]) ** 2 + (data.y[i] - data.y[i + 1]) ** 2,
        ) /
          2,
    );
  }
  weights.push(0);
  let options = {
    damping: 10e-2,
    gradientDifference: 10e-2,
    maxIterations: 100000,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
    weights: weights,
  };

  let result = LM(data, BETFunction, options);

  return [weights, result];
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH =
    data.y[0] / data.x[0] / (saturationLoading - data.y[0]) ||
    data.y[1] / data.x[1] / (saturationLoading - data.y[1]);
  return [KH, saturationLoading, 0.01];
}
