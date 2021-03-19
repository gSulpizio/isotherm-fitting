//langmuir function
export function langmuirSingleFunction([KH, nMono]: number[]) {
  return (p: number) => (nMono * KH * p) / (1 + KH * p);
}

//langmuir double function
export function langmuirDoubleFunction([K1, K2, n1, n2]: number[]) {
  return (
    p: number, //if p is any, it throws an error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ) => (n1 * K1 * p) / (1 + K1 * p) + (n2 * K1 * p) / (1 + K2 * p);
}
