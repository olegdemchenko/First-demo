import { isNumberNonNegative, isStr } from './utils.js';

const validateFieldLength = (width, height) => {
  const fieldLength = (width + 1) * height;
  return fieldLength <= 1 << 28 ? null : 'Field length is too large. Field length must be less than ';
}

function validateParams(width, height, symbol) {
  switch (true) {
    case !isNumberNonNegative(width): {
      return 'Please, use positive number as width. The rounded number must be in range 0 < numb <= (2 ** 53) - 1';
    }
    case !isNumberNonNegative(height): {
      return 'Please, use positive number as height. The rounded number must be in range 0 < numb <= (2 ** 53) - 1';
    }
    case !isStr(symbol): {
      return 'Please, use string as symbol';
    }
    case symbol.length > 1: {
      return 'Please, use short symbols. The symbol`s length must be equal 1';
    }
    default: 
      return null;
  }
}

const createRow = (width, symbol, space) => Array(width).fill(symbol).map((elem, index) => index % 2 === 0 ? elem : space).join('');

export default function printField(width, height, symbol) {
  const normWidth = Math.round(width);
  const normHeight = Math.round(height);
  const validationError = validateParams(normWidth, normHeight, symbol);
  if (validationError) {
    throw new Error(validationError);
  }
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
