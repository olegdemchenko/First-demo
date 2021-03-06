const validateNumb = (numb) => {
  const isValid = Number.isFinite(numb) && numb < Number.MAX_SAFE_INTEGER && numb > Number.MIN_SAFE_INTEGER;
  return isValid ? null : 'Please use only valid numbers. The number must be in range - (2 ** 53) - 1 < numb <= (2 ** 53) - 1';
}

const findPalindrome = (str, leftStartPoint, rightStartPoint) => {
  let leftPointer = leftStartPoint;
  let rightPointer = rightStartPoint;
  while (leftPointer >= 0 && rightPointer < str.length && str[leftPointer] === str[rightPointer]) {
    leftPointer -= 1;
    rightPointer += 1;
  }
  return str.substr(leftPointer + 1, rightPointer - leftPointer - 1);
};

export default function getLongestPalindrome (numb) {
  const validationError = validateNumb(numb);
  if (validationError) {
    throw new Error(validationError);
  }
  const stringifiedNumb = String(numb);
  let res = 0;
  for (let i = 0; i < stringifiedNumb.length - 1;  i += 1) {
    const palindromeEven = +findPalindrome(stringifiedNumb, i, i + 1);
    const palindromeOdd = +findPalindrome(stringifiedNumb, i, i);
    const biggestPalindrome = Math.max(palindromeEven, palindromeOdd);
    if (biggestPalindrome > res && biggestPalindrome >= 10) {
      res = biggestPalindrome;
    } 
  }
  return res;
};