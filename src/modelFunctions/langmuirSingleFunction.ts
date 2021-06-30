/**
 * langmuir function
 * @param {Array}  [KH, nm] : array with equilibrium constant and the saturation loading
 * @returns {function} loading as a function of pressure
 */
export default function langmuirSingleFunction([KH, nm]: number[]) {
  return (p: number) => (nm * KH * p) / (1 + KH * p);
}
