const isNumberValid = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number > 0;

const isStrValid = (str) => typeof str === 'string' && str !== '';

const validateFieldLength = (width, height) => {
  const fieldLength = (width + 1) * height;
  return fieldLength <= 1 << 28 ? null : 'Field length is too large';
}
      
function validateParams(width, height, symbol) {
  switch (true) {
    case !isNumberValid(width): {
      return 'Width must be number';
    }
    case !isNumberValid(height): {
      return 'Height must be number';
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

function printField(width, height, symbol) {
  const validationError = validateParams(width, height, symbol);
  if (validationError) {
    throw new Error(validationError);
  }
  const fieldLengthError = validateFieldLength(width, height);
  if (fieldLengthError) {
    throw new Error(fieldLengthError);
  }
  const space = ' ';
  const field = Array(height).fill([]).map((row, index) => {
    if (index % 2 === 0) {
      return createRow(width, symbol, space);
    }
    return createRow(width, space, symbol);
  });
  return field.join('\n');
}