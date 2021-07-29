//langmuir double function
/**
 * Returns a function of the langmuir triple site model
 * @param {Array}  [K1, K2, n1, n2] : array with equilibrium constants and the saturation loadings
 * @returns {function} loading as a function of pressure
 */
export default function langmuirTripleFunction([
  K1,
  K2,
  K3,
  n1,
  n2,
  n3,
]: number[]) {
  return (p: number) =>
    (n1 * K1 * p) / (1 + K1 * p) +
    (n2 * K2 * p) / (1 + K2 * p) +
    (n3 * K3 * p) / (1 + K3 * p);
}
