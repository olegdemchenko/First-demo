import { isNumberPositive, isNumberNonNegative } from './utils.js'; 

export default function createSequence (minValue, length) {
  const normLength = Math.round(length);
  if (!isNumberPositive(minValue) || !isNumberNonNegative(normLength)) {
    throw new Error('Please use only valid numbers. Start number must be in range 0 < numb <= (2 ** 53) - 1. Rounded length must be in range 0 <= length <= (2 ** 53) - 1');
  }
  const res = [];
  const startElem = Math.ceil(Math.sqrt(minValue));
  for (let i = startElem; i < startElem + normLength; i += 1) {
    res.push(i);
  }
  return res.join(', ');
}