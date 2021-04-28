import BETFitLinear from './BETFitLinear';
import BETFitWeighted from './BETFitWeighted';

export default function BETFit(
  data: { x: number[]; y: number[] },
  V: number,
  s: number,
  algorithm = 'linear',
  alpha = 1,
  inputOptions = {},
) {
  switch (algorithm) {
    case 'linear':
      return BETFitLinear(data, V, s);
    case 'weighted':
      return BETFitWeighted(data, V, s);
    default:
      throw 'unknown algorithm';
  }
}
