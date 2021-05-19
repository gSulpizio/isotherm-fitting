//langmuir double function
/**
 *
 * @param {Array}  [K1, K2, n1, n2] : array with equilibrium constants and the saturation loadings
 * @returns {function} loading as a function of pressure
 */
export default function langmuirDoubleFunction([K1, K2, n1, n2]: number[]) {
  return (p: number) =>
    (n1 * K1 * p) / (1 + K1 * p) + (n2 * K1 * p) / (1 + K2 * p);
}
