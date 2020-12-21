import { isNumberValid, isStrValid } from './utils.js';

const validateFieldLength = (width, height) => {
  const fieldLength = (width + 1) * height;
  return fieldLength <= 1 << 28 ? null : 'Field length is too large';
}

function validateParams(width, height, symbol) {
  switch (true) {
    case !isNumberValid(width): {
      return 'Width must be positive integer';
    }
    case !isNumberValid(height): {
       return 'Height must be positive integer';
    }
    case !isStrValid(symbol): {
      return 'Symbol must be string';
     }
     case symbol.length > 1: {
      return 'Symbol too long';
    }
    default: 
      return null;
  }
}

const createRow = (width, symbol, space) => Array(width).fill(symbol).map((elem, index) => index % 2 === 0 ? elem : space).join('');

export default function printField(width, height, symbol) {
  const validationError = validateParams(width, height, symbol);
  if (validationError) {
    throw new Error(validationError);
  }
  const normWidth = Math.round(width);
  const normHeight = Math.round(height);
  const fieldLengthError = validateFieldLength(normWidth, normHeight);
  if (fieldLengthError) {
    throw new Error(fieldLengthError);
  }
  const space = ' ';
  const field = Array(normHeight).fill([]).map((row, index) => {
    if (index % 2 === 0) {
      return createRow(normWidth, symbol, space);
    }
    return createRow(normWidth, space, symbol);
  });
  return field.join('\n');
}
