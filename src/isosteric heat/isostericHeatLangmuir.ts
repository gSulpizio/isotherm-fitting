/**
 * evaluates the isosteric heat of adsorption using the langmuir equation
 * @param {Number} n loading chosen to evaluate the isosteric heat
 * @param {Array<Number>} param1 parameters for first langmuir isotherm
 * @param {Array<Number>} param2 parameters for first langmuir isotherm
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuir(
  n: number,
  [KH1, nm1, T1]: number[],
  [KH2, nm2, T2]: number[],
) {
  let p1 = (n: number) => n / (KH1 * (nm1 - n));
  let p2 = (n: number) => n / (KH2 * (nm2 - n));
  return (Math.log(p1(n)) - Math.log(p2(n))) / (T1 - T2);
}
