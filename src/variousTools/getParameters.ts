import getN from './getN';

/**
 * gives parameters array for a specific data set from an array containing all the parameters for all the data sets.
 * This is needed as there are not the same number of parameters to optimize for all the different functions:
 * Example: for langmuir single site, there are 2 parameters for each data set where as for triple site there are 6 parameters for each data set.
 *
 * This function gives therefore an array with the right parameters for each data set, as they are all in one big array for the optimization
 *
 * @param {string} functionName name of the function that will be used
 * @param {number} i indice of the dataset in a data array
 * @param {Array} parameterList array containing  all the parameters for the whole data
 * @returns {Array} array of the parameters to use in a function
 */
export default function getParameters(
  functionName: string,
  i: number,
  parameterList: number[],
) {
  let n = getN(functionName);
  let parameters = [];
  if(functionName==='BET'){
    parameters.push(parameterList[i]);
    parameters.push(parameterList[parameterList.length-2]);
    parameters.push(parameterList[parameterList.length-1]);
    return parameters;
  }
  for (let j = i * n; j < (i + 1) * n; j++) {
    parameters.push(parameterList[j]);
  }
  for (let k = parameterList.length - n; k < parameterList.length; k++) {
    parameters.push(parameterList[k]);
  }
  return parameters;
}
