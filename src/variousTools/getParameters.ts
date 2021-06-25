import getN from '../isostericHeat/loss/getN';

/**
 * gives parameters array for a specific data set from an array containing all the parameters for all the data sets
 * @param {string} functionName name of the function that will be used
 * @param {number} i indice of the dataset in a data array
 * @param {Array} parameterList array containing list of parameters
 * @returns {Array} array of the parameters to use in a function,
 */
export default function getParameters(
  functionName: string,
  i: number,
  parameterList: number[],
) {
  let n = getN(functionName);
  let parameters = [];
  for (let j = i * n; j < (i + 1) * n; j++) {
    parameters.push(parameterList[j]);
  }
  for (let k = parameterList.length - n; k < parameterList.length; k++) {
    parameters.push(parameterList[k]);
  }
  return parameters;
}
