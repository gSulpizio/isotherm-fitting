export default interface isotherm {
  x: number[];
  y: number[];
  name?: string;
  BET?: {
    vm: number;
    sampledData: number[];
    regression: { slope: number; intercept: number };
    score: number;
  };
  pSat?: number;
  T?: number;
}
