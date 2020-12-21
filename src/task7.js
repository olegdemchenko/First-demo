import { isObj, isNumberValid } from './utils.js'; 

const isValidLength = (length) => isNumberValid(length);

const isValidMinMax = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number >= 0;

function parseContext({ length, min, max }) {
  if (isValidLength(length)) {
    const normLength = Math.round(length);
    return { min: 10 ** (normLength - 1), max: 10 ** normLength };
   }
  return { min, max };
}

function validateArguments(context) {
  switch (true) {
    case (!isObj(context)): {
      return 'Context must be object';
    }
    case (isValidLength(context.length)): {
      return null;
    }
    case (isValidMinMax(context.min)
          && isValidMinMax(context.max)
          && context.max >= context.min): {
      return null;
    }
    default:
      return 'Context must contain valid length or valid min, max values';
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