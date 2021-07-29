/**
 * Isotherm interface, contains information for one isotherm
 */
export default interface isotherm {
  x: number[];
  y: number[];
  name?: string;
  BET?: {
    vm: number;
    sampledData: number[];
    regression: { slope: number; intercept: number };
    score: number;
    parameters: number; //this is the parameter of the fitted function
    AIC: number;
    BIC: number;
  };
  pSat?: number;
  T?: number;
  LangmuirSingle?: { parameters: number[]; AIC: number; BIC: number };
  LangmuirDouble?: { parameters: number[]; AIC: number; BIC: number };
  LangmuirTriple?: { parameters: number[]; AIC: number; BIC: number };
}
