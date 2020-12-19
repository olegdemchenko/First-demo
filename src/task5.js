import { isObj, calculateSumm } from './utils';

const validateNumber = (number) => Number.isFinite(number) && number < 1000000 && number > 0;
      
function validateArguments(context) {
  const { min, max } = context;
  if (!validateNumber(min) || !validateNumber(max)) {
    return 'Arguments must be valid numbers. Valid number is integer, which has max value 999999 and min value 1';
  }
  switch (true) {
    case !isObj(context): {
      return 'Context must be object';
    }
    case (!validateNumber(min) || !validateNumber(max)): {
      return 'Arguments must be valid numbers. Valid number is integer, which has max value 999999 and min value 1';
    }
    case (context.min > context.max): {
      return 'min arg must be less than max arg';
    }
    default:
      return null;
  }
}

function calculateCounts(min, max) {
  let simpleCounter = 0;
  let diffCounter = 0;
  for (let ticket = min; ticket <= max; ticket += 1) {
    const stringTicket = String(ticket).padStart(6, '0');
    if (isSimpleHappy(stringTicket)) {
      simpleCounter += 1;
    }
    if (isDiffHappy(stringTicket)) {
      diffCounter += 1;
    }
  }
  return [simpleCounter, diffCounter];
}

function isSimpleHappy(ticket) {
  const summFirstNumbs = calculateSumm(...ticket.slice(0, 3));
  const summLastNumbs = calculateSumm(...ticket.slice(3));
  return summFirstNumbs === summLastNumbs;
};

function isDiffHappy(ticket) {
  const evenNumbs = ticket.match(/[2468]/g) ?? [];
  const oddNumbs = ticket.match(/[13579]/g) ?? [];
  const summEven = calculateSumm(...evenNumbs);
  const summOdd = calculateSumm(...oddNumbs);
  return summEven === summOdd;
};

function getWinnerMethod(simpleCount, diffCount) {
  switch (true) {
    case simpleCount > diffCount: 
      return 'simple';
    case simpleCount < diffCount: 
      return 'difficult';
    default: 
      return 'methods are equal';
  }
}

function analyzeTickets(context) {
  const validationError = validateArguments(context);
  if (validationError) {
    throw new Error(validationError);
  }
  const { min, max } = context;
  const [simpleCount, diffCount] = calculateCounts(min, max);
  const winnerMethod = getWinnerMethod(simpleCount, diffCount);
  return { simple: simpleCount, difficult: diffCount, winnerMethod };
}