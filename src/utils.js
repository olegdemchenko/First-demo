const isNumberPositive = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number > 0;

const isNumberNonNegative = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number >= 0;

const isStr = (str) => typeof str === 'string' && str !== '';

const isObj = (arg) => typeof arg === 'object' && arg !== null;

const calculateSumm = (...args) => args.reduce((summ, elem) => summ += Number(elem), 0);

export { isNumberPositive, isNumberNonNegative, isStr, isObj, calculateSumm };