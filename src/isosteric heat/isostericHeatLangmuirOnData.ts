import SimpleLinearRegression from 'ml-regression-simple-linear';
/**
 * evaluates the isosteric heat of adsorption using the langmuir equation on the isotherm's real data. Takes pressures from 3 isotherms as an input
 * @param {Array<Number>} p1 pressures of isotherm at T1, in kPa
 * @param {Array<Number>} p2 pressures of isotherm at T2, in kPa
 * @param {Array<Number>} p3 pressures of isotherm at T3, in kPa
 * @param {Array<Number>} [T1,T2,T3] temperatures T1,T2,T3
 * @returns {Number} isosteric heat of adsorption
 */
export default function isostericHeatLangmuirOnFit(
  p1: number[],
  p2: number[],
  p3: number[],
  [T1, T2, T3]: number[],
) {
  let lnp1 = p1.map((p) => Math.log(p));
  let lnp2 = p2.map((p) => Math.log(p));
  let lnp3 = p3.map((p) => Math.log(p));
  let deltaH = [];
  let regression: any;
  let R = 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
  for (let i = 0; i < p1.length; i++) {
    regression = new SimpleLinearRegression(
      [1 / T1, 1 / T2, 1 / T3],
      [lnp1[i], lnp2[i], lnp3[i]],
    );
    deltaH.push(regression.slope * R);
  }
  return deltaH;
}
