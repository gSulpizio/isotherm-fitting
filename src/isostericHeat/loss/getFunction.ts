import langmuirSingleFunction from '../../modelFunctions/langmuirSingleFunction';
import langmuirDoubleFunction from '../../modelFunctions/langmuirDoubleFunction';
import langmuirTripleFunction from '../../modelFunctions/langmuirTripleFunction';
import BETFunction from '../../modelFunctions/BETFunction';
import initialGuess from './initialGuess';
import linearFunction from '../../modelFunctions/linearFunction';
/**
 * Returns the function indicated in the string and the initiation parameters
 * @param {string} functionName string containing the name of the function to be used
 */

export default function getFunction(functionName: string) {
  switch (functionName) {
    case 'langmuirSingle':
      return langmuirSingleFunction;
    case 'langmuirDouble':
      return langmuirDoubleFunction;
    case 'langmuirTriple':
      return langmuirTripleFunction;
    case 'BET':
      return BETFunction;
    case 'linearFunction':
      return linearFunction;
    default:
      throw 'getFunction: FUNCTION NAME NOT RECOGNIZED';
  }
}
