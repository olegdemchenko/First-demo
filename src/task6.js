import { isNumberPositive, isNumberNonNegative } from './utils.js'; 

export default function createSequence (minValue = 1, length = 1) {
  if (!isNumberPositive(minValue) || !isNumberNonNegative(length)) {
    throw new Error('Please use only valid numbers. The number must be in range 0 < numb <= (2 ** 53) - 1');
  }
  const res = [];
  const startElem = Math.ceil(Math.sqrt(minValue));
  const normLength = Math.round(length);
  for (let i = startElem; i < startElem + normLength; i += 1) {
    res.push(i);
  }
  return res.join(', ');
}