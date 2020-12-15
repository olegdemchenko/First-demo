const isObj = (arg) => typeof arg === 'object' && arg !== null;

const isValidLength = (length) => Number.isFinite(length) && length <= Number.MAX_SAFE_INTEGER && length > 0

const isValidNumber = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number >= 0;

const normalizeNumbers = (...args) => args.map((numb) => Math.round(numb)).sort((a, b) => a - b);

function parseContext(context) {
  if (isValidLength(context.length)) {
    const normLength = Math.round(context.length);
    return { min: 10 ** (normLength - 1), max: 10 ** normLength };
  }
  const [min, max] = normalizeNumbers(context.min, context.max);
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
    case (isValidNumber(context.min) && isValidNumber(context.max)): {
      return null;
    }
    default:
      return 'Context must contain valid length or valid min, max values';
  }
}

function getFibonacciSequence(context) {
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