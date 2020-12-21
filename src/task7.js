import { isObj, isNumberPositive, isNumberNonNegative } from './utils.js'; 

function parseContext({ length, min, max }) {
  if (isNumberPositive(length)) {
    const normLength = Math.round(length);
    return { min: 10 ** (normLength - 1), max: (10 ** normLength) - 1 };
   }
  return { min, max };
}

function validateArguments(context) {
  switch (true) {
    case (!isObj(context)): {
      return 'Context must be object';
    }
    case (isNumberPositive(context.length)): {
      return null;
    }
    case (isNumberNonNegative(context.min)
          && isNumberNonNegative(context.max)
          && context.max >= context.min): {
      return null;
    }
    default:
      return 'Please, use valid length or valid min, max values. Length must be in range 1 <= length <= (2 ** 53) - 1. Min and max values must be in range 0 <= numb <= (2 ** 53) - 1';
  }
}

export default function getFibonacciSequence(context) {
  const validationError = validateArguments(context);
  if (validationError) {
    throw new Error(validationError);
  }
  const { min, max } = parseContext(context);
  let n1 = 0;
  let n2 = 1;
  const numbers = [0];
  while (n2 <= max) {
    const x = n2;
    numbers.push(n2);
    n2 = n2 + n1;
    n1 = x;
  }
  return numbers.filter((numb) => numb >= min);
}