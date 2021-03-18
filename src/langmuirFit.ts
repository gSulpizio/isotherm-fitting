import LM from 'ml-levenberg-marquardt';
import { writeFileSync } from 'fs';
import { join } from 'path';

export default function langmuirFit(data: { x: number[]; y: number[] }) {
  //function with parameters to fit

  let initialValues = initialGuess;
  const options = {
    damping: 1.5,
    initialValues: initialValues,
    minValues: minValues,
    maxValues: maxValues,
    gradientDifference: 10e-2,
    maxIterations: 100,
    errorTolerance: 10e-3,
  };

  let fittedParams = LM(data, baseFunction, options);

  console.log(baseFunction([1, 1])(77));
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
  return saturationLoading, KH;
}
