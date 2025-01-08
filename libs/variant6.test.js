const {
  splitNumber,
  toExponential,
  toPrecision,
  roundDigits,
  zeros,
  digits,
} = require("./variant6");
("");
describe("splitNumber", () => {
  it("should split a number into sign, coefficients, and exponent", () => {
    expect(splitNumber("12345")).toEqual({
      sign: "",
      coefficients: [1, 2, 3, 4, 5],
      exponent: 0,
    });
  });
  it("should handle negative numbers", () => {
    expect(splitNumber("-12345")).toEqual({
      sign: "-",
      coefficients: [1, 2, 3, 4, 5],
      exponent: 0,
    });
  });
  it("should handle scientific notation", () => {
    expect(splitNumber("1.2345e+4")).toEqual({
      sign: "",
      coefficients: [1, 2, 3, 4, 5],
      exponent: 4,
    });
  });
});

describe("toExponential", () => {
  it("should return the correct exponential notation with default precision", () => {
    expect(toExponential(12345)).toBe("1.2345e+4");
  });

  it("should return the correct exponential notation with specified precision", () => {
    expect(toExponential(12345, 2)).toBe("1.23e+4");
  });

  it("should handle edge case for zero", () => {
    expect(toExponential(0)).toBe("0");
  });

  it("should handle non-numeric values", () => {
    expect(toExponential(NaN)).toBe("NaN");
    expect(toExponential(Infinity)).toBe("Infinity");
  });
});

describe("toPrecision", () => {
  it("should return number in fixed-point notation if exponent is within range", () => {
    expect(toPrecision(12345, 3)).toBe("12345");
  });

  it("should return number in exponential notation if exponent is out of range", () => {
    expect(toPrecision(1234567890, 3)).toBe("1.23e+9");
  });

  it("should handle non-numeric values", () => {
    expect(toPrecision(NaN)).toBe("NaN");
    expect(toPrecision(Infinity)).toBe("Infinity");
  });
});

describe("roundDigits", () => {
  it("should round to the specified precision", () => {
    const split = { sign: "", coefficients: [1, 2, 3], exponent: 3 };
    const result = roundDigits(split, 2);
    expect(result.coefficients).toEqual([1, 2]);
    expect(result.exponent).toBe(3);
  });

  it("should handle rounding with carry-over", () => {
    const split = { sign: "", coefficients: [9, 9], exponent: 0 };
    const result = roundDigits(split, 1);
    expect(result.coefficients).toEqual([1]);
    expect(result.exponent).toBe(1);
  });
});

describe("digits", () => {
  it("should return the correct number of significant digits", () => {
    expect(digits(2.34)).toBe(3);
    expect(digits(0.0034)).toBe(2);
    expect(digits(120.5e30)).toBe(4);
  });

  it("should handle numbers in exponential notation", () => {
    expect(digits(1.23e5)).toBe(3);
  });
});
