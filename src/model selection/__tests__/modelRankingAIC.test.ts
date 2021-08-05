import makeNoisyData from '../../../dev tools/makeNoisyData'
import modelRankingAIC from '../modelRankingAIC'
import modelScoring from '../modelScoring'

describe('testing mondelRanking, please work',()=>{
    it('langmuirSingle',()=>{
    let fnName='langmuirSingle'
    let data = makeNoisyData([2, 7], 10, 1000000, fnName);
    let ranking=modelRankingAIC(data)
    console.log(ranking)
})
it('langmuirDouble',()=>{
    let fnName='langmuirDouble'
    let data = makeNoisyData([1,3,2,0.1], 20, 1000000, fnName);
    let ranking=modelRankingAIC(data)
    console.log(ranking)
})
})