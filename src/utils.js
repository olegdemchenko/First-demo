const isNumberValid = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number > 0;

const isStrValid = (str) => typeof str === 'string' && str !== '';

const isObj = (arg) => typeof arg === 'object' && arg !== null;

const calculateSumm = (...args) => args.reduce((summ, elem) => summ += Number(elem), 0);

export { isNumberValid, isStrValid, isObj, calculateSumm };