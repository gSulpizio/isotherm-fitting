import SimpleLinearRegression from 'ml-regression-simple-linear';
/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the fitted data
 * @param {Number} n loading chosen to evaluate the isosteric heat
 * @param {Array<Number>} param1 parameters for first langmuir isotherm
 * @param {Array<Number>} param2 parameters for first langmuir isotherm
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuirOnFit(
  n: number,
  [KH1, nm1, T1]: number[],
  [KH2, nm2, T2]: number[],
  [KH3, nm3, T3]: number[],
) {
  let p1 = (n: number) => n / (KH1 * (nm1 - n));
  let p2 = (n: number) => n / (KH2 * (nm2 - n));
  let p3 = (n: number) => n / (KH3 * (nm3 - n));

  let regression = new SimpleLinearRegression(
    [1 / T1, 1 / T2, 1 / T3],
    [Math.log(p1(n)), Math.log(p2(n)), Math.log(p3(n))],
  );

  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
  return R * regression.slope;
}
