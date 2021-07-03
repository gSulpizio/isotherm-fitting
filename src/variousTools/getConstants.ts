export default function getConstants(name: string) {
  switch (name) {
    case 'R':
      return 0.00831446261815324; //[L⋅bar⋅K−1⋅mol−1]
      case 'N':
        return 6.02214076 *10**23; //mol
    default:
      throw 'getConstants: UNKNOWN CONSTANT NAME ';
  }
}
