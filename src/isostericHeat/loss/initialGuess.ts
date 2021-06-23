import getN from './getN';
/**
 * returns initial guess array
 * @param {Array} data array of all the data set objects
 * @param {string} functionName string containing the name of the desired function
 */
export default function initialGuess(data: any[], functionName: string) {
  let n = getN(functionName);
  let parameters = [];
  let saturationLoading, a, b;
  for (let j = 0; j < n; j++) {
    for (let dataSet of data) {
      saturationLoading = 1.1 * Math.max(...dataSet.y);
      a = dataSet.x[0] == 0 ? dataSet.x[1] : dataSet.x[0];
      b = dataSet.y[0] == 0 ? dataSet.y[1] : dataSet.y[0];
      parameters.push(b / a / (saturationLoading - dataSet.y[0]));
    }
  }
  for (let j = 0; j < n; j++) {
    parameters.push(saturationLoading);
  }
  if (functionName == 'BET') {
    parameters.push(0.1); //we add N for BET
  }
  return parameters;
}
