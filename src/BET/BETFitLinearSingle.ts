import { fitData } from '../variousTools/fitData';
/**
 * the linear function is fitted directly on the data
 *
 * the monolayer adsorbed gas quantity:
 *
 * v_m=1/(Slope+intercept)
 *
 * BET constant c=1+slope/intercept
 *
 * Total surface area: S_total=v_m*N*s/V where N is the avogadro number,
 * s is the adsorption cross section of the adsorbate,
 * V the molar volume of the adsorbate gas (STP)
 *
 * Ideal gas: molar volume of the adsorbate gas=V/n=R*T/p
 *
 * specific surface area: S_BET=S_total/alpha where alpha is the mass of the solid sample or adsorbent
 *
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns {object} { sampledData, regression, score, vm }
 */
export default function BETFitLinearSingle(data: { x: number[]; y: number[] }) {
  //let fluidProperties = getProperties(gasName, temperature);

  //let newData=BETCriteria(data, SATURATIONPRESSURE)

  let cutoff = 0;
  let begin = 0;
  while (cutoff < data.x.length) {
    if (data.x[begin] < 0.1) {
      begin++;
    }
    if (data.x[cutoff] > 1 / 3) {
      break;
    }
    cutoff++;
  }
  let [sampledData, regression, score] = fitData({
    x: data.x.slice(begin, cutoff),
    y: data.y.slice(begin, cutoff),
  });
  let vm = 1 / (regression.slope + regression.intercept);

  return { sampledData, regression, score, vm };
}
