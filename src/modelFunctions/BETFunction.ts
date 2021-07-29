//BET function
/**
 * Returns a function of the BET model
 * @param {Array}  [KH, nm, N] : array with equilibrium constant and the saturation loading, as well as the N parameter
 * @returns {function} loading as a function of pressure
 */
export default function BETFunction([KH, nm, N]: number[]) {
  return (p: number) => (nm * KH * p) / ((1 - N * p) * (1 - N * p + KH * p));
}
