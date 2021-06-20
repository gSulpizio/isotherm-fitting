import getN from './getN';
/**
 * returns initial guess array
 * @param {Array} data array of all the data set objects
 * @param n initial guess, n is for how many parameters of the same type are needed for the function per data set:
 * -langmuir single site, n=1 since there are only one nm and one kh needed per data set
 * -langmuir double site, n=2 since there are two nm and two kh needed per data set
 * -...
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
