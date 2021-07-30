import * as things from '../directFitting/models'
import isotherm from '../isotherm'

import AIC from './AIC'
import BIC from './BIC'

export default function modelRanking(data:isotherm){
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
interface looseObject {
    [key: string]: any
}
interface looseData extends Array<looseObject> {}


