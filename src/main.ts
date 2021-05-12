import BETFitLinear from './BETFitLinear';
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

  switch (algorithm) {
    case 'linearBET':
      let [sampledData, regression, score] = BETFitLinear(data);
      let vm = 1 / (regression.slope + regression.intercept);
      let Stotal = (vm * N * s) / V;
      let SBET = Stotal / alpha;
      return { SBET, sampledData, regression, score };
    case 'weightedBET':
      return BETFitWeighted(data, V, s);
    default:
      throw 'unknown algorithm';
  }
}
