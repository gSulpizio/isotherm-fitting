import BETFitLinear from './BETFitLinearSingle';
import BETFitLinearDouble from './BETFitLinearDouble';
import BETFitWeighted from './BETFitWeighted';

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
  switch (algorithm) {
    case 'linearBET':
      [sampledData, regression, score] = BETFitLinear(data);
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
