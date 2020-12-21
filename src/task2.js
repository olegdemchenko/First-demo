import { isNumberPositive, isObj } from './utils.js';

function validateArguments (envelope1, envelope2) {
  switch (true) {
    case !isObj(envelope1) || !isObj(envelope2): {
      return 'Envelope must be object';
    }
    case !isNumberPositive(envelope1.a) || !isNumberPositive(envelope1.b): {
      return 'First envelope sides must be positive numbers. The number must be in range 0 < numb <= (2 ** 53) - 1';
    }
    case !isNumberPositive(envelope2.c) || !isNumberPositive(envelope2.d): {
      return 'Second envelope sides must be positive numbers. The number must be in range 0 < numb <= (2 ** 53) - 1';
    }
    default:
      return null;
  }
}        

export default function packEnvelope (envelope1, envelope2) {
  const validationError = validateArguments(envelope1, envelope2);
  if (validationError) {
    throw new Error(validationError);
  }
  const maxSide1 = Math.max(envelope1.a, envelope1.b);
  const minSide1 = Math.min(envelope1.a, envelope1.b);
  const maxSide2 = Math.max(envelope2.c, envelope2.d);
  const minSide2 = Math.min(envelope2.c, envelope2.d);
  const isEnvelope1Larger = maxSide1 > maxSide2 && minSide1 > minSide2;
  const isEnvelope2Larger = maxSide2 > maxSide1 && minSide2 > minSide1;
  if (isEnvelope1Larger) {
    return 1;
  }
  if (isEnvelope2Larger) {
    return 2;
  }
  return 0;
}