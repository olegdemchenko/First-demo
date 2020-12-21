import { isNumberValid } from './utils.js'; 

export default function createSequence (minValue = 1, length = 1) {
  if (!isNumberValid(minValue) || !isNumberValid(length)) {
    throw new Error('Arguments must be valid numbers');
  }
  const res = [];
  const startElem = Math.ceil(Math.sqrt(minValue));
  const normLength = Math.round(length);
  for (let i = startElem; i < startElem + normLength; i += 1) {
    res.push(i);
  }
  return res.join(', ');
}