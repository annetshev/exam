function splitNumber(num) {
  const regex = /^([+-]?)(\d+)(?:\.(\d*))?([eE]([+-]?\d+))?$/;
  const match = num.match(regex);
  if (!match) {
    throw new Error("Invalid number format");
  }

  const sign = match[1] || "";
  const integerPart = match[2];
  const fractionalPart = match[3] || "";
  const exponent = match[5] ? parseInt(match[5], 10) : 0;

  const coefficients = integerPart
    .split("")
    .map(Number)
    .concat(fractionalPart.split("").map(Number));

  return {
    sign,
    coefficients,
    exponent,
  };
}

function toExponential(num, precision = 4) {
  if (isNaN(num)) return "NaN";
  if (num === Infinity) return "Infinity";
  if (num === 0) return "0";

  const exp = Math.floor(Math.log10(Math.abs(num)));
  const coefficient = num / Math.pow(10, exp);
  const expSign = exp >= 0 ? "+" : "";
  return coefficient.toFixed(precision) + "e" + expSign + exp;
}

function toPrecision(number, precision = 3) {
  if (isNaN(number) || !isFinite(number)) {
    return number.toString();
  }

  const str = number.toPrecision(precision);

  const [integer, exponent] = str.split("e");
  if (exponent && Math.abs(parseInt(exponent, 10)) > 5) {
    return str;
  }

  return str;
}

function roundDigits(split, precision) {
  let { sign, coefficients, exponent } = split;

  coefficients = coefficients.slice(0, precision);

  let carryOver = 0;
  for (let i = coefficients.length - 1; i >= 0; i--) {
    if (coefficients[i] === 10) {
      coefficients[i] = 0;
      carryOver = 1;
    }
  }

  if (carryOver) {
    coefficients = [1].concat(coefficients);
    exponent += 1;
  }

  return { sign, coefficients, exponent };
}

function zeros(length) {
  return Array(length).fill(0);
}

function digits(number) {
  if (isNaN(number) || !isFinite(number)) {
    return 0;
  }

  const str = number.toExponential();
  const [base, exponent] = str.split("e");

  const significantDigits = base.replace(".", "").length;

  return significantDigits;
}

module.exports = {
  splitNumber,
  toExponential,
  toPrecision,
  roundDigits,
  zeros,
  digits,
};
