

export function getDigitVerifyMod10(string: String): Number {
  //const twoOrOne = (num) => ((num % 2) == 0) ? 2 : 1;
  // const sum = str.reverse().reduce(((total, value, index) => {
  //   var calc = twoOrOne(index) * +(value);
  //   calc = calc >= 10 ? (calc - 9) : calc;
  //   return total + calc;
  // }), 0);
  let multiplier = 2;
  let sum = 0;
  for (let index = string.length - 1; index >= 0; index--) {
    let calc = multiplier * +(string[index]);
    if (--multiplier < 1) multiplier = 2;
    if (calc >= 10) calc = calc - 9;
    sum = sum + calc;
  }
  let digit = 10 - (sum % 10);
  digit = digit == 10 ? 0 : digit;
  return digit;
};

export function getDigitVerifyMod11(string: String, zeroAllowed: boolean = false): Number {
  let multiplier = 2;
  let sum = 0;
  let digit;
  for (let index = string.length - 1; index >= 0; index--) {
    let calc = multiplier * +(string[index]);
    if (++multiplier > 9) multiplier = 2;
    sum = sum + calc;
  }

  if (zeroAllowed) {
    digit = (sum % 11);
    if ([11, 1].includes(digit)) digit = 0
  }
  else {
    digit = 11 - (sum % 11);
    if ([11, 0].includes(digit)) digit = 1
  }
  if (digit == 10) digit = 1
  return digit;
};