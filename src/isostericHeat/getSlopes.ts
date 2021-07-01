import SimpleLinearRegression from 'ml-regression-simple-linear';
/**
 * Script to get the slopes of lnP vs 1/T in an array for a specific loading at index i
 * @param {Array} data aggregated data object [{T, x, y,pSat}, {T, x, y,pSat}, {T, x, y,pSat}]
 * @param {number} i index of the pressures to take
 * @returns
 */
export default function getSlopes(data: any, i: number) {
  let inverseTemperatures = [];
  for (let dataSet of data) {
    inverseTemperatures.push(1 / dataSet.T);
  }

  let lnP: number[] = [];
  for (let j = 0; j < data.length; j++) {
    lnP.push(data[j].lnP[i] + Math.log(data[j].pSat));
  }
  let regression = new SimpleLinearRegression(inverseTemperatures, lnP);
  return regression;
}
