import { calculateSumm } from './utils.js';

const isTicketValid = (number) => Number.isFinite(number) && number < 1000000 && number > 0;
      
function validateArguments(context) {
  switch (true) {
    case (!isTicketValid(context.min)
          || !isTicketValid(context.max)): {
      return 'Please use only valid numbers. The rounded number must be in range 1 <= numb <= 999999';
    }
    case (context.min > context.max): {
      return 'Please use min arg which less than max arg';
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
  return { simpleCounter, diffCounter };
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

export default function analyzeTickets(context) {
  const normMin = Math.round(context.min);
  const normMax = Math.round(context.max); 
  const validationError = validateArguments({ min: normMin, max: normMax });
  if (validationError) {
    throw new Error(validationError);
  }
  const { simpleCounter, diffCounter } = calculateCounts(normMin, normMax);
  const winnerMethod = getWinnerMethod(simpleCounter, diffCounter);
  return { simple: simpleCounter, difficult: diffCounter, winnerMethod };
}