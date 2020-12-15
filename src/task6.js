const isNumberValid = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number >= 0;

function createSequence (minValue = 1, length = 0) {
  if (!isNumberValid(minValue) || !isNumberValid(length)) {
    throw new Error('Arguments must be valid numbers');
  }
  const res = [];
  const startElem = Math.ceil(Math.sqrt(minValue)) || 1;
  const normLength = Math.round(length);
  for (let i = startElem; i < startElem + normLength; i += 1) {
    res.push(i);
  }
  return res.join(', ');
}