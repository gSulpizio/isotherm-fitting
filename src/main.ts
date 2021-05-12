import BETFitLinear from './BETFitLinear';
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
  let sampledData, regression, score, vm, Stotal, SBET;
  switch (algorithm) {
    case 'linearBET':
      [sampledData, regression, score] = BETFitLinear(data);
      vm = 1 / (regression.slope + regression.intercept);
      Stotal = (vm * N * s) / V;
      SBET = Stotal / alpha;
      return { SBET, sampledData, regression, score };
    case 'linearDoubleBET':
      [sampledData, regression, score] = BETFitLinearDouble(data);
      vm = 1 / (regression.slope + regression.intercept);
      Stotal = (vm * N * s) / V;
      SBET = Stotal / alpha;
      return { SBET, sampledData, regression, score };
    case 'weightedBET':
      return BETFitWeighted(data, V, s);
    default:
      throw 'unknown algorithm';
  }
}
