import BETFunction from '../modelFunctions/BETFunction';
import langmuirDoubleFunction from '../modelFunctions/langmuirDoubleFunction';
import langmuirSingleFunction from '../modelFunctions/langmuirSingleFunction';
import langmuirTripleFunction from '../modelFunctions/langmuirTripleFunction';
import linearFunction from '../modelFunctions/linearFunction';
/**
 * Returns the function indicated in the string and the initiation parameters
 * @param {string} functionName string containing the name of the function to be used
 */

export default function getFunction(functionName: string) {
  switch (functionName) {
    case'langmuirSingleFit':
    case 'langmuirSingle':
      return langmuirSingleFunction;
    case 'langmuirDoubleFit':
    case 'langmuirDouble':
      return langmuirDoubleFunction;
    case 'langmuirTripleFit':
    case 'langmuirTriple':
      return langmuirTripleFunction;
    case 'BETFitLinearDoubleWeighted':
    case 'BETFitLinearDouble':
    case 'BETFitLinearSingle':
    case 'BETDirectFit':
    case 'BET':
      return BETFunction;
    case 'linearFunction':
      return linearFunction;
    default:
      throw `getFunction - FUNCTION NAME NOT RECOGNIZED: ${functionName}`;
  }
}
