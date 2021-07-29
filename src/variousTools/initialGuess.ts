import getN from './getN';
/**
 * returns initial guess array
 * @param {Array} data array of all the data set objects
 * @param {string} functionName string containing the name of the desired function
 */
export default function initialGuess(
  data: any[],
  functionName: string,
): number[] {
  let n = getN(functionName);
  let parameters: number[] = [];
  let saturationLoading = 0;
    let a;
    let b;
  for (let j = 0; j < n; j++) {
    for (let dataSet of data) {
      saturationLoading = 1.1 * Math.max(...dataSet.y);

      a = getFirstNonZero(dataSet.x);
      b = getFirstNonZero(dataSet.y);
      parameters.push(b / a / (saturationLoading - dataSet.y[0]));
    }
  }
  for (let j = 0; j < n; j++) {
    parameters.push(saturationLoading);
  }
  if (functionName === 'BET') {
    parameters.push(0.1); //we add N for BET
  }
  return parameters;
}

function getFirstNonZero(array: number[]) {
  for (let item of array) {
    // eslint-disable-next-line eqeqeq
    if (item != 0) {
      return item;
    }
  }
  return array[0];
}
