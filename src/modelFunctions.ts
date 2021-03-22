//langmuir function
/**
 *
 * @param {Array}  [KH, nm] : array with equilibrium constant and the saturation loading
 * @returns {function} loading as a function of pressure
 */
export function langmuirSingleFunction([KH, nm]: number[]) {
  return (p: number) => (nm * KH * p) / (1 + KH * p);
}

//langmuir double function
/**
 *
 * @param {Array}  [K1, K2, n1, n2] : array with equilibrium constants and the saturation loadings
 * @returns {function} loading as a function of pressure
 */
export function langmuirDoubleFunction([K1, K2, n1, n2]: number[]) {
  return (
    p: number, //if p is any, it throws an error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ) => (n1 * K1 * p) / (1 + K1 * p) + (n2 * K1 * p) / (1 + K2 * p);
}

//langmuir double function
/**
 *
 * @param {Array}  [C, nm, N] : array with equilibrium constant and the saturation loading
 * @returns {function} loading as a function of pressure
 */
export function BETFunction([C, nm, N]: number[]) {
  return (p: number) => (nm * C * p) / ((1 - N * p) * (1 - N * p + C * p));
}
