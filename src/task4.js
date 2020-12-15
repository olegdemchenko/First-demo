const validateNumb = (numb) => {
  const isValid = Number.isFinite(numb) && numb < Number.MAX_SAFE_INTEGER && numb > Number.MIN_SAFE_INTEGER;
  return isValid ? null : 'Number must be valid';
};

const findPalyndrome = (numb, leftStartPoint, rightStartPoint) => {
  let leftPointer = leftStartPoint;
  let rightPointer = rightStartPoint;
  while (leftPointer >= 0 && rightPointer < numb.length && numb[leftPointer] === numb[rightPointer]) {
    leftPointer -= 1;
    rightPointer += 1;
  }
  return numb.substr(leftPointer + 1, rightPointer - leftPointer - 1);
};

const getLongestPalyndrome = (numb) => {
  const validationError = validateNumb(numb);
  if (validationError) {
    throw new Error(validationError);
  }
  const stringifiedNumb = String(numb);
  let res = stringifiedNumb[0];
  for (let i = 0; i < stringifiedNumb.length - 1;  i += 1) {
    const palyndromeEven = findPalyndrome(stringifiedNumb, i, i + 1);
    const palyndromeOdd = findPalyndrome(stringifiedNumb, i, i);
    const longestPalyndrome = palyndromeEven.length > palyndromeOdd.length ? palyndromeEven : palyndromeOdd;
    if (longestPalyndrome.length > res.length) {
      res = longestPalyndrome;
    } 
  }
  return res;
};