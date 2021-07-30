import makeNoisyData from '../../../dev tools/makeNoisyData'
import modelRanking from "../modelRanking"

describe('testing mondelRanking, please work',()=>{
    it('langmuirSingle',()=>{
    let fnName='langmuirSingle'
    let data = makeNoisyData([2, 7], 10, 1000000, fnName);
    let ranking=modelRanking(data)
    expect(ranking[0].AIC).toBeLessThan(ranking[1].AIC)
    expect(ranking[0].AIC).toBeLessThan(ranking[2].AIC)
    expect(ranking[0].AIC).toBeLessThan(ranking[3].AIC)
    expect(ranking[0].BIC).toBeLessThan(ranking[0].BIC)
    expect(ranking[0].BIC).toBeLessThan(ranking[2].BIC)
    expect(ranking[0].BIC).toBeLessThan(ranking[3].BIC)
})
it('langmuirDouble',()=>{
    let fnName='langmuirDouble'
    let data = makeNoisyData([1,3,2,0.1], 20, 1000000, fnName);
    let ranking=modelRanking(data)
    console.log(ranking)
    expect(ranking[1].AIC).toBeLessThan(ranking[0].AIC)
    expect(ranking[1].AIC).toBeLessThan(ranking[2].AIC)
    expect(ranking[1].AIC).toBeLessThan(ranking[3].AIC)
    expect(ranking[1].BIC).toBeLessThan(ranking[0].BIC)
    expect(ranking[1].BIC).toBeLessThan(ranking[2].BIC)
    expect(ranking[1].BIC).toBeLessThan(ranking[3].BIC)
})
})