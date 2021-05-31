import BETFitLinearDouble from './BET/BETFitLinearDouble';
import BETFitLinearSingle from './BET/BETFitLinearSingle';
import BETFitWeighted from './BET/BETFitWeighted';
import langmuirDoubleFit from './langmuir/langmuirDoubleFit';
import langmuirSingleFit from './langmuir/langmuirSingleFit';
import langmuirTripleFit from './langmuir/langmuirTripleFit';

export default function main(
  data: { x: number[]; y: number[] },
  V: number,
  s: number,
  algorithm = 'linearBET',
  alpha = 1,
  inputOptions = {},
) {
  const N = 6.022 * 10 ** 23;
  let sampledData, regression, score, Stotal: number, SBET: number;
  let parameters;
  switch (algorithm) {
    case 'linearBET':
      [sampledData, regression, score] = BETFitLinearSingle(data);
      [Stotal, SBET] = getSurfaces(
        regression.slope,
        regression.intercept,
        N,
        V,
        s,
        alpha,
      );
      return { SBET, sampledData, regression, score };
    case 'linearDoubleBET':
      [sampledData, regression, score] = BETFitLinearDouble(data);
      [Stotal, SBET] = getSurfaces(
        regression.slope,
        regression.intercept,
        N,
        V,
        s,
        alpha,
      );
      return { SBET, sampledData, regression, score };
    case 'weightedBET':
      return BETFitWeighted(data);
    case 'langmuirSingle':
      parameters=langmuirSingleFit(data, inputOptions);
      return parameters;
    case 'langmuirDouble':
      parameters=langmuirDoubleFit(data, inputOptions);
      return parameters;
    case 'langmuirTriple':
      parameters=langmuirTripleFit(data, inputOptions);
      return parameters;
    default:
      throw 'unknown algorithm';
  }
}
function getSurfaces(
  slope: number,
  intercept: number,
  N: number,
  V: number,
  s: number,
  alpha: number,
) {
  let vm = 1 / (slope + intercept);
  let Stotal = (vm * N * s) / V;
  let SBET = Stotal / alpha;
  return [Stotal, SBET];
}
