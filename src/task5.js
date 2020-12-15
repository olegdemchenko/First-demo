const isObj = (arg) => typeof arg === 'object' && arg !== null;

const validateNumber = (number) => Number.isFinite(number) && number < 1000000 && number >= 0;

const normalizeNumbers = (...args) => args.map((numb) => Math.round(numb)).sort((a, b) => a - b);
      
function validateArguments(context) {
  if (!isObj(context)) {
    return 'Context must be object';
  }
  const { min, max } = context;
  if (!validateNumber(min) || !validateNumber(max)) {
    return 'Arguments must be valid numbers. Valid number is integer, which has max value 1000000 and min value 0';
  }
  return null;
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
      
const calculateSumm = (...args) => args.reduce((summ, elem) => summ += Number(elem), 0);

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
  const [min, max] = normalizeNumbers(context.min, context.max);
  const [simpleCount, diffCount] = calculateCounts(min, max);
  const winnerMethod = getWinnerMethod(simpleCount, diffCount);
  return { simple: simpleCount, difficult: diffCount, winnerMethod };
}