export default interface isotherm {
  x: number[];
  y: number[];
  BET?: {
    vm: number;
    sampledData: number[];
    regression: { slope: number; intercept: number };
    score: number;
  };
  pSat?: number;
  T?: number;
  isostericHeat?: number[];
}
