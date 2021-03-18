import LM from 'ml-levenberg-marquardt';
import { writeFileSync } from 'fs';
import { join } from 'path';

export default function langmuirFit(data: { x: number[]; y: number[] }) {
  //function with parameters to fit

  console.log(baseFunction([1, 1])(77));
  writeFileSync(join(__dirname, '../examples/data.json'), JSON.stringify(0));
  return 0;
  a = MSE(data, [1, 2], baseFunction);
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
