import SimpleLinearRegression from 'ml-regression-simple-linear';
import dichotomySearch from '../variousTools/dichotomySearch';
import getFunction from './loss/getFunction';
import getN from './loss/getN';
import getParameters from '../variousTools/getParameters';
/**
 * gets the isostericHeat from a function that has already been fitted, adds it to the data object
 * @param {Array} data aggregated data object {{T, x, y}, {T, x, y}, {T, x, y}}
 * @param {string} functionName string containing the name of the desired function
 * @param {Array<number>} fittedParameters array of the fitted parameters for all the datasets, for example for a triple langmuir with two dataSets: [K1(T1),K2(T1),K3(T1),K1(T2),K2(T2),K3(T2),nm1,nm2,nm3]
 */
export default function getnlnP(
  data: any,
  functionName: string,
  fittedParameters: { x: number[] },
) {
  let Tinverted = [];
  let lnP = [];
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
    lnP.push();
  }
  let deltaH = [];
  for (let i = 0; i < maxLoading; i += step) {
    loadingList.push(i);
  }
  let spacing = getN(functionName);
  for (let i = 0; i < data.length; i++) {
    data[i].lnP = loadingList.map((n) =>
      Math.log(
        dichotomySearch(
          getFunction(functionName)(
            getParameters(functionName, i, fittedParameters.x),
          ),
          n,
          0,
          maxLoading,
        ),
      ),
    );
  }
  return loadingList;
}
