import getFunction from '../isostericHeat/loss/getFunction';
import isotherm from '../isotherm';
import MSE from './simpleMSE';
export default function AIC(
  data: isotherm,
  functionName: string,
  fittedParams: number[],
) {
  const fn = getFunction(functionName);
  let yHat = data.x.map((item: number) => fn(fittedParams)(item));
  return data.x.length * Math.log(MSE(data.y, yHat)) + 2 * fittedParams.length;
}
