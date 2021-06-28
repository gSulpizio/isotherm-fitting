//BET function
/**
 *
 * @param {Array}  [C, nm, N] : array with equilibrium constant and the saturation loading
 * @returns {function} loading as a function of pressure
 */
export default function BETFunction([KH, nm]: number[]) {
  return (p: number) => (nm * KH * p) / ((1 - p) * (1 - p + KH * p));
}
