import { writeFileSync } from 'fs';
import { join } from 'path';
export default function (params: number[], loss: number) {
  const fileName = join(__dirname, '../examples/logParams.json');
  const file = require(fileName);
  file.KH.push(params[0]);
  file.nm.push(params[1]);
  file.loss.push(loss);
  writeFileSync(fileName, JSON.stringify(file));
  return;
}
