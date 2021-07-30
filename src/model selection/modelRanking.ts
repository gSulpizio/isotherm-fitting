import * as things from '../directFitting/models'
import isotherm from '../isotherm'

export default function modelRanking(data:isotherm){
    type thingsKey = keyof typeof status
    let functionNames:string[]=Object.keys(things)
    let models=Object.values(things)
    let BICScores=[]
    let AICScores=[]
    let fittedParameters=[]
    //for(let i =0;i< functionNames.length;i++){fittedParameters[i]=things}
    console.log(typeof functionNames)
}
interface LooseObject {
    [key: string]: any
}