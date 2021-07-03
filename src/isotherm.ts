export default class isotherm {
    public x:number[]
    public y:number[]
    public BET?:{vm: number,sampledData:number[], regression:{slope:number, intercept:number},score:number}
    public pSat?:number
    public T?:number
    public isostericHeat?:number[]

    public constructor(x:number[],y:number[]){
    this.x=x;
    this.y=y;
}
}
