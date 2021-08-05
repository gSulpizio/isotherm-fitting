import isotherm from "../isotherm";
import modelScoring from "./modelScoring";
/**
 * Sorts the models from the lowest BIC score (position 0) to the highest BIC score. 
 * Also computes the probability to fit the data in a better way of each model compared to the first (best) one following: https://en.wikipedia.org/wiki/Akaike_information_criterion#How_to_use_BIC_in_practice
 * This probability is defined by: p=exp[((BIC_{min} − BIC_{i})/2)]
 * @param {isotherm} data: isotherm with at least x (pressure ) and y (loading) arrays
 * @returns 
 */
export default function modelRankingBIC(data:isotherm){
    let scoredModels=modelScoring(data)
    scoredModels.sort(function(a, b){
        return a.BIC - b.BIC;
    });
    for(let model of scoredModels){
        model.pBIC=Math.exp((scoredModels[0].BIC-model.BIC)/2)
    }

    return scoredModels
}