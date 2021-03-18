import LM from 'ml-levenberg-marquardt';
import { writeFileSync } from 'fs';
import { join } from 'path';

//inputOptions has to be fixed so that the input is either the input or a default value

export default function langmuirFit(
  data: { x: number[]; y: number[] },
  inputOptions: object,
) {
  let options = {
    minValues: Math.pow(10, -8),
    maxValues: Math.pow(10, 8),
    gradientDifference: 10e-2,
    maxIterations: 100,
    errorTolerance: 10e-3,
    initialValues: initialGuess(data),
  };

  let fittedParams = LM(data, baseFunction, options);

  console.log(fittedParams);
  writeFileSync(join(__dirname, '../examples/data.json'), JSON.stringify(0));
  return 0;
}

//MSE calculation
function MSE(
  x: number,
  data: { x: number[]; y: number[] },
  [a, b]: number[],
  f: any,
) {
  let cost = 0;

  let sum = 0;
  for (let i = 0; i < data.x.length; i++) {
    sum += Math.pow(f([a, b])(x) - data.y[i], 2);
  }
  return sum / data.x.length;
}

//langmuir function
function baseFunction([KH, nMono]: number[]) {
  return (p) => (nMono * KH * p) / (1 + KH * p);
}

//initial Guess
function initialGuess(data: { x: number[]; y: number[] }) {
  let saturationLoading = 1.1 * Math.max(...data.y);
  let KH = data.y[0] / data.x[0] / (saturationLoading - data.y[0]);
  return [KH, saturationLoading];
}
