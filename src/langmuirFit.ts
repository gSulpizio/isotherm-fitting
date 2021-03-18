import LM from 'ml-levenberg-marquardt';
import { writeFileSync } from 'fs';
import { join } from 'path';

export default function langmuirFit(data: { x: number[]; y: number[] }) {
  function baseFunction([KH, nMono]) {
    return (p) => (nMono * KH * p) / (1 + KH * p);
  }
  //initialValues = [1, 1];
  let fittedParams = LM(data, baseFunction);
  writeFileSync(
    join(__dirname, '../examples/data.json'),
    JSON.stringify(fittedParams),
  );
}
