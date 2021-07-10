import getFunction from '../isostericHeat/loss/getFunction';
import isotherm from '../isotherm';
import MSE from './simpleMSE';
export default function BIC(
  data: isotherm,
  functionName: string,
  fittedParams: number[],
) {
  const fn = getFunction(functionName);
  let yHat = data.x.map((item: number) => fn(fittedParams)(item));
  return (
    2 * Math.log(MSE(data.y, yHat)) +
    fittedParams.length * Math.log(data.x.length)
  );
}
