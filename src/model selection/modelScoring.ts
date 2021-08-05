import * as things from '../directFitting/models'
import isotherm from '../isotherm'

import AIC from './AIC'
import BIC from './BIC'

import looseData from './looseData'

/**
 * Compute AIC and BIC scores
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns {Array} array containing objects: {modelName, AIC, BIC}
 */

export default function modelScoring(data:isotherm){
    let functionNames:string[]=Object.keys(things)
    let fittingFunctions=Object.values(things)
    let BICScores=[]
    let AICScores=[]
    let fittedParameters=[]
    let finalResult:looseData=[]
    for(let i =0;i< functionNames.length;i++){
        fittedParameters=fittingFunctions[i](data).x
        try{
        AICScores[i]=AIC(data, functionNames[i],fittedParameters)
    }
        catch{
            AICScores[i]='???'
        }
        try{
            BICScores[i]=BIC(data, functionNames[i],fittedParameters)
        }
            catch{
                BICScores[i]='???'
            }
        finalResult.push({modelName:functionNames[i],AIC:AICScores[i], BIC:BICScores[i]})
    }
    return finalResult
}



