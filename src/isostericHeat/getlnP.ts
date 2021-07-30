import dichotomySearch from '../variousTools/dichotomySearch';
import getFunction from '../variousTools/getFunction';
import getParameters from '../variousTools/getParameters';



/**
 * gets the isostericHeat from a function that has already been fitted, adds it to the data object
 * @param {Array} data aggregated data object [{T, x, y,pSat}, {T, x, y,pSat}, {T, x, y,pSat}]
 * @param {string} functionName string containing the name of the desired function
 * @param {Array<number>} fittedParameters array of the fitted parameters for all the datasets, for example for a triple langmuir with two dataSets: [K1(T1),K2(T1),K3(T1),K1(T2),K2(T2),K3(T2),nm1,nm2,nm3]
 */
export default function getlnP(
  data: any[],
  functionName: string,
  fittedParameters: number[],
) {
  let Tinverted = [];

  let loadingList = [];
  let maxLoading = Math.max(...data[0].y);
  for (let dataSet of data) {
    if (maxLoading > Math.max(...dataSet.y)) {
      maxLoading = Math.max(...dataSet.y);
    }
  }
  let step = maxLoading / data[0].x.length;

  for (let dataSet of data) {
    Tinverted.push(1 / dataSet.T);
    dataSet.lnP = [];
  }

  for (let i = step; i < maxLoading + step; i += step) {
    loadingList.push(i);
  }
  let parameters: number[];
  let pressure: number;
  let fn = getFunction(functionName);
  for (let i = 0; i < data.length; i++) {
    for (let loading of loadingList) {
      parameters = getParameters(functionName, i, fittedParameters);
      pressure = dichotomySearch(fn(parameters), loading, 0, maxLoading);
      data[i].lnP.push(Math.log(pressure));
    }
  }
  return loadingList;
}
